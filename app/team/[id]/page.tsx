"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useParams } from "next/navigation"
import { createClient } from "@/lib/supabase/client"

type TeamMember = {
  id: string
  name: string
  position: string
  qualifications: string | null
  short_bio: string | null
  professional_bio: string | null
  image_url: string | null
  linkedin_url: string | null
}

type Experience = {
  id: string
  employer: string
  position: string
  start_date: string | null
  end_date: string | null
  description: string | null
  display_order: number
}

type Qualification = {
  id: string
  qualification: string
  institution: string | null
  year: number | null
  description: string | null
  display_order: number
}

export default function TeamMemberProfilePage() {
  const params = useParams()
  const id = params.id as string

  const supabase = createClient()

  const [member, setMember] = useState<TeamMember | null>(null)
  const [experience, setExperience] = useState<Experience[]>([])
  const [qualifications, setQualifications] = useState<
    Qualification[]
  >([])

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    if (!id) return

    async function loadProfile() {
      setLoading(true)
      setError("")

      try {
        const { data: memberData, error: memberError } =
          await supabase
            .from("team_members")
            .select(
              "id, name, position, qualifications, short_bio, professional_bio, image_url, linkedin_url",
            )
            .eq("id", id)
            .eq("published", true)
            .single()

        if (memberError) {
          throw memberError
        }

        const [
          { data: experienceData, error: experienceError },
          {
            data: qualificationData,
            error: qualificationError,
          },
        ] = await Promise.all([
          supabase
            .from("team_member_experience")
            .select(
              "id, employer, position, start_date, end_date, description, display_order",
            )
            .eq("team_member_id", id)
            .order("display_order", {
              ascending: true,
            })
            .order("start_date", {
              ascending: false,
              nullsFirst: false,
            }),

          supabase
            .from("team_member_qualifications")
            .select(
              "id, qualification, institution, year, description, display_order",
            )
            .eq("team_member_id", id)
            .order("display_order", {
              ascending: true,
            })
            .order("year", {
              ascending: false,
              nullsFirst: false,
            }),
        ])

        if (experienceError) {
          console.error(
            "Unable to load experience:",
            experienceError,
          )
        }

        if (qualificationError) {
          console.error(
            "Unable to load qualifications:",
            qualificationError,
          )
        }

        setMember(memberData as TeamMember)
        setExperience((experienceData ?? []) as Experience[])
        setQualifications(
          (qualificationData ?? []) as Qualification[],
        )
      } catch (err) {
        console.error(err)
        setError("Unable to load this team member.")
      } finally {
        setLoading(false)
      }
    }

    loadProfile()
  }, [id, supabase])

  function formatDate(date: string | null) {
    if (!date) return ""

    const parsed = new Date(`${date}T00:00:00`)

    if (Number.isNaN(parsed.getTime())) {
      return date
    }

    return parsed.toLocaleDateString("en-US", {
      month: "short",
      year: "numeric",
    })
  }

  function experiencePeriod(item: Experience) {
    const start = formatDate(item.start_date)
    const end = item.end_date
      ? formatDate(item.end_date)
      : "Present"

    if (!start && !end) return null

    return `${start}${start ? " – " : ""}${end}`
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-[#F5F8FC] text-[#071B49]">
        <div className="mx-auto flex min-h-[60vh] max-w-6xl items-center justify-center px-6">
          <div className="text-center">
            <div className="mx-auto h-8 w-8 animate-spin rounded-full border-4 border-slate-200 border-t-[#1B5DBF]" />
            <p className="mt-4 text-sm text-slate-500">
              Loading profile...
            </p>
          </div>
        </div>
      </main>
    )
  }

  if (error || !member) {
    return (
      <main className="min-h-screen bg-[#F5F8FC] text-[#071B49]">
        <div className="mx-auto flex min-h-[60vh] max-w-6xl items-center justify-center px-6">
          <div className="text-center">
            <h1 className="text-2xl font-semibold">
              Profile unavailable
            </h1>

            <p className="mt-3 text-slate-500">
              This team member profile could not be found.
            </p>

            <Link
              href="/team"
              className="mt-6 inline-flex rounded-full bg-[#071B49] px-6 py-3 text-sm font-semibold text-white"
            >
              ← Back to Our Team
            </Link>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-[#F5F8FC] text-[#071B49]">
      {/* PROFILE HERO */}
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-6xl px-6 py-16 md:py-20">
          <Link
            href="/team"
            className="inline-flex items-center text-sm font-semibold text-slate-500 transition hover:text-[#1B5DBF]"
          >
            ← Back to Our Team
          </Link>

          <div className="mt-10 grid gap-10 md:grid-cols-[280px_1fr] md:items-center">
            {/* PHOTO */}
            <div className="aspect-square overflow-hidden rounded-2xl bg-slate-100 shadow-sm">
              {member.image_url ? (
                <img
                  src={member.image_url}
                  alt={member.name}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full items-center justify-center text-slate-300">
                  <span className="text-7xl">♙</span>
                </div>
              )}
            </div>

            {/* INTRODUCTION */}
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#1B5DBF]">
                {member.position}
              </p>

              <h1 className="mt-3 text-4xl font-semibold tracking-tight md:text-5xl">
                {member.name}
              </h1>

              {member.qualifications && (
                <p className="mt-4 text-lg font-medium text-slate-500">
                  {member.qualifications}
                </p>
              )}

              {member.short_bio && (
                <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-600">
                  {member.short_bio}
                </p>
              )}

              {member.linkedin_url && (
                <a
                  href={member.linkedin_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-7 inline-flex rounded-md bg-[#071B49] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#0B2A69]"
                >
                  LinkedIn →
                </a>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* PROFILE CONTENT */}
      <section className="mx-auto max-w-6xl px-6 py-16 md:py-20">
        <div className="grid gap-14 lg:grid-cols-[minmax(0,2fr)_minmax(280px,1fr)]">
          {/* MAIN */}
          <div>
            {member.professional_bio && (
              <section>
                <h2 className="text-3xl font-semibold tracking-tight">
                  About
                </h2>

                <div className="mt-6 whitespace-pre-line text-base leading-8 text-slate-600">
                  {member.professional_bio}
                </div>
              </section>
            )}

            {/* EXPERIENCE */}
            <section className="mt-14">
              <h2 className="text-3xl font-semibold tracking-tight">
                Professional Experience
              </h2>

              {experience.length === 0 ? (
                <p className="mt-6 text-slate-500">
                  Professional experience details will be available
                  soon.
                </p>
              ) : (
                <div className="mt-8 space-y-8">
                  {experience.map((item) => (
                    <article
                      key={item.id}
                      className="relative border-l-2 border-[#18b8ee] pl-6"
                    >
                      <div className="absolute -left-[7px] top-1 h-3 w-3 rounded-full bg-[#18b8ee]" />

                      <h3 className="text-xl font-semibold">
                        {item.position}
                      </h3>

                      <p className="mt-1 font-medium text-[#1B5DBF]">
                        {item.employer}
                      </p>

                      {experiencePeriod(item) && (
                        <p className="mt-1 text-sm text-slate-500">
                          {experiencePeriod(item)}
                        </p>
                      )}

                      {item.description && (
                        <p className="mt-4 whitespace-pre-line text-sm leading-7 text-slate-600">
                          {item.description}
                        </p>
                      )}
                    </article>
                  ))}
                </div>
              )}
            </section>
          </div>

          {/* SIDEBAR */}
          <aside>
            <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
              <h2 className="text-xl font-semibold">
                Qualifications
              </h2>

              {qualifications.length === 0 ? (
                member.qualifications ? (
                  <p className="mt-5 whitespace-pre-line text-sm leading-7 text-slate-600">
                    {member.qualifications}
                  </p>
                ) : (
                  <p className="mt-5 text-sm text-slate-500">
                    Qualification details will be available soon.
                  </p>
                )
              ) : (
                <div className="mt-6 space-y-6">
                  {qualifications.map((item) => (
                    <article key={item.id}>
                      <h3 className="font-semibold">
                        {item.qualification}
                      </h3>

                      {item.institution && (
                        <p className="mt-1 text-sm text-[#1B5DBF]">
                          {item.institution}
                        </p>
                      )}

                      {item.year && (
                        <p className="mt-1 text-sm text-slate-500">
                          {item.year}
                        </p>
                      )}

                      {item.description && (
                        <p className="mt-2 whitespace-pre-line text-sm leading-6 text-slate-600">
                          {item.description}
                        </p>
                      )}
                    </article>
                  ))}
                </div>
              )}
            </div>
          </aside>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#071B49]">
        <div className="mx-auto max-w-6xl px-6 py-20 text-center">
          <h2 className="text-3xl font-semibold text-white md:text-4xl">
            Let&apos;s work together.
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-slate-300">
            Whether you need audit, tax, advisory or legal support,
            our team is ready to help you find a practical way forward.
          </p>

          <Link
            href="/#contact"
            className="mt-8 inline-flex rounded-full bg-white px-7 py-3 text-sm font-semibold text-[#071B49] transition hover:bg-slate-100"
          >
            Get in touch
          </Link>
        </div>
      </section>
    </main>
  )
}