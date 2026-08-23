"use client"

import Link from "next/link"
import { useParams } from "next/navigation"
import { useMemo, useState } from "react"
import CuraHeader from "@/components/CuraHeader"
import CuraFooter from "@/components/CuraFooter"
import { accountingTopics } from "../data/accountingTopics"

function shuffle<T>(items: T[]) {
  const copy = [...items]
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[copy[i], copy[j]] = [copy[j], copy[i]]
  }
  return copy
}

type QuizQuestion = {
  id: string
  question: string
  options: string[]
  answer: number
  explanation: string
}

export default function AccountingTopicPage() {
  const params = useParams()
  const slug = String(params?.slug || "")
  const topic = accountingTopics.find((item) => item.slug === slug)

  const [answers, setAnswers] = useState<Record<string, number>>({})
  const [submitted, setSubmitted] = useState(false)

  const quizQuestions = useMemo<QuizQuestion[]>(() => {
    if (!topic) return []

    return topic.quiz.map((question) => {
      const mapped = question.options.map((text, index) => ({
        text,
        correct: index === question.answer,
      }))

      const shuffled = shuffle(mapped)

      return {
        ...question,
        options: shuffled.map((item) => item.text),
        answer: shuffled.findIndex((item) => item.correct),
      }
    })
  }, [topic])

  const score = quizQuestions.reduce(
    (total, question) =>
      total + (answers[question.id] === question.answer ? 1 : 0),
    0
  )

  const unanswered = quizQuestions.length - Object.keys(answers).length

  if (!topic) {
    return (
      <main className="min-h-screen bg-[#F5F8FC] text-[#071B49]">
        <CuraHeader />
        <section className="mx-auto max-w-4xl px-6 py-24 text-center">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#168BC4]">
            CURA Education
          </p>
          <h1 className="mt-4 text-4xl font-semibold">Topic not found</h1>
          <p className="mt-4 text-slate-600">
            This accounting topic is not currently available.
          </p>
          <Link
            href="/education/materials/accounting"
            className="mt-8 inline-flex rounded-md bg-[#071B49] px-6 py-3 text-sm font-semibold text-white"
          >
            Back to Accounting
          </Link>
        </section>
        <CuraFooter />
      </main>
    )
  }

  const resetQuiz = () => {
    setAnswers({})
    setSubmitted(false)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <main className="min-h-screen bg-[#F5F8FC] text-[#071B49]">
      <CuraHeader />

      <section className="bg-[#071B49]">
        <div className="mx-auto max-w-6xl px-6 py-16 lg:px-8 lg:py-20">
          <Link
            href="/education/materials/accounting"
            className="text-sm text-[#8FD8F2] transition hover:text-white"
          >
            ← Accounting Educational Materials
          </Link>

          <div className="mt-10 flex flex-wrap gap-3">
            <span className="rounded-full bg-[#168BC4] px-4 py-2 text-xs font-bold uppercase tracking-wider text-white">
              CURA Education
            </span>
            <span className="rounded-full border border-white/20 px-4 py-2 text-xs font-semibold text-slate-200">
              {topic.standard}
            </span>
          </div>

          <h1 className="mt-6 max-w-5xl text-4xl font-semibold tracking-tight text-white md:text-6xl">
            {topic.title}
          </h1>

          <p className="mt-6 max-w-4xl text-lg leading-8 text-slate-300">
            {topic.description}
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-12 lg:px-8 lg:py-16">
        <div className="grid gap-5 md:grid-cols-2">
          {topic.keyPoints.map((point, index) => (
            <div
              key={point}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
            >
              <div className="flex gap-4">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#EAF6FC] text-xs font-bold text-[#168BC4]">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <p className="text-sm leading-7 text-slate-700">{point}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="border-y border-[#DCE5EF] bg-white">
        <div className="mx-auto max-w-5xl px-6 py-14 lg:px-8 lg:py-20">
          <div className="space-y-7">
            {topic.sections.map((section, index) => (
              <article
                key={section.title}
                className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
              >
                <div className="border-b border-slate-100 bg-[#F8FAFD] px-6 py-5 md:px-8">
                  <div className="flex gap-4">
                    <span className="text-sm font-bold text-[#168BC4]">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <h2 className="text-xl font-semibold md:text-2xl">
                      {section.title}
                    </h2>
                  </div>
                </div>

                <div className="px-6 py-7 md:px-8">
                  <div className="space-y-5">
                    {section.paragraphs.map((paragraph) => (
                      <p
                        key={paragraph}
                        className="text-[15px] leading-8 text-slate-700"
                      >
                        {paragraph}
                      </p>
                    ))}
                  </div>

                  {section.bullets && (
                    <div className="mt-7 grid gap-3 sm:grid-cols-2">
                      {section.bullets.map((bullet) => (
                        <div
                          key={bullet}
                          className="rounded-xl bg-[#F5F8FC] p-4 text-sm leading-6 text-slate-700"
                        >
                          <span className="mr-2 text-[#168BC4]">•</span>
                          {bullet}
                        </div>
                      ))}
                    </div>
                  )}

                  {section.formula && (
                    <div className="mt-7 rounded-2xl border border-[#BFE6F5] bg-[#EAF6FC] p-5">
                      <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#168BC4]">
                        Formula
                      </p>
                      <p className="mt-3 overflow-x-auto font-mono text-sm font-semibold leading-7 text-[#071B49]">
                        {section.formula}
                      </p>
                    </div>
                  )}

                  {section.example && (
                    <div className="mt-7 rounded-2xl bg-[#071B49] p-6 text-white">
                      <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#35B5E5]">
                        Worked example
                      </p>
                      <h3 className="mt-2 text-lg font-semibold">
                        {section.example.title}
                      </h3>
                      <ol className="mt-5 space-y-3">
                        {section.example.steps.map((step, stepIndex) => (
                          <li key={step} className="flex gap-3 text-sm leading-7 text-slate-300">
                            <span className="font-bold text-[#35B5E5]">
                              {stepIndex + 1}.
                            </span>
                            <span>{step}</span>
                          </li>
                        ))}
                      </ol>
                    </div>
                  )}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#F5F8FC]">
        <div className="mx-auto max-w-5xl px-6 py-16 lg:px-8 lg:py-20">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#168BC4]">
            Topic quiz
          </p>
          <h2 className="mt-3 text-3xl font-semibold md:text-4xl">
            Test your knowledge
          </h2>
          <p className="mt-4 max-w-3xl leading-7 text-slate-600">
            Select one answer for each question. Submit only after completing
            the quiz. Your result will show your answer, the correct answer
            and an explanation.
          </p>

          {!submitted ? (
            <div className="mt-10 space-y-6">
              {quizQuestions.map((question, questionIndex) => (
                <article
                  key={question.id}
                  className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:p-8"
                >
                  <div className="flex gap-4">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#071B49] text-xs font-bold text-white">
                      {questionIndex + 1}
                    </span>
                    <h3 className="pt-1 text-lg font-semibold leading-7">
                      {question.question}
                    </h3>
                  </div>

                  <div className="mt-7 grid gap-3">
                    {question.options.map((option, optionIndex) => {
                      const selected =
                        answers[question.id] === optionIndex

                      return (
                        <button
                          key={option}
                          type="button"
                          onClick={() =>
                            setAnswers((current) => ({
                              ...current,
                              [question.id]: optionIndex,
                            }))
                          }
                          className={`flex w-full items-start gap-4 rounded-xl border p-4 text-left transition ${
                            selected
                              ? "border-[#168BC4] bg-[#EAF6FC]"
                              : "border-slate-200 hover:border-[#168BC4]/50"
                          }`}
                        >
                          <span
                            className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-bold ${
                              selected
                                ? "bg-[#168BC4] text-white"
                                : "bg-slate-100 text-slate-600"
                            }`}
                          >
                            {String.fromCharCode(65 + optionIndex)}
                          </span>
                          <span className="pt-1 text-sm leading-6 text-slate-700">
                            {option}
                          </span>
                        </button>
                      )
                    })}
                  </div>
                </article>
              ))}

              {unanswered > 0 && (
                <p className="text-center text-sm text-slate-500">
                  {unanswered} question{unanswered === 1 ? "" : "s"} remaining.
                </p>
              )}

              <button
                type="button"
                disabled={unanswered > 0}
                onClick={() => setSubmitted(true)}
                className={`w-full rounded-md px-7 py-4 text-sm font-semibold transition ${
                  unanswered === 0
                    ? "bg-[#071B49] text-white hover:bg-[#0B2A69]"
                    : "cursor-not-allowed bg-slate-200 text-slate-400"
                }`}
              >
                Submit Quiz
              </button>
            </div>
          ) : (
            <div className="mt-10">
              <div className="rounded-3xl bg-[#071B49] p-8 text-white md:p-10">
                <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#35B5E5]">
                  Your result
                </p>
                <div className="mt-5 flex flex-wrap items-end gap-4">
                  <span className="text-5xl font-bold">
                    {score}/{quizQuestions.length}
                  </span>
                  <span className="pb-2 text-slate-300">
                    {Math.round((score / quizQuestions.length) * 100)}% correct
                  </span>
                </div>
              </div>

              <div className="mt-8 space-y-5">
                {quizQuestions.map((question, index) => {
                  const selected = answers[question.id]
                  const correct = selected === question.answer

                  return (
                    <article
                      key={question.id}
                      className={`overflow-hidden rounded-2xl border bg-white ${
                        correct
                          ? "border-emerald-200"
                          : "border-red-200"
                      }`}
                    >
                      <div
                        className={`px-6 py-5 ${
                          correct ? "bg-emerald-50" : "bg-red-50"
                        }`}
                      >
                        <p
                          className={`text-xs font-bold uppercase tracking-wider ${
                            correct
                              ? "text-emerald-700"
                              : "text-red-700"
                          }`}
                        >
                          {correct ? "Correct" : "Incorrect"}
                        </p>
                        <h3 className="mt-2 text-lg font-semibold leading-7">
                          {index + 1}. {question.question}
                        </h3>
                      </div>

                      <div className="space-y-4 p-6">
                        <div
                          className={`rounded-xl border p-4 ${
                            correct
                              ? "border-emerald-200 bg-emerald-50"
                              : "border-red-200 bg-red-50"
                          }`}
                        >
                          <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
                            Your answer
                          </p>
                          <p className="mt-2 text-sm font-semibold">
                            {String.fromCharCode(65 + selected)}.{" "}
                            {question.options[selected]}
                          </p>
                        </div>

                        {!correct && (
                          <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4">
                            <p className="text-xs font-bold uppercase tracking-wider text-emerald-700">
                              Correct answer
                            </p>
                            <p className="mt-2 text-sm font-semibold">
                              {String.fromCharCode(65 + question.answer)}.{" "}
                              {question.options[question.answer]}
                            </p>
                          </div>
                        )}

                        <div className="rounded-xl bg-[#F5F8FC] p-5">
                          <p className="text-xs font-bold uppercase tracking-wider text-[#168BC4]">
                            Why
                          </p>
                          <p className="mt-2 text-sm leading-7 text-slate-700">
                            {question.explanation}
                          </p>
                        </div>
                      </div>
                    </article>
                  )
                })}
              </div>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <button
                  type="button"
                  onClick={resetQuiz}
                  className="rounded-md bg-[#071B49] px-7 py-3 text-sm font-semibold text-white hover:bg-[#0B2A69]"
                >
                  Retake Quiz
                </button>

                <Link
                  href="/education/materials/accounting"
                  className="rounded-md border border-[#071B49] bg-white px-7 py-3 text-center text-sm font-semibold text-[#071B49]"
                >
                  Back to Accounting
                </Link>
              </div>
            </div>
          )}
        </div>
      </section>

      <CuraFooter />
    </main>
  )
}
