"use client"

import Link from "next/link"
import { useMemo, useState } from "react"
import { useParams } from "next/navigation"
import CuraHeader from "@/components/CuraHeader"
import CuraFooter from "@/components/CuraFooter"
import { accountingTopics } from "../data/accountingTopics"

type RawItem = {
  text?: string
  kind?: string
}

type RawBlock = {
  title?: string
  label?: string
  text?: string
  items?: string[]
  blocks?: RawItem[]
  content?: string[]
}

type RawTopic = {
  slug?: string
  title?: string
  standard?: string
  description?: string
  source?: string
  blocks?: RawBlock[]
  sections?: RawBlock[]
  slides?: {
    page?: number
    title?: string
    blocks?: RawItem[]
  }[]
  quiz?: any[]
  practice?: any[]
  practiceDocuments?: any[]
}

const VISUALS: Record<
  string,
  {
    eyebrow: string
    title: string
    subtitle: string
    nodes: string[]
    accent: string
  }
> = {
  "conceptual-framework-fair-value": {
    eyebrow: "Think in systems",
    title: "From purpose to measurement",
    subtitle: "See how the reporting framework connects the objective of financial reporting with the information ultimately presented to users.",
    nodes: ["Objective", "Useful information", "Elements", "Recognition", "Measurement", "Reporting"],
    accent: "framework",
  },
  "published-accounts": {
    eyebrow: "Read the statements",
    title: "How the financial statements fit together",
    subtitle: "Move between position, performance, cash and supporting information instead of learning each statement in isolation.",
    nodes: ["Position", "Performance", "Equity", "Cash", "Notes"],
    accent: "statements",
  },
  "property-plant-equipment": {
    eyebrow: "Follow the asset",
    title: "The life of a PPE asset",
    subtitle: "A machine does not stop being an accounting problem after purchase. Follow the asset through its full reporting life.",
    nodes: ["Recognise", "Measure", "Depreciate", "Revalue", "Impair", "Dispose"],
    accent: "ppe",
  },
  "intangible-assets": {
    eyebrow: "Make the invisible visible",
    title: "The intangible asset lifecycle",
    subtitle: "Start with identification, move through recognition and measurement, then follow the asset into amortisation, impairment and derecognition.",
    nodes: ["Identify", "Recognise", "Measure", "Amortise", "Impair", "Derecognise"],
    accent: "intangible",
  },
  "impairment-of-assets": {
    eyebrow: "Decision model",
    title: "When does an asset lose value?",
    subtitle: "Turn impairment into a decision rather than a definition: identify the signal, determine recoverable amount and compare it with carrying amount.",
    nodes: ["Indicator", "Recoverable amount", "Compare", "Loss", "Reversal"],
    accent: "impairment",
  },
  "held-for-sale-discontinued-operations": {
    eyebrow: "Classification matters",
    title: "When an asset changes direction",
    subtitle: "Trace the point at which an asset or disposal group moves from ordinary use into a held-for-sale presentation.",
    nodes: ["Available", "Highly probable", "Marketed", "Sale expected", "Classify", "Present"],
    accent: "sale",
  },
  revenue: {
    eyebrow: "Revenue engine",
    title: "The five questions behind revenue",
    subtitle: "Use the contract with the customer as the starting point and move through performance obligations, price, allocation and recognition.",
    nodes: ["Contract", "Obligations", "Price", "Allocate", "Recognise"],
    accent: "revenue",
  },
  "agriculture-inventories": {
    eyebrow: "From living asset to sale",
    title: "Agriculture → produce → inventory",
    subtitle: "Follow the point where biological assets become agricultural produce and then enter the inventory cycle.",
    nodes: ["Biological asset", "Transformation", "Produce", "Inventory", "Sale"],
    accent: "agriculture",
  },
  "foreign-currency": {
    eyebrow: "Follow the rate",
    title: "One transaction, several exchange-rate moments",
    subtitle: "See where the transaction-date rate, settlement rate and reporting-date rate matter.",
    nodes: ["Transaction", "Initial rate", "Settlement", "Closing rate", "Translation"],
    accent: "currency",
  },
  leases: {
    eyebrow: "Lease model",
    title: "Turning a lease into accounting",
    subtitle: "The lessee model connects the right to use an asset with the obligation to make lease payments.",
    nodes: ["Identify", "ROU asset", "Lease liability", "Interest", "Depreciation"],
    accent: "leases",
  },
  "employee-benefits": {
    eyebrow: "People are accounting too",
    title: "Classify the benefit first",
    subtitle: "The accounting treatment changes depending on when and how the employee benefit is settled.",
    nodes: ["Short-term", "Post-employment", "Defined contribution", "Defined benefit", "Termination"],
    accent: "people",
  },
  "share-based-payments": {
    eyebrow: "Value the promise",
    title: "From grant to settlement",
    subtitle: "Follow the accounting consequence of an equity or cash-based award through its vesting period.",
    nodes: ["Grant", "Fair value", "Vesting", "Expense", "Settlement"],
    accent: "shares",
  },
  "events-provisions-contingencies": {
    eyebrow: "Judgement under uncertainty",
    title: "Recognise, disclose or wait?",
    subtitle: "Use the nature of the obligation, probability and evidence to understand provisions and contingencies.",
    nodes: ["Past event", "Obligation", "Outflow", "Estimate", "Recognise / disclose"],
    accent: "provisions",
  },
  "financial-assets-liabilities": {
    eyebrow: "Financial instruments",
    title: "Classify before you measure",
    subtitle: "A visual map of the path from initial recognition through subsequent measurement and impairment.",
    nodes: ["Recognise", "Classify", "Measure", "Impair", "Derecognise"],
    accent: "financial",
  },
  taxation: {
    eyebrow: "Tax bridge",
    title: "Accounting profit is not the tax base",
    subtitle: "Connect accounting results with taxable amounts and temporary differences.",
    nodes: ["Accounting", "Tax base", "Difference", "Deferred tax", "Presentation"],
    accent: "tax",
  },
  "earnings-per-share": {
    eyebrow: "Per-share lens",
    title: "From profit to EPS",
    subtitle: "See the building blocks of basic and diluted earnings per share.",
    nodes: ["Profit", "Adjustments", "Weighted shares", "Basic EPS", "Dilution"],
    accent: "eps",
  },
  "statement-of-cash-flows": {
    eyebrow: "Cash tells a different story",
    title: "Where did the cash move?",
    subtitle: "Separate operating, investing and financing movements and connect them back to the change in cash.",
    nodes: ["Operating", "Investing", "Financing", "Cash equivalents", "Reconcile"],
    accent: "cash",
  },
  "accounting-policies-estimates-errors": {
    eyebrow: "IAS 8 decision tree",
    title: "Policy, estimate or error?",
    subtitle: "The classification determines whether the accounting change travels backwards or forwards.",
    nodes: ["Policy", "Estimate", "Error", "Retrospective", "Prospective"],
    accent: "ias8",
  },
  "consolidated-principles": {
    eyebrow: "Think like a group",
    title: "From separate entities to one reporting picture",
    subtitle: "See how control, consolidation adjustments and eliminations transform individual accounts into group information.",
    nodes: ["Parent", "Subsidiary", "Adjust", "Eliminate", "Consolidate"],
    accent: "group",
  },
  "consolidated-statement-financial-position": {
    eyebrow: "Group position",
    title: "Building the consolidated position",
    subtitle: "A visual route through the group statement of financial position.",
    nodes: ["Combine", "Fair values", "Goodwill", "NCI", "Eliminate"],
    accent: "group",
  },
  "consolidated-profit-or-loss": {
    eyebrow: "Group performance",
    title: "Building consolidated performance",
    subtitle: "See how the parent's and subsidiary's results become one group performance story.",
    nodes: ["Combine", "Adjust", "Eliminate", "Allocate", "Report"],
    accent: "group",
  },
  associates: {
    eyebrow: "Significant influence",
    title: "The equity method in motion",
    subtitle: "Follow the investment from acquisition through share of results and distributions.",
    nodes: ["Investment", "Influence", "Share of profit", "Dividends", "Carrying amount"],
    accent: "equity",
  },
  "group-disposals": {
    eyebrow: "Control can be lost",
    title: "What happens when the group changes?",
    subtitle: "Trace the accounting consequences of disposal and loss of control.",
    nodes: ["Subsidiary", "Disposal", "Loss of control", "Derecognise", "Gain / loss"],
    accent: "disposal",
  },
  "adopting-new-accounting-standards": {
    eyebrow: "Change management",
    title: "A new standard changes more than a note",
    subtitle: "Transition affects systems, people, profit measures, loan covenants and stakeholder expectations.",
    nodes: ["Transition", "Systems", "People", "Covenants", "Disclosure"],
    accent: "adoption",
  },
  "ifrs-for-smes": {
    eyebrow: "A different reporting pathway",
    title: "IFRS for SMEs",
    subtitle: "Understand the structure and practical consequences of the simplified reporting framework covered by the source material.",
    nodes: ["Scope", "Recognition", "Measurement", "Presentation", "Disclosure"],
    accent: "sme",
  },
  "interpretation-financial-statements": {
    eyebrow: "Read beyond the numbers",
    title: "Turn statements into a story",
    subtitle: "Connect profitability, liquidity, efficiency, gearing and cash-flow signals.",
    nodes: ["Profitability", "Liquidity", "Efficiency", "Gearing", "Cash flow"],
    accent: "analysis",
  },
}

function clean(text: string) {
  return text
    .replace(/\s+/g, " ")
    .replace(/\s+\d+$/g, "")
    .replace(/^[-•✓✔–—]\s*/, "")
    .trim()
}

function isNoise(text: string) {
  const value = clean(text)
  return (
    !value ||
    /^(TUU(?:\s+\d+)?|Homework|FR Knowledge|SBR New Knowledge|Reference\s*-\s*Page)$/i.test(
      value
    )
  )
}

function isBullet(text: string) {
  return /^(?:[-•✓✔–—]|\d+[.)]|[a-zA-Z][.)])\s+/.test(text.trim())
}

function isLikelyHeading(text: string) {
  const value = clean(text)
  if (!value || value.length > 90) return false
  if (/[.!?]$/.test(value)) return false
  if (isBullet(value)) return false
  if (value.split(" ").length > 11) return false

  return (
    /^(assets?|liabilities?|equity|income|expenses?|recognition|measurement|initial measurement|subsequent measurement|depreciation|revaluation|impairment|derecognition|obligation|fair value|journal|illustration|example|solution|calculation|summary|key points?|purpose|objective|scope|definitions?|presentation|disclosure|accounting treatment|investor perspective|control|goodwill|non-controlling interest|revenue|leases?|taxation|foreign currency|cash flows?|accounting policies?|accounting estimates?|errors?|provisions?|contingent)/i.test(
      value
    ) ||
    value === value.toUpperCase()
  )
}

function sourceBlocks(topic: RawTopic): { title: string; items: string[] }[] {
  const result: { title: string; items: string[] }[] = []

  const add = (title: string, items: string[]) => {
    const cleanTitle = clean(title)
    const cleanItems = items.map(clean).filter((x) => !isNoise(x))
    if (!cleanTitle && !cleanItems.length) return

    const last = result[result.length - 1]
    if (last && last.title.toLowerCase() === cleanTitle.toLowerCase()) {
      last.items.push(...cleanItems)
    } else {
      result.push({ title: cleanTitle || "Understanding the topic", items: cleanItems })
    }
  }

  if (Array.isArray(topic.blocks)) {
    for (const block of topic.blocks) {
      const items = [
        ...(block.items ?? []),
        ...(block.content ?? []),
        ...(block.text ? [block.text] : []),
      ]
      add(block.title ?? block.label ?? "", items)
    }
  }

  if (Array.isArray(topic.sections)) {
    for (const block of topic.sections) {
      const items = [
        ...(block.items ?? []),
        ...(block.content ?? []),
        ...(block.text ? [block.text] : []),
      ]
      add(block.title ?? block.label ?? "", items)
    }
  }

  if (Array.isArray(topic.slides)) {
    for (const slide of topic.slides) {
      const items: string[] = []
      let currentHeading = clean(slide.title ?? "Understanding the topic")

      for (const item of slide.blocks ?? []) {
        const text = clean(item.text ?? "")
        if (isNoise(text)) continue

        // Slide headings become visual sub-headings rather than separate cards.
        if (isLikelyHeading(text) && !items.length) {
          currentHeading = text
        } else {
          items.push(text)
        }
      }

      add(currentHeading, items)
    }
  }

  return result
}

function findTopic(slug: string): RawTopic | undefined {
  const source = accountingTopics as unknown

  if (Array.isArray(source)) {
    return (source as RawTopic[]).find(
      (item) => item.slug === slug
    )
  }

  const record = source as Record<string, RawTopic>
  return record[slug] ?? Object.values(record).find((item) => item.slug === slug)
}

function Figure({
  visual,
  active,
  setActive,
}: {
  visual: (typeof VISUALS)[string]
  active: number
  setActive: (value: number) => void
}) {
  const selected = visual.nodes[active] ?? visual.nodes[0]

  return (
    <section className="mt-10 overflow-hidden rounded-[28px] border border-[#168BC4]/15 bg-white shadow-[0_18px_50px_rgba(7,27,73,0.08)]">
      <div className="relative overflow-hidden bg-[#071B49] px-6 py-8 text-white md:px-10 md:py-10">
        <div className="absolute -right-20 -top-24 h-72 w-72 rounded-full border border-white/10" />
        <div className="absolute -right-8 top-8 h-44 w-44 rounded-full border border-[#35B5E5]/20" />

        <div className="relative">
          <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#35B5E5]">
            {visual.eyebrow}
          </p>
          <h2 className="mt-3 max-w-3xl text-2xl font-semibold md:text-4xl">
            {visual.title}
          </h2>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-300 md:text-base">
            {visual.subtitle}
          </p>
        </div>
      </div>

      <div className="p-5 md:p-8">
        {/* Original CURA-style SVG illustration created in code */}
        <div className="relative overflow-hidden rounded-3xl bg-[#F5F8FC] p-5 md:p-8">
          <svg
            viewBox="0 0 1000 250"
            className="h-auto w-full"
            role="img"
            aria-label={visual.title}
          >
            <defs>
              <linearGradient id="curaLine" x1="0" x2="1">
                <stop offset="0%" stopColor="#168BC4" />
                <stop offset="100%" stopColor="#35B5E5" />
              </linearGradient>
              <filter id="shadow">
                <feDropShadow dx="0" dy="5" stdDeviation="6" floodOpacity=".12" />
              </filter>
            </defs>

            <path
              d="M80 125 C220 45 300 205 430 125 S650 45 920 125"
              fill="none"
              stroke="url(#curaLine)"
              strokeWidth="5"
              strokeLinecap="round"
              opacity=".65"
            />

            {visual.nodes.map((node, index) => {
              const x = 80 + index * (840 / Math.max(1, visual.nodes.length - 1))
              const selectedNode = index === active

              return (
                <g
                  key={node}
                  onClick={() => setActive(index)}
                  className="cursor-pointer"
                >
                  <circle
                    cx={x}
                    cy="125"
                    r={selectedNode ? "30" : "24"}
                    fill={selectedNode ? "#071B49" : "#FFFFFF"}
                    stroke={selectedNode ? "#35B5E5" : "#168BC4"}
                    strokeWidth={selectedNode ? "5" : "3"}
                    filter="url(#shadow)"
                  />
                  <text
                    x={x}
                    y="130"
                    textAnchor="middle"
                    fontSize="15"
                    fontWeight="700"
                    fill={selectedNode ? "#FFFFFF" : "#071B49"}
                  >
                    {index + 1}
                  </text>
                  <text
                    x={x}
                    y="185"
                    textAnchor="middle"
                    fontSize="15"
                    fontWeight={selectedNode ? "700" : "500"}
                    fill="#071B49"
                  >
                    {node.length > 18 ? `${node.slice(0, 17)}…` : node}
                  </text>
                </g>
              )
            })}
          </svg>

          <div className="mt-3 flex items-center justify-between text-xs text-slate-500">
            <span>Click a point to explore the model</span>
            <span className="font-semibold text-[#168BC4]">{selected}</span>
          </div>
        </div>

        <div className="mt-5 grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl bg-[#071B49] p-5 text-white">
            <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#35B5E5]">
              Focus
            </p>
            <p className="mt-2 text-lg font-semibold">{selected}</p>
            <p className="mt-2 text-sm leading-6 text-slate-300">
              Use this stage as the mental anchor while reading the lesson.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5">
            <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#168BC4]">
              Why it matters
            </p>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              The visual separates the topic into decisions so the learner can
              understand the relationship between concepts rather than memorise
              isolated slide points.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5">
            <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#168BC4]">
              Study move
            </p>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Read the explanation, then return to the figure and explain the
              selected stage in your own words.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

function ReadingBlock({
  title,
  items,
  index,
}: {
  title: string
  items: string[]
  index: number
}) {
  const [open, setOpen] = useState(true)

  const paragraphs: string[] = []
  const bullets: string[] = []

  for (const raw of items) {
    const text = clean(raw)
    if (!text || isNoise(text)) continue

    if (isBullet(text)) {
      bullets.push(text.replace(/^(?:[-•✓✔–—]|\d+[.)]|[a-zA-Z][.)])\s+/, ""))
    } else {
      paragraphs.push(text)
    }
  }

  if (!paragraphs.length && !bullets.length) return null

  const special = /^(journal|illustration|example|solution|calculation)$/i.test(title)

  return (
    <section id={`lesson-${index}`} className="scroll-mt-28 py-8 md:py-10">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        className="group flex w-full items-start justify-between gap-6 text-left"
      >
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#168BC4]">
            {special ? "Applied example" : "Concept"}
          </p>
          <h2 className="mt-2 text-2xl font-semibold leading-tight text-[#071B49] md:text-3xl">
            {title}
          </h2>
        </div>

        <span className="mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-slate-200 text-xl text-[#168BC4] transition group-hover:border-[#168BC4]">
          {open ? "−" : "+"}
        </span>
      </button>

      {open && (
        <div className="mt-6">
          {paragraphs.map((paragraph, index) => (
            <p
              key={index}
              className="mb-5 max-w-4xl text-[16px] leading-8 text-slate-700 md:text-[17px]"
            >
              {paragraph}
            </p>
          ))}

          {bullets.length > 0 && (
            <div className="mt-6 grid gap-3 md:grid-cols-2">
              {bullets.map((bullet, index) => (
                <div
                  key={index}
                  className="relative rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
                >
                  <div className="absolute left-0 top-5 h-7 w-1 rounded-r-full bg-[#168BC4]" />
                  <p className="pl-3 text-[15px] leading-7 text-slate-700">
                    {bullet}
                  </p>
                </div>
              ))}
            </div>
          )}

          {special && (
            <div className="mt-7 rounded-3xl bg-[#071B49] p-6 text-white">
              <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#35B5E5]">
                Work it through
              </p>
              <p className="mt-2 text-sm leading-7 text-slate-300">
                Pause here before moving on. Identify the accounting decision,
                the measurement basis and the resulting financial statement
                effect.
              </p>
            </div>
          )}
        </div>
      )}
    </section>
  )
}

function Quiz({
  questions,
}: {
  questions: any[]
}) {
  const [answers, setAnswers] = useState<Record<number, number>>({})
  const [submitted, setSubmitted] = useState(false)

  if (!questions?.length) return null

  const score = questions.reduce(
    (total, question, index) =>
      total + (answers[index] === question.answer ? 1 : 0),
    0
  )

  return (
    <section className="mt-14 rounded-[28px] bg-[#071B49] p-6 text-white md:p-10">
      <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#35B5E5]">
        Check your understanding
      </p>
      <h2 className="mt-3 text-3xl font-semibold">Quick quiz</h2>
      <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-300">
        Answer the questions, submit once, and see both the correct answers and
        the explanations.
      </p>

      <div className="mt-8 space-y-8">
        {questions.map((question, questionIndex) => (
          <div
            key={questionIndex}
            className="rounded-3xl bg-white p-5 text-[#071B49] md:p-7"
          >
            <p className="font-semibold leading-7">{question.question}</p>

            <div className="mt-5 space-y-3">
              {(question.options ?? []).map((option: string, optionIndex: number) => {
                const selected = answers[questionIndex] === optionIndex
                const correct = submitted && question.answer === optionIndex
                const wrong = submitted && selected && !correct

                return (
                  <button
                    key={optionIndex}
                    type="button"
                    disabled={submitted}
                    onClick={() =>
                      setAnswers((current) => ({
                        ...current,
                        [questionIndex]: optionIndex,
                      }))
                    }
                    className={`w-full rounded-2xl border p-4 text-left text-sm transition ${
                      correct
                        ? "border-emerald-400 bg-emerald-50"
                        : wrong
                          ? "border-red-400 bg-red-50"
                          : selected
                            ? "border-[#168BC4] bg-[#F1F7FB]"
                            : "border-slate-200 hover:border-[#168BC4]/50"
                    }`}
                  >
                    <span className="flex items-start gap-3">
                      <span className="font-bold text-[#168BC4]">
                        {String.fromCharCode(65 + optionIndex)}
                      </span>
                      <span>{option}</span>
                    </span>

                    {correct && (
                      <span className="mt-2 block text-xs font-semibold text-emerald-700">
                        ✓ Correct answer
                      </span>
                    )}

                    {wrong && (
                      <span className="mt-2 block text-xs font-semibold text-red-700">
                        ✕ Your answer
                      </span>
                    )}
                  </button>
                )
              })}
            </div>

            {submitted && question.explanation && (
              <div className="mt-5 rounded-2xl bg-[#F5F8FC] p-4 text-sm leading-7 text-slate-700">
                <span className="font-semibold text-[#071B49]">Why:</span>{" "}
                {question.explanation}
              </div>
            )}
          </div>
        ))}
      </div>

      {!submitted ? (
        <button
          type="button"
          onClick={() => setSubmitted(true)}
          disabled={Object.keys(answers).length !== questions.length}
          className="mt-8 rounded-full bg-white px-7 py-3 text-sm font-bold text-[#071B49] disabled:cursor-not-allowed disabled:opacity-40"
        >
          Submit quiz
        </button>
      ) : (
        <div className="mt-8 flex flex-wrap items-center gap-4">
          <div className="rounded-2xl bg-white/10 px-5 py-4">
            <p className="text-xs uppercase tracking-[0.2em] text-[#35B5E5]">
              Result
            </p>
            <p className="mt-1 text-2xl font-semibold">
              {score} / {questions.length}
            </p>
          </div>

          <button
            type="button"
            onClick={() => {
              setAnswers({})
              setSubmitted(false)
            }}
            className="rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white hover:bg-white/10"
          >
            Try again
          </button>
        </div>
      )}
    </section>
  )
}

export default function AccountingTopicPage() {
  const params = useParams()
  const slug = String(params?.slug ?? "")
  const topic = findTopic(slug)

  const visual = VISUALS[slug] ?? VISUALS["published-accounts"]
  const [active, setActive] = useState(0)

  const blocks = useMemo(
    () => (topic ? sourceBlocks(topic) : []),
    [topic]
  )

  if (!topic) {
    return (
      <main className="min-h-screen bg-[#F5F8FC] text-[#071B49]">
        <CuraHeader />
        <section className="mx-auto max-w-4xl px-6 py-24 text-center">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#168BC4]">
            CURA Education
          </p>
          <h1 className="mt-4 text-4xl font-semibold">Topic not found</h1>
          <Link
            href="/education/materials/accounting"
            className="mt-8 inline-flex rounded-full bg-[#071B49] px-6 py-3 text-sm font-semibold text-white"
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

      <header className="relative overflow-hidden bg-[#071B49]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(53,181,229,0.16),transparent_32%)]" />

        <div className="relative mx-auto max-w-7xl px-6 py-16 lg:px-8 lg:py-20">
          <Link
            href="/education/materials/accounting"
            className="text-sm font-semibold text-[#35B5E5]"
          >
            ← Accounting
          </Link>

          <div className="mt-10 max-w-4xl">
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#35B5E5]">
              {topic.standard ?? "Accounting"}
            </p>

            <h1 className="mt-4 text-4xl font-semibold tracking-tight text-white md:text-6xl">
              {topic.title}
            </h1>

            {topic.description && (
              <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">
                {topic.description}
              </p>
            )}
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-6 pb-20 lg:px-8">
        <Figure
          visual={visual}
          active={active}
          setActive={setActive}
        />

        <div className="mt-12 grid gap-12 lg:grid-cols-[minmax(0,1fr)_280px]">
          <article className="min-w-0">
            <div className="rounded-3xl border border-slate-200 bg-white px-6 py-8 shadow-sm md:px-10">
              <div className="mb-4 border-b border-slate-200 pb-6">
                <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#168BC4]">
                  The lesson
                </p>
                <p className="mt-2 text-sm leading-6 text-slate-500">
                  The material below has been reorganised into a reading
                  experience rather than reproduced slide-by-slide.
                </p>
              </div>

              {blocks.map((block, index) => (
                <ReadingBlock
                  key={`${block.title}-${index}`}
                  title={block.title}
                  items={block.items}
                  index={index}
                />
              ))}
            </div>

            <Quiz questions={topic.quiz ?? []} />
          </article>

          <aside className="hidden lg:block">
            <div className="sticky top-24 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
              <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#168BC4]">
                On this page
              </p>

              <div className="mt-4 max-h-[65vh] overflow-y-auto">
                {blocks.map((block, index) => (
                  <a
                    key={`${block.title}-nav-${index}`}
                    href={`#lesson-${index}`}
                    className="block border-l-2 border-transparent px-3 py-2 text-sm leading-6 text-slate-600 transition hover:border-[#168BC4] hover:text-[#071B49]"
                  >
                    {block.title}
                  </a>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>

      <CuraFooter />
    </main>
  )
}
