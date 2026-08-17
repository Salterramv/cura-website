import os
import re
import csv
import requests
from dotenv import load_dotenv

load_dotenv(".env.local")

SUPABASE_URL = os.environ.get("NEXT_PUBLIC_SUPABASE_URL")
SUPABASE_KEY = os.environ.get("SUPABASE_SERVICE_ROLE_KEY")

if not SUPABASE_URL:
    raise RuntimeError("NEXT_PUBLIC_SUPABASE_URL is missing from .env.local")

if not SUPABASE_KEY:
    raise RuntimeError("SUPABASE_SERVICE_ROLE_KEY is missing from .env.local")

HEADERS = {
    "apikey": SUPABASE_KEY,
    "Authorization": f"Bearer {SUPABASE_KEY}",
}

LEGAL_CASES_URL = f"{SUPABASE_URL}/rest/v1/legal_cases"
PROCEEDINGS_URL = f"{SUPABASE_URL}/rest/v1/case_proceedings"
DOCUMENTS_URL = f"{SUPABASE_URL}/rest/v1/case_documents"

REPORT_FILE = "mira-source-match-report.csv"


def get_all_rows(url, select="*"):
    rows = []
    offset = 0
    limit = 1000

    while True:
        response = requests.get(
            url,
            headers=HEADERS,
            params={
                "select": select,
                "limit": limit,
                "offset": offset,
            },
            timeout=60,
        )

        response.raise_for_status()

        batch = response.json()

        if not batch:
            break

        rows.extend(batch)

        if len(batch) < limit:
            break

        offset += limit

    return rows


def normalize_reference(value):
    if not value:
        return ""

    value = str(value).upper().strip()
    value = value.replace("\\", "/")
    value = value.replace(" ", "")
    value = re.sub(r"/+", "/", value)

    return value


def normalize_court(value):
    if not value:
        return ""

    value = str(value).upper().strip()

    if "TAT" in value or "TAX APPEAL TRIBUNAL" in value:
        return "TAT"

    if "SUPREME" in value or value == "SC":
        return "SC"

    if "HIGH COURT" in value or value == "HC":
        return "HC"

    return value


def infer_court_from_reference(reference):
    reference = normalize_reference(reference)

    if reference.startswith("TAT-"):
        return "TAT"

    if "/HC-" in reference:
        return "HC"

    if "/SC-" in reference:
        return "SC"

    return ""


def court_matches_reference(court, reference):
    inferred = infer_court_from_reference(reference)

    if not inferred:
        return True

    return normalize_court(court) == inferred


def main():

    print()
    print("=" * 72)
    print("CURA → MIRA SOURCE MATCHER")
    print("=" * 72)
    print()
    print("READ-ONLY MODE")
    print("No Supabase records will be changed.")
    print()

    # ==========================================================
    # LEGAL CASES
    # ==========================================================

    print("Loading legal cases...")

    legal_cases = get_all_rows(
        LEGAL_CASES_URL,
        select=(
            "id,"
            "slug,"
            "title,"
            "mira_url,"
            "mira_case_number,"
            "filed_date,"
            "claim,"
            "mira_status,"
            "mira_remarks,"
            "legal_matter_id,"
            "is_primary"
        ),
    )

    print(f"Loaded {len(legal_cases)} legal cases.")
    print()

    # ==========================================================
    # PROCEEDINGS
    # ==========================================================

    print("Loading case proceedings...")

    proceedings = get_all_rows(
        PROCEEDINGS_URL,
        select=(
            "id,"
            "case_id,"
            "court,"
            "case_number,"
            "filed_date,"
            "judgment_date,"
            "status,"
            "outcome,"
            "sort_order,"
            "source_url,"
            "source_title,"
            "source_type,"
            "source_status,"
            "source_verified_at,"
            "source_notes"
        ),
    )

    print(f"Loaded {len(proceedings)} proceedings.")
    print()

    # ==========================================================
    # CASE DOCUMENTS
    # ==========================================================

    print("Loading existing case documents...")

    try:

        documents = get_all_rows(
            DOCUMENTS_URL,
            select=(
                "id,"
                "proceeding_id,"
                "title,"
                "url,"
                "source_type,"
                "language,"
                "document_date,"
                "processing_status"
            ),
        )

    except Exception as error:

        print(
            "Warning: could not load case_documents."
        )

        print(
            f"Reason: {error}"
        )

        documents = []

    print(
        f"Loaded {len(documents)} case documents."
    )
    print()

    # ==========================================================
    # INDEX LEGAL CASES BY ID
    # ==========================================================

    case_by_id = {
        case["id"]: case
        for case in legal_cases
    }

    # ==========================================================
    # INDEX DOCUMENTS BY PROCEEDING
    # ==========================================================

    documents_by_proceeding = {}

    for document in documents:

        proceeding_id = document.get(
            "proceeding_id"
        )

        if proceeding_id:

            documents_by_proceeding.setdefault(
                proceeding_id,
                []
            ).append(document)

    # ==========================================================
    # PROCESS PROCEEDINGS
    # ==========================================================

    matched = []
    unmatched = []
    suspicious = []

    for proceeding in proceedings:

        proceeding_id = proceeding.get("id")
        case_id = proceeding.get("case_id")

        case = case_by_id.get(case_id)

        reference = normalize_reference(
            proceeding.get("case_number")
        )

        court = normalize_court(
            proceeding.get("court")
        )

        inferred_court = infer_court_from_reference(
            reference
        )

        documents_for_proceeding = (
            documents_by_proceeding.get(
                proceeding_id,
                []
            )
        )

        # ------------------------------------------------------
        # Missing parent case
        # ------------------------------------------------------

        if not case:

            unmatched.append(
                {
                    "reason": "NO_PARENT_CASE",
                    "proceeding": proceeding,
                    "case": None,
                    "reference": reference,
                    "court": court,
                }
            )

            continue

        # ------------------------------------------------------
        # Court/reference validation
        # ------------------------------------------------------

        if inferred_court and court != inferred_court:

            suspicious.append(
                {
                    "reason": (
                        "COURT_REFERENCE_MISMATCH"
                    ),
                    "proceeding": proceeding,
                    "case": case,
                    "reference": reference,
                    "court": court,
                    "inferred_court": inferred_court,
                }
            )

            continue

        # ------------------------------------------------------
        # Valid proceeding
        # ------------------------------------------------------

        matched.append(
            {
                "proceeding": proceeding,
                "case": case,
                "documents": documents_for_proceeding,
                "reference": reference,
                "court": court,
                "inferred_court": inferred_court,
            }
        )

    # ==========================================================
    # SUMMARY
    # ==========================================================

    print("=" * 72)
    print("MATCH RESULTS")
    print("=" * 72)
    print()

    print(
        f"Total proceedings       : {len(proceedings)}"
    )

    print(
        f"Valid proceedings       : {len(matched)}"
    )

    print(
        f"Unmatched proceedings   : {len(unmatched)}"
    )

    print(
        f"Suspicious proceedings  : {len(suspicious)}"
    )

    print()

    # ==========================================================
    # SOURCE STATUS
    # ==========================================================

    with_document = 0
    with_source_url = 0
    missing_source = 0

    for item in matched:

        proceeding = item["proceeding"]
        documents_for_proceeding = item["documents"]

        has_document = any(
            document.get("url")
            for document in documents_for_proceeding
        )

        if has_document:

            with_document += 1

        elif proceeding.get("source_url"):

            with_source_url += 1

        else:

            missing_source += 1

    print(
        f"With case document     : {with_document}"
    )

    print(
        f"With proceeding URL     : {with_source_url}"
    )

    print(
        f"Missing source          : {missing_source}"
    )

    print()

    # ==========================================================
    # COURT BREAKDOWN
    # ==========================================================

    court_counts = {}

    for item in matched:

        court = item["court"] or "UNKNOWN"

        court_counts[court] = (
            court_counts.get(court, 0) + 1
        )

    print("=" * 72)
    print("COURT BREAKDOWN")
    print("=" * 72)

    for court, count in sorted(
        court_counts.items()
    ):

        print(
            f"{court:10} {count}"
        )

    # ==========================================================
    # FIRST 50 VALID PROCEEDINGS
    # ==========================================================

    print()
    print("=" * 72)
    print("FIRST 50 VALID PROCEEDINGS")
    print("=" * 72)

    for item in matched[:50]:

        proceeding = item["proceeding"]
        case = item["case"]
        documents_for_proceeding = item["documents"]

        print()

        print(
            f"[{item['court']}] "
            f"{item['reference']}"
        )

        print(
            f"  Proceeding ID : "
            f"{proceeding.get('id')}"
        )

        print(
            f"  Case ID       : "
            f"{case.get('id')}"
        )

        print(
            f"  Case title    : "
            f"{case.get('title')}"
        )

        print(
            f"  MIRA case no. : "
            f"{case.get('mira_case_number') or 'NONE'}"
        )

        print(
            f"  MIRA URL      : "
            f"{case.get('mira_url') or 'NONE'}"
        )

        print(
            f"  Source URL    : "
            f"{proceeding.get('source_url') or 'NONE'}"
        )

        print(
            f"  Source status : "
            f"{proceeding.get('source_status') or 'NONE'}"
        )

        if documents_for_proceeding:

            for document in documents_for_proceeding:

                print(
                    f"  Document      : "
                    f"{document.get('title') or 'Untitled'}"
                )

                print(
                    f"  Document URL  : "
                    f"{document.get('url') or 'NONE'}"
                )

                print(
                    f"  Language      : "
                    f"{document.get('language') or 'NONE'}"
                )

        else:

            print(
                "  Documents     : NONE"
            )

    # ==========================================================
    # SUSPICIOUS
    # ==========================================================

    print()
    print("=" * 72)
    print("SUSPICIOUS COURT / REFERENCE MATCHES")
    print("=" * 72)

    for item in suspicious[:50]:

        proceeding = item["proceeding"]
        case = item["case"]

        print()

        print(
            f"Reference      : "
            f"{item['reference']}"
        )

        print(
            f"Database court : "
            f"{item['court']}"
        )

        print(
            f"Reference says : "
            f"{item['inferred_court']}"
        )

        print(
            f"Case           : "
            f"{case.get('title')}"
        )

        print(
            f"Proceeding ID  : "
            f"{proceeding.get('id')}"
        )

    # ==========================================================
    # UNMATCHED
    # ==========================================================

    print()
    print("=" * 72)
    print("FIRST 50 UNMATCHED")
    print("=" * 72)

    for item in unmatched[:50]:

        proceeding = item["proceeding"]

        print()

        print(
            f"Reason         : "
            f"{item['reason']}"
        )

        print(
            f"Proceeding ID  : "
            f"{proceeding.get('id')}"
        )

        print(
            f"Case ID        : "
            f"{proceeding.get('case_id')}"
        )

        print(
            f"Court          : "
            f"{item['court']}"
        )

        print(
            f"Case number    : "
            f"{item['reference'] or 'NONE'}"
        )

    # ==========================================================
    # CSV REPORT
    # ==========================================================

    print()
    print(
        f"Writing report: {REPORT_FILE}"
    )

    with open(
        REPORT_FILE,
        "w",
        newline="",
        encoding="utf-8",
    ) as file:

        writer = csv.writer(file)

        writer.writerow(
            [
                "result",
                "court",
                "case_number",
                "proceeding_id",
                "case_id",
                "case_title",
                "mira_case_number",
                "mira_url",
                "source_url",
                "source_status",
                "document_count",
                "document_urls",
            ]
        )

        for item in matched:

            proceeding = item["proceeding"]
            case = item["case"]
            documents_for_proceeding = item[
                "documents"
            ]

            document_urls = "; ".join(
                document.get("url")
                for document in documents_for_proceeding
                if document.get("url")
            )

            writer.writerow(
                [
                    "VALID",
                    item["court"],
                    item["reference"],
                    proceeding.get("id"),
                    case.get("id"),
                    case.get("title"),
                    case.get("mira_case_number") or "",
                    case.get("mira_url") or "",
                    proceeding.get("source_url") or "",
                    proceeding.get("source_status") or "",
                    len(documents_for_proceeding),
                    document_urls,
                ]
            )

        for item in suspicious:

            proceeding = item["proceeding"]
            case = item["case"]

            writer.writerow(
                [
                    "SUSPICIOUS",
                    item["court"],
                    item["reference"],
                    proceeding.get("id"),
                    case.get("id"),
                    case.get("title"),
                    case.get("mira_case_number") or "",
                    case.get("mira_url") or "",
                    proceeding.get("source_url") or "",
                    proceeding.get("source_status") or "",
                    "",
                    "",
                ]
            )

        for item in unmatched:

            proceeding = item["proceeding"]

            writer.writerow(
                [
                    "UNMATCHED",
                    item["court"],
                    item["reference"],
                    proceeding.get("id"),
                    proceeding.get("case_id"),
                    "",
                    "",
                    "",
                    proceeding.get("source_url") or "",
                    proceeding.get("source_status") or "",
                    "",
                    "",
                ]
            )

    print()
    print("=" * 72)
    print("DRY RUN COMPLETE")
    print("=" * 72)
    print()
    print(
        f"Report saved as: {REPORT_FILE}"
    )
    print()
    print(
        "NO SUPABASE RECORDS WERE CHANGED."
    )
    print()


if __name__ == "__main__":
    main()
