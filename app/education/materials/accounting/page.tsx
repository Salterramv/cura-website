"use client"

import Link from "next/link"
import CuraHeader from "@/components/CuraHeader"
import CuraFooter from "@/components/CuraFooter"

const topics = [
  {
    title: "Conceptual Framework & Fair Value",
    standard: "Conceptual Framework",
    description:
      "Understand the foundations of financial reporting, recognition, measurement and fair value.",
    slug: "conceptual-framework-fair-value",
  },
  {
    title: "Presentation & Performance Reporting",
    standard: "IAS 1 / IAS 8",
    description:
      "Learn how financial statements are presented and how accounting policies, estimates and errors are treated.",
    slug: "presentation-performance-reporting",
  },
  {
    title: "Property, Plant and Equipment",
    standard: "IAS 16",
    description:
      "Learn recognition, measurement, depreciation, revaluation and disposal of PPE.",
    slug: "property-plant-equipment",
  },
  {
    title: "Intangible Assets",
    standard: "IAS 38",
    description:
      "Understand recognition, measurement and subsequent accounting for intangible assets.",
    slug: "intangible-assets",
  },
  {
    title: "Impairment of Assets",
    standard: "IAS 36",
    description:
      "Understand impairment indicators, recoverable amount and impairment losses.",
    slug: "impairment-of-assets",
  },
  {
    title: "Non-current Assets Held for Sale",
    standard: "IFRS 5",
    description:
      "Learn classification, measurement and discontinued operations.",
    slug: "non-current-assets-held-for-sale",
  },
  {
    title: "Revenue",
    standard: "IFRS 15",
    description:
      "Master the five-step revenue recognition model and its applications.",
    slug: "revenue",
  },
  {
    title: "Agriculture & Inventories",
    standard: "IAS 41 / IAS 2",
    description:
      "Understand biological assets, agricultural produce and inventory accounting.",
    slug: "agriculture-inventories",
  },
  {
    title: "Foreign Currency",
    standard: "IAS 21",
    description:
      "Learn functional currency, foreign currency transactions and translation.",
    slug: "foreign-currency",
  },
  {
    title: "Leases",
    standard: "IFRS 16",
    description:
      "Understand lease identification, right-of-use assets and lease liabilities.",
    slug: "leases",
  },
  {
    title: "Employee Benefits",
    standard: "IAS 19",
    description:
      "Understand short-term, post-employment and defined benefit accounting.",
    slug: "employee-benefits",
  },
  {
    title: "Share-based Payments",
    standard: "IFRS 2",
    description:
      "Learn equity-settled and cash-settled share-based payment accounting.",
    slug: "share-based-payments",
  },
  {
    title: "Events After the Reporting Period",
    standard: "IAS 10",
    description:
      "Distinguish adjusting and non-adjusting events.",
    slug: "events-after-reporting-period",
  },
  {
    title: "Provisions & Contingencies",
    standard: "IAS 37",
    description:
      "Understand provisions, contingent liabilities and contingent assets.",
    slug: "provisions-contingencies",
  },
  {
    title: "Consolidated Financial Statements",
    standard: "IFRS 10",
    description:
      "Understand control, subsidiaries and the principles of consolidation.",
    slug: "consolidated-financial-statements",
  },
  {
    title: "Associates & Joint Ventures",
    standard: "IAS 28 / IFRS 11",
    description:
      "Understand significant influence, the equity method and joint arrangements.",
    slug: "associates-joint-ventures",
  },
  {
    title: "Advanced Consolidation",
    standard: "IFRS 3 / IFRS 10",
    description:
      "Explore advanced business combination and consolidation applications.",
    slug: "advanced-consolidation",
  },
  {
    title: "Changes in Group Structure",
    standard: "IFRS 3 / IFRS 10",
    description:
      "Understand step acquisitions, changes in ownership and loss of control.",
    slug: "changes-group-structure",
  },
  {
    title: "Group Disposals",
    standard: "IFRS 10 / IFRS 5",
    description:
      "Learn the accounting consequences of losing control of a subsidiary.",
    slug: "group-disposals",
  },
  {
    title: "First-time Adoption of IFRS",
    standard: "IFRS 1",
    description:
      "Understand transition to IFRS, exemptions, exceptions and reconciliations.",
    slug: "first-time-adoption-ifrs",
  },
  {
    title: "Adoption of New Accounting Standards",
    standard: "IAS 8",
    description:
      "Understand transition requirements and practical implementation issues.",
    slug: "adoption-new-accounting-standards",
  },
  {
    title: "IFRS for SMEs",
    standard: "IFRS for SMEs",
    description:
      "A separate learning pathway for entities applying the IFRS for SMEs Standard.",
    slug: "ifrs-for-smes",
  },

  // NEW TOPICS

  {
    title: "Government Grants & Assistance",
    standard: "IAS 20",
    description:
      "Learn recognition, presentation, repayment and disclosure of government grants.",
    slug: "government-grants",
  },
  {
    title: "Borrowing Costs",
    standard: "IAS 23",
    description:
      "Understand the capitalisation of borrowing costs for qualifying assets.",
    slug: "borrowing-costs",
  },
  {
    title: "Investment Property",
    standard: "IAS 40",
    description:
      "Learn the recognition, classification and subsequent measurement of investment property.",
    slug: "investment-property",
  },
  {
    title: "Interim Financial Reporting",
    standard: "IAS 34",
    description:
      "Understand the principles and presentation requirements for interim financial reporting.",
    slug: "interim-financial-reporting",
  },
]

export default function AccountingMaterialsPage() {
  return (
    <main className="min-h-screen bg-[#F5F8FC] text-[#071B49]">
      <CuraHeader />

      {/* HERO */}
      <section className="bg-[#071B49]">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8 lg:py-24">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#35B5E5]">
            CURA Education
          </p>

          <h1 className="mt-5 max-w-4xl text-4xl font-semibold tracking-tight text-white md:text-6xl">
            Accounting & Financial Reporting
          </h1>

          <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">
            Explore structured accounting and financial reporting materials
            covering key accounting standards and practical applications.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <span className="rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm text-slate-200">
              IAS
            </span>

            <span className="rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm text-slate-200">
              IFRS
            </span>

            <span className="rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm text-slate-200">
              Worked Examples
            </span>

            <span className="rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm text-slate-200">
              Topic Quizzes
            </span>
          </div>
        </div>
      </section>

      {/* INTRO */}
      <section className="mx-auto max-w-7xl px-6 py-14 lg:px-8 lg:py-20">
        <div className="max-w-3xl">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#168BC4]">
            Educational Materials
          </p>

          <h2 className="mt-3 text-3xl font-semibold md:text-4xl">
            Accounting
          </h2>

          <p className="mt-4 leading-7 text-slate-600">
            Select a topic to begin studying. Each topic combines explanations,
            illustrations, practical examples and a quiz designed around the
            material.
          </p>
        </div>
      </section>

      {/* TOPICS */}
      <section className="mx-auto max-w-7xl px-6 pb-20 lg:px-8">
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {topics.map((topic, index) => (
            <Link
              key={topic.slug}
              href={`/education/materials/accounting/${topic.slug}`}
              className="group rounded-2xl border border-slate-200 bg-white p-7 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-[#168BC4]/40 hover:shadow-xl"
            >
              <div className="flex items-start justify-between gap-4">
                <span className="text-xs font-bold tracking-[0.2em] text-[#168BC4]">
                  {String(index + 1).padStart(2, "0")}
                </span>

                <span className="rounded-full bg-[#F1F7FB] px-3 py-1 text-[11px] font-semibold text-[#168BC4]">
                  {topic.standard}
                </span>
              </div>

              <h3 className="mt-7 text-xl font-semibold leading-7 text-[#071B49] transition group-hover:text-[#168BC4]">
                {topic.title}
              </h3>

              <p className="mt-3 text-sm leading-6 text-slate-600">
                {topic.description}
              </p>

              <div className="mt-7 flex items-center justify-between border-t border-slate-100 pt-5">
                <span className="text-sm font-semibold text-[#071B49]">
                  Study material
                </span>

                <span className="text-lg text-[#168BC4] transition-transform group-hover:translate-x-1">
                  →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* LEARNING APPROACH */}
      <section className="border-y border-[#DCE5EF] bg-white">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#168BC4]">
            CURA Learning
          </p>

          <h2 className="mt-3 text-3xl font-semibold">
            Learn. Apply. Test.
          </h2>

          <div className="mt-10 grid gap-5 md:grid-cols-3">
            <div className="rounded-2xl bg-[#F5F8FC] p-7">
              <span className="text-sm font-bold text-[#168BC4]">
                01
              </span>

              <h3 className="mt-4 text-xl font-semibold">
                Understand
              </h3>

              <p className="mt-3 text-sm leading-6 text-slate-600">
                Clear explanations of accounting principles and requirements.
              </p>
            </div>

            <div className="rounded-2xl bg-[#F5F8FC] p-7">
              <span className="text-sm font-bold text-[#168BC4]">
                02
              </span>

              <h3 className="mt-4 text-xl font-semibold">
                Apply
              </h3>

              <p className="mt-3 text-sm leading-6 text-slate-600">
                Practical examples, calculations, diagrams and scenarios.
              </p>
            </div>

            <div className="rounded-2xl bg-[#F5F8FC] p-7">
              <span className="text-sm font-bold text-[#168BC4]">
                03
              </span>

              <h3 className="mt-4 text-xl font-semibold">
                Test
              </h3>

              <p className="mt-3 text-sm leading-6 text-slate-600">
                Complete a quiz at the end of each topic to reinforce your
                learning.
              </p>
            </div>
          </div>
        </div>
      </section>

      <CuraFooter />
    </main>
  )
}