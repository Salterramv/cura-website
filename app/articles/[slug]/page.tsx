import { notFound } from "next/navigation"
import CuraHeader from "@/components/CuraHeader"
import CuraFooter from "@/components/CuraFooter"
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
  published_date: string | null
  published: boolean
  author_name: string | null
}

function formatDate(date: string | null) {
  if (!date) return null

  return new Date(date).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  })
}


function ArticleRichText({
  value,
}: {
  value: string | null | undefined
}) {
  if (!value) return null

  const containsHtml =
    /<(strong|b|em|i|u|span|p|h[1-6]|ul|ol|li|a|br)\b/i.test(
      value
    )

  if (!containsHtml) {
    return (
      <div className="whitespace-pre-wrap break-words">
        {value}
      </div>
    )
  }

  return (
    <div
      className="
        break-words
        [&_p]:mb-4
        [&_strong]:font-bold
        [&_b]:font-bold
        [&_em]:italic
        [&_i]:italic
        [&_u]:underline
        [&_ul]:mb-4 [&_ul]:list-disc [&_ul]:pl-6
        [&_ol]:mb-4 [&_ol]:list-decimal [&_ol]:pl-6
        [&_li]:mb-1
        [&_h2]:mb-4 [&_h2]:mt-6 [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-[#071B49]
        [&_h3]:mb-3 [&_h3]:mt-5 [&_h3]:text-xl [&_h3]:font-semibold [&_h3]:text-[#071B49]
        [&_a]:font-semibold [&_a]:text-[#168BC4] [&_a]:underline
      "
      dangerouslySetInnerHTML={{
        __html: sanitizeRichText(value),
      }}
    />
  )
}

export default async function ArticlePage({
  params,
}: PageProps) {
  const { slug } = await params

  const supabase = createClient()

  const { data: article, error } = await supabase
    .from("articles")
    .select(`
      id,
      slug,
      title,
      category,
      description,
      content,
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

  return (
    <main className="min-h-screen bg-[#F5F8FC] text-[#071B49]">

      <CuraHeader />

      {/* HERO */}

      <section className="bg-[#071B49]">

        <div className="mx-auto max-w-5xl px-6 py-20 lg:px-8">

          <div className="flex flex-wrap items-center gap-3">

            <span className="rounded-full bg-[#E7F4FA] px-3 py-1 text-[10px] font-bold tracking-[0.15em] text-[#0876A8]">
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

          <h1 className="mt-6 text-4xl font-semibold tracking-tight text-white md:text-6xl">
            {typedArticle.title}
          </h1>

          {typedArticle.description && (
            <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">
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

      </section>

      {/* ARTICLE CONTENT */}

      <article>

        <div className="mx-auto max-w-4xl px-6 py-16 lg:px-8">

          <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm md:p-12">

            <div className="text-base leading-8 text-slate-700">
              <ArticleRichText
                value={typedArticle.content}
              />
            </div>

          </div>

        </div>

      </article>

      <CuraFooter />

    </main>
  )
}
