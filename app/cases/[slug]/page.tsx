import { notFound } from "next/navigation"
import { createClient } from "@/lib/supabase/client"

type PageProps = {
  params: Promise<{
    slug: string
  }>
}

function formatDate(date: string | null) {
  if (!date) return null

  return new Date(date).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  })
}

function courtLabel(court: string | null) {
  if (!court) return "Legal Proceeding"

  const value = court.toLowerCase()

  if (value.includes("tribunal") || value.includes("tat")) {
    return "Tax Appeal Tribunal"
  }

  if (value.includes("high court")) {
    return "High Court"
  }

  if (value.includes("supreme court")) {
    return "Supreme Court"
  }

  return court
}

function courtOrder(court: string | null) {
  const value = court?.toLowerCase() || ""

  if (value.includes("tribunal") || value.includes("tat")) return 1
  if (value.includes("high court")) return 2
  if (value.includes("supreme court")) return 3

  return 4
}

export default async function CasePage({ params }: PageProps) {
  const { slug } = await params

  const supabase = createClient()

  /*
   * ---------------------------------------------------------
   * MAIN CASE
   * ---------------------------------------------------------
   */

  const { data: legalCase, error: caseError } = await supabase
    .from("legal_cases")
    .select("*")
    .eq("slug", slug)
    .eq("published", true)
    .single()

  if (caseError || !legalCase) {
    notFound()
  }

  /*
   * ---------------------------------------------------------
   * CASE FAMILY
   *
   * If the case belongs to a legal matter, retrieve all
   * proceedings belonging to that matter.
   *
   * This is what allows Bunny Holdings to show:
   *
   * TAT
   * Supreme Court
   * High Court
   * Supreme Court
   *
   * as separate proceedings under one case.
   * ---------------------------------------------------------
   */

  let proceedingsQuery = supabase
    .from("case_proceedings")
    .select("*")

  if (legalCase.legal_matter_id) {
    proceedingsQuery = proceedingsQuery
      .eq("legal_matter_id", legalCase.legal_matter_id)
  } else {
    proceedingsQuery = proceedingsQuery
      .eq("case_id", legalCase.id)
  }

  const [
    proceedingsResult,
    timelineResult,
    issuesResult,
    sourcesResult,
  ] = await Promise.all([
    proceedingsQuery.order("sort_order", {
      ascending: true,
    }),

    supabase
      .from("case_timeline")
      .select("*")
      .eq("case_id", legalCase.id)
      .order("sort_order", {
        ascending: true,
      }),

    supabase
      .from("case_issues")
      .select("*")
      .eq("case_id", legalCase.id)
      .order("sort_order", {
        ascending: true,
      }),

    supabase
      .from("case_sources")
      .select("*")
      .eq("case_id", legalCase.id)
      .order("sort_order", {
        ascending: true,
      }),
  ])

  const proceedings = (proceedingsResult.data || []).sort(
    (a, b) =>
      courtOrder(a.court) - courtOrder(b.court) ||
      (a.sort_order ?? 0) - (b.sort_order ?? 0)
  )

  const timeline = timelineResult.data || []
  const issues = issuesResult.data || []
  const sources = sourcesResult.data || []

  /*
   * ---------------------------------------------------------
   * DEBUGGING
   * ---------------------------------------------------------
   */

  console.log("CASE:", legalCase.title)
  console.log("LEGAL MATTER ID:", legalCase.legal_matter_id)
  console.log("PROCEEDINGS:", proceedings.length)
  console.log("ISSUES:", issues.length)
  console.log("TIMELINE:", timeline.length)

  return (
    <main className="min-h-screen bg-[#F5F8FC] text-[#071B49]">

      {/* =====================================================
          HEADER
      ===================================================== */}

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
              className="border-b-2 border-[#D71920] pb-1 text-[#071B49]"
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
              className="rounded-md bg-[#071B49] px-5 py-2.5 text-white"
            >
              Contact
            </a>

          </nav>

        </div>
      </header>


      {/* =====================================================
          HERO
      ===================================================== */}

      <section className="bg-[#071B49]">

        <div className="mx-auto max-w-5xl px-6 py-20 lg:px-8">

          <div className="flex flex-wrap items-center gap-3">

            <span className="rounded-full bg-red-50 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-[#D71920]">
              Tax Legal Case
            </span>

            <span className="text-sm text-slate-400">
              Maldives
            </span>

          </div>

          <h1 className="mt-6 text-4xl font-semibold tracking-tight text-white md:text-5xl">
            {legalCase.title}
          </h1>

          {legalCase.description && (
            <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">
              {legalCase.description}
            </p>
          )}

        </div>

      </section>


      {/* =====================================================
          PROCEEDINGS
      ===================================================== */}

      {proceedings.length > 0 && (

        <section className="bg-[#F5F8FC]">

          <div className="mx-auto max-w-5xl px-6 py-12 lg:px-8">

            <div className="grid gap-6 md:grid-cols-2">

              {proceedings.map((proceeding) => (

                <div
                  key={proceeding.id}
                  className="rounded-xl border border-slate-200 bg-white p-7"
                >

                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#168BC4]">
                    {courtLabel(proceeding.court)}
                  </p>

                  {proceeding.case_number && (
                    <h2 className="mt-3 text-xl font-semibold">
                      {proceeding.case_number}
                    </h2>
                  )}

                  {proceeding.filed_date && (
                    <p className="mt-4 text-sm text-slate-600">
                      <strong>Filed:</strong>{" "}
                      {formatDate(proceeding.filed_date)}
                    </p>
                  )}

                  {proceeding.judgment_date && (
                    <p className="mt-2 text-sm text-slate-600">
                      <strong>Judgment:</strong>{" "}
                      {formatDate(proceeding.judgment_date)}
                    </p>
                  )}

                  {proceeding.status && (
                    <p className="mt-2 text-sm text-slate-600">
                      <strong>Status:</strong>{" "}
                      {proceeding.status}
                    </p>
                  )}

                  {proceeding.outcome && (
                    <p className="mt-2 text-sm text-slate-600">
                      <strong>Outcome:</strong>{" "}
                      {proceeding.outcome}
                    </p>
                  )}

                </div>

              ))}

            </div>

          </div>

        </section>

      )}


      {/* =====================================================
          CURA CASE ANALYSIS
      ===================================================== */}

      <section className="border-y border-slate-200 bg-white">

        <div className="mx-auto max-w-5xl px-6 py-16 lg:px-8">

          <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#D71920]">
            CURA Case Analysis
          </p>

          <h2 className="mt-4 text-3xl font-semibold tracking-tight">
            Case Summary
          </h2>


          {/* DECISION */}

          {legalCase.decision && (

            <div className="mt-8">

              <h3 className="text-xl font-semibold">
                Decision
              </h3>

              <p className="mt-4 leading-8 text-slate-600">
                {legalCase.decision}
              </p>

            </div>

          )}


          {/* LEGAL PRINCIPLE */}

          {legalCase.legal_principle && (

            <div className="mt-10">

              <h3 className="text-xl font-semibold">
                Legal Principle
              </h3>

              <p className="mt-4 leading-8 text-slate-600">
                {legalCase.legal_principle}
              </p>

            </div>

          )}


          {/* IMPLICATIONS */}

          {legalCase.implications && (

            <div className="mt-10">

              <h3 className="text-xl font-semibold">
                Practical Implications
              </h3>

              <p className="mt-4 leading-8 text-slate-600">
                {legalCase.implications}
              </p>

            </div>

          )}

        </div>

      </section>


      {/* =====================================================
          KEY ISSUES
      ===================================================== */}

      {issues.length > 0 && (

        <section className="bg-white">

          <div className="mx-auto max-w-5xl px-6 py-16 lg:px-8">

            <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#D71920]">
              Legal Issues
            </p>

            <h2 className="mt-4 text-3xl font-semibold tracking-tight">
              Key Issues
            </h2>

            <div className="mt-8 grid gap-5 md:grid-cols-3">

              {issues.map((item, index) => (

                <div
                  key={item.id}
                  className="rounded-xl border border-slate-200 bg-[#F5F8FC] p-6"
                >

                  <p className="text-xs font-bold text-[#168BC4]">
                    {String(index + 1).padStart(2, "0")}
                  </p>

                  <h3 className="mt-4 text-lg font-semibold">
                    {item.issue}
                  </h3>

                </div>

              ))}

            </div>

          </div>

        </section>

      )}


      {/* =====================================================
          CASE TIMELINE
      ===================================================== */}

      {timeline.length > 0 && (

        <section className="bg-[#F5F8FC]">

          <div className="mx-auto max-w-5xl px-6 py-16 lg:px-8">

            <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#168BC4]">
              Proceedings
            </p>

            <h2 className="mt-4 text-3xl font-semibold tracking-tight">
              Case Timeline
            </h2>

            <div className="mt-10 space-y-6">

              {timeline.map((event, index) => (

                <div
                  key={event.id}
                  className="flex gap-6"
                >

                  <div className="w-28 flex-shrink-0 text-sm font-semibold">
                    {event.year}
                  </div>

                  <div
                    className={`border-l border-slate-300 pl-6 ${
                      index !== timeline.length - 1
                        ? "pb-6"
                        : ""
                    }`}
                  >

                    {event.court && (
                      <h3 className="font-semibold">
                        {event.court}
                      </h3>
                    )}

                    {event.description && (
                      <p className="mt-2 text-sm leading-6 text-slate-600">
                        {event.description}
                      </p>
                    )}

                  </div>

                </div>

              ))}

            </div>

          </div>

        </section>

      )}


      {/* =====================================================
          SOURCES
      ===================================================== */}

      {sources.length > 0 && (

        <section className="border-t border-slate-200 bg-white">

          <div className="mx-auto max-w-5xl px-6 py-16 lg:px-8">

            <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#D71920]">
              Sources
            </p>

            <h2 className="mt-4 text-3xl font-semibold tracking-tight">
              Case Sources
            </h2>

            <div className="mt-8 space-y-4">

              {sources.map((source) => (

                <div
                  key={source.id}
                  className="rounded-lg border border-slate-200 bg-[#F5F8FC] p-5"
                >

                  {source.url ? (

                    <a
                      href={source.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-semibold text-[#168BC4] hover:underline"
                    >
                      {source.title ||
                        source.name ||
                        source.url}
                    </a>

                  ) : (

                    <p className="font-semibold">
                      {source.title ||
                        source.name ||
                        "Case source"}

                    </p>

                  )}

                  {source.description && (
                    <p className="mt-2 text-sm leading-6 text-slate-600">
                      {source.description}
                    </p>
                  )}

                </div>

              ))}

            </div>

          </div>

        </section>

      )}


      {/* =====================================================
          FOOTER
      ===================================================== */}

      <footer className="bg-[#071B49] text-white">

        <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">

          <div className="grid gap-10 md:grid-cols-3">

            <div>

              <img
                src="/cura-logo.png"
                alt="CURA"
                className="h-20 w-auto object-contain"
              />

              <p className="mt-4 text-sm text-slate-300">
                Audit · Tax · Advisory
              </p>

            </div>

            <div>

              <h3 className="font-semibold">
                Knowledge
              </h3>

              <a
                href="/articles"
                className="mt-4 block text-sm text-slate-300 hover:text-white"
              >
                Tax Articles
              </a>

              <a
                href="/cases"
                className="mt-2 block text-sm text-slate-300 hover:text-white"
              >
                Legal Cases
              </a>

            </div>

            <div>

              <h3 className="font-semibold">
                CURA
              </h3>

              <a
                href="/#about"
                className="mt-4 block text-sm text-slate-300 hover:text-white"
              >
                About CURA
              </a>

              <a
                href="/#contact"
                className="mt-2 block text-sm text-slate-300 hover:text-white"
              >
                Contact
              </a>

            </div>

          </div>

          <div className="mt-10 border-t border-slate-700 pt-6 text-sm text-slate-400">
            Maldives Professional Knowledge Platform
          </div>

        </div>

      </footer>

    </main>
  )
}