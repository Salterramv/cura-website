"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"

type TeamMember = {
  id: string
  name: string
  position: string
  qualifications: string | null
  short_bio: string | null
  bio: string | null
  photo_url: string | null
  linkedin_url: string | null
  display_order: number
}

export default function TeamPage() {
  const supabase = createClient()

  const [team, setTeam] = useState<TeamMember[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadTeam() {
      const { data, error } = await supabase
        .from("team_members")
        .select(
          "id, name, position, qualifications, short_bio, bio, photo_url, linkedin_url, display_order",
        )
        .eq("is_published", true)
        .order("display_order", { ascending: true })
        .order("created_at", { ascending: true })

      if (error) {
        console.error("Unable to load team:", error)
        setTeam([])
      } else {
        setTeam((data ?? []) as TeamMember[])
      }

      setLoading(false)
    }

    loadTeam()
  }, [])

  return (
    <main className="min-h-screen bg-[#F5F8FC] text-[#071B49]">
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="mx-auto max-w-6xl px-6 pb-20 pt-24 md:pb-28 md:pt-32">
          <div className="max-w-3xl">
            <p className="mb-5 text-sm font-semibold uppercase tracking-[0.25em] text-[#1B5DBF]">
              Our Team
            </p>

            <h1 className="text-5xl font-semibold tracking-tight md:text-6xl">
              The people behind
              <span className="block text-[#1B5DBF]">
                CURA.
              </span>
            </h1>

            <p className="mt-7 max-w-2xl text-lg leading-8 text-slate-600">
              At CURA, we combine technical expertise, practical
              experience and a commitment to doing things right. Our
              team works alongside clients to provide clear, reliable
              and commercially focused solutions.
            </p>
          </div>
        </div>
      </section>

      {/* TEAM */}
      <section className="mx-auto max-w-6xl px-6 pb-24">
        <div className="mb-12">
          <h2 className="text-3xl font-semibold tracking-tight">
            Meet our team
          </h2>

          <p className="mt-3 max-w-2xl text-slate-600">
            Experienced professionals committed to helping businesses
            understand their numbers, meet their obligations and make
            better decisions.
          </p>
        </div>

        {loading ? (
          <div className="py-16 text-center">
            <div className="mx-auto h-8 w-8 animate-spin rounded-full border-4 border-slate-200 border-t-[#1B5DBF]" />

            <p className="mt-4 text-sm text-slate-500">
              Loading our team...
            </p>
          </div>
        ) : team.length === 0 ? (
          <div className="rounded-2xl border border-slate-200 bg-white px-6 py-16 text-center shadow-sm">
            <h3 className="text-xl font-semibold">
              Our team profiles are coming soon.
            </h3>

            <p className="mt-2 text-slate-500">
              Please check back shortly.
            </p>
          </div>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {team.map((member) => (
              <article
                key={member.id}
                className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                {/* PHOTO */}
                <div className="aspect-[4/3] overflow-hidden bg-slate-100">
                  {member.photo_url ? (
                    <img
                      src={member.photo_url}
                      alt={member.name}
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center text-slate-300">
                      <span className="text-5xl">♙</span>
                    </div>
                  )}
                </div>

                {/* CONTENT */}
                <div className="p-7">
                  <p className="text-sm font-medium text-[#1B5DBF]">
                    {member.position}
                  </p>

                  <h3 className="mt-2 text-2xl font-semibold">
                    {member.name}
                  </h3>

                  {member.qualifications && (
                    <p className="mt-2 text-sm font-medium text-slate-500">
                      {member.qualifications}
                    </p>
                  )}

                  {member.short_bio && (
                    <p className="mt-5 text-sm leading-7 text-slate-600">
                      {member.short_bio}
                    </p>
                  )}

                  {member.bio && (
                    <details className="mt-5">
                      <summary className="cursor-pointer text-sm font-semibold text-[#071B49] transition-colors hover:text-[#1B5DBF]">
                        View profile
                      </summary>

                      <p className="mt-4 text-sm leading-7 text-slate-600">
                        {member.bio}
                      </p>
                    </details>
                  )}

                  {member.linkedin_url && (
                    <a
                      href={member.linkedin_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-5 inline-flex text-sm font-semibold text-[#071B49] transition-colors hover:text-[#1B5DBF]"
                    >
                      LinkedIn →
                    </a>
                  )}
                </div>
              </article>
            ))}
          </div>
        )}
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

          <a
            href="/contact"
            className="mt-8 inline-flex rounded-full bg-white px-7 py-3 text-sm font-semibold text-[#071B49] transition hover:bg-slate-100"
          >
            Get in touch
          </a>
        </div>
      </section>
    </main>
  )
}