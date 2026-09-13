"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"

type CareerApplication = {
  id: string
  career_id: string
  full_name: string
  email: string
  phone: string | null
  status: string
  created_at: string
  career?: {
    title: string
  } | { title: string }[] | null
}

export default function CareerApplicationsPanel() {
  const supabase = createClient()
  const [loading, setLoading] = useState(true)
  const [applications, setApplications] = useState<CareerApplication[]>([])
  const [error, setError] = useState("")

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
        status,
        created_at,
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

  return (
    <section className="rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="px-6 py-5">
        <h2 className="text-xl font-semibold text-slate-900">Job Application Management</h2>
        <p className="mt-1 text-sm text-slate-500">Review and manage job applications.</p>

        {loading && (
          <p className="mt-4 text-sm text-slate-500">
            Loading applications...
          </p>
        )}

        {!loading && error && (
          <p className="mt-4 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </p>
        )}

        {!loading && !error && (
          <>
            <p className="mt-4 text-sm text-slate-600">
              {applications.length} application{applications.length === 1 ? "" : "s"} received.
            </p>

            {applications.length > 0 && (
              <div className="mt-6 overflow-hidden rounded-xl border border-slate-200">
                <div className="divide-y divide-slate-200">
                  {applications.map((application) => (
                    <div
                      key={application.id}
                      className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between"
                    >
                      <div className="min-w-0">
                        <p className="font-semibold text-slate-900">
                          {application.full_name}
                        </p>
                        <p className="mt-1 text-sm text-slate-500">
                          {application.email}
                        </p>
                        <p className="mt-1 text-xs text-slate-400">
                          {(Array.isArray(application.career) ? application.career[0]?.title : application.career?.title) || "Unknown vacancy"} ·{" "}
                          {new Date(application.created_at).toLocaleDateString(
                            "en-GB"
                          )}
                        </p>
                      </div>

                      <span className="w-fit shrink-0 rounded-full bg-slate-100 px-3 py-1 text-xs font-medium capitalize text-slate-700">
                        {application.status.replace("_", " ")}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  )
}
