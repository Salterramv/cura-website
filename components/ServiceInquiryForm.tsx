"use client"

import { FormEvent, useState } from "react"

type ServiceKey = "audit" | "tax" | "advisory" | "legal"

type Props = {
  service: ServiceKey
  serviceLabel: string
}

const inputClass =
  "mt-2 w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm text-[#071B49] outline-none transition focus:border-[#168BC4] focus:ring-2 focus:ring-[#168BC4]/15"

export default function ServiceInquiryForm({ service, serviceLabel }: Props) {
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState("")
  const [error, setError] = useState("")

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setSubmitting(true)
    setSuccess("")
    setError("")

    const form = event.currentTarget
    const data = new FormData(form)
    const payload = Object.fromEntries(data.entries())

    try {
      const response = await fetch("/api/service-inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...payload, service }),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || "Unable to submit your enquiry.")
      }

      setSuccess(
        `Thank you. Your ${serviceLabel.toLowerCase()} enquiry has been received. CURA will review the information and contact you.`,
      )
      form.reset()
    } catch (err: any) {
      setError(err?.message || "Unable to submit your enquiry. Please try again.")
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
      <div className="mb-7">
        <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#168BC4]">
          Contact CURA
        </p>
        <h3 className="mt-3 text-2xl font-semibold text-[#071B49]">
          Tell us about your situation
        </h3>
        <p className="mt-3 text-sm leading-6 text-slate-600">
          The more context you provide, the better we can understand your needs before getting in touch.
        </p>
      </div>

      {success && (
        <div className="mb-6 rounded-lg border border-emerald-200 bg-emerald-50 p-4 text-sm leading-6 text-emerald-800">
          {success}
        </div>
      )}

      {error && (
        <div className="mb-6 rounded-lg border border-red-200 bg-red-50 p-4 text-sm leading-6 text-red-700">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <input name="website_url" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />

        <div className="grid gap-5 md:grid-cols-2">
          <label className="text-sm font-semibold text-[#071B49]">
            Full name *
            <input name="full_name" required minLength={2} maxLength={150} className={inputClass} placeholder="Your full name" />
          </label>

          <label className="text-sm font-semibold text-[#071B49]">
            Email address *
            <input name="email" type="email" required maxLength={320} className={inputClass} placeholder="you@company.com" />
          </label>

          <label className="text-sm font-semibold text-[#071B49]">
            Phone / WhatsApp *
            <input name="phone" required maxLength={50} className={inputClass} placeholder="+960 ..." />
          </label>

          <label className="text-sm font-semibold text-[#071B49]">
            Business name *
            <input name="business_name" required minLength={2} maxLength={200} className={inputClass} placeholder="Company / organisation" />
          </label>

          <label className="text-sm font-semibold text-[#071B49]">
            Business type / industry *
            <input name="business_type" required minLength={2} maxLength={150} className={inputClass} placeholder="e.g. Construction, Retail, Hospitality" />
          </label>

          <label className="text-sm font-semibold text-[#071B49]">
            Business location
            <input name="business_location" maxLength={200} className={inputClass} placeholder="e.g. Malé, Hulhumalé" />
          </label>

          <label className="text-sm font-semibold text-[#071B49] md:col-span-2">
            Business website
            <input name="website" type="url" maxLength={500} className={inputClass} placeholder="https://..." />
          </label>
        </div>

        <label className="block text-sm font-semibold text-[#071B49]">
          What is your current situation? *
          <textarea
            name="current_circumstance"
            required
            minLength={20}
            maxLength={10000}
            rows={6}
            className={inputClass}
            placeholder="Please describe the business situation, issue, transaction, compliance matter, dispute or decision you are currently dealing with."
          />
          <span className="mt-2 block text-xs font-normal text-slate-500">
            Please provide enough detail for CURA to understand the circumstances.
          </span>
        </label>

        <label className="block text-sm font-semibold text-[#071B49]">
          What assistance do you need? *
          <textarea
            name="assistance_required"
            required
            minLength={10}
            maxLength={5000}
            rows={4}
            className={inputClass}
            placeholder={`What would you like CURA to help you with regarding ${serviceLabel.toLowerCase()}?`}
          />
        </label>

        <div className="grid gap-5 md:grid-cols-2">
          <label className="text-sm font-semibold text-[#071B49]">
            Urgency
            <select name="urgency" defaultValue="Not urgent" className={inputClass}>
              <option>Not urgent</option>
              <option>Within 1 week</option>
              <option>Within 1 month</option>
              <option>Urgent</option>
            </select>
          </label>

          <label className="text-sm font-semibold text-[#071B49]">
            Preferred contact method
            <select name="preferred_contact_method" defaultValue="Email" className={inputClass}>
              <option>Email</option>
              <option>Phone</option>
              <option>WhatsApp</option>
            </select>
          </label>
        </div>

        <label className="flex items-start gap-3 text-sm leading-6 text-slate-600">
          <input type="checkbox" name="consent" required className="mt-1 h-4 w-4 rounded border-slate-300" />
          <span>
            I confirm that the information provided is accurate and may be used by CURA to contact me regarding this enquiry.
          </span>
        </label>

        <button
          type="submit"
          disabled={submitting}
          className="inline-flex w-full items-center justify-center rounded-lg bg-[#071B49] px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-[#0B2A69] disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
        >
          {submitting ? "Submitting..." : "Send enquiry to CURA"}
        </button>
      </form>
    </div>
  )
}
