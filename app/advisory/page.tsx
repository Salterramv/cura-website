import ServicePage, {
  ServicePageConfig,
} from "@/components/ServicePage"

const advisory: ServicePageConfig = {
  number: "03",
  eyebrow: "Advisory",
  title: "Better information.",
  highlightedTitle: "Better decisions.",
  introduction:
    "Financial and business advisory services that help management understand performance, evaluate opportunities, manage risk and make better-informed decisions.",

  services: [
    {
      title: "Financial Advisory",
      description:
        "Independent financial analysis and advice to support important commercial and strategic decisions.",
    },
    {
      title: "Financial Modelling",
      description:
        "Integrated financial models designed to help businesses understand performance, scenarios, funding needs and future outcomes.",
    },
    {
      title: "Business Planning",
      description:
        "Structured business plans that connect strategy, operations, financial expectations and measurable objectives.",
    },
    {
      title: "Budgeting & Forecasting",
      description:
        "Budgets, forecasts and scenario analysis that help management plan ahead and respond to changing circumstances.",
    },
    {
      title: "Management Reporting",
      description:
        "Clear management information and reporting frameworks designed to turn financial data into useful decision-making information.",
    },
    {
      title: "Valuation",
      description:
        "Business and financial analysis to support transactions, investment decisions, restructuring and strategic planning.",
    },
    {
      title: "Due Diligence",
      description:
        "Financial and commercial analysis to help clients understand risks, opportunities and underlying business performance.",
    },
    {
      title: "Risk & Controls",
      description:
        "Reviews of business risks, processes and controls to identify weaknesses and practical opportunities for improvement.",
    },
    {
      title: "Business Improvement",
      description:
        "Practical support to improve financial processes, reporting, controls and overall business performance.",
    },
  ],

  approach: [
    {
      title: "Define",
      description:
        "We clarify the business question, decision that needs to be made and information required.",
    },
    {
      title: "Analyse",
      description:
        "We examine the financial, operational and commercial information relevant to the issue.",
    },
    {
      title: "Model",
      description:
        "Where appropriate, we develop scenarios, forecasts and financial models to quantify potential outcomes.",
    },
    {
      title: "Decide",
      description:
        "We present clear findings and practical options that management can use to move forward.",
    },
  ],

  clients: [
    "Entrepreneurs",
    "Established businesses",
    "Investors",
    "Family-owned businesses",
    "Tourism and hospitality",
    "Businesses preparing for growth",
  ],

  whyCura: [
    "Combines accounting, tax, audit and commercial perspectives",
    "Focuses on practical decision-making rather than theoretical advice",
    "Clear financial analysis and communication",
    "Flexible support based on the client's actual circumstances",
  ],
}

export default function AdvisoryPage() {
  return <ServicePage service={advisory} />
}