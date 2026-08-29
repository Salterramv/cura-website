"use client"

import Link from "next/link"
import { useEffect, useMemo, useState } from "react"
import CuraHeader from "@/components/CuraHeader"
import CuraFooter from "@/components/CuraFooter"
import { createClient } from "@/lib/supabase/client"

type EducationArea = {
  area_key: string
  name: string
  description: string | null
  display_order: number
  is_active: boolean
}

function slugify(value: string) {
  return value
    .trim()
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
}

function areaHref(area: EducationArea) {
  const key = area.area_key.trim().toLowerCase()

  /*
   * Accounting already has a dedicated public materials page.
   * Keep that existing route.
   */
  if (key === "accounting") {
    return "/education/materials/accounting"
  }

  /*
   * Other areas can be connected to their dedicated public
   * material pages when those pages are developed.
   *
   * For now, use a stable hash so the card remains navigable
   * without inventing a route that does not yet exist.
   */
  return `#${slugify(area.name)}`
}

export default function EducationMaterialsPage() {
  const supabase = useMemo(() => createClient(), [])

  const [areas, setAreas] = useState<EducationArea[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false

    async function loadAreas() {
      setLoading(true)
      setError(null)

      const { data, error: queryError } = await supabase
        .from("education_areas")
        .select(
          "area_key,name,description,display_order,is_active"
        )
        .eq("is_active", true)
        .order("display_order", { ascending: true })

      if (cancelled) return

      if (queryError) {
        console.error(
          "Education area loading error:",
          queryError
        )

        setError(queryError.message)
        setAreas([])
        setLoading(false)
        return
      }

      setAreas((data ?? []) as EducationArea[])
      setLoading(false)
    }

    void loadAreas()

    return () => {
      cancelled = true
    }
  }, [supabase])

  return (
    <main className="min-h-screen bg-[#F5F8FC] text-[#071B49]">
      <CuraHeader />

      {/* HERO */}

      <section className="bg-[#071B49]">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#35B5E5]">
            CURA Education
          </p>

          <h1 className="mt-5 text-4xl font-semibold tracking-tight text-white md:text-6xl">
            Educational Materials
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
            Practical study materials designed to help you understand
            taxation, accounting, audit and law.
          </p>
        </div>
      </section>

      {/* EDUCATION AREAS */}

      <section className="mx-auto max-w-7xl px-6 py-16 lg:px-8 lg:py-24">
        {loading ? (
          <div className="grid gap-6 md:grid-cols-2">
            {[1, 2, 3, 4].map((item) => (
              <div
                key={item}
                className="h-56 animate-pulse rounded-2xl border border-slate-200 bg-white"
              />
            ))}
          </div>
        ) : error ? (
          <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-sm text-red-700">
            Unable to load education materials.
          </div>
        ) : areas.length === 0 ? (
          <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center">
            <h2 className="text-xl font-semibold text-[#071B49]">
              No education materials available
            </h2>

            <p className="mt-3 text-slate-500">
              No active education areas are currently available.
            </p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2">
            {areas.map((area) => {
              const href = areaHref(area)

              return (
                <Link
                  key={area.area_key}
                  href={href}
                  className="
                    rounded-2xl
                    border
                    border-slate-200
                    bg-white
                    p-8
                    shadow-sm
                    transition
                    hover:-translate-y-1
                    hover:shadow-lg
                  "
                >
                  <h2 className="text-2xl font-semibold text-[#168BC4]">
                    {area.name}
                  </h2>

                  {area.description && (
                    <p className="mt-4 leading-7 text-slate-600">
                      {area.description}
                    </p>
                  )}

                  <span className="mt-6 inline-block text-sm font-semibold text-[#071B49]">
                    Explore materials →
                  </span>
                </Link>
              )
            })}
          </div>
        )}
      </section>

      <CuraFooter />
    </main>
  )
}
