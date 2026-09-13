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
  application_id: string
  document_type: string
  original_file_name: string
  storage_path: string
  mime_type: string | null
  file_size: number | null
  created_at: string
}

const STATUS_OPTIONS = [
  { value: "new", label: "New" },
  { value: "under_review", label: "Under Review" },
  { value: "shortlisted", label: "Shortlisted" },
  { value: "interview", label: "Interview" },
  { value: "selected", label: "Selected" },
  { value: "rejected", label: "Rejected" },
]

function vacancyTitle(application: CareerApplication) {
  return (
    (Array.isArray(application.career)
      ? application.career[0]?.title
      : application.career?.title) || "Unknown vacancy"
  )
}

function display(value: string | number | null | undefined) {
  return value === null || value === undefined || value === "" ? "—" : String(value)
}

function formatDate(value: string | null | undefined) {
  if (!value) return "—"
  return new Date(value).toLocaleDateString("en-GB")
}

function formatFileSize(value: number | null) {
  if (!value) return "—"
  if (value < 1024) return `${value} B`
  if (value < 1024 * 1024) return `${Math.round(value / 1024)} KB`
  return `${(value / (1024 * 1024)).toFixed(1)} MB`
}

export default function CareerApplicationsPanel() {
  const supabase = createClient()
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [applications, setApplications] = useState<CareerApplication[]>([])
  const [selected, setSelected] = useState<CareerApplication | null>(null)
  const [documents, setDocuments] = useState<ApplicationDocument[]>([])
  const [documentsLoading, setDocumentsLoading] = useState(false)
  const [search, setSearch] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [status, setStatus] = useState("new")
  const [notes, setNotes] = useState("")
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  useEffect(() => {
    loadApplications()
  }, [])

  async function loadApplications() {
    setLoading(true)
    setError("")

    const { data, error: loadError } = await supabase
      .from("career_applications")
      .select(`
        id,
        career_id,
        full_name,
        email,
        phone,
        id_number,
        date_of_birth,
        address,
        cover_letter,
        education,
        professional_qualifications,
        years_of_experience,
        current_employer,
        current_position,
        expected_salary,
        notice_period,
        linkedin_url,
        portfolio_url,
        additional_information,
        status,
        admin_notes,
        applicant_email_sent,
        internal_email_sent,
        created_at,
        updated_at,
        career:careers (
          title
        )
      `)
      .order("created_at", { ascending: false })

    if (loadError) {
      setError(loadError.message)
      setApplications([])
    } else {
      setApplications((data ?? []) as CareerApplication[])
    }

    setLoading(false)
  }

  async function openApplication(application: CareerApplication) {
    setSelected(application)
    setStatus(application.status)
    setNotes(application.admin_notes || "")
    setSuccess("")
    setError("")
    setDocuments([])
    setDocumentsLoading(true)

    const { data, error: documentError } = await supabase
      .from("career_application_documents")
      .select(`
        id,
        application_id,
        document_type,
        original_file_name,
        storage_path,
        mime_type,
        file_size,
        created_at
      `)
      .eq("application_id", application.id)
      .order("created_at", { ascending: true })

    if (documentError) {
      setError(documentError.message)
    } else {
      setDocuments((data ?? []) as ApplicationDocument[])
    }

    setDocumentsLoading(false)
  }

  async function saveChanges() {
    if (!selected) return

    setSaving(true)
    setError("")
    setSuccess("")

    const { data, error: updateError } = await supabase
      .from("career_applications")
      .update({
        status,
        admin_notes: notes,
        updated_at: new Date().toISOString(),
      })
      .eq("id", selected.id)
      .select(`
        id,
        career_id,
        full_name,
        email,
        phone,
        id_number,
        date_of_birth,
        address,
        cover_letter,
        education,
        professional_qualifications,
        years_of_experience,
        current_employer,
        current_position,
        expected_salary,
        notice_period,
        linkedin_url,
        portfolio_url,
        additional_information,
        status,
        admin_notes,
        applicant_email_sent,
        internal_email_sent,
        created_at,
        updated_at,
        career:careers (
          title
        )
      `)
      .single()

    if (updateError) {
      setError(updateError.message)
    } else {
      const updated = data as CareerApplication
      setSelected(updated)
      setApplications((current) =>
        current.map((item) => (item.id === updated.id ? updated : item))
      )
      setSuccess("Application updated successfully.")
    }

    setSaving(false)
  }

  async function openDocument(document: ApplicationDocument) {
    setError("")

    const { data, error: signedUrlError } = await supabase.storage
      .from("career-applications")
      .createSignedUrl(document.storage_path, 300)

    if (signedUrlError || !data?.signedUrl) {
      setError(signedUrlError?.message || "Unable to open this document.")
      return
    }

    window.open(data.signedUrl, "_blank", "noopener,noreferrer")
  }

  function closeApplication() {
    setSelected(null)
    setDocuments([])
    setError("")
    setSuccess("")
  }

  const filteredApplications = useMemo(() => {
    const term = search.trim().toLowerCase()

    return applications.filter((application) => {
      const matchesStatus =
        statusFilter === "all" || application.status === statusFilter

      const matchesSearch =
        !term ||
        application.full_name.toLowerCase().includes(term) ||
        application.email.toLowerCase().includes(term) ||
        vacancyTitle(application).toLowerCase().includes(term)

      return matchesStatus && matchesSearch
    })
  }, [applications, search, statusFilter])

  if (selected) {
    return (
      <section className="rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-200 px-6 py-5">
          <button
            type="button"
            onClick={closeApplication}
            className="mb-4 text-sm font-medium text-sky-600 hover:text-sky-700"
          >
            ← Back to applications
          </button>

          <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-sky-500">
                Job Application
              </p>
              <h2 className="mt-2 text-2xl font-semibold text-slate-900">
                {selected.full_name}
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                {vacancyTitle(selected)} · Applied {formatDate(selected.created_at)}
              </p>
            </div>

            <span className="w-fit rounded-full bg-slate-100 px-3 py-1.5 text-xs font-semibold capitalize text-slate-700">
              {status.replace("_", " ")}
            </span>
          </div>
        </div>

        <div className="grid gap-6 px-6 py-6 lg:grid-cols-3">
          <div className="space-y-6 lg:col-span-2">
            <div className="rounded-xl border border-slate-200 p-5">
              <h3 className="text-lg font-semibold text-slate-900">Applicant Details</h3>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <Info label="Full name" value={selected.full_name} />
                <Info label="Email" value={selected.email} />
                <Info label="Phone" value={selected.phone} />
                <Info label="ID number" value={selected.id_number} />
                <Info label="Date of birth" value={formatDate(selected.date_of_birth)} />
                <Info label="Address" value={selected.address} />
                <Info label="Current position" value={selected.current_position} />
                <Info label="Current employer" value={selected.current_employer} />
                <Info label="Years of experience" value={selected.years_of_experience} />
                <Info label="Notice period" value={selected.notice_period} />
                <Info label="Expected salary" value={selected.expected_salary} />
                <Info label="Professional qualifications" value={selected.professional_qualifications} />
                <Info label="Education" value={selected.education} />
                <Info label="LinkedIn" value={selected.linkedin_url} />
                <Info label="Portfolio" value={selected.portfolio_url} />
              </div>
            </div>

            <TextSection title="Cover Letter" value={selected.cover_letter} />
            <TextSection title="Additional Information" value={selected.additional_information} />

            <div className="rounded-xl border border-slate-200 p-5">
              <h3 className="text-lg font-semibold text-slate-900">Supporting Documents</h3>

              {documentsLoading && (
                <p className="mt-3 text-sm text-slate-500">Loading documents...</p>
              )}

              {!documentsLoading && documents.length === 0 && (
                <p className="mt-3 text-sm text-slate-500">
                  No supporting documents were submitted.
                </p>
              )}

              {!documentsLoading && documents.length > 0 && (
                <div className="mt-4 space-y-2">
                  {documents.map((document) => (
                    <div
                      key={document.id}
                      className="flex flex-col gap-3 rounded-lg border border-slate-200 p-3 sm:flex-row sm:items-center sm:justify-between"
                    >
                      <div className="min-w-0">
                        <p className="truncate text-sm font-medium text-slate-900">
                          {document.original_file_name}
                        </p>
                        <p className="mt-1 text-xs text-slate-500">
                          {document.document_type} · {formatFileSize(document.file_size)}
                        </p>
                      </div>

                      <button
                        type="button"
                        onClick={() => openDocument(document)}
                        className="w-fit rounded-lg border border-slate-300 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
                      >
                        View document
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <aside className="space-y-5">
            <div className="rounded-xl border border-slate-200 p-5">
              <h3 className="text-lg font-semibold text-slate-900">Manage Application</h3>

              <label className="mt-4 block text-sm font-medium text-slate-700">
                Recruitment status
              </label>
              <select
                value={status}
                onChange={(event) => setStatus(event.target.value)}
                className="mt-2 w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none focus:border-sky-500"
              >
                {STATUS_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>

              <label className="mt-5 block text-sm font-medium text-slate-700">
                Internal notes
              </label>
              <textarea
                value={notes}
                onChange={(event) => setNotes(event.target.value)}
                rows={7}
                placeholder="Add internal recruitment notes..."
                className="mt-2 w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm text-slate-900 outline-none focus:border-sky-500"
              />

              <button
                type="button"
                disabled={saving}
                onClick={saveChanges}
                className="mt-4 w-full rounded-lg bg-sky-500 px-4 py-2.5 text-sm font-semibold text-white hover:bg-sky-600 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {saving ? "Saving..." : "Save Changes"}
              </button>

              {success && (
                <p className="mt-3 rounded-lg bg-emerald-50 px-3 py-2 text-sm text-emerald-700">
                  {success}
                </p>
              )}

              {error && (
                <p className="mt-3 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">
                  {error}
                </p>
              )}
            </div>

            <div className="rounded-xl border border-slate-200 p-5">
              <h3 className="text-lg font-semibold text-slate-900">Email Status</h3>
              <div className="mt-4 space-y-3 text-sm">
                <StatusRow label="Applicant acknowledgement" sent={selected.applicant_email_sent} />
                <StatusRow label="Internal notification" sent={selected.internal_email_sent} />
              </div>
            </div>
          </aside>
        </div>
      </section>
    )
  }

  return (
    <section className="rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="px-6 py-5">
        <h2 className="text-xl font-semibold text-slate-900">Job Application Management</h2>
        <p className="mt-1 text-sm text-slate-500">
          Review applications, supporting documents, recruitment status and internal notes.
        </p>

        {loading && (
          <p className="mt-4 text-sm text-slate-500">Loading applications...</p>
        )}

        {!loading && error && !selected && (
          <p className="mt-4 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </p>
        )}

        {!loading && (
          <>
            <div className="mt-5 flex flex-col gap-3 md:flex-row">
              <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search applicant, email or vacancy..."
                className="min-w-0 flex-1 rounded-lg border border-slate-300 px-3 py-2.5 text-sm text-slate-900 outline-none focus:border-sky-500"
              />

              <select
                value={statusFilter}
                onChange={(event) => setStatusFilter(event.target.value)}
                className="rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none focus:border-sky-500"
              >
                <option value="all">All statuses</option>
                {STATUS_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            <p className="mt-4 text-sm text-slate-600">
              {filteredApplications.length} of {applications.length} application
              {applications.length === 1 ? "" : "s"} shown.
            </p>

            {filteredApplications.length === 0 && (
              <div className="mt-6 rounded-xl border border-dashed border-slate-300 px-5 py-10 text-center text-sm text-slate-500">
                No applications match your search or filter.
              </div>
            )}

            {filteredApplications.length > 0 && (
              <div className="mt-6 space-y-3">
                {filteredApplications.map((application) => (
                  <button
                    key={application.id}
                    type="button"
                    onClick={() => openApplication(application)}
                    className="flex w-full flex-col gap-3 rounded-xl border border-slate-200 p-4 text-left transition hover:border-sky-400 hover:bg-sky-50/40 sm:flex-row sm:items-center sm:justify-between"
                  >
                    <div className="min-w-0">
                      <p className="font-semibold text-slate-900">
                        {application.full_name}
                      </p>
                      <p className="mt-1 text-sm text-slate-500">
                        {application.email}
                      </p>
                      <p className="mt-1 text-xs text-slate-400">
                        {vacancyTitle(application)} · {formatDate(application.created_at)}
                      </p>
                    </div>

                    <div className="flex shrink-0 items-center gap-3">
                      <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium capitalize text-slate-700">
                        {application.status.replace("_", " ")}
                      </span>
                      <span className="text-sm font-medium text-sky-600">
                        Review →
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </section>
  )
}

function Info({
  label,
  value,
}: {
  label: string
  value: string | number | null | undefined
}) {
  return (
    <div>
      <p className="text-xs font-medium uppercase tracking-wide text-slate-400">{label}</p>
      <p className="mt-1 break-words text-sm text-slate-800">{display(value)}</p>
    </div>
  )
}

function TextSection({
  title,
  value,
}: {
  title: string
  value: string | null
}) {
  return (
    <div className="rounded-xl border border-slate-200 p-5">
      <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
      <p className="mt-3 whitespace-pre-wrap text-sm leading-6 text-slate-700">
        {display(value)}
      </p>
    </div>
  )
}

function StatusRow({
  label,
  sent,
}: {
  label: string
  sent: boolean
}) {
  return (
    <div className="flex items-center justify-between gap-3">
      <span className="text-slate-600">{label}</span>
      <span
        className={
          sent
            ? "rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-700"
            : "rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-500"
        }
      >
        {sent ? "Sent" : "Not sent"}
      </span>
    </div>
  )
}
