import { notFound } from "next/navigation"
import CuraHeader from "@/components/CuraHeader"
import CuraFooter from "@/components/CuraFooter"
import { createClient } from "@/lib/supabase/client"

type PageProps = {
  params: Promise<{
    slug: string
  }>
}

type LegalCase = {
  id: string
  slug: string
  title: string
  category: string | null
  description: string | null
  status: string | null
  outcome: string | null
  background: string | null
  decision: string | null
  legal_principle: string | null
  implications: string | null
  mira_url: string | null
  mira_case_number: string | null
  filed_date: string | null
  claim: string | null
  mira_status: string | null
  mira_remarks: string | null
  legal_matter_id: string | null
  is_primary: boolean
  published: boolean
}

type Proceeding = {
  id: string
  case_id: string
  court: string
  case_number: string | null
  filed_date: string | null
  judgment_date: string | null
  status: string | null
  outcome: string | null
  sort_order: number | null
  source_url: string | null
  source_title: string | null
  source_type: string | null
}

type CaseIssue = {
  id: string
  case_id: string
  issue: string
  sort_order: number | null
}

type TimelineEvent = {
  id: string
  case_id: string
  event_date: string | null
  year: string | null
  court: string | null
  description: string | null
  sort_order: number | null
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

  if (
    value.includes("tax appeal tribunal") ||
    value.includes("tribunal") ||
    value === "tat"
  ) {
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

function courtShortLabel(court: string | null) {
  const label = courtLabel(court)

  if (label === "Tax Appeal Tribunal") return "TAX APPEAL TRIBUNAL"
  if (label === "High Court") return "HIGH COURT"
  if (label === "Supreme Court") return "SUPREME COURT"

  return label.toUpperCase()
}

function courtColor(court: string | null) {
  const label = courtLabel(court)

  if (label === "Tax Appeal Tribunal") {
    return "bg-[#E8F6FC] text-[#168BC4]"
  }

  if (label === "High Court") {
    return "bg-[#EEF3FF] text-[#315FA6]"
  }

  if (label === "Supreme Court") {
    return "bg-[#F1F3F8] text-[#071B49]"
  }

  return "bg-slate-100 text-slate-600"
}

function proceedingDate(proceeding: Proceeding) {
  return (
    proceeding.filed_date ||
    proceeding.judgment_date ||
    null
  )
}

function compareProceedings(a: Proceeding, b: Proceeding) {
  const dateA = proceedingDate(a)
  const dateB = proceedingDate(b)

  if (dateA && dateB) {
    const comparison =
      new Date(dateA).getTime() -
      new Date(dateB).getTime()

    if (comparison !== 0) return comparison
  }

  if (dateA && !dateB) return -1
  if (!dateA && dateB) return 1

  const courtRank = (court: string) => {
    const label = courtLabel(court)

    if (label === "Tax Appeal Tribunal") return 1
    if (label === "High Court") return 2
    if (label === "Supreme Court") return 3

    return 4
  }

  const courtComparison =
    courtRank(a.court) - courtRank(b.court)

  if (courtComparison !== 0) {
    return courtComparison
  }

  return (a.case_number || "").localeCompare(
    b.case_number || "",
  )
}

function uniqueProceedings(proceedings: Proceeding[]) {
  const seen = new Set<string>()
  const result: Proceeding[] = []

  for (const proceeding of proceedings) {
    const key = `${courtLabel(
      proceeding.court,
    )}|${proceeding.case_number || proceeding.id}`

    if (seen.has(key)) continue

    seen.add(key)
    result.push(proceeding)
  }

  return result.sort(compareProceedings)
}

export default async function CasePage({
  params,
}: PageProps) {
  const { slug } = await params

  const supabase = createClient()

  /*
   * ============================================================
   * MAIN CASE
   * ============================================================
   */

  const {
    data: legalCase,
    error: caseError,
  } = await supabase
    .from("legal_cases")
    .select("*")
    .eq("slug", slug)
    .eq("published", true)
    .single()

  if (caseError || !legalCase) {
    notFound()
  }

  const typedCase = legalCase as LegalCase

  /*
   * ============================================================
   * CASE FAMILY
   *
   * A legal matter can contain several separate legal_cases
   * representing different court proceedings.
   *
   * Example:
   *
   * TAT
   *   ↓
   * High Court
   *   ↓
   * Supreme Court
   *
   * This allows all proceedings to appear together.
   * ============================================================
   */

  let familyCaseIds = [typedCase.id]

  if (typedCase.legal_matter_id) {
    const {
      data: familyCases,
    } = await supabase
      .from("legal_cases")
      .select("id")
      .eq(
        "legal_matter_id",
        typedCase.legal_matter_id,
      )

    if (familyCases && familyCases.length > 0) {
      familyCaseIds = familyCases.map(
        (item) => item.id,
      )
    }
  }

  /*
   * ============================================================
   * LOAD PROCEEDINGS / ISSUES / TIMELINE
   * ============================================================
   */

  const [
    proceedingsResult,
    issuesResult,
    timelineResult,
  ] = await Promise.all([
    supabase
      .from("case_proceedings")
      .select(`
        id,
        case_id,
        court,
        case_number,
        filed_date,
        judgment_date,
        status,
        outcome,
        sort_order,
        source_url,
        source_title,
        source_type
      `)
      .in("case_id", familyCaseIds),

    supabase
      .from("case_issues")
      .select(`
        id,
        case_id,
        issue,
        sort_order
      `)
      .eq("case_id", typedCase.id)
      .order("sort_order", {
        ascending: true,
      }),

    supabase
      .from("case_timeline")
      .select(`
        id,
        case_id,
        event_date,
        year,
        court,
        description,
        sort_order
      `)
      .eq("case_id", typedCase.id)
      .order("sort_order", {
        ascending: true,
      }),
  ])

  /*
   * ============================================================
   * PREPARE DATA
   * ============================================================
   */

  const allProceedings =
    (proceedingsResult.data || []) as Proceeding[]

  const proceedings =
    uniqueProceedings(allProceedings)

  const issues =
    (issuesResult.data || []) as CaseIssue[]

  const timeline =
    (timelineResult.data || []) as TimelineEvent[]

  /*
   * ============================================================
   * RENDER
   * ============================================================
   */

  return (
    <main className="min-h-screen bg-white text-[#071B49]">

      {/* ======================================================
          SHARED HEADER
      ====================================================== */}

      <CuraHeader />

      {/* ======================================================
          HERO
      ====================================================== */}

      <section className="relative overflow-hidden bg-[#061936]">

        <div className="absolute inset-0">

          <div className="absolute right-0 top-0 h-full w-1/2 bg-gradient-to-l from-[#0D4F85] via-[#0A315F] to-transparent opacity-80" />

          <div className="absolute -right-32 -top-32 h-[600px] w-[600px] rounded-full bg-[#168BC4] opacity-20 blur-3xl" />

          <div className="absolute bottom-0 right-1/4 h-64 w-64 rounded-full bg-[#0C73A8] opacity-20 blur-3xl" />

        </div>

        <div className="relative mx-auto max-w-7xl px-6 py-20 lg:px-8 lg:py-24">

          <div className="max-w-5xl">

            <div className="flex flex-wrap items-center gap-3">

              <span className="rounded-full bg-white px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-[#D71920]">
                Tax Legal Case
              </span>

              <span className="text-sm text-slate-300">
                Maldives
              </span>

            </div>

            <h1 className="mt-7 max-w-5xl text-4xl font-semibold leading-tight tracking-tight text-white md:text-5xl lg:text-6xl">
              {typedCase.title}
            </h1>

            {typedCase.description && (
              <p className="mt-6 max-w-3xl text-base leading-8 text-slate-300 md:text-lg">
                {typedCase.description}
              </p>
            )}

            {proceedings.length > 0 && (
              <div className="mt-8 flex flex-wrap items-center gap-3">

                <span className="text-sm font-medium text-slate-400">
                  {proceedings.length}{" "}
                  {proceedings.length === 1
                    ? "proceeding"
                    : "proceedings"}
                </span>

                <span className="text-slate-600">
                  •
                </span>

                {Array.from(
                  new Set(
                    proceedings.map((item) =>
                      courtShortLabel(item.court),
                    ),
                  ),
                ).map((court) => (
                  <span
                    key={court}
                    className="text-xs font-semibold uppercase tracking-[0.12em] text-[#62C4EA]"
                  >
                    {court}
                  </span>
                ))}

              </div>
            )}

          </div>

        </div>

      </section>

      {/* ======================================================
          PROCEEDING HISTORY
      ====================================================== */}

      {proceedings.length > 0 && (
        <section className="bg-[#F5F8FC]">

          <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">

            <div className="max-w-3xl">

              <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#D71920]">
                Case History
              </p>

              <h2 className="mt-4 text-3xl font-semibold tracking-tight md:text-4xl">
                All Proceedings
              </h2>

              <p className="mt-4 text-base leading-7 text-slate-600">
                The proceedings below are presented in
                chronological order to show how the matter
                progressed through the Maldivian tax dispute
                resolution and court system.
              </p>

            </div>

            <div className="relative mt-10">

              {/* Vertical timeline line */}

              <div className="absolute left-[18px] top-5 hidden h-[calc(100%-40px)] w-px bg-slate-300 md:block" />

              <div className="space-y-5">

                {proceedings.map(
                  (proceeding, index) => {

                    const date =
                      proceedingDate(proceeding)

                    return (
                      <article
                        key={proceeding.id}
                        className="relative rounded-xl border border-slate-200 bg-white p-5 shadow-sm md:ml-0 md:p-6"
                      >

                        <div className="flex flex-col gap-5 md:flex-row md:items-start">

                          {/* NUMBER */}

                          <div className="hidden md:flex md:w-10 md:flex-shrink-0 md:justify-center">

                            <div className="relative z-10 flex h-9 w-9 items-center justify-center rounded-full bg-[#071B49] text-xs font-bold text-white">
                              {index + 1}
                            </div>

                          </div>

                          {/* CONTENT */}

                          <div className="min-w-0 flex-1">

                            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">

                              <div>

                                <span
                                  className={`inline-flex rounded-full px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.14em] ${courtColor(
                                    proceeding.court,
                                  )}`}
                                >
                                  {courtShortLabel(
                                    proceeding.court,
                                  )}
                                </span>

                                {proceeding.case_number && (
                                  <h3 className="mt-3 text-lg font-semibold text-[#071B49] md:text-xl">
                                    {proceeding.case_number}
                                  </h3>
                                )}

                              </div>

                              {date && (
                                <div className="text-left sm:text-right">

                                  <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-slate-400">
                                    {proceeding.judgment_date
                                      ? "Judgment"
                                      : "Filed"}
                                  </p>

                                  <p className="mt-1 text-sm font-medium text-slate-700">
                                    {formatDate(date)}
                                  </p>

                                </div>
                              )}

                            </div>

                            <div className="mt-5 grid gap-4 border-t border-slate-100 pt-5 md:grid-cols-2">

                              {proceeding.status && (
                                <div>

                                  <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-slate-400">
                                    Status
                                  </p>

                                  <p className="mt-1 text-sm leading-6 text-slate-600">
                                    {proceeding.status}
                                  </p>

                                </div>
                              )}

                              {proceeding.outcome && (
                                <div>

                                  <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-slate-400">
                                    Outcome
                                  </p>

                                  <p className="mt-1 text-sm leading-6 text-slate-600">
                                    {proceeding.outcome}
                                  </p>

                                </div>
                              )}

                            </div>

                            <div className="mt-5 flex flex-wrap items-center gap-4">

                              {proceeding.source_url && (
                                <a
                                  href={proceeding.source_url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center rounded-md bg-[#071B49] px-4 py-2.5 text-xs font-semibold text-white transition hover:bg-[#0B2A69]"
                                >
                                  View Original Document →
                                </a>
                              )}

                              {proceeding.source_url &&
                                proceeding.source_type && (
                                  <span className="text-xs text-slate-400">
                                    {proceeding.source_type}
                                  </span>
                                )}

                            </div>

                          </div>

                        </div>

                      </article>
                    )
                  },
                )}

              </div>

            </div>

          </div>

        </section>
      )}

      {/* ======================================================
          CURA CASE ANALYSIS
      ====================================================== */}

      <section className="bg-white">

        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8">

          <div className="max-w-4xl">

            <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#D71920]">
              CURA Case Analysis
            </p>

            <h2 className="mt-4 text-3xl font-semibold tracking-tight md:text-4xl">
              Case Summary
            </h2>

            <p className="mt-4 text-base leading-7 text-slate-600">
              A structured presentation of the case background,
              decision, legal considerations and practical
              implications.
            </p>

          </div>

          {(typedCase.background ||
            typedCase.decision ||
            typedCase.legal_principle ||
            typedCase.implications) && (

            <div className="mt-10 grid gap-6 md:grid-cols-2">

              {/* BACKGROUND */}

              {typedCase.background && (
                <div className="rounded-xl border border-slate-200 bg-[#F5F8FC] p-8">

                  <div className="border-l-4 border-[#D71920] pl-6">

                    <h3 className="text-xl font-semibold">
                      Background
                    </h3>

                    <p className="mt-5 text-base leading-8 text-slate-600">
                      {typedCase.background}
                    </p>

                  </div>

                </div>
              )}

              {/* DECISION */}

              {typedCase.decision && (
                <div className="rounded-xl border border-slate-200 bg-[#F5F8FC] p-8">

                  <div className="border-l-4 border-[#D71920] pl-6">

                    <h3 className="text-xl font-semibold">
                      Decision
                    </h3>

                    <p className="mt-5 text-base leading-8 text-slate-600">
                      {typedCase.decision}
                    </p>

                  </div>

                </div>
              )}

              {/* LEGAL PRINCIPLE */}

              {typedCase.legal_principle && (
                <div className="rounded-xl border border-slate-200 bg-[#F5F8FC] p-8">

                  <div className="border-l-4 border-[#168BC4] pl-6">

                    <h3 className="text-xl font-semibold">
                      Legal Principle
                    </h3>

                    <p className="mt-5 text-base leading-8 text-slate-600">
                      {typedCase.legal_principle}
                    </p>

                  </div>

                </div>
              )}

              {/* PRACTICAL IMPLICATIONS */}

              {typedCase.implications && (
                <div className="rounded-xl border border-slate-200 bg-[#F5F8FC] p-8">

                  <div className="border-l-4 border-[#071B49] pl-6">

                    <h3 className="text-xl font-semibold">
                      Practical Implications
                    </h3>

                    <p className="mt-5 text-base leading-8 text-slate-600">
                      {typedCase.implications}
                    </p>

                  </div>

                </div>
              )}

            </div>
          )}

        </div>

      </section>

      {/* ======================================================
          KEY ISSUES
      ====================================================== */}

      {issues.length > 0 && (
        <section className="bg-[#F5F8FC]">

          <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8">

            <div className="max-w-4xl">

              <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#D71920]">
                Legal Analysis
              </p>

              <h2 className="mt-4 text-3xl font-semibold tracking-tight md:text-4xl">
                Case Issues
              </h2>

              <p className="mt-4 text-base leading-7 text-slate-600">
                The principal legal and tax issues arising from
                the case.
              </p>

            </div>

            <div className="mt-10 space-y-4">

              {issues.map((item, index) => (

                <div
                  key={item.id}
                  className="rounded-xl border border-slate-200 bg-white p-6"
                >

                  <div className="flex gap-5">

                    <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-[#E8F6FC] text-xs font-bold text-[#168BC4]">
                      {String(index + 1).padStart(2, "0")}
                    </div>

                    <div>

                      <h3 className="text-lg font-semibold leading-7 text-[#071B49]">
                        {item.issue}
                      </h3>

                    </div>

                  </div>

                </div>

              ))}

            </div>

          </div>

        </section>
      )}

      {/* ======================================================
          CASE TIMELINE
      ====================================================== */}

      {timeline.length > 0 && (
        <section className="bg-white">

          <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8">

            <div className="max-w-4xl">

              <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#168BC4]">
                Case Development
              </p>

              <h2 className="mt-4 text-3xl font-semibold tracking-tight md:text-4xl">
                Case Timeline
              </h2>

            </div>

            <div className="mt-10 max-w-4xl">

              <div className="space-y-7">

                {timeline.map(
                  (event, index) => (

                    <div
                      key={event.id}
                      className="flex gap-5"
                    >

                      <div className="flex flex-col items-center">

                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#071B49] text-[10px] font-bold text-white">
                          {index + 1}
                        </div>

                        {index !==
                          timeline.length - 1 && (
                          <div className="mt-2 h-full min-h-10 w-px bg-slate-200" />
                        )}

                      </div>

                      <div className="pb-4">

                        {event.event_date && (
                          <p className="text-xs font-bold uppercase tracking-[0.15em] text-[#168BC4]">
                            {formatDate(
                              event.event_date,
                            )}
                          </p>
                        )}

                        {!event.event_date &&
                          event.year && (
                            <p className="text-xs font-bold uppercase tracking-[0.15em] text-[#168BC4]">
                              {event.year}
                            </p>
                          )}

                        {event.court && (
                          <h3 className="mt-2 text-lg font-semibold">
                            {event.court}
                          </h3>
                        )}

                        {event.description && (
                          <p className="mt-2 text-sm leading-7 text-slate-600">
                            {event.description}
                          </p>
                        )}

                      </div>

                    </div>

                  ),
                )}

              </div>

            </div>

          </div>

        </section>
      )}

      {/* ======================================================
          OFFICIAL SOURCE
      ====================================================== */}

      {proceedings.some(
        (item) => !!item.source_url,
      ) && (
        <section className="bg-[#F5F8FC]">

          <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8">

            <div className="rounded-2xl border border-slate-200 bg-white p-8 md:p-10">

              <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#D71920]">
                Official Sources
              </p>

              <h2 className="mt-4 text-2xl font-semibold md:text-3xl">
                MIRA Legal Case Documents
              </h2>

              <p className="mt-4 max-w-3xl text-base leading-7 text-slate-600">
                Original documents and official case records are
                linked to the relevant proceedings above where a
                verified source is available.
              </p>

              <div className="mt-7 flex flex-wrap gap-3">

                {proceedings
                  .filter(
                    (item) => !!item.source_url,
                  )
                  .map((item) => (

                    <a
                      key={`source-${item.id}`}
                      href={item.source_url!}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-md border border-[#071B49] px-4 py-2.5 text-xs font-semibold text-[#071B49] transition hover:bg-[#071B49] hover:text-white"
                    >
                      {item.case_number ||
                        "View source"}{" "}
                      →
                    </a>

                  ))}

              </div>

            </div>

          </div>

        </section>
      )}

      {/* ======================================================
          FOOTER
      ====================================================== */}

      <CuraFooter />

    </main>
  )
}