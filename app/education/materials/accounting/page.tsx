"use client"

import Link from "next/link"
import CuraHeader from "@/components/CuraHeader"
import CuraFooter from "@/components/CuraFooter"
import { accountingTopics } from "./data/accountingTopics"

export default function AccountingMaterialsPage() {
  return (
    <main className="min-h-screen bg-[#F5F8FC] text-[#071B49]">
      <CuraHeader />

      <section className="bg-[#071B49]">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8 lg:py-24">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#35B5E5]">CURA Education</p>
          <h1 className="mt-5 max-w-5xl text-4xl font-semibold tracking-tight text-white md:text-6xl">Accounting & Financial Reporting</h1>
          <p className="mt-6 max-w-4xl text-lg leading-8 text-slate-300">
            A source-based interactive accounting library built from the supplied teaching slides, supplementary materials and practice documents.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            {['IAS / IFRS', 'Interactive lessons', 'Worked calculations', 'Practice material', 'Source-reconciled'].map((item) => (
              <span key={item} className="rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm text-slate-200">{item}</span>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-14 lg:px-8 lg:py-20">
        <div className="max-w-4xl">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#168BC4]">Educational Materials</p>
          <h2 className="mt-3 text-3xl font-semibold md:text-4xl">Accounting</h2>
          <p className="mt-4 leading-7 text-slate-600">
            Select a topic to study. Every topic is presented inside CURA rather than as a downloadable slide deck. Supplementary material such as the Additional Notes has been integrated into the relevant consolidation topics instead of appearing as a separate topic.
          </p>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {accountingTopics.map((topic) => (
            <Link key={topic.slug} href={`/education/materials/accounting/${topic.slug}`} className="group rounded-2xl border border-slate-200 bg-white p-7 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-[#168BC4]/40 hover:shadow-xl">
              <div className="flex items-start justify-between gap-4">
                <span className="text-xs font-bold tracking-[0.2em] text-[#168BC4]">{String(topic.chapter).padStart(2, '0')}</span>
                <span className="rounded-full bg-[#F1F7FB] px-3 py-1 text-[11px] font-semibold text-[#168BC4]">{topic.sections.length} sections</span>
              </div>
              <h3 className="mt-5 text-xl font-semibold leading-7 group-hover:text-[#168BC4]">{topic.title}</h3>
              <p className="mt-3 text-sm leading-6 text-slate-600">Complete source-based learning material presented through searchable, expandable sections.</p>
              <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-5 text-sm font-semibold">
                <span>{topic.practiceDocuments.length} practice files</span>
                <span className="text-[#168BC4]">Study →</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <CuraFooter />
    </main>
  )
}