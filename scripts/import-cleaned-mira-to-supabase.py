import json
import os
import re
import requests
from urllib.parse import quote
from dotenv import load_dotenv

load_dotenv(".env.local")


INPUT_FILE = "mira_cases_cleaned.json"

SUPABASE_URL = os.environ.get("NEXT_PUBLIC_SUPABASE_URL")
SUPABASE_KEY = os.environ.get("SUPABASE_SERVICE_ROLE_KEY")


if not SUPABASE_URL:
    raise RuntimeError(
        "NEXT_PUBLIC_SUPABASE_URL is missing."
    )

if not SUPABASE_KEY:
    raise RuntimeError(
        "SUPABASE_SERVICE_ROLE_KEY is missing."
    )


API_URL = f"{SUPABASE_URL}/rest/v1/legal_cases"


HEADERS = {
    "apikey": SUPABASE_KEY,
    "Authorization": f"Bearer {SUPABASE_KEY}",
    "Content-Type": "application/json",
    "Prefer": "return=representation",
}


def slugify(text):
    text = text.lower().strip()

    text = re.sub(
        r"[^a-z0-9]+",
        "-",
        text
    )

    text = re.sub(
        r"-+",
        "-",
        text
    )

    return text.strip("-")


def build_slug(case):
    title = case.get("title", "").strip()
    case_number = case.get("case_number", "").strip()

    base = slugify(title)

    if case_number:
        number_slug = slugify(case_number)

        if number_slug:
            base = f"{base}-{number_slug}"

    return base[:200]


def normalize(text):
    if not text:
        return ""

    return " ".join(
        str(text).strip().lower().split()
    )


def find_existing_case(case):
    """
    First try the strongest identifier:
    title + MIRA case number.

    If that doesn't find anything, fall back
    to the title. This protects the existing
    Bunny Holdings record.
    """

    title = case.get("title", "").strip()
    case_number = case.get("case_number", "").strip()

    # --------------------------------------------------
    # 1. Match by MIRA case number + title
    # --------------------------------------------------

    if case_number:

        params = {
            "title": f"eq.{title}",
            "mira_case_number": f"eq.{case_number}",
            "select": "*",
            "limit": "1",
        }

        response = requests.get(
            API_URL,
            headers=HEADERS,
            params=params,
            timeout=60,
        )

        response.raise_for_status()

        results = response.json()

        if results:
            return results[0]

    # --------------------------------------------------
    # 2. Fall back to exact title
    # --------------------------------------------------

    if title:

        params = {
            "title": f"eq.{title}",
            "select": "*",
            "limit": "10",
        }

        response = requests.get(
            API_URL,
            headers=HEADERS,
            params=params,
            timeout=60,
        )

        response.raise_for_status()

        results = response.json()

        if results:
            return results[0]

    return None


def insert_case(case):
    title = case.get("title", "").strip()

    # MIRA has one record with no title.
    # Give it a transparent fallback rather
    # than inventing a taxpayer name.
    if not title:
        title = (
            "MIRA Case — "
            + case.get("case_number", "Unknown Case")
        )

    payload = {
        "slug": build_slug({
            **case,
            "title": title,
        }),

        "title": title,

        "category": "Tax Legal Case",

        "description": (
            case.get("claim")
            or "Case recorded in the MIRA Legal Cases register."
        ),

        "status": case.get("status") or "Case Ongoing",

        "outcome": case.get("remarks") or None,

        "mira_url": case.get("mira_url"),

        "published": True,

        "mira_case_number": case.get("case_number"),

        "filed_date": case.get("filed_date"),

        "claim": case.get("claim") or None,

        "mira_status": case.get("status") or None,

        "mira_remarks": case.get("remarks") or None,
    }

    response = requests.post(
        API_URL,
        headers=HEADERS,
        json=payload,
        timeout=60,
    )

    response.raise_for_status()

    return response.json()


def update_case(existing, case):
    """
    Update ONLY MIRA/import fields.

    We deliberately do NOT modify:
    background
    decision
    legal_principle
    implications

    This protects your existing CURA analysis.
    """

    title = case.get("title", "").strip()

    if not title:
        title = (
            "MIRA Case — "
            + case.get("case_number", "Unknown Case")
        )

    payload = {
        "title": title,
        "category": "Tax Legal Case",

        "description": (
            case.get("claim")
            or existing.get("description")
            or "Case recorded in the MIRA Legal Cases register."
        ),

        "status": case.get("status") or existing.get("status"),

        "outcome": (
            case.get("remarks")
            or existing.get("outcome")
        ),

        "mira_url": case.get("mira_url"),

        "published": True,

        "mira_case_number": (
            case.get("case_number")
            or existing.get("mira_case_number")
        ),

        "filed_date": (
            case.get("filed_date")
            or existing.get("filed_date")
        ),

        "claim": (
            case.get("claim")
            or existing.get("claim")
        ),

        "mira_status": (
            case.get("status")
            or existing.get("mira_status")
        ),

        "mira_remarks": (
            case.get("remarks")
            or existing.get("mira_remarks")
        ),
    }

    row_id = existing["id"]

    update_url = (
        API_URL
        + "?id=eq."
        + quote(str(row_id))
    )

    response = requests.patch(
        update_url,
        headers=HEADERS,
        json=payload,
        timeout=60,
    )

    response.raise_for_status()

    return response.json()


# ==================================================
# LOAD DATA
# ==================================================

with open(
    INPUT_FILE,
    "r",
    encoding="utf-8"
) as file:

    cases = json.load(file)


print("=" * 80)
print("CURA — MIRA CASE IMPORT")
print("=" * 80)

print(f"Cases to process: {len(cases)}")

print()


# ==================================================
# PROCESS
# ==================================================

inserted = 0
updated = 0
failed = 0

for index, case in enumerate(cases, start=1):

    title = case.get("title", "").strip()

    if not title:
        title = (
            "MIRA Case — "
            + case.get("case_number", "Unknown Case")
        )

    case_number = case.get(
        "case_number",
        ""
    ).strip()

    print(
        f"[{index}/{len(cases)}] "
        f"{title}"
    )

    try:

        existing = find_existing_case(
            {
                **case,
                "title": title,
            }
        )

        if existing:

            update_case(
                existing,
                {
                    **case,
                    "title": title,
                }
            )

            updated += 1

            print("    UPDATED")

        else:

            insert_case(
                {
                    **case,
                    "title": title,
                }
            )

            inserted += 1

            print("    INSERTED")

    except Exception as error:

        failed += 1

        print(
            "    ERROR:",
            error
        )


# ==================================================
# SUMMARY
# ==================================================

print()
print("=" * 80)
print("IMPORT COMPLETE")
print("=" * 80)

print(f"Total processed: {len(cases)}")
print(f"Inserted: {inserted}")
print(f"Updated: {updated}")
print(f"Failed: {failed}")

print("=" * 80)