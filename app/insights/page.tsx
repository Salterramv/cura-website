import Link from "next/link"
import CuraHeader from "@/components/CuraHeader"
import CuraFooter from "@/components/CuraFooter"

const insightSections = [
  {
    number: "01",
    title: "Global Economy",
    description:
      "Articles and insights covering major developments, trends and issues shaping the global economy.",
    href: "/insights/global-economy",
  },
  {
    number: "02",
    title: "Global Financial Information",
    description:
      "Financial information and key economic indicators from major economies and financial markets around the world.",
    href: "/insights/global-financial-information",
  },
  {
    number: "03",
    title: "Maldives Economy",
    description:
      "Economic and financial information focused on the Maldives, including key developments and indicators.",
    href: "/insights/maldives-economy",
  },
  {
    number: "04",
    title: "Exchange Rates",
    description:
      "Access currency exchange-rate information through CURA's existing exchange-rate service.",
    href: "/exchange-rates",
  },
]

export default function CuraInsightsPage() {
  return (
    <>
      <CuraHeader />

      <main className="min-h-screen bg-white">

      {/* HERO */}
      <section className="relative overflow-hidden border-b border-[#dce5ef] bg-[#F7FAFC]">
        <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[#18b8ee]/10" />
        <div className="absolute -bottom-32 -left-24 h-80 w-80 rounded-full bg-[#071B49]/5" />

        <div className="relative mx-auto max-w-7xl px-6 py-20 md:px-10 md:py-28 lg:px-12">
          <div className="max-w-4xl">

            <div className="mb-6 flex items-center gap-3">
              <span className="h-px w-10 bg-[#18b8ee]" />
              <span className="text-sm font-semibold uppercase tracking-[0.2em] text-[#168BC4]">
                CURA Insights
              </span>
            </div>

            <h1 className="max-w-4xl text-4xl font-semibold tracking-tight text-[#071B49] md:text-5xl lg:text-6xl">
              Economic and financial information for a changing world.
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-8 text-slate-600 md:text-lg">
              Explore economic developments, financial information and
              insights covering the global economy and the Maldives.
            </p>

          </div>
        </div>
      </section>

      {/* INTRODUCTION */}
      <section className="mx-auto max-w-7xl px-6 py-16 md:px-10 md:py-20 lg:px-12">
        <div className="grid gap-10 md:grid-cols-[1fr_2fr] md:gap-16">

          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#168BC4]">
              Explore
            </p>

            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-[#071B49] md:text-4xl">
              Cura Insights
            </h2>
          </div>

          <div>
            <p className="max-w-3xl text-base leading-8 text-slate-600 md:text-lg">
              CURA Insights brings together economic and financial information
              in one place. Explore developments affecting the global economy,
              financial information from around the world, economic information
              relating to the Maldives, and currency exchange rates.
            </p>
          </div>

        </div>
      </section>

      {/* INSIGHT CARDS */}
      <section className="border-y border-[#dce5ef] bg-[#F7FAFC]">
        <div className="mx-auto max-w-7xl px-6 py-16 md:px-10 md:py-20 lg:px-12">

          <div className="grid gap-5 md:grid-cols-2">

            {insightSections.map((section) => (
              <Link
                key={section.number}
                href={section.href}
                className="group relative overflow-hidden rounded-2xl border border-[#dce5ef] bg-white p-7 transition-all duration-300 hover:-translate-y-1 hover:border-[#18b8ee]/50 hover:shadow-xl md:p-9"
              >

                {/* CARD NUMBER */}
                <div className="flex items-start justify-between">
                  <span className="text-sm font-semibold tracking-[0.15em] text-[#18b8ee]">
                    {section.number}
                  </span>

                  <span className="flex h-10 w-10 items-center justify-center rounded-full border border-[#dce5ef] text-[#071B49] transition-all duration-300 group-hover:border-[#18b8ee] group-hover:bg-[#18b8ee] group-hover:text-white">
                    <svg
                      className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10.293 3.293a1 1 0 011.414 0l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414-1.414L13.586 10H4a1 1 0 110-2h9.586l-3.293-3.293a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </span>
                </div>

                <div className="mt-12 max-w-xl">
                  <h3 className="text-2xl font-semibold tracking-tight text-[#071B49] md:text-3xl">
                    {section.title}
                  </h3>

                  <p className="mt-4 text-sm leading-7 text-slate-600 md:text-base">
                    {section.description}
                  </p>

                  <div className="mt-7 flex items-center gap-2 text-sm font-semibold text-[#168BC4]">
                    <span>
                      {section.title === "Exchange Rates"
                        ? "View exchange rates"
                        : "Explore section"}
                    </span>

                    <svg
                      className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10.293 3.293a1 1 0 011.414 0l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414-1.414L13.586 10H4a1 1 0 110-2h9.586l-3.293-3.293a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                </div>

                {/* DECORATIVE ELEMENT */}
                <div className="pointer-events-none absolute -bottom-20 -right-20 h-48 w-48 rounded-full border-[24px] border-[#18b8ee]/5 transition-transform duration-500 group-hover:scale-125" />

              </Link>
            ))}

          </div>

        </div>
      </section>

      {/* BOTTOM STATEMENT */}
      <section className="mx-auto max-w-7xl px-6 py-16 md:px-10 md:py-20 lg:px-12">
        <div className="rounded-2xl bg-[#071B49] px-7 py-10 md:px-12 md:py-14">

          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#18b8ee]">
              CURA
            </p>

            <h2 className="mt-4 text-2xl font-semibold tracking-tight text-white md:text-3xl">
              Information that helps you understand the bigger picture.
            </h2>

            <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-300 md:text-base">
              Explore the sections above to discover economic and financial
              information relevant to businesses, professionals and anyone
              interested in understanding economic developments.
            </p>
          </div>

        </div>
      </section>

    </main>

      <CuraFooter />
    </>
  )
}