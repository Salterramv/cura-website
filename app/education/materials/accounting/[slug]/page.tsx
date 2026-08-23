"use client"

import Link from "next/link"
import { useParams } from "next/navigation"
import { useMemo, useState } from "react"
import CuraHeader from "@/components/CuraHeader"
import CuraFooter from "@/components/CuraFooter"
import { accountingTopics, type SourceDocument, type SourceSection } from "../data/accountingTopics"

function normalise(value: string) {
  return value.toLowerCase().replace(/\s+/g, " ").trim()
}

function isFormula(text: string) {
  return /(?:=|×|\*|÷|\-|\+|£|\$|%|PV|NPV|EPS|NCI|FV|OCI|ROCE|ROE)/i.test(text) && text.length < 320
}

function Section({ section, open, onToggle, search }: { section: SourceSection; open: boolean; onToggle: () => void; search: string }) {
  const visible = search
    ? section.content.filter((item) => normalise(item).includes(normalise(search)))
    : section.content

  if (search && !visible.length && !normalise(section.label).includes(normalise(search))) return null

  return (
    <article className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-center justify-between gap-5 bg-[#F8FAFD] px-5 py-5 text-left md:px-7"
        aria-expanded={open}
      >
        <div className="flex min-w-0 items-center gap-4">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#EAF6FC] text-xs font-bold text-[#168BC4]">
            {section.label.match(/\d+/)?.[0] ?? "•"}
          </span>
          <span className="truncate text-base font-semibold md:text-lg">{section.label}</span>
        </div>
        <span className="shrink-0 text-xl text-[#168BC4]">{open ? "−" : "+"}</span>
      </button>

      {open && (
        <div className="space-y-3 px-5 py-6 md:px-7">
          {visible.map((text, index) => (
            <div
              key={`${section.label}-${index}`}
              className={`rounded-xl p-4 text-[15px] leading-7 ${
                isFormula(text)
                  ? "border border-[#BFE6F5] bg-[#EAF6FC] font-medium text-[#071B49]"
                  : "bg-[#F8FAFD] text-slate-700"
              }`}
            >
              {isFormula(text) && <div className="mb-1 text-[10px] font-bold uppercase tracking-[0.2em] text-[#168BC4]">Calculation / key technical point</div>}
              {text}
            </div>
          ))}
        </div>
      )}
    </article>
  )
}

function DocumentBlock({ document }: { document: SourceDocument }) {
  const [open, setOpen] = useState(false)
  return (
    <article className="rounded-2xl border border-slate-200 bg-white">
      <button type="button" onClick={() => setOpen((v) => !v)} className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#168BC4]">{document.type}</p>
          <p className="mt-1 text-sm font-semibold text-[#071B49]">{document.path}</p>
        </div>
        <span className="text-xl text-[#168BC4]">{open ? "−" : "+"}</span>
      </button>
      {open && (
        <div className="border-t border-slate-100 p-4 md:p-6">
          <div className="space-y-3">
            {document.sections.map((section) => (
              <div key={`${document.path}-${section.label}`} className="rounded-xl bg-[#F8FAFD] p-4">
                <p className="text-xs font-bold uppercase tracking-[0.15em] text-[#168BC4]">{section.label}</p>
                <div className="mt-3 space-y-2">
                  {section.content.map((line, i) => <p key={i} className="text-sm leading-7 text-slate-700">{line}</p>)}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </article>
  )
}

export default function AccountingTopicPage() {
  const params = useParams()
  const slug = String(params?.slug || "")
  const topic = accountingTopics.find((item) => item.slug === slug)
  const [search, setSearch] = useState("")
  const [openAll, setOpenAll] = useState(false)
  const [practiceOpen, setPracticeOpen] = useState(false)

  const visibleCount = useMemo(() => {
    if (!topic) return 0
    if (!search) return topic.sections.length
    const q = normalise(search)
    return topic.sections.filter((s) => normalise(s.label).includes(q) || s.content.some((x) => normalise(x).includes(q))).length
  }, [topic, search])

  if (!topic) {
    return (
      <main className="min-h-screen bg-[#F5F8FC] text-[#071B49]"><CuraHeader /><section className="mx-auto max-w-4xl px-6 py-24 text-center"><p className="text-xs font-bold uppercase tracking-[0.3em] text-[#168BC4]">CURA Education</p><h1 className="mt-4 text-4xl font-semibold">Topic not found</h1><Link href="/education/materials/accounting" className="mt-8 inline-flex rounded-md bg-[#071B49] px-6 py-3 text-sm font-semibold text-white">Back to Accounting</Link></section><CuraFooter /></main>
    )
  }

  return (
    <main className="min-h-screen bg-[#F5F8FC] text-[#071B49]">
      <CuraHeader />

      <section className="bg-[#071B49]">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8 lg:py-20">
          <Link href="/education/materials/accounting" className="text-sm text-[#8FD8F2] hover:text-white">← Accounting Educational Materials</Link>
          <div className="mt-9 flex flex-wrap gap-3">
            <span className="rounded-full bg-[#168BC4] px-4 py-2 text-xs font-bold uppercase tracking-wider text-white">CURA Education</span>
            <span className="rounded-full border border-white/20 px-4 py-2 text-xs font-semibold text-slate-200">Chapter {topic.chapter}</span>
          </div>
          <h1 className="mt-6 max-w-5xl text-4xl font-semibold tracking-tight text-white md:text-6xl">{topic.title}</h1>
          <p className="mt-6 max-w-4xl text-lg leading-8 text-slate-300">This learning page preserves the complete source material supplied for this topic and presents it as an interactive web lesson rather than a downloadable slide deck.</p>
        </div>
      </section>

      <section className="sticky top-0 z-20 border-b border-[#DCE5EF] bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-6 py-4 md:flex-row md:items-center md:px-8">
          <div className="relative flex-1">
            <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search this topic…" className="w-full rounded-xl border border-slate-200 bg-[#F8FAFD] px-4 py-3 text-sm outline-none focus:border-[#168BC4]" />
          </div>
          <div className="flex gap-2">
            <button type="button" onClick={() => setOpenAll((v) => !v)} className="rounded-xl border border-slate-200 px-4 py-3 text-xs font-semibold text-[#071B49]">{openAll ? "Collapse all" : "Expand all"}</button>
            <span className="rounded-xl bg-[#EAF6FC] px-4 py-3 text-xs font-semibold text-[#168BC4]">{visibleCount} sections</span>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-12 lg:px-8 lg:py-16">
        <div className="grid gap-8 lg:grid-cols-[1fr_300px]">
          <div className="space-y-4">
            {topic.sections.map((section, index) => (
              <Section key={`${section.label}-${index}`} section={section} search={search} open={openAll || Boolean(search)} onToggle={() => setOpenAll(false)} />
            ))}
          </div>

          <aside className="h-fit space-y-4 lg:sticky lg:top-24">
            <div className="rounded-2xl bg-[#071B49] p-6 text-white">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#35B5E5]">Learning map</p>
              <p className="mt-3 text-3xl font-bold">{topic.sections.length}</p>
              <p className="mt-1 text-sm text-slate-300">source sections</p>
              <p className="mt-5 text-3xl font-bold">{topic.practiceDocuments.length}</p>
              <p className="mt-1 text-sm text-slate-300">practice source documents</p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white p-6">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#168BC4]">Source integrity</p>
              <p className="mt-3 text-sm leading-7 text-slate-600">The content is generated from the supplied source documents. The site restructures the material for reading and interaction but does not silently replace it with unrelated summaries.</p>
            </div>
          </aside>
        </div>
      </section>

      <section className="border-t border-[#DCE5EF] bg-white">
        <div className="mx-auto max-w-7xl px-6 py-14 lg:px-8">
          <button type="button" onClick={() => setPracticeOpen((v) => !v)} className="flex w-full items-center justify-between rounded-2xl bg-[#071B49] px-6 py-5 text-left text-white">
            <div><p className="text-xs font-bold uppercase tracking-[0.2em] text-[#35B5E5]">Practice material</p><p className="mt-1 text-xl font-semibold">Practice questions and answer material from the supplied files</p></div>
            <span className="text-2xl">{practiceOpen ? "−" : "+"}</span>
          </button>
          {practiceOpen && (
            <div className="mt-5 space-y-4">
              {topic.practiceDocuments.map((doc) => <DocumentBlock key={doc.path} document={doc} />)}
            </div>
          )}
        </div>
      </section>

      <section className="bg-[#F5F8FC]">
        <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 md:p-8">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#168BC4]">Complete source set</p>
            <h2 className="mt-2 text-2xl font-semibold">Documents used for this topic</h2>
            <div className="mt-5 flex flex-wrap gap-2">
              {topic.sourceDocuments.map((doc) => <span key={doc} className="rounded-full bg-[#F1F7FB] px-3 py-2 text-xs font-medium text-slate-700">{doc}</span>)}
            </div>
          </div>
        </div>
      </section>

      <CuraFooter />
    </main>
  )
}
