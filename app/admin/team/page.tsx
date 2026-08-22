"use client"

import { FormEvent, useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"

type TeamMember = {
  id: string
  name: string
  position: string
  qualifications: string | null
  short_bio: string | null
  bio: string | null
  photo_url: string | null
  linkedin_url: string | null
  display_order: number
  is_published: boolean
  created_at: string
  updated_at: string
}

type TeamForm = {
  name: string
  position: string
  qualifications: string
  short_bio: string
  bio: string
  photo_url: string
  linkedin_url: string
  display_order: string
  is_published: boolean
}

const emptyForm: TeamForm = {
  name: "",
  position: "",
  qualifications: "",
  short_bio: "",
  bio: "",
  photo_url: "",
  linkedin_url: "",
  display_order: "0",
  is_published: true,
}

export default function AdminTeamPage() {
  const supabase = createClient()

  const [members, setMembers] = useState<TeamMember[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [deleting, setDeleting] = useState<string | null>(null)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [form, setForm] = useState<TeamForm>(emptyForm)

  useEffect(() => {
    checkAdminAndLoad()
  }, [])

  async function checkAdminAndLoad() {
    setLoading(true)
    setError("")

    try {
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

      await loadMembers()
    } catch (err) {
      console.error(err)
      setError("Unable to load the Team management page.")
    } finally {
      setLoading(false)
    }
  }

  async function loadMembers() {
    const { data, error: fetchError } = await supabase
      .from("team_members")
      .select("*")
      .order("display_order", { ascending: true })
      .order("created_at", { ascending: true })

    if (fetchError) {
      console.error(fetchError)
      setError(fetchError.message)
      return
    }

    setMembers((data ?? []) as TeamMember[])
  }

  function openAddForm() {
    setEditingId(null)
    setForm(emptyForm)
    setError("")
    setSuccess("")
    setShowForm(true)
  }

  function openEditForm(member: TeamMember) {
    setEditingId(member.id)

    setForm({
      name: member.name,
      position: member.position,
      qualifications: member.qualifications ?? "",
      short_bio: member.short_bio ?? "",
      bio: member.bio ?? "",
      photo_url: member.photo_url ?? "",
      linkedin_url: member.linkedin_url ?? "",
      display_order: String(member.display_order),
      is_published: member.is_published,
    })

    setError("")
    setSuccess("")
    setShowForm(true)
  }

  function closeForm() {
    if (saving) return

    setShowForm(false)
    setEditingId(null)
    setForm(emptyForm)
  }

  function updateForm<K extends keyof TeamForm>(
    field: K,
    value: TeamForm[K],
  ) {
    setForm((current) => ({
      ...current,
      [field]: value,
    }))
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    setSaving(true)
    setError("")
    setSuccess("")

    const payload = {
      name: form.name.trim(),
      position: form.position.trim(),
      qualifications: form.qualifications.trim() || null,
      short_bio: form.short_bio.trim() || null,
      bio: form.bio.trim() || null,
      photo_url: form.photo_url.trim() || null,
      linkedin_url: form.linkedin_url.trim() || null,
      display_order: Number.parseInt(form.display_order, 10) || 0,
      is_published: form.is_published,
    }

    if (!payload.name) {
      setError("Please enter the team member's name.")
      setSaving(false)
      return
    }

    if (!payload.position) {
      setError("Please enter the team member's position.")
      setSaving(false)
      return
    }

    try {
      if (editingId) {
        const { error: updateError } = await supabase
          .from("team_members")
          .update(payload)
          .eq("id", editingId)

        if (updateError) {
          throw updateError
        }

        setSuccess("Team member updated successfully.")
      } else {
        const { error: insertError } = await supabase
          .from("team_members")
          .insert(payload)

        if (insertError) {
          throw insertError
        }

        setSuccess("Team member added successfully.")
      }

      await loadMembers()

      setShowForm(false)
      setEditingId(null)
      setForm(emptyForm)
    } catch (err: any) {
      console.error(err)
      setError(err?.message ?? "Unable to save team member.")
    } finally {
      setSaving(false)
    }
  }

  async function handleDelete(member: TeamMember) {
    const confirmed = window.confirm(
      `Are you sure you want to delete ${member.name}? This cannot be undone.`,
    )

    if (!confirmed) return

    setDeleting(member.id)
    setError("")
    setSuccess("")

    try {
      const { error: deleteError } = await supabase
        .from("team_members")
        .delete()
        .eq("id", member.id)

      if (deleteError) {
        throw deleteError
      }

      setMembers((current) =>
        current.filter((item) => item.id !== member.id),
      )

      setSuccess(`${member.name} has been deleted.`)
    } catch (err: any) {
      console.error(err)
      setError(err?.message ?? "Unable to delete team member.")
    } finally {
      setDeleting(null)
    }
  }

  async function togglePublished(member: TeamMember) {
    setError("")
    setSuccess("")

    const { error: updateError } = await supabase
      .from("team_members")
      .update({
        is_published: !member.is_published,
      })
      .eq("id", member.id)

    if (updateError) {
      console.error(updateError)
      setError(updateError.message)
      return
    }

    setMembers((current) =>
      current.map((item) =>
        item.id === member.id
          ? {
              ...item,
              is_published: !item.is_published,
            }
          : item,
      ),
    )

    setSuccess(
      `${member.name} is now ${
        !member.is_published ? "published" : "hidden"
      }.`,
    )
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
            Loading Team Management...
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
                Team Management
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="/admin"
              className="hidden rounded-lg border border-white/60 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-white/10 sm:block"
            >
              Admin Dashboard
            </a>

            <a
              href="/team"
              target="_blank"
              rel="noreferrer"
              className="hidden rounded-lg border border-white/60 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-white/10 sm:block"
            >
              View Team
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
        {/* PAGE HEADER */}
        <section className="mb-8">
          <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <div>
              <p className="mb-2 text-xs font-bold uppercase tracking-[0.28em] text-[#18b8ee]">
                Administration
              </p>

              <h2 className="text-3xl font-bold tracking-tight text-[#071d41] md:text-4xl">
                Our Team
              </h2>

              <p className="mt-3 max-w-2xl text-base leading-7 text-slate-600">
                Manage the people, qualifications, positions and professional
                biographies displayed on the CURA Team page.
              </p>
            </div>

            <button
              type="button"
              onClick={openAddForm}
              className="inline-flex items-center justify-center rounded-lg bg-[#061b3d] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#0b2a55]"
            >
              <span className="mr-2 text-lg">+</span>
              Add Team Member
            </button>
          </div>
        </section>

        {/* MESSAGES */}
        {error && (
          <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-5 py-4 text-sm text-red-700">
            {error}
          </div>
        )}

        {success && (
          <div className="mb-6 rounded-xl border border-emerald-200 bg-emerald-50 px-5 py-4 text-sm text-emerald-700">
            {success}
          </div>
        )}

        {/* FORM */}
        {showForm && (
          <section className="mb-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
            <div className="mb-6 flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#18b8ee]">
                  {editingId ? "Edit Profile" : "New Profile"}
                </p>

                <h3 className="mt-2 text-2xl font-bold text-[#071d41]">
                  {editingId
                    ? "Edit Team Member"
                    : "Add Team Member"}
                </h3>
              </div>

              <button
                type="button"
                onClick={closeForm}
                className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-50"
              >
                Cancel
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="grid gap-6 md:grid-cols-2">
                {/* NAME */}
                <div>
                  <label className="mb-2 block text-sm font-semibold text-[#071d41]">
                    Name *
                  </label>

                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) =>
                      updateForm("name", e.target.value)
                    }
                    placeholder="Full name"
                    className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-[#18b8ee] focus:ring-2 focus:ring-[#18b8ee]/20"
                    required
                  />
                </div>

                {/* POSITION */}
                <div>
                  <label className="mb-2 block text-sm font-semibold text-[#071d41]">
                    Position *
                  </label>

                  <input
                    type="text"
                    value={form.position}
                    onChange={(e) =>
                      updateForm("position", e.target.value)
                    }
                    placeholder="e.g. Director"
                    className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-[#18b8ee] focus:ring-2 focus:ring-[#18b8ee]/20"
                    required
                  />
                </div>

                {/* QUALIFICATIONS */}
                <div>
                  <label className="mb-2 block text-sm font-semibold text-[#071d41]">
                    Qualifications
                  </label>

                  <input
                    type="text"
                    value={form.qualifications}
                    onChange={(e) =>
                      updateForm(
                        "qualifications",
                        e.target.value,
                      )
                    }
                    placeholder="e.g. ACCA, MBA"
                    className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-[#18b8ee] focus:ring-2 focus:ring-[#18b8ee]/20"
                  />
                </div>

                {/* DISPLAY ORDER */}
                <div>
                  <label className="mb-2 block text-sm font-semibold text-[#071d41]">
                    Display Order
                  </label>

                  <input
                    type="number"
                    min="0"
                    value={form.display_order}
                    onChange={(e) =>
                      updateForm(
                        "display_order",
                        e.target.value,
                      )
                    }
                    className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-[#18b8ee] focus:ring-2 focus:ring-[#18b8ee]/20"
                  />

                  <p className="mt-1 text-xs text-slate-400">
                    Lower numbers appear first.
                  </p>
                </div>

                {/* PHOTO URL */}
                <div className="md:col-span-2">
                  <label className="mb-2 block text-sm font-semibold text-[#071d41]">
                    Profile Photo URL
                  </label>

                  <input
                    type="url"
                    value={form.photo_url}
                    onChange={(e) =>
                      updateForm("photo_url", e.target.value)
                    }
                    placeholder="https://..."
                    className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-[#18b8ee] focus:ring-2 focus:ring-[#18b8ee]/20"
                  />

                  <p className="mt-1 text-xs text-slate-400">
                    You can add image storage/upload functionality later
                    without changing the team management structure.
                  </p>
                </div>

                {/* SHORT BIO */}
                <div className="md:col-span-2">
                  <label className="mb-2 block text-sm font-semibold text-[#071d41]">
                    Short Biography
                  </label>

                  <textarea
                    value={form.short_bio}
                    onChange={(e) =>
                      updateForm("short_bio", e.target.value)
                    }
                    rows={3}
                    placeholder="Short introduction shown on the Team page."
                    className="w-full resize-y rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-[#18b8ee] focus:ring-2 focus:ring-[#18b8ee]/20"
                  />
                </div>

                {/* FULL BIO */}
                <div className="md:col-span-2">
                  <label className="mb-2 block text-sm font-semibold text-[#071d41]">
                    Professional Biography
                  </label>

                  <textarea
                    value={form.bio}
                    onChange={(e) =>
                      updateForm("bio", e.target.value)
                    }
                    rows={6}
                    placeholder="Full professional biography."
                    className="w-full resize-y rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-[#18b8ee] focus:ring-2 focus:ring-[#18b8ee]/20"
                  />
                </div>

                {/* LINKEDIN */}
                <div>
                  <label className="mb-2 block text-sm font-semibold text-[#071d41]">
                    LinkedIn URL
                  </label>

                  <input
                    type="url"
                    value={form.linkedin_url}
                    onChange={(e) =>
                      updateForm(
                        "linkedin_url",
                        e.target.value,
                      )
                    }
                    placeholder="https://www.linkedin.com/in/..."
                    className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-[#18b8ee] focus:ring-2 focus:ring-[#18b8ee]/20"
                  />
                </div>

                {/* PUBLISHED */}
                <div className="flex items-center md:justify-end">
                  <label className="flex cursor-pointer items-center gap-3">
                    <input
                      type="checkbox"
                      checked={form.is_published}
                      onChange={(e) =>
                        updateForm(
                          "is_published",
                          e.target.checked,
                        )
                      }
                      className="h-5 w-5 rounded border-slate-300 text-[#087dcc] focus:ring-[#18b8ee]"
                    />

                    <span>
                      <span className="block text-sm font-semibold text-[#071d41]">
                        Published
                      </span>

                      <span className="block text-xs text-slate-500">
                        Show this member on the public Team page.
                      </span>
                    </span>
                  </label>
                </div>
              </div>

              {/* FORM ACTIONS */}
              <div className="mt-8 flex flex-col-reverse gap-3 border-t border-slate-100 pt-6 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  onClick={closeForm}
                  disabled={saving}
                  className="rounded-lg border border-slate-300 px-5 py-2.5 text-sm font-semibold text-slate-600 transition hover:bg-slate-50 disabled:opacity-50"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={saving}
                  className="rounded-lg bg-[#061b3d] px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-[#0b2a55] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {saving
                    ? "Saving..."
                    : editingId
                      ? "Save Changes"
                      : "Add Team Member"}
                </button>
              </div>
            </form>
          </section>
        )}

        {/* TEAM MEMBERS */}
        <section>
          <div className="mb-5 flex items-center justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#18b8ee]">
                Team Profiles
              </p>

              <h3 className="mt-2 text-2xl font-bold text-[#071d41]">
                {members.length}{" "}
                {members.length === 1 ? "Member" : "Members"}
              </h3>
            </div>
          </div>

          {members.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-12 text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#eaf8fd] text-2xl text-[#087dcc]">
                ♙
              </div>

              <h4 className="mt-5 text-lg font-bold text-[#071d41]">
                No team members yet
              </h4>

              <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
                Add your first CURA team member to start building the
                public Team page.
              </p>

              <button
                type="button"
                onClick={openAddForm}
                className="mt-5 rounded-lg bg-[#061b3d] px-5 py-2.5 text-sm font-semibold text-white"
              >
                Add Team Member
              </button>
            </div>
          ) : (
            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {members.map((member) => (
                <article
                  key={member.id}
                  className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
                >
                  {/* PHOTO */}
                  <div className="aspect-[4/3] bg-slate-100">
                    {member.photo_url ? (
                      <img
                        src={member.photo_url}
                        alt={member.name}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center text-4xl text-slate-300">
                        ♙
                      </div>
                    )}
                  </div>

                  {/* DETAILS */}
                  <div className="p-6">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="text-sm font-semibold text-[#087dcc]">
                          {member.position}
                        </p>

                        <h4 className="mt-1 text-xl font-bold text-[#071d41]">
                          {member.name}
                        </h4>
                      </div>

                      <span
                        className={`shrink-0 rounded-full px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.12em] ${
                          member.is_published
                            ? "bg-emerald-50 text-emerald-700"
                            : "bg-slate-100 text-slate-500"
                        }`}
                      >
                        {member.is_published
                          ? "Published"
                          : "Hidden"}
                      </span>
                    </div>

                    {member.qualifications && (
                      <p className="mt-2 text-sm font-medium text-slate-500">
                        {member.qualifications}
                      </p>
                    )}

                    {member.short_bio && (
                      <p className="mt-4 line-clamp-3 text-sm leading-6 text-slate-600">
                        {member.short_bio}
                      </p>
                    )}

                    <div className="mt-6 flex flex-wrap gap-2">
                      <button
                        type="button"
                        onClick={() => openEditForm(member)}
                        className="rounded-lg bg-[#061b3d] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#0b2a55]"
                      >
                        Edit
                      </button>

                      <button
                        type="button"
                        onClick={() => togglePublished(member)}
                        className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-600 transition hover:bg-slate-50"
                      >
                        {member.is_published
                          ? "Hide"
                          : "Publish"}
                      </button>

                      <button
                        type="button"
                        onClick={() => handleDelete(member)}
                        disabled={deleting === member.id}
                        className="rounded-lg border border-red-200 px-4 py-2 text-sm font-semibold text-red-600 transition hover:bg-red-50 disabled:opacity-50"
                      >
                        {deleting === member.id
                          ? "Deleting..."
                          : "Delete"}
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>

        {/* NOTICE */}
        <section className="mt-10 rounded-2xl border border-[#b9e8f7] bg-[#effbff] p-6">
          <div className="flex gap-4">
            <div className="mt-0.5 text-xl text-[#087dcc]">ⓘ</div>

            <div>
              <h4 className="font-bold text-[#071d41]">
                Team page management
              </h4>

              <p className="mt-1 text-sm leading-6 text-slate-600">
                Changes made here are reflected on the public CURA Team
                page. Hidden profiles remain in the system but are not
                displayed publicly.
              </p>
            </div>
          </div>
        </section>
      </div>

      {/* FOOTER */}
      <footer className="border-t border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-6 py-6 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} CURA. All rights reserved.
          </p>

          <a
            href="/admin"
            className="font-semibold text-[#071d41] transition hover:text-[#087dcc]"
          >
            ← Back to Administration
          </a>
        </div>
      </footer>
    </main>
  )
}