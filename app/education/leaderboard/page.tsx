"use client"

import { useEffect, useState } from "react"
import CuraHeader from "@/components/CuraHeader"
import CuraFooter from "@/components/CuraFooter"
import { createClient } from "@/lib/supabase/client"

type LeaderboardEntry = {
  id: string
  quiz_id: string
  quiz_title: string
  participant_name: string
  score: number
  total_points: number
  percentage: number
  duration_seconds: number
  created_at: string
}

function formatDuration(seconds: number) {
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = seconds % 60

  return `${minutes}:${String(remainingSeconds).padStart(
    2,
    "0",
  )}`
}

export default function EducationLeaderboardPage() {
  const supabase = createClient()

  const [entries, setEntries] = useState<
    LeaderboardEntry[]
  >([])
  const [quizFilter, setQuizFilter] =
    useState("all")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadLeaderboard() {
      setLoading(true)

      const { data, error } = await supabase
        .from("education_leaderboard")
        .select(
          "id,quiz_id,quiz_title,participant_name,score,total_points,percentage,duration_seconds,created_at",
        )
        .order("percentage", {
          ascending: false,
        })
        .order("duration_seconds", {
          ascending: true,
        })
        .order("created_at", {
          ascending: true,
        })
        .limit(100)

      if (error) {
        console.error(error)
        setEntries([])
      } else {
        setEntries(
          (data ?? []) as LeaderboardEntry[],
        )
      }

      setLoading(false)
    }

    loadLeaderboard()
  }, [supabase])

  const quizzes = Array.from(
    new Map(
      entries.map((entry) => [
        entry.quiz_id,
        entry.quiz_title,
      ]),
    ).entries(),
  )

  const filteredEntries =
    quizFilter === "all"
      ? entries
      : entries.filter(
          (entry) =>
            entry.quiz_id === quizFilter,
        )

  return (
    <main className="min-h-screen bg-[#F5F8FC] text-[#071B49]">
      <CuraHeader />

      <section className="bg-[#071B49]">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#35B5E5]">
            CURA Education
          </p>

          <h1 className="mt-5 text-4xl font-semibold tracking-tight text-white md:text-6xl">
            Leaderboard
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
            See the highest scores achieved by CURA
            learners.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-12 lg:px-8 lg:py-20">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#168BC4]">
                Rankings
              </p>

              <h2 className="mt-2 text-2xl font-semibold">
                Top performers
              </h2>
            </div>

            {quizzes.length > 0 && (
              <div>
                <label
                  htmlFor="quiz-filter"
                  className="block text-xs font-semibold text-slate-500"
                >
                  Test
                </label>

                <select
                  id="quiz-filter"
                  value={quizFilter}
                  onChange={(event) =>
                    setQuizFilter(
                      event.target.value,
                    )
                  }
                  className="mt-2 rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm outline-none focus:border-[#168BC4]"
                >
                  <option value="all">
                    All tests
                  </option>

                  {quizzes.map(
                    ([id, title]) => (
                      <option
                        key={id}
                        value={id}
                      >
                        {title}
                      </option>
                    ),
                  )}
                </select>
              </div>
            )}
          </div>

          {loading ? (
            <div className="py-20 text-center">
              <div className="mx-auto h-9 w-9 animate-spin rounded-full border-4 border-slate-200 border-t-[#168BC4]" />

              <p className="mt-4 text-sm text-slate-500">
                Loading leaderboard...
              </p>
            </div>
          ) : filteredEntries.length === 0 ? (
            <div className="mt-8 rounded-xl border border-dashed border-slate-300 bg-[#F5F8FC] px-6 py-16 text-center">
              <h3 className="font-semibold">
                No scores yet
              </h3>

              <p className="mt-2 text-sm text-slate-500">
                Be the first person to take the test.
              </p>
            </div>
          ) : (
            <div className="mt-8 overflow-x-auto">
              <table className="w-full min-w-[700px] text-left">
                <thead>
                  <tr className="border-b border-slate-200 text-xs uppercase tracking-wider text-slate-400">
                    <th className="px-4 py-4">
                      Rank
                    </th>

                    <th className="px-4 py-4">
                      Participant
                    </th>

                    <th className="px-4 py-4">
                      Test
                    </th>

                    <th className="px-4 py-4 text-right">
                      Score
                    </th>

                    <th className="px-4 py-4 text-right">
                      Percentage
                    </th>

                    <th className="px-4 py-4 text-right">
                      Time
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {filteredEntries.map(
                    (entry, index) => (
                      <tr
                        key={entry.id}
                        className="border-b border-slate-100 last:border-0"
                      >
                        <td className="px-4 py-5">
                          {index === 0 ? (
                            <span className="text-xl">
                              🥇
                            </span>
                          ) : index === 1 ? (
                            <span className="text-xl">
                              🥈
                            </span>
                          ) : index === 2 ? (
                            <span className="text-xl">
                              🥉
                            </span>
                          ) : (
                            <span className="font-semibold text-slate-500">
                              {index + 1}
                            </span>
                          )}
                        </td>

                        <td className="px-4 py-5 font-semibold">
                          {entry.participant_name}
                        </td>

                        <td className="max-w-[240px] px-4 py-5 text-sm text-slate-500">
                          {entry.quiz_title}
                        </td>

                        <td className="px-4 py-5 text-right font-semibold">
                          {entry.score}/
                          {entry.total_points}
                        </td>

                        <td className="px-4 py-5 text-right font-semibold text-[#168BC4]">
                          {entry.percentage}%
                        </td>

                        <td className="px-4 py-5 text-right text-sm text-slate-500">
                          {formatDuration(
                            entry.duration_seconds,
                          )}
                        </td>
                      </tr>
                    ),
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </section>

      <CuraFooter />
    </main>
  )
}