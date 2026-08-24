import ServicePage, {
  ServicePageConfig,
} from "@/components/ServicePage"

const legal: ServicePageConfig = {
  number: "04",
  eyebrow: "Legal",
  title: "Practical legal",
  highlightedTitle: "guidance for business.",
  introduction:
    "Commercially focused legal support for businesses navigating contracts, regulatory requirements, corporate matters, transactions and disputes.",

  services: [
    {
      title: "Corporate & Commercial",
      description:
        "Practical legal support for businesses dealing with corporate, commercial and day-to-day legal matters.",
    },
    {
      title: "Contracts",
      description:
        "Contract drafting, review and negotiation support designed to help businesses understand and manage their contractual obligations.",
    },
    {
      title: "Corporate Governance",
      description:
        "Advice and support relating to corporate governance, decision-making, documentation and responsibilities.",
    },
    {
      title: "Regulatory Compliance",
      description:
        "Support in understanding legal and regulatory requirements relevant to business operations.",
    },
    {
      title: "Employment Matters",
      description:
        "Legal guidance relating to employment arrangements, workplace documentation and employment-related issues.",
    },
    {
      title: "Legal Due Diligence",
      description:
        "Review of legal documents, contractual arrangements and potential legal exposures in connection with transactions and business decisions.",
    },
    {
      title: "Dispute Support",
      description:
        "Practical assistance in understanding legal positions, documentation and options when a commercial dispute arises.",
    },
    {
      title: "Tax & Regulatory Matters",
      description:
        "Integrated support where legal, tax and regulatory considerations overlap in a business decision or transaction.",
    },
  ],

  approach: [
    {
      title: "Understand",
      description:
        "We understand the commercial objective, relevant facts and legal circumstances surrounding the matter.",
    },
    {
      title: "Assess",
      description:
        "We identify the relevant legal issues, obligations, risks and practical considerations.",
    },
    {
      title: "Advise",
      description:
        "We explain the position clearly and identify practical options available to the client.",
    },
    {
      title: "Act",
      description:
        "Where appropriate, we support implementation, documentation, negotiation or the next stage of the matter.",
    },
  ],

  clients: [
    "Private companies",
    "Entrepreneurs",
    "Employers",
    "Investors",
    "Tourism businesses",
    "Growing enterprises",
  ],

  whyCura: [
    "Commercial understanding alongside professional expertise",
    "Practical advice written in clear language",
    "Ability to consider legal, tax, accounting and business implications together",
    "Focused on helping clients understand both risk and available options",
  ],

  disclaimer:
    "Legal services will be provided only through appropriately qualified and authorized legal professionals and legal-practice arrangements, where required by applicable Maldivian law and professional regulation.",
}

export default function LegalPage() {
  return <ServicePage service={legal} />
}