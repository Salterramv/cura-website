import React from "react"

type CuraAccountingVisualProps = {
  topicTitle?: string
  sectionTitle?: string
  standard?: string | null
  mode?: "hero" | "section" | string
}

/*
 * CURA accounting visuals are intentionally disabled for now.
 *
 * The previous implementation used topic-level illustrations
 * repeatedly across multiple sections. This produced visuals
 * that were sometimes unrelated to the specific accounting
 * concept being taught.
 *
 * We will reintroduce visuals later as genuine content
 * illustrations tied to individual concepts/sections.
 */

export default function CuraAccountingVisual(
  _props: CuraAccountingVisualProps
) {
  return null
}
