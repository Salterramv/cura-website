"use client"

type Props = {
  topicTitle: string
  sectionTitle?: string
  standard?: string
  mode: "hero" | "section"
}

type VisualKind =
  | "framework"
  | "policies"
  | "government-grants"
  | "transition"
  | "agriculture"
  | "associate"
  | "borrowing"
  | "group-structure"
  | "measurement"
  | "consolidated-position"
  | "consolidated-profit"
  | "consolidation"
  | "eps"
  | "employee"
  | "fair-value"
  | "financial"
  | "foreign"
  | "disposal"
  | "ias37"
  | "impairment"
  | "intangible"
  | "interpretation"
  | "inventory"
  | "investment-property"
  | "leases"
  | "held-for-sale"
  | "related-parties"
  | "revenue"
  | "segment"
  | "share-based"
  | "cash-flow"
  | "ppe"
  | "taxation"
  | "generic"

type VisualDefinition = {
  kind: VisualKind
  eyebrow: string
  title: string
  nodes: string[]
}

const visuals: Array<{
  match: string[]
  visual: VisualDefinition
}> = [
  {
    match: ["conceptual and regulatory framework", "conceptual framework"],
    visual: {
      kind: "framework",
      eyebrow: "Build the reporting framework",
      title: "From objective to useful financial information",
      nodes: [
        "Objective",
        "Qualitative characteristics",
        "Elements",
        "Recognition",
        "Measurement",
      ],
    },
  },
  {
    match: ["accounting policies"],
    visual: {
      kind: "policies",
      eyebrow: "Choose consistently",
      title: "Policies, estimates and errors",
      nodes: ["Policy", "Estimate", "Change", "Error", "Correction"],
    },
  },
  {
    match: ["government grants"],
    visual: {
      kind: "government-grants",
      eyebrow: "Match support with activity",
      title: "Government assistance through the reporting cycle",
      nodes: ["Grant", "Conditions", "Recognition", "Income", "Disclosure"],
    },
  },
  {
    match: ["adopting new accounting standards"],
    visual: {
      kind: "transition",
      eyebrow: "When the rules change",
      title: "Transition to a new accounting Standard",
      nodes: ["New Standard", "Transition", "Opening balances", "Systems", "Report"],
    },
  },
  {
    match: ["agriculture"],
    visual: {
      kind: "agriculture",
      eyebrow: "Track biological change",
      title: "From biological asset to agricultural produce",
      nodes: [
        "Biological asset",
        "Recognition",
        "Fair value",
        "Growth",
        "Harvest",
        "Produce",
      ],
    },
  },
  {
    match: ["associates"],
    visual: {
      kind: "associate",
      eyebrow: "Group relationships",
      title: "Significant influence and the equity method",
      nodes: ["Investment", "Influence", "Profit share", "Adjust", "Carrying amount"],
    },
  },
  {
    match: ["borrowing cost"],
    visual: {
      kind: "borrowing",
      eyebrow: "Financing an asset",
      title: "When borrowing costs become part of an asset",
      nodes: ["Borrowing", "Qualifying asset", "Capitalise", "Suspend", "Expense"],
    },
  },
  {
    match: ["change in group structure"],
    visual: {
      kind: "group-structure",
      eyebrow: "Group structure",
      title: "How changes reshape the reporting group",
      nodes: ["Group", "Change", "Control", "Reorganisation", "Report"],
    },
  },
  {
    match: ["measurement"],
    visual: {
      kind: "measurement",
      eyebrow: "Measure what matters",
      title: "Measurement bases used in financial reporting",
      nodes: ["Cost", "Fair value", "Value in use", "Present value", "Measure"],
    },
  },
  {
    match: ["consolidated statement of financial position"],
    visual: {
      kind: "consolidated-position",
      eyebrow: "Combine financial position",
      title: "From separate entities to one group position",
      nodes: ["Parent", "Subsidiary", "Assets", "Liabilities", "Eliminate"],
    },
  },
  {
    match: ["consolidated statement of profit or loss"],
    visual: {
      kind: "consolidated-profit",
      eyebrow: "Combine performance",
      title: "Group performance after consolidation adjustments",
      nodes: ["Revenue", "Expenses", "Intra-group", "Adjust", "Group profit"],
    },
  },
  {
    match: ["consolidation"],
    visual: {
      kind: "consolidation",
      eyebrow: "Think like a group",
      title: "From separate entities to one economic unit",
      nodes: ["Parent", "Subsidiary", "Control", "Eliminate", "Consolidate"],
    },
  },
  {
    match: ["eps"],
    visual: {
      kind: "eps",
      eyebrow: "Performance measure",
      title: "From profit to earnings per share",
      nodes: ["Profit", "Ordinary shares", "Weighted average", "Dilution", "EPS"],
    },
  },
  {
    match: ["employee benefits"],
    visual: {
      kind: "employee",
      eyebrow: "Service creates an obligation",
      title: "Accounting for employee benefits",
      nodes: ["Service", "Benefit", "Obligation", "Measure", "Recognise"],
    },
  },
  {
    match: ["fair value measurement"],
    visual: {
      kind: "fair-value",
      eyebrow: "Measure at fair value",
      title: "A market-based measurement framework",
      nodes: ["Asset", "Market", "Inputs", "Valuation", "Fair value"],
    },
  },
  {
    match: ["financial assets", "financial liabilities"],
    visual: {
      kind: "financial",
      eyebrow: "Financial instruments",
      title: "Classify, measure and account",
      nodes: ["Recognise", "Classify", "Measure", "Impair", "Derecognise"],
    },
  },
  {
    match: ["foreign currency"],
    visual: {
      kind: "foreign",
      eyebrow: "Follow the currency",
      title: "How foreign currency moves through reporting",
      nodes: ["Transaction", "Initial rate", "Settlement", "Closing rate", "Translation"],
    },
  },
  {
    match: ["group disposals"],
    visual: {
      kind: "disposal",
      eyebrow: "Group disposal",
      title: "From subsidiary disposal to reporting result",
      nodes: ["Subsidiary", "Disposal", "Net assets", "Result", "Report"],
    },
  },
  {
    match: ["ias 37", "ias 10"],
    visual: {
      kind: "ias37",
      eyebrow: "Uncertainty and subsequent events",
      title: "Obligation, probability and events after reporting",
      nodes: ["Event", "Obligation", "Probability", "Estimate", "Disclosure"],
    },
  },
  {
    match: ["impairment"],
    visual: {
      kind: "impairment",
      eyebrow: "Decision model",
      title: "When does an asset lose value?",
      nodes: ["Indicator", "Recoverable amount", "Compare", "Loss", "Reversal"],
    },
  },
  {
    match: ["intangible assets"],
    visual: {
      kind: "intangible",
      eyebrow: "Make the invisible visible",
      title: "The intangible asset lifecycle",
      nodes: ["Identify", "Recognise", "Measure", "Amortise", "Impair", "Derecognise"],
    },
  },
  {
    match: ["interpretation of financial statement"],
    visual: {
      kind: "interpretation",
      eyebrow: "Read beyond the numbers",
      title: "Interpret financial statements in context",
      nodes: ["Profitability", "Liquidity", "Efficiency", "Solvency", "Investor view"],
    },
  },
  {
    match: ["inventories"],
    visual: {
      kind: "inventory",
      eyebrow: "Measure inventory carefully",
      title: "From purchase to closing inventory",
      nodes: ["Purchase", "Cost", "NRV", "Write-down", "Closing"],
    },
  },
  {
    match: ["investment property"],
    visual: {
      kind: "investment-property",
      eyebrow: "Property held for investment",
      title: "Classification and subsequent measurement",
      nodes: ["Classify", "Initial cost", "Measure", "Fair value", "Dispose"],
    },
  },
  {
    match: ["leases"],
    visual: {
      kind: "leases",
      eyebrow: "Follow the lease",
      title: "Right-of-use asset and lease liability",
      nodes: ["Lease", "Identify", "ROU asset", "Liability", "Interest", "Depreciation"],
    },
  },
  {
    match: ["held for sale"],
    visual: {
      kind: "held-for-sale",
      eyebrow: "Classification matters",
      title: "When a non-current asset changes direction",
      nodes: ["Criteria", "Classify", "Measure", "Present", "Dispose"],
    },
  },
  {
    match: ["principles of consolidated"],
    visual: {
      kind: "consolidation",
      eyebrow: "Build the group accounts",
      title: "Principles of consolidated financial statements",
      nodes: ["Control", "Combine", "Eliminate", "Adjust", "Present"],
    },
  },
  {
    match: ["related parties"],
    visual: {
      kind: "group-structure",
      eyebrow: "Relationships matter",
      title: "Identify related parties and transactions",
      nodes: ["Relationship", "Transaction", "Terms", "Disclosure", "Transparency"],
    },
  },
  {
    match: ["revenue"],
    visual: {
      kind: "revenue",
      eyebrow: "Follow the contract",
      title: "From contract to revenue",
      nodes: ["Contract", "Obligations", "Price", "Allocate", "Recognise"],
    },
  },
  {
    match: ["segment reporting"],
    visual: {
      kind: "segment",
      eyebrow: "See the business in parts",
      title: "Reporting operating segments",
      nodes: ["Segments", "Management view", "Measure", "Aggregate", "Disclose"],
    },
  },
  {
    match: ["share-based payments"],
    visual: {
      kind: "share-based",
      eyebrow: "Award to expense",
      title: "Share-based payment through the vesting period",
      nodes: ["Award", "Vesting", "Fair value", "Service", "Expense"],
    },
  },
  {
    match: ["statement of cash flows"],
    visual: {
      kind: "cash-flow",
      eyebrow: "Follow the cash",
      title: "Where did the cash come from and where did it go?",
      nodes: ["Operating", "Investing", "Financing", "Cash movement", "Reconcile"],
    },
  },
  {
    match: ["tangible non-current assets"],
    visual: {
      kind: "ppe",
      eyebrow: "Follow the asset",
      title: "The tangible non-current asset lifecycle",
      nodes: ["Acquire", "Recognise", "Depreciate", "Impair", "Dispose"],
    },
  },
  {
    match: ["taxation"],
    visual: {
      kind: "taxation",
      eyebrow: "Tax accounting",
      title: "Current tax and deferred tax",
      nodes: ["Profit", "Tax base", "Differences", "Deferred tax", "Settlement"],
    },
  },
]

function pickVisual(topicTitle: string): VisualDefinition {
  const value = topicTitle.toLowerCase()

  for (const entry of visuals) {
    if (entry.match.some((key) => value.includes(key))) {
      return entry.visual
    }
  }

  return {
    kind: "generic",
    eyebrow: "Accounting in context",
    title: "Follow the accounting decision",
    nodes: ["Identify", "Recognise", "Measure", "Present", "Disclose"],
  }
}

function MiniIcon({
  kind,
}: {
  kind: VisualKind
}) {
  const common =
    "absolute inset-0 flex items-center justify-center"

  if (kind === "agriculture") {
    return (
      <div className={common}>
        <div className="relative h-40 w-full overflow-hidden rounded-[26px]">
          <div className="absolute inset-x-0 bottom-0 h-20 bg-[#DDF3D9]" />
          <div className="absolute bottom-0 left-0 h-16 w-full skew-y-3 bg-[#C7E8C4]" />

          <div className="absolute bottom-10 left-10 h-20 w-3 rounded-full bg-[#8B6A45]" />
          <div className="absolute bottom-24 left-4 h-14 w-20 rounded-full bg-[#69B76B]" />
          <div className="absolute bottom-28 left-12 h-12 w-16 rounded-full bg-[#4F9E59]" />

          <div className="absolute bottom-7 right-12 h-16 w-28 rounded-[45%] border-2 border-[#071B49] bg-white" />
          <div className="absolute bottom-12 right-28 h-12 w-7 rounded-full border-2 border-[#071B49] bg-white" />
          <div className="absolute bottom-3 right-20 h-8 w-2 bg-[#071B49]" />
          <div className="absolute bottom-3 right-5 h-8 w-2 bg-[#071B49]" />

          <div className="absolute right-4 top-4 h-8 w-8 rounded-full bg-[#35B5E5]/40" />
        </div>
      </div>
    )
  }

  if (kind === "financial" || kind === "fair-value") {
    return (
      <div className={common}>
        <div className="relative h-36 w-44">
          <div className="absolute left-4 top-10 h-20 w-28 rounded-2xl border-2 border-[#168BC4] bg-white" />
          <div className="absolute left-9 top-16 h-2 w-16 rounded bg-[#35B5E5]" />
          <div className="absolute left-9 top-23 h-2 w-12 rounded bg-[#BFE8F6]" />

          <div className="absolute right-0 top-2 h-14 w-14 rounded-full border-2 border-[#168BC4] bg-[#F4FBFE]" />
          <div className="absolute right-5 top-7 h-1 w-5 bg-[#168BC4]" />
          <div className="absolute right-5 top-10 h-1 w-5 bg-[#35B5E5]" />

          <div className="absolute bottom-0 left-16 flex gap-1">
            <span className="h-8 w-3 rounded-t bg-[#BFE8F6]" />
            <span className="h-12 w-3 rounded-t bg-[#35B5E5]" />
            <span className="h-16 w-3 rounded-t bg-[#168BC4]" />
          </div>
        </div>
      </div>
    )
  }

  if (kind === "cash-flow") {
    return (
      <div className={common}>
        <div className="grid w-44 grid-cols-3 gap-3">
          {[
            ["O", "Operating"],
            ["I", "Investing"],
            ["F", "Financing"],
          ].map(([letter, label], index) => (
            <div key={label} className="text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl border border-[#BFE8F6] bg-white text-sm font-bold text-[#168BC4]">
                {letter}
              </div>
              <div className="mt-2 h-1.5 rounded bg-[#DDF3F9]" />
              <div className="mx-auto mt-2 h-1 w-8 rounded bg-[#35B5E5]" />
              {index < 2 && (
                <div className="mt-2 text-xs text-[#168BC4]">→</div>
              )}
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (kind === "leases") {
    return (
      <div className={common}>
        <div className="flex items-center gap-3">
          <div className="rounded-2xl border-2 border-[#168BC4] bg-white p-4">
            <div className="h-8 w-10 rounded bg-[#DDF4FB]" />
            <div className="mt-2 h-2 w-10 rounded bg-[#35B5E5]" />
          </div>
          <div className="text-xl font-bold text-[#35B5E5]">+</div>
          <div className="rounded-2xl border-2 border-[#168BC4] bg-white p-4">
            <div className="h-8 w-10 rounded bg-[#E8F4F8]" />
            <div className="mt-2 h-2 w-10 rounded bg-[#168BC4]" />
          </div>
        </div>
      </div>
    )
  }

  if (kind === "revenue") {
    return (
      <div className={common}>
        <div className="flex items-end gap-2">
          <div className="h-14 w-10 rounded-t-2xl bg-[#BFE8F6]" />
          <div className="h-20 w-10 rounded-t-2xl bg-[#35B5E5]" />
          <div className="h-28 w-10 rounded-t-2xl bg-[#168BC4]" />
          <div className="ml-2 text-2xl font-bold text-[#168BC4]">→</div>
          <div className="h-12 w-12 rounded-full border-4 border-[#35B5E5] bg-white" />
        </div>
      </div>
    )
  }

  if (
    kind === "consolidation" ||
    kind === "consolidated-position" ||
    kind === "consolidated-profit" ||
    kind === "associate" ||
    kind === "group-structure"
  ) {
    return (
      <div className={common}>
        <div className="relative h-36 w-48">
          <div className="absolute left-0 top-5 h-14 w-14 rounded-2xl border-2 border-[#168BC4] bg-white" />
          <div className="absolute right-0 top-5 h-14 w-14 rounded-2xl border-2 border-[#35B5E5] bg-white" />

          <div className="absolute left-6 top-10 h-2 w-28 bg-[#BFE8F6]" />

          <div className="absolute bottom-2 left-1/2 h-14 w-16 -translate-x-1/2 rounded-2xl border-2 border-[#071B49] bg-[#F4FBFE]" />
          <div className="absolute bottom-16 left-1/2 h-12 w-px -translate-x-1/2 bg-[#168BC4]" />

          <div className="absolute left-4 top-10 text-[9px] font-bold text-[#168BC4]">
            A
          </div>
          <div className="absolute right-4 top-10 text-[9px] font-bold text-[#35B5E5]">
            B
          </div>
          <div className="absolute bottom-7 left-1/2 -translate-x-1/2 text-[9px] font-bold text-[#071B49]">
            GROUP
          </div>
        </div>
      </div>
    )
  }

  if (kind === "taxation") {
    return (
      <div className={common}>
        <div className="relative h-36 w-44">
          <div className="absolute left-4 top-4 h-24 w-28 rounded-2xl border-2 border-[#168BC4] bg-white p-4">
            <div className="h-2 w-16 rounded bg-[#35B5E5]" />
            <div className="mt-4 h-2 w-20 rounded bg-[#DDF4FB]" />
            <div className="mt-3 h-2 w-12 rounded bg-[#DDF4FB]" />
          </div>

          <div className="absolute right-0 bottom-2 flex h-20 w-20 items-center justify-center rounded-full border-4 border-[#35B5E5] bg-[#F4FBFE]">
            <span className="text-xl font-bold text-[#168BC4]">$</span>
          </div>
        </div>
      </div>
    )
  }

  if (kind === "impairment") {
    return (
      <div className={common}>
        <div className="relative h-32 w-48">
          <div className="absolute left-3 bottom-4 h-20 w-20 rounded-2xl border-2 border-[#168BC4] bg-white" />
          <div className="absolute right-3 bottom-4 h-20 w-20 rounded-2xl border-2 border-[#35B5E5] bg-[#F4FBFE]" />

          <div className="absolute left-7 top-3 text-xs font-bold text-[#168BC4]">
            VALUE
          </div>
          <div className="absolute right-4 top-3 text-xs font-bold text-[#168BC4]">
            RECOVER
          </div>

          <div className="absolute left-24 top-12 text-2xl font-bold text-[#35B5E5]">
            ≈
          </div>
        </div>
      </div>
    )
  }

  if (kind === "inventory") {
    return (
      <div className={common}>
        <div className="flex items-end gap-3">
          <div className="h-20 w-14 rounded-xl border-2 border-[#168BC4] bg-white" />
          <div className="h-28 w-14 rounded-xl border-2 border-[#35B5E5] bg-[#F4FBFE]" />
          <div className="h-16 w-14 rounded-xl border-2 border-[#BFE8F6] bg-white" />
        </div>
      </div>
    )
  }

  if (kind === "investment-property") {
    return (
      <div className={common}>
        <div className="relative h-36 w-48">
          <div className="absolute bottom-3 left-2 h-20 w-44 rounded-[45%] bg-[#DDF3D9]" />
          <div className="absolute bottom-12 left-10 h-24 w-28 rounded-t-[45%] border-2 border-[#168BC4] bg-white" />
          <div className="absolute bottom-7 left-16 h-2 w-16 rounded bg-[#35B5E5]" />
          <div className="absolute bottom-3 left-20 h-10 w-2 bg-[#071B49]" />
        </div>
      </div>
    )
  }

  if (kind === "framework" || kind === "measurement") {
    return (
      <div className={common}>
        <div className="relative h-36 w-48">
          <div className="absolute left-4 top-2 h-24 w-40 rounded-2xl border-2 border-[#168BC4] bg-white p-4">
            <div className="h-2 w-24 rounded bg-[#35B5E5]" />
            <div className="mt-4 grid grid-cols-3 gap-2">
              <div className="h-8 rounded-lg bg-[#DDF4FB]" />
              <div className="h-8 rounded-lg bg-[#EAF8FC]" />
              <div className="h-8 rounded-lg bg-[#BFE8F6]" />
            </div>
          </div>

          <div className="absolute bottom-0 left-1/2 flex -translate-x-1/2 gap-1">
            <span className="h-6 w-2 rounded-full bg-[#BFE8F6]" />
            <span className="h-9 w-2 rounded-full bg-[#35B5E5]" />
            <span className="h-12 w-2 rounded-full bg-[#168BC4]" />
          </div>
        </div>
      </div>
    )
  }

  if (kind === "share-based" || kind === "eps") {
    return (
      <div className={common}>
        <div className="relative h-36 w-44">
          <div className="absolute left-4 top-8 h-16 w-16 rounded-full border-4 border-[#168BC4] bg-white" />
          <div className="absolute right-4 top-4 h-20 w-20 rounded-2xl border-2 border-[#35B5E5] bg-[#F4FBFE]" />
          <div className="absolute bottom-2 left-1/2 h-2 w-28 -translate-x-1/2 rounded bg-[#BFE8F6]" />
          <div className="absolute bottom-8 left-1/2 h-2 w-20 -translate-x-1/2 rounded bg-[#35B5E5]" />
        </div>
      </div>
    )
  }

  if (kind === "foreign") {
    return (
      <div className={common}>
        <div className="flex items-center gap-4">
          <div className="flex h-20 w-20 items-center justify-center rounded-full border-2 border-[#168BC4] bg-white text-2xl font-bold text-[#168BC4]">
            $
          </div>
          <div className="text-2xl font-bold text-[#35B5E5]">→</div>
          <div className="flex h-20 w-20 items-center justify-center rounded-full border-2 border-[#35B5E5] bg-[#F4FBFE] text-2xl font-bold text-[#168BC4]">
            €
          </div>
        </div>
      </div>
    )
  }

  if (kind === "held-for-sale" || kind === "disposal") {
    return (
      <div className={common}>
        <div className="relative h-32 w-44">
          <div className="absolute left-3 top-5 h-20 w-24 rounded-2xl border-2 border-[#168BC4] bg-white" />
          <div className="absolute right-0 top-10 flex h-14 w-14 items-center justify-center rounded-full bg-[#35B5E5] text-xl font-bold text-white">
            →
          </div>
          <div className="absolute left-7 top-10 h-2 w-14 rounded bg-[#BFE8F6]" />
          <div className="absolute left-7 top-16 h-2 w-10 rounded bg-[#35B5E5]" />
        </div>
      </div>
    )
  }

  return (
    <div className={common}>
      <div className="relative h-36 w-44">
        <div className="absolute left-4 top-5 h-20 w-32 rounded-2xl border-2 border-[#168BC4] bg-white shadow-sm">
          <div className="mx-auto mt-5 h-2 w-16 rounded bg-[#35B5E5]" />
          <div className="mx-auto mt-4 h-2 w-20 rounded bg-[#DDF4FB]" />
          <div className="mx-auto mt-3 h-2 w-12 rounded bg-[#DDF4FB]" />
        </div>
        <div className="absolute bottom-2 left-8 flex gap-2">
          <span className="h-2 w-10 rounded bg-[#168BC4]" />
          <span className="h-2 w-10 rounded bg-[#35B5E5]" />
          <span className="h-2 w-10 rounded bg-[#BFE8F6]" />
        </div>
      </div>
    </div>
  )
}

function IllustrationPanel({
  visual,
}: {
  visual: VisualDefinition
}) {
  return (
    <div className="relative h-full min-h-[205px] overflow-hidden rounded-[26px] border border-[#CDEAF4] bg-[#F4FBFE]">
      <div className="absolute -right-10 -top-10 h-36 w-36 rounded-full bg-[#DDF4FB]" />
      <div className="absolute -bottom-16 -left-10 h-44 w-44 rounded-full bg-[#EAF8FC]" />

      <MiniIcon kind={visual.kind} />

      <div className="absolute bottom-4 left-6 flex gap-1.5">
        <span className="h-1.5 w-10 rounded-full bg-[#168BC4]" />
        <span className="h-1.5 w-10 rounded-full bg-[#35B5E5]" />
        <span className="h-1.5 w-7 rounded-full bg-[#BFE8F6]" />
      </div>
    </div>
  )
}

export default function CuraAccountingVisual({
  topicTitle,
  sectionTitle,
  standard,
  mode,
}: Props) {
  const visual = pickVisual(
    `${topicTitle} ${sectionTitle || ""}`
  )

  const displayTitle =
    mode === "hero"
      ? visual.title
      : sectionTitle || visual.title

  if (mode === "hero") {
    return (
      <div className="rounded-[30px] border border-white/10 bg-white/5 p-4 backdrop-blur-sm">
        <div className="overflow-hidden rounded-[26px] border border-[#CDEAF4] bg-[#F4FBFE] p-4">
          <IllustrationPanel visual={visual} />

          <div className="px-2 pb-2 pt-5">
            <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#168BC4]">
              {visual.eyebrow}
            </p>

            <p className="mt-2 text-sm font-semibold leading-6 text-[#071B49]">
              {standard || "Accounting & Financial Reporting"}
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="overflow-hidden rounded-[26px] border border-[#D7EAF2] bg-[#F8FCFE]">
      <div className="grid gap-6 p-5 md:grid-cols-[190px_minmax(0,1fr)] md:p-6">
        <IllustrationPanel visual={visual} />

        <div className="flex flex-col justify-center">
          <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#168BC4]">
            {visual.eyebrow}
          </p>

          <h3 className="mt-2 text-lg font-semibold leading-7 text-[#071B49]">
            {displayTitle}
          </h3>

          <div className="mt-5 flex flex-wrap items-center gap-2">
            {visual.nodes.map((node, index) => (
              <span
                key={`${node}-${index}`}
                className="inline-flex items-center gap-2"
              >
                <span className="rounded-full border border-[#BFE8F6] bg-white px-3 py-1.5 text-xs font-semibold text-[#102A5F] shadow-sm">
                  {node}
                </span>

                {index < visual.nodes.length - 1 && (
                  <span className="text-[#35B5E5]">
                    →
                  </span>
                )}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}