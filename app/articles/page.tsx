"use client"

import { useState } from "react"

const articles = [
  {
    category: "GST",
    title: "Understanding GST in the Maldives",
    description:
      "An introduction to GST, registration requirements, filing obligations and important compliance considerations.",
    date: "12 August 2026",
    slug: "understanding-gst-maldives",
  },
  {
    category: "Business Profit Tax",
    title: "Understanding Business Profit Tax",
    description:
      "A practical overview of Business Profit Tax and the key obligations businesses should understand.",
    date: "10 August 2026",
    slug: "understanding-business-profit-tax",
  },
  {
    category: "Withholding Tax",
    title: "Withholding Tax: A Practical Guide",
    description:
      "Understand when withholding tax may apply and the key considerations for businesses making payments.",
    date: "8 August 2026",
    slug: "withholding-tax-practical-guide",
  },
  {
    category: "Tax Compliance",
    title: "Common Tax Compliance Mistakes",
    description:
      "A practical look at common mistakes businesses make and how better processes can reduce compliance risks.",
    date: "5 August 2026",
    slug: "common-tax-compliance-mistakes",
  },
  {
    category: "Tax Law",
    title: "How to Read a Tax Decision",
    description:
      "A simple guide to understanding the reasoning, findings and implications contained in a tax case.",
    date: "2 August 2026",
    slug: "how-to-read-tax-decision",
  },
  {
    category: "Tax Updates",
    title: "Important Maldives Tax Developments",
    description:
      "A collection of important developments affecting taxpayers, businesses and professionals in the Maldives.",
    date: "30 July 2026",
    slug: "important-maldives-tax-developments",
  },
]

const categories = [
  "All",
  "GST",
  "Business Profit Tax",
  "Withholding Tax",
  "Tax Compliance",
  "Tax Law",
  "Tax Updates",
]

export default function ArticlesPage() {
  const [search, setSearch] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")

  const filteredArticles = articles.filter((article) => {
    const searchTerm = search.toLowerCase().trim()

    const matchesSearch =
      searchTerm === "" ||
      article.title.toLowerCase().includes(searchTerm) ||
      article.description.toLowerCase().includes(searchTerm) ||
      article.category.toLowerCase().includes(searchTerm)

    const matchesCategory =
      selectedCategory === "All" ||
      article.category === selectedCategory

    return matchesSearch && matchesCategory
  })

  return (
    <main className="min-h-screen bg-[#F5F8FC] text-[#071B49]">

      {/* HEADER */}
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">

          <a href="/">
            <img
              src="/cura-logo.png"
              alt="CURA - Audit Tax Advisory"
              className="h-24 w-auto object-contain"
            />
          </a>

          <nav className="hidden items-center gap-8 text-sm font-medium md:flex">

            <a
              href="/"
              className="text-slate-600 hover:text-[#071B49]"
            >
              Home
            </a>

            <a
              href="/articles"
              className="border-b-2 border-[#D71920] pb-1 text-[#071B49]"
            >
              Knowledge
            </a>

            <a
              href="/cases"
              className="text-slate-600 hover:text-[#071B49]"
            >
              Legal Cases
            </a>

            <a
              href="/#education"
              className="text-slate-600 hover:text-[#071B49]"
            >
              Education
            </a>

            <a
              href="/#about"
              className="text-slate-600 hover:text-[#071B49]"
            >
              About
            </a>

            <a
              href="/#contact"
              className="rounded-md bg-[#071B49] px-5 py-2.5 text-white"
            >
              Contact
            </a>

          </nav>

        </div>
      </header>

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
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search tax articles..."
              className="w-full rounded-xl border border-slate-300 bg-white px-5 py-4 text-sm outline-none focus:border-[#168BC4] focus:ring-2 focus:ring-[#168BC4]/20"
            />

            {search && (
              <button
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

              const active = selectedCategory === category

              return (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
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
          <div className="mt-10">

            <p className="text-sm text-slate-500">
              Showing{" "}
              <span className="font-semibold text-[#071B49]">
                {filteredArticles.length}
              </span>{" "}
              {filteredArticles.length === 1 ? "article" : "articles"}
            </p>

          </div>

          {/* ARTICLE CARDS */}
          {filteredArticles.length > 0 ? (

            <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">

              {filteredArticles.map((article) => (

                <article
                  key={article.slug}
                  className="group rounded-xl border border-slate-200 bg-white p-7 transition hover:-translate-y-1 hover:shadow-xl"
                >

                  <div className="flex items-center justify-between gap-4">

                    <span className="rounded-full bg-[#E7F4FA] px-3 py-1 text-[10px] font-bold tracking-[0.15em] text-[#0876A8]">
                      {article.category}
                    </span>

                    <span className="whitespace-nowrap text-xs text-slate-400">
                      {article.date}
                    </span>

                  </div>

                  <h2 className="mt-6 text-xl font-semibold leading-8 text-[#071B49]">
                    {article.title}
                  </h2>

                  <p className="mt-4 text-sm leading-7 text-slate-600">
                    {article.description}
                  </p>

                  {/* ARTICLE LINK */}
                  <a
                    href={`/articles/${article.slug}`}
                    className="mt-7 inline-block text-sm font-semibold text-[#071B49] transition group-hover:text-[#D71920]"
                  >
                    Read article →
                  </a>

                </article>

              ))}

            </div>

          ) : (

            <div className="mt-6 rounded-xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center">

              <h2 className="text-xl font-semibold">
                No articles found
              </h2>

              <p className="mt-3 text-sm text-slate-500">
                Try another search term or choose a different category.
              </p>

              <button
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

      {/* FOOTER */}
      <footer className="bg-[#04132D] text-white">

        <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">

          <div className="flex flex-col justify-between gap-8 md:flex-row">

            <div>

              <img
                src="/cura-logo.png"
                alt="CURA"
                className="h-20 w-auto brightness-0 invert"
              />

              <p className="mt-3 text-sm text-slate-400">
                Audit · Tax · Advisory
              </p>

              <p className="mt-2 text-xs tracking-[0.25em] text-[#D99A17]">
                CURE YOUR FIGURES
              </p>

            </div>

            <div className="text-sm text-slate-400">
              <p>Maldives</p>
              <p className="mt-2">
                Professional knowledge platform
              </p>
            </div>

          </div>

          <div className="mt-10 border-t border-white/10 pt-6 text-xs text-slate-500">
            © {new Date().getFullYear()} CURA. All rights reserved.
          </div>

        </div>

      </footer>

    </main>
  )
}