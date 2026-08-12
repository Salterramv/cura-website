"use client"

import { useState } from "react"

const cases = [
  {
    category: "Supreme Court",
    title: "Tax Appeal and Interpretation of Tax Legislation",
    caseNumber: "Sample Case No. 01",
    date: "2026",
    description:
      "A structured summary of an important tax dispute, focusing on the interpretation and application of tax legislation.",
  },
  {
    category: "Tax Appeal Tribunal",
    title: "Business Profit Tax Assessment Dispute",
    caseNumber: "Sample Case No. 02",
    date: "2025",
    description:
      "A case summary examining issues relating to business profit tax and the taxpayer's objections to an assessment.",
  },
  {
    category: "Supreme Court",
    title: "GST Classification and Tax Treatment",
    caseNumber: "Sample Case No. 03",
    date: "2025",
    description:
      "An overview of a dispute involving GST treatment and the interpretation of the applicable tax provisions.",
  },
  {
    category: "Tax Appeal Tribunal",
    title: "Tax Assessment and Supporting Evidence",
    caseNumber: "Sample Case No. 04",
    date: "2024",
    description:
      "A summary of issues concerning tax assessments, supporting documentation and the taxpayer's position.",
  },
]

const categories = [
  "All",
  "Supreme Court",
  "Tax Appeal Tribunal",
]

export default function CasesPage() {
  const [search, setSearch] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")

  const filteredCases = cases.filter((item) => {
    const term = search.toLowerCase().trim()

    const matchesSearch =
      term === "" ||
      item.title.toLowerCase().includes(term) ||
      item.description.toLowerCase().includes(term) ||
      item.category.toLowerCase().includes(term) ||
      item.caseNumber.toLowerCase().includes(term) ||
      item.date.includes(term)

    const matchesCategory =
      selectedCategory === "All" ||
      item.category === selectedCategory

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
              className="text-slate-600 hover:text-[#071B49]"
            >
              Knowledge
            </a>

            <a
              href="/cases"
              className="text-slate-600 transition hover:text-[#071B49]"
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
              className="rounded-md bg-[#071B49] px-5 py-2.5 text-white hover:bg-[#0B2A69]"
            >
              Contact
            </a>

          </nav>

        </div>
      </header>

      {/* HERO */}
      <section className="bg-[#071B49]">

        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8">

          <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#D71920]">
            CURA Legal Case Library
          </p>

          <h1 className="mt-5 max-w-4xl text-4xl font-semibold tracking-tight text-white md:text-6xl">
            Maldives Tax Legal Cases
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
            Explore structured summaries of important tax decisions,
            judgments and legal principles relevant to taxation in the
            Maldives.
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
              placeholder="Search legal cases..."
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

          {/* FILTERS */}
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
                {filteredCases.length}
              </span>{" "}
              {filteredCases.length === 1 ? "case" : "cases"}
            </p>

          </div>

          {/* CASES */}
          {filteredCases.length > 0 ? (

            <div className="mt-6 grid gap-6 md:grid-cols-2">

              {filteredCases.map((item) => (

                <article
                  key={item.caseNumber}
                  className="group rounded-xl border border-slate-200 bg-white p-8 transition hover:-translate-y-1 hover:shadow-xl"
                >

                  <div className="flex items-center justify-between gap-4">

                    <span className="rounded-full bg-red-50 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.15em] text-[#D71920]">
                      {item.category}
                    </span>

                    <span className="text-xs text-slate-400">
                      {item.date}
                    </span>

                  </div>

                  <p className="mt-6 text-xs font-medium uppercase tracking-[0.15em] text-slate-400">
                    {item.caseNumber}
                  </p>

                  <h2 className="mt-3 text-2xl font-semibold leading-8 text-[#071B49]">
                    {item.title}
                  </h2>

                  <p className="mt-4 text-sm leading-7 text-slate-600">
                    {item.description}
                  </p>

                  <a
                    href="#"
                    className="mt-7 inline-block text-sm font-semibold text-[#071B49] transition group-hover:text-[#D71920]"
                  >
                    Read case summary →
                  </a>

                </article>

              ))}

            </div>

          ) : (

            <div className="mt-6 rounded-xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center">

              <h2 className="text-xl font-semibold">
                No cases found
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
                Show all cases
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