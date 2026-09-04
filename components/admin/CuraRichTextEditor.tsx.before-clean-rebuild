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
    editor: HTMLDivElement
  ) {
    /*
     * CURA OBJECT MOVEMENT
     *
     * The move handle is deliberately separate from:
     *   - editable table cells
     *   - image resizing
     *
     * The actual object is moved in the DOM. No HTML5 drag/drop,
     * no caretRangeFromPoint(), and no large placeholder is used.
     */

    object.dataset.curaPointerReady = "true"
    object.draggable = false
    object.style.position = "relative"

    /*
     * Remove only old movement UI.
     * Resize handles are retained because resize is handled
     * separately by the editor.
     */
    object
      .querySelectorAll(
        ".cura-image-move-handle, .cura-table-move-handle"
      )
      .forEach((node) => node.remove())

    const moveHandle =
      document.createElement("button")

    moveHandle.type = "button"

    moveHandle.className =
      object.classList.contains(
        "cura-editor-table-object"
      )
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

    moveHandle.title =
      "Drag to move"

    moveHandle.innerHTML = "✣"

    object.appendChild(moveHandle)

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
     * MOVEMENT STATE
     * ----------------------------------------------------------
     */

    let dragging = false
    let moved = false

    let startX = 0
    let startY = 0

    let startLeft = 0
    let startTop = 0

    let originalParent: Node | null = null
    let originalNextSibling: Node | null = null

    /*
     * The object itself is temporarily positioned/floating while
     * dragging. This gives much more predictable behaviour than
     * HTML5 drag/drop inside contentEditable.
     */

    const pointerDown = (
      event: PointerEvent
    ) => {
      event.preventDefault()
      event.stopPropagation()

      selectEditorObject(object)

      dragging = true
      moved = false

      startX = event.clientX
      startY = event.clientY

      const rect =
        object.getBoundingClientRect()

      startLeft = rect.left
      startTop = rect.top

      originalParent =
        object.parentNode

      originalNextSibling =
        object.nextSibling

      /*
       * Store the object's current position.
       */
      object.dataset.curaOriginalMargin =
        object.style.margin

      /*
       * Do not move it until the pointer has actually moved.
       * This prevents accidental movement when simply clicking
       * the handle.
       */

      moveHandle.setPointerCapture?.(
        event.pointerId
      )

      function pointerMove(
        moveEvent: PointerEvent
      ) {
        if (!dragging) return

        const dx =
          moveEvent.clientX - startX

        const dy =
          moveEvent.clientY - startY

        if (
          !moved &&
          Math.abs(dx) < 4 &&
          Math.abs(dy) < 4
        ) {
          return
        }

        moved = true

        /*
         * Once movement starts, temporarily remove the object
         * from normal flow and make it follow the pointer.
         */
        if (
          object.parentElement === editor
        ) {
          const rect =
            object.getBoundingClientRect()

          object.style.width =
            `${rect.width}px`

          object.style.position =
            "fixed"

          object.style.left =
            `${startLeft + dx}px`

          object.style.top =
            `${startTop + dy}px`

          object.style.margin =
            "0"

          object.style.zIndex =
            "99999"

          object.style.pointerEvents =
            "none"

          object.style.opacity =
            "0.85"

          /*
           * Find where the object would be inserted.
           * This uses the pointer's actual location.
           */
          updateDropTarget(
            moveEvent.clientX,
            moveEvent.clientY
          )
        } else {
          object.style.position =
            "fixed"

          object.style.left =
            `${startLeft + dx}px`

          object.style.top =
            `${startTop + dy}px`

          updateDropTarget(
            moveEvent.clientX,
            moveEvent.clientY
          )
        }
      }

      function pointerUp(
        upEvent: PointerEvent
      ) {
        if (!dragging) return

        dragging = false

        moveHandle.releasePointerCapture?.(
          upEvent.pointerId
        )

        document.removeEventListener(
          "pointermove",
          pointerMove
        )

        document.removeEventListener(
          "pointerup",
          pointerUp
        )

        /*
         * If the user only clicked the handle,
         * restore everything and do nothing.
         */
        if (!moved) {
          restoreObject()
          return
        }

        /*
         * Drop the object at the calculated location.
         */
        const marker =
          editor.querySelector(
            ".cura-object-drop-marker"
          ) as HTMLElement | null

        if (
          marker &&
          marker.parentNode === editor
        ) {
          object.style.position =
            "relative"

          object.style.left = ""
          object.style.top = ""
          object.style.zIndex = ""
          object.style.pointerEvents = ""
          object.style.opacity = ""
          object.style.width =
            object.style.width

          editor.insertBefore(
            object,
            marker
          )

          marker.remove()

          /*
           * Preserve horizontal alignment based on where
           * the pointer was released.
           */
          applyHorizontalAlignment(
            object,
            upEvent.clientX
          )

          update()
        } else {
          restoreObject()
        }
      }

      document.addEventListener(
        "pointermove",
        pointerMove
      )

      document.addEventListener(
        "pointerup",
        pointerUp
      )
    }

    function restoreObject() {
      object.style.position =
        "relative"

      object.style.left = ""
      object.style.top = ""
      object.style.zIndex = ""
      object.style.pointerEvents = ""
      object.style.opacity = ""

      const originalMargin =
        object.dataset.curaOriginalMargin

      if (
        originalMargin !== undefined
      ) {
        object.style.margin =
          originalMargin
      }

      if (
        originalParent &&
        originalParent instanceof Node
      ) {
        if (
          originalNextSibling &&
          originalNextSibling.parentNode ===
            originalParent
        ) {
          originalParent.insertBefore(
            object,
            originalNextSibling
          )
        } else {
          originalParent.appendChild(
            object
          )
        }
      }

      editor
        .querySelectorAll(
          ".cura-object-drop-marker"
        )
        .forEach(
          (node) => node.remove()
        )
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
        element === object
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

    function updateDropTarget(
      clientX: number,
      clientY: number
    ) {
      let marker =
        editor.querySelector(
          ".cura-object-drop-marker"
        ) as HTMLElement | null

      if (!marker) {
        marker =
          document.createElement("div")

        marker.className =
          "cura-object-drop-marker"

        marker.setAttribute(
          "data-cura-editor-ui",
          "true"
        )

        marker.contentEditable =
          "false"

        marker.style.height =
          "4px"

        marker.style.width =
          "100%"

        marker.style.margin =
          "6px 0"

        marker.style.borderRadius =
          "4px"

        marker.style.background =
          "#18B8EE"

        marker.style.pointerEvents =
          "none"

        marker.style.boxSizing =
          "border-box"
      }

      /*
       * Temporarily ignore the marker when determining
       * what's under the pointer.
       */
      marker.style.display =
        "none"

      const target =
        document.elementFromPoint(
          clientX,
          clientY
        )

      marker.style.display =
        ""

      if (!target) {
        return
      }

      let targetElement =
        target instanceof HTMLElement
          ? target
          : target.parentElement

      /*
       * Find the nearest object or top-level text block.
       */
      let candidate:
        | HTMLElement
        | null = null

      while (
        targetElement &&
        targetElement !== editor
      ) {
        if (
          targetElement !== object &&
          (
            targetElement.classList.contains(
              "cura-editor-image"
            ) ||
            targetElement.classList.contains(
              "cura-editor-table-object"
            )
          )
        ) {
          candidate =
            targetElement

          break
        }

        targetElement =
          targetElement.parentElement
      }

      if (!candidate) {
        candidate =
          getTopLevelElement(target)
      }

      if (
        candidate &&
        candidate !== object
      ) {
        const rect =
          candidate.getBoundingClientRect()

        if (
          clientY <
          rect.top +
            rect.height / 2
        ) {
          editor.insertBefore(
            marker,
            candidate
          )
        } else if (
          candidate.nextSibling
        ) {
          editor.insertBefore(
            marker,
            candidate.nextSibling
          )
        } else {
          editor.appendChild(
            marker
          )
        }

        return
      }

      /*
       * Empty editor area.
       * Choose the nearest top-level element.
       */
      const children =
        Array.from(
          editor.children
        ).filter(
          (child) => {
            const element =
              child as HTMLElement

            return (
              element !== object &&
              element !== marker &&
              !element.hasAttribute(
                "data-cura-editor-ui"
              )
            )
          }
        ) as HTMLElement[]

      if (
        children.length === 0
      ) {
        editor.appendChild(
          marker
        )

        return
      }

      let closest =
        children[0]

      let distance =
        Number.POSITIVE_INFINITY

      for (
        const child of children
      ) {
        const rect =
          child.getBoundingClientRect()

        const currentDistance =
          Math.abs(
            clientY -
              (
                rect.top +
                rect.height / 2
              )
          )

        if (
          currentDistance <
          distance
        ) {
          distance =
            currentDistance

          closest =
            child
        }
      }

      const rect =
        closest.getBoundingClientRect()

      if (
        clientY <
        rect.top +
          rect.height / 2
      ) {
        editor.insertBefore(
          marker,
          closest
        )
      } else if (
        closest.nextSibling
      ) {
        editor.insertBefore(
          marker,
          closest.nextSibling
        )
      } else {
        editor.appendChild(
          marker
        )
      }
    }

    function applyHorizontalAlignment(
      element: HTMLElement,
      clientX: number
    ) {
      const editorRect =
        editor.getBoundingClientRect()

      const relativeX =
        clientX -
        editorRect.left

      const ratio =
        relativeX /
        Math.max(
          1,
          editorRect.width
        )

      /*
       * Word-like three-position alignment:
       *
       * left   < 33%
       * centre 33%–66%
       * right  > 66%
       */
      if (ratio < 0.33) {
        element.style.marginLeft =
          "0"

        element.style.marginRight =
          "auto"
      } else if (ratio > 0.66) {
        element.style.marginLeft =
          "auto"

        element.style.marginRight =
          "0"
      } else {
        element.style.marginLeft =
          "auto"

        element.style.marginRight =
          "auto"
      }
    }

    moveHandle.addEventListener(
      "pointerdown",
      pointerDown
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
          editor)
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
          editor)
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
        editor)

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
      editorRef.current as HTMLDivElement)

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
