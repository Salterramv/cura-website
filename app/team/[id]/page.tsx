"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useParams } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import CuraHeader from "@/components/CuraHeader"
import CuraFooter from "@/components/CuraFooter"

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

export default function TeamMemberProfilePage() {
  const params = useParams()
  const id = params.id as string

  const supabase = createClient()

  const [member, setMember] = useState<TeamMember | null>(null)
  const [experience, setExperience] = useState<Experience[]>([])
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

        const {
          data: experienceData,
          error: experienceError,
        } = await supabase
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
          })

        if (experienceError) {
          console.error(
            "Unable to load professional experience:",
            experienceError,
          )
        }

        setMember(memberData as TeamMember)
        setExperience((experienceData ?? []) as Experience[])
      } catch (err) {
        console.error("Unable to load team member:", err)
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

  function getExperiencePeriod(item: Experience) {
    const start = formatDate(item.start_date)
    const end = item.end_date
      ? formatDate(item.end_date)
      : "Present"

    if (!start && !end) {
      return ""
    }

    return start ? `${start} – ${end}` : end
  }

  if (loading) {
    return (
      <>
        <CuraHeader />

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

        <CuraFooter />
      </>
    )
  }

  if (error || !member) {
    return (
      <>
        <CuraHeader />

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
                className="mt-6 inline-flex rounded-full bg-[#071B49] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#0B2A69]"
              >
                ← Back to Our Team
              </Link>
            </div>
          </div>
        </main>

        <CuraFooter />
      </>
    )
  }

  return (
    <>
      <CuraHeader />

      <main className="min-h-screen bg-[#F5F8FC] text-[#071B49]">
        {/* PROFILE HEADER */}
        <section className="bg-white">
          <div className="mx-auto max-w-6xl px-6 py-14 md:py-16">
            <Link
              href="/team"
              className="inline-flex items-center text-sm font-semibold text-[#071B49] transition hover:text-[#1B5DBF]"
            >
              ← Back to Our Team
            </Link>

            <div className="mt-10 grid gap-10 md:grid-cols-[280px_minmax(0,1fr)] md:items-center">
              {/* PROFILE PHOTO */}
              <div className="aspect-square overflow-hidden rounded-2xl border border-slate-200 bg-slate-100 shadow-sm">
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

              {/* PROFILE DETAILS */}
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#1B5DBF]">
                  {member.position}
                </p>

                <h1 className="mt-3 text-4xl font-semibold tracking-tight text-[#071B49] md:text-5xl">
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

        {/* PROFESSIONAL PROFILE */}
        {member.professional_bio && (
          <section className="border-t border-slate-200 bg-[#F5F8FC]">
            <div className="mx-auto max-w-5xl px-6 py-16 md:py-20">
              <h2 className="text-3xl font-semibold tracking-tight text-[#071B49] md:text-4xl">
                Professional Profile
              </h2>

              <div className="mt-7 max-w-4xl whitespace-pre-line text-base leading-8 text-slate-600 md:text-lg md:leading-9">
                {member.professional_bio}
              </div>
            </div>
          </section>
        )}

        {/* PROFESSIONAL EXPERIENCE */}
        {experience.length > 0 && (
          <section className="bg-white">
            <div className="mx-auto max-w-5xl px-6 py-16 md:py-20">
              <h2 className="text-3xl font-semibold tracking-tight text-[#071B49] md:text-4xl">
                Professional Experience
              </h2>

              <div className="mt-10 space-y-10">
                {experience.map((item) => (
                  <article
                    key={item.id}
                    className="relative border-l-2 border-[#18b8ee] pl-7"
                  >
                    <div className="absolute -left-[7px] top-1.5 h-3 w-3 rounded-full bg-[#18b8ee]" />

                    <h3 className="text-xl font-semibold text-[#071B49] md:text-2xl">
                      {item.position}
                    </h3>

                    <p className="mt-1 text-base font-semibold text-[#1B5DBF]">
                      {item.employer}
                    </p>

                    {getExperiencePeriod(item) && (
                      <p className="mt-2 text-sm font-medium text-slate-500">
                        {getExperiencePeriod(item)}
                      </p>
                    )}

                    {item.description && (
                      <p className="mt-4 max-w-3xl whitespace-pre-line text-base leading-7 text-slate-600">
                        {item.description}
                      </p>
                    )}
                  </article>
                ))}
              </div>
            </div>
          </section>
        )}

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

      <CuraFooter />
    </>
  )
}