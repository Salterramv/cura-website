"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { createClient } from "@/lib/supabase/client"

type Article = {
  id: string
  slug: string
  title: string
  description: string | null
  published_date: string | null
}

function formatDate(date: string | null) {
  if (!date) return ""

  return new Date(date).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  })
}

export default function InsightArticles({
  category,
}: {
  category: "Maldives Economy" | "Global Economy"
}) {
  const [articles, setArticles] = useState<Article[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadArticles() {
      const supabase = createClient()

      const { data, error } = await supabase
        .from("articles")
        .select(
          "id, slug, title, description, published_date"
        )
        .eq("published", true)
        .eq("category", category)
        .order("published_date", {
          ascending: false,
          nullsFirst: false,
        })
        .limit(12)

      if (error) {
        console.error(
          `Failed to load ${category} articles:`,
          error
        )
        setArticles([])
      } else {
        setArticles((data ?? []) as Article[])
      }

      setLoading(false)
    }

    loadArticles()
  }, [category])

  return (
    <section className="mx-auto max-w-7xl px-6 py-16 md:px-10 md:py-20 lg:px-12">

      <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">

        <div className="max-w-2xl">

          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#168BC4]">
            Latest Insights
          </p>

          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-[#071B49] md:text-4xl">
            {category} articles
          </h2>

          <p className="mt-4 text-base leading-7 text-slate-600">
            Recent CURA analysis and practical commentary on developments
            shaping {category.toLowerCase()}.
          </p>

        </div>

      </div>

      {loading ? (

        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">

          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="h-52 animate-pulse rounded-2xl border border-[#dce5ef] bg-[#F7FAFC]"
            />
          ))}

        </div>

      ) : articles.length === 0 ? (

        <div className="mt-10 rounded-2xl border border-dashed border-[#cbd8e5] bg-[#F7FAFC] px-6 py-14 text-center">

          <h3 className="text-lg font-semibold text-[#071B49]">
            Articles coming soon
          </h3>

          <p className="mx-auto mt-2 max-w-xl text-sm leading-7 text-slate-500">
            CURA will publish analysis in this section as new
            {` ${category.toLowerCase()} `}
            articles are released.
          </p>

        </div>

      ) : (

        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">

          {articles.map((article) => (

            <Link
              key={article.id}
              href={`/articles/${article.slug}`}
              className="group rounded-2xl border border-[#dce5ef] bg-white p-7 transition-all duration-300 hover:-translate-y-1 hover:border-[#18b8ee]/50 hover:shadow-xl"
            >

              <div className="flex items-center justify-between gap-4">

                <span className="rounded-full bg-[#E7F4FA] px-3 py-1 text-[10px] font-bold tracking-[0.15em] text-[#0876A8]">
                  {category}
                </span>

                {article.published_date && (
                  <span className="whitespace-nowrap text-xs text-slate-400">
                    {formatDate(article.published_date)}
                  </span>
                )}

              </div>

              <h3 className="mt-6 text-xl font-semibold leading-8 text-[#071B49] group-hover:text-[#168BC4]">
                {article.title}
              </h3>

              {article.description && (
                <p className="mt-4 line-clamp-3 text-sm leading-7 text-slate-600">
                  {article.description}
                </p>
              )}

              <div className="mt-6 text-sm font-semibold text-[#071B49] group-hover:text-[#D71920]">
                Read article →
              </div>

            </Link>

          ))}

        </div>

      )}

      <div className="mt-8">

        <Link
          href="/articles"
          className="text-sm font-semibold text-[#071B49] hover:text-[#168BC4]"
        >
          View all CURA articles →
        </Link>

      </div>

    </section>
  )
}
