"use client"

type Props = {
  topicTitle: string
  sectionTitle?: string
  standard?: string
  mode: "hero" | "section"
}

const topicVisuals: Record<string, { eyebrow: string; title: string; nodes: string[] }> = {
  "published accounts": {
    eyebrow: "Read the statements",
    title: "How the financial statements fit together",
    nodes: ["Financial position", "Performance", "Equity", "Cash flows", "Notes"],
  },
  "conceptual": {
    eyebrow: "Think in systems",
    title: "From reporting objective to useful information",
    nodes: ["Objective", "Qualitative characteristics", "Elements", "Recognition", "Measurement", "Reporting"],
  },
  "property": {
    eyebrow: "Follow the asset",
    title: "The asset lifecycle",
    nodes: ["Recognise", "Measure", "Depreciate", "Revalue", "Impair", "Dispose"],
  },
  "intangible": {
    eyebrow: "Make the invisible visible",
    title: "The intangible asset lifecycle",
    nodes: ["Identify", "Recognise", "Measure", "Amortise", "Impair", "Derecognise"],
  },
  "impairment": {
    eyebrow: "Decision model",
    title: "When does an asset lose value?",
    nodes: ["Indicator", "Recoverable amount", "Compare", "Loss", "Reversal"],
  },
  "held for sale": {
    eyebrow: "Classification matters",
    title: "When an asset changes direction",
    nodes: ["Available for sale", "Criteria", "Measure", "Present", "Dispose"],
  },
  "revenue": {
    eyebrow: "Follow the contract",
    title: "From contract to revenue",
    nodes: ["Contract", "Performance obligations", "Transaction price", "Allocate", "Recognise"],
  },
  "agriculture": {
    eyebrow: "Track biological change",
    title: "From biological asset to produce",
    nodes: ["Biological asset", "Recognition", "Fair value", "Growth", "Harvest", "Produce"],
  },
  "foreign": {
    eyebrow: "Follow the currency",
    title: "How foreign currency moves through reporting",
    nodes: ["Transaction", "Initial rate", "Settlement", "Closing rate", "Translation"],
  },
  "lease": {
    eyebrow: "Follow the lease",
    title: "Right-of-use asset + lease liability",
    nodes: ["Lease", "Identify", "ROU asset", "Liability", "Interest", "Depreciation"],
  },
  "financial": {
    eyebrow: "Financial instruments",
    title: "Classify, measure and account",
    nodes: ["Recognise", "Classify", "Measure", "Impair", "Derecognise"],
  },
  "employee": {
    eyebrow: "Employee benefits",
    title: "Service creates an accounting obligation",
    nodes: ["Service", "Benefit", "Obligation", "Measure", "Recognise"],
  },
  "share": {
    eyebrow: "Share-based payment",
    title: "Award to expense over the service period",
    nodes: ["Award", "Vesting", "Fair value", "Service", "Expense"],
  },
  "tax": {
    eyebrow: "Tax accounting",
    title: "Current tax and deferred tax",
    nodes: ["Profit", "Tax base", "Temporary differences", "Deferred tax", "Settlement"],
  },
  "earnings per share": {
    eyebrow: "Performance measure",
    title: "From profit to earnings per share",
    nodes: ["Profit", "Ordinary shares", "Weighted average", "Dilution", "EPS"],
  },
  "cash flows": {
    eyebrow: "Cash movement",
    title: "Where did the cash come from and where did it go?",
    nodes: ["Operating", "Investing", "Financing", "Cash movement", "Reconciliation"],
  },
  "provisions": {
    eyebrow: "Uncertainty",
    title: "Obligation, probability and measurement",
    nodes: ["Past event", "Present obligation", "Probability", "Estimate", "Provision / disclosure"],
  },
  "accounting policies": {
    eyebrow: "Consistency in accounting",
    title: "Policies, estimates and errors",
    nodes: ["Policy", "Estimate", "Change", "Error", "Correction"],
  },
  "consolidated": {
    eyebrow: "Think like a group",
    title: "From separate entities to one economic unit",
    nodes: ["Parent", "Subsidiary", "Control", "Eliminate", "Consolidate"],
  },
  "associate": {
    eyebrow: "Group relationships",
    title: "Significant influence and the equity method",
    nodes: ["Investment", "Influence", "Share of profit", "Adjust", "Carrying amount"],
  },
  "group": {
    eyebrow: "Group structure",
    title: "Changes in the shape of the group",
    nodes: ["Acquisition", "Control", "Change", "Reorganisation", "Disposal"],
  },
  "disposal": {
    eyebrow: "Group disposal",
    title: "From subsidiary to disposal result",
    nodes: ["Subsidiary", "Disposal", "Remove net assets", "Calculate result", "Report"],
  },
  "adopting": {
    eyebrow: "When the rules change",
    title: "Transition to a new accounting Standard",
    nodes: ["New Standard", "Transition rules", "Systems", "Covenants", "Apply"],
  },
  "smes": {
    eyebrow: "Simplified reporting",
    title: "The IFRS for SMEs pathway",
    nodes: ["Eligibility", "Recognition", "Measurement", "Presentation", "Disclosure"],
  },
  "interpretation": {
    eyebrow: "Read beyond the numbers",
    title: "Interpret financial statements in context",
    nodes: ["Profitability", "Liquidity", "Efficiency", "Solvency", "Investor view"],
  },
  "borrowing": {
    eyebrow: "Financing assets",
    title: "When borrowing costs become part of an asset",
    nodes: ["Borrowing", "Qualifying asset", "Capitalise", "Suspend", "Expense"],
  },
  "investment": {
    eyebrow: "Investment property",
    title: "Property held for investment returns",
    nodes: ["Classify", "Initial measurement", "Subsequent measurement", "Fair value", "Dispose"],
  },
  "events": {
    eyebrow: "Events after reporting",
    title: "Adjusting or non-adjusting?",
    nodes: ["Reporting date", "Event", "Evidence", "Adjust", "Disclose"],
  },
  "other standards": {
    eyebrow: "Standards in context",
    title: "Connect the relevant IFRS requirements",
    nodes: ["Scope", "Recognition", "Measurement", "Presentation", "Disclosure"],
  },
}

function pickVisual(topicTitle: string) {
  const t = topicTitle.toLowerCase()
  for (const [key, value] of Object.entries(topicVisuals)) {
    if (t.includes(key)) return value
  }
  return {
    eyebrow: "Accounting in context",
    title: "Follow the accounting decision",
    nodes: ["Identify", "Recognise", "Measure", "Present", "Disclose"],
  }
}

function Icon({ kind }: { kind: "hero" | "section" }) {
  return (
    <div className="relative h-full min-h-[190px] w-full overflow-hidden rounded-[28px] border border-[#BFE8F6] bg-[#F4FBFE]">
      <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-[#DDF4FB]" />
      <div className="absolute -bottom-16 -left-10 h-44 w-44 rounded-full bg-[#EAF8FC]" />
      <div className="absolute inset-0 flex items-center justify-center p-8">
        <div className="relative w-full max-w-[290px]">
          <div className="mx-auto h-16 w-16 rounded-2xl border-2 border-[#168BC4] bg-white shadow-sm">
            <div className="mx-auto mt-4 h-2 w-8 rounded-full bg-[#35B5E5]" />
            <div className="mx-auto mt-3 h-1.5 w-9 rounded-full bg-[#C9EAF5]" />
            <div className="mx-auto mt-2 h-1.5 w-7 rounded-full bg-[#C9EAF5]" />
          </div>
          <div className="mt-4 grid grid-cols-3 gap-2">
            <span className="h-2 rounded-full bg-[#168BC4]" />
            <span className="h-2 rounded-full bg-[#35B5E5]" />
            <span className="h-2 rounded-full bg-[#BFE8F6]" />
          </div>
          {kind === "hero" && (
            <div className="mx-auto mt-5 h-2 w-32 rounded-full bg-[#071B49]/10" />
          )}
        </div>
      </div>
    </div>
  )
}

export default function CuraAccountingVisual({ topicTitle, sectionTitle, standard, mode }: Props) {
  const visual = pickVisual(topicTitle)
  const title = mode === "hero" ? visual.title : (sectionTitle || visual.title)
  const nodes = visual.nodes

  if (mode === "hero") {
    return (
      <div className="rounded-[30px] border border-white/10 bg-white/5 p-4 backdrop-blur-sm">
        <Icon kind="hero" />
        <div className="px-2 pb-2 pt-4">
          <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#8FD8F2]">
            {visual.eyebrow}
          </p>
          <p className="mt-2 text-sm font-semibold leading-6 text-white">
            {standard || "Accounting & Financial Reporting"}
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="overflow-hidden rounded-[26px] border border-[#D7EAF2] bg-[#F8FCFE]">
      <div className="grid gap-6 p-5 md:grid-cols-[190px_minmax(0,1fr)] md:p-6">
        <Icon kind="section" />
        <div className="flex flex-col justify-center">
          <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#168BC4]">
            {visual.eyebrow}
          </p>
          <h3 className="mt-2 text-lg font-semibold leading-7 text-[#071B49]">
            {title}
          </h3>
          <div className="mt-5 flex flex-wrap items-center gap-2">
            {nodes.map((node, index) => (
              <span key={`${node}-${index}`} className="inline-flex items-center gap-2">
                <span className="rounded-full border border-[#BFE8F6] bg-white px-3 py-1.5 text-xs font-semibold text-[#102A5F] shadow-sm">
                  {node}
                </span>
                {index < nodes.length - 1 && (
                  <span className="text-[#35B5E5]">→</span>
                )}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
