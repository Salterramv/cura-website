"use client"

import Link from "next/link"
import { useEffect, useMemo, useState } from "react"
import { useParams } from "next/navigation"

import CuraHeader from "@/components/CuraHeader"
import CuraFooter from "@/components/CuraFooter"
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

type Quiz = {
  id: string
  title: string
  description: string | null
  time_limit_seconds: number
  is_published: boolean
}

type QuizQuestion = {
  id: string
  quiz_id: string
  question_text: string
  options: unknown
  correct_option: number
  explanation: string | null
  sort_order: number
  points: number
}

type ContentBlock = {
  block: Block
  items: Item[]
}

/* ============================================================
   SOURCE METADATA THAT MUST NOT APPEAR
   ============================================================ */

const HIDDEN_SOURCE_METADATA = [
  /^SBR\s+New\s+Knowledge$/i,
  /^FR\s+Knowledge$/i,
  /^F\d+\s+Knowledge$/i,
  /^TUU\s*\d+(?:\s+.*)?$/i,
  /^Homework\s+TUU\s*\d+.*$/i,
]

function isHiddenSourceMetadata(value: string) {
  const text = value.trim()

  if (!text) {
    return true
  }

  return HIDDEN_SOURCE_METADATA.some((pattern) =>
    pattern.test(text)
  )
}

/* ============================================================
   SOURCE CLEANING
   ============================================================ */

function cleanSourceText(value: string) {
  return value
    .replace(/\u00a0/g, " ")
    .split(/\r?\n/)
    .map((line) => line.trimEnd())
    .filter((line) => {
      const cleaned = line.trim()

      return (
        cleaned.length > 0 &&
        !isHiddenSourceMetadata(cleaned)
      )
    })
    .join("\n")
    .trim()
}

/* ============================================================
   LECTURER COVER REMOVAL
   ============================================================ */

const LECTURER_LABEL_PATTERNS = [
  /^(?:lecturer|presented\s+by|prepared\s+by|facilitator|trainer|instructor)\s*[:\-]/i,
  /^(?:lecturer|presenter|facilitator|trainer|instructor)\s*$/i,
]

const QUALIFICATION_PATTERN =
  /\b(?:ACCA|FCA|MBA|BBA|BA|BSc|BS|MA|MSc|MCom|PhD|CPA|CFA|CIMA|CIA|CISA|ACA|CA|Bachelor(?:'s)?|Master(?:'s)?|Doctorate)\b/i

function isQualificationLine(value: string) {
  const text = value.trim()

  if (!text || !QUALIFICATION_PATTERN.test(text)) {
    return false
  }

  const matches =
    text.match(
      /\b(?:ACCA|FCA|MBA|BBA|BA|BSc|BS|MA|MSc|MCom|PhD|CPA|CFA|CIMA|CIA|CISA|ACA|CA|Bachelor(?:'s)?|Master(?:'s)?|Doctorate)\b/gi
    ) || []

  return (
    matches.length >= 2 ||
    /[,;&|]/.test(text) ||
    /\b(?:Bachelor|Master|Doctorate)\b/i.test(text)
  )
}

function looksLikePersonName(value: string) {
  const text = value.trim()

  if (!text || /\d/.test(text)) {
    return false
  }

  if (
    !/^[A-Z][A-Za-z.'-]*(?:\s+[A-Z][A-Za-z.'-]*){1,4}$/.test(
      text
    )
  ) {
    return false
  }

  const headingWords = new Set([
    "scope",
    "definitions",
    "objective",
    "objectives",
    "recognition",
    "measurement",
    "presentation",
    "accounting",
    "agriculture",
    "assets",
    "liabilities",
    "equity",
    "revenue",
    "expenses",
    "examples",
    "example",
    "illustration",
    "illustrations",
    "introduction",
    "conclusion",
    "summary",
    "background",
  ])

  const words = text.toLowerCase().split(/\s+/)

  return !words.some((word) =>
    headingWords.has(word)
  )
}

function isLecturerLine(
  value: string,
  nextValue = ""
) {
  const text = value.trim()

  if (!text) {
    return false
  }

  if (
    LECTURER_LABEL_PATTERNS.some((pattern) =>
      pattern.test(text)
    )
  ) {
    return true
  }

  if (isQualificationLine(text)) {
    return true
  }

  return (
    looksLikePersonName(text) &&
    isQualificationLine(nextValue)
  )
}

function stripLecturerText(
  value: string,
  nextValue = ""
) {
  if (!value) {
    return ""
  }

  const lines = value
    .split(/\r?\n/)
    .map((line) => line.trimEnd())
    .filter(Boolean)

  const result: string[] = []

  for (let i = 0; i < lines.length; i += 1) {
    const current = lines[i]
    const next = lines[i + 1] || nextValue

    if (isLecturerLine(current, next)) {
      continue
    }

    result.push(current)
  }

  return result.join("\n").trim()
}

/* ============================================================
   PRESENTATION TYPES
   ============================================================ */

type PresentationStyle = {
  text?: string
  bold?: boolean
  italic?: boolean
  underline?: boolean
  color?: string | null
  fontSize?: number
  font_size?: number
}

type PresentationParagraph = {
  text?: string
  level?: number
  style?: PresentationStyle[]
  bold?: boolean
  italic?: boolean
  underline?: boolean
  color?: string | null
  bullet?: boolean
  numbered?: boolean
  alignment?: string
}

type PresentationData = {
  paragraphs?: PresentationParagraph[]
  source_position?: Record<string, unknown>
  [key: string]: unknown
}

/* ============================================================
   PRESENTATION EXTRACTION
   ============================================================ */

function getPresentation(
  block: Block
): PresentationData | null {
  if (!block.presentation) {
    return null
  }

  return block.presentation as PresentationData
}

function getPresentationParagraphs(
  block: Block
) {
  const presentation = getPresentation(block)

  if (!presentation) {
    return []
  }

  if (!Array.isArray(presentation.paragraphs)) {
    return []
  }

  return presentation.paragraphs.filter(
    (paragraph) =>
      paragraph &&
      typeof paragraph === "object" &&
      typeof paragraph.text === "string" &&
      paragraph.text.trim().length > 0
  )
}

/* ============================================================
   NORMALIZATION
   ============================================================ */

function normalizeForComparison(value: string) {
  return value
    .toLowerCase()
    .replace(/[–—-]/g, " ")
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim()
}

/* ============================================================
   SOURCE STYLE
   ============================================================ */

function safeColor(
  color: string | null | undefined
) {
  if (!color) {
    return undefined
  }

  const value = color.trim()

  /*
   * Only accept normal CSS colour values.
   * This prevents malformed imported data from breaking the page.
   */
  if (
    /^#[0-9a-f]{3,8}$/i.test(value) ||
    /^rgb/i.test(value) ||
    /^rgba/i.test(value) ||
    /^hsl/i.test(value) ||
    /^hsla/i.test(value)
  ) {
    return value
  }

  return undefined
}

function renderStyleRuns(
  paragraph: PresentationParagraph
) {
  const text = paragraph.text || ""

  const styles = Array.isArray(paragraph.style)
    ? paragraph.style
    : []

  /*
   * If the source importer supplied style runs, use them.
   */
  if (styles.length > 0) {
    return styles.map((style, index) => {
      const runText =
        typeof style.text === "string"
          ? style.text
          : ""

      if (!runText) {
        return null
      }

      const color = safeColor(style.color)

      return (
        <span
          key={`${index}-${runText}`}
          style={{
            color,
            fontWeight: style.bold
              ? 700
              : undefined,
            fontStyle: style.italic
              ? "italic"
              : undefined,
            textDecoration: style.underline
              ? "underline"
              : undefined,
            fontSize:
              style.fontSize ||
              style.font_size
                ? `${
                    style.fontSize ||
                    style.font_size
                  }px`
                : undefined,
          }}
        >
          {runText}
        </span>
      )
    })
  }

  /*
   * Fallback to paragraph-level styling.
   */
  const color = safeColor(
    paragraph.color
  )

  return (
    <span
      style={{
        color,
        fontWeight: paragraph.bold
          ? 700
          : undefined,
        fontStyle: paragraph.italic
          ? "italic"
          : undefined,
        textDecoration: paragraph.underline
          ? "underline"
          : undefined,
      }}
    >
      {text}
    </span>
  )
}

/* ============================================================
   SOURCE PARAGRAPH
   ============================================================ */

function SourceParagraph({
  paragraph,
}: {
  paragraph: PresentationParagraph
}) {
  const text = paragraph.text || ""

  if (!text.trim()) {
    return null
  }

  const level =
    typeof paragraph.level === "number"
      ? Math.max(0, paragraph.level)
      : 0

  const indentation =
    Math.min(level, 6) * 28

  const isBullet =
    paragraph.bullet === true

  const isNumbered =
    paragraph.numbered === true

  const alignment =
    paragraph.alignment === "center"
      ? "text-center"
      : paragraph.alignment === "right"
        ? "text-right"
        : "text-left"

  /*
   * IMPORTANT:
   *
   * We only render a bullet when the source presentation
   * explicitly says it is a bullet.
   *
   * We do NOT turn every database item into a bullet.
   */
  if (isBullet) {
    return (
      <div
        className={`relative py-1 ${alignment}`}
        style={{
          paddingLeft: `${indentation + 28}px`,
        }}
      >
        <span
          className="absolute left-0 top-[15px] h-[7px] w-[7px] rounded-full bg-[#168BC4]"
          style={{
            left: `${indentation}px`,
          }}
        />

        <div className="whitespace-pre-wrap break-words text-base leading-8 text-[#102A5F]">
          {renderStyleRuns(paragraph)}
        </div>
      </div>
    )
  }

  if (isNumbered) {
    return (
      <div
        className={`py-1 ${alignment}`}
        style={{
          paddingLeft: `${indentation}px`,
        }}
      >
        <div className="whitespace-pre-wrap break-words text-base leading-8 text-[#102A5F]">
          {renderStyleRuns(paragraph)}
        </div>
      </div>
    )
  }

  return (
    <div
      className={`whitespace-pre-wrap break-words py-1 text-base leading-8 text-[#102A5F] ${alignment}`}
      style={{
        paddingLeft: `${indentation}px`,
      }}
    >
      {renderStyleRuns(paragraph)}
    </div>
  )
}

/* ============================================================
   TABLE RENDERING
   ============================================================ */

function normalizeTableRows(
  value: unknown
): unknown[][] {
  if (!Array.isArray(value)) {
    return []
  }

  return value.map((row) => {
    if (Array.isArray(row)) {
      return row
    }

    if (
      row &&
      typeof row === "object"
    ) {
      return Object.values(row)
    }

    return [row]
  })
}

function normalizeTableColumns(
  value: unknown
): unknown[] {
  if (!Array.isArray(value)) {
    return []
  }

  return value
}

function SourceTable({
  table,
}: {
  table: EducationTable
}) {
  const columns = normalizeTableColumns(
    table.columns
  )

  const rows = normalizeTableRows(
    table.rows
  )

  if (rows.length === 0) {
    return null
  }

  return (
    <div className="my-8 overflow-x-auto">
      <table className="w-full border-collapse text-base">
        {columns.length > 0 && (
          <thead>
            <tr>
              {columns.map(
                (column, index) => (
                  <th
                    key={index}
                    className="
                      border
                      border-[#D7E0EA]
                      bg-[#071B49]
                      px-4
                      py-3
                      text-left
                      font-semibold
                      text-white
                    "
                  >
                    <span className="whitespace-pre-wrap">
                      {String(
                        column ?? ""
                      )}
                    </span>
                  </th>
                )
              )}
            </tr>
          </thead>
        )}

        <tbody>
          {rows.map(
            (row, rowIndex) => (
              <tr
                key={rowIndex}
                className={
                  rowIndex % 2 === 0
                    ? "bg-white"
                    : "bg-[#F7FAFC]"
                }
              >
                {row.map(
                  (
                    cell,
                    cellIndex
                  ) => (
                    <td
                      key={cellIndex}
                      className="
                        border
                        border-[#D7E0EA]
                        px-4
                        py-3
                        align-top
                        text-[#102A5F]
                      "
                    >
                      <span className="whitespace-pre-wrap break-words">
                        {String(
                          cell ?? ""
                        )}
                      </span>
                    </td>
                  )
                )}
              </tr>
            )
          )}
        </tbody>
      </table>

      {table.caption && (
        <p className="mt-3 text-center text-sm italic text-slate-500">
          {table.caption}
        </p>
      )}
    </div>
  )
}

/* ============================================================
   IMAGE / ILLUSTRATION
   ============================================================ */

function SourceAsset({
  asset,
}: {
  asset: EducationAsset
}) {
  if (!asset.url) {
    return null
  }

  return (
    <figure className="my-8">
      <div className="overflow-hidden rounded-2xl border border-[#D7E0EA] bg-white">
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
        <figcaption className="mt-3 text-center text-sm text-slate-500">
          {asset.caption}
        </figcaption>
      )}
    </figure>
  )
}

/* ============================================================
   LEGACY FALLBACK
   ============================================================ */

function renderLegacyItems(
  items: Item[]
) {
  const validItems = items.filter(
    (item) => {
      const text = cleanSourceText(
        item.content || ""
      )

      return (
        text.length > 0 &&
        !isHiddenSourceMetadata(text)
      )
    }
  )

  if (validItems.length === 0) {
    return null
  }

  return (
    <div className="space-y-2">
      {validItems.map((item) => (
        <div
          key={item.id}
          className="whitespace-pre-wrap break-words py-1 text-base leading-8 text-[#102A5F]"
        >
          {cleanSourceText(
            item.content
          )}
        </div>
      ))}
    </div>
  )
}

/* ============================================================
   BLOCK RENDERER
   ============================================================ */

function RenderSourceBlock({
  contentBlock,
  sectionTitle,
  tables,
  assets,
}: {
  contentBlock: ContentBlock
  sectionTitle: string
  tables: EducationTable[]
  assets: EducationAsset[]
}) {
  const { block, items } =
    contentBlock

  const paragraphs =
    getPresentationParagraphs(block)

  const normalizedSection =
    normalizeForComparison(
      sectionTitle
    )

  const normalizedBlock =
    normalizeForComparison(
      block.title || ""
    )

  const blockTitleIsDuplicate =
    normalizedBlock.length > 0 &&
    normalizedBlock === normalizedSection

  /*
   * ==========================================================
   * SOURCE PRESENTATION
   * ==========================================================
   *
   * This is the important part.
   *
   * If presentation.paragraphs exists, it is authoritative.
   *
   * We do NOT additionally render:
   *
   *   block.content
   *   block.title
   *   block_items
   *
   * because those are duplicate representations of the same
   * source material.
   */

  if (paragraphs.length > 0) {
    const visibleParagraphs =
      paragraphs.filter(
        (paragraph, index) => {
          const text =
            cleanSourceText(
              paragraph.text || ""
            )

          if (!text) {
            return false
          }

          /*
           * Remove hidden training metadata.
           */
          if (
            isHiddenSourceMetadata(
              text
            )
          ) {
            return false
          }

          /*
           * Remove lecturer information
           * from the first block when the
           * parent section is the first
           * source section.
           *
           * The parent component performs
           * additional first-section cleanup.
           */

          /*
           * Do not display the same heading twice.
           *
           * If the section heading already
           * displays this exact text, the
           * paragraph is not rendered again.
           */
          if (
            index === 0 &&
            normalizeForComparison(
              text
            ) === normalizedSection
          ) {
            return false
          }

          /*
           * If the block title is the same
           * as this paragraph, the block
           * title will not separately render.
           */
          return true
        }
      )

    return (
      <div className="space-y-1">
        {!blockTitleIsDuplicate &&
          block.title &&
          !isHiddenSourceMetadata(
            block.title
          ) &&
          visibleParagraphs.length ===
            0 && (
            <h3 className="mb-4 text-xl font-semibold leading-8 text-[#071B49]">
              {cleanSourceText(
                block.title
              )}
            </h3>
          )}

        {visibleParagraphs.map(
          (paragraph, index) => (
            <SourceParagraph
              key={`${block.id}-paragraph-${index}`}
              paragraph={{
                ...paragraph,
                text: cleanSourceText(
                  paragraph.text || ""
                ),
              }}
            />
          )
        )}

        {tables.map((table) => (
          <SourceTable
            key={table.id}
            table={table}
          />
        ))}

        {assets.map((asset) => (
          <SourceAsset
            key={asset.id}
            asset={asset}
          />
        ))}
      </div>
    )
  }

  /*
   * ==========================================================
   * LEGACY FALLBACK
   * ==========================================================
   *
   * Some older material may not yet contain
   * presentation.paragraphs.
   *
   * Only in that situation do we use the
   * legacy fields.
   */

  return (
    <div className="space-y-5">
      {block.title &&
        !blockTitleIsDuplicate &&
        !isHiddenSourceMetadata(
          block.title
        ) && (
          <h3 className="text-xl font-semibold leading-8 text-[#071B49]">
            {cleanSourceText(
              block.title
            )}
          </h3>
        )}

      {block.content &&
        cleanSourceText(
          block.content
        ) && (
          <div className="whitespace-pre-wrap break-words text-base leading-8 text-[#102A5F]">
            {cleanSourceText(
              block.content
            )}
          </div>
        )}

      {renderLegacyItems(items)}

      {tables.map((table) => (
        <SourceTable
          key={table.id}
          table={table}
        />
      ))}

      {assets.map((asset) => (
        <SourceAsset
          key={asset.id}
          asset={asset}
        />
      ))}
    </div>
  )
}

/* ============================================================
   SECTION TITLE
   ============================================================ */

function getSectionTitle(
  section: Section
) {
  const title = cleanSourceText(
    section.title || ""
  )

  if (
    title &&
    !/^\d+(?:\.\d+)?$/.test(title) &&
    !isHiddenSourceMetadata(title)
  ) {
    return title
  }

  return ""
}

/* ============================================================
   PAGE
   ============================================================ */

export default function AccountingTopicPage() {
  const params = useParams()

  const slug =
    typeof params.slug === "string"
      ? params.slug
      : Array.isArray(params.slug)
        ? params.slug[0]
        : ""

  const supabase = useMemo(
    () => createClient(),
    []
  )

  const [topic, setTopic] =
    useState<Topic | null>(null)

  const [sections, setSections] =
    useState<Section[]>([])

  const [blocks, setBlocks] =
    useState<Block[]>([])

  const [items, setItems] =
    useState<Item[]>([])

  const [tables, setTables] =
    useState<EducationTable[]>([])

  const [assets, setAssets] =
    useState<EducationAsset[]>([])

  const [quiz, setQuiz] =
    useState<Quiz | null>(null)

  const [
    quizQuestions,
    setQuizQuestions,
  ] = useState<QuizQuestion[]>([])

  const [loading, setLoading] =
    useState(true)

  const [error, setError] =
    useState<string | null>(null)

  /* ==========================================================
     LOAD DATA
     ========================================================== */

  useEffect(() => {
    if (!slug) {
      setError("Topic not found.")
      setLoading(false)
      return
    }

    let cancelled = false

    async function loadTopic() {
      setLoading(true)
      setError(null)

      /* --------------------------------------------------------
         TOPIC
         -------------------------------------------------------- */

      const {
        data: topicData,
        error: topicError,
      } = await supabase
        .from("education_topics")
        .select(
          "id,slug,title,standard,description,source_reference"
        )
        .eq("slug", slug)
        .eq("category", "Accounting")
        .eq("is_published", true)
        .eq("status", "published")
        .maybeSingle()

      if (topicError) {
        console.error(
          "Topic loading error:",
          topicError
        )

        if (!cancelled) {
          setError(
            topicError.message
          )
          setLoading(false)
        }

        return
      }

      if (!topicData) {
        if (!cancelled) {
          setError("Topic not found.")
          setLoading(false)
        }

        return
      }

      const loadedTopic =
        topicData as Topic

      /* --------------------------------------------------------
         SECTIONS
         -------------------------------------------------------- */

      const {
        data: sectionData,
        error: sectionError,
      } = await supabase
        .from("education_sections")
        .select(
          "id,title,section_type,display_order,presentation"
        )
        .eq(
          "topic_id",
          loadedTopic.id
        )
        .eq("is_published", true)
        .order("display_order", {
          ascending: true,
        })

      if (sectionError) {
        console.error(
          "Section loading error:",
          sectionError
        )

        if (!cancelled) {
          setError(
            sectionError.message
          )
          setLoading(false)
        }

        return
      }

      const loadedSections =
        (sectionData ||
          []) as Section[]

      const sectionIds =
        loadedSections.map(
          (section) => section.id
        )

      /* --------------------------------------------------------
         BLOCKS
         -------------------------------------------------------- */

      let loadedBlocks: Block[] =
        []

      if (sectionIds.length > 0) {
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
          console.error(
            "Block loading error:",
            blockError
          )

          if (!cancelled) {
            setError(
              blockError.message
            )
            setLoading(false)
          }

          return
        }

        loadedBlocks =
          (blockData ||
            []) as Block[]
      }

      const blockIds =
        loadedBlocks.map(
          (block) => block.id
        )

      /* --------------------------------------------------------
         ITEMS
         -------------------------------------------------------- */

      let loadedItems: Item[] =
        []

      if (blockIds.length > 0) {
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
          console.error(
            "Item loading error:",
            itemError
          )

          if (!cancelled) {
            setError(
              itemError.message
            )
            setLoading(false)
          }

          return
        }

        loadedItems =
          (itemData ||
            []) as Item[]
      }

      /* --------------------------------------------------------
         TABLES
         -------------------------------------------------------- */

      let loadedTables:
        EducationTable[] = []

      if (blockIds.length > 0) {
        const {
          data: tableData,
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

        if (tableError) {
          console.warn(
            "Table loading warning:",
            tableError.message
          )
        } else {
          loadedTables =
            (tableData ||
              []) as EducationTable[]
        }
      }

      /* --------------------------------------------------------
         ASSETS / ILLUSTRATIONS
         -------------------------------------------------------- */

      let loadedAssets:
        EducationAsset[] = []

      if (blockIds.length > 0) {
        const {
          data: assetData,
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

        if (assetError) {
          console.warn(
            "Asset loading warning:",
            assetError.message
          )
        } else {
          loadedAssets =
            (assetData ||
              []) as EducationAsset[]
        }
      }

      /* --------------------------------------------------------
         QUIZ
         -------------------------------------------------------- */

      const expectedQuizTitle =
        `${loadedTopic.title} — Topic Quiz`

      const {
        data: quizData,
        error: quizError,
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
          expectedQuizTitle
        )
        .maybeSingle()

      if (quizError) {
        console.warn(
          "Quiz loading warning:",
          quizError.message
        )
      }

      const loadedQuiz =
        quizData
          ? (quizData as Quiz)
          : null

      /* --------------------------------------------------------
         QUIZ QUESTIONS
         -------------------------------------------------------- */

      let loadedQuizQuestions:
        QuizQuestion[] = []

      if (loadedQuiz) {
        const {
          data: questionData,
          error: questionError,
        } = await supabase
          .from(
            "education_questions"
          )
          .select(
            "id,quiz_id,question_text,options,correct_option,explanation,sort_order,points"
          )
          .eq(
            "quiz_id",
            loadedQuiz.id
          )
          .order(
            "sort_order",
            {
              ascending: true,
            }
          )

        if (questionError) {
          console.warn(
            "Quiz question loading warning:",
            questionError.message
          )
        } else {
          loadedQuizQuestions =
            (questionData ||
              []) as QuizQuestion[]
        }
      }

      if (cancelled) {
        return
      }

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
        loadedQuiz
      )

      setQuizQuestions(
        loadedQuizQuestions
      )

      setLoading(false)
    }

    void loadTopic()

    return () => {
      cancelled = true
    }
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
            <div className="h-4 w-32 animate-pulse rounded bg-white/20" />

            <div className="mt-8 h-14 w-2/3 animate-pulse rounded bg-white/20" />

            <div className="mt-5 h-5 w-1/2 animate-pulse rounded bg-white/10" />
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-[260px_minmax(0,1fr)]">
            <div className="h-80 animate-pulse rounded-3xl bg-white" />

            <div className="space-y-8">
              <div className="h-96 animate-pulse rounded-3xl bg-white" />
              <div className="h-96 animate-pulse rounded-3xl bg-white" />
            </div>
          </div>
        </section>

        <CuraFooter />
      </main>
    )
  }

  /* ==========================================================
     ERROR
     ========================================================== */

  if (error || !topic) {
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

  const tablesByBlock =
    new Map<
      string,
      EducationTable[]
    >()

  for (const table of tables) {
    const existing =
      tablesByBlock.get(
        table.block_id
      ) || []

    existing.push(table)

    tablesByBlock.set(
      table.block_id,
      existing
    )
  }

  const assetsByBlock =
    new Map<
      string,
      EducationAsset[]
    >()

  for (const asset of assets) {
    const existing =
      assetsByBlock.get(
        asset.block_id
      ) || []

    existing.push(asset)

    assetsByBlock.set(
      asset.block_id,
      existing
    )
  }

  const sectionsWithBlocks =
    sections
      .map((section) => {
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

        const contentBlocks:
          ContentBlock[] =
          sectionBlocks.map(
            (block) => ({
              block,
              items: items
                .filter(
                  (item) =>
                    item.block_id ===
                    block.id
                )
                .sort(
                  (a, b) =>
                    a.display_order -
                    b.display_order
                ),
            })
          )

        return {
          section,
          blocks:
            contentBlocks,
        }
      })
      .filter(
        ({ section, blocks }) => {
          if (
            blocks.length > 0
          ) {
            return true
          }

          return Boolean(
            section.title
          )
        }
      )

  /* ==========================================================
     REMOVE FIRST-SLIDE LECTURER MATERIAL
     ========================================================== */

  const processedSections =
    sectionsWithBlocks.map(
      (entry, sectionIndex) => {
        if (
          sectionIndex !== 0
        ) {
          return entry
        }

        const processedBlocks =
          entry.blocks.map(
            (contentBlock) => {
              const block =
                contentBlock.block

              const presentation =
                getPresentation(
                  block
                )

              /*
               * First preference:
               * clean presentation paragraphs.
               */
              if (
                presentation &&
                Array.isArray(
                  presentation.paragraphs
                )
              ) {
                const paragraphs =
                  presentation.paragraphs
                    .map(
                      (
                        paragraph
                      ) => ({
                        ...paragraph,
                        text:
                          stripLecturerText(
                            paragraph.text ||
                              ""
                          ),
                      })
                    )
                    .filter(
                      (
                        paragraph
                      ) =>
                        paragraph.text &&
                        paragraph.text.trim()
                          .length > 0 &&
                        !isHiddenSourceMetadata(
                          paragraph.text
                        )
                    )

                return {
                  ...contentBlock,
                  block: {
                    ...block,
                    presentation: {
                      ...presentation,
                      paragraphs,
                    },
                  },
                }
              }

              /*
               * Legacy fallback.
               */
              return {
                ...contentBlock,
                block: {
                  ...block,
                  title:
                    stripLecturerText(
                      block.title ||
                        ""
                    ),
                  content:
                    stripLecturerText(
                      block.content ||
                        ""
                    ),
                },
                items:
                  contentBlock.items
                    .map(
                      (item) => ({
                        ...item,
                        content:
                          stripLecturerText(
                            item.content ||
                              ""
                          ),
                      })
                    )
                    .filter(
                      (item) =>
                        item.content.trim()
                          .length > 0
                    ),
              }
            }
          )

        return {
          ...entry,
          blocks:
            processedBlocks,
        }
      }
    )
    .filter(
      ({ blocks }) =>
        blocks.some(
          (contentBlock) => {
            const paragraphs =
              getPresentationParagraphs(
                contentBlock.block
              )

            return (
              paragraphs.length > 0 ||
              Boolean(
                contentBlock.block
                  .content
              ) ||
              Boolean(
                contentBlock.block
                  .title
              ) ||
              contentBlock.items.length >
                0 ||
              (
                tablesByBlock.get(
                  contentBlock.block.id
                ) || []
              ).length > 0 ||
              (
                assetsByBlock.get(
                  contentBlock.block.id
                ) || []
              ).length > 0
            )
          }
        )
    )

  /* ==========================================================
     RENDER
     ========================================================== */

  return (
    <main className="min-h-screen bg-[#F5F8FC] text-[#071B49]">
      <CuraHeader />

      {/* ========================================================
          HERO
          ======================================================== */}

      <section className="relative overflow-hidden bg-[#071B49] text-white">
        <div
          className="
            absolute
            inset-0
            bg-[radial-gradient(circle_at_85%_20%,rgba(53,181,229,0.16),transparent_30%),radial-gradient(circle_at_10%_90%,rgba(22,139,196,0.12),transparent_35%)]
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

          <div className="mt-8 max-w-5xl">
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

            <h1 className="mt-6 text-4xl font-semibold tracking-tight md:text-6xl">
              {topic.title}
            </h1>

            {topic.description && (
              <p className="mt-6 max-w-3xl text-base leading-8 text-white/75 md:text-lg">
                {topic.description}
              </p>
            )}
          </div>
        </div>
      </section>

      {/* ========================================================
          CONTENT
          ======================================================== */}

      <section className="mx-auto max-w-7xl px-6 py-10 lg:px-8 lg:py-14">
        <div className="grid gap-8 lg:grid-cols-[260px_minmax(0,1fr)]">
          {/* ====================================================
              ON THIS PAGE
              ==================================================== */}

          <aside className="order-2 lg:order-1">
            <div
              className="
                rounded-3xl
                border
                border-slate-200
                bg-white
                p-5
                shadow-[0_8px_30px_rgba(7,27,73,0.05)]
                lg:sticky
                lg:top-24
              "
            >
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#168BC4]">
                On this page
              </p>

              {processedSections.length >
              0 ? (
                <nav className="mt-4 max-h-[calc(100vh-150px)] overflow-y-auto pr-1">
                  <ol className="space-y-1">
                    {processedSections.map(
                      ({
                        section,
                      }) => {
                        const title =
                          getSectionTitle(
                            section
                          ) ||
                          cleanSourceText(
                            section.title
                          )

                        if (!title) {
                          return null
                        }

                        return (
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
                                py-2
                                text-sm
                                leading-5
                                text-slate-600
                                transition
                                hover:bg-[#F1F7FB]
                                hover:text-[#168BC4]
                              "
                            >
                              {title}
                            </a>
                          </li>
                        )
                      }
                    )}

                    {quiz && (
                      <li>
                        <a
                          href="#topic-quiz"
                          className="
                            block
                            rounded-xl
                            px-3
                            py-2
                            text-sm
                            font-semibold
                            leading-5
                            text-[#071B49]
                            transition
                            hover:bg-[#F1F7FB]
                            hover:text-[#168BC4]
                          "
                        >
                          Topic assessment
                        </a>
                      </li>
                    )}
                  </ol>
                </nav>
              ) : (
                <p className="mt-4 text-sm leading-6 text-slate-500">
                  No published material is available.
                </p>
              )}
            </div>
          </aside>

          {/* ====================================================
              SOURCE MATERIAL
              ==================================================== */}

          <div className="order-1 min-w-0 lg:order-2">
            {processedSections.length ===
            0 ? (
              <div className="rounded-3xl border border-slate-200 bg-white p-10">
                <p className="text-sm leading-6 text-slate-500">
                  No published source content is currently available for this topic.
                </p>
              </div>
            ) : (
              <div className="space-y-8">
                {processedSections.map(
                  ({
                    section,
                    blocks:
                      sectionBlocks,
                  }) => {
                    const sectionTitle =
                      getSectionTitle(
                        section
                      ) ||
                      cleanSourceText(
                        section.title
                      )

                    return (
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
                          shadow-[0_8px_30px_rgba(7,27,73,0.04)]
                        "
                      >
                        {/* SECTION HEADER */}

                        {sectionTitle && (
                          <div className="border-b border-slate-100 bg-[#FBFCFE] px-7 py-6 md:px-10">
                            <h2 className="text-2xl font-semibold leading-8 text-[#071B49] md:text-3xl">
                              {sectionTitle}
                            </h2>
                          </div>
                        )}

                        {/* SOURCE CONTENT */}

                        <div className="px-7 py-8 md:px-10 md:py-10">
                          <div className="space-y-10">
                            {sectionBlocks.map(
                              (
                                contentBlock
                              ) => (
                                <RenderSourceBlock
                                  key={
                                    contentBlock
                                      .block
                                      .id
                                  }
                                  contentBlock={
                                    contentBlock
                                  }
                                  sectionTitle={
                                    sectionTitle
                                  }
                                  tables={
                                    tablesByBlock.get(
                                      contentBlock
                                        .block
                                        .id
                                    ) || []
                                  }
                                  assets={
                                    assetsByBlock.get(
                                      contentBlock
                                        .block
                                        .id
                                    ) || []
                                  }
                                />
                              )
                            )}
                          </div>
                        </div>
                      </article>
                    )
                  }
                )}

                {/* =================================================
                    QUIZ
                    ================================================= */}

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
                        <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#168BC4]">
                          Topic assessment
                        </p>

                        <h2 className="mt-2 text-2xl font-semibold text-[#071B49] md:text-3xl">
                          {quiz.title}
                        </h2>

                        {quiz.description && (
                          <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-500">
                            {
                              quiz.description
                            }
                          </p>
                        )}

                        {quiz.time_limit_seconds >
                          0 && (
                          <p className="mt-3 text-xs font-semibold text-slate-400">
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
                          hover:bg-[#102A5F]
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
        </div>
      </section>

      <CuraFooter />
    </main>
  )
}