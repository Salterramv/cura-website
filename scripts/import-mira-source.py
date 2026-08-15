import json
import os
import requests
from dotenv import load_dotenv

load_dotenv(".env.local")

INPUT_FILE = "mira_cases_cleaned.json"

SUPABASE_URL = os.environ.get("NEXT_PUBLIC_SUPABASE_URL")
SUPABASE_KEY = os.environ.get("SUPABASE_SERVICE_ROLE_KEY")

if not SUPABASE_URL:
    raise RuntimeError("NEXT_PUBLIC_SUPABASE_URL is missing.")

if not SUPABASE_KEY:
    raise RuntimeError("SUPABASE_SERVICE_ROLE_KEY is missing.")

API_URL = f"{SUPABASE_URL}/rest/v1/mira_source_cases"

HEADERS = {
    "apikey": SUPABASE_KEY,
    "Authorization": f"Bearer {SUPABASE_KEY}",
    "Content-Type": "application/json",
    "Prefer": "resolution=merge-duplicates,return=minimal",
}


def get_page_number(url):
    if not url:
        return None

    try:
        return int(url.split("pageNumber=")[-1])
    except (ValueError, TypeError):
        return None


with open(INPUT_FILE, "r", encoding="utf-8") as file:
    cases = json.load(file)

print("=" * 80)
print("CURA — MIRA SOURCE CASE IMPORT")
print("=" * 80)
print(f"Records loaded: {len(cases)}")


# Convert the JSON records to the source-table structure
records = []

for case in cases:
    records.append({
        "title": case.get("title") or None,
        "filed_date": case.get("filed_date") or None,
        "court": case.get("court") or None,
        "case_number": case.get("case_number") or None,
        "claim": case.get("claim") or None,
        "status": case.get("status") or None,
        "remarks": case.get("remarks") or None,
        "mira_url": case.get("mira_url") or None,
        "source_page": get_page_number(case.get("mira_url")),
    })


# Insert in batches
BATCH_SIZE = 100

inserted = 0

for start in range(0, len(records), BATCH_SIZE):

    batch = records[start:start + BATCH_SIZE]

    response = requests.post(
        API_URL,
        headers=HEADERS,
        json=batch,
        timeout=120,
    )

    if not response.ok:
        print("\nERROR:")
        print(response.status_code)
        print(response.text)
        response.raise_for_status()

    inserted += len(batch)

    print(
        f"Imported {inserted}/{len(records)}"
    )


print()
print("=" * 80)
print("SOURCE IMPORT COMPLETE")
print("=" * 80)
print(f"Records processed: {len(records)}")
print("=" * 80)