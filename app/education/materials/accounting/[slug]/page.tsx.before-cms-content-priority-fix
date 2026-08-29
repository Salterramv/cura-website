"use client"

import Link from "next/link"
import { useEffect, useMemo, useState } from "react"
import { useParams } from "next/navigation"

import CuraHeader from "@/components/CuraHeader"
import CuraFooter from "@/components/CuraFooter"
import { createClient } from "@/lib/supabase/client"
import CuraSectionIllustration from "@/components/education/CuraSectionIllustration"
import { sanitizeRichText } from "@/lib/sanitize-html"
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
    .replace(/\\n/g, "\n")
    .replace(/\\u00a0/g, " ")
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

/*
 * PowerPoint imports can store a lecturer name as a separate
 * paragraph from the lecturer's qualification. The old cleanup
 * therefore missed names such as "ABDULLA AFHAAM".
 *
 * We only use this broader name test while cleaning the FIRST
 * CONTENT BLOCK of the FIRST SECTION, which corresponds to the
 * source cover/lecturer area. This prevents legitimate author
 * names or person names inside the actual lesson from being
 * removed.
 */
function isFirstSlideLecturerName(value: string) {
  const text = value.trim()

  if (!text || /\d/.test(text)) {
    return false
  }

  /*
   * Imported lecturer names are normally all-caps.
   */
  if (text !== text.toUpperCase()) {
    return false
  }

  /*
   * Require a normal two-to-five-word name.
   */
  if (
    !/^[A-Z][A-Z.'-]*(?:\s+[A-Z][A-Z.'-]*){1,4}$/.test(
      text
    )
  ) {
    return false
  }

  /*
   * Do not treat accounting headings as lecturer names.
   */
  const excludedWords = new Set([
    "SCOPE",
    "DEFINITIONS",
    "OBJECTIVE",
    "OBJECTIVES",
    "RECOGNITION",
    "MEASUREMENT",
    "PRESENTATION",
    "ACCOUNTING",
    "AGRICULTURE",
    "ASSETS",
    "LIABILITIES",
    "EQUITY",
    "REVENUE",
    "EXPENSES",
    "EXAMPLES",
    "EXAMPLE",
    "ILLUSTRATION",
    "ILLUSTRATIONS",
    "INTRODUCTION",
    "CONCLUSION",
    "SUMMARY",
    "BACKGROUND",
    "GOVERNMENT",
    "GRANTS",
    "BIOLOGICAL",
    "PRODUCE",
    "HARVEST",
    "INVENTORY",
    "INVENTORIES",
    "FAIR",
    "VALUE",
    "CURRENT",
    "NONCURRENT",
    "NON-CURRENT",
    "STATEMENT",
    "STATEMENTS",
    "FINANCIAL",
    "CONSOLIDATED",
    "CONSOLIDATION",
  ])

  const words = text.split(/\s+/)

  return !words.some((word) =>
    excludedWords.has(word)
  )
}

/*
 * Source image labels such as "Picture 3" are importer
 * artefacts. The image itself is still rendered.
 */
function isPictureLabel(value: string | null | undefined) {
  if (!value) {
    return false
  }

  return /^picture\s+\d+$/i.test(value.trim())
}

function isIllustrationLabel(
  value: string | null | undefined
) {
  if (!value) {
    return false
  }

  const text = value.trim()

  return (
    /^picture\s+\d+$/i.test(text) ||
    /^illustration\s+\d+$/i.test(text)
  )
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
      paragraph.text.trim().length > 0 &&
      !isPictureLabel(paragraph.text) &&
      !isIllustrationLabel(paragraph.text)
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
   FINANCIAL / TRANSACTION PRESENTATION
   ============================================================ */

function normalizeFinancialLine(value: string) {
  return value
    .replace(/\u00a0/g, " ")
    .replace(/\r/g, "")
    .trim()
}

function isJournalEntryLine(value: string) {
  const text = normalizeFinancialLine(value)

  return (
    /^(Dr|Cr)\s+/i.test(text) &&
    (
      /\t/.test(value) ||
      /\s{2,}/.test(text) ||
      /\d[\d,]*(?:\.\d+)?\s*$/.test(text)
    )
  )
}

function isFinancialColumnLine(value: string) {
  const text = normalizeFinancialLine(value)

  if (!text) {
    return false
  }

  if (/\t/.test(value)) {
    return true
  }

  return (
    /\b(?:X|XX|XXX|X\/\(X\)|\(X\)|\$\s*)$/i.test(text) &&
    /^(?:Contract|Less:|Overall|Revenue|Cost|Profit|Amount|Contract asset|Contract liability|Receivable)/i.test(text)
  )
}

function splitFinancialLine(value: string) {
  const original = value.replace(/\r/g, "")

  /*
   * Tabs are the most reliable signal from the imported
   * source material because they represent the original
   * accounting columns.
   */
  if (original.includes("\t")) {
    const parts = original
      .split(/\t+/)
      .map((part) => part.trim())
      .filter(Boolean)

    if (parts.length >= 2) {
      return {
        left: parts.slice(0, -1).join(" "),
        right: parts[parts.length - 1],
      }
    }
  }

  /*
   * Fallback for imported whitespace where tabs were lost.
   */
  const match = original.match(
    /^(.*?)(?:\s{2,})(\$|X|XX|XXX|X\/\(X\)|\(X\)|\([\d,]+(?:\.\d+)?\)|[\d,]+(?:\.\d+)?)\s*$/
  )

  if (match) {
    return {
      left: match[1].trim(),
      right: match[2].trim(),
    }
  }

  return null
}

function splitJournalEntry(value: string) {
  const text = normalizeFinancialLine(value)

  const match = text.match(
    /^(Dr|Cr)\s+(.+?)(?:\s{2,}|\t+)(\$?\s*[\d,]+(?:\.\d+)?)\s*$/i
  )

  if (!match) {
    return null
  }

  return {
    side: match[1].toUpperCase(),
    account: match[2].trim(),
    amount: match[3].trim(),
  }
}

function FinancialLine({
  text,
}: {
  text: string
}) {
  const journal = splitJournalEntry(text)

  if (journal) {
    return (
      <div className="grid grid-cols-[48px_minmax(0,1fr)_120px] items-center border-b border-[#168BC4]/10 py-2 text-base leading-7 last:border-b-0">
        <span className="font-bold text-[#071B49]">
          {journal.side}
        </span>

        <span className="min-w-0 text-[#102A5F]">
          {journal.account}
        </span>

        <span className="text-right font-semibold tabular-nums text-[#102A5F]">
          {journal.amount}
        </span>
      </div>
    )
  }

  const columns = splitFinancialLine(text)

  if (columns) {
    const isHeader =
      columns.right === "$"

    const isTotal =
      /^(Overall profit\/loss|Profit|Contract asset\/liability)/i.test(
        columns.left
      )

    return (
      <div
        className={`grid grid-cols-[minmax(0,1fr)_140px] items-center py-2 text-base leading-7 ${
          isTotal
            ? "font-bold text-[#071B49]"
            : "text-[#102A5F]"
        }`}
      >
        <span className="min-w-0">
          {columns.left}
        </span>

        <span
          className={`text-right tabular-nums ${
            isHeader
              ? "font-bold"
              : ""
          }`}
        >
          {columns.right}
        </span>
      </div>
    )
  }

  return (
    <div className="py-2 text-base leading-8 text-[#102A5F]">
      {text}
    </div>
  )
}

function FinancialBlock({
  paragraphs,
}: {
  paragraphs: PresentationParagraph[]
}) {
  const visible = paragraphs
    .map((paragraph) =>
      cleanSourceText(
        paragraph.text || ""
      )
    )
    .filter(Boolean)

  if (visible.length === 0) {
    return null
  }

  return (
    <div className="my-6 overflow-hidden rounded-2xl border border-[#168BC4]/15 bg-[#F8FBFD]">
      <div className="divide-y divide-[#168BC4]/10 px-5 py-3 md:px-7">
        {visible.map((text, index) => (
          <FinancialLine
            key={`${index}-${text}`}
            text={text}
          />
        ))}
      </div>
    </div>
  )
}

function containsFinancialLayout(
  paragraphs: PresentationParagraph[]
) {
  const text = paragraphs
    .map((paragraph) => paragraph.text || "")
    .join("\n")

  return (
    /\t/.test(text) &&
    (
      /\b(?:Dr|Cr)\b/.test(text) ||
      /\b(?:Contract price|Overall profit\/loss|Revenue|Cost of sales|Profit|Contract asset\/liability)\b/i.test(text)
    )
  )
}

/* ============================================================
   SOURCE PARAGRAPH
   ============================================================ */


function looksLikePointForm(value: string) {
  const text = value.trim()

  return (
    /^[•●▪◦]\s+/.test(text) ||
    /^[-–—]\s+/.test(text) ||
    /^\d+[.)]\s+/.test(text) ||
    /^[a-zA-Z][.)]\s+/.test(text)
  )
}

function PointFormParagraph({
  paragraph,
}: {
  paragraph: PresentationParagraph
}) {
  const text = cleanSourceText(
    paragraph.text || ""
  )

  if (!text) {
    return null
  }

  const match = text.match(
    /^([•●▪◦]|[-–—]|\d+[.)]|[a-zA-Z][.)])\s+(.*)$/
  )

  if (!match) {
    return null
  }

  const marker = match[1]
  const body = match[2]

  const numbered = /^\d/.test(marker)

  return (
    <div className="grid grid-cols-[28px_minmax(0,1fr)] gap-2 py-1 text-justify text-base leading-8 text-[#102A5F]">
      <span className="font-semibold text-[#168BC4]">
        {numbered ? marker : "•"}
      </span>

      <span className="min-w-0">
        {body}
      </span>
    </div>
  )
}

function SourceParagraph({
  paragraph,
}: {
  paragraph: PresentationParagraph
}) {
  const text = paragraph.text || ""

  if (
    !text.trim() ||
    isPictureLabel(text) ||
    isIllustrationLabel(text)
  ) {
    return null
  }

  if (looksLikePointForm(text)) {
    return <PointFormParagraph paragraph={paragraph} />
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

  const rawAlignment =
    String(paragraph.alignment || "")
      .trim()
      .toLowerCase()

  const isJustified =
    rawAlignment === "justify" ||
    rawAlignment === "justified" ||
    rawAlignment === "both" ||
    rawAlignment === "full"

  const alignment =
    rawAlignment === "center"
      ? "text-center"
      : rawAlignment === "right"
        ? "text-right"
        : rawAlignment === "left"
          ? "text-left"
          : isJustified
            ? "text-justify"
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
        className={`relative py-1 ${alignment} ${isJustified ? "text-justify [text-justify:inter-word]" : ""}`}
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
        className={`py-1 ${alignment} ${isJustified ? "text-justify [text-justify:inter-word]" : ""}`}
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
      className={`whitespace-pre-wrap break-words py-1 text-base leading-8 text-[#102A5F] ${alignment} ${isJustified ? "text-justify [text-justify:inter-word]" : ""}`}
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
  let columns =
    normalizeTableColumns(
      table.columns
    )

  const rows =
    normalizeTableRows(
      table.rows
    )

  /*
   * Some imported source tables store the first
   * row as the header and leave columns empty.
   */
  if (
    columns.length === 0 &&
    rows.length > 0
  ) {
    columns = rows[0]
    rows.shift()
  }

  if (rows.length === 0) {
    return null
  }

  return (
    <div className="my-8 overflow-hidden rounded-3xl border border-[#D7E0EA] bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse text-base">
          {columns.length > 0 && (
            <thead>
              <tr>
                {columns.map((column, index) => (
                  <th
                    key={index}
                    className="
                      border-r
                      border-white/10
                      bg-[#071B49]
                      px-4
                      py-3
                      text-left
                      font-semibold
                      text-white
                      last:border-r-0
                      md:px-5
                    "
                  >
                    <span className="whitespace-pre-wrap break-words">
                      {String(column ?? "")}
                    </span>
                  </th>
                ))}
              </tr>
            </thead>
          )}

          <tbody>
            {rows.map((row, rowIndex) => (
              <tr
                key={rowIndex}
                className={
                  rowIndex % 2 === 0
                    ? "bg-white"
                    : "bg-[#F7FAFC]"
                }
              >
                {row.map((cell, cellIndex) => (
                  <td
                    key={cellIndex}
                    className="
                      border-b
                      border-r
                      border-[#D7E0EA]
                      px-4
                      py-3
                      align-top
                      leading-7
                      text-[#102A5F]
                      last:border-r-0
                      md:px-5
                    "
                  >
                    <span className="whitespace-pre-wrap break-words">
                      {String(cell ?? "")}
                    </span>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {table.caption &&
        !isPictureLabel(table.caption) &&
        !isIllustrationLabel(table.caption) && (
          <p className="border-t border-slate-100 bg-[#F8FBFD] px-5 py-3 text-center text-sm leading-6 italic text-slate-500 md:px-6">
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
    <figure className="my-8 w-full">
      <div className="flex w-full justify-center overflow-hidden rounded-3xl border border-[#D7E0EA] bg-white p-3 md:p-5">
        <img
          src={asset.url}
          alt={
            asset.alt_text ||
            "Accounting illustration"
          }
          className="
            block
            h-auto
            max-h-[900px]
            w-auto
            max-w-full
            object-contain
          "
          loading="lazy"
        />
      </div>

      {asset.caption &&
        !isPictureLabel(asset.caption) &&
        !isIllustrationLabel(asset.caption) && (
          <figcaption className="mt-3 text-center text-sm leading-6 text-slate-500">
            {asset.caption}
          </figcaption>
        )}
    </figure>
  )
}

/* ============================================================
   VISUAL BLOCK HEADER
   ============================================================ */

function VisualBlockHeader({
  label,
  title,
}: {
  label: "Illustration" | "Table"
  title: string | null
}) {
  if (
    !title ||
    isHiddenSourceMetadata(title) ||
    isPictureLabel(title) ||
    isIllustrationLabel(title)
  ) {
    return null
  }

  return (
    <div className="border-b border-[#168BC4]/10 px-6 py-5 md:px-8">
      <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#168BC4]">
        {label}
      </p>

      <h3 className="mt-2 text-xl font-semibold leading-7 text-[#071B49]">
        {cleanSourceText(title)}
      </h3>
    </div>
  )
}

function SourceText({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="cura-education-source-text whitespace-pre-wrap text-[15px] leading-8 text-[#173565] md:text-base">
      {children}
    </div>
  )
}

/* ============================================================
   VISUAL BLOCK RENDERERS
   ============================================================ */

function SourceFigureBlock({
  block,
  assets,
}: {
  block: Block
  assets: EducationAsset[]
}) {
  return (
    <div className="my-8 overflow-hidden rounded-3xl border border-[#168BC4]/15 bg-[#F8FBFD]">
      <VisualBlockHeader
        label="Illustration"
        title={block.title}
      />

      {block.content &&
        cleanSourceText(block.content).length > 0 && (
          <div className="px-6 pt-6 md:px-8">
            <SourceText>
              {cleanSourceText(block.content)}
            </SourceText>
          </div>
        )}

      {assets.length > 0 && (
        <div className="mx-6 mb-6 overflow-hidden rounded-2xl border border-[#168BC4]/15 bg-white md:mx-8">
          <div className="space-y-6 p-5 md:p-7">
            {assets
              .slice()
              .sort(
                (a, b) =>
                  a.display_order - b.display_order
              )
              .map((asset) => (
                <SourceAsset
                  key={asset.id}
                  asset={asset}
                />
              ))}
          </div>
        </div>
      )}
    </div>
  )
}

function SourceTableBlock({
  block,
  tables,
}: {
  block: Block
  tables: EducationTable[]
}) {
  return (
    <div className="my-8 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
      <VisualBlockHeader
        label="Table"
        title={block.title}
      />

      {block.content &&
        cleanSourceText(block.content).length > 0 && (
          <div className="px-6 pt-6 md:px-8">
            <SourceText>
              {cleanSourceText(block.content)}
            </SourceText>
          </div>
        )}

      <div className="p-5 md:p-8">
        {tables.map((table) => (
          <SourceTable
            key={table.id}
            table={table}
          />
        ))}
      </div>
    </div>
  )
}

/* ============================================================
   LEGACY FALLBACK
   ============================================================ */

function isRichText(value: string) {
  return /<(strong|b|em|i|u|span|p|h[1-6]|ul|ol|li|a|br)\b/i.test(
    value || ""
  )
}

function RichText({
  value,
  className = "",
}: {
  value: string
  className?: string
}) {
  if (!value) return null

  if (!isRichText(value)) {
    return (
      <div
        className={`whitespace-pre-wrap break-words ${className}`}
      >
        {cleanSourceText(value)}
      </div>
    )
  }

  return (
    <div
      className={`break-words ${className}
        [&_p]:mb-4
        [&_strong]:font-bold
        [&_b]:font-bold
        [&_em]:italic
        [&_i]:italic
        [&_u]:underline
        [&_ul]:mb-4 [&_ul]:list-disc [&_ul]:pl-6
        [&_ol]:mb-4 [&_ol]:list-decimal [&_ol]:pl-6
        [&_li]:mb-1
        [&_h2]:mb-4 [&_h2]:mt-6 [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-[#071B49]
        [&_h3]:mb-3 [&_h3]:mt-5 [&_h3]:text-xl [&_h3]:font-semibold [&_h3]:text-[#071B49]
        [&_a]:font-semibold [&_a]:text-[#168BC4] [&_a]:underline`}
      dangerouslySetInnerHTML={{ __html: sanitizeRichText(value) }}
    />
  )
}

function renderLegacyItems(
  items: Item[],
  mode: "bullet" | "numbered" | "plain" = "plain"
) {
  const validItems = items
    .filter((item) => {
      const text = cleanSourceText(
        item.content || ""
      )

      return (
        text.length > 0 &&
        !isHiddenSourceMetadata(text) &&
        !isPictureLabel(text) &&
        !isIllustrationLabel(text)
      )
    })
    .sort(
      (a, b) =>
        a.display_order -
        b.display_order
    )

  if (validItems.length === 0) {
    return null
  }

  if (mode === "plain") {
    return (
      <div className="space-y-2">
        {validItems.map((item) => (
          <div
            key={item.id}
            className="py-1 text-base leading-8 text-[#102A5F]"
          >
            <RichText value={item.content || ""} />
          </div>
        ))}
      </div>
    )
  }

  return (
    <div
      className={
        mode === "numbered"
          ? "space-y-2"
          : "space-y-2"
      }
    >
      {validItems.map(
        (item, index) => {
          const isSubitem =
            item.item_type ===
            "subitem"

          const indent =
            isSubitem
              ? "ml-7"
              : ""

          if (
            mode === "numbered"
          ) {
            return (
              <div
                key={item.id}
                className={`flex gap-3 py-1 text-base leading-8 text-[#102A5F] ${indent}`}
              >
                <span className="flex h-7 min-w-7 shrink-0 items-center justify-center rounded-full bg-[#E7F5FB] text-xs font-bold text-[#145D8F]">
                  {index + 1}
                </span>

                <div className="min-w-0">
                  <RichText value={item.content || ""} />
                </div>
              </div>
            )
          }

          return (
            <div
              key={item.id}
              className={`relative py-1 pl-7 text-base leading-8 text-[#102A5F] ${indent}`}
            >
              <span className="absolute left-1 top-[15px] h-2 w-2 rounded-full bg-[#24B8ED]" />

              <div>
                <RichText value={item.content || ""} />
              </div>
            </div>
          )
        }
      )}
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

  const blockType = (block.block_type || "").toLowerCase()

  /*
   * Visual blocks are authoritative and must be rendered before the
   * presentation-text path. Otherwise an imported figure/table can
   * be treated as ordinary source text.
   */
  /*
   * SOURCE ILLUSTRATIONS
   *
   * The source asset is already attached to this exact
   * content block in Supabase.
   *
   * Render it inside the CURA visual treatment.
   *
   * We do NOT create an illustration merely because a
   * section has text. The existence of the source asset
   * is the trigger.
   */
  if (
    blockType === "image" ||
    blockType === "figure" ||
    blockType === "illustration"
  ) {
    return (
      <SourceFigureBlock
        block={block}
        assets={assets}
      />
    )
  }

  if (
    blockType === "table" &&
    tables.length > 0
  ) {
    return (
      <SourceTableBlock
        block={block}
        tables={tables}
      />
    )
  }

  /*
   * Dedicated source list blocks are stored in Supabase
   * as education_block_items.
   *
   * Do not rely on presentation.paragraphs for these.
   */
  if (
    blockType === "bullet_list" ||
    blockType === "numbered_list"
  ) {
    return (
      <div className="my-4">
        {block.title &&
          !isHiddenSourceMetadata(
            block.title
          ) &&
          !isPictureLabel(
            block.title
          ) &&
          !isIllustrationLabel(
            block.title
          ) && (
            <h3 className="mb-3 text-lg font-semibold leading-7 text-[#071B49]">
              {cleanSourceText(
                block.title
              )}
            </h3>
          )}

        {renderLegacyItems(
          items,
          blockType === "numbered_list"
            ? "numbered"
            : "bullet"
        )}
      </div>
    )
  }

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

    /*
     * Imported accounting examples sometimes arrive as
     * presentation paragraphs containing the original
     * tab-separated columns. Render those as accounting
     * schedules instead of ordinary justified prose.
     */
    if (containsFinancialLayout(paragraphs)) {
      return (
        <FinancialBlock
          paragraphs={paragraphs}
        />
      )
    }

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
            ) ||
            isPictureLabel(text) ||
            isIllustrationLabel(text)
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
          !isPictureLabel(block.title) &&
          !isIllustrationLabel(block.title) &&
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
        ) &&
        !isPictureLabel(block.title) &&
        !isIllustrationLabel(block.title) && (
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

  /*
   * ==========================================================
   * CURA PUBLIC CONTENT
   * ==========================================================
   *
   * The public accounting library is now CURA-authored.
   *
   * Old imported lecture/source sections remain in Supabase
   * for archival/reference purposes but MUST NOT be rendered.
   *
   * CURA sections use section_type = "summary".
   *
   * Once the full CURA lesson is populated, every public
   * accounting topic will therefore consist exclusively of
   * the new CURA content.
   */

  /*
   * Render the complete topic lesson.
   *
   * CURA Learning Map and CURA Key Takeaways are part of the
   * lesson, followed by the substantive accounting sections.
   *
   * We deliberately do not filter to "summary" here because
   * doing so hides the actual topic content.
   */
  const publicSections =
    [...sections]
      .sort(
        (a, b) =>
          a.display_order - b.display_order
      )

  const sectionsWithBlocks =
    publicSections
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
        /*
         * Only the first content block of the first section is
         * treated as the source cover/lecturer area.
         *
         * The rest of the lesson is left untouched.
         */
        const processedBlocks =
  entry.blocks.map(
    (contentBlock) => {
      const block = contentBlock.block

      /*
       * The first section is the imported source cover.
       *
       * Lecturer names, lecturer labels and qualifications
       * can appear in different blocks/paragraphs depending
       * on how the source material was imported.
       *
       * Therefore we clean the entire first section, not
       * merely its first block.
       */
      const isFirstCoverSection =
        sectionIndex === 0


              const presentation =
                getPresentation(block)

              /*
               * Presentation data is authoritative.
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
                      ) => {
                        const cleanedText =
                          stripLecturerText(
                            paragraph.text ||
                              ""
                          )

                        /*
                         * The imported lecturer name can be
                         * a standalone all-caps paragraph.
                         * Remove it only from the first
                         * cover block.
                         */
                        if (
                          isFirstCoverSection &&
                          isFirstSlideLecturerName(
                            cleanedText
                          )
                        ) {
                          return {
                            ...paragraph,
                            text: "",
                          }
                        }

                        return {
                          ...paragraph,
                          text: cleanedText,
                        }
                      }
                    )
                    .filter(
                      (
                        paragraph
                      ) => {
                        const text =
                          paragraph.text?.trim() ||
                          ""

                        return (
                          text.length > 0 &&
                          !isHiddenSourceMetadata(
                            text
                          ) &&
                          !isPictureLabel(
                            text
                          ) &&
                          !isIllustrationLabel(
                            text
                          )
                        )
                      }
                    )

                return {
                  ...contentBlock,
                  block: {
                    ...block,
                    title:
                      isFirstCoverSection &&
                      isFirstSlideLecturerName(
                        block.title || ""
                      )
                        ? ""
                        : block.title,
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
              const cleanedTitle =
                stripLecturerText(
                  block.title || ""
                )

              const cleanedContent =
                stripLecturerText(
                  block.content || ""
                )

              const cleanedItems =
                contentBlock.items
                  .map(
                    (item) => {
                      const cleaned =
                        stripLecturerText(
                          item.content ||
                            ""
                        )

                      return {
                        ...item,
                        content:
                          cleaned,
                      }
                    }
                  )
                  .filter(
                    (item) => {
                      const text =
                        item.content.trim()

                      if (
                        !text ||
                        isHiddenSourceMetadata(
                          text
                        ) ||
                        isPictureLabel(
                          text
                        ) ||
                        isIllustrationLabel(
                          text
                        )
                      ) {
                        return false
                      }

                      if (
                        isFirstCoverSection &&
                        isFirstSlideLecturerName(
                          text
                        )
                      ) {
                        return false
                      }

                      return true
                    }
                  )

              return {
                ...contentBlock,
                block: {
                  ...block,
                  title:
                    isFirstCoverSection &&
                    isFirstSlideLecturerName(
                      cleanedTitle
                    )
                      ? ""
                      : cleanedTitle,
                  content:
                    isFirstCoverSection &&
                    isFirstSlideLecturerName(
                      cleanedContent
                    )
                      ? ""
                      : cleanedContent,
                },
                items:
                  cleanedItems,
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
            <div>
              <div className="flex flex-wrap gap-3">
                <span className="inline-flex rounded-full bg-[#168BC4] px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-white">
                  CURA Education
                </span>
                {topic.standard && (
                  <span className="inline-flex rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs font-semibold text-[#A9E4F6]">
                    {topic.standard}
                  </span>
                )}
              </div>

              <h1 className="mt-6 text-4xl font-semibold tracking-tight text-white md:text-6xl">
                {topic.title}
              </h1>

              {topic.description && (
                <p className="mt-6 max-w-3xl text-base leading-8 text-white/75 md:text-lg">
                  {topic.description}
                </p>
              )}
            </div>
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
                          className="bg-[#168BC4] text-white 
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
                  CURA learning content is currently being prepared for this topic.
                </p>
              )}
            </div>
          </aside>

          {/* ====================================================
              CURA LEARNING CONTENT
              ==================================================== */}

          <div className="order-1 min-w-0 lg:order-2">
            {processedSections.length ===
            0 ? (
              <div className="rounded-3xl border border-slate-200 bg-white p-10">
                <p className="text-sm leading-6 text-slate-500">
                  No published CURA learning content is currently available for this topic.
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
                            <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#168BC4]">
                              Section {processedSections.findIndex((entry) => entry.section.id === section.id) + 1}
                            </p>
                            <h2 className="mt-2 text-2xl font-semibold leading-8 text-[#071B49] md:text-3xl">
                              {sectionTitle}
                            </h2>
                          </div>
                        )}

                        <div className="px-7 pt-7 md:px-10 md:pt-8">
                          <CuraSectionIllustration
                            visual={
                              section.presentation
                                ?.cura_visual as
                                | {
                                    type?: string
                                    eyebrow?: string
                                    title?: string
                                    nodes?: string[]
                                    note?: string
                                  }
                                | null
                                | undefined
                            }
                          />
                        </div>

                        {/* CURA CONTENT */}

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