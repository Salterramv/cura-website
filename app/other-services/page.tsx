import Link from "next/link"

const services = [
  {
    number: "01",
    title: "Bookkeeping Service",
    description:
      "Professional bookkeeping support designed to keep your financial records organized, timely and useful for running your business.",
    points: [
      "Monthly bookkeeping",
      "Accounts receivable and payable",
      "Bank and cash reconciliation",
      "Inventory accounting",
      "GST and tax compliance support",
      "Year-end accounting",
      "Management information and client support",
    ],
    href: "/other-services/bookkeeping",
  },
  {
    number: "02",
    title: "Payroll Service",
    description:
      "Structured payroll support designed to make monthly payroll processing accurate, consistent and easier to manage.",
    points: [
      "Monthly payroll processing",
      "Employee master file maintenance",
      "Salary and overtime calculations",
      "Leave adjustments and deductions",
      "MRPS calculations",
      "Electronic payslips",
      "Payroll reporting and analytics",
    ],
    href: "/other-services/payroll",
  },
]

export default function OtherServicesPage() {
  return (
    <main className="min-h-screen bg-white text-[#071B49]">

      {/* HERO */}
      <section className="relative overflow-hidden bg-[#061936]">
        <div className="absolute inset-0">
          <div className="absolute right-0 top-0 h-full w-1/2 bg-gradient-to-l from-[#0D4F85] via-[#0A315F] to-transparent opacity-80" />

          <div className="absolute -right-40 -top-40 h-[600px] w-[600px] rounded-full bg-[#168BC4] opacity-20 blur-3xl" />

          <div className="absolute bottom-0 left-1/3 h-64 w-64 rounded-full bg-[#0C73A8] opacity-20 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-7xl px-6 py-24 lg:px-8 lg:py-32">
          <p className="text-xs font-bold uppercase tracking-[0.35em] text-[#35B5E5]">
            Other Services
          </p>

          <h1 className="mt-6 max-w-4xl text-5xl font-semibold leading-[1.05] tracking-tight text-white md:text-7xl">
            Practical support for the
            <br />
            <span className="text-[#8EB3D7]">
              processes behind your business.
            </span>
          </h1>

          <p className="mt-8 max-w-3xl text-lg leading-8 text-slate-300 md:text-xl">
            CURA provides bookkeeping and payroll support designed to reduce
            administrative burden, improve consistency and give businesses
            access to professional financial support.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <a
              href="#services"
              className="rounded-md bg-white px-7 py-3.5 text-sm font-semibold text-[#071B49] transition hover:bg-slate-100"
            >
              Explore services →
            </a>

            <a
              href="#contact"
              className="rounded-md border border-white/40 bg-transparent px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-white/10 hover:text-white" style={{ color: "#FFFFFF" }}
            >
              Discuss your requirements
            </a>
          </div>
        </div>
      </section>

      {/* INTRO */}
      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8 lg:py-24">

          <div className="grid gap-14 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">

            <div>
              <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#168BC4]">
                Business support
              </p>

              <h2 className="mt-5 max-w-3xl text-4xl font-semibold tracking-tight md:text-5xl">
                Let your team focus on the business. Let CURA support the
                process.
              </h2>

              <p className="mt-7 max-w-3xl text-lg leading-9 text-slate-600">
                Bookkeeping and payroll are essential recurring business
                processes. Outsourcing these functions can reduce
                administrative pressure while providing access to structured
                professional support.
              </p>
            </div>

            <div className="rounded-2xl bg-[#F5F8FC] p-8">
              <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#168BC4]">
                CURA approach
              </p>

              <p className="mt-5 text-2xl font-semibold leading-9 text-[#071B49]">
                Professional knowledge. Practical support. Clear processes.
              </p>

              <p className="mt-5 leading-7 text-slate-600">
                Our services are designed around the practical requirements of
                businesses operating in the Maldives.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section
        id="services"
        className="bg-[#F5F8FC]"
      >
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8 lg:py-24">

          <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#168BC4]">
            Our services
          </p>

          <h2 className="mt-5 text-4xl font-semibold tracking-tight md:text-5xl">
            Choose the support your business needs.
          </h2>

          <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-600">
            Explore our bookkeeping and payroll services, including packages,
            benefits and the option to discuss customized requirements.
          </p>

          <div className="mt-12 grid gap-7 lg:grid-cols-2">

            {services.map((service) => (
              <Link
                key={service.title}
                href={service.href}
                className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-8 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-[#18B8EE]/50 hover:shadow-xl md:p-10"
              >
                <div className="absolute right-0 top-0 h-48 w-48 translate-x-20 -translate-y-20 rounded-full border-[24px] border-[#18B8EE]/5 transition duration-500 group-hover:scale-125" />

                <div className="relative">

                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold tracking-[0.25em] text-[#18B8EE]">
                      {service.number}
                    </span>

                    <span className="text-2xl text-[#168BC4] transition-transform duration-300 group-hover:translate-x-1">
                      →
                    </span>
                  </div>

                  <h3 className="mt-8 text-3xl font-semibold tracking-tight text-[#071B49]">
                    {service.title}
                  </h3>

                  <p className="mt-5 text-base leading-8 text-slate-600">
                    {service.description}
                  </p>

                  <div className="mt-8 border-t border-slate-200 pt-7">
                    <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#168BC4]">
                      What we support
                    </p>

                    <ul className="mt-5 space-y-3">
                      {service.points.map((point) => (
                        <li
                          key={point}
                          className="flex gap-3 text-sm leading-6 text-slate-600"
                        >
                          <span className="mt-1 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[#E7F7FC] text-[10px] font-bold text-[#168BC4]">
                            ✓
                          </span>

                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-9 text-sm font-semibold text-[#071B49] transition group-hover:text-[#168BC4]">
                    Explore {service.title} →
                  </div>

                </div>
              </Link>
            ))}

          </div>
        </div>
      </section>

      {/* WHY CURA */}
      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8 lg:py-24">

          <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">

            <div>
              <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#168BC4]">
                Why CURA
              </p>

              <h2 className="mt-5 text-4xl font-semibold tracking-tight md:text-5xl">
                Support that fits the way your business operates.
              </h2>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">

              {[
                "Professional financial knowledge",
                "Practical understanding of the Maldives business environment",
                "Structured and consistent processes",
                "Flexible support around client requirements",
                "Clear communication with management",
                "Access to wider accounting, tax and advisory knowledge",
              ].map((item, index) => (
                <div
                  key={item}
                  className="rounded-xl border border-slate-200 bg-[#F5F8FC] p-6"
                >
                  <span className="text-xs font-bold tracking-[0.2em] text-[#18B8EE]">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <p className="mt-4 leading-7 text-slate-600">
                    {item}
                  </p>
                </div>
              ))}

            </div>

          </div>
        </div>
      </section>

      {/* CUSTOMIZED REQUIREMENTS */}
      <section
        id="contact"
        className="bg-[#071B49]"
      >
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8 lg:py-24">

          <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#35B5E5]">
            Customized requirements
          </p>

          <div className="mt-6 grid gap-10 lg:grid-cols-[1.3fr_0.7fr] lg:items-end">

            <div>
              <h2 className="max-w-4xl text-4xl font-semibold tracking-tight text-white md:text-5xl">
                Don't see exactly what your business needs?
              </h2>

              <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">
                Tell us about your requirements. You can explore the standard
                packages first, or contact CURA to discuss a customized
                arrangement.
              </p>
            </div>

            <div className="rounded-2xl bg-white p-7">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#168BC4]">
                Get started
              </p>

              <p className="mt-4 text-lg font-semibold text-[#071B49]">
                Choose a service and tell us what you need.
              </p>

              <div className="mt-6 space-y-3">

                <Link
                  href="/other-services/bookkeeping#enquiry"
                  className="flex items-center justify-between rounded-lg bg-[#071B49] px-5 py-4 text-sm font-semibold transition hover:bg-[#168BC4] hover:text-white" style={{ color: "#FFFFFF" }}
                >
                  Bookkeeping enquiry
                  <span>→</span>
                </Link>

                <Link
                  href="/other-services/payroll#enquiry"
                  className="flex items-center justify-between rounded-lg border border-slate-200 px-5 py-4 text-sm font-semibold text-[#071B49] transition hover:border-[#168BC4] hover:text-[#168BC4]"
                >
                  Payroll enquiry
                  <span>→</span>
                </Link>

              </div>
            </div>

          </div>
        </div>
      </section>

    </main>
  )
}