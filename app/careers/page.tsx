"use client"

import { useEffect, useState } from "react"
import CuraHeader from "@/components/CuraHeader"
import CuraFooter from "@/components/CuraFooter"
import { createClient } from "@/lib/supabase/client"

type Career = {
  id: string
  title: string
  slug: string | null
  department: string | null
  location: string | null
  employment_type: string | null
  description: string | null
  closing_date: string | null
  published: boolean
}

function formatDate(date: string | null) {
  if (!date) return null

  return new Date(date).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  })
}

export default function CareersPage() {
  const supabase = createClient()

  const [careers, setCareers] = useState<Career[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadCareers() {
      const { data, error } = await supabase
        .from("careers")
        .select(`
          id,
          title,
          slug,
          department,
          location,
          employment_type,
          description,
          closing_date,
          published
        `)
        .eq("published", true)
        .order("closing_date", {
          ascending: true,
          nullsFirst: false,
        })

      if (error) {
        console.error("Failed to load careers:", error)
        setCareers([])
      } else {
        setCareers(data ?? [])
      }

      setLoading(false)
    }

    loadCareers()
  }, [])

  return (
    <main className="min-h-screen bg-[#F5F8FC] text-[#071B49]">

      <CuraHeader />

      {/* HERO */}

      <section className="bg-[#071B49]">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8">

          <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#35B5E5]">
            Careers at CURA
          </p>

          <h1 className="mt-5 max-w-4xl text-4xl font-semibold tracking-tight text-white md:text-6xl">
            Build your career with CURA
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
            Join a professional environment focused on audit, tax, advisory,
            law and continuous learning.
          </p>

        </div>
      </section>

      {/* WHY CURA */}

      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">

          <div className="max-w-3xl">

            <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#168BC4]">
              Why CURA
            </p>

            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-[#071B49] md:text-4xl">
              Grow with purpose
            </h2>

            <p className="mt-5 text-base leading-8 text-slate-600">
              At CURA, we believe professional growth comes from meaningful
              work, continuous learning and exposure to real-world challenges.
              We aim to create an environment where professionals can develop
              their technical knowledge, judgment and practical skills.
            </p>

          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">

            <div className="rounded-xl border border-slate-200 bg-[#F8FAFD] p-6">
              <h3 className="text-lg font-semibold text-[#071B49]">
                Professional Growth
              </h3>

              <p className="mt-3 text-sm leading-7 text-slate-600">
                Develop your technical and professional capabilities through
                meaningful assignments and continuous learning.
              </p>
            </div>

            <div className="rounded-xl border border-slate-200 bg-[#F8FAFD] p-6">
              <h3 className="text-lg font-semibold text-[#071B49]">
                Practical Experience
              </h3>

              <p className="mt-3 text-sm leading-7 text-slate-600">
                Gain exposure to practical issues across audit, tax,
                accounting and advisory.
              </p>
            </div>

            <div className="rounded-xl border border-slate-200 bg-[#F8FAFD] p-6">
              <h3 className="text-lg font-semibold text-[#071B49]">
                Continuous Learning
              </h3>

              <p className="mt-3 text-sm leading-7 text-slate-600">
                Build knowledge through research, education and exposure to
                evolving professional and regulatory developments.
              </p>
            </div>

            <div className="rounded-xl border border-slate-200 bg-[#F8FAFD] p-6">
              <h3 className="text-lg font-semibold text-[#071B49]">
                Meaningful Work
              </h3>

              <p className="mt-3 text-sm leading-7 text-slate-600">
                Contribute to work that helps businesses and professionals
                make better-informed decisions.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* CURRENT OPPORTUNITIES */}

      <section>
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">

          <div className="mb-10">

            <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#168BC4]">
              Opportunities
            </p>

            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-[#071B49] md:text-4xl">
              Current opportunities
            </h2>

            <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600">
              Explore current opportunities at CURA. New positions will be
              published here as they become available.
            </p>

          </div>

          {/* LOADING */}

          {loading && (
            <div className="rounded-xl border border-slate-200 bg-white px-6 py-16 text-center">

              <div className="mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-4 border-slate-200 border-t-[#168BC4]" />

              <p className="text-sm text-slate-500">
                Loading current opportunities...
              </p>

            </div>
          )}

          {/* NO VACANCIES */}

          {!loading && careers.length === 0 && (
            <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center">

              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#EAF7FC] text-xl text-[#168BC4]">
                +
              </div>

              <h3 className="mt-5 text-xl font-semibold text-[#071B49]">
                No current vacancies
              </h3>

              <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-slate-500">
                We do not have any published vacancies at the moment.
                Please check this page again for future opportunities.
              </p>

            </div>
          )}

          {/* VACANCIES */}

          {!loading && careers.length > 0 && (
            <div className="grid gap-6 md:grid-cols-2">

              {careers.map((career) => (

                <article
                  key={career.id}
                  className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
                >

                  <div className="flex flex-wrap gap-2">

                    {career.department && (
                      <span className="rounded-full bg-[#EAF7FC] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-[#0876A8]">
                        {career.department}
                      </span>
                    )}

                    {career.employment_type && (
                      <span className="rounded-full bg-slate-100 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-slate-600">
                        {career.employment_type}
                      </span>
                    )}

                  </div>

                  <h3 className="mt-5 text-2xl font-semibold text-[#071B49]">
                    {career.title}
                  </h3>

                  {career.description && (
                    <p className="mt-4 text-sm leading-7 text-slate-600">
                      {career.description}
                    </p>
                  )}

                  <div className="mt-6 space-y-2 text-sm text-slate-500">

                    {career.location && (
                      <p>
                        <span className="font-semibold text-[#071B49]">
                          Location:
                        </span>{" "}
                        {career.location}
                      </p>
                    )}

                    {career.closing_date && (
                      <p>
                        <span className="font-semibold text-[#071B49]">
                          Closing date:
                        </span>{" "}
                        {formatDate(career.closing_date)}
                      </p>
                    )}

                  </div>

                  {career.slug && (
                    <a
                      href={`/careers/${career.slug}`}
                      className="mt-7 inline-block text-sm font-semibold text-[#071B49] transition hover:text-[#D71920]"
                    >
                      View position →
                    </a>
                  )}

                </article>

              ))}

            </div>
          )}

        </div>
      </section>

      {/* GENERAL APPLICATION */}

      <section className="bg-[#071B49]">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">

          <div className="max-w-3xl">

            <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#35B5E5]">
              Stay Connected
            </p>

            <h2 className="mt-4 text-3xl font-semibold text-white md:text-4xl">
              Interested in joining CURA?
            </h2>

            <p className="mt-5 text-base leading-8 text-slate-300">
              Even when there are no suitable vacancies, we encourage
              professionals who are interested in working with CURA to keep
              an eye on this page for future opportunities.
            </p>

          </div>

        </div>
      </section>

      <CuraFooter />

    </main>
  )
}