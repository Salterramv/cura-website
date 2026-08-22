"use client"

import { useEffect, useState } from "react"
import CuraHeader from "@/components/CuraHeader"
import { createClient } from "@/lib/supabase/client"

type LegalCase = {
  id: string
  slug: string
  title: string
  category: string | null
  description: string | null
  published: boolean
}

type LegalCaseAnalysis = {
  case_id: string
  version: number | null
  status: string | null
}

type CaseIssue = {
  id: string
  case_id: string
  issue: string
  sort_order: number | null
}

type Proceeding = {
  case_id: string
  court: string | null
  case_number: string | null
  judgment_date: string | null
}

type DisplayCase = LegalCase & {
  courts: string[]
  caseNumber: string
  date: string
  issues: string[]
  analysisStatus: string | null
  hasAnalysis: boolean
  isCivilCourt: boolean
}

const COURTS = [
  "Civil Court",
  "Tax Appeal Tribunal",
  "High Court",
  "Supreme Court",
]

function normalizeCourt(court: string | null): string | null {
  if (!court) return null

  const value = court.trim().toLowerCase()

  if (
    value.includes("tax appeal tribunal") ||
    value === "tat" ||
    value.includes("appeal tribunal")
  ) {
    return "Tax Appeal Tribunal"
  }

  if (
    value.includes("high court") ||
    value === "hc"
  ) {
    return "High Court"
  }

  if (
    value.includes("supreme court") ||
    value === "sc"
  ) {
    return "Supreme Court"
  }

  return null
}

/*
 * Civil Court cases are identified by the MIRA case reference.
 *
 * Examples:
 *   3928/Cv-C/2021
 *   227/Cv-C-HD/2020
 *   4853-CVC-2025
 *
 * The database category is also checked as a fallback, but the
 * case-reference pattern is the primary identifier because some
 * older records were previously stored as "Tax Legal Case".
 */
function isCivilCourtCase(
  caseNumber: string | null,
  category: string | null,
): boolean {
  const reference = (caseNumber || "").trim()

  const hasCivilReference =
    /(?:^|[\/\-\s])cv(?:c)?(?:[\/\-\s]|$)/i.test(
      reference,
    )

  const hasCivilCategory =
    (category || "").trim().toLowerCase() ===
    "civil court case"

  return hasCivilReference || hasCivilCategory
}

function isHumanVerified(status: string | null) {
  if (!status) return false

  const normalized = status.trim().toLowerCase()

  return [
    "verified",
    "human_verified",
    "approved",
  ].includes(normalized)
}

export default function CasesPage() {
  const [cases, setCases] = useState<DisplayCase[]>([])
  const [search, setSearch] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [selectedIssue, setSelectedIssue] = useState("All")
  const [issueSearch, setIssueSearch] = useState("")
  const [issueDropdownOpen, setIssueDropdownOpen] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadCases() {
      const supabase = createClient()

      setLoading(true)

      const {
        data: legalCases,
        error: casesError,
      } = await supabase
        .from("legal_cases")
        .select(
          "id, slug, title, category, description, published"
        )

      console.log("LEGAL CASES:", legalCases)
      console.log("LEGAL CASES ERROR:", casesError)

      if (casesError) {
        console.error(
          "Error loading legal cases:",
          casesError
        )
        setLoading(false)
        return
      }

      const {
        data: proceedings,
        error: proceedingsError,
      } = await supabase
        .from("case_proceedings")
        .select(
          "case_id, court, case_number, judgment_date"
        )
        .order("sort_order", { ascending: true })

      console.log("CASE PROCEEDINGS:", proceedings)
      console.log(
        "CASE PROCEEDINGS ERROR:",
        proceedingsError
      )

      if (proceedingsError) {
        console.error(
          "Error loading case proceedings:",
          proceedingsError
        )
      }

      const {
        data: caseIssues,
        error: issuesError,
      } = await supabase
        .from("case_issues")
        .select(
          "id, case_id, issue, sort_order"
        )
        .order("sort_order", { ascending: true })

      /*
       * Load the latest CURA AI analysis for every case.
       *
       * Verification is tracked on the analysis record. A case remains
       * publicly visible before human verification; the listing simply
       * shows a pending-verification tag when its latest analysis has
       * not yet been verified.
       */
      const {
        data: caseAnalyses,
        error: analysesError,
      } = await supabase
        .from("legal_case_analyses")
        .select("case_id, version, status")
        .order("version", { ascending: false })

      console.log("CASE ANALYSES:", caseAnalyses)
      console.log("CASE ANALYSES ERROR:", analysesError)

      if (analysesError) {
        console.error(
          "Error loading legal case analyses:",
          analysesError
        )
      }

      console.log("CASE ISSUES:", caseIssues)
      console.log(
        "CASE ISSUES ERROR:",
        issuesError
      )

      if (issuesError) {
        console.error(
          "Error loading case issues:",
          issuesError
        )
      }

      /*
       * Store ALL proceedings belonging to each case.
       *
       * Example:
       *
       * Bunny Holdings
       *   -> Tax Appeal Tribunal
       *   -> High Court
       *   -> Supreme Court
       */
      const proceedingMap =
        new Map<string, Proceeding[]>()

      ;(proceedings || []).forEach(
        (proceeding: Proceeding) => {
          if (
            !proceedingMap.has(
              proceeding.case_id
            )
          ) {
            proceedingMap.set(
              proceeding.case_id,
              []
            )
          }

          proceedingMap
            .get(proceeding.case_id)!
            .push(proceeding)
        }
      )

      /*
       * Store all issues belonging to each case.
       */
      const issueMap =
        new Map<string, string[]>()

      ;(caseIssues || []).forEach(
        (item: CaseIssue) => {
          if (!issueMap.has(item.case_id)) {
            issueMap.set(item.case_id, [])
          }

          issueMap
            .get(item.case_id)!
            .push(item.issue)
        }
      )

      /*
       * Keep only the latest analysis for each case.
       */
      const analysisMap =
        new Map<string, LegalCaseAnalysis>()

      ;(caseAnalyses || []).forEach(
        (analysis: LegalCaseAnalysis) => {
          if (!analysisMap.has(analysis.case_id)) {
            analysisMap.set(analysis.case_id, analysis)
          }
        }
      )

      /*
       * Build the cases shown on the website.
       */
      const formattedCases: DisplayCase[] = (
        legalCases || []
      ).map((item) => {
        const caseProceedings =
          proceedingMap.get(item.id) || []

        /*
         * Convert every proceeding into one of our
         * three standard court names.
         */
        const courts = Array.from(
          new Set(
            caseProceedings
              .map((proceeding) =>
                normalizeCourt(
                  proceeding.court
                )
              )
              .filter(
                (
                  court
                ): court is string =>
                  Boolean(court)
              )
          )
        )

        /*
         * Keep the first proceeding for the
         * displayed case number and year.
         */
        const firstProceeding =
          caseProceedings[0]

        return {
          ...item,

          courts,

          caseNumber:
            firstProceeding?.case_number ||
            "Case details available",

          date:
            firstProceeding?.judgment_date
              ? new Date(
                  firstProceeding.judgment_date
                )
                  .getFullYear()
                  .toString()
              : "",

          issues:
            issueMap.get(item.id) || [],

          analysisStatus:
            analysisMap.get(item.id)?.status || null,

          hasAnalysis:
            analysisMap.has(item.id),

          isCivilCourt: isCivilCourtCase(
            firstProceeding?.case_number || null,
            item.category,
          ),
        }
      })

      console.log(
        "FORMATTED LEGAL CASES:",
        formattedCases
      )

      console.log(
        "Legal cases loaded:",
        formattedCases.length
      )

      setCases(formattedCases)
      setLoading(false)
    }

    loadCases()
  }, [])

  /*
   * Court filters are deliberately fixed.
   * We do NOT build them from a combined
   * "Tax Appeal Tribunal | High Court | Supreme Court"
   * string.
   */
  const categories = [
    "All",
    ...COURTS,
  ]

  /*
   * Build the issue list dynamically from
   * all cases.
   */
  const issues = [
    "All",
    ...Array.from(
      new Set(
        cases.flatMap(
          (item) => item.issues
        )
      )
    ).sort(),
  ]

  const filteredIssues = issues.filter((issue) =>
    issue
      .toLowerCase()
      .includes(issueSearch.toLowerCase())
  )

  /*
   * Filter cases.
   */
  const filteredCases = cases.filter(
    (item) => {
      const term =
        search.toLowerCase().trim()

      /*
       * Search across:
       * - Case title
       * - Description
       * - Courts
       * - Case number
       * - Year
       * - Issues
       */
      const matchesSearch =
        term === "" ||
        item.title
          .toLowerCase()
          .includes(term) ||
        (item.description || "")
          .toLowerCase()
          .includes(term) ||
        item.courts.some((court) =>
          court
            .toLowerCase()
            .includes(term)
        ) ||
        item.caseNumber
          .toLowerCase()
          .includes(term) ||
        item.date.includes(term) ||
        item.issues.some((issue) =>
          issue
            .toLowerCase()
            .includes(term)
        )

      /*
       * A case matches a court if that court
       * exists anywhere in its proceedings.
       *
       * Therefore Bunny Holdings can match
       * all three court filters.
       */
      const matchesCategory =
        selectedCategory === "All" ||
        (selectedCategory === "Civil Court"
          ? item.isCivilCourt
          : item.courts.includes(
              selectedCategory
            ))

      /*
       * Issue filter remains independent
       * from the court filter.
       */
      const matchesIssue =
        selectedIssue === "All" ||
        item.issues.includes(
          selectedIssue
        )

      return (
        matchesSearch &&
        matchesCategory &&
        matchesIssue
      )
    }
  )

  return (
    <main className="min-h-screen bg-[#F5F8FC] text-[#071B49]">

      {/* SHARED CURA HEADER */}
      <CuraHeader />

      {/* HERO */}
      <section className="bg-[#071B49]">

        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8">

          <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#D71920]">
            CURA Legal Case Library
          </p>

          <h1 className="mt-5 max-w-4xl text-4xl font-semibold tracking-tight text-white md:text-6xl">
            Maldives Tax Legal Cases
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
            Explore structured summaries of important tax decisions,
            judgments and legal principles relevant to taxation in the
            Maldives.
          </p>

        </div>

      </section>

      {/* CONTENT */}
      <section>

        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">

          {/* SEARCH */}
          <div className="relative">

            <input
              type="text"
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              placeholder="Search legal cases..."
              className="w-full rounded-xl border border-slate-300 bg-white px-5 py-4 text-sm outline-none focus:border-[#168BC4] focus:ring-2 focus:ring-[#168BC4]/20"
            />

            {search && (
              <button
                onClick={() =>
                  setSearch("")
                }
                className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-slate-400 hover:text-[#071B49]"
              >
                Clear
              </button>
            )}

          </div>

          {/* FILTERS */}
          <div className="mt-6 flex flex-wrap items-center gap-3">

            {categories.map(
              (category) => {
                const active =
                  selectedCategory ===
                  category

                return (
                  <button
                    key={category}
                    onClick={() =>
                      setSelectedCategory(
                        category
                      )
                    }
                    className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                      active
                        ? "bg-[#071B49] text-white"
                        : "border border-slate-300 bg-white text-slate-600 hover:border-[#071B49]"
                    }`}
                  >
                    {category}
                  </button>
                )
              }
            )}

            {/* ISSUE SEARCH */}
            <div className="relative w-full max-w-md">

              <input
                type="text"
                value={
                  issueDropdownOpen
                    ? issueSearch
                    : selectedIssue === "All"
                    ? ""
                    : selectedIssue
                }
                onFocus={() => {
                  setIssueDropdownOpen(true)
                  setIssueSearch("")
                }}
                onChange={(e) => {
                  setIssueSearch(e.target.value)
                  setIssueDropdownOpen(true)
                }}
                placeholder="Search issues..."
                className="w-full rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-600 outline-none focus:border-[#168BC4] focus:ring-2 focus:ring-[#168BC4]/20"
              />

              {issueDropdownOpen && (
                <div className="absolute left-0 right-0 top-full z-50 mt-2 max-h-72 overflow-y-auto rounded-xl border border-slate-200 bg-white p-2 shadow-xl">

                  <button
                    type="button"
                    onClick={() => {
                      setSelectedIssue("All")
                      setIssueSearch("")
                      setIssueDropdownOpen(false)
                    }}
                    className={`block w-full rounded-lg px-3 py-2 text-left text-sm hover:bg-slate-100 ${
                      selectedIssue === "All"
                        ? "font-semibold text-[#071B49]"
                        : "text-slate-600"
                    }`}
                  >
                    All Issues
                  </button>

                  {filteredIssues
                    .filter(
                      (issue) =>
                        issue !== "All"
                    )
                    .map((issue) => (
                      <button
                        type="button"
                        key={issue}
                        onClick={() => {
                          setSelectedIssue(issue)
                          setIssueSearch("")
                          setIssueDropdownOpen(false)
                        }}
                        className={`block w-full rounded-lg px-3 py-2 text-left text-sm hover:bg-slate-100 ${
                          selectedIssue === issue
                            ? "font-semibold text-[#071B49]"
                            : "text-slate-600"
                        }`}
                      >
                        {issue}
                      </button>
                    ))}

                  {filteredIssues.filter(
                    (issue) =>
                      issue !== "All"
                  ).length === 0 && (
                    <div className="px-3 py-3 text-sm text-slate-400">
                      No matching issues found.
                    </div>
                  )}

                </div>
              )}

            </div>

          </div>

          {/* RESULT COUNT */}
          <div className="mt-10">

            <p className="text-sm text-slate-500">

              {loading ? (
                "Loading cases..."
              ) : (
                <>
                  Showing{" "}
                  <span className="font-semibold text-[#071B49]">
                    {
                      filteredCases.length
                    }
                  </span>{" "}
                  {filteredCases.length ===
                  1
                    ? "case"
                    : "cases"}
                </>
              )}

            </p>

          </div>

          {/* CASES */}
          {!loading &&
          filteredCases.length > 0 ? (

            <div className="mt-6 grid gap-6 md:grid-cols-2">

              {filteredCases.map(
                (item) => (

                  <article
                    key={item.id}
                    className="group rounded-xl border border-slate-200 bg-white p-8 transition hover:-translate-y-1 hover:shadow-xl"
                  >

                    {/* COURT TAGS + DATE */}
                    <div className="flex flex-wrap items-start justify-between gap-4">

                      <div className="flex flex-wrap gap-2">

                        {item.isCivilCourt && (
                          <button
                            type="button"
                            onClick={() =>
                              setSelectedCategory(
                                "Civil Court"
                              )
                            }
                            className={`rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-[0.12em] transition ${
                              selectedCategory ===
                              "Civil Court"
                                ? "bg-[#071B49] text-white"
                                : "bg-blue-50 text-[#168BC4] hover:bg-blue-100"
                            }`}
                          >
                            Civil Court Case
                          </button>
                        )}

                        {item.courts.map(
                          (court) => (
                            <button
                              key={court}
                              onClick={() =>
                                setSelectedCategory(
                                  court
                                )
                              }
                              className={`rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-[0.12em] transition ${
                                selectedCategory ===
                                court
                                  ? "bg-[#071B49] text-white"
                                  : "bg-red-50 text-[#D71920] hover:bg-red-100"
                              }`}
                            >
                              {court}
                            </button>
                          )
                        )}

                        {!item.isCivilCourt &&
                          item.courts.length === 0 && (
                            <span className="rounded-full bg-red-50 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.15em] text-[#D71920]">
                              Tax Legal Case
                            </span>
                          )}

                      </div>

                      {item.hasAnalysis && !isHumanVerified(item.analysisStatus) && (
                        <span className="shrink-0 rounded-full bg-[#FFF4E5] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-[#B26A00]">
                          Human verification pending
                        </span>
                      )}

                      {item.date && (
                        <span className="shrink-0 text-xs text-slate-400">
                          {item.date}
                        </span>
                      )}

                    </div>

                    {/* CASE NUMBER */}
                    <p className="mt-6 text-xs font-medium uppercase tracking-[0.15em] text-slate-400">
                      {item.caseNumber}
                    </p>

                    {/* TITLE */}
                    <h2 className="mt-3 text-2xl font-semibold leading-8 text-[#071B49]">
                      {item.title}
                    </h2>

                    {/* DESCRIPTION */}
                    <p className="mt-4 text-sm leading-7 text-slate-600">
                      {item.description ||
                        "A structured summary of this tax legal case and its implications."}
                    </p>

                    {/* ISSUES */}
                    {item.issues.length >
                      0 && (
                        <div className="mt-5 flex flex-wrap gap-2">

                          {item.issues.map(
                            (issue) => (
                              <button
                                key={issue}
                                onClick={() =>
                                  setSelectedIssue(
                                    issue
                                  )
                                }
                                className={`rounded-full px-3 py-1 text-xs font-medium transition ${
                                  selectedIssue ===
                                  issue
                                    ? "bg-[#071B49] text-white"
                                    : "bg-[#E8F6FC] text-[#168BC4] hover:bg-[#D9F0FA]"
                                }`}
                              >
                                {issue}
                              </button>
                            )
                          )}

                        </div>
                      )}

                    {/* CASE LINK */}
                    <a
                      href={`/cases/${item.slug}`}
                      className="mt-7 inline-block text-sm font-semibold text-[#071B49] transition group-hover:text-[#D71920]"
                    >
                      Read case summary →
                    </a>

                  </article>

                )
              )}

            </div>

          ) : !loading ? (

            <div className="mt-6 rounded-xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center">

              <h2 className="text-xl font-semibold">
                No cases found
              </h2>

              <p className="mt-3 text-sm text-slate-500">
                Try another search term or choose a different category.
              </p>

              <button
                onClick={() => {
                  setSearch("")
                  setSelectedCategory(
                    "All"
                  )
                  setSelectedIssue(
                    "All"
                  )
                  setIssueSearch("")
                }}
                className="mt-6 rounded-md bg-[#071B49] px-5 py-2.5 text-sm font-semibold text-white"
              >
                Show all cases
              </button>

            </div>

          ) : null}

        </div>

      </section>

      {/* FOOTER */}
      <footer className="bg-[#04132D] text-white">

        <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">

          <div className="flex flex-col justify-between gap-8 md:flex-row">

            <div>

              <img
                src="/cura-logo.png"
                alt="CURA"
                className="h-20 w-auto brightness-0 invert"
              />

              <p className="mt-3 text-sm text-slate-400">
                Audit · Tax · Advisory
              </p>

              <p className="mt-2 text-xs tracking-[0.25em] text-[#D99A17]">
                CURE YOUR FIGURES
              </p>

            </div>

            <div className="text-sm text-slate-400">

              <p>Maldives</p>

              <p className="mt-2">
                Professional knowledge platform
              </p>

            </div>

          </div>

          <div className="mt-10 border-t border-white/10 pt-6 text-xs text-slate-500">
            © {new Date().getFullYear()} CURA. All rights reserved.
          </div>

        </div>

      </footer>

    </main>
  )
}