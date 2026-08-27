"use client"

import Link from "next/link"
import { createClient } from "@/lib/supabase/client"
import { FormEvent, useEffect, useState } from "react"

type ServiceType = "bookkeeping" | "payroll"

type Props = {
  service: ServiceType
}

const bookkeepingPackages = [
  {
    title: "Less than MVR 10,000",
    price: "MVR 2,000",
    inclusions: [
      "Bookkeeping",
      "Accounts Receivable",
      "Accounts Payable",
      "Inventory Accounting",
      "GST Compliance",
      "Year-End Accounting",
      "Document Management",
    ],
  },
  {
    title: "MVR 10,000 – MVR 25,000",
    price: "MVR 3,500",
    inclusions: [
      "Bookkeeping",
      "Bank & Cash Reconciliation",
      "Accounts Receivable",
      "Accounts Payable",
      "Inventory Accounting",
      "Year-End Accounting",
      "Document Management",
    ],
  },
  {
    title: "MVR 25,000 – MVR 50,000",
    price: "MVR 5,000",
    inclusions: [
      "Bookkeeping",
      "Bank & Cash Reconciliation",
      "Accounts Receivable",
      "Accounts Payable",
      "Inventory Accounting",
      "GST Compliance",
      "Tax Compliance",
      "Year-End Accounting",
      "Client Support",
      "Document Management",
    ],
  },
  {
    title: "MVR 50,000 – MVR 75,000",
    price: "MVR 6,500",
    inclusions: [
      "Bookkeeping",
      "Bank & Cash Reconciliation",
      "Accounts Receivable",
      "Accounts Payable",
      "Inventory Accounting",
      "GST Compliance",
      "Tax Compliance",
      "Year-End Accounting",
      "Client Support",
      "Compliance Monitoring",
      "Management Information",
      "Document Management",
    ],
  },
  {
    title: "MVR 75,000 – MVR 100,000",
    price: "MVR 8,000",
    inclusions: [
      "Bookkeeping",
      "Bank & Cash Reconciliation",
      "Accounts Receivable",
      "Accounts Payable",
      "Inventory Accounting",
      "GST Compliance",
      "Tax Compliance",
      "Year-End Accounting",
      "Client Support",
      "Compliance Monitoring",
      "Management Information",
      "Document Management",
    ],
  },
  {
    title: "MVR 100,000 – MVR 150,000",
    price: "MVR 9,500",
    inclusions: [
      "Bookkeeping",
      "Bank & Cash Reconciliation",
      "Accounts Receivable",
      "Accounts Payable",
      "Inventory Accounting",
      "GST Compliance",
      "Tax Compliance",
      "Year-End Accounting",
      "Client Support",
      "Compliance Monitoring",
      "Management Information",
      "Document Management",
    ],
  },
  {
    title: "MVR 150,000 – MVR 200,000",
    price: "MVR 11,500",
    inclusions: [
      "Bookkeeping",
      "Bank & Cash Reconciliation",
      "Accounts Receivable",
      "Accounts Payable",
      "Inventory Accounting",
      "GST Compliance",
      "Tax Compliance",
      "Year-End Accounting",
      "Client Support",
      "Compliance Monitoring",
      "Management Information",
      "Document Management",
    ],
  },
]

const payrollPackages = [
  {
    title: "1 – 5 Employees",
    fixed: "MVR 500",
    variable: "MVR 100",
    setup: "MVR 1,000",
  },
  {
    title: "6 – 10 Employees",
    fixed: "MVR 750",
    variable: "MVR 95",
    setup: "MVR 1,500",
  },
  {
    title: "11 – 20 Employees",
    fixed: "MVR 1,000",
    variable: "MVR 90",
    setup: "MVR 2,000",
  },
  {
    title: "36 – 50 Employees",
    fixed: "MVR 1,250",
    variable: "MVR 85",
    setup: "MVR 2,500",
  },
  {
    title: "21 – 35 Employees",
    fixed: "MVR 1,500",
    variable: "MVR 80",
    setup: "MVR 3,000",
  },
  {
    title: "51 – 75 Employees",
    fixed: "MVR 2,000",
    variable: "MVR 75",
    setup: "MVR 4,000",
  },
  {
    title: "76 – 100 Employees",
    fixed: "MVR 2,500",
    variable: "MVR 70",
    setup: "MVR 5,000",
  },
]

const payrollInclusions = [
  "Monthly Payroll Processing",
  "Employee Master File Maintenance",
  "New Employee Processing",
  "Employee Termination Processing",
  "Salary Calculations",
  "Overtime Calculations",
  "Leave Adjustments",
  "Deductions",
  "MRPS Calculations",
  "Payroll Validation",
  "Electronic Payslips",
  "Payroll Register",
  "Payroll Journal",
  "Bank Transfer Schedule",
  "Payroll Reports",
  "Payroll Analytics",
  "Client Support",
  "Compliance Monitoring",
]

const bookkeepingReasons = [
  {
    title: "Reduce administrative burden",
    text:
      "Outsourcing routine bookkeeping allows business owners and management to spend more time on customers, operations and growth.",
  },
  {
    title: "Improve financial records",
    text:
      "Consistent bookkeeping helps maintain organized and timely financial information for decision-making and compliance.",
  },
  {
    title: "Access professional support",
    text:
      "Businesses can access accounting knowledge without maintaining a full in-house bookkeeping function.",
  },
  {
    title: "Create better visibility",
    text:
      "Reliable records make it easier to understand cash flows, receivables, payables and the financial position of the business.",
  },
]

const payrollReasons = [
  {
    title: "Reduce administrative work",
    text:
      "Payroll can consume significant management time. Outsourcing allows businesses to focus on their core operations.",
  },
  {
    title: "Improve payroll accuracy",
    text:
      "A structured payroll process reduces the risk of calculation, processing and record-keeping errors.",
  },
  {
    title: "Protect employee information",
    text:
      "Payroll involves sensitive employee information. A controlled process helps manage payroll information appropriately.",
  },
  {
    title: "Maintain consistent processes",
    text:
      "A dedicated payroll process provides consistency for monthly processing, employee changes, deductions and reporting.",
  },
]

const whyCura = [
  "Practical understanding of the Maldives business environment",
  "Professional accounting and financial knowledge",
  "Structured and consistent processes",
  "Clear communication with management",
  "Flexible support designed around the client's requirements",
  "Ability to combine bookkeeping or payroll support with wider accounting, tax and advisory services",
]

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#168BC4]">
      {children}
    </p>
  )
}

function InquiryForm({ service }: { service: ServiceType }) {
  const serviceName =
    service === "bookkeeping" ? "Bookkeeping Service" : "Payroll Service"

  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState("")

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    setSubmitting(true)
    setSuccess(false)
    setError("")

    const form = event.currentTarget
    const formData = new FormData(form)

    const payload = {
      service,
      full_name: formData.get("full_name"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      business_name: formData.get("business_name"),
      business_type: formData.get("business_type"),
      business_location: formData.get("business_location"),
      website: formData.get("website"),
      current_circumstance: formData.get("current_circumstance"),
      assistance_required: formData.get("assistance_required"),
      urgency: formData.get("urgency"),
      preferred_contact_method: formData.get("preferred_contact_method"),
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

      if (!response.ok || !result.ok) {
        throw new Error(
          result?.error || "Unable to submit your enquiry.",
        )
      }

      form.reset()
      setSuccess(true)

      window.setTimeout(() => {
        setSuccess(false)
      }, 5000)
    } catch (err) {
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
    <section
      id="enquiry"
      className="bg-[#071B49] px-6 py-20 text-white md:py-24"
    >
      <div className="mx-auto max-w-6xl">

        <div className="max-w-3xl">
          <SectionLabel>Customized requirements</SectionLabel>

          <h2 className="mt-5 text-3xl font-semibold md:text-4xl">
            Need a package tailored to your business?
          </h2>

          <p className="mt-5 text-base leading-8 text-slate-300">
            Tell CURA about your business, current processes and requirements.
            We can review your needs and discuss an appropriate scope of
            support.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="mt-12 rounded-2xl bg-white p-6 text-[#071B49] shadow-2xl md:p-10"
        >
          <div className="rounded-xl border border-slate-200 bg-[#F5F8FC] p-5">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500">
              Service enquiry
            </p>

            <p className="mt-2 text-lg font-semibold">
              {serviceName}
            </p>
          </div>

          <div className="mt-8 grid gap-6 md:grid-cols-2">

            <div>
              <label className="text-sm font-semibold">
                Full name *
              </label>
              <input
                required
                name="full_name"
                type="text"
                placeholder="Your full name"
                className="mt-2 w-full rounded-lg border border-slate-300 px-4 py-3 outline-none transition focus:border-[#168BC4]"
              />
            </div>

            <div>
              <label className="text-sm font-semibold">
                Business / Company *
              </label>
              <input
                required
                name="business_name"
                type="text"
                placeholder="Company name"
                className="mt-2 w-full rounded-lg border border-slate-300 px-4 py-3 outline-none transition focus:border-[#168BC4]"
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
                placeholder="you@company.com"
                className="mt-2 w-full rounded-lg border border-slate-300 px-4 py-3 outline-none transition focus:border-[#168BC4]"
              />
            </div>

            <div>
              <label className="text-sm font-semibold">
                Phone / WhatsApp *
              </label>
              <input
                required
                name="phone"
                type="tel"
                placeholder="+960 ..."
                className="mt-2 w-full rounded-lg border border-slate-300 px-4 py-3 outline-none transition focus:border-[#168BC4]"
              />
            </div>

            <div>
              <label className="text-sm font-semibold">
                Business type / Industry *
              </label>
              <input
                required
                name="business_type"
                type="text"
                placeholder="e.g. Retail, Tourism, Construction"
                className="mt-2 w-full rounded-lg border border-slate-300 px-4 py-3 outline-none transition focus:border-[#168BC4]"
              />
            </div>

            <div>
              <label className="text-sm font-semibold">
                Business location
              </label>
              <input
                name="business_location"
                type="text"
                placeholder="Island / Location"
                className="mt-2 w-full rounded-lg border border-slate-300 px-4 py-3 outline-none transition focus:border-[#168BC4]"
              />
            </div>

            <div>
              <label className="text-sm font-semibold">
                Website
              </label>
              <input
                name="website"
                type="text"
                placeholder="www.example.com"
                className="mt-2 w-full rounded-lg border border-slate-300 px-4 py-3 outline-none transition focus:border-[#168BC4]"
              />
            </div>

            <div>
              <label className="text-sm font-semibold">
                Preferred contact method
              </label>

              <select
                name="preferred_contact_method"
                defaultValue="Email"
                className="mt-2 w-full rounded-lg border border-slate-300 bg-white px-4 py-3 outline-none focus:border-[#168BC4]"
              >
                <option>Email</option>
                <option>Phone</option>
                <option>WhatsApp</option>
              </select>
            </div>

          </div>

          <div className="mt-6">
            <label className="text-sm font-semibold">
              Tell us about your current circumstances *
            </label>

            <textarea
              required
              minLength={20}
              name="current_circumstance"
              rows={5}
              placeholder="Tell us about your current bookkeeping/payroll process, team size, systems used, challenges or other relevant circumstances."
              className="mt-2 w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-[#168BC4]"
            />
          </div>

          <div className="mt-6">
            <label className="text-sm font-semibold">
              What would you like CURA to help with? *
            </label>

            <textarea
              required
              minLength={10}
              name="assistance_required"
              rows={5}
              placeholder="Describe the support you are looking for or any customized requirements."
              className="mt-2 w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-[#168BC4]"
            />
          </div>

          <div className="mt-6">
            <label className="text-sm font-semibold">
              Urgency
            </label>

            <select
              name="urgency"
              defaultValue="Not urgent"
              className="mt-2 w-full rounded-lg border border-slate-300 bg-white px-4 py-3 outline-none focus:border-[#168BC4]"
            >
              <option>Not urgent</option>
              <option>Within 1 month</option>
              <option>Within 2 weeks</option>
              <option>Urgent</option>
            </select>
          </div>

          {error && (
            <div className="mt-6 rounded-lg border border-red-200 bg-red-50 px-4 py-4 text-sm text-red-700">
              {error}
            </div>
          )}

          {success && (
            <div className="mt-6 rounded-lg border border-green-200 bg-green-50 px-4 py-4 text-sm font-semibold text-green-700">
              ✓ Your enquiry has been submitted successfully. CURA will
              review your requirements and get in touch with you.
            </div>
          )}

          <button
            type="submit"
            disabled={submitting}
            className="mt-8 inline-flex items-center justify-center rounded-md bg-[#071B49] px-8 py-3.5 text-sm font-semibold text-white transition hover:bg-[#0B2A69] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {submitting ? "Submitting..." : "Submit enquiry →"}
          </button>

          <p className="mt-4 text-xs leading-5 text-slate-500">
            Your enquiry will be reviewed by CURA. We will use the contact
            information provided to respond to your enquiry.
          </p>
        </form>
      </div>
    </section>
  )
}

type DatabasePackage = {
  id: string
  service_id: string
  title: string
  price: string | null
  fixed_fee: string | null
  variable_fee: string | null
  setup_fee: string | null
  inclusions: string[] | null
  display_order: number
  published: boolean
}

export default function OtherServicePage({ service }: Props) {

  const supabase = createClient()

  const [databasePackages, setDatabasePackages] =
    useState<DatabasePackage[]>([])

  const [packagesLoading, setPackagesLoading] =
    useState(true)

  const [packagesError, setPackagesError] =
    useState("")

  useEffect(() => {
    let cancelled = false

    async function loadPublishedPackages() {
      setPackagesLoading(true)
      setPackagesError("")

      const {
        data: serviceData,
        error: serviceError,
      } = await supabase
        .from("other_services")
        .select("id")
        .eq("slug", service)
        .eq("published", true)
        .maybeSingle()

      if (serviceError) {
        if (!cancelled) {
          setPackagesError(serviceError.message)
          setDatabasePackages([])
          setPackagesLoading(false)
        }
        return
      }

      if (!serviceData) {
        if (!cancelled) {
          setDatabasePackages([])
          setPackagesLoading(false)
        }
        return
      }

      const {
        data: packageData,
        error: packageError,
      } = await supabase
        .from("other_service_packages")
        .select(
          "id, service_id, title, price, fixed_fee, variable_fee, setup_fee, inclusions, display_order, published"
        )
        .eq("service_id", serviceData.id)
        .eq("published", true)
        .order("display_order", {
          ascending: true,
        })

      if (packageError) {
        if (!cancelled) {
          setPackagesError(packageError.message)
          setDatabasePackages([])
          setPackagesLoading(false)
        }
        return
      }

      if (!cancelled) {
        setDatabasePackages(
          (packageData ?? []).map((pkg) => ({
            ...pkg,
            inclusions: Array.isArray(pkg.inclusions)
              ? pkg.inclusions
              : [],
          }))
        )

        setPackagesLoading(false)
      }
    }

    loadPublishedPackages()

    return () => {
      cancelled = true
    }
  }, [service])

  const isBookkeeping = service === "bookkeeping"

  const title = isBookkeeping
    ? "Bookkeeping Service"
    : "Payroll Service"

  const description = isBookkeeping
    ? "Reliable bookkeeping support designed to keep your financial records organized, timely and useful for running your business."
    : "Structured payroll support designed to make monthly payroll processing accurate, consistent and easier to manage."

  const reasons = isBookkeeping
    ? bookkeepingReasons
    : payrollReasons

  return (
    <div className="min-h-screen bg-white text-[#071B49]">


      {/* HERO */}
      <section className="relative overflow-hidden bg-[#061936]">

        <div className="absolute inset-0">
          <div className="absolute right-0 top-0 h-full w-1/2 bg-gradient-to-l from-[#0D4F85] via-[#0A315F] to-transparent opacity-80" />
          <div className="absolute -right-40 -top-40 h-[600px] w-[600px] rounded-full bg-[#168BC4] opacity-20 blur-3xl" />
          <div className="absolute bottom-0 left-1/3 h-64 w-64 rounded-full bg-[#0C73A8] opacity-20 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-7xl px-6 py-20 md:py-28 lg:px-8 lg:py-32">

          <Link
            href="/other-services"
            className="inline-flex items-center rounded-md border border-white/30 bg-white/10 px-5 py-2.5 text-sm font-semibold text-white backdrop-blur-sm transition hover:border-[#18B8EE] hover:bg-[#168BC4] hover:text-white" style={{ color: "#FFFFFF" }}
          >
            ← Back to Other Services
          </Link>

          <div className="mt-12 max-w-4xl">

            <p className="text-xs font-bold uppercase tracking-[0.35em] text-[#35B5E5]">
              Other Services
            </p>

            <h1 className="mt-5 text-5xl font-semibold leading-[1.05] tracking-tight text-white md:text-7xl">
              {title}
            </h1>

            <p className="mt-7 max-w-3xl text-lg leading-8 text-slate-300 md:text-xl">
              {description}
            </p>

            <a
              href="#packages"
              className="mt-9 inline-flex rounded-md bg-white px-7 py-3.5 text-sm font-semibold text-[#071B49] transition hover:bg-slate-100"
            >
              View packages →
            </a>

            <a
              href="#enquiry"
              className="ml-3 mt-9 inline-flex rounded-md border border-white/40 bg-transparent px-7 py-3.5 text-sm font-semibold transition hover:bg-white/10" style={{ color: "#FFFFFF" }}
            >
              Customized enquiry
            </a>

          </div>
        </div>
      </section>

      {/* INTRO */}
      <section>
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8 lg:py-24">

          <div className="grid gap-14 lg:grid-cols-[1.4fr_0.8fr]">

            <div>
              <SectionLabel>Why outsource?</SectionLabel>

              <h2 className="mt-5 text-4xl font-semibold tracking-tight md:text-5xl">
                Focus on running your business. Let CURA handle the process.
              </h2>

              <p className="mt-7 text-lg leading-9 text-slate-600">
                {isBookkeeping
                  ? "Bookkeeping is a recurring operational requirement, but it does not necessarily need to be managed entirely in-house. Outsourcing can give businesses access to structured accounting support while reducing the administrative burden on owners and management."
                  : "Payroll is a critical recurring process involving employee records, calculations, deductions, reporting and payment information. Outsourcing can reduce administrative pressure while giving businesses access to a structured payroll process."
                }
              </p>
            </div>

            <div className="rounded-2xl bg-[#F5F8FC] p-8">
              <SectionLabel>At a glance</SectionLabel>

              <h3 className="mt-4 text-2xl font-semibold">
                {isBookkeeping
                  ? "Bookkeeping support"
                  : "Payroll support"
                }
              </h3>

              <p className="mt-4 leading-7 text-slate-600">
                Practical support designed around the size, needs and
                circumstances of your business.
              </p>

              <a
                href="#enquiry"
                className="mt-7 inline-flex font-semibold text-[#168BC4] hover:text-[#071B49]"
              >
                Discuss your requirements →
              </a>
            </div>

          </div>
        </div>
      </section>

      {/* WHY OUTSOURCE */}
      <section className="bg-[#F5F8FC]">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8">

          <SectionLabel>
            Benefits of outsourcing
          </SectionLabel>

          <h2 className="mt-5 max-w-3xl text-4xl font-semibold tracking-tight md:text-5xl">
            Why businesses outsource {isBookkeeping ? "bookkeeping" : "payroll"}.
          </h2>

          <div className="mt-12 grid gap-5 md:grid-cols-2">

            {reasons.map((reason, index) => (
              <div
                key={reason.title}
                className="group rounded-2xl border border-slate-200 bg-white p-7 transition duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                <span className="text-sm font-bold tracking-[0.15em] text-[#18b8ee]">
                  {String(index + 1).padStart(2, "0")}
                </span>

                <h3 className="mt-7 text-xl font-semibold">
                  {reason.title}
                </h3>

                <p className="mt-3 leading-7 text-slate-600">
                  {reason.text}
                </p>
              </div>
            ))}

          </div>
        </div>
      </section>

      {/* WHY CURA */}
      <section>
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8 lg:py-24">

          <div className="max-w-3xl">
            <SectionLabel>Why CURA</SectionLabel>

            <h2 className="mt-5 text-4xl font-semibold tracking-tight md:text-5xl">
              Professional support with a practical perspective.
            </h2>

            <p className="mt-6 text-lg leading-8 text-slate-600">
              CURA combines professional financial knowledge with practical
              support designed around the day-to-day realities of businesses.
            </p>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">

            {whyCura.map((item, index) => (
              <div
                key={item}
                className="rounded-2xl border border-slate-200 p-7 transition hover:-translate-y-1 hover:shadow-lg"
              >
                <span className="text-2xl font-semibold text-[#18b8ee]">
                  +
                </span>

                <p className="mt-5 leading-7 text-slate-600">
                  {item}
                </p>
              </div>
            ))}

          </div>
        </div>
      </section>

      {/* PACKAGES */}
      <section
        id="packages"
        className="bg-[#F5F8FC]"
      >
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8 lg:py-24">

          <SectionLabel>Packages</SectionLabel>

          <h2 className="mt-5 text-4xl font-semibold tracking-tight md:text-5xl">
            {isBookkeeping
              ? "Bookkeeping packages"
              : "Payroll packages"
            }
          </h2>

          <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-600">
            {isBookkeeping
              ? "Choose a package based on monthly revenue. Each package includes the services listed below."
              : "Choose a package based on the number of employees. Payroll pricing includes a monthly fixed fee, variable fee per employee and a one-time setup fee."
            }
          </p>

          {packagesLoading ? (
            <div className="mt-12 rounded-2xl border border-slate-200 bg-white p-10 text-center">
              <p className="text-sm font-medium text-slate-500">
                Loading packages…
              </p>
            </div>
          ) : packagesError ? (
            <div className="mt-12 rounded-2xl border border-red-200 bg-red-50 p-8">
              <p className="font-semibold text-red-700">
                Unable to load packages.
              </p>
              <p className="mt-2 text-sm text-red-600">
                {packagesError}
              </p>
            </div>
          ) : databasePackages.length === 0 ? (
            <div className="mt-12 rounded-2xl border border-slate-200 bg-white p-10 text-center">
              <p className="text-sm font-medium text-slate-500">
                No packages are currently published.
              </p>
            </div>
          ) : isBookkeeping ? (
            <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-3">

              {databasePackages.map((pkg, index) => (
                <details
                  key={pkg.title}
                  className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
                >
                  <summary className="cursor-pointer list-none p-7">
                    <div className="flex items-start justify-between gap-5">

                      <div>
                        <span className="text-xs font-bold tracking-[0.2em] text-[#18b8ee]">
                          PACKAGE {String(index + 1).padStart(2, "0")}
                        </span>

                        <h3 className="mt-4 text-lg font-semibold">
                          {pkg.title}
                        </h3>
                      </div>

                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-slate-200 text-lg text-[#168BC4] transition group-open:rotate-45">
                        +
                      </span>

                    </div>

                    <p className="mt-7 text-3xl font-semibold text-[#071B49]">
                      {pkg.price}
                    </p>

                    <p className="mt-1 text-xs font-semibold uppercase tracking-[0.15em] text-slate-400">
                      Per month
                    </p>

                    <div className="mt-6 inline-flex rounded-md bg-[#18b8ee] px-4 py-2 text-xs font-bold uppercase tracking-[0.12em] text-white">
                      Includes
                    </div>
                  </summary>

                  <div className="border-t border-slate-200 px-7 pb-7 pt-6">
                    <ul className="space-y-3">
                      {(pkg.inclusions ?? []).map((item) => (
                        <li
                          key={item}
                          className="flex gap-3 text-sm leading-6 text-slate-600"
                        >
                          <span className="mt-1 text-[#168BC4]">
                            ✓
                          </span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </details>
              ))}

            </div>
          ) : (
            <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-3">

              {databasePackages.map((pkg, index) => (
                <details
                  key={pkg.title}
                  className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
                >
                  <summary className="cursor-pointer list-none p-7">

                    <div className="flex items-start justify-between gap-4">

                      <div>
                        <span className="text-xs font-bold tracking-[0.2em] text-[#18b8ee]">
                          PACKAGE {String(index + 1).padStart(2, "0")}
                        </span>

                        <h3 className="mt-4 text-xl font-semibold">
                          {pkg.title}
                        </h3>
                      </div>

                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-slate-200 text-lg text-[#168BC4] transition group-open:rotate-45">
                        +
                      </span>

                    </div>

                    <div className="mt-8 space-y-5">

                      <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-400">
                          Fixed fee
                        </p>

                        <p className="mt-1 text-2xl font-semibold">
                          {pkg.fixed_fee}
                        </p>

                        <p className="text-xs text-slate-400">
                          Per month
                        </p>
                      </div>

                      <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-400">
                          Variable fee
                        </p>

                        <p className="mt-1 text-2xl font-semibold">
                          {pkg.variable_fee}
                        </p>

                        <p className="text-xs text-slate-400">
                          Per employee per month
                        </p>
                      </div>

                      <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-400">
                          Setup fee
                        </p>

                        <p className="mt-1 text-2xl font-semibold">
                          {pkg.setup_fee}
                        </p>

                        <p className="text-xs text-slate-400">
                          One time fixed fee
                        </p>
                      </div>

                    </div>

                    <div className="mt-7 inline-flex rounded-md bg-[#18b8ee] px-4 py-2 text-xs font-bold uppercase tracking-[0.12em] text-white">
                      Includes
                    </div>

                  </summary>

                  <div className="border-t border-slate-200 px-7 pb-7 pt-6">
                    <ul className="space-y-3">
                      {(pkg.inclusions ?? []).map((item) => (
                        <li
                          key={item}
                          className="flex gap-3 text-sm leading-6 text-slate-600"
                        >
                          <span className="mt-1 text-[#168BC4]">
                            ✓
                          </span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                </details>
              ))}

            </div>
          )}

          <div className="mt-10 rounded-2xl border border-[#18b8ee]/20 bg-white p-7">
            <p className="text-sm font-semibold text-[#071B49]">
              Need something different?
            </p>

            <p className="mt-2 text-sm leading-7 text-slate-600">
              The packages provide a starting point. If your business has
              requirements outside the packages above, use the customized
              enquiry form below and tell us what you need.
            </p>

            <a
              href="#enquiry"
              className="mt-5 inline-flex font-semibold text-[#168BC4] hover:text-[#071B49]"
            >
              Submit customized requirements →
            </a>
          </div>

        </div>
      </section>

      {/* SERVICE SCOPE */}
      <section>
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8">

          <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">

            <div>
              <SectionLabel>
                Practical support
              </SectionLabel>

              <h2 className="mt-5 text-4xl font-semibold tracking-tight">
                Designed around your business.
              </h2>
            </div>

            <div className="space-y-4">

              {(isBookkeeping
                ? [
                    "Packages can be selected according to monthly revenue.",
                    "Businesses can discuss requirements that fall outside the standard package.",
                    "Support can be structured around the client's existing accounting processes.",
                    "CURA can discuss broader accounting and compliance requirements where relevant.",
                  ]
                : [
                    "Packages can be selected according to employee numbers.",
                    "The package includes monthly processing and the listed payroll activities.",
                    "Businesses can discuss requirements that fall outside the standard package.",
                    "CURA can discuss broader accounting and compliance requirements where relevant.",
                  ]
              ).map((item) => (
                <div
                  key={item}
                  className="rounded-xl border border-slate-200 bg-[#F5F8FC] px-6 py-5"
                >
                  <p className="flex gap-3 leading-7 text-slate-600">
                    <span className="text-[#168BC4]">✓</span>
                    {item}
                  </p>
                </div>
              ))}

            </div>

          </div>
        </div>
      </section>

      {/* ENQUIRY */}
      <InquiryForm service={service} />


    </div>
  )
}