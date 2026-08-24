"use client"

import { FormEvent, useState } from "react"

type Props = {
  category: string
  service: string
}

export default function ServiceInquiryForm({
  category,
  service,
}: Props) {
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState("")

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    setSubmitting(true)
    setError("")
    setSuccess(false)

    const form = event.currentTarget
    const formData = new FormData(form)

    const payload = {
      service_category: category,
      service_name: service,
      name: formData.get("name"),
      business_name: formData.get("business_name"),
      position: formData.get("position"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      industry: formData.get("industry"),
      circumstances: formData.get("circumstances"),
      assistance: formData.get("assistance"),
    }

    try {
      const response = await fetch("/api/service-inquiries", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(
          result?.error || "Unable to submit your inquiry.",
        )
      }

      setSuccess(true)
      form.reset()
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Unable to submit your inquiry.",
      )
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <section
      id="inquiry"
      className="bg-[#071B49] px-6 py-20 text-white md:py-24"
    >
      <div className="mx-auto max-w-5xl">
        <div className="max-w-3xl">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#35B5E5]">
            Discuss your requirements
          </p>

          <h2 className="mt-5 text-3xl font-semibold md:text-4xl">
            Need help with {service}?
          </h2>

          <p className="mt-5 leading-7 text-slate-300">
            Tell us about your business and current circumstances.
            A member of the CURA team can review your inquiry and
            get in touch with you.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="mt-12 rounded-2xl bg-white p-6 text-[#071B49] shadow-xl md:p-10"
        >
          <div className="mb-8 rounded-lg border border-slate-200 bg-[#F5F8FC] px-5 py-4">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
              Service
            </p>

            <p className="mt-1 font-semibold">
              {category} · {service}
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <label className="text-sm font-semibold">
                Full name *
              </label>

              <input
                required
                name="name"
                type="text"
                className="mt-2 w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-[#1B5DBF]"
                placeholder="Your full name"
              />
            </div>

            <div>
              <label className="text-sm font-semibold">
                Business / Company
              </label>

              <input
                name="business_name"
                type="text"
                className="mt-2 w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-[#1B5DBF]"
                placeholder="Company name"
              />
            </div>

            <div>
              <label className="text-sm font-semibold">
                Position
              </label>

              <input
                name="position"
                type="text"
                className="mt-2 w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-[#1B5DBF]"
                placeholder="Your position"
              />
            </div>

            <div>
              <label className="text-sm font-semibold">
                Industry
              </label>

              <input
                name="industry"
                type="text"
                className="mt-2 w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-[#1B5DBF]"
                placeholder="e.g. Tourism, Retail, Construction"
              />
            </div>

            <div>
              <label className="text-sm font-semibold">
                Email *
              </label>

              <input
                required
                name="email"
                type="email"
                className="mt-2 w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-[#1B5DBF]"
                placeholder="you@company.com"
              />
            </div>

            <div>
              <label className="text-sm font-semibold">
                Phone
              </label>

              <input
                name="phone"
                type="tel"
                className="mt-2 w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-[#1B5DBF]"
                placeholder="+960 ..."
              />
            </div>
          </div>

          <div className="mt-6">
            <label className="text-sm font-semibold">
              Tell us about your current circumstances *
            </label>

            <textarea
              required
              name="circumstances"
              rows={6}
              className="mt-2 w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-[#1B5DBF]"
              placeholder="Please explain your current situation, the issue you are facing, or the transaction you are considering."
            />
          </div>

          <div className="mt-6">
            <label className="text-sm font-semibold">
              What assistance are you looking for? *
            </label>

            <textarea
              required
              name="assistance"
              rows={5}
              className="mt-2 w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-[#1B5DBF]"
              placeholder="Tell us what you would like CURA to help you with."
            />
          </div>

          {error && (
            <div className="mt-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
            </div>
          )}

          {success && (
            <div className="mt-6 rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
              Thank you. Your inquiry has been submitted to CURA.
            </div>
          )}

          <button
            type="submit"
            disabled={submitting}
            className="mt-8 inline-flex rounded-md bg-[#071B49] px-7 py-3.5 text-sm font-semibold !text-white transition hover:bg-[#0B2A69] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {submitting ? "Submitting..." : "Submit inquiry →"}
          </button>
        </form>
      </div>
    </section>
  )
}