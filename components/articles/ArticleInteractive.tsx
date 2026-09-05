"use client"

import { ReactNode, useEffect, useState } from "react"

export type ArticleHeading = {
  id: string
  label: string
}

type Props = {
  children: ReactNode
  headings: ArticleHeading[]
}

export default function ArticleInteractive({
  children,
  headings,
}: Props) {
  const [activeId, setActiveId] = useState("")
  const [progress, setProgress] = useState(0)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    function handleScroll() {
      const article = document.getElementById(
        "cura-article-content",
      )

      if (!article) return

      const rect = article.getBoundingClientRect()
      const articleTop = rect.top + window.scrollY
      const articleHeight = article.offsetHeight
      const viewportHeight = window.innerHeight

      const denominator = Math.max(
        articleHeight - viewportHeight * 0.55,
        1,
      )

      const value =
        ((window.scrollY -
          articleTop +
          viewportHeight * 0.2) /
          denominator) *
        100

      setProgress(
        Math.min(100, Math.max(0, value)),
      )

      let current = ""

      for (const heading of headings) {
        const element = document.getElementById(
          heading.id,
        )

        if (!element) continue

        if (
          element.getBoundingClientRect().top <=
          180
        ) {
          current = heading.id
        }
      }

      if (current) {
        setActiveId(current)
      }
    }

    handleScroll()

    window.addEventListener(
      "scroll",
      handleScroll,
      { passive: true },
    )

    window.addEventListener(
      "resize",
      handleScroll,
    )

    return () => {
      window.removeEventListener(
        "scroll",
        handleScroll,
      )

      window.removeEventListener(
        "resize",
        handleScroll,
      )
    }
  }, [headings])

  async function shareArticle() {
    try {
      if (navigator.share) {
        await navigator.share({
          title: document.title,
          url: window.location.href,
        })

        return
      }

      await navigator.clipboard.writeText(
        window.location.href,
      )

      setCopied(true)

      setTimeout(() => {
        setCopied(false)
      }, 1800)
    } catch {
      // User cancelled sharing.
    }
  }

  return (
    <>
      {/* READING PROGRESS */}

      <div
        className="fixed left-0 top-0 z-[100] h-1 bg-[#18B8EE] transition-[width] duration-150"
        style={{
          width: `${progress}%`,
        }}
      />

      <div className="mx-auto grid max-w-7xl gap-8 px-6 py-12 lg:grid-cols-[220px_minmax(0,1fr)] lg:px-8">

        {/* ARTICLE NAVIGATION */}

        <aside className="hidden lg:block">
          <div className="sticky top-28">

            <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#168BC4]">
              In this article
            </p>

            <div className="mt-3 h-px bg-slate-200" />

            <nav className="mt-4 space-y-1">

              {headings.map((heading) => (
                <a
                  key={heading.id}
                  href={`#${heading.id}`}
                  className={`block border-l-2 px-3 py-2 text-xs leading-5 transition ${
                    activeId === heading.id
                      ? "border-[#168BC4] bg-[#EAF8FD] font-semibold text-[#071B49]"
                      : "border-transparent text-slate-500 hover:border-[#B9E8F7] hover:text-[#071B49]"
                  }`}
                >
                  {heading.label}
                </a>
              ))}

            </nav>

            <button
              type="button"
              onClick={shareArticle}
              className="mt-6 w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-xs font-semibold text-[#071B49] shadow-sm transition hover:border-[#168BC4] hover:text-[#168BC4]"
            >
              {copied
                ? "Link copied"
                : "Share article"}
            </button>

          </div>
        </aside>

        {/* ARTICLE CONTENT */}

        <div className="min-w-0">

          <div
            id="cura-article-content"
            className="rounded-3xl border border-slate-200 bg-white p-7 shadow-[0_18px_60px_rgba(7,27,73,0.08)] md:p-12"
          >
            {children}
          </div>

          {/* CURA INSIGHT CALLOUT */}

          <div className="mt-8 grid gap-5 md:grid-cols-2">

            <div className="rounded-2xl border border-[#B9E8F7] bg-[#EFFBFF] p-6">

              <div className="flex items-center gap-3">

                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#168BC4] text-sm font-bold text-white">
                  C
                </div>

                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#168BC4]">
                  CURA Insight
                </p>

              </div>

              <p className="mt-4 text-sm leading-6 text-[#071B49]">
                Economic indicators are most useful when
                read together. Growth, prices, public
                finance and external balances can tell
                different parts of the same story.
              </p>

            </div>

            <div className="rounded-2xl bg-[#071B49] p-6 text-white">

              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#54C9ED]">
                Keep exploring
              </p>

              <p className="mt-3 text-sm leading-6 text-slate-200">
                Continue with the latest CURA economic
                analysis for additional context and
                developments.
              </p>

            </div>

          </div>

        </div>

      </div>
    </>
  )
}
