"use client"

import { useEffect, useState } from "react"
import CuraHeader from "@/components/CuraHeader"
import CuraFooter from "@/components/CuraFooter"
import { createClient } from "@/lib/supabase/client"

type Article = {
  id: string
  slug: string
  title: string
  category: string
  description: string | null
  author_name: string | null
  published_date: string | null
}

const categories = [
  "All",
  "GST",
  "Business Profit Tax",
  "Withholding Tax",
  "Tax Compliance",
  "Tax Law",
  "Tax Updates",
  "Accounting",
  "Audit",
  "Advisory",
  "Other",
]

function formatDate(date: string | null) {
  if (!date) return ""

  return new Date(date).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  })
}

export default function ArticlesPage() {
  const supabase = createClient()

  const [articles, setArticles] = useState<Article[]>([])
  const [search, setSearch] = useState("")
  const [selectedCategory, setSelectedCategory] =
    useState("All")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadArticles() {
      const { data, error } = await supabase
        .from("articles")
        .select(`
          id,
          slug,
          title,
          category,
          description,
          author_name,
          published_date
        `)
        .eq("published", true)
        .order("published_date", {
          ascending: false,
          nullsFirst: false,
        })

      if (error) {
        console.error("Failed to load articles:", error)
        setArticles([])
      } else {
        setArticles(data ?? [])
      }

      setLoading(false)
    }

    loadArticles()
  }, [])

  const filteredArticles = articles.filter((article) => {
    const searchTerm = search.toLowerCase().trim()

    const matchesSearch =
      searchTerm === "" ||
      article.title
        .toLowerCase()
        .includes(searchTerm) ||
      (article.description ?? "")
        .toLowerCase()
        .includes(searchTerm) ||
      article.category
        .toLowerCase()
        .includes(searchTerm) ||
      (article.author_name ?? "")
        .toLowerCase()
        .includes(searchTerm)

    const matchesCategory =
      selectedCategory === "All" ||
      article.category === selectedCategory

    return matchesSearch && matchesCategory
  })

  return (
    <main className="min-h-screen bg-[#F5F8FC] text-[#071B49]">

      <CuraHeader />

      {/* HERO */}

      <section className="bg-[#071B49]">

        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8">

          <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#35B5E5]">
            CURA Knowledge Centre
          </p>

          <h1 className="mt-5 text-4xl font-semibold tracking-tight text-white md:text-6xl">
            Maldives Tax Knowledge
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
            Practical articles, guides and insights covering taxation,
            compliance and tax law in the Maldives.
          </p>

        </div>

      </section>

      {/* CONTENT */}

      <section>

        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">

          {/* SEARCH */}

          <div className="relative">

            <input
              type="text"
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              placeholder="Search tax articles..."
              className="w-full rounded-xl border border-slate-300 bg-white px-5 py-4 text-sm outline-none focus:border-[#168BC4] focus:ring-2 focus:ring-[#168BC4]/20"
            />

            {search && (
              <button
                type="button"
                onClick={() => setSearch("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-slate-400 hover:text-[#071B49]"
              >
                Clear
              </button>
            )}

          </div>

          {/* CATEGORY FILTERS */}

          <div className="mt-6 flex flex-wrap gap-3">

            {categories.map((category) => {

              const active =
                selectedCategory === category

              return (
                <button
                  key={category}
                  type="button"
                  onClick={() =>
                    setSelectedCategory(category)
                  }
                  className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                    active
                      ? "bg-[#071B49] text-white"
                      : "border border-slate-300 bg-white text-slate-600 hover:border-[#071B49]"
                  }`}
                >
                  {category}
                </button>
              )
            })}

          </div>

          {/* RESULT COUNT */}

          {!loading && (
            <div className="mt-10">

              <p className="text-sm text-slate-500">

                Showing{" "}

                <span className="font-semibold text-[#071B49]">
                  {filteredArticles.length}
                </span>{" "}

                {filteredArticles.length === 1
                  ? "article"
                  : "articles"}

              </p>

            </div>
          )}

          {/* LOADING */}

          {loading && (
            <div className="mt-10 rounded-xl border border-slate-200 bg-white px-6 py-16 text-center">

              <div className="mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-4 border-slate-200 border-t-[#168BC4]" />

              <p className="text-sm text-slate-500">
                Loading articles...
              </p>

            </div>
          )}

          {/* ARTICLES */}

          {!loading &&
            filteredArticles.length > 0 && (

              <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">

                {filteredArticles.map(
                  (article) => (

                    <article
                      key={article.id}
                      className="group rounded-xl border border-slate-200 bg-white p-7 transition hover:-translate-y-1 hover:shadow-xl"
                    >

                      <div className="flex items-center justify-between gap-4">

                        <span className="rounded-full bg-[#E7F4FA] px-3 py-1 text-[10px] font-bold tracking-[0.15em] text-[#0876A8]">
                          {article.category}
                        </span>

                        <span className="whitespace-nowrap text-xs text-slate-400">
                          {formatDate(
                            article.published_date,
                          )}
                        </span>

                      </div>

                      <h2 className="mt-6 text-xl font-semibold leading-8 text-[#071B49]">
                        {article.title}
                      </h2>

                      {article.description && (
                        <p className="mt-4 text-sm leading-7 text-slate-600">
                          {article.description}
                        </p>
                      )}

                      {article.author_name && (
                        <p className="mt-4 text-xs text-slate-400">
                          By{" "}
                          <span className="font-medium text-slate-500">
                            {article.author_name}
                          </span>
                        </p>
                      )}

                      <a
                        href={`/articles/${article.slug}`}
                        className="mt-7 inline-block text-sm font-semibold text-[#071B49] transition group-hover:text-[#D71920]"
                      >
                        Read article →
                      </a>

                    </article>

                  ),
                )}

              </div>
            )}

          {/* EMPTY */}

          {!loading &&
            filteredArticles.length === 0 && (

              <div className="mt-6 rounded-xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center">

                <h2 className="text-xl font-semibold">
                  No articles found
                </h2>

                <p className="mt-3 text-sm text-slate-500">
                  Try another search term or choose a
                  different category.
                </p>

                <button
                  type="button"
                  onClick={() => {
                    setSearch("")
                    setSelectedCategory("All")
                  }}
                  className="mt-6 rounded-md bg-[#071B49] px-5 py-2.5 text-sm font-semibold text-white"
                >
                  Show all articles
                </button>

              </div>
            )}

        </div>

      </section>

      <CuraFooter />

    </main>
  )
}
