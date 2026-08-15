import os
import requests
from dotenv import load_dotenv

load_dotenv(".env.local")

SUPABASE_URL = os.environ.get("NEXT_PUBLIC_SUPABASE_URL")
SUPABASE_KEY = os.environ.get("SUPABASE_SERVICE_ROLE_KEY")

if not SUPABASE_URL:
    raise RuntimeError("NEXT_PUBLIC_SUPABASE_URL is missing.")

if not SUPABASE_KEY:
    raise RuntimeError("SUPABASE_SERVICE_ROLE_KEY is missing.")

HEADERS = {
    "apikey": SUPABASE_KEY,
    "Authorization": f"Bearer {SUPABASE_KEY}",
    "Content-Type": "application/json",
    "Prefer": "return=minimal",
}

SOURCE_URL = f"{SUPABASE_URL}/rest/v1/mira_source_cases"
PROCEEDING_URL = f"{SUPABASE_URL}/rest/v1/proceedings"
LINK_URL = f"{SUPABASE_URL}/rest/v1/proceeding_source_records"


def get_source_records():
    all_records = []

    page_size = 1000
    offset = 0

    while True:

        response = requests.get(
            SOURCE_URL,
            headers=HEADERS,
            params={
                "select": "*",
                "order": "created_at.asc",
                "limit": page_size,
                "offset": offset,
            },
            timeout=120,
        )

        response.raise_for_status()

        records = response.json()

        if not records:
            break

        all_records.extend(records)

        print(
            f"Loaded {len(all_records)} MIRA source records..."
        )

        if len(records) < page_size:
            break

        offset += page_size

    return all_records


def get_existing_proceedings():
    response = requests.get(
        PROCEEDING_URL,
        headers=HEADERS,
        params={
            "select": "id,case_number",
            "limit": 5000,
        },
        timeout=120,
    )

    response.raise_for_status()

    rows = response.json()

    return {
        (row.get("case_number") or "").strip().lower(): row["id"]
        for row in rows
        if row.get("case_number")
    }


print("=" * 80)
print("CURA — MIRA PROCEEDING IMPORT")
print("=" * 80)


source_records = get_source_records()

print(f"MIRA source records: {len(source_records)}")


existing = get_existing_proceedings()

print(f"Existing proceedings: {len(existing)}")


created = 0
updated = 0
linked = 0
failed = 0


for index, source in enumerate(source_records, start=1):

    case_number = (
        source.get("case_number") or ""
    ).strip()

    if not case_number:

        print(
            f"[{index}/{len(source_records)}] "
            "SKIPPED — no case number"
        )

        continue


    key = case_number.lower()


    try:

        # --------------------------------------------------
        # Create proceeding if it doesn't exist
        # --------------------------------------------------

        if key not in existing:

            proceeding = {
                "legal_matter_id": None,

                "court": (
                    source.get("court")
                    or "Unknown"
                ),

                "case_number": case_number,

                "filed_date": (
                    source.get("filed_date")
                    or None
                ),

                "judgment_date": None,

                "status": (
                    source.get("status")
                    or None
                ),

                "outcome": (
                    source.get("remarks")
                    or None
                ),

                "sort_order": 1,

                "official_url": (
                    source.get("mira_url")
                    or None
                ),
            }


            response = requests.post(
                PROCEEDING_URL,
                headers=HEADERS,
                json=proceeding,
                timeout=60,
            )


            if not response.ok:

                print(
                    f"\nERROR creating {case_number}"
                )

                print(response.text)

                response.raise_for_status()


            created += 1

            # Retrieve the newly-created proceeding
            lookup_response = requests.get(
                PROCEEDING_URL,
                headers=HEADERS,
                params={
                    "select": "id",
                    "case_number": f"eq.{case_number}",
                    "limit": "1",
                },
                timeout=60,
            )

            lookup_response.raise_for_status()

            result = lookup_response.json()

            if not result:

                raise RuntimeError(
                    f"Could not retrieve proceeding "
                    f"after creation: {case_number}"
                )

            proceeding_id = result[0]["id"]

            existing[key] = proceeding_id

            print(
                f"[{index}/{len(source_records)}] "
                f"CREATED — {case_number}"
            )


        else:

            proceeding_id = existing[key]

            updated += 1

            print(
                f"[{index}/{len(source_records)}] "
                f"EXISTS — {case_number}"
            )


        # --------------------------------------------------
        # Link source record to proceeding
        # --------------------------------------------------

        link = {
            "proceeding_id": proceeding_id,

            "source_record_id": source["id"],

            "relationship_type": "primary",

            "confidence": "confirmed",

            "evidence": (
                "Proceeding created from the corresponding "
                "MIRA source register record using the "
                "MIRA case number."
            ),
        }


        link_response = requests.post(
            LINK_URL,
            headers={
                **HEADERS,
                "Prefer": (
                    "resolution=ignore-duplicates,"
                    "return=minimal"
                ),
            },
            json=link,
            timeout=60,
        )


        if not link_response.ok:

            print(
                f"ERROR linking source record "
                f"to {case_number}"
            )

            print(link_response.text)

            link_response.raise_for_status()


        linked += 1


    except Exception as error:

        failed += 1

        print(
            f"FAILED — {case_number}: {error}"
        )


print()
print("=" * 80)
print("PROCEEDING IMPORT COMPLETE")
print("=" * 80)

print(
    f"Source records processed: "
    f"{len(source_records)}"
)

print(f"Proceedings created: {created}")

print(f"Existing proceedings: {updated}")

print(f"Source links created/confirmed: {linked}")

print(f"Failed: {failed}")

print("=" * 80)