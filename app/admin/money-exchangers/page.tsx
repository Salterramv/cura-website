"use client"

import { FormEvent, useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"

type MoneyExchanger = {
  id: string
  name: string
  active: boolean
  created_at: string
  updated_at: string
}

export default function MoneyExchangersPage() {
  const supabase = createClient()

  const [exchangers, setExchangers] = useState<MoneyExchanger[]>([])
  const [name, setName] = useState("")
  const [loading, setLoading] = useState(true)
  const [authorizing, setAuthorizing] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [editingId, setEditingId] = useState<string | null>(null)

  // ------------------------------------------------------------
  // CHECK ADMIN ACCESS
  // ------------------------------------------------------------

  useEffect(() => {
    async function checkAdminAccess() {
      setAuthorizing(true)

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

      setAuthorizing(false)

      await loadExchangers()
    }

    checkAdminAccess()
  }, [])

  // ------------------------------------------------------------
  // LOAD EXCHANGERS
  // ------------------------------------------------------------

  async function loadExchangers() {
    setLoading(true)
    setError("")

    const { data, error } = await supabase
      .from("money_exchangers")
      .select("*")
      .order("name", { ascending: true })

    if (error) {
      setError(error.message)
      setLoading(false)
      return
    }

    setExchangers(data || [])
    setLoading(false)
  }

  // ------------------------------------------------------------
  // ADD / UPDATE
  // ------------------------------------------------------------

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    setError("")
    setSuccess("")

    const trimmedName = name.trim()

    if (!trimmedName) {
      setError("Please enter the money exchanger name.")
      return
    }

    setSaving(true)

    if (editingId) {
      const { error } = await supabase
        .from("money_exchangers")
        .update({
          name: trimmedName,
          updated_at: new Date().toISOString(),
        })
        .eq("id", editingId)

      if (error) {
        setError(error.message)
        setSaving(false)
        return
      }

      setSuccess("Money exchanger updated successfully.")
    } else {
      const { error } = await supabase
        .from("money_exchangers")
        .insert({
          name: trimmedName,
          active: true,
        })

      if (error) {
        setError(error.message)
        setSaving(false)
        return
      }

      setSuccess("Money exchanger added successfully.")
    }

    setName("")
    setEditingId(null)
    setSaving(false)

    await loadExchangers()
  }

  // ------------------------------------------------------------
  // EDIT
  // ------------------------------------------------------------

  function startEdit(exchanger: MoneyExchanger) {
    setName(exchanger.name)
    setEditingId(exchanger.id)
    setError("")
    setSuccess("")

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  // ------------------------------------------------------------
  // CANCEL EDIT
  // ------------------------------------------------------------

  function cancelEdit() {
    setName("")
    setEditingId(null)
    setError("")
    setSuccess("")
  }

  // ------------------------------------------------------------
  // ACTIVATE / DEACTIVATE
  // ------------------------------------------------------------

  async function toggleActive(exchanger: MoneyExchanger) {
    setError("")
    setSuccess("")

    const { error } = await supabase
      .from("money_exchangers")
      .update({
        active: !exchanger.active,
        updated_at: new Date().toISOString(),
      })
      .eq("id", exchanger.id)

    if (error) {
      setError(error.message)
      return
    }

    setSuccess(
      exchanger.active
        ? `${exchanger.name} has been deactivated.`
        : `${exchanger.name} has been activated.`,
    )

    await loadExchangers()
  }

  // ------------------------------------------------------------
  // AUTHORIZATION SCREEN
  // ------------------------------------------------------------

  if (authorizing) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#f4f7fb]">
        <div className="text-center">
          <div className="mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-4 border-slate-200 border-t-[#18b8ee]" />

          <p className="text-sm font-medium text-slate-600">
            Checking administrator access...
          </p>
        </div>
      </main>
    )
  }

  // ------------------------------------------------------------
  // PAGE
  // ------------------------------------------------------------

  return (
    <main className="min-h-screen bg-[#f4f7fb] text-[#071d41]">

      {/* ======================================================
          HEADER
      ====================================================== */}

      <header className="bg-[#061b3d] text-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">

          {/* BRAND */}

          <div className="flex items-center gap-5">

            <div className="flex items-center border-r border-white/15 pr-6">
  <img
    src="/cura-logo.png"
    alt="CURA"
    className="h-12 w-auto object-contain brightness-0 invert"
  />
</div>

            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-[#18b8ee]">
                CURA Administration
              </p>

              <h1 className="mt-1 text-lg font-semibold text-white">
                Money Exchangers
              </h1>
            </div>

          </div>

          {/* HEADER BUTTONS */}

          <div className="flex items-center gap-3">

            <a
              href="/admin/exchange-rates"
              className="flex items-center gap-2 rounded-lg border border-[#18b8ee]/60 px-5 py-2.5 text-sm font-semibold text-white transition hover:border-[#18b8ee] hover:bg-[#18b8ee]/10"
            >
              <span className="text-[#18b8ee]">↗</span>
              Exchange Rates
            </a>

            <a
  href="/exchange-rate"
  className="rounded-lg border border-white bg-white px-5 py-2.5 text-sm font-semibold !text-[#061b3d] transition hover:bg-[#eafaff]"
>
  View Public Page
</a>

            <button
              type="button"
              onClick={async () => {
                await supabase.auth.signOut()
                window.location.href = "/admin/login"
              }}
              className="rounded-lg bg-gradient-to-r from-[#18b8ee] to-[#087dcc] px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:from-[#25c5f5] hover:to-[#0b8cda]"
            >
              Sign Out
            </button>

          </div>

        </div>
      </header>

      {/* ======================================================
          MAIN CONTENT
      ====================================================== */}

      <div className="mx-auto max-w-7xl px-6 py-10">

        {/* PAGE INTRO */}

        <div className="mb-8">

          <p className="mb-2 text-xs font-bold uppercase tracking-[0.28em] text-[#18b8ee]">
            Financial Information
          </p>

          <h2 className="text-3xl font-bold tracking-tight">
            Authorized Money Exchangers
          </h2>

          <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-600">
            Manage the authorized money exchangers whose MVR / USD exchange
            rates will be published on the CURA website.
          </p>

        </div>

        {/* ERROR */}

        {error && (
          <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-5 py-4 text-sm text-red-700">
            {error}
          </div>
        )}

        {/* SUCCESS */}

        {success && (
          <div className="mb-6 rounded-xl border border-emerald-200 bg-emerald-50 px-5 py-4 text-sm text-emerald-700">
            {success}
          </div>
        )}

        {/* ======================================================
            ADD EXCHANGER
        ====================================================== */}

        <section className="mb-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

          <div className="mb-5">

            <h3 className="text-xl font-bold">
              {editingId
                ? "Edit Money Exchanger"
                : "Add Money Exchanger"}
            </h3>

            <p className="mt-1 text-sm text-slate-500">
              {editingId
                ? "Update the name of this authorized money exchanger."
                : "Add an authorized money exchanger to the CURA exchange-rate system."}
            </p>

          </div>

          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-4 md:flex-row md:items-end"
          >

            <div className="flex-1">

              <label
                htmlFor="name"
                className="mb-2 block text-sm font-semibold"
              >
                Money Exchanger Name
              </label>

              <input
                id="name"
                type="text"
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder="e.g. Bank of Maldives"
                className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-[#18b8ee] focus:ring-2 focus:ring-[#18b8ee]/20"
              />

            </div>

            <div className="flex gap-3">

              <button
                type="submit"
                disabled={saving}
                className="rounded-lg bg-[#061b3d] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#0b2d5c] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {saving
                  ? "Saving..."
                  : editingId
                    ? "Update Exchanger"
                    : "Add Exchanger"}
              </button>

              {editingId && (
                <button
                  type="button"
                  onClick={cancelEdit}
                  className="rounded-lg border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                >
                  Cancel
                </button>
              )}

            </div>

          </form>

        </section>

        {/* ======================================================
            EXCHANGER LIST
        ====================================================== */}

        <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

          {/* LIST HEADER */}

          <div className="flex items-center justify-between border-b border-slate-200 px-6 py-5">

            <div>

              <h3 className="text-xl font-bold">
                Authorized Money Exchangers
              </h3>

              <p className="mt-1 text-sm text-slate-500">
                Active exchangers can be selected when entering exchange rates.
              </p>

            </div>

            <span className="rounded-full bg-[#e8f8fd] px-4 py-2 text-sm font-semibold text-[#078ab8]">
              {exchangers.length}{" "}
              {exchangers.length === 1
                ? "exchanger"
                : "exchangers"}
            </span>

          </div>

          {/* LIST CONTENT */}

          {loading ? (

            <div className="px-6 py-12 text-center text-sm text-slate-500">
              Loading money exchangers...
            </div>

          ) : exchangers.length === 0 ? (

            <div className="px-6 py-14 text-center">

              <h4 className="text-lg font-semibold">
                No money exchangers added
              </h4>

              <p className="mt-2 text-sm text-slate-500">
                Add your first authorized money exchanger using the form above.
              </p>

            </div>

          ) : (

            <div className="divide-y divide-slate-100">

              {exchangers.map((exchanger) => (

                <div
                  key={exchanger.id}
                  className="flex flex-col gap-4 px-6 py-5 md:flex-row md:items-center md:justify-between"
                >

                  {/* EXCHANGER DETAILS */}

                  <div>

                    <div className="flex items-center gap-3">

                      <h4 className="font-semibold text-[#071d41]">
                        {exchanger.name}
                      </h4>

                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${
                          exchanger.active
                            ? "bg-emerald-50 text-emerald-700"
                            : "bg-slate-100 text-slate-500"
                        }`}
                      >
                        {exchanger.active
                          ? "Active"
                          : "Inactive"}
                      </span>

                    </div>

                    <p className="mt-1 text-xs text-slate-400">
                      Added{" "}
                      {new Date(
                        exchanger.created_at,
                      ).toLocaleDateString("en-GB")}
                    </p>

                  </div>

                  {/* ACTIONS */}

                  <div className="flex flex-wrap gap-2">

                    <button
                      type="button"
                      onClick={() => startEdit(exchanger)}
                      className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-[#071d41] transition hover:border-[#18b8ee] hover:text-[#078ab8]"
                    >
                      Edit
                    </button>

                    <button
                      type="button"
                      onClick={() => toggleActive(exchanger)}
                      className={`rounded-lg px-4 py-2 text-sm font-semibold transition ${
                        exchanger.active
                          ? "border border-red-200 text-red-600 hover:bg-red-50"
                          : "border border-emerald-200 text-emerald-700 hover:bg-emerald-50"
                      }`}
                    >
                      {exchanger.active
                        ? "Deactivate"
                        : "Activate"}
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