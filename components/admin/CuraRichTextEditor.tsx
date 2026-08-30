"use client"

import { useEffect, useRef, useState } from "react"

type Props = {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  minHeight?: string
}

const buttonClass =
  "rounded-md border border-slate-300 bg-white px-2.5 py-1.5 text-sm font-medium text-slate-700 hover:bg-slate-100 active:bg-slate-200 disabled:cursor-not-allowed disabled:opacity-40"

const COLORS = [
  "#071B49",
  "#168BC4",
  "#18B8EE",
  "#159B78",
  "#000000",
  "#475569",
  "#64748B",
  "#DC2626",
  "#EA580C",
  "#CA8A04",
  "#7C3AED",
  "#DB2777",
]

const HIGHLIGHTS = [
  "#FEF08A",
  "#BBF7D0",
  "#BAE6FD",
  "#DDD6FE",
  "#FBCFE8",
  "#FED7AA",
  "#E2E8F0",
  "#FFFFFF",
]

const TABLE_COLOURS = [
  "#FFFFFF",
  "#F8FAFC",
  "#E2E8F0",
  "#BAE6FD",
  "#BBF7D0",
  "#FEF08A",
  "#FED7AA",
  "#FBCFE8",
  "#DDD6FE",
  "#D1FAE5",
  "#CCFBF1",
  "#E0F2FE",
]

export default function CuraRichTextEditor({
  value,
  onChange,
  placeholder = "Enter content...",
  minHeight = "240px",
}: Props) {
  const editorRef = useRef<HTMLDivElement>(null)
  const savedRangeRef = useRef<Range | null>(null)
  const imageInputRef = useRef<HTMLInputElement>(null)
  const selectedObjectRef =
    useRef<HTMLElement | null>(null)

  const draggedObjectRef =
    useRef<HTMLElement | null>(null)

  const [showColors, setShowColors] = useState(false)
  const [showHighlights, setShowHighlights] = useState(false)
  const [showTableTools, setShowTableTools] = useState(false)
  const [showShapeTools, setShowShapeTools] = useState(false)

  useEffect(() => {
    if (!editorRef.current) return

    if (editorRef.current.innerHTML !== value) {
      editorRef.current.innerHTML = value || ""
    }

    hydrateImages(editorRef.current)
    hydrateTables(editorRef.current)
  }, [value])

  function saveSelection() {
    const editor = editorRef.current
    const selection = window.getSelection()

    if (!editor || !selection || selection.rangeCount === 0) {
      return
    }

    const range = selection.getRangeAt(0)

    if (editor.contains(range.commonAncestorContainer)) {
      savedRangeRef.current = range.cloneRange()
    }
  }

  function restoreSelection() {
    const selection = window.getSelection()
    const range = savedRangeRef.current

    if (!selection || !range) return

    try {
      selection.removeAllRanges()
      selection.addRange(range)
    } catch {
      // Selection is no longer valid.
    }
  }

  function focusEditor() {
    editorRef.current?.focus()
  }

  function clearEditorObjectSelection() {
    const editor = editorRef.current
    if (!editor) return

    editor
      .querySelectorAll(
        ".cura-image-selected, .cura-table-selected"
      )
      .forEach((node) => {
        node.classList.remove(
          "cura-image-selected",
          "cura-table-selected"
        )
      })

    selectedObjectRef.current = null
  }

  function selectEditorObject(
    object: HTMLElement
  ) {
    const editor = editorRef.current
    if (!editor) return

    editor
      .querySelectorAll(
        ".cura-image-selected, .cura-table-selected"
      )
      .forEach((node) => {
        node.classList.remove(
          "cura-image-selected",
          "cura-table-selected"
        )
      })

    selectedObjectRef.current = object

    if (
      object.classList.contains(
        "cura-editor-image"
      )
    ) {
      object.classList.add(
        "cura-image-selected"
      )
    }

    if (
      object.classList.contains(
        "cura-editor-table-object"
      )
    ) {
      object.classList.add(
        "cura-table-selected"
      )
    }
  }

  function makeObjectDraggable(
    object: HTMLElement,
    editor: HTMLDivElement,
    type: "image" | "table"
  ) {
    /*
     * CURA WORD-STYLE OBJECT CONTROL
     *
     * Resize is handled independently.
     *
     * Movement works as follows:
     *   1. Grab the move handle.
     *   2. Keep the real object in the document.
     *   3. Create a visual clone which follows the pointer.
     *   4. Show a thin insertion marker at the intended position.
     *   5. On release, move the real object to that position.
     *
     * This avoids the previous caret/placeholder implementation,
     * which caused the object itself to disappear while dragging.
     */

    const existingControls =
      object.querySelectorAll("[data-cura-editor-ui]")

    existingControls.forEach((node) => node.remove())

    object.dataset.curaPointerReady = "true"
    object.draggable = false
    object.style.position = "relative"

    if (type === "table") {
      object.style.display = "block"
    }

    /*
     * ----------------------------------------------------------
     * MOVE HANDLE
     * ----------------------------------------------------------
     */

    const moveHandle =
      document.createElement("button")

    moveHandle.type = "button"

    moveHandle.className =
      type === "table"
        ? "cura-table-move-handle"
        : "cura-image-move-handle"

    moveHandle.setAttribute(
      "data-cura-editor-ui",
      "true"
    )

    moveHandle.setAttribute(
      "contenteditable",
      "false"
    )

    moveHandle.setAttribute(
      "aria-label",
      "Move object"
    )

    moveHandle.title = "Drag to move"

    moveHandle.innerHTML = "✣"

    object.appendChild(moveHandle)

    /*
     * ----------------------------------------------------------
     * RESIZE HANDLE
     * ----------------------------------------------------------
     */

    const resizeHandle =
      document.createElement("span")

    resizeHandle.className =
      type === "table"
        ? "cura-table-resize-handle"
        : "cura-image-resize-handle"

    resizeHandle.setAttribute(
      "data-cura-editor-ui",
      "true"
    )

    resizeHandle.setAttribute(
      "contenteditable",
      "false"
    )

    resizeHandle.setAttribute(
      "aria-label",
      "Resize object"
    )

    resizeHandle.title = "Drag to resize"

    object.appendChild(resizeHandle)

    /*
     * ----------------------------------------------------------
     * SELECTION
     * ----------------------------------------------------------
     */

    object.addEventListener(
      "click",
      (event) => {
        const target =
          event.target as HTMLElement | null

        if (
          target?.closest(
            "[data-cura-editor-ui]"
          )
        ) {
          return
        }

        event.preventDefault()
        event.stopPropagation()

        selectEditorObject(object)
      }
    )

    /*
     * ----------------------------------------------------------
     * MOVEMENT
     * ----------------------------------------------------------
     */

    let moving = false
    let moved = false

    let clone: HTMLElement | null = null
    let insertionMarker: HTMLElement | null = null

    let offsetX = 0
    let offsetY = 0

    function removeDragUI() {
      if (clone) {
        clone.remove()
        clone = null
      }

      if (insertionMarker) {
        insertionMarker.remove()
        insertionMarker = null
      }

      object.style.visibility = ""
      object.classList.remove(
        "cura-image-dragging",
        "cura-table-dragging"
      )
    }

    function createInsertionMarker() {
      const marker =
        document.createElement("div")

      marker.setAttribute(
        "data-cura-editor-ui",
        "true"
      )

      marker.contentEditable = "false"

      marker.style.height = "4px"
      marker.style.width = "100%"
      marker.style.margin = "8px 0"
      marker.style.borderRadius = "4px"
      marker.style.background =
        "#18B8EE"
      marker.style.pointerEvents = "none"
      marker.style.boxSizing = "border-box"

      return marker
    }

    function getTopLevelElement(
      node: Node | null
    ): HTMLElement | null {
      if (!node) return null

      let element =
        node instanceof HTMLElement
          ? node
          : node.parentElement

      while (
        element &&
        element.parentElement &&
        element.parentElement !== editor
      ) {
        element =
          element.parentElement
      }

      if (
        !element ||
        element === editor ||
        element === object ||
        element === insertionMarker
      ) {
        return null
      }

      if (
        element.hasAttribute(
          "data-cura-editor-ui"
        )
      ) {
        return null
      }

      return element
    }

    function findDropPosition(
      clientX: number,
      clientY: number
    ) {
      if (!insertionMarker) return

      const previousPointerEvents =
        insertionMarker.style.pointerEvents

      insertionMarker.style.pointerEvents =
        "none"

      const target =
        document.elementFromPoint(
          clientX,
          clientY
        )

      insertionMarker.style.pointerEvents =
        previousPointerEvents

      if (!target) return

      let element =
        target instanceof HTMLElement
          ? target
          : target.parentElement

      /*
       * First try to find a direct object.
       */
      let targetObject:
        | HTMLElement
        | null = null

      while (
        element &&
        element !== editor
      ) {
        if (
          element !== object &&
          (
            element.classList.contains(
              "cura-editor-image"
            ) ||
            element.classList.contains(
              "cura-editor-table-object"
            )
          )
        ) {
          targetObject = element
          break
        }

        element =
          element.parentElement
      }

      if (targetObject) {
        const rect =
          targetObject.getBoundingClientRect()

        const before =
          clientY <
          rect.top +
            rect.height / 2

        if (before) {
          editor.insertBefore(
            insertionMarker,
            targetObject
          )
        } else {
          if (
            targetObject.nextSibling
          ) {
            editor.insertBefore(
              insertionMarker,
              targetObject.nextSibling
            )
          } else {
            editor.appendChild(
              insertionMarker
            )
          }
        }

        return
      }

      /*
       * If the pointer is over text, find the
       * top-level text block.
       */
      const topLevel =
        getTopLevelElement(target)

      if (
        topLevel &&
        topLevel !== object
      ) {
        const rect =
          topLevel.getBoundingClientRect()

        const before =
          clientY <
          rect.top +
            rect.height / 2

        if (before) {
          editor.insertBefore(
            insertionMarker,
            topLevel
          )
        } else {
          if (topLevel.nextSibling) {
            editor.insertBefore(
              insertionMarker,
              topLevel.nextSibling
            )
          } else {
            editor.appendChild(
              insertionMarker
            )
          }
        }

        return
      }

      /*
       * Empty editor space:
       * determine the nearest top-level element
       * vertically.
       */
      const candidates =
        Array.from(
          editor.children
        ).filter(
          (child) => {
            const node =
              child as HTMLElement

            return (
              node !== object &&
              node !== insertionMarker &&
              !node.hasAttribute(
                "data-cura-editor-ui"
              )
            )
          }
        ) as HTMLElement[]

      if (
        candidates.length === 0
      ) {
        editor.appendChild(
          insertionMarker
        )
        return
      }

      let closest =
        candidates[0]

      let closestDistance =
        Number.POSITIVE_INFINITY

      for (
        const candidate of candidates
      ) {
        const rect =
          candidate.getBoundingClientRect()

        const distance =
          Math.abs(
            clientY -
              (
                rect.top +
                rect.height / 2
              )
          )

        if (
          distance <
          closestDistance
        ) {
          closestDistance =
            distance

          closest =
            candidate
        }
      }

      const closestRect =
        closest.getBoundingClientRect()

      if (
        clientY <
        closestRect.top +
          closestRect.height / 2
      ) {
        editor.insertBefore(
          insertionMarker,
          closest
        )
      } else if (
        closest.nextSibling
      ) {
        editor.insertBefore(
          insertionMarker,
          closest.nextSibling
        )
      } else {
        editor.appendChild(
          insertionMarker
        )
      }
    }

    function moveClone(
      clientX: number,
      clientY: number
    ) {
      if (!clone) return

      clone.style.left =
        `${clientX - offsetX}px`

      clone.style.top =
        `${clientY - offsetY}px`
    }

    const pointerDown =
      (event: PointerEvent) => {
        event.preventDefault()
        event.stopPropagation()

        selectEditorObject(object)

        moving = true
        moved = false

        const rect =
          object.getBoundingClientRect()

        offsetX =
          event.clientX - rect.left

        offsetY =
          event.clientY - rect.top

        /*
         * Create a visual copy.
         */
        clone =
          object.cloneNode(true) as HTMLElement

        clone
          .querySelectorAll(
            "[data-cura-editor-ui]"
          )
          .forEach(
            (node) => node.remove()
          )

        clone.setAttribute(
          "data-cura-drag-clone",
          "true"
        )

        clone.style.position =
          "fixed"

        clone.style.left =
          `${rect.left}px`

        clone.style.top =
          `${rect.top}px`

        clone.style.width =
          `${rect.width}px`

        clone.style.height =
          `${rect.height}px`

        clone.style.margin = "0"
        clone.style.zIndex = "999999"
        clone.style.pointerEvents =
          "none"
        clone.style.opacity = "0.88"
        clone.style.boxSizing =
          "border-box"
        clone.style.maxWidth =
          "none"

        document.body.appendChild(
          clone
        )

        /*
         * Keep the real object in the layout
         * while dragging.
         */
        object.style.visibility =
          "hidden"

        object.classList.add(
          type === "image"
            ? "cura-image-dragging"
            : "cura-table-dragging"
        )

        insertionMarker =
          createInsertionMarker()

        /*
         * Put the marker at the object's
         * current location initially.
         */
        editor.insertBefore(
          insertionMarker,
          object
        )

        event.currentTarget instanceof HTMLElement &&
          event.currentTarget.setPointerCapture?.(
            event.pointerId
          )

        moveClone(
          event.clientX,
          event.clientY
        )
      }

    const pointerMove =
      (event: PointerEvent) => {
        if (!moving) return

        event.preventDefault()

        moved = true

        moveClone(
          event.clientX,
          event.clientY
        )

        findDropPosition(
          event.clientX,
          event.clientY
        )
      }

    const pointerUp =
      () => {
        if (!moving) return

        moving = false

        if (
          insertionMarker &&
          insertionMarker.parentNode
        ) {
          const marker =
            insertionMarker

          const parent =
            marker.parentNode

          if (parent) {
            parent.insertBefore(
              object,
              marker
            )
          }

          marker.remove()
        }

        removeDragUI()

        if (moved) {
          update()
        }

        moved = false
      }

    moveHandle.addEventListener(
      "pointerdown",
      pointerDown
    )

    moveHandle.addEventListener(
      "pointermove",
      pointerMove
    )

    moveHandle.addEventListener(
      "pointerup",
      pointerUp
    )

    moveHandle.addEventListener(
      "pointercancel",
      pointerUp
    )

    /*
     * ----------------------------------------------------------
     * RESIZE OBJECT
     * ----------------------------------------------------------
     */

    let resizing = false

    let resizeStartX = 0
    let resizeStartY = 0

    let resizeStartWidth = 0
    let resizeStartHeight = 0

    const resizePointerDown =
      (event: PointerEvent) => {
        event.preventDefault()
        event.stopPropagation()

        selectEditorObject(object)

        resizing = true

        resizeStartX =
          event.clientX

        resizeStartY =
          event.clientY

        const rect =
          object.getBoundingClientRect()

        resizeStartWidth =
          rect.width

        resizeStartHeight =
          rect.height

        resizeHandle.setPointerCapture?.(
          event.pointerId
        )
      }

    const resizePointerMove =
      (event: PointerEvent) => {
        if (!resizing) return

        const dx =
          event.clientX -
          resizeStartX

        const dy =
          event.clientY -
          resizeStartY

        const editorRect =
          editor.getBoundingClientRect()

        const maxWidth =
          Math.max(
            160,
            editorRect.width - 20
          )

        const newWidth =
          Math.max(
            160,
            Math.min(
              maxWidth,
              resizeStartWidth + dx
            )
          )

        if (type === "table") {
          object.style.width =
            `${newWidth}px`

          const table =
            object.querySelector(
              "table"
            ) as HTMLTableElement | null

          if (table) {
            table.style.width =
              "100%"
          }
        } else {
          object.style.width =
            `${newWidth}px`

          const image =
            object.querySelector(
              "img"
            ) as HTMLImageElement | null

          if (image) {
            image.style.width =
              "100%"

            image.style.height =
              "auto"
          }
        }

        /*
         * Keep height calculation predictable
         * for the editor.
         */
        if (
          type === "image" &&
          resizeStartHeight > 0
        ) {
          const ratio =
            resizeStartHeight /
            resizeStartWidth

          object.style.height =
            `${Math.max(
              120,
              newWidth * ratio
            )}px`

          const image =
            object.querySelector(
              "img"
            ) as HTMLImageElement | null

          if (image) {
            image.style.height =
              "100%"
            image.style.objectFit =
              "contain"
          }
        }
      }

    const resizePointerUp =
      () => {
        if (!resizing) return

        resizing = false

        try {
          resizeHandle.releasePointerCapture?.(
            0
          )
        } catch {
          // Pointer capture may already be released.
        }

        update()
      }

    resizeHandle.addEventListener(
      "pointerdown",
      resizePointerDown
    )

    resizeHandle.addEventListener(
      "pointermove",
      resizePointerMove
    )

    resizeHandle.addEventListener(
      "pointerup",
      resizePointerUp
    )

    resizeHandle.addEventListener(
      "pointercancel",
      resizePointerUp
    )
  }

  function hydrateImages(
    editor: HTMLDivElement
  ) {
    editor
      .querySelectorAll(
        ".cura-editor-image"
      )
      .forEach((node) => {
        const object =
          node as HTMLElement

        const image =
          object.querySelector("img")

        if (!image) return

        object.contentEditable =
          "false"

        object.style.position =
          "relative"

        object.style.maxWidth =
          "100%"

        object.style.minWidth =
          "120px"

        image.draggable =
          false

        image.style.display =
          "block"

        image.style.width =
          "100%"

        image.style.height =
          "auto"

        image.style.maxWidth =
          "100%"

        image.style.pointerEvents =
          "none"

        makeObjectDraggable(
          object,
          editor,
          "image"
        )
      })
  }

  function hydrateTables(
    editor: HTMLDivElement
  ) {
    editor
      .querySelectorAll("table")
      .forEach((tableNode) => {
        const table =
          tableNode as HTMLTableElement

        let wrapper =
          table.parentElement

        if (
          !wrapper?.classList.contains(
            "cura-editor-table-object"
          )
        ) {
          wrapper =
            document.createElement(
              "div"
            )

          wrapper.className =
            "cura-editor-table-object"

          wrapper.style.width =
            table.style.width ||
            "100%"

          wrapper.style.maxWidth =
            "100%"

          wrapper.style.margin =
            table.style.margin ||
            "1rem 0"

          wrapper.style.position =
            "relative"

          table.parentNode?.insertBefore(
            wrapper,
            table
          )

          wrapper.appendChild(
            table
          )
        }

        table.style.width =
          "100%"

        table.style.borderCollapse =
          "collapse"

        table
          .querySelectorAll(
            "td, th"
          )
          .forEach((cell) => {
            const element =
              cell as HTMLElement

            element.contentEditable =
              "true"

            element.style.border =
              element.style.border ||
              "1px solid #CBD5E1"

            element.style.padding =
              element.style.padding ||
              "0.6rem"

            element.style.minWidth =
              element.style.minWidth ||
              "80px"

            element.style.verticalAlign =
              "top"
          })

        makeObjectDraggable(
          wrapper,
          editor,
          "table"
        )
      })
  }

  useEffect(() => {
    const editor =
      editorRef.current

    if (!editor) return

    hydrateImages(editor)
    hydrateTables(editor)

    const clearSelection =
      (event: MouseEvent) => {
        const target =
          event.target as HTMLElement | null

        if (
          !target?.closest(
            ".cura-editor-image, .cura-editor-table-object"
          )
        ) {
          clearEditorObjectSelection()
        }
      }

    const deleteSelected =
      (event: KeyboardEvent) => {
        const selected =
          selectedObjectRef.current

        if (!selected) return

        const target =
          event.target as HTMLElement | null

        if (
          selected.classList.contains(
            "cura-editor-table-object"
          ) &&
          target?.closest(
            "td, th"
          )
        ) {
          return
        }

        if (
          event.key === "Delete" ||
          event.key === "Backspace"
        ) {
          event.preventDefault()

          selected.remove()

          selectedObjectRef.current =
            null

          update()
        }
      }

    editor.addEventListener(
      "mousedown",
      clearSelection
    )

    editor.addEventListener(
      "keydown",
      deleteSelected
    )

    return () => {
      editor.removeEventListener(
        "mousedown",
        clearSelection
      )

      editor.removeEventListener(
        "keydown",
        deleteSelected
      )
    }
  }, [])

  function update() {
    const editor =
      editorRef.current

    if (!editor) return

    const clone =
      editor.cloneNode(
        true
      ) as HTMLElement

    clone
      .querySelectorAll(
        "[data-cura-editor-ui]"
      )
      .forEach((node) => {
        node.remove()
      })

    clone
      .querySelectorAll(
        ".cura-image-selected, .cura-table-selected, .cura-image-dragging, .cura-table-dragging"
      )
      .forEach((node) => {
        node.classList.remove(
          "cura-image-selected",
          "cura-table-selected",
          "cura-image-dragging",
          "cura-table-dragging"
        )
      })

    clone
      .querySelectorAll(
        "[data-cura-pointer-ready]"
      )
      .forEach((node) => {
        node.removeAttribute(
          "data-cura-pointer-ready"
        )
      })

    clone
      .querySelectorAll(
        ".cura-editor-drag-placeholder"
      )
      .forEach((node) => {
        node.remove()
      })

    onChange(
      clone.innerHTML
    )

    saveSelection()
  }

  /*
   * IMPORTANT:
   * Formatting is performed on mousedown.
   *
   * This prevents the browser from removing the text selection
   * before the formatting command executes.
   */
  function toolbarCommand(
    event: React.MouseEvent<HTMLButtonElement>,
    command: string,
    commandValue?: string
  ) {
    event.preventDefault()

    focusEditor()
    restoreSelection()

    try {
      document.execCommand(
        command,
        false,
        commandValue
      )
    } catch {
      // Ignore unsupported browser commands.
    }

    update()
  }

  function applyColor(
    event: React.MouseEvent<HTMLButtonElement>,
    color: string
  ) {
    event.preventDefault()

    focusEditor()
    restoreSelection()

    document.execCommand(
      "foreColor",
      false,
      color
    )

    update()
    setShowColors(false)
  }

  function applyHighlight(
    event: React.MouseEvent<HTMLButtonElement>,
    color: string
  ) {
    event.preventDefault()

    focusEditor()
    restoreSelection()

    document.execCommand(
      "hiliteColor",
      false,
      color
    )

    update()
    setShowHighlights(false)
  }

  function applyFontSize(px: number) {
    focusEditor()
    restoreSelection()

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

  function applyList(
    event: React.MouseEvent<HTMLButtonElement>,
    command:
      | "insertUnorderedList"
      | "insertOrderedList"
  ) {
    event.preventDefault()

    focusEditor()
    restoreSelection()

    document.execCommand(command, false)

    update()
  }

  function insertLink(
    event: React.MouseEvent<HTMLButtonElement>
  ) {
    event.preventDefault()

    saveSelection()

    const url = window.prompt(
      "Enter URL:"
    )

    if (!url) return

    focusEditor()
    restoreSelection()

    document.execCommand(
      "createLink",
      false,
      url
    )

    update()
  }

  function openImagePicker(
    event: React.MouseEvent<HTMLButtonElement>
  ) {
    event.preventDefault()

    saveSelection()

    imageInputRef.current?.click()
  }

  function insertImage(file: File) {
    const reader = new FileReader()

    reader.onload = () => {
      const editor =
        editorRef.current

      if (
        !editor ||
        typeof reader.result !==
          "string"
      ) {
        return
      }

      focusEditor()
      restoreSelection()

      const imageWrapper =
        document.createElement(
          "div"
        )

      imageWrapper.className =
        "cura-editor-image"

      imageWrapper.contentEditable =
        "false"

      imageWrapper.style.width =
        "60%"

      imageWrapper.style.maxWidth =
        "100%"

      imageWrapper.style.minWidth =
        "120px"

      imageWrapper.style.margin =
        "1rem auto"

      imageWrapper.style.position =
        "relative"

      imageWrapper.style.display =
        "block"

      const image =
        document.createElement(
          "img"
        )

      image.src =
        reader.result

      image.alt =
        file.name

      image.style.display =
        "block"

      image.style.width =
        "100%"

      image.style.height =
        "auto"

      image.style.maxWidth =
        "100%"

      image.draggable =
        false

      imageWrapper.appendChild(
        image
      )

      const range =
        savedRangeRef.current

      if (range) {
        range.deleteContents()

        range.insertNode(
          imageWrapper
        )

        const paragraph =
          document.createElement(
            "p"
          )

        paragraph.innerHTML =
          "<br>"

        imageWrapper.after(
          paragraph
        )

        const after =
          document.createRange()

        after.selectNodeContents(
          paragraph
        )

        after.collapse(false)

        const selection =
          window.getSelection()

        selection?.removeAllRanges()

        selection?.addRange(
          after
        )
      } else {
        editor.appendChild(
          imageWrapper
        )
      }

      makeObjectDraggable(
        imageWrapper,
        editor,
        "image"
      )

      update()
    }

    reader.readAsDataURL(file)
  }

  function getCurrentTable(): HTMLTableElement | null {
    const selection = window.getSelection()

    if (!selection || selection.rangeCount === 0) {
      return null
    }

    let node: Node | null =
      selection.anchorNode

    while (
      node &&
      node !== editorRef.current
    ) {
      if (
        node instanceof HTMLTableElement
      ) {
        return node
      }

      node = node.parentNode
    }

    return null
  }

  function getCurrentCell(): HTMLTableCellElement | null {
    const selection = window.getSelection()

    if (!selection || selection.rangeCount === 0) {
      return null
    }

    let node: Node | null =
      selection.anchorNode

    while (
      node &&
      node !== editorRef.current
    ) {
      if (
        node instanceof HTMLTableCellElement
      ) {
        return node
      }

      node = node.parentNode
    }

    return null
  }

  function insertTable(
    event: React.MouseEvent<HTMLButtonElement>
  ) {
    event.preventDefault()

    const rowsInput =
      window.prompt(
        "Number of rows:",
        "3"
      )

    if (!rowsInput) return

    const columnsInput =
      window.prompt(
        "Number of columns:",
        "3"
      )

    if (!columnsInput) return

    const rows = Math.max(
      1,
      Math.min(
        20,
        Number(rowsInput)
      )
    )

    const columns = Math.max(
      1,
      Math.min(
        12,
        Number(columnsInput)
      )
    )

    if (
      !Number.isFinite(rows) ||
      !Number.isFinite(columns)
    ) {
      return
    }

    focusEditor()
    restoreSelection()

    const table =
      document.createElement("table")

    table.className =
      "cura-editor-table"

    table.style.width = "100%"
    table.style.borderCollapse =
      "collapse"
    table.style.margin =
      "1rem 0"

    const tbody =
      document.createElement("tbody")

    for (let row = 0; row < rows; row++) {
      const tr =
        document.createElement("tr")

      for (
        let column = 0;
        column < columns;
        column++
      ) {
        const td =
          document.createElement("td")

        td.innerHTML = "<br>"
        td.contentEditable = "true"
        td.style.border =
          "1px solid #CBD5E1"
        td.style.padding =
          "0.6rem"
        td.style.minWidth =
          "80px"
        td.style.verticalAlign =
          "top"

        tr.appendChild(td)
      }

      tbody.appendChild(tr)
    }

    table.appendChild(tbody)

    const tableWrapper =
      document.createElement("div")

    tableWrapper.className =
      "cura-editor-table-object"

    tableWrapper.style.width =
      "100%"

    tableWrapper.style.maxWidth =
      "100%"

    tableWrapper.style.margin =
      "1rem 0"

    tableWrapper.style.position =
      "relative"

    tableWrapper.appendChild(
      table
    )

    const range =
      savedRangeRef.current

    if (range) {
      range.deleteContents()
      range.insertNode(
        tableWrapper
      )

      const paragraph =
        document.createElement("p")

      paragraph.innerHTML =
        "<br>"

      tableWrapper.after(
        paragraph
      )

      const after =
        document.createRange()

      after.selectNodeContents(
        paragraph
      )
      after.collapse(false)

      const selection =
        window.getSelection()

      selection?.removeAllRanges()
      selection?.addRange(after)
    } else {
      editorRef.current?.appendChild(
        tableWrapper
      )
    }

    makeObjectDraggable(
      tableWrapper,
      editorRef.current as HTMLDivElement,
      "table"
    )

    update()
    setShowTableTools(false)
  }

  function addTableRow(
    event: React.MouseEvent<HTMLButtonElement>
  ) {
    event.preventDefault()

    const table =
      getCurrentTable()

    if (!table) {
      window.alert(
        "Place the cursor inside a table first."
      )
      return
    }

    const tbody =
      table.tBodies[0]

    if (!tbody) return

    const columnCount =
      tbody.rows[0]?.cells.length || 1

    const row =
      tbody.insertRow()

    for (
      let column = 0;
      column < columnCount;
      column++
    ) {
      const cell =
        row.insertCell()

      cell.innerHTML = "<br>"
      cell.contentEditable = "true"
      cell.style.border =
        "1px solid #CBD5E1"
      cell.style.padding =
        "0.6rem"
      cell.style.minWidth =
        "80px"
      cell.style.verticalAlign =
        "top"
    }

    update()
  }

  function removeTableRow(
    event: React.MouseEvent<HTMLButtonElement>
  ) {
    event.preventDefault()

    const table =
      getCurrentTable()

    const cell =
      getCurrentCell()

    if (!table || !cell) {
      window.alert(
        "Place the cursor inside a table row first."
      )
      return
    }

    const row =
      cell.parentElement as HTMLTableRowElement | null

    if (!row) return

    if (
      table.rows.length <= 1
    ) {
      return
    }

    row.remove()

    update()
  }

  function addTableColumn(
    event: React.MouseEvent<HTMLButtonElement>
  ) {
    event.preventDefault()

    const table =
      getCurrentTable()

    const cell =
      getCurrentCell()

    if (!table || !cell) {
      window.alert(
        "Place the cursor inside a table first."
      )
      return
    }

    const row =
      cell.parentElement as HTMLTableRowElement

    const columnIndex =
      cell.cellIndex

    Array.from(
      table.rows
    ).forEach((currentRow) => {
      const newCell =
        currentRow.insertCell(
          columnIndex + 1
        )

      newCell.innerHTML = "<br>"
      newCell.contentEditable =
        "true"
      newCell.style.border =
        "1px solid #CBD5E1"
      newCell.style.padding =
        "0.6rem"
      newCell.style.minWidth =
        "80px"
      newCell.style.verticalAlign =
        "top"
    })

    void row

    update()
  }

  function removeTableColumn(
    event: React.MouseEvent<HTMLButtonElement>
  ) {
    event.preventDefault()

    const table =
      getCurrentTable()

    const cell =
      getCurrentCell()

    if (!table || !cell) {
      window.alert(
        "Place the cursor inside a table first."
      )
      return
    }

    const columnIndex =
      cell.cellIndex

    const columnCount =
      table.rows[0]?.cells.length || 0

    if (columnCount <= 1) {
      return
    }

    Array.from(
      table.rows
    ).forEach((row) => {
      row.deleteCell(
        columnIndex
      )
    })

    update()
  }

  function colourTableRow(
    event: React.MouseEvent<HTMLButtonElement>,
    color: string
  ) {
    event.preventDefault()

    const cell =
      getCurrentCell()

    if (!cell) {
      window.alert(
        "Place the cursor inside a table row first."
      )
      return
    }

    const row =
      cell.parentElement as HTMLTableRowElement | null

    if (!row) return

    Array.from(
      row.cells
    ).forEach((currentCell) => {
      currentCell.style.backgroundColor =
        color
    })

    update()
  }

  function insertShape(
    event: React.MouseEvent<HTMLButtonElement>,
    shape:
      | "rectangle"
      | "rounded"
      | "circle"
      | "callout"
  ) {
    event.preventDefault()

    focusEditor()
    restoreSelection()

    const shapeElement =
      document.createElement("div")

    shapeElement.className =
      `cura-editor-shape cura-shape-${shape}`

    shapeElement.contentEditable =
      "true"

    shapeElement.textContent =
      "Type your text here"

    shapeElement.style.margin =
      "1rem auto"
    shapeElement.style.padding =
      "1rem 1.25rem"
    shapeElement.style.minHeight =
      "70px"
    shapeElement.style.width =
      "60%"
    shapeElement.style.maxWidth =
      "100%"
    shapeElement.style.boxSizing =
      "border-box"
    shapeElement.style.background =
      "#E0F2FE"
    shapeElement.style.border =
      "2px solid #168BC4"
    shapeElement.style.color =
      "#071B49"
    shapeElement.style.textAlign =
      "center"
    shapeElement.style.display =
      "flex"
    shapeElement.style.alignItems =
      "center"
    shapeElement.style.justifyContent =
      "center"

    if (shape === "rounded") {
      shapeElement.style.borderRadius =
        "18px"
    }

    if (shape === "circle") {
      shapeElement.style.borderRadius =
        "9999px"
      shapeElement.style.width =
        "180px"
      shapeElement.style.height =
        "180px"
    }

    if (shape === "callout") {
      shapeElement.style.borderRadius =
        "8px"
      shapeElement.style.boxShadow =
        "0 2px 8px rgba(7,27,73,0.12)"
    }

    const range =
      savedRangeRef.current

    if (range) {
      range.deleteContents()
      range.insertNode(shapeElement)

      const paragraph =
        document.createElement("p")

      paragraph.innerHTML =
        "<br>"

      shapeElement.after(paragraph)

      const after =
        document.createRange()

      after.selectNodeContents(
        paragraph
      )
      after.collapse(false)

      const selection =
        window.getSelection()

      selection?.removeAllRanges()
      selection?.addRange(after)
    } else {
      editorRef.current?.appendChild(
        shapeElement
      )
    }

    update()
    setShowShapeTools(false)
  }

  return (
    <div className="overflow-visible rounded-xl border border-slate-300 bg-white">

      <input
        ref={imageInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(event) => {
          const file =
            event.target.files?.[0]

          if (file) {
            insertImage(file)
          }

          event.target.value = ""
        }}
      />

      {/* TOOLBAR */}

      <div className="relative flex flex-wrap items-center gap-1.5 border-b border-slate-200 bg-slate-50 p-3">

        {/* UNDO / REDO */}

        <button
          type="button"
          className={buttonClass}
          onMouseDown={(event) =>
            toolbarCommand(
              event,
              "undo"
            )
          }
          title="Undo"
        >
          ↶
        </button>

        <button
          type="button"
          className={buttonClass}
          onMouseDown={(event) =>
            toolbarCommand(
              event,
              "redo"
            )
          }
          title="Redo"
        >
          ↷
        </button>

        <span className="mx-1 h-6 w-px bg-slate-300" />

        {/* BASIC TEXT */}

        <button
          type="button"
          className={`${buttonClass} font-bold`}
          onMouseDown={(event) =>
            toolbarCommand(
              event,
              "bold"
            )
          }
          title="Bold"
        >
          B
        </button>

        <button
          type="button"
          className={`${buttonClass} italic`}
          onMouseDown={(event) =>
            toolbarCommand(
              event,
              "italic"
            )
          }
          title="Italic"
        >
          I
        </button>

        <button
          type="button"
          className={`${buttonClass} underline`}
          onMouseDown={(event) =>
            toolbarCommand(
              event,
              "underline"
            )
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
          onMouseDown={() =>
            saveSelection()
          }
          onChange={(event) => {
            const size =
              Number(
                event.target.value
              )

            if (
              Number.isFinite(size) &&
              size > 0
            ) {
              applyFontSize(size)
            }

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

        {/* TEXT COLOUR */}

        <div className="relative">
          <button
            type="button"
            className={buttonClass}
            onMouseDown={(event) => {
              event.preventDefault()
              saveSelection()
              setShowColors(
                (current) => !current
              )
            }}
          >
            <span className="font-bold">
              A
            </span>
            <span className="ml-1 text-[#168BC4]">
              Colour
            </span>
          </button>

          {showColors && (
            <div
              className="absolute left-0 top-full z-50 mt-2 w-64 rounded-xl border border-slate-200 bg-white p-3 shadow-xl"
              onMouseDown={(event) =>
                event.preventDefault()
              }
            >
              <div className="mb-2 text-xs font-bold uppercase tracking-[0.15em] text-slate-500">
                Text colour
              </div>

              <div className="grid grid-cols-6 gap-2">
                {COLORS.map(
                  (color) => (
                    <button
                      key={color}
                      type="button"
                      className="h-8 w-8 rounded-full border border-slate-300 shadow-sm transition hover:scale-110"
                      style={{
                        backgroundColor:
                          color,
                      }}
                      onMouseDown={(
                        event
                      ) =>
                        applyColor(
                          event,
                          color
                        )
                      }
                    />
                  )
                )}
              </div>

              <div className="mt-3 border-t border-slate-100 pt-3">
                <label className="flex items-center justify-between text-xs font-medium text-slate-600">
                  Custom
                  <input
                    type="color"
                    defaultValue="#071B49"
                    className="h-8 w-10 cursor-pointer"
                    onChange={(event) => {
                      focusEditor()
                      restoreSelection()

                      document.execCommand(
                        "foreColor",
                        false,
                        event.target.value
                      )

                      update()
                    }}
                  />
                </label>
              </div>
            </div>
          )}
        </div>

        {/* HIGHLIGHT */}

        <div className="relative">
          <button
            type="button"
            className={buttonClass}
            onMouseDown={(event) => {
              event.preventDefault()
              saveSelection()
              setShowHighlights(
                (current) => !current
              )
            }}
          >
            <span className="font-bold">
              A
            </span>
            <span className="ml-1 rounded bg-yellow-200 px-1">
              Highlight
            </span>
          </button>

          {showHighlights && (
            <div
              className="absolute left-0 top-full z-50 mt-2 w-56 rounded-xl border border-slate-200 bg-white p-3 shadow-xl"
              onMouseDown={(event) =>
                event.preventDefault()
              }
            >
              <div className="mb-2 text-xs font-bold uppercase tracking-[0.15em] text-slate-500">
                Highlight
              </div>

              <div className="grid grid-cols-4 gap-2">
                {HIGHLIGHTS.map(
                  (color) => (
                    <button
                      key={color}
                      type="button"
                      className="h-8 w-8 rounded border border-slate-300"
                      style={{
                        backgroundColor:
                          color,
                      }}
                      onMouseDown={(
                        event
                      ) =>
                        applyHighlight(
                          event,
                          color
                        )
                      }
                    />
                  )
                )}
              </div>
            </div>
          )}
        </div>

        <span className="mx-1 h-6 w-px bg-slate-300" />

        {/* HEADINGS */}

        <button
          type="button"
          className={buttonClass}
          onMouseDown={(event) =>
            toolbarCommand(
              event,
              "formatBlock",
              "h2"
            )
          }
        >
          H2
        </button>

        <button
          type="button"
          className={buttonClass}
          onMouseDown={(event) =>
            toolbarCommand(
              event,
              "formatBlock",
              "h3"
            )
          }
        >
          H3
        </button>

        {/* LISTS */}

        <button
          type="button"
          className={buttonClass}
          onMouseDown={(event) =>
            applyList(
              event,
              "insertUnorderedList"
            )
          }
          title="Bulleted list"
        >
          • List
        </button>

        <button
          type="button"
          className={buttonClass}
          onMouseDown={(event) =>
            applyList(
              event,
              "insertOrderedList"
            )
          }
          title="Numbered list"
        >
          1. List
        </button>

        <button
          type="button"
          className={buttonClass}
          onMouseDown={(event) =>
            toolbarCommand(
              event,
              "outdent"
            )
          }
          title="Decrease indent"
        >
          ←
        </button>

        <button
          type="button"
          className={buttonClass}
          onMouseDown={(event) =>
            toolbarCommand(
              event,
              "indent"
            )
          }
          title="Increase indent"
        >
          →
        </button>

        <span className="mx-1 h-6 w-px bg-slate-300" />

        {/* ALIGNMENT */}

        <button
          type="button"
          className={buttonClass}
          onMouseDown={(event) =>
            toolbarCommand(
              event,
              "justifyLeft"
            )
          }
          title="Align left"
        >
          ≡
        </button>

        <button
          type="button"
          className={buttonClass}
          onMouseDown={(event) =>
            toolbarCommand(
              event,
              "justifyCenter"
            )
          }
          title="Centre"
        >
          ☰
        </button>

        <button
          type="button"
          className={buttonClass}
          onMouseDown={(event) =>
            toolbarCommand(
              event,
              "justifyRight"
            )
          }
          title="Align right"
        >
          ≡
        </button>

        <button
          type="button"
          className={buttonClass}
          onMouseDown={(event) =>
            toolbarCommand(
              event,
              "justifyFull"
            )
          }
          title="Justify"
        >
          ☰
        </button>

        <span className="mx-1 h-6 w-px bg-slate-300" />

        {/* INSERT PICTURE */}

        <button
          type="button"
          className={buttonClass}
          onMouseDown={openImagePicker}
          title="Insert picture"
        >
          🖼 Picture
        </button>

        {/* TABLE */}

        <div className="relative">
          <button
            type="button"
            className={buttonClass}
            onMouseDown={(event) => {
              event.preventDefault()
              saveSelection()
              setShowTableTools(
                (current) => !current
              )
            }}
          >
            ▦ Table
          </button>

          {showTableTools && (
            <div
              className="absolute left-0 top-full z-50 mt-2 w-64 rounded-xl border border-slate-200 bg-white p-3 shadow-xl"
              onMouseDown={(event) =>
                event.preventDefault()
              }
            >
              <div className="mb-2 text-xs font-bold uppercase tracking-[0.15em] text-slate-500">
                Table
              </div>

              <button
                type="button"
                className={`${buttonClass} mb-2 w-full`}
                onMouseDown={
                  insertTable
                }
              >
                + Insert table
              </button>

              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  className={buttonClass}
                  onMouseDown={
                    addTableRow
                  }
                >
                  + Row
                </button>

                <button
                  type="button"
                  className={buttonClass}
                  onMouseDown={
                    removeTableRow
                  }
                >
                  − Row
                </button>

                <button
                  type="button"
                  className={buttonClass}
                  onMouseDown={
                    addTableColumn
                  }
                >
                  + Column
                </button>

                <button
                  type="button"
                  className={buttonClass}
                  onMouseDown={
                    removeTableColumn
                  }
                >
                  − Column
                </button>
              </div>

              <div className="mt-3 border-t border-slate-100 pt-3">
                <div className="mb-2 text-xs font-bold uppercase tracking-[0.12em] text-slate-500">
                  Row colour
                </div>

                <div className="grid grid-cols-6 gap-2">
                  {TABLE_COLOURS.map(
                    (color) => (
                      <button
                        key={color}
                        type="button"
                        className="h-7 w-7 rounded border border-slate-300"
                        style={{
                          backgroundColor:
                            color,
                        }}
                        onMouseDown={(
                          event
                        ) =>
                          colourTableRow(
                            event,
                            color
                          )
                        }
                      />
                    )
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* SHAPES */}

        <div className="relative">
          <button
            type="button"
            className={buttonClass}
            onMouseDown={(event) => {
              event.preventDefault()
              saveSelection()
              setShowShapeTools(
                (current) => !current
              )
            }}
          >
            ◇ Shape
          </button>

          {showShapeTools && (
            <div
              className="absolute left-0 top-full z-50 mt-2 w-52 rounded-xl border border-slate-200 bg-white p-3 shadow-xl"
              onMouseDown={(event) =>
                event.preventDefault()
              }
            >
              <div className="mb-2 text-xs font-bold uppercase tracking-[0.15em] text-slate-500">
                Insert shape
              </div>

              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  className={buttonClass}
                  onMouseDown={(event) =>
                    insertShape(
                      event,
                      "rectangle"
                    )
                  }
                >
                  Rectangle
                </button>

                <button
                  type="button"
                  className={buttonClass}
                  onMouseDown={(event) =>
                    insertShape(
                      event,
                      "rounded"
                    )
                  }
                >
                  Rounded
                </button>

                <button
                  type="button"
                  className={buttonClass}
                  onMouseDown={(event) =>
                    insertShape(
                      event,
                      "circle"
                    )
                  }
                >
                  Circle
                </button>

                <button
                  type="button"
                  className={buttonClass}
                  onMouseDown={(event) =>
                    insertShape(
                      event,
                      "callout"
                    )
                  }
                >
                  Callout
                </button>
              </div>
            </div>
          )}
        </div>

        {/* LINK */}

        <button
          type="button"
          className={buttonClass}
          onMouseDown={insertLink}
          title="Insert link"
        >
          Link
        </button>

        {/* CLEAR */}

        <button
          type="button"
          className={buttonClass}
          onMouseDown={(event) =>
            toolbarCommand(
              event,
              "removeFormat"
            )
          }
          title="Clear formatting"
        >
          Clear
        </button>
      </div>

      {/* EDITOR */}

      <div
        ref={editorRef}
        contentEditable
        suppressContentEditableWarning
        data-placeholder={placeholder}
        onInput={update}
        onKeyUp={saveSelection}
        onMouseUp={saveSelection}
        onFocus={saveSelection}
        onBlur={saveSelection}
        className="
          cura-rich-editor
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

      <style dangerouslySetInnerHTML={{ __html: `
        .cura-rich-editor {
          white-space: normal;
        }

        .cura-rich-editor:empty:before {
          content: attr(data-placeholder);
          color: #94a3b8;
          pointer-events: none;
        }

        .cura-rich-editor p {
          margin: 0 0 0.75rem 0;
        }

        .cura-rich-editor h2 {
          margin: 1rem 0 0.75rem;
          font-size: 1.5rem;
          line-height: 1.3;
          font-weight: 700;
          color: #071b49;
        }

        .cura-rich-editor h3 {
          margin: 0.9rem 0 0.6rem;
          font-size: 1.2rem;
          line-height: 1.4;
          font-weight: 700;
          color: #071b49;
        }

        .cura-rich-editor ul {
          list-style-type: disc;
          margin: 0.5rem 0 0.75rem;
          padding-left: 2rem;
        }

        .cura-rich-editor ol {
          list-style-type: decimal;
          margin: 0.5rem 0 0.75rem;
          padding-left: 2rem;
        }

        .cura-rich-editor ul ul {
          list-style-type: circle;
        }

        .cura-rich-editor ul ul ul {
          list-style-type: square;
        }

        .cura-rich-editor ol ol {
          list-style-type: lower-alpha;
        }

        .cura-rich-editor li {
          margin: 0.2rem 0;
          padding-left: 0.2rem;
        }

        .cura-rich-editor a {
          color: #168bc4;
          text-decoration: underline;
        }

        .cura-rich-editor blockquote {
          margin: 0.75rem 0;
          border-left: 4px solid #159b78;
          padding-left: 1rem;
          color: #475569;
        }

        .cura-rich-editor .cura-editor-image,
        .cura-rich-editor .cura-editor-table-object {
          position: relative;
        }

        .cura-rich-editor .cura-editor-image.cura-image-selected,
        .cura-rich-editor .cura-editor-table-object.cura-table-selected {
          outline: 2px solid #18B8EE;
          outline-offset: 3px;
        }

        .cura-rich-editor .cura-table-selected table {
          cursor: text;
        }

        .cura-rich-editor .cura-table-move-handle,
        .cura-rich-editor .cura-image-move-handle {
          position: absolute;
          left: -18px;
          top: -18px;
          z-index: 100;
          width: 22px;
          height: 22px;
          padding: 0;
          margin: 0;
          border: 1px solid #94A3B8;
          border-radius: 3px;
          background: white;
          color: #475569;
          font-size: 14px;
          line-height: 20px;
          text-align: center;
          cursor: move;
          user-select: none;
          touch-action: none;
          box-shadow: 0 1px 3px rgba(0,0,0,.12);
        }

        .cura-rich-editor .cura-table-move-handle:hover,
        .cura-rich-editor .cura-image-move-handle:hover {
          background: #F1F5F9;
          color: #071B49;
        }

        .cura-rich-editor .cura-table-resize-handle,
        .cura-rich-editor .cura-image-resize-handle {
          position: absolute;
          right: -7px;
          bottom: -7px;
          z-index: 100;
          width: 12px;
          height: 12px;
          box-sizing: border-box;
          border: 1px solid #64748B;
          background: white;
          cursor: nwse-resize;
          user-select: none;
          touch-action: none;
        }

        .cura-rich-editor .cura-table-resize-handle:hover,
        .cura-rich-editor .cura-image-resize-handle:hover {
          border-color: #159B78;
          background: #E2E8F0;
        }

        .cura-rich-editor .cura-table-dragging,
        .cura-rich-editor .cura-image-dragging {
          opacity: 0.65;
        }

        .cura-rich-editor .cura-editor-drag-placeholder {
          display: block;
          pointer-events: none;
          box-sizing: border-box;
          background: rgba(24,184,238,.04);
        }

        .cura-rich-editor .cura-editor-image {
          box-sizing: border-box;
          cursor: default;
        }

        .cura-rich-editor .cura-editor-image img {
          user-select: none;
        }

        .cura-rich-editor table.cura-editor-table {
          border-collapse: collapse;
          width: 100%;
          margin: 1rem 0;
        }

        .cura-rich-editor table.cura-editor-table td,
        .cura-rich-editor table.cura-editor-table th {
          border: 1px solid #cbd5e1;
          padding: 0.6rem;
          min-width: 80px;
          vertical-align: top;
        }

        .cura-rich-editor .cura-editor-shape {
          box-sizing: border-box;
          user-select: text;
        }

        .cura-rich-editor .cura-editor-shape:focus {
          outline: 2px solid #18b8ee;
          outline-offset: 2px;
        }

        .cura-rich-editor div {
          margin: 0;
        }

        .cura-rich-editor .cura-editor-table-object {
          overflow: visible;
        }

        .cura-rich-editor .cura-editor-image {
          overflow: visible;
        }
      ` }} />
    </div>
  )
}
