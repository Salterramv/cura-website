"use client"

import Link from "next/link"
import { useEffect, useMemo, useState } from "react"
import { useParams } from "next/navigation"

import CuraHeader from "@/components/CuraHeader"
import CuraFooter from "@/components/CuraFooter"
import { createClient } from "@/lib/supabase/client"

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

/*
 * SOURCE PRESENTATION RULES
 *
 * The PDFs are the authority. The website must not invent labels,
 * lecture metadata, or generic headings that are not present in the
 * source material.
 */

const HIDDEN_SOURCE_METADATA = [
  /^SBR\s+New\s+Knowledge$/i,
  /^FR\s+Knowledge$/i,
  /^F\d+\s+Knowledge$/i,
  /^TUU\s*\d+(?:\s+.*)?$/i,
  /^Homework\s+TUU\s*\d+.*$/i,
]

/*
 * ===========================================================
 * REMOVE FIRST-SLIDE LECTURER DETAILS
 * ===========================================================
 *
 * Each imported PPT begins with a cover slide containing the
 * lecturer's name and qualifications. That slide is useful for
 * the original lecture file, but it is not part of the learning
 * material and must not appear on the CURA topic page.
 *
 * We remove only lecturer metadata from the FIRST source section.
 * We do not remove qualifications or names from later learning
 * sections because those may be legitimate source content.
 */

const LECTURER_LABEL_PATTERNS = [
  /^(?:lecturer|presented\s+by|prepared\s+by|facilitator|trainer|instructor)\s*[:\-]/i,
  /^(?:lecturer|presenter|facilitator|trainer|instructor)\s*$/i,
]

const QUALIFICATION_PATTERN =
  /\b(?:ACCA|FCA|MBA|BBA|BA|BSc|BS|MA|MSc|MCom|PhD|CPA|CFA|CIMA|CIA|CISA|ACA|CA|Cert\.?\s*[A-Za-z]+|Bachelor(?:'s)?|Master(?:'s)?|Doctorate)\b/i

function isLecturerQualificationLine(value: string) {
  const cleaned = value.trim()

  if (!cleaned || !QUALIFICATION_PATTERN.test(cleaned)) {
    return false
  }

  /*
   * A qualification line on the cover slide normally contains
   * several qualifications, separators, or a qualification phrase.
   * This keeps ordinary source sentences containing one acronym
   * from being treated as lecturer metadata.
   */
  const qualificationCount = (
    cleaned.match(
      /\b(?:ACCA|FCA|MBA|BBA|BA|BSc|BS|MA|MSc|MCom|PhD|CPA|CFA|CIMA|CIA|CISA|ACA|CA|Bachelor(?:'s)?|Master(?:'s)?|Doctorate)\b/gi
    ) || []
  ).length

  return (
    qualificationCount >= 2 ||
    /[,;&|]/.test(cleaned) ||
    /\b(?:Bachelor|Master|Doctorate)\b/i.test(cleaned)
  )
}

function looksLikeLecturerName(value: string) {
  const cleaned = value.trim()

  if (!cleaned || /\d/.test(cleaned)) {
    return false
  }

  if (!/^[A-Z][A-Za-z.'-]*(?:\s+[A-Z][A-Za-z.'-]*){1,4}$/.test(cleaned)) {
    return false
  }

  /*
   * Do not mistake common source headings for a person's name.
   */
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
    "illustration",
    "illustrations",
    "introduction",
    "conclusion",
    "summary",
    "background",
  ])

  const words = cleaned.toLowerCase().split(/\s+/)

  if (words.some((word) => headingWords.has(word))) {
    return false
  }

  /*
   * Cover-slide names are commonly presented in all capitals.
   * We also allow title-case names so the rule works with different
   * PPT extraction formats.
   */
  return true
}

function isLecturerMetadataLine(value: string, nextValue = "") {
  const cleaned = value.trim()

  if (!cleaned) {
    return false
  }

  if (
    LECTURER_LABEL_PATTERNS.some((pattern) =>
      pattern.test(cleaned)
    )
  ) {
    return true
  }

  if (isLecturerQualificationLine(cleaned)) {
    return true
  }

  /*
   * A standalone lecturer name is removed only when the following
   * source line is clearly a qualification line. This prevents
   * ordinary all-capital accounting headings from being removed.
   */
  if (
    looksLikeLecturerName(cleaned) &&
    isLecturerQualificationLine(nextValue)
  ) {
    return true
  }

  return false
}

function stripLecturerMetadataFromText(
  value: string,
  nextValue = ""
) {
  if (!value) {
    return value
  }

  const lines = cleanSourceText(value)
    .split("\n")
    .map((line) => line.trimEnd())
    .filter(Boolean)

  const output: string[] = []

  for (let index = 0; index < lines.length; index += 1) {
    const line = lines[index]
    const followingLine =
      lines[index + 1] || nextValue

    if (isLecturerMetadataLine(line, followingLine)) {
      continue
    }

    output.push(line)
  }

  return output.join("\n").trim()
}

function stripLecturerMetadataFromFirstSection(
  entry: ContentBlock[]
) {
  /*
   * Build a flattened sequence of all textual units so a lecturer
   * name in one database item can still be recognised when its
   * qualification line is stored in the next item.
   */
  const sourceValues: Array<{
    kind: "block-title" | "block-content" | "item"
    blockIndex: number
    itemIndex?: number
    value: string
  }> = []

  entry.forEach((contentBlock, blockIndex) => {
    if (contentBlock.block.title?.trim()) {
      sourceValues.push({
        kind: "block-title",
        blockIndex,
        value: contentBlock.block.title,
      })
    }

    if (contentBlock.block.content?.trim()) {
      sourceValues.push({
        kind: "block-content",
        blockIndex,
        value: contentBlock.block.content,
      })
    }

    contentBlock.items.forEach((item, itemIndex) => {
      if (item.content?.trim()) {
        sourceValues.push({
          kind: "item",
          blockIndex,
          itemIndex,
          value: item.content,
        })
      }
    })
  })

  const nextTextByIndex = new Map<number, string>()

  for (let index = 0; index < sourceValues.length; index += 1) {
    nextTextByIndex.set(
      index,
      sourceValues[index + 1]?.value || ""
    )
  }

  return entry
    .map((contentBlock, blockIndex) => {
      const blockTitleIndex = sourceValues.findIndex(
        (value) =>
          value.kind === "block-title" &&
          value.blockIndex === blockIndex
      )

      const blockContentIndex = sourceValues.findIndex(
        (value) =>
          value.kind === "block-content" &&
          value.blockIndex === blockIndex
      )

      const nextForTitle =
        blockTitleIndex >= 0
          ? nextTextByIndex.get(blockTitleIndex) || ""
          : ""

      const nextForContent =
        blockContentIndex >= 0
          ? nextTextByIndex.get(blockContentIndex) || ""
          : ""

      const revisedBlock = {
        ...contentBlock.block,
        title:
          contentBlock.block.title &&
          !isLecturerMetadataLine(
            contentBlock.block.title,
            nextForTitle
          )
            ? stripLecturerMetadataFromText(
                contentBlock.block.title,
                nextForTitle
              )
            : "",
        content:
          contentBlock.block.content &&
          !isLecturerMetadataLine(
            contentBlock.block.content,
            nextForContent
          )
            ? stripLecturerMetadataFromText(
                contentBlock.block.content,
                nextForContent
              )
            : "",
      }

      const revisedItems = contentBlock.items
        .map((item, itemIndex) => {
          const itemSourceIndex = sourceValues.findIndex(
            (value) =>
              value.kind === "item" &&
              value.blockIndex === blockIndex &&
              value.itemIndex === itemIndex
          )

          const nextForItem =
            itemSourceIndex >= 0
              ? nextTextByIndex.get(itemSourceIndex) || ""
              : ""

          if (
            isLecturerMetadataLine(
              item.content,
              nextForItem
            )
          ) {
            return {
              ...item,
              content: "",
            }
          }

          return {
            ...item,
            content: stripLecturerMetadataFromText(
              item.content,
              nextForItem
            ),
          }
        })
        .filter((item) => item.content.trim().length > 0)

      return {
        ...contentBlock,
        block: revisedBlock,
        items: revisedItems,
      }
    })
    .filter(
      ({ block, items }) =>
        Boolean(block.title?.trim()) ||
        Boolean(block.content?.trim()) ||
        items.length > 0
    )
}


function cleanSourceText(value: string) {
  return value
    .replace(/\t/g, "\t")
    .replace(/\u00a0/g, " ")
    .split("\n")
    .map((line) => line.trimEnd())
    .filter(
      (line) =>
        line.trim().length > 0 &&
        !HIDDEN_SOURCE_METADATA.some((pattern) =>
          pattern.test(line.trim())
        )
    )
    .join("\n")
    .trim()
}

function isHiddenSourceMetadata(value: string) {
  const cleaned = value.trim()
  return (
    !cleaned ||
    HIDDEN_SOURCE_METADATA.some((pattern) =>
      pattern.test(cleaned)
    )
  )
}

/*
 * Determine whether a block should visually behave as an illustration.
 *
 * We use both the database block_type and title because the source
 * material contains illustration headings in different structures.
 */
function isIllustration(block: Block) {
  const type = (block.block_type || "").toLowerCase().trim()
  const title = (block.title || "").toLowerCase().trim()
  const content = (block.content || "").toLowerCase().trim()

  return (
    type === "illustration" ||
    type.includes("illustration") ||
    title.startsWith("illustration") ||
    content.startsWith("illustration")
  )
}

/*
 * Determine whether a block is an example.
 */
function isExample(block: Block) {
  const type = (block.block_type || "").toLowerCase()
  const title = (block.title || "").toLowerCase()

  return (
    type === "example" ||
    type.includes("example") ||
    title.startsWith("example")
  )
}

/*
 * Normalize block type so the presentation is controlled by the
 * actual source structure rather than by generic paragraph styling.
 */

/* ============================================================
 * GLOBAL SOURCE-MATERIAL FORMAT PRESERVATION
 *
 * Source material is not always plain bullet-point text.
 *
 * Tabs are meaningful in the original materials and are used
 * for:
 *
 *   - accounting journal columns
 *   - debit / credit layouts
 *   - amount columns
 *   - formulas
 *   - calculation layouts
 *   - other structured source material
 *
 * Therefore tab-separated content must NEVER automatically be
 * converted into an ordinary bullet.
 * ============================================================ */

function getSourceColumns(content: string) {
  /*
   * Keep empty columns because multiple tabs represent
   * intentional horizontal spacing in the source.
   */
  return content
    .split("\t")
    .map((value) => value.trim())
}

function hasSourceColumns(content: string) {
  return content.includes("\t")
}

function isCurrencyOnlySourceRow(content: string) {
  const columns = getSourceColumns(content)
  const nonEmpty = columns.filter(Boolean)

  return (
    nonEmpty.length >= 2 &&
    nonEmpty.every((value) => /^\$+$/.test(value))
  )
}

function renderSourceStructuredRow(item: Item) {
  const content = item.content || ""
  const columns = getSourceColumns(content)

  /*
   * Remove only trailing empty columns.
   * Internal empty columns are preserved because they represent
   * source positioning.
   */
  while (
    columns.length > 0 &&
    columns[columns.length - 1] === ""
  ) {
    columns.pop()
  }

  /*
   * A simple two-column source layout.
   */
  if (columns.length <= 2) {
    return (
      <div
        className="
          grid
          grid-cols-[minmax(0,1fr)_120px]
          items-start
          gap-6
          py-1
          text-base
          leading-8
          text-slate-700
        "
      >
        <div className="whitespace-pre-wrap break-words">
          {columns[0] || ""}
        </div>

        <div className="whitespace-pre-wrap text-right">
          {columns[1] || ""}
        </div>
      </div>
    )
  }

  /*
   * Three-column source layout.
   *
   * This covers common accounting material such as:
   *
   * Account description | X | Explanation
   */
  return (
    <div
      className="
        grid
        grid-cols-[minmax(0,1fr)_120px_minmax(0,1fr)]
        items-start
        gap-6
        py-1
        text-base
        leading-8
        text-slate-700
      "
    >
      <div className="whitespace-pre-wrap break-words">
        {columns[0] || ""}
      </div>

      <div className="whitespace-pre-wrap text-center">
        {columns[1] || ""}
      </div>

      <div className="whitespace-pre-wrap break-words">
        {columns
          .slice(2)
          .filter(Boolean)
          .join(" ")}
      </div>
    </div>
  )
}


function normalizeSourceContent(value: string) {
  return cleanSourceText(value)
}

function isJournalRow(content: string) {
  const value = normalizeSourceContent(content).trim()

  return (
    /^(Dr|Cr)\b/i.test(value) &&
    /\bX\s*$/i.test(value)
  )
}

function getJournalDescription(content: string) {
  const value =
    normalizeSourceContent(content)
      .replace(/\t+/g, " ")
      .trim()

  /*
   * Remove the final X from the description.
   */
  return value
    .replace(/\s+X\s*$/i, "")
    .trim()
}

function getJournalType(content: string) {
  const value =
    normalizeSourceContent(content).trim()

  if (/^Dr\b/i.test(value)) {
    return "Dr"
  }

  if (/^Cr\b/i.test(value)) {
    return "Cr"
  }

  return ""
}


function renderJournalHeader(item: Item) {
  return (
    <div
      key={item.id}
      className="
        grid
        grid-cols-[minmax(0,1fr)_110px_110px]
        items-center
        py-1
        text-base
        leading-8
        text-black
      "
    >
      <div />

      <div className="text-center font-medium">
        $
      </div>

      <div className="text-center font-medium">
        $
      </div>
    </div>
  )
}

function renderJournalRow(item: Item) {
  const content =
    normalizeSourceContent(item.content || "")
      .trim()

  const type =
    getJournalType(content)

  const description =
    getJournalDescription(content)

  const isCredit = type === "Cr"

  return (
    <div
      key={item.id}
      className="
        grid
        grid-cols-[minmax(0,1fr)_110px_110px]
        items-start
        py-1
        text-base
        leading-8
      "
    >
      <div className="whitespace-pre-wrap break-words text-black">
        <span
          className={
            type === "Dr"
              ? "font-bold text-[#16A34A]"
              : "font-bold text-[#DC2626]"
          }
        >
          {type}
        </span>

        <span className="text-[#102A5F]">
          {" "}
          {description.replace(
            /^(Dr|Cr)\s+/i,
            ""
          )}
        </span>
      </div>

      <div className="text-center text-black">
        {!isCredit && "X"}
      </div>

      <div className="text-center text-black">
        {isCredit && "X"}
      </div>
    </div>
  )
}

/*
 * ------------------------------------------------------------
 * SOURCE-SPECIFIC TEXT FORMATTING
 * ------------------------------------------------------------
 *
 * The source material contains some formatting that is carried
 * in the wording itself rather than in the database item type.
 *
 * These helpers preserve that formatting without changing the
 * actual source wording.
 */

function renderSourceFormattedText(
  content: string
) {
  const value =
    normalizeSourceContent(content)
      .trim()

  /*
   * "Steps:"
   */
  if (
    /^Steps:\s*$/i.test(value)
  ) {
    return (
      <span className="font-bold text-black">
        Steps:
      </span>
    )
  }

  /*
   * Journal heading.
   */
  if (
    /^Journal\s*\(/i.test(value)
  ) {
    return (
      <span
        className="
          font-bold
          italic
          underline
          decoration-1
          underline-offset-2
          text-black
        "
      >
        {value}
      </span>
    )
  }

  /*
   * The source specifically highlights:
   *
   * "Assuming a revaluation Gain"
   *
   * in green and bold.
   */
  const gainMatch =
    value.match(
      /^(.*?)(Assuming a revaluation Gain)(.*)$/i
    )

  if (gainMatch) {
    return (
      <>
        <span className="text-[#102A5F]">
          {gainMatch[1]}
        </span>

        <span className="font-bold text-[#16A34A]">
          {gainMatch[2]}
        </span>

        <span className="text-[#102A5F]">
          {gainMatch[3]}
        </span>
      </>
    )
  }

  return (
    <span className="text-[#102A5F]">
      {value}
    </span>
  )
}

function isNumberedSourceLine(
  content: string
) {
  return /^\(\d+\)\s*/.test(
    normalizeSourceContent(content).trim()
  )
}

function renderNumberedSourceLine(
  item: Item
) {
  const value =
    normalizeSourceContent(item.content || "")
      .trim()

  const match =
    value.match(
      /^\((\d+)\)\s*(.*)$/
    )

  if (!match) {
    return null
  }

  return (
    <div
      key={item.id}
      className="
        grid
        grid-cols-[64px_minmax(0,1fr)]
        items-start
        py-1
        text-base
        leading-8
      "
    >
      <div
        className="
          font-medium
          text-[#168BC4]
        "
      >
        ({match[1]})
      </div>

      <div className="text-base leading-8 text-[#102A5F]">
        {match[2]}
      </div>
    </div>
  )
}



/*
 * ============================================================
 * GLOBAL CURA SOURCE TYPOGRAPHY
 * ============================================================
 *
 * All accounting source material uses the same typography.
 * Do not create section-specific font sizes.
 *
 * The accounting page inherits the CURA font from the
 * application layout.
 */

const CURA_SOURCE_TEXT =
  "text-base leading-8 text-[#102A5F]"

const CURA_SOURCE_SMALL =
  "text-sm leading-7 text-[#102A5F]"

const CURA_SOURCE_NUMBER =
  "text-base leading-8 text-[#168BC4]"

function sourceTextClass(content: string) {
  const value = content.trim()

  /*
   * Source headings / sub-headings
   */
  if (
    /^steps?:?$/i.test(value) ||
    /^journal\s*\(/i.test(value) ||
    /^definitions$/i.test(value)
  ) {
    return "font-bold"
  }

  return ""
}

function isJournalHeader(content: string) {
  return /^journal\s*\(/i.test(content.trim())
}

function isJournalAmountLine(content: string) {
  const value = content.trim()

  return (
    value === "$ $" ||
    value === "$   $" ||
    /^\$\s+\$/.test(value)
  )
}

function isJournalDebit(content: string) {
  return /^\s*Dr\b/i.test(content)
}

function isJournalCredit(content: string) {
  return /^\s*Cr\b/i.test(content)
}

function renderFormattedSourceText(content: string) {
  const value = content.trim()

  /*
   * Journal heading:
   * bold + italic + underline, matching the source.
   */
  if (isJournalHeader(value)) {
    return (
      <span className="font-bold italic underline decoration-2 underline-offset-4">
        {value}
      </span>
    )
  }

  /*
   * Journal debit rows:
   * "Dr" is green and bold in the source.
   */
  if (isJournalDebit(value)) {
    const match = value.match(/^(\s*Dr\b)(.*)$/i)

    if (match) {
      return (
        <>
          <span className="font-bold text-[#00A651]">
            {match[1]}
          </span>
          <span>{match[2]}</span>
        </>
      )
    }
  }

  /*
   * Journal credit rows:
   * "Cr" is red and bold in the source.
   */
  if (isJournalCredit(value)) {
    const match = value.match(/^(\s*Cr\b)(.*)$/i)

    if (match) {
      return (
        <>
          <span className="font-bold text-[#D00000]">
            {match[1]}
          </span>
          <span>{match[2]}</span>
        </>
      )
    }
  }

  /*
   * Numbered source steps.
   *
   * The source uses:
   * (1), (2), (3)
   *
   * These must NOT become ordinary bullet points.
   */
  const numbered = value.match(/^\((\d+)\)\s*(.*)$/)

  if (numbered) {
    return (
      <div className="flex items-start gap-4">
        <span className="shrink-0 font-medium text-[#168BC4]">
          ({numbered[1]})
        </span>

        <span>{numbered[2]}</span>
      </div>
    )
  }

  /*
   * Preserve the green phrase in the revaluation source.
   *
   * This is deliberately limited to the source phrase rather
   * than recolouring an entire paragraph.
   */
  if (/^assuming a revaluation gain\b/i.test(value)) {
    const match = value.match(
      /^(Assuming a revaluation Gain)(.*)$/i
    )

    if (match) {
      return (
        <>
          <span className="text-[#00A651]">
            {match[1]}
          </span>
          <span>{match[2]}</span>
        </>
      )
    }
  }

  return value
}

function renderJournalAmountColumns(content: string) {
  /*
   * The source journal has two fixed amount columns.
   *
   * We deliberately use a grid rather than spaces in the text.
   * This prevents browser whitespace collapsing from moving
   * the $ and X values.
   */
  const value = content.trim()

  if (isJournalAmountLine(value)) {
    return (
      <div
        className="
          grid
          grid-cols-[minmax(0,1fr)_140px_140px]
          items-center
          min-h-[42px]
          text-base
          font-medium
        "
      >
        <div />

        <div className="text-center">
          $
        </div>

        <div className="text-center">
          $
        </div>
      </div>
    )
  }

  const debit = isJournalDebit(value)
  const credit = isJournalCredit(value)

  if (!debit && !credit) {
    return null
  }

  const match = value.match(
    /^(Dr|Cr)\s+(.*?)(?:\s+)(X)\s*$/i
  )

  if (!match) {
    return null
  }

  const account = match[2]
  const amount = match[3]

  return (
    <div
      className="
        grid
        grid-cols-[minmax(0,1fr)_140px_140px]
        items-start
        min-h-[42px]
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
          {match[1]}
        </span>{" "}
        {account}
      </div>

      <div className="text-center">
        {debit ? amount : ""}
      </div>

      <div className="text-center">
        {credit ? amount : ""}
      </div>
    </div>
  )
}

function renderSourceItem(item: Item) {
  const content =
    normalizeSourceContent(item.content || "")
      .trim()

  if (!content) {
    return null
  }

  /*
   * Journal content gets its own source-faithful renderer.
   * This prevents the browser from collapsing the spaces
   * between $ and X columns.
   */
  if (
    isJournalAmountLine(content) ||
    isJournalDebit(content) ||
    isJournalCredit(content)
  ) {
    return (
      <div
        key={item.id}
        className="my-1 w-full"
      >
        {renderJournalAmountColumns(content)}
      </div>
    )
  }

  /*
   * Journal heading is not a bullet.
   */
  if (isJournalHeader(content)) {
    return (
      <div
        key={item.id}
        className="
          mt-5
          mb-4
          text-base
          leading-8
          text-[#111111]
        "
      >
        {renderFormattedSourceText(content)}
      </div>
    )
  }

  /*
   * Numbered source material should remain numbered.
   */
  if (/^\(\d+\)\s*/.test(content)) {
    return (
      <div
        key={item.id}
        className="
          my-3
          text-base
          leading-8
          text-[#111111]
        "
      >
        {renderFormattedSourceText(content)}
      </div>
    )
  }

  /*
   * Ordinary source content.
   *
   * Keep the CURA bullet only where the source item itself
   * is represented as a bullet. Do not force every source
   * line into a bullet.
   */
  return (
    <div
      key={item.id}
      className={`
        text-base
        leading-8
        text-[#111111]
        ${sourceTextClass(content)}
      `}
    >
      {renderFormattedSourceText(content)}
    </div>
  )
}

function shouldRenderAsBullet(item: Item) {
  const value = (item.content || "").trim()

  if (!value) {
    return false
  }

  /*
   * Currency/calculation placeholders from the source material
   * are not bullet points.
   *
   * Examples:
   *   $ $
   *   $   $
   *   $       $
   */
  const withoutWhitespace = value.replace(/\s+/g, "")

  if (
    /^\$+$/.test(withoutWhitespace) ||
    /^\$+\$+$/.test(withoutWhitespace)
  ) {
    return false
  }

  /*
   * Lines containing only accounting separators or formatting
   * characters should remain source-format content rather than
   * becoming bullets.
   */
  if (
    /^[\$\-_=.,:;|]+$/.test(
      withoutWhitespace
    )
  ) {
    return false
  }

  return true
}

function getBlockType(block: Block) {
  const type = (block.block_type || "").toLowerCase().trim()

  if (
    type === "bullet_list" ||
    type === "bullet-list" ||
    type === "bullets" ||
    type === "bullet"
  ) {
    return "bullet"
  }

  if (
    type === "numbered_list" ||
    type === "numbered-list" ||
    type === "numbered" ||
    type === "ordered_list" ||
    type === "ordered-list"
  ) {
    return "numbered"
  }

  if (type === "example" || type.includes("example")) {
    return "example"
  }

  if (type === "illustration" || type.includes("illustration")) {
    return "illustration"
  }

  return "paragraph"
}

/*
 * Keep the source text intact while allowing line breaks and tabs
 * contained in the imported source material to remain visible.
 */
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
        "text-base",
        "leading-8",
        "text-[#102A5F]",
        className,
      ].join(" ")}
    >
      {children}
    </div>
  )
}

/*
 * Render a single source block according to its actual source type.
 *
 * IMPORTANT:
 * We do not rewrite or summarize source material here.
 */
function isNumericSectionTitle(value: string) {
  return /^\d+(?:\.\d+)?$/.test(value.trim())
}

function getDisplaySectionTitle(
  section: Section,
  sectionBlocks: ContentBlock[]
) {
  const sectionTitle = cleanSourceText(section.title || "").trim()

  if (
    sectionTitle &&
    !isNumericSectionTitle(sectionTitle) &&
    !isHiddenSourceMetadata(sectionTitle)
  ) {
    return sectionTitle
  }

  for (const contentBlock of sectionBlocks) {
    const blockTitle = cleanSourceText(
      contentBlock.block.title || ""
    ).trim()

    if (
      blockTitle &&
      !isNumericSectionTitle(blockTitle) &&
      !isHiddenSourceMetadata(blockTitle)
    ) {
      return blockTitle
    }

    const blockContent = cleanSourceText(
      contentBlock.block.content || ""
    )

    const lines = blockContent
      .split(/\r?\n/)
      .map((line) => line.trim())
      .filter(Boolean)

    for (const line of lines) {
      if (
        !isNumericSectionTitle(line) &&
        !isHiddenSourceMetadata(line) &&
        !/^[•·▪‣◦]$/.test(line)
      ) {
        return line
      }
    }

    for (const item of contentBlock.items) {
      const value = cleanSourceText(
        item.content || ""
      ).trim()

      if (
        value &&
        !isNumericSectionTitle(value) &&
        !isHiddenSourceMetadata(value) &&
        !/^[•·▪‣◦]$/.test(value)
      ) {
        return value
      }
    }
  }

  return sectionTitle
}

function RenderSourceBlock({
  contentBlock,
  sectionTitle,
  tables = [],
  assets = [],
}: {
  contentBlock: ContentBlock
  sectionTitle: string
  tables?: EducationTable[]
  assets?: EducationAsset[]
}) {
  const { block, items } = contentBlock
  const blockType = getBlockType(block)

  const validItems = items
    .map((item) => ({
      ...item,
      content: cleanSourceText(item.content || ""),
    }))
    .filter(
      (item) =>
        typeof item.content === "string" &&
        item.content.trim().length > 0 &&
        !isHiddenSourceMetadata(item.content)
    )

  const blockTitle =
    typeof block.title === "string"
      ? cleanSourceText(block.title)
      : ""

  const normalizedSectionTitle =
    sectionTitle
      .toLowerCase()
      .replace(/[–—-]/g, "-")
      .replace(/\s+/g, " ")
      .trim()

  const normalizedBlockTitle =
    blockTitle
      .toLowerCase()
      .replace(/[–—-]/g, "-")
      .replace(/\s+/g, " ")
      .trim()

  const duplicateBlockTitle =
    normalizedBlockTitle.length > 0 &&
    normalizedBlockTitle === normalizedSectionTitle

  const renderEducationTable = (
    table: EducationTable
  ) => {
    const columns = Array.isArray(table.columns)
      ? table.columns
      : []

    const rows = Array.isArray(table.rows)
      ? table.rows
      : []

    return (
      <div
        key={table.id}
        className="my-6 overflow-x-auto rounded-2xl border border-slate-200"
      >
        <table className="w-full border-collapse text-base">
          {columns.length > 0 && (
            <thead>
              <tr>
                {columns.map((column, index) => (
                  <th
                    key={index}
                    className="border-b border-slate-200 bg-slate-50 px-4 py-3 text-left font-bold text-[#071B49]"
                  >
                    {String(column ?? "")}
                  </th>
                ))}
              </tr>
            </thead>
          )}

          <tbody>
            {rows.map((row, rowIndex) => {
              const cells =
                Array.isArray(row)
                  ? row
                  : row &&
                      typeof row === "object"
                  ? Object.values(row)
                  : [row]

              return (
                <tr key={rowIndex}>
                  {cells.map(
                    (cell, cellIndex) => (
                      <td
                        key={cellIndex}
                        className="border-b border-slate-100 px-4 py-3 align-top text-[#102A5F]"
                      >
                        {String(cell ?? "")}
                      </td>
                    )
                  )}
                </tr>
              )
            })}
          </tbody>
        </table>

        {table.caption && (
          <p className="px-4 py-3 text-sm text-slate-500">
            {table.caption}
          </p>
        )}
      </div>
    )
  }

  const renderEducationAsset = (
    asset: EducationAsset
  ) => (
    <figure
      key={asset.id}
      className="my-6"
    >
      <img
        src={asset.url}
        alt={asset.alt_text || ""}
        className="mx-auto max-w-full rounded-2xl"
      />

      {asset.caption && (
        <figcaption className="mt-3 text-center text-sm text-slate-500">
          {asset.caption}
        </figcaption>
      )}
    </figure>
  )

  /*
   * Illustration
   */
  if (isIllustration(block) || blockType === "illustration") {
    return (
      <div className="space-y-5">
        {blockTitle &&
          !duplicateBlockTitle &&
          !isHiddenSourceMetadata(blockTitle) && (
            <h3 className="text-xl font-semibold leading-8 text-[#071B49]">
              {blockTitle}
            </h3>
          )}

        {block.content &&
          cleanSourceText(block.content).length > 0 && (
            <SourceText className="mb-2">
              {cleanSourceText(block.content)}
            </SourceText>
          )}

        {validItems.length > 0 && (
          <div className="space-y-3">
            {validItems.map((item) =>
              renderSourceItem(item)
            )}
          </div>
        )}

        {tables.map((table) =>
          renderEducationTable(table)
        )}

        {assets.map((asset) =>
          renderEducationAsset(asset)
        )}
      </div>
    )
  }

  /*
   * Example
   */
  if (isExample(block) || blockType === "example") {
    return (
      <div className="space-y-5">
        {blockTitle &&
          !duplicateBlockTitle &&
          !isHiddenSourceMetadata(blockTitle) && (
            <h3 className="text-xl font-semibold leading-8 text-[#071B49]">
              {blockTitle}
            </h3>
          )}

        {block.content &&
          cleanSourceText(block.content).length > 0 && (
            <SourceText className="mb-2">
              {cleanSourceText(block.content)}
            </SourceText>
          )}

        {validItems.length > 0 && (
          <div className="space-y-4">
            {validItems.map((item) =>
              renderSourceItem(item)
            )}
          </div>
        )}

        {tables.map((table) =>
          renderEducationTable(table)
        )}

        {assets.map((asset) =>
          renderEducationAsset(asset)
        )}
      </div>
    )
  }

  /*
   * Bullet list
   *
   * IMPORTANT:
   *
   * Not every database item inside a bullet block is actually
   * a source bullet.
   *
   * Accounting source material can contain:
   *
   *   - journal headings
   *   - $ amount headings
   *   - Dr / Cr journal rows
   *   - numbered steps
   *   - specially coloured source text
   *
   * These must bypass the generic <li> renderer.
   */
  if (blockType === "bullet") {
    return (
      <div className="mt-2">
        {blockTitle && !duplicateBlockTitle && (
          <h3 className="mb-4 text-lg font-semibold text-[#071B49]">
            {blockTitle}
          </h3>
        )}

        {block.content &&
          block.content.trim().length > 0 && (
            <div className="mb-4">
              {renderFormattedSourceText(block.content)}
            </div>
          )}

        {validItems.length > 0 && (
          <div className="space-y-3">
            {validItems.map((item) => {
              const value =
                normalizeSourceContent(
                  item.content || ""
                ).trim()

              /*
               * --------------------------------------------------
               * SOURCE-SPECIFIC NON-BULLET CONTENT
               * --------------------------------------------------
               */

              /*
               * Journal heading
               */
              if (isJournalHeader(value)) {
                return (
                  <div
                    key={item.id}
                    className="
                      mt-5
                      mb-2
                      text-base
                      leading-8
                      text-[#102A5F]
                    "
                  >
                    {renderFormattedSourceText(value)}
                  </div>
                )
              }

              /*
               * Journal $ header.
               */
              if (isJournalAmountLine(value)) {
                return (
                  <div
                    key={item.id}
                    className="w-full"
                  >
                    {renderJournalAmountColumns(value)}
                  </div>
                )
              }

              /*
               * Journal Dr / Cr rows.
               *
               * These are NOT bullets.
               */
              if (
                isJournalDebit(value) ||
                isJournalCredit(value)
              ) {
                return (
                  <div
                    key={item.id}
                    className="w-full"
                  >
                    {renderJournalAmountColumns(value)}
                  </div>
                )
              }

              /*
               * Numbered source lines:
               *
               * (1)
               * (2)
               * (3)
               *
               * These must not receive a bullet.
               */
              if (isNumberedSourceLine(value)) {
                return renderNumberedSourceLine(item)
              }

              /*
               * "Steps:" is a source heading.
               *
               * The original source uses a square marker rather
               * than the ordinary CURA round bullet.
               */
              if (/^Steps:\s*$/i.test(value)) {
                return (
                  <div
                    key={item.id}
                    className="
                      flex
                      items-start
                      gap-4
                      text-base
                      leading-8
                      text-black
                    "
                  >
                    <span
                      className="
                        mt-[11px]
                        h-[8px]
                        w-[8px]
                        shrink-0
                        bg-[#168BC4]
                      "
                    />

                    <span className="font-bold">
                      Steps:
                    </span>
                  </div>
                )
              }

              /*
               * --------------------------------------------------
               * ORDINARY SOURCE BULLET
               * --------------------------------------------------
               */

              if (!shouldRenderAsBullet(item)) {
                return (
                  <div
                    key={item.id}
                    className="
                      whitespace-pre-wrap
                      break-words
                      text-base
                      leading-8
                      text-black
                    "
                  >
                    {renderFormattedSourceText(value)}
                  </div>
                )
              }

              return (
                <ul
                  key={item.id}
                  className="
                    list-disc
                    pl-7
                    marker:text-[#168BC4]
                  "
                >
                  <li
                    className="
                      pl-1
                      text-base
                      leading-8
                      text-black
                    "
                  >
                    <span className="whitespace-pre-wrap break-words">
                      {renderFormattedSourceText(value)}
                    </span>
                  </li>
                </ul>
              )
            })}
          </div>
        )}
      </div>
    )
  }

  /*
   * Numbered list
   */
  if (blockType === "numbered") {
    return (
      <div className="mt-2">
        {blockTitle && !duplicateBlockTitle && (
          <h3 className="mb-4 text-lg font-semibold text-[#071B49]">
            {blockTitle}
          </h3>
        )}

        {block.content &&
          block.content.trim().length > 0 && (
            <SourceText className="mb-4">
              {cleanSourceText(block.content)}
            </SourceText>
          )}

        {validItems.length > 0 && (
          <ol className="list-decimal space-y-3 pl-7 marker:font-semibold marker:text-[#168BC4]">
            {validItems.map((item) => (
              <li
                key={item.id}
                className="pl-1 text-base leading-8 text-slate-700"
              >
                <span className="whitespace-pre-wrap break-words">
                  {cleanSourceText(item.content)}
                </span>
              </li>
            ))}
          </ol>
        )}
      </div>
    )
  }

  /*
   * Normal paragraph
   */
  return (
    <div>
      {blockTitle && (
        <h3 className="mb-4 text-lg font-semibold text-[#071B49]">
          {blockTitle}
        </h3>
      )}

      {block.content &&
        block.content.trim().length > 0 && (
          <SourceText className="mb-5">
            {block.content}
          </SourceText>
        )}

      {validItems.length > 0 && (
        <div className="space-y-5">
          {validItems.map((item) => (
            <SourceText key={item.id}>
              {item.content}
            </SourceText>
          ))}
        </div>
      )}
    </div>
  )
}

export default function AccountingTopicPage() {
  const params = useParams()

  const slug =
    typeof params.slug === "string"
      ? params.slug
      : Array.isArray(params.slug)
        ? params.slug[0]
        : ""

  const supabase = useMemo(() => createClient(), [])

  const [topic, setTopic] = useState<Topic | null>(null)
  const [sections, setSections] = useState<Section[]>([])
  const [blocks, setBlocks] = useState<Block[]>([])
  const [items, setItems] = useState<Item[]>([])
  const [quiz, setQuiz] = useState<Quiz | null>(null)
  const [tables, setTables] = useState<EducationTable[]>([])
  const [assets, setAssets] = useState<EducationAsset[]>([])
  const [quizQuestions, setQuizQuestions] = useState<QuizQuestion[]>([])

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!slug) {
      setError("Topic not found.")
      setLoading(false)
      return
    }

    async function loadTopic() {
      setLoading(true)
      setError(null)

      /*
       * =========================================================
       * 1. TOPIC
       * =========================================================
       */

      const { data: topicData, error: topicError } =
        await supabase
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

        setError(topicError.message)
        setLoading(false)
        return
      }

      if (!topicData) {
        setError("Topic not found.")
        setLoading(false)
        return
      }

      const loadedTopic =
        topicData as unknown as Topic

      /*
       * =========================================================
       * 2. SECTIONS
       * =========================================================
       */

      const {
        data: sectionData,
        error: sectionError,
      } = await supabase
        .from("education_sections")
        .select(
          "id,title,section_type,display_order,presentation"
        )
        .eq("topic_id", loadedTopic.id)
        .eq("is_published", true)
        .order("display_order", {
          ascending: true,
        })

      if (sectionError) {
        console.error(
          "Section loading error:",
          sectionError
        )

        setError(sectionError.message)
        setLoading(false)
        return
      }

      const loadedSections =
        (sectionData ?? []) as unknown as Section[]

      const sectionIds = loadedSections.map(
        (section) => section.id
      )

      /*
       * =========================================================
       * 3. CONTENT BLOCKS
       * =========================================================
       */

      let loadedBlocks: Block[] = []

      if (sectionIds.length > 0) {
        const {
          data: blockData,
          error: blockError,
        } = await supabase
          .from("education_content_blocks")
          .select(
            "id,section_id,block_type,title,content,display_order,presentation"
          )
          .in("section_id", sectionIds)
          .eq("is_published", true)
          .order("display_order", {
            ascending: true,
          })

        if (blockError) {
          console.error(
            "Block loading error:",
            blockError
          )

          setError(blockError.message)
          setLoading(false)
          return
        }

        loadedBlocks =
          (blockData ?? []) as unknown as Block[]
      }

      /*
       * =========================================================
       * 4. SOURCE ITEMS
       * =========================================================
       */

      const blockIds = loadedBlocks.map(
        (block) => block.id
      )

      let loadedItems: Item[] = []

      if (blockIds.length > 0) {
        const {
          data: itemData,
          error: itemError,
        } = await supabase
          .from("education_block_items")
          .select(
            "id,block_id,content,item_type,display_order"
          )
          .in("block_id", blockIds)
          .order("display_order", {
            ascending: true,
          })

        if (itemError) {
          console.error(
            "Item loading error:",
            itemError
          )

          setError(itemError.message)
          setLoading(false)
          return
        }

        loadedItems =
          (itemData ?? []) as unknown as Item[]
      }

      /*
       * =========================================================
       * 5. TABLES
       * =========================================================
       */

      let loadedTables: EducationTable[] = []

      if (blockIds.length > 0) {
        const { data, error } = await supabase
          .from("education_tables")
          .select(
            "id,block_id,columns,rows,caption"
          )
          .in("block_id", blockIds)

        if (error) {
          console.warn(
            "Education table loading warning:",
            error.message
          )
        } else {
          loadedTables =
            (data ?? []) as unknown as EducationTable[]
        }
      }

      /*
       * =========================================================
       * 6. ILLUSTRATIONS / ASSETS
       * =========================================================
       */

      let loadedAssets: EducationAsset[] = []

      if (blockIds.length > 0) {
        const { data, error } = await supabase
          .from("education_assets")
          .select(
            "id,block_id,asset_type,url,alt_text,caption,display_order"
          )
          .in("block_id", blockIds)
          .order("display_order", {
            ascending: true,
          })

        if (error) {
          console.warn(
            "Education asset loading warning:",
            error.message
          )
        } else {
          loadedAssets =
            (data ?? []) as unknown as EducationAsset[]
        }
      }

      /*
       * =========================================================
       * 7. QUIZ
       * =========================================================
       */

      const expectedQuizTitle =
        `${loadedTopic.title} — Topic Quiz`

      const {
        data: quizData,
        error: quizError,
      } = await supabase
        .from("education_quizzes")
        .select(
          "id,title,description,time_limit_seconds,is_published"
        )
        .eq("category", "Accounting")
        .eq("is_published", true)
        .eq("title", expectedQuizTitle)
        .maybeSingle()

      if (quizError) {
        console.warn(
          "Quiz loading warning:",
          quizError.message
        )
      }

      const loadedQuiz = quizData
        ? (quizData as unknown as Quiz)
        : null

      /*
       * =========================================================
       * 8. QUIZ QUESTIONS
       * =========================================================
       */

      let loadedQuizQuestions: QuizQuestion[] = []

      if (loadedQuiz) {
        const {
          data: questionData,
          error: questionError,
        } = await supabase
          .from("education_questions")
          .select(
            "id,quiz_id,question_text,options,correct_option,explanation,sort_order,points"
          )
          .eq("quiz_id", loadedQuiz.id)
          .order("sort_order", {
            ascending: true,
          })

        if (questionError) {
          console.warn(
            "Quiz question loading warning:",
            questionError.message
          )
        } else {
          loadedQuizQuestions =
            (questionData ?? []) as unknown as QuizQuestion[]
        }
      }

      /*
       * =========================================================
       * SAVE
       * =========================================================
       */

      setTopic(loadedTopic)
      setSections(loadedSections)
      setBlocks(loadedBlocks)
      setItems(loadedItems)
      setQuiz(loadedQuiz)
      setTables(loadedTables)
      setAssets(loadedAssets)
      setQuizQuestions(loadedQuizQuestions)

      setLoading(false)
    }

    void loadTopic()
  }, [slug, supabase])

  /*
   * ===========================================================
   * LOADING
   * ===========================================================
   */

  if (loading) {
    return (
      <main className="min-h-screen bg-[#F5F8FC]">
        <CuraHeader />

        <section className="bg-[#071B49]">
          <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
            <div className="h-4 w-28 animate-pulse rounded bg-white/20" />

            <div className="mt-8 h-6 w-24 animate-pulse rounded-full bg-white/20" />

            <div className="mt-6 h-14 w-2/3 animate-pulse rounded bg-white/20" />

            <div className="mt-6 h-5 w-2/3 animate-pulse rounded bg-white/10" />
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-[250px_minmax(0,1fr)]">
            <div className="h-80 animate-pulse rounded-3xl bg-white" />

            <div className="space-y-10">
              <div className="h-96 animate-pulse rounded-3xl bg-white" />
              <div className="h-96 animate-pulse rounded-3xl bg-white" />
            </div>
          </div>
        </section>

        <CuraFooter />
      </main>
    )
  }

  /*
   * ===========================================================
   * ERROR
   * ===========================================================
   */

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
            className="mt-8 inline-flex rounded-full bg-[#071B49] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#102A5F]"
          >
            Back to Accounting
          </Link>
        </section>

        <CuraFooter />
      </main>
    )
  }

  /*
   * ===========================================================
   * PREPARE SOURCE STRUCTURE
   * ===========================================================
   *
   * IMPORTANT:
   *
   * We keep the block boundaries.
   *
   * Previously the page flattened all blocks into a single list
   * of items. That destroyed the source presentation.
   *
   * Now:
   *
   * Section
   *   ├── Block
   *   │    ├── Block type
   *   │    └── Items
   *   ├── Block
   *   └── Block
   *
   * This allows bullet lists, paragraphs, examples and
   * illustrations to retain their original structure.
   */

  const tablesByBlock = new Map<string, EducationTable[]>()

  for (const table of tables) {
    const current = tablesByBlock.get(table.block_id) || []
    current.push(table)
    tablesByBlock.set(table.block_id, current)
  }

  const assetsByBlock = new Map<string, EducationAsset[]>()

  for (const asset of assets) {
    const current = assetsByBlock.get(asset.block_id) || []
    current.push(asset)
    assetsByBlock.set(asset.block_id, current)
  }

  const visibleSections = sections
    .map((section) => {
      const sectionBlocks = blocks
        .filter(
          (block) =>
            block.section_id === section.id
        )
        .sort(
          (a, b) =>
            a.display_order - b.display_order
        )

      const contentBlocks: ContentBlock[] =
        sectionBlocks
          .map((block) => {
            const blockItems = items
              .filter(
                (item) =>
                  item.block_id === block.id
              )
              .sort(
                (a, b) =>
                  a.display_order -
                  b.display_order
              )

            return {
              block,
              items: blockItems,
            }
          })
          .filter(({ block, items }) => {
            const cleanedBlockContent =
              typeof block.content === "string"
                ? cleanSourceText(block.content)
                : ""

            const cleanedBlockTitle =
              typeof block.title === "string"
                ? cleanSourceText(block.title)
                : ""

            const hasBlockContent =
              cleanedBlockContent.length > 0 &&
              !isHiddenSourceMetadata(cleanedBlockContent)

            const hasItems = items.some(
              (item) =>
                typeof item.content === "string" &&
                cleanSourceText(item.content).length > 0 &&
                !isHiddenSourceMetadata(
                  cleanSourceText(item.content)
                )
            )

            const hasTitle =
              cleanedBlockTitle.length > 0 &&
              !isHiddenSourceMetadata(cleanedBlockTitle)

            return (
              hasBlockContent ||
              hasItems ||
              hasTitle
            )
          })

      return {
        section,
        blocks: contentBlocks,
      }
    })
    .filter(
      ({ blocks: sectionBlocks }) =>
        sectionBlocks.length > 0
    )

  /*
   * ===========================================================
   * REMOVE THE LECTURER COVER SLIDE
   * ===========================================================
   *
   * The first slide of each source PPT contains lecturer details.
   * Those details are not learning content, so remove them from
   * the first source section before the page is rendered.
   *
   * The operation is intentionally limited to the FIRST section.
   * It does not alter lecturer/qualification references that are
   * part of the actual accounting material later in the document.
   */
  const sourceSectionsWithoutLecturerCover =
    visibleSections.map((entry, index) => {
      if (index !== 0) {
        return entry
      }

      return {
        ...entry,
        blocks: stripLecturerMetadataFromFirstSection(
          entry.blocks
        ),
      }
    })

  /*
   * Remove any empty first section left after the cover metadata
   * has been removed.
   */
  const visibleSectionsWithoutLecturerCover =
    sourceSectionsWithoutLecturerCover.filter(
      ({ blocks: sectionBlocks }) =>
        sectionBlocks.length > 0
    )

  /*
   * ===========================================================
   * GLOBAL DUPLICATE SECTION CLEANUP
   * ===========================================================
   *
   * Source imports can contain a complete chapter twice:
   *
   *   Section A
   *   Section B
   *   Section C
   *
   *   Section A
   *   Section B
   *   Section C
   *
   * The existing cleanup only removed adjacent duplicate
   * headings. That does not catch a duplicated chapter because
   * the duplicated sections are separated by other sections.
   *
   * We therefore compare the COMPLETE SOURCE CONTENT of each
   * section.
   *
   * IMPORTANT:
   *
   * We do NOT remove a section simply because its title matches
   * another section.
   *
   * Two sections can legitimately have the same heading.
   *
   * A section is removed only when its normalized title AND
   * normalized complete source content are identical.
   */

  const normalizeDuplicateSectionText = (
    value: string
  ) =>
    value
      .toLowerCase()
      .replace(/[–—]/g, "-")
      .replace(/\s+/g, " ")
      .trim()

  const getSectionContentFingerprint = (
    entry: (typeof visibleSectionsWithoutLecturerCover)[number]
  ) => {
    const parts: string[] = []

    /*
     * Section title
     */
    parts.push(
      normalizeDuplicateSectionText(
        entry.section.title || ""
      )
    )

    /*
     * Block order is significant.
     *
     * This means the same material in a different order is NOT
     * treated as a duplicate.
     */
    for (const contentBlock of entry.blocks) {
      const block = contentBlock.block

      parts.push(
        normalizeDuplicateSectionText(
          block.block_type || ""
        )
      )

      parts.push(
        normalizeDuplicateSectionText(
          block.title || ""
        )
      )

      parts.push(
        normalizeDuplicateSectionText(
          block.content || ""
        )
      )

      for (const item of contentBlock.items) {
        parts.push(
          normalizeDuplicateSectionText(
            item.item_type || ""
          )
        )

        parts.push(
          normalizeDuplicateSectionText(
            item.content || ""
          )
        )
      }
    }

    return parts.join("|")
  }

  /*
   * Remove exact duplicate sections globally.
   *
   * This is deliberately NOT:
   *
   *   title-only deduplication
   *
   * because legitimate repeated headings may exist.
   */
  const seenSectionFingerprints =
    new Set<string>()

  const cleanedSections: typeof visibleSectionsWithoutLecturerCover = []

  for (const current of visibleSectionsWithoutLecturerCover) {
    const fingerprint =
      getSectionContentFingerprint(current)

    /*
     * Empty fingerprints should never be treated as duplicates.
     */
    if (!fingerprint) {
      cleanedSections.push(current)
      continue
    }

    if (
      seenSectionFingerprints.has(
        fingerprint
      )
    ) {
      /*
       * This section is an exact source-content duplicate
       * of a section already rendered earlier.
       *
       * Do not render it again.
       */
      continue
    }

    seenSectionFingerprints.add(
      fingerprint
    )

    cleanedSections.push(current)
  }

  /*
   * ===========================================================
   * REMOVE TOPIC-TITLE PLACEHOLDER SECTIONS
   * ===========================================================
   *
   * Some imported source material creates a section containing
   * nothing except the topic title itself.
   *
   * Example:
   *
   *   Section 22
   *   IAS 20 Accounting for Government Grants...
   *
   * followed by:
   *
   *   Section 23
   *   Definitions
   *   [actual learning content]
   *
   * The first section is a source/import artefact, not a
   * substantive learning section. Remove it from the page.
   *
   * This is deliberately limited to sections that:
   *   1. have the same title as the topic;
   *   2. contain no substantive text/items.
   */

  const normalizeTitleForComparison = (
    value: string
  ) =>
    value
      .toLowerCase()
      .replace(/[–—-]/g, "-")
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, " ")
      .trim()

  const normalizedTopicTitle =
    normalizeTitleForComparison(topic.title)

  /*
   * ===========================================================
   * REMOVE TOPIC-TITLE-ONLY SECTIONS
   * ===========================================================
   *
   * Some source imports create a section such as:
   *
   *   Section 22
   *   IAS 20 Accounting for Government Grants...
   *
   * with a block containing the exact same title.
   *
   * This is not a learning section. It is the title slide/header
   * from the source material.
   *
   * Remove it only when ALL substantive content in the section
   * is effectively the same as the topic title.
   */

  const normalizeForComparison = (value: string) =>
    value
      .toLowerCase()
      .replace(/[–—-]/g, " ")
      .replace(/[^a-z0-9\s]/g, " ")
      .replace(/\s+/g, " ")
      .trim()


  /*
   * ===========================================================
   * FINAL SOURCE SECTIONS
   * ===========================================================
   *
   * The revised Accounting source has already been structured
   * into sections, blocks and items in Supabase.
   *
   * Keep every section that contains actual source material.
   * Exact duplicate sections have already been removed above.
   *
   * Do NOT compare section titles with the topic title here.
   * A legitimate source section may have the same or similar
   * heading as the topic and can still contain real material.
   */

  const finalSections = cleanedSections.filter(
    ({ blocks: sectionBlocks }) =>
      sectionBlocks.some(
        ({ block, items }) =>
          (
            typeof block.content === "string" &&
            block.content.trim().length > 0
          ) ||
          (
            typeof block.title === "string" &&
            block.title.trim().length > 0
          ) ||
          items.some(
            (item) =>
              typeof item.content === "string" &&
              item.content.trim().length > 0
          ) ||
          ["table", "image", "illustration"].includes(
            (block.block_type || "").toLowerCase()
          )
      )
  )

  return (
    <main className="min-h-screen bg-[#F5F8FC] text-[#071B49]">
      <CuraHeader />

      {/* =====================================================
          HERO
          ===================================================== */}

      <section className="relative overflow-hidden bg-[#071B49] text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_85%_20%,rgba(53,181,229,0.16),transparent_30%),radial-gradient(circle_at_10%_90%,rgba(22,139,196,0.12),transparent_35%)]" />

        <div className="relative mx-auto max-w-7xl px-6 py-14 lg:px-8 lg:py-20">
          <Link
            href="/education/materials/accounting"
            className="inline-flex items-center text-sm font-semibold text-white transition hover:text-[#35B5E5]"
          >
            ← Accounting
          </Link>

          <div className="mt-8 max-w-4xl">
            {topic.standard && (
              <span className="inline-flex rounded-full bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-[#35B5E5]">
                {topic.standard}
              </span>
            )}

            <h1 className="mt-6 text-4xl font-semibold tracking-tight md:text-6xl">
              {topic.title}
            </h1>

            {topic.description &&
              !/^Imported from revised accounting source materials\.?$/i.test(
                topic.description.trim()
              ) &&
              !isHiddenSourceMetadata(topic.description) && (
                <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">
                  {cleanSourceText(topic.description)}
                </p>
              )}
          </div>
        </div>
      </section>

      {/* =====================================================
          CONTENT
          ===================================================== */}

      <section className="mx-auto max-w-7xl px-6 py-10 lg:px-8 lg:py-14">
        <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_250px] lg:items-start lg:gap-10">

          {/* =================================================
              RIGHT-FIXED / STICKY SIDE PANEL
              ================================================= */}

          <aside className="order-2 mb-8 lg:sticky lg:top-24 lg:mb-0">
            <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-[0_8px_30px_rgba(7,27,73,0.05)]">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#168BC4]">
                On this page
              </p>

              {finalSections.length > 0 ? (
                <nav className="mt-4 max-h-[calc(100vh-150px)] overflow-y-auto pr-1">
                  <ol className="space-y-1">
                    {finalSections.map(
                      ({ section, blocks: sectionBlocks }) => {
                        const displayTitle =
                          getDisplaySectionTitle(
                            section,
                            sectionBlocks
                          )

                        return (
                          <li key={section.id}>
                            <a
                              href={`#section-${section.id}`}
                              className="block rounded-xl px-3 py-2 text-sm leading-5 text-slate-600 transition hover:bg-[#F1F7FB] hover:text-[#168BC4]"
                            >
                              {displayTitle}
                            </a>
                          </li>
                        )
                      }
                    )}

                    {quiz && (
                      <li>
                        <a
                          href="#topic-quiz"
                          className="block rounded-xl px-3 py-2 text-sm font-semibold leading-5 text-[#071B49] transition hover:bg-[#F1F7FB] hover:text-[#168BC4]"
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

          {/* =================================================
              MAIN SOURCE CONTENT
              ================================================= */}

          <div className="order-1 min-w-0">
            {finalSections.length === 0 ? (
              <div className="rounded-3xl border border-slate-200 bg-white p-10">
                <p className="text-sm leading-6 text-slate-500">
                  No published source content is currently
                  available for this topic.
                </p>
              </div>
            ) : (
              <div className="space-y-8">

                {finalSections.map(
                  ({
                    section,
                    blocks: sectionBlocks,
                  }) => (
                    <article
                      key={section.id}
                      id={`section-${section.id}`}
                      className="scroll-mt-24 rounded-[30px] border border-slate-200 bg-white p-7 md:p-10"
                    >
                      <div className="border-b border-slate-100 pb-6">
                        <h2 className="text-2xl font-semibold leading-8 text-[#071B49] md:text-3xl">
                          {getDisplaySectionTitle(
                            section,
                            sectionBlocks
                          )}
                        </h2>
                      </div>

                      <div className="mt-8 space-y-8">
                        {sectionBlocks.map(
                          (contentBlock) => (
                            <div key={contentBlock.block.id}>
                              <RenderSourceBlock
                                contentBlock={contentBlock}
                                sectionTitle={getDisplaySectionTitle(
                                  section,
                                  sectionBlocks
                                )}
                                tables={
                                  tablesByBlock.get(
                                    contentBlock.block.id
                                  ) || []
                                }
                                assets={
                                  assetsByBlock.get(
                                    contentBlock.block.id
                                  ) || []
                                }
                              />
                            </div>
                          )
                        )}
                      </div>
                    </article>
                  )
                )}

                {/* =================================================
                    QUIZ — ALWAYS LAST
                    ================================================= */}

                {quiz && (
                  <section
                    id="topic-quiz"
                    className="scroll-mt-24 rounded-[30px] border border-[#168BC4]/20 bg-white p-7 shadow-[0_8px_30px_rgba(7,27,73,0.05)] md:p-10"
                  >
                    <div className="flex flex-col gap-7 md:flex-row md:items-center md:justify-between">
                      <div>
                        <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#168BC4]">
                          Topic assessment
                        </p>

                        <h2 className="mt-2 text-2xl font-semibold text-[#071B49] md:text-3xl">
                          {quiz.title}
                        </h2>

                        <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-500">
                          {quiz.description ||
                            "Test your understanding of this topic."}
                        </p>

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
                        className="inline-flex shrink-0 items-center justify-center rounded-full bg-[#071B49] px-7 py-3.5 text-sm font-bold text-white transition hover:bg-[#102A5F]"
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
