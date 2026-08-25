"use client"

import Link from "next/link"
import { useEffect, useMemo, useState } from "react"
import { useParams } from "next/navigation"

import CuraHeader from "@/components/CuraHeader"
import CuraFooter from "@/components/CuraFooter"
import AccountingSourceIllustration from "@/components/education/AccountingSourceIllustration"
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

type ContentBlock = {
  block: Block
  items: Item[]
}

/*
 * Sidebar formatting:
 *
 * "4 ALLOCATE THE TRANSACTION PRICE..."
 *
 * becomes:
 *
 * "4 allocate the transaction price..."
 *
 * Only the first character remains capitalized.
 */
function formatSidebarHeading(value: string) {
  const cleaned = value.trim()

  if (!cleaned) {
    return ""
  }

  return cleaned.charAt(0) + cleaned.slice(1).toLowerCase()
}

/*
 * Determine whether a block should visually behave as an illustration.
 *
 * We use both the database block_type and title because the source
 * material contains illustration headings in different structures.
 */
function isIllustration(block: Block) {
  const type = (block.block_type || "").toLowerCase()
  const title = (block.title || "").toLowerCase()
  const content = (block.content || "").toLowerCase()

  return (
    type.includes("illustration") ||
    type === "example" ||
    title.includes("illustration") ||
    title.includes("illustration") ||
    content.includes("illustration")
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
          text-[16px]
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
        text-[16px]
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
  return value
    .replace(/\\t/g, "\t")
    .replace(/\u00a0/g, " ")
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
        text-[16px]
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
        text-[16px]
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

        <span className="text-black">
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
        <span className="text-black">
          {gainMatch[1]}
        </span>

        <span className="font-bold text-[#16A34A]">
          {gainMatch[2]}
        </span>

        <span className="text-black">
          {gainMatch[3]}
        </span>
      </>
    )
  }

  return (
    <span className="text-black">
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
        text-[16px]
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

      <div className="text-black">
        {match[2]}
      </div>
    </div>
  )
}


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
          grid-cols-[minmax(0,1fr)_120px_120px]
          items-center
          min-h-[42px]
          text-[18px]
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
        grid-cols-[minmax(0,1fr)_120px_120px]
        items-start
        min-h-[42px]
        text-[18px]
        leading-8
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
          text-[18px]
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
          text-[18px]
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
        text-[18px]
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
        "text-[16px]",
        "leading-8",
        "text-slate-700",
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
function RenderSourceBlock({
  contentBlock,
  sectionTitle,
}: {
  contentBlock: ContentBlock
  sectionTitle: string
}) {
  const { block, items } = contentBlock
  const blockType = getBlockType(block)

  const validItems = items.filter(
    (item) =>
      typeof item.content === "string" &&
      item.content.trim().length > 0
  )

  const blockTitle =
    typeof block.title === "string"
      ? block.title.trim()
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

  /*
   * Illustration
   */
  if (isIllustration(block) || blockType === "illustration") {
    return (
      <div className="rounded-2xl border border-[#168BC4]/20 bg-[#F4FAFD] p-6 md:p-8">
        {blockTitle && !duplicateBlockTitle && (
          <div className="mb-5">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#168BC4]">
              Illustration
            </p>

            <h3 className="mt-2 text-xl font-semibold leading-7 text-[#071B49]">
              {blockTitle}
            </h3>
          </div>
        )}

        {block.content &&
          block.content.trim().length > 0 && (
            <SourceText className="mb-5">
              {block.content}
            </SourceText>
          )}

        {validItems.length > 0 && (
  <div className="space-y-3">
    {validItems.map((item) => renderSourceItem(item))}
  </div>
)}
      </div>
    )
  }

  /*
   * Example
   */
  if (isExample(block) || blockType === "example") {
    return (
      <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 md:p-8">
        {blockTitle && !duplicateBlockTitle && (
          <div className="mb-5">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#168BC4]">
              Example
            </p>

            <h3 className="mt-2 text-xl font-semibold leading-7 text-[#071B49]">
              {blockTitle}
            </h3>
          </div>
        )}

        {block.content &&
          block.content.trim().length > 0 && (
            <SourceText className="mb-5">
              {block.content}
            </SourceText>
          )}

        {validItems.length > 0 && (
          <div className="space-y-4">
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
                      text-[18px]
                      leading-8
                      text-black
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
                      text-[18px]
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
                      text-[16px]
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
                      text-[16px]
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
              {block.content}
            </SourceText>
          )}

        {validItems.length > 0 && (
          <ol className="list-decimal space-y-3 pl-7 marker:font-semibold marker:text-[#168BC4]">
            {validItems.map((item) => (
              <li
                key={item.id}
                className="pl-1 text-[16px] leading-8 text-slate-700"
              >
                <span className="whitespace-pre-wrap break-words">
                  {item.content}
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
       * 5. QUIZ
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
       * SAVE
       * =========================================================
       */

      setTopic(loadedTopic)
      setSections(loadedSections)
      setBlocks(loadedBlocks)
      setItems(loadedItems)
      setQuiz(loadedQuiz)

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
            const hasBlockContent =
              typeof block.content === "string" &&
              block.content.trim().length > 0

            const hasItems = items.some(
              (item) =>
                typeof item.content === "string" &&
                item.content.trim().length > 0
            )

            const hasTitle =
              typeof block.title === "string" &&
              block.title.trim().length > 0

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
   * Remove consecutive duplicate source sections.
   *
   * This is deliberately conservative:
   * - only adjacent sections are compared;
   * - titles must match after normalization;
   * - the section containing more source material is retained.
   *
   * This prevents legitimate repeated headings elsewhere in the
   * source from being removed automatically.
   */

  const normalizeSectionTitle = (value: string) =>
    value
      .toLowerCase()
      .replace(/[–—-]/g, "-")
      .replace(/\s+/g, " ")
      .trim()

  const cleanedSections: typeof visibleSections = []

  for (const current of visibleSections) {
    const previous =
      cleanedSections[
        cleanedSections.length - 1
      ]

    if (!previous) {
      cleanedSections.push(current)
      continue
    }

    const sameTitle =
      normalizeSectionTitle(
        previous.section.title
      ) ===
      normalizeSectionTitle(
        current.section.title
      )

    if (!sameTitle) {
      cleanedSections.push(current)
      continue
    }

    const previousContentLength =
      previous.blocks.reduce(
        (total, contentBlock) =>
          total +
          (contentBlock.block.content?.length || 0) +
          contentBlock.items.reduce(
            (itemTotal, item) =>
              itemTotal +
              (item.content?.length || 0),
            0
          ),
        0
      )

    const currentContentLength =
      current.blocks.reduce(
        (total, contentBlock) =>
          total +
          (contentBlock.block.content?.length || 0) +
          contentBlock.items.reduce(
            (itemTotal, item) =>
              itemTotal +
              (item.content?.length || 0),
            0
          ),
        0
      )

    /*
     * Keep the more complete version.
     */
    if (
      currentContentLength >
      previousContentLength
    ) {
      cleanedSections[
        cleanedSections.length - 1
      ] = current
    }

    /*
     * Otherwise retain the previous section and ignore
     * the thinner duplicate.
     */
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


  const finalSections =
    cleanedSections.filter((entry) => {
      const normalizedSectionTitle =
        normalizeForComparison(
          entry.section.title
        )

      /*
       * If the section heading itself is not the topic title,
       * it is a genuine learning section.
       */
      if (
        normalizedSectionTitle !==
        normalizedTopicTitle
      ) {
        return true
      }

      /*
       * Collect ALL actual source text in the section.
       */
      const sourceTexts: string[] = []

      for (const contentBlock of entry.blocks) {
        const block = contentBlock.block

        if (
          typeof block.content === "string" &&
          block.content.trim().length > 0
        ) {
          sourceTexts.push(block.content.trim())
        }

        if (
          typeof block.title === "string" &&
          block.title.trim().length > 0
        ) {
          sourceTexts.push(block.title.trim())
        }

        for (const item of contentBlock.items) {
          if (
            typeof item.content === "string" &&
            item.content.trim().length > 0
          ) {
            sourceTexts.push(item.content.trim())
          }
        }
      }

      /*
       * Remove empty strings and compare the remaining content.
       */
      const meaningfulTexts =
        sourceTexts
          .map(normalizeForComparison)
          .filter(Boolean)

      /*
       * No content at all:
       * definitely a title placeholder.
       */
      if (meaningfulTexts.length === 0) {
        return false
      }

      /*
       * Every piece of content is just the topic title:
       * this is a title/header section, not learning content.
       */
      const containsOnlyTopicTitle =
        meaningfulTexts.every(
          (text) =>
            text === normalizedTopicTitle
        )

      if (containsOnlyTopicTitle) {
        return false
      }

      /*
       * If the section contains any substantive content,
       * retain it.
       */
      return true
    })

  /*
   * ===========================================================
   * PAGE
   * ===========================================================
   */



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

            {topic.description && (
              <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">
                {topic.description}
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
                      ({ section }, index) => (
                        <li key={section.id}>
                          <a
                            href={`#section-${section.id}`}
                            className="block rounded-xl px-3 py-2 text-sm leading-5 text-slate-600 transition hover:bg-[#F1F7FB] hover:text-[#168BC4]"
                          >
                            {index + 1}.{" "}
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
                          className="block rounded-xl px-3 py-2 text-sm font-semibold leading-5 text-[#071B49] transition hover:bg-[#F1F7FB] hover:text-[#168BC4]"
                        >
                          {finalSections.length + 1}. topic assessment
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
                  (
                    {
                      section,
                      blocks: sectionBlocks,
                    },
                    sectionIndex
                  ) => (
                    <article
                      key={section.id}
                      id={`section-${section.id}`}
                      className="scroll-mt-24 rounded-[30px] border border-slate-200 bg-white p-7 shadow-[0_8px_30px_rgba(7,27,73,0.05)] md:p-10"
                    >
                      {/* SECTION HEADING */}

                      <div className="border-b border-slate-100 pb-6">
                        <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#168BC4]">
                          Section {sectionIndex + 1}
                        </p>

                        <h2 className="mt-2 text-2xl font-semibold leading-tight text-[#071B49] md:text-3xl">
                          {section.title}
                        </h2>
                      </div>

                      {/* SOURCE BLOCKS */}

                      <div className="mt-8 space-y-8">
                        {sectionBlocks.map(
                          (contentBlock) => (
                            <AccountingSourceIllustration
                              key={contentBlock.block.id}
                              sourceText={[
                                contentBlock.block.title || "",
                                contentBlock.block.content || "",
                                ...contentBlock.items.map(
                                  (item) => item.content || ""
                                ),
                              ].join(" ")}
                            >
                              <RenderSourceBlock
                                contentBlock={contentBlock}
                                sectionTitle={section.title}
                              />
                            </AccountingSourceIllustration>
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
