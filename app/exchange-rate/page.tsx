"use client"

import { useEffect, useMemo, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import CuraHeader from "@/components/CuraHeader"
import CuraFooter from "@/components/CuraFooter"

type Exchanger = {
  id: string
  name: string
  active: boolean
}

type ExchangeRate = {
  id: string
  rate_date: string
  rate_time: string | null
  mvr_per_usd: number
  source: string | null
  notes: string | null
  exchanger_id: string
  created_at: string
}

const supabase = createClient()

function formatDate(dateString: string) {
  const date = new Date(`${dateString}T00:00:00`)

  return date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  })
}

function formatShortDate(dateString: string) {
  const date = new Date(`${dateString}T00:00:00`)

  return date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  })
}

function formatTime(time: string | null) {
  if (!time) return "—"

  const [hours, minutes] = time.split(":").map(Number)

  const date = new Date()
  date.setHours(hours, minutes, 0, 0)

  return date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
  })
}

export default function ExchangeRatePage() {
  const [exchangers, setExchangers] = useState<Exchanger[]>([])
  const [rates, setRates] = useState<ExchangeRate[]>([])

  const [selectedDate, setSelectedDate] = useState("")
  const [selectedExchanger, setSelectedExchanger] = useState("all")

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    loadExchangeData()
  }, [])

  async function loadExchangeData() {
    setLoading(true)
    setError("")

    const [exchangerResult, rateResult] = await Promise.all([
      supabase
        .from("money_exchangers")
        .select("id, name, active")
        .eq("active", true)
        .order("name"),

      supabase
        .from("exchange_rates")
        .select(
          "id, rate_date, rate_time, mvr_per_usd, source, notes, exchanger_id, created_at"
        )
        .not("exchanger_id", "is", null)
        .order("rate_date", { ascending: false })
        .order("rate_time", { ascending: false }),
    ])

    if (exchangerResult.error) {
      setError(exchangerResult.error.message)
      setLoading(false)
      return
    }

    if (rateResult.error) {
      setError(rateResult.error.message)
      setLoading(false)
      return
    }

    const activeExchangers = exchangerResult.data || []
    const exchangeRates = (rateResult.data || []) as ExchangeRate[]

    setExchangers(activeExchangers)
    setRates(exchangeRates)

    if (exchangeRates.length > 0) {
      setSelectedDate(exchangeRates[0].rate_date)
    }

    setLoading(false)
  }

  const availableDates = useMemo(() => {
    return Array.from(new Set(rates.map((rate) => rate.rate_date))).sort(
      (a, b) => b.localeCompare(a)
    )
  }, [rates])

  const selectedDateRates = useMemo(() => {
    return rates
      .filter((rate) => rate.rate_date === selectedDate)
      .filter(
        (rate) =>
          selectedExchanger === "all" ||
          rate.exchanger_id === selectedExchanger
      )
      .sort((a, b) => {
        const timeA = a.rate_time || "00:00:00"
        const timeB = b.rate_time || "00:00:00"

        return timeB.localeCompare(timeA)
      })
  }, [rates, selectedDate, selectedExchanger])

  const latestRates = useMemo(() => {
    const latestByExchanger = new Map<string, ExchangeRate>()

    rates
      .filter((rate) => rate.rate_date === selectedDate)
      .filter(
        (rate) =>
          selectedExchanger === "all" ||
          rate.exchanger_id === selectedExchanger
      )
      .sort((a, b) => {
        const timeA = a.rate_time || "00:00:00"
        const timeB = b.rate_time || "00:00:00"

        return timeB.localeCompare(timeA)
      })
      .forEach((rate) => {
        if (!latestByExchanger.has(rate.exchanger_id)) {
          latestByExchanger.set(rate.exchanger_id, rate)
        }
      })

    return Array.from(latestByExchanger.values())
  }, [rates, selectedDate, selectedExchanger])

  function getExchangerName(id: string) {
    return exchangers.find((exchanger) => exchanger.id === id)?.name || "Unknown"
  }

  return (
    <>
      <CuraHeader />

      <main className="min-h-screen bg-[#f4f7fb] text-[#071d41]">
      <CuraHeader />

      {/* HERO */}
      <section className="border-b border-[#164a73] bg-gradient-to-r from-[#061b3a] to-[#0f4f7a] text-white">
        <div className="mx-auto max-w-7xl px-6 py-14 md:px-10 lg:px-12">
          <div className="mb-8">
          </div>

          <div className="max-w-4xl">
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.28em] text-[#18b8ee]">
              Financial Information
            </p>

            <h1 className="text-4xl font-bold tracking-tight text-white md:text-5xl">
              MVR / USD Exchange Rates
            </h1>

            <p className="mt-5 max-w-3xl text-base leading-7 text-[#58708e] md:text-lg">
              View exchange rates published by authorized money exchangers in
              the Maldives. Rates are presented with the date and time at which
              they were recorded.
            </p>
          </div>
        </div>
      </section>

      {/* CONTENT */}
      <section className="mx-auto max-w-7xl px-6 py-10 md:px-10 lg:px-12">
        {loading ? (
          <div className="rounded-2xl border border-[#dce5ef] bg-white p-10 text-center shadow-sm">
            <p className="text-[#58708e]">Loading exchange rates...</p>
          </div>
        ) : error ? (
          <div className="rounded-2xl border border-red-200 bg-red-50 p-6">
            <h2 className="font-semibold text-red-700">
              Unable to load exchange rates
            </h2>

            <p className="mt-2 text-sm text-red-600">
              {error}
            </p>
          </div>
        ) : rates.length === 0 ? (
          <div className="rounded-2xl border border-[#dce5ef] bg-white p-10 shadow-sm">
            <h2 className="text-xl font-bold text-[#071d41]">
              No exchange rates available
            </h2>

            <p className="mt-2 text-[#58708e]">
              Exchange rate information has not yet been published.
            </p>
          </div>
        ) : (
          <>
            {/* FILTER CARD */}
            <div className="rounded-2xl border border-[#dce5ef] bg-white p-6 shadow-sm md:p-8">
              <div className="mb-6">
                <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#18b8ee]">
                  View Rates
                </p>

                <h2 className="mt-2 text-2xl font-bold text-[#071d41]">
                  Select Date and Money Exchanger
                </h2>

                <p className="mt-2 text-sm text-[#58708e]">
                  Choose a date and exchanger to view the published MVR / USD
                  rates.
                </p>
              </div>

              <div className="grid gap-5 md:grid-cols-2">
                {/* DATE */}
                <div>
                  <label
                    htmlFor="rate-date"
                    className="mb-2 block text-sm font-semibold text-[#071d41]"
                  >
                    Rate Date
                  </label>

                  <select
                    id="rate-date"
                    value={selectedDate}
                    onChange={(event) => setSelectedDate(event.target.value)}
                    className="w-full rounded-xl border border-[#cbd8e6] bg-white px-4 py-3 text-sm text-[#071d41] outline-none transition focus:border-[#18b8ee] focus:ring-2 focus:ring-[#18b8ee]/20"
                  >
                    {availableDates.map((date) => (
                      <option key={date} value={date}>
                        {formatDate(date)}
                      </option>
                    ))}
                  </select>
                </div>

                {/* EXCHANGER */}
                <div>
                  <label
                    htmlFor="money-exchanger"
                    className="mb-2 block text-sm font-semibold text-[#071d41]"
                  >
                    Money Exchanger
                  </label>

                  <select
                    id="money-exchanger"
                    value={selectedExchanger}
                    onChange={(event) =>
                      setSelectedExchanger(event.target.value)
                    }
                    className="w-full rounded-xl border border-[#cbd8e6] bg-white px-4 py-3 text-sm text-[#071d41] outline-none transition focus:border-[#18b8ee] focus:ring-2 focus:ring-[#18b8ee]/20"
                  >
                    <option value="all">
                      All Authorized Exchangers
                    </option>

                    {exchangers.map((exchanger) => (
                      <option key={exchanger.id} value={exchanger.id}>
                        {exchanger.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* LATEST RATES */}
            <div className="mt-10">
              <div className="mb-5">
                <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#18b8ee]">
                  Latest Recorded Rates
                </p>

                <h2 className="mt-2 text-2xl font-bold text-[#071d41]">
                  {formatDate(selectedDate)}
                </h2>
              </div>

              {latestRates.length === 0 ? (
                <div className="rounded-2xl border border-[#dce5ef] bg-white p-8 shadow-sm">
                  <p className="text-[#58708e]">
                    No exchange rate has been recorded for the selected date
                    and exchanger.
                  </p>
                </div>
              ) : (
                <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                  {latestRates.map((rate) => (
                    <div
                      key={rate.id}
                      className="relative overflow-hidden rounded-2xl border border-[#dce5ef] bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
                    >
                      <div className="absolute left-0 top-0 h-1 w-full bg-gradient-to-r from-[#18b8ee] to-[#087dcc]" />

                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#18b8ee]">
                            Authorized Exchanger
                          </p>

                          <h3 className="mt-2 text-lg font-bold text-[#071d41]">
                            {getExchangerName(rate.exchanger_id)}
                          </h3>
                        </div>

                        <span className="rounded-full bg-[#e8f8fd] px-3 py-1 text-xs font-semibold text-[#087dcc]">
                          Latest
                        </span>
                      </div>

                      <div className="mt-8">
                        <div className="text-4xl font-bold tracking-tight text-[#071d41]">
                          {Number(rate.mvr_per_usd).toFixed(4)}
                        </div>

                        <p className="mt-1 text-sm text-[#58708e]">
                          MVR per USD
                        </p>
                      </div>

                      <div className="mt-6 flex items-center justify-between border-t border-[#e5ebf2] pt-4">
                        <span className="text-xs font-semibold uppercase tracking-wider text-[#8aa0b8]">
                          Updated
                        </span>

                        <span className="text-sm font-semibold text-[#071d41]">
                          {formatTime(rate.rate_time)}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* ALL RECORDS */}
            <div className="mt-10 overflow-hidden rounded-2xl border border-[#dce5ef] bg-white shadow-sm">
              <div className="border-b border-[#e3eaf2] px-6 py-6 md:px-8">
                <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#18b8ee]">
                  Historical Records
                </p>

                <div className="mt-2 flex flex-col justify-between gap-3 md:flex-row md:items-center">
                  <div>
                    <h2 className="text-2xl font-bold text-[#071d41]">
                      Rate History
                    </h2>

                    <p className="mt-1 text-sm text-[#58708e]">
                      All recorded rates for {formatDate(selectedDate)}.
                    </p>
                  </div>

                  <span className="inline-flex w-fit rounded-full bg-[#e8f8fd] px-4 py-2 text-sm font-semibold text-[#087dcc]">
                    {selectedDateRates.length}{" "}
                    {selectedDateRates.length === 1 ? "record" : "records"}
                  </span>
                </div>
              </div>

              {selectedDateRates.length === 0 ? (
                <div className="p-8 text-center">
                  <p className="text-[#58708e]">
                    No records are available for the selected date.
                  </p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[760px]">
                    <thead>
                      <tr className="bg-[#f7f9fc] text-left">
                        <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-[#71869f]">
                          Date
                        </th>

                        <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-[#71869f]">
                          Time
                        </th>

                        <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-[#71869f]">
                          Money Exchanger
                        </th>

                        <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-[#71869f]">
                          MVR / USD
                        </th>

                        <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-[#71869f]">
                          Source
                        </th>
                      </tr>
                    </thead>

                    <tbody>
                      {selectedDateRates.map((rate) => (
                        <tr
                          key={rate.id}
                          className="border-t border-[#e8edf3] transition hover:bg-[#f9fbfd]"
                        >
                          <td className="px-6 py-5 text-sm font-medium text-[#071d41]">
                            {formatShortDate(rate.rate_date)}
                          </td>

                          <td className="px-6 py-5 text-sm text-[#58708e]">
                            {formatTime(rate.rate_time)}
                          </td>

                          <td className="px-6 py-5 text-sm font-semibold text-[#071d41]">
                            {getExchangerName(rate.exchanger_id)}
                          </td>

                          <td className="px-6 py-5">
                            <span className="text-base font-bold text-[#071d41]">
                              {Number(rate.mvr_per_usd).toFixed(4)}
                            </span>

                            <span className="ml-1 text-xs text-[#8aa0b8]">
                              MVR
                            </span>
                          </td>

                          <td className="px-6 py-5 text-sm text-[#58708e]">
                            {rate.source || "—"}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            {/* DISCLAIMER */}
            <div className="mt-6 rounded-xl border border-[#dce5ef] bg-white px-6 py-5">
              <p className="text-xs leading-6 text-[#71869f]">
                Exchange rates displayed on this page are rates recorded by
                authorized money exchangers and published through CURA.
                Please verify rates directly with the relevant exchanger
                before relying on them for a transaction.
              </p>
            </div>
          </>
        )}
      </section>
      {/* CURA FOOTER */}
<footer className="bg-[#071B49] text-white">
  <div className="mx-auto max-w-7xl px-6 py-12 md:px-10 lg:px-12">

    <div className="grid gap-10 md:grid-cols-4">

      {/* BRAND */}
      <div>
        <img
          src="/cura-logo.png"
          alt="CURA - Audit Tax Advisory"
          className="h-16 w-auto object-contain brightness-0 invert"
        />

        <p className="mt-4 max-w-xs text-sm leading-6 text-slate-300">
          Professional knowledge and information in taxation,
          accounting, audit, advisory and law.
        </p>
      </div>

      {/* KNOWLEDGE */}
      <div>
        <h3 className="mb-4 text-sm font-semibold uppercase tracking-[0.18em] text-[#18b8ee]">
          Knowledge
        </h3>

        <div className="space-y-3 text-sm text-slate-300">
          <a href="/#knowledge" className="block hover:text-white">
            Knowledge
          </a>

          <a href="/#legal-cases" className="block hover:text-white">
            Legal Cases
          </a>

          <a href="/#updates" className="block hover:text-white">
            Tax Updates
          </a>
        </div>
      </div>

      {/* EDUCATION */}
      <div>
        <h3 className="mb-4 text-sm font-semibold uppercase tracking-[0.18em] text-[#18b8ee]">
          Education
        </h3>

        <div className="space-y-3 text-sm text-slate-300">
          <a href="/#education" className="block hover:text-white">
            Education
          </a>

          <a href="/exchange-rate" className="block hover:text-white">
            Exchange Rates
          </a>
        </div>
      </div>

      {/* CONTACT */}
      <div>
        <h3 className="mb-4 text-sm font-semibold uppercase tracking-[0.18em] text-[#18b8ee]">
          Contact
        </h3>

        <a
          href="/#contact"
          className="text-sm text-slate-300 hover:text-white"
        >
          Contact CURA
        </a>

        <p className="mt-3 text-sm text-slate-300">
          Maldives
        </p>
      </div>

    </div>

    <div className="mt-12 border-t border-white/10 pt-6 text-xs text-slate-400">
      © {new Date().getFullYear()} CURA. All rights reserved.
    </div>

  </div>
</footer>
    </main>

      <CuraFooter />
    </>
  )
}