"use client"

import Link from "next/link"
import { useEffect, useMemo, useState } from "react"
import { useParams } from "next/navigation"

import CuraHeader from "@/components/CuraHeader"
import CuraFooter from "@/components/CuraFooter"
import AccountingSourceIllustration from "@/components/education/AccountingSourceIllustration"
import { createClient } from "@/lib/supabase/client"

/* ============================================================
   TYPES
   ============================================================ */

type Topic = {
  id: string
  slug: string
  title: string
  standard: string | null
  description: string | null
  source_reference: string | null
}

type Section = {
  id: string
  title: string
  section_type: string
  display_order: number
  presentation: Record<string, unknown> | null
}

type Block = {
  id: string
  section_id: string
  block_type: string
  title: string | null
  content: string | null
  display_order: number
  presentation: Record<string, unknown> | null
}

type Item = {
  id: string
  block_id: string
  content: string
  item_type: string | null
  display_order: number
}

type Quiz = {
  id: string
  title: string
  description: string | null
  time_limit_seconds: number
  is_published: boolean
}

type EducationTable = {
  id: string
  block_id: string
  columns: unknown
  rows: unknown
  caption: string | null
}

type EducationAsset = {
  id: string
  block_id: string
  asset_type: string
  url: string
  alt_text: string | null
  caption: string | null
  display_order: number
}

type ContentBlock = {
  block: Block
  items: Item[]
  tables: EducationTable[]
  assets: EducationAsset[]
}

/* ============================================================
   SOURCE TEXT NORMALISATION
   ============================================================ */

function normalizeSourceText(value: string) {
  return value
    .replace(/\\t/g, "\t")
    .replace(/\u00a0/g, " ")
    .replace(/\r\n/g, "\n")
    .replace(/\r/g, "\n")
    .trim()
}

/* ============================================================
   SOURCE LABEL FILTERING
   ============================================================ */

/*
 * These are presentation/lecture labels found in the source
 * material. They are NOT learning content and must never appear
 * on CURA.
 */
function isSourceNoise(value: string) {
  const text = normalizeSourceText(value)

  if (!text) return true

  const normalized = text
    .toLowerCase()
    .replace(/\s+/g, " ")
    .trim()

  const exactNoise = new Set([
    "sbr new knowledge",
    "fr knowledge",
    "f7 knowledge",
    "tuu",
    "tuu 1",
    "tuu 2",
    "tuu 3",
    "tuu 4",
    "tuu 5",
    "tuu 6",
    "tuu 7",
    "tuu 8",
    "tuu 9",
    "tuu 10",
    "tuu 11",
    "tuu 12",
    "lecture",
    "lecture notes",
    "lecture note",
    "student notes",
    "students notes",
    "chapter notes",
  ])

  if (exactNoise.has(normalized)) {
    return true
  }

  /*
   * Examples:
   * TUU 7
   * TUU 9
   * F7 Knowledge
   * SBR: Chapter 17
   */
  if (/^(tuu|tuu\s*\d+)\b/i.test(normalized)) {
    return true
  }

  if (/^f7\s+knowledge\b/i.test(normalized)) {
    return true
  }

  if (/^sbr\s+new\s+knowledge\b/i.test(normalized)) {
    return true
  }

  if (/^fr\s+knowledge\b/i.test(normalized)) {
    return true
  }

  if (/^sbr\s*:/i.test(normalized)) {
    return true
  }

  /*
   * Source-page labels such as:
   * TUU 11 HOMEWORK
   * TUU 13
   */
  if (/^tuu\b.*\b(homework|exercise|question)\b/i.test(normalized)) {
    return true
  }

  return false
}

/* ============================================================
   HEADING NORMALISATION
   ============================================================ */

function normalizeHeading(value: string) {
  return normalizeSourceText(value)
    .toLowerCase()
    .replace(/[–—]/g, "-")
    .replace(/\s+/g, " ")
    .trim()
}

function sameHeading(a: string, b: string) {
  return normalizeHeading(a) === normalizeHeading(b)
}

/* ============================================================
   MARKER DETECTION
   ============================================================ */

function isBulletMarker(value: string) {
  return /^[•●▪◦‣·\-]\s*$/.test(
    normalizeSourceText(value)
  )
}

function isNumberMarker(value: string) {
  return /^(?:\d+\.|\(\d+\)|\d+\))\s*$/.test(
    normalizeSourceText(value)
  )
}

function isLetterMarker(value: string) {
  return /^[a-zA-Z][.)]\s*$/.test(
    normalizeSourceText(value)
  )
}

/*
 * Removes a marker that has accidentally been stored together
 * with its text.
 */
function splitInlineMarker(value: string) {
  const text = normalizeSourceText(value)

  const numbered = text.match(
    /^(\d+\.|\(\d+\)|\d+\))\s+(.+)$/
  )

  if (numbered) {
    return {
      marker: numbered[1],
      text: numbered[2].trim(),
      type: "numbered" as const,
    }
  }

  const bullet = text.match(
    /^[•●▪◦‣·\-]\s+(.+)$/
  )

  if (bullet) {
    return {
      marker: "•",
      text: bullet[1].trim(),
      type: "bullet" as const,
    }
  }

  const letter = text.match(
    /^([a-zA-Z][.)])\s+(.+)$/
  )

  if (letter) {
    return {
      marker: letter[1],
      text: letter[2].trim(),
      type: "letter" as const,
    }
  }

  return null
}

/* ============================================================
   SOURCE ITEM CLEANING
   ============================================================ */

type RenderItem = {
  id: string
  content: string
  type: "paragraph" | "bullet" | "numbered" | "letter"
}

/*
 * This is the most important part of the renderer.
 *
 * The imported source sometimes stores:
 *
 *   item 1 = "•"
 *   item 2 = "First point..."
 *
 * Instead of displaying:
 *
 *   •
 *   First point...
 *
 * we convert it to:
 *
 *   • First point...
 */
function prepareItems(
  items: Item[],
  sectionTitle: string,
  blockTitle: string
): RenderItem[] {
  const output: RenderItem[] = []

  const sourceItems = [...items]
    .sort(
      (a, b) =>
        a.display_order - b.display_order
    )
    .map((item) => ({
      ...item,
      content: normalizeSourceText(
        item.content || ""
      ),
    }))
    .filter(
      (item) =>
        item.content &&
        !isSourceNoise(item.content)
    )

  let pendingMarker:
    | "bullet"
    | "numbered"
    | "letter"
    | null = null

  for (const item of sourceItems) {
    let value = item.content

    /*
     * Marker-only item.
     */
    if (isBulletMarker(value)) {
      pendingMarker = "bullet"
      continue
    }

    if (isNumberMarker(value)) {
      pendingMarker = "numbered"
      continue
    }

    if (isLetterMarker(value)) {
      pendingMarker = "letter"
      continue
    }

    /*
     * If a previous item was only a marker, attach it to
     * the current text.
     */
    if (pendingMarker) {
      output.push({
        id: item.id,
        content: value,
        type: pendingMarker,
      })

      pendingMarker = null
      continue
    }

    /*
     * Inline markers.
     */
    const inline = splitInlineMarker(value)

    if (inline) {
      output.push({
        id: item.id,
        content: inline.text,
        type: inline.type,
      })

      continue
    }

    /*
     * Remove duplicated section/block headings when the same
     * heading has already been rendered structurally.
     */
    if (
      sameHeading(value, sectionTitle) ||
      (blockTitle &&
        sameHeading(value, blockTitle))
    ) {
      continue
    }

    output.push({
      id: item.id,
      content: value,
      type: "paragraph",
    })
  }

  return output
}

/* ============================================================
   BLOCK TYPE
   ============================================================ */

function getBlockType(block: Block) {
  const type = (
    block.block_type || ""
  )
    .toLowerCase()
    .trim()

  if (
    type.includes("illustration") ||
    type === "image"
  ) {
    return "illustration"
  }

  if (
    type.includes("example")
  ) {
    return "example"
  }

  if (
    type.includes("bullet")
  ) {
    return "bullet"
  }

  if (
    type.includes("number") ||
    type.includes("ordered")
  ) {
    return "numbered"
  }

  if (type === "table") {
    return "table"
  }

  return "paragraph"
}

/* ============================================================
   SOURCE SPECIAL CONTENT
   ============================================================ */

function isJournalHeader(value: string) {
  return /^journal\s*\(/i.test(
    normalizeSourceText(value)
  )
}

function isJournalRow(value: string) {
  const text =
    normalizeSourceText(value)

  return (
    /^(Dr|Cr)\b/i.test(text) &&
    /\bX\s*$/i.test(text)
  )
}

function isJournalAmountHeader(value: string) {
  const text =
    normalizeSourceText(value)

  return (
    /^\$\s+\$/.test(text) ||
    text === "$ $" ||
    text === "$   $"
  )
}

function renderJournalRow(value: string) {
  const text =
    normalizeSourceText(value)

  const match = text.match(
    /^(Dr|Cr)\s+(.*?)(?:\s+)(X)\s*$/i
  )

  if (!match) {
    return null
  }

  const type = match[1]
  const account = match[2]
  const amount = match[3]

  const debit =
    type.toLowerCase() === "dr"

  return (
    <div
      className="
        grid
        grid-cols-[minmax(0,1fr)_120px_120px]
        items-start
        gap-2
        py-1
        text-base
        leading-8
        text-[#102A5F]
      "
    >
      <div>
        <span
          className={
            debit
              ? "font-bold text-[#00A651]"
              : "font-bold text-[#D00000]"
          }
        >
          {type}
        </span>{" "}
        {account}
      </div>

      <div className="text-center">
        {debit ? amount : ""}
      </div>

      <div className="text-center">
        {!debit ? amount : ""}
      </div>
    </div>
  )
}

/* ============================================================
   SOURCE TEXT
   ============================================================ */

function SourceText({
  children,
  className = "",
}: {
  children: string
  className?: string
}) {
  return (
    <div
      className={[
        "whitespace-pre-wrap",
        "break-words",
        "text-[16px]",
        "leading-8",
        "text-[#102A5F]",
        className,
      ].join(" ")}
    >
      {children}
    </div>
  )
}

/* ============================================================
   SOURCE ITEM RENDERER
   ============================================================ */

function RenderPreparedItem({
  item,
}: {
  item: RenderItem
}) {
  const value =
    normalizeSourceText(item.content)

  if (!value) {
    return null
  }

  /*
   * Journal rows are not ordinary list items.
   */
  if (
    isJournalRow(value)
  ) {
    return (
      <div key={item.id}>
        {renderJournalRow(value)}
      </div>
    )
  }

  /*
   * Journal heading.
   */
  if (
    isJournalHeader(value)
  ) {
    return (
      <div
        key={item.id}
        className="
          mt-5
          mb-3
          font-bold
          italic
          underline
          decoration-2
          underline-offset-4
          text-[#111111]
        "
      >
        {value}
      </div>
    )
  }

  /*
   * Numbered item.
   */
  if (
    item.type === "numbered"
  ) {
    return (
      <div
        key={item.id}
        className="
          grid
          grid-cols-[44px_minmax(0,1fr)]
          gap-2
          items-start
          py-1
        "
      >
        <span className="font-semibold text-[#168BC4]">
          {value.match(
            /^\d+|/
          )?.[0]
            ? `${value.match(/^\d+/)?.[0] || ""}.`
            : ""}
        </span>

        <span className="text-[16px] leading-8 text-[#102A5F]">
          {value}
        </span>
      </div>
    )
  }

  /*
   * Lettered item.
   */
  if (
    item.type === "letter"
  ) {
    return (
      <div
        key={item.id}
        className="
          grid
          grid-cols-[36px_minmax(0,1fr)]
          gap-2
          items-start
          py-1
        "
      >
        <span className="font-semibold text-[#168BC4]">
          •
        </span>

        <span className="text-[16px] leading-8 text-[#102A5F]">
          {value}
        </span>
      </div>
    )
  }

  /*
   * Genuine bullet.
   */
  if (
    item.type === "bullet"
  ) {
    return (
      <div
        key={item.id}
        className="
          grid
          grid-cols-[20px_minmax(0,1fr)]
          gap-2
          items-start
          py-1
        "
      >
        <span
          className="
            mt-[13px]
            h-1.5
            w-1.5
            rounded-full
            bg-[#168BC4]
          "
        />

        <span className="text-[16px] leading-8 text-[#102A5F]">
          {value}
        </span>
      </div>
    )
  }

  return (
    <SourceText key={item.id}>
      {value}
    </SourceText>
  )
}

/* ============================================================
   TABLE
   ============================================================ */

function RenderTable({
  table,
}: {
  table: EducationTable
}) {
  const columns =
    Array.isArray(table.columns)
      ? table.columns
      : []

  const rows =
    Array.isArray(table.rows)
      ? table.rows
      : []

  return (
    <div
      className="
        my-7
        overflow-x-auto
        rounded-2xl
        border
        border-slate-200
        bg-white
      "
    >
      <table className="w-full border-collapse text-sm">
        {columns.length > 0 && (
          <thead>
            <tr>
              {columns.map(
                (column, index) => (
                  <th
                    key={index}
                    className="
                      border-b
                      border-slate-200
                      bg-[#071B49]
                      px-4
                      py-3
                      text-left
                      font-bold
                      text-white
                    "
                  >
                    {String(
                      column ?? ""
                    )}
                  </th>
                )
              )}
            </tr>
          </thead>
        )}

        <tbody>
          {rows.map(
            (row, rowIndex) => {
              const cells =
                Array.isArray(row)
                  ? row
                  : row &&
                      typeof row ===
                        "object"
                    ? Object.values(
                        row
                      )
                    : [row]

              return (
                <tr
                  key={rowIndex}
                >
                  {cells.map(
                    (
                      cell,
                      cellIndex
                    ) => (
                      <td
                        key={
                          cellIndex
                        }
                        className="
                          border-b
                          border-slate-100
                          px-4
                          py-3
                          align-top
                          text-[#102A5F]
                        "
                      >
                        {String(
                          cell ??
                            ""
                        )}
                      </td>
                    )
                  )}
                </tr>
              )
            }
          )}
        </tbody>
      </table>

      {table.caption && (
        <div className="border-t border-slate-100 px-4 py-3 text-xs text-slate-500">
          {table.caption}
        </div>
      )}
    </div>
  )
}

/* ============================================================
   ILLUSTRATION
   ============================================================ */

function RenderAsset({
  asset,
}: {
  asset: EducationAsset
}) {
  return (
    <figure
      className="
        my-8
        overflow-hidden
        rounded-2xl
        border
        border-[#168BC4]/20
        bg-white
      "
    >
      <div className="bg-[#F4FAFD] p-4 md:p-6">
        <img
          src={asset.url}
          alt={
            asset.alt_text ||
            "Accounting illustration"
          }
          className="
            mx-auto
            block
            h-auto
            max-w-full
            object-contain
          "
          loading="lazy"
        />
      </div>

      {asset.caption && (
        <figcaption
          className="
            border-t
            border-slate-100
            px-5
            py-3
            text-center
            text-xs
            text-slate-500
          "
        >
          {asset.caption}
        </figcaption>
      )}
    </figure>
  )
}

/* ============================================================
   BLOCK RENDERER
   ============================================================ */

function RenderSourceBlock({
  contentBlock,
}: {
  contentBlock: ContentBlock
}) {
  const {
    block,
    items,
    tables,
    assets,
  } = contentBlock

  const blockType =
    getBlockType(block)

  const rawTitle =
    normalizeSourceText(
      block.title || ""
    )

  const rawContent =
    normalizeSourceText(
      block.content || ""
    )

  const preparedItems =
    prepareItems(
      items,
      "",
      rawTitle
    )

  /*
   * Do not repeat block titles that are
   * merely source slide headings.
   */
  const showTitle =
    rawTitle &&
    !isSourceNoise(rawTitle)

  /*
   * Do not repeat block content if it
   * exactly duplicates the block title.
   */
  const showContent =
    rawContent &&
    !isSourceNoise(rawContent) &&
    !sameHeading(
      rawContent,
      rawTitle
    )

  /*
   * ------------------------------------------------------------
   * ILLUSTRATION
   * ------------------------------------------------------------
   */

  if (
    blockType ===
      "illustration" ||
    assets.length > 0
  ) {
    return (
      <div
        className="
          overflow-hidden
          rounded-2xl
          border
          border-[#168BC4]/25
          bg-gradient-to-br
          from-[#F4FAFD]
          to-white
          p-5
          md:p-7
        "
      >
        {showTitle && (
          <div className="mb-5">
            <div className="flex items-center gap-3">
              <span
                className="
                  h-2
                  w-2
                  rounded-full
                  bg-[#168BC4]
                "
              />

              <span
                className="
                  text-xs
                  font-bold
                  uppercase
                  tracking-[0.2em]
                  text-[#168BC4]
                "
              >
                Illustration
              </span>
            </div>

            <h3
              className="
                mt-2
                text-xl
                font-semibold
                leading-7
                text-[#071B49]
              "
            >
              {rawTitle}
            </h3>
          </div>
        )}

        {showContent && (
          <SourceText className="mb-5">
            {rawContent}
          </SourceText>
        )}

        {preparedItems.length > 0 && (
          <div className="space-y-2">
            {preparedItems.map(
              (item) => (
                <RenderPreparedItem
                  key={item.id}
                  item={item}
                />
              )
            )}
          </div>
        )}

        {tables.map(
          (table) => (
            <RenderTable
              key={table.id}
              table={table}
            />
          )
        )}

        {assets.map(
          (asset) => (
            <RenderAsset
              key={asset.id}
              asset={asset}
            />
          )
        )}
      </div>
    )
  }

  /*
   * ------------------------------------------------------------
   * EXAMPLE
   * ------------------------------------------------------------
   */

  if (
    blockType === "example"
  ) {
    return (
      <div
        className="
          rounded-2xl
          border
          border-[#168BC4]/20
          bg-[#F8FCFE]
          p-5
          md:p-7
        "
      >
        {showTitle && (
          <div className="mb-5">
            <span
              className="
                inline-flex
                rounded-full
                bg-[#E8F6FC]
                px-3
                py-1
                text-[11px]
                font-bold
                uppercase
                tracking-[0.18em]
                text-[#168BC4]
              "
            >
              Example
            </span>

            <h3
              className="
                mt-3
                text-xl
                font-semibold
                leading-7
                text-[#071B49]
              "
            >
              {rawTitle}
            </h3>
          </div>
        )}

        {showContent && (
          <SourceText className="mb-5">
            {rawContent}
          </SourceText>
        )}

        <div className="space-y-2">
          {preparedItems.map(
            (item) => (
              <RenderPreparedItem
                key={item.id}
                item={item}
              />
            )
          )}
        </div>

        {tables.map(
          (table) => (
            <RenderTable
              key={table.id}
              table={table}
            />
          )
        )}
      </div>
    )
  }

  /*
   * ------------------------------------------------------------
   * NORMAL SOURCE BLOCK
   * ------------------------------------------------------------
   */

  return (
    <div className="space-y-3">
      {showTitle && (
        <h3
          className="
            text-lg
            font-semibold
            leading-7
            text-[#071B49]
          "
        >
          {rawTitle}
        </h3>
      )}

      {showContent && (
        <SourceText>
          {rawContent}
        </SourceText>
      )}

      {preparedItems.length > 0 && (
        <div className="space-y-2">
          {preparedItems.map(
            (item) => (
              <RenderPreparedItem
                key={item.id}
                item={item}
              />
            )
          )}
        </div>
      )}

      {tables.map(
        (table) => (
          <RenderTable
            key={table.id}
            table={table}
          />
        )
      )}

      {assets.map(
        (asset) => (
          <RenderAsset
            key={asset.id}
            asset={asset}
          />
        )
      )}
    </div>
  )
}

/* ============================================================
   SIDEBAR HEADING
   ============================================================ */

function formatSidebarHeading(
  value: string
) {
  return normalizeSourceText(
    value
  )
}

/* ============================================================
   MAIN PAGE
   ============================================================ */

export default function AccountingTopicPage() {
  const params = useParams()

  const slug =
    typeof params.slug === "string"
      ? params.slug
      : Array.isArray(params.slug)
        ? params.slug[0]
        : ""

  const supabase =
    useMemo(
      () => createClient(),
      []
    )

  const [topic, setTopic] =
    useState<Topic | null>(
      null
    )

  const [sections, setSections] =
    useState<Section[]>([])

  const [blocks, setBlocks] =
    useState<Block[]>([])

  const [items, setItems] =
    useState<Item[]>([])

  const [quiz, setQuiz] =
    useState<Quiz | null>(null)

  const [tables, setTables] =
    useState<EducationTable[]>([])

  const [assets, setAssets] =
    useState<EducationAsset[]>([])

  const [loading, setLoading] =
    useState(true)

  const [error, setError] =
    useState<string | null>(
      null
    )

  /* ==========================================================
     LOAD DATA
     ========================================================== */

  useEffect(() => {
    if (!slug) {
      setError(
        "Topic not found."
      )
      setLoading(false)
      return
    }

    async function loadTopic() {
      setLoading(true)
      setError(null)

      /*
       * TOPIC
       */

      const {
        data: topicData,
        error: topicError,
      } = await supabase
        .from(
          "education_topics"
        )
        .select(
          "id,slug,title,standard,description,source_reference"
        )
        .eq("slug", slug)
        .eq(
          "category",
          "Accounting"
        )
        .eq(
          "is_published",
          true
        )
        .eq(
          "status",
          "published"
        )
        .maybeSingle()

      if (topicError) {
        setError(
          topicError.message
        )
        setLoading(false)
        return
      }

      if (!topicData) {
        setError(
          "Topic not found."
        )
        setLoading(false)
        return
      }

      const loadedTopic =
        topicData as Topic

      /*
       * SECTIONS
       */

      const {
        data: sectionData,
        error: sectionError,
      } = await supabase
        .from(
          "education_sections"
        )
        .select(
          "id,title,section_type,display_order,presentation"
        )
        .eq(
          "topic_id",
          loadedTopic.id
        )
        .eq(
          "is_published",
          true
        )
        .order(
          "display_order",
          {
            ascending: true,
          }
        )

      if (sectionError) {
        setError(
          sectionError.message
        )
        setLoading(false)
        return
      }

      const loadedSections =
        (sectionData ||
          []) as Section[]

      const sectionIds =
        loadedSections.map(
          (section) =>
            section.id
        )

      /*
       * BLOCKS
       */

      let loadedBlocks: Block[] =
        []

      if (
        sectionIds.length >
        0
      ) {
        const {
          data: blockData,
          error: blockError,
        } = await supabase
          .from(
            "education_content_blocks"
          )
          .select(
            "id,section_id,block_type,title,content,display_order,presentation"
          )
          .in(
            "section_id",
            sectionIds
          )
          .eq(
            "is_published",
            true
          )
          .order(
            "display_order",
            {
              ascending: true,
            }
          )

        if (blockError) {
          setError(
            blockError.message
          )
          setLoading(false)
          return
        }

        loadedBlocks =
          (blockData ||
            []) as Block[]
      }

      /*
       * ITEMS
       */

      const blockIds =
        loadedBlocks.map(
          (block) =>
            block.id
        )

      let loadedItems: Item[] =
        []

      if (
        blockIds.length >
        0
      ) {
        const {
          data: itemData,
          error: itemError,
        } = await supabase
          .from(
            "education_block_items"
          )
          .select(
            "id,block_id,content,item_type,display_order"
          )
          .in(
            "block_id",
            blockIds
          )
          .order(
            "display_order",
            {
              ascending: true,
            }
          )

        if (itemError) {
          setError(
            itemError.message
          )
          setLoading(false)
          return
        }

        loadedItems =
          (itemData ||
            []) as Item[]
      }

      /*
       * TABLES
       */

      let loadedTables:
        EducationTable[] = []

      if (
        blockIds.length >
        0
      ) {
        const {
          data,
          error: tableError,
        } = await supabase
          .from(
            "education_tables"
          )
          .select(
            "id,block_id,columns,rows,caption"
          )
          .in(
            "block_id",
            blockIds
          )

        if (!tableError) {
          loadedTables =
            (data ||
              []) as EducationTable[]
        }
      }

      /*
       * ASSETS / ILLUSTRATIONS
       */

      let loadedAssets:
        EducationAsset[] = []

      if (
        blockIds.length >
        0
      ) {
        const {
          data,
          error: assetError,
        } = await supabase
          .from(
            "education_assets"
          )
          .select(
            "id,block_id,asset_type,url,alt_text,caption,display_order"
          )
          .in(
            "block_id",
            blockIds
          )
          .order(
            "display_order",
            {
              ascending: true,
            }
          )

        if (!assetError) {
          loadedAssets =
            (data ||
              []) as EducationAsset[]
        }
      }

      /*
       * QUIZ
       */

      const quizTitle =
        `${loadedTopic.title} — Topic Quiz`

      const {
        data: quizData,
      } = await supabase
        .from(
          "education_quizzes"
        )
        .select(
          "id,title,description,time_limit_seconds,is_published"
        )
        .eq(
          "category",
          "Accounting"
        )
        .eq(
          "is_published",
          true
        )
        .eq(
          "title",
          quizTitle
        )
        .maybeSingle()

      setTopic(
        loadedTopic
      )

      setSections(
        loadedSections
      )

      setBlocks(
        loadedBlocks
      )

      setItems(
        loadedItems
      )

      setTables(
        loadedTables
      )

      setAssets(
        loadedAssets
      )

      setQuiz(
        quizData
          ? (quizData as Quiz)
          : null
      )

      setLoading(false)
    }

    void loadTopic()
  }, [slug, supabase])

  /* ==========================================================
     LOADING
     ========================================================== */

  if (loading) {
    return (
      <main className="min-h-screen bg-[#F5F8FC]">
        <CuraHeader />

        <section className="bg-[#071B49]">
          <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
            <div className="h-5 w-28 animate-pulse rounded bg-white/20" />

            <div className="mt-8 h-6 w-36 animate-pulse rounded-full bg-white/20" />

            <div className="mt-6 h-14 max-w-3xl animate-pulse rounded bg-white/20" />

            <div className="mt-6 h-5 max-w-2xl animate-pulse rounded bg-white/10" />
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 py-14 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_260px]">
            <div className="space-y-8">
              <div className="h-96 animate-pulse rounded-3xl bg-white" />
              <div className="h-96 animate-pulse rounded-3xl bg-white" />
            </div>

            <div className="h-80 animate-pulse rounded-3xl bg-white" />
          </div>
        </section>

        <CuraFooter />
      </main>
    )
  }

  /* ==========================================================
     ERROR
     ========================================================== */

  if (
    error ||
    !topic
  ) {
    return (
      <main className="min-h-screen bg-[#F5F8FC]">
        <CuraHeader />

        <section className="mx-auto max-w-4xl px-6 py-24 text-center">
          <h1 className="text-3xl font-semibold text-[#071B49]">
            Topic unavailable
          </h1>

          <p className="mx-auto mt-4 max-w-xl text-slate-500">
            {error ||
              "The requested accounting topic could not be found."}
          </p>

          <Link
            href="/education/materials/accounting"
            className="
              mt-8
              inline-flex
              rounded-full
              bg-[#071B49]
              px-6
              py-3
              text-sm
              font-semibold
              text-white
              transition
              hover:bg-[#102A5F]
            "
          >
            Back to Accounting
          </Link>
        </section>

        <CuraFooter />
      </main>
    )
  }

  /* ==========================================================
     PREPARE STRUCTURE
     ========================================================== */

  const finalSections =
    useMemo(() => {
      const seen =
        new Set<string>()

      return sections
        .map(
          (section) => {
            const sectionBlocks =
              blocks
                .filter(
                  (block) =>
                    block.section_id ===
                    section.id
                )
                .sort(
                  (a, b) =>
                    a.display_order -
                    b.display_order
                )

            const contentBlocks =
              sectionBlocks
                .map(
                  (block) => {
                    const blockItems =
                      items
                        .filter(
                          (item) =>
                            item.block_id ===
                            block.id
                        )
                        .sort(
                          (a, b) =>
                            a.display_order -
                            b.display_order
                        )

                    const blockTables =
                      tables
                        .filter(
                          (table) =>
                            table.block_id ===
                            block.id
                        )

                    const blockAssets =
                      assets
                        .filter(
                          (asset) =>
                            asset.block_id ===
                            block.id
                        )
                        .sort(
                          (a, b) =>
                            a.display_order -
                            b.display_order
                        )

                    return {
                      block,
                      items:
                        blockItems,
                      tables:
                        blockTables,
                      assets:
                        blockAssets,
                    }
                  }
                )
                .filter(
                  ({
                    block,
                    items,
                    assets,
                    tables,
                  }) =>
                    Boolean(
                      normalizeSourceText(
                        block.title ||
                          ""
                      )
                    ) ||
                    Boolean(
                      normalizeSourceText(
                        block.content ||
                          ""
                      )
                    ) ||
                    items.some(
                      (item) =>
                        !isSourceNoise(
                          item.content
                        )
                    ) ||
                    assets.length >
                      0 ||
                    tables.length >
                      0
                )

            /*
             * Remove exact duplicate sections.
             */
            const fingerprint =
              [
                section.title,
                ...contentBlocks.flatMap(
                  ({
                    block,
                    items,
                  }) => [
                    block.block_type,
                    block.title,
                    block.content,
                    ...items.map(
                      (item) =>
                        item.content
                    ),
                  ]
                ),
              ]
                .map(
                  (value) =>
                    normalizeHeading(
                      value ||
                        ""
                    )
                )
                .join("|")

            if (
              seen.has(
                fingerprint
              )
            ) {
              return null
            }

            seen.add(
              fingerprint
            )

            return {
              section,
              blocks:
                contentBlocks,
            }
          }
        )
        .filter(
          (
            entry
          ): entry is NonNullable<
            typeof entry
          > =>
            entry !== null &&
            entry.blocks.length >
              0
        )
    }, [
      sections,
      blocks,
      items,
      tables,
      assets,
    ])

  /* ==========================================================
     RENDER
     ========================================================== */

  return (
    <main className="min-h-screen bg-[#F5F8FC] text-[#071B49]">
      <CuraHeader />

      {/* ======================================================
          HERO
          ====================================================== */}

      <section className="relative overflow-hidden bg-[#071B49] text-white">
        <div
          className="
            absolute
            inset-0
            bg-[radial-gradient(circle_at_85%_20%,rgba(53,181,229,0.18),transparent_30%),radial-gradient(circle_at_10%_90%,rgba(22,139,196,0.15),transparent_35%)]
          "
        />

        <div className="relative mx-auto max-w-7xl px-6 py-14 lg:px-8 lg:py-20">
          <Link
            href="/education/materials/accounting"
            className="
              inline-flex
              items-center
              text-sm
              font-semibold
              text-white
              transition
              hover:text-[#35B5E5]
            "
          >
            ← Accounting
          </Link>

          <div className="mt-8 max-w-4xl">
            {topic.standard && (
              <span
                className="
                  inline-flex
                  rounded-full
                  bg-white/10
                  px-4
                  py-2
                  text-xs
                  font-bold
                  uppercase
                  tracking-[0.2em]
                  text-[#35B5E5]
                "
              >
                {topic.standard}
              </span>
            )}

            <h1
              className="
                mt-6
                text-4xl
                font-semibold
                tracking-tight
                md:text-6xl
              "
            >
              {topic.title}
            </h1>

            {topic.description && (
              <p
                className="
                  mt-6
                  max-w-3xl
                  text-lg
                  leading-8
                  text-slate-300
                "
              >
                {topic.description}
              </p>
            )}
          </div>
        </div>
      </section>

      {/* ======================================================
          CONTENT
          ====================================================== */}

      <section className="mx-auto max-w-7xl px-6 py-10 lg:px-8 lg:py-14">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_270px]">
          {/* ==================================================
              MAIN
              ================================================== */}

          <div className="min-w-0">
            {finalSections.length ===
            0 ? (
              <div className="rounded-3xl border border-slate-200 bg-white p-10">
                <p className="text-sm text-slate-500">
                  No published source
                  content is currently
                  available for this
                  topic.
                </p>
              </div>
            ) : (
              <div className="space-y-8">
                {finalSections.map(
                  (
                    {
                      section,
                      blocks:
                        sectionBlocks,
                    },
                    sectionIndex
                  ) => (
                    <article
                      key={
                        section.id
                      }
                      id={`section-${section.id}`}
                      className="
                        scroll-mt-24
                        overflow-hidden
                        rounded-[30px]
                        border
                        border-slate-200
                        bg-white
                        shadow-[0_8px_30px_rgba(7,27,73,0.05)]
                      "
                    >
                      {/* SECTION HEADER */}

                      <header
                        className="
                          border-b
                          border-slate-100
                          bg-gradient-to-r
                          from-white
                          to-[#F4FAFD]
                          px-7
                          py-7
                          md:px-10
                          md:py-9
                        "
                      >
                        <div className="flex items-start gap-4">
                          <div
                            className="
                              flex
                              h-9
                              min-w-9
                              items-center
                              justify-center
                              rounded-full
                              bg-[#E8F6FC]
                              px-2
                              text-sm
                              font-bold
                              text-[#168BC4]
                            "
                          >
                            {sectionIndex +
                              1}
                          </div>

                          <div>
                            <p
                              className="
                                text-[11px]
                                font-bold
                                uppercase
                                tracking-[0.2em]
                                text-[#168BC4]
                              "
                            >
                              Accounting source
                            </p>

                            <h2
                              className="
                                mt-2
                                text-2xl
                                font-semibold
                                leading-tight
                                text-[#071B49]
                                md:text-3xl
                              "
                            >
                              {
                                section.title
                              }
                            </h2>
                          </div>
                        </div>
                      </header>

                      {/* SOURCE BODY */}

                      <div className="px-7 py-8 md:px-10 md:py-10">
                        <div className="space-y-8">
                          {sectionBlocks.map(
                            (
                              contentBlock
                            ) => (
                              <AccountingSourceIllustration
                                key={
                                  contentBlock
                                    .block
                                    .id
                                }
                                sourceText={[
                                  contentBlock
                                    .block
                                    .title ||
                                    "",
                                  contentBlock
                                    .block
                                    .content ||
                                    "",
                                  ...contentBlock.items.map(
                                    (
                                      item
                                    ) =>
                                      item.content ||
                                      ""
                                  ),
                                ]
                                  .filter(
                                    (
                                      value
                                    ) =>
                                      value &&
                                      !isSourceNoise(
                                        value
                                      )
                                  )
                                  .join(
                                    " "
                                  )}
                              >
                                <RenderSourceBlock
                                  contentBlock={
                                    contentBlock
                                  }
                                />
                              </AccountingSourceIllustration>
                            )
                          )}
                        </div>
                      </div>
                    </article>
                  )
                )}

                {/* ==================================================
                    QUIZ
                    ================================================== */}

                {quiz && (
                  <section
                    id="topic-quiz"
                    className="
                      scroll-mt-24
                      rounded-[30px]
                      border
                      border-[#168BC4]/20
                      bg-white
                      p-7
                      shadow-[0_8px_30px_rgba(7,27,73,0.05)]
                      md:p-10
                    "
                  >
                    <div className="flex flex-col gap-7 md:flex-row md:items-center md:justify-between">
                      <div>
                        <p
                          className="
                            text-xs
                            font-bold
                            uppercase
                            tracking-[0.2em]
                            text-[#168BC4]
                          "
                        >
                          Topic assessment
                        </p>

                        <h2
                          className="
                            mt-2
                            text-2xl
                            font-semibold
                            text-[#071B49]
                            md:text-3xl
                          "
                        >
                          {quiz.title}
                        </h2>

                        {quiz.description && (
                          <p
                            className="
                              mt-3
                              max-w-2xl
                              text-sm
                              leading-6
                              text-slate-500
                            "
                          >
                            {
                              quiz.description
                            }
                          </p>
                        )}

                        {quiz.time_limit_seconds >
                          0 && (
                          <p
                            className="
                              mt-3
                              text-xs
                              font-semibold
                              text-slate-400
                            "
                          >
                            Time limit:{" "}
                            {Math.ceil(
                              quiz.time_limit_seconds /
                                60
                            )}{" "}
                            minutes
                          </p>
                        )}
                      </div>

                      <Link
                        href={`/education/test?quiz=${quiz.id}`}
                        className="
                          inline-flex
                          shrink-0
                          items-center
                          justify-center
                          rounded-full
                          bg-[#071B49]
                          px-7
                          py-3.5
                          text-sm
                          font-bold
                          text-white
                          transition
                          hover:bg-[#168BC4]
                        "
                      >
                        Start quiz →
                      </Link>
                    </div>
                  </section>
                )}
              </div>
            )}
          </div>

          {/* ==================================================
              SIDEBAR
              ================================================== */}

          <aside className="lg:sticky lg:top-24 lg:self-start">
            <div
              className="
                rounded-3xl
                border
                border-slate-200
                bg-white
                p-5
                shadow-[0_8px_30px_rgba(7,27,73,0.05)]
              "
            >
              <p
                className="
                  text-xs
                  font-bold
                  uppercase
                  tracking-[0.2em]
                  text-[#168BC4]
                "
              >
                On this page
              </p>

              <nav className="mt-4 max-h-[calc(100vh-150px)] overflow-y-auto pr-1">
                <ol className="space-y-1">
                  {finalSections.map(
                    (
                      {
                        section,
                      },
                      index
                    ) => (
                      <li
                        key={
                          section.id
                        }
                      >
                        <a
                          href={`#section-${section.id}`}
                          className="
                            block
                            rounded-xl
                            px-3
                            py-2.5
                            text-sm
                            leading-5
                            text-slate-600
                            transition
                            hover:bg-[#F1F7FB]
                            hover:text-[#168BC4]
                          "
                        >
                          <span className="mr-2 font-semibold text-[#168BC4]">
                            {index +
                              1}.
                          </span>

                          {formatSidebarHeading(
                            section.title
                          )}
                        </a>
                      </li>
                    )
                  )}

                  {quiz && (
                    <li>
                      <a
                        href="#topic-quiz"
                        className="
                          mt-2
                          block
                          rounded-xl
                          bg-[#F1F7FB]
                          px-3
                          py-2.5
                          text-sm
                          font-semibold
                          leading-5
                          text-[#071B49]
                          transition
                          hover:bg-[#E8F6FC]
                          hover:text-[#168BC4]
                        "
                      >
                        <span className="mr-2 font-semibold text-[#168BC4]">
                          {finalSections.length +
                            1}
                          .
                        </span>
                        Topic assessment
                      </a>
                    </li>
                  )}
                </ol>
              </nav>
            </div>
          </aside>
        </div>
      </section>

      <CuraFooter />
    </main>
  )
}