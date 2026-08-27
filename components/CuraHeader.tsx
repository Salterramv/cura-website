"use client"

import { useState } from "react"
import Link from "next/link"

export default function CuraHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [educationOpen, setEducationOpen] = useState(false)
  const [servicesOpen, setServicesOpen] = useState(false)
  const [insightsOpen, setInsightsOpen] = useState(false)

  const closeMobileMenu = () => {
    setMobileMenuOpen(false)
    setEducationOpen(false)
    setServicesOpen(false)
    setInsightsOpen(false)
  }

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
              className="h-16 w-auto object-contain"
            />
          </Link>

          {/* DESKTOP NAVIGATION */}
          <nav className="hidden items-center gap-7 text-sm font-medium md:flex">

            <Link
              href="/"
              className="text-[#071B49] transition hover:text-[#18b8ee]"
            >
              Home
            </Link>

            <Link
              href="/articles"
              className="text-[#071B49] transition hover:text-[#18b8ee]"
            >
              Knowledge
            </Link>

            <Link
              href="/cases"
              className="text-[#071B49] transition hover:text-[#18b8ee]"
            >
              Legal Cases
            </Link>

            {/* CURA INSIGHTS DROPDOWN */}
            <div className="relative">
              <button
                type="button"
                onClick={() => {
                  setInsightsOpen(!insightsOpen)
                  setServicesOpen(false)
                  setEducationOpen(false)
                }}
                aria-expanded={insightsOpen}
                className="flex items-center gap-1.5 text-[#071B49] transition hover:text-[#18b8ee]"
              >
                <span>Cura Insights</span>

                <svg
                  className={`h-3.5 w-3.5 transition-transform ${
                    insightsOpen ? "rotate-180" : ""
                  }`}
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>

              {insightsOpen && (
                <div className="absolute left-1/2 top-full z-50 mt-4 w-80 -translate-x-1/2 rounded-xl border border-slate-200 bg-white p-2 shadow-xl">

                  <Link
                    href="/insights/global-economy"
                    onClick={() => setInsightsOpen(false)}
                    className="block rounded-lg px-4 py-3 transition hover:bg-[#F1F7FB]"
                  >
                    <span className="font-semibold text-[#071B49]">
                      Global Economy
                    </span>

                    <span className="mt-0.5 block text-xs text-slate-500">
                      Articles and insights on the global economy
                    </span>
                  </Link>

                  <Link
                    href="/insights/global-financial-information"
                    onClick={() => setInsightsOpen(false)}
                    className="block rounded-lg px-4 py-3 transition hover:bg-[#F1F7FB]"
                  >
                    <span className="font-semibold text-[#071B49]">
                      Global Financial Information
                    </span>

                    <span className="mt-0.5 block text-xs text-slate-500">
                      Financial information and indicators from around the world
                    </span>
                  </Link>

                  <Link
                    href="/insights/maldives-economy"
                    onClick={() => setInsightsOpen(false)}
                    className="block rounded-lg px-4 py-3 transition hover:bg-[#F1F7FB]"
                  >
                    <span className="font-semibold text-[#071B49]">
                      Maldives Economy
                    </span>

                    <span className="mt-0.5 block text-xs text-slate-500">
                      Economic and financial information about Maldives
                    </span>
                  </Link>

                  <Link
                    href="/insights/exchange-rates"
                    onClick={() => setInsightsOpen(false)}
                    className="block rounded-lg px-4 py-3 transition hover:bg-[#F1F7FB]"
                  >
                    <span className="font-semibold text-[#071B49]">
                      Exchange Rates
                    </span>

                    <span className="mt-0.5 block text-xs text-slate-500">
                      Current and historical currency exchange rates
                    </span>
                  </Link>

                </div>
              )}
            </div>

            {/* SERVICES DROPDOWN */}
            <div className="relative">
              <button
                type="button"
                onClick={() => {
                  setServicesOpen(!servicesOpen)
                  setEducationOpen(false)
                  setInsightsOpen(false)
                }}
                aria-expanded={servicesOpen}
                className="flex items-center gap-1.5 text-[#071B49] transition hover:text-[#18b8ee]"
              >
                <span>Services</span>

                <svg
                  className={`h-3.5 w-3.5 transition-transform ${
                    servicesOpen ? "rotate-180" : ""
                  }`}
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>

              {servicesOpen && (
                <div className="absolute left-1/2 top-full z-50 mt-4 w-72 -translate-x-1/2 rounded-xl border border-slate-200 bg-white p-2 shadow-xl">

                  <Link
                    href="/audit"
                    onClick={() => setServicesOpen(false)}
                    className="block rounded-lg px-4 py-3 transition hover:bg-[#F1F7FB]"
                  >
                    <span className="font-semibold text-[#071B49]">
                      Audit
                    </span>

                    <span className="mt-0.5 block text-xs text-slate-500">
                      Audit and assurance services
                    </span>
                  </Link>

                  <Link
                    href="/advisory"
                    onClick={() => setServicesOpen(false)}
                    className="block rounded-lg px-4 py-3 transition hover:bg-[#F1F7FB]"
                  >
                    <span className="font-semibold text-[#071B49]">
                      Advisory
                    </span>

                    <span className="mt-0.5 block text-xs text-slate-500">
                      Financial and business advisory
                    </span>
                  </Link>

                  <Link
                    href="/tax"
                    onClick={() => setServicesOpen(false)}
                    className="block rounded-lg px-4 py-3 transition hover:bg-[#F1F7FB]"
                  >
                    <span className="font-semibold text-[#071B49]">
                      Tax
                    </span>

                    <span className="mt-0.5 block text-xs text-slate-500">
                      Tax compliance and advisory
                    </span>
                  </Link>

                  <Link
                    href="/legal"
                    onClick={() => setServicesOpen(false)}
                    className="block rounded-lg px-4 py-3 transition hover:bg-[#F1F7FB]"
                  >
                    <span className="font-semibold text-[#D71920]">
                      Legal
                    </span>

                    <span className="mt-0.5 block text-xs text-slate-500">
                      Legal and regulatory services
                    </span>
                  </Link>

                </div>
              )}
            </div>

            {/* EDUCATION DROPDOWN */}
            <div className="relative">
              <button
                type="button"
                onClick={() => {
                  setEducationOpen(!educationOpen)
                  setServicesOpen(false)
                  setInsightsOpen(false)
                }}
                aria-expanded={educationOpen}
                className="flex items-center gap-1.5 text-[#071B49] transition hover:text-[#18b8ee]"
              >
                <span>Education</span>

                {/* SAME CHEVRON AS SERVICES */}
                <svg
                  className={`h-3.5 w-3.5 transition-transform ${
                    educationOpen ? "rotate-180" : ""
                  }`}
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>

              {educationOpen && (
                <div className="absolute left-1/2 top-full z-50 mt-4 w-64 -translate-x-1/2 rounded-xl border border-slate-200 bg-white p-2 shadow-xl">

                  <Link
                    href="/education/materials"
                    onClick={() => setEducationOpen(false)}
                    className="block rounded-lg px-4 py-3 text-sm text-[#071B49] transition hover:bg-[#F1F7FB]"
                  >
                    <span className="font-semibold">
                      Educational Materials
                    </span>

                    <span className="mt-0.5 block text-xs text-slate-500">
                      Study resources and learning materials
                    </span>
                  </Link>

                  <Link
                    href="/education/test"
                    onClick={() => setEducationOpen(false)}
                    className="block rounded-lg px-4 py-3 text-sm text-[#071B49] transition hover:bg-[#F1F7FB]"
                  >
                    <span className="font-semibold">
                      Test Your Knowledge
                    </span>

                    <span className="mt-0.5 block text-xs text-slate-500">
                      Take a timed professional test
                    </span>
                  </Link>

                  <Link
                    href="/articles"
                    onClick={() => setEducationOpen(false)}
                    className="block rounded-lg px-4 py-3 text-sm text-[#071B49] transition hover:bg-[#F1F7FB]"
                  >
                    <span className="font-semibold">
                      Technical Articles
                    </span>

                    <span className="mt-0.5 block text-xs text-slate-500">
                      Tax and professional articles
                    </span>
                  </Link>

                  <Link
                    href="/education/leaderboard"
                    onClick={() => setEducationOpen(false)}
                    className="block rounded-lg px-4 py-3 text-sm text-[#071B49] transition hover:bg-[#F1F7FB]"
                  >
                    <span className="font-semibold">
                      Leaderboard
                    </span>

                    <span className="mt-0.5 block text-xs text-slate-500">
                      See the top test scores
                    </span>
                  </Link>

                </div>
              )}
            </div>

            <Link
              href="/careers"
              className="text-[#071B49] transition hover:text-[#18b8ee]"
            >
              Careers
            </Link>

            <Link
              href="/team"
              className="text-[#071B49] transition hover:text-[#18b8ee]"
            >
              Our Team
            </Link>

            <Link
              href="/#contact"
              className="rounded-md bg-[#071B49] px-5 py-2.5 text-sm font-semibold !text-white transition hover:bg-[#0B2A69]"
            >
              Contact
            </Link>

          </nav>

          {/* MOBILE MENU BUTTON */}
          <button
            type="button"
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileMenuOpen}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="flex h-11 w-11 items-center justify-center rounded-md border border-slate-200 text-[#071B49] transition hover:bg-slate-50 md:hidden"
          >
            {mobileMenuOpen ? (
              <span className="text-2xl leading-none">×</span>
            ) : (
              <span className="text-2xl leading-none">☰</span>
            )}
          </button>

        </div>

        {/* MOBILE NAVIGATION */}
        {mobileMenuOpen && (
          <nav className="border-t border-slate-200 pt-4 md:hidden">
            <div className="flex flex-col">

              <Link
                href="/"
                onClick={closeMobileMenu}
                className="border-b border-slate-100 py-3.5 text-sm font-medium text-[#071B49]"
              >
                Home
              </Link>

              <Link
                href="/articles"
                onClick={closeMobileMenu}
                className="border-b border-slate-100 py-3.5 text-sm font-medium text-[#071B49]"
              >
                Knowledge
              </Link>

              <Link
                href="/cases"
                onClick={closeMobileMenu}
                className="border-b border-slate-100 py-3.5 text-sm font-medium text-[#071B49]"
              >
                Legal Cases
              </Link>

              {/* MOBILE CURA INSIGHTS */}
              <div className="border-b border-slate-100">

                <button
                  type="button"
                  onClick={() => {
                    setInsightsOpen(!insightsOpen)
                    setServicesOpen(false)
                    setEducationOpen(false)
                  }}
                  aria-expanded={insightsOpen}
                  className="flex w-full items-center justify-between py-3.5 text-left text-sm font-medium text-[#071B49]"
                >
                  <span>Cura Insights</span>

                  <svg
                    className={`h-4 w-4 transition-transform ${
                      insightsOpen ? "rotate-180" : ""
                    }`}
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25-4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01-1.08 1.04l-4.25-4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>

                {insightsOpen && (
                  <div className="pb-3 pl-4">

                    <Link
                      href="/insights/global-economy"
                      onClick={closeMobileMenu}
                      className="block py-2.5 text-sm text-slate-600 hover:text-[#168BC4]"
                    >
                      Global Economy
                    </Link>

                    <Link
                      href="/insights/global-financial-information"
                      onClick={closeMobileMenu}
                      className="block py-2.5 text-sm text-slate-600 hover:text-[#168BC4]"
                    >
                      Global Financial Information
                    </Link>

                    <Link
                      href="/insights/maldives-economy"
                      onClick={closeMobileMenu}
                      className="block py-2.5 text-sm text-slate-600 hover:text-[#168BC4]"
                    >
                      Maldives Economy
                    </Link>

                    <Link
                      href="/insights/exchange-rates"
                      onClick={closeMobileMenu}
                      className="block py-2.5 text-sm text-slate-600 hover:text-[#168BC4]"
                    >
                      Exchange Rates
                    </Link>

                  </div>
                )}

              </div>

              {/* MOBILE SERVICES */}
              <div className="border-b border-slate-100">

                <button
                  type="button"
                  onClick={() => {
                    setServicesOpen(!servicesOpen)
                    setEducationOpen(false)
                    setInsightsOpen(false)
                  }}
                  aria-expanded={servicesOpen}
                  className="flex w-full items-center justify-between py-3.5 text-left text-sm font-medium text-[#071B49]"
                >
                  <span>Services</span>

                  <svg
                    className={`h-4 w-4 transition-transform ${
                      servicesOpen ? "rotate-180" : ""
                    }`}
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25-4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>

                {servicesOpen && (
                  <div className="pb-3 pl-4">

                    <Link
                      href="/audit"
                      onClick={closeMobileMenu}
                      className="block py-2.5 text-sm text-slate-600 hover:text-[#168BC4]"
                    >
                      Audit
                    </Link>

                    <Link
                      href="/advisory"
                      onClick={closeMobileMenu}
                      className="block py-2.5 text-sm text-slate-600 hover:text-[#168BC4]"
                    >
                      Advisory
                    </Link>

                    <Link
                      href="/tax"
                      onClick={closeMobileMenu}
                      className="block py-2.5 text-sm text-slate-600 hover:text-[#168BC4]"
                    >
                      Tax
                    </Link>

                    <Link
                      href="/legal"
                      onClick={closeMobileMenu}
                      className="block py-2.5 text-sm font-medium text-[#D71920] hover:text-[#B8141A]"
                    >
                      Legal
                    </Link>

                  </div>
                )}

              </div>

              {/* MOBILE EDUCATION */}
              <div className="border-b border-slate-100">

                <button
                  type="button"
                  onClick={() => {
                    setEducationOpen(!educationOpen)
                    setServicesOpen(false)
                    setInsightsOpen(false)
                  }}
                  aria-expanded={educationOpen}
                  className="flex w-full items-center justify-between py-3.5 text-left text-sm font-medium text-[#071B49]"
                >
                  <span>Education</span>

                  <svg
                    className={`h-4 w-4 transition-transform ${
                      educationOpen ? "rotate-180" : ""
                    }`}
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25-4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01-.02-1.06z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>

                {educationOpen && (
                  <div className="pb-3 pl-4">

                    <Link
                      href="/education/materials"
                      onClick={closeMobileMenu}
                      className="block py-2.5 text-sm text-slate-600 hover:text-[#168BC4]"
                    >
                      Educational Materials
                    </Link>

                    <Link
                      href="/education/test"
                      onClick={closeMobileMenu}
                      className="block py-2.5 text-sm text-slate-600 hover:text-[#168BC4]"
                    >
                      Test Your Knowledge
                    </Link>

                    <Link
                      href="/articles"
                      onClick={closeMobileMenu}
                      className="block py-2.5 text-sm text-slate-600 hover:text-[#168BC4]"
                    >
                      Technical Articles
                    </Link>

                    <Link
                      href="/education/leaderboard"
                      onClick={closeMobileMenu}
                      className="block py-2.5 text-sm text-slate-600 hover:text-[#168BC4]"
                    >
                      Leaderboard
                    </Link>

                  </div>
                )}

              </div>

              <Link
                href="/careers"
                onClick={closeMobileMenu}
                className="border-b border-slate-100 py-3.5 text-sm font-medium text-[#071B49]"
              >
                Careers
              </Link>

              <Link
                href="/team"
                onClick={closeMobileMenu}
                className="border-b border-slate-100 py-3.5 text-sm font-medium text-[#071B49]"
              >
                Our Team
              </Link>

              <Link
                href="/#contact"
                onClick={closeMobileMenu}
                className="mt-4 rounded-md bg-[#071B49] px-5 py-3 text-center text-sm font-semibold !text-white transition hover:bg-[#0B2A69]"
              >
                Contact
              </Link>

            </div>
          </nav>
        )}

      </div>
    </header>
  )
}