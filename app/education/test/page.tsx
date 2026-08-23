"use client"

import { useCallback, useEffect, useMemo, useState } from "react"
import Link from "next/link"
import CuraHeader from "@/components/CuraHeader"
import CuraFooter from "@/components/CuraFooter"
import { createClient } from "@/lib/supabase/client"

type Quiz = {
  id: string
  title: string
  description: string
  category: string
  time_limit_seconds: number
}

type Question = {
  id: string
  quiz_id: string
  question_text: string
  options: string[]
  points: number
  sort_order: number
}

type ReviewItem = {
  question_id: string
  question: string
  your_answer: string | null
  correct_answer: string
  reason: string
  source_url: string | null
}

type Result = {
  attempt_id: string
  score: number
  total_points: number
  percentage: number
  duration_seconds: number
  review: ReviewItem[]
}

type TestSession = {
  session_id: string
  quiz_id: string
  participant_name: string
  started_at: string
  expires_at: string
  time_limit_seconds: number
}

function formatTime(seconds: number) {
  const safeSeconds = Math.max(0, seconds)
  const minutes = Math.floor(safeSeconds / 60)
  const remainingSeconds = safeSeconds % 60

  return `${String(minutes).padStart(2, "0")}:${String(
    remainingSeconds,
  ).padStart(2, "0")}`
}

function formatDuration(seconds: number) {
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = seconds % 60

  if (minutes === 0) {
    return `${remainingSeconds}s`
  }

  return `${minutes}m ${String(remainingSeconds).padStart(2, "0")}s`
}

export default function EducationTestPage() {
  const supabase = createClient()

  const [quiz, setQuiz] = useState<Quiz | null>(null)
  const [questions, setQuestions] = useState<Question[]>([])
  const [name, setName] = useState("")
  const [session, setSession] = useState<TestSession | null>(null)

  const [answers, setAnswers] = useState<Record<string, number>>({})
  const [timeRemaining, setTimeRemaining] = useState(0)

  const [result, setResult] = useState<Result | null>(null)

  const [loading, setLoading] = useState(true)
  const [starting, setStarting] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState("")

  const answeredCount = useMemo(
    () => Object.keys(answers).length,
    [answers],
  )

  const loadQuiz = useCallback(async () => {
    setLoading(true)
    setError("")

    const { data: quizData, error: quizError } = await supabase
      .from("education_quizzes")
      .select(
        "id,title,description,category,time_limit_seconds",
      )
      .eq("is_published", true)
      .order("created_at", {
        ascending: true,
      })
      .limit(1)
      .maybeSingle()

    if (quizError) {
      console.error(quizError)
      setError("Unable to load the test.")
      setLoading(false)
      return
    }

    if (!quizData) {
      setError("There are currently no tests available.")
      setLoading(false)
      return
    }

    const { data: questionData, error: questionError } =
      await supabase
        .from("education_quiz_questions")
        .select(
          "id,quiz_id,question_text,options,points,sort_order",
        )
        .eq("quiz_id", quizData.id)
        .order("sort_order", {
          ascending: true,
        })

    if (questionError) {
      console.error(questionError)
      setError("Unable to load the test questions.")
      setLoading(false)
      return
    }

    setQuiz(quizData)
    setQuestions(
      (questionData ?? []).map((question) => ({
        ...question,
        options: Array.isArray(question.options)
          ? question.options
          : [],
      })),
    )

    setLoading(false)
  }, [supabase])

  useEffect(() => {
    loadQuiz()
  }, [loadQuiz])

  const startTest = async () => {
    const participantName = name.trim()

    if (participantName.length < 2) {
      setError("Please enter your name before starting the test.")
      return
    }

    if (!quiz) return

    setStarting(true)
    setError("")

    const { data, error: startError } = await supabase.rpc(
      "start_education_test",
      {
        p_quiz_id: quiz.id,
        p_participant_name: participantName,
      },
    )

    if (startError) {
      console.error(startError)
      setError(
        startError.message || "Unable to start the test.",
      )
      setStarting(false)
      return
    }

    setSession(data as TestSession)
    setAnswers({})
    setResult(null)

    setTimeRemaining(
      Number(data.time_limit_seconds),
    )

    setStarting(false)
  }

  const submitTest = useCallback(async () => {
    if (!session || !quiz || submitting || result) {
      return
    }

    setSubmitting(true)
    setError("")

    const answerPayload = questions.map((question) => ({
      question_id: question.id,
      selected_option:
        answers[question.id] ?? null,
    }))

    const elapsedSeconds = Math.max(
      0,
      Math.floor(
        (Date.now() -
          new Date(session.started_at).getTime()) /
          1000,
      ),
    )

    const { data, error: submitError } =
      await supabase.rpc("submit_education_attempt", {
        p_quiz_id: quiz.id,
        p_participant_name: session.participant_name,
        p_answers: answerPayload,
        p_duration_seconds: elapsedSeconds,
        p_session_id: session.session_id,
      })

    if (submitError) {
      console.error(submitError)
      setError(
        submitError.message ||
          "Unable to submit your test.",
      )
      setSubmitting(false)
      return
    }

    setResult(data as Result)
    setSubmitting(false)
    setSession(null)
  }, [
    session,
    quiz,
    submitting,
    result,
    questions,
    answers,
    supabase,
  ])

  useEffect(() => {
    if (!session || result) return

    const interval = window.setInterval(() => {
      const remaining = Math.max(
        0,
        Math.ceil(
          (new Date(session.expires_at).getTime() -
            Date.now()) /
            1000,
        ),
      )

      setTimeRemaining(remaining)

      if (remaining <= 0) {
        window.clearInterval(interval)
        submitTest()
      }
    }, 250)

    return () => {
      window.clearInterval(interval)
    }
  }, [session, result, submitTest])

  const setAnswer = (
    questionId: string,
    optionIndex: number,
  ) => {
    if (submitting) return

    setAnswers((current) => ({
      ...current,
      [questionId]: optionIndex,
    }))
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-[#F5F8FC] text-[#071B49]">
        <CuraHeader />

        <section className="mx-auto max-w-7xl px-6 py-24 text-center lg:px-8">
          <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-[#168BC4]" />

          <p className="mt-5 text-sm text-slate-500">
            Loading test...
          </p>
        </section>

        <CuraFooter />
      </main>
    )
  }

  if (result) {
    return (
      <main className="min-h-screen bg-[#F5F8FC] text-[#071B49]">
        <CuraHeader />

        <section className="bg-[#071B49]">
          <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#35B5E5]">
              Test Complete
            </p>

            <h1 className="mt-5 text-4xl font-semibold text-white md:text-6xl">
              Your Result
            </h1>

            <p className="mt-5 text-lg text-slate-300">
              Well done, {name || "participant"}.
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-5xl px-6 py-12 lg:px-8 lg:py-20">
          <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm md:p-12">
            <div className="grid gap-6 text-center sm:grid-cols-3">
              <div>
                <p className="text-sm text-slate-500">
                  Score
                </p>

                <p className="mt-2 text-4xl font-bold text-[#071B49]">
                  {result.score}/{result.total_points}
                </p>
              </div>

              <div>
                <p className="text-sm text-slate-500">
                  Percentage
                </p>

                <p className="mt-2 text-4xl font-bold text-[#168BC4]">
                  {result.percentage}%
                </p>
              </div>

              <div>
                <p className="text-sm text-slate-500">
                  Time
                </p>

                <p className="mt-2 text-4xl font-bold text-[#071B49]">
                  {formatDuration(
                    result.duration_seconds,
                  )}
                </p>
              </div>
            </div>

            <div className="mt-10 border-t border-slate-200 pt-8">
              <h2 className="text-2xl font-semibold">
                Review your answers
              </h2>

              {result.review.length === 0 ? (
                <div className="mt-6 rounded-xl border border-emerald-200 bg-emerald-50 p-6">
                  <p className="font-semibold text-emerald-800">
                    Perfect score!
                  </p>

                  <p className="mt-2 text-sm text-emerald-700">
                    You answered every question
                    correctly.
                  </p>
                </div>
              ) : (
                <div className="mt-6 space-y-6">
                  {result.review.map((item, index) => (
                    <div
                      key={item.question_id}
                      className="rounded-xl border border-red-200 bg-red-50 p-6"
                    >
                      <p className="text-xs font-bold uppercase tracking-[0.2em] text-red-600">
                        Question {index + 1} · Incorrect
                      </p>

                      <h3 className="mt-3 font-semibold leading-7 text-[#071B49]">
                        {item.question}
                      </h3>

                      <div className="mt-5 grid gap-4 md:grid-cols-2">
                        <div className="rounded-lg bg-white p-4">
                          <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                            Your answer
                          </p>

                          <p className="mt-2 font-medium text-red-600">
                            {item.your_answer ??
                              "Not answered"}
                          </p>
                        </div>

                        <div className="rounded-lg bg-white p-4">
                          <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                            Correct answer
                          </p>

                          <p className="mt-2 font-medium text-emerald-700">
                            {item.correct_answer}
                          </p>
                        </div>
                      </div>

                      {item.reason && (
                        <div className="mt-5 rounded-lg bg-white p-5">
                          <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                            Why?
                          </p>

                          <p className="mt-2 leading-7 text-slate-700">
                            {item.reason}
                          </p>

                          {item.source_url && (
                            <a
                              href={item.source_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="mt-4 inline-block text-sm font-semibold text-[#168BC4] hover:underline"
                            >
                              View source →
                            </a>
                          )}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="mt-10 flex flex-col gap-3 border-t border-slate-200 pt-8 sm:flex-row">
              <Link
                href="/education/leaderboard"
                className="rounded-md bg-[#071B49] px-6 py-3 text-center text-sm font-semibold text-white hover:bg-[#0B285E]"
              >
                View Leaderboard
              </Link>

              <button
                type="button"
                onClick={() => {
                  setResult(null)
                  setSession(null)
                  setAnswers({})
                  setName("")
                  loadQuiz()
                }}
                className="rounded-md border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-[#071B49] hover:bg-slate-50"
              >
                Take Another Test
              </button>
            </div>
          </div>
        </section>

        <CuraFooter />
      </main>
    )
  }

  if (!session) {
    return (
      <main className="min-h-screen bg-[#F5F8FC] text-[#071B49]">
        <CuraHeader />

        <section className="bg-[#071B49]">
          <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#35B5E5]">
              CURA Education
            </p>

            <h1 className="mt-5 text-4xl font-semibold text-white md:text-6xl">
              Test Your Knowledge
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
              Challenge yourself with practical questions based
              on Maldives taxation and CURA learning materials.
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-3xl px-6 py-12 lg:px-8 lg:py-20">
          {quiz && (
            <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm md:p-12">
              <span className="rounded-full bg-[#E7F4FA] px-3 py-1 text-xs font-bold uppercase tracking-wider text-[#0876A8]">
                {quiz.category}
              </span>

              <h2 className="mt-6 text-3xl font-semibold">
                {quiz.title}
              </h2>

              <p className="mt-4 leading-7 text-slate-600">
                {quiz.description}
              </p>

              <div className="mt-8 grid gap-4 sm:grid-cols-3">
                <div className="rounded-xl bg-[#F5F8FC] p-5">
                  <p className="text-xs uppercase tracking-wider text-slate-400">
                    Questions
                  </p>

                  <p className="mt-2 text-2xl font-semibold">
                    {questions.length}
                  </p>
                </div>

                <div className="rounded-xl bg-[#F5F8FC] p-5">
                  <p className="text-xs uppercase tracking-wider text-slate-400">
                    Time limit
                  </p>

                  <p className="mt-2 text-2xl font-semibold">
                    {Math.floor(
                      quiz.time_limit_seconds / 60,
                    )}{" "}
                    min
                  </p>
                </div>

                <div className="rounded-xl bg-[#F5F8FC] p-5">
                  <p className="text-xs uppercase tracking-wider text-slate-400">
                    Format
                  </p>

                  <p className="mt-2 text-2xl font-semibold">
                    MCQ
                  </p>
                </div>
              </div>

              <div className="mt-10 border-t border-slate-200 pt-8">
                <label
                  htmlFor="participant-name"
                  className="block text-sm font-semibold"
                >
                  Enter your name
                </label>

                <p className="mt-2 text-sm text-slate-500">
                  Your name will appear on the CURA
                  leaderboard.
                </p>

                <input
                  id="participant-name"
                  type="text"
                  value={name}
                  onChange={(event) =>
                    setName(event.target.value)
                  }
                  maxLength={80}
                  placeholder="Your name"
                  className="mt-4 w-full rounded-xl border border-slate-300 bg-white px-5 py-4 text-sm outline-none focus:border-[#168BC4] focus:ring-2 focus:ring-[#168BC4]/20"
                />

                {error && (
                  <p className="mt-3 text-sm font-medium text-red-600">
                    {error}
                  </p>
                )}

                <button
                  type="button"
                  onClick={startTest}
                  disabled={starting || questions.length === 0}
                  className="mt-6 w-full rounded-xl bg-[#071B49] px-6 py-4 text-sm font-semibold text-white transition hover:bg-[#0B285E] disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {starting
                    ? "Starting..."
                    : "Start Test →"}
                </button>

                <p className="mt-4 text-center text-xs text-slate-400">
                  The timer begins when you start the test.
                </p>
              </div>
            </div>
          )}

          {!quiz && !error && (
            <div className="rounded-xl border border-slate-200 bg-white p-8 text-center">
              No test is currently available.
            </div>
          )}

          {error && !quiz && (
            <div className="rounded-xl border border-red-200 bg-red-50 p-8 text-center">
              <p className="font-medium text-red-700">
                {error}
              </p>
            </div>
          )}
        </section>

        <CuraFooter />
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-[#F5F8FC] text-[#071B49]">
      <CuraHeader />

      <section className="sticky top-0 z-40 border-b border-white/10 bg-[#071B49] shadow-lg">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-4 lg:px-8">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#35B5E5]">
              {quiz?.category}
            </p>

            <p className="mt-1 text-sm font-semibold text-white">
              {session.participant_name}
            </p>
          </div>

          <div
            className={`rounded-xl px-5 py-3 text-center ${
              timeRemaining <= 60
                ? "bg-red-600 text-white"
                : "bg-white/10 text-white"
            }`}
          >
            <p className="text-[10px] font-bold uppercase tracking-wider opacity-70">
              Time remaining
            </p>

            <p className="mt-1 text-2xl font-bold tabular-nums">
              {formatTime(timeRemaining)}
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-6 py-10 lg:px-8 lg:py-16">
        <div className="mb-8 rounded-xl border border-slate-200 bg-white p-5">
          <div className="flex items-center justify-between text-sm">
            <span className="font-medium">
              Progress
            </span>

            <span className="text-slate-500">
              {answeredCount} / {questions.length} answered
            </span>
          </div>

          <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-200">
            <div
              className="h-full rounded-full bg-[#168BC4] transition-all"
              style={{
                width: `${
                  questions.length
                    ? (answeredCount /
                        questions.length) *
                      100
                    : 0
                }%`,
              }}
            />
          </div>
        </div>

        <div className="space-y-6">
          {questions.map((question, index) => (
            <article
              key={question.id}
              className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm md:p-9"
            >
              <div className="flex items-start justify-between gap-4">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#168BC4]">
                  Question {index + 1}
                </p>

                <span className="text-xs text-slate-400">
                  {question.points}{" "}
                  {question.points === 1
                    ? "mark"
                    : "marks"}
                </span>
              </div>

              <h2 className="mt-4 text-xl font-semibold leading-8 text-[#071B49]">
                {question.question_text}
              </h2>

              <div className="mt-6 space-y-3">
                {question.options.map(
                  (option, optionIndex) => {
                    const selected =
                      answers[question.id] ===
                      optionIndex

                    return (
                      <button
                        key={optionIndex}
                        type="button"
                        onClick={() =>
                          setAnswer(
                            question.id,
                            optionIndex,
                          )
                        }
                        className={`flex w-full items-start gap-4 rounded-xl border p-4 text-left transition ${
                          selected
                            ? "border-[#168BC4] bg-[#E7F4FA]"
                            : "border-slate-200 bg-white hover:border-[#168BC4]/50 hover:bg-slate-50"
                        }`}
                      >
                        <span
                          className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
                            selected
                              ? "bg-[#168BC4] text-white"
                              : "bg-slate-100 text-slate-500"
                          }`}
                        >
                          {String.fromCharCode(
                            65 + optionIndex,
                          )}
                        </span>

                        <span className="pt-1 text-sm leading-6">
                          {option}
                        </span>
                      </button>
                    )
                  },
                )}
              </div>
            </article>
          ))}
        </div>

        {error && (
          <div className="mt-6 rounded-xl border border-red-200 bg-red-50 p-5 text-sm font-medium text-red-700">
            {error}
          </div>
        )}

        <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="font-semibold">
                Ready to submit?
              </p>

              <p className="mt-1 text-sm text-slate-500">
                Unanswered questions will be marked
                incorrect.
              </p>
            </div>

            <button
              type="button"
              onClick={submitTest}
              disabled={submitting}
              className="rounded-xl bg-[#D71920] px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-[#B9151B] disabled:cursor-not-allowed disabled:opacity-50"
            >
              {submitting
                ? "Submitting..."
                : "Submit Test"}
            </button>
          </div>
        </div>
      </section>

      <CuraFooter />
    </main>
  )
}