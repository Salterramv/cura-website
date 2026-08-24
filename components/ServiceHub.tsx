import Link from "next/link"
import CuraHeader from "@/components/CuraHeader"
import CuraFooter from "@/components/CuraFooter"
import { ServiceCategory } from "@/components/service-data"

type Props = {
  service: ServiceCategory
}

export default function ServiceHub({ service }: Props) {
  return (
    <main className="min-h-screen bg-white text-[#071B49]">
      <CuraHeader />

      <section className="bg-[#F5F8FC]">
        <div className="mx-auto max-w-7xl px-6 py-20 md:py-28 lg:px-8">
          <div className="max-w-4xl">
            <div className="flex items-center gap-5 text-sm font-bold uppercase tracking-[0.25em] text-[#1B5DBF]">
              <span>{service.number}</span>
              <span className="h-px w-14 bg-[#1B5DBF]" />
              <span>{service.title}</span>
            </div>

            <h1 className="mt-7 text-5xl font-semibold leading-[1.05] tracking-tight md:text-7xl">
              {service.headline}
            </h1>

            <p className="mt-8 max-w-3xl text-xl leading-9 text-slate-600">
              {service.description}
            </p>
          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#1B5DBF]">
              Our services
            </p>

            <h2 className="mt-4 text-4xl font-semibold">
              How CURA can help
            </h2>

            <p className="mt-5 leading-8 text-slate-600">
              Explore the areas in which CURA can support your
              business. Each service provides detailed information
              about the issues involved and how we can assist.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {service.services.map((item, index) => (
              <Link
                key={item.slug}
                href={`/${service.slug}/${item.slug}`}
                className="group rounded-2xl border border-slate-200 bg-white p-8 transition duration-300 hover:-translate-y-1 hover:border-[#B9D9EA] hover:shadow-xl"
              >
                <div className="text-xs font-bold tracking-[0.2em] text-slate-400">
                  {String(index + 1).padStart(2, "0")}
                </div>

                <h3 className="mt-6 text-2xl font-semibold">
                  {item.title}
                </h3>

                <p className="mt-4 leading-7 text-slate-600">
                  {item.shortDescription}
                </p>

                <span className="mt-7 inline-flex text-sm font-semibold text-[#071B49] transition group-hover:text-[#1B5DBF]">
                  Explore service →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#071B49]">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#35B5E5]">
              CURA approach
            </p>

            <h2 className="mt-5 text-4xl font-semibold text-white">
              Practical advice. Clear thinking. Better decisions.
            </h2>

            <p className="mt-6 text-lg leading-8 text-slate-300">
              CURA brings together technical knowledge and practical
              business thinking to help clients understand their
              circumstances and make informed decisions.
            </p>
          </div>
        </div>
      </section>

      <CuraFooter />
    </main>
  )
}