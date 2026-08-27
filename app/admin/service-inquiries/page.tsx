"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"

type Inquiry = {
  id: string
  service: "audit" | "tax" | "advisory" | "legal" | "bookkeeping" | "payroll"
  full_name: string
  email: string
  phone: string
  business_name: string
  business_type: string
  business_location: string | null
  website: string | null
  current_circumstance: string
  assistance_required: string
  urgency: string
  preferred_contact_method: string
  status: "New" | "Contacted" | "In Progress" | "Closed"
  admin_notes: string | null
  email_sent: boolean
  created_at: string
}

const serviceLabels = {
  audit: "Audit",
  tax: "Tax",
  advisory: "Advisory",
  legal: "Legal",
  bookkeeping: "Bookkeeping",
  payroll: "Payroll",
}

const statuses = ["New", "Contacted", "In Progress", "Closed"] as const

export default function ServiceInquiriesAdminPage() {
  const supabase = createClient()
  const [inquiries, setInquiries] = useState<Inquiry[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [filter, setFilter] = useState("all")
  const [expanded, setExpanded] = useState<string | null>(null)
  const [savingId, setSavingId] = useState<string | null>(null)

  useEffect(() => {
    checkAdminAndLoad()
  }, [])

  async function checkAdminAndLoad() {
    setLoading(true)
    try {
      const { data: { user } } = await supabase.auth.getUser()

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

      await loadInquiries()
    } catch (err) {
      console.error(err)
      setError("Unable to load service enquiries.")
    } finally {
      setLoading(false)
    }
  }

  async function loadInquiries() {
    const { data, error: loadError } = await supabase
      .from("service_inquiries")
      .select("*")
      .order("created_at", { ascending: false })

    if (loadError) {
      console.error(loadError)
      throw loadError
    }

    setInquiries((data ?? []) as Inquiry[])
  }

  async function updateInquiry(
    id: string,
    updates: Partial<Pick<Inquiry, "status" | "admin_notes">>,
  ) {
    setSavingId(id)
    setError("")

    const { error: updateError } = await supabase
      .from("service_inquiries")
      .update(updates)
      .eq("id", id)

    if (updateError) {
      console.error(updateError)
      setError(updateError.message || "Unable to update enquiry.")
    } else {
      setInquiries((current) =>
        current.map((item) => item.id === id ? { ...item, ...updates } : item),
      )
    }

    setSavingId(null)
  }

  async function signOut() {
    await supabase.auth.signOut()
    window.location.href = "/admin/login"
  }

  const filtered =
    filter === "all"
      ? inquiries
      : inquiries.filter((item) => item.service === filter)

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#f4f7fb]">
        <div className="text-center">
          <div className="mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-4 border-slate-200 border-t-[#18b8ee]" />
          <p className="text-sm font-medium text-slate-600">Loading service enquiries...</p>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-[#f4f7fb] text-[#071d41]">
      <header className="bg-[#061b3d] text-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-6 py-4">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-[#18b8ee]">
              CURA Administration
            </p>
            <h1 className="mt-1 text-lg font-semibold">Service Enquiries</h1>
          </div>
          <div className="flex items-center gap-3">
            <a href="/admin" className="rounded-lg border border-white/50 px-4 py-2.5 text-sm font-semibold hover:bg-white/10">
              Administration
            </a>
            <button onClick={signOut} className="rounded-lg bg-[#18b8ee] px-5 py-2.5 text-sm font-semibold">
              Sign Out
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-6 py-10 lg:px-8">
        <a href="/admin" className="text-sm font-semibold text-slate-600 hover:text-[#087dcc]">
          ← Back to Administration
        </a>

        <div className="mt-8 flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#18b8ee]">
              Client enquiries
            </p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight md:text-4xl">
              Service enquiries
            </h2>
            <p className="mt-3 max-w-3xl text-slate-600">
              Private enquiries submitted through the CURA service pages, including Bookkeeping and Payroll.
            </p>
          </div>

          <select
            value={filter}
            onChange={(event) => setFilter(event.target.value)}
            className="rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm font-semibold"
          >
            <option value="all">All services</option>
            <option value="audit">Audit</option>
            <option value="tax">Tax</option>
            <option value="advisory">Advisory</option>
            <option value="legal">Legal</option>
            <option value="bookkeeping">Bookkeeping</option>
            <option value="payroll">Payroll</option>
          </select>
        </div>

        {error && (
          <div className="mt-6 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
            {error}
          </div>
        )}

        <div className="mt-8 space-y-4">
          {filtered.length === 0 ? (
            <div className="rounded-xl border border-slate-200 bg-white p-12 text-center text-slate-500">
              No service enquiries yet.
            </div>
          ) : (
            filtered.map((inquiry) => {
              const isOpen = expanded === inquiry.id

              return (
                <article key={inquiry.id} className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                  <button
                    type="button"
                    onClick={() => setExpanded(isOpen ? null : inquiry.id)}
                    className="w-full p-6 text-left transition hover:bg-slate-50"
                  >
                    <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
                      <div>
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="rounded-full bg-[#eaf8fd] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-[#087dcc]">
                            {serviceLabels[inquiry.service]}
                          </span>
                          <span className="rounded-full bg-slate-100 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-slate-600">
                            {inquiry.status}
                          </span>
                          {inquiry.urgency === "Urgent" && (
                            <span className="rounded-full bg-red-50 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-red-700">
                              Urgent
                            </span>
                          )}
                        </div>
                        <h3 className="mt-3 text-xl font-bold">{inquiry.business_name}</h3>
                        <p className="mt-1 text-sm text-slate-600">
                          {inquiry.full_name} · {inquiry.email}
                        </p>
                      </div>
                      <div className="text-sm text-slate-500 md:text-right">
                        <p>{new Date(inquiry.created_at).toLocaleString()}</p>
                        <p className="mt-1 font-semibold text-[#071d41]">{isOpen ? "Hide details ↑" : "View details ↓"}</p>
                      </div>
                    </div>
                  </button>

                  {isOpen && (
                    <div className="border-t border-slate-200 bg-[#F8FAFD] p-6">
                      <div className="grid gap-8 lg:grid-cols-[1.4fr_0.6fr]">
                        <div className="space-y-7">
                          <div>
                            <h4 className="text-sm font-bold uppercase tracking-[0.18em] text-slate-400">Contact</h4>
                            <p className="mt-3 text-sm leading-7">
                              <strong>Name:</strong> {inquiry.full_name}<br />
                              <strong>Email:</strong> <a className="text-[#087dcc] hover:underline" href={`mailto:${inquiry.email}`}>{inquiry.email}</a><br />
                              <strong>Phone / WhatsApp:</strong> {inquiry.phone}<br />
                              <strong>Preferred contact:</strong> {inquiry.preferred_contact_method}
                            </p>
                          </div>

                          <div>
                            <h4 className="text-sm font-bold uppercase tracking-[0.18em] text-slate-400">Business</h4>
                            <p className="mt-3 text-sm leading-7">
                              <strong>Business:</strong> {inquiry.business_name}<br />
                              <strong>Industry:</strong> {inquiry.business_type}<br />
                              <strong>Location:</strong> {inquiry.business_location || "Not provided"}<br />
                              <strong>Website:</strong> {inquiry.website || "Not provided"}
                            </p>
                          </div>

                          <div>
                            <h4 className="text-sm font-bold uppercase tracking-[0.18em] text-slate-400">Current circumstance</h4>
                            <p className="mt-3 whitespace-pre-wrap text-sm leading-7 text-slate-700">{inquiry.current_circumstance}</p>
                          </div>

                          <div>
                            <h4 className="text-sm font-bold uppercase tracking-[0.18em] text-slate-400">Assistance requested</h4>
                            <p className="mt-3 whitespace-pre-wrap text-sm leading-7 text-slate-700">{inquiry.assistance_required}</p>
                          </div>
                        </div>

                        <aside className="rounded-xl border border-slate-200 bg-white p-5">
                          <label className="block text-sm font-semibold">
                            Status
                            <select
                              value={inquiry.status}
                              disabled={savingId === inquiry.id}
                              onChange={(event) =>
                                updateInquiry(inquiry.id, {
                                  status: event.target.value as Inquiry["status"],
                                })
                              }
                              className="mt-2 w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm"
                            >
                              {statuses.map((status) => <option key={status}>{status}</option>)}
                            </select>
                          </label>

                          <label className="mt-6 block text-sm font-semibold">
                            Internal notes
                            <textarea
                              defaultValue={inquiry.admin_notes || ""}
                              onBlur={(event) =>
                                updateInquiry(inquiry.id, { admin_notes: event.target.value })
                              }
                              rows={8}
                              className="mt-2 w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm"
                              placeholder="Private notes for CURA..."
                            />
                          </label>

                          <div className="mt-6 border-t border-slate-200 pt-5 text-xs leading-5 text-slate-500">
                            <p><strong>Email notification:</strong> {inquiry.email_sent ? "Sent" : "Not sent / unavailable"}</p>
                            <p className="mt-1"><strong>Reference:</strong> {inquiry.id}</p>
                          </div>
                        </aside>
                      </div>
                    </div>
                  )}
                </article>
              )
            })
          )}
        </div>
      </div>

      <footer className="border-t border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl justify-between px-6 py-6 text-sm text-slate-500">
          <p>© {new Date().getFullYear()} CURA. All rights reserved.</p>
          <a href="/" className="font-semibold text-[#071d41] hover:text-[#087dcc]">Return to CURA →</a>
        </div>
      </footer>
    </main>
  )
}
