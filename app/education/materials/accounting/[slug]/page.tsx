"use client"

import Link from "next/link"
import { useParams } from "next/navigation"
import { useMemo, useState } from "react"
import CuraHeader from "@/components/CuraHeader"
import CuraFooter from "@/components/CuraFooter"

type QuizQuestion = {
  question: string
  options: string[]
  answer: number
  explanation: string
}

const quizQuestions: QuizQuestion[] = [
  {
    question:
      "Under IAS 16, which of the following is a characteristic of property, plant and equipment?",
    options: [
      "It must always be held for resale",
      "It is a tangible item expected to be used during more than one period",
      "It must always generate revenue immediately",
      "It must have an indefinite useful life",
    ],
    answer: 1,
    explanation:
      "IAS 16 applies to tangible items that are held for specified purposes and are expected to be used during more than one period.",
  },
  {
    question:
      "Which of the following is normally included in the initial cost of an item of PPE?",
    options: [
      "Advertising expenditure",
      "General administration costs",
      "Costs directly attributable to bringing the asset to the location and condition necessary for operation",
      "Employee training costs",
    ],
    answer: 2,
    explanation:
      "Directly attributable costs necessary to bring the asset to the location and condition necessary for it to operate as intended are included in its cost.",
  },
  {
    question:
      "A machine costs MVR 1,000,000, has a residual value of MVR 100,000 and a useful life of five years. Using straight-line depreciation, what is the annual depreciation?",
    options: [
      "MVR 180,000",
      "MVR 200,000",
      "MVR 220,000",
      "MVR 900,000",
    ],
    answer: 0,
    explanation:
      "Depreciable amount is MVR 1,000,000 − MVR 100,000 = MVR 900,000. Dividing by five years gives annual depreciation of MVR 180,000.",
  },
  {
    question:
      "Which two broad subsequent measurement models are available under IAS 16?",
    options: [
      "Historical cost model and revenue model",
      "Cost model and revaluation model",
      "Fair value model and revenue model",
      "Replacement cost model and revenue model",
    ],
    answer: 1,
    explanation:
      "IAS 16 permits an entity to use the cost model or the revaluation model as its accounting policy for subsequent measurement, subject to the requirements of the Standard.",
  },
  {
    question:
      "Which of the following best describes depreciation?",
    options: [
      "A valuation increase recognised every year",
      "The allocation of the depreciable amount systematically over the asset's useful life",
      "The cash cost of purchasing an asset",
      "The difference between revenue and expenses",
    ],
    answer: 1,
    explanation:
      "Depreciation is the systematic allocation of an asset's depreciable amount over its useful life.",
  },
]

const topicMap: Record<
  string,
  {
    title: string
    standard: string
    description: string
  }
> = {
  "conceptual-framework-fair-value": {
    title: "Conceptual Framework & Fair Value",
    standard: "Conceptual Framework",
    description:
      "The foundations of financial reporting, recognition, measurement and fair value.",
  },
  "presentation-performance-reporting": {
    title: "Presentation & Performance Reporting",
    standard: "IAS 1 / IAS 8",
    description:
      "Financial statement presentation, accounting policies, estimates and errors.",
  },
  "property-plant-equipment": {
    title: "Property, Plant and Equipment",
    standard: "IAS 16",
    description:
      "Recognition, measurement, depreciation, revaluation and disposal of PPE.",
  },
  "intangible-assets": {
    title: "Intangible Assets",
    standard: "IAS 38",
    description:
      "Recognition, measurement and subsequent accounting for intangible assets.",
  },
  "impairment-of-assets": {
    title: "Impairment of Assets",
    standard: "IAS 36",
    description:
      "Impairment indicators, recoverable amount and impairment losses.",
  },
  "non-current-assets-held-for-sale": {
    title: "Non-current Assets Held for Sale",
    standard: "IFRS 5",
    description:
      "Classification, measurement and discontinued operations.",
  },
  revenue: {
    title: "Revenue",
    standard: "IFRS 15",
    description:
      "The five-step revenue recognition model and its applications.",
  },
  "agriculture-inventories": {
    title: "Agriculture & Inventories",
    standard: "IAS 41 / IAS 2",
    description:
      "Biological assets, agricultural produce and inventory accounting.",
  },
  "foreign-currency": {
    title: "Foreign Currency",
    standard: "IAS 21",
    description:
      "Functional currency, foreign currency transactions and translation.",
  },
  leases: {
    title: "Leases",
    standard: "IFRS 16",
    description:
      "Lease identification, right-of-use assets and lease liabilities.",
  },
  "employee-benefits": {
    title: "Employee Benefits",
    standard: "IAS 19",
    description:
      "Short-term, post-employment and defined benefit accounting.",
  },
  "share-based-payments": {
    title: "Share-based Payments",
    standard: "IFRS 2",
    description:
      "Equity-settled and cash-settled share-based payment accounting.",
  },
  "events-after-reporting-period": {
    title: "Events After the Reporting Period",
    standard: "IAS 10",
    description:
      "Adjusting and non-adjusting events after the reporting period.",
  },
  "provisions-contingencies": {
    title: "Provisions & Contingencies",
    standard: "IAS 37",
    description:
      "Provisions, contingent liabilities and contingent assets.",
  },
  "consolidated-financial-statements": {
    title: "Consolidated Financial Statements",
    standard: "IFRS 10",
    description:
      "Control, subsidiaries and the principles of consolidation.",
  },
  "associates-joint-ventures": {
    title: "Associates & Joint Ventures",
    standard: "IAS 28 / IFRS 11",
    description:
      "Significant influence, the equity method and joint arrangements.",
  },
  "advanced-consolidation": {
    title: "Advanced Consolidation",
    standard: "IFRS 3 / IFRS 10",
    description:
      "Advanced business combination and consolidation applications.",
  },
  "changes-group-structure": {
    title: "Changes in Group Structure",
    standard: "IFRS 3 / IFRS 10",
    description:
      "Step acquisitions, changes in ownership and loss of control.",
  },
  "group-disposals": {
    title: "Group Disposals",
    standard: "IFRS 10 / IFRS 5",
    description:
      "Accounting consequences of losing control of a subsidiary.",
  },
  "first-time-adoption-ifrs": {
    title: "First-time Adoption of IFRS",
    standard: "IFRS 1",
    description:
      "Transition to IFRS, exemptions, exceptions and reconciliations.",
  },
  "adoption-new-accounting-standards": {
    title: "Adoption of New Accounting Standards",
    standard: "IAS 8",
    description:
      "Transition requirements and practical implementation issues.",
  },
  "ifrs-for-smes": {
    title: "IFRS for SMEs",
    standard: "IFRS for SMEs",
    description:
      "A learning pathway for entities applying the IFRS for SMEs Standard.",
  },
}

export default function AccountingTopicPage() {
  const params = useParams()
  const slug = String(params?.slug || "")

  const topic = topicMap[slug]

  const isIAS16 = slug === "property-plant-equipment"

  const [answers, setAnswers] = useState<number[]>([])
  const [submitted, setSubmitted] = useState(false)

  const score = useMemo(() => {
    return quizQuestions.reduce((total, question, index) => {
      return total + (answers[index] === question.answer ? 1 : 0)
    }, 0)
  }, [answers])

  if (!topic) {
    return (
      <main className="min-h-screen bg-[#F5F8FC] text-[#071B49]">
        <CuraHeader />

        <section className="mx-auto max-w-4xl px-6 py-24 text-center">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#168BC4]">
            CURA Education
          </p>

          <h1 className="mt-4 text-4xl font-semibold">
            Material not found
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-slate-600">
            The requested accounting material could not be found.
          </p>

          <Link
            href="/education/materials/accounting"
            className="mt-8 inline-flex rounded-md bg-[#071B49] px-6 py-3 text-sm font-semibold text-white"
          >
            Back to Accounting
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
      <section className="bg-[#071B49]">
        <div className="mx-auto max-w-6xl px-6 py-16 lg:px-8 lg:py-20">
          <Link
            href="/education/materials/accounting"
            className="text-sm font-medium text-[#8FD8F2] hover:text-white"
          >
            ← Accounting Educational Materials
          </Link>

          <div className="mt-10 max-w-4xl">
            <div className="flex flex-wrap items-center gap-3">
              <span className="rounded-full bg-[#168BC4] px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-white">
                {topic.standard}
              </span>

              {isIAS16 && (
                <span className="rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-semibold text-slate-200">
                  Core Material
                </span>
              )}
            </div>

            <h1 className="mt-6 text-4xl font-semibold tracking-tight text-white md:text-6xl">
              {topic.title}
            </h1>

            <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">
              {topic.description}
            </p>

            {isIAS16 && (
              <div className="mt-8 flex flex-wrap gap-3 text-sm text-slate-300">
                <span>IAS 16</span>
                <span>•</span>
                <span>Financial Reporting</span>
                <span>•</span>
                <span>Practical Learning</span>
                <span>•</span>
                <span>Topic Quiz</span>
              </div>
            )}
          </div>
        </div>
      </section>

      {!isIAS16 ? (
        <section className="mx-auto max-w-4xl px-6 py-20 lg:px-8">
          <div className="rounded-2xl border border-[#DCE5EF] bg-white p-8 shadow-sm md:p-12">
            <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-[#EAF6FC] text-2xl text-[#168BC4]">
              📚
            </div>

            <h2 className="mt-7 text-3xl font-semibold">
              This material is being developed
            </h2>

            <p className="mt-5 leading-7 text-slate-600">
              CURA is developing this topic as a structured online learning
              experience using the accounting materials provided for the
              Accounting Education programme.
            </p>

            <p className="mt-4 leading-7 text-slate-600">
              The completed material will include explanations, visual
              illustrations, worked examples, practical applications and a
              topic quiz.
            </p>

            <Link
              href="/education/materials/accounting"
              className="mt-8 inline-flex rounded-md bg-[#071B49] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#0B2A69]"
            >
              Back to Accounting
            </Link>
          </div>
        </section>
      ) : (
        <>
          {/* LEARNING OBJECTIVES */}
          <section className="mx-auto max-w-6xl px-6 py-14 lg:px-8 lg:py-18">
            <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#168BC4]">
                  Start here
                </p>

                <h2 className="mt-3 text-3xl font-semibold">
                  What you will learn
                </h2>

                <p className="mt-5 max-w-3xl leading-7 text-slate-600">
                  This material introduces the key accounting principles for
                  property, plant and equipment and develops them through
                  practical examples.
                </p>
              </div>

              <div className="rounded-2xl border border-[#DCE5EF] bg-white p-7 shadow-sm">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#168BC4]">
                  IAS 16
                </p>

                <div className="mt-6 space-y-4">
                  {[
                    "Recognition",
                    "Initial measurement",
                    "Depreciation",
                    "Subsequent measurement",
                    "Revaluation",
                    "Disposal and disclosure",
                  ].map((item, index) => (
                    <div
                      key={item}
                      className="flex items-center gap-3"
                    >
                      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#EAF6FC] text-xs font-bold text-[#168BC4]">
                        {index + 1}
                      </span>

                      <span className="text-sm font-medium text-slate-700">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* VISUAL FLOW */}
          <section className="border-y border-[#DCE5EF] bg-white">
            <div className="mx-auto max-w-6xl px-6 py-14 lg:px-8 lg:py-18">
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#168BC4]">
                The accounting journey
              </p>

              <h2 className="mt-3 text-3xl font-semibold">
                From acquisition to disposal
              </h2>

              <div className="mt-10 grid gap-3 md:grid-cols-6">
                {[
                  ["01", "Identify", "Is it PPE?"],
                  ["02", "Recognise", "Recognition criteria"],
                  ["03", "Measure", "Initial cost"],
                  ["04", "Depreciate", "Useful life"],
                  ["05", "Revalue", "Where applicable"],
                  ["06", "Dispose", "Derecognition"],
                ].map(([number, title, text]) => (
                  <div
                    key={number}
                    className="relative rounded-xl bg-[#F5F8FC] p-5"
                  >
                    <span className="text-xs font-bold tracking-widest text-[#168BC4]">
                      {number}
                    </span>

                    <h3 className="mt-4 font-semibold">
                      {title}
                    </h3>

                    <p className="mt-2 text-xs leading-5 text-slate-500">
                      {text}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* WHAT IS PPE */}
          <section className="mx-auto max-w-6xl px-6 py-16 lg:px-8">
            <div className="max-w-4xl">
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#168BC4]">
                01 · Foundation
              </p>

              <h2 className="mt-3 text-3xl font-semibold">
                What is property, plant and equipment?
              </h2>

              <p className="mt-6 leading-8 text-slate-700">
                Property, plant and equipment are tangible items that are
                held for use in the production or supply of goods or services,
                for rental to others, or for administrative purposes, and are
                expected to be used during more than one period.
              </p>
            </div>

            <div className="mt-10 grid gap-5 md:grid-cols-3">
              {[
                {
                  title: "Tangible",
                  text: "The asset has physical substance.",
                  icon: "◉",
                },
                {
                  title: "Held for use",
                  text: "It is used for production, supply, rental or administration.",
                  icon: "↗",
                },
                {
                  title: "More than one period",
                  text: "The expected period of use extends beyond a single reporting period.",
                  icon: "∞",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="rounded-2xl border border-[#DCE5EF] bg-white p-7 shadow-sm"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#071B49] text-xl text-white">
                    {item.icon}
                  </div>

                  <h3 className="mt-6 text-xl font-semibold">
                    {item.title}
                  </h3>

                  <p className="mt-3 text-sm leading-6 text-slate-600">
                    {item.text}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* RECOGNITION */}
          <section className="bg-white">
            <div className="mx-auto max-w-6xl px-6 py-16 lg:px-8">
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#168BC4]">
                02 · Recognition
              </p>

              <h2 className="mt-3 text-3xl font-semibold">
                When is PPE recognised?
              </h2>

              <div className="mt-10 grid gap-6 md:grid-cols-2">
                <div className="rounded-2xl border border-[#DCE5EF] p-7">
                  <div className="text-3xl font-semibold text-[#168BC4]">
                    01
                  </div>

                  <h3 className="mt-5 text-xl font-semibold">
                    Future economic benefits
                  </h3>

                  <p className="mt-3 leading-7 text-slate-600">
                    It must be probable that future economic benefits
                    associated with the item will flow to the entity.
                  </p>
                </div>

                <div className="rounded-2xl border border-[#DCE5EF] p-7">
                  <div className="text-3xl font-semibold text-[#168BC4]">
                    02
                  </div>

                  <h3 className="mt-5 text-xl font-semibold">
                    Reliable measurement
                  </h3>

                  <p className="mt-3 leading-7 text-slate-600">
                    The cost of the item must be capable of being measured
                    reliably.
                  </p>
                </div>
              </div>

              <div className="mt-8 rounded-2xl bg-[#071B49] p-7 text-white md:p-9">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#35B5E5]">
                  CURA Key Point
                </p>

                <p className="mt-4 text-lg leading-8 text-slate-200">
                  Recognition is not determined simply by the size of an
                  expenditure. The recognition criteria and the nature of the
                  item must be considered.
                </p>
              </div>
            </div>
          </section>

          {/* INITIAL MEASUREMENT */}
          <section className="mx-auto max-w-6xl px-6 py-16 lg:px-8">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#168BC4]">
              03 · Measurement
            </p>

            <h2 className="mt-3 text-3xl font-semibold">
              Initial measurement
            </h2>

            <p className="mt-5 max-w-3xl leading-7 text-slate-600">
              An item of PPE is initially measured at cost. Cost includes the
              purchase price and costs that are directly attributable to
              bringing the asset to the location and condition necessary for
              it to operate as intended.
            </p>

            <div className="mt-10 overflow-hidden rounded-2xl border border-[#DCE5EF] bg-white shadow-sm">
              <div className="grid md:grid-cols-3">
                <div className="p-7">
                  <p className="text-xs font-bold uppercase tracking-widest text-[#168BC4]">
                    Purchase
                  </p>
                  <p className="mt-3 text-2xl font-semibold">
                    MVR 500,000
                  </p>
                </div>

                <div className="border-t border-[#DCE5EF] p-7 md:border-l md:border-t-0">
                  <p className="text-xs font-bold uppercase tracking-widest text-[#168BC4]">
                    Directly attributable
                  </p>
                  <p className="mt-3 text-2xl font-semibold">
                    + MVR 50,000
                  </p>
                </div>

                <div className="border-t border-[#DCE5EF] bg-[#F5F8FC] p-7 md:border-l md:border-t-0">
                  <p className="text-xs font-bold uppercase tracking-widest text-[#168BC4]">
                    Initial cost
                  </p>
                  <p className="mt-3 text-2xl font-semibold text-[#168BC4]">
                    MVR 550,000
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8 grid gap-5 md:grid-cols-2">
              <div className="rounded-2xl bg-white p-7 shadow-sm">
                <h3 className="text-lg font-semibold">
                  Commonly included
                </h3>

                <ul className="mt-5 space-y-3 text-sm leading-6 text-slate-600">
                  <li>• Purchase price</li>
                  <li>• Delivery costs</li>
                  <li>• Installation costs</li>
                  <li>• Other directly attributable costs</li>
                </ul>
              </div>

              <div className="rounded-2xl bg-white p-7 shadow-sm">
                <h3 className="text-lg font-semibold">
                  Consider carefully
                </h3>

                <ul className="mt-5 space-y-3 text-sm leading-6 text-slate-600">
                  <li>• Staff training</li>
                  <li>• Advertising</li>
                  <li>• General administration</li>
                  <li>• Costs not necessary to bring the asset into operation</li>
                </ul>
              </div>
            </div>
          </section>

          {/* DEPRECIATION */}
          <section className="bg-white">
            <div className="mx-auto max-w-6xl px-6 py-16 lg:px-8">
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#168BC4]">
                04 · Depreciation
              </p>

              <h2 className="mt-3 text-3xl font-semibold">
                Allocating the depreciable amount
              </h2>

              <p className="mt-5 max-w-3xl leading-7 text-slate-600">
                Depreciation allocates the depreciable amount of an asset
                systematically over its useful life.
              </p>

              <div className="mt-10 rounded-2xl bg-[#071B49] p-8 text-white md:p-10">
                <p className="text-sm font-semibold uppercase tracking-widest text-[#35B5E5]">
                  Straight-line illustration
                </p>

                <div className="mt-8 grid gap-5 md:grid-cols-4">
                  {[
                    ["Cost", "MVR 1,000,000"],
                    ["Residual value", "MVR 100,000"],
                    ["Depreciable amount", "MVR 900,000"],
                    ["Useful life", "5 years"],
                  ].map(([label, value]) => (
                    <div
                      key={label}
                      className="rounded-xl bg-white/10 p-5"
                    >
                      <p className="text-xs text-slate-300">
                        {label}
                      </p>

                      <p className="mt-2 text-xl font-semibold">
                        {value}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="mt-8 border-t border-white/15 pt-7">
                  <p className="text-sm text-slate-300">
                    Annual depreciation
                  </p>

                  <p className="mt-2 text-3xl font-semibold text-[#35B5E5]">
                    MVR 180,000
                  </p>

                  <p className="mt-3 text-sm text-slate-400">
                    (MVR 1,000,000 − MVR 100,000) ÷ 5
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* SUBSEQUENT MEASUREMENT */}
          <section className="mx-auto max-w-6xl px-6 py-16 lg:px-8">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#168BC4]">
              05 · Subsequent measurement
            </p>

            <h2 className="mt-3 text-3xl font-semibold">
              Cost model or revaluation model
            </h2>

            <div className="mt-10 grid gap-6 md:grid-cols-2">
              <div className="rounded-2xl border-2 border-[#DCE5EF] bg-white p-8">
                <span className="rounded-full bg-[#EAF6FC] px-3 py-1 text-xs font-bold text-[#168BC4]">
                  MODEL 01
                </span>

                <h3 className="mt-6 text-2xl font-semibold">
                  Cost model
                </h3>

                <p className="mt-4 leading-7 text-slate-600">
                  The asset is carried at cost less accumulated depreciation
                  and accumulated impairment losses.
                </p>

                <div className="mt-7 rounded-xl bg-[#F5F8FC] p-5 text-sm font-semibold">
                  Cost − accumulated depreciation − accumulated impairment
                </div>
              </div>

              <div className="rounded-2xl border-2 border-[#168BC4]/30 bg-white p-8">
                <span className="rounded-full bg-[#168BC4] px-3 py-1 text-xs font-bold text-white">
                  MODEL 02
                </span>

                <h3 className="mt-6 text-2xl font-semibold">
                  Revaluation model
                </h3>

                <p className="mt-4 leading-7 text-slate-600">
                  The asset is carried at a revalued amount, subject to the
                  requirements governing revaluation and subsequent
                  depreciation and impairment.
                </p>

                <div className="mt-7 rounded-xl bg-[#F5F8FC] p-5 text-sm font-semibold">
                  Revalued amount − subsequent depreciation − impairment
                </div>
              </div>
            </div>
          </section>

          {/* REVALUATION */}
          <section className="bg-white">
            <div className="mx-auto max-w-6xl px-6 py-16 lg:px-8">
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#168BC4]">
                06 · Revaluation
              </p>

              <h2 className="mt-3 text-3xl font-semibold">
                Understanding a revaluation increase
              </h2>

              <div className="mt-10 grid gap-5 md:grid-cols-3">
                <div className="rounded-2xl bg-[#F5F8FC] p-7">
                  <p className="text-xs font-bold uppercase tracking-widest text-slate-500">
                    Carrying amount
                  </p>

                  <p className="mt-4 text-2xl font-semibold">
                    MVR 800,000
                  </p>
                </div>

                <div className="flex items-center justify-center text-3xl text-[#168BC4]">
                  →
                </div>

                <div className="rounded-2xl bg-[#071B49] p-7 text-white">
                  <p className="text-xs font-bold uppercase tracking-widest text-[#35B5E5]">
                    Fair value
                  </p>

                  <p className="mt-4 text-2xl font-semibold">
                    MVR 950,000
                  </p>
                </div>
              </div>

              <div className="mt-6 rounded-2xl border border-[#DCE5EF] bg-white p-7">
                <p className="text-sm text-slate-500">
                  Illustrative revaluation difference
                </p>

                <p className="mt-2 text-3xl font-semibold text-[#168BC4]">
                  MVR 150,000
                </p>

                <p className="mt-3 text-sm leading-6 text-slate-600">
                  The accounting treatment of a revaluation increase depends
                  on the requirements of IAS 16, including the treatment of
                  any previous revaluation decrease recognised in profit or
                  loss.
                </p>
              </div>
            </div>
          </section>

          {/* KEY TAKEAWAYS */}
          <section className="mx-auto max-w-6xl px-6 py-16 lg:px-8">
            <div className="rounded-3xl bg-[#071B49] p-8 text-white md:p-12">
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#35B5E5]">
                CURA Recap
              </p>

              <h2 className="mt-4 text-3xl font-semibold">
                Five things to remember
              </h2>

              <div className="mt-8 grid gap-4 md:grid-cols-2">
                {[
                  "PPE is tangible and expected to be used during more than one period.",
                  "Recognition requires probable future economic benefits and reliable measurement of cost.",
                  "Initial measurement is at cost, including qualifying directly attributable costs.",
                  "Depreciation allocates the depreciable amount systematically over useful life.",
                  "IAS 16 provides cost and revaluation models for subsequent measurement, subject to its requirements.",
                ].map((item, index) => (
                  <div
                    key={item}
                    className="flex gap-4 rounded-xl bg-white/10 p-5"
                  >
                    <span className="text-sm font-bold text-[#35B5E5]">
                      0{index + 1}
                    </span>

                    <p className="text-sm leading-6 text-slate-200">
                      {item}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* QUIZ */}
          <section className="border-t border-[#DCE5EF] bg-white">
            <div className="mx-auto max-w-4xl px-6 py-16 lg:px-8">
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#168BC4]">
                Test your knowledge
              </p>

              <h2 className="mt-3 text-3xl font-semibold">
                IAS 16 Quick Quiz
              </h2>

              <p className="mt-4 leading-7 text-slate-600">
                Test your understanding of the material covered above.
              </p>

              <div className="mt-10 space-y-7">
                {quizQuestions.map((question, questionIndex) => (
                  <div
                    key={question.question}
                    className="rounded-2xl border border-[#DCE5EF] bg-[#F9FBFD] p-6 md:p-8"
                  >
                    <div className="flex items-start gap-4">
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#071B49] text-sm font-bold text-white">
                        {questionIndex + 1}
                      </span>

                      <h3 className="pt-1 text-base font-semibold leading-6">
                        {question.question}
                      </h3>
                    </div>

                    <div className="mt-6 space-y-3">
                      {question.options.map((option, optionIndex) => {
                        const selected =
                          answers[questionIndex] === optionIndex

                        const correct =
                          submitted &&
                          optionIndex === question.answer

                        const incorrect =
                          submitted &&
                          selected &&
                          optionIndex !== question.answer

                        return (
                          <button
                            key={option}
                            type="button"
                            onClick={() => {
                              if (submitted) return

                              setAnswers((current) => {
                                const updated = [...current]
                                updated[questionIndex] = optionIndex
                                return updated
                              })
                            }}
                            className={`w-full rounded-xl border p-4 text-left text-sm transition ${
                              correct
                                ? "border-emerald-400 bg-emerald-50 text-emerald-900"
                                : incorrect
                                  ? "border-red-400 bg-red-50 text-red-900"
                                  : selected
                                    ? "border-[#168BC4] bg-[#EAF6FC] text-[#071B49]"
                                    : "border-slate-200 bg-white hover:border-[#168BC4]/50"
                            }`}
                          >
                            <span className="font-semibold">
                              {String.fromCharCode(65 + optionIndex)}.
                            </span>{" "}
                            {option}
                          </button>
                        )
                      })}
                    </div>

                    {submitted && (
                      <div className="mt-5 rounded-xl bg-white p-5">
                        <p className="text-sm font-semibold text-[#071B49]">
                          Correct answer:{" "}
                          {String.fromCharCode(65 + question.answer)}
                        </p>

                        <p className="mt-2 text-sm leading-6 text-slate-600">
                          {question.explanation}
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {!submitted ? (
                <button
                  type="button"
                  disabled={answers.length !== quizQuestions.length}
                  onClick={() => setSubmitted(true)}
                  className={`mt-8 w-full rounded-md px-6 py-4 text-sm font-semibold text-white transition ${
                    answers.length === quizQuestions.length
                      ? "bg-[#071B49] hover:bg-[#0B2A69]"
                      : "cursor-not-allowed bg-slate-300"
                  }`}
                >
                  Submit Quiz →
                </button>
              ) : (
                <div className="mt-8 rounded-2xl border border-[#DCE5EF] bg-[#F5F8FC] p-7 text-center">
                  <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#168BC4]">
                    Your result
                  </p>

                  <p className="mt-3 text-4xl font-semibold text-[#071B49]">
                    {score}/{quizQuestions.length}
                  </p>

                  <p className="mt-2 text-sm text-slate-600">
                    {Math.round(
                      (score / quizQuestions.length) * 100
                    )}
                    % correct
                  </p>

                  <button
                    type="button"
                    onClick={() => {
                      setAnswers([])
                      setSubmitted(false)
                    }}
                    className="mt-6 rounded-md border border-[#071B49] bg-white px-6 py-3 text-sm font-semibold text-[#071B49]"
                  >
                    Try Again
                  </button>
                </div>
              )}
            </div>
          </section>
        </>
      )}

      {/* SOURCE NOTE */}
      <section className="bg-[#F5F8FC]">
        <div className="mx-auto max-w-6xl px-6 py-10 lg:px-8">
          <p className="text-xs leading-6 text-slate-500">
            CURA educational materials are developed for learning and
            professional development. Learners should refer to the applicable
            accounting standards and authoritative guidance for the complete
            requirements.
          </p>
        </div>
      </section>

      <CuraFooter />
    </main>
  )
}