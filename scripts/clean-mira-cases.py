import json
import re
from collections import defaultdict
from datetime import datetime


INPUT_FILE = "mira_cases.json"
OUTPUT_FILE = "mira_cases_cleaned.json"


def normalize(value):
    if not value:
        return ""

    return " ".join(value.strip().lower().split())


def extract_judgment_date(text):
    if not text:
        return None

    patterns = [
        r"judgement passed\s+(\d{1,2}\s+[A-Za-z]{3}\s+\d{4})",
        r"judgment passed\s+(\d{1,2}\s+[A-Za-z]{3}\s+\d{4})",
    ]

    for pattern in patterns:
        match = re.search(pattern, text, re.IGNORECASE)

        if match:
            try:
                return datetime.strptime(
                    match.group(1),
                    "%d %b %Y"
                )
            except ValueError:
                pass

    return None


def record_score(record):
    score = 0

    status = normalize(record.get("status"))
    remarks = normalize(record.get("remarks"))

    # A judgment is more informative than an ongoing status.
    if "judgement passed" in status or "judgment passed" in status:
        score += 100

    # Prefer records with remarks.
    if remarks:
        score += 20

    # Prefer records with a filed date.
    if record.get("filed_date"):
        score += 5

    # Prefer records with a case number.
    if record.get("case_number"):
        score += 5

    # More recent judgment gets additional weight.
    judgment_date = extract_judgment_date(
        record.get("status", "")
    )

    if judgment_date:
        score += int(
            judgment_date.strftime("%Y%m%d")
        )

    return score


def merge_duplicate_records(records):
    """
    Consolidate multiple MIRA entries representing
    the same title + court + case number.
    """

    # Highest-quality/current record first.
    records = sorted(
        records,
        key=record_score,
        reverse=True
    )

    best = records[0].copy()

    # Preserve useful values from the other records
    # if the selected record has blanks.
    for record in records[1:]:

        if not best.get("filed_date") and record.get("filed_date"):
            best["filed_date"] = record["filed_date"]

        if not best.get("claim") and record.get("claim"):
            best["claim"] = record["claim"]

        if not best.get("status") and record.get("status"):
            best["status"] = record["status"]

        if not best.get("remarks") and record.get("remarks"):
            best["remarks"] = record["remarks"]

    return best


# --------------------------------------------------
# Load extracted MIRA data
# --------------------------------------------------

with open(
    INPUT_FILE,
    "r",
    encoding="utf-8"
) as file:
    data = json.load(file)


print("=" * 80)
print("MIRA CASE CLEANING")
print("=" * 80)

print(f"Input records: {len(data)}")


# --------------------------------------------------
# Group records
# --------------------------------------------------

groups = defaultdict(list)

for record in data:

    key = (
        normalize(record.get("title")),
        normalize(record.get("court")),
        normalize(record.get("case_number")),
    )

    groups[key].append(record)


print(f"Unique case groups: {len(groups)}")


# --------------------------------------------------
# Consolidate
# --------------------------------------------------

cleaned_cases = []

duplicate_groups = 0

for key, records in groups.items():

    if len(records) > 1:

        duplicate_groups += 1

        cleaned = merge_duplicate_records(records)

    else:

        cleaned = records[0]

    cleaned_cases.append(cleaned)


# --------------------------------------------------
# Sort cases
# --------------------------------------------------

cleaned_cases.sort(
    key=lambda x: (
        x.get("filed_date") or "0000-00-00",
        x.get("title") or ""
    ),
    reverse=True
)


# --------------------------------------------------
# Save
# --------------------------------------------------

with open(
    OUTPUT_FILE,
    "w",
    encoding="utf-8"
) as file:

    json.dump(
        cleaned_cases,
        file,
        ensure_ascii=False,
        indent=2
    )


print()
print("=" * 80)
print("CLEANING COMPLETE")
print("=" * 80)

print(f"Original records: {len(data)}")
print(f"Duplicate groups consolidated: {duplicate_groups}")
print(f"Cleaned records: {len(cleaned_cases)}")
print(f"Saved to: {OUTPUT_FILE}")

print("=" * 80)