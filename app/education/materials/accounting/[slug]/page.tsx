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

/*
 * Sidebar heading formatting.
 *
 * Example:
 *
 * "4 ALLOCATE THE TRANSACTION PRICE TO THE PERFORMANCE OBLIGATIONS IN THE CONTRACT"
 *
 * becomes:
 *
 * "4 allocate the transaction price to the performance obligations in the contract"
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
 * Get the source items belonging to a section.
 *
 * IMPORTANT:
 * We deliberately render only education_block_items.
 *
 * education_content_blocks.content is NOT rendered because it is a
 * duplicate representation of the same imported source material.
 */
function getSectionItems(
  section: Section,
  blocks: Block[],
  items: Item[]
): Item[] {
  const sectionBlocks = blocks
    .filter((block) => block.section_id === section.id)
    .sort((a, b) => a.display_order - b.display_order)

  return sectionBlocks
    .flatMap((block) =>
      items
        .filter((item) => item.block_id === block.id)
        .sort((a, b) => a.display_order - b.display_order)
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
       * 1. LOAD TOPIC
       * =========================================================
       */

      const { data: topicData, error: topicError } = await supabase
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
        console.error("Topic loading error:", topicError)
        setError(topicError.message)
        setLoading(false)
        return
      }

      if (!topicData) {
        setError("Topic not found.")
        setLoading(false)
        return
      }

      /*
       * Supabase's generated database types currently resolve these
       * education-table results as GenericStringError.
       *
       * The runtime query is valid, so explicitly narrow the result
       * through unknown to our local page types.
       */
      const loadedTopic = topicData as unknown as Topic

      /*
       * =========================================================
       * 2. LOAD SECTIONS
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
       * 3. LOAD CONTENT BLOCKS
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
       * 4. LOAD SOURCE ITEMS
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
       * 5. LOAD TOPIC QUIZ
       * =========================================================
       *
       * The quiz is intentionally loaded separately.
       *
       * It will be rendered AFTER all learning material.
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
        /*
         * A missing quiz should not prevent the learning material
         * from displaying.
         */
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
       * SAVE STATE
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
   * LOADING STATE
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
   * ERROR STATE
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
   * PREPARE VISIBLE SECTIONS
   * ===========================================================
   *
   * A section is shown only if it contains actual source items.
   *
   * We do NOT use education_content_blocks.content.
   * Only education_block_items are rendered.
   */

  const visibleSections = sections
    .map((section) => {
      const sectionItems = getSectionItems(
        section,
        blocks,
        items
      )

      return {
        section,
        items: sectionItems,
      }
    })
    .filter(({ items: sectionItems }) => {
      return sectionItems.some(
        (item) =>
          typeof item.content === "string" &&
          item.content.trim().length > 0
      )
    })

  /*
   * ===========================================================
   * PAGE
   * ===========================================================
   */

  return (
    <main className="min-h-screen bg-[#F5F8FC] text-[#071B49]">
      <CuraHeader />

      {/* =======================================================
          HERO
          ======================================================= */}

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

            {/* Topic title appears ONCE */}
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

      {/* =======================================================
          CONTENT AREA
          ======================================================= */}

      <section className="mx-auto max-w-7xl px-6 py-10 lg:px-8 lg:py-14">
        <div className="lg:grid lg:grid-cols-[250px_minmax(0,1fr)] lg:items-start lg:gap-10">

          {/* ===================================================
              SIDE PANEL
              =================================================== */}

          <aside className="mb-8 lg:sticky lg:top-24 lg:mb-0">
            <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-[0_8px_30px_rgba(7,27,73,0.05)]">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#168BC4]">
                On this page
              </p>

              {visibleSections.length > 0 ? (
                <nav className="mt-4 max-h-[calc(100vh-150px)] overflow-y-auto pr-1">
                  <ol className="space-y-1">
                    {visibleSections.map(
                      ({ section }, index) => {
                        const label =
                          formatSidebarHeading(
                            section.title
                          )

                        return (
                          <li key={section.id}>
                            <a
                              href={`#section-${section.id}`}
                              className="block rounded-xl px-3 py-2 text-sm leading-5 text-slate-600 transition hover:bg-[#F1F7FB] hover:text-[#168BC4]"
                            >
                              {index + 1}. {label}
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
                          {visibleSections.length + 1}. Topic assessment
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

          {/* ===================================================
              MAIN CONTENT
              =================================================== */}

          <div className="min-w-0">
            {visibleSections.length === 0 ? (
              <div className="rounded-3xl border border-slate-200 bg-white p-10">
                <p className="text-sm leading-6 text-slate-500">
                  No published source content is currently
                  available for this topic.
                </p>
              </div>
            ) : (
              <div className="space-y-8">

                {/* =================================================
                    SOURCE MATERIAL
                    ================================================= */}

                {visibleSections.map(
                  ({ section, items: sectionItems }, index) => {
                    return (
                      <article
                        key={section.id}
                        id={`section-${section.id}`}
                        className="scroll-mt-24 rounded-[30px] border border-slate-200 bg-white p-7 shadow-[0_8px_30px_rgba(7,27,73,0.05)] md:p-10"
                      >
                        {/* -----------------------------------------
                            SECTION HEADING

                            section.title is rendered ONCE.

                            block.title is NOT rendered.

                            block.content is NOT rendered.
                            ----------------------------------------- */}

                        <div className="border-b border-slate-100 pb-6">
                          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#168BC4]">
                            Section {index + 1}
                          </p>

                          <h2 className="mt-2 text-2xl font-semibold leading-tight text-[#071B49] md:text-3xl">
                            {section.title}
                          </h2>
                        </div>

                        {/* -----------------------------------------
                            RAW SOURCE ITEMS

                            Render exactly once and in order.
                            ----------------------------------------- */}

                        <div className="mt-8">
                          {sectionItems.map((item, itemIndex) => {
                            const content =
                              item.content ?? ""

                            /*
                             * Preserve empty source entries as
                             * spacing, but don't display an empty
                             * bullet/card.
                             */
                            if (
                              content.trim().length === 0
                            ) {
                              return (
                                <div
                                  key={item.id}
                                  className="h-3"
                                  aria-hidden="true"
                                />
                              )
                            }

                            return (
                              <div
                                key={item.id}
                                className={[
                                  "whitespace-pre-line",
                                  "text-[16px]",
                                  "leading-8",
                                  "text-slate-700",
                                  itemIndex > 0
                                    ? "mt-5"
                                    : "",
                                ].join(" ")}
                              >
                                {content}
                              </div>
                            )
                          })}
                        </div>
                      </article>
                    )
                  }
                )}

                {/* =================================================
                    QUIZ
                    =================================================
                    
                    This is deliberately the LAST element in the
                    learning-content flow.
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

                        {quiz.time_limit_seconds > 0 && (
                          <p className="mt-3 text-xs font-semibold text-slate-400">
                            Time limit:{" "}
                            {Math.ceil(
                              quiz.time_limit_seconds / 60
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