"use client"

import Link from "next/link"

export default function CuraHeader() {
  return (
    <header className="bg-white border-b border-[#dce5ef]">
      <div className="mx-auto max-w-7xl px-6 py-5 md:px-10 lg:px-12">
        <div className="flex items-center justify-between gap-8">

          {/* CURA LOGO */}
          <Link href="/" className="shrink-0">
            <img
              src="/cura-logo.png"
              alt="CURA"
              className="h-16 w-auto object-contain"
            />
          </Link>

          {/* NAVIGATION */}
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
              href="/#education"
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
              className="text-[#071B49] transition hover:text-[#18b8ee]"
            >
              Contact
            </Link>


          </nav>
        </div>
      </div>
    </header>
  )
}