export default function GSTArticle() {
  return (
    <main className="min-h-screen bg-white text-[#071B49]">

      {/* Header */}
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">

          <a href="/">
            <img
              src="/cura-logo.png"
              alt="CURA - Audit Tax Advisory"
              className="h-24 w-auto object-contain"
            />
          </a>

          <nav className="hidden items-center gap-8 text-sm font-medium md:flex">

            <a
              href="/"
              className="text-slate-600 hover:text-[#071B49]"
            >
              Home
            </a>

            <a
              href="/articles"
              className="text-slate-600 hover:text-[#071B49]"
            >
              Knowledge
            </a>

            <a
              href="/cases"
              className="text-slate-600 hover:text-[#071B49]"
            >
              Legal Cases
            </a>

            <a
              href="/#education"
              className="text-slate-600 hover:text-[#071B49]"
            >
              Education
            </a>

            <a
              href="/#about"
              className="text-slate-600 hover:text-[#071B49]"
            >
              About
            </a>

            <a
              href="/#contact"
              className="rounded-md bg-[#071B49] px-5 py-2.5 text-white hover:bg-[#0B2A69]"
            >
              Contact
            </a>

          </nav>

        </div>
      </header>

      {/* Article Header */}
      <section className="bg-[#071B49]">
        <div className="mx-auto max-w-4xl px-6 py-20 lg:px-8">

          <div className="flex flex-wrap items-center gap-3">

            <span className="rounded-full bg-[#E7F4FA] px-3 py-1 text-[10px] font-bold tracking-[0.15em] text-[#0876A8]">
              GST
            </span>

            <span className="text-sm text-slate-400">
              12 August 2026
            </span>

          </div>

          <h1 className="mt-7 text-4xl font-semibold leading-tight tracking-tight text-white md:text-6xl">
            Understanding GST in the Maldives
          </h1>

          <p className="mt-7 max-w-3xl text-lg leading-8 text-slate-300">
            A practical introduction to Goods and Services Tax in the
            Maldives, including the GST sectors, current rates, registration,
            charging GST and claiming input tax.
          </p>

          <div className="mt-8 text-sm text-slate-400">
            CURA Knowledge Centre
          </div>

        </div>
      </section>

      {/* Article */}
      <article className="mx-auto max-w-4xl px-6 py-16 lg:px-8">

        {/* Introduction */}
        <section>

          <p className="text-xl leading-9 text-slate-700">
            Goods and Services Tax (GST) is an important part of the Maldives
            tax system. It applies to taxable goods and services supplied in
            the Maldives and is administered by the Maldives Inland Revenue
            Authority (MIRA).
          </p>

          <p className="mt-6 leading-8 text-slate-600">
            GST is imposed under the Goods and Services Tax Act and operates
            through two broad sectors: the tourism sector and the general
            sector.
          </p>

        </section>

        {/* Contents */}
        <section className="mt-12 rounded-xl border border-slate-200 bg-[#F5F8FC] p-7">

          <h2 className="text-lg font-semibold">
            In this article
          </h2>

          <div className="mt-5 grid gap-3 text-sm">

            <a href="#gst" className="hover:text-[#D71920]">
              1. What is GST?
            </a>

            <a href="#sectors" className="hover:text-[#D71920]">
              2. GST sectors
            </a>

            <a href="#rates" className="hover:text-[#D71920]">
              3. Current GST rates
            </a>

            <a href="#registration" className="hover:text-[#D71920]">
              4. GST registration
            </a>

            <a href="#charging" className="hover:text-[#D71920]">
              5. Charging GST
            </a>

            <a href="#input-tax" className="hover:text-[#D71920]">
              6. Input tax
            </a>

            <a href="#returns" className="hover:text-[#D71920]">
              7. GST returns
            </a>

            <a href="#practical" className="hover:text-[#D71920]">
              8. Practical considerations
            </a>

          </div>

        </section>

        {/* Section 1 */}
        <section id="gst" className="mt-16">

          <h2 className="text-3xl font-semibold tracking-tight">
            1. What is GST?
          </h2>

          <p className="mt-6 leading-8 text-slate-600">
            GST is a consumption tax charged on taxable goods and services.
            In general terms, a GST-registered business charges GST on taxable
            supplies and accounts for the GST collected through its GST
            return.
          </p>

          <p className="mt-5 leading-8 text-slate-600">
            GST should therefore not simply be viewed as additional business
            income. For a registered business, GST collected from customers
            generally represents a tax amount that must be accounted for with
            MIRA, subject to the applicable input tax rules.
          </p>

        </section>

        {/* Section 2 */}
        <section id="sectors" className="mt-16">

          <h2 className="text-3xl font-semibold tracking-tight">
            2. GST sectors
          </h2>

          <p className="mt-6 leading-8 text-slate-600">
            The Maldives GST system distinguishes between tourism goods and
            services and general goods and services.
          </p>

          <div className="mt-8 grid gap-6 md:grid-cols-2">

            <div className="rounded-xl border border-slate-200 p-7">

              <div className="text-xs font-bold uppercase tracking-[0.2em] text-[#168BC4]">
                Tourism
              </div>

              <h3 className="mt-4 text-xl font-semibold">
                Tourism goods and services
              </h3>

              <p className="mt-4 text-sm leading-7 text-slate-600">
                This sector includes supplies connected with establishments
                and activities falling within the tourism sector under the
                applicable legislation.
              </p>

            </div>

            <div className="rounded-xl border border-slate-200 p-7">

              <div className="text-xs font-bold uppercase tracking-[0.2em] text-[#168BC4]">
                General
              </div>

              <h3 className="mt-4 text-xl font-semibold">
                General goods and services
              </h3>

              <p className="mt-4 text-sm leading-7 text-slate-600">
                The general sector broadly covers goods and services that do
                not fall within the tourism sector.
              </p>

            </div>

          </div>

        </section>

        {/* Section 3 */}
        <section id="rates" className="mt-16">

          <h2 className="text-3xl font-semibold tracking-tight">
            3. Current GST rates
          </h2>

          <p className="mt-6 leading-8 text-slate-600">
            From 1 July 2025, the GST rates are 8% for the general sector and
            17% for the tourism sector.
          </p>

          <div className="mt-8 overflow-hidden rounded-xl border border-slate-200">

            <table className="w-full text-left">

              <thead className="bg-[#071B49] text-white">

                <tr>
                  <th className="px-6 py-4 text-sm font-semibold">
                    Sector
                  </th>

                  <th className="px-6 py-4 text-sm font-semibold">
                    GST rate
                  </th>
                </tr>

              </thead>

              <tbody>

                <tr className="border-b border-slate-200">
                  <td className="px-6 py-5 text-sm">
                    General sector
                  </td>

                  <td className="px-6 py-5 text-sm font-semibold">
                    8%
                  </td>
                </tr>

                <tr>
                  <td className="px-6 py-5 text-sm">
                    Tourism sector
                  </td>

                  <td className="px-6 py-5 text-sm font-semibold">
                    17%
                  </td>
                </tr>

              </tbody>

            </table>

          </div>

          <div className="mt-6 rounded-lg border-l-4 border-[#D71920] bg-red-50 p-5 text-sm leading-7 text-slate-700">
            Tax rates and rules can change. CURA articles should always be
            read together with the applicable legislation, regulations and
            current MIRA guidance.
          </div>

        </section>

        {/* Section 4 */}
        <section id="registration" className="mt-16">

          <h2 className="text-3xl font-semibold tracking-tight">
            4. GST registration
          </h2>

          <p className="mt-6 leading-8 text-slate-600">
            Whether a person or business is required to register for GST
            depends on the applicable registration rules and the nature of
            the activities being carried out.
          </p>

          <p className="mt-5 leading-8 text-slate-600">
            Registration is important because a business generally needs to
            be registered before it can charge GST on taxable supplies.
          </p>

        </section>

        {/* Section 5 */}
        <section id="charging" className="mt-16">

          <h2 className="text-3xl font-semibold tracking-tight">
            5. Charging GST
          </h2>

          <p className="mt-6 leading-8 text-slate-600">
            A GST-registered business generally charges GST on taxable
            supplies, subject to the rules applicable to zero-rated and
            exempt supplies.
          </p>

          <p className="mt-5 leading-8 text-slate-600">
            Businesses should ensure that their invoices, accounting records
            and sales systems correctly identify the applicable GST treatment.
          </p>

        </section>

        {/* Section 6 */}
        <section id="input-tax" className="mt-16">

          <h2 className="text-3xl font-semibold tracking-tight">
            6. Input tax
          </h2>

          <p className="mt-6 leading-8 text-slate-600">
            GST-registered businesses may be able to claim eligible GST paid
            on purchases as input tax, subject to the requirements under the
            GST regime.
          </p>

          <p className="mt-5 leading-8 text-slate-600">
            Proper documentation is important. MIRA states that a tax invoice
            is required when claiming GST paid on purchases, together with
            the relevant GST return and input tax statement.
          </p>

        </section>

        {/* Section 7 */}
        <section id="returns" className="mt-16">

          <h2 className="text-3xl font-semibold tracking-tight">
            7. GST returns
          </h2>

          <p className="mt-6 leading-8 text-slate-600">
            GST-registered businesses are required to file GST returns and
            account for the GST collected and eligible input tax in accordance
            with their applicable taxable period.
          </p>

          <p className="mt-5 leading-8 text-slate-600">
            MIRA provides online GST filing facilities through MIRAconnect,
            together with relevant GST forms and guidance.
          </p>

        </section>

        {/* Section 8 */}
        <section id="practical" className="mt-16">

          <h2 className="text-3xl font-semibold tracking-tight">
            8. Practical considerations for businesses
          </h2>

          <div className="mt-7 space-y-4">

            {[
              "Determine whether the business is required to register for GST.",
              "Identify whether supplies fall within the general or tourism sector.",
              "Apply the correct GST treatment to each type of supply.",
              "Maintain appropriate tax invoices and supporting records.",
              "Reconcile output tax and input tax regularly.",
              "File GST returns and make payments within the applicable deadlines.",
              "Monitor changes to legislation, regulations and MIRA guidance.",
            ].map((item) => (
              <div
                key={item}
                className="flex gap-4 rounded-lg border border-slate-200 bg-[#F8FAFC] p-5"
              >
                <div className="mt-1 h-2 w-2 shrink-0 rounded-full bg-[#168BC4]" />

                <p className="text-sm leading-7 text-slate-600">
                  {item}
                </p>

              </div>
            ))}

          </div>

        </section>

        {/* Conclusion */}
        <section className="mt-16 rounded-xl bg-[#071B49] p-8 md:p-10">

          <h2 className="text-2xl font-semibold text-white">
            Conclusion
          </h2>

          <p className="mt-5 leading-8 text-slate-300">
            Understanding GST requires more than knowing the applicable tax
            rate. Businesses need to understand registration, classification
            of supplies, invoicing, input tax, record keeping and filing
            obligations.
          </p>

          <p className="mt-5 leading-8 text-slate-300">
            CURA will continue developing practical resources to help
            businesses and professionals understand Maldives taxation more
            clearly.
          </p>

        </section>

        {/* Disclaimer */}
        <div className="mt-12 border-t border-slate-200 pt-8">

          <p className="text-xs leading-6 text-slate-500">
            <strong>Disclaimer:</strong> This article is provided for general
            educational and informational purposes only. It does not
            constitute tax or legal advice. Readers should refer to the
            applicable legislation, regulations and current guidance issued
            by the relevant authorities before making decisions.
          </p>

        </div>

      </article>

      {/* Footer */}
      <footer className="bg-[#04132D] text-white">

        <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">

          <div className="flex flex-col justify-between gap-8 md:flex-row">

            <div>

              <img
                src="/cura-logo.png"
                alt="CURA"
                className="h-20 w-auto brightness-0 invert"
              />

              <p className="mt-3 text-sm text-slate-400">
                Audit · Tax · Advisory
              </p>

              <p className="mt-2 text-xs tracking-[0.25em] text-[#D99A17]">
                CURE YOUR FIGURES
              </p>

            </div>

            <div className="text-sm text-slate-400">
              <p>Maldives</p>
              <p className="mt-2">
                Professional knowledge platform
              </p>
            </div>

          </div>

          <div className="mt-10 border-t border-white/10 pt-6 text-xs text-slate-500">
            © {new Date().getFullYear()} CURA. All rights reserved.
          </div>

        </div>

      </footer>

    </main>
  )
}