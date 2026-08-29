"use client"

import {
  useEffect,
  useRef,
  useState,
} from "react"

type Props = {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  minHeight?: string
}

const buttonClass =
  "rounded-md border border-slate-300 bg-white px-3 py-1.5 text-sm font-medium text-slate-700 hover:bg-slate-100"

const COLORS = [
  { name: "CURA Navy", value: "#071B49" },
  { name: "CURA Blue", value: "#168BC4" },
  { name: "CURA Cyan", value: "#18B8EE" },
  { name: "CURA Green", value: "#159B78" },
  { name: "Black", value: "#000000" },
  { name: "Dark Grey", value: "#475569" },
  { name: "Grey", value: "#64748B" },
  { name: "Red", value: "#DC2626" },
  { name: "Orange", value: "#EA580C" },
  { name: "Yellow", value: "#CA8A04" },
  { name: "Purple", value: "#7C3AED" },
  { name: "Pink", value: "#DB2777" },
]

export default function CuraRichTextEditor({
  value,
  onChange,
  placeholder = "Enter content...",
  minHeight = "220px",
}: Props) {
  const editorRef = useRef<HTMLDivElement>(null)
  const savedRangeRef = useRef<Range | null>(null)

  const [showPalette, setShowPalette] =
    useState(false)

  /*
   * --------------------------------------------------------
   * KEEP THE CURRENT TEXT SELECTION
   * --------------------------------------------------------
   */

  function saveSelection() {
    const editor = editorRef.current
    const selection = window.getSelection()

    if (
      !editor ||
      !selection ||
      selection.rangeCount === 0
    ) {
      return
    }

    const range = selection.getRangeAt(0)

    if (
      editor.contains(
        range.commonAncestorContainer,
      )
    ) {
      savedRangeRef.current =
        range.cloneRange()
    }
  }

  function restoreSelection() {
    const selection = window.getSelection()
    const range = savedRangeRef.current

    if (!selection || !range) {
      return
    }

    selection.removeAllRanges()
    selection.addRange(range)
  }

  function handleToolbarMouseDown(
    event: React.MouseEvent<HTMLButtonElement>,
  ) {
    event.preventDefault()
    saveSelection()
  }

  /*
   * --------------------------------------------------------
   * LOAD CONTENT
   * --------------------------------------------------------
   */

  useEffect(() => {
    if (!editorRef.current) {
      return
    }

    if (
      editorRef.current.innerHTML !== value
    ) {
      editorRef.current.innerHTML =
        value || ""
    }
  }, [value])

  /*
   * --------------------------------------------------------
   * UPDATE VALUE
   * --------------------------------------------------------
   */

  function update() {
    if (!editorRef.current) {
      return
    }

    onChange(
      editorRef.current.innerHTML,
    )

    saveSelection()
  }

  /*
   * --------------------------------------------------------
   * EXECUTE FORMATTING COMMAND
   * --------------------------------------------------------
   */

  function exec(
    command: string,
    commandValue?: string,
  ) {
    editorRef.current?.focus()
    restoreSelection()

    document.execCommand(
      command,
      false,
      commandValue,
    )

    update()
  }

  /*
   * --------------------------------------------------------
   * TEXT COLOUR
   * --------------------------------------------------------
   */

  function applyColor(color: string) {
    editorRef.current?.focus()
    restoreSelection()

    document.execCommand(
      "foreColor",
      false,
      color,
    )

    update()
    setShowPalette(false)
  }

  /*
   * --------------------------------------------------------
   * FONT SIZE
   * --------------------------------------------------------
   */

  function applyFontSize(px: number) {
    editorRef.current?.focus()
    restoreSelection()

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

  /*
   * --------------------------------------------------------
   * BULLET LIST
   * --------------------------------------------------------
   */

  function applyUnorderedList() {
    editorRef.current?.focus()
    restoreSelection()

    document.execCommand(
      "insertUnorderedList",
      false,
    )

    update()
  }

  /*
   * --------------------------------------------------------
   * NUMBERED LIST
   * --------------------------------------------------------
   */

  function applyOrderedList() {
    editorRef.current?.focus()
    restoreSelection()

    document.execCommand(
      "insertOrderedList",
      false,
    )

    update()
  }

  /*
   * --------------------------------------------------------
   * LINK
   * --------------------------------------------------------
   */

  function insertLink() {
    const url = window.prompt(
      "Enter URL:",
    )

    if (!url) {
      return
    }

    exec(
      "createLink",
      url,
    )
  }

  /*
   * --------------------------------------------------------
   * CLEAR FORMATTING
   * --------------------------------------------------------
   */

  function clearFormatting() {
    exec("removeFormat")
  }

  /*
   * --------------------------------------------------------
   * RENDER
   * --------------------------------------------------------
   */

  return (
    <div className="overflow-visible rounded-xl border border-slate-300 bg-white">

      {/* ==================================================
          TOOLBAR
          ================================================== */}

      <div className="relative flex flex-wrap gap-2 border-b border-slate-200 bg-slate-50 p-3">

        {/* BOLD */}

        <button
          type="button"
          className={`${buttonClass} font-bold`}
          onMouseDown={handleToolbarMouseDown}
          onClick={() => exec("bold")}
          title="Bold"
        >
          B
        </button>

        {/* ITALIC */}

        <button
          type="button"
          className={`${buttonClass} italic`}
          onMouseDown={handleToolbarMouseDown}
          onClick={() => exec("italic")}
          title="Italic"
        >
          I
        </button>

        {/* UNDERLINE */}

        <button
          type="button"
          className={`${buttonClass} underline`}
          onMouseDown={handleToolbarMouseDown}
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
          onMouseDown={() => {
            saveSelection()
          }}
          onChange={(event) => {
            const value =
              event.target.value

            if (!value) {
              return
            }

            applyFontSize(
              Number(value),
            )

            event.target.value = ""
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
            onMouseDown={(event) => {
              event.preventDefault()
              saveSelection()
            }}
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
              className="absolute left-0 top-full z-50 mt-2 w-64 rounded-xl border border-slate-200 bg-white p-3 shadow-xl"
              onMouseDown={(event) => {
                event.preventDefault()
              }}
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
                      className="h-8 w-8 rounded-full border border-slate-300 shadow-sm transition hover:scale-110 hover:ring-2 hover:ring-[#18B8EE]/40"
                      style={{
                        backgroundColor:
                          color.value,
                      }}
                      onMouseDown={(
                        event,
                      ) => {
                        event.preventDefault()
                        saveSelection()
                      }}
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
                    className="h-8 w-10 cursor-pointer rounded border border-slate-300 bg-white p-0.5"
                    onMouseDown={(
                      event,
                    ) => {
                      event.preventDefault()
                      saveSelection()
                    }}
                    onChange={(
                      event,
                    ) =>
                      applyColor(
                        event.target
                          .value,
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
          onMouseDown={handleToolbarMouseDown}
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
          onMouseDown={handleToolbarMouseDown}
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

        {/* BULLETS */}

        <button
          type="button"
          className={buttonClass}
          onMouseDown={handleToolbarMouseDown}
          onClick={
            applyUnorderedList
          }
          title="Bullet list"
        >
          • List
        </button>

        {/* NUMBERING */}

        <button
          type="button"
          className={buttonClass}
          onMouseDown={handleToolbarMouseDown}
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
          onMouseDown={handleToolbarMouseDown}
          onClick={insertLink}
          title="Insert link"
        >
          Link
        </button>

        {/* CLEAR */}

        <button
          type="button"
          className={buttonClass}
          onMouseDown={handleToolbarMouseDown}
          onClick={
            clearFormatting
          }
          title="Clear formatting"
        >
          Clear
        </button>

      </div>

      {/* ==================================================
          EDITOR
          ================================================== */}

      <div
        ref={editorRef}
        contentEditable
        suppressContentEditableWarning
        data-placeholder={
          placeholder
        }
        onInput={update}
        onKeyUp={saveSelection}
        onMouseUp={saveSelection}
        className="
          min-h-[220px]
          max-w-none
          px-5
          py-4
          text-sm
          leading-7
          text-[#102A5F]
          outline-none
        "
        style={{
          minHeight,
        }}
      />

      {/* ==================================================
          EDITOR LIST / FORMAT CSS
          ================================================== */}

      <div className="hidden">
        <ul className="list-disc" />
        <ol className="list-decimal" />
      </div>

    </div>
  )
}
