"use client"

import Link from "next/link"
import { useMemo } from "react"
import { useParams } from "next/navigation"

import CuraHeader from "@/components/CuraHeader"
import CuraFooter from "@/components/CuraFooter"

import sourceData from "@/data/accounting-source.json"

type StyleRun = {
  text: string
  bold?: boolean
  italic?: boolean
  underline?: boolean
  color?: string | null
}

type Paragraph = {
  text: string
  style?: StyleRun[]
  level?: number
}

type SourceBlock = {
  type: string
  name?: string
  paragraphs?: Paragraph[]
  rows?: unknown[]
  source_pages?: number[]
  order?: number
}

type SourceSection = {
  title: string
  source_pages?: number[]
  blocks: SourceBlock[]
}

type SourceTopic = {
  slug: string
  title: string
  source_file?: string
  sections: SourceSection[]
}

type SourceData = {
  version: number
  topics: SourceTopic[]
}

const data = sourceData as SourceData

function renderStyleRun(run: StyleRun, index: number) {
  return (
    <span
      key={index}
      style={{
        fontWeight: run.bold ? 700 : undefined,
        fontStyle: run.italic ? "italic" : undefined,
        textDecoration: run.underline
          ? "underline"
          : undefined,
        color: run.color || undefined,
      }}
    >
      {run.text}
    </span>
  )
}

function renderParagraph(
  paragraph: Paragraph,
  index: number
) {
  const runs =
    paragraph.style &&
    paragraph.style.length > 0
      ? paragraph.style.map(renderStyleRun)
      : paragraph.text

  return (
    <div
      key={index}
      className="whitespace-pre-wrap break-words text-base leading-8 text-[#111111]"
      style={{
        marginLeft: `${(paragraph.level || 0) * 32}px`,
      }}
    >
      {runs}
    </div>
  )
}

function renderTextBlock(block: SourceBlock) {
  const paragraphs = block.paragraphs || []

  return (
    <div className="space-y-3">
      {paragraphs.map((paragraph, index) =>
        renderParagraph(paragraph, index)
      )}
    </div>
  )
}

function renderTable(block: SourceBlock) {
  const rows = Array.isArray(block.rows)
    ? block.rows
    : []

  return (
    <div className="my-8 overflow-x-auto">
      <table className="w-full border-collapse text-base">
        <tbody>
          {rows.map((row, rowIndex) => {
            const cells = Array.isArray(row)
              ? row
              : [row]

            return (
              <tr key={rowIndex}>
                {cells.map((cell, cellIndex) => (
                  <td
                    key={cellIndex}
                    className="border border-slate-300 px-4 py-3 align-top whitespace-pre-wrap"
                  >
                    {String(cell ?? "")}
                  </td>
                ))}
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

function getTopicImages(slug: string) {
  const imageMap: Record<string, string[]> = {
    "agriculture": [
      "/education/accounting/illustrations/agriculture-p2-img1.png",
      "/education/accounting/illustrations/agriculture-p9-img1.png",
      "/education/accounting/illustrations/agriculture-p9-img2.png",
    ],
  }

  return imageMap[slug] || []
}

function renderSourceTopic(
  topic: SourceTopic
) {
  const images = getTopicImages(topic.slug)
  let imageIndex = 0

  return (
    <div className="space-y-12">
      {topic.sections.map(
        (section, sectionIndex) => (
          <section
            key={`${topic.slug}-${sectionIndex}`}
            className="space-y-8"
          >
            {section.blocks
              .slice()
              .sort(
                (a, b) =>
                  (a.order || 0) -
                  (b.order || 0)
              )
              .map((block, blockIndex) => {
                if (block.type === "illustration") {
                  const image =
                    images[imageIndex]

                  imageIndex += 1

                  if (!image) {
                    return null
                  }

                  return (
                    <figure
                      key={blockIndex}
                      className="my-8"
                    >
                      <img
                        src={image}
                        alt=""
                        className="mx-auto block max-w-full h-auto"
                      />
                    </figure>
                  )
                }

                if (block.type === "table") {
                  return (
                    <div key={blockIndex}>
                      {renderTable(block)}
                    </div>
                  )
                }

                return (
                  <div key={blockIndex}>
                    {renderTextBlock(block)}
                  </div>
                )
              })}
          </section>
        )
      )}
    </div>
  )
}

export default function AccountingTopicPage() {
  const params = useParams()

  const slug = useMemo(() => {
    if (typeof params.slug === "string") {
      return params.slug
    }

    if (Array.isArray(params.slug)) {
      return params.slug[0]
    }

    return ""
  }, [params.slug])

  const topic = data.topics.find(
    (item) => item.slug === slug
  )

  if (!topic) {
    return (
      <main className="min-h-screen bg-white">
        <CuraHeader />

        <section className="mx-auto max-w-4xl px-6 py-24 text-center">
          <h1 className="text-3xl font-semibold text-[#071B49]">
            Material not found
          </h1>

          <Link
            href="/education/materials/accounting"
            className="mt-8 inline-flex rounded-full bg-[#071B49] px-6 py-3 text-sm font-semibold text-white"
          >
            Back to Accounting
          </Link>
        </section>

        <CuraFooter />
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-white text-[#111111]">
      <CuraHeader />

      <section className="bg-[#071B49] text-white">
        <div className="mx-auto max-w-7xl px-6 py-14 lg:px-8">
          <Link
            href="/education/materials/accounting"
            className="text-sm font-semibold text-white hover:text-[#35B5E5]"
          >
            ← Accounting
          </Link>

          <h1 className="mt-8 text-4xl font-semibold tracking-tight md:text-5xl">
            {topic.title}
          </h1>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 py-12 lg:px-8 lg:py-16">
        {renderSourceTopic(topic)}
      </section>

      <CuraFooter />
    </main>
  )
}