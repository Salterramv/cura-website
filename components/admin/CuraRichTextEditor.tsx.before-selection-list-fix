"use client"

import { useEffect, useRef, useState } from "react"

type Props = {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  minHeight?: string
}

const buttonClass =
  "rounded-md border border-slate-300 bg-white px-3 py-1.5 text-sm font-medium text-slate-700 hover:bg-slate-100"

const COLORS = [
  {
    name: "CURA Navy",
    value: "#071B49",
  },
  {
    name: "CURA Blue",
    value: "#168BC4",
  },
  {
    name: "CURA Cyan",
    value: "#18B8EE",
  },
  {
    name: "CURA Green",
    value: "#159B78",
  },
  {
    name: "Black",
    value: "#000000",
  },
  {
    name: "Dark Grey",
    value: "#475569",
  },
  {
    name: "Grey",
    value: "#64748B",
  },
  {
    name: "Red",
    value: "#DC2626",
  },
  {
    name: "Orange",
    value: "#EA580C",
  },
  {
    name: "Yellow",
    value: "#CA8A04",
  },
  {
    name: "Purple",
    value: "#7C3AED",
  },
  {
    name: "Pink",
    value: "#DB2777",
  },
]

export default function CuraRichTextEditor({
  value,
  onChange,
  placeholder = "Enter content...",
  minHeight = "220px",
}: Props) {
  const editorRef = useRef<HTMLDivElement>(null)
  const [showPalette, setShowPalette] = useState(false)

  useEffect(() => {
    if (!editorRef.current) return

    if (editorRef.current.innerHTML !== value) {
      editorRef.current.innerHTML = value || ""
    }
  }, [value])

  function update() {
    if (!editorRef.current) return

    onChange(editorRef.current.innerHTML)
  }

  function exec(
    command: string,
    commandValue?: string,
  ) {
    editorRef.current?.focus()

    document.execCommand(
      command,
      false,
      commandValue,
    )

    update()
  }

  function applyColor(color: string) {
    editorRef.current?.focus()

    document.execCommand(
      "foreColor",
      false,
      color,
    )

    update()
    setShowPalette(false)
  }

  function applyFontSize(px: number) {
    editorRef.current?.focus()

    document.execCommand(
      "fontSize",
      false,
      "7",
    )

    const fonts =
      editorRef.current?.querySelectorAll(
        'font[size="7"]',
      )

    fonts?.forEach((font) => {
      const span =
        document.createElement("span")

      span.style.fontSize =
        `${px}px`

      span.innerHTML =
        font.innerHTML

      font.replaceWith(span)
    })

    update()
  }

  function insertLink() {
    const url = window.prompt(
      "Enter URL:",
    )

    if (!url) return

    exec(
      "createLink",
      url,
    )
  }

  function clearFormatting() {
    exec("removeFormat")
  }

  function applyUnorderedList() {
    editorRef.current?.focus()

    document.execCommand(
      "insertUnorderedList",
      false,
    )

    update()
  }

  function applyOrderedList() {
    editorRef.current?.focus()

    document.execCommand(
      "insertOrderedList",
      false,
    )

    update()
  }

  return (
    <div className="overflow-visible rounded-xl border border-slate-300 bg-white">

      {/* =====================================================
          TOOLBAR
          ===================================================== */}

      <div className="relative flex flex-wrap gap-2 border-b border-slate-200 bg-slate-50 p-3">

        {/* BOLD */}

        <button
          type="button"
          className={`${buttonClass} font-bold`}
          onMouseDown={(e) =>
            e.preventDefault()
          }
          onClick={() =>
            exec("bold")
          }
          title="Bold"
        >
          B
        </button>

        {/* ITALIC */}

        <button
          type="button"
          className={`${buttonClass} italic`}
          onMouseDown={(e) =>
            e.preventDefault()
          }
          onClick={() =>
            exec("italic")
          }
          title="Italic"
        >
          I
        </button>

        {/* UNDERLINE */}

        <button
          type="button"
          className={`${buttonClass} underline`}
          onMouseDown={(e) =>
            e.preventDefault()
          }
          onClick={() =>
            exec("underline")
          }
          title="Underline"
        >
          U
        </button>

        {/* FONT SIZE */}

        <select
          defaultValue=""
          aria-label="Font size"
          className="rounded-md border border-slate-300 bg-white px-2 py-1.5 text-sm text-slate-700"
          onMouseDown={(e) =>
            e.stopPropagation()
          }
          onChange={(e) => {
            if (!e.target.value) return

            applyFontSize(
              Number(e.target.value),
            )

            e.target.value = ""
          }}
        >
          <option value="">
            Font size
          </option>
          <option value="12">
            12px
          </option>
          <option value="14">
            14px
          </option>
          <option value="16">
            16px
          </option>
          <option value="18">
            18px
          </option>
          <option value="20">
            20px
          </option>
          <option value="24">
            24px
          </option>
          <option value="28">
            28px
          </option>
          <option value="32">
            32px
          </option>
          <option value="36">
            36px
          </option>
        </select>

        {/* =================================================
            COLOUR PALETTE
            ================================================= */}

        <div className="relative">

          <button
            type="button"
            className={buttonClass}
            onMouseDown={(e) =>
              e.preventDefault()
            }
            onClick={() =>
              setShowPalette(
                (current) =>
                  !current,
              )
            }
            title="Text colour"
          >
            <span className="font-bold">
              A
            </span>{" "}
            <span className="text-[#18B8EE]">
              Colour
            </span>
          </button>

          {showPalette && (
            <div
              className="
                absolute
                left-0
                top-full
                z-50
                mt-2
                w-64
                rounded-xl
                border
                border-slate-200
                bg-white
                p-3
                shadow-xl
              "
              onMouseDown={(e) =>
                e.preventDefault()
              }
            >

              <div className="mb-2 text-xs font-bold uppercase tracking-[0.15em] text-slate-500">
                Text colour
              </div>

              <div className="grid grid-cols-6 gap-2">

                {COLORS.map(
                  (color) => (
                    <button
                      key={
                        color.value
                      }
                      type="button"
                      aria-label={
                        color.name
                      }
                      title={
                        color.name
                      }
                      className="
                        h-8
                        w-8
                        rounded-full
                        border
                        border-slate-300
                        shadow-sm
                        transition
                        hover:scale-110
                        hover:ring-2
                        hover:ring-[#18B8EE]/40
                      "
                      style={{
                        backgroundColor:
                          color.value,
                      }}
                      onMouseDown={(
                        e,
                      ) =>
                        e.preventDefault()
                      }
                      onClick={() =>
                        applyColor(
                          color.value,
                        )
                      }
                    />
                  ),
                )}

              </div>

              <div className="mt-3 border-t border-slate-100 pt-3">

                <label className="flex cursor-pointer items-center gap-2 text-xs font-medium text-slate-600">

                  <span>
                    Custom colour
                  </span>

                  <input
                    type="color"
                    defaultValue="#071B49"
                    className="
                      h-8
                      w-10
                      cursor-pointer
                      rounded
                      border
                      border-slate-300
                      bg-white
                      p-0.5
                    "
                    onMouseDown={(e) =>
                      e.preventDefault()
                    }
                    onChange={(e) =>
                      applyColor(
                        e.target.value,
                      )
                    }
                  />

                </label>

              </div>

            </div>
          )}

        </div>

        {/* H2 */}

        <button
          type="button"
          className={buttonClass}
          onMouseDown={(e) =>
            e.preventDefault()
          }
          onClick={() =>
            exec(
              "formatBlock",
              "h2",
            )
          }
          title="Heading 2"
        >
          H2
        </button>

        {/* H3 */}

        <button
          type="button"
          className={buttonClass}
          onMouseDown={(e) =>
            e.preventDefault()
          }
          onClick={() =>
            exec(
              "formatBlock",
              "h3",
            )
          }
          title="Heading 3"
        >
          H3
        </button>

        {/* BULLET LIST */}

        <button
          type="button"
          className={buttonClass}
          onMouseDown={(e) =>
            e.preventDefault()
          }
          onClick={
            applyUnorderedList
          }
          title="Bullet list"
        >
          • List
        </button>

        {/* NUMBERED LIST */}

        <button
          type="button"
          className={buttonClass}
          onMouseDown={(e) =>
            e.preventDefault()
          }
          onClick={
            applyOrderedList
          }
          title="Numbered list"
        >
          1. List
        </button>

        {/* LINK */}

        <button
          type="button"
          className={buttonClass}
          onMouseDown={(e) =>
            e.preventDefault()
          }
          onClick={insertLink}
          title="Insert link"
        >
          Link
        </button>

        {/* CLEAR */}

        <button
          type="button"
          className={buttonClass}
          onMouseDown={(e) =>
            e.preventDefault()
          }
          onClick={
            clearFormatting
          }
          title="Clear formatting"
        >
          Clear
        </button>

      </div>

      {/* =====================================================
          EDITOR
          ===================================================== */}

      <div
        ref={editorRef}
        contentEditable
        suppressContentEditableWarning
        data-placeholder={
          placeholder
        }
        onInput={update}
        className="
          min-h-[220px]
          max-w-none
          px-5
          py-4
          text-sm
          leading-7
          text-[#102A5F]
          outline-none

          [&_p]:mb-4

          [&_strong]:font-bold
          [&_b]:font-bold

          [&_u]:underline

          [&_h2]:
            mb-4
          [&_h2]:
            mt-6
          [&_h2]:
            text-2xl
          [&_h2]:
            font-bold
          [&_h2]:
            text-[#071B49]

          [&_h3]:
            mb-3
          [&_h3]:
            mt-5
          [&_h3]:
            text-xl
          [&_h3]:
            font-semibold
          [&_h3]:
            text-[#071B49]

          [&_ul]:
            mb-4
          [&_ul]:
            ml-6
          [&_ul]:
            list-disc
          [&_ul]:
            pl-6

          [&_ol]:
            mb-4
          [&_ol]:
            ml-6
          [&_ol]:
            list-decimal
          [&_ol]:
            pl-6

          [&_li]:
            mb-1

          [&_a]:
            text-[#168BC4]
          [&_a]:
            underline
        "
        style={{
          minHeight,
        }}
      />

    </div>
  )
}
