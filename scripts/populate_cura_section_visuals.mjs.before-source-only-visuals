import { createClient } from "@supabase/supabase-js"
import process from "node:process"

const url =
  process.env.NEXT_PUBLIC_SUPABASE_URL

const key =
  process.env.SUPABASE_SERVICE_ROLE_KEY ||
  process.env.SUPABASE_SERVICE_KEY

if (!url) {
  throw new Error(
    "NEXT_PUBLIC_SUPABASE_URL is missing."
  )
}

if (!key) {
  throw new Error(
    "SUPABASE_SERVICE_ROLE_KEY or SUPABASE_SERVICE_KEY is missing."
  )
}

const supabase =
  createClient(url, key)

function clean(value) {
  return String(value || "")
    .toLowerCase()
    .replace(/[–—-]/g, " ")
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim()
}

function visual(
  type,
  eyebrow,
  title,
  nodes,
  note = ""
) {
  return {
    type,
    eyebrow,
    title,
    nodes,
    ...(note ? { note } : {}),
  }
}

function makeVisual(section) {
  const title =
    String(section.title || "")

  const t = clean(title)

  /*
   * ==========================================================
   * IAS 41 / AGRICULTURE
   * ==========================================================
   */

  if (
    t.includes("scope") &&
    (
      t.includes("ias 41") ||
      t.includes("agriculture")
    )
  ) {
    return visual(
      "scope",
      "CURA scope decision",
      "What belongs within the agricultural accounting model?",
      [
        "Biological assets",
        "Agricultural produce",
        "Bearer plants",
        "Outside IAS 41",
      ],
      "Start with the nature and use of the asset before applying the measurement requirements."
    )
  }

  if (
    t.includes("initial measurement") &&
    (
      t.includes("biological") ||
      t.includes("asset")
    )
  ) {
    return visual(
      "measurement",
      "CURA measurement",
      "Initial measurement of a biological asset",
      [
        "Biological asset",
        "Fair value less costs to sell",
        "Recognition",
        "Gain or loss",
      ],
      "The measurement basis determines the amount initially recognised in the financial statements."
    )
  }

  if (
    t.includes("subsequent measurement") &&
    (
      t.includes("biological") ||
      t.includes("agriculture")
    )
  ) {
    return visual(
      "lifecycle",
      "CURA biological change",
      "Tracking biological transformation over time",
      [
        "Opening value",
        "Physical change",
        "Price change",
        "Costs to sell",
        "Closing value",
      ],
      "Biological transformation and changes in market conditions can affect the carrying amount."
    )
  }

  if (
    t.includes("agricultural produce") ||
    t.includes("harvest")
  ) {
    return visual(
      "flow",
      "CURA harvest transition",
      "From biological asset to agricultural produce",
      [
        "Biological asset",
        "Harvest",
        "Fair value less costs to sell",
        "IAS 2 inventory",
      ]
    )
  }

  if (
    t.includes("bearer plant")
  ) {
    return visual(
      "comparison",
      "CURA classification",
      "Bearer plants follow a different accounting path",
      [
        "Bearer plant",
        "PPE accounting",
        "Produce",
        "IAS 41 accounting",
      ],
      "The plant itself is accounted for separately from the agricultural produce growing on it."
    )
  }

  /*
   * ==========================================================
   * LEASES
   * ==========================================================
   */

  if (
    t.includes("identify") &&
    t.includes("lease")
  ) {
    return visual(
      "decision",
      "CURA lease decision",
      "Does the arrangement contain a lease?",
      [
        "Identified asset",
        "Right to obtain economic benefits",
        "Right to direct use",
      ]
    )
  }

  if (
    t.includes("right of use") ||
    t.includes("rou asset")
  ) {
    return visual(
      "flow",
      "CURA lease accounting",
      "Building the right-of-use asset",
      [
        "Lease liability",
        "Initial direct costs",
        "Prepayments",
        "Lease incentives",
        "ROU asset",
      ]
    )
  }

  if (
    t.includes("lease liability")
  ) {
    return visual(
      "measurement",
      "CURA obligation measurement",
      "From future lease payments to present obligation",
      [
        "Future payments",
        "Discount rate",
        "Present value",
        "Lease liability",
      ]
    )
  }

  if (
    t.includes("lease modification") ||
    t.includes("modification")
  ) {
    return visual(
      "flow",
      "CURA reassessment",
      "When the lease contract changes",
      [
        "Existing lease",
        "Modification",
        "Reassess",
        "Remeasure",
        "Adjusted accounting",
      ]
    )
  }

  /*
   * ==========================================================
   * REVENUE
   * ==========================================================
   */

  if (
    t.includes("performance obligation")
  ) {
    return visual(
      "flow",
      "CURA revenue model",
      "Separate the promises made to the customer",
      [
        "Customer contract",
        "Promise",
        "Distinct obligation",
        "Transfer",
      ]
    )
  }

  if (
    t.includes("transaction price")
  ) {
    return visual(
      "measurement",
      "CURA transaction price",
      "Determine the consideration for the contract",
      [
        "Fixed consideration",
        "Variable consideration",
        "Financing effects",
        "Transaction price",
      ]
    )
  }

  if (
    t.includes("allocate") &&
    t.includes("price")
  ) {
    return visual(
      "flow",
      "CURA allocation",
      "Allocate consideration to performance obligations",
      [
        "Transaction price",
        "Standalone selling prices",
        "Relative allocation",
        "Performance obligations",
      ]
    )
  }

  if (
    t.includes("recognise revenue") ||
    t.includes("revenue recognition") ||
    t.includes("recognize revenue")
  ) {
    return visual(
      "timeline",
      "CURA revenue recognition",
      "Revenue follows the transfer of control",
      [
        "Contract",
        "Obligation",
        "Control transfers",
        "Revenue",
      ]
    )
  }

  /*
   * ==========================================================
   * CONSOLIDATION
   * ==========================================================
   */

  if (
    t.includes("control")
  ) {
    return visual(
      "decision",
      "CURA consolidation decision",
      "Start consolidation with the assessment of control",
      [
        "Power",
        "Variable returns",
        "Ability to affect returns",
      ]
    )
  }

  if (
    t.includes("goodwill")
  ) {
    return visual(
      "measurement",
      "CURA acquisition accounting",
      "From acquisition consideration to goodwill",
      [
        "Consideration transferred",
        "NCI",
        "Fair value of net assets",
        "Goodwill",
      ]
    )
  }

  if (
    t.includes("non controlling interest") ||
    t.includes("non-controlling interest") ||
    t === "nci"
  ) {
    return visual(
      "comparison",
      "CURA ownership",
      "Separate parent ownership from non-controlling interest",
      [
        "Parent",
        "NCI",
        "Subsidiary",
        "Group ownership",
      ]
    )
  }

  if (
    t.includes("intra group") ||
    t.includes("intragroup") ||
    t.includes("unrealised profit") ||
    t.includes("unrealized profit")
  ) {
    return visual(
      "elimination",
      "CURA consolidation adjustment",
      "Remove transactions that are internal to the group",
      [
        "Parent",
        "Subsidiary",
        "Eliminate internal balance",
        "Remove unrealised profit",
      ]
    )
  }

  /*
   * ==========================================================
   * IMPAIRMENT
   * ==========================================================
   */

  if (
    t.includes("recoverable amount")
  ) {
    return visual(
      "measurement",
      "CURA impairment test",
      "Determine the recoverable amount",
      [
        "Carrying amount",
        "Fair value less costs of disposal",
        "Value in use",
        "Recoverable amount",
      ]
    )
  }

  if (
    t.includes("impairment indicator") ||
    t.includes("indicators of impairment")
  ) {
    return visual(
      "decision",
      "CURA impairment decision",
      "When should an impairment test be performed?",
      [
        "External indicators",
        "Internal indicators",
        "Impairment test",
      ]
    )
  }

  if (
    t.includes("cash generating unit") ||
    t.includes("cgu")
  ) {
    return visual(
      "hierarchy",
      "CURA CGU assessment",
      "Test impairment at the appropriate cash-generating unit",
      [
        "Asset",
        "CGU",
        "Recoverable amount",
        "Impairment loss",
      ]
    )
  }

  /*
   * ==========================================================
   * FINANCIAL INSTRUMENTS
   * ==========================================================
   */

  if (
    t.includes("business model") ||
    t.includes("contractual cash flows") ||
    t.includes("sppi")
  ) {
    return visual(
      "decision",
      "CURA classification",
      "Classify the financial asset before measuring it",
      [
        "Business model",
        "Contractual cash flows",
        "SPPI",
      ]
    )
  }

  if (
    t.includes("amortised cost") ||
    t.includes("amortized cost")
  ) {
    return visual(
      "timeline",
      "CURA effective interest",
      "Track an asset using the effective interest method",
      [
        "Opening amount",
        "Effective interest",
        "Cash received",
        "Closing amount",
      ]
    )
  }

  if (
    t.includes("expected credit loss") ||
    t.includes("ecl")
  ) {
    return visual(
      "flow",
      "CURA credit risk",
      "From credit exposure to expected credit loss",
      [
        "Exposure",
        "Credit risk",
        "Probability of loss",
        "Expected credit loss",
      ]
    )
  }

  /*
   * ==========================================================
   * INVENTORIES
   * ==========================================================
   */

  if (
    t.includes("net realisable value") ||
    t.includes("net realizable value") ||
    t.includes("nrv")
  ) {
    return visual(
      "comparison",
      "CURA inventory test",
      "Compare cost with net realisable value",
      [
        "Cost",
        "NRV",
        "Lower amount",
        "Write-down",
      ]
    )
  }

  if (
    t.includes("inventory") ||
    t.includes("inventories")
  ) {
    return visual(
      "flow",
      "CURA inventory measurement",
      "Build the cost of inventory",
      [
        "Purchase costs",
        "Conversion costs",
        "Other attributable costs",
        "Inventory cost",
      ]
    )
  }

  /*
   * ==========================================================
   * PPE
   * ==========================================================
   */

  if (
    t.includes("component")
  ) {
    return visual(
      "comparison",
      "CURA component accounting",
      "Separate significant components with different useful lives",
      [
        "Whole asset",
        "Component A",
        "Component B",
        "Separate depreciation",
      ]
    )
  }

  if (
    t.includes("depreciation") ||
    t.includes("useful life") ||
    t.includes("residual value")
  ) {
    return visual(
      "timeline",
      "CURA depreciation",
      "Allocate the depreciable amount over useful life",
      [
        "Cost",
        "Residual value",
        "Depreciable amount",
        "Useful life",
        "Depreciation",
      ]
    )
  }

  /*
   * ==========================================================
   * TAXATION
   * ==========================================================
   */

  if (
    t.includes("temporary difference") ||
    t.includes("tax base")
  ) {
    return visual(
      "comparison",
      "CURA deferred tax",
      "Compare carrying amount with tax base",
      [
        "Carrying amount",
        "Tax base",
        "Temporary difference",
        "Deferred tax",
      ]
    )
  }

  if (
    t.includes("current tax") ||
    t.includes("taxable profit")
  ) {
    return visual(
      "flow",
      "CURA current tax",
      "From accounting profit to current tax",
      [
        "Accounting profit",
        "Tax adjustments",
        "Taxable profit",
        "Current tax",
      ]
    )
  }

  if (
    t.includes("deferred tax")
  ) {
    return visual(
      "flow",
      "CURA future tax effect",
      "Recognising future tax consequences",
      [
        "Temporary difference",
        "Tax rate",
        "Deferred tax",
        "Financial statements",
      ]
    )
  }

  /*
   * ==========================================================
   * CASH FLOWS
   * ==========================================================
   */

  if (
    t.includes("operating activities") ||
    t.includes("investing activities") ||
    t.includes("financing activities")
  ) {
    return visual(
      "cashflow",
      "CURA cash flow statement",
      "Classify cash movements by activity",
      [
        "Operating",
        "Investing",
        "Financing",
      ]
    )
  }

  if (
    t.includes("cash flow")
  ) {
    return visual(
      "flow",
      "CURA cash flow",
      "From business activity to movement in cash",
      [
        "Opening cash",
        "Operating",
        "Investing",
        "Financing",
        "Closing cash",
      ]
    )
  }

  /*
   * ==========================================================
   * FAIR VALUE
   * ==========================================================
   */

  if (
    t.includes("fair value hierarchy") ||
    t.includes("level 1") ||
    t.includes("level 2") ||
    t.includes("level 3")
  ) {
    return visual(
      "hierarchy",
      "CURA fair value hierarchy",
      "Use the highest-priority observable inputs available",
      [
        "Level 1",
        "Level 2",
        "Level 3",
        "Disclosure",
      ]
    )
  }

  if (
    t.includes("fair value") ||
    t.includes("valuation")
  ) {
    return visual(
      "comparison",
      "CURA valuation",
      "Choose the appropriate valuation approach",
      [
        "Market approach",
        "Income approach",
        "Cost approach",
        "Fair value",
      ]
    )
  }

  /*
   * ==========================================================
   * EPS
   * ==========================================================
   */

  if (
    t.includes("basic eps") ||
    t.includes("basic earnings per share")
  ) {
    return visual(
      "measurement",
      "CURA EPS",
      "Basic earnings per share",
      [
        "Profit attributable",
        "Weighted average shares",
        "Basic EPS",
      ]
    )
  }

  if (
    t.includes("diluted eps") ||
    t.includes("dilution")
  ) {
    return visual(
      "comparison",
      "CURA diluted EPS",
      "Assess the effect of potential ordinary shares",
      [
        "Basic EPS",
        "Potential shares",
        "Dilution",
        "Diluted EPS",
      ]
    )
  }

  /*
   * ==========================================================
   * INTANGIBLES
   * ==========================================================
   */

  if (
    t.includes("research") ||
    t.includes("development")
  ) {
    return visual(
      "decision",
      "CURA intangible assets",
      "Separate research expenditure from development expenditure",
      [
        "Research",
        "Development criteria",
        "Recognition",
      ]
    )
  }

  if (
    t.includes("intangible") ||
    t.includes("amortisation") ||
    t.includes("amortization")
  ) {
    return visual(
      "timeline",
      "CURA intangible assets",
      "Allocate an intangible asset over its useful life",
      [
        "Initial recognition",
        "Useful life",
        "Amortisation",
        "Carrying amount",
      ]
    )
  }

  /*
   * ==========================================================
   * INVESTMENT PROPERTY
   * ==========================================================
   */

  if (
    t.includes("investment property")
  ) {
    if (
      t.includes("classification") ||
      t.includes("owner occupied")
    ) {
      return visual(
        "decision",
        "CURA property classification",
        "Determine whether the property is investment property",
        [
          "Owner occupied",
          "Rental / capital appreciation",
          "Investment property",
        ]
      )
    }

    return visual(
      "comparison",
      "CURA investment property",
      "Choose the subsequent measurement model",
      [
        "Cost model",
        "Fair value model",
        "Measurement",
        "Financial statements",
      ]
    )
  }

  /*
   * ==========================================================
   * GOVERNMENT GRANTS
   * ==========================================================
   */

  if (
    t.includes("government grant") ||
    t.includes("government grants")
  ) {
    return visual(
      "decision",
      "CURA government grants",
      "Recognition follows reasonable assurance and conditions",
      [
        "Grant",
        "Conditions",
        "Reasonable assurance",
        "Recognition",
      ]
    )
  }

  /*
   * ==========================================================
   * IAS 37
   * ==========================================================
   */

  if (
    t.includes("provision")
  ) {
    return visual(
      "decision",
      "CURA IAS 37",
      "When does an obligation meet the recognition criteria?",
      [
        "Present obligation",
        "Probable outflow",
        "Reliable estimate",
      ]
    )
  }

  if (
    t.includes("contingent liability")
  ) {
    return visual(
      "comparison",
      "CURA IAS 37",
      "Recognise or disclose?",
      [
        "Present obligation",
        "Possible obligation",
        "Recognition",
        "Disclosure",
      ]
    )
  }

  /*
   * ==========================================================
   * IAS 10
   * ==========================================================
   */

  if (
    t.includes("adjusting event") ||
    t.includes("non adjusting") ||
    t.includes("events after")
  ) {
    return visual(
      "decision",
      "CURA reporting date",
      "Does the event provide evidence about conditions at reporting date?",
      [
        "Event after reporting date",
        "Condition existed at reporting date",
        "Adjust",
      ]
    )
  }

  /*
   * ==========================================================
   * GENERAL ACCOUNTING FALLBACK
   * ==========================================================
   */

  if (
    t.includes("recognition")
  ) {
    return visual(
      "flow",
      "CURA recognition",
      "From an accounting condition to recognition",
      [
        "Identify",
        "Recognition criteria",
        "Recognise",
        "Measure",
      ]
    )
  }

  if (
    t.includes("measurement")
  ) {
    return visual(
      "measurement",
      "CURA measurement",
      "Choose the appropriate measurement basis",
      [
        "Accounting item",
        "Measurement basis",
        "Amount recognised",
      ]
    )
  }

  if (
    t.includes("classification")
  ) {
    return visual(
      "decision",
      "CURA classification",
      "Classify the item before applying measurement",
      [
        "Economic substance",
        "Classification criteria",
        "Accounting treatment",
      ]
    )
  }

  /*
   * ==========================================================
   * GENERIC BUT STILL EDUCATIONAL
   * ==========================================================
   */

  return visual(
    "flow",
    "CURA accounting decision",
    `Understanding ${title}`,
    [
      "Identify the issue",
      "Apply the principle",
      "Recognise",
      "Measure",
      "Present / disclose",
    ],
    "Use the accounting principle first, then apply it to the facts of the transaction."
  )
}

let from = 0
const pageSize = 500
let total = 0

while (true) {
  const {
    data,
    error,
  } = await supabase
    .from("education_sections")
    .select("id,title,presentation")
    .eq("is_published", true)
    .order("id", {
      ascending: true,
    })
    .range(
      from,
      from + pageSize - 1
    )

  if (error) {
    throw error
  }

  if (!data || data.length === 0) {
    break
  }

  for (const section of data) {
    const existing =
      section.presentation &&
      typeof section.presentation === "object"
        ? section.presentation
        : {}

    const curaVisual =
      makeVisual(section)

    const updated = {
      ...existing,
      cura_visual: curaVisual,
    }

    const {
      error: updateError,
    } = await supabase
      .from("education_sections")
      .update({
        presentation: updated,
      })
      .eq("id", section.id)

    if (updateError) {
      throw updateError
    }

    total += 1

    if (total % 50 === 0) {
      console.log(
        `Updated ${total} sections...`
      )
    }
  }

  if (data.length < pageSize) {
    break
  }

  from += pageSize
}

console.log(
  `Completed CURA visual definitions for ${total} sections.`
)
