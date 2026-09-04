"use client"

import { FormEvent, useState } from "react"
import CuraHeader from "@/components/CuraHeader"
import CuraFooter from "@/components/CuraFooter"

export type ServiceItem = {
  title: string
  description: string
}

export type ServicePageConfig = {
  number: string
  eyebrow: string
  title: string
  highlightedTitle: string
  introduction: string
  services: ServiceItem[]
  approach: {
    title: string
    description: string
  }[]
  clients: string[]
  whyCura: string[]
  disclaimer?: string
}

type Props = {
  service: ServicePageConfig
}

export default function ServicePage({ service }: Props) {
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState("")

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    setSubmitting(true)
    setSubmitted(false)
    setError("")

    const form = event.currentTarget
    const formData = new FormData(form)

    const payload = {
      service_category: service.eyebrow.toLowerCase(),
      service: service.title,
      full_name: formData.get("full_name"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      business_name: formData.get("business_name"),
      business_type: formData.get("business_type"),
      business_location: formData.get("business_location"),
      website: formData.get("website"),
      current_circumstance: formData.get("current_circumstances"),
      assistance_required: formData.get("assistance_required"),
      urgency: formData.get("urgency"),
      preferred_contact_method: formData.get("preferred_contact"),
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
        throw new Error(result?.error || "Unable to submit your enquiry.")
      }

      form.reset()
      setSubmitted(true)
    } catch (err) {
      console.error(err)
      setError(
        err instanceof Error
          ? err.message
          : "Unable to submit your enquiry. Please try again.",
      )
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <>
      <CuraHeader />

      <main className="min-h-screen bg-[#F5F8FC] text-[#071B49]">
        {/* HERO */}
        <section className="relative overflow-hidden bg-white">
          <div className="absolute right-0 top-0 h-80 w-80 rounded-full bg-[#18b8ee]/10 blur-3xl" />
          <div className="absolute bottom-0 left-0 h-64 w-64 rounded-full bg-[#1B5DBF]/10 blur-3xl" />

          <div className="relative mx-auto max-w-7xl px-6 pb-20 pt-20 md:px-10 md:pb-28 md:pt-28 lg:px-12">
            <div className="max-w-4xl">
              <div className="flex items-center gap-4">
                <span className="text-sm font-bold tracking-[0.3em] text-[#18b8ee]">
                  {service.number}
                </span>

                <span className="h-px w-12 bg-[#18b8ee]" />

                <span className="text-sm font-semibold uppercase tracking-[0.2em] text-[#1B5DBF]">
                  {service.eyebrow}
                </span>
              </div>

              <h1 className="mt-7 text-5xl font-semibold tracking-tight md:text-7xl">
                {service.title}
                <span className="block text-[#1B5DBF]">
                  {service.highlightedTitle}
                </span>
              </h1>

              <p className="mt-8 max-w-3xl text-lg leading-8 text-slate-600 md:text-xl md:leading-9">
                {service.introduction}
              </p>

              <a
                href="#contact"
                className="mt-9 inline-flex rounded-md bg-[#071B49] px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-[#0B2A69]"
              >
                Discuss your needs →
              </a>
            </div>
          </div>
        </section>

        {/* SERVICES */}
        <section className="mx-auto max-w-7xl px-6 py-20 md:px-10 md:py-24 lg:px-12">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#1B5DBF]">
              How we can help
            </p>

            <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">
              Practical expertise for real business needs.
            </h2>

            <p className="mt-5 text-slate-600 leading-7">
              Our services are designed to provide clear advice,
              dependable execution and practical solutions that reflect
              the circumstances of your business.
            </p>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {service.services.map((item, index) => (
              <article
                key={item.title}
                className="group rounded-2xl border border-slate-200 bg-white p-7 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-[#18b8ee]/40 hover:shadow-xl"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#071B49] text-sm font-semibold text-white">
                  {String(index + 1).padStart(2, "0")}
                </div>

                <h3 className="mt-7 text-xl font-semibold">
                  {item.title}
                </h3>

                <p className="mt-3 text-sm leading-7 text-slate-600">
                  {item.description}
                </p>

                <a
                  href="#contact"
                  className="mt-6 inline-flex text-sm font-semibold text-[#071B49] transition hover:text-[#1B5DBF]"
                >
                  Discuss this service →
                </a>
              </article>
            ))}
          </div>
        </section>

        {/* APPROACH */}
        <section className="bg-[#071B49] text-white">
          <div className="mx-auto max-w-7xl px-6 py-20 md:px-10 md:py-24 lg:px-12">
            <div className="max-w-3xl">
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#18b8ee]">
                Our approach
              </p>

              <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">
                Clear thinking. Practical action.
              </h2>
            </div>

            <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              {service.approach.map((item, index) => (
                <div
                  key={item.title}
                  className="border-t border-white/15 pt-6"
                >
                  <p className="text-sm font-semibold text-[#18b8ee]">
                    0{index + 1}
                  </p>

                  <h3 className="mt-4 text-xl font-semibold">
                    {item.title}
                  </h3>

                  <p className="mt-3 text-sm leading-7 text-slate-300">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* WHO WE HELP */}
        <section className="bg-white">
          <div className="mx-auto max-w-7xl px-6 py-20 md:px-10 md:py-24 lg:px-12">
            <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr] lg:items-center">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#1B5DBF]">
                  Who we help
                </p>

                <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">
                  Advice built around your circumstances.
                </h2>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                {service.clients.map((client) => (
                  <div
                    key={client}
                    className="rounded-xl border border-slate-200 bg-[#F5F8FC] px-6 py-5"
                  >
                    <p className="font-semibold">{client}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* WHY CURA */}
        <section>
          <div className="mx-auto max-w-7xl px-6 py-20 md:px-10 md:py-24 lg:px-12">
            <div className="grid gap-12 lg:grid-cols-[1fr_1.5fr]">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#1B5DBF]">
                  Why CURA
                </p>

                <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">
                  Professional expertise without unnecessary complexity.
                </h2>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                {service.whyCura.map((point) => (
                  <div
                    key={point}
                    className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200"
                  >
                    <div className="h-2 w-10 rounded-full bg-[#18b8ee]" />

                    <p className="mt-5 font-semibold leading-7">
                      {point}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {service.disclaimer && (
          <section className="border-t border-slate-200 bg-white">
            <div className="mx-auto max-w-7xl px-6 py-8 text-sm leading-7 text-slate-500 md:px-10 lg:px-12">
              {service.disclaimer}
            </div>
          </section>
        )}

        {/* CONTACT */}
        <section
          id="contact"
          className="scroll-mt-10 bg-[#071B49] py-20 md:py-24"
        >
          <div className="mx-auto max-w-7xl px-6 md:px-10 lg:px-12">
            <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
              <div className="text-white">
                <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#18b8ee]">
                  Talk to CURA
                </p>

                <h2 className="mt-4 text-4xl font-semibold tracking-tight md:text-5xl">
                  Tell us what you&apos;re dealing with.
                </h2>

                <p className="mt-6 max-w-lg leading-8 text-slate-300">
                  Every business situation is different. Give us some
                  background on your circumstances and the assistance
                  you are looking for, and our team can understand your
                  needs before getting in touch.
                </p>

                <div className="mt-8 space-y-4 text-sm text-slate-300">
                  <p>• Your information will be treated confidentially.</p>
                  <p>• A member of the CURA team will review your enquiry.</p>
                  <p>• Please provide enough detail for us to understand the situation.</p>
                </div>
              </div>

              <form
                onSubmit={handleSubmit}
                className="rounded-2xl bg-white p-7 shadow-2xl md:p-9"
              >
                <div className="grid gap-5 md:grid-cols-2">
                  <Field
                    label="Full name"
                    name="full_name"
                    required
                  />

                  <Field
                    label="Email"
                    name="email"
                    type="email"
                    required
                  />

                  <Field
                    label="Phone / WhatsApp"
                    name="phone"
                    required
                  />

                  <Field
                    label="Business name"
                    name="business_name"
                    required
                  />

                  <Field
                    label="Business type / industry"
                    name="business_type"
                    required
                  />

                  <Field
                    label="Business location"
                    name="business_location"
                    required
                  />

                  <div className="md:col-span-2">
                    <Field
                      label="Website"
                      name="website"
                      placeholder="https://"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="text-sm font-semibold">
                      Current circumstances
                      <span className="ml-1 text-red-500">*</span>
                    </label>

                    <textarea
                      name="current_circumstances"
                      required
                      rows={5}
                      className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-[#1B5DBF] focus:ring-2 focus:ring-[#1B5DBF]/10"
                      placeholder="Please explain your current situation, relevant background and any important circumstances."
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="text-sm font-semibold">
                      What assistance do you require?
                      <span className="ml-1 text-red-500">*</span>
                    </label>

                    <textarea
                      name="assistance_required"
                      required
                      rows={5}
                      className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-[#1B5DBF] focus:ring-2 focus:ring-[#1B5DBF]/10"
                      placeholder="Tell us what you would like CURA to help you with."
                    />
                  </div>

                  <div>
                    <label className="text-sm font-semibold">
                      Urgency
                    </label>

                    <select
                      name="urgency"
                      className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-[#1B5DBF]"
                      defaultValue="Normal"
                    >
                      <option>Normal</option>
                      <option>Time-sensitive</option>
                      <option>Urgent</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-sm font-semibold">
                      Preferred contact
                    </label>

                    <select
                      name="preferred_contact"
                      className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-[#1B5DBF]"
                      defaultValue="Email"
                    >
                      <option>Email</option>
                      <option>Phone</option>
                      <option>WhatsApp</option>
                    </select>
                  </div>
                </div>

                {error && (
                  <div className="mt-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                    {error}
                  </div>
                )}

                {submitted && (
                  <div className="mt-6 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
                    Thank you. Your enquiry has been submitted to CURA.
                    Our team will review the information and get in touch.
                  </div>
                )}

                <button
                  type="submit"
                  disabled={submitting}
                  className="mt-7 w-full rounded-xl bg-[#071B49] px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-[#0B2A69] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {submitting ? "Submitting..." : "Submit enquiry →"}
                </button>

                <p className="mt-4 text-center text-xs leading-5 text-slate-400">
                  Please do not include passwords, payment card details or
                  other highly sensitive information in this form.
                </p>
              </form>
            </div>
          </div>
        </section>
      </main>

      <CuraFooter />
    </>
  )
}

function Field({
  label,
  name,
  type = "text",
  required = false,
  placeholder,
}: {
  label: string
  name: string
  type?: string
  required?: boolean
  placeholder?: string
}) {
  return (
    <div>
      <label className="text-sm font-semibold">
        {label}
        {required && <span className="ml-1 text-red-500">*</span>}
      </label>

      <input
        type={type}
        name={name}
        required={required}
        placeholder={placeholder}
        className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-[#1B5DBF] focus:ring-2 focus:ring-[#1B5DBF]/10"
      />
    </div>
  )
}