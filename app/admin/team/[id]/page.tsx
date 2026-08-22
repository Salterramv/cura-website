"use client"

import { FormEvent, useEffect, useState } from "react"
import Link from "next/link"
import { useParams } from "next/navigation"
import { createClient } from "@/lib/supabase/client"

type TeamMember = {
  id: string
  name: string
  position: string
  image_url: string | null
}

type Experience = {
  id: string
  employer: string
  position: string
  start_date: string | null
  end_date: string | null
  description: string | null
  display_order: number
}

type Qualification = {
  id: string
  qualification: string
  institution: string | null
  year: number | null
  description: string | null
  display_order: number
}

type ExperienceForm = {
  employer: string
  position: string
  start_date: string
  end_date: string
  description: string
  display_order: string
}

type QualificationForm = {
  qualification: string
  institution: string
  year: string
  description: string
  display_order: string
}

const emptyExperience: ExperienceForm = {
  employer: "",
  position: "",
  start_date: "",
  end_date: "",
  description: "",
  display_order: "1",
}

const emptyQualification: QualificationForm = {
  qualification: "",
  institution: "",
  year: "",
  description: "",
  display_order: "1",
}

export default function AdminTeamProfessionalDetailsPage() {
  const params = useParams<{ id: string }>()
  const supabase = createClient()

  const [member, setMember] =
    useState<TeamMember | null>(null)

  const [experience, setExperience] =
    useState<Experience[]>([])

  const [qualifications, setQualifications] =
    useState<Qualification[]>([])

  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  const [showExperienceForm, setShowExperienceForm] =
    useState(false)

  const [editingExperienceId, setEditingExperienceId] =
    useState<string | null>(null)

  const [experienceForm, setExperienceForm] =
    useState<ExperienceForm>(emptyExperience)

  const [
    showQualificationForm,
    setShowQualificationForm,
  ] = useState(false)

  const [
    editingQualificationId,
    setEditingQualificationId,
  ] = useState<string | null>(null)

  const [
    qualificationForm,
    setQualificationForm,
  ] = useState<QualificationForm>(
    emptyQualification,
  )

  useEffect(() => {
    loadPage()
  }, [params?.id])

  async function checkAdmin() {
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      window.location.href = "/admin/login"
      return false
    }

    const { data: isAdmin, error: adminError } =
      await supabase.rpc("is_current_user_admin")

    if (adminError || !isAdmin) {
      await supabase.auth.signOut()
      window.location.href = "/admin/login"
      return false
    }

    return true
  }

  async function loadPage() {
    setLoading(true)
    setError("")

    try {
      const isAdmin = await checkAdmin()

      if (!isAdmin || !params?.id) return

      const [
        memberResult,
        experienceResult,
        qualificationResult,
      ] = await Promise.all([
        supabase
          .from("team_members")
          .select(
            "id, name, position, image_url",
          )
          .eq("id", params.id)
          .maybeSingle(),

        supabase
          .from("team_member_experience")
          .select(
            "id, employer, position, start_date, end_date, description, display_order",
          )
          .eq("team_member_id", params.id)
          .order("display_order", {
            ascending: true,
          })
          .order("start_date", {
            ascending: false,
            nullsFirst: false,
          }),

        supabase
          .from("team_member_qualifications")
          .select(
            "id, qualification, institution, year, description, display_order",
          )
          .eq("team_member_id", params.id)
          .order("display_order", {
            ascending: true,
          })
          .order("year", {
            ascending: false,
            nullsFirst: false,
          }),
      ])

      if (memberResult.error) {
        throw memberResult.error
      }

      if (!memberResult.data) {
        setError("Team member not found.")
        return
      }

      if (experienceResult.error) {
        throw experienceResult.error
      }

      if (qualificationResult.error) {
        throw qualificationResult.error
      }

      setMember(
        memberResult.data as TeamMember,
      )

      setExperience(
        (experienceResult.data ??
          []) as Experience[],
      )

      setQualifications(
        (qualificationResult.data ??
          []) as Qualification[],
      )
    } catch (err: any) {
      console.error(err)

      setError(
        err?.message ||
          "Unable to load professional details.",
      )
    } finally {
      setLoading(false)
    }
  }

  function openAddExperience() {
    const nextOrder =
      experience.length > 0
        ? Math.max(
            ...experience.map(
              (item) => item.display_order ?? 0,
            ),
          ) + 1
        : 1

    setExperienceForm({
      ...emptyExperience,
      display_order: String(nextOrder),
    })

    setEditingExperienceId(null)
    setShowExperienceForm(true)
    setError("")
    setSuccess("")
  }

  function openEditExperience(
    item: Experience,
  ) {
    setExperienceForm({
      employer: item.employer,
      position: item.position,
      start_date: item.start_date ?? "",
      end_date: item.end_date ?? "",
      description: item.description ?? "",
      display_order: String(
        item.display_order ?? 1,
      ),
    })

    setEditingExperienceId(item.id)
    setShowExperienceForm(true)
    setError("")
    setSuccess("")
  }

  async function saveExperience(
    event: FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault()

    setSaving(true)
    setError("")
    setSuccess("")

    try {
      if (!experienceForm.employer.trim()) {
        throw new Error(
          "Employer is required.",
        )
      }

      if (!experienceForm.position.trim()) {
        throw new Error(
          "Position is required.",
        )
      }

      const displayOrder = Number(
        experienceForm.display_order,
      )

      if (
        !Number.isFinite(displayOrder) ||
        displayOrder < 1
      ) {
        throw new Error(
          "Display Order must be a valid number.",
        )
      }

      const payload = {
        team_member_id: params.id,
        employer:
          experienceForm.employer.trim(),
        position:
          experienceForm.position.trim(),
        start_date:
          experienceForm.start_date || null,
        end_date:
          experienceForm.end_date || null,
        description:
          experienceForm.description.trim() ||
          null,
        display_order: displayOrder,
      }

      const result = editingExperienceId
        ? await supabase
            .from("team_member_experience")
            .update(payload)
            .eq(
              "id",
              editingExperienceId,
            )
        : await supabase
            .from("team_member_experience")
            .insert(payload)

      if (result.error) {
        throw result.error
      }

      const wasEditing =
        Boolean(editingExperienceId)

      setShowExperienceForm(false)
      setEditingExperienceId(null)
      setExperienceForm(emptyExperience)

      setSuccess(
        wasEditing
          ? "Work experience updated successfully."
          : "Work experience added successfully.",
      )

      await loadPage()
    } catch (err: any) {
      console.error(err)

      setError(
        err?.message ||
          "Unable to save work experience.",
      )
    } finally {
      setSaving(false)
    }
  }

  async function deleteExperience(
    item: Experience,
  ) {
    if (
      !window.confirm(
        `Delete ${item.position} at ${item.employer}?`,
      )
    ) {
      return
    }

    setError("")
    setSuccess("")

    const { error: deleteError } =
      await supabase
        .from("team_member_experience")
        .delete()
        .eq("id", item.id)

    if (deleteError) {
      setError(
        deleteError.message ||
          "Unable to delete work experience.",
      )
      return
    }

    setSuccess(
      "Work experience deleted successfully.",
    )

    await loadPage()
  }

  function openAddQualification() {
    const nextOrder =
      qualifications.length > 0
        ? Math.max(
            ...qualifications.map(
              (item) => item.display_order ?? 0,
            ),
          ) + 1
        : 1

    setQualificationForm({
      ...emptyQualification,
      display_order: String(nextOrder),
    })

    setEditingQualificationId(null)
    setShowQualificationForm(true)
    setError("")
    setSuccess("")
  }

  function openEditQualification(
    item: Qualification,
  ) {
    setQualificationForm({
      qualification: item.qualification,
      institution:
        item.institution ?? "",
      year: item.year
        ? String(item.year)
        : "",
      description:
        item.description ?? "",
      display_order: String(
        item.display_order ?? 1,
      ),
    })

    setEditingQualificationId(item.id)
    setShowQualificationForm(true)
    setError("")
    setSuccess("")
  }

  async function saveQualification(
    event: FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault()

    setSaving(true)
    setError("")
    setSuccess("")

    try {
      if (
        !qualificationForm.qualification.trim()
      ) {
        throw new Error(
          "Qualification is required.",
        )
      }

      const displayOrder = Number(
        qualificationForm.display_order,
      )

      if (
        !Number.isFinite(displayOrder) ||
        displayOrder < 1
      ) {
        throw new Error(
          "Display Order must be a valid number.",
        )
      }

      const year =
        qualificationForm.year.trim()
          ? Number(
              qualificationForm.year,
            )
          : null

      if (
        year !== null &&
        (!Number.isInteger(year) ||
          year < 1900 ||
          year > 2200)
      ) {
        throw new Error(
          "Year must be a valid year.",
        )
      }

      const payload = {
        team_member_id: params.id,
        qualification:
          qualificationForm.qualification.trim(),
        institution:
          qualificationForm.institution.trim() ||
          null,
        year,
        description:
          qualificationForm.description.trim() ||
          null,
        display_order: displayOrder,
      }

      const result =
        editingQualificationId
          ? await supabase
              .from(
                "team_member_qualifications",
              )
              .update(payload)
              .eq(
                "id",
                editingQualificationId,
              )
          : await supabase
              .from(
                "team_member_qualifications",
              )
              .insert(payload)

      if (result.error) {
        throw result.error
      }

      const wasEditing =
        Boolean(editingQualificationId)

      setShowQualificationForm(false)
      setEditingQualificationId(null)
      setQualificationForm(
        emptyQualification,
      )

      setSuccess(
        wasEditing
          ? "Qualification updated successfully."
          : "Qualification added successfully.",
      )

      await loadPage()
    } catch (err: any) {
      console.error(err)

      setError(
        err?.message ||
          "Unable to save qualification.",
      )
    } finally {
      setSaving(false)
    }
  }

  async function deleteQualification(
    item: Qualification,
  ) {
    if (
      !window.confirm(
        `Delete ${item.qualification}?`,
      )
    ) {
      return
    }

    setError("")
    setSuccess("")

    const { error: deleteError } =
      await supabase
        .from(
          "team_member_qualifications",
        )
        .delete()
        .eq("id", item.id)

    if (deleteError) {
      setError(
        deleteError.message ||
          "Unable to delete qualification.",
      )
      return
    }

    setSuccess(
      "Qualification deleted successfully.",
    )

    await loadPage()
  }

  async function handleSignOut() {
    await supabase.auth.signOut()
    window.location.href = "/admin/login"
  }

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#f4f7fb]">
        <div className="text-center">
          <div className="mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-4 border-slate-200 border-t-[#18b8ee]" />

          <p className="text-sm font-medium text-slate-600">
            Loading professional details...
          </p>
        </div>
      </main>
    )
  }

  if (!member) {
    return (
      <main className="min-h-screen bg-[#f4f7fb] text-[#071d41]">
        <header className="bg-[#061b3d] text-white">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
            <img
              src="/cura-logo.png"
              alt="CURA"
              className="h-12 w-auto object-contain brightness-0 invert"
            />

            <button
              type="button"
              onClick={handleSignOut}
              className="rounded-lg bg-[#18b8ee] px-5 py-2.5 text-sm font-semibold"
            >
              Sign Out
            </button>
          </div>
        </header>

        <div className="mx-auto max-w-7xl px-6 py-12">
          <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-red-800">
            {error ||
              "Team member not found."}
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-[#f4f7fb] text-[#071d41]">
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
                Professional Details
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/admin/team"
              className="rounded-lg border border-white/60 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              Team Management
            </Link>

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

      <div className="mx-auto max-w-7xl px-6 py-10 lg:px-8">
        <Link
          href="/admin/team"
          className="mb-8 inline-flex items-center text-sm font-semibold text-slate-600 transition hover:text-[#087dcc]"
        >
          ← Back to Team Management
        </Link>

        <section className="mb-8 flex flex-col gap-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:flex-row sm:items-center">
          <div className="h-28 w-28 shrink-0 overflow-hidden rounded-2xl border border-slate-200 bg-slate-100">
            {member.image_url ? (
              <img
                src={member.image_url}
                alt={member.name}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full items-center justify-center text-slate-400">
                <span className="text-4xl">
                  ▧
                </span>
              </div>
            )}
          </div>

          <div>
            <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#18b8ee]">
              Professional Profile
            </p>

            <h2 className="mt-2 text-3xl font-bold tracking-tight">
              {member.name}
            </h2>

            <p className="mt-1 font-semibold text-[#087dcc]">
              {member.position}
            </p>
          </div>
        </section>

        {success && (
          <div className="mb-6 rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-800">
            <p className="font-semibold">
              Success
            </p>

            <p className="mt-1">
              {success}
            </p>
          </div>
        )}

        {error && (
          <div className="mb-6 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-800">
            <p className="font-semibold">
              Unable to complete request
            </p>

            <p className="mt-1">
              {error}
            </p>
          </div>
        )}

        {/* WORK EXPERIENCE */}
        <section className="mb-10 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#18b8ee]">
                Career
              </p>

              <h3 className="mt-2 text-2xl font-bold">
                Work Experience
              </h3>

              <p className="mt-2 text-sm text-slate-500">
                Add each significant role so it appears
                on the public profile.
              </p>
            </div>

            <button
              type="button"
              onClick={openAddExperience}
              className="rounded-lg bg-[#061b3d] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#0b2a55]"
            >
              + Add Experience
            </button>
          </div>

          {showExperienceForm && (
            <form
              onSubmit={saveExperience}
              className="mt-6 rounded-xl border border-slate-200 bg-slate-50 p-5"
            >
              <div className="grid gap-5 md:grid-cols-2">
                <input
                  value={experienceForm.employer}
                  onChange={(e) =>
                    setExperienceForm(
                      (f) => ({
                        ...f,
                        employer:
                          e.target.value,
                      }),
                    )
                  }
                  placeholder="Employer / organisation"
                  required
                  className="rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm"
                />

                <input
                  value={experienceForm.position}
                  onChange={(e) =>
                    setExperienceForm(
                      (f) => ({
                        ...f,
                        position:
                          e.target.value,
                      }),
                    )
                  }
                  placeholder="Position / title"
                  required
                  className="rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm"
                />

                <div>
                  <label className="mb-2 block text-xs font-semibold text-slate-600">
                    Start date
                  </label>

                  <input
                    type="date"
                    value={
                      experienceForm.start_date
                    }
                    onChange={(e) =>
                      setExperienceForm(
                        (f) => ({
                          ...f,
                          start_date:
                            e.target.value,
                        }),
                      )
                    }
                    className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-xs font-semibold text-slate-600">
                    End date
                  </label>

                  <input
                    type="date"
                    value={
                      experienceForm.end_date
                    }
                    onChange={(e) =>
                      setExperienceForm(
                        (f) => ({
                          ...f,
                          end_date:
                            e.target.value,
                        }),
                      )
                    }
                    className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm"
                  />

                  <p className="mt-1 text-xs text-slate-400">
                    Leave blank for current role.
                  </p>
                </div>

                <input
                  type="number"
                  min="1"
                  value={
                    experienceForm.display_order
                  }
                  onChange={(e) =>
                    setExperienceForm(
                      (f) => ({
                        ...f,
                        display_order:
                          e.target.value,
                      }),
                    )
                  }
                  placeholder="Display order"
                  className="rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm"
                />

                <textarea
                  value={
                    experienceForm.description
                  }
                  onChange={(e) =>
                    setExperienceForm(
                      (f) => ({
                        ...f,
                        description:
                          e.target.value,
                      }),
                    )
                  }
                  placeholder="Responsibilities, achievements or other details"
                  rows={3}
                  className="resize-y rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm md:col-span-2"
                />
              </div>

              <div className="mt-5 flex gap-3">
                <button
                  type="submit"
                  disabled={saving}
                  className="rounded-lg bg-[#061b3d] px-5 py-3 text-sm font-semibold text-white disabled:opacity-50"
                >
                  {saving
                    ? "Saving..."
                    : editingExperienceId
                      ? "Save Changes"
                      : "Add Experience"}
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setShowExperienceForm(
                      false,
                    )
                    setEditingExperienceId(
                      null,
                    )
                    setExperienceForm(
                      emptyExperience,
                    )
                  }}
                  className="rounded-lg border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-700"
                >
                  Cancel
                </button>
              </div>
            </form>
          )}

          <div className="mt-6 space-y-3">
            {experience.length === 0 &&
            !showExperienceForm ? (
              <div className="rounded-xl border border-dashed border-slate-300 p-8 text-center text-sm text-slate-500">
                No work experience has been added yet.
              </div>
            ) : (
              experience.map((item) => (
                <div
                  key={item.id}
                  className="flex flex-col gap-4 rounded-xl border border-slate-200 p-5 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div>
                    <p className="font-semibold">
                      {item.position}
                    </p>

                    <p className="mt-1 text-sm text-[#087dcc]">
                      {item.employer}
                    </p>

                    <p className="mt-1 text-xs text-slate-500">
                      {item.start_date ||
                        "—"}{" "}
                      →{" "}
                      {item.end_date ||
                        "Present"}
                    </p>

                    {item.description && (
                      <p className="mt-2 whitespace-pre-line text-sm leading-6 text-slate-600">
                        {item.description}
                      </p>
                    )}
                  </div>

                  <div className="flex shrink-0 gap-2">
                    <button
                      type="button"
                      onClick={() =>
                        openEditExperience(
                          item,
                        )
                      }
                      className="rounded-lg bg-[#061b3d] px-4 py-2 text-sm font-semibold text-white"
                    >
                      Edit
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        deleteExperience(
                          item,
                        )
                      }
                      className="rounded-lg border border-red-200 px-4 py-2 text-sm font-semibold text-red-600"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </section>

        {/* QUALIFICATIONS */}
        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#18b8ee]">
                Education
              </p>

              <h3 className="mt-2 text-2xl font-bold">
                Qualifications & Education
              </h3>

              <p className="mt-2 text-sm text-slate-500">
                Add qualifications individually for
                the detailed profile.
              </p>
            </div>

            <button
              type="button"
              onClick={openAddQualification}
              className="rounded-lg bg-[#061b3d] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#0b2a55]"
            >
              + Add Qualification
            </button>
          </div>

          {showQualificationForm && (
            <form
              onSubmit={saveQualification}
              className="mt-6 rounded-xl border border-slate-200 bg-slate-50 p-5"
            >
              <div className="grid gap-5 md:grid-cols-2">
                <input
                  value={
                    qualificationForm.qualification
                  }
                  onChange={(e) =>
                    setQualificationForm(
                      (f) => ({
                        ...f,
                        qualification:
                          e.target.value,
                      }),
                    )
                  }
                  placeholder="Qualification / certification"
                  required
                  className="rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm"
                />

                <input
                  value={
                    qualificationForm.institution
                  }
                  onChange={(e) =>
                    setQualificationForm(
                      (f) => ({
                        ...f,
                        institution:
                          e.target.value,
                      }),
                    )
                  }
                  placeholder="Institution / awarding body"
                  className="rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm"
                />

                <input
                  type="number"
                  min="1900"
                  max="2200"
                  value={
                    qualificationForm.year
                  }
                  onChange={(e) =>
                    setQualificationForm(
                      (f) => ({
                        ...f,
                        year: e.target.value,
                      }),
                    )
                  }
                  placeholder="Year"
                  className="rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm"
                />

                <input
                  type="number"
                  min="1"
                  value={
                    qualificationForm.display_order
                  }
                  onChange={(e) =>
                    setQualificationForm(
                      (f) => ({
                        ...f,
                        display_order:
                          e.target.value,
                      }),
                    )
                  }
                  placeholder="Display order"
                  className="rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm"
                />

                <textarea
                  value={
                    qualificationForm.description
                  }
                  onChange={(e) =>
                    setQualificationForm(
                      (f) => ({
                        ...f,
                        description:
                          e.target.value,
                      }),
                    )
                  }
                  placeholder="Optional details"
                  rows={3}
                  className="resize-y rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm md:col-span-2"
                />
              </div>

              <div className="mt-5 flex gap-3">
                <button
                  type="submit"
                  disabled={saving}
                  className="rounded-lg bg-[#061b3d] px-5 py-3 text-sm font-semibold text-white disabled:opacity-50"
                >
                  {saving
                    ? "Saving..."
                    : editingQualificationId
                      ? "Save Changes"
                      : "Add Qualification"}
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setShowQualificationForm(
                      false,
                    )
                    setEditingQualificationId(
                      null,
                    )
                    setQualificationForm(
                      emptyQualification,
                    )
                  }}
                  className="rounded-lg border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-700"
                >
                  Cancel
                </button>
              </div>
            </form>
          )}

          <div className="mt-6 space-y-3">
            {qualifications.length === 0 &&
            !showQualificationForm ? (
              <div className="rounded-xl border border-dashed border-slate-300 p-8 text-center text-sm text-slate-500">
                No structured qualifications have
                been added yet.
              </div>
            ) : (
              qualifications.map((item) => (
                <div
                  key={item.id}
                  className="flex flex-col gap-4 rounded-xl border border-slate-200 p-5 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div>
                    <p className="font-semibold">
                      {item.qualification}
                    </p>

                    {item.institution && (
                      <p className="mt-1 text-sm text-slate-600">
                        {item.institution}
                      </p>
                    )}

                    {item.year && (
                      <p className="mt-1 text-xs font-semibold text-[#087dcc]">
                        {item.year}
                      </p>
                    )}

                    {item.description && (
                      <p className="mt-2 whitespace-pre-line text-sm leading-6 text-slate-600">
                        {item.description}
                      </p>
                    )}
                  </div>

                  <div className="flex shrink-0 gap-2">
                    <button
                      type="button"
                      onClick={() =>
                        openEditQualification(
                          item,
                        )
                      }
                      className="rounded-lg bg-[#061b3d] px-4 py-2 text-sm font-semibold text-white"
                    >
                      Edit
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        deleteQualification(
                          item,
                        )
                      }
                      className="rounded-lg border border-red-200 px-4 py-2 text-sm font-semibold text-red-600"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </section>
      </div>
    </main>
  )
}