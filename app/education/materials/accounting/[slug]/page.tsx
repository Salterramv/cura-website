"use client"

import Link from "next/link"
import { useParams } from "next/navigation"
import { useMemo, useState } from "react"
import CuraHeader from "@/components/CuraHeader"
import CuraFooter from "@/components/CuraFooter"

type Question = {
  id: string
  question: string
  options: string[]
  answer: number
  explanation: string
}

type Topic = {
  title: string
  standard: string
  description: string
  sections: { title: string; body: string; bullets?: string[] }[]
  keyPoints: string[]
  quiz: Question[]
}

/*
 * CURA ACCOUNTING — ALL TOPICS
 *
 * Replace:
 * app/education/materials/accounting/[slug]/page.tsx
 *
 * This single page handles all accounting topic slugs.
 * The content structure follows the uploaded FR/SBR chapter organisation:
 * Chapters 1–22, including the separate consolidation chapters.
 *
 * Quiz:
 * 1. user selects one answer for every question
 * 2. Submit Quiz becomes available only when complete
 * 3. result is calculated locally
 * 4. every question shows the user's answer, correct answer and explanation
 * 5. Retake Quiz resets the attempt
 */

const topics: Record<string, Topic> = {
  "published-accounts": {
    title: "Published Accounts",
    standard: "Financial Reporting",
    description:
      "Preparation and presentation of published financial statements, including the main financial statements and related reporting considerations.",
    sections: [
      {
        title: "Purpose of published financial statements",
        body:
          "Published financial statements communicate financial position, financial performance and cash flows to users who make economic decisions. The presentation must provide useful, understandable and comparable information.",
        bullets: [
          "Statement of financial position",
          "Statement of profit or loss and other comprehensive income",
          "Statement of changes in equity",
          "Statement of cash flows",
          "Notes and accounting policies",
        ],
      },
      {
        title: "Presentation",
        body:
          "Items are classified and presented according to the applicable IFRS requirements. Material information should be presented separately where doing so is necessary for users to understand the financial statements.",
      },
      {
        title: "Accounting policies and estimates",
        body:
          "Accounting policies are the principles and bases used in preparing financial statements. Accounting estimates involve monetary amounts subject to measurement uncertainty. Changes in estimates are generally accounted for prospectively.",
      },
    ],
    keyPoints: [
      "Published accounts communicate financial position and performance.",
      "Material information should not be obscured by aggregation.",
      "Accounting policies and estimates are different concepts.",
    ],
    quiz: [
      {
        id: "pa1",
        question: "Which statement is part of a complete set of financial statements?",
        options: [
          "Statement of changes in equity",
          "Marketing report",
          "Management bonus schedule",
          "Tax return only",
        ],
        answer: 0,
        explanation:
          "The statement of changes in equity is one of the components of a complete set of financial statements.",
      },
      {
        id: "pa2",
        question: "A change in an accounting estimate is generally accounted for:",
        options: [
          "Prospectively",
          "Always retrospectively",
          "Through share capital",
          "Only through OCI",
        ],
        answer: 0,
        explanation:
          "Changes in accounting estimates are generally recognised prospectively in the current and future periods affected.",
      },
    ],
  },

  "tangible-non-current-assets": {
    title: "Tangible Non-current Assets",
    standard: "IAS 16 / IAS 20 / IAS 23 / IAS 40",
    description:
      "Property, plant and equipment and related accounting issues including depreciation, borrowing costs, government grants and investment property.",
    sections: [
      {
        title: "IAS 16 — Property, plant and equipment",
        body:
          "PPE is recognised when future economic benefits are probable and cost can be measured reliably. Initial cost includes purchase costs and directly attributable expenditure needed to bring the asset to the location and condition necessary for intended operation.",
        bullets: [
          "Site preparation and installation",
          "Direct professional costs",
          "Initial estimate of dismantling or restoration obligations",
          "Qualifying borrowing costs",
        ],
      },
      {
        title: "Depreciation and components",
        body:
          "Significant components with different useful lives are depreciated separately. Depreciation begins when an asset is available for use and is based on depreciable amount over useful life.",
        bullets: [
          "Straight-line method",
          "Reducing-balance method",
          "Units-of-production or usage-based methods",
          "Useful life and residual value are reviewed at reporting dates",
        ],
      },
      {
        title: "Revaluation and disposal",
        body:
          "Under the revaluation model, a class of PPE is carried at revalued amount less subsequent depreciation and impairment. Revaluation movements are treated according to whether they reverse previous movements or create a new surplus or deficit. Disposal gains or losses are recognised when the asset is derecognised.",
      },
      {
        title: "Other standards",
        body:
          "The chapter material also considers government grants, borrowing costs and investment property. The applicable recognition and measurement model must be applied consistently to the relevant asset or transaction.",
      },
    ],
    keyPoints: [
      "Capitalise qualifying directly attributable costs.",
      "Depreciate significant components separately.",
      "Start depreciation when the asset is available for use.",
      "Review useful life and residual value.",
      "Apply revaluation accounting to the relevant class.",
    ],
    quiz: [
      {
        id: "tna1",
        question: "PPE is recognised when:",
        options: [
          "Future economic benefits are probable and cost is reliably measurable",
          "The asset has generated revenue",
          "The tax authority approves it",
          "The asset is fully paid for",
        ],
        answer: 0,
        explanation:
          "These are the recognition criteria for PPE.",
      },
      {
        id: "tna2",
        question: "Depreciation normally begins when PPE is:",
        options: [
          "Available for use",
          "First sold",
          "Fully paid",
          "Revalued",
        ],
        answer: 0,
        explanation:
          "Depreciation begins when the asset is in the location and condition necessary for intended operation.",
      },
      {
        id: "tna3",
        question: "A major component with a significantly different useful life should generally be:",
        options: [
          "Depreciated separately",
          "Ignored",
          "Expensed immediately",
          "Included in inventory",
        ],
        answer: 0,
        explanation:
          "Component accounting requires significant components with different useful lives to be depreciated separately.",
      },
    ],
  },

  "intangible-assets": {
    title: "Intangible Assets",
    standard: "IAS 38",
    description:
      "Recognition, measurement, research and development, useful lives, amortisation and revaluation of intangible assets.",
    sections: [
      {
        title: "Definition",
        body:
          "An intangible asset is an identifiable non-monetary asset without physical substance. Identifiability arises through separability or contractual or other legal rights.",
      },
      {
        title: "Research and development",
        body:
          "Research expenditure is expensed. Development expenditure is capitalised only once all applicable recognition criteria have been demonstrated, including technical feasibility, intention and ability to complete, resources, probable benefits and reliable measurement.",
      },
      {
        title: "Useful life",
        body:
          "Finite-life intangible assets are amortised systematically over their useful economic lives from when they are available for use. Indefinite-life intangibles are not amortised but require annual impairment testing.",
      },
    ],
    keyPoints: [
      "Research expenditure is expensed.",
      "Qualifying development expenditure is capitalised.",
      "Finite-life intangibles are amortised.",
      "Indefinite-life intangibles are tested for impairment annually.",
    ],
    quiz: [
      {
        id: "ia1",
        question: "Research expenditure is normally:",
        options: ["Expensed", "Capitalised automatically", "Recognised in equity", "Recognised as inventory"],
        answer: 0,
        explanation:
          "IAS 38 requires research expenditure to be recognised as an expense when incurred.",
      },
      {
        id: "ia2",
        question: "An indefinite-life intangible asset is:",
        options: [
          "Not amortised but tested for impairment annually",
          "Always amortised over five years",
          "Written off immediately",
          "Never tested for impairment",
        ],
        answer: 0,
        explanation:
          "Indefinite useful life does not mean infinite life; it means there is no foreseeable limit, so annual impairment testing is required.",
      },
    ],
  },

  "impairment-of-assets": {
    title: "Impairment of Assets",
    standard: "IAS 36",
    description:
      "Impairment indicators, recoverable amount, value in use, cash-generating units, goodwill and reversals.",
    sections: [
      {
        title: "Recoverable amount",
        body:
          "An asset is impaired when its carrying amount exceeds recoverable amount. Recoverable amount is the higher of fair value less costs of disposal and value in use.",
      },
      {
        title: "Value in use",
        body:
          "Value in use is based on discounted future cash flows from continuing use and disposal. Cash-flow projections are based on reasonable and supportable assumptions and the asset's current condition.",
      },
      {
        title: "Cash-generating units",
        body:
          "Where an individual asset does not generate largely independent cash inflows, impairment is assessed at the cash-generating unit level. Goodwill is allocated to the relevant CGUs or groups of CGUs.",
      },
      {
        title: "Impairment and reversal",
        body:
          "Impairment losses are recognised in profit or loss unless another Standard requires different treatment. Reversals are permitted when conditions improve, subject to the maximum carrying amount permitted. Goodwill impairment is not reversed.",
      },
    ],
    keyPoints: [
      "Recoverable amount is the higher of FVLCD and VIU.",
      "Goodwill requires annual impairment testing.",
      "CGUs are used when individual cash inflows cannot be identified.",
      "Goodwill impairment is not reversed.",
    ],
    quiz: [
      {
        id: "imp1",
        question: "Recoverable amount is:",
        options: [
          "The higher of FVLCD and VIU",
          "The lower of cost and fair value",
          "Historical cost",
          "Tax value",
        ],
        answer: 0,
        explanation:
          "IAS 36 defines recoverable amount as the higher of fair value less costs of disposal and value in use.",
      },
      {
        id: "imp2",
        question: "Goodwill impairment can be reversed in a later period:",
        options: ["No", "Yes, always", "Only through OCI", "Only after disposal"],
        answer: 0,
        explanation:
          "IAS 36 prohibits reversal of an impairment loss recognised for goodwill.",
      },
    ],
  },

  "held-for-sale-discontinued-operations": {
    title: "Non-current Assets Held for Sale & Discontinued Operations",
    standard: "IFRS 5",
    description:
      "Classification, measurement, presentation and disclosure of assets and disposal groups held for sale.",
    sections: [
      {
        title: "Held-for-sale classification",
        body:
          "A non-current asset or disposal group is classified as held for sale when its carrying amount will be recovered principally through sale rather than continuing use and the IFRS 5 criteria are met.",
        bullets: [
          "Available for immediate sale",
          "Sale is highly probable",
          "Management is committed to a sale plan",
          "Active marketing at a reasonable price",
          "Sale is normally expected within one year",
        ],
      },
      {
        title: "Measurement",
        body:
          "After classification, the asset or disposal group is measured at the lower of carrying amount and fair value less costs to sell. Depreciation ceases while classified as held for sale.",
      },
      {
        title: "Presentation",
        body:
          "Assets and liabilities of disposal groups are presented separately. Where the disposal qualifies as a discontinued operation, its results and relevant cash flows are presented separately from continuing operations.",
      },
    ],
    keyPoints: [
      "Recovery is principally through sale.",
      "The sale must be highly probable.",
      "Depreciation stops after classification.",
      "Measure at lower of carrying amount and FVLCTS.",
    ],
    quiz: [
      {
        id: "hfs1",
        question: "After classification as held for sale, measurement is at:",
        options: [
          "Lower of carrying amount and fair value less costs to sell",
          "Higher of carrying amount and fair value",
          "Historical cost only",
          "Replacement cost",
        ],
        answer: 0,
        explanation:
          "This is the IFRS 5 measurement requirement.",
      },
      {
        id: "hfs2",
        question: "Depreciation after classification as held for sale:",
        options: ["Ceases", "Continues normally", "Doubles", "Is recognised in OCI"],
        answer: 0,
        explanation:
          "Depreciation and amortisation cease for non-current assets classified as held for sale.",
      },
    ],
  },

  "conceptual-regulatory-framework": {
    title: "Conceptual & Regulatory Framework",
    standard: "Conceptual Framework",
    description:
      "The purpose of the Conceptual Framework, objective of reporting, qualitative characteristics and the regulatory environment.",
    sections: [
      {
        title: "Purpose of the Framework",
        body:
          "The Framework assists the IASB in developing consistent IFRS Standards, assists preparers when no Standard applies or a policy choice exists, and assists users in understanding and interpreting IFRS Standards. It is not itself an accounting Standard and does not override an IFRS requirement.",
      },
      {
        title: "Qualitative characteristics",
        body:
          "Useful financial information must be relevant and faithfully represented. Comparability, verifiability, timeliness and understandability enhance usefulness.",
      },
      {
        title: "Elements and recognition",
        body:
          "The Framework addresses assets, liabilities, equity, income and expenses and provides concepts for recognition, derecognition, measurement, presentation and disclosure.",
      },
    ],
    keyPoints: [
      "The Framework supports consistent standard setting.",
      "It does not override an IFRS Standard.",
      "Relevance and faithful representation are fundamental qualitative characteristics.",
    ],
    quiz: [
      {
        id: "cf1",
        question: "The Conceptual Framework is:",
        options: [
          "Not an accounting Standard",
          "A tax law",
          "A replacement for all IFRS Standards",
          "A financial statement",
        ],
        answer: 0,
        explanation:
          "The uploaded material explicitly notes that the Framework is not an accounting Standard and does not override IFRS Standards.",
      },
    ],
  },

  "conceptual-framework-measurement": {
    title: "Conceptual Framework — Measurement",
    standard: "Conceptual Framework / IFRS 13",
    description:
      "Measurement bases and fair value concepts used in financial reporting.",
    sections: [
      {
        title: "Measurement bases",
        body:
          "The Framework considers historical cost and current value measurement bases. The appropriate basis depends on the characteristics of the asset or liability and the information it provides to users.",
        bullets: [
          "Historical cost",
          "Fair value",
          "Value in use for assets",
          "Fulfilment value for liabilities",
          "Current cost",
        ],
      },
      {
        title: "Fair value",
        body:
          "Fair value is a market-based measurement. It reflects the price that would be received to sell an asset or paid to transfer a liability in an orderly transaction between market participants at the measurement date.",
      },
      {
        title: "Fair value hierarchy",
        body:
          "IFRS 13 ranks inputs used in fair-value measurements according to observability: Level 1 uses quoted prices in active markets, Level 2 uses observable inputs other than Level 1 quoted prices, and Level 3 uses significant unobservable inputs.",
      },
    ],
    keyPoints: [
      "Measurement basis affects the information provided to users.",
      "Fair value is market-based.",
      "Level 1 inputs are the most observable.",
      "Level 3 measurements involve significant unobservable inputs.",
    ],
    quiz: [
      {
        id: "meas1",
        question: "Fair value is primarily:",
        options: ["Market-based", "Entity-specific only", "Tax-based", "Historical-cost based"],
        answer: 0,
        explanation:
          "IFRS 13 defines fair value as a market-participant-based measurement.",
      },
      {
        id: "meas2",
        question: "Which fair-value level uses quoted prices in active markets for identical items?",
        options: ["Level 1", "Level 2", "Level 3", "Level 4"],
        answer: 0,
        explanation:
          "Level 1 inputs are quoted prices in active markets for identical assets or liabilities accessible at the measurement date.",
      },
    ],
  },

  "other-standards": {
    title: "Other Standards",
    standard: "Selected IFRS / IAS",
    description:
      "Selected financial reporting topics covered in the uploaded Other Standards chapter.",
    sections: [
      {
        title: "Applying the relevant Standard",
        body:
          "The correct accounting treatment depends on identifying the transaction and applying the specific IFRS or IAS that governs it. Where a Standard contains specific requirements, those requirements take precedence.",
      },
      {
        title: "Government grants",
        body:
          "Government grants are accounted for using the applicable recognition and presentation requirements. The material includes recognition, presentation and disclosure of grants and unfulfilled conditions.",
      },
      {
        title: "Borrowing costs",
        body:
          "Qualifying borrowing costs are considered for capitalisation when directly attributable to the acquisition, construction or production of a qualifying asset. Other borrowing costs are recognised in profit or loss.",
      },
      {
        title: "Investment property and agriculture",
        body:
          "Investment property and biological assets are subject to their respective Standards and measurement models. Classification must be established before measurement is selected.",
      },
    ],
    keyPoints: [
      "Identify the Standard governing the transaction first.",
      "Government grants have specific disclosure requirements.",
      "Qualifying borrowing costs can be capitalised.",
      "Classification determines the applicable measurement model.",
    ],
    quiz: [
      {
        id: "other1",
        question: "Before selecting an accounting treatment, the first step is to:",
        options: [
          "Identify the applicable Standard",
          "Choose the cheapest method",
          "Ask the tax authority",
          "Recognise revenue",
        ],
        answer: 0,
        explanation:
          "The specific IFRS or IAS governing the transaction must be identified before applying its requirements.",
      },
    ],
  },

  "foreign-currency": {
    title: "Foreign Currency",
    standard: "IAS 21",
    description:
      "Functional currency, foreign-currency transactions, monetary items and exchange differences.",
    sections: [
      {
        title: "Functional currency",
        body:
          "Functional currency is the currency of the primary economic environment in which the entity operates. The determination considers the currency influencing sales prices, costs and financing and operating activities.",
      },
      {
        title: "Initial recognition",
        body:
          "A foreign-currency transaction is initially recorded in the functional currency using the spot exchange rate at the date of the transaction.",
      },
      {
        title: "Monetary and non-monetary items",
        body:
          "Foreign-currency monetary items are generally retranslated at the closing rate. Non-monetary items measured at historical cost use the transaction-date rate, while items measured at fair value use the exchange rate at the date the fair value was measured.",
      },
    ],
    keyPoints: [
      "Determine functional currency from the primary economic environment.",
      "Use the transaction-date spot rate initially.",
      "Monetary items generally use the closing rate.",
    ],
    quiz: [
      {
        id: "fc1",
        question: "Foreign-currency monetary items are generally retranslated at:",
        options: ["Closing rate", "Original rate forever", "Budget rate", "Tax rate"],
        answer: 0,
        explanation:
          "IAS 21 generally requires foreign-currency monetary items to be translated at the closing rate.",
      },
    ],
  },

  "leases": {
    title: "Leases",
    standard: "IFRS 16",
    description:
      "Lease identification, right-of-use assets, lease liabilities, subsequent measurement and lessor accounting.",
    sections: [
      {
        title: "Identifying a lease",
        body:
          "A contract contains a lease when it conveys the right to control the use of an identified asset for a period of time in exchange for consideration.",
        bullets: [
          "Identified asset",
          "Right to substantially all economic benefits",
          "Right to direct how and for what purpose the asset is used",
        ],
      },
      {
        title: "Lessee accounting",
        body:
          "A lessee generally recognises a right-of-use asset and a lease liability at commencement, subject to the short-term and low-value exemptions.",
      },
      {
        title: "Lease liability",
        body:
          "The lease liability is initially measured at the present value of qualifying unpaid lease payments, discounted using the interest rate implicit in the lease or the incremental borrowing rate when appropriate.",
      },
      {
        title: "Subsequent accounting",
        body:
          "Interest increases the lease liability and lease payments reduce it. The right-of-use asset is depreciated and may be impaired. Lease liabilities are remeasured when specified circumstances change.",
      },
      {
        title: "Lessor accounting",
        body:
          "A lessor classifies a lease as finance or operating depending on whether substantially all risks and rewards incidental to ownership have transferred.",
      },
    ],
    keyPoints: [
      "Identify the asset and control of use.",
      "Most lessee leases create a ROU asset and liability.",
      "Lease liabilities are based on present value.",
      "Lessor classification remains finance versus operating.",
    ],
    quiz: [
      {
        id: "lease1",
        question: "A lessee generally recognises at commencement:",
        options: [
          "A right-of-use asset and lease liability",
          "Only rent expense",
          "Only an intangible asset",
          "Only a provision",
        ],
        answer: 0,
        explanation:
          "IFRS 16 introduced a general on-balance-sheet model for lessees, subject to exemptions.",
      },
      {
        id: "lease2",
        question: "The lease liability is initially measured using:",
        options: [
          "Present value of qualifying unpaid lease payments",
          "Undiscounted total payments",
          "Fair value of the lessor",
          "Replacement cost",
        ],
        answer: 0,
        explanation:
          "The initial lease liability is the present value of qualifying unpaid lease payments.",
      },
    ],
  },

  "employee-benefits": {
    title: "Employee Benefits",
    standard: "IAS 19",
    description:
      "Short-term benefits, post-employment benefits, defined contribution and defined benefit plans and termination benefits.",
    sections: [
      {
        title: "Categories",
        body:
          "IAS 19 covers short-term employee benefits, post-employment benefits, other long-term employee benefits and termination benefits.",
      },
      {
        title: "Defined contribution plans",
        body:
          "The employer's obligation is normally limited to the agreed contribution. Contributions are recognised as an expense as employees render service, subject to accruals or prepayments.",
      },
      {
        title: "Defined benefit plans",
        body:
          "Defined benefit accounting measures the present value of the obligation and deducts the fair value of plan assets to determine the net defined benefit liability or asset, subject to the asset ceiling.",
      },
      {
        title: "Profit or loss and OCI",
        body:
          "Service cost and net interest are recognised in profit or loss. Remeasurements are recognised in OCI and are not subsequently reclassified to profit or loss.",
      },
    ],
    keyPoints: [
      "Defined contribution plans focus on contributions.",
      "Defined benefit plans require actuarial measurement.",
      "Remeasurements are recognised in OCI.",
      "The asset ceiling limits a recognised surplus.",
    ],
    quiz: [
      {
        id: "eb1",
        question: "Remeasurements of defined benefit plans are generally recognised in:",
        options: ["OCI", "Revenue", "Inventory", "Share capital"],
        answer: 0,
        explanation:
          "IAS 19 requires remeasurements to be recognised in other comprehensive income.",
      },
    ],
  },

  "share-based-payments": {
    title: "Share-based Payments",
    standard: "IFRS 2",
    description:
      "Equity-settled and cash-settled arrangements, vesting conditions, modifications, cancellations and disclosures.",
    sections: [
      {
        title: "Types",
        body:
          "IFRS 2 covers equity-settled arrangements, where goods or services are received in exchange for equity instruments, and cash-settled arrangements, where the amount is based on the entity's share price.",
      },
      {
        title: "Equity-settled awards",
        body:
          "For employee awards, grant-date fair value is generally recognised over the vesting period as services are received. The estimate of awards expected to vest is updated for non-market vesting conditions.",
      },
      {
        title: "Market conditions",
        body:
          "Market conditions are reflected in grant-date fair value. Consequently, an expense is generally recognised even if the market condition is ultimately not achieved, provided the other vesting conditions are satisfied.",
      },
      {
        title: "Cash-settled awards",
        body:
          "Cash-settled share-based payment liabilities are remeasured at fair value at each reporting date, with changes recognised in profit or loss.",
      },
      {
        title: "Modifications and cancellations",
        body:
          "The original grant-date fair value generally continues to be recognised after a modification. Favourable incremental fair value is recognised over the remaining vesting period. Cancellation during vesting generally accelerates recognition.",
      },
    ],
    keyPoints: [
      "IFRS 2 recognises the service received through share-based arrangements.",
      "Equity-settled employee awards use grant-date fair value.",
      "Cash-settled liabilities are remeasured.",
      "Market and non-market vesting conditions differ.",
    ],
    quiz: [
      {
        id: "sbp1",
        question: "A cash-settled share-based payment liability is:",
        options: [
          "Remeasured at each reporting date",
          "Fixed permanently at grant date",
          "Never recognised",
          "Always recognised in OCI",
        ],
        answer: 0,
        explanation:
          "Cash-settled arrangements create liabilities that are remeasured at fair value.",
      },
      {
        id: "sbp2",
        question: "A market condition is generally reflected in:",
        options: [
          "Grant-date fair value",
          "Inventory",
          "Tax expense only",
          "Share capital immediately",
        ],
        answer: 0,
        explanation:
          "Market conditions are incorporated into the grant-date fair-value measurement.",
      },
    ],
  },

  "events-provisions-contingencies": {
    title: "Events After Reporting Period, Provisions & Contingencies",
    standard: "IAS 10 / IAS 37",
    description:
      "Adjusting and non-adjusting events, provisions, contingent liabilities, contingent assets, onerous contracts and restructuring.",
    sections: [
      {
        title: "Events after the reporting period",
        body:
          "IAS 10 covers events between the reporting date and the date financial statements are authorised for issue. Adjusting events provide additional evidence of conditions existing at reporting date; non-adjusting events concern conditions arising afterwards.",
      },
      {
        title: "Provision recognition",
        body:
          "A provision is recognised when there is a present legal or constructive obligation from a past event, an outflow of resources is probable and a reliable estimate can be made.",
      },
      {
        title: "Measurement",
        body:
          "The provision is the best estimate of expenditure required to settle the present obligation. Expected-value techniques are appropriate for large populations of similar obligations, while a single obligation generally focuses on the most likely outcome.",
      },
      {
        title: "Contingencies",
        body:
          "Contingent liabilities are not recognised but are normally disclosed unless the possibility of outflow is remote. Contingent assets are not recognised; disclosure is appropriate when an inflow is probable and recognition occurs only when virtually certain.",
      },
      {
        title: "Onerous contracts and restructuring",
        body:
          "An onerous contract creates a present obligation when unavoidable costs exceed expected economic benefits. Restructuring provisions require a detailed formal plan and a valid expectation in affected parties.",
      },
    ],
    keyPoints: [
      "Adjusting events relate to conditions existing at reporting date.",
      "A provision requires all three recognition criteria.",
      "Contingent liabilities are normally disclosed rather than recognised.",
      "Contingent assets are recognised only when virtually certain.",
    ],
    quiz: [
      {
        id: "ias37a",
        question: "Which is NOT a provision recognition criterion?",
        options: [
          "Guaranteed future profit",
          "Present obligation",
          "Probable outflow",
          "Reliable estimate",
        ],
        answer: 0,
        explanation:
          "The three criteria are a present obligation, probable outflow and reliable estimate.",
      },
      {
        id: "ias10a",
        question: "An adjusting event provides evidence of:",
        options: [
          "Conditions existing at the reporting date",
          "Only conditions arising after year-end",
          "Future budgets",
          "Dividend intentions",
        ],
        answer: 0,
        explanation:
          "Adjusting events provide additional evidence about conditions existing at the reporting date.",
      },
    ],
  },

  "financial-assets-liabilities": {
    title: "Financial Assets & Financial Liabilities",
    standard: "IFRS 9",
    description:
      "Classification, measurement, impairment and accounting for financial assets and liabilities.",
    sections: [
      {
        title: "Classification of financial assets",
        body:
          "Financial assets are classified according to the entity's business model for managing the assets and the contractual cash-flow characteristics.",
        bullets: [
          "Amortised cost",
          "Fair value through OCI",
          "Fair value through profit or loss",
        ],
      },
      {
        title: "Amortised cost",
        body:
          "A financial asset is generally measured at amortised cost when it is held within a business model whose objective is to collect contractual cash flows and the cash flows are solely payments of principal and interest.",
      },
      {
        title: "Impairment",
        body:
          "IFRS 9 uses an expected credit loss model. The model requires recognition of expected credit losses rather than waiting for an incurred loss event.",
      },
      {
        title: "Financial liabilities",
        body:
          "Financial liabilities are generally measured at amortised cost unless specific requirements result in fair-value measurement through profit or loss or another applicable treatment.",
      },
    ],
    keyPoints: [
      "Business model and contractual cash flows drive asset classification.",
      "SPPI means solely payments of principal and interest.",
      "Expected credit losses are recognised under IFRS 9.",
    ],
    quiz: [
      {
        id: "fin1",
        question: "Two major factors determining financial asset classification are:",
        options: [
          "Business model and contractual cash-flow characteristics",
          "Tax rate and dividend policy",
          "Employee count and revenue",
          "Inventory turnover and payroll",
        ],
        answer: 0,
        explanation:
          "IFRS 9 classification of financial assets is based primarily on the business model and contractual cash-flow characteristics.",
      },
      {
        id: "fin2",
        question: "IFRS 9 impairment uses which model?",
        options: [
          "Expected credit loss",
          "Incurred tax loss",
          "Historical cost loss only",
          "Replacement-cost loss",
        ],
        answer: 0,
        explanation:
          "IFRS 9 introduced the expected credit loss impairment model.",
      },
    ],
  },

  "taxation": {
    title: "Taxation",
    standard: "IAS 12",
    description:
      "Current tax, deferred tax, temporary differences and recognition of deferred tax assets and liabilities.",
    sections: [
      {
        title: "Current tax",
        body:
          "Current tax is the amount of income tax payable or recoverable in respect of taxable profit or tax losses for a period, using tax rates enacted or substantively enacted by the reporting date.",
      },
      {
        title: "Temporary differences",
        body:
          "Deferred tax arises from temporary differences between the carrying amount of an asset or liability in the statement of financial position and its tax base.",
      },
      {
        title: "Deferred tax liabilities",
        body:
          "Taxable temporary differences generally give rise to deferred tax liabilities, subject to the recognition exceptions in IAS 12.",
      },
      {
        title: "Deferred tax assets",
        body:
          "Deductible temporary differences and unused tax losses or credits can give rise to deferred tax assets when it is probable that taxable profit will be available against which they can be utilised.",
      },
    ],
    keyPoints: [
      "Current tax relates to taxable profit for the period.",
      "Deferred tax is based on temporary differences.",
      "Recognition of deferred tax assets depends on probable taxable profits.",
    ],
    quiz: [
      {
        id: "tax1",
        question: "Deferred tax primarily arises from:",
        options: [
          "Temporary differences",
          "Cash balances only",
          "Revenue volume",
          "Dividends paid",
        ],
        answer: 0,
        explanation:
          "IAS 12 bases deferred tax on temporary differences between carrying amounts and tax bases.",
      },
    ],
  },

  "earnings-per-share": {
    title: "Earnings Per Share",
    standard: "IAS 33",
    description:
      "Basic and diluted EPS, weighted-average shares and potential ordinary shares.",
    sections: [
      {
        title: "Basic EPS",
        body:
          "Basic EPS is calculated by dividing profit or loss attributable to ordinary equity holders of the parent by the weighted-average number of ordinary shares outstanding during the period.",
      },
      {
        title: "Weighted-average shares",
        body:
          "The number of ordinary shares is weighted for the period they are outstanding. Bonus issues and similar transactions are reflected retrospectively in accordance with IAS 33.",
      },
      {
        title: "Diluted EPS",
        body:
          "Diluted EPS reflects the potential dilution from instruments such as convertible instruments, options and warrants when their inclusion would decrease EPS or increase loss per share.",
      },
    ],
    keyPoints: [
      "Basic EPS uses attributable profit and weighted-average ordinary shares.",
      "Diluted EPS considers dilutive potential ordinary shares.",
      "Share changes may require retrospective adjustment.",
    ],
    quiz: [
      {
        id: "eps1",
        question: "Basic EPS uses:",
        options: [
          "Attributable profit divided by weighted-average ordinary shares",
          "Revenue divided by closing shares",
          "EBIT divided by total assets",
          "Cash flow divided by equity",
        ],
        answer: 0,
        explanation:
          "This is the basic EPS calculation under IAS 33.",
      },
    ],
  },

  "statement-of-cash-flows": {
    title: "Statement of Cash Flows",
    standard: "IAS 7",
    description:
      "Operating, investing and financing cash flows and direct and indirect presentation.",
    sections: [
      {
        title: "Operating activities",
        body:
          "Operating cash flows arise from the principal revenue-producing activities and other activities that are not investing or financing.",
      },
      {
        title: "Investing activities",
        body:
          "Investing activities involve acquisition and disposal of long-term assets and other investments not included in cash equivalents.",
      },
      {
        title: "Financing activities",
        body:
          "Financing activities result in changes in the size and composition of contributed equity and borrowings.",
      },
      {
        title: "Direct and indirect methods",
        body:
          "Operating cash flows may be presented using the direct method or indirect method. The indirect method reconciles profit or loss to operating cash flow by adjusting for non-cash items and working-capital movements.",
      },
    ],
    keyPoints: [
      "Classify cash flows as operating, investing or financing.",
      "Investing activities concern long-term resources and investments.",
      "Financing activities concern capital and borrowings.",
    ],
    quiz: [
      {
        id: "cfstatement1",
        question: "Purchase of property, plant and equipment for cash is normally:",
        options: [
          "Investing cash flow",
          "Operating cash flow",
          "Financing cash flow",
          "Non-cash flow",
        ],
        answer: 0,
        explanation:
          "Acquisition of long-term assets is normally classified as an investing cash flow.",
      },
    ],
  },

  "consolidated-principles": {
    title: "Principles of Consolidated Financial Statements",
    standard: "IFRS 10 / IFRS 3",
    description:
      "Control, business combinations and the principles underlying group accounting.",
    sections: [
      {
        title: "Control",
        body:
          "Control exists when the investor has power over the investee, exposure or rights to variable returns and the ability to use power to affect those returns.",
      },
      {
        title: "Business combinations",
        body:
          "The acquisition method applies when control is obtained over an acquired business. The acquisition process includes identifying the acquirer and acquisition date and recognising identifiable assets, liabilities, goodwill or bargain purchase and NCI.",
      },
      {
        title: "Consolidation principle",
        body:
          "The parent and subsidiaries are presented as a single economic entity. The parent's investment is eliminated against the subsidiary's equity and intra-group transactions and balances are eliminated.",
      },
    ],
    keyPoints: [
      "Control is the basis of consolidation.",
      "The acquisition method is applied to acquired businesses.",
      "The group is presented as a single economic entity.",
    ],
    quiz: [
      {
        id: "cons1",
        question: "The fundamental basis for consolidation is:",
        options: ["Control", "Revenue", "Tax residency", "Equal ownership"],
        answer: 0,
        explanation:
          "IFRS 10 uses control as the basis for determining whether an investee is consolidated.",
      },
      {
        id: "cons2",
        question: "Which is part of the acquisition method?",
        options: [
          "Recognising identifiable assets and liabilities",
          "Ignoring fair values",
          "Recognising all consideration as revenue",
          "Ignoring NCI",
        ],
        answer: 0,
        explanation:
          "Recognition and measurement of identifiable assets and liabilities is a core step in acquisition accounting.",
      },
    ],
  },

  "consolidated-statement-financial-position": {
    title: "Consolidated Statement of Financial Position",
    standard: "IFRS 3 / IFRS 10",
    description:
      "Preparation of the consolidated statement of financial position, goodwill, fair-value adjustments and NCI.",
    sections: [
      {
        title: "Net assets of subsidiary",
        body:
          "The subsidiary's identifiable net assets are analysed at acquisition date and reporting date. Fair-value adjustments and post-acquisition movements are incorporated into the consolidation working.",
      },
      {
        title: "Goodwill",
        body:
          "Goodwill is calculated from consideration transferred, NCI and the fair value of any previously held interest, less the acquisition-date fair value of identifiable net assets acquired.",
      },
      {
        title: "Non-controlling interest",
        body:
          "NCI represents the ownership interest in a subsidiary attributable to shareholders other than the parent. The method used to measure NCI affects goodwill and subsequent goodwill impairment allocation.",
      },
      {
        title: "Intra-group adjustments",
        body:
          "Intra-group balances, unrealised profits, intra-group transfers of non-current assets and related depreciation adjustments are eliminated so that the consolidated statement represents the group as one entity.",
      },
    ],
    keyPoints: [
      "Prepare an acquisition-date net-assets schedule.",
      "Calculate goodwill from acquisition-date values.",
      "Recognise NCI separately.",
      "Eliminate intra-group balances and unrealised profits.",
    ],
    quiz: [
      {
        id: "csfp1",
        question: "Goodwill is calculated using:",
        options: [
          "Consideration/NCI/previous interest compared with identifiable net assets",
          "Parent revenue only",
          "Subsidiary closing cash only",
          "Taxable profit",
        ],
        answer: 0,
        explanation:
          "Goodwill is determined by comparing the relevant acquisition-date interests and consideration with identifiable net assets.",
      },
      {
        id: "csfp2",
        question: "Unrealised intra-group profit should generally be:",
        options: ["Eliminated", "Recognised twice", "Transferred to cash", "Ignored"],
        answer: 0,
        explanation:
          "The group cannot recognise profit on transactions with itself, so unrealised intra-group profit is eliminated.",
      },
    ],
  },

  "consolidated-profit-or-loss": {
    title: "Consolidated Statement of Profit or Loss",
    standard: "IFRS 10",
    description:
      "Consolidation of group revenue, expenses, post-acquisition results, NCI and intra-group adjustments.",
    sections: [
      {
        title: "Post-acquisition results",
        body:
          "Only the subsidiary's post-acquisition income and expenses are included in consolidated profit or loss when control is obtained during the year.",
      },
      {
        title: "Intra-group transactions",
        body:
          "Intra-group sales, purchases, interest, dividends and unrealised profits are eliminated. Adjustments may also be needed for depreciation where a non-current asset has been transferred within the group.",
      },
      {
        title: "NCI share of profit",
        body:
          "Profit attributable to NCI is calculated after appropriate consolidation adjustments and presented separately from profit attributable to owners of the parent.",
      },
    ],
    keyPoints: [
      "Include subsidiary results only from the date of control.",
      "Eliminate intra-group income and expenses.",
      "Eliminate unrealised intra-group profits.",
      "Present NCI share separately.",
    ],
    quiz: [
      {
        id: "cspl1",
        question: "A subsidiary acquired halfway through the year contributes to consolidated profit or loss:",
        options: [
          "From the date control is obtained",
          "For the entire year automatically",
          "Only after year-end",
          "Never",
        ],
        answer: 0,
        explanation:
          "The subsidiary is consolidated from the date control is obtained.",
      },
    ],
  },

  "associates": {
    title: "Associates",
    standard: "IAS 28",
    description:
      "Significant influence and the equity method of accounting for associates.",
    sections: [
      {
        title: "Significant influence",
        body:
          "An associate is an investee over which the investor has significant influence but not control or joint control.",
      },
      {
        title: "Equity method",
        body:
          "The investment is initially recognised at cost and subsequently adjusted for the investor's share of the associate's post-acquisition profit or loss and other comprehensive income. Distributions reduce the carrying amount.",
      },
      {
        title: "Fair-value adjustments and impairment",
        body:
          "The investor considers fair-value adjustments identified at acquisition and their subsequent depreciation or amortisation. The investment is also assessed for impairment when required.",
      },
    ],
    keyPoints: [
      "Associates involve significant influence.",
      "The equity method updates the investment for the investor's share of results.",
      "Dividends reduce the investment carrying amount.",
    ],
    quiz: [
      {
        id: "assoc1",
        question: "An associate is an investee over which the investor has:",
        options: ["Significant influence", "Control", "No influence", "Only legal ownership"],
        answer: 0,
        explanation:
          "Significant influence, without control or joint control, defines an associate.",
      },
      {
        id: "assoc2",
        question: "Under the equity method, dividends received from an associate generally:",
        options: [
          "Reduce the investment carrying amount",
          "Increase revenue without adjustment",
          "Increase goodwill",
          "Create a provision",
        ],
        answer: 0,
        explanation:
          "Distributions from the associate reduce the carrying amount of the investment under the equity method.",
      },
    ],
  },

  "group-disposals": {
    title: "Group Disposals",
    standard: "IFRS 10 / IFRS 5",
    description:
      "Disposal of subsidiaries, loss of control, retained interests and discontinued operations.",
    sections: [
      {
        title: "Loss of control",
        body:
          "A disposal may cause the parent to lose control of a subsidiary. When control is lost, the former subsidiary is derecognised from the consolidated financial statements.",
      },
      {
        title: "Calculation of disposal result",
        body:
          "The gain or loss on disposal considers consideration received, the carrying amount of the subsidiary's net assets, NCI and the measurement of any retained interest.",
      },
      {
        title: "Retained interest",
        body:
          "If an interest remains after loss of control, it is accounted for under the applicable Standard depending on the nature of the retained investment, such as an associate or financial asset.",
      },
      {
        title: "Subsidiary acquired for resale",
        body:
          "A subsidiary acquired exclusively for resale is not automatically exempt from consolidation. Where IFRS 5 criteria are met, the disposal group is presented and measured according to the held-for-sale requirements.",
      },
    ],
    keyPoints: [
      "Loss of control ends consolidation.",
      "NCI is derecognised on loss of control.",
      "Retained interests are accounted for under the applicable Standard.",
      "IFRS 5 can affect presentation and measurement.",
    ],
    quiz: [
      {
        id: "disp1",
        question: "On loss of control, the former subsidiary is:",
        options: [
          "Derecognised from consolidation",
          "Consolidated indefinitely",
          "Recognised as revenue",
          "Ignored in all accounts",
        ],
        answer: 0,
        explanation:
          "Loss of control means the subsidiary is no longer consolidated.",
      },
      {
        id: "disp2",
        question: "A retained interest after loss of control is:",
        options: [
          "Accounted for under the applicable Standard",
          "Always treated as inventory",
          "Always treated as cash",
          "Always eliminated",
        ],
        answer: 0,
        explanation:
          "The nature of the retained interest determines whether IFRS 9, IAS 28 or another Standard applies.",
      },
    ],
  },

  "interpretation-financial-statements": {
    title: "Interpretation of Financial Statements",
    standard: "Financial Statement Analysis",
    description:
      "Interpretation of financial statements through profitability, liquidity, efficiency, gearing and investor-focused measures.",
    sections: [
      {
        title: "Profitability",
        body:
          "Profitability ratios assess how effectively an entity generates profit from sales, assets and equity. Trends and comparisons with relevant benchmarks are important when interpreting the ratios.",
        bullets: [
          "Gross profit margin",
          "Operating profit margin",
          "Return on capital employed",
          "Return on equity",
        ],
      },
      {
        title: "Liquidity and working capital",
        body:
          "Liquidity analysis considers the entity's ability to meet short-term obligations. Working-capital ratios should be interpreted together with the nature of the business and cash-flow information.",
        bullets: [
          "Current ratio",
          "Quick ratio",
          "Receivable collection period",
          "Inventory holding period",
          "Payable payment period",
        ],
      },
      {
        title: "Gearing and investor analysis",
        body:
          "Gearing examines the relationship between debt and equity or capital employed. Investor analysis considers earnings, dividends, market measures and trends.",
      },
      {
        title: "Limitations",
        body:
          "Ratio analysis can be distorted by accounting policies, inflation, seasonality, unusual transactions, different capital structures and differences in accounting estimates. Ratios should therefore be interpreted rather than used mechanically.",
      },
    ],
    keyPoints: [
      "Use ratios to identify trends and relationships.",
      "Interpret liquidity together with cash flows.",
      "Consider accounting policy differences.",
      "One ratio rarely provides a complete conclusion.",
    ],
    quiz: [
      {
        id: "interp1",
        question: "A key limitation of ratio analysis is:",
        options: [
          "Different accounting policies can reduce comparability",
          "Ratios never use financial statement data",
          "Ratios always predict the future exactly",
          "Ratios eliminate judgement",
        ],
        answer: 0,
        explanation:
          "Differences in accounting policies, estimates and circumstances can affect comparability.",
      },
    ],
  },

  "adopting-new-accounting-standards": {
    title: "Adopting New Accounting Standards",
    standard: "IAS 8 / Specific Transition Requirements",
    description:
      "Transition when new or amended accounting requirements are introduced.",
    sections: [
      {
        title: "Transition guidance",
        body:
          "When a new Standard is adopted, the entity first considers the specific transitional provisions in that Standard. If no specific guidance applies, IAS 8 provides the general framework.",
      },
      {
        title: "Practical implications",
        body:
          "The uploaded material highlights that adoption can affect reported profit, performance-related remuneration, IT systems and loan covenants. Implementation therefore requires planning beyond the journal entries.",
      },
      {
        title: "Disclosures",
        body:
          "Entities explain how transition affects financial position, performance and cash flows and separately disclose relevant prior-period errors identified during first-time implementation where required.",
      },
    ],
    keyPoints: [
      "Check specific transition guidance first.",
      "IAS 8 applies where appropriate when no specific transition rules exist.",
      "Implementation can affect systems, bonuses and loan covenants.",
    ],
    quiz: [
      {
        id: "adopt1",
        question: "When adopting a new accounting Standard, the first consideration is:",
        options: [
          "Its specific transitional guidance",
          "The entity's dividend policy",
          "Its marketing strategy",
          "Its payroll system only",
        ],
        answer: 0,
        explanation:
          "Specific transition requirements in the new Standard are considered before applying the general IAS 8 framework.",
      },
    ],
  },

  "ifrs-for-smes": {
    title: "IFRS for SMEs",
    standard: "IFRS for SMEs",
    description:
      "The simplified financial reporting framework for eligible entities without public accountability.",
    sections: [
      {
        title: "Purpose",
        body:
          "The IFRS for SMEs Standard is designed for entities that do not have public accountability and prepare general purpose financial statements for external users.",
      },
      {
        title: "Simplification",
        body:
          "The SME framework reduces complexity compared with full IFRS through simplified recognition, measurement, presentation and disclosure requirements.",
      },
      {
        title: "Eligibility and application",
        body:
          "An entity must assess whether it meets the Standard's eligibility requirements. Once eligible and using the Standard, it should apply the requirements consistently, including transition requirements.",
      },
    ],
    keyPoints: [
      "The framework targets entities without public accountability.",
      "It reduces reporting complexity.",
      "Eligibility should be assessed before applying the Standard.",
    ],
    quiz: [
      {
        id: "sme1",
        question: "The IFRS for SMEs Standard is designed primarily for entities:",
        options: [
          "Without public accountability",
          "That are all listed companies",
          "That are governments only",
          "That are all banks",
        ],
        answer: 0,
        explanation:
          "The Standard is designed for eligible entities without public accountability.",
      },
    ],
  },
}

const topicOrder = [
  "published-accounts",
  "tangible-non-current-assets",
  "intangible-assets",
  "impairment-of-assets",
  "held-for-sale-discontinued-operations",
  "conceptual-regulatory-framework",
  "conceptual-framework-measurement",
  "other-standards",
  "foreign-currency",
  "leases",
  "employee-benefits",
  "share-based-payments",
  "events-provisions-contingencies",
  "financial-assets-liabilities",
  "taxation",
  "earnings-per-share",
  "statement-of-cash-flows",
  "consolidated-principles",
  "consolidated-statement-financial-position",
  "consolidated-profit-or-loss",
  "associates",
  "group-disposals",
  "interpretation-financial-statements",
  "adopting-new-accounting-standards",
  "ifrs-for-smes",
]

function shuffle<T>(items: T[]) {
  const copy = [...items]
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[copy[i], copy[j]] = [copy[j], copy[i]]
  }
  return copy
}

export default function AccountingTopicPage() {
  const params = useParams()
  const slug = String(params?.slug || "")
  const topic = topics[slug]

  const [answers, setAnswers] = useState<Record<string, number>>({})
  const [submitted, setSubmitted] = useState(false)
  const [quizQuestions] = useState<Question[]>(() =>
    topic
      ? topic.quiz.map((q) => {
          const options = q.options.map((text, index) => ({
            text,
            correct: index === q.answer,
          }))
          const shuffled = shuffle(options)
          return {
            ...q,
            options: shuffled.map((x) => x.text),
            answer: shuffled.findIndex((x) => x.correct),
          }
        })
      : []
  )

  const score = useMemo(
    () =>
      quizQuestions.reduce(
        (total, q) => total + (answers[q.id] === q.answer ? 1 : 0),
        0
      ),
    [answers, quizQuestions]
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
          <p className="mx-auto mt-4 max-w-xl text-slate-600">
            The requested accounting topic does not exist in the current
            educational material set.
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

  const resetQuiz = () => {
    setAnswers({})
    setSubmitted(false)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const unanswered = quizQuestions.length - Object.keys(answers).length
  const topicIndex = Math.max(0, topicOrder.indexOf(slug))

  return (
    <main className="min-h-screen bg-[#F5F8FC] text-[#071B49]">
      <CuraHeader />

      <section className="bg-[#071B49]">
        <div className="mx-auto max-w-6xl px-6 py-16 lg:px-8 lg:py-20">
          <Link
            href="/education/materials/accounting"
            className="text-sm text-[#8FD8F2] hover:text-white"
          >
            ← Accounting Educational Materials
          </Link>

          <div className="mt-10">
            <div className="flex flex-wrap items-center gap-3">
              <span className="inline-flex rounded-full bg-[#168BC4] px-4 py-2 text-xs font-bold uppercase tracking-wider text-white">
                Topic {topicIndex + 1} of {topicOrder.length}
              </span>
              <span className="inline-flex rounded-full border border-white/20 px-4 py-2 text-xs font-semibold text-slate-200">
                {topic.standard}
              </span>
            </div>

            <h1 className="mt-6 max-w-5xl text-4xl font-semibold tracking-tight text-white md:text-6xl">
              {topic.title}
            </h1>

            <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">
              {topic.description}
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-14 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[1fr_340px]">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#168BC4]">
              Study material
            </p>
            <h2 className="mt-3 text-3xl font-semibold">
              Core learning points
            </h2>

            <div className="mt-7 grid gap-3 sm:grid-cols-2">
              {topic.keyPoints.map((point, index) => (
                <div
                  key={point}
                  className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm"
                >
                  <div className="flex gap-4">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#EAF6FC] text-xs font-bold text-[#168BC4]">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <p className="text-sm leading-6 text-slate-700">{point}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl bg-[#071B49] p-7 text-white">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#35B5E5]">
              CURA Learning Path
            </p>
            <div className="mt-7 space-y-5">
              {[
                ["01", "Understand"],
                ["02", "Apply"],
                ["03", "Test"],
              ].map(([n, label]) => (
                <div key={n} className="flex gap-4">
                  <span className="text-sm font-bold text-[#35B5E5]">{n}</span>
                  <p className="font-semibold">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-[#DCE5EF] bg-white">
        <div className="mx-auto max-w-5xl px-6 py-16 lg:px-8">
          <div className="space-y-7">
            {topic.sections.map((section, index) => (
              <article
                key={section.title}
                className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
              >
                <div className="border-b border-slate-100 bg-[#F8FAFD] px-6 py-5 md:px-8">
                  <div className="flex gap-4">
                    <span className="text-sm font-bold text-[#168BC4]">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <h2 className="text-xl font-semibold md:text-2xl">
                      {section.title}
                    </h2>
                  </div>
                </div>

                <div className="px-6 py-7 md:px-8">
                  <p className="leading-8 text-slate-700">{section.body}</p>

                  {section.bullets && (
                    <ul className="mt-6 space-y-3">
                      {section.bullets.map((bullet) => (
                        <li
                          key={bullet}
                          className="flex gap-3 text-sm leading-6 text-slate-600"
                        >
                          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#168BC4]" />
                          {bullet}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-[#DCE5EF] bg-[#F5F8FC]">
        <div className="mx-auto max-w-5xl px-6 py-16 lg:px-8">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#168BC4]">
            Test your knowledge
          </p>

          <h2 className="mt-3 text-3xl font-semibold md:text-4xl">
            {topic.title} Quiz
          </h2>

          <p className="mt-4 leading-7 text-slate-600">
            Answer every question before submitting. After submission, CURA
            shows your answer, the correct answer and the reason.
          </p>

          {!submitted ? (
            <div className="mt-10 space-y-6">
              {quizQuestions.map((q, index) => (
                <div
                  key={q.id}
                  className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:p-8"
                >
                  <div className="flex gap-4">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#071B49] text-xs font-bold text-white">
                      {index + 1}
                    </span>

                    <h3 className="pt-1 text-lg font-semibold leading-7">
                      {q.question}
                    </h3>
                  </div>

                  <div className="mt-7 grid gap-3">
                    {q.options.map((option, optionIndex) => {
                      const selected = answers[q.id] === optionIndex

                      return (
                        <button
                          key={option}
                          type="button"
                          onClick={() =>
                            setAnswers((current) => ({
                              ...current,
                              [q.id]: optionIndex,
                            }))
                          }
                          className={`flex w-full items-start gap-4 rounded-xl border p-4 text-left transition ${
                            selected
                              ? "border-[#168BC4] bg-[#EAF6FC]"
                              : "border-slate-200 hover:border-[#168BC4]/50"
                          }`}
                        >
                          <span
                            className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-bold ${
                              selected
                                ? "bg-[#168BC4] text-white"
                                : "bg-slate-100 text-slate-600"
                            }`}
                          >
                            {String.fromCharCode(65 + optionIndex)}
                          </span>
                          <span className="pt-1 text-sm leading-6 text-slate-700">
                            {option}
                          </span>
                        </button>
                      )
                    })}
                  </div>
                </div>
              ))}

              {unanswered > 0 && (
                <p className="text-center text-sm text-slate-500">
                  {unanswered} question{unanswered === 1 ? "" : "s"} remaining.
                </p>
              )}

              <button
                type="button"
                disabled={unanswered !== 0}
                onClick={() => setSubmitted(true)}
                className={`w-full rounded-md px-7 py-4 text-sm font-semibold transition ${
                  unanswered === 0
                    ? "bg-[#071B49] text-white hover:bg-[#0B2A69]"
                    : "cursor-not-allowed bg-slate-200 text-slate-400"
                }`}
              >
                Submit Quiz
              </button>
            </div>
          ) : (
            <div className="mt-10">
              <div className="rounded-3xl bg-[#071B49] p-8 text-white md:p-12">
                <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#35B5E5]">
                  Quiz Result
                </p>
                <p className="mt-5 text-5xl font-bold">
                  {score}/{quizQuestions.length}
                </p>
                <p className="mt-2 text-slate-300">
                  {Math.round((score / quizQuestions.length) * 100)}% correct
                </p>
              </div>

              <div className="mt-8 space-y-5">
                {quizQuestions.map((q, index) => {
                  const selected = answers[q.id]
                  const correct = selected === q.answer

                  return (
                    <article
                      key={q.id}
                      className={`overflow-hidden rounded-2xl border bg-white ${
                        correct ? "border-emerald-200" : "border-red-200"
                      }`}
                    >
                      <div
                        className={`px-6 py-5 ${
                          correct ? "bg-emerald-50" : "bg-red-50"
                        }`}
                      >
                        <span
                          className={`text-xs font-bold uppercase tracking-wider ${
                            correct ? "text-emerald-700" : "text-red-700"
                          }`}
                        >
                          {correct ? "Correct" : "Incorrect"}
                        </span>

                        <h3 className="mt-2 text-lg font-semibold leading-7">
                          {index + 1}. {q.question}
                        </h3>
                      </div>

                      <div className="space-y-4 p-6">
                        <div
                          className={`rounded-xl border p-4 ${
                            correct
                              ? "border-emerald-200 bg-emerald-50"
                              : "border-red-200 bg-red-50"
                          }`}
                        >
                          <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
                            Your answer
                          </p>
                          <p className="mt-2 text-sm font-semibold">
                            {String.fromCharCode(65 + selected)}.{" "}
                            {q.options[selected]}
                          </p>
                        </div>

                        {!correct && (
                          <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4">
                            <p className="text-xs font-bold uppercase tracking-wider text-emerald-700">
                              Correct answer
                            </p>
                            <p className="mt-2 text-sm font-semibold">
                              {String.fromCharCode(65 + q.answer)}.{" "}
                              {q.options[q.answer]}
                            </p>
                          </div>
                        )}

                        <div className="rounded-xl bg-[#F5F8FC] p-5">
                          <p className="text-xs font-bold uppercase tracking-wider text-[#168BC4]">
                            Explanation
                          </p>
                          <p className="mt-2 text-sm leading-7 text-slate-700">
                            {q.explanation}
                          </p>
                        </div>
                      </div>
                    </article>
                  )
                })}
              </div>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <button
                  type="button"
                  onClick={resetQuiz}
                  className="rounded-md bg-[#071B49] px-7 py-3 text-sm font-semibold text-white"
                >
                  Retake Quiz
                </button>

                <Link
                  href="/education/materials/accounting"
                  className="rounded-md border border-[#071B49] bg-white px-7 py-3 text-center text-sm font-semibold text-[#071B49]"
                >
                  Back to Accounting
                </Link>
              </div>
            </div>
          )}
        </div>
      </section>

      <CuraFooter />
    </main>
  )
}
