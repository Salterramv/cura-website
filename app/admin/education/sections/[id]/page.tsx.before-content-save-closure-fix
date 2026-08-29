"use client"

import { useEffect, useMemo, useState } from "react"
import Link from "next/link"
import CuraRichTextEditor from "@/components/admin/CuraRichTextEditor"

type BlockType =
  | "paragraph"
  | "heading"
  | "bullet_list"
  | "numbered_list"
  | "callout"
  | "note"
  | "formula"
  | "illustration"
  | "table"

type Item = {
  id: string
  content: string
  item_type: string | null
  display_order: number
}

type Block = {
  id: string
  section_id: string
  block_type: BlockType | string
  title: string | null
  content: string | null
  display_order: number
  is_published: boolean
  presentation: Record<string, unknown> | null
  items: Item[]
}

type Section = {
  id: string
  title: string
  display_order: number
  is_published: boolean
  topic?: {
    id: string
    title: string
    slug: string
  }
}

const blockLabels: Record<string, string> = {
  paragraph: "Text",
  heading: "Heading",
  bullet_list: "Bullet points",
  numbered_list: "Numbered points",
  callout: "Key point",
  note: "Note",
  formula: "Formula",
  illustration: "Illustration",
  table: "Table",
}

export default function SectionEditor({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const [sectionId, setSectionId] = useState("")
  const [section, setSection] =
    useState<Section | null>(null)
  const [blocks, setBlocks] =
    useState<Block[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState("")
  const [message, setMessage] = useState("")

  useEffect(() => {
    params.then(({ id }) => {
      setSectionId(id)
      load(id)
    })
  }, [params])

  async function load(id: string) {
    try {
      setLoading(true)
      setError("")

      const response = await fetch(
        `/api/admin/education/sections/${id}/editor`,
        {
          cache: "no-store",
        }
      )

      const data = await response.json()

      if (!response.ok) {
        throw new Error(
          data.error ||
            "Unable to load section."
        )
      }

      setSection(data.section)
      setBlocks(
        Array.isArray(data.blocks)
          ? data.blocks
          : []
      )
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Unable to load section."
      )
    } finally {
      setLoading(false)
    }
  }

  async function addBlock(
    blockType: BlockType
  ) {
    if (!sectionId) return

    try {
      setSaving(true)
      setError("")
      setMessage("")

      const response = await fetch(
        `/api/admin/education/sections/${sectionId}/blocks`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            block_type: blockType,
          }),
        }
      )

      const data = await response.json()

      if (!response.ok) {
        throw new Error(
          data.error ||
            "Unable to add block."
        )
      }

      await load(sectionId)
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Unable to add block."
      )
    } finally {
      setSaving(false)
    }
  }

  async function updateBlock(
    block: Block,
    changes: Partial<Block>
  ) {
    try {
      setSaving(true)
      setError("")

      const response = await fetch(
        `/api/admin/education/blocks/${block.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(changes),
        }
      )

      const data = await response.json()

      if (!response.ok) {
        throw new Error(
          data.error ||
            "Unable to update block."
        )
      }

      setBlocks((current) =>
        current.map((item) =>
          item.id === block.id
            ? {
                ...item,
                ...changes,
              }
            : item
        )
      )

      setMessage("Draft saved.")
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Unable to save block."
      )
    } finally {
      setSaving(false)
    }
  }

  async function saveAndPublish() {
    if (!sectionId) return

    try {
      setSaving(true)
      setError("")
      setMessage("")

      /*
       * Save every editable block and explicitly publish it.
       * This is intentionally done at block level because
       * the public Education page reads block publication
       * state.
       */
      for (const block of blocks) {
        const response = await fetch(
          `/api/admin/education/blocks/${block.id}`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              title: block.title || "",
              content: block.content || "",
              presentation:
                block.presentation || {},
              is_published: true,
            }),
          }
        )

        const data = await response.json()

        if (!response.ok) {
          throw new Error(
            data.error ||
              `Unable to save block ${block.id}.`
          )
        }
      }

      /*
       * Publish the section itself as well.
       * Without this, newly-created sections can remain
       * invisible on the public Education page.
       */
      const sectionResponse = await fetch(
        `/api/admin/education/sections/${sectionId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            is_published: true,
          }),
        }
      )

      const sectionData =
        await sectionResponse.json()

      if (!sectionResponse.ok) {
        throw new Error(
          sectionData.error ||
            "Unable to publish section."
        )
      }

      setBlocks((current) =>
        current.map((block) => ({
          ...block,
          is_published: true,
        }))
      )

      setSection((current) =>
        current
          ? {
              ...current,
              is_published: true,
            }
          : current
      )

      setMessage(
        "Changes saved and published successfully."
      )
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Unable to save and publish changes."
      )
    } finally {
      setSaving(false)
    }
  }

  async function deleteBlock(
    block: Block
  ) {
    const confirmed =
      window.confirm(
        "Remove this content block?\n\nThe block will be unpublished rather than permanently deleted."
      )

    if (!confirmed) return

    try {
      setSaving(true)
      setError("")

      const response = await fetch(
        `/api/admin/education/blocks/${block.id}`,
        {
          method: "DELETE",
        }
      )

      const data = await response.json()

      if (!response.ok) {
        throw new Error(
          data.error ||
            "Unable to remove block."
        )
      }

      await load(sectionId)
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Unable to remove block."
      )
    } finally {
      setSaving(false)
    }
  }

  async function moveBlock(
    index: number,
    direction: "up" | "down"
  ) {
    const target =
      direction === "up"
        ? index - 1
        : index + 1

    if (
      target < 0 ||
      target >= blocks.length
    ) {
      return
    }

    const current = blocks[index]
    const other = blocks[target]

    try {
      setSaving(true)
      setError("")

      const response = await fetch(
        `/api/admin/education/blocks/reorder`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            first_id: current.id,
            second_id: other.id,
          }),
        }
      )

      const data = await response.json()

      if (!response.ok) {
        throw new Error(
          data.error ||
            "Unable to reorder blocks."
        )
      }

      await load(sectionId)
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Unable to reorder blocks."
      )
    } finally {
      setSaving(false)
    }
  }

  /*
   * IMPORTANT:
   * The admin editor must show unpublished blocks too.
   * Otherwise newly-created blocks disappear immediately
   * because the creation API initially/previously marked
   * them unpublished.
   *
   * Publication is controlled separately from visibility
   * inside the CMS.
   */
  const activeBlocks = useMemo(
    () => blocks,
    [blocks]
  )

  return (
    <main className="min-h-screen bg-[#F6FAF8] px-4 py-8 sm:px-6">
      {/* CURA ADMINISTRATION HEADER */}
      <header className="-mx-4 -mt-8 mb-8 bg-[#061B3D] text-white sm:-mx-6">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-6 py-4">
          <div className="flex items-center gap-5">
            <div className="flex items-center border-r border-white/15 pr-6">
              <img
                src="/cura-logo.png"
                alt="CURA"
                className="h-10 w-auto object-contain brightness-0 invert"
              />
            </div>

            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-[#18b8ee]">
                CURA Administration
              </p>
              <h1 className="mt-1 text-lg font-semibold text-white">
                Education
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/education"
              className="rounded-lg bg-white px-4 py-2.5 text-sm font-semibold !text-[#071B49] hover:bg-slate-50"
            >
              View Education
            </Link>

            <Link
              href="/admin"
              className="rounded-lg border border-white/30 px-4 py-2.5 text-sm font-semibold text-white hover:bg-white/10"
            >
              Dashboard
            </Link>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-6xl">

        <Link
          href="/admin/education"
          className="text-sm font-semibold text-[#159B78]"
        >
          ← Education Materials
        </Link>

        <div className="mt-5 mb-8">
          <div className="text-xs font-bold uppercase tracking-[0.18em] text-[#159B78]">
            CURA Education · Content Editor
          </div>

          <h1 className="mt-2 text-3xl font-bold text-[#071B49]">
            {loading
              ? "Loading…"
              : section?.title ||
                "Section"}
          </h1>

          {section?.topic && (
            <p className="mt-2 text-sm text-[#71827C]">
              {section.topic.title}
            </p>
          )}
        </div>

        {error && (
          <div className="mb-5 rounded-2xl border border-red-200 bg-red-50 px-5 py-4 text-sm text-red-700">
            {error}
          </div>
        )}

        {message && !error && (
          <div className="mb-5 rounded-2xl border border-[#BDE6D8] bg-[#EEFAF5] px-5 py-4 text-sm text-[#24604F]">
            {message}
          </div>
        )}

        <section className="mb-8 rounded-3xl border border-[#DCE9E4] bg-white p-5 shadow-[0_10px_35px_rgba(20,70,55,0.05)] sm:p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-lg font-bold text-[#071B49]">
                Add Content
              </h2>

              <p className="mt-1 text-xs leading-5 text-[#71827C]">
                Insert a block anywhere in this section.
                Existing content is not replaced.
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              {(
                [
                  ["paragraph", "Text"],
                  ["heading", "Heading"],
                  ["bullet_list", "Bullets"],
                  ["numbered_list", "Numbered"],
                  ["callout", "Key Point"],
                  ["note", "Note"],
                  ["formula", "Formula"],
                  ["illustration", "Illustration"],
                  ["table", "Table"],
                ] as const
              ).map(
                ([type, label]) => (
                  <button
                    key={type}
                    type="button"
                    disabled={saving}
                    onClick={() =>
                      addBlock(type)
                    }
                    className="rounded-xl border border-[#D6E3DE] bg-white px-3 py-2 text-xs font-semibold text-[#355B50] transition hover:border-[#159B78] hover:bg-[#F1FAF6] disabled:opacity-50"
                  >
                    + {label}
                  </button>
                )
              )}
            </div>
          </div>
        </section>

        <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-lg font-bold text-[#071B49]">
              Section Content
            </h2>

            <span className="text-xs text-[#71827C]">
              {activeBlocks.length} blocks
            </span>
          </div>

          <button
            type="button"
            disabled={saving || loading}
            onClick={saveAndPublish}
            className="rounded-xl bg-[#071B49] px-5 py-3 text-sm font-bold !text-white shadow-sm transition hover:bg-[#0B285E] disabled:cursor-not-allowed disabled:opacity-50"
          >
            {saving
              ? "Saving…"
              : "Save & Publish"}
          </button>
        </div>

        {loading ? (
          <div className="rounded-3xl border border-[#DCE9E4] bg-white px-6 py-16 text-center text-sm text-[#71827C]">
            Loading content…
          </div>
        ) : activeBlocks.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-[#C8DBD3] bg-white px-6 py-16 text-center">
            <div className="text-sm font-semibold text-[#355B50]">
              No editable content blocks found.
            </div>

            <div className="mt-2 text-xs text-[#71827C]">
              Add a content block above.
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {activeBlocks.map(
              (block, index) => (
                <article
                  key={block.id}
                  className="rounded-3xl border border-[#DCE9E4] bg-white shadow-[0_8px_28px_rgba(20,70,55,0.04)]"
                >
                  <div className="flex flex-col gap-3 border-b border-[#E7EFEC] px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center gap-3">
                      <span className="flex h-8 min-w-8 items-center justify-center rounded-full bg-[#EAF6F1] px-2 text-xs font-bold text-[#159B78]">
                        {index + 1}
                      </span>

                      <span className="text-xs font-bold uppercase tracking-[0.12em] text-[#6A7E76]">
                        {blockLabels[
                          block.block_type
                        ] ||
                          block.block_type}
                      </span>

                      <span
                        className={`rounded-full px-2 py-1 text-[10px] font-bold uppercase tracking-[0.08em] ${
                          block.is_published
                            ? "bg-[#EAF6F1] text-[#159B78]"
                            : "bg-amber-50 text-amber-700"
                        }`}
                      >
                        {block.is_published
                          ? "Published"
                          : "Draft"}
                      </span>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      <button
                        type="button"
                        disabled={
                          saving ||
                          index === 0
                        }
                        onClick={() =>
                          moveBlock(
                            index,
                            "up"
                          )
                        }
                        className="rounded-lg border border-[#D6E3DE] px-3 py-1.5 text-xs font-semibold text-[#355B50] disabled:opacity-40"
                      >
                        ↑
                      </button>

                      <button
                        type="button"
                        disabled={
                          saving ||
                          index ===
                            activeBlocks.length - 1
                        }
                        onClick={() =>
                          moveBlock(
                            index,
                            "down"
                          )
                        }
                        className="rounded-lg border border-[#D6E3DE] px-3 py-1.5 text-xs font-semibold text-[#355B50] disabled:opacity-40"
                      >
                        ↓
                      </button>

                      <button
                        type="button"
                        disabled={saving}
                        onClick={() =>
                          deleteBlock(
                            block
                          )
                        }
                        className="rounded-lg border border-red-200 px-3 py-1.5 text-xs font-semibold text-red-600 disabled:opacity-40"
                      >
                        Remove
                      </button>
                    </div>
                  </div>

                  <div className="p-5">
                    {block.block_type !==
                      "illustration" &&
                      block.block_type !==
                        "table" && (
                        <textarea
                          value={
                            block.content ||
                            ""
                          }
                          onChange={(
                            event
                          ) => {
                            setBlocks(
                              (current) =>
                                current.map(
                                  (item) =>
                                    item.id ===
                                    block.id
                                      ? {
                                          ...item,
                                          content:
                                            event
                                              .target
                                              .value,
                                        }
                                      : item
                                )
                            )
                          }}
                          onBlur={() =>
                            updateBlock(
                              block,
                              {
                                content:
                                  block.content ||
                                  "",
                              }
                            )
                          }
                          rows={
                            block.block_type ===
                              "formula"
                              ? 3
                              : 6
                          }
                          placeholder={
                            block.block_type ===
                            "heading"
                              ? "Heading"
                              : "Enter content…"
                          }
                          className={`w-full resize-y rounded-2xl border border-[#D6E3DE] bg-[#FBFDFC] px-4 py-3 text-sm leading-7 text-[#071B49] outline-none focus:border-[#159B78] ${
                            block.block_type ===
                            "formula"
                              ? "font-mono"
                              : ""
                          }`}
                        />
                      )}

                    {block.block_type ===
                      "illustration" && (
                      <IllustrationEditor
                        block={block}
                        onSaved={() =>
                          load(
                            sectionId
                          )
                        }
                      />
                    )}

                    {block.block_type ===
                      "table" && (
                      <TableEditor
                        block={block}
                        onSaved={() =>
                          load(
                            sectionId
                          )
                        }
                      />
                    )}

                    {(
                      block.block_type ===
                        "bullet_list" ||
                      block.block_type ===
                        "numbered_list"
                    ) && (
                      <div className="mt-4 rounded-2xl bg-[#F7FAF8] p-4">
                        <div className="mb-3 text-xs font-bold uppercase tracking-[0.12em] text-[#159B78]">
                          {block.block_type ===
                          "bullet_list"
                            ? "Bullet Points"
                            : "Numbered Points"}
                        </div>

                        {block.items.length ===
                        0 ? (
                          <div className="text-xs text-[#71827C]">
                            No items yet.
                          </div>
                        ) : (
                          <div className="space-y-2">
                            {block.items.map(
                              (
                                item,
                                itemIndex
                              ) => (
                                <div
                                  key={
                                    item.id
                                  }
                                  className="flex gap-3"
                                >
                                  <div className="pt-2 text-xs font-bold text-[#159B78]">
                                    {block.block_type ===
                                    "numbered_list"
                                      ? `${itemIndex + 1}.`
                                      : "•"}
                                  </div>

                                  <textarea
                                    value={
                                      item.content
                                    }
                                    onChange={(
                                      event
                                    ) => {
                                      setBlocks(
                                        (
                                          current
                                        ) =>
                                          current.map(
                                            (
                                              blockItem
                                            ) =>
                                              blockItem.id ===
                                              block.id
                                                ? {
                                                    ...blockItem,
                                                    items:
                                                      blockItem.items.map(
                                                        (
                                                          row
                                                        ) =>
                                                          row.id ===
                                                          item.id
                                                            ? {
                                                                ...row,
                                                                content:
                                                                  event
                                                                    .target
                                                                    .value,
                                                              }
                                                            : row
                                                      ),
                                                  }
                                                : blockItem
                                          )
                                      )
                                    }}
                                    onBlur={async () => {
                                      await fetch(
                                        `/api/admin/education/block-items/${item.id}`,
                                        {
                                          method:
                                            "PATCH",
                                          headers:
                                            {
                                              "Content-Type":
                                                "application/json",
                                            },
                                          body: JSON.stringify(
                                            {
                                              content:
                                                item.content,
                                            }
                                          ),
                                        }
                                      )
                                      setMessage(
                                        "Saved."
                                      )
                                    }}
                                    rows={2}
                                    className="flex-1 rounded-xl border border-[#D6E3DE] bg-white px-3 py-2 text-sm leading-6 text-[#071B49] outline-none focus:border-[#159B78]"
                                  />
                                </div>
                              )
                            )}
                          </div>
                        )}

                        <button
                          type="button"
                          onClick={async () => {
                            await fetch(
                              `/api/admin/education/blocks/${block.id}/items`,
                              {
                                method:
                                  "POST",
                                headers: {
                                  "Content-Type":
                                    "application/json",
                                },
                                body: JSON.stringify(
                                  {
                                    content:
                                      "",
                                    item_type:
                                      "item",
                                  }
                                ),
                              }
                            )

                            await load(
                              sectionId
                            )
                          }}
                          className="mt-4 rounded-lg bg-[#E9F6F1] px-3 py-2 text-xs font-bold text-[#159B78]"
                        >
                          + Add Point
                        </button>
                      </div>
                    )}
                  </div>
                </article>
              )
            )}
          </div>
        )}
      </div>
    </main>
  )
}


function IllustrationEditor({
  block,
  onSaved,
}: {
  block: Block
  onSaved: () => void
}) {
  const [file, setFile] =
    useState<File | null>(null)

  const [previewUrl, setPreviewUrl] =
    useState("")

  const [currentUrl, setCurrentUrl] =
    useState("")

  const [caption, setCaption] =
    useState("")

  const [altText, setAltText] =
    useState("")

  const [loading, setLoading] =
    useState(true)

  const [saving, setSaving] =
    useState(false)

  const [removing, setRemoving] =
    useState(false)

  useEffect(() => {
    load()
  }, [block.id])

  async function load() {
    try {
      setLoading(true)

      const response = await fetch(
        `/api/admin/education/blocks/${block.id}/illustration`,
        {
          cache: "no-store",
        }
      )

      if (!response.ok) {
        return
      }

      const data =
        await response.json()

      if (data.asset) {
        setCurrentUrl(
          data.asset.url || ""
        )

        setCaption(
          data.asset.caption || ""
        )

        setAltText(
          data.asset.alt_text || ""
        )
      }
    } finally {
      setLoading(false)
    }
  }

  function chooseFile(
    selected: File | null
  ) {
    setFile(selected)

    if (previewUrl) {
      URL.revokeObjectURL(
        previewUrl
      )
    }

    if (selected) {
      setPreviewUrl(
        URL.createObjectURL(
          selected
        )
      )
    } else {
      setPreviewUrl("")
    }
  }

  async function save() {
    if (!file && !currentUrl) {
      window.alert(
        "Choose an illustration first."
      )
      return
    }

    try {
      setSaving(true)

      let imageUrl =
        currentUrl

      /*
       * Upload the selected file first.
       */
      if (file) {
        const formData =
          new FormData()

        formData.append(
          "file",
          file
        )

        formData.append(
          "block_id",
          block.id
        )

        const uploadResponse =
          await fetch(
            "/api/admin/education/media",
            {
              method: "POST",
              body: formData,
            }
          )

        const uploadData =
          await uploadResponse.json()

        if (
          !uploadResponse.ok
        ) {
          throw new Error(
            uploadData.error ||
              "Unable to upload illustration."
          )
        }

        imageUrl =
          uploadData.url
      }

      /*
       * Connect the resulting public URL
       * to this exact illustration block.
       */
      const saveResponse =
        await fetch(
          `/api/admin/education/blocks/${block.id}/illustration`,
          {
            method: "POST",
            headers: {
              "Content-Type":
                "application/json",
            },
            body: JSON.stringify({
              url: imageUrl,
              caption:
                caption.trim(),
              alt_text:
                altText.trim(),
            }),
          }
        )

      const saveData =
        await saveResponse.json()

      if (!saveResponse.ok) {
        throw new Error(
          saveData.error ||
            "Unable to save illustration."
        )
      }

      setFile(null)
      setPreviewUrl("")

      await load()
      onSaved()
    } catch (error) {
      window.alert(
        error instanceof Error
          ? error.message
          : "Unable to save illustration."
      )
    } finally {
      setSaving(false)
    }
  }

  async function remove() {
    if (
      !window.confirm(
        "Remove this illustration from this section?"
      )
    ) {
      return
    }

    try {
      setRemoving(true)

      const response =
        await fetch(
          `/api/admin/education/blocks/${block.id}/illustration`,
          {
            method: "DELETE",
          }
        )

      const data =
        await response.json()

      if (!response.ok) {
        throw new Error(
          data.error ||
            "Unable to remove illustration."
        )
      }

      setCurrentUrl("")
      setCaption("")
      setAltText("")
      setFile(null)
      setPreviewUrl("")

      onSaved()
    } catch (error) {
      window.alert(
        error instanceof Error
          ? error.message
          : "Unable to remove illustration."
      )
    } finally {
      setRemoving(false)
    }
  }

  const displayedImage =
    previewUrl ||
    currentUrl

  return (
    <div className="rounded-3xl border border-[#D6E3DE] bg-[#FBFDFC] p-5">
      <div className="mb-5">
        <div className="text-sm font-bold text-[#071B49]">
          Illustration
        </div>

        <p className="mt-1 text-xs leading-5 text-[#71827C]">
          Upload an illustration and place it exactly
          where this block appears in the section.
        </p>
      </div>

      {loading ? (
        <div className="mb-5 rounded-2xl bg-white px-5 py-10 text-center text-xs text-[#71827C]">
          Loading illustration…
        </div>
      ) : displayedImage ? (
        <div className="mb-5 overflow-hidden rounded-2xl border border-[#DCE9E4] bg-white">
          <div className="flex min-h-[220px] items-center justify-center bg-[#F4F8F6] p-5">
            <img
              src={displayedImage}
              alt={
                altText ||
                caption ||
                "CURA illustration"
              }
              className="max-h-[420px] max-w-full object-contain"
            />
          </div>

          {caption && (
            <div className="border-t border-[#E7EFEC] px-5 py-3 text-center text-xs leading-5 text-[#61756D]">
              {caption}
            </div>
          )}
        </div>
      ) : null}

      <div className="space-y-4">

        <div>
          <label className="mb-2 block text-xs font-bold text-[#355B50]">
            Upload illustration
          </label>

          <label className="flex cursor-pointer items-center justify-center rounded-2xl border-2 border-dashed border-[#BFD8CE] bg-white px-5 py-8 text-center transition hover:border-[#159B78] hover:bg-[#F7FCF9]">
            <div>
              <div className="text-sm font-bold text-[#159B78]">
                {file
                  ? file.name
                  : "Choose image"}
              </div>

              <div className="mt-1 text-xs text-[#71827C]">
                PNG, JPG, JPEG or WebP
              </div>

              <input
                type="file"
                accept="image/png,image/jpeg,image/webp"
                className="sr-only"
                onChange={(event) => {
                  chooseFile(
                    event.target.files?.[0] ||
                      null
                  )
                }}
              />
            </div>
          </label>
        </div>

        <div>
          <label className="mb-2 block text-xs font-bold text-[#355B50]">
            Caption
          </label>

          <input
            value={caption}
            onChange={(event) =>
              setCaption(
                event.target.value
              )
            }
            placeholder="Illustration caption"
            className="w-full rounded-xl border border-[#D6E3DE] bg-white px-4 py-3 text-sm text-[#071B49] outline-none focus:border-[#159B78]"
          />
        </div>

        <div>
          <label className="mb-2 block text-xs font-bold text-[#355B50]">
            Accessibility description
          </label>

          <input
            value={altText}
            onChange={(event) =>
              setAltText(
                event.target.value
              )
            }
            placeholder="Describe the illustration for accessibility"
            className="w-full rounded-xl border border-[#D6E3DE] bg-white px-4 py-3 text-sm text-[#071B49] outline-none focus:border-[#159B78]"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            disabled={
              saving ||
              (!file && !currentUrl)
            }
            onClick={save}
            className="rounded-xl bg-[#159B78] px-5 py-3 text-sm font-bold text-white disabled:opacity-50"
          >
            {saving
              ? "Uploading…"
              : currentUrl
                ? "Replace & Save"
                : "Upload & Save"}
          </button>

          {currentUrl && (
            <button
              type="button"
              disabled={removing}
              onClick={remove}
              className="rounded-xl border border-red-200 px-5 py-3 text-sm font-semibold text-red-600 disabled:opacity-50"
            >
              {removing
                ? "Removing…"
                : "Remove Illustration"}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}


function TableEditor({
  block,
  onSaved,
}: {
  block: Block
  onSaved: () => void
}) {
  const [caption, setCaption] = useState("")
  const [columns, setColumns] =
    useState(["Column 1", "Column 2"])
  const [rows, setRows] =
    useState([
      ["", ""],
      ["", ""],
    ])
  const [saving, setSaving] =
    useState(false)

  async function save() {
    try {
      setSaving(true)

      const response = await fetch(
        `/api/admin/education/blocks/${block.id}/table`,
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            columns,
            rows,
            caption,
          }),
        }
      )

      const data = await response.json()

      if (!response.ok) {
        throw new Error(
          data.error ||
            "Unable to save table."
        )
      }

      onSaved()
    } catch (error) {
      window.alert(
        error instanceof Error
          ? error.message
          : "Unable to save table."
      )
    } finally {
      setSaving(false)
    }
  }

  function addColumn() {
    setColumns((current) => [
      ...current,
      `Column ${current.length + 1}`,
    ])

    setRows((current) =>
      current.map((row) => [
        ...row,
        "",
      ])
    )
  }

  function removeColumn(
    columnIndex: number
  ) {
    if (columns.length <= 1) return

    setColumns((current) =>
      current.filter(
        (_, index) =>
          index !== columnIndex
      )
    )

    setRows((current) =>
      current.map((row) =>
        row.filter(
          (_, index) =>
            index !== columnIndex
        )
      )
    )
  }

  function addRow() {
    setRows((current) => [
      ...current,
      columns.map(() => ""),
    ])
  }

  function removeRow(
    rowIndex: number
  ) {
    if (rows.length <= 1) return

    setRows((current) =>
      current.filter(
        (_, index) =>
          index !== rowIndex
      )
    )
  }

  return (
    <div className="rounded-2xl border border-[#D6E3DE] bg-[#FBFDFC] p-4">
      <div className="mb-4 flex items-center justify-between gap-4">
        <div>
          <div className="text-sm font-bold text-[#071B49]">
            Table Editor
          </div>

          <div className="mt-1 text-xs text-[#71827C]">
            Edit rows and columns directly.
          </div>
        </div>

        <button
          type="button"
          onClick={save}
          disabled={saving}
          className="rounded-xl bg-[#159B78] px-4 py-2 text-xs font-bold text-white disabled:opacity-50"
        >
          {saving
            ? "Saving…"
            : "Save Table"}
        </button>
      </div>

      <input
        value={caption}
        onChange={(event) =>
          setCaption(event.target.value)
        }
        placeholder="Table caption (optional)"
        className="mb-4 w-full rounded-xl border border-[#D6E3DE] px-4 py-3 text-sm outline-none focus:border-[#159B78]"
      />

      <div className="overflow-x-auto rounded-xl border border-[#DCE9E4] bg-white">
        <table className="min-w-[620px] w-full border-collapse text-sm">
          <thead>
            <tr>
              {columns.map(
                (column, index) => (
                  <th
                    key={index}
                    className="border-b border-r border-[#DCE9E4] bg-[#EAF6F1] p-2 text-left align-top"
                  >
                    <input
                      value={column}
                      onChange={(event) =>
                        setColumns(
                          (current) =>
                            current.map(
                              (
                                item,
                                itemIndex
                              ) =>
                                itemIndex ===
                                index
                                  ? event
                                      .target
                                      .value
                                  : item
                            )
                        )
                      }
                      className="w-full bg-transparent font-bold text-[#071B49] outline-none"
                    />

                    <button
                      type="button"
                      onClick={() =>
                        removeColumn(
                          index
                        )
                      }
                      className="mt-1 text-[10px] font-semibold text-red-600"
                    >
                      Remove column
                    </button>
                  </th>
                )
              )}
            </tr>
          </thead>

          <tbody>
            {rows.map(
              (row, rowIndex) => (
                <tr key={rowIndex}>
                  {row.map(
                    (
                      cell,
                      columnIndex
                    ) => (
                      <td
                        key={columnIndex}
                        className="border-b border-r border-[#E7EFEC] p-2 align-top"
                      >
                        <textarea
                          value={cell}
                          onChange={(
                            event
                          ) =>
                            setRows(
                              (current) =>
                                current.map(
                                  (
                                    currentRow,
                                    currentRowIndex
                                  ) =>
                                    currentRowIndex ===
                                    rowIndex
                                      ? currentRow.map(
                                          (
                                            currentCell,
                                            currentCellIndex
                                          ) =>
                                            currentCellIndex ===
                                            columnIndex
                                              ? event
                                                  .target
                                                  .value
                                              : currentCell
                                        )
                                      : currentRow
                                )
                            )
                          }
                          rows={2}
                          className="w-full resize-none bg-transparent text-sm leading-6 text-[#071B49] outline-none"
                        />
                      </td>
                    )
                  )}

                  <td className="border-b border-[#E7EFEC] p-2 align-top">
                    <button
                      type="button"
                      onClick={() =>
                        removeRow(
                          rowIndex
                        )
                      }
                      className="text-[10px] font-semibold text-red-600"
                    >
                      Remove row
                    </button>
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={addRow}
          className="rounded-lg bg-[#EAF6F1] px-3 py-2 text-xs font-bold text-[#159B78]"
        >
          + Add Row
        </button>

        <button
          type="button"
          onClick={addColumn}
          className="rounded-lg bg-[#EAF6F1] px-3 py-2 text-xs font-bold text-[#159B78]"
        >
          + Add Column
        </button>
      </div>
    </div>
  )
}
