"use client"

import { useEffect, useMemo, useState } from "react"
import { createClient } from "@/lib/supabase/client"

type CareerApplication = {
  id: string
  career_id: string
  full_name: string
  email: string
  phone: string | null
  id_number: string | null
  date_of_birth: string | null
  address: string | null
  cover_letter: string | null
  education: string | null
  professional_qualifications: string | null
  years_of_experience: number | null
  current_employer: string | null
  current_position: string | null
  expected_salary: string | null
  notice_period: string | null
  linkedin_url: string | null
  portfolio_url: string | null
  additional_information: string | null
  status: string
  admin_notes: string | null
  applicant_email_sent: boolean
  internal_email_sent: boolean
  created_at: string
  updated_at: string
  career?: { title: string } | { title: string }[] | null
}

type ApplicationDocument = {
  id: string
  document_type: string
  original_file_name: string
  storage_path: string
  mime_type: string | null
  file_size: number | null
  created_at: string
}

const STATUSES = [
  ["new", "New"],
  ["under_review", "Under Review"],
  ["shortlisted", "Shortlisted"],
  ["interview", "Interview"],
  ["selected", "Selected"],
  ["rejected", "Rejected"],
] as const

function vacancyTitle(application: CareerApplication) {
  return (
    (Array.isArray(application.career)
      ? application.career[0]?.title
      : application.career?.title) || "Unknown vacancy"
  )
}

function statusLabel(status: string) {
  return STATUSES.find(([value]) => value === status)?.[1] || status
}

function dateText(value: string | null) {
  return value ? new Date(value).toLocaleDateString("en-GB") : "Not provided"
}

function dateTimeText(value: string) {
  return new Date(value).toLocaleString("en-GB")
}

function fileSize(value: number | null) {
  if (!value) return ""
  if (value < 1024) return `${value} B`
  if (value < 1024 * 1024) return `${Math.round(value / 1024)} KB`
  return `${(value / (1024 * 1024)).toFixed(1)} MB`
}

function Field({
  label,
  value,
}: {
  label: string
  value: string | number | null | undefined
}) {
  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
        {label}
      </p>
      <p className="mt-1 whitespace-pre-wrap break-words text-sm text-slate-700">
        {value === null || value === undefined || value === ""
          ? "Not provided"
          : String(value)}
      </p>
    </div>
  )
}

export default function CareerApplicationsPanel() {
  const supabase = createClient()
  const [applications, setApplications] = useState<CareerApplication[]>([])
  const [selected, setSelected] = useState<CareerApplication | null>(null)
  const [documents, setDocuments] = useState<ApplicationDocument[]>([])
  const [loading, setLoading] = useState(true)
  const [documentsLoading, setDocumentsLoading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [openingDocument, setOpeningDocument] = useState("")
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [search, setSearch] = useState("")
  const [filter, setFilter] = useState("all")
  const [editStatus, setEditStatus] = useState("new")
  const [editNotes, setEditNotes] = useState("")

  useEffect(() => {
    loadApplications()
  }, [])

  async function loadApplications() {
    setLoading(true)
    setError("")
    const { data, error: loadError } = await supabase
      .from("career_applications")
      .select(`
        id, career_id, full_name, email, phone, id_number, date_of_birth,
        address, cover_letter, education, professional_qualifications,
        years_of_experience, current_employer, current_position,
        expected_salary, notice_period, linkedin_url, portfolio_url,
        additional_information, status, admin_notes, applicant_email_sent,
        internal_email_sent, created_at, updated_at,
        career:careers ( title )
      `)
      .order("created_at", { ascending: false })

    if (loadError) setError(loadError.message)
    else setApplications((data ?? []) as CareerApplication[])
    setLoading(false)
  }

  async function openApplication(application: CareerApplication) {
    setSelected(application)
    setEditStatus(application.status)
    setEditNotes(application.admin_notes || "")
    setDocuments([])
    setSuccess("")
    setError("")
    setDocumentsLoading(true)

    const { data, error: docError } = await supabase
      .from("career_application_documents")
      .select(`
        id, document_type, original_file_name, storage_path,
        mime_type, file_size, created_at
      `)
      .eq("application_id", application.id)
      .order("created_at", { ascending: true })

    if (docError) setError(docError.message)
    else setDocuments((data ?? []) as ApplicationDocument[])
    setDocumentsLoading(false)
  }

  async function saveApplication() {
    if (!selected) return
    setSaving(true)
    setError("")
    setSuccess("")

    const { data, error: updateError } = await supabase
      .from("career_applications")
      .update({
        status: editStatus,
        admin_notes: editNotes.trim() || null,
      })
      .eq("id", selected.id)
      .select(`
        id, career_id, full_name, email, phone, id_number, date_of_birth,
        address, cover_letter, education, professional_qualifications,
        years_of_experience, current_employer, current_position,
        expected_salary, notice_period, linkedin_url, portfolio_url,
        additional_information, status, admin_notes, applicant_email_sent,
        internal_email_sent, created_at, updated_at,
        career:careers ( title )
      `)
      .single()

    if (updateError) {
      setError(updateError.message)
    } else if (data) {
      const updated = data as CareerApplication
      setSelected(updated)
      setApplications((items) =>
        items.map((item) => (item.id === updated.id ? updated : item))
      )
      setSuccess("Application updated successfully.")
    }
    setSaving(false)
  }

  async function openDocument(document: ApplicationDocument) {
    setOpeningDocument(document.id)
    setError("")
    const { data, error: urlError } = await supabase.storage
      .from("career-applications")
      .createSignedUrl(document.storage_path, 300)

    if (urlError || !data?.signedUrl) {
      setError(urlError?.message || "Unable to open document.")
    } else {
      window.open(data.signedUrl, "_blank", "noopener,noreferrer")
    }
    setOpeningDocument("")
  }

  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase()
    return applications.filter((application) => {
      const matchesSearch =
        !query ||
        application.full_name.toLowerCase().includes(query) ||
        application.email.toLowerCase().includes(query) ||
        vacancyTitle(application).toLowerCase().includes(query)
      return matchesSearch && (filter === "all" || application.status === filter)
    })
  }, [applications, search, filter])

  if (selected) {
    return (
      <section className="rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="flex flex-col gap-4 border-b border-slate-200 px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <button
              type="button"
              onClick={() => setSelected(null)}
              className="mb-2 text-sm font-medium text-cyan-700 hover:text-cyan-900"
            >
              ← Back to applications
            </button>
            <h2 className="text-2xl font-semibold text-slate-900">{selected.full_name}</h2>
            <p className="mt-1 text-sm text-slate-500">
              {vacancyTitle(selected)} · Applied {dateTimeText(selected.created_at)}
            </p>
          </div>
          <span className="w-fit rounded-full bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700">
            {statusLabel(editStatus)}
          </span>
        </div>

        <div className="grid gap-6 p-6 lg:grid-cols-[1fr_340px]">
          <div className="space-y-6">
            {error && <div className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div>}
            {success && <div className="rounded-xl bg-emerald-50 px-4 py-3 text-sm text-emerald-700">{success}</div>}

            <div className="rounded-xl border border-slate-200 p-5">
              <h3 className="font-semibold text-slate-900">Applicant Information</h3>
              <div className="mt-4 grid gap-5 sm:grid-cols-2">
                <Field label="Full name" value={selected.full_name} />
                <Field label="Email" value={selected.email} />
                <Field label="Phone" value={selected.phone} />
                <Field label="ID number" value={selected.id_number} />
                <Field label="Date of birth" value={dateText(selected.date_of_birth)} />
                <Field label="Address" value={selected.address} />
              </div>
            </div>

            <div className="rounded-xl border border-slate-200 p-5">
              <h3 className="font-semibold text-slate-900">Professional Information</h3>
              <div className="mt-4 grid gap-5 sm:grid-cols-2">
                <Field label="Current employer" value={selected.current_employer} />
                <Field label="Current position" value={selected.current_position} />
                <Field label="Years of experience" value={selected.years_of_experience} />
                <Field label="Notice period" value={selected.notice_period} />
                <Field label="Expected salary" value={selected.expected_salary} />
                <Field label="Professional qualifications" value={selected.professional_qualifications} />
                <Field label="Education" value={selected.education} />
              </div>
            </div>

            <div className="rounded-xl border border-slate-200 p-5">
              <h3 className="font-semibold text-slate-900">Application</h3>
              <div className="mt-4 space-y-5">
                <Field label="Cover letter" value={selected.cover_letter} />
                <Field label="Additional information" value={selected.additional_information} />
                <div className="grid gap-5 sm:grid-cols-2">
                  <Field label="LinkedIn" value={selected.linkedin_url} />
                  <Field label="Portfolio" value={selected.portfolio_url} />
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-slate-200 p-5">
              <h3 className="font-semibold text-slate-900">Supporting Documents</h3>
              {documentsLoading ? (
                <p className="mt-4 text-sm text-slate-500">Loading documents...</p>
              ) : documents.length === 0 ? (
                <p className="mt-4 text-sm text-slate-500">No documents were submitted.</p>
              ) : (
                <div className="mt-4 divide-y divide-slate-100">
                  {documents.map((document) => (
                    <div key={document.id} className="flex flex-col gap-3 py-3 sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        <p className="text-sm font-medium text-slate-800">{document.original_file_name}</p>
                        <p className="text-xs text-slate-400">
                          {document.document_type}{document.file_size ? ` · ${fileSize(document.file_size)}` : ""}
                        </p>
                      </div>
                      <button
                        type="button"
                        disabled={openingDocument === document.id}
                        onClick={() => openDocument(document)}
                        className="w-fit rounded-lg border border-cyan-200 px-3 py-2 text-sm font-medium text-cyan-700 hover:bg-cyan-50 disabled:opacity-50"
                      >
                        {openingDocument === document.id ? "Opening..." : "View document"}
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <aside className="h-fit rounded-xl border border-slate-200 bg-slate-50 p-5 lg:sticky lg:top-6">
            <h3 className="font-semibold text-slate-900">Application Management</h3>
            <div className="mt-5 space-y-5">
              <div>
                <label className="text-sm font-medium text-slate-700">Recruitment status</label>
                <select
                  value={editStatus}
                  onChange={(event) => setEditStatus(event.target.value)}
                  className="mt-2 w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm"
                >
                  {STATUSES.map(([value, label]) => (
                    <option key={value} value={value}>{label}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-sm font-medium text-slate-700">Internal notes</label>
                <textarea
                  value={editNotes}
                  onChange={(event) => setEditNotes(event.target.value)}
                  rows={8}
                  placeholder="Add private notes for the recruitment team..."
                  className="mt-2 w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm"
                />
              </div>

              <button
                type="button"
                onClick={saveApplication}
                disabled={saving}
                className="w-full rounded-lg bg-cyan-700 px-4 py-2.5 text-sm font-semibold text-white hover:bg-cyan-800 disabled:opacity-50"
              >
                {saving ? "Saving..." : "Save Changes"}
              </button>

              <div className="border-t border-slate-200 pt-4 text-xs text-slate-500">
                <p>Applicant email sent: {selected.applicant_email_sent ? "Yes" : "No"}</p>
                <p className="mt-1">Internal email sent: {selected.internal_email_sent ? "Yes" : "No"}</p>
                <p className="mt-1">Last updated: {dateTimeText(selected.updated_at)}</p>
              </div>
            </div>
          </aside>
        </div>
      </section>
    )
  }

  return (
    <section className="rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="border-b border-slate-200 px-6 py-5">
        <h2 className="text-xl font-semibold text-slate-900">Job Application Management</h2>
        <p className="mt-1 text-sm text-slate-500">Review, manage and track applications received through the CURA website.</p>

        <div className="mt-5 grid gap-3 md:grid-cols-[1fr_190px]">
          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search applicant, email or vacancy..."
            className="rounded-lg border border-slate-300 px-3 py-2.5 text-sm"
          />
          <select
            value={filter}
            onChange={(event) => setFilter(event.target.value)}
            className="rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm"
          >
            <option value="all">All statuses</option>
            {STATUSES.map(([value, label]) => <option key={value} value={value}>{label}</option>)}
          </select>
        </div>
      </div>

      <div className="p-6">
        {loading ? (
          <p className="text-sm text-slate-500">Loading applications...</p>
        ) : error ? (
          <div className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div>
        ) : filtered.length === 0 ? (
          <div className="rounded-xl border border-dashed border-slate-300 px-5 py-10 text-center">
            <p className="font-medium text-slate-700">No applications found.</p>
            <p className="mt-1 text-sm text-slate-500">Try changing the search or status filter.</p>
          </div>
        ) : (
          <div className="overflow-hidden rounded-xl border border-slate-200">
            <div className="divide-y divide-slate-200">
              {filtered.map((application) => (
                <button
                  key={application.id}
                  type="button"
                  onClick={() => openApplication(application)}
                  className="flex w-full flex-col gap-3 p-4 text-left transition hover:bg-slate-50 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div className="min-w-0">
                    <p className="font-semibold text-slate-900">{application.full_name}</p>
                    <p className="mt-1 text-sm text-slate-500">{application.email}</p>
                    <p className="mt-1 text-xs text-slate-400">
                      {vacancyTitle(application)} · {dateText(application.created_at)}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700">
                      {statusLabel(application.status)}
                    </span>
                    <span className="text-sm font-medium text-cyan-700">Review →</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
