"use client"

import { FormEvent, useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"

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
  created_at: string
  updated_at: string
}

const emptyForm = {
  title: "",
  department: "",
  location: "Malé, Maldives",
  employment_type: "Full-time",
  description: "",
  responsibilities: "",
  qualifications: "",
  application_instructions: "",
  closing_date: "",
  published: false,
}

function createSlug(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
}

function formatDate(date: string | null) {
  if (!date) return "No closing date"

  return new Date(date).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  })
}

export default function AdminCareersPage() {
  const supabase = createClient()

  const [careers, setCareers] = useState<Career[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [deleting, setDeleting] = useState<string | null>(null)

  const [editingId, setEditingId] = useState<string | null>(null)

  const [form, setForm] = useState(emptyForm)

  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  useEffect(() => {
    checkAdmin()
  }, [])

  async function checkAdmin() {
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      window.location.href = "/admin/login"
      return
    }

    const { data: isAdmin, error: adminError } =
      await supabase.rpc("is_current_user_admin")

    if (adminError || !isAdmin) {
      await supabase.auth.signOut()
      window.location.href = "/admin/login"
      return
    }

    await loadCareers()
    setLoading(false)
  }

  async function loadCareers() {
    const { data, error } = await supabase
      .from("careers")
      .select("*")
      .order("created_at", {
        ascending: false,
      })

    if (error) {
      setError(error.message)
      return
    }

    setCareers(data ?? [])
  }

  function resetForm() {
    setForm(emptyForm)
    setEditingId(null)
    setError("")
    setSuccess("")
  }

  function startEdit(career: Career) {
    setEditingId(career.id)

    setForm({
      title: career.title ?? "",
      department: career.department ?? "",
      location: career.location ?? "",
      employment_type: career.employment_type ?? "",
      description: career.description ?? "",
      responsibilities: career.responsibilities ?? "",
      qualifications: career.qualifications ?? "",
      application_instructions:
        career.application_instructions ?? "",
      closing_date: career.closing_date ?? "",
      published: career.published ?? false,
    })

    setError("")
    setSuccess("")

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  function updateField(
    field: keyof typeof emptyForm,
    value: string | boolean,
  ) {
    setForm((current) => ({
      ...current,
      [field]: value,
    }))
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    setError("")
    setSuccess("")

    if (!form.title.trim()) {
      setError("Please enter a job title.")
      return
    }

    if (!form.department.trim()) {
      setError("Please enter a department.")
      return
    }

    setSaving(true)

    const slug = createSlug(form.title)

    const payload = {
      title: form.title.trim(),
      slug,
      department: form.department.trim(),
      location: form.location.trim() || null,
      employment_type: form.employment_type.trim() || null,
      description: form.description.trim() || null,
      responsibilities:
        form.responsibilities.trim() || null,
      qualifications:
        form.qualifications.trim() || null,
      application_instructions:
        form.application_instructions.trim() || null,
      closing_date: form.closing_date || null,
      published: form.published,
      updated_at: new Date().toISOString(),
    }

    let operationError = null

    if (editingId) {
      const { error } = await supabase
        .from("careers")
        .update(payload)
        .eq("id", editingId)

      operationError = error
    } else {
      const { error } = await supabase
        .from("careers")
        .insert({
          ...payload,
          created_at: new Date().toISOString(),
        })

      operationError = error
    }

    setSaving(false)

    if (operationError) {
      console.error(operationError)
      setError(operationError.message)
      return
    }

    setSuccess(
      editingId
        ? "Vacancy updated successfully."
        : "Vacancy created successfully.",
    )

    resetForm()

    await loadCareers()
  }

  async function togglePublished(career: Career) {
    setError("")
    setSuccess("")

    const { error } = await supabase
      .from("careers")
      .update({
        published: !career.published,
        updated_at: new Date().toISOString(),
      })
      .eq("id", career.id)

    if (error) {
      setError(error.message)
      return
    }

    setSuccess(
      career.published
        ? "Vacancy unpublished."
        : "Vacancy published.",
    )

    await loadCareers()
  }

  async function deleteCareer(career: Career) {
    const confirmed = window.confirm(
      `Delete "${career.title}"? This cannot be undone.`,
    )

    if (!confirmed) return

    setDeleting(career.id)
    setError("")
    setSuccess("")

    const { error } = await supabase
      .from("careers")
      .delete()
      .eq("id", career.id)

    setDeleting(null)

    if (error) {
      setError(error.message)
      return
    }

    setSuccess("Vacancy deleted successfully.")

    if (editingId === career.id) {
      resetForm()
    }

    await loadCareers()
  }

  async function handleSignOut() {
    await supabase.auth.signOut()
    window.location.href = "/admin/login"
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-[#f4f7fb] flex items-center justify-center">
        <div className="text-center">
          <div className="mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-4 border-slate-200 border-t-[#18b8ee]" />

          <p className="text-sm font-medium text-slate-600">
            Loading Careers Administration...
          </p>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-[#f4f7fb] text-[#071d41]">

      {/* HEADER */}

      <header className="bg-[#061b3d] text-white">

        <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-6 py-4">

          <div className="flex items-center gap-5">

            <div className="flex items-center border-r border-white/15 pr-6">

              <img
                src="/cura-logo.png"
                alt="CURA"
                className="h-12 w-auto object-contain brightness-0 invert"
              />

            </div>

            <div className="hidden sm:block">

              <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-[#18b8ee]">
                CURA Administration
              </p>

              <h1 className="mt-1 text-lg font-semibold text-white">
                Careers
              </h1>

            </div>

          </div>

          <div className="flex items-center gap-3">

            <a
              href="/careers"
              className="hidden rounded-lg border border-white bg-white px-4 py-2.5 text-sm font-semibold !text-[#061b3d] transition hover:bg-[#eafaff] sm:block"
            >
              View Careers
            </a>

            <a
              href="/admin"
              className="hidden rounded-lg border border-[#18b8ee]/60 px-4 py-2.5 text-sm font-semibold text-white transition hover:border-[#18b8ee] hover:bg-[#18b8ee]/10 sm:block"
            >
              Dashboard
            </a>

            <button
              type="button"
              onClick={handleSignOut}
              className="rounded-lg bg-gradient-to-r from-[#18b8ee] to-[#087dcc] px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:from-[#25c5f5] hover:to-[#0b8cda]"
            >
              Sign Out
            </button>

          </div>

        </div>

      </header>

      {/* MAIN */}

      <div className="mx-auto max-w-7xl px-6 py-10 lg:px-8">

        {/* PAGE INTRO */}

        <div className="mb-8">

          <p className="mb-2 text-xs font-bold uppercase tracking-[0.28em] text-[#18b8ee]">
            Human Resources
          </p>

          <h2 className="text-3xl font-bold tracking-tight">
            Manage Careers
          </h2>

          <p className="mt-3 max-w-3xl text-base leading-7 text-slate-600">
            Create and manage career opportunities published on the CURA
            website.
          </p>

        </div>

        {/* MESSAGES */}

        {error && (
          <div className="mb-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        )}

        {success && (
          <div className="mb-6 rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
            {success}
          </div>
        )}

        {/* EDITOR */}

        <section className="rounded-2xl border border-slate-200 bg-white shadow-sm">

          <div className="border-b border-slate-200 px-6 py-5">

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

              <div>

                <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#18b8ee]">
                  {editingId ? "Edit Vacancy" : "New Vacancy"}
                </p>

                <h3 className="mt-1 text-xl font-bold">
                  {editingId
                    ? "Update career opportunity"
                    : "Create a career opportunity"}
                </h3>

              </div>

              {editingId && (
                <button
                  type="button"
                  onClick={resetForm}
                  className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-600 transition hover:bg-slate-50"
                >
                  Cancel Editing
                </button>
              )}

            </div>

          </div>

          <form
            onSubmit={handleSubmit}
            className="space-y-7 p-6"
          >

            {/* BASIC DETAILS */}

            <div>

              <h4 className="text-sm font-bold uppercase tracking-[0.16em] text-[#071d41]">
                Position Details
              </h4>

              <div className="mt-5 grid gap-5 md:grid-cols-2">

                <div className="md:col-span-2">

                  <label className="mb-2 block text-sm font-semibold">
                    Job Title *
                  </label>

                  <input
                    type="text"
                    value={form.title}
                    onChange={(e) =>
                      updateField("title", e.target.value)
                    }
                    placeholder="e.g. Tax Associate"
                    className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-[#18b8ee] focus:ring-2 focus:ring-[#18b8ee]/20"
                    required
                  />

                </div>

                <div>

                  <label className="mb-2 block text-sm font-semibold">
                    Department *
                  </label>

                  <input
                    type="text"
                    value={form.department}
                    onChange={(e) =>
                      updateField("department", e.target.value)
                    }
                    placeholder="e.g. Tax"
                    className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-[#18b8ee] focus:ring-2 focus:ring-[#18b8ee]/20"
                    required
                  />

                </div>

                <div>

                  <label className="mb-2 block text-sm font-semibold">
                    Location
                  </label>

                  <input
                    type="text"
                    value={form.location}
                    onChange={(e) =>
                      updateField("location", e.target.value)
                    }
                    placeholder="Malé, Maldives"
                    className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-[#18b8ee] focus:ring-2 focus:ring-[#18b8ee]/20"
                  />

                </div>

                <div>

                  <label className="mb-2 block text-sm font-semibold">
                    Employment Type
                  </label>

                  <select
                    value={form.employment_type}
                    onChange={(e) =>
                      updateField(
                        "employment_type",
                        e.target.value,
                      )
                    }
                    className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-[#18b8ee] focus:ring-2 focus:ring-[#18b8ee]/20"
                  >
                    <option>Full-time</option>
                    <option>Part-time</option>
                    <option>Contract</option>
                    <option>Internship</option>
                    <option>Temporary</option>
                  </select>

                </div>

                <div>

                  <label className="mb-2 block text-sm font-semibold">
                    Closing Date
                  </label>

                  <input
                    type="date"
                    value={form.closing_date}
                    onChange={(e) =>
                      updateField(
                        "closing_date",
                        e.target.value,
                      )
                    }
                    className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-[#18b8ee] focus:ring-2 focus:ring-[#18b8ee]/20"
                  />

                </div>

              </div>

            </div>

            {/* DESCRIPTION */}

            <div>

              <label className="mb-2 block text-sm font-semibold">
                Description
              </label>

              <textarea
                rows={5}
                value={form.description}
                onChange={(e) =>
                  updateField("description", e.target.value)
                }
                placeholder="Provide a short overview of the position."
                className="w-full resize-y rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm leading-6 outline-none transition focus:border-[#18b8ee] focus:ring-2 focus:ring-[#18b8ee]/20"
              />

            </div>

            {/* RESPONSIBILITIES */}

            <div>

              <label className="mb-2 block text-sm font-semibold">
                Responsibilities
              </label>

              <textarea
                rows={9}
                value={form.responsibilities}
                onChange={(e) =>
                  updateField(
                    "responsibilities",
                    e.target.value,
                  )
                }
                placeholder={"Enter responsibilities. You can use one responsibility per line."}
                className="w-full resize-y rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm leading-6 outline-none transition focus:border-[#18b8ee] focus:ring-2 focus:ring-[#18b8ee]/20"
              />

            </div>

            {/* QUALIFICATIONS */}

            <div>

              <label className="mb-2 block text-sm font-semibold">
                Qualifications
              </label>

              <textarea
                rows={9}
                value={form.qualifications}
                onChange={(e) =>
                  updateField(
                    "qualifications",
                    e.target.value,
                  )
                }
                placeholder={"Enter qualifications and requirements. You can use one item per line."}
                className="w-full resize-y rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm leading-6 outline-none transition focus:border-[#18b8ee] focus:ring-2 focus:ring-[#18b8ee]/20"
              />

            </div>

            {/* APPLICATION */}

            <div>

              <label className="mb-2 block text-sm font-semibold">
                Application Instructions
              </label>

              <textarea
                rows={6}
                value={form.application_instructions}
                onChange={(e) =>
                  updateField(
                    "application_instructions",
                    e.target.value,
                  )
                }
                placeholder="Explain how candidates should apply."
                className="w-full resize-y rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm leading-6 outline-none transition focus:border-[#18b8ee] focus:ring-2 focus:ring-[#18b8ee]/20"
              />

            </div>

            {/* PUBLISH */}

            <div className="rounded-xl border border-slate-200 bg-slate-50 p-5">

              <label className="flex cursor-pointer items-start gap-3">

                <input
                  type="checkbox"
                  checked={form.published}
                  onChange={(e) =>
                    updateField(
                      "published",
                      e.target.checked,
                    )
                  }
                  className="mt-1 h-4 w-4 rounded border-slate-300 text-[#087dcc] focus:ring-[#18b8ee]"
                />

                <span>

                  <span className="block text-sm font-semibold text-[#071d41]">
                    Publish this vacancy
                  </span>

                  <span className="mt-1 block text-xs leading-5 text-slate-500">
                    Published vacancies will appear on the public CURA
                    Careers page.
                  </span>

                </span>

              </label>

            </div>

            {/* SAVE */}

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">

              <button
                type="submit"
                disabled={saving}
                className="rounded-lg bg-[#061b3d] px-6 py-3 text-sm font-semibold !text-white transition hover:bg-[#0b2a55] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {saving
                  ? "Saving..."
                  : editingId
                    ? "Update Vacancy"
                    : "Create Vacancy"}
              </button>

              {!editingId && (
                <button
                  type="button"
                  onClick={resetForm}
                  className="rounded-lg border border-slate-300 px-6 py-3 text-sm font-semibold text-slate-600 transition hover:bg-slate-50"
                >
                  Clear Form
                </button>
              )}

            </div>

          </form>

        </section>

        {/* EXISTING VACANCIES */}

        <section className="mt-10">

          <div className="mb-5">

            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#18b8ee]">
              Published & Draft Vacancies
            </p>

            <h3 className="mt-2 text-2xl font-bold">
              Career Opportunities
            </h3>

          </div>

          {careers.length === 0 ? (

            <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-14 text-center">

              <h4 className="text-lg font-semibold">
                No vacancies yet
              </h4>

              <p className="mt-2 text-sm text-slate-500">
                Create your first career opportunity using the form above.
              </p>

            </div>

          ) : (

            <div className="space-y-4">

              {careers.map((career) => (

                <div
                  key={career.id}
                  className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
                >

                  <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">

                    <div className="min-w-0">

                      <div className="flex flex-wrap items-center gap-2">

                        <span
                          className={`rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-[0.14em] ${
                            career.published
                              ? "bg-emerald-50 text-emerald-700"
                              : "bg-slate-100 text-slate-500"
                          }`}
                        >
                          {career.published
                            ? "Published"
                            : "Draft"}
                        </span>

                        {career.department && (
                          <span className="rounded-full bg-[#EAF7FC] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-[#0876A8]">
                            {career.department}
                          </span>
                        )}

                      </div>

                      <h4 className="mt-4 text-xl font-bold text-[#071d41]">
                        {career.title}
                      </h4>

                      <div className="mt-2 flex flex-wrap gap-x-5 gap-y-1 text-sm text-slate-500">

                        {career.location && (
                          <span>{career.location}</span>
                        )}

                        {career.employment_type && (
                          <span>{career.employment_type}</span>
                        )}

                        <span>
                          Closing:{" "}
                          {formatDate(career.closing_date)}
                        </span>

                      </div>

                    </div>

                    <div className="flex flex-wrap gap-2">

                      <button
                        type="button"
                        onClick={() => startEdit(career)}
                        className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-[#071d41] transition hover:bg-slate-50"
                      >
                        Edit
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          togglePublished(career)
                        }
                        className={`rounded-lg px-4 py-2 text-sm font-semibold transition ${
                          career.published
                            ? "border border-amber-200 bg-amber-50 text-amber-700 hover:bg-amber-100"
                            : "bg-[#061b3d] !text-white hover:bg-[#0b2a55]"
                        }`}
                      >
                        {career.published
                          ? "Unpublish"
                          : "Publish"}
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          deleteCareer(career)
                        }
                        disabled={deleting === career.id}
                        className="rounded-lg border border-red-200 px-4 py-2 text-sm font-semibold text-red-600 transition hover:bg-red-50 disabled:opacity-50"
                      >
                        {deleting === career.id
                          ? "Deleting..."
                          : "Delete"}
                      </button>

                    </div>

                  </div>

                </div>

              ))}

            </div>

          )}

        </section>

      </div>

    </main>
  )
}
