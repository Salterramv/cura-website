from playwright.sync_api import sync_playwright
from datetime import datetime
import json
import re
import time

BASE_URL = "https://www.mira.gov.mv/LegalCases/FilterResult?pageNumber={}"

TOTAL_PAGES = 128


def clean_text(text):
    return " ".join(text.split())


def extract_filed_date(text):
    marker = "Filed Date:"

    if marker not in text:
        return None

    date_text = text.split(marker, 1)[1].strip()

    try:
        return datetime.strptime(date_text, "%d %b %Y").date().isoformat()
    except ValueError:
        return None


def remove_filed_date(text):
    marker = "Filed Date:"

    if marker in text:
        return text.split(marker, 1)[0].strip()

    return text.strip()


def split_court_and_case_number(text):
    text = clean_text(text)

    known_courts = [
        "Tax Appeal Tribunal",
        "Supreme Court",
        "High Court",
        "Civil Court",
        "Magistrate Court",
    ]

    for court in known_courts:
        if text.startswith(court):
            case_number = text[len(court):].strip()
            return court, case_number

    return text, ""


def extract_page(page, page_number):
    url = BASE_URL.format(page_number)

    print(f"\nProcessing page {page_number}/{TOTAL_PAGES}...")
    print(url)

    page.goto(
        url,
        wait_until="domcontentloaded",
        timeout=60000
    )

    page.wait_for_timeout(2000)

    rows = page.locator("table tbody tr")

    row_count = rows.count()

    print(f"Found {row_count} table rows.")

    page_cases = []

    for i in range(row_count):
        cells = rows.nth(i).locator("td")

        if cells.count() < 5:
            continue

        case_name_raw = clean_text(cells.nth(0).inner_text())
        court_raw = clean_text(cells.nth(1).inner_text())
        claim = clean_text(cells.nth(2).inner_text())
        status = clean_text(cells.nth(3).inner_text())
        remarks = clean_text(cells.nth(4).inner_text())

        title = remove_filed_date(case_name_raw)
        filed_date = extract_filed_date(case_name_raw)

        court, case_number = split_court_and_case_number(court_raw)

        case = {
            "title": title,
            "filed_date": filed_date,
            "court": court,
            "case_number": case_number,
            "claim": claim,
            "status": status,
            "remarks": remarks,
            "mira_url": url,
        }

        page_cases.append(case)

    return page_cases


with sync_playwright() as p:

    browser = p.chromium.launch(headless=True)

    context = browser.new_context(
        user_agent=(
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) "
            "AppleWebKit/537.36 (KHTML, like Gecko) "
            "Chrome/151.0.0.0 Safari/537.36"
        ),
        viewport={"width": 1366, "height": 768},
    )

    page = context.new_page()

    all_cases = []

    for page_number in range(1, TOTAL_PAGES + 1):

        try:
            page_cases = extract_page(page, page_number)

            all_cases.extend(page_cases)

            print(
                f"Total cases collected so far: {len(all_cases)}"
            )

            # Small delay between pages
            time.sleep(1)

        except Exception as error:

            print(
                f"\nERROR ON PAGE {page_number}:"
            )

            print(error)

            print(
                "\nStopping extraction so we don't create an incomplete dataset."
            )

            browser.close()
            raise

    browser.close()


# Save the complete MIRA dataset locally
output_file = "mira_cases.json"

with open(
    output_file,
    "w",
    encoding="utf-8"
) as file:

    json.dump(
        all_cases,
        file,
        ensure_ascii=False,
        indent=2
    )


print("\n" + "=" * 80)
print("MIRA EXTRACTION COMPLETE")
print("=" * 80)

print(f"Total cases extracted: {len(all_cases)}")
print(f"Saved to: {output_file}")

print("=" * 80)