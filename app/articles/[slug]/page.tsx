import { notFound } from "next/navigation"

import CuraHeader from "@/components/CuraHeader"
import CuraFooter from "@/components/CuraFooter"
import ArticleInteractive, {
  ArticleHeading,
} from "@/components/articles/ArticleInteractive"

import { createClient } from "@/lib/supabase/client"
import { sanitizeRichText } from "@/lib/sanitize-html"

type PageProps = {
  params: Promise<{
    slug: string
  }>
}

type Article = {
  id: string
  slug: string
  title: string
  category: string
  description: string | null
  content: string
  image_url: string | null
  published_date: string | null
  published: boolean
  author_name: string | null
}

type RelatedArticle = {
  id: string
  slug: string
  title: string
  description: string | null
  published_date: string | null
}

function formatDate(date: string | null) {
  if (!date) return null

  return new Date(date).toLocaleDateString(
    "en-GB",
    {
      day: "numeric",
      month: "long",
      year: "numeric",
    },
  )
}

function slugifyHeading(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/<[^>]*>/g, "")
    .replace(/&amp;/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
}

function prepareArticleContent(
  value: string,
) {
  const sanitized = sanitizeRichText(value)

  const headings: ArticleHeading[] = []

  const html = sanitized.replace(
    /<h([23])([^>]*)>([\s\S]*?)<\/h\1>/gi,
    (match, level, attrs, inner) => {
      const plain = inner.replace(
        /<[^>]*>/g,
        "",
      )

      const id = slugifyHeading(plain)

      if (id) {
        headings.push({
          id,
          label: plain,
        })
      }

      return `<h${level}${attrs} id="${id}">${inner}</h${level}>`
    },
  )

  return {
    html,
    headings,
  }
}

function getArticleVisual(slug: string) {
  const visuals: Record<
    string,
    {
      image: string
      label: string
      stats: {
        value: string
        label: string
      }[]
    }
  > = {
    "maldives-economic-growth-2026-outlook": {
      image:
        "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1800&q=85",
      label: "Growth outlook",
      stats: [
        {
          value: "6.3%",
          label: "2025 real GDP growth",
        },
        {
          value: "0.7%",
          label: "2026 growth forecast",
        },
        {
          value: "6.7%",
          label: "2027 growth forecast",
        },
      ],
    },

    "maldives-tourism-engine-growth-2026": {
      image:
        "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1800&q=85",
      label: "Tourism",
      stats: [
        {
          value: "2.25m",
          label: "2025 tourist arrivals",
        },
        {
          value: "+9.8%",
          label: "annual arrival growth",
        },
        {
          value: "2026",
          label: "a more difficult start",
        },
      ],
    },

    "maldives-inflation-2026-imported-price-pressures": {
      image:
        "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1800&q=85",
      label: "Inflation",
      stats: [
        {
          value: "4.0%",
          label: "2025 inflation",
        },
        {
          value: "6.0%",
          label: "2026 forecast",
        },
        {
          value: "Imports",
          label: "key transmission channel",
        },
      ],
    },

    "maldives-government-finance-fiscal-pressure-2026": {
      image:
        "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=1800&q=85",
      label: "Government finance",
      stats: [
        {
          value: "4.3%",
          label: "2025 deficit / GDP",
        },
        {
          value: "10.9%",
          label: "2026 deficit forecast",
        },
        {
          value: "129.7%",
          label: "2025 debt / GDP",
        },
      ],
    },

    "maldives-external-sector-foreign-exchange-2026": {
      image:
        "https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?auto=format&fit=crop&w=1800&q=85",
      label: "External sector",
      stats: [
        {
          value: "7.5%",
          label: "2025 current-account deficit",
        },
        {
          value: "20.6%",
          label: "2026 projected deficit",
        },
        {
          value: "$717.9m",
          label: "reserves in Apr 2026",
        },
      ],
    },

    "maldives-financial-sector-sovereign-bank-nexus-2026": {
      image:
        "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=1800&q=85",
      label: "Financial sector",
      stats: [
        {
          value: "High",
          label: "sovereign debt risk",
        },
        {
          value: "Elevated",
          label: "sovereign-bank nexus",
        },
        {
          value: "2026",
          label: "year to watch",
        },
      ],
    },

    "global-growth-outlook-2026-crosscurrents": {
      image:
        "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?auto=format&fit=crop&w=1800&q=85",
      label: "Global growth",
      stats: [
        {
          value: "3.0%",
          label: "2026 global growth",
        },
        {
          value: "3.4%",
          label: "2027 global growth",
        },
        {
          value: "Uneven",
          label: "regional momentum",
        },
      ],
    },

    "global-inflation-2026-energy-food-prices": {
      image:
        "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1800&q=85",
      label: "Global inflation",
      stats: [
        {
          value: "4.7%",
          label: "2026 global inflation",
        },
        {
          value: "Energy",
          label: "major inflation risk",
        },
        {
          value: "Food",
          label: "household pressure",
        },
      ],
    },

    "global-interest-rates-2026-monetary-policy": {
      image:
        "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=1800&q=85",
      label: "Monetary policy",
      stats: [
        {
          value: "2026",
          label: "policy balancing act",
        },
        {
          value: "Inflation",
          label: "policy constraint",
        },
        {
          value: "Growth",
          label: "policy objective",
        },
      ],
    },

    "global-trade-2026-tariffs-supply-chains": {
      image:
        "https://images.unsplash.com/photo-1494412651409-8963ce7935a7?auto=format&fit=crop&w=1800&q=85",
      label: "International trade",
      stats: [
        {
          value: "Trade",
          label: "supply-chain pressure",
        },
        {
          value: "Tariffs",
          label: "policy uncertainty",
        },
        {
          value: "Resilience",
          label: "business priority",
        },
      ],
    },

    "global-commodities-2026-energy-food-metals": {
      image:
        "https://images.unsplash.com/photo-1509395176047-4a66953fd231?auto=format&fit=crop&w=1800&q=85",
      label: "Commodities",
      stats: [
        {
          value: "Energy",
          label: "major cost driver",
        },
        {
          value: "Food",
          label: "inflation channel",
        },
        {
          value: "Metals",
          label: "industrial signal",
        },
      ],
    },

    "global-economic-outlook-2026-what-businesses-should-watch": {
      image:
        "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1800&q=85",
      label: "Business outlook",
      stats: [
        {
          value: "5",
          label: "forces to watch",
        },
        {
          value: "2026",
          label: "uncertain environment",
        },
        {
          value: "Global",
          label: "business exposure",
        },
      ],
    },
  }

  return (
    visuals[slug] ?? {
      image:
        "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1800&q=85",
      label: "CURA Insight",
      stats: [
        {
          value: "CURA",
          label: "economic insight",
        },
        {
          value: "2026",
          label: "current outlook",
        },
        {
          value: "Analysis",
          label: "editorial perspective",
        },
      ],
    }
  )
}

export default async function ArticlePage({
  params,
}: PageProps) {
  const { slug } = await params

  const supabase = createClient()

  const {
    data: article,
    error,
  } = await supabase
    .from("articles")
    .select(`
      id,
      slug,
      title,
      category,
      description,
      content,
      image_url,
      published_date,
      published,
      author_name
    `)
    .eq("slug", slug)
    .eq("published", true)
    .single()

  if (error || !article) {
    notFound()
  }

  const typedArticle = article as Article

  const {
    data: related,
  } = await supabase
    .from("articles")
    .select(
      "id, slug, title, description, published_date",
    )
    .eq("published", true)
    .eq("category", typedArticle.category)
    .neq("id", typedArticle.id)
    .order("published_date", {
      ascending: false,
      nullsFirst: false,
    })
    .limit(3)

  const relatedArticles =
    (related ?? []) as RelatedArticle[]

  const visual = getArticleVisual(
    typedArticle.slug,
  )

  const articleImage =
    typedArticle.image_url ||
    visual.image

  const prepared =
    prepareArticleContent(
      typedArticle.content,
    )

  return (
    <main className="min-h-screen bg-[#F5F8FC] text-[#071B49]">

      <CuraHeader />

      {/* HERO */}

      <section className="relative overflow-hidden bg-[#071B49]">

        <div className="absolute inset-0">
          <img
            src={articleImage}
            alt=""
            className="h-full w-full object-cover opacity-30"
          />

          <div className="absolute inset-0 bg-gradient-to-r from-[#071B49] via-[#071B49]/90 to-[#071B49]/55" />
        </div>

        <div className="relative mx-auto max-w-7xl px-6 py-16 lg:px-8 lg:py-20">

          <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">

            <div>

              <div className="flex flex-wrap items-center gap-3">

                <span className="rounded-full bg-[#E7F4FA] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.15em] text-[#0876A8]">
                  {typedArticle.category}
                </span>

                {typedArticle.published_date && (
                  <span className="text-sm text-slate-300">
                    {formatDate(
                      typedArticle.published_date,
                    )}
                  </span>
                )}

              </div>

              <p className="mt-7 text-xs font-bold uppercase tracking-[0.25em] text-[#54C9ED]">
                {visual.label}
              </p>

              <h1 className="mt-3 max-w-5xl text-4xl font-bold tracking-tight text-white md:text-5xl lg:text-6xl">
                {typedArticle.title}
              </h1>

              {typedArticle.description && (
                <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-200">
                  {typedArticle.description}
                </p>
              )}

              {typedArticle.author_name && (
                <p className="mt-6 text-sm text-slate-300">
                  By{" "}
                  <span className="font-semibold text-white">
                    {typedArticle.author_name}
                  </span>
                </p>
              )}

            </div>

            {/* HERO IMAGE */}

            <div className="relative">

              <div className="overflow-hidden rounded-3xl border border-white/20 bg-white/10 shadow-2xl">

                <img
                  src={articleImage}
                  alt=""
                  className="aspect-[4/3] w-full object-cover"
                />

              </div>

              <div className="absolute -bottom-5 -left-5 hidden rounded-2xl border border-white/20 bg-[#071B49]/95 px-5 py-4 shadow-xl sm:block">

                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#54C9ED]">
                  CURA
                </p>

                <p className="mt-1 text-sm font-semibold text-white">
                  Economic Insight
                </p>

              </div>

            </div>

          </div>

        </div>

      </section>

      {/* KEY FIGURES */}

      <section className="relative z-10 -mt-5">

        <div className="mx-auto max-w-6xl px-6 lg:px-8">

          <div className="grid overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl sm:grid-cols-3">

            {visual.stats.map((stat, index) => (
              <div
                key={`${stat.label}-${index}`}
                className={`p-6 ${
                  index !== 0
                    ? "border-t border-slate-200 sm:border-l sm:border-t-0"
                    : ""
                }`}
              >

                <p className="text-2xl font-bold text-[#071B49] md:text-3xl">
                  {stat.value}
                </p>

                <p className="mt-1 text-xs font-medium uppercase tracking-[0.12em] text-slate-500">
                  {stat.label}
                </p>

              </div>
            ))}

          </div>

        </div>

      </section>

      {/* ARTICLE */}

      <article>

        <ArticleInteractive
          headings={prepared.headings}
        >

          <div
            className="
              article-body
              break-words
              text-[17px]
              leading-8
              text-slate-700

              [&_p]:mb-6

              [&_p:first-child]:text-lg
              [&_p:first-child]:leading-8
              [&_p:first-child]:font-medium
              [&_p:first-child]:text-[#071B49]

              [&_h2]:relative
              [&_h2]:mb-5
              [&_h2]:mt-12
              [&_h2]:border-l-4
              [&_h2]:border-[#18B8EE]
              [&_h2]:pl-4
              [&_h2]:text-2xl
              [&_h2]:font-bold
              [&_h2]:leading-tight
              [&_h2]:text-[#071B49]
              [&_h2]:md:text-3xl

              [&_h3]:mb-4
              [&_h3]:mt-9
              [&_h3]:text-xl
              [&_h3]:font-bold
              [&_h3]:text-[#071B49]

              [&_strong]:font-bold
              [&_b]:font-bold

              [&_ul]:mb-7
              [&_ul]:rounded-2xl
              [&_ul]:border
              [&_ul]:border-[#D9EEF6]
              [&_ul]:bg-[#F5FBFD]
              [&_ul]:px-8
              [&_ul]:py-5
              [&_ul]:list-disc

              [&_ol]:mb-7
              [&_ol]:rounded-2xl
              [&_ol]:border
              [&_ol]:border-[#D9EEF6]
              [&_ol]:bg-[#F5FBFD]
              [&_ol]:px-8
              [&_ol]:py-5
              [&_ol]:list-decimal

              [&_li]:mb-2

              [&_blockquote]:my-8
              [&_blockquote]:rounded-2xl
              [&_blockquote]:border-l-4
              [&_blockquote]:border-[#168BC4]
              [&_blockquote]:bg-[#EFFBFF]
              [&_blockquote]:px-6
              [&_blockquote]:py-5
              [&_blockquote]:font-medium
              [&_blockquote]:text-[#071B49]

              [&_a]:font-semibold
              [&_a]:text-[#168BC4]
              [&_a]:underline
              [&_a]:underline-offset-4

              [&_table]:my-8
              [&_table]:w-full
              [&_table]:overflow-hidden
              [&_table]:rounded-2xl
              [&_table]:border
              [&_table]:border-slate-200

              [&_th]:bg-[#071B49]
              [&_th]:px-4
              [&_th]:py-3
              [&_th]:text-left
              [&_th]:text-sm
              [&_th]:font-bold
              [&_th]:text-white

              [&_td]:border-t
              [&_td]:border-slate-200
              [&_td]:px-4
              [&_td]:py-3
              [&_td]:text-sm

              [&_hr]:my-10
              [&_hr]:border-slate-200
            "
            dangerouslySetInnerHTML={{
              __html: prepared.html,
            }}
          />

        </ArticleInteractive>

      </article>

      {/* RELATED ARTICLES */}

      {relatedArticles.length > 0 && (
        <section className="border-t border-slate-200 bg-white">

          <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">

            <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">

              <div>

                <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#168BC4]">
                  More from CURA
                </p>

                <h2 className="mt-2 text-3xl font-bold text-[#071B49]">
                  Related {typedArticle.category} insights
                </h2>

              </div>

              <a
                href="/articles"
                className="text-sm font-semibold text-[#168BC4] hover:text-[#071B49]"
              >
                View all articles →
              </a>

            </div>

            <div className="mt-8 grid gap-5 md:grid-cols-3">

              {relatedArticles.map((relatedArticle) => (
                <a
                  key={relatedArticle.id}
                  href={`/articles/${relatedArticle.slug}`}
                  className="group rounded-2xl border border-slate-200 bg-[#F8FAFD] p-6 transition hover:-translate-y-1 hover:border-[#B9E8F7] hover:shadow-lg"
                >

                  <p className="text-xs font-semibold text-slate-400">
                    {formatDate(
                      relatedArticle.published_date,
                    )}
                  </p>

                  <h3 className="mt-3 text-lg font-bold leading-7 text-[#071B49] group-hover:text-[#168BC4]">
                    {relatedArticle.title}
                  </h3>

                  {relatedArticle.description && (
                    <p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-600">
                      {relatedArticle.description}
                    </p>
                  )}

                  <span className="mt-5 inline-block text-sm font-semibold text-[#168BC4]">
                    Read insight →
                  </span>

                </a>
              ))}

            </div>

          </div>

        </section>
      )}

      <CuraFooter />

    </main>
  )
}
