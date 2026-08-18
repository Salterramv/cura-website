"use client"

import {
  FormEvent,
  useEffect,
  useRef,
  useState,
} from "react"
import { createClient } from "@/lib/supabase/client"

type Article = {
  id: string
  slug: string
  title: string
  category: string
  description: string | null
  content: string
  author_name: string | null
  published_date: string | null
  published: boolean
  created_at: string
  updated_at: string
}

const emptyForm = {
  title: "",
  category: "",
  author_name: "",
  description: "",
  content: "",
  published_date: "",
  published: false,
}

const categories = [
  "GST",
  "Business Profit Tax",
  "Withholding Tax",
  "Tax Compliance",
  "Tax Law",
  "Tax Updates",
  "Accounting",
  "Audit",
  "Advisory",
  "Other",
]

function createSlug(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
}

function formatDate(date: string | null) {
  if (!date) return "No publication date"

  return new Date(date).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  })
}

export default function AdminArticlesPage() {
  const supabase = createClient()
  const editorRef = useRef<HTMLDivElement>(null)

  const [articles, setArticles] = useState<Article[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [deleting, setDeleting] = useState<string | null>(null)

  const [editingId, setEditingId] = useState<string | null>(null)

  const [form, setForm] = useState(emptyForm)

  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  useEffect(() => {
    checkAdmin()
  }, [])

  async function checkAdmin() {
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      window.location.href = "/admin/login"
      return
    }

    const { data: isAdmin, error: adminError } =
      await supabase.rpc("is_current_user_admin")

    if (adminError || !isAdmin) {
      await supabase.auth.signOut()
      window.location.href = "/admin/login"
      return
    }

    await loadArticles()
    setLoading(false)
  }

  async function loadArticles() {
    const { data, error } = await supabase
      .from("articles")
      .select("*")
      .order("published_date", {
        ascending: false,
        nullsFirst: false,
      })
      .order("created_at", {
        ascending: false,
      })

    if (error) {
      setError(error.message)
      return
    }

    setArticles(data ?? [])
  }

  function resetForm() {
    setForm(emptyForm)
    setEditingId(null)

    if (editorRef.current) {
      editorRef.current.innerHTML = ""
    }

    setError("")
    setSuccess("")
  }

  function startEdit(article: Article) {
    setEditingId(article.id)

    setForm({
      title: article.title ?? "",
      category: article.category ?? "",
      author_name: article.author_name ?? "",
      description: article.description ?? "",
      content: article.content ?? "",
      published_date: article.published_date ?? "",
      published: article.published ?? false,
    })

    setError("")
    setSuccess("")

    setTimeout(() => {
      if (editorRef.current) {
        editorRef.current.innerHTML = article.content ?? ""
      }
    }, 0)

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  function updateField(
    field: keyof typeof emptyForm,
    value: string | boolean,
  ) {
    setForm((current) => ({
      ...current,
      [field]: value,
    }))
  }

  function executeFormat(
    command: string,
    value?: string,
  ) {
    editorRef.current?.focus()
    document.execCommand(command, false, value)
    updateEditorContent()
  }

  function updateEditorContent() {
    if (!editorRef.current) return

    setForm((current) => ({
      ...current,
      content: editorRef.current?.innerHTML ?? "",
    }))
  }

  function insertHeading(level: "h2" | "h3") {
    editorRef.current?.focus()

    document.execCommand(
      "formatBlock",
      false,
      level,
    )

    updateEditorContent()
  }

  function insertLink() {
    const url = window.prompt(
      "Enter the full URL:",
      "https://",
    )

    if (!url) return

    editorRef.current?.focus()

    document.execCommand(
      "createLink",
      false,
      url,
    )

    updateEditorContent()
  }

  function insertCallout() {
    editorRef.current?.focus()

    const html = `
      <blockquote style="border-left: 4px solid #18b8ee; background: #eaf7fc; padding: 16px 20px; margin: 20px 0; border-radius: 8px;">
        <strong>Important:</strong> Enter your highlighted information here.
      </blockquote>
    `

    document.execCommand(
      "insertHTML",
      false,
      html,
    )

    updateEditorContent()
  }

  function insertTable() {
    editorRef.current?.focus()

    const html = `
      <table style="width:100%; border-collapse:collapse; margin:20px 0;">
        <thead>
          <tr>
            <th style="border:1px solid #cbd5e1; padding:10px; text-align:left; background:#f1f5f9;">Heading 1</th>
            <th style="border:1px solid #cbd5e1; padding:10px; text-align:left; background:#f1f5f9;">Heading 2</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style="border:1px solid #cbd5e1; padding:10px;">Value</td>
            <td style="border:1px solid #cbd5e1; padding:10px;">Value</td>
          </tr>
        </tbody>
      </table>
    `

    document.execCommand(
      "insertHTML",
      false,
      html,
    )

    updateEditorContent()
  }

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault()

    setError("")
    setSuccess("")

    if (!form.title.trim()) {
      setError("Please enter an article title.")
      return
    }

    if (!form.category.trim()) {
      setError("Please select an article category.")
      return
    }

    if (!form.description.trim()) {
      setError("Please enter an article description.")
      return
    }

    if (!form.content.trim()) {
      setError("Please enter the article content.")
      return
    }

    if (form.published && !form.author_name.trim()) {
      setError(
        "An author name is required before publishing an article.",
      )
      return
    }

    setSaving(true)

    const slug = createSlug(form.title)

    const payload = {
      slug,
      title: form.title.trim(),
      category: form.category.trim(),
      author_name:
        form.author_name.trim() || null,
      description:
        form.description.trim() || null,
      content: form.content,
      published_date:
        form.published_date || null,
      published: form.published,
      updated_at: new Date().toISOString(),
    }

    let operationError = null

    if (editingId) {
      const { error } = await supabase
        .from("articles")
        .update(payload)
        .eq("id", editingId)

      operationError = error
    } else {
      const { error } = await supabase
        .from("articles")
        .insert({
          ...payload,
          created_at: new Date().toISOString(),
        })

      operationError = error
    }

    setSaving(false)

    if (operationError) {
      console.error(operationError)
      setError(operationError.message)
      return
    }

    setSuccess(
      editingId
        ? "Article updated successfully."
        : "Article created successfully.",
    )

    resetForm()
    await loadArticles()
  }

  async function togglePublished(
    article: Article,
  ) {
    setError("")
    setSuccess("")

    if (!article.published && !article.author_name) {
      setError(
        "An author name is required before publishing this article.",
      )
      return
    }

    const { error } = await supabase
      .from("articles")
      .update({
        published: !article.published,
        updated_at: new Date().toISOString(),
      })
      .eq("id", article.id)

    if (error) {
      setError(error.message)
      return
    }

    setSuccess(
      article.published
        ? "Article unpublished."
        : "Article published.",
    )

    await loadArticles()
  }

  async function deleteArticle(
    article: Article,
  ) {
    const confirmed = window.confirm(
      `Delete "${article.title}"? This cannot be undone.`,
    )

    if (!confirmed) return

    setDeleting(article.id)
    setError("")
    setSuccess("")

    const { error } = await supabase
      .from("articles")
      .delete()
      .eq("id", article.id)

    setDeleting(null)

    if (error) {
      setError(error.message)
      return
    }

    setSuccess("Article deleted successfully.")

    if (editingId === article.id) {
      resetForm()
    }

    await loadArticles()
  }

  async function handleSignOut() {
    await supabase.auth.signOut()
    window.location.href = "/admin/login"
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-[#f4f7fb] flex items-center justify-center">
        <div className="text-center">
          <div className="mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-4 border-slate-200 border-t-[#18b8ee]" />

          <p className="text-sm font-medium text-slate-600">
            Loading Articles Administration...
          </p>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-[#f4f7fb] text-[#071d41]">

      {/* HEADER */}

      <header className="bg-[#061b3d] text-white">

        <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-6 py-4">

          <div className="flex items-center gap-5">

            <div className="flex items-center border-r border-white/15 pr-6">

              <img
                src="/cura-logo.png"
                alt="CURA"
                className="h-12 w-auto object-contain brightness-0 invert"
              />

            </div>

            <div className="hidden sm:block">

              <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-[#18b8ee]">
                CURA Administration
              </p>

              <h1 className="mt-1 text-lg font-semibold text-white">
                Articles
              </h1>

            </div>

          </div>

          <div className="flex items-center gap-3">

            <a
              href="/articles"
              className="hidden rounded-lg border border-white bg-white px-4 py-2.5 text-sm font-semibold !text-[#061b3d] transition hover:bg-[#eafaff] sm:block"
            >
              View Articles
            </a>

            <a
              href="/admin"
              className="hidden rounded-lg border border-[#18b8ee]/60 px-4 py-2.5 text-sm font-semibold text-white transition hover:border-[#18b8ee] hover:bg-[#18b8ee]/10 sm:block"
            >
              Dashboard
            </a>

            <button
              type="button"
              onClick={handleSignOut}
              className="rounded-lg bg-gradient-to-r from-[#18b8ee] to-[#087dcc] px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:from-[#25c5f5] hover:to-[#0b8cda]"
            >
              Sign Out
            </button>

          </div>

        </div>

      </header>

      {/* MAIN */}

      <div className="mx-auto max-w-7xl px-6 py-10 lg:px-8">

        <div className="mb-8">

          <p className="mb-2 text-xs font-bold uppercase tracking-[0.28em] text-[#18b8ee]">
            Knowledge Centre
          </p>

          <h2 className="text-3xl font-bold tracking-tight">
            Manage Articles
          </h2>

          <p className="mt-3 max-w-3xl text-base leading-7 text-slate-600">
            Create, edit and publish professional articles for the CURA
            Knowledge Centre.
          </p>

        </div>

        {/* MESSAGES */}

        {error && (
          <div className="mb-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        )}

        {success && (
          <div className="mb-6 rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
            {success}
          </div>
        )}

        {/* EDITOR */}

        <section className="rounded-2xl border border-slate-200 bg-white shadow-sm">

          <div className="border-b border-slate-200 px-6 py-5">

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

              <div>

                <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#18b8ee]">
                  {editingId ? "Edit Article" : "New Article"}
                </p>

                <h3 className="mt-1 text-xl font-bold">
                  {editingId
                    ? "Update knowledge article"
                    : "Create knowledge article"}
                </h3>

              </div>

              {editingId && (
                <button
                  type="button"
                  onClick={resetForm}
                  className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-600 transition hover:bg-slate-50"
                >
                  Cancel Editing
                </button>
              )}

            </div>

          </div>

          <form
            onSubmit={handleSubmit}
            className="space-y-7 p-6"
          >

            {/* ARTICLE DETAILS */}

            <div>

              <h4 className="text-sm font-bold uppercase tracking-[0.16em]">
                Article Details
              </h4>

              <div className="mt-5 grid gap-5 md:grid-cols-2">

                <div className="md:col-span-2">

                  <label className="mb-2 block text-sm font-semibold">
                    Article Title *
                  </label>

                  <input
                    type="text"
                    value={form.title}
                    onChange={(e) =>
                      updateField(
                        "title",
                        e.target.value,
                      )
                    }
                    placeholder="e.g. Understanding GST in the Maldives"
                    className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-[#18b8ee] focus:ring-2 focus:ring-[#18b8ee]/20"
                    required
                  />

                </div>

                <div>

                  <label className="mb-2 block text-sm font-semibold">
                    Category *
                  </label>

                  <select
                    value={form.category}
                    onChange={(e) =>
                      updateField(
                        "category",
                        e.target.value,
                      )
                    }
                    className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-[#18b8ee] focus:ring-2 focus:ring-[#18b8ee]/20"
                    required
                  >
                    <option value="">
                      Select category
                    </option>

                    {categories.map(
                      (category) => (
                        <option
                          key={category}
                          value={category}
                        >
                          {category}
                        </option>
                      ),
                    )}

                  </select>

                </div>

                <div>

                  <label className="mb-2 block text-sm font-semibold">
                    Author Name *
                  </label>

                  <input
                    type="text"
                    value={form.author_name}
                    onChange={(e) =>
                      updateField(
                        "author_name",
                        e.target.value,
                      )
                    }
                    placeholder="Author name"
                    className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-[#18b8ee] focus:ring-2 focus:ring-[#18b8ee]/20"
                  />

                  <p className="mt-2 text-xs text-slate-500">
                    Required before an article can be published.
                  </p>

                </div>

                <div>

                  <label className="mb-2 block text-sm font-semibold">
                    Publication Date
                  </label>

                  <input
                    type="date"
                    value={form.published_date}
                    onChange={(e) =>
                      updateField(
                        "published_date",
                        e.target.value,
                      )
                    }
                    className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-[#18b8ee] focus:ring-2 focus:ring-[#18b8ee]/20"
                  />

                </div>

              </div>

            </div>

            {/* DESCRIPTION */}

            <div>

              <label className="mb-2 block text-sm font-semibold">
                Article Summary *
              </label>

              <textarea
                rows={4}
                value={form.description}
                onChange={(e) =>
                  updateField(
                    "description",
                    e.target.value,
                  )
                }
                placeholder="Short summary displayed on the Articles page."
                className="w-full resize-y rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm leading-6 outline-none transition focus:border-[#18b8ee] focus:ring-2 focus:ring-[#18b8ee]/20"
                required
              />

            </div>

            {/* CONTENT EDITOR */}

            <div>

              <div className="mb-2 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

                <label className="block text-sm font-semibold">
                  Article Content *
                </label>

                <span className="text-xs text-slate-400">
                  Use the toolbar to format your article.
                </span>

              </div>

              {/* TOOLBAR */}

              <div className="flex flex-wrap gap-2 rounded-t-lg border border-slate-300 bg-slate-50 p-3">

                <button
                  type="button"
                  onClick={() =>
                    executeFormat("bold")
                  }
                  className="rounded-md border border-slate-300 bg-white px-3 py-1.5 text-sm font-bold text-slate-700 hover:bg-slate-100"
                >
                  B
                </button>

                <button
                  type="button"
                  onClick={() =>
                    executeFormat("italic")
                  }
                  className="rounded-md border border-slate-300 bg-white px-3 py-1.5 text-sm italic text-slate-700 hover:bg-slate-100"
                >
                  I
                </button>

                <button
                  type="button"
                  onClick={() =>
                    executeFormat("underline")
                  }
                  className="rounded-md border border-slate-300 bg-white px-3 py-1.5 text-sm underline text-slate-700 hover:bg-slate-100"
                >
                  U
                </button>

                <button
                  type="button"
                  onClick={() =>
                    insertHeading("h2")
                  }
                  className="rounded-md border border-slate-300 bg-white px-3 py-1.5 text-xs font-bold text-slate-700 hover:bg-slate-100"
                >
                  H2
                </button>

                <button
                  type="button"
                  onClick={() =>
                    insertHeading("h3")
                  }
                  className="rounded-md border border-slate-300 bg-white px-3 py-1.5 text-xs font-bold text-slate-700 hover:bg-slate-100"
                >
                  H3
                </button>

                <button
                  type="button"
                  onClick={() =>
                    executeFormat(
                      "insertUnorderedList",
                    )
                  }
                  className="rounded-md border border-slate-300 bg-white px-3 py-1.5 text-sm text-slate-700 hover:bg-slate-100"
                >
                  • List
                </button>

                <button
                  type="button"
                  onClick={() =>
                    executeFormat(
                      "insertOrderedList",
                    )
                  }
                  className="rounded-md border border-slate-300 bg-white px-3 py-1.5 text-sm text-slate-700 hover:bg-slate-100"
                >
                  1. List
                </button>

                <button
                  type="button"
                  onClick={insertLink}
                  className="rounded-md border border-slate-300 bg-white px-3 py-1.5 text-sm text-slate-700 hover:bg-slate-100"
                >
                  Link
                </button>

                <button
                  type="button"
                  onClick={insertCallout}
                  className="rounded-md border border-slate-300 bg-white px-3 py-1.5 text-sm font-semibold text-slate-700 hover:bg-slate-100"
                >
                  Callout
                </button>

                <button
                  type="button"
                  onClick={insertTable}
                  className="rounded-md border border-slate-300 bg-white px-3 py-1.5 text-sm font-semibold text-slate-700 hover:bg-slate-100"
                >
                  Table
                </button>

              </div>

              <div
                ref={editorRef}
                contentEditable
                suppressContentEditableWarning
                onInput={updateEditorContent}
                className="min-h-[500px] w-full rounded-b-lg border border-t-0 border-slate-300 bg-white px-6 py-6 text-sm leading-7 outline-none focus:border-[#18b8ee] focus:ring-2 focus:ring-[#18b8ee]/20 [&_h2]:mb-4 [&_h2]:mt-8 [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-[#071B49] [&_h3]:mb-3 [&_h3]:mt-6 [&_h3]:text-xl [&_h3]:font-semibold [&_h3]:text-[#071B49] [&_p]:mb-4 [&_ul]:mb-4 [&_ul]:list-disc [&_ul]:pl-6 [&_ol]:mb-4 [&_ol]:list-decimal [&_ol]:pl-6"
              />

            </div>

            {/* PUBLISH */}

            <div className="rounded-xl border border-slate-200 bg-slate-50 p-5">

              <label className="flex cursor-pointer items-start gap-3">

                <input
                  type="checkbox"
                  checked={form.published}
                  onChange={(e) =>
                    updateField(
                      "published",
                      e.target.checked,
                    )
                  }
                  className="mt-1 h-4 w-4 rounded border-slate-300 text-[#087dcc] focus:ring-[#18b8ee]"
                />

                <span>

                  <span className="block text-sm font-semibold">
                    Publish this article
                  </span>

                  <span className="mt-1 block text-xs leading-5 text-slate-500">
                    Published articles will appear on the public CURA
                    Knowledge Centre.
                  </span>

                </span>

              </label>

            </div>

            {/* ACTIONS */}

            <div className="flex flex-col gap-3 sm:flex-row">

              <button
                type="submit"
                disabled={saving}
                className="rounded-lg bg-[#061b3d] px-6 py-3 text-sm font-semibold !text-white transition hover:bg-[#0b2a55] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {saving
                  ? "Saving..."
                  : editingId
                    ? "Update Article"
                    : "Create Article"}
              </button>

              <button
                type="button"
                onClick={resetForm}
                className="rounded-lg border border-slate-300 px-6 py-3 text-sm font-semibold text-slate-600 transition hover:bg-slate-50"
              >
                Clear
              </button>

            </div>

          </form>

        </section>

        {/* ARTICLES */}

        <section className="mt-10">

          <div className="mb-5">

            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#18b8ee]">
              Knowledge Centre
            </p>

            <h3 className="mt-2 text-2xl font-bold">
              Existing Articles
            </h3>

          </div>

          {articles.length === 0 ? (

            <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-14 text-center">

              <h4 className="text-lg font-semibold">
                No articles found
              </h4>

            </div>

          ) : (

            <div className="space-y-4">

              {articles.map((article) => (

                <div
                  key={article.id}
                  className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
                >

                  <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">

                    <div className="min-w-0">

                      <div className="flex flex-wrap items-center gap-2">

                        <span
                          className={`rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-[0.14em] ${
                            article.published
                              ? "bg-emerald-50 text-emerald-700"
                              : "bg-slate-100 text-slate-500"
                          }`}
                        >
                          {article.published
                            ? "Published"
                            : "Draft"}
                        </span>

                        <span className="rounded-full bg-[#EAF7FC] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-[#0876A8]">
                          {article.category}
                        </span>

                      </div>

                      <h4 className="mt-4 text-xl font-bold text-[#071d41]">
                        {article.title}
                      </h4>

                      <p className="mt-2 text-sm text-slate-500">
                        {article.author_name
                          ? `By ${article.author_name}`
                          : "Author not specified"}
                        {" · "}
                        {formatDate(
                          article.published_date,
                        )}
                      </p>

                      {article.description && (
                        <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-600">
                          {article.description}
                        </p>
                      )}

                    </div>

                    <div className="flex flex-wrap gap-2">

                      <a
                        href={`/articles/${article.slug}`}
                        target="_blank"
                        rel="noreferrer"
                        className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-[#071d41] transition hover:bg-slate-50"
                      >
                        View
                      </a>

                      <button
                        type="button"
                        onClick={() =>
                          startEdit(article)
                        }
                        className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-[#071d41] transition hover:bg-slate-50"
                      >
                        Edit
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          togglePublished(article)
                        }
                        className={`rounded-lg px-4 py-2 text-sm font-semibold transition ${
                          article.published
                            ? "border border-amber-200 bg-amber-50 text-amber-700 hover:bg-amber-100"
                            : "bg-[#061b3d] !text-white hover:bg-[#0b2a55]"
                        }`}
                      >
                        {article.published
                          ? "Unpublish"
                          : "Publish"}
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          deleteArticle(article)
                        }
                        disabled={
                          deleting === article.id
                        }
                        className="rounded-lg border border-red-200 px-4 py-2 text-sm font-semibold text-red-600 transition hover:bg-red-50 disabled:opacity-50"
                      >
                        {deleting === article.id
                          ? "Deleting..."
                          : "Delete"}
                      </button>

                    </div>

                  </div>

                </div>

              ))}

            </div>

          )}

        </section>

      </div>

    </main>
  )
}
