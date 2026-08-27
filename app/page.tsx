import CuraHeader from "@/components/CuraHeader"
import CuraFooter from "@/components/CuraFooter"

const taxInsights = [
  {
    tag: "TAX UPDATE",
    title: "Understanding Tax Obligations in the Maldives",
    description:
      "Practical guidance on Maldives tax rules, filing obligations and important compliance considerations.",
    date: "Latest",
  },
  {
    tag: "TAX GUIDE",
    title: "Understanding GST in the Maldives",
    description:
      "Clear explanations of GST registration, filing and compliance requirements.",
    date: "Guide",
  },
]

const legalCases = [
  {
    tag: "SUPREME COURT",
    title: "Tax Legal Case Summaries",
    description:
      "Clear summaries of important Supreme Court decisions affecting taxation and business.",
    date: "Cases",
  },
  {
    tag: "TAX APPEAL TRIBUNAL",
    title: "Tax Appeal Decisions",
    description:
      "Explore important decisions and the principles that can be learned from them.",
    date: "Cases",
  },
]

const services = [
  {
    number: "01",
    title: "Tax",
    href: "/tax",
    description:
      "Practical tax compliance and advisory services for businesses and professionals.",
  },
  {
    number: "02",
    title: "Audit",
    href: "/audit",
    description:
      "Audit and assurance services focused on financial reporting, risk and controls.",
  },
  {
    number: "03",
    title: "Advisory",
    href: "/advisory",
    description:
      "Financial and business advice to help management make better decisions.",
  },
  {
    number: "04",
    title: "Legal",
    href: "/legal",
    description:
      "Practical legal and regulatory guidance for businesses and commercial matters.",
  },
  {
    number: "05",
    title: "Education",
    href: "/education",
    description:
      "Learning resources to strengthen your professional knowledge.",
  },
  {
    number: "06",
    title: "Other Services",
    href: "/other-services",
    description:
      "Bookkeeping and payroll support designed around the practical needs of businesses.",
  },
]

export default function Home() {
  return (
    <main className="min-h-screen bg-white text-[#071B49]">

      {/* SHARED CURA HEADER */}
      <CuraHeader />

      {/* HERO */}
      <section className="relative overflow-hidden bg-[#061936]">

        <div className="absolute inset-0">
          <div className="absolute right-0 top-0 h-full w-1/2 bg-gradient-to-l from-[#0D4F85] via-[#0A315F] to-transparent opacity-80" />

          <div className="absolute -right-32 -top-32 h-[600px] w-[600px] rounded-full bg-[#168BC4] opacity-20 blur-3xl" />

          <div className="absolute bottom-0 right-1/4 h-64 w-64 rounded-full bg-[#0C73A8] opacity-20 blur-3xl" />
        </div>

        <div className="relative mx-auto grid max-w-7xl items-center px-6 py-24 lg:grid-cols-2 lg:px-8 lg:py-32">

          <div className="max-w-2xl">

            <p className="mb-6 text-xs font-bold uppercase tracking-[0.35em] text-[#35B5E5]">
              Maldives Professional Knowledge Platform
            </p>

            <h1 className="text-5xl font-semibold leading-[1.05] tracking-tight text-white md:text-7xl">
              Clarity in
              <br />
              <span className="text-[#8EB3D7]">
                numbers and legal matters
              </span>
              <span className="text-[#D71920]">.</span>
            </h1>

            <p className="mt-8 max-w-xl text-lg leading-8 text-slate-300">
              CURA brings together practical knowledge in taxation,
              accounting, audit, advisory and legal matters — helping
              businesses and professionals make better-informed decisions.
            </p>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row">

              <a
                href="/articles"
                className="rounded-md bg-white px-7 py-3.5 text-center text-sm font-semibold text-[#071B49] transition hover:bg-slate-100"
              >
                Explore Knowledge →
              </a>

              <a
                href="/cases"
                className="rounded-md bg-white px-7 py-3.5 text-center text-sm font-semibold text-[#071B49] transition hover:bg-slate-100"
              >
                Browse Legal Cases →
              </a>

            </div>

          </div>

          {/* BRAND STATEMENT */}
          <div className="mt-16 flex justify-center lg:mt-0 lg:justify-end">

            <div className="relative flex h-80 w-80 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] backdrop-blur-sm md:h-96 md:w-96">

              <div className="absolute inset-8 rounded-full border border-[#168BC4]/30" />

              <div className="text-center">

                <div className="text-7xl font-light tracking-[0.2em] text-white">
                  CURA
                </div>

                <div className="mt-4 text-xs tracking-[0.45em] text-[#35B5E5]">
                  AUDIT · TAX · ADVISORY
                </div>

                <div className="mx-auto mt-7 h-px w-24 bg-[#D99A17]" />

                <div className="mt-6 text-sm tracking-[0.35em] text-slate-300">
                  CURE YOUR FIGURES
                </div>

              </div>

            </div>

          </div>

        </div>
      </section>

      {/* SERVICE STRIP */}
      <section className="relative z-10 -mt-8 px-6">

        <div className="mx-auto grid max-w-7xl overflow-hidden rounded-xl border border-slate-200 bg-white shadow-xl md:grid-cols-6">

          {services.map((service, index) => (
            <a
              key={service.title}
              href={service.href}
              className={`group p-7 transition hover:bg-slate-50 ${
                index !== services.length - 1
                  ? "border-b border-slate-200 md:border-b-0 md:border-r"
                  : ""
              }`}
            >

              <div className="text-xs font-bold tracking-[0.2em] text-slate-400">
                {service.number}
              </div>

              <h3 className="mt-5 text-lg font-semibold text-[#071B49]">
                {service.title}
              </h3>

              <p className="mt-3 text-sm leading-6 text-slate-600">
                {service.description}
              </p>

              <div className="mt-5 text-sm font-semibold text-[#071B49] transition group-hover:text-[#D71920]">
                Explore →
              </div>

            </a>
          ))}

        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="bg-white">

        <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8">

          <div className="grid gap-16 md:grid-cols-2">

            <div>

              <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#168BC4]">
                About CURA
              </p>

              <h2 className="mt-5 text-4xl font-semibold tracking-tight text-[#071B49] md:text-5xl">
                Knowledge before advice.
              </h2>

            </div>

            <div className="text-base leading-8 text-slate-600">

              <p>
                CURA is being developed as a professional platform focused on
                making complex tax, accounting, audit and legal matters easier
                to understand.
              </p>

              <p className="mt-6">
                Our goal is simple: provide reliable, practical and accessible
                knowledge that helps individuals, businesses and professionals
                navigate the increasingly complex world of regulation and
                finance.
              </p>

              <p className="mt-6 font-medium text-[#071B49]">
                CURE YOUR FIGURES.
              </p>

            </div>

          </div>

        </div>
      </section>

      {/* KNOWLEDGE */}
      <section id="knowledge" className="bg-[#F5F8FC]">

        <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8">

          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">

            <div>

              <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#168BC4]">
                Knowledge Centre
              </p>

              <h2 className="mt-4 text-4xl font-semibold tracking-tight text-[#071B49]">
                Latest tax insights
              </h2>

              <p className="mt-4 max-w-2xl text-slate-600">
                Practical articles and guides designed to make Maldives tax
                easier to understand.
              </p>

            </div>

            <a
              href="/articles"
              className="font-semibold text-[#071B49] hover:text-[#D71920]"
            >
              View all articles →
            </a>

          </div>

          <div className="mt-12 grid gap-6 lg:grid-cols-2">

            {taxInsights.map((article) => (
              <article
                key={article.title}
                className="rounded-xl border border-slate-200 bg-white p-8 transition hover:-translate-y-1 hover:shadow-lg"
              >

                <div className="flex items-center justify-between">

                  <span className="rounded-full bg-[#E7F4FA] px-3 py-1 text-[10px] font-bold tracking-[0.15em] text-[#0876A8]">
                    {article.tag}
                  </span>

                  <span className="text-xs text-slate-400">
                    {article.date}
                  </span>

                </div>

                <h3 className="mt-6 text-2xl font-semibold leading-8 text-[#071B49]">
                  {article.title}
                </h3>

                <p className="mt-4 leading-7 text-slate-600">
                  {article.description}
                </p>

                <a
                  href="#"
                  className="mt-7 inline-block text-sm font-semibold text-[#071B49] hover:text-[#D71920]"
                >
                  Read article →
                </a>

              </article>
            ))}

          </div>

        </div>
      </section>

      {/* LEGAL CASES */}
      <section id="cases" className="bg-white">

        <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8">

          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">

            <div>

              <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#D71920]">
                Legal Case Library
              </p>

              <h2 className="mt-4 text-4xl font-semibold tracking-tight text-[#071B49]">
                Latest legal cases
              </h2>

              <p className="mt-4 max-w-2xl text-slate-600">
                Clear summaries of important tax decisions and the principles
                behind them.
              </p>

            </div>

            <a
              href="/cases"
              className="font-semibold text-[#071B49] hover:text-[#D71920]"
            >
              View all cases →
            </a>

          </div>

          <div className="mt-12 grid gap-6 lg:grid-cols-2">

            {legalCases.map((item) => (
              <article
                key={item.title}
                className="rounded-xl border border-slate-200 p-8 transition hover:-translate-y-1 hover:shadow-lg"
              >

                <span className="rounded-full bg-red-50 px-3 py-1 text-[10px] font-bold tracking-[0.15em] text-[#D71920]">
                  {item.tag}
                </span>

                <h3 className="mt-6 text-2xl font-semibold leading-8 text-[#071B49]">
                  {item.title}
                </h3>

                <p className="mt-4 leading-7 text-slate-600">
                  {item.description}
                </p>

                <a
                  href="#"
                  className="mt-7 inline-block text-sm font-semibold text-[#071B49] hover:text-[#D71920]"
                >
                  Read case summary →
                </a>

              </article>
            ))}

          </div>

        </div>
      </section>

      {/* EDUCATION */}
      <section id="education" className="bg-[#071B49]">

        <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8">

          <div className="max-w-3xl">

            <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#35B5E5]">
              Education
            </p>

            <h2 className="mt-5 text-4xl font-semibold tracking-tight text-white md:text-5xl">
              Learn. Understand. Apply.
            </h2>

            <p className="mt-6 text-lg leading-8 text-slate-300">
              Practical educational resources covering taxation, accounting,
              audit, financial reporting and professional development.
            </p>

            <a
              href="/education"
              className="mt-9 inline-block rounded-md bg-white px-7 py-3.5 text-sm font-semibold text-[#071B49] hover:bg-slate-100"
            >
              Explore Education →
            </a>

          </div>

        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="bg-[#F5F8FC]">

        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8">

          <div className="flex flex-col justify-between gap-8 md:flex-row md:items-center">

            <div>

              <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#168BC4]">
                CURA
              </p>

              <h2 className="mt-4 text-3xl font-semibold text-[#071B49]">
                Have a question?
              </h2>

              <p className="mt-3 text-slate-600">
                Get in touch with CURA.
              </p>

            </div>

            <a
              href="mailto:info@cura.mv"
              className="rounded-md bg-[#071B49] px-7 py-3.5 text-center text-sm font-semibold !text-white hover:bg-[#0B2A69]"
            >
              Contact CURA →
            </a>

          </div>

        </div>
      </section>

      {/* SHARED CURA FOOTER */}
      <CuraFooter />

    </main>
  )
}