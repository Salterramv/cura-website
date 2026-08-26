#!/usr/bin/env python3

import json
import os
import re
import sys
import uuid
from pathlib import Path
from urllib.request import Request, urlopen
from urllib.error import HTTPError

ROOT = Path(__file__).resolve().parents[1]
DATA = ROOT / "data" / "accounting-source.json"
IMGDIR = ROOT / "public" / "education" / "accounting" / "illustrations"

url = os.environ.get("SUPABASE_URL")
key = os.environ.get("SUPABASE_SERVICE_ROLE_KEY")

if not url or not key:
    raise SystemExit(
        "Set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY first."
    )

data = json.loads(DATA.read_text(encoding="utf-8"))

topics = data.get("topics", [])

if len(topics) != 34:
    raise SystemExit(
        f"Expected 34 revised Accounting topics; found {len(topics)}."
    )


def api(path, method, payload=None):
    body = json.dumps(
        payload if payload is not None else {},
        ensure_ascii=False,
    ).encode("utf-8")

    req = Request(
        url.rstrip("/") + "/rest/v1/" + path,
        data=body,
        method=method,
        headers={
            "apikey": key,
            "Authorization": f"Bearer {key}",
            "Content-Type": "application/json",
            "Prefer": "return=minimal",
        },
    )

    try:
        with urlopen(req) as response:
            return response.read()

    except HTTPError as error:
        message = error.read().decode(
            "utf-8",
            "replace",
        )

        raise RuntimeError(
            f"{method} {path}: "
            f"{error.code} {message}"
        ) from error


def get_existing_accounting_topics():
    req = Request(
        url.rstrip("/")
        + "/rest/v1/education_topics"
        + "?select=id,slug,title"
        + "&category=eq.Accounting",
        method="GET",
        headers={
            "apikey": key,
            "Authorization": f"Bearer {key}",
        },
    )

    with urlopen(req) as response:
        return json.loads(
            response.read().decode("utf-8")
        )


# ------------------------------------------------------------
# SAFETY CHECK
# ------------------------------------------------------------

existing = get_existing_accounting_topics()

if existing:
    raise SystemExit(
        f"{len(existing)} Accounting topic rows already exist. "
        "Import stopped to prevent duplication."
    )


# ------------------------------------------------------------
# ILLUSTRATION CHECK
# ------------------------------------------------------------

images = sorted(
    p.name
    for p in IMGDIR.glob("*")
    if p.is_file()
)

image_by_topic = {}

for name in images:
    match = re.match(
        r"(.+)-p(\d+)-img(\d+)\.(png|jpg|jpeg|webp)$",
        name,
        re.I,
    )

    if match:
        image_by_topic.setdefault(
            match.group(1),
            [],
        ).append(name)


for topic in topics:

    illustration_blocks = [
        block
        for section in topic.get("sections", [])
        for block in section.get("blocks", [])
        if block.get("type") == "illustration"
    ]

    actual_images = image_by_topic.get(
        topic["slug"],
        [],
    )

    if len(illustration_blocks) != len(actual_images):
        raise SystemExit(
            "Illustration mismatch for "
            f"{topic['slug']}: "
            f"{len(illustration_blocks)} source illustrations "
            f"vs {len(actual_images)} image files."
        )


# ------------------------------------------------------------
# BUILD ROWS
# ------------------------------------------------------------

topic_rows = []
section_rows = []
block_rows = []
item_rows = []
table_rows = []
asset_rows = []


for topic_index, topic in enumerate(topics, 1):

    topic_id = str(uuid.uuid4())

    topic_rows.append({
        "id": topic_id,
        "slug": topic["slug"],
        "title": topic["title"],
        "standard": None,
        "description": (
            "Imported from revised accounting "
            "source materials."
        ),
        "category": "Accounting",
        "display_order": topic_index,
        "is_published": True,
        "status": "published",
        "version": 1,
        "visual_theme": "accounting",
    })

    image_index = 0

    for section_index, section in enumerate(
        topic.get("sections", [])
    ):

        section_id = str(uuid.uuid4())

        section_rows.append({
            "id": section_id,
            "topic_id": topic_id,
            "title": section["title"],
            "section_type": "section",
            "display_order": section_index,
            "is_published": True,
            "version": 1,
            "presentation": {
                "source_pages": section.get(
                    "source_pages",
                    [],
                ),
            },
        })

        for block_index, source_block in enumerate(
            section.get("blocks", [])
        ):

            block_id = str(uuid.uuid4())

            source_type = source_block.get(
                "type",
                "text",
            )

            position = {
                "top": source_block.get(
                    "order",
                    0,
                ),
                "left": source_block.get(
                    "left",
                    0,
                ),
                "width": source_block.get(
                    "width",
                    0,
                ),
            }

            paragraphs = source_block.get(
                "paragraphs",
                [],
            )

            # ------------------------------------------------
            # TABLE
            # ------------------------------------------------

            if source_type == "table":

                block_rows.append({
                    "id": block_id,
                    "section_id": section_id,
                    "block_type": "table",
                    "title": None,
                    "content": "",
                    "display_order": block_index,
                    "is_published": True,
                    "version": 1,
                    "presentation": {
                        "source_position": position,
                    },
                })

                rows = source_block.get(
                    "rows",
                    [],
                )

                table_rows.append({
                    "block_id": block_id,
                    "columns": [],
                    "rows": rows,
                    "caption": None,
                })

                continue

            # ------------------------------------------------
            # ILLUSTRATION
            # ------------------------------------------------

            if source_type == "illustration":

                block_rows.append({
                    "id": block_id,
                    "section_id": section_id,
                    "block_type": "image",
                    "title": (
                        source_block.get("name")
                        or None
                    ),
                    "content": "",
                    "display_order": block_index,
                    "is_published": True,
                    "version": 1,
                    "presentation": {
                        "source_position": position,
                        "source_illustration": source_block,
                    },
                })

                topic_images = image_by_topic[
                    topic["slug"]
                ]

                image_name = topic_images[
                    image_index
                ]

                image_index += 1

                asset_rows.append({
                    "block_id": block_id,
                    "asset_type": "image",
                    "url": (
                        "/education/accounting/"
                        "illustrations/"
                        + image_name
                    ),
                    "alt_text": topic["title"],
                    "caption": None,
                    "display_order": 0,
                })

                continue

            # ------------------------------------------------
            # NORMAL SOURCE CONTENT
            # ------------------------------------------------

            content = "\n".join(
                paragraph.get(
                    "text",
                    "",
                )
                for paragraph in paragraphs
            )

            block_rows.append({
                "id": block_id,
                "section_id": section_id,
                "block_type": "paragraph",
                "title": None,
                "content": content,
                "display_order": block_index,
                "is_published": True,
                "version": 1,
                "presentation": {
                    "paragraphs": paragraphs,
                    "source_position": position,
                },
            })

            # Preserve individual source paragraphs/items.
            for item_index, paragraph in enumerate(
                paragraphs
            ):

                text = paragraph.get(
                    "text",
                    "",
                )

                if not isinstance(text, str):
                    continue

                if not text.strip():
                    continue

                item_rows.append({
                    "id": str(uuid.uuid4()),
                    "block_id": block_id,
                    "content": text,
                    "item_type": "item",
                    "display_order": item_index,
                })


# ------------------------------------------------------------
# INSERT
# ------------------------------------------------------------

def chunks(rows, size=100):

    for index in range(
        0,
        len(rows),
        size,
    ):
        yield rows[index:index + size]


insert_sets = [
    (
        topic_rows,
        "education_topics",
    ),
    (
        section_rows,
        "education_sections",
    ),
    (
        block_rows,
        "education_content_blocks",
    ),
    (
        item_rows,
        "education_block_items",
    ),
    (
        table_rows,
        "education_tables",
    ),
    (
        asset_rows,
        "education_assets",
    ),
]


for rows, table in insert_sets:

    for chunk in chunks(rows):

        api(
            table,
            "POST",
            chunk,
        )

    print(
        f"Imported {len(rows)} rows into {table}"
    )


print()
print("========================================")
print("REVISED ACCOUNTING IMPORT COMPLETE")
print("========================================")
print(f"Topics:        {len(topic_rows)}")
print(f"Sections:      {len(section_rows)}")
print(f"Blocks:        {len(block_rows)}")
print(f"Block items:   {len(item_rows)}")
print(f"Tables:        {len(table_rows)}")
print(f"Illustrations: {len(asset_rows)}")
print("========================================")
