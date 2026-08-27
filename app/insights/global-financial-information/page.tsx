import Link from "next/link"

const financialAreas = [
  {
    number: "01",
    title: "Interest Rates",
    description:
      "Interest-rate information and monetary-policy developments from major economies and central banks.",
  },
  {
    number: "02",
    title: "Inflation",
    description:
      "Inflation information and price developments across major economies and financial markets.",
  },
  {
    number: "03",
    title: "Currencies",
    description:
      "Currency and foreign-exchange information covering major currencies and global markets.",
  },
  {
    number: "04",
    title: "Financial Markets",
    description:
      "Information on major financial markets, market movements and developments affecting investors and businesses.",
  },
  {
    number: "05",
    title: "Government Finance",
    description:
      "Public-finance information including government revenue, expenditure, fiscal balances and public debt.",
  },
  {
    number: "06",
    title: "Economic Indicators",
    description:
      "Key financial and economic indicators used to understand the condition and direction of major economies.",
  },
]

export default function GlobalFinancialInformationPage() {
  return (
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
              Global Financial Information
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-8 text-slate-600 md:text-lg">
              Access financial and economic information that helps provide a
              clearer view of global financial conditions and developments.
            </p>

          </div>
        </div>
      </section>

      {/* INTRODUCTION */}
      <section className="mx-auto max-w-7xl px-6 py-16 md:px-10 md:py-20 lg:px-12">
        <div className="grid gap-10 md:grid-cols-[1fr_2fr] md:gap-16">

          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#168BC4]">
              Financial Information
            </p>

            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-[#071B49] md:text-4xl">
              Key information for understanding global financial conditions.
            </h2>
          </div>

          <div>
            <p className="text-base leading-8 text-slate-600 md:text-lg">
              Financial conditions influence businesses, governments,
              investors and households across the world. Interest rates,
              inflation, currencies, financial markets and public finances can
              all affect economic activity and financial decision-making.
            </p>

            <p className="mt-5 text-base leading-8 text-slate-600 md:text-lg">
              This section brings together important financial information and
              indicators from the global economy in a clear and accessible
              format.
            </p>
          </div>

        </div>
      </section>

      {/* FINANCIAL AREAS */}
      <section className="border-y border-[#dce5ef] bg-[#F7FAFC]">
        <div className="mx-auto max-w-7xl px-6 py-16 md:px-10 md:py-20 lg:px-12">

          <div className="mb-10 max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#168BC4]">
              Explore
            </p>

            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-[#071B49] md:text-4xl">
              Financial information
            </h2>

            <p className="mt-4 text-base leading-7 text-slate-600">
              Explore key areas of financial and economic information from
              around the world.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">

            {financialAreas.map((area) => (
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

      {/* DATA AREA */}
      <section className="mx-auto max-w-7xl px-6 py-16 md:px-10 md:py-20 lg:px-12">

        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#168BC4]">
            Financial Data
          </p>

          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-[#071B49] md:text-4xl">
            Global financial information
          </h2>

          <p className="mt-4 text-base leading-7 text-slate-600">
            Key financial and economic information will be presented here as
            CURA develops its global financial information database.
          </p>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-3">

          <div className="rounded-2xl border border-[#dce5ef] bg-[#F7FAFC] p-7">
            <p className="text-sm font-medium text-slate-500">
              Financial Indicators
            </p>

            <div className="mt-4 h-2 w-20 rounded-full bg-[#18b8ee]/20" />
            <div className="mt-3 h-2 w-32 rounded-full bg-[#18b8ee]/10" />
          </div>

          <div className="rounded-2xl border border-[#dce5ef] bg-[#F7FAFC] p-7">
            <p className="text-sm font-medium text-slate-500">
              Economic Indicators
            </p>

            <div className="mt-4 h-2 w-20 rounded-full bg-[#18b8ee]/20" />
            <div className="mt-3 h-2 w-32 rounded-full bg-[#18b8ee]/10" />
          </div>

          <div className="rounded-2xl border border-[#dce5ef] bg-[#F7FAFC] p-7">
            <p className="text-sm font-medium text-slate-500">
              Market Information
            </p>

            <div className="mt-4 h-2 w-20 rounded-full bg-[#18b8ee]/20" />
            <div className="mt-3 h-2 w-32 rounded-full bg-[#18b8ee]/10" />
          </div>

        </div>

        <div className="mt-8 rounded-2xl border border-dashed border-[#cbd8e5] bg-[#F7FAFC] px-6 py-12 text-center">

          <h3 className="text-lg font-semibold text-[#071B49]">
            Financial information coming soon
          </h3>

          <p className="mx-auto mt-2 max-w-xl text-sm leading-7 text-slate-500">
            CURA will progressively add financial information and economic
            indicators to this section.
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
                Explore economic and financial information.
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
  )
}