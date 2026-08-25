"use client"

import Link from "next/link"
import { useEffect, useMemo, useState } from "react"
import { useParams } from "next/navigation"

import { createClient } from "@/lib/supabase/client"
import CuraHeader from "@/components/CuraHeader"
import CuraFooter from "@/components/CuraFooter"
import { accountingSourceTopics } from "../data/topics"

type Quiz = {
  id: string
  title: string
  description: string | null
  time_limit_seconds: number
}

type Question = {
  id: string
  question_text: string
  options: unknown
  correct_option: number
  explanation: string | null
  points: number
}

/*
 * Convert the original heading to the requested sidebar format.
 *
 * Example:
 *
 * REVENUE RECOGNITION
 *
 * becomes:
 *
 * Revenue recognition
 */
function sidebarLabel(text: string) {
  const value = text.trim()

  if (!value) {
    return ""
  }

  return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase()
}

/*
 * Turn source text into readable continuous web content.
 *
 * We deliberately do NOT:
 * - rewrite the text
 * - summarise it
 * - add outside accounting knowledge
 * - convert every line into a card
 *
 * The PowerPoint-derived source remains the authority.
 */
function renderSourceText(text: string) {
  const parts = text
    .split(/\n{2,}/)
    .map((part) => part.trim())
    .filter(Boolean)

  return parts.map((part, index) => {
    const lines = part
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean)

    /*
     * Detect simple numbered or bulleted source lists.
     *
     * These are presented as a clean CURA list rather than as
     * separate slide-like blocks.
     */
    const isList =
      lines.length > 1 &&
      lines.every((line) =>
        /^((\d+[\.\)]|[a-zA-Z][\.\)]|[-•●▪])\s+)/.test(line)
      )

    if (isList) {
      return (
        <ul
          key={index}
          className="space-y-3 pl-6 text-[16px] leading-8 text-slate-700"
        >
          {lines.map((line, lineIndex) => {
            const cleaned = line.replace(
              /^((\d+[\.\)]|[a-zA-Z][\.\)]|[-•●▪])\s+)/,
              ""
            )

            return (
              <li
                key={lineIndex}
                className="relative pl-2"
              >
                <span className="absolute -left-4 top-[0.75rem] h-1.5 w-1.5 rounded-full bg-[#35B5E5]" />
                {cleaned}
              </li>
            )
          })}
        </ul>
      )
    }

    /*
     * Preserve line breaks where the original source uses them.
     */
    return (
      <p
        key={index}
        className="whitespace-pre-line text-[16px] leading-8 text-slate-700"
      >
        {part}
      </p>
    )
  })
}

export default function AccountingTopicPage() {
  const params = useParams()

  const slug =
    typeof params.slug === "string"
      ? params.slug
      : Array.isArray(params.slug)
        ? params.slug[0]
        : ""

  const sourceTopic = useMemo(
    () =>
      accountingSourceTopics.find(
        (topic) => topic.slug === slug
      ),
    [slug]
  )

  const supabase = useMemo(
    () => createClient(),
    []
  )

  const [quiz, setQuiz] =
    useState<Quiz | null>(null)

  const [questions, setQuestions] =
    useState<Question[]>([])

  const [answers, setAnswers] =
    useState<Record<string, number>>({})

  const [submitted, setSubmitted] =
    useState(false)

  const [loadingQuiz, setLoadingQuiz] =
    useState(false)

  /*
   * -----------------------------------------------------------
   * LOAD QUIZ
   * -----------------------------------------------------------
   */

  useEffect(() => {
    if (!sourceTopic) {
      return
    }

    let active = true

    async function loadQuiz() {
      setLoadingQuiz(true)

      /*
       * First try the topic-specific quiz already stored
       * in Supabase.
       */
      const {
        data: quizData,
        error: quizError,
      } = await supabase
        .from("education_quizzes")
        .select(
          "id,title,description,time_limit_seconds"
        )
        .eq("category", "Accounting")
        .eq("is_published", true)
        .eq(
          "title",
          `${topic.title} — Topic Quiz`
        )
        .maybeSingle()

      if (!active) {
        return
      }

      if (quizError) {
        console.warn(
          "Quiz loading warning:",
          quizError.message
        )
      }

      const loadedQuiz = quizData
        ? (quizData as unknown as Quiz)
        : null

      setQuiz(loadedQuiz)

      /*
       * Load questions only when the quiz exists.
       */
      if (loadedQuiz) {
        const {
          data: questionData,
          error: questionError,
        } = await supabase
          .from("education_questions")
          .select(
            "id,question_text,options,correct_option,explanation,points"
          )
          .eq("quiz_id", loadedQuiz.id)
          .order("sort_order", {
            ascending: true,
          })

        if (!active) {
          return
        }

        if (questionError) {
          console.warn(
            "Question loading warning:",
            questionError.message
          )

          setQuestions([])
        } else {
          setQuestions(
            (questionData ?? []) as unknown as Question[]
          )
        }
      } else {
        setQuestions([])
      }

      setLoadingQuiz(false)
    }

    void loadQuiz()

    return () => {
      active = false
    }
  }, [sourceTopic, supabase])

  /*
   * -----------------------------------------------------------
   * TOPIC NOT FOUND
   * -----------------------------------------------------------
   */

  if (!sourceTopic) {
    return (
      <main className="min-h-screen bg-[#F5F8FC]">
        <CuraHeader />

        <section className="mx-auto max-w-4xl px-6 py-24 text-center">
          <div className="mx-auto max-w-xl">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#168BC4]">
              Accounting education
            </p>

            <h1 className="mt-4 text-3xl font-semibold text-[#071B49]">
              Topic unavailable
            </h1>

            <p className="mt-4 text-slate-500">
              The requested accounting topic could
              not be found.
            </p>

            <Link
              href="/education/materials/accounting"
              className="mt-8 inline-flex rounded-full bg-[#071B49] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#102A5F]"
            >
              Back to Accounting
            </Link>
          </div>
        </section>

        <CuraFooter />
      </main>
    )
  }

  const topic = sourceTopic

  /*
   * -----------------------------------------------------------
   * QUIZ SCORE
   * -----------------------------------------------------------
   */

  const totalPoints = questions.reduce(
    (sum, question) =>
      sum + (question.points || 1),
    0
  )

  const score = submitted
    ? questions.reduce(
        (sum, question) =>
          sum +
          (answers[question.id] ===
          question.correct_option
            ? question.points || 1
            : 0),
        0
      )
    : 0

  const answeredAll =
    questions.length > 0 &&
    questions.every(
      (question) =>
        answers[question.id] !== undefined
    )

  /*
   * -----------------------------------------------------------
   * PAGE
   * -----------------------------------------------------------
   */

  return (
    <main className="min-h-screen bg-[#F5F8FC] text-[#071B49]">
      <CuraHeader />

      {/* =======================================================
          HERO
          ======================================================= */}

      <section className="relative overflow-hidden bg-[#071B49] text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_85%_20%,rgba(53,181,229,0.18),transparent_32%),radial-gradient(circle_at_5%_90%,rgba(22,139,196,0.14),transparent_35%)]" />

        <div className="relative mx-auto max-w-7xl px-6 py-14 lg:px-8 lg:py-20">
          <Link
            href="/education/materials/accounting"
            className="inline-flex items-center text-sm font-semibold text-white transition hover:text-[#35B5E5]"
          >
            ← Accounting
          </Link>

          <p className="mt-8 text-xs font-bold uppercase tracking-[0.25em] text-[#35B5E5]">
            Chapter {topic.chapter}
          </p>

          <h1 className="mt-4 max-w-4xl text-4xl font-semibold tracking-tight md:text-6xl">
            {topic.title}
          </h1>

          <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">
            Study this topic through the original
            course material, presented in a continuous
            CURA learning experience.
          </p>
        </div>
      </section>

      {/* =======================================================
          MAIN LAYOUT
          ======================================================= */}

      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="relative lg:pr-[320px]">
          <article className="py-10 lg:py-14">

            {/* =================================================
                LEARNING CONTENT
                ================================================= */}

            <div className="space-y-16">
              {topic.sections.map(
                (section, index) => {
                  const id =
                    `section-${topic.chapter}-${index}`

                  return (
                    <section
                      key={id}
                      id={id}
                      className="scroll-mt-24"
                    >
                      {/* ---------------------------------------
                          SECTION HEADING
                          --------------------------------------- */}

                      <div className="border-b border-slate-200 pb-5">
                        <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#168BC4]">
                          Section {index + 1}
                        </p>

                        <h2 className="mt-2 text-2xl font-semibold leading-tight text-[#071B49] md:text-3xl">
                          {section.heading}
                        </h2>
                      </div>

                      {/* ---------------------------------------
                          SOURCE CONTENT

                          Continuous page content.
                          Not a slide.
                          --------------------------------------- */}

                      <div className="mt-7 space-y-5">
                        {section.content
                          ? renderSourceText(
                              section.content
                            )
                          : null}
                      </div>
                    </section>
                  )
                }
              )}
            </div>

            {/* =================================================
                QUIZ
                ================================================= */}

            <section
              id="topic-quiz"
              className="mt-24 scroll-mt-24 border-t border-slate-200 pt-14"
            >
              {/* Quiz introduction */}

              <div className="rounded-[30px] bg-[#071B49] p-8 text-white md:p-10">
                <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#35B5E5]">
                  Topic assessment
                </p>

                <h2 className="mt-3 text-3xl font-semibold md:text-4xl">
                  Test your knowledge
                </h2>

                <p className="mt-4 max-w-2xl text-[16px] leading-7 text-slate-300">
                  Answer the multiple-choice questions
                  based on this chapter's source
                  material.
                </p>

                {quiz &&
                  quiz.time_limit_seconds > 0 && (
                    <p className="mt-4 text-sm font-semibold text-slate-400">
                      Time limit:{" "}
                      {Math.ceil(
                        quiz.time_limit_seconds /
                          60
                      )}{" "}
                      minutes
                    </p>
                  )}
              </div>

              {/* Loading */}

              {loadingQuiz && (
                <div className="mt-8 rounded-3xl border border-slate-200 bg-white p-8">
                  <p className="text-slate-500">
                    Loading quiz…
                  </p>
                </div>
              )}

              {/* No questions */}

              {!loadingQuiz &&
                questions.length === 0 && (
                  <div className="mt-8 rounded-3xl border border-slate-200 bg-white p-8">
                    <p className="text-slate-500">
                      No quiz questions are currently
                      published for this topic.
                    </p>
                  </div>
                )}

              {/* Questions */}

              {!loadingQuiz &&
                questions.length > 0 && (
                  <div className="mt-8 space-y-6">

                    {/* Result */}

                    {submitted && (
                      <div className="rounded-3xl border border-[#35B5E5]/30 bg-white p-8 shadow-[0_8px_30px_rgba(7,27,73,0.04)]">
                        <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#168BC4]">
                          Your result
                        </p>

                        <p className="mt-2 text-5xl font-bold text-[#071B49]">
                          {score} / {totalPoints}
                        </p>

                        <p className="mt-2 text-sm text-slate-500">
                          {totalPoints > 0
                            ? `${Math.round(
                                (score /
                                  totalPoints) *
                                  100
                              )}%`
                            : "0%"}{" "}
                          correct
                        </p>
                      </div>
                    )}

                    {/* Individual questions */}

                    {questions.map(
                      (question, questionIndex) => {
                        const options =
                          Array.isArray(
                            question.options
                          )
                            ? question.options.map(
                                String
                              )
                            : []

                        return (
                          <div
                            key={question.id}
                            className="rounded-3xl border border-slate-200 bg-white p-7 shadow-[0_8px_30px_rgba(7,27,73,0.04)] md:p-8"
                          >
                            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#168BC4]">
                              Question{" "}
                              {questionIndex + 1}
                            </p>

                            <h3 className="mt-3 text-lg font-semibold leading-7 text-[#071B49]">
                              {
                                question.question_text
                              }
                            </h3>

                            <div className="mt-6 space-y-3">
                              {options.map(
                                (
                                  option,
                                  optionIndex
                                ) => {
                                  const selected =
                                    answers[
                                      question.id
                                    ] ===
                                    optionIndex

                                  const correct =
                                    submitted &&
                                    optionIndex ===
                                      question.correct_option

                                  const wrong =
                                    submitted &&
                                    selected &&
                                    optionIndex !==
                                      question.correct_option

                                  return (
                                    <label
                                      key={
                                        optionIndex
                                      }
                                      className={[
                                        "flex cursor-pointer gap-3 rounded-2xl border p-4 transition",
                                        correct
                                          ? "border-emerald-400 bg-emerald-50"
                                          : wrong
                                            ? "border-red-300 bg-red-50"
                                            : selected
                                              ? "border-[#168BC4] bg-[#F1F8FC]"
                                              : "border-slate-200 hover:border-[#168BC4]/50",
                                      ].join(
                                        " "
                                      )}
                                    >
                                      <input
                                        type="radio"
                                        name={`question-${question.id}`}
                                        checked={
                                          selected
                                        }
                                        disabled={
                                          submitted
                                        }
                                        onChange={() =>
                                          setAnswers(
                                            (
                                              current
                                            ) => ({
                                              ...current,
                                              [question.id]:
                                                optionIndex,
                                            })
                                          )
                                        }
                                        className="mt-1 accent-[#168BC4]"
                                      />

                                      <span className="text-sm leading-6 text-slate-700">
                                        {option}
                                      </span>
                                    </label>
                                  )
                                }
                              )}
                            </div>

                            {/* Explanation after submission */}

                            {submitted &&
                              question.explanation && (
                                <div className="mt-5 rounded-2xl border border-slate-100 bg-[#F5F8FC] p-5 text-sm leading-7 text-slate-600">
                                  <strong className="text-[#071B49]">
                                    Explanation:
                                  </strong>{" "}
                                  {
                                    question.explanation
                                  }
                                </div>
                              )}
                          </div>
                        )
                      }
                    )}

                    {/* Submit / retake */}

                    <div className="flex justify-end pt-2">
                      <button
                        type="button"
                        onClick={() => {
                          if (submitted) {
                            setAnswers({})
                            setSubmitted(false)
                          } else {
                            setSubmitted(true)
                          }
                        }}
                        disabled={
                          !submitted &&
                          !answeredAll
                        }
                        className="rounded-full bg-[#071B49] px-8 py-3.5 text-sm font-bold text-white transition hover:bg-[#102A5F] disabled:cursor-not-allowed disabled:opacity-40"
                      >
                        {submitted
                          ? "Retake quiz"
                          : "Submit quiz"}
                      </button>
                    </div>

                    {!submitted && !answeredAll && (
                      <p className="text-right text-xs text-slate-400">
                        Answer all questions before
                        submitting.
                      </p>
                    )}
                  </div>
                )}
            </section>
          </article>
        </div>
      </div>

      {/* =======================================================
          FIXED RIGHT-HAND PANEL
          ======================================================= */}

      <aside className="fixed right-6 top-28 bottom-6 z-30 hidden w-[270px] xl:block">
        <div className="flex h-full flex-col rounded-3xl border border-slate-200 bg-white p-5 shadow-[0_12px_40px_rgba(7,27,73,0.10)]">

          <div className="shrink-0">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#168BC4]">
              On this page
            </p>

            <div className="mt-3 h-px bg-slate-100" />
          </div>

          <nav className="mt-4 min-h-0 flex-1 overflow-y-auto pr-1">
            <ol className="space-y-1">
              {topic.sections.map(
                (section, index) => {
                  const id =
                    `section-${topic.chapter}-${index}`

                  return (
                    <li key={id}>
                      <a
                        href={`#${id}`}
                        className="block rounded-xl px-3 py-2 text-sm leading-5 text-slate-600 transition hover:bg-[#F1F7FB] hover:text-[#168BC4]"
                      >
                        {sidebarLabel(
                          section.heading
                        )}
                      </a>
                    </li>
                  )
                }
              )}

              {/* Quiz is always last */}

              <li className="mt-3 border-t border-slate-100 pt-3">
                <a
                  href="#topic-quiz"
                  className="block rounded-xl px-3 py-2 text-sm font-semibold leading-5 text-[#071B49] transition hover:bg-[#F1F7FB] hover:text-[#168BC4]"
                >
                  Quiz
                </a>
              </li>
            </ol>
          </nav>
        </div>
      </aside>

      {/* =======================================================
          MOBILE NAVIGATION
          ======================================================= */}

      <div className="sticky bottom-4 z-20 mx-4 mb-4 xl:hidden">
        <details className="rounded-2xl border border-slate-200 bg-white shadow-[0_10px_35px_rgba(7,27,73,0.12)]">
          <summary className="cursor-pointer list-none px-5 py-4 text-sm font-bold text-[#071B49]">
            On this page
          </summary>

          <nav className="max-h-[50vh] overflow-y-auto border-t border-slate-100 px-3 py-3">
            <ol className="space-y-1">
              {topic.sections.map(
                (section, index) => {
                  const id =
                    `section-${topic.chapter}-${index}`

                  return (
                    <li key={id}>
                      <a
                        href={`#${id}`}
                        className="block rounded-xl px-3 py-2 text-sm leading-5 text-slate-600 hover:bg-[#F1F7FB] hover:text-[#168BC4]"
                      >
                        {sidebarLabel(
                          section.heading
                        )}
                      </a>
                    </li>
                  )
                }
              )}

              <li className="border-t border-slate-100 pt-2">
                <a
                  href="#topic-quiz"
                  className="block rounded-xl px-3 py-2 text-sm font-semibold text-[#071B49]"
                >
                  Quiz
                </a>
              </li>
            </ol>
          </nav>
        </details>
      </div>

      <CuraFooter />
    </main>
  )
}