"use client"

import { useState } from "react"
import Link from "next/link"

export default function CuraHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const closeMobileMenu = () => {
    setMobileMenuOpen(false)
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
              alt="CURA - Audit Tax Advisory"
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

            <Link
              href="/#updates"
              className="text-[#071B49] transition hover:text-[#18b8ee]"
            >
              Tax Updates
            </Link>

            <Link
              href="/education"
              className="text-[#071B49] transition hover:text-[#18b8ee]"
            >
              Education
            </Link>

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

              <Link
                href="/#updates"
                onClick={closeMobileMenu}
                className="border-b border-slate-100 py-3.5 text-sm font-medium text-[#071B49]"
              >
                Tax Updates
              </Link>

              <Link
                href="/education"
                onClick={closeMobileMenu}
                className="border-b border-slate-100 py-3.5 text-sm font-medium text-[#071B49]"
              >
                Education
              </Link>

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