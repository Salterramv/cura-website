"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"

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
  claim: string | null
  mira_case_number: string | null
  filed_date: string | null
  published: boolean
  is_primary: boolean
  ai_analysis_status: string
  ai_analyzed_at: string | null
  ai_analysis_version: number
}

type Proceeding = {
  id?: string
  court: string
  case_number: string
  filed_date: string
  judgment_date: string
  status: string
  outcome: string
  source_url: string
  source_title: string
  source_type: string
  source_status: "verified" | "needs_verification" | "unavailable"
  source_notes: string
}

const COURTS = [
  "Tax Appeal Tribunal",
  "High Court",
  "Supreme Court",
]

const emptyProceeding = (court: string): Proceeding => ({
  court,
  case_number: "",
  filed_date: "",
  judgment_date: "",
  status: "",
  outcome: "",
  source_url: "",
  source_title: "",
  source_type: "Official Proceeding",
  source_status: "needs_verification",
  source_notes: "",
})

export default function AdminCasesPage() {
  const supabase = createClient()

  const [cases, setCases] = useState<LegalCase[]>([])
  const [selectedId, setSelectedId] = useState<string | null>(null)

  const [title, setTitle] = useState("")
  const [slug, setSlug] = useState("")
  const [category, setCategory] = useState("Tax Legal Case")
  const [description, setDescription] = useState("")
  const [status, setStatus] = useState("")
  const [outcome, setOutcome] = useState("")
  const [background, setBackground] = useState("")
  const [claim, setClaim] = useState("")
  const [decision, setDecision] = useState("")
  const [legalPrinciple, setLegalPrinciple] = useState("")
  const [implications, setImplications] = useState("")
  const [miraCaseNumber, setMiraCaseNumber] = useState("")
  const [filedDate, setFiledDate] = useState("")
  const [published, setPublished] = useState(false)
  const [isPrimary, setIsPrimary] = useState(true)

  const [proceedings, setProceedings] = useState<Proceeding[]>([])

  const [findingSourceId, setFindingSourceId] = useState<string | null>(null)
  const [sourceCandidates, setSourceCandidates] = useState<
    Record<string, any[]>
  >({})
  const [sourceFinderMessage, setSourceFinderMessage] = useState("")

  const [search, setSearch] = useState("")
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [analyzing, setAnalyzing] = useState(false)

  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [analysisMessage, setAnalysisMessage] = useState("")

  useEffect(() => {
    checkAdmin()
  }, [])

  async function checkAdmin() {
    setLoading(true)

    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      window.location.href = "/admin/login"
      return
    }

    const { data: isAdmin, error } =
      await supabase.rpc("is_current_user_admin")

    if (error || !isAdmin) {
      await supabase.auth.signOut()
      window.location.href = "/admin/login"
      return
    }

    await loadCases()
    setLoading(false)
  }

  async function loadCases() {
    const { data, error } = await supabase
      .from("legal_cases")
      .select(
        `
        id,
        slug,
        title,
        category,
        description,
        status,
        outcome,
        background,
        decision,
        legal_principle,
        implications,
        claim,
        mira_case_number,
        filed_date,
        published,
        is_primary,
        ai_analysis_status,
        ai_analyzed_at,
        ai_analysis_version
      `,
      )
      .order("updated_at", { ascending: false })
      .limit(100)

    if (error) {
      setError(error.message)
      return
    }

    setCases((data || []) as LegalCase[])
  }

  async function loadProceedings(caseId: string) {
    const { data, error } = await supabase
      .from("case_proceedings")
      .select("*")
      .eq("case_id", caseId)
      .order("sort_order", { ascending: true })
      .order("created_at", { ascending: true })

    if (error) {
      setError(error.message)
      return
    }

    setProceedings(
      (data || []).map((item) => ({
        id: item.id,
        court: item.court,
        case_number: item.case_number || "",
        filed_date: item.filed_date || "",
        judgment_date: item.judgment_date || "",
        status: item.status || "",
        outcome: item.outcome || "",
        source_url: item.source_url || "",
        source_title: item.source_title || "",
        source_type: item.source_type || "Official Proceeding",
        source_status: item.source_status || "needs_verification",
        source_notes: item.source_notes || "",
      })),
    )
  }

  function clearForm() {
    setSelectedId(null)

    setTitle("")
    setSlug("")
    setCategory("Tax Legal Case")
    setDescription("")
    setStatus("")
    setOutcome("")
    setBackground("")
    setClaim("")
    setDecision("")
    setLegalPrinciple("")
    setImplications("")
    setMiraCaseNumber("")
    setFiledDate("")

    setPublished(false)
    setIsPrimary(true)

    setProceedings([])

    setError("")
    setSuccess("")
    setAnalysisMessage("")
  }

  async function editCase(item: LegalCase) {
    setSelectedId(item.id)

    setTitle(item.title || "")
    setSlug(item.slug || "")
    setCategory(item.category || "Tax Legal Case")
    setDescription(item.description || "")
    setStatus(item.status || "")
    setOutcome(item.outcome || "")
    setBackground(item.background || "")
    setClaim(item.claim || "")
    setDecision(item.decision || "")
    setLegalPrinciple(item.legal_principle || "")
    setImplications(item.implications || "")
    setMiraCaseNumber(item.mira_case_number || "")
    setFiledDate(item.filed_date || "")

    setPublished(Boolean(item.published))
    setIsPrimary(Boolean(item.is_primary))

    setError("")
    setSuccess("")
    setAnalysisMessage("")

    await loadProceedings(item.id)

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  function makeSlug(value: string) {
    return value
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
  }

  function addProceeding(court: string) {
    setProceedings((current) => [
      ...current,
      emptyProceeding(court),
    ])
  }

  function removeProceeding(index: number) {
    setProceedings((current) =>
      current.filter((_, i) => i !== index),
    )
  }

  function updateProceeding(
    index: number,
    field: keyof Proceeding,
    value: string,
  ) {
    setProceedings((current) =>
      current.map((item, i) =>
        i === index
          ? {
              ...item,
              [field]: value,
            }
          : item,
      ),
    )
  }

  async function saveCase() {
    setSaving(true)
    setError("")
    setSuccess("")

    if (!title.trim()) {
      setError("Case title is required.")
      setSaving(false)
      return
    }

    if (!slug.trim()) {
      setError("Slug is required.")
      setSaving(false)
      return
    }

    const payload = {
      title: title.trim(),
      slug: slug.trim(),
      category: category.trim() || "Tax Legal Case",
      description: description.trim() || null,
      status: status.trim() || null,
      outcome: outcome.trim() || null,
      background: background.trim() || null,
      claim: claim.trim() || null,
      decision: decision.trim() || null,
      legal_principle: legalPrinciple.trim() || null,
      implications: implications.trim() || null,
      mira_case_number: miraCaseNumber.trim() || null,
      filed_date: filedDate || null,
      published,
      is_primary: isPrimary,
      updated_at: new Date().toISOString(),
    }

    let caseId = selectedId

    if (caseId) {
      const { error } = await supabase
        .from("legal_cases")
        .update(payload)
        .eq("id", caseId)

      if (error) {
        setError(error.message)
        setSaving(false)
        return
      }
    } else {
      const { data, error } = await supabase
        .from("legal_cases")
        .insert({
          ...payload,
          ai_analysis_status: "not_analyzed",
          ai_analysis_version: 0,
        })
        .select("id")
        .single()

      if (error || !data) {
        setError(error?.message || "Unable to create case.")
        setSaving(false)
        return
      }

      caseId = data.id
      setSelectedId(caseId)
    }

    /*
     * Sync proceedings.
     *
     * Existing proceedings are updated.
     * New proceedings are inserted.
     * Removed proceedings are deleted.
     */

    const { data: existingRows, error: existingError } =
      await supabase
        .from("case_proceedings")
        .select("id")
        .eq("case_id", caseId)

    if (existingError) {
      setError(existingError.message)
      setSaving(false)
      return
    }

    const currentIds = proceedings
      .map((item) => item.id)
      .filter(Boolean) as string[]

    const idsToDelete = (existingRows || [])
      .map((item) => item.id)
      .filter((id) => !currentIds.includes(id))

    if (idsToDelete.length > 0) {
      const { error } = await supabase
        .from("case_proceedings")
        .delete()
        .in("id", idsToDelete)

      if (error) {
        setError(error.message)
        setSaving(false)
        return
      }
    }

    for (let index = 0; index < proceedings.length; index++) {
      const item = proceedings[index]

      const proceedingPayload = {
        case_id: caseId,
        court: item.court,
        case_number: item.case_number.trim() || null,
        filed_date: item.filed_date || null,
        judgment_date: item.judgment_date || null,
        status: item.status.trim() || null,
        outcome: item.outcome.trim() || null,
        sort_order: index,
        source_url: item.source_url.trim() || null,
        source_title:
          item.source_title.trim() ||
          `${item.court} Proceeding`,
        source_type:
          item.source_type.trim() ||
          "Official Proceeding",
        source_status: item.source_status,
        source_notes: item.source_notes.trim() || null,
      }

      if (item.id) {
        const { error } = await supabase
          .from("case_proceedings")
          .update(proceedingPayload)
          .eq("id", item.id)

        if (error) {
          setError(error.message)
          setSaving(false)
          return
        }
      } else {
        const { data, error } = await supabase
          .from("case_proceedings")
          .insert(proceedingPayload)
          .select("id")
          .single()

        if (error) {
          setError(error.message)
          setSaving(false)
          return
        }

        if (data) {
          proceedings[index].id = data.id
        }
      }
    }

    await loadCases()

    if (caseId) {
      await loadProceedings(caseId)
    }

    setSuccess(
      published
        ? "Legal case saved and published."
        : "Legal case saved as a draft.",
    )

    setSaving(false)
  }

  async function findOfficialSource(
    proceeding: Proceeding,
  ) {
    if (!selectedId) {
      setError("Save the case before finding official sources.")
      return
    }

    if (!proceeding.case_number?.trim()) {
      setError(
        "Enter the court proceeding case number before finding the official source.",
      )
      return
    }

    if (!proceeding.id) {
      setError("This proceeding has not been saved yet. Save the case before finding its official source.")
      return
    }

    const proceedingId = proceeding.id

    setFindingSourceId(proceedingId)
    setError("")
    setSuccess("")
    setSourceFinderMessage(
      `Searching official sources for ${proceeding.case_number}...`,
    )

    try {
      const { data, error } = await supabase.functions.invoke(
        "find-official-legal-source",
        {
          body: {
            case_id: selectedId,
            court: proceeding.court,
            case_number: proceeding.case_number.trim(),
            party_name: title.trim(),
          },
        },
      )

      if (error) {
        throw new Error(error.message)
      }

      if (data?.error) {
        throw new Error(data.error)
      }

      const candidates = Array.isArray(data?.candidates)
        ? data.candidates
        : []

      setSourceCandidates((current) => ({
        ...current,
        [proceedingId]: candidates,
      }))

      setSourceFinderMessage(
        candidates.length > 0
          ? `Found ${candidates.length} official source candidate${
              candidates.length === 1 ? "" : "s"
            }. Verify the result before using it.`
          : "No matching official source was found. You can enter the URL manually.",
      )
    } catch (sourceError) {
      setError(
        sourceError instanceof Error
          ? sourceError.message
          : "Unable to find the official source.",
      )
      setSourceFinderMessage("")
    } finally {
      setFindingSourceId(null)
    }
  }

  function useOfficialSource(
    proceedingId: string,
    candidate: any,
  ) {
    setProceedings((current) =>
      current.map((item) =>
        item.id === proceedingId
          ? {
              ...item,
              source_url: candidate.url || "",
              source_title:
                candidate.title ||
                item.source_title ||
                "Official source",
              source_type:
                candidate.source_type ||
                item.source_type ||
                "Official source",
              source_status: "needs_verification",
              source_notes:
                candidate.notes ||
                item.source_notes ||
                "Found by CURA official source finder. Human verification required.",
            }
          : item,
      ),
    )

    setSourceCandidates((current) => ({
      ...current,
      [proceedingId]: [],
    }))

    setSourceFinderMessage(
      "Official source added to the proceeding. Verify the document before saving and using it for AI analysis.",
    )
  }

  async function analyzeCase() {
    if (!selectedId) {
      setError("Save the case before running AI analysis.")
      return
    }

    const validSources = proceedings.filter(
      (item) => item.source_url.trim() !== "",
    )

    if (validSources.length === 0) {
      setError(
        "Add at least one official proceeding URL before running AI analysis.",
      )
      return
    }

    setAnalyzing(true)
    setError("")
    setSuccess("")
    setAnalysisMessage(
      "CURA AI is analyzing all currently available official sources...",
    )

    try {
      /*
       * Save the latest case information and proceeding URLs first.
       */
      await saveCase()

      /*
       * Run the secure Supabase Edge Function.
       */
      const { data, error } = await supabase.functions.invoke(
        "analyze-legal-case",
        {
          body: {
            case_id: selectedId,
          },
        },
      )

      if (error) {
        throw new Error(error.message)
      }

      if (data?.error) {
        throw new Error(data.error)
      }

      /*
       * The Edge Function returns the newly-created analysis record.
       */
      const generatedData = data?.analysis?.generated_data

      if (!generatedData) {
        throw new Error(
          "CURA AI completed the analysis but returned no case data.",
        )
      }

      const generatedCase = generatedData.case

      /*
       * Populate the existing case editor with the AI-generated draft.
       * Everything remains editable for human verification.
       */
      if (generatedCase) {
        if (generatedCase.title) {
          setTitle(generatedCase.title)
        }

        if (generatedCase.category) {
          setCategory(generatedCase.category)
        }

        if (generatedCase.description !== undefined) {
          setDescription(generatedCase.description || "")
        }

        if (generatedCase.background !== undefined) {
          setBackground(generatedCase.background || "")
        }

        if (generatedCase.claim !== undefined) {
          setClaim(generatedCase.claim || "")
        }

        if (generatedCase.decision !== undefined) {
          setDecision(generatedCase.decision || "")
        }

        if (generatedCase.legal_principle !== undefined) {
          setLegalPrinciple(generatedCase.legal_principle || "")
        }

        if (generatedCase.implications !== undefined) {
          setImplications(generatedCase.implications || "")
        }

        if (generatedCase.status !== undefined) {
          setStatus(generatedCase.status || "")
        }

        if (generatedCase.outcome !== undefined) {
          setOutcome(generatedCase.outcome || "")
        }

        if (generatedCase.mira_case_number !== undefined) {
          setMiraCaseNumber(generatedCase.mira_case_number || "")
        }

        if (generatedCase.filed_date !== undefined) {
          setFiledDate(generatedCase.filed_date || "")
        }
      }

      /*
       * Reload the saved case list so the AI status/version is updated.
       */
      await loadCases()

      /*
       * Reload proceedings from Supabase.
       *
       * This preserves the official proceeding records and allows
       * future proceedings/re-appeals to be added without replacing
       * the historical source records.
       */
      await loadProceedings(selectedId)

      const version = data?.analysis?.version

      setAnalysisMessage(
        version
          ? `CURA AI analysis complete — Version ${version} is ready for human verification. Review the generated case information below before publishing.`
          : "CURA AI analysis complete and ready for human verification.",
      )

      /*
       * Do not automatically publish anything.
       */
      setPublished(false)

      /*
       * Scroll back toward the generated case analysis.
       */
      setTimeout(() => {
        window.scrollTo({
          top: 700,
          behavior: "smooth",
        })
      }, 100)
    } catch (analysisError) {
      setError(
        analysisError instanceof Error
          ? analysisError.message
          : "Unable to complete CURA AI analysis.",
      )

      setAnalysisMessage("")
    } finally {
      setAnalyzing(false)
    }
  }

  async function deleteCase(id: string) {
    const confirmed = window.confirm(
      "Delete this legal case and its related proceedings?",
    )

    if (!confirmed) return

    const { error } = await supabase
      .from("legal_cases")
      .delete()
      .eq("id", id)

    if (error) {
      setError(error.message)
      return
    }

    if (selectedId === id) {
      clearForm()
    }

    await loadCases()

    setSuccess("Legal case deleted.")
  }

  const filteredCases = cases.filter((item) => {
    const term = search.toLowerCase().trim()

    if (!term) return true

    return (
      item.title.toLowerCase().includes(term) ||
      item.slug.toLowerCase().includes(term) ||
      (item.mira_case_number || "")
        .toLowerCase()
        .includes(term)
    )
  })

  const proceedingsForCourt = (court: string) =>
    proceedings
      .map((item, index) => ({
        item,
        index,
      }))
      .filter(({ item }) => item.court === court)

  if (loading) {
    return (
      <main className="min-h-screen bg-[#f4f7fb] flex items-center justify-center">
        <div className="text-center">
          <div className="mx-auto h-8 w-8 animate-spin rounded-full border-4 border-slate-200 border-t-[#18b8ee]" />
          <p className="mt-4 text-sm text-slate-600">
            Loading legal cases...
          </p>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-[#f4f7fb] text-[#071d41]">

      <header className="bg-[#061b3d] text-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">

          <div className="flex items-center gap-5">
            <div className="border-r border-white/15 pr-6">
              <img
                src="/cura-logo.png"
                alt="CURA"
                className="h-12 w-auto brightness-0 invert"
              />
            </div>

            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-[#18b8ee]">
                CURA Administration
              </p>

              <h1 className="mt-1 text-lg font-semibold">
                Legal Cases
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="/cases"
              className="rounded-lg bg-white px-5 py-2.5 text-sm font-semibold !text-[#061b3d]"
            >
              View Cases
            </a>

            <a
              href="/admin"
              className="rounded-lg border border-[#18b8ee]/60 px-5 py-2.5 text-sm font-semibold text-white"
            >
              Dashboard
            </a>

            <button
              type="button"
              onClick={async () => {
                await supabase.auth.signOut()
                window.location.href = "/admin/login"
              }}
              className="rounded-lg bg-gradient-to-r from-[#18b8ee] to-[#087dcc] px-5 py-2.5 text-sm font-semibold text-white"
            >
              Sign Out
            </button>
          </div>

        </div>
      </header>

      <div className="mx-auto max-w-7xl px-6 py-10">

        {error && (
          <div className="mb-6 rounded-lg border border-red-200 bg-red-50 px-5 py-4 text-sm text-red-700">
            {error}
          </div>
        )}

        {success && (
          <div className="mb-6 rounded-lg border border-emerald-200 bg-emerald-50 px-5 py-4 text-sm text-emerald-700">
            {success}
          </div>
        )}

        {analysisMessage && (
          <div className="mb-6 rounded-lg border border-[#18b8ee]/30 bg-[#eafaff] px-5 py-4 text-sm text-[#075d82]">
            {analysisMessage}
          </div>
        )}

        {/* CASE EDITOR */}

        <section className="rounded-2xl border border-slate-200 bg-white shadow-sm">

          <div className="border-b border-slate-200 px-7 py-6">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#18b8ee]">
              {selectedId ? "Edit Case" : "New Case"}
            </p>

            <h2 className="mt-2 text-2xl font-bold">
              {selectedId ? title || "Legal Case" : "Create Legal Case"}
            </h2>

            <p className="mt-2 text-sm text-slate-500">
              Add the official proceedings currently available. The case does
              not need to have reached every court before it can be analyzed.
            </p>
          </div>

          <div className="space-y-10 p-7">

            {/* BASIC INFORMATION */}

            <section>
              <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-[#071d41]">
                Case Information
              </h3>

              <div className="mt-5 grid gap-5 md:grid-cols-2">

                <div className="md:col-span-2">
                  <label className="text-sm font-semibold">
                    Case Title *
                  </label>

                  <input
                    value={title}
                    onChange={(e) => {
                      setTitle(e.target.value)

                      if (!selectedId) {
                        setSlug(makeSlug(e.target.value))
                      }
                    }}
                    className="mt-2 w-full rounded-lg border border-slate-300 px-4 py-3 text-sm"
                    placeholder="e.g. ABC Company v MIRA"
                  />
                </div>

                <div>
                  <label className="text-sm font-semibold">
                    Slug *
                  </label>

                  <input
                    value={slug}
                    onChange={(e) => setSlug(e.target.value)}
                    className="mt-2 w-full rounded-lg border border-slate-300 px-4 py-3 text-sm"
                  />
                </div>

                <div>
                  <label className="text-sm font-semibold">
                    Category
                  </label>

                  <input
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="mt-2 w-full rounded-lg border border-slate-300 px-4 py-3 text-sm"
                  />
                </div>

                <div>
                  <label className="text-sm font-semibold">
                    MIRA Case Number
                  </label>

                  <input
                    value={miraCaseNumber}
                    onChange={(e) => setMiraCaseNumber(e.target.value)}
                    className="mt-2 w-full rounded-lg border border-slate-300 px-4 py-3 text-sm"
                  />
                </div>

                <div>
                  <label className="text-sm font-semibold">
                    Filed Date
                  </label>

                  <input
                    type="date"
                    value={filedDate}
                    onChange={(e) => setFiledDate(e.target.value)}
                    className="mt-2 w-full rounded-lg border border-slate-300 px-4 py-3 text-sm"
                  />
                </div>

              </div>
            </section>

            {/* OFFICIAL PROCEEDINGS */}

            <section className="border-t border-slate-200 pt-10">

              <div className="flex items-start justify-between gap-5">
                <div>
                  <h3 className="text-sm font-bold uppercase tracking-[0.2em]">
                    Official Proceedings
                  </h3>

                  <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-500">
                    Add every official proceeding currently available.
                    Multiple proceedings at the same court are allowed,
                    including re-appeals and subsequent proceedings.
                  </p>
                </div>
              </div>

              <div className="mt-7 space-y-8">

                {COURTS.map((court) => {
                  const rows = proceedingsForCourt(court)

                  return (
                    <div
                      key={court}
                      className="rounded-xl border border-slate-200 bg-slate-50 p-5"
                    >

                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="text-lg font-bold">
                            {court}
                          </h4>

                          <p className="mt-1 text-xs text-slate-500">
                            {rows.length} proceeding
                            {rows.length === 1 ? "" : "s"}
                          </p>
                        </div>

                        <button
                          type="button"
                          onClick={() => addProceeding(court)}
                          className="rounded-lg border border-[#18b8ee] bg-white px-4 py-2 text-sm font-semibold text-[#0876a8]"
                        >
                          + Add Proceeding
                        </button>
                      </div>

                      {rows.length === 0 ? (
                        <div className="mt-5 rounded-lg border border-dashed border-slate-300 bg-white px-5 py-6 text-center text-sm text-slate-400">
                          No {court} proceeding added yet.
                        </div>
                      ) : (
                        <div className="mt-5 space-y-5">

                          {rows.map(({ item, index }, number) => (
                            <div
                              key={item.id || `${court}-${number}`}
                              className="rounded-xl border border-slate-200 bg-white p-5"
                            >

                              <div className="mb-5 flex items-center justify-between">
                                <div>
                                  <span className="text-xs font-bold uppercase tracking-[0.18em] text-[#18b8ee]">
                                    Proceeding {number + 1}
                                  </span>

                                  {item.id && (
                                    <span className="ml-3 text-xs text-slate-400">
                                      Saved
                                    </span>
                                  )}
                                </div>

                                <button
                                  type="button"
                                  onClick={() =>
                                    removeProceeding(index)
                                  }
                                  className="text-sm font-semibold text-red-600 hover:text-red-700"
                                >
                                  Remove
                                </button>
                              </div>

                              <div className="grid gap-5 md:grid-cols-2">

                                <div>
                                  <label className="text-sm font-semibold">
                                    Proceeding / Case Number
                                  </label>

                                  <input
                                    value={item.case_number}
                                    onChange={(e) =>
                                      updateProceeding(
                                        index,
                                        "case_number",
                                        e.target.value,
                                      )
                                    }
                                    className="mt-2 w-full rounded-lg border border-slate-300 px-4 py-3 text-sm"
                                  />
                                </div>

                                <div>
                                  <label className="text-sm font-semibold">
                                    Source Title
                                  </label>

                                  <input
                                    value={item.source_title}
                                    onChange={(e) =>
                                      updateProceeding(
                                        index,
                                        "source_title",
                                        e.target.value,
                                      )
                                    }
                                    placeholder={`${court} Judgment / Proceeding`}
                                    className="mt-2 w-full rounded-lg border border-slate-300 px-4 py-3 text-sm"
                                  />
                                </div>

                                <div className="md:col-span-2">
                                  <label className="text-sm font-semibold">
                                    Official Source URL *
                                  </label>

                                  <input
                                    type="url"
                                    value={item.source_url}
                                    onChange={(e) =>
                                      updateProceeding(
                                        index,
                                        "source_url",
                                        e.target.value,
                                      )
                                    }
                                    placeholder="https://..."
                                    className="mt-2 w-full rounded-lg border border-slate-300 px-4 py-3 text-sm"
                                  />

                                  <p className="mt-2 text-xs text-slate-400">
                                    Use the official MIRA, TAT, High Court or
                                    Supreme Court source.
                                  </p>

                                  <div className="mt-3 flex flex-wrap items-center gap-3">

                                    <button
                                      type="button"
                                      onClick={() =>
                                        findOfficialSource(item)
                                      }
                                      disabled={
                                        findingSourceId === item.id ||
                                        !item.case_number.trim()
                                      }
                                      className="rounded-lg border border-[#18b8ee] bg-[#eafaff] px-4 py-2 text-xs font-bold text-[#087dcc] transition hover:bg-[#d9f6ff] disabled:cursor-not-allowed disabled:opacity-50"
                                    >
                                      {findingSourceId === item.id
                                        ? "Searching official sources..."
                                        : "🔎 Find Official Source"}
                                    </button>

                                    {!item.case_number.trim() && (
                                      <span className="text-xs text-slate-400">
                                        Enter the proceeding case number first.
                                      </span>
                                    )}

                                  </div>

                                  {sourceCandidates[item.id || ""]?.length > 0 && (
                                    <div className="mt-4 space-y-3 rounded-xl border border-[#18b8ee]/20 bg-[#f4fbfe] p-4">

                                      <div>
                                        <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#087dcc]">
                                          Official Source Candidates
                                        </p>

                                        <p className="mt-1 text-xs leading-5 text-slate-500">
                                          Verify the document before adding it
                                          to this proceeding.
                                        </p>
                                      </div>

                                      {sourceCandidates[item.id || ""].map(
                                        (candidate, candidateIndex) => (
                                          <div
                                            key={
                                              candidate.url ||
                                              `${item.id}-${candidateIndex}`
                                            }
                                            className="rounded-lg border border-slate-200 bg-white p-4"
                                          >

                                            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

                                              <div className="min-w-0">

                                                <p className="text-sm font-semibold text-[#071d41]">
                                                  {candidate.title ||
                                                    item.source_title ||
                                                    `${item.court} official source`}
                                                </p>

                                                {candidate.description && (
                                                  <p className="mt-1 text-xs leading-5 text-slate-500">
                                                    {candidate.description}
                                                  </p>
                                                )}

                                                {candidate.url && (
                                                  <p className="mt-2 break-all text-[11px] text-slate-400">
                                                    {candidate.url}
                                                  </p>
                                                )}

                                              </div>

                                              <div className="flex shrink-0 gap-2">

                                                {candidate.url && (
                                                  <a
                                                    href={candidate.url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50"
                                                  >
                                                    Open Source ↗
                                                  </a>
                                                )}

                                                <button
                                                  type="button"
                                                  onClick={() =>
                                                    useOfficialSource(
                                                      item.id || "",
                                                      candidate,
                                                    )
                                                  }
                                                  disabled={!item.id || !candidate.url}
                                                  className="rounded-lg bg-[#061b3d] px-3 py-2 text-xs font-semibold text-white hover:bg-[#0b2a55] disabled:opacity-50"
                                                >
                                                  Use This Source
                                                </button>

                                              </div>

                                            </div>

                                          </div>
                                        ),
                                      )}

                                    </div>
                                  )}

                                  {sourceFinderMessage && (
                                    <p className="mt-3 text-xs font-medium text-[#087dcc]">
                                      {sourceFinderMessage}
                                    </p>
                                  )}

                                </div>

                                <div>
                                  <label className="text-sm font-semibold">
                                    Filed Date
                                  </label>

                                  <input
                                    type="date"
                                    value={item.filed_date}
                                    onChange={(e) =>
                                      updateProceeding(
                                        index,
                                        "filed_date",
                                        e.target.value,
                                      )
                                    }
                                    className="mt-2 w-full rounded-lg border border-slate-300 px-4 py-3 text-sm"
                                  />
                                </div>

                                <div>
                                  <label className="text-sm font-semibold">
                                    Judgment / Decision Date
                                  </label>

                                  <input
                                    type="date"
                                    value={item.judgment_date}
                                    onChange={(e) =>
                                      updateProceeding(
                                        index,
                                        "judgment_date",
                                        e.target.value,
                                      )
                                    }
                                    className="mt-2 w-full rounded-lg border border-slate-300 px-4 py-3 text-sm"
                                  />
                                </div>

                                <div>
                                  <label className="text-sm font-semibold">
                                    Status
                                  </label>

                                  <input
                                    value={item.status}
                                    onChange={(e) =>
                                      updateProceeding(
                                        index,
                                        "status",
                                        e.target.value,
                                      )
                                    }
                                    placeholder="Decided / Pending / Appealed"
                                    className="mt-2 w-full rounded-lg border border-slate-300 px-4 py-3 text-sm"
                                  />
                                </div>

                                <div>
                                  <label className="text-sm font-semibold">
                                    Source Verification
                                  </label>

                                  <select
                                    value={item.source_status}
                                    onChange={(e) =>
                                      updateProceeding(
                                        index,
                                        "source_status",
                                        e.target.value,
                                      )
                                    }
                                    className="mt-2 w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm"
                                  >
                                    <option value="needs_verification">
                                      Needs verification
                                    </option>
                                    <option value="verified">
                                      Verified
                                    </option>
                                    <option value="unavailable">
                                      Unavailable
                                    </option>
                                  </select>
                                </div>

                                <div className="md:col-span-2">
                                  <label className="text-sm font-semibold">
                                    Outcome
                                  </label>

                                  <textarea
                                    value={item.outcome}
                                    onChange={(e) =>
                                      updateProceeding(
                                        index,
                                        "outcome",
                                        e.target.value,
                                      )
                                    }
                                    rows={3}
                                    className="mt-2 w-full rounded-lg border border-slate-300 px-4 py-3 text-sm"
                                  />
                                </div>

                              </div>

                            </div>
                          ))}

                        </div>
                      )}

                    </div>
                  )
                })}

              </div>

            </section>

            {/* AI ANALYSIS ACTION */}

            <section className="border-t border-slate-200 pt-10">

              <div className="rounded-2xl border-2 border-[#18b8ee]/30 bg-[#eafaff] p-6">

                <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">

                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#0876a8]">
                      CURA AI Case Analysis
                    </p>

                    <h3 className="mt-2 text-xl font-bold text-[#071d41]">
                      Analyze the official proceedings
                    </h3>

                    <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">
                      CURA will read all official sources currently attached
                      to this case and prepare the complete case summary,
                      background, issues, proceedings, timeline, decision,
                      legal principles, implications and current status.
                      You can review and edit everything before publishing.
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={analyzeCase}
                    disabled={
                      !selectedId ||
                      saving ||
                      analyzing ||
                      proceedings.filter(
                        (item) => item.source_url.trim() !== "",
                      ).length === 0
                    }
                    className="shrink-0 rounded-xl bg-gradient-to-r from-[#18b8ee] to-[#087dcc] px-7 py-4 text-sm font-bold text-white shadow-md transition hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {analyzing
                      ? "Analyzing Sources..."
                      : selectedId &&
                          cases.find((item) => item.id === selectedId)
                            ?.ai_analysis_version
                        ? "↻ Re-analyze Case"
                        : "✨ Analyze Case with CURA AI"}
                  </button>

                </div>

                {!selectedId && (
                  <p className="mt-4 text-xs font-medium text-slate-500">
                    Save the case first, then add the official proceedings
                    before starting the analysis.
                  </p>
                )}

                {selectedId &&
                  proceedings.filter(
                    (item) => item.source_url.trim() !== "",
                  ).length === 0 && (
                    <p className="mt-4 text-xs font-medium text-amber-700">
                      Add at least one official proceeding source URL before
                      starting the analysis.
                    </p>
                  )}

                {selectedId && (
                  <div className="mt-5 border-t border-[#18b8ee]/20 pt-4">
                    <span className="text-xs font-bold uppercase tracking-[0.15em] text-slate-400">
                      Analysis status
                    </span>

                    <span className="ml-3 text-sm font-semibold text-[#071d41]">
                      {cases.find((item) => item.id === selectedId)
                        ?.ai_analysis_status || "not_analyzed"}
                    </span>

                    {cases.find((item) => item.id === selectedId)
                      ?.ai_analyzed_at && (
                      <span className="ml-3 text-xs text-slate-500">
                        Last analyzed:{" "}
                        {new Date(
                          cases.find(
                            (item) => item.id === selectedId,
                          )!.ai_analyzed_at!,
                        ).toLocaleString()}
                      </span>
                    )}
                  </div>
                )}

              </div>

            </section>

            {/* MANUAL CONTENT */}

            <section className="border-t border-slate-200 pt-10">

              <h3 className="text-sm font-bold uppercase tracking-[0.2em]">
                Case Analysis
              </h3>

              <p className="mt-2 text-sm text-slate-500">
                These fields can be completed manually or, after AI analysis,
                reviewed and edited by you.
              </p>

              <div className="mt-6 space-y-5">

                {[
                  ["Description", description, setDescription],
                  ["Background", background, setBackground],
                  ["Claim / Arguments", claim, setClaim],
                  ["Decision", decision, setDecision],
                  ["Legal Principle", legalPrinciple, setLegalPrinciple],
                  ["Implications", implications, setImplications],
                ].map(([label, value, setter]) => (
                  <div key={label as string}>
                    <label className="text-sm font-semibold">
                      {label as string}
                    </label>

                    <textarea
                      value={value as string}
                      onChange={(e) =>
                        (setter as React.Dispatch<
                          React.SetStateAction<string>
                        >)(e.target.value)
                      }
                      rows={5}
                      className="mt-2 w-full rounded-lg border border-slate-300 px-4 py-3 text-sm"
                    />
                  </div>
                ))}

              </div>

            </section>

            {/* PUBLICATION */}

            <section className="border-t border-slate-200 pt-10">

              <h3 className="text-sm font-bold uppercase tracking-[0.2em]">
                Publication
              </h3>

              <div className="mt-5 space-y-4">

                <label className="flex items-center gap-3 text-sm font-semibold">
                  <input
                    type="checkbox"
                    checked={published}
                    onChange={(e) => setPublished(e.target.checked)}
                    className="h-5 w-5"
                  />
                  Publish this case on CURA
                </label>

                <label className="flex items-center gap-3 text-sm font-semibold">
                  <input
                    type="checkbox"
                    checked={isPrimary}
                    onChange={(e) => setIsPrimary(e.target.checked)}
                    className="h-5 w-5"
                  />
                  Primary case record
                </label>

              </div>

            </section>

            {/* ACTIONS */}

            <div className="border-t border-slate-200 pt-7">

              <div className="flex flex-wrap gap-3">

                <button
                  type="button"
                  onClick={saveCase}
                  disabled={saving || analyzing}
                  className="rounded-lg bg-[#061b3d] px-6 py-3 text-sm font-semibold text-white disabled:opacity-50"
                >
                  {saving ? "Saving..." : "Save Case"}
                </button>

                {selectedId && (
                  <button
                    type="button"
                    onClick={clearForm}
                    className="rounded-lg border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-700"
                  >
                    New Case
                  </button>
                )}

              </div>

            </div>

          </div>

        </section>

        {/* CASE LIST */}

        <section className="mt-10">

          <div className="mb-5 flex items-center justify-between gap-5">

            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#18b8ee]">
                Existing Cases
              </p>

              <h2 className="mt-1 text-2xl font-bold">
                Legal Case Library
              </h2>
            </div>

            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search cases..."
              className="w-72 rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm"
            />

          </div>

          <div className="space-y-3">

            {filteredCases.map((item) => (
              <div
                key={item.id}
                className="flex flex-col gap-4 rounded-xl border border-slate-200 bg-white p-5 shadow-sm md:flex-row md:items-center md:justify-between"
              >

                <div>
                  <h3 className="font-semibold">
                    {item.title}
                  </h3>

                  <p className="mt-1 text-xs text-slate-500">
                    {item.mira_case_number || "No MIRA case number"}
                  </p>

                  <div className="mt-2 flex flex-wrap gap-2">

                    <span
                      className={`rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-[0.12em] ${
                        item.published
                          ? "bg-emerald-50 text-emerald-700"
                          : "bg-slate-100 text-slate-500"
                      }`}
                    >
                      {item.published ? "Published" : "Draft"}
                    </span>

                    <span className="rounded-full bg-[#eafaff] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-[#0876a8]">
                      AI: {item.ai_analysis_status}
                    </span>

                  </div>
                </div>

                <div className="flex gap-2">

                  <button
                    type="button"
                    onClick={() => editCase(item)}
                    className="rounded-lg bg-[#061b3d] px-4 py-2.5 text-sm font-semibold text-white"
                  >
                    Edit
                  </button>

                  {item.published && (
                    <a
                      href={`/cases/${item.slug}`}
                      className="rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700"
                    >
                      View
                    </a>
                  )}

                  <button
                    type="button"
                    onClick={() => deleteCase(item.id)}
                    className="rounded-lg border border-red-200 bg-white px-4 py-2.5 text-sm font-semibold text-red-600"
                  >
                    Delete
                  </button>

                </div>

              </div>
            ))}

          </div>

        </section>

      </div>

    </main>
  )
}
