import DOMPurify from "isomorphic-dompurify"

const ALLOWED_TAGS = [
  "p",
  "br",
  "strong",
  "b",
  "em",
  "i",
  "u",
  "span",
  "h2",
  "h3",
  "h4",
  "ul",
  "ol",
  "li",
  "a",
]

const ALLOWED_ATTR = [
  "href",
  "target",
  "rel",
  "style",
]

export function sanitizeRichText(
  html: string | null | undefined,
): string {
  if (!html) return ""

  return DOMPurify.sanitize(html, {
    ALLOWED_TAGS,
    ALLOWED_ATTR,
    FORBID_TAGS: [
      "script",
      "iframe",
      "object",
      "embed",
      "form",
      "input",
      "button",
      "textarea",
      "select",
      "style",
    ],
    FORBID_ATTR: [
      "onerror",
      "onload",
      "onclick",
      "onmouseover",
      "onfocus",
      "onblur",
      "srcdoc",
    ],
    ALLOW_DATA_ATTR: false,
  })
}
