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

type CaseSource = {
  id: string
  case_id: string
  title: string
  url: string | null
  source_type: string | null
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

  const value = court.trim().toLowerCase()

  if (
    value.includes("tax appeal tribunal") ||
    value === "tat" ||
    value.includes("appeal tribunal")
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

function courtTag(court: string | null) {
  const label = courtLabel(court)

  if (label === "Tax Appeal Tribunal") {
    return "TAT"
  }

  if (label === "High Court") {
    return "HIGH COURT"
  }

  if (label === "Supreme Court") {
    return "SUPREME COURT"
  }

  return label.toUpperCase()
}

function courtTagClass(court: string | null) {
  const label = courtLabel(court)

  if (label === "Tax Appeal Tribunal") {
    return "bg-[#EAF7FC] text-[#168BC4]"
  }

  if (label === "High Court") {
    return "bg-[#EEF3FF] text-[#315FA6]"
  }

  if (label === "Supreme Court") {
    return "bg-[#F1F3F8] text-[#071B49]"
  }

  return "bg-slate-100 text-slate-600"
}

function getProceedingDate(proceeding: Proceeding) {
  return (
    proceeding.judgment_date ||
    proceeding.filed_date ||
    null
  )
}

function compareProceedings(
  a: Proceeding,
  b: Proceeding,
) {
  const dateA = getProceedingDate(a)
  const dateB = getProceedingDate(b)

  if (dateA && dateB) {
    const comparison =
      new Date(dateA).getTime() -
      new Date(dateB).getTime()

    if (comparison !== 0) {
      return comparison
    }
  }

  if (dateA && !dateB) return -1
  if (!dateA && dateB) return 1

  return (a.sort_order ?? 999) -
    (b.sort_order ?? 999)
}

function uniqueProceedings(
  proceedings: Proceeding[],
) {
  const seen = new Set<string>()
  const result: Proceeding[] = []

  for (const proceeding of proceedings) {
    const key = `${courtLabel(
      proceeding.court,
    )}|${proceeding.case_number || proceeding.id}`

    if (seen.has(key)) {
      continue
    }

    seen.add(key)
    result.push(proceeding)
  }

  return result.sort(compareProceedings)
}

function createDerivedTimeline(
  proceedings: Proceeding[],
): TimelineEvent[] {
  const events: TimelineEvent[] = []

  proceedings.forEach((proceeding) => {
    if (proceeding.filed_date) {
      events.push({
        id: `${proceeding.id}-filed`,
        case_id: proceeding.case_id,
        event_date: proceeding.filed_date,
        year: new Date(
          proceeding.filed_date,
        ).getFullYear().toString(),
        court: proceeding.court,
        description: proceeding.case_number
          ? `Proceeding filed as ${proceeding.case_number}.`
          : "Proceeding filed.",
        sort_order: 0,
      })
    }

    if (proceeding.judgment_date) {
      events.push({
        id: `${proceeding.id}-judgment`,
        case_id: proceeding.case_id,
        event_date: proceeding.judgment_date,
        year: new Date(
          proceeding.judgment_date,
        ).getFullYear().toString(),
        court: proceeding.court,
        description:
          proceeding.outcome ||
          proceeding.status ||
          "Judgment passed.",
        sort_order: 1,
      })
    }
  })

  return events.sort((a, b) => {
    if (!a.event_date && !b.event_date) {
      return 0
    }

    if (!a.event_date) return 1
    if (!b.event_date) return -1

    return (
      new Date(a.event_date).getTime() -
      new Date(b.event_date).getTime()
    )
  })
}

function mergeTimeline(
  explicitTimeline: TimelineEvent[],
  proceedings: Proceeding[],
) {
  if (explicitTimeline.length > 0) {
    return explicitTimeline
      .filter((item) => item.event_date)
      .sort((a, b) => {
        return (
          new Date(a.event_date!).getTime() -
          new Date(b.event_date!).getTime()
        )
      })
  }

  return createDerivedTimeline(proceedings)
}

function uniqueSources(
  sources: CaseSource[],
  proceedings: Proceeding[],
  miraUrl: string | null,
) {
  const result: CaseSource[] = []
  const seen = new Set<string>()

  /*
   * Legacy MIRA case records:
   *
   * Older CURA cases store their official MIRA URL directly
   * on legal_cases.mira_url rather than in case_sources.
   *
   * Include it here so existing cases continue to display
   * their official MIRA record without requiring a database
   * migration.
   */
  if (miraUrl?.trim()) {
    const url = miraUrl.trim()

    seen.add(url)

    result.push({
      id: "legacy-mira-record",
      case_id: "",
      title: "MIRA Official Case Record",
      url,
      source_type: "Official MIRA Case Record",
      sort_order: 0,
    })
  }

  /*
   * Explicit sources stored in case_sources.
   */
  for (const source of sources) {
    if (!source.url) continue

    if (seen.has(source.url)) continue

    seen.add(source.url)
    result.push({
      ...source,
      sort_order: result.length + 1,
    })
  }

  /*
   * Sources attached directly to proceedings.
   */
  for (const proceeding of proceedings) {
    if (!proceeding.source_url) continue

    if (seen.has(proceeding.source_url)) continue

    seen.add(proceeding.source_url)

    result.push({
      id: `proceeding-${proceeding.id}`,
      case_id: proceeding.case_id,
      title:
        proceeding.source_title ||
        `${courtLabel(proceeding.court)} — ${
          proceeding.case_number || "Case document"
        }`,
      url: proceeding.source_url,
      source_type:
        proceeding.source_type ||
        "Official source",
      sort_order: result.length + 1,
    })
  }

  return result
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
   * All proceedings belonging to the same legal matter
   * are treated as one connected case history.
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

    if (familyCases?.length) {
      familyCaseIds = familyCases.map(
        (item) => item.id,
      )
    }
  }

  /*
   * ============================================================
   * LOAD EVERYTHING
   * ============================================================
   */

  const [
    proceedingsResult,
    issuesResult,
    timelineResult,
    sourcesResult,
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

    /*
     * IMPORTANT:
     * Load timeline records from the whole legal matter,
     * not just the current legal_cases row.
     */
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
      .in("case_id", familyCaseIds)
      .order("event_date", {
        ascending: true,
      }),

    supabase
      .from("case_sources")
      .select(`
        id,
        case_id,
        title,
        url,
        source_type,
        sort_order
      `)
      .in("case_id", familyCaseIds)
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

  const explicitTimeline =
    (timelineResult.data || []) as TimelineEvent[]

  const timeline = mergeTimeline(
    explicitTimeline,
    proceedings,
  )

  const databaseSources =
    (sourcesResult.data || []) as CaseSource[]

  const sources = uniqueSources(
    databaseSources,
    proceedings,
    typedCase.mira_url,
  )

  /*
   * Compact court-stage tags.
   *
   * These are deliberately small and displayed
   * in a 2-column grid.
   */

  const stageTags = Array.from(
    new Map(
      proceedings.map((item) => [
        courtLabel(item.court),
        item.court,
      ]),
    ).keys(),
  )

  /*
   * ============================================================
   * PAGE
   * ============================================================
   */

  return (
    <main className="min-h-screen bg-white text-[#071B49]">

      <CuraHeader />

      {/* ======================================================
          HERO
      ====================================================== */}

      <section className="relative overflow-hidden bg-[#061936]">

        <div className="absolute inset-0">

          <div className="absolute right-0 top-0 h-full w-1/2 bg-gradient-to-l from-[#0D4F85] via-[#0A315F] to-transparent opacity-80" />

          <div className="absolute -right-32 -top-32 h-[600px] w-[600px] rounded-full bg-[#168BC4] opacity-20 blur-3xl" />

        </div>

        <div className="relative mx-auto max-w-7xl px-6 py-20 lg:px-8 lg:py-24">

          <div className="max-w-5xl">

            <div className="flex flex-wrap items-center gap-2">

              <span className="rounded-full bg-white/10 px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.18em] text-[#62C4EA]">
                TAX LEGAL CASE
              </span>

              <span className="text-xs text-slate-400">
                Maldives
              </span>

            </div>

            <h1 className="mt-6 max-w-5xl text-4xl font-semibold leading-tight tracking-tight text-white md:text-5xl lg:text-6xl">
              {typedCase.title}
            </h1>

            {typedCase.description && (
              <p className="mt-6 max-w-3xl text-base leading-8 text-slate-300">
                {typedCase.description}
              </p>
            )}

            {/* SMALL 2-COLUMN TAG GRID */}

            {stageTags.length > 0 && (
              <div className="mt-8 grid max-w-md grid-cols-2 gap-2">

                {stageTags.slice(0, 4).map(
                  (stage) => (
                    <span
                      key={stage}
                      className="rounded-md border border-white/10 bg-white/5 px-3 py-2 text-[9px] font-semibold uppercase tracking-[0.14em] text-slate-300"
                    >
                      {stage}
                    </span>
                  ),
                )}

              </div>
            )}

          </div>

        </div>

      </section>

      {/* ======================================================
          CASE HISTORY
      ====================================================== */}

      <section className="bg-[#F5F8FC]">

        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">

          <div className="max-w-3xl">

            <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-[#D71920]">
              CASE HISTORY
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

          {proceedings.length > 0 ? (
            <div className="relative mt-10">

              {/* Timeline connector */}

              <div className="absolute left-[18px] top-5 hidden h-[calc(100%-40px)] w-px bg-slate-300 md:block" />

              <div className="space-y-5">

                {proceedings.map(
                  (proceeding, index) => {

                    const filedDate =
                      proceeding.filed_date

                    const judgmentDate =
                      proceeding.judgment_date

                    return (
                      <article
                        key={proceeding.id}
                        className="relative rounded-xl border border-slate-200 bg-white p-5 shadow-sm md:p-6"
                      >

                        <div className="flex gap-5">

                          {/* NUMBER */}

                          <div className="hidden flex-shrink-0 md:block">

                            <div className="relative z-10 flex h-9 w-9 items-center justify-center rounded-full bg-[#071B49] text-xs font-bold text-white">
                              {index + 1}
                            </div>

                          </div>

                          {/* CONTENT */}

                          <div className="min-w-0 flex-1">

                            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">

                              <div>

                                {/* SMALL COURT TAG */}

                                <span
                                  className={`inline-flex rounded px-2 py-1 text-[8px] font-bold uppercase tracking-[0.14em] ${courtTagClass(
                                    proceeding.court,
                                  )}`}
                                >
                                  {courtTag(
                                    proceeding.court,
                                  )}
                                </span>

                                <h3 className="mt-3 text-lg font-semibold text-[#071B49] md:text-xl">
                                  {proceeding.case_number ||
                                    "Case number unavailable"}
                                </h3>

                              </div>

                              {/* DATES */}

                              <div className="flex flex-wrap gap-6 sm:justify-end">

                                {filedDate && (
                                  <div className="sm:text-right">

                                    <p className="text-[9px] font-bold uppercase tracking-[0.15em] text-slate-400">
                                      Filed
                                    </p>

                                    <p className="mt-1 text-sm text-slate-700">
                                      {formatDate(
                                        filedDate,
                                      )}
                                    </p>

                                  </div>
                                )}

                                {judgmentDate && (
                                  <div className="sm:text-right">

                                    <p className="text-[9px] font-bold uppercase tracking-[0.15em] text-slate-400">
                                      Judgment
                                    </p>

                                    <p className="mt-1 text-sm text-slate-700">
                                      {formatDate(
                                        judgmentDate,
                                      )}
                                    </p>

                                  </div>
                                )}

                              </div>

                            </div>

                            <div className="mt-5 grid gap-5 border-t border-slate-100 pt-5 md:grid-cols-2">

                              {proceeding.status && (
                                <div>

                                  <p className="text-[9px] font-bold uppercase tracking-[0.15em] text-slate-400">
                                    Status
                                  </p>

                                  <p className="mt-1 text-sm leading-6 text-slate-600">
                                    {proceeding.status}
                                  </p>

                                </div>
                              )}

                              {proceeding.outcome && (
                                <div>

                                  <p className="text-[9px] font-bold uppercase tracking-[0.15em] text-slate-400">
                                    Outcome
                                  </p>

                                  <p className="mt-1 text-sm leading-6 text-slate-600">
                                    {proceeding.outcome}
                                  </p>

                                </div>
                              )}

                            </div>

                            {/* ORIGINAL SOURCE */}

                            {proceeding.source_url && (
                              <div className="mt-5">

                                <a
                                  href={
                                    proceeding.source_url
                                  }
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-2 rounded-md border border-[#071B49] px-3 py-2 text-[10px] font-semibold text-[#071B49] transition hover:bg-[#071B49] hover:text-white"
                                >
                                  View original source
                                  <span>
                                    ↗
                                  </span>
                                </a>

                              </div>
                            )}

                          </div>

                        </div>

                      </article>
                    )
                  },
                )}

              </div>

            </div>
          ) : (
            <div className="mt-10 rounded-xl border border-dashed border-slate-300 bg-white p-10 text-center">

              <p className="text-sm text-slate-500">
                No proceeding information is currently
                available for this case.
              </p>

            </div>
          )}

        </div>

      </section>

      {/* ======================================================
          CASE TIMELINE
      ====================================================== */}

      <section className="bg-white">

        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8">

          <div className="max-w-3xl">

            <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-[#168BC4]">
              CASE DEVELOPMENT
            </p>

            <h2 className="mt-4 text-3xl font-semibold tracking-tight md:text-4xl">
              Case Timeline
            </h2>

            <p className="mt-4 text-base leading-7 text-slate-600">
              A chronological view of the major procedural
              developments in the matter.
            </p>

          </div>

          {timeline.length > 0 ? (
            <div className="mt-12 max-w-4xl">

              <div className="relative">

                {/* Main timeline line */}

                <div className="absolute left-[15px] top-2 h-[calc(100%-16px)] w-px bg-slate-200" />

                <div className="space-y-10">

                  {timeline.map(
                    (event, index) => (

                      <div
                        key={event.id}
                        className="relative flex gap-6"
                      >

                        {/* DOT */}

                        <div className="relative z-10 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border-4 border-white bg-[#071B49] shadow-sm">

                          <span className="sr-only">
                            Timeline event{" "}
                            {index + 1}
                          </span>

                        </div>

                        {/* EVENT */}

                        <div className="flex-1 pb-1">

                          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">

                            <div>

                              {event.court && (
                                <span
                                  className={`inline-flex rounded px-2 py-1 text-[8px] font-bold uppercase tracking-[0.14em] ${courtTagClass(
                                    event.court,
                                  )}`}
                                >
                                  {courtTag(
                                    event.court,
                                  )}
                                </span>
                              )}

                            </div>

                            {event.event_date && (
                              <p className="text-xs font-semibold text-slate-400 sm:text-right">
                                {formatDate(
                                  event.event_date,
                                )}
                              </p>
                            )}

                          </div>

                          <p className="mt-3 text-sm leading-7 text-slate-700 md:text-base">
                            {event.description}
                          </p>

                        </div>

                      </div>

                    ),
                  )}

                </div>

              </div>

            </div>
          ) : (
            <div className="mt-10 rounded-xl border border-dashed border-slate-300 bg-[#F5F8FC] p-8">

              <p className="text-sm leading-6 text-slate-500">
                Timeline information will be added as the
                underlying proceedings are verified.
              </p>

            </div>
          )}

        </div>

      </section>

      {/* ======================================================
          CURA CASE ANALYSIS
      ====================================================== */}

      {(typedCase.background ||
        typedCase.decision ||
        typedCase.legal_principle ||
        typedCase.implications) && (

        <section className="bg-[#F5F8FC]">

          <div className="mx-auto max-w-5xl px-6 py-20 lg:px-8">

            <div className="max-w-4xl">

              <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-[#D71920]">
                CURA CASE ANALYSIS
              </p>

              <h2 className="mt-4 text-3xl font-semibold tracking-tight text-[#071B49] md:text-4xl">
                Case Summary
              </h2>

              <p className="mt-4 text-base leading-8 text-slate-600">
                A detailed analysis of the facts, proceedings,
                decisions, legal principles and practical
                implications arising from the case.
              </p>

            </div>

            <div className="mt-12 space-y-12">

              {typedCase.background && (
                <article className="border-l-2 border-[#D71920] pl-6 md:pl-8">

                  <h3 className="text-xl font-semibold tracking-tight text-[#071B49] md:text-2xl">
                    Background &amp; Case Facts
                  </h3>

                  <div className="mt-5 max-w-4xl text-base leading-8 text-slate-700 whitespace-pre-line">
                    {typedCase.background}
                  </div>

                </article>
              )}

              {typedCase.decision && (
                <article className="border-l-2 border-[#D71920] pl-6 md:pl-8">

                  <h3 className="text-xl font-semibold tracking-tight text-[#071B49] md:text-2xl">
                    Decision &amp; Judgment
                  </h3>

                  <div className="mt-5 max-w-4xl text-base leading-8 text-slate-700 whitespace-pre-line">
                    {typedCase.decision}
                  </div>

                </article>
              )}

              {typedCase.legal_principle && (
                <article className="border-l-2 border-[#168BC4] pl-6 md:pl-8">

                  <h3 className="text-xl font-semibold tracking-tight text-[#071B49] md:text-2xl">
                    Legal Principles
                  </h3>

                  <div className="mt-5 max-w-4xl text-base leading-8 text-slate-700 whitespace-pre-line">
                    {typedCase.legal_principle}
                  </div>

                </article>
              )}

              {typedCase.implications && (
                <article className="border-l-2 border-[#071B49] pl-6 md:pl-8">

                  <h3 className="text-xl font-semibold tracking-tight text-[#071B49] md:text-2xl">
                    Practical Implications
                  </h3>

                  <div className="mt-5 max-w-4xl text-base leading-8 text-slate-700 whitespace-pre-line">
                    {typedCase.implications}
                  </div>

                </article>
              )}

            </div>

          </div>

        </section>
      )}

      {/* ======================================================
          CASE ISSUES
      ====================================================== */}

      {issues.length > 0 && (
        <section className="bg-white">

          <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8">

            <div className="max-w-3xl">

              <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-[#D71920]">
                LEGAL ANALYSIS
              </p>

              <h2 className="mt-4 text-3xl font-semibold tracking-tight md:text-4xl">
                Key Issues
              </h2>

            </div>

            <div className="mt-10 grid gap-4 md:grid-cols-2">

              {issues.map(
                (issue, index) => (

                  <div
                    key={issue.id}
                    className="rounded-xl border border-slate-200 bg-[#F5F8FC] p-6"
                  >

                    <div className="flex gap-4">

                      <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-[#E8F6FC] text-[10px] font-bold text-[#168BC4]">
                        {String(
                          index + 1,
                        ).padStart(2, "0")}
                      </div>

                      <p className="text-sm font-medium leading-7 text-[#071B49]">
                        {issue.issue}
                      </p>

                    </div>

                  </div>

                ),
              )}

            </div>

          </div>

        </section>
      )}

      {/* ======================================================
          ORIGINAL SOURCE DOCUMENTS
      ====================================================== */}

      {sources.length > 0 && (
        <section className="bg-[#061936]">

          <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">

            <div className="max-w-3xl">

              <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-[#62C4EA]">
                PRIMARY SOURCES
              </p>

              <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white md:text-4xl">
                Original Source Documents
              </h2>

              <p className="mt-4 text-sm leading-7 text-slate-400">
                Original official records and judgments used
                as sources for the case information presented
                on this page.
              </p>

            </div>

            {/* 2 × 2 compact source grid */}

            <div className="mt-10 grid gap-3 sm:grid-cols-2">

              {sources.slice(0, 4).map(
                (source) => (

                  <a
                    key={source.id}
                    href={source.url || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group rounded-lg border border-white/10 bg-white/5 px-4 py-4 transition hover:border-[#62C4EA]/40 hover:bg-white/10"
                  >

                    <div className="flex items-start justify-between gap-4">

                      <div>

                        <span className="inline-flex rounded bg-white/10 px-2 py-1 text-[8px] font-bold uppercase tracking-[0.13em] text-[#62C4EA]">
                          {source.source_type ||
                            "Official Source"}
                        </span>

                        <p className="mt-3 text-sm font-medium leading-6 text-white">
                          {source.title}
                        </p>

                      </div>

                      <span className="mt-1 text-sm text-slate-500 transition group-hover:text-[#62C4EA]">
                        ↗
                      </span>

                    </div>

                  </a>

                ),
              )}

            </div>

            {sources.length > 4 && (
              <p className="mt-4 text-xs text-slate-500">
                Additional source documents are available
                within the relevant proceedings above.
              </p>
            )}

          </div>

        </section>
      )}

      <CuraFooter />

    </main>
  )
}