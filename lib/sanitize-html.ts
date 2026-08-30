import DOMPurify from "isomorphic-dompurify"

const ALLOWED_TAGS = [
  // Text
  "p",
  "br",
  "strong",
  "b",
  "em",
  "i",
  "u",
  "s",
  "span",

  // Headings
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",

  // Lists
  "ul",
  "ol",
  "li",

  // Links
  "a",

  // Layout / editor content
  "div",

  // Tables
  "table",
  "thead",
  "tbody",
  "tfoot",
  "tr",
  "th",
  "td",
  "caption",

  // Images
  "img",

  // Quotations
  "blockquote",

  // Other useful text elements
  "hr",
  "sup",
  "sub",
]

const ALLOWED_ATTR = [
  // Links
  "href",
  "target",
  "rel",

  // Images
  "src",
  "alt",
  "title",
  "width",
  "height",

  // Tables
  "colspan",
  "rowspan",
  "scope",

  // CURA editor formatting
  "class",
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
      "base",
      "meta",
      "link",
    ],

    FORBID_ATTR: [
      "onerror",
      "onload",
      "onclick",
      "ondblclick",
      "onmousedown",
      "onmouseup",
      "onmousemove",
      "onmouseover",
      "onmouseout",
      "onmouseenter",
      "onmouseleave",
      "onkeydown",
      "onkeyup",
      "onkeypress",
      "onfocus",
      "onblur",
      "onchange",
      "onsubmit",
      "oninput",
      "onload",
      "srcdoc",
    ],

    ALLOW_DATA_ATTR: false,

    /*
     * Keep relative/internal URLs working while allowing
     * normal HTTPS links and images.
     */
    ALLOW_UNKNOWN_PROTOCOLS: false,
  })
}
