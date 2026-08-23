"use client"

import Link from "next/link"
import { useParams } from "next/navigation"
import { useEffect, useMemo, useState } from "react"
import CuraHeader from "@/components/CuraHeader"
import CuraFooter from "@/components/CuraFooter"
import { accountingTopics } from "../data/accountingTopics"

type Block = {
  title: string
  items: string[]
}

type Topic = {
  slug: string
  title: string
  standard: string
  description: string
  blocks: Block[]
  quiz: {
    question: string
    options: string[]
    answer: number
    explanation?: string
  }[]
  practice: {
    title?: string
    question: string
    answer: string
  }[]
}

const figureBySlug: Record<string, string> = {
  "conceptual-framework-fair-value": "framework",
  "published-accounts": "statements",
  "property-plant-equipment": "ppe",
  "intangible-assets": "intangible",
  "impairment-of-assets": "impairment",
  "non-current-assets-held-for-sale": "heldForSale",
  revenue: "revenue",
  "agriculture-inventories": "agriculture",
  "foreign-currency": "currency",
  leases: "leases",
  "financial-instruments": "financial",
  "employee-benefits": "employee",
  "share-based-payments": "share",
  taxation: "tax",
  "earnings-per-share": "eps",
  "provisions-contingencies-events": "provisions",
  "statement-of-cash-flows": "cashflow",
  "accounting-policies-estimates-errors": "ias8",
  "consolidated-financial-statements": "consolidation",
  "consolidated-financial-position": "consolidation",
  "consolidated-profit-or-loss": "consolidation",
  "associates-joint-ventures": "equity",
  "changes-in-group-structure": "group",
  "group-disposals": "disposal",
  "adoption-new-standards-smes": "adoption",
  "interpretation-financial-statements": "analysis",
}

function clean(value: string) {
  return value
    .replace(/\s+/g, " ")
    .replace(/^[-•✓✔]\s*/, "")
    .trim()
}

function isBullet(value: string) {
  return /^(?:[-•✓✔–—]|\d+[.)]|[a-zA-Z][.)])\s*/.test(value.trim())
}

function isNoise(value: string) {
  const v = clean(value)
  if (!v) return true
  return /^(?:TUU|Homework|Reference\s*-\s*Page|FR Knowledge|SBR New Knowledge)$/i.test(v)
}

function normaliseBlocks(blocks: Block[]) {
  const result: Block[] = []

  for (const block of blocks) {
    const title = clean(block.title)
    const items = block.items
      .map(clean)
      .filter((item) => !isNoise(item))

    if (!title && items.length === 0) continue

    const previous = result[result.length - 1]

    // The source material sometimes splits one topic over several slides
    // using the same heading. Merge those into one readable section.
    if (previous && previous.title.toLowerCase() === title.toLowerCase()) {
      previous.items.push(...items)
    } else {
      result.push({ title: title || "Further detail", items })
    }
  }

  return result
}

function Figure({
  type,
  active,
  setActive,
}: {
  type: string
  active: number
  setActive: (n: number) => void
}) {
  const figures: Record<string, { title: string; subtitle: string; labels: string[] }> = {
    framework: {
      title: "How the reporting framework connects",
      subtitle: "Select a part of the framework to see its role.",
      labels: ["Objective", "Qualities", "Elements", "Recognition", "Measurement", "Presentation"],
    },
    statements: {
      title: "A complete reporting picture",
      subtitle: "Select a statement to see what it contributes.",
      labels: ["Financial position", "Performance", "Equity", "Cash flows", "Notes"],
    },
    ppe: {
      title: "PPE accounting journey",
      subtitle: "Follow an asset from acquisition to disposal.",
      labels: ["Recognition", "Initial measurement", "Depreciation", "Revaluation", "Impairment", "Disposal"],
    },
    intangible: {
      title: "Intangible asset lifecycle",
      subtitle: "The accounting path from identification to subsequent measurement.",
      labels: ["Identify", "Recognise", "Measure", "Amortise", "Impair", "Derecognise"],
    },
    impairment: {
      title: "Impairment decision path",
      subtitle: "A visual route through recoverable amount and impairment.",
      labels: ["Indicator", "Recoverable amount", "Compare", "Loss", "Reversal"],
    },
    heldForSale: {
      title: "Held-for-sale decision path",
      subtitle: "A visual summary of the classification journey.",
      labels: ["Available now", "Highly probable", "Marketed", "Within 12 months", "Classify", "Present"],
    },
    revenue: {
      title: "IFRS 15 five-step model",
      subtitle: "Select a step to focus on its place in the revenue process.",
      labels: ["Contract", "Performance obligations", "Transaction price", "Allocate", "Recognise"],
    },
    agriculture: {
      title: "Agriculture and inventory flow",
      subtitle: "Follow biological assets, produce and inventory through the accounting process.",
      labels: ["Biological asset", "Agricultural produce", "Inventory", "Measurement", "Sale"],
    },
    currency: {
      title: "Foreign currency journey",
      subtitle: "See how a foreign-currency transaction moves through reporting.",
      labels: ["Transaction", "Initial rate", "Settlement", "Closing rate", "Translation"],
    },
    leases: {
      title: "Lessee accounting model",
      subtitle: "The core flow from lease commencement to subsequent measurement.",
      labels: ["Identify lease", "Right-of-use asset", "Lease liability", "Interest", "Depreciation"],
    },
    financial: {
      title: "Financial instruments map",
      subtitle: "Move through classification, measurement and impairment.",
      labels: ["Classify", "Initial measurement", "Subsequent measurement", "Impairment", "Derecognition"],
    },
    employee: {
      title: "Employee benefits map",
      subtitle: "Select a benefit category.",
      labels: ["Short-term", "Post-employment", "Defined contribution", "Defined benefit", "Termination"],
    },
    share: {
      title: "Share-based payment flow",
      subtitle: "See the basic accounting route.",
      labels: ["Grant", "Fair value", "Vesting", "Expense", "Settlement"],
    },
    tax: {
      title: "Income tax bridge",
      subtitle: "Connect accounting profit, taxable amounts and deferred tax.",
      labels: ["Accounting result", "Tax base", "Temporary difference", "Deferred tax", "Presentation"],
    },
    eps: {
      title: "EPS calculation path",
      subtitle: "Follow the components used in the calculation.",
      labels: ["Profit", "Preference claims", "Weighted shares", "Basic EPS", "Dilution"],
    },
    provisions: {
      title: "Provision decision path",
      subtitle: "A practical visual route through recognition.",
      labels: ["Past event", "Present obligation", "Probable outflow", "Reliable estimate", "Recognise / disclose"],
    },
    cashflow: {
      title: "Cash-flow classification",
      subtitle: "See how cash movements are grouped.",
      labels: ["Operating", "Investing", "Financing", "Cash equivalents", "Reconciliation"],
    },
    ias8: {
      title: "IAS 8 change map",
      subtitle: "The treatment depends on whether the issue is policy, estimate or error.",
      labels: ["Policy", "Estimate", "Error", "Retrospective", "Prospective"],
    },
    consolidation: {
      title: "Group reporting structure",
      subtitle: "Select a layer of the group reporting process.",
      labels: ["Parent", "Subsidiary", "Adjustments", "Elimination", "Consolidated statements"],
    },
    equity: {
      title: "Equity method pathway",
      subtitle: "A visual summary of the investment relationship.",
      labels: ["Investment", "Significant influence", "Share of results", "Dividends", "Carrying amount"],
    },
    group: {
      title: "Changes in group structure",
      subtitle: "Follow ownership changes through the group accounts.",
      labels: ["Existing interest", "Additional interest", "Control", "Ownership change", "Accounting effect"],
    },
    disposal: {
      title: "Group disposal pathway",
      subtitle: "The key stages when control is lost.",
      labels: ["Subsidiary", "Disposal", "Loss of control", "Derecognition", "Gain / loss"],
    },
    adoption: {
      title: "IFRS transition roadmap",
      subtitle: "A visual roadmap for first-time adoption and implementation.",
      labels: ["Transition date", "Opening IFRS position", "Exemptions", "Reconciliations", "Disclosures"],
    },
    analysis: {
      title: "Financial statement analysis",
      subtitle: "Connect the main analytical perspectives.",
      labels: ["Profitability", "Liquidity", "Efficiency", "Gearing", "Cash flow"],
    },
  }

  const figure = figures[type] ?? figures.statements
  const selected = figure.labels[active] ?? figure.labels[0]

  return (
    <div className="mt-8 overflow-hidden rounded-3xl border border-[#168BC4]/15 bg-white shadow-sm">
      <div className="bg-[#071B49] p-6 text-white md:p-8">
        <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#35B5E5]">
          Interactive figure
        </p>
        <h2 className="mt-2 text-2xl font-semibold md:text-3xl">{figure.title}</h2>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-300">{figure.subtitle}</p>
      </div>

      <div className="p-6 md:p-8">
        <div className="overflow-x-auto pb-3">
          <div className="flex min-w-max items-center gap-2">
            {figure.labels.map((label, index) => (
              <div key={label} className="flex items-center">
                <button
                  type="button"
                  onClick={() => setActive(index)}
                  className={`min-w-[125px] rounded-2xl border px-4 py-4 text-left transition ${
                    active === index
                      ? "border-[#168BC4] bg-[#F1F7FB] shadow-md"
                      : "border-slate-200 bg-white hover:border-[#168BC4]/50"
                  }`}
                >
                  <span className="text-xs font-bold text-[#168BC4]">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="mt-2 block text-sm font-semibold text-[#071B49]">
                    {label}
                  </span>
                </button>

                {index < figure.labels.length - 1 && (
                  <span className="px-2 text-xl text-[#168BC4]">→</span>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6 rounded-2xl bg-[#F5F8FC] p-5">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white text-lg font-bold text-[#168BC4] shadow-sm">
              {active + 1}
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#168BC4]">
                Focus
              </p>
              <h3 className="mt-1 text-xl font-semibold text-[#071B49]">{selected}</h3>
              <p className="mt-2 text-sm leading-7 text-slate-600">
                Use the source material below to study this part of the topic. The figure is a visual learning aid; the detailed accounting treatment remains in the lesson text.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-5 grid gap-3 sm:grid-cols-3">
          {figure.labels.slice(0, 3).map((label, index) => (
            <button
              key={label}
              type="button"
              onClick={() => setActive(index)}
              className="rounded-2xl border border-slate-200 bg-white p-4 text-left hover:border-[#168BC4]/50"
            >
              <div className="h-2 rounded-full bg-[#F1F7FB]">
                <div
                  className="h-2 rounded-full bg-[#168BC4] transition-all"
                  style={{ width: `${Math.max(20, ((index + 1) / figure.labels.length) * 100)}%` }}
                />
              </div>
              <p className="mt-3 text-sm font-semibold text-[#071B49]">{label}</p>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

function Section({
  block,
  index,
}: {
  block: Block
  index: number
}) {
  const paragraphs: string[] = []
  const bullets: string[] = []

  for (const raw of block.items) {
    const item = clean(raw)
    if (!item || isNoise(item)) continue

    if (isBullet(item)) {
      bullets.push(item.replace(/^(?:[-•✓✔–—]|\d+[.)]|[a-zA-Z][.)])\s*/, ""))
    } else {
      paragraphs.push(item)
    }
  }

  return (
    <article id={`section-${index}`} className="scroll-mt-28 border-b border-slate-200 pb-12">
      <div className="flex items-start gap-4">
        <div className="mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#F1F7FB] text-xs font-bold text-[#168BC4]">
          {String(index + 1).padStart(2, "0")}
        </div>
        <div className="min-w-0">
          <h2 className="text-2xl font-semibold leading-tight text-[#071B49] md:text-3xl">
            {block.title}
          </h2>

          {paragraphs.length > 0 && (
            <div className="mt-5 space-y-5 text-[16px] leading-8 text-slate-700">
              {paragraphs.map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
            </div>
          )}

          {bullets.length > 0 && (
            <ul className="mt-6 space-y-3">
              {bullets.map((bullet, i) => (
                <li
                  key={i}
                  className="flex gap-3 rounded-xl bg-[#F7FAFD] px-4 py-3 text-[15px] leading-7 text-slate-700"
                >
                  <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-[#168BC4]" />
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
          )}

          {paragraphs.length === 0 && bullets.length === 0 && (
            <p className="mt-4 text-slate-500">See the related material in this topic.</p>
          )}
        </div>
      </div>
    </article>
  )
}

export default function AccountingTopicPage() {
  const params = useParams<{ slug: string }>()
  const topic = accountingTopics.find((item) => item.slug === params.slug) as Topic | undefined

  const [activeSection, setActiveSection] = useState(0)
  const [figureActive, setFigureActive] = useState(0)
  const [answers, setAnswers] = useState<Record<number, number>>({})
  const [submitted, setSubmitted] = useState(false)

  const blocks = useMemo(
    () => (topic ? normaliseBlocks(topic.blocks) : []),
    [topic],
  )

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]

        if (visible) {
          const index = Number(visible.target.id.replace("section-", ""))
          if (!Number.isNaN(index)) setActiveSection(index)
        }
      },
      { rootMargin: "-120px 0px -60% 0px", threshold: [0.05, 0.2, 0.5] },
    )

    blocks.forEach((_, index) => {
      const element = document.getElementById(`section-${index}`)
      if (element) observer.observe(element)
    })

    return () => observer.disconnect()
  }, [blocks])

  if (!topic) {
    return (
      <main className="min-h-screen bg-[#F5F8FC] text-[#071B49]">
        <CuraHeader />
        <section className="mx-auto max-w-4xl px-6 py-24">
          <div className="rounded-3xl border border-slate-200 bg-white p-10 shadow-sm">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#168BC4]">
              CURA Education
            </p>
            <h1 className="mt-3 text-3xl font-semibold">Material not found</h1>
            <Link
              href="/education/materials/accounting"
              className="mt-6 inline-block font-semibold text-[#168BC4]"
            >
              ← Back to Accounting
            </Link>
          </div>
        </section>
        <CuraFooter />
      </main>
    )
  }

  const answered = Object.keys(answers).length
  const score = topic.quiz.reduce(
    (total, question, index) =>
      total + (answers[index] === question.answer ? 1 : 0),
    0,
  )

  return (
    <main className="min-h-screen bg-[#F5F8FC] text-[#071B49]">
      <CuraHeader />

      <header className="bg-[#071B49] text-white">
        <div className="mx-auto max-w-7xl px-6 py-14 lg:px-8 lg:py-20">
          <Link
            href="/education/materials/accounting"
            className="text-sm font-semibold text-[#35B5E5]"
          >
            ← Accounting
          </Link>

          <p className="mt-8 text-xs font-bold uppercase tracking-[0.3em] text-[#35B5E5]">
            CURA Education · Accounting
          </p>

          <div className="mt-5 flex flex-col gap-7 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-4xl">
              <h1 className="text-4xl font-semibold tracking-tight md:text-6xl">
                {topic.title}
              </h1>
              <p className="mt-4 text-lg text-slate-300">{topic.standard}</p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-sm text-slate-200">
              <div className="font-semibold text-white">CURA learning material</div>
              <div className="mt-1">{blocks.length} sections · {topic.quiz.length} questions</div>
            </div>
          </div>
        </div>
      </header>

      <section className="mx-auto max-w-7xl px-6 py-10 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_280px]">
          <div>
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#168BC4]">
                Start here
              </p>

              <p className="mt-4 max-w-4xl text-[17px] leading-8 text-slate-700">
                {topic.description}
              </p>

              <Figure
                type={figureBySlug[topic.slug] ?? "statements"}
                active={figureActive}
                setActive={setFigureActive}
              />
            </div>

            <div className="mt-10 space-y-12">
              {blocks.map((block, index) => (
                <Section key={`${block.title}-${index}`} block={block} index={index} />
              ))}
            </div>

            {topic.practice.length > 0 && (
              <section className="mt-14 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-10">
                <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#168BC4]">
                  Practice
                </p>
                <h2 className="mt-2 text-3xl font-semibold">Apply what you have studied</h2>
                <p className="mt-3 leading-7 text-slate-600">
                  Work through the supplied practice material before revealing the solution.
                </p>

                <div className="mt-7 space-y-5">
                  {topic.practice.map((practice, index) => (
                    <details
                      key={index}
                      className="group rounded-2xl border border-slate-200 bg-[#F7FAFD] p-5"
                    >
                      <summary className="cursor-pointer list-none font-semibold">
                        <span className="mr-3 text-[#168BC4]">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        {practice.title || "Practice question"}
                        <span className="float-right text-xl text-[#168BC4] transition group-open:rotate-45">
                          +
                        </span>
                      </summary>

                      <div className="mt-5 rounded-xl bg-white p-5 text-[15px] leading-7 text-slate-700 whitespace-pre-wrap">
                        {practice.question}
                      </div>

                      {practice.answer && (
                        <details className="mt-4 rounded-xl border border-[#168BC4]/20 bg-white p-5">
                          <summary className="cursor-pointer font-semibold text-[#168BC4]">
                            Reveal solution
                          </summary>
                          <div className="mt-4 whitespace-pre-wrap text-[15px] leading-7 text-slate-700">
                            {practice.answer}
                          </div>
                        </details>
                      )}
                    </details>
                  ))}
                </div>
              </section>
            )}

            <section className="mt-14 rounded-3xl bg-[#071B49] p-6 text-white md:p-10">
              <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#35B5E5]">
                    Knowledge check
                  </p>
                  <h2 className="mt-2 text-3xl font-semibold">Test your understanding</h2>
                  <p className="mt-3 max-w-2xl leading-7 text-slate-300">
                    Answer every question and submit to see which answers were correct and which
                    were incorrect.
                  </p>
                </div>

                {submitted && (
                  <div className="rounded-2xl border border-white/10 bg-white/10 px-6 py-4 text-center">
                    <div className="text-3xl font-semibold">
                      {score}/{topic.quiz.length}
                    </div>
                    <div className="text-sm text-slate-300">Score</div>
                  </div>
                )}
              </div>

              <div className="mt-8 space-y-6">
                {topic.quiz.map((question, index) => {
                  const selected = answers[index]
                  const correct = selected === question.answer

                  return (
                    <div
                      key={index}
                      className="rounded-2xl bg-white p-5 text-[#071B49] md:p-6"
                    >
                      <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#168BC4]">
                        Question {index + 1}
                      </p>

                      <h3 className="mt-2 text-lg font-semibold leading-7">
                        {question.question}
                      </h3>

                      <div className="mt-5 space-y-2">
                        {question.options.map((option, optionIndex) => {
                          const selectedOption = selected === optionIndex
                          const correctOption =
                            submitted && optionIndex === question.answer
                          const wrongOption =
                            submitted && selectedOption && !correct

                          return (
                            <label
                              key={optionIndex}
                              className={`flex cursor-pointer gap-3 rounded-xl border p-4 text-sm leading-6 transition ${
                                correctOption
                                  ? "border-emerald-400 bg-emerald-50"
                                  : wrongOption
                                    ? "border-red-300 bg-red-50"
                                    : selectedOption
                                      ? "border-[#168BC4] bg-[#F1F7FB]"
                                      : "border-slate-200 hover:border-[#168BC4]/50"
                              }`}
                            >
                              <input
                                type="radio"
                                name={`question-${index}`}
                                checked={selectedOption}
                                disabled={submitted}
                                onChange={() =>
                                  setAnswers((current) => ({
                                    ...current,
                                    [index]: optionIndex,
                                  }))
                                }
                                className="mt-1"
                              />
                              <span>{option}</span>
                            </label>
                          )
                        })}
                      </div>

                      {submitted && (
                        <div
                          className={`mt-4 rounded-xl px-4 py-4 text-sm leading-7 ${
                            correct
                              ? "bg-emerald-50 text-emerald-800"
                              : "bg-red-50 text-red-800"
                          }`}
                        >
                          <strong>{correct ? "Correct." : "Incorrect."}</strong>{" "}
                          {!correct && (
                            <>
                              The correct answer is{" "}
                              <strong>{question.options[question.answer]}</strong>.
                            </>
                          )}
                          {question.explanation && (
                            <div className="mt-2">{question.explanation}</div>
                          )}
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>

              <div className="mt-7 flex flex-wrap gap-3">
                <button
                  type="button"
                  disabled={answered < topic.quiz.length}
                  onClick={() => setSubmitted(true)}
                  className="rounded-xl bg-white px-6 py-3 text-sm font-bold text-[#071B49] disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Submit quiz
                </button>

                {submitted && (
                  <button
                    type="button"
                    onClick={() => {
                      setSubmitted(false)
                      setAnswers({})
                    }}
                    className="rounded-xl border border-white/20 px-6 py-3 text-sm font-semibold text-white"
                  >
                    Try again
                  </button>
                )}
              </div>
            </section>
          </div>

          <aside className="hidden lg:block">
            <div className="sticky top-24 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#168BC4]">
                On this page
              </p>

              <div className="mt-4 max-h-[65vh] space-y-1 overflow-auto pr-1">
                {blocks.map((block, index) => (
                  <button
                    key={`${block.title}-${index}`}
                    type="button"
                    onClick={() => {
                      setActiveSection(index)
                      document
                        .getElementById(`section-${index}`)
                        ?.scrollIntoView({ behavior: "smooth", block: "start" })
                    }}
                    className={`w-full rounded-xl px-3 py-2.5 text-left text-sm leading-5 transition ${
                      activeSection === index
                        ? "bg-[#F1F7FB] font-semibold text-[#168BC4]"
                        : "text-slate-600 hover:bg-slate-50"
                    }`}
                  >
                    {block.title}
                  </button>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </section>

      <CuraFooter />
    </main>
  )
}
