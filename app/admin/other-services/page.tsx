"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"

type ServiceType = "bookkeeping" | "payroll"

type Service = {
  id: string
  slug: ServiceType
  name: string
  hero_eyebrow: string
  hero_title: string
  hero_description: string
  description: string
  why_outsource_heading: string
  why_outsource_description: string
  why_cura_heading: string
  why_cura_description: string
  cta_heading: string
  cta_description: string
  published: boolean
}

type Reason = {
  id?: string
  service_id: string
  title: string
  text: string
  display_order: number
  published: boolean
}

type Package = {
  id?: string
  service_id: string
  title: string
  price: string | null
  fixed_fee: string | null
  variable_fee: string | null
  setup_fee: string | null
  inclusions: string[]
  display_order: number
  published: boolean
}

export default function OtherServicesAdminPage() {
  const supabase = createClient()

  const [serviceType, setServiceType] =
    useState<ServiceType>("bookkeeping")

  const [service, setService] = useState<Service | null>(null)
  const [reasons, setReasons] = useState<Reason[]>([])
  const [packages, setPackages] = useState<Package[]>([])

  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState("")
  const [error, setError] = useState("")

  useEffect(() => {
    loadService()
  }, [serviceType])

  async function verifyAdmin() {
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      window.location.href = "/admin/login"
      return false
    }

    const { data, error } =
      await supabase.rpc("is_current_user_admin")

    if (error || !data) {
      await supabase.auth.signOut()
      window.location.href = "/admin/login"
      return false
    }

    return true
  }

  async function loadService() {
    setLoading(true)
    setError("")
    setMessage("")

    const allowed = await verifyAdmin()

    if (!allowed) return

    const { data: serviceData, error: serviceError } =
      await supabase
        .from("other_services")
        .select("*")
        .eq("slug", serviceType)
        .maybeSingle()

    if (serviceError) {
      setError(serviceError.message)
      setLoading(false)
      return
    }

    if (!serviceData) {
      setService(null)
      setReasons([])
      setPackages([])
      setLoading(false)
      return
    }

    setService(serviceData)

    const { data: reasonData, error: reasonError } =
      await supabase
        .from("other_service_reasons")
        .select("*")
        .eq("service_id", serviceData.id)
        .order("display_order", { ascending: true })

    if (reasonError) {
      setError(reasonError.message)
      setLoading(false)
      return
    }

    const { data: packageData, error: packageError } =
      await supabase
        .from("other_service_packages")
        .select("*")
        .eq("service_id", serviceData.id)
        .order("display_order", { ascending: true })

    if (packageError) {
      setError(packageError.message)
      setLoading(false)
      return
    }

    setReasons(reasonData ?? [])
    setPackages(packageData ?? [])
    setLoading(false)
  }

  async function saveService() {
    if (!service) return

    setSaving(true)
    setMessage("")
    setError("")

    const { error } = await supabase
      .from("other_services")
      .update({
        name: service.name,
        hero_eyebrow: service.hero_eyebrow,
        hero_title: service.hero_title,
        hero_description: service.hero_description,
        description: service.description,
        why_outsource_heading:
          service.why_outsource_heading,
        why_outsource_description:
          service.why_outsource_description,
        why_cura_heading:
          service.why_cura_heading,
        why_cura_description:
          service.why_cura_description,
        cta_heading: service.cta_heading,
        cta_description: service.cta_description,
        published: service.published,
        updated_at: new Date().toISOString(),
      })
      .eq("id", service.id)

    if (error) {
      setError(error.message)
    } else {
      setMessage("Service content saved successfully.")
    }

    setSaving(false)
  }

  async function saveReason(reason: Reason) {
    setError("")
    setMessage("")

    const payload = {
      service_id: reason.service_id,
      title: reason.title,
      text: reason.text,
      display_order: reason.display_order,
      published: reason.published,
    }

    const result = reason.id
      ? await supabase
          .from("other_service_reasons")
          .update(payload)
          .eq("id", reason.id)
      : await supabase
          .from("other_service_reasons")
          .insert(payload)

    if (result.error) {
      setError(result.error.message)
      return
    }

    setMessage("Reason saved successfully.")
    await loadService()
  }

  async function deleteReason(id: string) {
    if (!confirm("Delete this reason?")) return

    const { error } = await supabase
      .from("other_service_reasons")
      .delete()
      .eq("id", id)

    if (error) {
      setError(error.message)
      return
    }

    setMessage("Reason deleted.")
    await loadService()
  }

  async function savePackage(pkg: Package) {
    setError("")
    setMessage("")

    const payload = {
      service_id: pkg.service_id,
      title: pkg.title,
      price: pkg.price,
      fixed_fee: pkg.fixed_fee,
      variable_fee: pkg.variable_fee,
      setup_fee: pkg.setup_fee,
      inclusions: pkg.inclusions,
      display_order: pkg.display_order,
      published: pkg.published,
    }

    const result = pkg.id
      ? await supabase
          .from("other_service_packages")
          .update(payload)
          .eq("id", pkg.id)
      : await supabase
          .from("other_service_packages")
          .insert(payload)

    if (result.error) {
      setError(result.error.message)
      return
    }

    setMessage("Package saved successfully.")
    await loadService()
  }

  async function deletePackage(id: string) {
    if (!confirm("Delete this package?")) return

    const { error } = await supabase
      .from("other_service_packages")
      .delete()
      .eq("id", id)

    if (error) {
      setError(error.message)
      return
    }

    setMessage("Package deleted.")
    await loadService()
  }

  function updateReason(
    index: number,
    field: keyof Reason,
    value: string | number | boolean,
  ) {
    setReasons((current) =>
      current.map((item, i) =>
        i === index
          ? {
              ...item,
              [field]: value,
            }
          : item,
      ),
    )
  }

  function updatePackage(
    index: number,
    field: keyof Package,
    value:
      | string
      | number
      | boolean
      | string[],
      ) {
    setPackages((current) =>
      current.map((item, i) =>
        i === index
          ? {
              ...item,
              [field]: value,
            }
          : item,
      ),
    )
  }

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#f4f7fb]">
        <div className="text-center">
          <div className="mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-4 border-slate-200 border-t-[#18b8ee]" />

          <p className="text-sm font-medium text-slate-600">
            Loading CURA Other Services...
          </p>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-[#f4f7fb] text-[#071d41]">

      {/* HEADER */}

      <header className="bg-[#061b3d] text-white">

        <div className="mx-auto flex max-w-7xl items-center justify-between gap-5 px-6 py-5">

          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-[#18b8ee]">
              CURA Administration
            </p>

            <h1 className="mt-1 text-xl font-semibold text-white">
              Other Services
            </h1>
          </div>

          <div className="flex items-center gap-3">

            <a
              href="/other-services"
              target="_blank"
              rel="noreferrer"
              className="hidden rounded-lg border border-white/40 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-white/10 sm:block"
            >
              View Services
            </a>

            <a
              href="/admin"
              className="rounded-lg bg-[#18b8ee] px-4 py-2.5 text-sm font-semibold !text-white transition hover:bg-[#087dcc]"
            >
              ← Admin Dashboard
            </a>

          </div>

        </div>

      </header>

      {/* MAIN */}

      <div className="mx-auto max-w-7xl px-6 py-10 lg:px-8">

        {/* PAGE INTRO */}

        <section>

          <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#18b8ee]">
            Service Management
          </p>

          <div className="mt-2 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">

            <div>

              <h2 className="text-3xl font-bold tracking-tight text-[#071d41] md:text-4xl">
                Manage Other Services
              </h2>

              <p className="mt-3 max-w-3xl text-base leading-7 text-slate-600">
                Edit CURA bookkeeping and payroll content, pricing,
                packages and service information without changing
                website code.
              </p>

            </div>

            {/* SERVICE SWITCHER */}

            <div className="flex rounded-xl border border-slate-200 bg-white p-1 shadow-sm">

              <button
                type="button"
                onClick={() =>
                  setServiceType("bookkeeping")
                }
                className={`rounded-lg px-5 py-2.5 text-sm font-semibold transition ${
                  serviceType === "bookkeeping"
                    ? "bg-[#061b3d] !text-white"
                    : "text-slate-600 hover:bg-slate-100"
                }`}
              >
                Bookkeeping
              </button>

              <button
                type="button"
                onClick={() =>
                  setServiceType("payroll")
                }
                className={`rounded-lg px-5 py-2.5 text-sm font-semibold transition ${
                  serviceType === "payroll"
                    ? "bg-[#061b3d] !text-white"
                    : "text-slate-600 hover:bg-slate-100"
                }`}
              >
                Payroll
              </button>

            </div>

          </div>

        </section>

        {/* STATUS */}

        {message && (
          <div className="mt-6 rounded-xl border border-emerald-200 bg-emerald-50 px-5 py-4 text-sm font-medium text-emerald-700">
            {message}
          </div>
        )}

        {error && (
          <div className="mt-6 rounded-xl border border-red-200 bg-red-50 px-5 py-4 text-sm font-medium text-red-700">
            {error}
          </div>
        )}

        {!service ? (

          <section className="mt-8 rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">

            <h3 className="text-xl font-bold text-[#071d41]">
              {serviceType === "bookkeeping"
                ? "Bookkeeping"
                : "Payroll"}{" "}
              service is not configured
            </h3>

            <p className="mt-3 text-sm leading-6 text-slate-600">
              No corresponding Other Services record was found
              in Supabase.
            </p>

          </section>

        ) : (

          <div className="mt-8 space-y-8">

            {/* GENERAL CONTENT */}

            <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">

              <div className="flex flex-col gap-4 border-b border-slate-200 pb-6 sm:flex-row sm:items-start sm:justify-between">

                <div>

                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#18b8ee]">
                    01 · General Content
                  </p>

                  <h3 className="mt-2 text-2xl font-bold text-[#071d41]">
                    Service Information
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    Edit the main content displayed on the
                    {serviceType === "bookkeeping"
                      ? " Bookkeeping"
                      : " Payroll"}{" "}
                    page.
                  </p>

                </div>

                <label className="flex shrink-0 cursor-pointer items-center gap-2 rounded-lg border border-slate-200 bg-[#f8fafc] px-4 py-3 text-sm font-semibold">

                  <input
                    type="checkbox"
                    checked={service.published}
                    onChange={(event) =>
                      setService({
                        ...service,
                        published:
                          event.target.checked,
                      })
                    }
                    className="h-4 w-4"
                  />

                  Published

                </label>

              </div>

              <div className="mt-8 grid gap-6">

                <Field
                  label="Service Name"
                  value={service.name}
                  onChange={(value) =>
                    setService({
                      ...service,
                      name: value,
                    })
                  }
                />

                <Field
                  label="Hero Eyebrow"
                  value={service.hero_eyebrow}
                  onChange={(value) =>
                    setService({
                      ...service,
                      hero_eyebrow: value,
                    })
                  }
                />

                <TextArea
                  label="Hero Title"
                  value={service.hero_title}
                  rows={3}
                  onChange={(value) =>
                    setService({
                      ...service,
                      hero_title: value,
                    })
                  }
                />

                <TextArea
                  label="Hero Description"
                  value={service.hero_description}
                  rows={5}
                  onChange={(value) =>
                    setService({
                      ...service,
                      hero_description: value,
                    })
                  }
                />

                <TextArea
                  label="Service Description"
                  value={service.description}
                  rows={5}
                  onChange={(value) =>
                    setService({
                      ...service,
                      description: value,
                    })
                  }
                />

              </div>

              <button
                type="button"
                disabled={saving}
                onClick={saveService}
                className="mt-8 rounded-lg bg-[#061b3d] px-6 py-3 text-sm font-semibold !text-white transition hover:bg-[#0b2a55] disabled:cursor-not-allowed disabled:opacity-50"
              >
                {saving
                  ? "Saving..."
                  : "Save Service Content"}
              </button>

            </section>

            {/* WHY OUTSOURCE */}

            <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">

              <div className="border-b border-slate-200 pb-6">

                <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#18b8ee]">
                  02 · Why Outsource?
                </p>

                <h3 className="mt-2 text-2xl font-bold text-[#071d41]">
                  Outsourcing Content
                </h3>

                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Add, edit, reorder and publish the reasons
                  businesses should outsource this service.
                </p>

              </div>

              <div className="mt-8 space-y-5">

                {reasons.map((reason, index) => (

                  <div
                    key={reason.id ?? `new-${index}`}
                    className="rounded-xl border border-slate-200 bg-[#f8fafc] p-5"
                  >

                    <div className="grid gap-5 lg:grid-cols-[1fr_1.7fr_auto]">

                      <div>
                        <label className="text-xs font-bold uppercase tracking-[0.12em] text-slate-500">
                          Title
                        </label>

                        <input
                          value={reason.title}
                          onChange={(event) =>
                            updateReason(
                              index,
                              "title",
                              event.target.value,
                            )
                          }
                          placeholder="Reason title"
                          className="mt-2 w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm text-[#071d41] outline-none transition focus:border-[#168bc4]"
                        />
                      </div>

                      <div>
                        <label className="text-xs font-bold uppercase tracking-[0.12em] text-slate-500">
                          Description
                        </label>

                        <textarea
                          value={reason.text}
                          onChange={(event) =>
                            updateReason(
                              index,
                              "text",
                              event.target.value,
                            )
                          }
                          rows={4}
                          placeholder="Explain this reason..."
                          className="mt-2 w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm text-[#071d41] outline-none transition focus:border-[#168bc4]"
                        />
                      </div>

                      <div className="flex flex-row items-end gap-2 lg:flex-col">

                        <button
                          type="button"
                          onClick={() =>
                            saveReason(reason)
                          }
                          className="rounded-lg bg-[#061b3d] px-4 py-2.5 text-xs font-semibold !text-white transition hover:bg-[#0b2a55]"
                        >
                          Save
                        </button>

                        {reason.id && (
                          <button
                            type="button"
                            onClick={() =>
                              deleteReason(
                                reason.id!,
                              )
                            }
                            className="rounded-lg border border-red-200 bg-white px-4 py-2.5 text-xs font-semibold text-red-600 transition hover:bg-red-50"
                          >
                            Delete
                          </button>
                        )}

                      </div>

                    </div>

                    <div className="mt-4 flex flex-wrap items-center gap-5">

                      <label className="flex items-center gap-2 text-sm font-medium text-slate-600">

                        <input
                          type="checkbox"
                          checked={reason.published}
                          onChange={(event) =>
                            updateReason(
                              index,
                              "published",
                              event.target.checked,
                            )
                          }
                          className="h-4 w-4"
                        />

                        Published

                      </label>

                      <label className="flex items-center gap-2 text-sm font-medium text-slate-600">

                        <span>Order</span>

                        <input
                          type="number"
                          min="1"
                          value={reason.display_order}
                          onChange={(event) =>
                            updateReason(
                              index,
                              "display_order",
                              Number(
                                event.target.value,
                              ) || 1,
                            )
                          }
                          className="w-20 rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm"
                        />

                      </label>

                    </div>

                  </div>

                ))}

                <button
                  type="button"
                  onClick={() =>
                    setReasons([
                      ...reasons,
                      {
                        service_id: service.id,
                        title: "",
                        text: "",
                        display_order:
                          reasons.length + 1,
                        published: true,
                      },
                    ])
                  }
                  className="rounded-lg border border-[#168bc4] bg-white px-5 py-3 text-sm font-semibold text-[#168bc4] transition hover:bg-[#effbff]"
                >
                  + Add Reason
                </button>

              </div>

            </section>

            {/* WHY CURA */}

            <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">

              <div className="border-b border-slate-200 pb-6">

                <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#18b8ee]">
                  03 · Why Choose CURA?
                </p>

                <h3 className="mt-2 text-2xl font-bold text-[#071d41]">
                  Why Choose CURA Content
                </h3>

                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Edit the heading and supporting text for the
                  Why Choose CURA section.
                </p>

              </div>

              <div className="mt-8 grid gap-6">

                <TextArea
                  label="Section Heading"
                  value={service.why_cura_heading}
                  rows={2}
                  onChange={(value) =>
                    setService({
                      ...service,
                      why_cura_heading: value,
                    })
                  }
                />

                <TextArea
                  label="Section Description"
                  value={service.why_cura_description}
                  rows={4}
                  onChange={(value) =>
                    setService({
                      ...service,
                      why_cura_description: value,
                    })
                  }
                />

              </div>

              <button
                type="button"
                disabled={saving}
                onClick={saveService}
                className="mt-6 rounded-lg bg-[#061b3d] px-6 py-3 text-sm font-semibold !text-white transition hover:bg-[#0b2a55] disabled:opacity-50"
              >
                {saving
                  ? "Saving..."
                  : "Save Why Choose CURA"}
              </button>

            </section>

            {/* WHY OUTSOURCE HEADINGS */}

            <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">

              <div className="border-b border-slate-200 pb-6">

                <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#18b8ee]">
                  Section Settings
                </p>

                <h3 className="mt-2 text-2xl font-bold text-[#071d41]">
                  Why Outsource Section
                </h3>

              </div>

              <div className="mt-8 grid gap-6">

                <TextArea
                  label="Section Heading"
                  value={
                    service.why_outsource_heading
                  }
                  rows={2}
                  onChange={(value) =>
                    setService({
                      ...service,
                      why_outsource_heading:
                        value,
                    })
                  }
                />

                <TextArea
                  label="Section Description"
                  value={
                    service.why_outsource_description
                  }
                  rows={4}
                  onChange={(value) =>
                    setService({
                      ...service,
                      why_outsource_description:
                        value,
                    })
                  }
                />

              </div>

              <button
                type="button"
                disabled={saving}
                onClick={saveService}
                className="mt-6 rounded-lg bg-[#061b3d] px-6 py-3 text-sm font-semibold !text-white transition hover:bg-[#0b2a55] disabled:opacity-50"
              >
                {saving
                  ? "Saving..."
                  : "Save Section Settings"}
              </button>

            </section>

            {/* CTA */}

            <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">

              <div className="border-b border-slate-200 pb-6">

                <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#18b8ee]">
                  04 · Enquiry CTA
                </p>

                <h3 className="mt-2 text-2xl font-bold text-[#071d41]">
                  Customized Enquiry Content
                </h3>

                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Edit the text shown above the customized
                  enquiry form.
                </p>

              </div>

              <div className="mt-8 grid gap-6">

                <TextArea
                  label="CTA Heading"
                  value={service.cta_heading}
                  rows={2}
                  onChange={(value) =>
                    setService({
                      ...service,
                      cta_heading: value,
                    })
                  }
                />

                <TextArea
                  label="CTA Description"
                  value={service.cta_description}
                  rows={4}
                  onChange={(value) =>
                    setService({
                      ...service,
                      cta_description: value,
                    })
                  }
                />

              </div>

              <button
                type="button"
                disabled={saving}
                onClick={saveService}
                className="mt-6 rounded-lg bg-[#061b3d] px-6 py-3 text-sm font-semibold !text-white transition hover:bg-[#0b2a55] disabled:opacity-50"
              >
                {saving
                  ? "Saving..."
                  : "Save Enquiry Content"}
              </button>

            </section>

            {/* PACKAGES */}

            <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">

              <div className="border-b border-slate-200 pb-6">

                <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#18b8ee]">
                  05 · Pricing
                </p>

                <h3 className="mt-2 text-2xl font-bold text-[#071d41]">
                  Packages & Prices
                </h3>

                <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">
                  Manage the packages shown to visitors. Changes
                  made here will eventually be reflected on the
                  public service page once the public page is
                  connected to the CMS.
                </p>

              </div>

              <div className="mt-8 space-y-6">

                {packages.map((pkg, index) => (

                  <div
                    key={pkg.id ?? `new-package-${index}`}
                    className="rounded-xl border border-slate-200 bg-[#f8fafc] p-5"
                  >

                    <div className="flex flex-col gap-4 border-b border-slate-200 pb-5 sm:flex-row sm:items-center sm:justify-between">

                      <div>

                        <p className="text-xs font-bold uppercase tracking-[0.15em] text-[#168bc4]">
                          Package {index + 1}
                        </p>

                      </div>

                      <label className="flex items-center gap-2 text-sm font-semibold text-slate-600">

                        <input
                          type="checkbox"
                          checked={pkg.published}
                          onChange={(event) =>
                            updatePackage(
                              index,
                              "published",
                              event.target.checked,
                            )
                          }
                          className="h-4 w-4"
                        />

                        Published

                      </label>

                    </div>

                    <div className="mt-6 grid gap-5 md:grid-cols-2">

                      <Field
                        label={
                          serviceType === "bookkeeping"
                            ? "Revenue Range"
                            : "Employee Range"
                        }
                        value={pkg.title}
                        onChange={(value) =>
                          updatePackage(
                            index,
                            "title",
                            value,
                          )
                        }
                      />

                      {serviceType === "bookkeeping" ? (

                        <Field
                          label="Monthly Price"
                          value={pkg.price ?? ""}
                          onChange={(value) =>
                            updatePackage(
                              index,
                              "price",
                              value,
                            )
                          }
                        />

                      ) : (

                        <>
                          <Field
                            label="Fixed Fee"
                            value={pkg.fixed_fee ?? ""}
                            onChange={(value) =>
                              updatePackage(
                                index,
                                "fixed_fee",
                                value,
                              )
                            }
                          />

                          <Field
                            label="Variable Fee"
                            value={
                              pkg.variable_fee ?? ""
                            }
                            onChange={(value) =>
                              updatePackage(
                                index,
                                "variable_fee",
                                value,
                              )
                            }
                          />

                          <Field
                            label="Setup Fee"
                            value={pkg.setup_fee ?? ""}
                            onChange={(value) =>
                              updatePackage(
                                index,
                                "setup_fee",
                                value,
                              )
                            }
                          />
                        </>

                      )}

                      <div>
                        <label className="text-sm font-semibold text-[#071d41]">
                          Display Order
                        </label>

                        <input
                          type="number"
                          min="1"
                          value={pkg.display_order}
                          onChange={(event) =>
                            updatePackage(
                              index,
                              "display_order",
                              Number(
                                event.target.value,
                              ) || 1,
                            )
                          }
                          className="mt-2 w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm outline-none focus:border-[#168bc4]"
                        />
                      </div>

                    </div>

                    {serviceType === "bookkeeping" && (

                      <div className="mt-5">

                        <label className="text-sm font-semibold text-[#071d41]">
                          Included Services
                        </label>

                        <p className="mt-1 text-xs text-slate-500">
                          Enter one inclusion per line.
                        </p>

                        <textarea
                          value={pkg.inclusions.join("\n")}
                          rows={7}
                          onChange={(event) =>
                            updatePackage(
                              index,
                              "inclusions",
                              event.target.value
                                .split("\n")
                                .map(
                                  (item) =>
                                    item.trim(),
                                )
                                .filter(Boolean),
                            )
                          }
                          className="mt-2 w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm outline-none focus:border-[#168bc4]"
                        />

                      </div>

                    )}

                    {serviceType === "payroll" && (

                      <div className="mt-5 rounded-lg border border-[#b9e8f7] bg-[#effbff] p-4">

                        <p className="text-xs font-bold uppercase tracking-[0.15em] text-[#087dcc]">
                          Payroll pricing
                        </p>

                        <p className="mt-2 text-sm leading-6 text-slate-600">
                          Fixed fee, variable fee and setup fee
                          are stored separately so each can be
                          edited independently.
                        </p>

                      </div>

                    )}

                    <div className="mt-5 flex flex-wrap gap-3">

                      <button
                        type="button"
                        onClick={() =>
                          savePackage(pkg)
                        }
                        className="rounded-lg bg-[#061b3d] px-5 py-2.5 text-sm font-semibold !text-white transition hover:bg-[#0b2a55]"
                      >
                        Save Package
                      </button>

                      {pkg.id && (

                        <button
                          type="button"
                          onClick={() =>
                            deletePackage(pkg.id!)
                          }
                          className="rounded-lg border border-red-200 bg-white px-5 py-2.5 text-sm font-semibold text-red-600 transition hover:bg-red-50"
                        >
                          Delete Package
                        </button>

                      )}

                    </div>

                  </div>

                ))}

                <button
                  type="button"
                  onClick={() =>
                    setPackages([
                      ...packages,
                      {
                        service_id: service.id,
                        title: "",
                        price:
                          serviceType ===
                          "bookkeeping"
                            ? ""
                            : null,
                        fixed_fee:
                          serviceType === "payroll"
                            ? ""
                            : null,
                        variable_fee:
                          serviceType === "payroll"
                            ? ""
                            : null,
                        setup_fee:
                          serviceType === "payroll"
                            ? ""
                            : null,
                        inclusions: [],
                        display_order:
                          packages.length + 1,
                        published: true,
                      },
                    ])
                  }
                  className="rounded-lg border border-[#168bc4] bg-white px-5 py-3 text-sm font-semibold text-[#168bc4] transition hover:bg-[#effbff]"
                >
                  + Add Package
                </button>

              </div>

            </section>

            {/* INFO */}

            <section className="rounded-2xl border border-[#b9e8f7] bg-[#effbff] p-6">

              <div className="flex gap-4">

                <div className="mt-0.5 text-xl text-[#087dcc]">
                  ⓘ
                </div>

                <div>

                  <h4 className="font-bold text-[#071d41]">
                    CMS-controlled Other Services
                  </h4>

                  <p className="mt-1 text-sm leading-6 text-slate-600">
                    This administration area controls the
                    Bookkeeping and Payroll service information
                    stored in Supabase. Once the public pages are
                    connected to this CMS, changes made here will
                    appear on the CURA website without editing the
                    page code.
                  </p>

                </div>

              </div>

            </section>

          </div>

        )}

      </div>

      {/* FOOTER */}

      <footer className="border-t border-slate-200 bg-white">

        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-6 py-6 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between">

          <p>
            © {new Date().getFullYear()} CURA. All rights reserved.
          </p>

          <a
            href="/admin"
            className="font-semibold text-[#071d41] transition hover:text-[#087dcc]"
          >
            Return to Admin Dashboard →
          </a>

        </div>

      </footer>

    </main>
  )
}

function Field({
  label,
  value,
  onChange,
}: {
  label: string
  value: string
  onChange: (value: string) => void
}) {
  return (
    <div>
      <label className="text-sm font-semibold text-[#071d41]">
        {label}
      </label>

      <input
        value={value}
        onChange={(event) =>
          onChange(event.target.value)
        }
        className="mt-2 w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm text-[#071d41] outline-none transition focus:border-[#168bc4]"
      />
    </div>
  )
}

function TextArea({
  label,
  value,
  rows,
  onChange,
}: {
  label: string
  value: string
  rows: number
  onChange: (value: string) => void
}) {
  return (
    <div>
      <label className="text-sm font-semibold text-[#071d41]">
        {label}
      </label>

      <textarea
        value={value}
        rows={rows}
        onChange={(event) =>
          onChange(event.target.value)
        }
        className="mt-2 w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm text-[#071d41] outline-none transition focus:border-[#168bc4]"
      />
    </div>
  )
}