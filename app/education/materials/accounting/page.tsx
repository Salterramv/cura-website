"use client"

import Link from "next/link"
import { useEffect, useMemo, useState } from "react"
import CuraHeader from "@/components/CuraHeader"
import CuraFooter from "@/components/CuraFooter"
import { createClient } from "@/lib/supabase/client"

type Topic = {
  id: string
  slug: string
  title: string
  standard: string | null
  description: string | null
  category: string | null
  display_order: number
  visual_theme: string | null
}

type Quiz = {
  id: string
  title: string
  topic: string | null
  question_count: number
  is_published: boolean
}

const categoryMap: Record<string, string> = {
  foundations: "Foundations",
  assets: "Assets & measurement",
  transactions: "Transactions",
  reporting: "Reporting",
  groups: "Group reporting",
  transition: "Standards & transition",
}

function categoryForTopic(topic: Topic) {
  const value = `${topic.title} ${topic.standard ?? ""}`.toLowerCase()

  if (
    /conceptual|published accounts|policies|estimates|errors|first-time|ifrs for smes/.test(
      value
    )
  ) {
    return "foundations"
  }

  if (
    /property|plant|equipment|intangible|impairment|held for sale|agriculture|inventor/.test(
      value
    )
  ) {
    return "assets"
  }

  if (
    /revenue|foreign currency|lease|employee|share-based|financial asset|financial liabilit|provision|contingen/.test(
      value
    )
  ) {
    return "transactions"
  }

  if (
    /tax|earnings per share|cash flow|interpretation|events/.test(value)
  ) {
    return "reporting"
  }

  if (
    /consolidat|associate|joint venture|group|disposal|changes in group/.test(
      value
    )
  ) {
    return "groups"
  }

  return "transition"
}

export default function AccountingMaterialsPage() {
  const supabase = useMemo(() => createClient(), [])
  const [topics, setTopics] = useState<Topic[]>([])
  const [quizzes, setQuizzes] = useState<Quiz[]>([])
  const [activeCategory, setActiveCategory] = useState("all")
  const [search, setSearch] = useState("")
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function loadEducation() {
      setLoading(true)
      setError(null)

      const [
        { data: topicData, error: topicError },
        { data: quizData, error: quizError },
      ] = await Promise.all([
        supabase
          .from("education_topics")
          .select(
            "id,slug,title,standard,description,category,display_order,visual_theme"
          )
          .eq("category", "Accounting")
          .eq("is_published", true)
          .eq("status", "published")
          .order("display_order", { ascending: true }),

        supabase
          .from("education_quizzes")
          .select("id,title,category,is_published")
          .eq("category", "Accounting")
          .eq("is_published", true),
      ])

      if (topicError) {
        setError(topicError.message)
        setLoading(false)
        return
      }

      if (quizError) {
        setError(quizError.message)
        setLoading(false)
        return
      }

      const quizRows = quizData ?? []

      const quizIds = quizRows.map((quiz) => quiz.id)

      let questionCounts: Record<string, number> = {}

      if (quizIds.length > 0) {
        const { data: questions } = await supabase
          .from("education_questions")
          .select("quiz_id")
          .in("quiz_id", quizIds)

        questionCounts = (questions ?? []).reduce<Record<string, number>>(
          (result, question) => {
            result[question.quiz_id] =
              (result[question.quiz_id] ?? 0) + 1

            return result
          },
          {}
        )
      }

      setTopics((topicData ?? []) as Topic[])

      setQuizzes(
        quizRows.map((quiz) => ({
          id: quiz.id,
          title: quiz.title,
          topic: null,
          question_count: questionCounts[quiz.id] ?? 0,
          is_published: quiz.is_published,
        }))
      )

      setLoading(false)
    }

    loadEducation()
  }, [supabase])

  const categories = useMemo(() => {
    const counts: Record<string, number> = {}

    topics.forEach((topic) => {
      const category = categoryForTopic(topic)
      counts[category] = (counts[category] ?? 0) + 1
    })

    return Object.entries(counts).map(([id, count]) => ({
      id,
      title: categoryMap[id] ?? id,
      count,
    }))
  }, [topics])

  const filteredTopics = useMemo(() => {
    const query = search.trim().toLowerCase()

    return topics.filter((topic) => {
      const category = categoryForTopic(topic)

      const matchesCategory =
        activeCategory === "all" || category === activeCategory

      const matchesSearch =
        !query ||
        topic.title.toLowerCase().includes(query) ||
        (topic.standard ?? "").toLowerCase().includes(query) ||
        (topic.description ?? "").toLowerCase().includes(query)

      return matchesCategory && matchesSearch
    })
  }, [topics, activeCategory, search])

  const quizCount = quizzes.length

  return (
    <main className="min-h-screen bg-[#F5F8FC] text-[#071B49]">
      <CuraHeader />

      <section className="relative overflow-hidden bg-[#071B49] text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_82%_20%,rgba(53,181,229,0.20),transparent_30%),radial-gradient(circle_at_15%_90%,rgba(22,139,196,0.14),transparent_32%)]" />

        <div className="relative mx-auto max-w-7xl px-6 py-16 lg:px-8 lg:py-24">
          <div className="max-w-4xl">
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#35B5E5]">
              CURA Education · Accounting
            </p>

            <h1 className="mt-5 text-4xl font-semibold tracking-tight md:text-6xl">
              Accounting & Financial Reporting
            </h1>

            <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">
              Build your understanding of accounting standards through
              structured topics, practical explanations and topic-based
              assessment.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#topics"
                className="rounded-full bg-[#071B49] px-6 py-3 text-sm font-bold text-white transition hover:bg-[#102A5F]"
              >
                Explore topics
              </a>

              <span className="rounded-full border border-white/15 bg-white/5 px-5 py-3 text-sm text-slate-300">
                {topics.length || 26} topics · {quizCount || 26} topic quizzes
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
        <div className="grid gap-4 sm:grid-cols-3">
          <div className="rounded-3xl border border-slate-200 bg-white p-6">
            <p className="text-3xl font-semibold text-[#071B49]">
              {topics.length}
            </p>
            <p className="mt-2 text-sm text-slate-500">
              Accounting topics
            </p>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-6">
            <p className="text-3xl font-semibold text-[#071B49]">
              {quizCount}
            </p>
            <p className="mt-2 text-sm text-slate-500">
              Topic quizzes
            </p>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-6">
            <p className="text-3xl font-semibold text-[#071B49]">
              IAS · IFRS
            </p>
            <p className="mt-2 text-sm text-slate-500">
              Standards-based learning
            </p>
          </div>
        </div>
      </section>

      <section
        id="topics"
        className="mx-auto max-w-7xl px-6 pb-24 lg:px-8"
      >
        <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#168BC4]">
              Learning catalogue
            </p>

            <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">
              Choose a topic
            </h2>
          </div>

          <div className="w-full md:max-w-sm">
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search accounting topics..."
              className="w-full rounded-full border border-slate-200 bg-white px-5 py-3 text-sm outline-none transition focus:border-[#168BC4] focus:ring-2 focus:ring-[#168BC4]/10"
            />
          </div>
        </div>

        <div className="mt-7 flex gap-2 overflow-x-auto pb-2">
          <button
            type="button"
            onClick={() => setActiveCategory("all")}
            className={`shrink-0 rounded-full px-5 py-2.5 text-sm font-semibold ${
              activeCategory === "all"
                ? "bg-[#071B49] text-white"
                : "bg-white text-slate-600 ring-1 ring-slate-200"
            }`}
          >
            All topics
          </button>

          {categories.map((category) => (
            <button
              key={category.id}
              type="button"
              onClick={() => setActiveCategory(category.id)}
              className={`shrink-0 rounded-full px-5 py-2.5 text-sm font-semibold ${
                activeCategory === category.id
                  ? "bg-[#071B49] text-white"
                  : "bg-white text-slate-600 ring-1 ring-slate-200"
              }`}
            >
              {category.title} ({category.count})
            </button>
          ))}
        </div>

        {loading ? (
          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <div
                key={item}
                className="h-64 animate-pulse rounded-[26px] bg-white"
              />
            ))}
          </div>
        ) : error ? (
          <div className="mt-10 rounded-3xl border border-red-200 bg-red-50 p-6 text-sm text-red-700">
            Unable to load Accounting materials.
          </div>
        ) : filteredTopics.length === 0 ? (
          <div className="mt-10 rounded-3xl border border-slate-200 bg-white p-10 text-center">
            <h3 className="text-lg font-semibold">
              No topics found
            </h3>
            <p className="mt-2 text-sm text-slate-500">
              Try another search or category.
            </p>
          </div>
        ) : (
          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {filteredTopics.map((topic) => {
              const category = categoryForTopic(topic)

              const quiz = quizzes.find((item) =>
                item.title
                  .toLowerCase()
                  .startsWith(topic.title.toLowerCase())
              )

              return (
                <Link
                  key={topic.id}
                  href={`/education/materials/accounting/${topic.slug}`}
                  className="group relative flex min-h-[250px] flex-col overflow-hidden rounded-[26px] border border-slate-200 bg-white p-7 shadow-[0_8px_28px_rgba(7,27,73,0.05)] transition duration-300 hover:-translate-y-1 hover:border-[#168BC4]/40 hover:shadow-[0_20px_45px_rgba(7,27,73,0.10)]"
                >
                  <div className="absolute right-0 top-0 h-32 w-32 translate-x-12 -translate-y-12 rounded-full bg-[#F1F7FB] transition duration-500 group-hover:scale-150" />

                  <div className="relative flex items-start justify-between gap-4">
                    <span className="rounded-full bg-[#F1F7FB] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-[#168BC4]">
                      {topic.standard || "IAS · IFRS"}
                    </span>

                    <span className="text-xl text-[#168BC4] transition-transform group-hover:translate-x-1">
                      →
                    </span>
                  </div>

                  <div className="relative mt-7">
                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">
                      {categoryMap[category]}
                    </p>

                    <h3 className="mt-2 text-xl font-semibold leading-7 text-[#071B49] transition-colors group-hover:text-[#168BC4]">
                      {topic.title}
                    </h3>

                    <p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-600">
                      {topic.description ||
                        "Structured accounting learning material covering the relevant standard and practical application."}
                    </p>
                  </div>

                  <div className="relative mt-auto flex items-center border-t border-slate-100 pt-5">
                    <span className="text-xs font-semibold text-slate-500">
                      Study material
                    </span>

                    <span className="ml-auto text-xs font-bold text-[#168BC4]">
                      {quiz ? "Quiz available →" : "Explore →"}
                    </span>
                  </div>
                </Link>
              )
            })}
          </div>
        )}
      </section>

      <CuraFooter />
    </main>
  )
}