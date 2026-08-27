import fs from "fs"

const url = process.env.NEXT_PUBLIC_SUPABASE_URL
const key =
  process.env.SUPABASE_SERVICE_ROLE_KEY ||
  process.env.SUPABASE_SERVICE_KEY

if (!url || !key) {
  throw new Error(
    "Supabase environment variables are missing. Run: set -a; source .env.local; set +a"
  )
}

const headers = {
  apikey: key,
  Authorization: `Bearer ${key}`,
  "Content-Type": "application/json",
}

async function get(path) {
  const r = await fetch(`${url}/rest/v1/${path}`, {
    headers,
  })

  if (!r.ok) {
    throw new Error(`${r.status} ${await r.text()}`)
  }

  return r.json()
}

async function patch(path, body) {
  const r = await fetch(`${url}/rest/v1/${path}`, {
    method: "PATCH",
    headers: {
      ...headers,
      Prefer: "return=minimal",
    },
    body: JSON.stringify(body),
  })

  if (!r.ok) {
    throw new Error(`${r.status} ${await r.text()}`)
  }
}

const NAVY = "#071B3A"
const BLUE = "#145D8F"
const CYAN = "#24B8ED"
const LIGHT = "#F5F8FB"
const BORDER = "#DFE7EF"

function base(visual, layout = "cura-section") {
  return {
    font: "Geist Sans",
    theme: "cura-professional",
    colors: {
      blue: BLUE,
      cyan: CYAN,
      navy: NAVY,
      light: LIGHT,
      border: BORDER,
    },
    responsive: true,
    layout,
    cura_visual: visual,
    heading_style: "cura-editorial",
    section_spacing: "comfortable",
  }
}

function clean(s) {
  return String(s || "")
    .replace(/\s+/g, " ")
    .trim()
}

function classify(title, content = "") {
  const t = `${title} ${content}`.toLowerCase()

  if (
    /example|illustration|scenario|calculation|worked example/.test(t)
  ) {
    return "example"
  }

  if (
    /recognition|recognise|recognize|criteria|control|identif/.test(t)
  ) {
    return "decision"
  }

  if (
    /initial measurement|subsequent measurement|measurement|valuation|fair value|tax base|recoverable amount/.test(
      t
    )
  ) {
    return "measurement"
  }

  if (
    /depreciation|amortisation|amortization|movement|roll-forward|year-on-year|over time|useful life/.test(
      t
    )
  ) {
    return "timeline"
  }

  if (
    /journal|double entry|debit|credit|accounting entry/.test(t)
  ) {
    return "journal"
  }

  if (
    /classification|classify|types|approach|models|methods|scope|outside the scope|distinguish|difference|versus| vs /.test(
      t
    )
  ) {
    return "comparison"
  }

  if (
    /process|steps|mechanics|procedure|accounting for|treatment|how to/.test(
      t
    )
  ) {
    return "process"
  }

  if (
    /disclosure|presentation|financial statements/.test(t)
  ) {
    return "matrix"
  }

  return "process"
}

function visualFor(topic, title, content) {
  const t = clean(title)
  const lower = `${t} ${content}`.toLowerCase()
  const topicTitle = clean(topic.title)

  /* ==========================================================
     AGRICULTURE — retain the stronger existing visual system
     ========================================================== */

  if (topic.slug === "agriculture") {
    if (/^examples?$/i.test(t)) {
      return {
        ...base({
          type: "example",
          eyebrow: "CURA worked example",
          title: "Apply IAS 41 to the facts",
          nodes: [
            "Facts of the agricultural activity",
            "Identify the biological asset",
            "Apply IAS 41 recognition",
            "Measure at fair value less costs to sell",
            "Recognise the resulting gain or loss",
          ],
          note:
            "The example should be read together with the detailed scenario and accounting treatment below.",
        }),
      }
    }

    if (/biological assets$/i.test(t)) {
      return {
        ...base({
          type: "decision",
          eyebrow: "CURA recognition",
          title: "When is a biological asset recognised?",
          nodes: [
            "Entity controls the asset",
            "Future economic benefits are probable",
            "Cost or fair value can be measured reliably",
            "Recognise the biological asset",
          ],
        }),
      }
    }

    if (/initial measurement/i.test(t)) {
      return {
        ...base({
          type: "measurement",
          eyebrow: "CURA initial measurement",
          title: "Initial measurement of a biological asset",
          nodes: [
            "Fair value",
            "Less: costs to sell",
            "Fair value less costs to sell",
            "Gain or loss in profit or loss",
          ],
        }),
      }
    }

    if (/subsequent measurement/i.test(t)) {
      return {
        ...base({
          type: "timeline",
          eyebrow: "CURA subsequent measurement",
          title: "Why the carrying amount changes",
          nodes: [
            "Opening fair value less costs to sell",
            "Physical transformation",
            "Market price movement",
            "Costs to sell",
            "Closing fair value less costs to sell",
            "Gain or loss → profit or loss",
          ],
        }),
      }
    }

    if (/agricultural produce/i.test(t)) {
      return {
        ...base({
          type: "process",
          eyebrow: "CURA harvest point",
          title: "The accounting handover at harvest",
          nodes: [
            "Biological asset",
            "Harvest point",
            "Fair value less costs to sell",
            "Becomes inventory",
            "IAS 2 applies",
          ],
        }),
      }
    }

    if (/bearer plants/i.test(t)) {
      return {
        ...base({
          type: "comparison",
          eyebrow: "CURA classification",
          title: "One plant, two accounting treatments",
          nodes: [
            "Bearer plant → IAS 16 PPE",
            "Produce growing on it → IAS 41",
            "Harvest → IAS 2 inventory",
          ],
        }),
      }
    }

    if (/outside the scope/i.test(t)) {
      return {
        ...base({
          type: "comparison",
          eyebrow: "CURA boundary",
          title: "Separate items outside IAS 41",
          nodes: [
            "Land → IAS 16",
            "Bearer plants → IAS 16",
            "Production quotas / intangibles → IAS 38",
            "Biological assets → IAS 41",
          ],
        }),
      }
    }

    if (/government grants/i.test(t)) {
      return {
        ...base({
          type: "decision",
          eyebrow: "CURA government grants",
          title: "Grant recognition depends on conditions",
          nodes: [
            "Identify the biological asset",
            "Determine the measurement model",
            "Assess whether the grant is conditional",
            "Recognise income when the applicable criteria are met",
          ],
        }),
      }
    }
  }

  /* ==========================================================
     LEASES
     ========================================================== */

  if (topic.slug === "leases") {
    if (/identifying a lease/i.test(t)) {
      return {
        ...base({
          type: "decision",
          eyebrow: "CURA lease decision",
          title: "Does the arrangement contain a lease?",
          nodes: [
            "Identified asset",
            "Right to obtain economic benefits",
            "Right to direct use",
            "Lease exists",
          ],
        }),
      }
    }

    if (/lease liability/i.test(t)) {
      return {
        ...base({
          type: "measurement",
          eyebrow: "CURA obligation measurement",
          title: "From future payments to lease liability",
          nodes: [
            "Future lease payments",
            "Discount rate",
            "Present value",
            "Lease liability",
          ],
        }),
      }
    }

    if (/right-of-use asset/i.test(t)) {
      return {
        ...base({
          type: "process",
          eyebrow: "CURA lease accounting",
          title: "Building the right-of-use asset",
          nodes: [
            "Lease liability",
            "Initial direct costs",
            "Prepayments",
            "Less: lease incentives",
            "Right-of-use asset",
          ],
        }),
      }
    }

    if (/subsequent measurement/i.test(t)) {
      return {
        ...base({
          type: "timeline",
          eyebrow: "CURA subsequent measurement",
          title: "How a lease changes after commencement",
          nodes: [
            "Opening lease liability",
            "Interest expense",
            "Lease payments",
            "Closing lease liability",
            "ROU asset depreciation",
          ],
        }),
      }
    }

    if (/sale and leaseback/i.test(t)) {
      return {
        ...base({
          type: "decision",
          eyebrow: "CURA sale and leaseback",
          title: "Start with the transfer of the asset",
          nodes: [
            "Does a sale occur?",
            "Apply IFRS 15",
            "Measure the resulting lease",
            "Recognise the appropriate gain or loss",
          ],
        }),
      }
    }
  }

  /* ==========================================================
     REVENUE
     ========================================================== */

  if (topic.slug === "revenue") {
    if (/identify the contract/i.test(t)) {
      return {
        ...base({
          type: "decision",
          eyebrow: "CURA revenue model",
          title: "Step 1 — Identify the contract",
          nodes: [
            "Approved arrangement",
            "Rights identified",
            "Payment terms identified",
            "Commercial substance",
            "Collectability probable",
          ],
        }),
      }
    }

    if (/performance obligations/i.test(t)) {
      return {
        ...base({
          type: "decision",
          eyebrow: "CURA revenue model",
          title: "Step 2 — Identify separate performance obligations",
          nodes: [
            "Identify promises",
            "Assess whether each promise is distinct",
            "Separate performance obligations",
            "Allocate consideration",
          ],
        }),
      }
    }

    if (/transaction price/i.test(t)) {
      return {
        ...base({
          type: "measurement",
          eyebrow: "CURA transaction price",
          title: "Step 3 — Determine the transaction price",
          nodes: [
            "Fixed consideration",
            "Variable consideration",
            "Financing effects",
            "Consideration payable to customer",
            "Transaction price",
          ],
        }),
      }
    }

    if (/allocate the transaction price/i.test(t)) {
      return {
        ...base({
          type: "process",
          eyebrow: "CURA revenue allocation",
          title: "Step 4 — Allocate the transaction price",
          nodes: [
            "Transaction price",
            "Determine stand-alone selling prices",
            "Calculate allocation proportions",
            "Allocate to performance obligations",
          ],
        }),
      }
    }

    if (/recognize revenue|recognise revenue|performance obligation satisfied/i.test(t)) {
      return {
        ...base({
          type: "timeline",
          eyebrow: "CURA revenue recognition",
          title: "Step 5 — Recognise revenue",
          nodes: [
            "Performance obligation identified",
            "Determine whether satisfied over time",
            "Or satisfied at a point in time",
            "Recognise revenue as control transfers",
          ],
        }),
      }
    }

    if (/consignment/i.test(t)) {
      return {
        ...base({
          type: "decision",
          eyebrow: "CURA consignment",
          title: "Has control transferred to the customer?",
          nodes: [
            "Goods delivered",
            "Customer obtains control?",
            "Consignment indicators assessed",
            "Revenue recognised only when control transfers",
          ],
        }),
      }
    }

    if (/repurchase/i.test(t)) {
      return {
        ...base({
          type: "decision",
          eyebrow: "CURA repurchase arrangement",
          title: "Determine the substance of the repurchase arrangement",
          nodes: [
            "Identify the repurchase right or obligation",
            "Assess the customer's control",
            "Determine the applicable accounting",
            "Recognise revenue only when appropriate",
          ],
        }),
      }
    }
  }

  /* ==========================================================
     TAXATION
     ========================================================== */

  if (topic.slug === "taxation") {
    if (/current tax estimate/i.test(t)) {
      return {
        ...base({
          type: "measurement",
          eyebrow: "CURA current tax",
          title: "From accounting profit to current tax",
          nodes: [
            "Accounting profit",
            "Tax adjustments",
            "Taxable profit",
            "Applicable tax rate",
            "Current tax",
          ],
        }),
      }
    }

    if (/temporary difference/i.test(t)) {
      return {
        ...base({
          type: "comparison",
          eyebrow: "CURA deferred tax",
          title: "Compare carrying amount with tax base",
          nodes: [
            "Carrying amount",
            "Tax base",
            "Temporary difference",
            "Tax rate",
            "Deferred tax",
          ],
        }),
      }
    }

    if (/tax base/i.test(t)) {
      return {
        ...base({
          type: "comparison",
          eyebrow: "CURA tax base",
          title: "Determine the tax base",
          nodes: [
            "Carrying amount",
            "Future economic benefits",
            "Future tax deductions",
            "Tax base",
          ],
        }),
      }
    }

    if (/double entry/i.test(t)) {
      return {
        ...base({
          type: "journal",
          eyebrow: "CURA accounting entry",
          title: "Deferred tax double entry",
          nodes: [
            "Identify the deferred tax movement",
            "Determine whether it is an asset or liability",
            "Recognise the corresponding debit",
            "Recognise the corresponding credit",
          ],
        }),
      }
    }
  }

  /* ==========================================================
     INTANGIBLE ASSETS
     ========================================================== */

  if (topic.slug === "intangible-assets") {
    if (/research and development/i.test(t)) {
      return {
        ...base({
          type: "decision",
          eyebrow: "CURA recognition",
          title: "Separate research from development",
          nodes: [
            "Research phase",
            "Development phase",
            "Development criteria satisfied?",
            "Recognise an intangible asset",
          ],
        }),
      }
    }

    if (/initial measurement/i.test(t)) {
      return {
        ...base({
          type: "measurement",
          eyebrow: "CURA measurement",
          title: "Initial measurement of an intangible asset",
          nodes: [
            "Cost of acquisition",
            "Directly attributable costs",
            "Measurement adjustments",
            "Initial carrying amount",
          ],
        }),
      }
    }

    if (/amortization|amortisation/i.test(t)) {
      return {
        ...base({
          type: "timeline",
          eyebrow: "CURA amortisation",
          title: "Allocate the depreciable amount over useful life",
          nodes: [
            "Initial carrying amount",
            "Determine useful life",
            "Determine residual value",
            "Systematic amortisation",
            "Closing carrying amount",
          ],
        }),
      }
    }

    if (/revaluation model/i.test(t)) {
      return {
        ...base({
          type: "comparison",
          eyebrow: "CURA revaluation",
          title: "Cost model versus revaluation model",
          nodes: [
            "Cost model",
            "Revaluation model",
            "Active market requirement",
            "Subsequent carrying amount",
          ],
        }),
      }
    }
  }

  /* ==========================================================
     IMPAIRMENT
     ========================================================== */

  if (topic.slug === "impairment-of-assets") {
    if (/when is an asset impaired|indicators/i.test(t)) {
      return {
        ...base({
          type: "decision",
          eyebrow: "CURA impairment test",
          title: "When should impairment be considered?",
          nodes: [
            "External indicators",
            "Internal indicators",
            "Indication of impairment",
            "Perform impairment test",
          ],
        }),
      }
    }

    if (/recoverable amount/i.test(t)) {
      return {
        ...base({
          type: "measurement",
          eyebrow: "CURA impairment measurement",
          title: "Determine recoverable amount",
          nodes: [
            "Fair value less costs of disposal",
            "Value in use",
            "Choose the higher amount",
            "Recoverable amount",
          ],
        }),
      }
    }

    if (/reversal/i.test(t)) {
      return {
        ...base({
          type: "decision",
          eyebrow: "CURA impairment reversal",
          title: "Can the impairment loss be reversed?",
          nodes: [
            "New impairment indicators",
            "Recoverable amount reassessed",
            "Compare with carrying amount",
            "Recognise reversal where permitted",
          ],
        }),
      }
    }

    if (/cash generating unit|cgu/i.test(t)) {
      return {
        ...base({
          type: "process",
          eyebrow: "CURA CGU",
          title: "Test a cash-generating unit for impairment",
          nodes: [
            "Identify the CGU",
            "Allocate relevant assets",
            "Determine recoverable amount",
            "Compare with carrying amount",
            "Recognise impairment loss",
          ],
        }),
      }
    }
  }

  /* ==========================================================
     INVENTORIES
     ========================================================== */

  if (topic.slug === "inventories") {
    if (/measurement|valuation/i.test(t)) {
      return {
        ...base({
          type: "measurement",
          eyebrow: "CURA inventory measurement",
          title: "Measure inventory at the lower amount",
          nodes: [
            "Cost",
            "Net realisable value",
            "Compare the two",
            "Lower amount",
            "Inventory carrying amount",
          ],
        }),
      }
    }

    if (/definition of cost/i.test(t)) {
      return {
        ...base({
          type: "process",
          eyebrow: "CURA inventory cost",
          title: "Build the cost of inventory",
          nodes: [
            "Purchase costs",
            "Conversion costs",
            "Other attributable costs",
            "Inventory cost",
          ],
        }),
      }
    }
  }

  /* ==========================================================
     INVESTMENT PROPERTY
     ========================================================== */

  if (topic.slug === "investment-property") {
    if (/definition|investment property$/i.test(t)) {
      return {
        ...base({
          type: "decision",
          eyebrow: "CURA classification",
          title: "Is the property investment property?",
          nodes: [
            "Property identified",
            "Held for rentals or capital appreciation",
            "Not owner-occupied",
            "IAS 40 applies",
          ],
        }),
      }
    }

    if (/initial measurement/i.test(t)) {
      return {
        ...base({
          type: "measurement",
          eyebrow: "CURA initial measurement",
          title: "Initial measurement of investment property",
          nodes: [
            "Purchase price",
            "Transaction costs",
            "Directly attributable costs",
            "Initial carrying amount",
          ],
        }),
      }
    }

    if (/subsequent measurement|fair value model|cost model/i.test(t)) {
      return {
        ...base({
          type: "comparison",
          eyebrow: "CURA subsequent measurement",
          title: "Choose the subsequent measurement model",
          nodes: [
            "Cost model",
            "Fair value model",
            "Apply the selected model consistently",
            "Recognise resulting movements appropriately",
          ],
        }),
      }
    }
  }

  /* ==========================================================
     EMPLOYEE BENEFITS
     ========================================================== */

  if (topic.slug === "employee-benefits") {
    if (/defined contribution/i.test(t)) {
      return {
        ...base({
          type: "process",
          eyebrow: "CURA employee benefits",
          title: "Defined contribution accounting",
          nodes: [
            "Employee service",
            "Employer contribution",
            "Contribution recognised as expense",
            "No further obligation after contribution",
          ],
        }),
      }
    }

    if (/defined benefit/i.test(t)) {
      return {
        ...base({
          type: "measurement",
          eyebrow: "CURA defined benefit",
          title: "Measure the defined benefit obligation",
          nodes: [
            "Present value of obligation",
            "Fair value of plan assets",
            "Net defined benefit position",
            "Recognise the resulting amount",
          ],
        }),
      }
    }

    if (/year-on-year movement/i.test(t)) {
      return {
        ...base({
          type: "timeline",
          eyebrow: "CURA defined benefit movement",
          title: "Explain the year-on-year movement",
          nodes: [
            "Opening net position",
            "Service cost",
            "Net interest",
            "Contributions",
            "Benefits paid",
            "Remeasurement",
            "Closing net position",
          ],
        }),
      }
    }

    if (/asset ceiling/i.test(t)) {
      return {
        ...base({
          type: "decision",
          eyebrow: "CURA asset ceiling",
          title: "Apply the asset ceiling",
          nodes: [
            "Determine surplus",
            "Assess economic benefits available",
            "Apply asset ceiling",
            "Recognise permitted net asset",
          ],
        }),
      }
    }
  }

  /* ==========================================================
     FINANCIAL ASSETS / LIABILITIES
     ========================================================== */

  if (topic.slug === "financial-assets-and-financial-liabilities") {
    if (/classification/i.test(t)) {
      return {
        ...base({
          type: "decision",
          eyebrow: "CURA classification",
          title: "Classify the financial instrument",
          nodes: [
            "Identify the contractual terms",
            "Assess business model",
            "Assess contractual cash-flow characteristics",
            "Determine measurement category",
          ],
        }),
      }
    }

    if (/initial recognition/i.test(t)) {
      return {
        ...base({
          type: "process",
          eyebrow: "CURA initial recognition",
          title: "Initial recognition of a financial instrument",
          nodes: [
            "Become party to contractual provisions",
            "Identify the financial instrument",
            "Apply initial measurement",
            "Recognise the instrument",
          ],
        }),
      }
    }

    if (/amortized cost/i.test(t)) {
      return {
        ...base({
          type: "measurement",
          eyebrow: "CURA amortised cost",
          title: "Amortised cost measurement",
          nodes: [
            "Initial carrying amount",
            "Effective interest",
            "Cash flows",
            "Impairment effects",
            "Closing amortised cost",
          ],
        }),
      }
    }

    if (/fvoci|fvtpl|equity instruments/i.test(t)) {
      return {
        ...base({
          type: "comparison",
          eyebrow: "CURA financial instruments",
          title: "Choose the appropriate measurement category",
          nodes: [
            "Amortised cost",
            "FVOCI",
            "FVTPL",
            "Apply the relevant subsequent measurement",
          ],
        }),
      }
    }

    if (/derecognition/i.test(t)) {
      return {
        ...base({
          type: "decision",
          eyebrow: "CURA derecognition",
          title: "When is a financial instrument derecognised?",
          nodes: [
            "Identify the asset or liability",
            "Assess whether contractual rights expire",
            "Assess whether risks and rewards/control transfer",
            "Derecognise where criteria are met",
          ],
        }),
      }
    }
  }

  /* ==========================================================
     FOREIGN CURRENCY
     ========================================================== */

  if (topic.slug === "foreign-currency") {
    if (/functional currency/i.test(t)) {
      return {
        ...base({
          type: "decision",
          eyebrow: "CURA IAS 21",
          title: "Determine the functional currency",
          nodes: [
            "Primary economic environment",
            "Currency influencing sales prices",
            "Currency influencing costs",
            "Functional currency",
          ],
        }),
      }
    }

    if (/translat|unsettled transaction|non-monetary/i.test(t)) {
      return {
        ...base({
          type: "timeline",
          eyebrow: "CURA foreign currency",
          title: "Follow the transaction through the reporting date",
          nodes: [
            "Transaction date",
            "Initial exchange rate",
            "Reporting date",
            "Settlement date",
            "Exchange difference",
          ],
        }),
      }
    }
  }

  /* ==========================================================
     BORROWING COST
     ========================================================== */

  if (topic.slug === "borrowing-cost") {
    if (/commencement/i.test(t)) {
      return {
        ...base({
          type: "decision",
          eyebrow: "CURA IAS 23",
          title: "When does capitalisation begin?",
          nodes: [
            "Expenditure incurred",
            "Borrowing costs incurred",
            "Activities necessary to prepare the asset are underway",
            "Capitalisation begins",
          ],
        }),
      }
    }

    if (/rate of interest/i.test(t)) {
      return {
        ...base({
          type: "measurement",
          eyebrow: "CURA IAS 23",
          title: "Determine the borrowing cost to capitalise",
          nodes: [
            "Relevant expenditure",
            "Applicable interest rate",
            "Capitalisation period",
            "Borrowing costs capitalised",
          ],
        }),
      }
    }

    if (/cessation/i.test(t)) {
      return {
        ...base({
          type: "decision",
          eyebrow: "CURA IAS 23",
          title: "When does capitalisation stop?",
          nodes: [
            "Asset substantially complete",
            "Necessary activities completed",
            "Capitalisation ceases",
            "Subsequent borrowing costs → expense",
          ],
        }),
      }
    }
  }

  /* ==========================================================
     GOVERNMENT GRANTS
     ========================================================== */

  if (topic.slug === "accounting-for-government-grants") {
    if (/recognition/i.test(t)) {
      return {
        ...base({
          type: "decision",
          eyebrow: "CURA IAS 20",
          title: "When is a government grant recognised?",
          nodes: [
            "Government assistance identified",
            "Reasonable assurance obtained",
            "Conditions assessed",
            "Recognise the grant",
          ],
        }),
      }
    }

    if (/capital grants/i.test(t)) {
      return {
        ...base({
          type: "comparison",
          eyebrow: "CURA IAS 20",
          title: "Presenting a grant related to assets",
          nodes: [
            "Deferred income approach",
            "Deduct from asset carrying amount",
            "Systematic recognition",
            "Match with related costs",
          ],
        }),
      }
    }

    if (/revenue grants/i.test(t)) {
      return {
        ...base({
          type: "process",
          eyebrow: "CURA IAS 20",
          title: "Recognise a grant related to income",
          nodes: [
            "Grant recognised",
            "Identify related costs",
            "Recognise systematically",
            "Present with the related expense",
          ],
        }),
      }
    }

    if (/repayment/i.test(t)) {
      return {
        ...base({
          type: "decision",
          eyebrow: "CURA IAS 20",
          title: "Account for repayment of a government grant",
          nodes: [
            "Repayment obligation arises",
            "Reverse deferred income or asset benefit",
            "Recognise any required additional loss",
            "Update future accounting",
          ],
        }),
      }
    }
  }

  /* ==========================================================
     GENERAL TOPIC-SPECIFIC RULES
     ========================================================== */

  if (/disclosure/i.test(lower)) {
    return {
      ...base({
        type: "matrix",
        eyebrow: `CURA ${topicTitle}`,
        title: `What needs to be disclosed — ${t}`,
        nodes: [
          "Accounting policy / basis",
          "Key amounts",
          "Significant judgements",
          "Relevant risks or movements",
          "Required disclosures",
        ],
      }),
    }
  }

  if (/scope/i.test(lower)) {
    return {
      ...base({
        type: "comparison",
        eyebrow: `CURA ${topicTitle}`,
        title: `Scope — ${t}`,
        nodes: [
          "Within the scope",
          "Key inclusion criteria",
          "Excluded items",
          "Other applicable standards",
        ],
      }),
    }
  }

  if (/example|illustration|scenario|calculation/i.test(lower)) {
    return {
      ...base({
        type: "example",
        eyebrow: "CURA worked example",
        title: `Apply the principle — ${t}`,
        nodes: [
          "Facts",
          "Accounting issue",
          "Applicable principle",
          "Calculation / treatment",
          "Financial statement result",
        ],
        note:
          "The diagram is a visual guide to the worked example. The detailed facts and calculations remain in the section content.",
      }),
    }
  }

  const type = classify(t, content)

  if (type === "decision") {
    return {
      ...base({
        type: "decision",
        eyebrow: `CURA ${topicTitle}`,
        title: t,
        nodes: [
          "Identify the accounting issue",
          "Assess the relevant criteria",
          "Apply the accounting principle",
          "Reach the accounting conclusion",
        ],
      }),
    }
  }

  if (type === "measurement") {
    return {
      ...base({
        type: "measurement",
        eyebrow: `CURA ${topicTitle}`,
        title: t,
        nodes: [
          "Identify the item",
          "Determine the measurement basis",
          "Apply the relevant inputs",
          "Determine the carrying amount",
        ],
      }),
    }
  }

  if (type === "timeline") {
    return {
      ...base({
        type: "timeline",
        eyebrow: `CURA ${topicTitle}`,
        title: t,
        nodes: [
          "Opening position",
          "Relevant accounting event",
          "Measurement / adjustment",
          "Closing position",
        ],
      }),
    }
  }

  if (type === "comparison") {
    return {
      ...base({
        type: "comparison",
        eyebrow: `CURA ${topicTitle}`,
        title: t,
        nodes: [
          "Identify the alternatives",
          "Compare the accounting requirements",
          "Select the applicable treatment",
          "Apply consistently",
        ],
      }),
    }
  }

  return {
    ...base({
      type: "process",
      eyebrow: `CURA ${topicTitle}`,
      title: t,
      nodes: [
        "Identify the accounting issue",
        "Determine the applicable principle",
        "Apply the accounting treatment",
        "Present the resulting accounting outcome",
      ],
    }),
  }
}

console.log("==============================================")
console.log("CURA VISUAL REBUILD")
console.log("==============================================")

const topics = await get(
  "education_topics?select=id,slug,title,category&category=eq.Accounting&order=display_order.asc"
)

if (!topics.length) {
  throw new Error("No Accounting topics were returned.")
}

let changed = 0
let skipped = 0

for (const topic of topics) {
  const sections = await get(
    `education_sections?select=id,title,section_type,display_order,presentation&topic_id=eq.${topic.id}&order=display_order.asc`
  )

  console.log(`\n${topic.title} (${topic.slug})`)

  for (const section of sections) {
    /*
      The first two sections are the CURA Learning Map
      and CURA Key Takeaways. They already have their own
      dedicated treatment and are deliberately not rebuilt.
    */

    if (
      section.display_order === 0 ||
      section.display_order === 1 ||
      section.section_type === "summary"
    ) {
      skipped++
      continue
    }

    const blocks = await get(
      `education_content_blocks?select=title,content,block_type,display_order&section_id=eq.${section.id}&order=display_order.asc`
    )

    const content = blocks
      .map((b) => `${clean(b.title)} ${clean(b.content)}`)
      .join(" ")
      .slice(0, 12000)

    const visual = visualFor(topic, section.title, content)

    const existing = section.presentation || {}

    /*
      Preserve useful existing metadata such as source_pages,
      but replace the obsolete generic visual.
    */

    const next = {
      ...existing,
      ...base(
        visual.cura_visual,
        visual.layout || "cura-section"
      ),
    }

    await patch(
      `education_sections?id=eq.${section.id}`,
      {
        presentation: next,
        updated_at: new Date().toISOString(),
      }
    )

    console.log(
      `  ✓ ${String(section.display_order).padStart(2, "0")} ${section.title} → ${visual.cura_visual.type}`
    )

    changed++
  }
}

console.log("\n==============================================")
console.log(`Updated: ${changed} substantive sections`)
console.log(`Skipped: ${skipped} summary sections`)
console.log("Supabase CURA visual rebuild completed.")
console.log("==============================================")
