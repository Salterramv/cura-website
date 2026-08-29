"use client"

import { useEffect, useRef } from "react"

type Props = {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  minHeight?: string
}

const buttonClass =
  "rounded-md border border-slate-300 bg-white px-3 py-1.5 text-sm font-medium text-slate-700 hover:bg-slate-100"

export default function CuraRichTextEditor({
  value,
  onChange,
  placeholder = "Enter content...",
  minHeight = "220px",
}: Props) {
  const editorRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!editorRef.current) return

    if (editorRef.current.innerHTML !== value) {
      editorRef.current.innerHTML = value || ""
    }
  }, [value])

  function exec(command: string, commandValue?: string) {
    editorRef.current?.focus()

    document.execCommand(
      command,
      false,
      commandValue
    )

    update()
  }

  function update() {
    if (!editorRef.current) return
    onChange(editorRef.current.innerHTML)
  }

  function changeColor() {
    const color = window.prompt(
      "Enter text colour (for example #071B49 or #18B8EE):",
      "#071B49"
    )

    if (!color) return

    exec("foreColor", color)
  }

  function changeSize() {
    const size = window.prompt(
      "Enter font size (10–36px):",
      "16"
    )

    if (!size) return

    const px = Number(size)

    if (!Number.isFinite(px) || px < 10 || px > 36) {
      window.alert("Please enter a font size between 10 and 36.")
      return
    }

    /*
     * execCommand fontSize uses browser-relative values.
     * We temporarily use <font size="7"> and convert it
     * to an explicit px span.
     */
    editorRef.current?.focus()

    document.execCommand(
      "fontSize",
      false,
      "7"
    )

    const fonts =
      editorRef.current?.querySelectorAll(
        'font[size="7"]'
      )

    fonts?.forEach((font) => {
      const span = document.createElement("span")
      span.style.fontSize = `${px}px`
      span.innerHTML = font.innerHTML
      font.replaceWith(span)
    })

    update()
  }

  function insertLink() {
    const url = window.prompt(
      "Enter URL:"
    )

    if (!url) return

    exec("createLink", url)
  }

  function clearFormatting() {
    exec("removeFormat")
  }

  return (
    <div className="overflow-hidden rounded-xl border border-slate-300 bg-white">

      <div className="flex flex-wrap gap-2 border-b border-slate-200 bg-slate-50 p-3">

        <button
          type="button"
          className={`${buttonClass} font-bold`}
          onMouseDown={(e) => e.preventDefault()}
          onClick={() => exec("bold")}
        >
          B
        </button>

        <button
          type="button"
          className={`${buttonClass} italic`}
          onMouseDown={(e) => e.preventDefault()}
          onClick={() => exec("italic")}
        >
          I
        </button>

        <button
          type="button"
          className={`${buttonClass} underline`}
          onMouseDown={(e) => e.preventDefault()}
          onClick={() => exec("underline")}
        >
          U
        </button>

        <select
          defaultValue=""
          aria-label="Font size"
          className="rounded-md border border-slate-300 bg-white px-2 py-1.5 text-sm text-slate-700"
          onChange={(e) => {
            if (e.target.value) {
              const px = Number(e.target.value)

              editorRef.current?.focus()

              document.execCommand(
                "fontSize",
                false,
                "7"
              )

              const fonts =
                editorRef.current?.querySelectorAll(
                  'font[size="7"]'
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
              e.target.value = ""
            }
          }}
        >
          <option value="">
            Font size
          </option>
          <option value="12">12px</option>
          <option value="14">14px</option>
          <option value="16">16px</option>
          <option value="18">18px</option>
          <option value="20">20px</option>
          <option value="24">24px</option>
          <option value="28">28px</option>
          <option value="32">32px</option>
          <option value="36">36px</option>
        </select>

        <button
          type="button"
          className={buttonClass}
          onMouseDown={(e) => e.preventDefault()}
          onClick={changeColor}
        >
          A <span className="text-[#18B8EE]">Colour</span>
        </button>

        <button
          type="button"
          className={buttonClass}
          onMouseDown={(e) => e.preventDefault()}
          onClick={() => exec("formatBlock", "h2")}
        >
          H2
        </button>

        <button
          type="button"
          className={buttonClass}
          onMouseDown={(e) => e.preventDefault()}
          onClick={() => exec("formatBlock", "h3")}
        >
          H3
        </button>

        <button
          type="button"
          className={buttonClass}
          onMouseDown={(e) => e.preventDefault()}
          onClick={() =>
            exec("insertUnorderedList")
          }
        >
          • List
        </button>

        <button
          type="button"
          className={buttonClass}
          onMouseDown={(e) => e.preventDefault()}
          onClick={() =>
            exec("insertOrderedList")
          }
        >
          1. List
        </button>

        <button
          type="button"
          className={buttonClass}
          onMouseDown={(e) => e.preventDefault()}
          onClick={insertLink}
        >
          Link
        </button>

        <button
          type="button"
          className={buttonClass}
          onMouseDown={(e) => e.preventDefault()}
          onClick={clearFormatting}
        >
          Clear
        </button>

      </div>

      <div
        ref={editorRef}
        contentEditable
        suppressContentEditableWarning
        data-placeholder={placeholder}
        onInput={update}
        className="prose max-w-none px-5 py-4 text-sm leading-7 outline-none
          empty:before:text-slate-400
          [&_h2]:mb-4 [&_h2]:mt-6 [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-[#071B49]
          [&_h3]:mb-3 [&_h3]:mt-5 [&_h3]:text-xl [&_h3]:font-semibold [&_h3]:text-[#071B49]
          [&_p]:mb-4
          [&_ul]:mb-4 [&_ul]:list-disc [&_ul]:pl-6
          [&_ol]:mb-4 [&_ol]:list-decimal [&_ol]:pl-6"
        style={{
          minHeight,
        }}
      />

    </div>
  )
}
