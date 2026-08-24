import Link from "next/link"
import CuraHeader from "@/components/CuraHeader"
import CuraFooter from "@/components/CuraFooter"
import ServiceInquiryForm from "@/components/ServiceInquiryForm"
import { ServiceCategory, ServiceItem } from "@/components/service-data"

type Props = {
  category: ServiceCategory
  service: ServiceItem
}

export default function ServiceDetailPage({
  category,
  service,
}: Props) {
  return (
    <main className="min-h-screen bg-white text-[#071B49]">
      <CuraHeader />

      {/* HERO */}
      <section className="bg-[#F5F8FC]">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8 lg:py-24">
          <Link
            href={`/${category.slug}`}
            className="text-sm font-semibold text-[#071B49] hover:text-[#1B5DBF]"
          >
            ← Back to {category.title}
          </Link>

          <div className="mt-12 max-w-4xl">
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#1B5DBF]">
              {category.title}
            </p>

            <h1 className="mt-5 text-5xl font-semibold leading-[1.05] tracking-tight md:text-6xl">
              {service.title}
            </h1>

            <p className="mt-7 max-w-3xl text-xl leading-9 text-slate-600">
              {service.shortDescription}
            </p>

            <a
              href="#inquiry"
              className="mt-9 inline-flex rounded-md bg-[#071B49] px-7 py-3.5 text-sm font-semibold !text-white transition hover:bg-[#0B2A69]"
            >
              Discuss your requirements →
            </a>
          </div>
        </div>
      </section>

      {/* INTRODUCTION */}
      <section>
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
          <div className="grid gap-14 lg:grid-cols-[1.5fr_0.8fr]">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#1B5DBF]">
                Understanding the service
              </p>

              <p className="mt-6 text-lg leading-9 text-slate-600">
                {service.introduction}
              </p>
            </div>

            <div className="rounded-2xl bg-[#F5F8FC] p-8">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#1B5DBF]">
                Service
              </p>

              <h2 className="mt-4 text-2xl font-semibold">
                {service.title}
              </h2>

              <p className="mt-4 text-sm leading-7 text-slate-600">
                A CURA service designed around the practical needs
                of businesses and professionals in the Maldives.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* WHY IT MATTERS */}
      <section className="bg-[#F5F8FC]">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#1B5DBF]">
              Why it matters
            </p>

            <h2 className="mt-5 text-4xl font-semibold">
              What businesses need to consider
            </h2>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-2">
            {service.whyItMatters.map((item, index) => (
              <div
                key={item}
                className="rounded-xl border border-slate-200 bg-white p-7"
              >
                <span className="text-sm font-bold text-[#1B5DBF]">
                  {String(index + 1).padStart(2, "0")}
                </span>

                <p className="mt-4 leading-7 text-slate-600">
                  {item}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHAT WE DO */}
      <section>
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#1B5DBF]">
              Our services
            </p>

            <h2 className="mt-5 text-4xl font-semibold">
              How CURA can help
            </h2>
          </div>

          <div className="mt-12 grid gap-x-10 gap-y-5 md:grid-cols-2">
            {service.whatWeDo.map((item) => (
              <div
                key={item}
                className="flex gap-4 border-b border-slate-200 pb-5"
              >
                <span className="mt-1 text-[#1B5DBF]">✓</span>

                <p className="leading-7 text-slate-600">
                  {item}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHO NEEDS IT */}
      <section className="bg-[#F5F8FC]">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#1B5DBF]">
                Who we help
              </p>

              <h2 className="mt-5 text-4xl font-semibold">
                Is this relevant to your business?
              </h2>
            </div>

            <div className="space-y-4">
              {service.whoNeedsIt.map((item) => (
                <div
                  key={item}
                  className="rounded-xl border border-slate-200 bg-white px-6 py-5"
                >
                  <p className="font-medium text-slate-700">
                    {item}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* WHY CURA */}
      <section>
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#1B5DBF]">
              Why CURA
            </p>

            <h2 className="mt-5 text-4xl font-semibold">
              Technical knowledge with a practical perspective.
            </h2>

            <p className="mt-6 text-lg leading-8 text-slate-600">
              We believe professional advice should help clients
              understand what needs to be done, why it matters and
              how it can be implemented.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {service.whyCura.map((item) => (
              <div
                key={item}
                className="rounded-2xl border border-slate-200 p-7"
              >
                <div className="text-2xl text-[#1B5DBF]">+</div>

                <p className="mt-4 leading-7 text-slate-600">
                  {item}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      {service.faqs.length > 0 && (
        <section className="bg-[#F5F8FC]">
          <div className="mx-auto max-w-4xl px-6 py-20 lg:px-8">
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#1B5DBF]">
              Frequently asked questions
            </p>

            <h2 className="mt-5 text-4xl font-semibold">
              Common questions
            </h2>

            <div className="mt-10 space-y-4">
              {service.faqs.map((faq) => (
                <details
                  key={faq.question}
                  className="group rounded-xl border border-slate-200 bg-white p-6"
                >
                  <summary className="cursor-pointer list-none font-semibold">
                    <span className="flex items-center justify-between gap-6">
                      {faq.question}
                      <span className="text-[#1B5DBF]">
                        +
                      </span>
                    </span>
                  </summary>

                  <p className="mt-5 leading-7 text-slate-600">
                    {faq.answer}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* INQUIRY */}
      <ServiceInquiryForm
        category={category.title}
        service={service.title}
      />

      <CuraFooter />
    </main>
  )
}