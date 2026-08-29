"use client"

import Link from "next/link"
import CuraHeader from "@/components/CuraHeader"
import CuraFooter from "@/components/CuraFooter"

const materials = [
  {
    title: "Taxation",
    description:
      "Study materials covering Maldives taxation, GST, Income Tax, tax administration and related topics.",
    href: "#taxation",
  },
  {
    title: "Accounting",
    description:
      "Practical accounting and financial reporting learning materials.",
    href: "/education/materials/accounting",
  },
  {
    title: "Audit",
    description:
      "Learning resources covering auditing concepts, procedures and professional practice.",
    href: "#audit",
  },
  {
    title: "Law",
    description:
      "Selected legal and regulatory materials relevant to taxation and professional practice.",
    href: "#law",
  },
]

export default function EducationMaterialsPage() {
  return (
    <main className="min-h-screen bg-[#F5F8FC] text-[#071B49]">
      <CuraHeader />

      <section className="bg-[#071B49]">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#35B5E5]">
            CURA Education
          </p>

          <h1 className="mt-5 text-4xl font-semibold tracking-tight text-white md:text-6xl">
            Educational Materials
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
            Practical study materials designed to help you understand
            taxation, accounting, audit and law.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16 lg:px-8 lg:py-24">
        <div className="grid gap-6 md:grid-cols-2">
          {materials.map((material) => (
            <a
              key={material.title}
              href={material.href}
              className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
            >
              <h2 className="text-2xl font-semibold text-[#168BC4]">
                {material.title}
              </h2>

              <p className="mt-4 leading-7 text-slate-600">
                {material.description}
              </p>

              <span className="mt-6 inline-block text-sm font-semibold text-[#071B49]">
                Explore materials →
              </span>
            </a>
          ))}
        </div>
      </section>

      <CuraFooter />
    </main>
  )
}