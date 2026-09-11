"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { createClient } from "@/lib/supabase/client"

type ContentItem = {
  id: string
  area: string
  section_key: string
  item_key: string
  item_type: string
  label: string
  value: string | null
  url: string | null
  visible: boolean
  sort_order: number
}

type MenuItem = ContentItem & {
  settings?: Record<string, unknown>
}

const FALLBACK_MAIN_NAV: MenuItem[] = [
  {
    id: "fallback-home",
    area: "header",
    section_key: "main_navigation",
    item_key: "home",
    item_type: "menu",
    label: "Home",
    value: "Home",
    url: "/",
    visible: true,
    sort_order: 1,
  },
  {
    id: "fallback-knowledge",
    area: "header",
    section_key: "main_navigation",
    item_key: "knowledge",
    item_type: "menu",
    label: "Knowledge",
    value: "Knowledge",
    url: "/articles",
    visible: true,
    sort_order: 2,
  },
  {
    id: "fallback-legal-cases",
    area: "header",
    section_key: "main_navigation",
    item_key: "legal_cases",
    item_type: "menu",
    label: "Legal Cases",
    value: "Legal Cases",
    url: "/cases",
    visible: true,
    sort_order: 3,
  },
  {
    id: "fallback-insights",
    area: "header",
    section_key: "main_navigation",
    item_key: "cura_insights",
    item_type: "menu",
    label: "Cura Insights",
    value: "Cura Insights",
    url: null,
    visible: true,
    sort_order: 4,
  },
  {
    id: "fallback-services",
    area: "header",
    section_key: "main_navigation",
    item_key: "services",
    item_type: "menu",
    label: "Services",
    value: "Services",
    url: null,
    visible: true,
    sort_order: 5,
  },
  {
    id: "fallback-education",
    area: "header",
    section_key: "main_navigation",
    item_key: "education",
    item_type: "menu",
    label: "Education",
    value: "Education",
    url: null,
    visible: true,
    sort_order: 6,
  },
  {
    id: "fallback-careers",
    area: "header",
    section_key: "main_navigation",
    item_key: "careers",
    item_type: "menu",
    label: "Careers",
    value: "Careers",
    url: "/careers",
    visible: true,
    sort_order: 7,
  },
  {
    id: "fallback-team",
    area: "header",
    section_key: "main_navigation",
    item_key: "team",
    item_type: "menu",
    label: "Our Team",
    value: "Our Team",
    url: "/team",
    visible: true,
    sort_order: 8,
  },
  {
    id: "fallback-contact",
    area: "header",
    section_key: "main_navigation",
    item_key: "contact",
    item_type: "button",
    label: "Contact",
    value: "Contact",
    url: "/#contact",
    visible: true,
    sort_order: 9,
  },
]

const FALLBACK_DROPDOWNS: Record<string, MenuItem[]> = {
  cura_insights: [
    {
      id: "fallback-global-economy",
      area: "header",
      section_key: "cura_insights",
      item_key: "global_economy",
      item_type: "dropdown_item",
      label: "Global Economy",
      value: "Articles and insights on the global economy",
      url: "/insights/global-economy",
      visible: true,
      sort_order: 1,
    },
    {
      id: "fallback-global-financial",
      area: "header",
      section_key: "cura_insights",
      item_key: "global_financial_information",
      item_type: "dropdown_item",
      label: "Global Financial Information",
      value:
        "Financial information and indicators from around the world",
      url: "/insights/global-financial-information",
      visible: true,
      sort_order: 2,
    },
    {
      id: "fallback-maldives-economy",
      area: "header",
      section_key: "cura_insights",
      item_key: "maldives_economy",
      item_type: "dropdown_item",
      label: "Maldives Economy",
      value: "Economic and financial information about Maldives",
      url: "/insights/maldives-economy",
      visible: true,
      sort_order: 3,
    },
    {
      id: "fallback-exchange-rates",
      area: "header",
      section_key: "cura_insights",
      item_key: "exchange_rates",
      item_type: "dropdown_item",
      label: "Exchange Rates",
      value: "Current and historical currency exchange rates",
      url: "/exchange-rate",
      visible: true,
      sort_order: 4,
    },
  ],

  services: [
    {
      id: "fallback-audit",
      area: "header",
      section_key: "services",
      item_key: "audit",
      item_type: "dropdown_item",
      label: "Audit",
      value: "Audit and assurance services",
      url: "/audit",
      visible: true,
      sort_order: 1,
    },
    {
      id: "fallback-advisory",
      area: "header",
      section_key: "services",
      item_key: "advisory",
      item_type: "dropdown_item",
      label: "Advisory",
      value: "Financial and business advisory",
      url: "/advisory",
      visible: true,
      sort_order: 2,
    },
    {
      id: "fallback-tax",
      area: "header",
      section_key: "services",
      item_key: "tax",
      item_type: "dropdown_item",
      label: "Tax",
      value: "Tax compliance and advisory",
      url: "/tax",
      visible: true,
      sort_order: 3,
    },
    {
      id: "fallback-legal",
      area: "header",
      section_key: "services",
      item_key: "legal",
      item_type: "dropdown_item",
      label: "Legal",
      value: "Legal and regulatory services",
      url: "/legal",
      visible: true,
      sort_order: 4,
    },
    {
      id: "fallback-other-services",
      area: "header",
      section_key: "services",
      item_key: "other_services",
      item_type: "dropdown_item",
      label: "Other Services",
      value: "Bookkeeping and payroll services",
      url: "/other-services",
      visible: true,
      sort_order: 5,
    },
  ],

  education: [
    {
      id: "fallback-materials",
      area: "header",
      section_key: "education",
      item_key: "materials",
      item_type: "dropdown_item",
      label: "Educational Materials",
      value: "Study resources and learning materials",
      url: "/education/materials",
      visible: true,
      sort_order: 1,
    },
    {
      id: "fallback-test",
      area: "header",
      section_key: "education",
      item_key: "test",
      item_type: "dropdown_item",
      label: "Test Your Knowledge",
      value: "Take a timed professional test",
      url: "/education/test",
      visible: true,
      sort_order: 2,
    },
    {
      id: "fallback-articles",
      area: "header",
      section_key: "education",
      item_key: "articles",
      item_type: "dropdown_item",
      label: "Technical Articles",
      value: "Tax and professional articles",
      url: "/education/articles",
      visible: true,
      sort_order: 3,
    },
    {
      id: "fallback-leaderboard",
      area: "header",
      section_key: "education",
      item_key: "leaderboard",
      item_type: "dropdown_item",
      label: "Leaderboard",
      value: "See the top test scores",
      url: "/education/leaderboard",
      visible: true,
      sort_order: 4,
    },
  ],
}

function sortItems(items: MenuItem[]) {
  return [...items].sort((a, b) => a.sort_order - b.sort_order)
}

function Chevron({ open }: { open: boolean }) {
  return (
    <svg
      className={`h-3.5 w-3.5 transition-transform ${
        open ? "rotate-180" : ""
      }`}
      viewBox="0 0 20 20"
      fill="currentColor"
      aria-hidden="true"
    >
      <path
        fillRule="evenodd"
        d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L4.17 8.29a.75.75 0 01.02-1.08z"
        clipRule="evenodd"
      />
    </svg>
  )
}

export default function CuraHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [educationOpen, setEducationOpen] = useState(false)
  const [servicesOpen, setServicesOpen] = useState(false)
  const [insightsOpen, setInsightsOpen] = useState(false)

  const [mainNav, setMainNav] =
    useState<MenuItem[]>(FALLBACK_MAIN_NAV)

  const [dropdowns, setDropdowns] =
    useState<Record<string, MenuItem[]>>(FALLBACK_DROPDOWNS)

  const closeMobileMenu = () => {
    setMobileMenuOpen(false)
    setEducationOpen(false)
    setServicesOpen(false)
    setInsightsOpen(false)
  }

  useEffect(() => {
    let mounted = true

    async function loadNavigation() {
      const supabase = createClient()

      const { data, error } = await supabase
        .from("site_content")
        .select(
          "id, area, section_key, item_key, item_type, label, value, url, visible, sort_order"
        )
        .eq("area", "header")
        .eq("visible", true)
        .order("sort_order")

      if (error || !data || data.length === 0) {
        return
      }

      if (!mounted) return

      const content = data as MenuItem[]

      const cmsMainNav = sortItems(
        content.filter(
          (item) =>
            item.section_key === "main_navigation"
        )
      )

      if (cmsMainNav.length > 0) {
        setMainNav(cmsMainNav)
      }

      const nextDropdowns: Record<string, MenuItem[]> = {
        cura_insights: [],
        services: [],
        education: [],
      }

      for (const item of content) {
        if (
          item.section_key === "cura_insights" ||
          item.section_key === "services" ||
          item.section_key === "education"
        ) {
          nextDropdowns[item.section_key].push(item)
        }
      }

      for (const key of Object.keys(nextDropdowns)) {
        if (nextDropdowns[key].length > 0) {
          nextDropdowns[key] = sortItems(
            nextDropdowns[key]
          )
        } else {
          nextDropdowns[key] =
            FALLBACK_DROPDOWNS[key] ?? []
        }
      }

      setDropdowns(nextDropdowns)
    }

    loadNavigation()

    return () => {
      mounted = false
    }
  }, [])

  const hasDropdown = (itemKey: string) =>
    ["cura_insights", "services", "education"].includes(
      itemKey
    )

  const renderDropdownItems = (
    sectionKey: string,
    close: () => void
  ) => {
    const items =
      dropdowns[sectionKey] ??
      FALLBACK_DROPDOWNS[sectionKey] ??
      []

    return items
      .filter((item) => item.visible)
      .map((item) => (
        <Link
          key={item.id}
          href={item.url || "#"}
          onClick={close}
          className="block rounded-lg px-4 py-3 transition hover:bg-[#F1F7FB]"
        >
          <span
            className={`font-semibold ${
              item.item_key === "legal"
                ? "text-[#D71920]"
                : "text-[#071B49]"
            }`}
          >
            {item.value || item.label}
          </span>

          {item.value && item.value !== item.label && (
            <span className="mt-0.5 block text-xs text-slate-500">
              {item.value}
            </span>
          )}
        </Link>
      ))
  }

  const visibleMainNav = sortItems(
    mainNav.filter((item) => item.visible)
  )

  return (
    <header className="border-b border-[#dce5ef] bg-white">
      <div className="mx-auto max-w-7xl px-6 py-4 md:px-10 lg:px-12">
        <div className="flex items-center justify-between gap-8">

          {/* CURA LOGO */}
          <Link
            href="/"
            className="shrink-0"
            onClick={closeMobileMenu}
          >
            <img
              src="/cura-logo.png"
              alt="CURA"
              className="h-20 w-auto object-contain"
            />
          </Link>

          {/* DESKTOP NAVIGATION */}
          <nav className="hidden items-center gap-7 text-sm font-medium md:flex">
            {visibleMainNav.map((item) => {
              const key = item.item_key

              if (hasDropdown(key)) {
                const open =
                  key === "cura_insights"
                    ? insightsOpen
                    : key === "services"
                      ? servicesOpen
                      : educationOpen

                const setOpen = () => {
                  if (key === "cura_insights") {
                    setInsightsOpen(!insightsOpen)
                    setServicesOpen(false)
                    setEducationOpen(false)
                  }

                  if (key === "services") {
                    setServicesOpen(!servicesOpen)
                    setEducationOpen(false)
                    setInsightsOpen(false)
                  }

                  if (key === "education") {
                    setEducationOpen(!educationOpen)
                    setServicesOpen(false)
                    setInsightsOpen(false)
                  }
                }

                return (
                  <div
                    key={item.id}
                    className="relative"
                  >
                    <button
                      type="button"
                      onClick={setOpen}
                      aria-expanded={open}
                      className="flex items-center gap-1.5 text-[#071B49] transition hover:text-[#18b8ee]"
                    >
                      <span>
                        {item.value || item.label}
                      </span>

                      <Chevron open={open} />
                    </button>

                    {open && (
                      <div
                        className={`absolute left-1/2 top-full z-50 mt-4 -translate-x-1/2 rounded-xl border border-slate-200 bg-white p-2 shadow-xl ${
                          key === "cura_insights"
                            ? "w-80"
                            : key === "services"
                              ? "w-72"
                              : "w-64"
                        }`}
                      >
                        {renderDropdownItems(
                          key,
                          () => {
                            if (
                              key ===
                              "cura_insights"
                            ) {
                              setInsightsOpen(false)
                            } else if (
                              key === "services"
                            ) {
                              setServicesOpen(false)
                            } else {
                              setEducationOpen(false)
                            }
                          }
                        )}
                      </div>
                    )}
                  </div>
                )
              }

              return (
                <Link
                  key={item.id}
                  href={item.url || "#"}
                  className={
                    key === "contact"
                      ? "rounded-md bg-[#071B49] px-5 py-2.5 text-sm font-semibold !text-white transition hover:bg-[#0B2A69]"
                      : "text-[#071B49] transition hover:text-[#18b8ee]"
                  }
                >
                  {item.value || item.label}
                </Link>
              )
            })}
          </nav>

          {/* MOBILE MENU BUTTON */}
          <button
            type="button"
            aria-label={
              mobileMenuOpen
                ? "Close menu"
                : "Open menu"
            }
            aria-expanded={mobileMenuOpen}
            onClick={() =>
              setMobileMenuOpen(!mobileMenuOpen)
            }
            className="flex h-11 w-11 items-center justify-center rounded-md border border-slate-200 text-[#071B49] transition hover:bg-slate-50 md:hidden"
          >
            {mobileMenuOpen ? (
              <span className="text-2xl leading-none">
                ×
              </span>
            ) : (
              <span className="text-2xl leading-none">
                ☰
              </span>
            )}
          </button>
        </div>

        {/* MOBILE NAVIGATION */}
        {mobileMenuOpen && (
          <nav className="border-t border-slate-200 pt-4 md:hidden">
            <div className="flex flex-col">
              {visibleMainNav.map((item) => {
                const key = item.item_key

                if (hasDropdown(key)) {
                  const open =
                    key === "cura_insights"
                      ? insightsOpen
                      : key === "services"
                        ? servicesOpen
                        : educationOpen

                  const toggle = () => {
                    if (
                      key ===
                      "cura_insights"
                    ) {
                      setInsightsOpen(!insightsOpen)
                      setServicesOpen(false)
                      setEducationOpen(false)
                    } else if (
                      key === "services"
                    ) {
                      setServicesOpen(!servicesOpen)
                      setEducationOpen(false)
                      setInsightsOpen(false)
                    } else {
                      setEducationOpen(!educationOpen)
                      setServicesOpen(false)
                      setInsightsOpen(false)
                    }
                  }

                  return (
                    <div
                      key={item.id}
                      className="border-b border-slate-100"
                    >
                      <button
                        type="button"
                        onClick={toggle}
                        aria-expanded={open}
                        className="flex w-full items-center justify-start gap-1.5 py-3.5 text-left text-sm font-medium text-[#071B49]"
                      >
                        <span>
                          {item.value ||
                            item.label}
                        </span>

                        <Chevron open={open} />
                      </button>

                      {open && (
                        <div className="pb-2 pl-3">
                          {renderDropdownItems(
                            key,
                            closeMobileMenu
                          )}
                        </div>
                      )}
                    </div>
                  )
                }

                return (
                  <Link
                    key={item.id}
                    href={item.url || "#"}
                    onClick={closeMobileMenu}
                    className={
                      key === "contact"
                        ? "my-3 rounded-md bg-[#071B49] px-5 py-3 text-center text-sm font-semibold !text-white"
                        : "border-b border-slate-100 py-3.5 text-sm font-medium text-[#071B49]"
                    }
                  >
                    {item.value || item.label}
                  </Link>
                )
              })}
            </div>
          </nav>
        )}
      </div>
    </header>
  )
}
