import { notFound } from "next/navigation"
import CuraHeader from "@/components/CuraHeader"
import CuraFooter from "@/components/CuraFooter"
import { createClient } from "@/lib/supabase/client"

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

            <div className="whitespace-pre-wrap text-base leading-8 text-slate-700">
              {typedArticle.content}
            </div>

          </div>

        </div>

      </article>

      <CuraFooter />

    </main>
  )
}
