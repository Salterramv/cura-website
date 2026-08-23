"use client"

import Link from "next/link"
import CuraHeader from "@/components/CuraHeader"
import CuraFooter from "@/components/CuraFooter"
import { accountingTopics } from "./data/accountingTopics"

export default function AccountingMaterialsPage() {
  return (
    <main className="min-h-screen bg-[#F5F8FC] text-[#071B49]">
      <CuraHeader />
      <section className="bg-[#071B49] text-white">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8 lg:py-20">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#35B5E5]">CURA Education</p>
          <h1 className="mt-5 max-w-4xl text-4xl font-semibold tracking-tight md:text-6xl">Accounting & Financial Reporting</h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">
            Source-based learning materials built from the accounting slides and study documents supplied for CURA. Topics are organised for reading, practice and active learning rather than as downloadable notes.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-14 lg:px-8 lg:py-20">
        <div className="max-w-3xl">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#168BC4]">Educational Materials</p>
          <h2 className="mt-3 text-3xl font-semibold md:text-4xl">Accounting</h2>
          <p className="mt-4 leading-7 text-slate-600">
            Each topic opens into an interactive lesson. Expand sections, work through examples and complete the source-based knowledge check at the end.
          </p>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {accountingTopics.map((topic, index) => (
            <Link
              key={topic.slug}
              href={`/education/materials/accounting/${topic.slug}`}
              className="group rounded-2xl border border-slate-200 bg-white p-7 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-[#168BC4]/40 hover:shadow-xl"
            >
              <div className="flex items-start justify-between gap-4">
                <span className="text-xs font-bold tracking-[0.2em] text-[#168BC4]">{String(index + 1).padStart(2, "0")}</span>
                <span className="rounded-full bg-[#F1F7FB] px-3 py-1 text-[11px] font-semibold text-[#168BC4]">{topic.standard}</span>
              </div>
              <h2 className="mt-7 text-xl font-semibold leading-7 group-hover:text-[#168BC4]">{topic.title}</h2>
              <p className="mt-3 text-sm leading-6 text-slate-600">
                Interactive lesson with {topic.blocks.length} study sections and {topic.quiz.length} knowledge checks.
              </p>
              <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-5 text-sm font-semibold">
                <span>Study material</span>
                <span className="text-[#168BC4]">Open →</span>
              </div>
            </Link>
          ))}
        </div>
      </section>
      <CuraFooter />
    </main>
  )
}