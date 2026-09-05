import Link from "next/link"
import CuraHeader from "@/components/CuraHeader"
import CuraFooter from "@/components/CuraFooter"
import InsightArticles from "@/components/insights/InsightArticles"

const maldivesAreas = [
  {
    number: "01",
    title: "Economic Growth",
    description:
      "Information and developments relating to economic growth and overall economic activity in the Maldives.",
  },
  {
    number: "02",
    title: "Tourism",
    description:
      "Economic information relating to tourism, visitor arrivals and the contribution of tourism to the Maldivian economy.",
  },
  {
    number: "03",
    title: "Inflation",
    description:
      "Information on consumer prices, inflation trends and developments affecting the cost of living in Maldives.",
  },
  {
    number: "04",
    title: "Government Finance",
    description:
      "Information relating to government revenue, expenditure, fiscal balances and public finances.",
  },
  {
    number: "05",
    title: "External Sector",
    description:
      "Information on imports, exports, foreign exchange, international reserves and other external-sector developments.",
  },
  {
    number: "06",
    title: "Financial Sector",
    description:
      "Financial information and developments relating to banks, financial institutions and the Maldivian financial system.",
  },
]

export default function MaldivesEconomyPage() {
  return (
    <>
      <CuraHeader />

      <main className="min-h-screen bg-white">

      {/* HERO */}
      <section className="relative overflow-hidden border-b border-[#dce5ef] bg-[#F7FAFC]">
        <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-[#18b8ee]/10" />
        <div className="absolute -bottom-40 -left-32 h-96 w-96 rounded-full border-[40px] border-[#071B49]/5" />

        <div className="relative mx-auto max-w-7xl px-6 py-20 md:px-10 md:py-28 lg:px-12">
          <div className="max-w-4xl">

            <Link
              href="/insights"
              className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-[#168BC4] transition hover:text-[#071B49]"
            >
              <svg
                className="h-4 w-4"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M9.707 16.707a1 1 0 01-1.414 0l-5-5a1 1 0 010-1.414l5-5a1 1 0 011.414 1.414L6.414 10H16a1 1 0 110 2H6.414l3.293 3.293a1 1 0 010 1.414z"
                  clipRule="evenodd"
                />
              </svg>
              Back to Cura Insights
            </Link>

            <div className="mb-6 flex items-center gap-3">
              <span className="h-px w-10 bg-[#18b8ee]" />
              <span className="text-sm font-semibold uppercase tracking-[0.2em] text-[#168BC4]">
                Cura Insights
              </span>
            </div>

            <h1 className="text-4xl font-semibold tracking-tight text-[#071B49] md:text-5xl lg:text-6xl">
              Maldives Economy
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-8 text-slate-600 md:text-lg">
              Explore economic and financial information about the Maldives,
              including key developments, indicators and areas shaping the
              country's economy.
            </p>

          </div>
        </div>
      </section>

      {/* INTRODUCTION */}
      <section className="mx-auto max-w-7xl px-6 py-16 md:px-10 md:py-20 lg:px-12">

        <div className="grid gap-10 md:grid-cols-[1fr_2fr] md:gap-16">

          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#168BC4]">
              Maldives
            </p>

            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-[#071B49] md:text-4xl">
              Understanding the Maldivian economy.
            </h2>
          </div>

          <div>
            <p className="text-base leading-8 text-slate-600 md:text-lg">
              The Maldivian economy is influenced by tourism, international
              trade, public finance, foreign exchange conditions and
              developments in the domestic financial sector.
            </p>

            <p className="mt-5 text-base leading-8 text-slate-600 md:text-lg">
              CURA Insights brings together economic and financial information
              to provide a clearer view of the developments shaping the
              Maldivian economy.
            </p>
          </div>

        </div>

      </section>

      {/* MALDIVES ECONOMIC AREAS */}
      <section className="border-y border-[#dce5ef] bg-[#F7FAFC]">

        <div className="mx-auto max-w-7xl px-6 py-16 md:px-10 md:py-20 lg:px-12">

          <div className="mb-10 max-w-2xl">

            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#168BC4]">
              Explore
            </p>

            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-[#071B49] md:text-4xl">
              Key areas of the economy
            </h2>

            <p className="mt-4 text-base leading-7 text-slate-600">
              Explore the major areas influencing economic and financial
              conditions in Maldives.
            </p>

          </div>

          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">

            {maldivesAreas.map((area) => (
              <div
                key={area.number}
                className="group relative overflow-hidden rounded-2xl border border-[#dce5ef] bg-white p-7 transition-all duration-300 hover:-translate-y-1 hover:border-[#18b8ee]/50 hover:shadow-xl"
              >

                <div className="flex items-start justify-between">

                  <span className="text-sm font-semibold tracking-[0.15em] text-[#18b8ee]">
                    {area.number}
                  </span>

                  <div className="h-2.5 w-2.5 rounded-full bg-[#18b8ee]/30 transition-all duration-300 group-hover:scale-150 group-hover:bg-[#18b8ee]" />

                </div>

                <h3 className="mt-12 text-xl font-semibold tracking-tight text-[#071B49]">
                  {area.title}
                </h3>

                <p className="mt-3 text-sm leading-7 text-slate-600">
                  {area.description}
                </p>

                <div className="mt-6 h-px w-10 bg-[#18b8ee] transition-all duration-300 group-hover:w-16" />

                <div className="pointer-events-none absolute -bottom-16 -right-16 h-36 w-36 rounded-full border-[18px] border-[#18b8ee]/5 transition-transform duration-500 group-hover:scale-125" />

              </div>
            ))}

          </div>

        </div>

      </section>

      <InsightArticles category="Maldives Economy" />

      {/* MALDIVES DATA */}
      <section className="mx-auto max-w-7xl px-6 py-16 md:px-10 md:py-20 lg:px-12">

        <div className="max-w-2xl">

          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#168BC4]">
            Economic Information
          </p>

          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-[#071B49] md:text-4xl">
            Maldives economic information
          </h2>

          <p className="mt-4 text-base leading-7 text-slate-600">
            Key economic and financial information about Maldives will be
            presented here as the CURA Insights database is developed.
          </p>

        </div>

        {/* INDICATOR CARDS */}
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">

          <div className="rounded-2xl border border-[#dce5ef] bg-[#F7FAFC] p-6">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              GDP
            </p>
            <p className="mt-4 text-lg font-semibold text-[#071B49]">
              Economic Growth
            </p>
            <div className="mt-5 h-1.5 w-16 rounded-full bg-[#18b8ee]/20" />
          </div>

          <div className="rounded-2xl border border-[#dce5ef] bg-[#F7FAFC] p-6">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Prices
            </p>
            <p className="mt-4 text-lg font-semibold text-[#071B49]">
              Inflation
            </p>
            <div className="mt-5 h-1.5 w-16 rounded-full bg-[#18b8ee]/20" />
          </div>

          <div className="rounded-2xl border border-[#dce5ef] bg-[#F7FAFC] p-6">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Tourism
            </p>
            <p className="mt-4 text-lg font-semibold text-[#071B49]">
              Visitor Arrivals
            </p>
            <div className="mt-5 h-1.5 w-16 rounded-full bg-[#18b8ee]/20" />
          </div>

          <div className="rounded-2xl border border-[#dce5ef] bg-[#F7FAFC] p-6">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Public Finance
            </p>
            <p className="mt-4 text-lg font-semibold text-[#071B49]">
              Government Finance
            </p>
            <div className="mt-5 h-1.5 w-16 rounded-full bg-[#18b8ee]/20" />
          </div>

        </div>

        <div className="mt-8 rounded-2xl border border-dashed border-[#cbd8e5] bg-[#F7FAFC] px-6 py-12 text-center">

          <h3 className="text-lg font-semibold text-[#071B49]">
            Maldives economic information coming soon
          </h3>

          <p className="mx-auto mt-2 max-w-xl text-sm leading-7 text-slate-500">
            CURA will progressively add economic and financial information
            relating to Maldives to this section.
          </p>

        </div>

      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-6 pb-16 md:px-10 md:pb-20 lg:px-12">

        <div className="rounded-2xl bg-[#071B49] px-7 py-10 md:px-12 md:py-14">

          <div className="flex flex-col justify-between gap-8 md:flex-row md:items-center">

            <div className="max-w-2xl">

              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#18b8ee]">
                Cura Insights
              </p>

              <h2 className="mt-4 text-2xl font-semibold tracking-tight text-white md:text-3xl">
                Explore more economic and financial information.
              </h2>

            </div>

            <Link
              href="/insights"
              className="inline-flex shrink-0 items-center justify-center gap-2 rounded-md bg-white px-6 py-3 text-sm font-semibold text-[#071B49] transition hover:bg-[#18b8ee] hover:text-white"
            >
              Back to Cura Insights

              <svg
                className="h-4 w-4"
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
            </Link>

          </div>

        </div>

      </section>

    </main>

      <CuraFooter />
    </>
  )
}