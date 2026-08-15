export type CaseProceeding = {
  court: string
  caseNumber: string
  filedDate?: string
  judgmentDate?: string
  status?: string
  outcome?: string
}

export type LegalCase = {
  slug: string
  title: string
  category: string
  country: string
  description: string
  proceedings: CaseProceeding[]
  timeline: {
    year: string
    court: string
    description: string
  }[]
  analysis: {
    background?: string
    issues?: string[]
    decision?: string
    legalPrinciple?: string
    implications?: string
  }
  miraUrl?: string
}

export const cases: LegalCase[] = [
  {
    slug: "bunny-holdings",
    title: "Bunny Holdings (B.V.I) Ltd v MIRA",
    category: "Tax Legal Case",
    country: "Maldives",

    description:
      "A series of tax proceedings involving Bunny Holdings (B.V.I) Ltd and the Maldives Inland Revenue Authority, progressing through the Tax Appeal Tribunal, High Court and Supreme Court.",

    proceedings: [
      {
        court: "Tax Appeal Tribunal",
        caseNumber: "TAT-CA-G/2016/006",
        filedDate: "7 August 2016",
        judgmentDate: "21 November 2019",
        status: "Judgment Passed",
        outcome: "Judgment against MIRA",
      },
      {
        court: "High Court",
        caseNumber: "2020/HC-A/13",
        judgmentDate: "23 November 2022",
        status: "Judgment Passed",
      },
      {
        court: "Supreme Court",
        caseNumber: "2023/SC-A/03",
        judgmentDate: "4 November 2024",
        status: "Judgment Passed",
        outcome: "Judgment against MIRA",
      },
    ],

    timeline: [
      {
        year: "2016",
        court: "Tax Appeal Tribunal",
        description:
          "Bunny Holdings (B.V.I) Ltd v MIRA — TAT-CA-G/2016/006.",
      },
      {
        year: "2022",
        court: "High Court",
        description:
          "Bunny Holdings (BVI) Limited v MIRA — 2020/HC-A/13.",
      },
      {
        year: "2024",
        court: "Supreme Court",
        description:
          "Bunny Holdings BVI Ltd v MIRA — 2023/SC-A/03.",
      },
    ],

    analysis: {
      background:
        "CURA's detailed factual analysis of this matter is being developed from the underlying official judgments and case records.",

      issues: [
        "Issues arising from the relevant tax assessment and the taxpayer's appeal.",
        "Interpretation and application of the relevant tax legislation.",
        "Issues considered by the appellate courts in reviewing the lower decision.",
      ],

      decision:
        "The official MIRA case record records judgments at the Tax Appeal Tribunal, High Court and Supreme Court stages.",

      legalPrinciple:
        "The specific legal principles will be set out by CURA after reviewing and verifying the underlying judgments.",

      implications:
        "CURA will provide a practical analysis of the implications of the final verified judgment for taxpayers and tax administration.",
    },

    miraUrl:
      "https://www.mira.gov.mv/LegalCases/ViewDetails/11162",
  },
]