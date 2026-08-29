
"use client"

import Link from "next/link"
import { useEffect, useMemo, useState } from "react"
import { useParams } from "next/navigation"

import CuraHeader from "@/components/CuraHeader"
import CuraFooter from "@/components/CuraFooter"
import { createClient } from "@/lib/supabase/client"

type EducationArea = {
  area_key: string
  name: string
  description: string | null
  display_order: number
  is_active: boolean
}

type Topic = {
  id: string
  slug: string
  title: string
  standard: string | null
  description: string | null
  display_order: number
  is_published: boolean
  status: string | null
}

function slugify(value: string) {
  return value
    .trim()
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
}

export default function EducationAreaPage() {
  const params = useParams()

  const areaSlug =
    typeof params?.areaSlug === "string"
      ? params.areaSlug
      : ""

  const supabase = useMemo(
    () => createClient(),
    []
  )

  const [area, setArea] =
    useState<EducationArea | null>(null)

  const [topics, setTopics] =
    useState<Topic[]>([])

  const [loading, setLoading] =
    useState(true)

  const [error, setError] =
    useState<string | null>(null)

  useEffect(() => {
    if (!areaSlug) return

    let cancelled = false

    async function loadArea() {
      setLoading(true)
      setError(null)

      const { data: areaRows, error: areaError } =
        await supabase
          .from("education_areas")
          .select(
            "area_key,name,description,display_order,is_active"
          )
          .eq("is_active", true)
          .order("display_order", {
            ascending: true,
          })

      if (cancelled) return

      if (areaError) {
        console.error(
          "Education area loading error:",
          areaError
        )

        setError(areaError.message)
        setLoading(false)
        return
      }

      const matchedArea =
        (areaRows ?? []).find(
          (item) =>
            slugify(item.name) === areaSlug ||
            item.area_key.toLowerCase() === areaSlug
        ) as EducationArea | undefined

      if (!matchedArea) {
        setError(
          "The requested education area could not be found."
        )
        setLoading(false)
        return
      }

      const { data: topicRows, error: topicError } =
        await supabase
          .from("education_topics")
          .select(
            "id,slug,title,standard,description,display_order,is_published,status"
          )
          .eq(
            "category",
            matchedArea.name
          )
          .eq(
            "is_published",
            true
          )
          .order("display_order", {
            ascending: true,
          })

      if (cancelled) return

      if (topicError) {
        console.error(
          "Education topic loading error:",
          topicError
        )

        setError(topicError.message)
        setLoading(false)
        return
      }

      setArea(matchedArea)
      setTopics(
        (topicRows ?? []) as Topic[]
      )
      setLoading(false)
    }

    void loadArea()

    return () => {
      cancelled = true
    }
  }, [areaSlug, supabase])

  if (loading) {
    return (
      <main className="min-h-screen bg-[#F5F8FC]">
        <CuraHeader />

        <section className="bg-[#071B49]">
          <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
            <div className="h-5 w-40 animate-pulse rounded bg-white/20" />
            <div className="mt-6 h-14 w-2/3 animate-pulse rounded bg-white/20" />
            <div className="mt-5 h-5 w-1/2 animate-pulse rounded bg-white/10" />
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3, 4, 5, 6].map(
              (item) => (
                <div
                  key={item}
                  className="h-64 animate-pulse rounded-[26px] bg-white"
                />
              )
            )}
          </div>
        </section>

        <CuraFooter />
      </main>
    )
  }

  if (error || !area) {
    return (
      <main className="min-h-screen bg-[#F5F8FC]">
        <CuraHeader />

        <section className="mx-auto max-w-4xl px-6 py-24 text-center">
          <h1 className="text-3xl font-semibold text-[#071B49]">
            Education area unavailable
          </h1>

          <p className="mt-4 text-slate-500">
            {error ||
              "The requested education area could not be found."}
          </p>

          <Link
            href="/education/materials"
            className="mt-8 inline-flex rounded-full bg-[#071B49] px-6 py-3 text-sm font-semibold text-white"
          >
            ← Back to Education
          </Link>
        </section>

        <CuraFooter />
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-[#F5F8FC] text-[#071B49]">
      <CuraHeader />

      {/* HERO */}

      <section className="bg-[#071B49] text-white">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8 lg:py-24">
          <Link
            href="/education/materials"
            className="text-sm font-semibold text-slate-300 hover:text-white"
          >
            ← Education Materials
          </Link>

          <p className="mt-10 text-xs font-bold uppercase tracking-[0.3em] text-[#35B5E5]">
            CURA Education
          </p>

          <h1 className="mt-4 text-4xl font-semibold tracking-tight md:text-6xl">
            {area.name}
          </h1>

          {area.description && (
            <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">
              {area.description}
            </p>
          )}
        </div>
      </section>

      {/* TOPICS */}

      <section className="mx-auto max-w-7xl px-6 py-16 lg:px-8 lg:py-24">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#168BC4]">
            Learning catalogue
          </p>

          <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">
            {area.name} topics
          </h2>

          <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-500">
            Explore the published learning materials available in
            this education area.
          </p>
        </div>

        {topics.length === 0 ? (
          <div className="mt-10 rounded-[26px] border border-slate-200 bg-white p-10 text-center">
            <h3 className="text-xl font-semibold">
              Materials coming soon
            </h3>

            <p className="mt-3 text-sm text-slate-500">
              There are currently no published topics in this
              education area.
            </p>
          </div>
        ) : (
          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {topics.map(
              (topic, index) => (
                <Link
                  key={topic.id}
                  href={`/education/materials/${areaSlug}/${topic.slug}`}
                  className="
                    group
                    flex
                    min-h-[250px]
                    flex-col
                    rounded-[26px]
                    border
                    border-slate-200
                    bg-white
                    p-7
                    shadow-[0_8px_28px_rgba(7,27,73,0.05)]
                    transition
                    duration-300
                    hover:-translate-y-1
                    hover:border-[#168BC4]/40
                    hover:shadow-[0_20px_45px_rgba(7,27,73,0.10)]
                  "
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    {topic.standard && (
                      <span className="rounded-full bg-[#F1F7FB] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.15em] text-[#168BC4]">
                        {topic.standard}
                      </span>
                    )}
                  </div>

                  <h3 className="mt-7 text-xl font-semibold leading-7 text-[#071B49] transition-colors group-hover:text-[#168BC4]">
                    {topic.title}
                  </h3>

                  <p className="mt-3 line-clamp-4 text-sm leading-6 text-slate-600">
                    {topic.description ||
                      "Explore this topic and its published learning content."}
                  </p>

                  <span className="mt-auto pt-6 text-sm font-bold text-[#168BC4]">
                    Explore topic →
                  </span>
                </Link>
              )
            )}
          </div>
        )}
      </section>

      <CuraFooter />
    </main>
  )
}
