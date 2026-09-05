"use client"

import Link from "next/link"
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
  published_date: string | null
}

type LegalCase = {
  id: string
  slug: string
  title: string
  category: string | null
  mira_case_number: string | null
}

type Analysis = {
  case_id: string
  analyzed_at: string | null
  status: string | null
}

type DisplayCase = LegalCase & {
  analyzed_at: string | null
}

const services = [
  {
    number: "01",
    title: "Tax",
    href: "/tax",
    description:
      "Practical tax compliance and advisory services for businesses and professionals.",
  },
  {
    number: "02",
    title: "Audit",
    href: "/audit",
    description:
      "Audit and assurance services focused on financial reporting, risk and controls.",
  },
  {
    number: "03",
    title: "Advisory",
    href: "/advisory",
    description:
      "Financial and business advice to help management make better decisions.",
  },
  {
    number: "04",
    title: "Legal",
    href: "/legal",
    description:
      "Practical legal and regulatory guidance for businesses and commercial matters.",
  },
  {
    number: "05",
    title: "Education",
    href: "/education",
    description:
      "Learning resources to strengthen your professional knowledge.",
  },
  {
    number: "06",
    title: "Other Services",
    href: "/other-services",
    description:
      "Bookkeeping and payroll support designed around the practical needs of businesses.",
  },
]

function formatDate(date: string | null) {
  if (!date) return ""

  return new Date(date).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  })
}

function UpdateList({
  items,
  loading,
  emptyText,
  href,
}: {
  items: Article[]
  loading: boolean
  emptyText: string
  href: string
}) {
  if (loading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((item) => (
          <div
            key={item}
            className="h-16 animate-pulse rounded-lg bg-slate-100"
          />
        ))}
      </div>
    )
  }

  if (items.length === 0) {
    return (
      <div className="rounded-lg border border-dashed border-slate-300 bg-white px-4 py-5">
        <p className="text-sm leading-6 text-slate-500">
          {emptyText}
        </p>

        <Link
          href={href}
          className="mt-3 inline-block text-sm font-semibold text-[#071B49] hover:text-[#168BC4]"
        >
          Explore page →
        </Link>
      </div>
    )
  }

  return (
    <div className="divide-y divide-slate-200">
      {items.map((article) => (
        <Link
          key={article.id}
          href={`/articles/${article.slug}`}
          className="group block py-4 first:pt-0 last:pb-0"
        >
          <div className="flex items-start justify-between gap-3">
            <h3 className="text-sm font-semibold leading-6 text-[#071B49] transition group-hover:text-[#168BC4]">
              {article.title}
            </h3>

            {article.published_date && (
              <span className="shrink-0 text-[11px] text-slate-400">
                {formatDate(article.published_date)}
              </span>
            )}
          </div>

          {article.description && (
            <p className="mt-1 line-clamp-2 text-xs leading-5 text-slate-500">
              {article.description}
            </p>
          )}
        </Link>
      ))}
    </div>
  )
}

function CaseList({
  cases,
  loading,
}: {
  cases: DisplayCase[]
  loading: boolean
}) {
  if (loading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((item) => (
          <div
            key={item}
            className="h-16 animate-pulse rounded-lg bg-slate-100"
          />
        ))}
      </div>
    )
  }

  if (cases.length === 0) {
    return (
      <div className="rounded-lg border border-dashed border-slate-300 bg-white px-4 py-5">
        <p className="text-sm leading-6 text-slate-500">
          No published legal case analyses are currently available.
        </p>

        <Link
          href="/cases"
          className="mt-3 inline-block text-sm font-semibold text-[#071B49] hover:text-[#D71920]"
        >
          Explore legal cases →
        </Link>
      </div>
    )
  }

  return (
    <div className="divide-y divide-slate-200">
      {cases.map((item) => (
        <Link
          key={item.id}
          href={`/cases/${item.slug}`}
          className="group block py-4 first:pt-0 last:pb-0"
        >
          <h3 className="text-sm font-semibold leading-6 text-[#071B49] transition group-hover:text-[#D71920]">
            {item.title}
          </h3>

          <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-500">
            {item.mira_case_number && (
              <span>{item.mira_case_number}</span>
            )}

            {item.analyzed_at && (
              <span>
                Analysed {formatDate(item.analyzed_at)}
              </span>
            )}
          </div>
        </Link>
      ))}
    </div>
  )
}

export default function Home() {
  const [maldivesArticles, setMaldivesArticles] =
    useState<Article[]>([])

  const [globalArticles, setGlobalArticles] =
    useState<Article[]>([])

  const [technicalArticles, setTechnicalArticles] =
    useState<Article[]>([])

  const [legalCases, setLegalCases] =
    useState<DisplayCase[]>([])

  const [updatesLoading, setUpdatesLoading] =
    useState(true)

  const [casesLoading, setCasesLoading] =
    useState(true)

  useEffect(() => {
    const supabase = createClient()

    async function loadHomepageUpdates() {
      setUpdatesLoading(true)

      const articleFields = `
        id,
        slug,
        title,
        category,
        description,
        published_date
      `

      const [
        maldivesResult,
        globalResult,
        technicalResult,
      ] = await Promise.all([
        supabase
          .from("articles")
          .select(articleFields)
          .eq("published", true)
          .eq("category", "Maldives Economy")
          .order("published_date", {
            ascending: false,
            nullsFirst: false,
          })
          .limit(4),

        supabase
          .from("articles")
          .select(articleFields)
          .eq("published", true)
          .eq("category", "Global Economy")
          .order("published_date", {
            ascending: false,
            nullsFirst: false,
          })
          .limit(4),

        supabase
          .from("articles")
          .select(articleFields)
          .eq("published", true)
          .order("published_date", {
            ascending: false,
            nullsFirst: false,
          })
          .limit(4),
      ])

      setMaldivesArticles(
        (maldivesResult.data ?? []) as Article[]
      )

      setGlobalArticles(
        (globalResult.data ?? []) as Article[]
      )

      setTechnicalArticles(
        (technicalResult.data ?? []) as Article[]
      )

      setUpdatesLoading(false)
    }

    async function loadLegalCases() {
      setCasesLoading(true)

      const {
        data: analyses,
        error: analysesError,
      } = await supabase
        .from("legal_case_analyses")
        .select(
          "case_id, analyzed_at, status"
        )
        .neq("status", "superseded")
        .order("analyzed_at", {
          ascending: false,
          nullsFirst: false,
        })
        .limit(8)

      if (
        analysesError ||
        !analyses ||
        analyses.length === 0
      ) {
        setLegalCases([])
        setCasesLoading(false)
        return
      }

      const latestByCase =
        new Map<string, Analysis>()

      ;(analyses as Analysis[]).forEach(
        (analysis) => {
          if (!latestByCase.has(analysis.case_id)) {
            latestByCase.set(
              analysis.case_id,
              analysis
            )
          }
        }
      )

      const caseIds =
        Array.from(latestByCase.keys()).slice(0, 4)

      const { data: cases } =
        await supabase
          .from("legal_cases")
          .select(
            "id, slug, title, category, mira_case_number"
          )
          .eq("published", true)
          .in("id", caseIds)

      const caseMap =
        new Map<string, LegalCase>()

      ;((cases ?? []) as LegalCase[]).forEach(
        (item) => {
          caseMap.set(item.id, item)
        }
      )

      const displayCases =
        caseIds
          .map((caseId) => {
            const item =
              caseMap.get(caseId)

            const analysis =
              latestByCase.get(caseId)

            if (!item || !analysis) {
              return null
            }

            return {
              ...item,
              analyzed_at:
                analysis.analyzed_at,
            }
          })
          .filter(
            (
              item,
            ): item is DisplayCase =>
              item !== null
          )

      setLegalCases(displayCases)
      setCasesLoading(false)
    }

    loadHomepageUpdates()
    loadLegalCases()
  }, [])

  return (
    <main className="min-h-screen bg-white text-[#071B49]">

      <CuraHeader />

      {/* HERO */}

      <section className="relative overflow-hidden bg-[#061936]">

        <div className="absolute inset-0">

          <div className="absolute right-0 top-0 h-full w-1/2 bg-gradient-to-l from-[#0D4F85] via-[#0A315F] to-transparent opacity-80" />

          <div className="absolute -right-32 -top-32 h-[600px] w-[600px] rounded-full bg-[#168BC4] opacity-20 blur-3xl" />

          <div className="absolute bottom-0 right-1/4 h-64 w-64 rounded-full bg-[#0C73A8] opacity-20 blur-3xl" />

        </div>

        <div className="relative mx-auto grid max-w-7xl items-center px-6 py-24 lg:grid-cols-2 lg:px-8 lg:py-32">

          <div className="max-w-2xl">

            <p className="mb-6 text-xs font-bold uppercase tracking-[0.35em] text-[#35B5E5]">
              Maldives Professional Knowledge Platform
            </p>

            <h1 className="text-5xl font-semibold leading-[1.05] tracking-tight text-white md:text-7xl">

              Clarity in

              <br />

              <span className="text-[#8EB3D7]">
                numbers and legal matters
              </span>

              <span className="text-[#D71920]">
                .
              </span>

            </h1>

            <p className="mt-8 max-w-xl text-lg leading-8 text-slate-300">
              CURA brings together practical knowledge in taxation,
              accounting, audit, advisory and legal matters — helping
              businesses and professionals make better-informed decisions.
            </p>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row">

              <Link
                href="/articles"
                className="rounded-md bg-white px-7 py-3.5 text-center text-sm font-semibold text-[#071B49] transition hover:bg-slate-100"
              >
                Explore Knowledge →
              </Link>

              <Link
                href="/cases"
                className="rounded-md bg-white px-7 py-3.5 text-center text-sm font-semibold text-[#071B49] transition hover:bg-slate-100"
              >
                Browse Legal Cases →
              </Link>

            </div>

          </div>

          <div className="mt-16 flex justify-center lg:mt-0 lg:justify-end">

            <div className="relative flex h-80 w-80 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] backdrop-blur-sm md:h-96 md:w-96">

              <div className="absolute inset-8 rounded-full border border-[#168BC4]/30" />

              <div className="text-center">

                <div className="text-7xl font-light tracking-[0.2em] text-white">
                  CURA
                </div>

                <div className="mt-4 text-xs tracking-[0.45em] text-[#35B5E5]">
                  AUDIT · TAX · ADVISORY
                </div>

                <div className="mx-auto mt-7 h-px w-24 bg-[#D99A17]" />

                <div className="mt-6 text-sm tracking-[0.35em] text-slate-300">
                  CURE YOUR FIGURES
                </div>

              </div>

            </div>

          </div>

        </div>

      </section>

      {/* SERVICE STRIP */}

      <section className="relative z-10 -mt-8 px-6">

        <div className="mx-auto grid max-w-7xl overflow-hidden rounded-xl border border-slate-200 bg-white shadow-xl md:grid-cols-6">

          {services.map((service, index) => (

            <Link
              key={service.title}
              href={service.href}
              className={`group p-7 transition hover:bg-slate-50 ${
                index !== services.length - 1
                  ? "border-b border-slate-200 md:border-b-0 md:border-r"
                  : ""
              }`}
            >

              <div className="text-xs font-bold tracking-[0.2em] text-slate-400">
                {service.number}
              </div>

              <h3 className="mt-5 text-lg font-semibold text-[#071B49]">
                {service.title}
              </h3>

              <p className="mt-3 text-sm leading-6 text-slate-600">
                {service.description}
              </p>

              <div className="mt-5 text-sm font-semibold text-[#071B49] transition group-hover:text-[#D71920]">
                Explore →
              </div>

            </Link>

          ))}

        </div>

      </section>

      {/* ABOUT */}

      <section id="about" className="bg-white">

        <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8">

          <div className="grid gap-16 md:grid-cols-2">

            <div>

              <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#168BC4]">
                About CURA
              </p>

              <h2 className="mt-5 text-4xl font-semibold tracking-tight text-[#071B49] md:text-5xl">
                Knowledge before advice.
              </h2>

            </div>

            <div className="text-base leading-8 text-slate-600">

              <p>
                CURA is being developed as a professional platform focused on
                making complex tax, accounting, audit and legal matters easier
                to understand.
              </p>

              <p className="mt-6">
                Our goal is simple: provide reliable, practical and accessible
                knowledge that helps individuals, businesses and professionals
                navigate the increasingly complex world of regulation and
                finance.
              </p>

              <p className="mt-6 font-medium text-[#071B49]">
                CURE YOUR FIGURES.
              </p>

            </div>

          </div>

        </div>

      </section>

      {/* FOUR UPDATE COLUMNS */}

      <section
        id="updates"
        className="border-y border-slate-200 bg-[#F5F8FC]"
      >

        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8">

          <div>

            <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#168BC4]">
              CURA Updates
            </p>

            <h2 className="mt-4 text-4xl font-semibold tracking-tight text-[#071B49]">
              Latest developments and knowledge
            </h2>

            <p className="mt-4 max-w-3xl text-slate-600">
              Stay informed with recent economic developments,
              professional articles and legal case analysis.
            </p>

          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">

            {/* MALDIVES ECONOMY */}

            <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-[0_8px_24px_rgba(7,27,73,0.04)]">

              <div className="flex items-start justify-between gap-3">

                <div>

                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#168BC4]">
                    Maldives
                  </p>

                  <h3 className="mt-2 text-lg font-semibold text-[#071B49]">
                    Maldivian economy updates
                  </h3>

                </div>

                <Link
                  href="/insights/maldives-economy"
                  className="shrink-0 text-sm font-semibold text-[#168BC4] hover:text-[#071B49]"
                >
                  View →
                </Link>

              </div>

              <p className="mt-3 text-xs leading-5 text-slate-500">
                Recent articles and developments from the Maldives economy.
              </p>

              <div className="mt-6">

                <UpdateList
                  items={maldivesArticles}
                  loading={updatesLoading}
                  emptyText="No recent Maldives economy articles have been published yet."
                  href="/insights/maldives-economy"
                />

              </div>

            </div>

            {/* GLOBAL ECONOMY */}

            <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-[0_8px_24px_rgba(7,27,73,0.04)]">

              <div className="flex items-start justify-between gap-3">

                <div>

                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#168BC4]">
                    Global
                  </p>

                  <h3 className="mt-2 text-lg font-semibold text-[#071B49]">
                    Global economy updates
                  </h3>

                </div>

                <Link
                  href="/insights/global-economy"
                  className="shrink-0 text-sm font-semibold text-[#168BC4] hover:text-[#071B49]"
                >
                  View →
                </Link>

              </div>

              <p className="mt-3 text-xs leading-5 text-slate-500">
                Recent articles and developments shaping the global economy.
              </p>

              <div className="mt-6">

                <UpdateList
                  items={globalArticles}
                  loading={updatesLoading}
                  emptyText="No recent global economy articles have been published yet."
                  href="/insights/global-economy"
                />

              </div>

            </div>

            {/* TECHNICAL ARTICLES */}

            <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-[0_8px_24px_rgba(7,27,73,0.04)]">

              <div className="flex items-start justify-between gap-3">

                <div>

                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#168BC4]">
                    Knowledge
                  </p>

                  <h3 className="mt-2 text-lg font-semibold text-[#071B49]">
                    CURA technical articles
                  </h3>

                </div>

                <Link
                  href="/articles"
                  className="shrink-0 text-sm font-semibold text-[#168BC4] hover:text-[#071B49]"
                >
                  View →
                </Link>

              </div>

              <p className="mt-3 text-xs leading-5 text-slate-500">
                The most recent professional and technical articles.
              </p>

              <div className="mt-6">

                <UpdateList
                  items={technicalArticles}
                  loading={updatesLoading}
                  emptyText="No technical articles have been published yet."
                  href="/articles"
                />

              </div>

            </div>

            {/* LEGAL CASES */}

            <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-[0_8px_24px_rgba(7,27,73,0.04)]">

              <div className="flex items-start justify-between gap-3">

                <div>

                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#D71920]">
                    Legal
                  </p>

                  <h3 className="mt-2 text-lg font-semibold text-[#071B49]">
                    Tax legal cases
                  </h3>

                </div>

                <Link
                  href="/cases"
                  className="shrink-0 text-sm font-semibold text-[#D71920] hover:text-[#071B49]"
                >
                  View →
                </Link>

              </div>

              <p className="mt-3 text-xs leading-5 text-slate-500">
                The most recent published legal case analyses.
              </p>

              <div className="mt-6">

                <CaseList
                  cases={legalCases}
                  loading={casesLoading}
                />

              </div>

            </div>

          </div>

        </div>

      </section>

      {/* EDUCATION */}

      <section id="education" className="bg-[#071B49]">

        <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8">

          <div className="max-w-3xl">

            <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#35B5E5]">
              Education
            </p>

            <h2 className="mt-5 text-4xl font-semibold tracking-tight text-white md:text-5xl">
              Learn. Understand. Apply.
            </h2>

            <p className="mt-6 text-lg leading-8 text-slate-300">
              Practical educational resources covering taxation, accounting,
              audit, financial reporting and professional development.
            </p>

            <Link
              href="/education"
              className="mt-9 inline-block rounded-md bg-white px-7 py-3.5 text-sm font-semibold text-[#071B49] hover:bg-slate-100"
            >
              Explore Education →
            </Link>

          </div>

        </div>

      </section>

      {/* CONTACT */}

      <section id="contact" className="bg-[#F5F8FC]">

        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8">

          <div className="flex flex-col justify-between gap-8 md:flex-row md:items-center">

            <div>

              <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#168BC4]">
                CURA
              </p>

              <h2 className="mt-4 text-3xl font-semibold text-[#071B49]">
                Have a question?
              </h2>

              <p className="mt-3 text-slate-600">
                Get in touch with CURA.
              </p>

            </div>

            <a
              href="mailto:info@cura.mv"
              className="rounded-md bg-[#071B49] px-7 py-3.5 text-center text-sm font-semibold !text-white hover:bg-[#0B2A69]"
            >
              Contact CURA →
            </a>

          </div>

        </div>

      </section>

      <CuraFooter />

    </main>
  )
}
