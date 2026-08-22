"use client"

import { useEffect, useState, type ChangeEvent, type FormEvent } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"

type TeamMember = {
  id: string
  name: string
  position: string
  qualifications: string | null
  display_order: number | null
  image_url: string | null
  short_bio: string | null
  professional_bio: string | null
  linkedin_url: string | null
  published: boolean
  created_at?: string
  updated_at?: string
}

type TeamForm = {
  name: string
  position: string
  qualifications: string
  display_order: string
  image_url: string
  short_bio: string
  professional_bio: string
  linkedin_url: string
  published: boolean
}

const emptyForm: TeamForm = {
  name: "",
  position: "",
  qualifications: "",
  display_order: "1",
  image_url: "",
  short_bio: "",
  professional_bio: "",
  linkedin_url: "",
  published: true,
}

const MAX_IMAGE_SIZE = 5 * 1024 * 1024
const ALLOWED_IMAGE_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
]

export default function AdminTeamPage() {
  const router = useRouter()
  const supabase = createClient()

  const [members, setMembers] = useState<TeamMember[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [uploadingImage, setUploadingImage] = useState(false)
  const [deletingImage, setDeletingImage] = useState(false)

  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)

  const [form, setForm] = useState<TeamForm>(emptyForm)
  const [imagePreview, setImagePreview] = useState<string | null>(null)

  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  /*
   * ============================================================
   * ADMIN CHECK + INITIAL LOAD
   * ============================================================
   */

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
      setError("Unable to load team members.")
    } finally {
      setLoading(false)
    }
  }

  /*
   * ============================================================
   * LOAD TEAM MEMBERS
   * ============================================================
   */

  async function loadMembers() {
    const { data, error: loadError } = await supabase
      .from("team_members")
      .select("*")
      .order("display_order", {
        ascending: true,
      })

    if (loadError) {
      console.error(loadError)
      throw loadError
    }

    setMembers((data ?? []) as TeamMember[])
  }

  /*
   * ============================================================
   * FORM HELPERS
   * ============================================================
   */

  function updateForm<K extends keyof TeamForm>(
    field: K,
    value: TeamForm[K],
  ) {
    setForm((current) => ({
      ...current,
      [field]: value,
    }))
  }

  function resetForm() {
    setForm(emptyForm)
    setImagePreview(null)
    setEditingId(null)
    setShowForm(false)
    setError("")
  }

  function openAddForm() {
    setSuccess("")
    setError("")

    const nextOrder =
      members.length > 0
        ? Math.max(
            ...members.map((member) => member.display_order ?? 0),
          ) + 1
        : 1

    setForm({
      ...emptyForm,
      display_order: String(nextOrder),
    })

    setImagePreview(null)
    setEditingId(null)
    setShowForm(true)

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  function openEditForm(member: TeamMember) {
    setSuccess("")
    setError("")

    setEditingId(member.id)

    setForm({
      name: member.name ?? "",
      position: member.position ?? "",
      qualifications: member.qualifications ?? "",
      display_order: String(member.display_order ?? 1),
      image_url: member.image_url ?? "",
      short_bio: member.short_bio ?? "",
      professional_bio: member.professional_bio ?? "",
      linkedin_url: member.linkedin_url ?? "",
      published: member.published ?? false,
    })

    setImagePreview(member.image_url ?? null)
    setShowForm(true)

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  /*
   * ============================================================
   * PROFILE IMAGE UPLOAD
   * ============================================================
   */

  async function handleImageChange(
    event: ChangeEvent<HTMLInputElement>,
  ) {
    const file = event.target.files?.[0]

    // Allow selecting the same file again later.
    event.target.value = ""

    if (!file) return

    setError("")
    setSuccess("")

    if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
      setError("Please select a JPG, PNG or WEBP image.")
      return
    }

    if (file.size > MAX_IMAGE_SIZE) {
      setError("Profile picture must be 5 MB or smaller.")
      return
    }

    const localPreview = URL.createObjectURL(file)
    setImagePreview(localPreview)

    await uploadProfileImage(file)
  }

  async function uploadProfileImage(file: File) {
    setUploadingImage(true)
    setError("")

    try {
      const extension =
        file.name.split(".").pop()?.toLowerCase() || "jpg"

      /*
       * Each upload gets a unique filename.
       * This prevents browser/CDN caching problems when replacing
       * an existing profile picture.
       */
      const fileName = `${crypto.randomUUID()}.${extension}`
      const filePath = `team/${fileName}`

      const { error: uploadError } = await supabase.storage
        .from("team-profiles")
        .upload(filePath, file, {
          contentType: file.type,
          cacheControl: "3600",
          upsert: false,
        })

      if (uploadError) {
        console.error(uploadError)
        throw new Error(
          uploadError.message ||
            "Unable to upload the profile picture.",
        )
      }

      const {
        data: { publicUrl },
      } = supabase.storage
        .from("team-profiles")
        .getPublicUrl(filePath)

      if (!publicUrl) {
        throw new Error(
          "The image was uploaded but its public URL could not be created.",
        )
      }

      /*
       * If this is replacing an existing image, remove the old
       * image from Storage after the new image has successfully
       * uploaded.
       */
      if (form.image_url) {
        await removeStoredImage(form.image_url)
      }

      updateForm("image_url", publicUrl)
      setImagePreview(publicUrl)
    } catch (err: any) {
      console.error(err)

      setError(
        err?.message ||
          "Unable to upload the profile picture.",
      )

      /*
       * If upload fails, restore the previous image.
       */
      setImagePreview(form.image_url || null)
    } finally {
      setUploadingImage(false)
    }
  }

  /*
   * ============================================================
   * REMOVE PROFILE IMAGE
   * ============================================================
   */

  async function removeStoredImage(imageUrl: string) {
    if (!imageUrl) return

    try {
      const marker = "/storage/v1/object/public/team-profiles/"

      const markerIndex = imageUrl.indexOf(marker)

      if (markerIndex === -1) {
        return
      }

      const filePath = decodeURIComponent(
        imageUrl.substring(
          markerIndex + marker.length,
        ),
      )

      if (!filePath) return

      await supabase.storage
        .from("team-profiles")
        .remove([filePath])
    } catch (err) {
      /*
       * Do not fail the team-member operation merely because
       * deletion of an old image failed.
       */
      console.error("Unable to remove old image:", err)
    }
  }

  async function handleRemoveImage() {
    if (!form.image_url) {
      setImagePreview(null)
      return
    }

    setDeletingImage(true)
    setError("")

    try {
      await removeStoredImage(form.image_url)

      updateForm("image_url", "")
      setImagePreview(null)
    } catch (err) {
      console.error(err)
      setError("Unable to remove the profile picture.")
    } finally {
      setDeletingImage(false)
    }
  }

  /*
   * ============================================================
   * SAVE TEAM MEMBER
   * ============================================================
   */

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    setSaving(true)
    setError("")
    setSuccess("")

    try {
      if (!form.name.trim()) {
        throw new Error("Name is required.")
      }

      if (!form.position.trim()) {
        throw new Error("Position is required.")
      }

      const displayOrder = Number(form.display_order)

      if (
        !Number.isFinite(displayOrder) ||
        displayOrder < 1
      ) {
        throw new Error(
          "Display Order must be a valid number.",
        )
      }

      const payload = {
        name: form.name.trim(),
        position: form.position.trim(),
        qualifications:
          form.qualifications.trim() || null,
        display_order: displayOrder,
        image_url: form.image_url.trim() || null,
        short_bio: form.short_bio.trim() || null,
        professional_bio:
          form.professional_bio.trim() || null,
        linkedin_url:
          form.linkedin_url.trim() || null,
        published: form.published,
      }

      if (editingId) {
        const { error: updateError } = await supabase
          .from("team_members")
          .update(payload)
          .eq("id", editingId)

        if (updateError) {
          console.error(updateError)
          throw new Error(
            updateError.message ||
              "Unable to update team member.",
          )
        }

        setSuccess("Team member updated successfully.")
      } else {
        const { error: insertError } = await supabase
          .from("team_members")
          .insert(payload)

        if (insertError) {
          console.error(insertError)
          throw new Error(
            insertError.message ||
              "Unable to add team member.",
          )
        }

        setSuccess("Team member added successfully.")
      }

      await loadMembers()

      setShowForm(false)
      setEditingId(null)
      setForm(emptyForm)
      setImagePreview(null)

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      })
    } catch (err: any) {
      console.error(err)

      setError(
        err?.message ||
          "Unable to save team member.",
      )
    } finally {
      setSaving(false)
    }
  }

  /*
   * ============================================================
   * DELETE TEAM MEMBER
   * ============================================================
   */

  async function handleDelete(member: TeamMember) {
    const confirmed = window.confirm(
      `Are you sure you want to delete ${member.name}?`,
    )

    if (!confirmed) return

    setError("")
    setSuccess("")

    try {
      /*
       * Remove profile picture first.
       */
      if (member.image_url) {
        await removeStoredImage(member.image_url)
      }

      const { error: deleteError } = await supabase
        .from("team_members")
        .delete()
        .eq("id", member.id)

      if (deleteError) {
        console.error(deleteError)
        throw new Error(
          deleteError.message ||
            "Unable to delete team member.",
        )
      }

      await loadMembers()

      setSuccess(
        `${member.name} was deleted successfully.`,
      )
    } catch (err: any) {
      console.error(err)

      setError(
        err?.message ||
          "Unable to delete team member.",
      )
    }
  }

  /*
   * ============================================================
   * SIGN OUT
   * ============================================================
   */

  async function handleSignOut() {
    await supabase.auth.signOut()
    window.location.href = "/admin/login"
  }

  /*
   * ============================================================
   * LOADING
   * ============================================================
   */

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#f4f7fb]">
        <div className="text-center">
          <div className="mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-4 border-slate-200 border-t-[#18b8ee]" />

          <p className="text-sm font-medium text-slate-600">
            Loading CURA Team Management...
          </p>
        </div>
      </main>
    )
  }

  /*
   * ============================================================
   * PAGE
   * ============================================================
   */

  return (
    <main className="min-h-screen bg-[#f4f7fb] text-[#071d41]">
      {/* ======================================================
          HEADER
      ====================================================== */}

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
              href="/"
              className="hidden rounded-lg border border-white/60 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-white/10 sm:block"
            >
              View Website
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

      {/* ======================================================
          MAIN
      ====================================================== */}

      <div className="mx-auto max-w-7xl px-6 py-10 lg:px-8">
        {/* BACK */}

        <button
          type="button"
          onClick={() => router.push("/admin")}
          className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-slate-600 transition hover:text-[#087dcc]"
        >
          ←
          Back to Administration
        </button>

        {/* TITLE */}

        <section className="mb-8">
          <p className="mb-2 text-xs font-bold uppercase tracking-[0.28em] text-[#18b8ee]">
            Administration
          </p>

          <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-[#071d41] md:text-4xl">
                Our Team
              </h2>

              <p className="mt-3 max-w-3xl text-base leading-7 text-slate-600">
                Add and manage CURA team profiles, qualifications,
                positions, biographies and professional information.
              </p>
            </div>

            {!showForm && (
              <button
                type="button"
                onClick={openAddForm}
                className="inline-flex shrink-0 items-center justify-center gap-2 rounded-lg bg-[#061b3d] px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#0b2a55]"
              >
                +
                Add Team Member
              </button>
            )}
          </div>
        </section>

        {/* ALERTS */}

        {success && (
          <div className="mb-6 flex items-start gap-3 rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-800">
            <span className="mt-0.5 shrink-0">✓</span>

            <div className="flex-1">
              <p className="font-semibold">
                Success
              </p>

              <p className="mt-1">
                {success}
              </p>
            </div>

            <button
              type="button"
              onClick={() => setSuccess("")}
              className="text-emerald-600 hover:text-emerald-900"
            >
              ×
            </button>
          </div>
        )}

        {error && (
          <div className="mb-6 flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-800">
            <div className="flex-1">
              <p className="font-semibold">
                Unable to complete request
              </p>

              <p className="mt-1">
                {error}
              </p>
            </div>

            <button
              type="button"
              onClick={() => setError("")}
              className="text-red-600 hover:text-red-900"
            >
              ×
            </button>
          </div>
        )}

        {/* ====================================================
            FORM
        ==================================================== */}

        {showForm && (
          <section className="mb-10 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            {/* FORM HEADER */}

            <div className="flex items-center justify-between border-b border-slate-200 px-6 py-5">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#18b8ee]">
                  {editingId ? "Edit Profile" : "New Profile"}
                </p>

                <h3 className="mt-1 text-2xl font-bold text-[#071d41]">
                  {editingId
                    ? "Edit Team Member"
                    : "Add Team Member"}
                </h3>
              </div>

              <button
                type="button"
                onClick={resetForm}
                className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-600 transition hover:bg-slate-50"
              >
                Cancel
              </button>
            </div>

            {/* FORM */}

            <form
              onSubmit={handleSubmit}
              className="p-6"
            >
              <div className="grid gap-6 md:grid-cols-2">
                {/* NAME */}

                <div>
                  <label
                    htmlFor="name"
                    className="mb-2 block text-sm font-semibold text-[#071d41]"
                  >
                    Name <span className="text-red-500">*</span>
                  </label>

                  <input
                    id="name"
                    type="text"
                    value={form.name}
                    onChange={(event) =>
                      updateForm(
                        "name",
                        event.target.value,
                      )
                    }
                    placeholder="e.g. Abdulla Afhaam"
                    required
                    className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-[#18b8ee] focus:ring-2 focus:ring-[#18b8ee]/20"
                  />
                </div>

                {/* POSITION */}

                <div>
                  <label
                    htmlFor="position"
                    className="mb-2 block text-sm font-semibold text-[#071d41]"
                  >
                    Position <span className="text-red-500">*</span>
                  </label>

                  <input
                    id="position"
                    type="text"
                    value={form.position}
                    onChange={(event) =>
                      updateForm(
                        "position",
                        event.target.value,
                      )
                    }
                    placeholder="e.g. Director"
                    required
                    className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-[#18b8ee] focus:ring-2 focus:ring-[#18b8ee]/20"
                  />
                </div>

                {/* QUALIFICATIONS */}

                <div>
                  <label
                    htmlFor="qualifications"
                    className="mb-2 block text-sm font-semibold text-[#071d41]"
                  >
                    Qualifications
                  </label>

                  <input
                    id="qualifications"
                    type="text"
                    value={form.qualifications}
                    onChange={(event) =>
                      updateForm(
                        "qualifications",
                        event.target.value,
                      )
                    }
                    placeholder="e.g. ACCA, MBA"
                    className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-[#18b8ee] focus:ring-2 focus:ring-[#18b8ee]/20"
                  />
                </div>

                {/* DISPLAY ORDER */}

                <div>
                  <label
                    htmlFor="display-order"
                    className="mb-2 block text-sm font-semibold text-[#071d41]"
                  >
                    Display Order
                  </label>

                  <input
                    id="display-order"
                    type="number"
                    min="1"
                    value={form.display_order}
                    onChange={(event) =>
                      updateForm(
                        "display_order",
                        event.target.value,
                      )
                    }
                    className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-[#18b8ee] focus:ring-2 focus:ring-[#18b8ee]/20"
                  />

                  <p className="mt-2 text-xs text-slate-500">
                    Lower numbers appear first.
                  </p>
                </div>

                {/* ==================================================
                    PROFILE PICTURE
                ================================================== */}

                <div className="md:col-span-2">
                  <label className="mb-2 block text-sm font-semibold text-[#071d41]">
                    Profile Picture
                  </label>

                  <div className="rounded-xl border border-slate-200 bg-slate-50 p-5">
                    <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
                      {/* IMAGE PREVIEW */}

                      <div className="relative h-32 w-32 shrink-0 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                        {imagePreview ? (
                          <img
                            src={imagePreview}
                            alt="Profile preview"
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <div className="flex h-full w-full flex-col items-center justify-center text-slate-400">
                            <span className="mb-2 text-2xl">▧</span>

                            <span className="text-xs">
                              No photo
                            </span>
                          </div>
                        )}

                        {uploadingImage && (
                          <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#061b3d]/80 text-white">
                            <span className="mb-2 text-lg animate-pulse">⟳</span>

                            <span className="text-xs font-semibold">
                              Uploading...
                            </span>
                          </div>
                        )}
                      </div>

                      {/* UPLOAD CONTROLS */}

                      <div className="flex-1">
                        <div className="flex flex-wrap gap-3">
                          <label
                            htmlFor="profile-picture"
                            className={`inline-flex cursor-pointer items-center gap-2 rounded-lg bg-[#061b3d] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#0b2a55] ${
                              uploadingImage
                                ? "pointer-events-none opacity-60"
                                : ""
                            }`}
                          >
                            {uploadingImage ? (
                              <>
                                <span className="animate-pulse">⟳</span>
                                Uploading...
                              </>
                            ) : (
                              <>
                                ↑
                                {imagePreview
                                  ? "Replace Image"
                                  : "Choose Image"}
                              </>
                            )}
                          </label>

                          <input
                            id="profile-picture"
                            type="file"
                            accept="image/jpeg,image/png,image/webp"
                            onChange={handleImageChange}
                            disabled={uploadingImage}
                            className="hidden"
                          />

                          {imagePreview && !uploadingImage && (
                            <button
                              type="button"
                              onClick={handleRemoveImage}
                              disabled={deletingImage}
                              className="inline-flex items-center gap-2 rounded-lg border border-red-200 bg-white px-5 py-3 text-sm font-semibold text-red-600 transition hover:bg-red-50 disabled:opacity-50"
                            >
                              {deletingImage ? (
                                <span className="animate-pulse">⟳</span>
                              ) : (
                                <span>Delete</span>
                              )}

                              Remove
                            </button>
                          )}
                        </div>

                        <p className="mt-3 text-xs leading-5 text-slate-500">
                          Upload a professional profile picture.
                          JPG, PNG or WEBP. Maximum file size:
                          5 MB.
                        </p>

                        <p className="mt-1 text-xs text-slate-400">
                          The image will be stored securely in
                          CURA's image storage and displayed on
                          the public Team page.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* SHORT BIOGRAPHY */}

                <div className="md:col-span-2">
                  <label
                    htmlFor="short-bio"
                    className="mb-2 block text-sm font-semibold text-[#071d41]"
                  >
                    Short Biography
                  </label>

                  <textarea
                    id="short-bio"
                    rows={3}
                    value={form.short_bio}
                    onChange={(event) =>
                      updateForm(
                        "short_bio",
                        event.target.value,
                      )
                    }
                    placeholder="A short introduction shown on the Team page."
                    className="w-full resize-y rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-[#18b8ee] focus:ring-2 focus:ring-[#18b8ee]/20"
                  />
                </div>

                {/* PROFESSIONAL BIOGRAPHY */}

                <div className="md:col-span-2">
                  <label
                    htmlFor="professional-bio"
                    className="mb-2 block text-sm font-semibold text-[#071d41]"
                  >
                    Professional Biography
                  </label>

                  <textarea
                    id="professional-bio"
                    rows={7}
                    value={form.professional_bio}
                    onChange={(event) =>
                      updateForm(
                        "professional_bio",
                        event.target.value,
                      )
                    }
                    placeholder="Detailed professional biography..."
                    className="w-full resize-y rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm leading-6 outline-none transition placeholder:text-slate-400 focus:border-[#18b8ee] focus:ring-2 focus:ring-[#18b8ee]/20"
                  />
                </div>

                {/* LINKEDIN */}

                <div>
                  <label
                    htmlFor="linkedin"
                    className="mb-2 block text-sm font-semibold text-[#071d41]"
                  >
                    LinkedIn URL
                  </label>

                  <input
                    id="linkedin"
                    type="url"
                    value={form.linkedin_url}
                    onChange={(event) =>
                      updateForm(
                        "linkedin_url",
                        event.target.value,
                      )
                    }
                    placeholder="https://www.linkedin.com/in/..."
                    className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-[#18b8ee] focus:ring-2 focus:ring-[#18b8ee]/20"
                  />
                </div>

                {/* PUBLISHED */}

                <div className="flex items-center">
                  <label className="flex cursor-pointer items-start gap-3">
                    <input
                      type="checkbox"
                      checked={form.published}
                      onChange={(event) =>
                        updateForm(
                          "published",
                          event.target.checked,
                        )
                      }
                      className="mt-1 h-5 w-5 rounded border-slate-300 text-[#087dcc] focus:ring-[#18b8ee]"
                    />

                    <span>
                      <span className="block text-sm font-semibold text-[#071d41]">
                        Published
                      </span>

                      <span className="mt-1 block text-xs text-slate-500">
                        Show this member on the public Team page.
                      </span>
                    </span>
                  </label>
                </div>
              </div>

              {/* FORM ACTIONS */}

              <div className="mt-8 flex flex-col-reverse gap-3 border-t border-slate-200 pt-6 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  onClick={resetForm}
                  disabled={saving || uploadingImage}
                  className="rounded-lg border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 disabled:opacity-50"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={saving || uploadingImage}
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#061b3d] px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#0b2a55] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {saving && (
                    <span className="animate-pulse">⟳</span>
                  )}

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

        {/* ====================================================
            TEAM LIST
        ==================================================== */}

        {!showForm && (
          <section>
            <div className="mb-5 flex items-center justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#18b8ee]">
                  Team Profiles
                </p>

                <h3 className="mt-2 text-2xl font-bold text-[#071d41]">
                  Current Team
                </h3>
              </div>

              <span className="rounded-full bg-[#eaf8fd] px-3 py-1.5 text-xs font-bold text-[#087dcc]">
                {members.length}{" "}
                {members.length === 1
                  ? "Member"
                  : "Members"}
              </span>
            </div>

            {members.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#eaf8fd] text-[#087dcc]">
                  <span className="text-2xl">▧</span>
                </div>

                <h4 className="mt-5 text-lg font-bold text-[#071d41]">
                  No team members yet
                </h4>

                <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
                  Add your first CURA team member to begin
                  building the public Team page.
                </p>

                <button
                  type="button"
                  onClick={openAddForm}
                  className="mt-6 inline-flex items-center gap-2 rounded-lg bg-[#061b3d] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#0b2a55]"
                >
                  +
                  Add Team Member
                </button>
              </div>
            ) : (
              <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                {members.map((member) => (
                  <div
                    key={member.id}
                    className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
                  >
                    {/* MEMBER IMAGE */}

                    <div className="relative h-64 bg-slate-100">
                      {member.image_url ? (
                        <img
                          src={member.image_url}
                          alt={member.name}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <div className="flex h-full w-full flex-col items-center justify-center text-slate-400">
                          <span className="text-4xl">▧</span>

                          <span className="mt-2 text-sm">
                            No profile picture
                          </span>
                        </div>
                      )}

                      <div className="absolute right-4 top-4">
                        <span
                          className={`rounded-full px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.14em] shadow-sm ${
                            member.published
                              ? "bg-emerald-50 text-emerald-700"
                              : "bg-slate-100 text-slate-500"
                          }`}
                        >
                          {member.published
                            ? "Published"
                            : "Draft"}
                        </span>
                      </div>
                    </div>

                    {/* MEMBER DETAILS */}

                    <div className="p-5">
                      <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#18b8ee]">
                        Order{" "}
                        {member.display_order ?? "-"}
                      </p>

                      <h4 className="mt-2 text-xl font-bold text-[#071d41]">
                        {member.name}
                      </h4>

                      <p className="mt-1 text-sm font-semibold text-[#087dcc]">
                        {member.position}
                      </p>

                      {member.qualifications && (
                        <p className="mt-3 text-sm text-slate-500">
                          {member.qualifications}
                        </p>
                      )}

                      {member.short_bio && (
                        <p className="mt-4 line-clamp-3 text-sm leading-6 text-slate-600">
                          {member.short_bio}
                        </p>
                      )}

                      {/* ACTIONS */}

                      <div className="mt-5 flex gap-2 border-t border-slate-100 pt-4">
                        <button
                          type="button"
                          onClick={() =>
                            openEditForm(member)
                          }
                          className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg bg-[#061b3d] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#0b2a55]"
                        >
                          Edit
                        </button>

                        <button
                          type="button"
                          onClick={() =>
                            handleDelete(member)
                          }
                          className="inline-flex items-center justify-center gap-2 rounded-lg border border-red-200 bg-white px-4 py-2.5 text-sm font-semibold text-red-600 transition hover:bg-red-50"
                        >
                          <span>Delete</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        )}

        {/* ====================================================
            INFORMATION NOTICE
        ==================================================== */}

        <section className="mt-10 rounded-2xl border border-[#b9e8f7] bg-[#effbff] p-6">
          <div className="flex gap-4">
            <div className="mt-0.5 text-xl text-[#087dcc]">
              ⓘ
            </div>

            <div>
              <h4 className="font-bold text-[#071d41]">
                Profile picture storage
              </h4>

              <p className="mt-1 text-sm leading-6 text-slate-600">
                Profile pictures are uploaded directly to
                Supabase Storage. The image URL is then saved
                with the team member profile. You do not need
                to enter an image URL manually.
              </p>
            </div>
          </div>
        </section>
      </div>

      {/* ======================================================
          FOOTER
      ====================================================== */}

      <footer className="border-t border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-6 py-6 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} CURA. All rights
            reserved.
          </p>

          <a
            href="/"
            className="font-semibold text-[#071d41] transition hover:text-[#087dcc]"
          >
            Return to CURA →
          </a>
        </div>
      </footer>
    </main>
  )
}