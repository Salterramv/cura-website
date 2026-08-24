import ServicePage, {
  ServicePageConfig,
} from "@/components/ServicePage"

const audit: ServicePageConfig = {
  number: "01",
  eyebrow: "Audit",
  title: "Audit &",
  highlightedTitle: "Assurance",
  introduction:
    "Independent, practical and risk-focused audit services that help businesses strengthen financial reporting, understand risk and build confidence in their numbers.",

  services: [
    {
      title: "Financial Statement Audit",
      description:
        "Independent examination of financial statements to provide confidence in the reliability of financial information and reporting.",
    },
    {
      title: "Statutory Audit",
      description:
        "Audit services designed around applicable statutory, regulatory and reporting requirements.",
    },
    {
      title: "Internal Audit",
      description:
        "Independent reviews of processes, controls and risks to help management identify weaknesses and improve operations.",
    },
    {
      title: "Internal Controls",
      description:
        "Assessment of financial and operational controls, with practical recommendations to strengthen control environments.",
    },
    {
      title: "Compliance Reviews",
      description:
        "Focused reviews of compliance with applicable requirements, policies and established procedures.",
    },
    {
      title: "Special Purpose Audits",
      description:
        "Targeted audit and assurance engagements designed around specific management, shareholder, lender or regulatory needs.",
    },
  ],

  approach: [
    {
      title: "Understand",
      description:
        "We understand your business, reporting environment, risks and objectives before planning the engagement.",
    },
    {
      title: "Assess",
      description:
        "We identify significant financial, operational and control risks that require attention.",
    },
    {
      title: "Test",
      description:
        "We perform appropriate procedures and obtain evidence to support our conclusions.",
    },
    {
      title: "Improve",
      description:
        "We communicate meaningful findings and practical recommendations rather than simply listing weaknesses.",
    },
  ],

  clients: [
    "Private companies",
    "Owner-managed businesses",
    "Groups and subsidiaries",
    "Tourism businesses",
    "Financial and professional services",
    "Growing businesses",
  ],

  whyCura: [
    "Maldives-focused understanding of business and regulatory requirements",
    "Clear communication throughout the engagement",
    "Practical recommendations that management can actually implement",
    "A commercially minded approach to audit and assurance",
  ],
}

export default function AuditPage() {
  return <ServicePage service={audit} />
}