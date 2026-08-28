"use client"

import { useEffect, useState } from "react"
import Link from "next/link"

type Topic = {
  id: string
  slug: string
  title: string
  display_order: number
  published?: boolean
}

export default function EducationAdminPage() {
  const [topics, setTopics] = useState<Topic[]>([])
  const [loading, setLoading] = useState(true)
  const [newTopic, setNewTopic] = useState("")
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState("")

  async function loadTopics() {
    try {
      setLoading(true)
      setError("")

      const response = await fetch(
        "/api/admin/education/topics",
        {
          cache: "no-store",
        }
      )

      if (!response.ok) {
        throw new Error(
          "Unable to load accounting topics."
        )
      }

      const data = await response.json()

      setTopics(
        Array.isArray(data.topics)
          ? data.topics
          : []
      )
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Unable to load topics."
      )
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadTopics()
  }, [])

  async function addTopic() {
    const title = newTopic.trim()

    if (!title) {
      return
    }

    try {
      setSaving(true)
      setError("")

      const response = await fetch(
        "/api/admin/education/topics",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title,
          }),
        }
      )

      const data = await response.json()

      if (!response.ok) {
        throw new Error(
          data.error ||
            "Unable to create topic."
        )
      }

      setNewTopic("")
      await loadTopics()
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

  async function deleteTopic(
    topic: Topic
  ) {
    const confirmed = window.confirm(
      `Delete "${topic.title}"?\n\nThis will remove the topic and its sections.`
    )

    if (!confirmed) {
      return
    }

    try {
      setSaving(true)
      setError("")

      const response = await fetch(
        `/api/admin/education/topics/${topic.id}`,
        {
          method: "DELETE",
        }
      )

      const data = await response.json()

      if (!response.ok) {
        throw new Error(
          data.error ||
            "Unable to delete topic."
        )
      }

      await loadTopics()
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Unable to delete topic."
      )
    } finally {
      setSaving(false)
    }
  }

  return (
    <main className="min-h-screen bg-[#F6FAF8] px-6 py-10">
      <div className="mx-auto max-w-7xl">

        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="text-xs font-bold uppercase tracking-[0.18em] text-[#159B78]">
              CURA Education
            </div>

            <h1 className="mt-2 text-3xl font-bold tracking-tight text-[#071B49]">
              Education Content Manager
            </h1>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-[#5D7180]">
              Manage accounting topics, sections and
              educational content without changing the
              existing lesson material.
            </p>
          </div>

          <Link
            href="/admin"
            className="inline-flex w-fit rounded-xl border border-[#D8E5E0] bg-white px-4 py-2 text-sm font-semibold text-[#245448] shadow-sm"
          >
            ← Admin Dashboard
          </Link>
        </div>

        {error && (
          <div className="mb-6 rounded-2xl border border-red-200 bg-red-50 px-5 py-4 text-sm text-red-700">
            {error}
          </div>
        )}

        <section className="mb-8 rounded-3xl border border-[#DCE9E4] bg-white p-6 shadow-[0_10px_35px_rgba(20,70,55,0.05)]">
          <h2 className="text-lg font-bold text-[#071B49]">
            Add Topic
          </h2>

          <div className="mt-4 flex flex-col gap-3 sm:flex-row">
            <input
              value={newTopic}
              onChange={(event) =>
                setNewTopic(event.target.value)
              }
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  addTopic()
                }
              }}
              placeholder="Topic name"
              className="min-h-11 flex-1 rounded-xl border border-[#D6E3DE] bg-white px-4 text-sm text-[#071B49] outline-none focus:border-[#159B78]"
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

        <section className="rounded-3xl border border-[#DCE9E4] bg-white shadow-[0_10px_35px_rgba(20,70,55,0.05)]">
          <div className="border-b border-[#E7EFEC] px-6 py-5">
            <h2 className="text-lg font-bold text-[#071B49]">
              Education Materials
            </h2>

            <p className="mt-1 text-xs text-[#6A7E76]">
              {topics.length} topics
            </p>
          </div>

          {loading ? (
            <div className="px-6 py-12 text-center text-sm text-[#71827C]">
              Loading topics…
            </div>
          ) : topics.length === 0 ? (
            <div className="px-6 py-12 text-center text-sm text-[#71827C]">
              No accounting topics found.
            </div>
          ) : (
            <div className="divide-y divide-[#E7EFEC]">
              {topics.map((topic, index) => (
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
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <Link
                      href={`/admin/education/${topic.id}`}
                      className="rounded-lg bg-[#071B49] px-4 py-2 text-xs font-bold text-white"
                    >
                      Manage
                    </Link>

                    <Link
                      href={`/education/materials/accounting/${topic.slug}`}
                      target="_blank"
                      className="rounded-lg border border-[#D6E3DE] px-4 py-2 text-xs font-semibold text-[#355B50]"
                    >
                      Preview
                    </Link>

                    <button
                      type="button"
                      onClick={() =>
                        deleteTopic(topic)
                      }
                      disabled={saving}
                      className="rounded-lg border border-red-200 px-4 py-2 text-xs font-semibold text-red-600 disabled:opacity-50"
                    >
                      Delete
                    </button>
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
