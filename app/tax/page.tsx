import ServicePage, {
  ServicePageConfig,
} from "@/components/ServicePage"

const tax: ServicePageConfig = {
  number: "02",
  eyebrow: "Tax",
  title: "Tax advice that",
  highlightedTitle: "works in practice.",
  introduction:
    "Practical tax compliance and advisory services designed around the realities of doing business in the Maldives — helping you understand your obligations, manage risk and make informed decisions.",

  services: [
    {
      title: "Income Tax",
      description:
        "Income tax compliance, computations, returns and advisory support for businesses and individuals.",
    },
    {
      title: "GST",
      description:
        "GST registration, return preparation, reviews, reconciliations and practical advice on GST treatment.",
    },
    {
      title: "Tax Compliance",
      description:
        "Support with registrations, filings, payments, reconciliations and ongoing tax compliance requirements.",
    },
    {
      title: "Tax Advisory",
      description:
        "Advice on the tax implications of transactions, business arrangements, investments and commercial decisions.",
    },
    {
      title: "Tax Health Checks",
      description:
        "Structured reviews designed to identify potential compliance gaps, exposures and opportunities for improvement.",
    },
    {
      title: "Tax Audit & Dispute Support",
      description:
        "Practical support during tax audits, information requests, objections, assessments and related tax matters.",
    },
    {
      title: "Withholding Tax",
      description:
        "Advice and compliance support relating to withholding obligations and payments to relevant parties.",
    },
    {
      title: "Tax Planning",
      description:
        "Forward-looking tax advice intended to help businesses understand and manage the tax consequences of commercial decisions.",
    },
    {
      title: "Transaction & Restructuring Advice",
      description:
        "Tax analysis of acquisitions, disposals, restructurings and other significant business transactions.",
    },
  ],

  approach: [
    {
      title: "Understand",
      description:
        "We start with the business model, transaction, facts and commercial objective.",
    },
    {
      title: "Analyse",
      description:
        "We identify the relevant tax rules, risks, filing requirements and potential consequences.",
    },
    {
      title: "Advise",
      description:
        "We explain the position in clear and practical terms and identify available options.",
    },
    {
      title: "Implement",
      description:
        "Where required, we help translate the advice into calculations, filings, documentation and ongoing compliance.",
    },
  ],

  clients: [
    "Maldivian companies",
    "Foreign-owned businesses",
    "Tourism operators",
    "Individuals and professionals",
    "Owner-managed businesses",
    "Growing enterprises",
  ],

  whyCura: [
    "Strong understanding of the Maldivian tax environment",
    "Compliance and advisory capability in one place",
    "Practical explanations of complex tax issues",
    "Commercial advice focused on real business decisions",
  ],
}

export default function TaxPage() {
  return <ServicePage service={tax} />
}