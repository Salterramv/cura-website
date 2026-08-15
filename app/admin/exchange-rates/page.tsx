"use client"

import { FormEvent, useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"

type MoneyExchanger = {
  id: string
  name: string
  active: boolean
}

type ExchangeRate = {
  id: string
  exchanger_id: string
  rate_date: string
  rate_time: string
  mvr_per_usd: number
  source: string | null
  notes: string | null
  created_at: string
  updated_at: string
    money_exchangers?: {
    name: string
  }[] | null
}

export default function AdminExchangeRatesPage() {
  const supabase = createClient()

  const [exchangers, setExchangers] = useState<MoneyExchanger[]>([])
  const [rates, setRates] = useState<ExchangeRate[]>([])

  const [rateDate, setRateDate] = useState("")
  const [rateTime, setRateTime] = useState("")
  const [exchangerId, setExchangerId] = useState("")
  const [rate, setRate] = useState("")
  const [source, setSource] = useState("")
  const [notes, setNotes] = useState("")

  const [editingId, setEditingId] = useState<string | null>(null)

  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  // ------------------------------------------------------------
  // ADMIN CHECK
  // ------------------------------------------------------------

  useEffect(() => {
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

      await Promise.all([
        loadExchangers(),
        loadRates(),
      ])

      setLoading(false)
    }

    checkAdmin()
  }, [])

  // ------------------------------------------------------------
  // LOAD MONEY EXCHANGERS
  // ------------------------------------------------------------

  async function loadExchangers() {
    const { data, error } = await supabase
      .from("money_exchangers")
      .select("id, name, active")
      .eq("active", true)
      .order("name", { ascending: true })

    if (error) {
      setError(error.message)
      return
    }

    setExchangers(data || [])

    if (data && data.length > 0 && !exchangerId) {
      setExchangerId(data[0].id)
    }
  }

  // ------------------------------------------------------------
  // LOAD RATES
  // ------------------------------------------------------------

  async function loadRates() {
    const { data, error } = await supabase
      .from("exchange_rates")
      .select(`
        id,
        exchanger_id,
        rate_date,
        rate_time,
        mvr_per_usd,
        source,
        notes,
        created_at,
        updated_at,
        money_exchangers (
          name
        )
      `)
      .order("rate_date", { ascending: false })
      .order("rate_time", { ascending: false })

    if (error) {
      setError(error.message)
      return
    }

    setRates(data || [])
  }

  // ------------------------------------------------------------
  // RESET FORM
  // ------------------------------------------------------------

  function resetForm() {
    setRateDate("")
    setRateTime("")
    setRate("")
    setSource("")
    setNotes("")
    setEditingId(null)
    setError("")
  }

  // ------------------------------------------------------------
  // ADD / UPDATE RATE
  // ------------------------------------------------------------

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    setError("")
    setSuccess("")

    if (!rateDate) {
      setError("Please select a rate date.")
      return
    }

    if (!rateTime) {
      setError("Please enter the rate time.")
      return
    }

    if (!exchangerId) {
      setError("Please select a money exchanger.")
      return
    }

    const numericRate = Number(rate)

    if (!rate || Number.isNaN(numericRate) || numericRate <= 0) {
      setError("Please enter a valid MVR per USD exchange rate.")
      return
    }

    setSaving(true)

    if (editingId) {
      const { error } = await supabase
        .from("exchange_rates")
        .update({
          exchanger_id: exchangerId,
          rate_date: rateDate,
          rate_time: rateTime,
          mvr_per_usd: numericRate,
          source: source.trim() || null,
          notes: notes.trim() || null,
          updated_at: new Date().toISOString(),
        })
        .eq("id", editingId)

      if (error) {
        setError(error.message)
        setSaving(false)
        return
      }

      setSuccess("Exchange rate updated successfully.")
    } else {
      const { error } = await supabase
        .from("exchange_rates")
        .insert({
          exchanger_id: exchangerId,
          rate_date: rateDate,
          rate_time: rateTime,
          mvr_per_usd: numericRate,
          source: source.trim() || null,
          notes: notes.trim() || null,
        })

      if (error) {
        setError(error.message)
        setSaving(false)
        return
      }

      setSuccess("Exchange rate added successfully.")
    }

    resetForm()
    setSaving(false)

    await loadRates()
  }

  // ------------------------------------------------------------
  // EDIT
  // ------------------------------------------------------------

  function startEdit(rateRecord: ExchangeRate) {
    setEditingId(rateRecord.id)
    setRateDate(rateRecord.rate_date)
    setRateTime(rateRecord.rate_time?.slice(0, 5) || "")
    setExchangerId(rateRecord.exchanger_id)
    setRate(String(rateRecord.mvr_per_usd))
    setSource(rateRecord.source || "")
    setNotes(rateRecord.notes || "")

    setError("")
    setSuccess("")

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  // ------------------------------------------------------------
  // DELETE
  // ------------------------------------------------------------

  async function deleteRate(rateRecord: ExchangeRate) {
    const exchangerName =
  rateRecord.money_exchangers?.[0]?.name || "this exchanger"

    const confirmed = window.confirm(
      `Delete the exchange rate for ${exchangerName} on ${formatDate(
        rateRecord.rate_date,
      )} at ${formatTime(rateRecord.rate_time)}?`,
    )

    if (!confirmed) return

    setError("")
    setSuccess("")

    const { error } = await supabase
      .from("exchange_rates")
      .delete()
      .eq("id", rateRecord.id)

    if (error) {
      setError(error.message)
      return
    }

    setSuccess("Exchange rate deleted successfully.")

    await loadRates()
  }

  // ------------------------------------------------------------
  // FORMAT DATE
  // ------------------------------------------------------------

  function formatDate(dateString: string) {
    const date = new Date(`${dateString}T00:00:00`)

    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    })
  }

  // ------------------------------------------------------------
  // FORMAT TIME
  // ------------------------------------------------------------

  function formatTime(timeString: string) {
    if (!timeString) return "—"

    const [hours, minutes] = timeString.split(":")

    const date = new Date()
    date.setHours(Number(hours), Number(minutes), 0, 0)

    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    })
  }

  // ------------------------------------------------------------
  // LOADING
  // ------------------------------------------------------------

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#f4f7fb]">
        <div className="text-center">
          <div className="mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-4 border-slate-200 border-t-[#18b8ee]" />

          <p className="text-sm font-medium text-slate-600">
            Loading exchange rates...
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

      {/* HEADER */}

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
                Exchange Rates
              </h1>

            </div>

          </div>

          {/* HEADER BUTTONS */}

          <div className="flex items-center gap-3">

            <a
              href="/exchange-rate"
              className="rounded-lg border border-white bg-white px-5 py-2.5 text-sm font-semibold !text-[#061b3d] transition hover:bg-[#eafaff]"
            >
              View Public Page
            </a>

            <a
              href="/admin/money-exchangers"
              className="rounded-lg border border-[#18b8ee]/60 px-5 py-2.5 text-sm font-semibold text-white transition hover:border-[#18b8ee] hover:bg-[#18b8ee]/10"
            >
              Money Exchangers
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

      {/* MAIN */}

      <div className="mx-auto max-w-7xl px-6 py-10">

        {/* INTRO */}

        <div className="mb-8">

          <p className="mb-2 text-xs font-bold uppercase tracking-[0.28em] text-[#18b8ee]">
            Financial Information
          </p>

          <h2 className="text-3xl font-bold tracking-tight">
            Manage MVR / USD Exchange Rates
          </h2>

          <p className="mt-3 max-w-4xl text-sm leading-6 text-slate-600">
            Enter exchange rates published by authorized money exchangers.
            Multiple rates can be recorded for the same exchanger on the same
            day.
          </p>

        </div>

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

        {/* ADD RATE */}

        <section className="mb-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

          <div className="mb-6">

            <h3 className="text-xl font-bold">
              {editingId ? "Edit Exchange Rate" : "Add Exchange Rate"}
            </h3>

            <p className="mt-1 text-sm text-slate-500">
              {editingId
                ? "Update the selected exchange-rate record."
                : "Enter a rate for an authorized money exchanger."}
            </p>

          </div>

          <form onSubmit={handleSubmit}>

            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">

              {/* DATE */}

              <div>

                <label
                  htmlFor="rate-date"
                  className="mb-2 block text-sm font-semibold"
                >
                  Rate Date
                </label>

                <input
                  id="rate-date"
                  type="date"
                  value={rateDate}
                  onChange={(event) => setRateDate(event.target.value)}
                  className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-[#18b8ee] focus:ring-2 focus:ring-[#18b8ee]/20"
                />

              </div>

              {/* TIME */}

              <div>

                <label
                  htmlFor="rate-time"
                  className="mb-2 block text-sm font-semibold"
                >
                  Rate Time
                </label>

                <input
                  id="rate-time"
                  type="time"
                  value={rateTime}
                  onChange={(event) => setRateTime(event.target.value)}
                  className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-[#18b8ee] focus:ring-2 focus:ring-[#18b8ee]/20"
                />

              </div>

              {/* EXCHANGER */}

              <div>

                <label
                  htmlFor="exchanger"
                  className="mb-2 block text-sm font-semibold"
                >
                  Money Exchanger
                </label>

                <select
                  id="exchanger"
                  value={exchangerId}
                  onChange={(event) => setExchangerId(event.target.value)}
                  className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-[#18b8ee] focus:ring-2 focus:ring-[#18b8ee]/20"
                >

                  <option value="">
                    Select exchanger
                  </option>

                  {exchangers.map((exchanger) => (
                    <option
                      key={exchanger.id}
                      value={exchanger.id}
                    >
                      {exchanger.name}
                    </option>
                  ))}

                </select>

              </div>

              {/* RATE */}

              <div>

                <label
                  htmlFor="rate"
                  className="mb-2 block text-sm font-semibold"
                >
                  MVR per USD
                </label>

                <input
                  id="rate"
                  type="number"
                  step="0.0001"
                  min="0"
                  value={rate}
                  onChange={(event) => setRate(event.target.value)}
                  placeholder="e.g. 15.4200"
                  className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-[#18b8ee] focus:ring-2 focus:ring-[#18b8ee]/20"
                />

              </div>

            </div>

            {/* SOURCE + NOTES */}

            <div className="mt-5 grid gap-5 md:grid-cols-2">

              <div>

                <label
                  htmlFor="source"
                  className="mb-2 block text-sm font-semibold"
                >
                  Source
                </label>

                <input
                  id="source"
                  type="text"
                  value={source}
                  onChange={(event) => setSource(event.target.value)}
                  placeholder="e.g. MIRA, exchanger website, official notice"
                  className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-[#18b8ee] focus:ring-2 focus:ring-[#18b8ee]/20"
                />

              </div>

              <div>

                <label
                  htmlFor="notes"
                  className="mb-2 block text-sm font-semibold"
                >
                  Notes
                </label>

                <input
                  id="notes"
                  type="text"
                  value={notes}
                  onChange={(event) => setNotes(event.target.value)}
                  placeholder="Optional"
                  className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-[#18b8ee] focus:ring-2 focus:ring-[#18b8ee]/20"
                />

              </div>

            </div>

            {/* FORM BUTTONS */}

            <div className="mt-6 flex justify-end gap-3">

              {editingId && (
                <button
                  type="button"
                  onClick={resetForm}
                  className="rounded-lg border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                >
                  Cancel
                </button>
              )}

              <button
                type="submit"
                disabled={saving || exchangers.length === 0}
                className="rounded-lg bg-[#061b3d] px-7 py-3 text-sm font-semibold text-white transition hover:bg-[#0b2d5c] disabled:cursor-not-allowed disabled:opacity-50"
              >
                {saving
                  ? "Saving..."
                  : editingId
                    ? "Update Rate"
                    : "Add Rate"}
              </button>

            </div>

          </form>

        </section>

        {/* RATE HISTORY */}

        <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

          <div className="flex items-center justify-between border-b border-slate-200 px-6 py-5">

            <div>

              <h3 className="text-xl font-bold">
                Exchange Rate History
              </h3>

              <p className="mt-1 text-sm text-slate-500">
                All MVR / USD exchange rates currently published in CURA.
              </p>

            </div>

            <span className="rounded-full bg-[#e8f8fd] px-4 py-2 text-sm font-semibold text-[#078ab8]">
              {rates.length}{" "}
              {rates.length === 1 ? "record" : "records"}
            </span>

          </div>

          {rates.length === 0 ? (

            <div className="px-6 py-14 text-center">

              <h4 className="text-lg font-semibold">
                No exchange rates available
              </h4>

              <p className="mt-2 text-sm text-slate-500">
                Add the first exchange rate using the form above.
              </p>

            </div>

          ) : (

            <div className="overflow-x-auto">

              <table className="w-full min-w-[950px]">

                <thead className="border-b border-slate-200 bg-slate-50">

                  <tr>

                    <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-500">
                      Date
                    </th>

                    <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-500">
                      Time
                    </th>

                    <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-500">
                      Money Exchanger
                    </th>

                    <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-500">
                      MVR / USD
                    </th>

                    <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-500">
                      Source
                    </th>

                    <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-500">
                      Notes
                    </th>

                    <th className="px-6 py-4 text-right text-xs font-bold uppercase tracking-wider text-slate-500">
                      Actions
                    </th>

                  </tr>

                </thead>

                <tbody className="divide-y divide-slate-100">

                  {rates.map((rateRecord) => (

                    <tr
                      key={rateRecord.id}
                      className="transition hover:bg-slate-50"
                    >

                      <td className="whitespace-nowrap px-6 py-5 text-sm font-medium">
                        {formatDate(rateRecord.rate_date)}
                      </td>

                      <td className="whitespace-nowrap px-6 py-5 text-sm text-slate-600">
                        {formatTime(rateRecord.rate_time)}
                      </td>

                      <td className="whitespace-nowrap px-6 py-5 text-sm font-semibold">
                        {rateRecord.money_exchangers?.[0]?.name || "Unknown"}
                      </td>

                      <td className="whitespace-nowrap px-6 py-5">

                        <span className="text-base font-bold">
                          {Number(rateRecord.mvr_per_usd).toFixed(4)}
                        </span>

                        <span className="ml-1 text-xs text-slate-400">
                          MVR
                        </span>

                      </td>

                      <td className="max-w-[180px] px-6 py-5 text-sm text-slate-600">
                        {rateRecord.source || "—"}
                      </td>

                      <td className="max-w-[220px] px-6 py-5 text-sm text-slate-600">
                        {rateRecord.notes || "—"}
                      </td>

                      <td className="whitespace-nowrap px-6 py-5 text-right">

                        <div className="flex justify-end gap-2">

                          <button
                            type="button"
                            onClick={() => startEdit(rateRecord)}
                            className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-[#071d41] transition hover:border-[#18b8ee] hover:text-[#078ab8]"
                          >
                            Edit
                          </button>

                          <button
                            type="button"
                            onClick={() => deleteRate(rateRecord)}
                            className="rounded-lg border border-red-200 px-4 py-2 text-sm font-semibold text-red-600 transition hover:bg-red-50"
                          >
                            Delete
                          </button>

                        </div>

                      </td>

                    </tr>

                  ))}

                </tbody>

              </table>

            </div>

          )}

        </section>

      </div>

    </main>
  )
}