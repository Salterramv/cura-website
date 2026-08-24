export type ServiceItem = {
  slug: string
  title: string
  shortDescription: string
  introduction: string
  whyItMatters: string[]
  whatWeDo: string[]
  whoNeedsIt: string[]
  whyCura: string[]
  faqs: {
    question: string
    answer: string
  }[]
}

export type ServiceCategory = {
  slug: string
  number: string
  title: string
  headline: string
  description: string
  services: ServiceItem[]
}

export const serviceCategories: Record<string, ServiceCategory> = {
  tax: {
    slug: "tax",
    number: "01",
    title: "Tax",
    headline: "Tax advice that works in practice.",
    description:
      "Practical tax compliance and advisory services designed around the realities of doing business in the Maldives.",
    services: [
      {
        slug: "gst",
        title: "Goods and Services Tax (GST)",
        shortDescription:
          "Registration, compliance, review and advisory support for businesses dealing with GST.",
        introduction:
          "GST affects pricing, invoicing, cash flow, accounting records and day-to-day business decisions. CURA helps businesses understand their GST responsibilities and establish practical processes for managing them.",
        whyItMatters: [
          "GST obligations can affect the way a business prices and invoices its customers.",
          "Errors in GST treatment can create additional tax exposure, penalties and administrative work.",
          "Accurate records and timely returns are important for maintaining ongoing compliance.",
          "Businesses may need to consider GST consequences before entering into transactions or changing their operating model.",
        ],
        whatWeDo: [
          "GST registration and deregistration support",
          "GST return preparation and review",
          "GST compliance health checks",
          "Review of input and output GST treatment",
          "GST advisory on transactions and business arrangements",
          "GST refund assistance",
          "Support with GST-related MIRA queries and reviews",
          "GST dispute and assessment support",
        ],
        whoNeedsIt: [
          "Businesses approaching or exceeding GST registration thresholds",
          "Existing GST-registered businesses",
          "Businesses undergoing restructuring or expansion",
          "Businesses facing GST reviews or queries",
          "Businesses seeking to improve their GST processes",
        ],
        whyCura: [
          "Practical understanding of Maldives tax compliance",
          "Clear explanations without unnecessary technical language",
          "Focus on both compliance and commercial consequences",
          "Support designed around the client's actual circumstances",
        ],
        faqs: [
          {
            question: "Does my business need to register for GST?",
            answer:
              "GST registration depends on the applicable Maldives GST rules and the circumstances of the business. CURA can review your position and explain the registration implications.",
          },
          {
            question: "Can CURA review our existing GST compliance?",
            answer:
              "Yes. A GST health check can review registration, invoices, records, returns and selected transactions to identify potential issues and improvement areas.",
          },
          {
            question: "Can CURA assist with a GST dispute?",
            answer:
              "CURA can assist in understanding the assessment or issue, reviewing the underlying facts and records, and developing an appropriate response.",
          },
        ],
      },

      {
        slug: "corporate-income-tax",
        title: "Corporate Income Tax",
        shortDescription:
          "Compliance, tax computation, reviews and advisory support for businesses.",
        introduction:
          "Corporate income tax affects how businesses plan, record and report their activities. CURA helps businesses understand their obligations and manage their tax position with greater confidence.",
        whyItMatters: [
          "Tax obligations need to be considered alongside financial reporting and business decisions.",
          "Incorrect treatment of income or expenses can result in unnecessary exposure.",
          "Good tax processes reduce the risk of missed filings and avoidable compliance problems.",
        ],
        whatWeDo: [
          "Corporate income tax compliance",
          "Tax computation and return support",
          "Tax health checks",
          "Review of income and deductible expenditure",
          "Tax provision and reconciliation support",
          "Tax planning",
          "Tax advisory",
          "Support with tax authority queries",
        ],
        whoNeedsIt: [
          "Companies carrying on business in the Maldives",
          "Growing businesses developing formal tax processes",
          "Businesses undergoing significant transactions",
          "Businesses seeking an independent tax review",
        ],
        whyCura: [
          "Strong focus on Maldives tax rules",
          "Integration of tax and accounting considerations",
          "Commercially practical advice",
          "Clear communication with management",
        ],
        faqs: [
          {
            question:
              "Can CURA review our income tax position before filing?",
            answer:
              "Yes. CURA can conduct a pre-filing review of relevant records, computations and tax treatments.",
          },
          {
            question: "Can you help if MIRA has raised a question?",
            answer:
              "Yes. CURA can assist with understanding the issue, reviewing the supporting records and preparing an appropriate response.",
          },
        ],
      },

      {
        slug: "tax-compliance",
        title: "Tax Compliance",
        shortDescription:
          "Structured support to help businesses meet their recurring tax obligations.",
        introduction:
          "Tax compliance involves much more than submitting returns. Businesses need reliable records, appropriate processes, accurate calculations and timely action.",
        whyItMatters: [
          "Missed deadlines can create unnecessary costs and penalties.",
          "Weak documentation can make otherwise correct tax positions difficult to support.",
          "Consistent compliance processes allow management to identify issues earlier.",
        ],
        whatWeDo: [
          "Tax registration support",
          "Periodic tax return preparation",
          "Compliance calendars",
          "Tax record reviews",
          "Filing and payment monitoring",
          "Compliance health checks",
          "MIRA correspondence support",
        ],
        whoNeedsIt: [
          "SMEs",
          "Growing companies",
          "Businesses without an in-house tax function",
          "Businesses seeking independent compliance review",
        ],
        whyCura: [
          "Practical compliance-focused approach",
          "Clear deadlines and responsibilities",
          "Reduced administrative burden",
          "Ongoing rather than purely reactive support",
        ],
        faqs: [
          {
            question: "Can CURA manage recurring compliance?",
            answer:
              "Yes. The scope can be designed around the client's recurring tax obligations and internal capabilities.",
          },
        ],
      },

      {
        slug: "tax-advisory",
        title: "Tax Advisory",
        shortDescription:
          "Tax advice for transactions, structures, investments and business decisions.",
        introduction:
          "Tax should be considered before a transaction is completed, not only after it has happened. CURA helps businesses understand potential tax consequences before making important decisions.",
        whyItMatters: [
          "The structure of a transaction can affect its tax consequences.",
          "Early tax consideration can reduce surprises and improve decision-making.",
          "Management often needs a clear explanation of tax implications before proceeding.",
        ],
        whatWeDo: [
          "Transaction tax reviews",
          "Business restructuring advice",
          "Tax-efficient structuring",
          "Tax opinions and technical analysis",
          "Investment-related tax analysis",
          "Tax implications of commercial arrangements",
          "Pre-transaction tax reviews",
        ],
        whoNeedsIt: [
          "Business owners",
          "Directors",
          "Investors",
          "Companies entering significant transactions",
          "Businesses considering restructuring",
        ],
        whyCura: [
          "Tax advice connected to commercial realities",
          "Clear communication with decision-makers",
          "Focus on practical implementation",
          "Integration of tax, accounting and business considerations",
        ],
        faqs: [
          {
            question: "When should I seek tax advice?",
            answer:
              "Ideally before a significant transaction, restructuring or business decision is finalized.",
          },
        ],
      },

      {
        slug: "tax-disputes",
        title: "Tax Disputes & Controversy",
        shortDescription:
          "Support with tax reviews, assessments, objections and disputes.",
        introduction:
          "Tax disputes can be time-consuming and disruptive. CURA helps clients understand the technical and factual issues involved and develop a structured response.",
        whyItMatters: [
          "Tax assessments can have significant financial consequences.",
          "A clear understanding of the underlying facts and legislation is essential.",
          "Timely action can be important when responding to tax authority decisions.",
        ],
        whatWeDo: [
          "Tax assessment reviews",
          "MIRA audit support",
          "Objection preparation support",
          "Tax dispute analysis",
          "Technical tax position reviews",
          "Supporting documentation review",
          "Appeal preparation support",
        ],
        whoNeedsIt: [
          "Businesses under MIRA review",
          "Taxpayers receiving assessments",
          "Businesses disputing a tax position",
          "Businesses seeking an independent review",
        ],
        whyCura: [
          "Combination of tax and accounting understanding",
          "Evidence-focused approach",
          "Clear explanation of technical issues",
          "Practical dispute strategy",
        ],
        faqs: [
          {
            question: "Can CURA review a tax assessment?",
            answer:
              "Yes. CURA can review the assessment, relevant records and the underlying tax treatment to help identify the issues requiring attention.",
          },
        ],
      },

      {
        slug: "transfer-pricing",
        title: "Transfer Pricing",
        shortDescription:
          "Support for related-party transactions and transfer pricing considerations.",
        introduction:
          "Transactions between related parties can create tax and documentation considerations. CURA helps businesses understand the relevant risks and establish appropriate support for their related-party arrangements.",
        whyItMatters: [
          "Related-party transactions may receive greater scrutiny.",
          "Inadequate documentation can make commercial arrangements harder to defend.",
          "Transfer pricing should be considered alongside the wider tax position.",
        ],
        whatWeDo: [
          "Related-party transaction reviews",
          "Transfer pricing risk assessments",
          "Documentation support",
          "Arm's-length analysis",
          "Related-party policy development",
          "Tax authority query support",
        ],
        whoNeedsIt: [
          "Groups with related-party transactions",
          "Companies with overseas related parties",
          "Businesses undergoing restructuring",
          "Businesses seeking to strengthen documentation",
        ],
        whyCura: [
          "Practical documentation-focused approach",
          "Integration with wider tax compliance",
          "Clear communication of risk",
        ],
        faqs: [],
      },

      {
        slug: "international-tax",
        title: "International Tax",
        shortDescription:
          "Tax considerations for cross-border business and international transactions.",
        introduction:
          "Cross-border transactions can introduce additional tax, withholding and structuring considerations. CURA helps businesses identify relevant Maldives tax issues before and during international transactions.",
        whyItMatters: [
          "Cross-border transactions may have tax implications in more than one jurisdiction.",
          "Withholding and source-related considerations can affect cash flows.",
          "International structures should be considered carefully before implementation.",
        ],
        whatWeDo: [
          "Cross-border tax reviews",
          "Withholding tax analysis",
          "International transaction reviews",
          "Permanent establishment considerations",
          "Cross-border structuring support",
          "International tax risk assessments",
        ],
        whoNeedsIt: [
          "Businesses with overseas suppliers",
          "Businesses providing services internationally",
          "Companies with foreign shareholders or group companies",
          "Businesses entering international arrangements",
        ],
        whyCura: [
          "Maldives-focused perspective",
          "Commercially practical advice",
          "Clear identification of local tax consequences",
        ],
        faqs: [],
      },
    ],
  },

  audit: {
    slug: "audit",
    number: "02",
    title: "Audit",
    headline: "Audit that goes beyond the numbers.",
    description:
      "Independent audit and assurance services designed to improve confidence, transparency and business processes.",
    services: [
      {
        slug: "financial-statement-audit",
        title: "Financial Statement Audit",
        shortDescription:
          "Independent audit of financial statements with practical observations for management.",
        introduction:
          "A financial statement audit provides stakeholders with greater confidence in the financial information of an organization. CURA combines professional audit work with an understanding of the business behind the numbers.",
        whyItMatters: [
          "Audited financial statements provide confidence to owners and other stakeholders.",
          "Audit work can identify weaknesses in financial reporting and controls.",
          "Reliable financial information supports better business decisions.",
        ],
        whatWeDo: [
          "Financial statement audits",
          "Year-end audit procedures",
          "Financial reporting review",
          "Audit planning and risk assessment",
          "Internal control evaluation",
          "Management reporting and observations",
        ],
        whoNeedsIt: [
          "Companies requiring audited financial statements",
          "Businesses seeking independent assurance",
          "Organizations with external stakeholders",
          "Businesses strengthening financial reporting processes",
        ],
        whyCura: [
          "Risk-focused audit approach",
          "Practical communication",
          "Focus on meaningful findings",
          "Understanding of Maldives business conditions",
        ],
        faqs: [],
      },

      {
        slug: "internal-audit",
        title: "Internal Audit",
        shortDescription:
          "Independent reviews designed to identify risks, control weaknesses and opportunities for improvement.",
        introduction:
          "Internal audit can provide management and boards with an independent view of whether important risks and controls are being appropriately managed.",
        whyItMatters: [
          "Weak controls can result in financial loss and operational inefficiency.",
          "Independent testing can identify issues that routine management processes miss.",
          "Internal audit can provide management with a structured improvement roadmap.",
        ],
        whatWeDo: [
          "Internal audit planning",
          "Risk-based internal audits",
          "Process reviews",
          "Control testing",
          "Internal audit outsourcing",
          "Internal audit co-sourcing",
          "Follow-up reviews",
        ],
        whoNeedsIt: [
          "Growing businesses",
          "Companies without an internal audit function",
          "Organizations strengthening governance",
          "Businesses preparing for significant growth",
        ],
        whyCura: [
          "Risk-based methodology",
          "Practical recommendations",
          "Focus on implementation",
          "Flexible outsourcing and co-sourcing",
        ],
        faqs: [],
      },

      {
        slug: "internal-controls",
        title: "Internal Controls",
        shortDescription:
          "Design, review and improvement of financial and operational controls.",
        introduction:
          "Effective internal controls help organizations protect assets, improve reliability of information and reduce operational and compliance risks.",
        whyItMatters: [
          "Controls reduce the likelihood of errors and inappropriate activity.",
          "Well-designed processes improve efficiency as well as compliance.",
          "Control weaknesses can become expensive if discovered too late.",
        ],
        whatWeDo: [
          "Internal control assessments",
          "Risk-control matrices",
          "Control design reviews",
          "Control testing",
          "Process walkthroughs",
          "Control remediation",
        ],
        whoNeedsIt: [
          "Growing companies",
          "Organizations experiencing rapid change",
          "Businesses with recurring control issues",
          "Organizations preparing for external audit",
        ],
        whyCura: [
          "Practical control recommendations",
          "Business-process understanding",
          "Clear prioritization of risks",
        ],
        faqs: [],
      },

      {
        slug: "compliance-audit",
        title: "Compliance Audit",
        shortDescription:
          "Independent reviews of compliance with applicable requirements, policies and procedures.",
        introduction:
          "Compliance audits help organizations understand whether important requirements are being followed and whether weaknesses need to be addressed.",
        whyItMatters: [
          "Non-compliance can create financial and reputational consequences.",
          "Independent testing can identify gaps before they become significant problems.",
          "Compliance should be integrated into everyday processes.",
        ],
        whatWeDo: [
          "Regulatory compliance reviews",
          "Policy compliance reviews",
          "Process compliance testing",
          "Contract compliance reviews",
          "Compliance gap assessments",
          "Remediation recommendations",
        ],
        whoNeedsIt: [
          "Regulated businesses",
          "Organizations with complex policies",
          "Businesses preparing for external reviews",
        ],
        whyCura: [
          "Structured testing",
          "Clear evidence-based findings",
          "Practical remediation advice",
        ],
        faqs: [],
      },

      {
        slug: "special-audits",
        title: "Special & Investigative Audits",
        shortDescription:
          "Focused financial investigations and special reviews commissioned for specific concerns.",
        introduction:
          "Special audits are designed around a particular question, concern or transaction rather than a standard annual audit.",
        whyItMatters: [
          "Management sometimes needs answers beyond the scope of a normal audit.",
          "Independent examination can help establish facts and identify financial irregularities.",
          "Early investigation can prevent issues from becoming larger problems.",
        ],
        whatWeDo: [
          "Special financial reviews",
          "Investigative audits",
          "Fraud-related reviews",
          "Transaction investigations",
          "Management-requested reviews",
          "Financial fact-finding",
        ],
        whoNeedsIt: [
          "Boards and directors",
          "Business owners",
          "Organizations facing suspected irregularities",
          "Businesses requiring an independent financial review",
        ],
        whyCura: [
          "Evidence-focused approach",
          "Confidential handling",
          "Practical reporting",
          "Strong financial analysis",
        ],
        faqs: [],
      },
    ],
  },

  advisory: {
    slug: "advisory",
    number: "03",
    title: "Advisory",
    headline: "Better decisions start with better analysis.",
    description:
      "Financial, business, risk and transaction advisory services for important decisions and periods of change.",
    services: [
      {
        slug: "business-advisory",
        title: "Business Advisory",
        shortDescription:
          "Practical advice to improve business performance, structure and decision-making.",
        introduction:
          "Business decisions often involve financial, operational and strategic considerations at the same time. CURA helps management assess options and move from analysis to action.",
        whyItMatters: [
          "Business owners often need an independent perspective before making important decisions.",
          "Financial information can reveal opportunities that are not immediately visible.",
          "Structured analysis can reduce uncertainty around growth and change.",
        ],
        whatWeDo: [
          "Business planning",
          "Performance reviews",
          "Business restructuring",
          "Growth planning",
          "Operating model reviews",
          "Management decision support",
        ],
        whoNeedsIt: [
          "Business owners",
          "Growing companies",
          "Companies facing performance challenges",
          "Businesses considering expansion or restructuring",
        ],
        whyCura: [
          "Practical rather than theoretical advice",
          "Strong financial perspective",
          "Clear decision-oriented analysis",
        ],
        faqs: [],
      },

      {
        slug: "financial-advisory",
        title: "Financial Advisory",
        shortDescription:
          "Financial analysis, forecasting, modelling and valuation to support better decisions.",
        introduction:
          "Good decisions require more than historical financial statements. CURA helps businesses understand future financial outcomes through structured analysis and modelling.",
        whyItMatters: [
          "Management needs to understand the financial consequences of strategic decisions.",
          "Forecasting helps businesses prepare for different scenarios.",
          "Valuation can be important during investment, restructuring or transactions.",
        ],
        whatWeDo: [
          "Financial modelling",
          "Business valuation",
          "Forecasting",
          "Scenario analysis",
          "Investment analysis",
          "Cash-flow analysis",
          "Financial feasibility studies",
        ],
        whoNeedsIt: [
          "Business owners",
          "Investors",
          "Management teams",
          "Companies seeking financing",
          "Businesses considering transactions",
        ],
        whyCura: [
          "Finance-led analysis",
          "Transparent assumptions",
          "Decision-focused models",
          "Clear presentation for management",
        ],
        faqs: [],
      },

      {
        slug: "risk-and-controls",
        title: "Risk & Controls Advisory",
        shortDescription:
          "Identify, assess and manage financial, operational and compliance risks.",
        introduction:
          "Risk management is most effective when it is connected to the way a business actually operates. CURA helps organizations identify important risks and strengthen the controls that address them.",
        whyItMatters: [
          "Unidentified risks can become expensive operational problems.",
          "Controls should be proportionate to the risks they are designed to address.",
          "Management needs visibility over significant business risks.",
        ],
        whatWeDo: [
          "Enterprise risk assessments",
          "Risk registers",
          "Control frameworks",
          "Risk-control matrices",
          "Governance reviews",
          "Compliance frameworks",
        ],
        whoNeedsIt: [
          "Growing organizations",
          "Regulated businesses",
          "Organizations strengthening governance",
          "Businesses undergoing transformation",
        ],
        whyCura: [
          "Practical risk assessment",
          "Integration with audit and tax expertise",
          "Clear prioritization",
        ],
        faqs: [],
      },

      {
        slug: "transaction-advisory",
        title: "Transaction Advisory",
        shortDescription:
          "Financial analysis and support throughout significant business transactions.",
        introduction:
          "Transactions can involve significant financial and commercial risks. CURA helps clients understand the numbers and key issues before making important commitments.",
        whyItMatters: [
          "Transaction decisions can have long-term financial consequences.",
          "Independent due diligence can identify risks that may not be apparent from headline figures.",
          "A clear financial model helps management evaluate alternatives.",
        ],
        whatWeDo: [
          "Financial due diligence",
          "Transaction analysis",
          "Business valuation",
          "Financial modelling",
          "Acquisition analysis",
          "Transaction support",
        ],
        whoNeedsIt: [
          "Business buyers",
          "Business sellers",
          "Investors",
          "Companies considering mergers or acquisitions",
        ],
        whyCura: [
          "Integrated financial and tax perspective",
          "Independent analysis",
          "Commercially focused reporting",
        ],
        faqs: [],
      },

      {
        slug: "restructuring-and-turnaround",
        title: "Restructuring & Turnaround",
        shortDescription:
          "Financial analysis and practical support for businesses facing performance or liquidity challenges.",
        introduction:
          "When a business is under pressure, timely financial analysis is essential. CURA helps management understand the causes of performance problems and evaluate practical options.",
        whyItMatters: [
          "Early identification of financial pressure can improve available options.",
          "Cash flow often requires immediate attention during difficult periods.",
          "A structured turnaround plan can help management prioritize action.",
        ],
        whatWeDo: [
          "Cash-flow analysis",
          "Business performance review",
          "Cost analysis",
          "Restructuring planning",
          "Turnaround modelling",
          "Management action plans",
        ],
        whoNeedsIt: [
          "Businesses experiencing declining performance",
          "Businesses facing liquidity pressure",
          "Companies undergoing restructuring",
        ],
        whyCura: [
          "Hands-on financial analysis",
          "Focus on practical action",
          "Clear prioritization",
        ],
        faqs: [],
      },
    ],
  },

  legal: {
    slug: "legal",
    number: "04",
    title: "Legal",
    headline: "Legal advice connected to business.",
    description:
      "Practical legal and regulatory support for businesses, transactions and commercial decisions.",
    services: [
      {
        slug: "corporate-commercial",
        title: "Corporate & Commercial",
        shortDescription:
          "Legal support for companies, business structures and commercial activities.",
        introduction:
          "Businesses regularly face legal questions relating to their structure, relationships, governance and commercial activities. CURA aims to provide practical legal support that considers the business context.",
        whyItMatters: [
          "Legal structures influence how businesses operate and manage risk.",
          "Clear documentation can prevent future disputes.",
          "Business decisions often have both legal and financial consequences.",
        ],
        whatWeDo: [
          "Corporate structuring",
          "Corporate governance support",
          "Shareholder arrangements",
          "Commercial legal advice",
          "Business documentation",
          "Corporate matters",
        ],
        whoNeedsIt: [
          "Companies",
          "Business owners",
          "Directors",
          "Entrepreneurs",
          "Growing businesses",
        ],
        whyCura: [
          "Business-focused legal thinking",
          "Integration with tax and advisory considerations",
          "Practical communication",
        ],
        faqs: [],
      },

      {
        slug: "contracts",
        title: "Contracts",
        shortDescription:
          "Drafting, reviewing and negotiating commercial contracts and agreements.",
        introduction:
          "Contracts define important commercial relationships. CURA helps businesses understand their rights, obligations and potential risks before they sign.",
        whyItMatters: [
          "Poorly drafted contracts can create avoidable disputes.",
          "Important commercial risks should be identified before signing.",
          "Clear contractual obligations support stronger business relationships.",
        ],
        whatWeDo: [
          "Contract drafting",
          "Contract review",
          "Contract negotiation support",
          "Commercial agreements",
          "Terms and conditions",
          "Contract risk reviews",
        ],
        whoNeedsIt: [
          "Businesses entering new commercial relationships",
          "Companies negotiating major agreements",
          "Businesses reviewing existing contracts",
        ],
        whyCura: [
          "Commercial rather than purely theoretical approach",
          "Focus on practical risk",
          "Integration with business and tax considerations",
        ],
        faqs: [],
      },

      {
        slug: "tax-legal",
        title: "Tax Legal",
        shortDescription:
          "Legal and regulatory analysis relating to taxation and tax disputes.",
        introduction:
          "Tax matters can involve both technical tax questions and legal interpretation. CURA brings together tax and legal perspectives to help clients understand complex issues.",
        whyItMatters: [
          "Tax disputes often involve detailed interpretation of legislation.",
          "Businesses need to understand both their tax position and available legal options.",
          "Early technical review can improve the quality of responses to tax authority decisions.",
        ],
        whatWeDo: [
          "Tax legislation analysis",
          "Tax legal opinions",
          "Tax assessment reviews",
          "Tax dispute support",
          "Regulatory interpretation",
          "Tax appeal support",
        ],
        whoNeedsIt: [
          "Taxpayers facing assessments",
          "Businesses dealing with complex tax issues",
          "Companies seeking independent tax-legal analysis",
        ],
        whyCura: [
          "Integrated tax and legal perspective",
          "Strong Maldives tax focus",
          "Evidence and legislation-based analysis",
        ],
        faqs: [],
      },

      {
        slug: "regulatory-compliance",
        title: "Regulatory & Compliance",
        shortDescription:
          "Support in understanding and managing legal and regulatory obligations.",
        introduction:
          "Regulatory obligations can be difficult to translate into practical business processes. CURA helps organizations identify relevant requirements and develop practical approaches to compliance.",
        whyItMatters: [
          "Regulatory breaches can create financial and reputational consequences.",
          "Businesses need clear ownership of important compliance responsibilities.",
          "Good compliance processes reduce the likelihood of avoidable issues.",
        ],
        whatWeDo: [
          "Regulatory reviews",
          "Compliance gap assessments",
          "Policy reviews",
          "Regulatory interpretation",
          "Compliance framework development",
          "Regulatory correspondence support",
        ],
        whoNeedsIt: [
          "Regulated businesses",
          "Growing companies",
          "Organizations introducing new services",
          "Businesses facing regulatory change",
        ],
        whyCura: [
          "Practical compliance orientation",
          "Business-aware legal analysis",
          "Clear recommendations",
        ],
        faqs: [],
      },

      {
        slug: "dispute-resolution",
        title: "Dispute Resolution",
        shortDescription:
          "Support in understanding and managing commercial and business disputes.",
        introduction:
          "Disputes can consume management time, create financial uncertainty and affect commercial relationships. CURA helps clients assess the issues and understand practical options.",
        whyItMatters: [
          "Early assessment can help businesses make informed decisions.",
          "Disputes should be considered in both legal and commercial terms.",
          "A structured approach can reduce unnecessary escalation.",
        ],
        whatWeDo: [
          "Dispute assessment",
          "Commercial dispute support",
          "Contract dispute analysis",
          "Negotiation support",
          "Mediation support",
          "Litigation support",
        ],
        whoNeedsIt: [
          "Companies facing commercial disputes",
          "Businesses dealing with contractual disagreements",
          "Business owners seeking independent assessment",
        ],
        whyCura: [
          "Commercial perspective",
          "Clear assessment of issues",
          "Integration with financial and tax considerations",
        ],
        faqs: [],
      },
    ],
  },
}