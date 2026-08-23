export type AccountingQuestion = {
  id: string
  question: string
  options: string[]
  answer: number
  explanation: string
}

export type AccountingSection = {
  title: string
  paragraphs: string[]
  bullets?: string[]
  formula?: string
  example?: {
    title: string
    steps: string[]
  }
}

export type AccountingTopic = {
  slug: string
  title: string
  standard: string
  description: string
  sections: AccountingSection[]
  keyPoints: string[]
  quiz: AccountingQuestion[]
}

export const accountingTopics: AccountingTopic[] = [
  {
    slug: "framework-and-fair-value",
    title: "Conceptual Framework & Fair Value",
    standard: "Conceptual Framework / IFRS 13",
    description: "The conceptual foundations of financial reporting and the principles used when selecting measurement bases and applying fair value.",
    sections: [
      {
        title: "Objective and role of the Framework",
        paragraphs: [
          "The Conceptual Framework supports the development of consistent IFRS Standards and helps preparers and users understand the principles underlying financial reporting.",
          "The Framework is not itself an accounting Standard and does not override the requirements of an IFRS Standard. Where a specific Standard applies, that Standard is followed."
        ],
        bullets: [
          "Identify the applicable IFRS or IAS first.",
          "Use judgement where a transaction is not specifically addressed.",
          "Consider relevant requirements for similar and related issues.",
          "Use the Framework's definitions, recognition concepts and measurement concepts where appropriate."
        ]
      },
      {
        title: "Elements of financial statements",
        paragraphs: [
          "The financial statements describe economic resources and claims and the changes in those resources and claims. The Framework considers assets, liabilities and equity together with income and expenses.",
          "The statement of financial position presents assets, liabilities and equity, while profit or loss and other comprehensive income reports income and expenses in accordance with the applicable Standards."
        ],
        bullets: [
          "Assets",
          "Liabilities",
          "Equity",
          "Income",
          "Expenses"
        ]
      },
      {
        title: "Fair value",
        paragraphs: [
          "Fair value is a market-based measurement. It reflects the price that would be received to sell an asset or paid to transfer a liability in an orderly transaction between market participants at the measurement date.",
          "The fair value hierarchy gives the highest priority to observable market information and the lowest priority to significant unobservable inputs."
        ],
        bullets: [
          "Level 1: quoted prices in active markets for identical items.",
          "Level 2: observable inputs other than Level 1 quoted prices.",
          "Level 3: significant unobservable inputs."
        ]
      }
    ],
    keyPoints: [
      "A specific IFRS requirement takes precedence over the Conceptual Framework.",
      "Assets, liabilities, equity, income and expenses are fundamental elements.",
      "Fair value is market-participant based.",
      "Level 1 inputs are the most directly observable."
    ],
    quiz: [
      {
        id: "fw1",
        question: "If an IFRS Standard specifically addresses a transaction, what should the entity do?",
        options: [
          "Apply the requirements of that IFRS Standard",
          "Ignore the Standard and use management preference",
          "Use tax rules instead",
          "Use fair value in every case"
        ],
        answer: 0,
        explanation: "The source material states that where an issue is specifically addressed by an IFRS/IAS/Interpretation, the required accounting policy is applied."
      },
      {
        id: "fw2",
        question: "Which fair-value level uses quoted prices in active markets for identical items?",
        options: ["Level 1", "Level 2", "Level 3", "No level"],
        answer: 0,
        explanation: "Level 1 inputs are quoted prices in active markets for identical assets or liabilities."
      }
    ]
  },

  {
    slug: "performance-reporting",
    title: "Performance Reporting",
    standard: "IAS 1 / IAS 8",
    description: "Presentation of financial performance, other comprehensive income, accounting policies, estimates and errors.",
    sections: [
      {
        title: "Profit or loss and OCI",
        paragraphs: [
          "Other comprehensive income comprises income and expenses recognised outside profit or loss where required or permitted by particular IFRS Standards.",
          "Total comprehensive income is the total of profit or loss and other comprehensive income for the period."
        ],
        bullets: [
          "Items that may be reclassified to profit or loss include certain foreign exchange translation movements and qualifying cash-flow hedge movements.",
          "Items that are not subsequently reclassified include revaluation movements under IAS 16 and IAS 38 and defined-benefit remeasurements under IAS 19."
        ]
      },
      {
        title: "Accounting policy hierarchy",
        paragraphs: [
          "Where an issue is specifically addressed by an IFRS, IAS or Interpretation, the entity applies that requirement.",
          "Where no Standard specifically addresses the issue, management uses judgement to develop a policy that results in relevant and faithfully represented information."
        ],
        bullets: [
          "Consider IFRS requirements dealing with similar or related issues.",
          "Consider the Conceptual Framework."
        ]
      },
      {
        title: "Changes in estimates and errors",
        paragraphs: [
          "A change in accounting estimate is treated differently from a correction of a prior-period error. The distinction matters because the accounting treatment and effect on comparative information differ.",
          "The material emphasises the need to distinguish changes in accounting policies, changes in estimates and errors when preparing financial statements."
        ]
      }
    ],
    keyPoints: [
      "OCI is recognised outside profit or loss when required by particular Standards.",
      "Some OCI items may be recycled and others may not.",
      "Specific IFRS requirements take priority when selecting accounting policies.",
      "Do not confuse an estimate change with a prior-period error."
    ],
    quiz: [
      {
        id: "pr1",
        question: "Which is an example of an OCI item that is not subsequently reclassified to profit or loss?",
        options: [
          "A revaluation surplus under IAS 16",
          "A normal cash sale",
          "Trade receivables",
          "Inventory purchases"
        ],
        answer: 0,
        explanation: "The source material identifies changes in revaluation surplus under IAS 16 and IAS 38 as items that will not be reclassified."
      },
      {
        id: "pr2",
        question: "When a transaction is specifically addressed by an IFRS Standard, the entity should:",
        options: [
          "Apply that Standard",
          "Develop a completely new policy",
          "Use the tax treatment",
          "Use management's preferred treatment"
        ],
        answer: 0,
        explanation: "The source material expressly places specific IFRS/IAS requirements first in the hierarchy."
      }
    ]
  },

  {
    slug: "tangible-non-current-assets",
    title: "Tangible Non-current Assets",
    standard: "IAS 16 / IAS 20 / IAS 23 / IAS 40",
    description: "PPE, component accounting, depreciation, revaluation, government grants, borrowing costs and investment property.",
    sections: [
      {
        title: "IAS 16 recognition and initial measurement",
        paragraphs: [
          "An item of property, plant and equipment is recognised when future economic benefits are probable and the cost can be measured reliably.",
          "Initial cost includes purchase price and directly attributable expenditure needed to bring the asset to the location and condition necessary for intended operation. Where applicable, the initial estimate of dismantling, removal and restoration obligations is included."
        ],
        bullets: [
          "Purchase price",
          "Directly attributable costs",
          "Installation and preparation costs",
          "Initial dismantling or restoration obligation where applicable"
        ]
      },
      {
        title: "Component accounting",
        paragraphs: [
          "Complex assets can contain significant components with different useful lives. Each significant component is depreciated separately over its own useful life even though the components remain part of the same overall PPE asset.",
          "A major inspection or overhaul can also represent a separate component. When a component is replaced, the carrying amount of the old component is derecognised and the new component is capitalised when recognition criteria are met."
        ]
      },
      {
        title: "Depreciation",
        paragraphs: [
          "Depreciation begins when an asset is available for use. The depreciable amount is allocated systematically over the useful life.",
          "Useful life, residual value and depreciation method are reviewed when required. A change in estimate is reflected in the accounting treatment for the current and future periods affected."
        ],
        formula: "Straight-line depreciation = (Depreciable amount − Residual value) ÷ Useful life"
      },
      {
        title: "Revaluation and disposal",
        paragraphs: [
          "When the revaluation model is used, depreciation is based on the revalued carrying amount. The source material gives the formula: revalued amount less residual value divided by remaining useful life.",
          "On disposal, the carrying amount is derecognised and the resulting gain or loss is recognised as required. Revaluation movements are treated according to the relevant IAS 16 rules."
        ],
        formula: "Depreciation after revaluation = (Revalued amount − Residual value) ÷ Remaining useful life",
        example: {
          title: "Revaluation before transfer to held for sale",
          steps: [
            "First apply the IAS 16 revaluation requirement where applicable.",
            "Then apply IFRS 5 to the asset classified as held for sale.",
            "Measure at the lower of carrying amount and fair value less costs to sell.",
            "Stop depreciation after held-for-sale classification."
          ]
        }
      },
      {
        title: "Related standards",
        paragraphs: [
          "Government grants, qualifying borrowing costs and investment property have their own recognition and measurement requirements. Classification should be established before selecting the measurement model.",
          "A property rented by a parent to its subsidiary can be investment property in the parent's separate financial statements but PPE in the consolidated financial statements because the property is owner-occupied from the group's perspective."
        ]
      },
      {
        title: "Disclosures",
        paragraphs: [
          "IAS 16 requires disclosures for each class of PPE including measurement basis, depreciation method, useful life or depreciation rate, gross carrying amount and accumulated depreciation and a reconciliation of movements.",
          "For revalued assets, disclosures include the basis and date of valuation, whether an independent valuer was used, the carrying amount under the cost model and the revaluation surplus."
        ]
      }
    ],
    keyPoints: [
      "Significant components with different useful lives are depreciated separately.",
      "Depreciation starts when the asset is available for use.",
      "Revalued assets are depreciated using the revalued amount.",
      "PPE disclosures include opening/closing carrying amounts and movements.",
      "Classification determines whether IAS 16, IAS 40 or another Standard applies."
    ],
    quiz: [
      {
        id: "ppe1",
        question: "A significant component of a complex PPE asset with a different useful life should be:",
        options: [
          "Depreciated separately",
          "Ignored until disposal",
          "Always expensed immediately",
          "Classified as inventory"
        ],
        answer: 0,
        explanation: "The IAS 16 material states that significant components with different useful lives are depreciated separately."
      },
      {
        id: "ppe2",
        question: "Depreciation of a revalued asset is based on:",
        options: [
          "The revalued amount less residual value over the remaining useful life",
          "Original cost forever",
          "Fair value less tax",
          "Revenue generated by the asset"
        ],
        answer: 0,
        explanation: "The source material gives the formula: revalued amount minus residual value divided by remaining useful life."
      },
      {
        id: "ppe3",
        question: "Which is required in IAS 16 disclosures for each class of PPE?",
        options: [
          "Measurement basis and depreciation information",
          "Only the purchase invoice",
          "Only tax depreciation",
          "Only the current market price"
        ],
        answer: 0,
        explanation: "IAS 16 requires disclosures including measurement bases, depreciation methods, useful lives/rates and carrying amount reconciliations."
      }
    ]
  },

  {
    slug: "intangible-assets",
    title: "Intangible Assets",
    standard: "IAS 38",
    description: "Recognition, initial measurement, research and development, useful lives, amortisation, revaluation and disclosures.",
    sections: [
      {
        title: "Recognition and initial measurement",
        paragraphs: [
          "An intangible asset is an identifiable non-monetary asset without physical substance. Separately acquired intangible assets are initially measured at cost.",
          "For a separately acquired asset, cost includes purchase price and directly attributable costs of preparing the asset for its intended use. An identifiable intangible acquired in a business combination is measured at acquisition-date fair value."
        ]
      },
      {
        title: "Research and development",
        paragraphs: [
          "Internally generated intangible assets are not normally recognised. Development expenditure is capitalised only after the relevant recognition criteria have been demonstrated.",
          "The source material distinguishes research expenditure from qualifying development expenditure and emphasises that expenditure incurred before the development recognition criteria are met is not subsequently reinstated as an asset."
        ],
        bullets: [
          "Technical feasibility",
          "Intention and ability to complete",
          "Resources to complete",
          "Probable future economic benefits",
          "Ability to measure attributable expenditure reliably"
        ]
      },
      {
        title: "Subsequent measurement",
        paragraphs: [
          "Intangible assets with finite useful lives are amortised over their useful economic lives from when they are available for use.",
          "An intangible asset with an indefinite useful life is not amortised but is subject to impairment testing as required."
        ]
      },
      {
        title: "Revaluation and disclosures",
        paragraphs: [
          "The revaluation model for intangible assets is subject to the conditions in IAS 38, including the availability of an active market. The source material also distinguishes identifiable acquired intangibles from goodwill.",
          "Disclosures include information about useful lives, amortisation methods, carrying amounts and movements."
        ]
      }
    ],
    keyPoints: [
      "Separately acquired intangible assets are initially measured at cost.",
      "Development expenditure is capitalised only after the recognition criteria are met.",
      "Finite-life intangibles are amortised.",
      "Indefinite-life intangibles are not amortised but are tested for impairment."
    ],
    quiz: [
      {
        id: "ia1",
        question: "A separately acquired intangible asset is initially measured at:",
        options: ["Cost", "Zero", "Tax value", "Replacement cost only"],
        answer: 0,
        explanation: "The source material states that separately acquired intangible assets are initially measured at cost."
      },
      {
        id: "ia2",
        question: "Development expenditure can be capitalised when:",
        options: [
          "The relevant development recognition criteria have been met",
          "Management simply wants higher profit",
          "Research has started",
          "The asset has already been sold"
        ],
        answer: 0,
        explanation: "Capitalisation begins only after the IAS 38 development recognition criteria are demonstrated."
      }
    ]
  },

  {
    slug: "impairment-of-assets",
    title: "Impairment of Assets",
    standard: "IAS 36",
    description: "Recoverable amount, value in use, cash-generating units, goodwill and impairment reversals.",
    sections: [
      {
        title: "When is an impairment review required?",
        paragraphs: [
          "Generally an impairment review is conducted when there is an indicator of impairment.",
          "The source material identifies three exceptions requiring an annual impairment review irrespective of whether an indicator exists."
        ],
        bullets: [
          "Goodwill acquired in a business combination",
          "An intangible asset with an indefinite useful life",
          "An intangible asset not yet available for use"
        ]
      },
      {
        title: "Recoverable amount",
        paragraphs: [
          "An asset is impaired when its carrying amount exceeds its recoverable amount. Recoverable amount is determined using the higher of value in use and fair value less costs of disposal.",
          "Value in use is based on future cash flows from continuing use and disposal, discounted using an appropriate rate."
        ],
        formula: "Recoverable amount = higher of value in use and fair value less costs of disposal"
      },
      {
        title: "Cash-generating units",
        paragraphs: [
          "Where an individual asset does not generate cash inflows that are largely independent, impairment is assessed at the cash-generating unit level.",
          "The source material states that a CGU impairment loss is allocated first to obviously impaired assets, then purchased goodwill, and then to other assets on a pro-rata basis, subject to the floor of each asset's own recoverable amount."
        ]
      },
      {
        title: "Goodwill and reversals",
        paragraphs: [
          "Goodwill is tested within the relevant CGU or group of CGUs. The source material specifically highlights goodwill as one of the assets requiring annual impairment testing.",
          "Impairment reversals are subject to the relevant IAS 36 restrictions. An impairment loss recognised for goodwill is not reversed."
        ]
      }
    ],
    keyPoints: [
      "Annual testing applies to goodwill and certain intangible assets.",
      "Recoverable amount is the higher of VIU and FVLCD.",
      "CGU losses follow the allocation order in IAS 36.",
      "No asset should be written down below its own recoverable amount."
    ],
    quiz: [
      {
        id: "imp1",
        question: "Which asset requires annual impairment testing even without an impairment indicator?",
        options: ["Goodwill", "Ordinary inventory", "Trade payables", "Cash only"],
        answer: 0,
        explanation: "The source material identifies goodwill, indefinite-life intangibles and intangibles not yet available for use."
      },
      {
        id: "imp2",
        question: "Recoverable amount is:",
        options: [
          "The higher of VIU and fair value less costs of disposal",
          "The lower of cost and fair value",
          "Always historical cost",
          "Always fair value"
        ],
        answer: 0,
        explanation: "This is the IAS 36 recoverable amount principle."
      },
      {
        id: "imp3",
        question: "In CGU impairment allocation, purchased goodwill is allocated after:",
        options: [
          "Obviously impaired assets",
          "All other assets",
          "Tax liabilities",
          "Cash only"
        ],
        answer: 0,
        explanation: "The source material gives the order: obviously impaired assets, purchased goodwill, then other assets pro rata."
      }
    ]
  },

  {
    slug: "agriculture-and-inventories",
    title: "Agriculture & Inventories",
    standard: "IAS 41 / IAS 2",
    description: "Biological assets, agricultural produce and inventory accounting.",
    sections: [
      {
        title: "Biological assets",
        paragraphs: [
          "Agricultural activity involves biological transformation and harvest of biological assets. IAS 41 applies to biological assets and agricultural produce at the point of harvest, subject to its scope requirements.",
          "The material distinguishes biological assets from land, bearer plants and intangible assets."
        ]
      },
      {
        title: "Items outside IAS 41",
        paragraphs: [
          "IAS 41 does not apply to intangible assets such as production quotas, bearer plants or land related to agricultural activity.",
          "Land is not a biological asset and is treated as a tangible non-current asset under IAS 16. Where a forest is valued, the trees and the land are considered separately."
        ]
      },
      {
        title: "Inventories",
        paragraphs: [
          "Inventory accounting considers the cost of inventories and their subsequent measurement. The inventory model is distinct from the fair-value-based treatment applicable to qualifying biological assets."
        ]
      }
    ],
    keyPoints: [
      "Land is not a biological asset.",
      "Bearer plants are outside IAS 41's biological-asset model.",
      "Trees and land are accounted for separately where relevant.",
      "Inventory accounting follows IAS 2."
    ],
    quiz: [
      {
        id: "ag1",
        question: "Which is outside the scope of IAS 41 as a biological asset?",
        options: ["Land", "Growing animals", "Growing crops", "Biological transformation"],
        answer: 0,
        explanation: "The source material states that land is not a biological asset and IAS 16 applies to it."
      }
    ]
  },

  {
    slug: "held-for-sale",
    title: "Non-current Assets Held for Sale & Discontinued Operations",
    standard: "IFRS 5",
    description: "Classification, measurement and presentation of non-current assets and disposal groups held for sale.",
    sections: [
      {
        title: "Classification",
        paragraphs: [
          "A non-current asset or disposal group is classified as held for sale when its carrying amount will be recovered principally through sale rather than continuing use and the IFRS 5 criteria are met.",
          "The sale must generally be highly probable, the asset must be available for immediate sale in its present condition and management must be committed to an active sale plan."
        ]
      },
      {
        title: "Measurement",
        paragraphs: [
          "After classification, the asset or disposal group is measured at the lower of carrying amount and fair value less costs to sell.",
          "Depreciation is stopped after classification as held for sale."
        ],
        formula: "Held-for-sale carrying amount = lower of carrying amount and fair value less costs to sell"
      },
      {
        title: "Interaction with IAS 16",
        paragraphs: [
          "The source material provides an example in which a revalued machine first has its IAS 16 revaluation accounted for and is then transferred to held-for-sale classification.",
          "This illustrates an important sequence: apply the applicable measurement requirement before classification and then apply IFRS 5."
        ]
      },
      {
        title: "Discontinued operations",
        paragraphs: [
          "Where a disposal group represents a discontinued operation under IFRS 5, its results and relevant cash flows are presented separately from continuing operations."
        ]
      }
    ],
    keyPoints: [
      "Recovery must be principally through sale.",
      "Measure at the lower of carrying amount and FVLCTS.",
      "Stop depreciation after held-for-sale classification.",
      "Apply other applicable measurement requirements before the IFRS 5 measurement step where required."
    ],
    quiz: [
      {
        id: "hfs1",
        question: "After classification as held for sale, an asset is measured at:",
        options: [
          "Lower of carrying amount and fair value less costs to sell",
          "Higher of carrying amount and fair value",
          "Historical cost",
          "Tax written-down value"
        ],
        answer: 0,
        explanation: "IFRS 5 requires measurement at the lower of carrying amount and fair value less costs to sell."
      },
      {
        id: "hfs2",
        question: "What happens to depreciation after held-for-sale classification?",
        options: ["It stops", "It doubles", "It continues unchanged", "It moves to OCI"],
        answer: 0,
        explanation: "The source example explicitly states that depreciation is stopped."
      }
    ]
  },

  {
    slug: "revenue",
    title: "Revenue",
    standard: "IFRS 15",
    description: "The five-step revenue model, contract modifications, performance obligations, variable consideration and complex arrangements.",
    sections: [
      {
        title: "Five-step model",
        paragraphs: [
          "IFRS 15 provides a five-step model for recognising revenue from contracts with customers.",
          "The steps are to identify the contract, identify performance obligations, determine the transaction price, allocate the transaction price and recognise revenue when or as performance obligations are satisfied."
        ],
        bullets: [
          "1. Identify the contract",
          "2. Identify performance obligations",
          "3. Determine transaction price",
          "4. Allocate transaction price",
          "5. Recognise revenue"
        ]
      },
      {
        title: "Performance obligations",
        paragraphs: [
          "A performance obligation is a promise to transfer a distinct good or service to the customer. Distinct goods or services are assessed in the context of the contract.",
          "A contract may contain multiple performance obligations, requiring the transaction price to be allocated based on relative standalone selling prices."
        ]
      },
      {
        title: "Variable consideration",
        paragraphs: [
          "Variable consideration is estimated using the method that best predicts the amount to which the entity expects to be entitled, subject to the variable consideration constraint.",
          "Examples include discounts, rebates, refunds, bonuses, penalties and other performance-related amounts."
        ]
      },
      {
        title: "Over-time and point-in-time recognition",
        paragraphs: [
          "Revenue is recognised over time when the relevant IFRS 15 criteria are met, such as where the customer simultaneously receives and consumes benefits or controls an asset as it is created.",
          "Otherwise revenue is recognised when control transfers at a point in time."
        ]
      }
    ],
    keyPoints: [
      "Use the five-step model.",
      "Identify distinct performance obligations.",
      "Allocate consideration using relative standalone selling prices.",
      "Apply the variable consideration constraint.",
      "Determine whether control transfers over time or at a point in time."
    ],
    quiz: [
      {
        id: "rev1",
        question: "Which is the third step of IFRS 15?",
        options: ["Determine the transaction price", "Identify the contract", "Allocate the price", "Recognise revenue"],
        answer: 0,
        explanation: "The five steps place determination of transaction price third."
      },
      {
        id: "rev2",
        question: "Where a contract has multiple distinct performance obligations, consideration is generally allocated using:",
        options: [
          "Relative standalone selling prices",
          "Tax values",
          "Equal amounts automatically",
          "The cheapest item first"
        ],
        answer: 0,
        explanation: "IFRS 15 generally allocates the transaction price based on relative standalone selling prices."
      }
    ]
  },

  {
    slug: "leases",
    title: "Leases",
    standard: "IFRS 16",
    description: "Lease identification, right-of-use assets, lease liabilities, exemptions, subsequent measurement and lessor accounting.",
    sections: [
      {
        title: "IFRS 16 overview",
        paragraphs: [
          "IFRS 16 superseded IAS 17 and changed lessee accounting by removing the previous operating-versus-finance lease distinction for most lessees.",
          "The standard is effective for periods beginning on or after 1 January 2019."
        ]
      },
      {
        title: "Identifying a lease",
        paragraphs: [
          "A contract contains a lease when it conveys the right to control the use of an identified asset for a period of time in exchange for consideration.",
          "The customer assesses whether it has the right to obtain substantially all economic benefits and to direct how and for what purpose the identified asset is used."
        ]
      },
      {
        title: "Lessee accounting",
        paragraphs: [
          "A lessee generally recognises a right-of-use asset and a lease liability at commencement, subject to applicable exemptions such as short-term and low-value leases.",
          "The lease liability is initially measured using the present value of qualifying unpaid lease payments."
        ],
        formula: "Initial lease liability = present value of qualifying unpaid lease payments"
      },
      {
        title: "Subsequent measurement",
        paragraphs: [
          "The lease liability increases for interest and decreases when lease payments are made. The right-of-use asset is depreciated and assessed for impairment where relevant.",
          "Specified changes can require lease-liability remeasurement and corresponding adjustment to the right-of-use asset."
        ]
      },
      {
        title: "Lessor accounting",
        paragraphs: [
          "Lessor accounting retains the distinction between finance leases and operating leases. Classification depends on whether substantially all risks and rewards incidental to ownership have transferred."
        ]
      }
    ],
    keyPoints: [
      "IFRS 16 replaced IAS 17 for periods beginning on or after 1 January 2019.",
      "Most lessees recognise a ROU asset and lease liability.",
      "Lease liabilities use present-value measurement.",
      "Lessors continue to classify leases as finance or operating."
    ],
    quiz: [
      {
        id: "lease1",
        question: "IFRS 16 replaced:",
        options: ["IAS 17", "IAS 16", "IAS 2", "IFRS 2"],
        answer: 0,
        explanation: "The source material states that IFRS 16 supersedes IAS 17."
      },
      {
        id: "lease2",
        question: "A typical lessee recognises at commencement:",
        options: [
          "A right-of-use asset and lease liability",
          "Only rent expense",
          "Only an intangible asset",
          "Only a provision"
        ],
        answer: 0,
        explanation: "IFRS 16 generally brings leases onto the lessee's statement of financial position."
      }
    ]
  },

  {
    slug: "employee-benefits",
    title: "Employee Benefits",
    standard: "IAS 19",
    description: "Short-term benefits, post-employment plans, defined contribution and defined benefit accounting.",
    sections: [
      {
        title: "Categories",
        paragraphs: [
          "IAS 19 addresses short-term employee benefits, post-employment benefits, other long-term employee benefits and termination benefits."
        ]
      },
      {
        title: "Defined contribution plans",
        paragraphs: [
          "Under a defined contribution plan, the employer's obligation is normally limited to the agreed contribution. Contributions are recognised as an expense as employees render service, subject to accruals and prepayments."
        ]
      },
      {
        title: "Defined benefit plans",
        paragraphs: [
          "Defined benefit accounting measures the present value of the defined benefit obligation and deducts the fair value of plan assets to determine the net defined benefit liability or asset, subject to the asset ceiling.",
          "Service cost and net interest are recognised in profit or loss. Remeasurements are recognised in other comprehensive income."
        ]
      },
      {
        title: "Remeasurements",
        paragraphs: [
          "Remeasurements include actuarial gains and losses, the return on plan assets excluding amounts included in net interest and changes arising from the asset ceiling. These are recognised in OCI and are not subsequently reclassified to profit or loss."
        ]
      }
    ],
    keyPoints: [
      "Defined contribution accounting focuses on the contribution obligation.",
      "Defined benefit plans require actuarial measurement.",
      "Service cost and net interest are recognised in profit or loss.",
      "Defined benefit remeasurements are recognised in OCI."
    ],
    quiz: [
      {
        id: "eb1",
        question: "Defined benefit plan remeasurements are recognised in:",
        options: ["OCI", "Revenue", "Inventory", "Share capital"],
        answer: 0,
        explanation: "The source material identifies defined benefit remeasurement components as OCI items that are not recycled."
      }
    ]
  },

  {
    slug: "share-based-payments",
    title: "Share-based Payments",
    standard: "IFRS 2",
    description: "Equity-settled and cash-settled arrangements, vesting conditions, modifications, cancellations and disclosures.",
    sections: [
      {
        title: "Equity-settled arrangements",
        paragraphs: [
          "For equity-settled share-based payments, goods or services received are recognised with a corresponding increase in equity. Employee awards are generally measured using grant-date fair value and recognised over the vesting period.",
          "Non-market vesting conditions affect the estimate of awards expected to vest, whereas market conditions are reflected in grant-date fair value."
        ]
      },
      {
        title: "Cash-settled arrangements",
        paragraphs: [
          "Cash-settled share-based payments create a liability. The liability is remeasured at fair value at each reporting date, with changes recognised in profit or loss."
        ]
      },
      {
        title: "Modifications and cancellations",
        paragraphs: [
          "When an award is modified, the original grant-date fair value generally continues to be recognised. Where a modification increases fair value from the employee's perspective, the incremental amount is recognised over the remaining vesting period.",
          "Cancellation during the vesting period generally accelerates recognition of the amount that would otherwise have been recognised over the remaining vesting period."
        ]
      },
      {
        title: "Group arrangements and disclosures",
        paragraphs: [
          "Where one group entity receives goods or services and another group entity settles the share-based payment, the entity receiving the goods or services accounts for them under IFRS 2.",
          "Disclosures include a description of share-based payment arrangements, option movements, total expense and information enabling users to understand fair-value determination."
        ]
      }
    ],
    keyPoints: [
      "Equity-settled employee awards use grant-date fair value.",
      "Cash-settled liabilities are remeasured.",
      "Market conditions are reflected in grant-date fair value.",
      "IFRS 2 applies to group share-based payment arrangements."
    ],
    quiz: [
      {
        id: "sbp1",
        question: "A cash-settled share-based payment liability is:",
        options: [
          "Remeasured at fair value at each reporting date",
          "Fixed at grant date",
          "Never recognised",
          "Always recognised in OCI"
        ],
        answer: 0,
        explanation: "The source material states that cash-settled liabilities are remeasured at fair value."
      },
      {
        id: "sbp2",
        question: "Which condition is reflected in grant-date fair value?",
        options: ["Market condition", "Employee attendance only", "Tax residency", "Payroll date"],
        answer: 0,
        explanation: "Market conditions are incorporated into the grant-date fair-value measurement."
      }
    ]
  },

  {
    slug: "events-provisions-contingencies",
    title: "Events After Reporting Period, Provisions & Contingencies",
    standard: "IAS 10 / IAS 37",
    description: "Adjusting and non-adjusting events, provisions, contingent liabilities, contingent assets, onerous contracts and restructuring.",
    sections: [
      {
        title: "Events after the reporting period",
        paragraphs: [
          "Events after the reporting period are events occurring between the reporting date and the date the financial statements are authorised for issue.",
          "Adjusting events provide evidence of conditions existing at the reporting date. Material non-adjusting events concern conditions arising after the reporting date and are disclosed when necessary for users to make proper evaluations and decisions."
        ],
        bullets: [
          "Material non-adjusting event: disclose the nature of the event.",
          "Disclose an estimate of financial effect, or state that it cannot be made."
        ]
      },
      {
        title: "Provision recognition",
        paragraphs: [
          "A provision is recognised when there is a present legal or constructive obligation arising from a past event, an outflow of resources embodying economic benefits is probable and a reliable estimate can be made."
        ]
      },
      {
        title: "Onerous contracts",
        paragraphs: [
          "An onerous contract is one where the unavoidable costs of meeting the obligations exceed the economic benefits expected to be received. The present obligation gives rise to a provision subject to the applicable requirements."
        ]
      },
      {
        title: "Restructuring provisions",
        paragraphs: [
          "A restructuring provision includes only direct expenditures arising from the restructuring that are both directly caused by the restructuring and not associated with ongoing activities.",
          "The source material identifies employee termination benefits relating directly to the restructuring, contract termination costs, onerous contract provisions and directly related consulting fees as examples of costs that can be included."
        ]
      },
      {
        title: "Contingent liabilities and assets",
        paragraphs: [
          "Contingent liabilities are not recognised but are normally disclosed unless the possibility of outflow is remote. Contingent assets are not recognised; disclosure is considered when an inflow is probable and recognition occurs only when the inflow is virtually certain."
        ]
      }
    ],
    keyPoints: [
      "Adjusting events relate to conditions existing at reporting date.",
      "A provision requires a present obligation, probable outflow and reliable estimate.",
      "Restructuring provisions include only qualifying direct costs.",
      "Material non-adjusting events require appropriate disclosure."
    ],
    quiz: [
      {
        id: "epc1",
        question: "Which is NOT a provision recognition criterion?",
        options: ["Guaranteed future profit", "Present obligation", "Probable outflow", "Reliable estimate"],
        answer: 0,
        explanation: "The three recognition criteria are a present obligation, probable outflow and reliable estimate."
      },
      {
        id: "epc2",
        question: "A material non-adjusting event is disclosed with:",
        options: [
          "Its nature and an estimate of financial effect, where possible",
          "Only its date",
          "Only its tax impact",
          "No information"
        ],
        answer: 0,
        explanation: "The source material specifies disclosure of the nature and an estimate of financial effect or a statement that it cannot be made."
      }
    ]
  },

  {
    slug: "financial-assets-and-liabilities",
    title: "Financial Assets & Financial Liabilities",
    standard: "IFRS 9",
    description: "Classification, measurement and impairment of financial instruments.",
    sections: [
      {
        title: "Financial asset classification",
        paragraphs: [
          "IFRS 9 classification of financial assets considers the entity's business model for managing the assets and the contractual cash-flow characteristics.",
          "The main measurement categories include amortised cost, fair value through other comprehensive income and fair value through profit or loss."
        ]
      },
      {
        title: "Amortised cost and SPPI",
        paragraphs: [
          "An asset is generally measured at amortised cost where it is held within a business model whose objective is to collect contractual cash flows and those cash flows meet the relevant principal-and-interest characteristics.",
          "The contractual cash-flow assessment is commonly described as the solely payments of principal and interest test."
        ]
      },
      {
        title: "Expected credit losses",
        paragraphs: [
          "IFRS 9 uses an expected credit loss model. The approach recognises expected losses rather than waiting for an incurred loss event.",
          "The measurement and staging of expected credit losses depend on changes in credit risk and the nature of the financial instrument."
        ]
      },
      {
        title: "Financial liabilities",
        paragraphs: [
          "Financial liabilities are generally measured at amortised cost unless a specific IFRS 9 requirement requires fair-value measurement through profit or loss or another treatment."
        ]
      }
    ],
    keyPoints: [
      "Business model and contractual cash flows drive financial asset classification.",
      "SPPI is central to amortised-cost and FVOCI classification.",
      "IFRS 9 uses an expected credit loss model.",
      "Financial liabilities generally use amortised cost unless specific requirements apply."
    ],
    quiz: [
      {
        id: "fa1",
        question: "Financial asset classification under IFRS 9 considers:",
        options: [
          "Business model and contractual cash-flow characteristics",
          "Only tax rates",
          "Only market share",
          "Only dividend policy"
        ],
        answer: 0,
        explanation: "These are the two core classification factors under IFRS 9."
      },
      {
        id: "fa2",
        question: "IFRS 9 impairment is based on:",
        options: ["Expected credit losses", "Incurred losses only", "Tax losses", "Inventory losses"],
        answer: 0,
        explanation: "IFRS 9 introduced the expected credit loss impairment model."
      }
    ]
  },

  {
    slug: "taxation",
    title: "Taxation",
    standard: "IAS 12",
    description: "Current tax, deferred tax, temporary differences and recognition of deferred tax assets and liabilities.",
    sections: [
      {
        title: "Current tax",
        paragraphs: [
          "Current tax is the amount of income tax payable or recoverable for the period based on taxable profit or tax losses, using tax rates enacted or substantively enacted by the reporting date."
        ]
      },
      {
        title: "Temporary differences",
        paragraphs: [
          "Deferred tax is based on temporary differences between the carrying amount of an asset or liability in the statement of financial position and its tax base.",
          "Taxable temporary differences generally result in deferred tax liabilities, subject to the applicable IAS 12 recognition requirements."
        ]
      },
      {
        title: "Deferred tax assets",
        paragraphs: [
          "Deductible temporary differences and unused tax losses or credits can give rise to deferred tax assets where the relevant recognition criteria are satisfied, including the availability of probable future taxable profits."
        ]
      }
    ],
    keyPoints: [
      "Current tax concerns taxable profit or tax losses.",
      "Deferred tax is based on temporary differences.",
      "Deferred tax assets require the relevant recognition conditions to be met."
    ],
    quiz: [
      {
        id: "tax1",
        question: "Deferred tax primarily arises from:",
        options: ["Temporary differences", "Revenue alone", "Cash balances alone", "Dividends alone"],
        answer: 0,
        explanation: "IAS 12 bases deferred tax on temporary differences between carrying amounts and tax bases."
      }
    ]
  },

  {
    slug: "earnings-per-share",
    title: "Earnings Per Share",
    standard: "IAS 33",
    description: "Basic and diluted EPS, weighted-average ordinary shares and potential ordinary shares.",
    sections: [
      {
        title: "Basic EPS",
        paragraphs: [
          "Basic EPS is calculated using profit or loss attributable to ordinary equity holders of the parent divided by the weighted-average number of ordinary shares outstanding during the period."
        ],
        formula: "Basic EPS = Profit attributable to ordinary shareholders ÷ Weighted-average ordinary shares"
      },
      {
        title: "Diluted EPS",
        paragraphs: [
          "Diluted EPS reflects the potential dilution arising from instruments such as convertible instruments, options and warrants when their inclusion is dilutive.",
          "Potential ordinary shares are included only when their effect decreases earnings per share or increases loss per share."
        ]
      },
      {
        title: "Share changes",
        paragraphs: [
          "The weighted-average number of ordinary shares reflects the period for which shares are outstanding. Certain capitalisation issues, bonus issues and similar transactions require retrospective adjustment."
        ]
      }
    ],
    keyPoints: [
      "Basic EPS uses attributable profit and weighted-average ordinary shares.",
      "Diluted EPS includes dilutive potential ordinary shares.",
      "Some share transactions require retrospective adjustment."
    ],
    quiz: [
      {
        id: "eps1",
        question: "Basic EPS divides attributable profit by:",
        options: ["Weighted-average ordinary shares", "Closing assets", "Revenue", "Total liabilities"],
        answer: 0,
        explanation: "That is the basic IAS 33 calculation."
      }
    ]
  },

  {
    slug: "statement-of-cash-flows",
    title: "Statement of Cash Flows",
    standard: "IAS 7",
    description: "Operating, investing and financing cash flows and the direct and indirect methods.",
    sections: [
      {
        title: "Operating activities",
        paragraphs: [
          "Operating activities are the principal revenue-producing activities and other activities that are not investing or financing activities."
        ]
      },
      {
        title: "Investing activities",
        paragraphs: [
          "Investing activities involve acquisition and disposal of long-term assets and other investments that are not cash equivalents."
        ]
      },
      {
        title: "Financing activities",
        paragraphs: [
          "Financing activities result in changes in the size and composition of contributed equity and borrowings."
        ]
      },
      {
        title: "Direct and indirect methods",
        paragraphs: [
          "Operating cash flows can be presented using the direct method or indirect method. The indirect method reconciles profit or loss to operating cash flow by adjusting for non-cash items and working-capital movements."
        ]
      }
    ],
    keyPoints: [
      "Classify cash flows as operating, investing or financing.",
      "Investing covers long-term assets and investments.",
      "Financing covers equity and borrowings."
    ],
    quiz: [
      {
        id: "cash1",
        question: "Cash paid to acquire PPE is normally:",
        options: ["An investing cash flow", "An operating cash flow", "A financing cash flow", "Not a cash flow"],
        answer: 0,
        explanation: "Acquisition of long-term assets is normally an investing activity."
      }
    ]
  },

  {
    slug: "adopting-new-accounting-standards",
    title: "Adopting New Accounting Standards",
    standard: "IAS 8 / Specific Transition Guidance",
    description: "Transition requirements and the wider practical consequences of adopting new or amended accounting Standards.",
    sections: [
      {
        title: "Transition guidance",
        paragraphs: [
          "New accounting Standards often contain their own transitional guidance. For example, the transition from IAS 17 to IFRS 16 was addressed by the new Standard.",
          "Where no specific transition guidance is provided, IAS 8 Accounting Policies, Changes in Accounting Estimates and Errors is applied as appropriate."
        ]
      },
      {
        title: "Operational implications",
        paragraphs: [
          "Adoption is not simply a journal-entry exercise. The source material highlights possible effects on profit-related bonuses, IT systems and loan covenants."
        ],
        bullets: [
          "Bonus and performance-related pay may change.",
          "IT systems may need modification.",
          "Financial ratios may change.",
          "Loan covenants may be affected."
        ]
      },
      {
        title: "Investor and people implications",
        paragraphs: [
          "A new Standard can affect earnings per share and how analysts perceive the entity. Staff may also need training, and additional recruitment may be necessary."
        ]
      }
    ],
    keyPoints: [
      "Check the new Standard's transition guidance first.",
      "IAS 8 applies where relevant when specific transition guidance is absent.",
      "Implementation can affect bonuses, IT systems and loan covenants.",
      "EPS and investor perception can also be affected."
    ],
    quiz: [
      {
        id: "adopt1",
        question: "When adopting a new Standard, the entity should first consider:",
        options: [
          "The Standard's specific transitional guidance",
          "Its dividend target",
          "Its tax return",
          "Its marketing budget"
        ],
        answer: 0,
        explanation: "The source material explicitly states that transitional guidance should be considered before applying general IAS 8 requirements."
      }
    ]
  },

  {
    slug: "small-and-medium-entities",
    title: "Small and Medium Entities",
    standard: "IFRS for SMEs",
    description: "Key differences and accounting choices under the IFRS for SMEs Standard.",
    sections: [
      {
        title: "Purpose and scope",
        paragraphs: [
          "The IFRS for SMEs Standard is designed as a simplified financial reporting framework for eligible entities without public accountability."
        ]
      },
      {
        title: "Accounting choices",
        paragraphs: [
          "The source material highlights that several accounting policy choices available under full IFRS are not available under the SMEs Standard.",
          "For example, the fair-value method for measuring non-controlling interest is not available for goodwill calculations under the source material."
        ]
      },
      {
        title: "Intangibles and investment property",
        paragraphs: [
          "Under the source material, intangible assets are accounted for at cost less accumulated amortisation and impairment; the revaluation model is not permitted.",
          "Investment property is remeasured to fair value at year end with gains or losses in profit or loss. The cost model is used only where fair value cannot be measured reliably without undue cost or effort."
        ]
      }
    ],
    keyPoints: [
      "IFRS for SMEs is a simplified framework for eligible entities.",
      "Some full-IFRS accounting policy choices are unavailable.",
      "The source material prohibits intangible-asset revaluation under the SMEs Standard.",
      "Investment property generally uses fair value where it can be measured reliably without undue cost or effort."
    ],
    quiz: [
      {
        id: "sme1",
        question: "Under the source material, which model is not permitted for intangible assets under IFRS for SMEs?",
        options: ["Revaluation model", "Cost model", "Amortisation", "Impairment"],
        answer: 0,
        explanation: "The source material states that the revaluation model is not permitted for intangible assets under the SMEs Standard."
      }
    ]
  },

  {
    slug: "consolidated-principles",
    title: "Consolidated Financial Statements — Principles",
    standard: "IFRS 3 / IFRS 10 / IAS 28",
    description: "Control, group accounts and the principal standards governing consolidated financial statements.",
    sections: [
      {
        title: "Relevant Standards",
        paragraphs: [
          "The source material identifies IFRS 3 Business Combinations, IFRS 10 Consolidated Financial Statements and IAS 28 Investments in Associates and Joint Ventures as the principal standards relevant to the preparation of consolidated financial statements."
        ]
      },
      {
        title: "Group reporting",
        paragraphs: [
          "Each company in a group prepares its own accounting records and annual financial statements. From those individual financial statements, the parent prepares consolidated financial statements.",
          "The consolidated financial statements present the group as a single economic entity."
        ]
      },
      {
        title: "Control",
        paragraphs: [
          "IFRS 10 uses control as the basis for consolidation. Control involves power over the investee, exposure or rights to variable returns and the ability to use power to affect those returns."
        ]
      },
      {
        title: "Consolidation exemptions",
        paragraphs: [
          "Where an exemption from preparing consolidated financial statements is permitted, IFRS 10 requires relevant disclosures. The source material notes that poor performance, poor financial position or different activities are not valid reasons for avoiding consolidation."
        ]
      }
    ],
    keyPoints: [
      "IFRS 10 is based on control.",
      "The parent prepares consolidated financial statements from group companies' individual accounts.",
      "Poor performance is not a valid reason to exclude a subsidiary.",
      "IFRS 3 and IAS 28 also form part of the consolidation framework."
    ],
    quiz: [
      {
        id: "con1",
        question: "The fundamental basis for consolidation under IFRS 10 is:",
        options: ["Control", "Revenue", "Equal ownership", "Tax residency"],
        answer: 0,
        explanation: "IFRS 10 uses control as the basis for determining whether an investee is consolidated."
      },
      {
        id: "con2",
        question: "Which is NOT a valid reason for avoiding consolidation?",
        options: ["Poor performance of the subsidiary", "A permitted IFRS exemption", "A qualifying investment structure", "A specific IFRS requirement"],
        answer: 0,
        explanation: "The source material explicitly states that poor performance, poor financial position and differing activities are not permitted reasons."
      }
    ]
  },

  {
    slug: "consolidated-statement-financial-position",
    title: "Consolidated Statement of Financial Position",
    standard: "IFRS 3 / IFRS 10",
    description: "Acquisition-date net assets, goodwill, non-controlling interest and consolidation adjustments.",
    sections: [
      {
        title: "Net assets of the subsidiary",
        paragraphs: [
          "The fair value of assets acquired and liabilities assumed is analysed through the subsidiary's net assets at acquisition date and reporting date. A post-acquisition movement column helps identify the portion arising after acquisition.",
          "The source material's working schedule lists assets, liabilities and equity components and compares acquisition-date values with reporting-date values."
        ]
      },
      {
        title: "Goodwill",
        paragraphs: [
          "Goodwill arises from the acquisition method by comparing the consideration and relevant interests in the acquiree with the acquisition-date fair value of identifiable net assets acquired."
        ]
      },
      {
        title: "NCI",
        paragraphs: [
          "Non-controlling interest represents the part of a subsidiary not attributable to the parent. Its measurement affects the acquisition calculation and the allocation of post-acquisition results."
        ]
      },
      {
        title: "Intra-group adjustments",
        paragraphs: [
          "Intra-group balances and transactions are eliminated so that the consolidated financial statements present the group as a single economic entity. Unrealised profits and related depreciation adjustments are also addressed where relevant."
        ]
      }
    ],
    keyPoints: [
      "Prepare an acquisition-date and reporting-date net-assets analysis.",
      "Calculate goodwill using acquisition-date values.",
      "Recognise NCI separately.",
      "Eliminate intra-group balances and unrealised profits."
    ],
    quiz: [
      {
        id: "csfp1",
        question: "Why is a post-acquisition movement column useful in a net-assets schedule?",
        options: [
          "It isolates changes arising after acquisition",
          "It calculates tax only",
          "It replaces goodwill",
          "It removes NCI"
        ],
        answer: 0,
        explanation: "The source material uses acquisition-date and reporting-date columns with a third column for post-acquisition changes."
      }
    ]
  },

  {
    slug: "consolidated-profit-or-loss",
    title: "Consolidated Statement of Profit or Loss",
    standard: "IFRS 10",
    description: "Post-acquisition results, intra-group adjustments and NCI in consolidated profit or loss.",
    sections: [
      {
        title: "Post-acquisition results",
        paragraphs: [
          "When a subsidiary is acquired during the year, its income and expenses are included in the consolidated statement of profit or loss from the date control is obtained."
        ]
      },
      {
        title: "Disposal during the year",
        paragraphs: [
          "Where control is lost during the year, the subsidiary's results are included only up to the disposal date. The source material illustrates a parent with full-year income and expenses and a subsidiary contributing income and expenses only for the period before disposal."
        ]
      },
      {
        title: "Intra-group transactions",
        paragraphs: [
          "Intra-group income and expenses are eliminated. Unrealised profit on intra-group transfers is also eliminated, together with related adjustments such as excess depreciation where relevant."
        ]
      }
    ],
    keyPoints: [
      "Consolidate subsidiary results from the acquisition date.",
      "Stop consolidating the subsidiary when control is lost.",
      "Eliminate intra-group income and expenses.",
      "Eliminate unrealised intra-group profits."
    ],
    quiz: [
      {
        id: "cspl1",
        question: "A subsidiary acquired halfway through a reporting period contributes to group profit or loss:",
        options: [
          "From the date control is obtained",
          "For the whole year automatically",
          "Only after year-end",
          "Never"
        ],
        answer: 0,
        explanation: "Consolidation starts when control is obtained."
      }
    ]
  },

  {
    slug: "change-in-group-structure",
    title: "Change in Group Structure",
    standard: "IFRS 10 / IFRS 3",
    description: "Changes in ownership, acquisition and disposal effects within a group structure.",
    sections: [
      {
        title: "Changes in control",
        paragraphs: [
          "Changes in group structure require careful analysis of whether control is obtained or lost and the date on which that event occurs.",
          "The accounting consequences differ significantly depending on whether control is retained or lost."
        ]
      },
      {
        title: "Disposal calculations",
        paragraphs: [
          "The source material includes disposal illustrations and shows that consolidated profit or loss includes the subsidiary's results only up to the relevant disposal date."
        ]
      },
      {
        title: "Presentation",
        paragraphs: [
          "The consolidated financial statements need to reflect the change in group structure, including the appropriate treatment of retained interests and the resulting gain or loss where control is lost."
        ]
      }
    ],
    keyPoints: [
      "Identify the exact date control changes.",
      "Retained control and lost control have different accounting consequences.",
      "Subsidiary results are time-apportioned where control changes during the year."
    ],
    quiz: [
      {
        id: "cgs1",
        question: "When control is lost during the year, the subsidiary's results are generally consolidated:",
        options: [
          "Up to the date control is lost",
          "For the next five years",
          "For the full following year",
          "Never"
        ],
        answer: 0,
        explanation: "The source material's disposal illustration shows the subsidiary's results included only up to the disposal date."
      }
    ]
  },

  {
    slug: "associates-and-joint-ventures",
    title: "Associates & Joint Ventures",
    standard: "IAS 28 / IFRS 11",
    description: "Significant influence, joint arrangements and the equity method.",
    sections: [
      {
        title: "Associates",
        paragraphs: [
          "An associate is an investee over which the investor has significant influence but not control or joint control.",
          "The equity method is generally used for investments in associates within the scope of IAS 28."
        ]
      },
      {
        title: "Equity method",
        paragraphs: [
          "The investment is initially recognised at cost and subsequently adjusted for the investor's share of post-acquisition profit or loss and other comprehensive income. Distributions received reduce the carrying amount."
        ]
      },
      {
        title: "Joint arrangements",
        paragraphs: [
          "IFRS 11 distinguishes joint operations from joint ventures based on the rights and obligations of the parties. The accounting depends on the nature of those rights and obligations."
        ]
      }
    ],
    keyPoints: [
      "Associates involve significant influence.",
      "Equity accounting reflects the investor's share of post-acquisition results.",
      "Dividends from an associate reduce the investment carrying amount.",
      "Joint operations and joint ventures are distinguished by rights and obligations."
    ],
    quiz: [
      {
        id: "ajv1",
        question: "An associate involves:",
        options: ["Significant influence", "Control", "No influence", "Only legal title"],
        answer: 0,
        explanation: "Significant influence is the defining relationship for an associate."
      },
      {
        id: "ajv2",
        question: "Under the equity method, dividends received from an associate generally:",
        options: [
          "Reduce the investment carrying amount",
          "Increase the investment automatically",
          "Create goodwill",
          "Are ignored"
        ],
        answer: 0,
        explanation: "Distributions reduce the carrying amount of an equity-accounted investment."
      }
    ]
  },

  {
    slug: "group-disposals",
    title: "Group Disposals",
    standard: "IFRS 10 / IFRS 5",
    description: "Disposal of subsidiaries, loss of control and the resulting consolidated accounting.",
    sections: [
      {
        title: "Loss of control",
        paragraphs: [
          "When a parent loses control of a subsidiary, the subsidiary is no longer consolidated. The disposal calculation considers the consideration received, the carrying amount of the subsidiary's net assets, NCI and any retained interest."
        ]
      },
      {
        title: "Results to disposal date",
        paragraphs: [
          "The subsidiary's income and expenses are included in consolidated profit or loss only up to the date control is lost. The source material illustrates this using a disposal date during the reporting year."
        ]
      },
      {
        title: "Retained interest and presentation",
        paragraphs: [
          "Any retained interest is subsequently accounted for according to its nature and the applicable Standard. Where IFRS 5 criteria are met, held-for-sale and discontinued-operation presentation requirements are considered."
        ]
      }
    ],
    keyPoints: [
      "Loss of control ends consolidation.",
      "Include the subsidiary's results only to the disposal date.",
      "Consider NCI and retained interest in the disposal calculation."
    ],
    quiz: [
      {
        id: "gd1",
        question: "On loss of control, the subsidiary is:",
        options: [
          "Derecognised from consolidation",
          "Consolidated forever",
          "Recognised as inventory",
          "Ignored entirely"
        ],
        answer: 0,
        explanation: "Loss of control means the subsidiary is no longer consolidated."
      }
    ]
  },

  {
    slug: "interpretation-of-financial-statements",
    title: "Interpretation of Financial Statements",
    standard: "Financial Statement Analysis",
    description: "Using financial statements and ratios to understand profitability, liquidity, efficiency and financial structure.",
    sections: [
      {
        title: "Profitability",
        paragraphs: [
          "Profitability analysis considers how effectively an entity generates profit from sales, assets and capital. Ratios are most useful when interpreted over time and against appropriate benchmarks."
        ],
        bullets: [
          "Gross profit margin",
          "Operating profit margin",
          "Return on capital employed",
          "Return on equity"
        ]
      },
      {
        title: "Liquidity and efficiency",
        paragraphs: [
          "Liquidity ratios assess short-term financial strength, while working-capital ratios provide insight into receivables, inventory and payables management."
        ],
        bullets: [
          "Current ratio",
          "Quick ratio",
          "Receivables collection period",
          "Inventory holding period",
          "Payables payment period"
        ]
      },
      {
        title: "Gearing and investor perspective",
        paragraphs: [
          "Gearing analysis considers the relationship between debt and equity or capital employed. Investor-focused measures consider earnings, dividends and market-related information.",
          "The interpretation should consider the entity's industry, accounting policies, financing structure and unusual transactions."
        ]
      },
      {
        title: "Limitations",
        paragraphs: [
          "Ratio analysis is not a substitute for judgement. Different accounting policies, inflation, seasonality, one-off transactions and differences in capital structure can affect comparability."
        ]
      }
    ],
    keyPoints: [
      "Interpret ratios rather than relying on them mechanically.",
      "Use trends and appropriate comparators.",
      "Consider accounting policies and unusual transactions.",
      "Liquidity analysis should be considered alongside cash flows."
    ],
    quiz: [
      {
        id: "interp1",
        question: "A major limitation of ratio analysis is:",
        options: [
          "Different accounting policies can affect comparability",
          "Ratios never use financial statements",
          "Ratios always predict the future exactly",
          "Ratios remove professional judgement"
        ],
        answer: 0,
        explanation: "Accounting policy and estimation differences can make ratio comparisons misleading."
      }
    ]
  },

  {
    slug: "advanced-consolidation",
    title: "Advanced Consolidation",
    standard: "IFRS 3 / IFRS 10",
    description: "Advanced group accounting applications built on the acquisition and consolidation principles.",
    sections: [
      {
        title: "Acquisition-date analysis",
        paragraphs: [
          "Advanced consolidation requires the acquisition-date fair value of identifiable assets and liabilities to be established before calculating goodwill and post-acquisition movements."
        ]
      },
      {
        title: "Post-acquisition adjustments",
        paragraphs: [
          "Post-acquisition changes in net assets are incorporated into consolidated equity and the relevant attribution between parent shareholders and NCI."
        ]
      },
      {
        title: "Intra-group adjustments",
        paragraphs: [
          "Complex consolidation workings may require elimination of intra-group balances, unrealised profits, intra-group interest and adjustments arising from transfers of non-current assets."
        ]
      }
    ],
    keyPoints: [
      "Start with acquisition-date fair values.",
      "Separate acquisition-date and post-acquisition movements.",
      "Apply all relevant intra-group elimination adjustments."
    ],
    quiz: [
      {
        id: "advcon1",
        question: "The starting point for advanced acquisition accounting is:",
        options: [
          "Acquisition-date fair values of identifiable net assets",
          "Closing tax balances",
          "The parent's revenue",
          "The subsidiary's dividend policy"
        ],
        answer: 0,
        explanation: "Acquisition-date fair values underpin the acquisition method and goodwill calculation."
      }
    ]
  },

  {
    slug: "accounting-policy-estimates-errors",
    title: "Accounting Policies, Estimates & Errors",
    standard: "IAS 8",
    description: "Selecting accounting policies and distinguishing policy changes, estimate changes and prior-period errors.",
    sections: [
      {
        title: "Selecting policies",
        paragraphs: [
          "Where a transaction is specifically addressed by an IFRS or IAS, that requirement is applied. If not, management develops a policy that results in relevant and faithfully represented information.",
          "The source material gives the hierarchy of considering similar and related IFRS requirements followed by the Conceptual Framework."
        ]
      },
      {
        title: "Changes in estimates",
        paragraphs: [
          "Accounting estimates are monetary amounts in the financial statements subject to measurement uncertainty. A change in an estimate reflects new information and is accounted for in the periods affected."
        ]
      },
      {
        title: "Errors",
        paragraphs: [
          "Prior-period errors are distinguished from changes in estimates because errors relate to mistakes or omissions in previously issued financial statements. The correction approach is different from the treatment of a new estimate."
        ]
      }
    ],
    keyPoints: [
      "Use the IAS 8 hierarchy where no specific Standard applies.",
      "New information can cause a change in estimate.",
      "Prior-period errors are not simply changes in estimates."
    ],
    quiz: [
      {
        id: "ias8a",
        question: "When no IFRS specifically addresses an issue, management should:",
        options: [
          "Develop a relevant and faithfully represented accounting policy using the IAS 8 hierarchy",
          "Choose any policy",
          "Use tax rules automatically",
          "Ignore the transaction"
        ],
        answer: 0,
        explanation: "The source material describes the hierarchy for developing an accounting policy when no specific IFRS applies."
      }
    ]
  }
]

export const accountingTopicSlugs = accountingTopics.map((topic) => topic.slug)
