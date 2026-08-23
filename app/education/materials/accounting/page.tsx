"use client"

import Link from "next/link"
import { useMemo, useState } from "react"
import CuraHeader from "@/components/CuraHeader"
import CuraFooter from "@/components/CuraFooter"
import { accountingTopics } from "./data/accountingTopics"

type Topic = {
  slug: string
  title: string
  standard: string
  description?: string
  blocks?: unknown[]
  quiz?: unknown[]
}

type Category = {
  id: string
  eyebrow: string
  title: string
  description: string
  slugs: string[]
  visual: string
}

const categories: Category[] = [
  {
    id: "foundations",
    eyebrow: "01 · Foundations",
    title: "Build the accounting picture",
    description:
      "Start with the concepts that explain why financial statements look the way they do and how accounting decisions are made.",
    slugs: [
      "conceptual-framework-fair-value",
      "published-accounts",
      "accounting-policies-estimates-errors",
    ],
    visual: "foundation",
  },
  {
    id: "assets",
    eyebrow: "02 · Assets & measurement",
    title: "Follow value through the books",
    description:
      "Explore how businesses recognise, measure, depreciate, impair, revalue and eventually dispose of assets.",
    slugs: [
      "property-plant-equipment",
      "intangible-assets",
      "impairment-of-assets",
      "non-current-assets-held-for-sale",
      "agriculture-inventories",
    ],
    visual: "asset",
  },
  {
    id: "transactions",
    eyebrow: "03 · Transactions",
    title: "Understand the accounting behind activity",
    description:
      "Work through the accounting consequences of contracts, leases, currencies, financial instruments and employee arrangements.",
    slugs: [
      "revenue",
      "foreign-currency",
      "leases",
      "financial-assets-liabilities",
      "employee-benefits",
      "share-based-payments",
    ],
    visual: "transaction",
  },
  {
    id: "reporting",
    eyebrow: "04 · Reporting",
    title: "Turn transactions into reports",
    description:
      "Connect tax, cash flow, earnings per share and financial statement information with the story told to users.",
    slugs: [
      "taxation",
      "earnings-per-share",
      "statement-of-cash-flows",
      "interpretation-financial-statements",
      "events-provisions-contingencies",
    ],
    visual: "reporting",
  },
  {
    id: "groups",
    eyebrow: "05 · Group reporting",
    title: "Think like a group",
    description:
      "Move from individual company accounts to control, consolidation, associates, acquisitions and changes in group structure.",
    slugs: [
      "consolidated-principles",
      "consolidated-statement-financial-position",
      "consolidated-profit-or-loss",
      "associates",
      "group-disposals",
    ],
    visual: "group",
  },
  {
    id: "transition",
    eyebrow: "06 · Standards & transition",
    title: "When the rules change",
    description:
      "Understand first-time adoption, new standards and the simplified IFRS for SMEs reporting pathway.",
    slugs: [
      "adopting-new-accounting-standards",
      "ifrs-for-smes",
    ],
    visual: "transition",
  },
]

function topicBySlug(slug: string) {
  return (accountingTopics as Topic[]).find((topic) => topic.slug === slug)
}

function TopicCard({ topic }: { topic: Topic }) {
  const sections = topic.blocks?.length ?? 0
  const questions = topic.quiz?.length ?? 0

  return (
    <Link
      href={`/education/materials/accounting/${topic.slug}`}
      className="group relative flex min-h-[245px] flex-col overflow-hidden rounded-[26px] border border-slate-200 bg-white p-7 shadow-[0_8px_28px_rgba(7,27,73,0.05)] transition duration-300 hover:-translate-y-1 hover:border-[#168BC4]/40 hover:shadow-[0_20px_45px_rgba(7,27,73,0.10)]"
    >
      <div className="absolute right-0 top-0 h-28 w-28 translate-x-10 -translate-y-10 rounded-full bg-[#F1F7FB] transition duration-500 group-hover:scale-150" />

      <div className="relative flex items-start justify-between gap-4">
        <span className="rounded-full bg-[#F1F7FB] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-[#168BC4]">
          {topic.standard}
        </span>

        <span className="text-xl text-[#168BC4] transition-transform duration-300 group-hover:translate-x-1">
          →
        </span>
      </div>

      <div className="relative mt-8">
        <h3 className="text-xl font-semibold leading-7 text-[#071B49] transition-colors group-hover:text-[#168BC4]">
          {topic.title}
        </h3>

        <p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-600">
          {topic.description ??
            "Interactive accounting material designed for reading, examples and active learning."}
        </p>
      </div>

      <div className="relative mt-auto flex items-center gap-5 border-t border-slate-100 pt-5">
        <span className="text-xs font-semibold text-slate-500">
          {sections} sections
        </span>
        <span className="text-xs font-semibold text-slate-500">
          {questions} questions
        </span>
        <span className="ml-auto text-xs font-bold text-[#168BC4]">
          Study →
        </span>
      </div>
    </Link>
  )
}

function CategoryVisual({ type }: { type: string }) {
  const labels: Record<string, string[]> = {
    foundation: ["Concept", "Recognition", "Measurement", "Reporting"],
    asset: ["Recognise", "Measure", "Depreciate", "Impair", "Dispose"],
    transaction: ["Contract", "Event", "Measure", "Record", "Settle"],
    reporting: ["Profit", "Cash", "Tax", "EPS", "Insight"],
    group: ["Parent", "Subsidiary", "Adjust", "Eliminate", "Group"],
    transition: ["Change", "Assess", "Implement", "Explain", "Report"],
  }

  const items = labels[type] ?? labels.foundation

  return (
    <div className="relative h-32 w-full overflow-hidden rounded-2xl bg-[#071B49]">
      <div className="absolute -right-8 -top-12 h-36 w-36 rounded-full border border-white/10" />
      <div className="absolute -bottom-20 left-1/3 h-44 w-44 rounded-full border border-[#35B5E5]/10" />

      <svg viewBox="0 0 500 130" className="absolute inset-0 h-full w-full">
        <defs>
          <linearGradient id={`line-${type}`} x1="0" x2="1">
            <stop offset="0%" stopColor="#168BC4" />
            <stop offset="100%" stopColor="#35B5E5" />
          </linearGradient>
        </defs>

        <path
          d="M35 66 C110 25 140 105 215 66 S330 28 465 66"
          fill="none"
          stroke={`url(#line-${type})`}
          strokeWidth="3"
          opacity=".75"
        />

        {items.map((label, index) => {
          const x = 35 + index * (430 / Math.max(1, items.length - 1))

          return (
            <g key={label}>
              <circle
                cx={x}
                cy="66"
                r="15"
                fill="#071B49"
                stroke="#35B5E5"
                strokeWidth="2"
              />
              <circle cx={x} cy="66" r="5" fill="#FFFFFF" />
              <text
                x={x}
                y="105"
                textAnchor="middle"
                fill="#CBD5E1"
                fontSize="10"
                fontWeight="600"
              >
                {label}
              </text>
            </g>
          )
        })}
      </svg>
    </div>
  )
}

export default function AccountingMaterialsPage() {
  const [activeCategory, setActiveCategory] = useState("all")

  const availableCategories = useMemo(
    () =>
      categories
        .map((category) => ({
          ...category,
          topics: category.slugs
            .map(topicBySlug)
            .filter(Boolean) as Topic[],
        }))
        .filter((category) => category.topics.length > 0),
    []
  )

  const allTopics = accountingTopics as Topic[]

  return (
    <main className="min-h-screen bg-[#F5F8FC] text-[#071B49]">
      <CuraHeader />

      {/* HERO */}
      <section className="relative overflow-hidden bg-[#071B49] text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_82%_25%,rgba(53,181,229,0.20),transparent_30%),radial-gradient(circle_at_15%_90%,rgba(22,139,196,0.14),transparent_30%)]" />

        <div className="relative mx-auto max-w-7xl px-6 py-16 lg:px-8 lg:py-24">
          <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_.9fr]">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#35B5E5]">
                CURA Education · Accounting
              </p>

              <h1 className="mt-5 max-w-4xl text-4xl font-semibold tracking-tight md:text-6xl">
                Build the accounting picture.
              </h1>

              <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
                Explore accounting and financial reporting through connected
                concepts, practical examples and interactive learning —
                designed to help you understand the reasoning behind the
                numbers.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href="#learning-path"
                  className="rounded-full bg-white px-6 py-3 text-sm font-bold text-[#071B49] transition hover:bg-slate-100"
                >
                  Start exploring
                </a>

                <span className="rounded-full border border-white/15 bg-white/5 px-5 py-3 text-sm text-slate-300">
                  IAS · IFRS · Worked examples · Quizzes
                </span>
              </div>
            </div>

            <div className="relative mx-auto w-full max-w-[500px]">
              <div className="absolute inset-8 rounded-full border border-white/10" />
              <div className="absolute inset-16 rounded-full border border-[#35B5E5]/20" />

              <div className="relative rounded-[32px] border border-white/10 bg-white/[0.06] p-6 backdrop-blur-sm">
                <div className="rounded-[24px] bg-white p-6 text-[#071B49] shadow-2xl">
                  <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#168BC4]">
                    The accounting journey
                  </p>

                  <div className="mt-6 space-y-3">
                    {[
                      ["01", "Understand the concept"],
                      ["02", "See the decision"],
                      ["03", "Apply the accounting"],
                      ["04", "Test your understanding"],
                    ].map(([number, label]) => (
                      <div
                        key={number}
                        className="flex items-center gap-4 rounded-2xl bg-[#F5F8FC] p-4"
                      >
                        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#071B49] text-xs font-bold text-white">
                          {number}
                        </span>
                        <span className="text-sm font-semibold">{label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* INTRO */}
      <section className="mx-auto max-w-7xl px-6 py-14 lg:px-8 lg:py-20">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:items-end">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#168BC4]">
              Educational Materials
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">
              Accounting & Financial Reporting
            </h2>
          </div>

          <p className="max-w-2xl text-base leading-8 text-slate-600">
            These lessons are organised around how an accountant actually
            thinks: understand the facts, identify the accounting question,
            apply the relevant model and then interpret the result. Choose a
            pathway below to begin.
          </p>
        </div>

        {/* FILTER */}
        <div
          id="learning-path"
          className="mt-10 flex gap-2 overflow-x-auto pb-2"
        >
          <button
            type="button"
            onClick={() => setActiveCategory("all")}
            className={`shrink-0 rounded-full px-5 py-2.5 text-sm font-semibold transition ${
              activeCategory === "all"
                ? "bg-[#071B49] text-white"
                : "bg-white text-slate-600 ring-1 ring-slate-200 hover:ring-[#168BC4]/40"
            }`}
          >
            All topics
          </button>

          {availableCategories.map((category) => (
            <button
              key={category.id}
              type="button"
              onClick={() => setActiveCategory(category.id)}
              className={`shrink-0 rounded-full px-5 py-2.5 text-sm font-semibold transition ${
                activeCategory === category.id
                  ? "bg-[#071B49] text-white"
                  : "bg-white text-slate-600 ring-1 ring-slate-200 hover:ring-[#168BC4]/40"
              }`}
            >
              {category.eyebrow.replace(/^\d+\s·\s/, "")}
            </button>
          ))}
        </div>
      </section>

      {/* LEARNING PATH */}
      <section className="mx-auto max-w-7xl px-6 pb-24 lg:px-8">
        <div className="space-y-10">
          {availableCategories
            .filter(
              (category) =>
                activeCategory === "all" ||
                activeCategory === category.id
            )
            .map((category) => (
              <section
                key={category.id}
                className="overflow-hidden rounded-[32px] border border-slate-200 bg-white shadow-[0_8px_30px_rgba(7,27,73,0.05)]"
              >
                <div className="grid lg:grid-cols-[340px_1fr]">
                  <div className="bg-[#071B49] p-7 text-white md:p-9">
                    <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#35B5E5]">
                      {category.eyebrow}
                    </p>

                    <h2 className="mt-4 text-2xl font-semibold leading-tight">
                      {category.title}
                    </h2>

                    <p className="mt-4 text-sm leading-7 text-slate-300">
                      {category.description}
                    </p>

                    <div className="mt-7">
                      <CategoryVisual type={category.visual} />
                    </div>

                    <p className="mt-4 text-xs font-semibold text-slate-400">
                      {category.topics.length} learning{" "}
                      {category.topics.length === 1 ? "topic" : "topics"}
                    </p>
                  </div>

                  <div className="grid gap-4 p-5 md:grid-cols-2 md:p-7">
                    {category.topics.map((topic) => (
                      <TopicCard key={topic.slug} topic={topic} />
                    ))}
                  </div>
                </div>
              </section>
            ))}
        </div>

        {/* Remaining topics safeguard */}
        {activeCategory === "all" &&
          allTopics.some(
            (topic) =>
              !categories.some((category) =>
                category.slugs.includes(topic.slug)
              )
          ) && (
            <section className="mt-10 rounded-[28px] border border-slate-200 bg-white p-7">
              <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#168BC4]">
                Additional material
              </p>
              <div className="mt-5 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {allTopics
                  .filter(
                    (topic) =>
                      !categories.some((category) =>
                        category.slugs.includes(topic.slug)
                      )
                  )
                  .map((topic) => (
                    <TopicCard key={topic.slug} topic={topic} />
                  ))}
              </div>
            </section>
          )}
      </section>

      {/* CLOSING */}
      <section className="border-t border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
          <div className="rounded-[32px] bg-[#071B49] px-7 py-10 text-white md:px-10">
            <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#35B5E5]">
              Study differently
            </p>
            <h2 className="mt-3 max-w-2xl text-3xl font-semibold">
              Don't just remember the rule. Understand the decision.
            </h2>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-300">
              Open a topic, work through the visual model, read the explanation
              and finish with the knowledge check.
            </p>
          </div>
        </div>
      </section>

      <CuraFooter />
    </main>
  )
}