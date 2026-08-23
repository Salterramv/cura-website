"use client"

import Link from "next/link"
import { useParams } from "next/navigation"
import { useMemo, useState } from "react"
import { accountingTopics } from "../data/accountingTopics"

export default function AccountingTopicPage() {
  const params = useParams<{ slug: string }>()
  const topic = accountingTopics.find((item) => item.slug === params.slug)
  const [open, setOpen] = useState<number | null>(0)
  const [answers, setAnswers] = useState<Record<number, number>>({})
  const [submitted, setSubmitted] = useState(false)

  const score = useMemo(() => {
    if (!topic) return 0
    return topic.quiz.reduce(
      (total, question, index) => total + (answers[index] === question.answer ? 1 : 0),
      0,
    )
  }, [answers, topic])

  if (!topic) {
    return (
      <main className="min-h-screen bg-[#F5F8FC] px-6 py-24 text-[#071B49]">
        <div className="mx-auto max-w-3xl rounded-2xl border border-slate-200 bg-white p-10 shadow-sm">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#168BC4]">CURA Education</p>
          <h1 className="mt-3 text-3xl font-semibold">Material not found</h1>
          <Link href="/education/materials/accounting" className="mt-6 inline-block font-semibold text-[#168BC4]">
            ← Back to Accounting
          </Link>
        </div>
      </main>
    )
  }

  const answered = Object.keys(answers).length
  const progress = topic.blocks.length ? Math.round(((open ?? 0) + 1) / topic.blocks.length * 100) : 0

  return (
    <main className="min-h-screen bg-[#F5F8FC] text-[#071B49]">
      <header className="bg-[#071B49] text-white">
        <div className="mx-auto max-w-6xl px-6 py-14 lg:px-8 lg:py-20">
          <Link href="/education/materials/accounting" className="text-sm font-semibold text-[#35B5E5]">
            ← Accounting
          </Link>
          <p className="mt-8 text-xs font-bold uppercase tracking-[0.3em] text-[#35B5E5]">CURA Education</p>
          <div className="mt-4 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <div>
              <h1 className="max-w-4xl text-4xl font-semibold tracking-tight md:text-6xl">{topic.title}</h1>
              <p className="mt-4 text-lg text-slate-300">{topic.standard}</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-sm text-slate-200">
              <div className="font-semibold text-white">Interactive study material</div>
              <div className="mt-1">{topic.blocks.length} learning sections · {topic.quiz.length} knowledge checks</div>
            </div>
          </div>
        </div>
      </header>

      <section className="mx-auto max-w-6xl px-6 py-10 lg:px-8">
        <div className="grid gap-5 lg:grid-cols-[1fr_300px]">
          <div>
            <div className="mb-6 rounded-2xl border border-[#168BC4]/15 bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between gap-4 text-sm font-semibold">
                <span>Study path</span>
                <span className="text-[#168BC4]">{progress}%</span>
              </div>
              <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-100">
                <div className="h-full rounded-full bg-[#168BC4] transition-all" style={{ width: `${progress}%` }} />
              </div>
              <p className="mt-3 text-sm leading-6 text-slate-600">
                Work through the source-derived sections at your own pace. Examples, calculations and explanations are presented as expandable study cards.
              </p>
            </div>

            <div className="space-y-3">
              {topic.blocks.map((block, index) => {
                const isOpen = open === index
                return (
                  <article key={`${block.title}-${index}`} className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                    <button
                      type="button"
                      onClick={() => setOpen(isOpen ? null : index)}
                      className="flex w-full items-center justify-between gap-5 px-6 py-5 text-left"
                    >
                      <div className="flex min-w-0 items-start gap-4">
                        <span className="mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#F1F7FB] text-xs font-bold text-[#168BC4]">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <h2 className="text-lg font-semibold leading-7 text-[#071B49]">{block.title}</h2>
                      </div>
                      <span className="shrink-0 text-2xl font-light text-[#168BC4]">{isOpen ? "−" : "+"}</span>
                    </button>

                    {isOpen && (
                      <div className="border-t border-slate-100 px-6 pb-7 pt-5">
                        <div className="space-y-3">
                          {block.items.map((item, itemIndex) => (
                            <div key={itemIndex} className="rounded-xl bg-[#F7FAFD] px-4 py-3 text-[15px] leading-7 text-slate-700">
                              {item}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </article>
                )
              })}
            </div>
          </div>

          <aside className="lg:sticky lg:top-6 lg:h-fit">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#168BC4]">Quick navigation</p>
              <div className="mt-4 max-h-[55vh] space-y-1 overflow-auto pr-1">
                {topic.blocks.map((block, index) => (
                  <button
                    key={`${block.title}-nav-${index}`}
                    type="button"
                    onClick={() => {
                      setOpen(index)
                      window.scrollTo({ top: Math.max(0, 250 + index * 90), behavior: "smooth" })
                    }}
                    className={`w-full rounded-lg px-3 py-2 text-left text-sm transition ${open === index ? "bg-[#F1F7FB] font-semibold text-[#168BC4]" : "text-slate-600 hover:bg-slate-50"}`}
                  >
                    {block.title}
                  </button>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </section>

      {topic.practice.length > 0 && (
        <section className="mx-auto max-w-6xl px-6 pb-12 lg:px-8">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-10">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#168BC4]">Practice material</p>
            <h2 className="mt-2 text-3xl font-semibold">Work through the supplied questions</h2>
            <p className="mt-3 max-w-3xl leading-7 text-slate-600">These practice questions and solutions come from the supplied study material. Open the solution only after attempting the question.</p>
            <div className="mt-7 space-y-3">
              {topic.practice.map((practice, index) => (
                <details key={index} className="group rounded-2xl border border-slate-200 bg-[#F7FAFD] p-5">
                  <summary className="cursor-pointer list-none font-semibold">
                    <span className="mr-3 text-[#168BC4]">{String(index + 1).padStart(2, "0")}</span>
                    Practice question
                    <span className="float-right text-[#168BC4] group-open:rotate-45 transition">+</span>
                  </summary>
                  <div className="mt-5 space-y-4 text-sm leading-7 text-slate-700">
                    <div className="rounded-xl bg-white p-4 whitespace-pre-wrap">{practice.question}</div>
                    {practice.answer && (
                      <details className="rounded-xl border border-[#168BC4]/20 bg-white p-4">
                        <summary className="cursor-pointer font-semibold text-[#168BC4]">Reveal solution</summary>
                        <div className="mt-4 whitespace-pre-wrap text-slate-700">{practice.answer}</div>
                      </details>
                    )}
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="mx-auto max-w-6xl px-6 pb-24 lg:px-8">
        <div className="rounded-3xl bg-[#071B49] p-6 text-white md:p-10">
          <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#35B5E5]">Knowledge check</p>
              <h2 className="mt-2 text-3xl font-semibold">Test what you have studied</h2>
              <p className="mt-3 max-w-2xl leading-7 text-slate-300">
                These checks are built only from statements contained in the supplied study material. Submit when you are ready to see correct and incorrect answers.
              </p>
            </div>
            {submitted && (
              <div className="rounded-2xl border border-white/10 bg-white/10 px-5 py-4 text-center">
                <div className="text-3xl font-semibold">{score}/{topic.quiz.length}</div>
                <div className="text-sm text-slate-300">Score</div>
              </div>
            )}
          </div>

          <div className="mt-8 space-y-5">
            {topic.quiz.map((question, index) => {
              const selected = answers[index]
              const correct = selected === question.answer
              return (
                <div key={index} className="rounded-2xl bg-white p-5 text-[#071B49] md:p-6">
                  <div className="text-xs font-bold uppercase tracking-[0.18em] text-[#168BC4]">Question {index + 1}</div>
                  <h3 className="mt-2 text-lg font-semibold leading-7">{question.question}</h3>
                  <div className="mt-4 space-y-2">
                    {question.options.map((option, optionIndex) => {
                      const isSelected = selected === optionIndex
                      const isCorrect = submitted && optionIndex === question.answer
                      const isWrong = submitted && isSelected && !correct
                      return (
                        <label
                          key={optionIndex}
                          className={`flex cursor-pointer gap-3 rounded-xl border p-4 text-sm leading-6 transition ${
                            isCorrect ? "border-emerald-400 bg-emerald-50" : isWrong ? "border-red-300 bg-red-50" : isSelected ? "border-[#168BC4] bg-[#F1F7FB]" : "border-slate-200 hover:border-[#168BC4]/50"
                          }`}
                        >
                          <input
                            type="radio"
                            name={`question-${index}`}
                            checked={isSelected}
                            disabled={submitted}
                            onChange={() => setAnswers((current) => ({ ...current, [index]: optionIndex }))}
                            className="mt-1"
                          />
                          <span>{option}</span>
                        </label>
                      )
                    })}
                  </div>
                  {submitted && (
                    <div className={`mt-4 rounded-xl px-4 py-3 text-sm leading-6 ${correct ? "bg-emerald-50 text-emerald-800" : "bg-red-50 text-red-800"}`}>
                      {correct ? "Correct." : `Incorrect. The correct answer is option ${question.answer + 1}.`}
                    </div>
                  )}
                </div>
              )
            })}
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <button
              type="button"
              disabled={answered < topic.quiz.length}
              onClick={() => setSubmitted(true)}
              className="rounded-xl bg-white px-5 py-3 text-sm font-bold text-[#071B49] disabled:cursor-not-allowed disabled:opacity-40"
            >
              Submit quiz
            </button>
            {submitted && (
              <button
                type="button"
                onClick={() => {
                  setSubmitted(false)
                  setAnswers({})
                }}
                className="rounded-xl border border-white/20 px-5 py-3 text-sm font-semibold text-white"
              >
                Try again
              </button>
            )}
          </div>
        </div>
      </section>
    </main>
  )
}