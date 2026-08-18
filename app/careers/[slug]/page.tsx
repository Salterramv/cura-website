import { notFound } from "next/navigation"
import CuraHeader from "@/components/CuraHeader"
import CuraFooter from "@/components/CuraFooter"
import { createClient } from "@/lib/supabase/client"

type PageProps = {
  params: Promise<{
    slug: string
  }>
}

type Career = {
  id: string
  title: string
  slug: string | null
  department: string | null
  location: string | null
  employment_type: string | null
  description: string | null
  responsibilities: string | null
  qualifications: string | null
  application_instructions: string | null
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

function ContentSection({
  title,
  content,
}: {
  title: string
  content: string | null
}) {
  if (!content) return null

  return (
    <section className="mt-10">
      <h2 className="text-xl font-semibold text-[#071B49]">
        {title}
      </h2>

      <div className="mt-4 whitespace-pre-wrap text-base leading-8 text-slate-700">
        {content}
      </div>
    </section>
  )
}

export default async function CareerDetailPage({
  params,
}: PageProps) {
  const { slug } = await params

  const supabase = createClient()

  const { data: career, error } = await supabase
    .from("careers")
    .select(`
      id,
      title,
      slug,
      department,
      location,
      employment_type,
      description,
      responsibilities,
      qualifications,
      application_instructions,
      closing_date,
      published
    `)
    .eq("slug", slug)
    .eq("published", true)
    .single()

  if (error || !career) {
    notFound()
  }

  const job = career as Career

  return (
    <main className="min-h-screen bg-[#F5F8FC] text-[#071B49]">

      <CuraHeader />

      <section className="bg-[#071B49]">
        <div className="mx-auto max-w-5xl px-6 py-20 lg:px-8">

          <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#35B5E5]">
            Career Opportunity
          </p>

          <h1 className="mt-5 text-4xl font-semibold tracking-tight text-white md:text-6xl">
            {job.title}
          </h1>

          <div className="mt-7 flex flex-wrap gap-x-6 gap-y-3 text-sm text-slate-300">

            {job.department && (
              <span>{job.department}</span>
            )}

            {job.location && (
              <span>📍 {job.location}</span>
            )}

            {job.employment_type && (
              <span>{job.employment_type}</span>
            )}

          </div>

        </div>
      </section>

      <section>
        <div className="mx-auto max-w-4xl px-6 py-16 lg:px-8">

          <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm md:p-12">

            {job.closing_date && (
              <div className="rounded-xl bg-[#FFF7E6] px-5 py-4 text-sm text-[#805A00]">
                <span className="font-semibold">
                  Application deadline:
                </span>{" "}
                {formatDate(job.closing_date)}
              </div>
            )}

            <ContentSection
              title="About the position"
              content={job.description}
            />

            <ContentSection
              title="Responsibilities"
              content={job.responsibilities}
            />

            <ContentSection
              title="Qualifications"
              content={job.qualifications}
            />

            <ContentSection
              title="How to apply"
              content={job.application_instructions}
            />

          </div>

        </div>
      </section>

      <CuraFooter />

    </main>
  )
}
