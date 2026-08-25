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

export default function AccountingTopicPage() {
  const params = useParams()
  const slug = String(params.slug)

  const supabase = useMemo(() => createClient(), [])

  const [topic, setTopic] = useState<Topic | null>(null)
  const [sections, setSections] = useState<Section[]>([])
  const [blocks, setBlocks] = useState<Block[]>([])
  const [items, setItems] = useState<Item[]>([])
  const [quiz, setQuiz] = useState<Quiz | null>(null)

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function loadTopic() {
      setLoading(true)
      setError(null)

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
        setError(topicError.message)
        setLoading(false)
        return
      }

      if (!topicData) {
        setError("Topic not found.")
        setLoading(false)
        return
      }

      const { data: sectionData, error: sectionError } =
        await supabase
          .from("education_sections")
          .select(
            "id,title,section_type,display_order,presentation"
          )
          .eq("topic_id", topicData.id)
          .eq("is_published", true)
          .order("display_order", { ascending: true })

      if (sectionError) {
        setError(sectionError.message)
        setLoading(false)
        return
      }

      const sectionIds = (sectionData ?? []).map(
        (section) => section.id
      )

      let blockData: Block[] = []
      let itemData: Item[] = []

      if (sectionIds.length) {
        const { data, error } = await supabase
          .from("education_content_blocks")
          .select(
            "id,section_id,block_type,title,content,display_order,presentation"
          )
          .in("section_id", sectionIds)
          .eq("is_published", true)
          .order("display_order", { ascending: true })

        if (error) {
          setError(error.message)
          setLoading(false)
          return
        }

        blockData = (data ?? []) as Block[]

        const blockIds = blockData.map((block) => block.id)

        if (blockIds.length) {
          const { data: itemRows, error: itemError } =
            await supabase
              .from("education_block_items")
              .select(
                "id,block_id,content,item_type,display_order"
              )
              .in("block_id", blockIds)
              .order("display_order", { ascending: true })

          if (itemError) {
            setError(itemError.message)
            setLoading(false)
            return
          }

          itemData = (itemRows ?? []) as Item[]
        }
      }

      /*
       * We only fetch published quizzes.
       * Answer keys are deliberately NOT fetched here.
       */
      const { data: quizData } = await supabase
        .from("education_quizzes")
        .select(
          "id,title,description,time_limit_seconds,is_published"
        )
        .eq("category", "Accounting")
        .eq("is_published", true)
        .ilike("title", `${topicData.title} — Topic Quiz`)
        .maybeSingle()

      setTopic(topicData as Topic)
      setSections((sectionData ?? []) as Section[])
      setBlocks(blockData)
      setItems(itemData)
      setQuiz((quizData ?? null) as Quiz | null)

      setLoading(false)
    }

    loadTopic()
  }, [slug, supabase])

  if (loading) {
    return (
      <main className="min-h-screen bg-[#F5F8FC]">
        <CuraHeader />

        <div className="mx-auto max-w-5xl px-6 py-24">
          <div className="h-10 w-2/3 animate-pulse rounded bg-slate-200" />
          <div className="mt-5 h-5 w-full animate-pulse rounded bg-slate-200" />
          <div className="mt-10 h-64 animate-pulse rounded-3xl bg-white" />
        </div>

        <CuraFooter />
      </main>
    )
  }

  if (error || !topic) {
    return (
      <main className="min-h-screen bg-[#F5F8FC]">
        <CuraHeader />

        <div className="mx-auto max-w-4xl px-6 py-24 text-center">
          <h1 className="text-3xl font-semibold text-[#071B49]">
            Topic unavailable
          </h1>

          <p className="mt-3 text-slate-500">
            {error || "The requested topic could not be found."}
          </p>

          <Link
            href="/education/materials/accounting"
            className="mt-8 inline-flex rounded-full bg-[#071B49] px-6 py-3 text-sm font-semibold text-white"
          >
            Back to Accounting
          </Link>
        </div>

        <CuraFooter />
      </main>
    )
  }

  const blocksBySection = sections.map((section) => ({
    section,
    blocks: blocks
      .filter((block) => block.section_id === section.id)
      .sort((a, b) => a.display_order - b.display_order),
  }))

  return (
    <main className="min-h-screen bg-[#F5F8FC] text-[#071B49]">
      <CuraHeader />

      <section className="bg-[#071B49] text-white">
        <div className="mx-auto max-w-5xl px-6 py-16 lg:py-20">
          <Link
            href="/education/materials/accounting"
            className="text-sm font-semibold text-[#35B5E5]"
          >
            ← Accounting
          </Link>

          <div className="mt-8">
            <span className="rounded-full bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-[#35B5E5]">
              {topic.standard || "Accounting"}
            </span>

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

      <section className="mx-auto max-w-5xl px-6 py-12 lg:py-16">
        {quiz && (
          <div className="mb-10 flex flex-col gap-5 rounded-3xl border border-[#168BC4]/20 bg-white p-7 shadow-sm md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#168BC4]">
                Topic assessment
              </p>

              <h2 className="mt-2 text-xl font-semibold">
                {quiz.title}
              </h2>

              <p className="mt-2 text-sm text-slate-500">
                {quiz.description ||
                  "Test your understanding of this topic."}
              </p>
            </div>

            <Link
              href={`/education/test?quiz=${quiz.id}`}
              className="shrink-0 rounded-full bg-[#071B49] px-6 py-3 text-sm font-bold text-white transition hover:bg-[#102a5f]"
            >
              Start quiz →
            </Link>
          </div>
        )}

        {blocksBySection.length === 0 ? (
          <div className="rounded-3xl border border-slate-200 bg-white p-10">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#168BC4]">
              Coming soon
            </p>

            <h2 className="mt-3 text-2xl font-semibold">
              Learning material is being prepared
            </h2>

            <p className="mt-3 max-w-2xl leading-7 text-slate-600">
              This topic is already part of the CURA Education catalogue.
              The verified learning material will appear here once it has
              been published through the Education CMS.
            </p>
          </div>
        ) : (
          <div className="space-y-10">
            {blocksBySection.map(({ section, blocks }) => (
              <article
                key={section.id}
                className="rounded-[30px] border border-slate-200 bg-white p-7 shadow-[0_8px_30px_rgba(7,27,73,0.05)] md:p-10"
              >
                <div className="border-b border-slate-100 pb-6">
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#168BC4]">
                    Section {section.display_order + 1}
                  </p>

                  <h2 className="mt-2 text-2xl font-semibold md:text-3xl">
                    {section.title}
                  </h2>
                </div>

                <div className="mt-8 space-y-8">
                  {blocks.map((block) => {
                    const blockItems = items
                      .filter((item) => item.block_id === block.id)
                      .sort(
                        (a, b) =>
                          a.display_order - b.display_order
                      )

                    return (
                      <div key={block.id}>
                        {block.title && (
                          <h3 className="text-xl font-semibold">
                            {block.title}
                          </h3>
                        )}

                        {block.content && (
                          <div className="mt-3 whitespace-pre-line text-base leading-8 text-slate-700">
                            {block.content}
                          </div>
                        )}

                        {blockItems.length > 0 && (
                          <ul className="mt-5 space-y-3">
                            {blockItems.map((item) => (
                              <li
                                key={item.id}
                                className="flex gap-3 rounded-2xl bg-[#F5F8FC] p-4 text-sm leading-6 text-slate-700"
                              >
                                <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-[#168BC4]" />
                                <span>{item.content}</span>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    )
                  })}
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      <CuraFooter />
    </main>
  )
}