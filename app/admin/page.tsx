"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"

type AdminUser = {
  email?: string
}

const sections = [
  {
    title: "Education Materials",
    description:
      "Manage educational topics, sections and learning content",
    href: "/admin/education",
    label: "Manage Education Materials",
    status: "Available",
  },
  {
    title: "Knowledge",
    description:
      "Create, edit and manage CURA articles, tax guides and professional knowledge content.",
    href: "/admin/articles",
    label: "Manage Knowledge",
    status: "Available",
    icon: "✦",
  },
  {
    title: "Maldives Economy",
    description:
      "Manage articles covering economic growth, tourism, inflation, government finance, the external sector and the financial sector.",
    href: "/admin/insights/maldives-economy",
    label: "Manage Maldives Economy",
    status: "Available",
    icon: "◉",
    viewHref: "/insights/maldives-economy",
    viewLabel: "View Page",
  },
  {
    title: "Global Economy",
    description:
      "Manage articles covering global growth, inflation, interest rates, trade, commodities and the international economic outlook.",
    href: "/admin/insights/global-economy",
    label: "Manage Global Economy",
    status: "Available",
    icon: "◎",
    viewHref: "/insights/global-economy",
    viewLabel: "View Page",
  },
  {
    title: "Legal Cases",
    description:
      "Manage legal cases, proceedings, issues, timelines and official source documents.",
    href: "/admin/cases",
    label: "Manage Legal Cases",
    status: "Available",
    icon: "⚖",
  },
  {
    title: "Careers",
    description:
      "Create and manage vacancies, job descriptions, requirements and publication status.",
    href: "/admin/careers",
    label: "Manage Careers",
    status: "Available",
    icon: "▣",
  },
  {
    title: "Exchange Rates",
    description:
      "Manage published MVR / USD exchange rates and their supporting information.",
    href: "/admin/exchange-rates",
    label: "Manage Exchange Rates",
    status: "Available",
    icon: "↔",
  },
  {
    title: "Other Services",
    description:
      "Manage CURA bookkeeping and payroll services, packages, prices and service content.",
    href: "/admin/other-services",
    label: "Manage Other Services",
    status: "Available",
    icon: "◆",
  },
  {
    title: "Money Exchangers",
    description:
      "Add, edit and manage authorized money exchangers displayed on CURA.",
    href: "/admin/money-exchangers",
    label: "Manage Exchangers",
    status: "Available",
    icon: "◎",
  },
  {
    title: "Our Team",
    description:
      "Manage CURA team profiles, qualifications, positions and professional biographies.",
    href: "/admin/team",
    label: "Manage Team",
    status: "Available",
    icon: "♙",
  },
  {
    title: "Site Content",
    description:
      "Manage selected homepage, About, Education and contact information.",
    href: "/admin/site-content",
    label: "Manage Site Content",
    status: "Available",
    icon: "◈",
  },
]

export default function AdminDashboard() {
  const router = useRouter()
  const supabase = createClient()

  const [user, setUser] = useState<AdminUser | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let mounted = true

    async function checkAdmin() {
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user) {
        window.location.href = "/admin/login"
        return
      }

      const { data: isAdmin, error } =
        await supabase.rpc("is_current_user_admin")

      if (error || !isAdmin) {
        await supabase.auth.signOut()
        window.location.href = "/admin/login"
        return
      }

      if (mounted) {
        setUser({
          email: user.email ?? "",
        })

        setLoading(false)
      }
    }

    checkAdmin()

    return () => {
      mounted = false
    }
  }, [])

  async function handleSignOut() {
    await supabase.auth.signOut()
    window.location.href = "/admin/login"
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-[#f4f7fb] flex items-center justify-center">
        <div className="text-center">
          <div className="mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-4 border-slate-200 border-t-[#18b8ee]" />

          <p className="text-sm font-medium text-slate-600">
            Loading CURA Administration...
          </p>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-[#f4f7fb] text-[#071d41]">

      {/* HEADER */}

      <header className="bg-[#061b3d] text-white">

        <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-6 py-4">

          {/* BRAND */}

          <div className="flex items-center gap-5">

            <div className="flex items-center border-r border-white/15 pr-6">

              <img
                src="/cura-logo.png"
                alt="CURA"
                className="h-12 w-auto object-contain brightness-0 invert"
              />

            </div>

            <div className="hidden sm:block">

              <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-[#18b8ee]">
                CURA Administration
              </p>

              <h1 className="mt-1 text-lg font-semibold text-white">
                Admin Dashboard
              </h1>

            </div>

          </div>

          {/* HEADER ACTIONS */}

          <div className="flex items-center gap-3">

            <a
              href="/"
              className="hidden rounded-lg border border-white/60 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-white/10 sm:block"
            >
              View Website
            </a>

            <button
              type="button"
              onClick={handleSignOut}
              className="rounded-lg bg-gradient-to-r from-[#18b8ee] to-[#087dcc] px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:from-[#25c5f5] hover:to-[#0b8cda]"
            >
              Sign Out
            </button>

          </div>

        </div>

      </header>

      {/* MAIN */}

      <div className="mx-auto max-w-7xl px-6 py-10 lg:px-8">

        {/* WELCOME */}

        <section className="mb-10">

          <p className="mb-2 text-xs font-bold uppercase tracking-[0.28em] text-[#18b8ee]">
            Content Management
          </p>

          <h2 className="text-3xl font-bold tracking-tight text-[#071d41] md:text-4xl">
            Welcome to CURA Administration
          </h2>

          <p className="mt-3 max-w-3xl text-base leading-7 text-slate-600">
            Manage the content and information published across the CURA
            professional knowledge platform from one central administration
            area.
          </p>

          {user?.email && (
            <p className="mt-3 text-sm text-slate-500">
              Signed in as{" "}
              <span className="font-semibold text-[#071d41]">
                {user.email}
              </span>
            </p>
          )}

        </section>

        {/* QUICK OVERVIEW */}

        <section className="mb-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">

            <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-400">
              Platform
            </p>

            <p className="mt-2 text-xl font-bold text-[#071d41]">
              CURA
            </p>

            <p className="mt-1 text-sm text-slate-500">
              Professional Knowledge Platform
            </p>

          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">

            <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-400">
              Published Content
            </p>

            <p className="mt-2 text-xl font-bold text-[#071d41]">
              Knowledge
            </p>

            <p className="mt-1 text-sm text-slate-500">
              Articles and professional resources
            </p>

          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">

            <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-400">
              Legal
            </p>

            <p className="mt-2 text-xl font-bold text-[#071d41]">
              Cases
            </p>

            <p className="mt-1 text-sm text-slate-500">
              Tax and legal proceedings
            </p>

          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">

            <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-400">
              Financial Data
            </p>

            <p className="mt-2 text-xl font-bold text-[#071d41]">
              Exchange Rates
            </p>

            <p className="mt-1 text-sm text-slate-500">
              MVR / USD published rates
            </p>

          </div>

        </section>

        {/* MANAGEMENT SECTIONS */}

        <section>

          <div className="mb-5">

            <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#18b8ee]">
              Administration
            </p>

            <h3 className="mt-2 text-2xl font-bold text-[#071d41]">
              Manage CURA
            </h3>

          </div>

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">

            {sections.map((section) => {

              const available = section.status === "Available"

              return (
                <div
                  key={section.title}
                  className="flex flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
                >

                  {/* ICON + STATUS */}

                  <div className="mb-5 flex items-start justify-between">

                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#eaf8fd] text-xl font-semibold text-[#087dcc]">
                      {section.icon}
                    </div>

                    <span
                      className={`rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-[0.14em] ${
                        available
                          ? "bg-emerald-50 text-emerald-700"
                          : "bg-slate-100 text-slate-500"
                      }`}
                    >
                      {section.status}
                    </span>

                  </div>

                  <h4 className="text-xl font-bold text-[#071d41]">
                    {section.title}
                  </h4>

                  <p className="mt-3 flex-1 text-sm leading-6 text-slate-600">
                    {section.description}
                  </p>

                  <div className="mt-6">

                    {available ? (
                      <div className="flex flex-wrap items-center gap-3">
                        <a
                          href={section.href}
                          className="inline-flex items-center rounded-lg bg-[#061b3d] px-5 py-2.5 text-sm font-semibold !text-white transition hover:bg-[#0b2a55]"
                        >
                          {section.label}
                          <span className="ml-2">→</span>
                        </a>

                        {"viewHref" in section && section.viewHref ? (
                          <a
                            href={section.viewHref}
                            className="inline-flex items-center rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-[#071d41] transition hover:border-[#087dcc] hover:text-[#087dcc]"
                          >
                            {section.viewLabel ?? "View Page"}
                          </a>
                        ) : null}
                      </div>
                    ) : (
                      <div className="inline-flex items-center rounded-lg border border-slate-200 bg-slate-50 px-5 py-2.5 text-sm font-semibold text-slate-400">
                        Coming Soon
                      </div>
                    )}

                  </div>

                </div>
              )
            })}

          </div>

        </section>

        {/* INFORMATION NOTICE */}

        <section className="mt-10 rounded-2xl border border-[#b9e8f7] bg-[#effbff] p-6">

          <div className="flex gap-4">

            <div className="mt-0.5 text-xl text-[#087dcc]">
              ⓘ
            </div>

            <div>

              <h4 className="font-bold text-[#071d41]">
                Centralized administration
              </h4>

              <p className="mt-1 text-sm leading-6 text-slate-600">
                This dashboard is designed to provide one secure place to
                manage CURA's website content. Additional content management
                sections will be enabled as they are developed.
              </p>

            </div>

          </div>

        </section>

      </div>

      {/* FOOTER */}

      <footer className="border-t border-slate-200 bg-white">

        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-6 py-6 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between">

          <p>
            © {new Date().getFullYear()} CURA. All rights reserved.
          </p>

          <a
            href="/"
            className="font-semibold text-[#071d41] transition hover:text-[#087dcc]"
          >
            Return to CURA →
          </a>

        </div>

      </footer>

    </main>
  )
}
