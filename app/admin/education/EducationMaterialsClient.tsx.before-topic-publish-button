"use client"

import {
  useEffect,
  useState,
} from "react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"

type Area = {
  area_key: string
  name: string
  description: string
  display_order: number
  is_active: boolean
}

type Topic = {
  id: string
  slug: string
  title: string
  category: string
  display_order: number
  is_published?: boolean
  status?: string
}

export default function EducationMaterialsClient() {
  const searchParams =
    useSearchParams()

  const selectedCategory =
    searchParams.get(
      "category"
    )

  const [areas, setAreas] =
    useState<Area[]>([])

  const [topics, setTopics] =
    useState<Topic[]>([])

  const [loadingAreas, setLoadingAreas] =
    useState(true)

  const [loadingTopics, setLoadingTopics] =
    useState(false)

  const [saving, setSaving] =
    useState(false)

  const [error, setError] =
    useState("")

  const [success, setSuccess] =
    useState("")

  const [newTopic, setNewTopic] =
    useState("")

  const [newAreaName, setNewAreaName] =
    useState("")

  const [newAreaDescription, setNewAreaDescription] =
    useState("")

  const [editingAreaKey, setEditingAreaKey] =
    useState<string | null>(null)

  const [editingAreaName, setEditingAreaName] =
    useState("")

  const [editingAreaDescription, setEditingAreaDescription] =
    useState("")

  async function loadAreas() {
    try {
      setLoadingAreas(true)
      setError("")

      const response =
        await fetch(
          "/api/admin/education/areas",
          {
            cache: "no-store",
          }
        )

      const data =
        await response.json()

      if (!response.ok) {
        throw new Error(
          data.error ||
            "Unable to load education areas."
        )
      }

      setAreas(
        Array.isArray(data.areas)
          ? data.areas
          : []
      )
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Unable to load education areas."
      )
    } finally {
      setLoadingAreas(false)
    }
  }

  async function loadTopics(
    category: string
  ) {
    try {
      setLoadingTopics(true)
      setError("")

      const response =
        await fetch(
          `/api/admin/education/topics?category=${encodeURIComponent(category)}`,
          {
            cache: "no-store",
          }
        )

      const data =
        await response.json()

      if (!response.ok) {
        throw new Error(
          data.error ||
            `Unable to load ${category} topics.`
        )
      }

      setTopics(
        Array.isArray(data.topics)
          ? data.topics
          : []
      )
    } catch (err) {
      setTopics([])

      setError(
        err instanceof Error
          ? err.message
          : "Unable to load topics."
      )
    } finally {
      setLoadingTopics(false)
    }
  }

  useEffect(() => {
    loadAreas()
  }, [])

  useEffect(() => {
    if (
      selectedCategory
    ) {
      loadTopics(
        selectedCategory
      )
    } else {
      setTopics([])
    }
  }, [
    selectedCategory,
  ])

  const selectedArea =
    areas.find(
      (area) =>
        area.name ===
        selectedCategory
    )

  async function addTopic() {
    if (
      !selectedCategory ||
      !newTopic.trim()
    ) {
      return
    }

    try {
      setSaving(true)
      setError("")
      setSuccess("")

      const response =
        await fetch(
          "/api/admin/education/topics",
          {
            method: "POST",
            headers: {
              "Content-Type":
                "application/json",
            },
            body: JSON.stringify({
              title:
                newTopic.trim(),
              category:
                selectedCategory,
            }),
          }
        )

      const data =
        await response.json()

      if (!response.ok) {
        throw new Error(
          data.error ||
            "Unable to create topic."
        )
      }

      setNewTopic("")

      setSuccess(
        "Topic created successfully."
      )

      await loadTopics(
        selectedCategory
      )
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Unable to create topic."
      )
    } finally {
      setSaving(false)
    }
  }

  async function removeTopic(
    topic: Topic
  ) {
    const confirmed =
      window.confirm(
        `Remove "${topic.title}"?\n\nThe topic will be archived rather than permanently deleted.`
      )

    if (!confirmed) return

    try {
      setSaving(true)
      setError("")
      setSuccess("")

      const response =
        await fetch(
          `/api/admin/education/topics/${topic.id}`,
          {
            method: "DELETE",
          }
        )

      const data =
        await response.json()

      if (!response.ok) {
        throw new Error(
          data.error ||
            "Unable to remove topic."
        )
      }

      setSuccess(
        "Topic archived successfully."
      )

      if (
        selectedCategory
      ) {
        await loadTopics(
          selectedCategory
        )
      }
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Unable to remove topic."
      )
    } finally {
      setSaving(false)
    }
  }

  async function createArea() {
    const name =
      newAreaName.trim()

    if (!name) return

    try {
      setSaving(true)
      setError("")
      setSuccess("")

      const response =
        await fetch(
          "/api/admin/education/areas",
          {
            method: "POST",
            headers: {
              "Content-Type":
                "application/json",
            },
            body: JSON.stringify({
              name,
              description:
                newAreaDescription.trim(),
            }),
          }
        )

      const data =
        await response.json()

      if (!response.ok) {
        throw new Error(
          data.error ||
            "Unable to create education area."
        )
      }

      setNewAreaName("")
      setNewAreaDescription("")

      setSuccess(
        "Education area created successfully."
      )

      await loadAreas()
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Unable to create education area."
      )
    } finally {
      setSaving(false)
    }
  }

  function startEditArea(
    area: Area
  ) {
    setEditingAreaKey(
      area.area_key
    )

    setEditingAreaName(
      area.name
    )

    setEditingAreaDescription(
      area.description || ""
    )

    setError("")
    setSuccess("")
  }

  function cancelEditArea() {
    setEditingAreaKey(null)
    setEditingAreaName("")
    setEditingAreaDescription("")
  }

  async function saveArea() {
    if (
      !editingAreaKey ||
      !editingAreaName.trim()
    ) {
      return
    }

    try {
      setSaving(true)
      setError("")
      setSuccess("")

      const response =
        await fetch(
          "/api/admin/education/areas",
          {
            method: "PATCH",
            headers: {
              "Content-Type":
                "application/json",
            },
            body: JSON.stringify({
              area_key:
                editingAreaKey,
              name:
                editingAreaName.trim(),
              description:
                editingAreaDescription.trim(),
            }),
          }
        )

      const data =
        await response.json()

      if (!response.ok) {
        throw new Error(
          data.error ||
            "Unable to update education area."
        )
      }

      const oldName =
        areas.find(
          (area) =>
            area.area_key ===
            editingAreaKey
        )?.name

      cancelEditArea()

      setSuccess(
        "Education area updated successfully."
      )

      await loadAreas()

      /*
       * If the current page was showing the
       * renamed area, move to its new URL.
       */
      if (
        oldName &&
        selectedCategory === oldName
      ) {
        const nextName =
          data.area?.name

        if (nextName) {
          window.location.href =
            `/admin/education?category=${encodeURIComponent(nextName)}`
        }
      }
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Unable to update education area."
      )
    } finally {
      setSaving(false)
    }
  }

  async function toggleArea(
    area: Area
  ) {
    const action =
      area.is_active
        ? "deactivate"
        : "reactivate"

    const confirmed =
      window.confirm(
        `${action === "deactivate" ? "Deactivate" : "Reactivate"} "${area.name}"?`
      )

    if (!confirmed) return

    try {
      setSaving(true)
      setError("")
      setSuccess("")

      const response =
        await fetch(
          "/api/admin/education/areas",
          {
            method: "PATCH",
            headers: {
              "Content-Type":
                "application/json",
            },
            body: JSON.stringify({
              area_key:
                area.area_key,
              is_active:
                !area.is_active,
            }),
          }
        )

      const data =
        await response.json()

      if (!response.ok) {
        throw new Error(
          data.error ||
            "Unable to update education area."
        )
      }

      setSuccess(
        area.is_active
          ? "Education area deactivated."
          : "Education area reactivated."
      )

      await loadAreas()
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Unable to update education area."
      )
    } finally {
      setSaving(false)
    }
  }

  /*
   * MASTER SCREEN
   */

  if (!selectedCategory) {
    return (
      <main className="min-h-screen bg-[#F4F7FA]">
        <header className="bg-[#071B49] !text-white text-white">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
            <div className="flex items-center gap-5">
              <Link
                href="/admin"
                className="text-xl font-light tracking-[0.25em]"
              >
                CURA
              </Link>

              <div className="h-8 w-px bg-white/20" />

              <div>
                <div className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#49C5A0]">
                  CURA Administration
                </div>

                <div className="text-sm font-semibold">
                  Education
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Link
                href="/education"
                className="rounded-lg bg-white px-4 py-2 text-sm font-semibold !text-[#071B49] hover:bg-slate-50"
              >
                View Education
              </Link>

              <Link
                href="/admin"
                className="rounded-lg border border-white/20 px-4 py-2 text-sm font-semibold text-white"
              >
                Dashboard
              </Link>
            </div>
          </div>
        </header>

        <main className="px-6 py-10">
          <div className="mx-auto max-w-7xl">

            <div className="mb-8">
              <div className="text-xs font-bold uppercase tracking-[0.2em] text-[#159B78]">
                Education
              </div>

              <h1 className="mt-2 text-3xl font-bold text-[#071B49]">
                Education Materials
              </h1>

              <p className="mt-2 text-sm leading-6 text-[#5D7180]">
                Manage education areas, topics,
                sections and learning content.
              </p>
            </div>

            {error && (
              <div className="mb-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                {error}
              </div>
            )}

            {success && (
              <div className="mb-5 rounded-xl border border-[#BDE5D7] bg-[#ECF9F4] px-4 py-3 text-sm text-[#126B54]">
                {success}
              </div>
            )}

            <section className="mb-8 rounded-2xl border border-[#DCE5EA] bg-white shadow-sm">
              <div className="border-b border-[#E6ECEF] px-6 py-5">
                <h2 className="text-lg font-bold text-[#071B49]">
                  Manage Education Areas
                </h2>

                <p className="mt-1 text-sm text-[#71827C]">
                  Add, rename, deactivate or reactivate
                  the subject areas shown under Education.
                </p>
              </div>

              <div className="p-6">

                <div className="mb-6 grid gap-3 md:grid-cols-[1fr_1.5fr_auto]">
                  <input
                    value={newAreaName}
                    onChange={(event) =>
                      setNewAreaName(
                        event.target.value
                      )
                    }
                    placeholder="New area name"
                    className="rounded-xl border border-[#D6E3DE] px-4 py-3 text-sm outline-none focus:border-[#159B78]"
                  />

                  <input
                    value={newAreaDescription}
                    onChange={(event) =>
                      setNewAreaDescription(
                        event.target.value
                      )
                    }
                    placeholder="Short description"
                    className="rounded-xl border border-[#D6E3DE] px-4 py-3 text-sm outline-none focus:border-[#159B78]"
                  />

                  <button
                    type="button"
                    disabled={
                      saving ||
                      !newAreaName.trim()
                    }
                    onClick={
                      createArea
                    }
                    className="rounded-xl bg-[#159B78] px-5 py-3 text-sm font-bold text-white disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    + Add Area
                  </button>
                </div>

                {loadingAreas ? (
                  <div className="py-8 text-center text-sm text-[#71827C]">
                    Loading education areas…
                  </div>
                ) : (
                  <div className="divide-y divide-[#E7EFEC]">
                    {areas.map(
                      (area) => (
                        <div
                          key={
                            area.area_key
                          }
                          className="py-5"
                        >
                          {editingAreaKey ===
                          area.area_key ? (
                            <div className="grid gap-3 md:grid-cols-[1fr_1.5fr_auto]">
                              <input
                                value={
                                  editingAreaName
                                }
                                onChange={(
                                  event
                                ) =>
                                  setEditingAreaName(
                                    event.target.value
                                  )
                                }
                                className="rounded-xl border border-[#D6E3DE] px-4 py-3 text-sm outline-none focus:border-[#159B78]"
                              />

                              <input
                                value={
                                  editingAreaDescription
                                }
                                onChange={(
                                  event
                                ) =>
                                  setEditingAreaDescription(
                                    event.target.value
                                  )
                                }
                                className="rounded-xl border border-[#D6E3DE] px-4 py-3 text-sm outline-none focus:border-[#159B78]"
                              />

                              <div className="flex gap-2">
                                <button
                                  type="button"
                                  disabled={
                                    saving
                                  }
                                  onClick={
                                    saveArea
                                  }
                                  className="rounded-xl bg-[#071B49] !text-white px-4 py-3 text-xs font-bold text-white"
                                >
                                  Save
                                </button>

                                <button
                                  type="button"
                                  disabled={
                                    saving
                                  }
                                  onClick={
                                    cancelEditArea
                                  }
                                  className="rounded-xl border border-[#D6E3DE] px-4 py-3 text-xs font-semibold text-[#425B66]"
                                >
                                  Cancel
                                </button>
                              </div>
                            </div>
                          ) : (
                            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                              <div>
                                <div className="flex items-center gap-3">
                                  <h3 className="font-bold text-[#071B49]">
                                    {area.name}
                                  </h3>

                                  <span
                                    className={`rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.12em] ${
                                      area.is_active
                                        ? "bg-[#E8F6F1] text-[#159B78]"
                                        : "bg-[#F2F3F4] text-[#7A858A]"
                                    }`}
                                  >
                                    {area.is_active
                                      ? "Active"
                                      : "Inactive"}
                                  </span>
                                </div>

                                <p className="mt-1 text-sm text-[#71827C]">
                                  {area.description}
                                </p>
                              </div>

                              <div className="flex flex-wrap gap-2">
                                {area.is_active && (
                                  <Link
                                    href={`/admin/education?category=${encodeURIComponent(area.name)}`}
                                    className="rounded-lg bg-[#071B49] !text-white px-4 py-2 text-xs font-bold text-white"
                                  >
                                    Manage Topics
                                  </Link>
                                )}

                                <button
                                  type="button"
                                  disabled={
                                    saving
                                  }
                                  onClick={() =>
                                    startEditArea(
                                      area
                                    )
                                  }
                                  className="rounded-lg border border-[#D6E3DE] px-4 py-2 text-xs font-semibold text-[#245448]"
                                >
                                  Rename / Edit
                                </button>

                                <button
                                  type="button"
                                  disabled={
                                    saving
                                  }
                                  onClick={() =>
                                    toggleArea(
                                      area
                                    )
                                  }
                                  className={`rounded-lg border px-4 py-2 text-xs font-semibold ${
                                    area.is_active
                                      ? "border-red-200 text-red-600"
                                      : "border-[#BDE5D7] text-[#159B78]"
                                  }`}
                                >
                                  {area.is_active
                                    ? "Deactivate"
                                    : "Reactivate"}
                                </button>
                              </div>
                            </div>
                          )}
                        </div>
                      )
                    )}
                  </div>
                )}
              </div>
            </section>

            <section className="rounded-2xl border border-[#DCE5EA] bg-white p-6">
              <h2 className="text-lg font-bold text-[#071B49]">
                Education CMS
              </h2>

              <div className="mt-4 grid gap-3 md:grid-cols-4">
                {[
                  "Areas",
                  "Topics",
                  "Sections",
                  "Content / Illustrations / Tables",
                ].map(
                  (item) => (
                    <div
                      key={item}
                      className="rounded-xl bg-[#F5F9F7] px-4 py-4 text-sm font-semibold text-[#245448]"
                    >
                      ✓ {item}
                    </div>
                  )
                )}
              </div>
            </section>

          </div>
        </main>
      </main>
    )
  }

  /*
   * AREA TOPIC MANAGER
   */

  const area =
    selectedArea ||
    areas.find(
      (item) =>
        item.name ===
        selectedCategory
    )

  return (
    <main className="min-h-screen bg-[#F4F7FA]">

      <header className="bg-[#071B49] !text-white text-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">

          <div className="flex items-center gap-5">
            <Link
              href="/admin"
              className="text-xl font-light tracking-[0.25em]"
            >
              CURA
            </Link>

            <div className="h-8 w-px bg-white/20" />

            <div>
              <div className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#49C5A0]">
                CURA Administration
              </div>

              <div className="text-sm font-semibold">
                Education
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/education"
              className="rounded-lg bg-white px-4 py-2 text-sm font-semibold !text-[#071B49] hover:bg-slate-50"
            >
              View Education
            </Link>

            <Link
              href="/admin"
              className="rounded-lg border border-white/20 px-4 py-2 text-sm font-semibold text-white"
            >
              Dashboard
            </Link>
          </div>

        </div>
      </header>

      <main className="px-6 py-10">
        <div className="mx-auto max-w-7xl">

          <div className="mb-7 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <Link
                href="/admin/education"
                className="text-sm font-semibold text-[#159B78]"
              >
                ← Education Materials
              </Link>

              <div className="mt-5">
                <div className="text-xs font-bold uppercase tracking-[0.2em] text-[#159B78]">
                  Education Area
                </div>

                <h1 className="mt-2 text-3xl font-bold text-[#071B49]">
                  {selectedCategory}
                </h1>

                <p className="mt-2 text-sm text-[#5D7180]">
                  {area?.description ||
                    `Manage ${selectedCategory.toLowerCase()} topics and educational content.`}
                </p>
              </div>
            </div>

            <Link
              href="/admin/education"
              className="inline-flex w-fit rounded-xl border border-[#D8E5E0] bg-white px-4 py-2 text-sm font-semibold text-[#245448] shadow-sm"
            >
              Manage Areas
            </Link>
          </div>

          {error && (
            <div className="mb-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
            </div>
          )}

          {success && (
            <div className="mb-5 rounded-xl border border-[#BDE5D7] bg-[#ECF9F4] px-4 py-3 text-sm text-[#126B54]">
              {success}
            </div>
          )}

          <section className="mb-7 rounded-2xl border border-[#DCE5EA] bg-white p-6 shadow-sm">
            <h2 className="text-lg font-bold text-[#071B49]">
              Add {selectedCategory} Topic
            </h2>

            <div className="mt-4 flex flex-col gap-3 sm:flex-row">
              <input
                value={newTopic}
                onChange={(event) =>
                  setNewTopic(
                    event.target.value
                  )
                }
                onKeyDown={(event) => {
                  if (
                    event.key ===
                    "Enter"
                  ) {
                    addTopic()
                  }
                }}
                placeholder={`${selectedCategory} topic name`}
                className="min-h-11 flex-1 rounded-xl border border-[#D6E3DE] px-4 text-sm text-[#071B49] outline-none focus:border-[#159B78]"
              />

              <button
                type="button"
                disabled={
                  saving ||
                  !newTopic.trim()
                }
                onClick={addTopic}
                className="rounded-xl bg-[#159B78] px-6 py-3 text-sm font-bold text-white disabled:cursor-not-allowed disabled:opacity-50"
              >
                + Add Topic
              </button>
            </div>
          </section>

          <section className="rounded-2xl border border-[#DCE5EA] bg-white shadow-sm">

            <div className="border-b border-[#E7EFEC] px-6 py-5">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-bold text-[#071B49]">
                    {selectedCategory} Topics
                  </h2>

                  <p className="mt-1 text-xs text-[#71827C]">
                    {topics.length} topics
                  </p>
                </div>

                <Link
                  href="/admin/education"
                  className="text-xs font-semibold text-[#159B78]"
                >
                  ← All Areas
                </Link>
              </div>
            </div>

            {loadingTopics ? (
              <div className="px-6 py-12 text-center text-sm text-[#71827C]">
                Loading {selectedCategory.toLowerCase()} topics…
              </div>
            ) : topics.length === 0 ? (
              <div className="px-6 py-14 text-center">
                <div className="text-sm text-[#71827C]">
                  No {selectedCategory.toLowerCase()} topics found.
                </div>

                <p className="mt-2 text-xs text-[#8A9993]">
                  Use “Add Topic” above to create one.
                </p>
              </div>
            ) : (
              <div className="divide-y divide-[#E7EFEC]">
                {topics.map(
                  (topic, index) => (
                    <div
                      key={topic.id}
                      className="flex flex-col gap-4 px-6 py-5 md:flex-row md:items-center md:justify-between"
                    >
                      <div className="flex min-w-0 items-center gap-4">
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#E9F6F1] text-xs font-bold text-[#159B78]">
                          {index + 1}
                        </div>

                        <div className="min-w-0">
                          <div className="font-semibold text-[#071B49]">
                            {topic.title}
                          </div>

                          <div className="mt-1 text-xs text-[#7A8984]">
                            /{topic.slug}
                          </div>

                          <div className="mt-1 text-[11px] text-[#9AA7A2]">
                            {topic.status ||
                              (topic.is_published
                                ? "published"
                                : "draft")}
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        <Link
                          href={`/admin/education/${topic.id}`}
                          className="rounded-lg bg-[#071B49] !text-white px-4 py-2 text-xs font-bold text-white"
                        >
                          Manage Content
                        </Link>

                        <button
                          type="button"
                          disabled={
                            saving
                          }
                          onClick={() =>
                            removeTopic(
                              topic
                            )
                          }
                          className="rounded-lg border border-red-200 px-4 py-2 text-xs font-semibold text-red-600 disabled:opacity-50"
                        >
                          Archive
                        </button>
                      </div>
                    </div>
                  )
                )}
              </div>
            )}

          </section>

        </div>
      </main>
    </main>
  )
}
