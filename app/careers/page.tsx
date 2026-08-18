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
}

function formatDate(date: string | null) {
  if (!date) return null

  return new Date(date).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  })
}

export default async function CareersPage() {
  const supabase = createClient()

  const { data: careers, error } = await supabase
    .from("careers")
    .select(`
      id,
      title,
      slug,
      department,
      location,
      employment_type,
      description,
      closing_date
    `)
    .eq("published", true)
    .order("closing_date", {
      ascending: true,
      nullsFirst: false,
    })

  if (error) {
    console.error("Failed to load careers:", error)
  }

  const jobs = (careers ?? []) as Career[]

  return (
    <main className="min-h-screen bg-[#F5F8FC] text-[#071B49]">

      <CuraHeader />

      {/* HERO */}

      <section className="bg-[#071B49]">

        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8">

          <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#35B5E5]">
            Careers at CURA
          </p>

          <h1 className="mt-5 text-4xl font-semibold tracking-tight text-white md:text-6xl">
            Build your career with CURA
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
            Join CURA and contribute to a professional knowledge platform
            focused on audit, tax, advisory and law.
          </p>

        </div>

      </section>

      {/* JOBS */}

      <section>

        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">

          <div className="mb-10">

            <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#168BC4]">
              Current Opportunities
            </p>

            <h2 className="mt-3 text-3xl font-semibold text-[#071B49]">
              Open positions
            </h2>

          </div>

          {jobs.length > 0 ? (

            <div className="grid gap-6 md:grid-cols-2">

              {jobs.map((job) => (

                <article
                  key={job.id}
                  className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
                >

                  <div className="flex flex-wrap items-start justify-between gap-4">

                    <div>

                      <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#168BC4]">
                        {job.department || "CURA"}
                      </p>

                      <h3 className="mt-3 text-2xl font-semibold text-[#071B49]">
                        {job.title}
                      </h3>

                    </div>

                    {job.closing_date && (
                      <span className="rounded-full bg-[#FFF4DD] px-3 py-1 text-xs font-semibold text-[#9A6A00]">
                        Closes {formatDate(job.closing_date)}
                      </span>
                    )}

                  </div>

                  <div className="mt-5 flex flex-wrap gap-3 text-sm text-slate-500">

                    {job.location && (
                      <span>
                        📍 {job.location}
                      </span>
                    )}

                    {job.employment_type && (
                      <span>
                        · {job.employment_type}
                      </span>
                    )}

                  </div>

                  {job.description && (
                    <p className="mt-5 line-clamp-3 text-sm leading-7 text-slate-600">
                      {job.description}
                    </p>
                  )}

                  {job.slug ? (
                    <a
                      href={`/careers/${job.slug}`}
                      className="mt-7 inline-flex items-center rounded-lg bg-[#061B3D] px-5 py-3 text-sm font-semibold !text-white transition hover:bg-[#0B2A55]"
                    >
                      View position
                      <span className="ml-2">
                        →
                      </span>
                    </a>
                  ) : (
                    <span className="mt-7 inline-block text-sm text-slate-400">
                      Position details unavailable
                    </span>
                  )}

                </article>

              ))}

            </div>

          ) : (

            <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center">

              <h3 className="text-xl font-semibold text-[#071B49]">
                No current vacancies
              </h3>

              <p className="mt-3 text-sm text-slate-500">
                There are no open positions at CURA at the moment.
                Please check again later.
              </p>

            </div>

          )}

        </div>

      </section>

      <CuraFooter />

    </main>
  )
}
