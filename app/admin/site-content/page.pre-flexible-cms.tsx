"use client"

import { useEffect, useMemo, useState } from "react"
import Link from "next/link"
import { createClient } from "@/lib/supabase/client"

type Area = "homepage" | "header" | "footer" | "global"

type ContentItem = {
  id?: string
  area: Area
  section_key: string
  item_key: string
  item_type:
    | "text"
    | "rich_text"
    | "button"
    | "link"
    | "image"
    | "toggle"
    | "menu"
    | "dropdown_item"
    | "number"
    | "contact"
  label: string
  value: string | null
  url: string | null
  image_url: string | null
  visible: boolean
  sort_order: number
  settings: Record<string, unknown>
}

const DEFAULT_CONTENT: Omit<ContentItem, "id">[] = [
  // ============================================================
  // HOMEPAGE
  // ============================================================

  {
    area: "homepage",
    section_key: "hero",
    item_key: "eyebrow",
    item_type: "text",
    label: "Hero Eyebrow",
    value: "Maldives Professional Knowledge Platform",
    url: null,
    image_url: null,
    visible: true,
    sort_order: 1,
    settings: {},
  },
  {
    area: "homepage",
    section_key: "hero",
    item_key: "heading",
    item_type: "text",
    label: "Hero Heading",
    value: "Clarity in numbers and legal matters.",
    url: null,
    image_url: null,
    visible: true,
    sort_order: 2,
    settings: {},
  },
  {
    area: "homepage",
    section_key: "hero",
    item_key: "description",
    item_type: "rich_text",
    label: "Hero Description",
    value:
      "CURA brings together practical knowledge in taxation, accounting, audit, advisory and legal matters — helping businesses and professionals make better-informed decisions.",
    url: null,
    image_url: null,
    visible: true,
    sort_order: 3,
    settings: {},
  },
  {
    area: "homepage",
    section_key: "hero",
    item_key: "knowledge_button",
    item_type: "button",
    label: "Explore Knowledge Button",
    value: "Explore Knowledge →",
    url: "/articles",
    image_url: null,
    visible: true,
    sort_order: 4,
    settings: {},
  },
  {
    area: "homepage",
    section_key: "hero",
    item_key: "legal_cases_button",
    item_type: "button",
    label: "Browse Legal Cases Button",
    value: "Browse Legal Cases →",
    url: "/cases",
    image_url: null,
    visible: true,
    sort_order: 5,
    settings: {},
  },
  {
    area: "homepage",
    section_key: "hero",
    item_key: "visual",
    item_type: "image",
    label: "Hero Visual",
    value: "CURA",
    url: null,
    image_url: null,
    visible: true,
    sort_order: 6,
    settings: {
      tagline: "AUDIT · TAX · ADVISORY",
      slogan: "CURE YOUR FIGURES",
    },
  },

  // Service strip
  {
    area: "homepage",
    section_key: "services",
    item_key: "tax",
    item_type: "link",
    label: "Tax",
    value:
      "Practical tax compliance and advisory services for businesses and professionals.",
    url: "/tax",
    image_url: null,
    visible: true,
    sort_order: 1,
    settings: { number: "01" },
  },
  {
    area: "homepage",
    section_key: "services",
    item_key: "audit",
    item_type: "link",
    label: "Audit",
    value:
      "Audit and assurance services focused on financial reporting, risk and controls.",
    url: "/audit",
    image_url: null,
    visible: true,
    sort_order: 2,
    settings: { number: "02" },
  },
  {
    area: "homepage",
    section_key: "services",
    item_key: "advisory",
    item_type: "link",
    label: "Advisory",
    value:
      "Financial and business advice to help management make better decisions.",
    url: "/advisory",
    image_url: null,
    visible: true,
    sort_order: 3,
    settings: { number: "03" },
  },
  {
    area: "homepage",
    section_key: "services",
    item_key: "legal",
    item_type: "link",
    label: "Legal",
    value:
      "Practical legal and regulatory guidance for businesses and commercial matters.",
    url: "/legal",
    image_url: null,
    visible: true,
    sort_order: 4,
    settings: { number: "04" },
  },
  {
    area: "homepage",
    section_key: "services",
    item_key: "education",
    item_type: "link",
    label: "Education",
    value:
      "Learning resources to strengthen your professional knowledge.",
    url: "/education",
    image_url: null,
    visible: true,
    sort_order: 5,
    settings: { number: "05" },
  },
  {
    area: "homepage",
    section_key: "services",
    item_key: "other_services",
    item_type: "link",
    label: "Other Services",
    value:
      "Bookkeeping and payroll support designed around the practical needs of businesses.",
    url: "/other-services",
    image_url: null,
    visible: true,
    sort_order: 6,
    settings: { number: "06" },
  },

  // About
  {
    area: "homepage",
    section_key: "about",
    item_key: "eyebrow",
    item_type: "text",
    label: "About Eyebrow",
    value: "About CURA",
    url: null,
    image_url: null,
    visible: true,
    sort_order: 1,
    settings: {},
  },
  {
    area: "homepage",
    section_key: "about",
    item_key: "heading",
    item_type: "text",
    label: "About Heading",
    value: "Knowledge before advice.",
    url: null,
    image_url: null,
    visible: true,
    sort_order: 2,
    settings: {},
  },
  {
    area: "homepage",
    section_key: "about",
    item_key: "paragraph_1",
    item_type: "rich_text",
    label: "About Paragraph 1",
    value:
      "CURA is being developed as a professional platform focused on making complex tax, accounting, audit and legal matters easier to understand.",
    url: null,
    image_url: null,
    visible: true,
    sort_order: 3,
    settings: {},
  },
  {
    area: "homepage",
    section_key: "about",
    item_key: "paragraph_2",
    item_type: "rich_text",
    label: "About Paragraph 2",
    value:
      "Our goal is simple: provide reliable, practical and accessible knowledge that helps individuals, businesses and professionals navigate the increasingly complex world of regulation and finance.",
    url: null,
    image_url: null,
    visible: true,
    sort_order: 4,
    settings: {},
  },
  {
    area: "homepage",
    section_key: "about",
    item_key: "slogan",
    item_type: "text",
    label: "About Slogan",
    value: "CURE YOUR FIGURES.",
    url: null,
    image_url: null,
    visible: true,
    sort_order: 5,
    settings: {},
  },

  // Updates
  {
    area: "homepage",
    section_key: "updates",
    item_key: "eyebrow",
    item_type: "text",
    label: "Updates Eyebrow",
    value: "CURA Updates",
    url: null,
    image_url: null,
    visible: true,
    sort_order: 1,
    settings: {},
  },
  {
    area: "homepage",
    section_key: "updates",
    item_key: "heading",
    item_type: "text",
    label: "Updates Heading",
    value: "Latest developments and knowledge",
    url: null,
    image_url: null,
    visible: true,
    sort_order: 2,
    settings: {},
  },
  {
    area: "homepage",
    section_key: "updates",
    item_key: "description",
    item_type: "rich_text",
    label: "Updates Description",
    value:
      "Stay informed with recent economic developments, professional articles and legal case analysis.",
    url: null,
    image_url: null,
    visible: true,
    sort_order: 3,
    settings: {},
  },

  // Education
  {
    area: "homepage",
    section_key: "education",
    item_key: "eyebrow",
    item_type: "text",
    label: "Education Eyebrow",
    value: "Education",
    url: null,
    image_url: null,
    visible: true,
    sort_order: 1,
    settings: {},
  },
  {
    area: "homepage",
    section_key: "education",
    item_key: "heading",
    item_type: "text",
    label: "Education Heading",
    value: "Learn. Understand. Apply.",
    url: null,
    image_url: null,
    visible: true,
    sort_order: 2,
    settings: {},
  },
  {
    area: "homepage",
    section_key: "education",
    item_key: "description",
    item_type: "rich_text",
    label: "Education Description",
    value:
      "Practical educational resources covering taxation, accounting, audit, financial reporting and professional development.",
    url: null,
    image_url: null,
    visible: true,
    sort_order: 3,
    settings: {},
  },
  {
    area: "homepage",
    section_key: "education",
    item_key: "button",
    item_type: "button",
    label: "Education Button",
    value: "Explore Education →",
    url: "/education",
    image_url: null,
    visible: true,
    sort_order: 4,
    settings: {},
  },

  // Contact
  {
    area: "homepage",
    section_key: "contact",
    item_key: "eyebrow",
    item_type: "text",
    label: "Contact Eyebrow",
    value: "CURA",
    url: null,
    image_url: null,
    visible: true,
    sort_order: 1,
    settings: {},
  },
  {
    area: "homepage",
    section_key: "contact",
    item_key: "heading",
    item_type: "text",
    label: "Contact Heading",
    value: "Have a question?",
    url: null,
    image_url: null,
    visible: true,
    sort_order: 2,
    settings: {},
  },
  {
    area: "homepage",
    section_key: "contact",
    item_key: "description",
    item_type: "text",
    label: "Contact Description",
    value: "Get in touch with CURA.",
    url: null,
    image_url: null,
    visible: true,
    sort_order: 3,
    settings: {},
  },
  {
    area: "homepage",
    section_key: "contact",
    item_key: "button",
    item_type: "button",
    label: "Contact Button",
    value: "Contact CURA →",
    url: "mailto:info@cura.mv",
    image_url: null,
    visible: true,
    sort_order: 4,
    settings: {},
  },

  // ============================================================
  // HEADER
  // ============================================================

  {
    area: "header",
    section_key: "main_navigation",
    item_key: "home",
    item_type: "menu",
    label: "Home",
    value: "Home",
    url: "/",
    image_url: null,
    visible: true,
    sort_order: 1,
    settings: {},
  },
  {
    area: "header",
    section_key: "main_navigation",
    item_key: "knowledge",
    item_type: "menu",
    label: "Knowledge",
    value: "Knowledge",
    url: "/articles",
    image_url: null,
    visible: true,
    sort_order: 2,
    settings: {},
  },
  {
    area: "header",
    section_key: "main_navigation",
    item_key: "legal_cases",
    item_type: "menu",
    label: "Legal Cases",
    value: "Legal Cases",
    url: "/cases",
    image_url: null,
    visible: true,
    sort_order: 3,
    settings: {},
  },
  {
    area: "header",
    section_key: "main_navigation",
    item_key: "cura_insights",
    item_type: "menu",
    label: "Cura Insights",
    value: "Cura Insights",
    url: null,
    image_url: null,
    visible: true,
    sort_order: 4,
    settings: { dropdown: true },
  },
  {
    area: "header",
    section_key: "main_navigation",
    item_key: "services",
    item_type: "menu",
    label: "Services",
    value: "Services",
    url: null,
    image_url: null,
    visible: true,
    sort_order: 5,
    settings: { dropdown: true },
  },
  {
    area: "header",
    section_key: "main_navigation",
    item_key: "education",
    item_type: "menu",
    label: "Education",
    value: "Education",
    url: null,
    image_url: null,
    visible: true,
    sort_order: 6,
    settings: { dropdown: true },
  },
  {
    area: "header",
    section_key: "main_navigation",
    item_key: "careers",
    item_type: "menu",
    label: "Careers",
    value: "Careers",
    url: "/careers",
    image_url: null,
    visible: true,
    sort_order: 7,
    settings: {},
  },
  {
    area: "header",
    section_key: "main_navigation",
    item_key: "team",
    item_type: "menu",
    label: "Our Team",
    value: "Our Team",
    url: "/team",
    image_url: null,
    visible: true,
    sort_order: 8,
    settings: {},
  },
  {
    area: "header",
    section_key: "main_navigation",
    item_key: "contact",
    item_type: "button",
    label: "Contact",
    value: "Contact",
    url: "/#contact",
    image_url: null,
    visible: true,
    sort_order: 9,
    settings: {},
  },

  // Insights dropdown
  {
    area: "header",
    section_key: "cura_insights",
    item_key: "global_economy",
    item_type: "dropdown_item",
    label: "Global Economy",
    value: "Articles and insights on the global economy",
    url: "/insights/global-economy",
    image_url: null,
    visible: true,
    sort_order: 1,
    settings: {},
  },
  {
    area: "header",
    section_key: "cura_insights",
    item_key: "global_financial_information",
    item_type: "dropdown_item",
    label: "Global Financial Information",
    value:
      "Financial information and indicators from around the world",
    url: "/insights/global-financial-information",
    image_url: null,
    visible: true,
    sort_order: 2,
    settings: {},
  },
  {
    area: "header",
    section_key: "cura_insights",
    item_key: "maldives_economy",
    item_type: "dropdown_item",
    label: "Maldives Economy",
    value: "Economic and financial information about Maldives",
    url: "/insights/maldives-economy",
    image_url: null,
    visible: true,
    sort_order: 3,
    settings: {},
  },
  {
    area: "header",
    section_key: "cura_insights",
    item_key: "exchange_rates",
    item_type: "dropdown_item",
    label: "Exchange Rates",
    value: "Current and historical currency exchange rates",
    url: "/exchange-rate",
    image_url: null,
    visible: true,
    sort_order: 4,
    settings: {},
  },

  // Services dropdown
  {
    area: "header",
    section_key: "services",
    item_key: "audit",
    item_type: "dropdown_item",
    label: "Audit",
    value: "Audit and assurance services",
    url: "/audit",
    image_url: null,
    visible: true,
    sort_order: 1,
    settings: {},
  },
  {
    area: "header",
    section_key: "services",
    item_key: "advisory",
    item_type: "dropdown_item",
    label: "Advisory",
    value: "Financial and business advisory",
    url: "/advisory",
    image_url: null,
    visible: true,
    sort_order: 2,
    settings: {},
  },
  {
    area: "header",
    section_key: "services",
    item_key: "tax",
    item_type: "dropdown_item",
    label: "Tax",
    value: "Tax compliance and advisory",
    url: "/tax",
    image_url: null,
    visible: true,
    sort_order: 3,
    settings: {},
  },
  {
    area: "header",
    section_key: "services",
    item_key: "legal",
    item_type: "dropdown_item",
    label: "Legal",
    value: "Legal and regulatory services",
    url: "/legal",
    image_url: null,
    visible: true,
    sort_order: 4,
    settings: {},
  },
  {
    area: "header",
    section_key: "services",
    item_key: "other_services",
    item_type: "dropdown_item",
    label: "Other Services",
    value: "Bookkeeping and payroll services",
    url: "/other-services",
    image_url: null,
    visible: true,
    sort_order: 5,
    settings: {},
  },

  // Education dropdown
  {
    area: "header",
    section_key: "education",
    item_key: "materials",
    item_type: "dropdown_item",
    label: "Educational Materials",
    value: "Study resources and learning materials",
    url: "/education/materials",
    image_url: null,
    visible: true,
    sort_order: 1,
    settings: {},
  },
  {
    area: "header",
    section_key: "education",
    item_key: "test",
    item_type: "dropdown_item",
    label: "Test Your Knowledge",
    value: "Take a timed professional test",
    url: "/education/test",
    image_url: null,
    visible: true,
    sort_order: 2,
    settings: {},
  },
  {
    area: "header",
    section_key: "education",
    item_key: "articles",
    item_type: "dropdown_item",
    label: "Technical Articles",
    value: "Tax and professional articles",
    url: "/education/articles",
    image_url: null,
    visible: true,
    sort_order: 3,
    settings: {},
  },
  {
    area: "header",
    section_key: "education",
    item_key: "leaderboard",
    item_type: "dropdown_item",
    label: "Leaderboard",
    value: "See the top test scores",
    url: "/education/leaderboard",
    image_url: null,
    visible: true,
    sort_order: 4,
    settings: {},
  },

  // ============================================================
  // FOOTER
  // ============================================================

  {
    area: "footer",
    section_key: "brand",
    item_key: "description",
    item_type: "rich_text",
    label: "Footer Description",
    value:
      "CURA brings together practical knowledge in taxation, accounting, audit, advisory and law — helping businesses and professionals make better-informed decisions.",
    url: null,
    image_url: null,
    visible: true,
    sort_order: 1,
    settings: {},
  },
  {
    area: "footer",
    section_key: "explore",
    item_key: "heading",
    item_type: "text",
    label: "Explore Heading",
    value: "Explore",
    url: null,
    image_url: null,
    visible: true,
    sort_order: 1,
    settings: {},
  },
  {
    area: "footer",
    section_key: "explore",
    item_key: "knowledge",
    item_type: "link",
    label: "Knowledge",
    value: "Knowledge",
    url: "/articles",
    image_url: null,
    visible: true,
    sort_order: 2,
    settings: {},
  },
  {
    area: "footer",
    section_key: "explore",
    item_key: "legal_cases",
    item_type: "link",
    label: "Legal Cases",
    value: "Legal Cases",
    url: "/cases",
    image_url: null,
    visible: true,
    sort_order: 3,
    settings: {},
  },
  {
    area: "footer",
    section_key: "explore",
    item_key: "exchange_rates",
    item_type: "link",
    label: "Exchange Rates",
    value: "Exchange Rates",
    url: "/exchange-rate",
    image_url: null,
    visible: true,
    sort_order: 4,
    settings: {},
  },
  {
    area: "footer",
    section_key: "explore",
    item_key: "careers",
    item_type: "link",
    label: "Careers",
    value: "Careers",
    url: "/careers",
    image_url: null,
    visible: true,
    sort_order: 5,
    settings: {},
  },
  {
    area: "footer",
    section_key: "explore",
    item_key: "team",
    item_type: "link",
    label: "Our Team",
    value: "Our Team",
    url: "/team",
    image_url: null,
    visible: true,
    sort_order: 6,
    settings: {},
  },
  {
    area: "footer",
    section_key: "contact",
    item_key: "heading",
    item_type: "text",
    label: "Contact Heading",
    value: "Contact",
    url: null,
    image_url: null,
    visible: true,
    sort_order: 1,
    settings: {},
  },
  {
    area: "footer",
    section_key: "contact",
    item_key: "link",
    item_type: "link",
    label: "Contact Link",
    value: "Get in touch with CURA",
    url: "/#contact",
    image_url: null,
    visible: true,
    sort_order: 2,
    settings: {},
  },
  {
    area: "footer",
    section_key: "contact",
    item_key: "location",
    item_type: "text",
    label: "Location",
    value: "Maldives",
    url: null,
    image_url: null,
    visible: true,
    sort_order: 3,
    settings: {},
  },
  {
    area: "footer",
    section_key: "copyright",
    item_key: "text",
    item_type: "text",
    label: "Copyright",
    value: "© {year} CURA. All rights reserved.",
    url: null,
    image_url: null,
    visible: true,
    sort_order: 1,
    settings: {},
  },

  // ============================================================
  // GLOBAL
  // ============================================================

  {
    area: "global",
    section_key: "website",
    item_key: "site_title",
    item_type: "text",
    label: "Website Title",
    value: "CURA — Maldives Professional Knowledge Platform",
    url: null,
    image_url: null,
    visible: true,
    sort_order: 1,
    settings: {},
  },
  {
    area: "global",
    section_key: "website",
    item_key: "meta_description",
    item_type: "rich_text",
    label: "Meta Description",
    value:
      "CURA provides practical knowledge and professional services covering taxation, accounting, audit, advisory and legal matters in the Maldives.",
    url: null,
    image_url: null,
    visible: true,
    sort_order: 2,
    settings: {},
  },
  {
    area: "global",
    section_key: "contact",
    item_key: "email",
    item_type: "contact",
    label: "Contact Email",
    value: "info@cura.mv",
    url: "mailto:info@cura.mv",
    image_url: null,
    visible: true,
    sort_order: 1,
    settings: {},
  },
  {
    area: "global",
    section_key: "contact",
    item_key: "location",
    item_type: "contact",
    label: "Location",
    value: "Maldives",
    url: null,
    image_url: null,
    visible: true,
    sort_order: 2,
    settings: {},
  },
]

const AREA_LABELS: Record<Area, string> = {
  homepage: "Homepage",
  header: "Header & Navigation",
  footer: "Footer",
  global: "Global Settings",
}

const SECTION_LABELS: Record<string, string> = {
  hero: "Hero",
  services: "Services",
  about: "About CURA",
  updates: "CURA Updates",
  education: "Education",
  contact: "Contact",
  main_navigation: "Main Navigation",
  cura_insights: "Cura Insights",
  brand: "Brand",
  explore: "Explore",
  copyright: "Copyright",
  website: "Website",
}

function sectionLabel(key: string) {
  return SECTION_LABELS[key] ?? key.replace(/_/g, " ")
}

export default function SiteContentAdmin() {
  const supabase = createClient()

  const [activeArea, setActiveArea] = useState<Area>("homepage")
  const [items, setItems] = useState<ContentItem[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState("")
  const [error, setError] = useState("")

  async function loadContent() {
    setLoading(true)
    setError("")

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

    const { data, error: fetchError } = await supabase
      .from("site_content")
      .select("*")
      .eq("area", activeArea)
      .order("section_key")
      .order("sort_order")

    if (fetchError) {
      setError(fetchError.message)
      setLoading(false)
      return
    }

    let loaded = (data ?? []) as ContentItem[]

    if (loaded.length === 0) {
      const defaults = DEFAULT_CONTENT.filter(
        (item) => item.area === activeArea
      )

      if (defaults.length > 0) {
        const { data: inserted, error: insertError } =
          await supabase
            .from("site_content")
            .upsert(defaults, {
              onConflict: "area,section_key,item_key",
            })
            .select("*")

        if (insertError) {
          setError(insertError.message)
          setLoading(false)
          return
        }

        loaded = (inserted ?? []) as ContentItem[]
      }
    }

    setItems(loaded)
    setLoading(false)
  }

  useEffect(() => {
    loadContent()
  }, [activeArea])

  const groupedItems = useMemo(() => {
    const groups = new Map<string, ContentItem[]>()

    for (const item of items) {
      if (!groups.has(item.section_key)) {
        groups.set(item.section_key, [])
      }

      groups.get(item.section_key)!.push(item)
    }

    return Array.from(groups.entries())
  }, [items])

  function updateItem(
    id: string | undefined,
    field: keyof ContentItem,
    value: unknown
  ) {
    setItems((current) =>
      current.map((item) =>
        item.id === id ? { ...item, [field]: value } : item
      )
    )
  }

  async function saveItem(item: ContentItem) {
    setSaving(true)
    setMessage("")
    setError("")

    const payload = {
      area: item.area,
      section_key: item.section_key,
      item_key: item.item_key,
      item_type: item.item_type,
      label: item.label,
      value: item.value,
      url: item.url,
      image_url: item.image_url,
      visible: item.visible,
      sort_order: item.sort_order,
      settings: item.settings ?? {},
    }

    const { data, error: saveError } = await supabase
      .from("site_content")
      .upsert(payload, {
        onConflict: "area,section_key,item_key",
      })
      .select("*")
      .single()

    if (saveError) {
      setError(saveError.message)
      setSaving(false)
      return
    }

    setItems((current) =>
      current.map((existing) =>
        existing.item_key === item.item_key &&
        existing.section_key === item.section_key
          ? (data as ContentItem)
          : existing
      )
    )

    setMessage(`${item.label} saved successfully.`)
    setSaving(false)
  }

  async function saveAll() {
    setSaving(true)
    setMessage("")
    setError("")

    const payload = items.map((item) => ({
      area: item.area,
      section_key: item.section_key,
      item_key: item.item_key,
      item_type: item.item_type,
      label: item.label,
      value: item.value,
      url: item.url,
      image_url: item.image_url,
      visible: item.visible,
      sort_order: item.sort_order,
      settings: item.settings ?? {},
    }))

    const { error: saveError } = await supabase
      .from("site_content")
      .upsert(payload, {
        onConflict: "area,section_key,item_key",
      })

    if (saveError) {
      setError(saveError.message)
      setSaving(false)
      return
    }

    setMessage(`${items.length} content items saved successfully.`)
    setSaving(false)
    await loadContent()
  }

  async function resetArea() {
    const confirmed = window.confirm(
      `Reset ${AREA_LABELS[activeArea]} to the current CURA defaults? This will overwrite the saved values in this area.`
    )

    if (!confirmed) return

    const defaults = DEFAULT_CONTENT.filter(
      (item) => item.area === activeArea
    )

    setSaving(true)
    setMessage("")
    setError("")

    const { error: resetError } = await supabase
      .from("site_content")
      .upsert(defaults, {
        onConflict: "area,section_key,item_key",
      })

    if (resetError) {
      setError(resetError.message)
      setSaving(false)
      return
    }

    setMessage(`${AREA_LABELS[activeArea]} reset to defaults.`)
    setSaving(false)
    await loadContent()
  }

  return (
    <main className="min-h-screen bg-[#f4f7fb] text-[#071d41]">
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

            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-[#18b8ee]">
                CURA Administration
              </p>

              <h1 className="mt-1 text-lg font-semibold">
                Site Content
              </h1>
            </div>
          </div>

          <Link
            href="/admin"
            className="rounded-lg border border-white/50 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-white/10"
          >
            ← Admin Dashboard
          </Link>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-6 py-10 lg:px-8">
        <div className="mb-8">
          <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#18b8ee]">
            Website Management
          </p>

          <h2 className="mt-2 text-3xl font-bold tracking-tight text-[#071d41]">
            Control CURA Website Content
          </h2>

          <p className="mt-3 max-w-3xl text-base leading-7 text-slate-600">
            Manage website text, navigation, buttons, links and visibility
            from one central location. Changes are saved to the CURA content
            management system.
          </p>
        </div>

        <div className="mb-8 flex flex-wrap gap-3">
          {(Object.keys(AREA_LABELS) as Area[]).map((area) => (
            <button
              key={area}
              type="button"
              onClick={() => {
                setActiveArea(area)
                setMessage("")
                setError("")
              }}
              className={`rounded-xl px-5 py-3 text-sm font-semibold transition ${
                activeArea === area
                  ? "bg-[#061b3d] text-white shadow-sm"
                  : "border border-slate-200 bg-white text-[#071d41] hover:border-[#18b8ee]"
              }`}
            >
              {AREA_LABELS[area]}
            </button>
          ))}
        </div>

        {(message || error) && (
          <div
            className={`mb-6 rounded-xl border px-5 py-4 text-sm ${
              error
                ? "border-red-200 bg-red-50 text-red-700"
                : "border-emerald-200 bg-emerald-50 text-emerald-700"
            }`}
          >
            {error || message}
          </div>
        )}

        {loading ? (
          <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center shadow-sm">
            <div className="mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-4 border-slate-200 border-t-[#18b8ee]" />
            <p className="text-sm font-medium text-slate-600">
              Loading site content...
            </p>
          </div>
        ) : (
          <>
            <div className="mb-6 flex flex-col justify-between gap-4 rounded-2xl border border-[#b9e8f7] bg-[#effbff] p-5 sm:flex-row sm:items-center">
              <div>
                <p className="font-bold text-[#071d41]">
                  {AREA_LABELS[activeArea]}
                </p>
                <p className="mt-1 text-sm text-slate-600">
                  {items.length} editable content items
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={resetArea}
                  disabled={saving}
                  className="rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-[#071d41] transition hover:border-[#087dcc] disabled:opacity-50"
                >
                  Reset Defaults
                </button>

                <button
                  type="button"
                  onClick={saveAll}
                  disabled={saving || items.length === 0}
                  className="rounded-lg bg-[#061b3d] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#0b2a55] disabled:opacity-50"
                >
                  {saving ? "Saving..." : "Save All Changes"}
                </button>
              </div>
            </div>

            <div className="space-y-8">
              {groupedItems.map(([section, sectionItems]) => (
                <section
                  key={section}
                  className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
                >
                  <div className="border-b border-slate-200 bg-[#f8fafc] px-6 py-4">
                    <h3 className="text-lg font-bold capitalize text-[#071d41]">
                      {sectionLabel(section)}
                    </h3>
                  </div>

                  <div className="divide-y divide-slate-100">
                    {sectionItems.map((item) => (
                      <div key={item.id ?? item.item_key} className="p-6">
                        <div className="grid gap-5 lg:grid-cols-[1fr_2fr]">
                          <div>
                            <div className="flex items-center gap-3">
                              <h4 className="font-semibold text-[#071d41]">
                                {item.label}
                              </h4>

                              <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-slate-500">
                                {item.item_type}
                              </span>
                            </div>

                            <p className="mt-2 text-xs text-slate-400">
                              {item.item_key}
                            </p>

                            <label className="mt-5 flex cursor-pointer items-center gap-3">
                              <input
                                type="checkbox"
                                checked={item.visible}
                                onChange={(event) =>
                                  updateItem(
                                    item.id,
                                    "visible",
                                    event.target.checked
                                  )
                                }
                                className="h-4 w-4 rounded border-slate-300 text-[#087dcc] focus:ring-[#18b8ee]"
                              />

                              <span className="text-sm font-medium text-slate-600">
                                Show on website
                              </span>
                            </label>

                            <div className="mt-5">
                              <label className="text-xs font-bold uppercase tracking-wide text-slate-400">
                                Order
                              </label>

                              <input
                                type="number"
                                value={item.sort_order}
                                onChange={(event) =>
                                  updateItem(
                                    item.id,
                                    "sort_order",
                                    Number(event.target.value)
                                  )
                                }
                                className="mt-2 w-24 rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-[#18b8ee] focus:ring-2 focus:ring-[#18b8ee]/20"
                              />
                            </div>
                          </div>

                          <div className="space-y-4">
                            <div>
                              <label className="text-xs font-bold uppercase tracking-wide text-slate-400">
                                Label
                              </label>

                              <input
                                type="text"
                                value={item.label}
                                onChange={(event) =>
                                  updateItem(
                                    item.id,
                                    "label",
                                    event.target.value
                                  )
                                }
                                className="mt-2 w-full rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none focus:border-[#18b8ee] focus:ring-2 focus:ring-[#18b8ee]/20"
                              />
                            </div>

                            <div>
                              <label className="text-xs font-bold uppercase tracking-wide text-slate-400">
                                Content
                              </label>

                              <textarea
                                value={item.value ?? ""}
                                onChange={(event) =>
                                  updateItem(
                                    item.id,
                                    "value",
                                    event.target.value
                                  )
                                }
                                rows={item.item_type === "rich_text" ? 5 : 3}
                                className="mt-2 w-full resize-y rounded-lg border border-slate-300 px-4 py-3 text-sm leading-6 outline-none focus:border-[#18b8ee] focus:ring-2 focus:ring-[#18b8ee]/20"
                              />
                            </div>

                            {(item.item_type === "button" ||
                              item.item_type === "link" ||
                              item.item_type === "menu" ||
                              item.item_type === "dropdown_item" ||
                              item.item_type === "contact") && (
                              <div>
                                <label className="text-xs font-bold uppercase tracking-wide text-slate-400">
                                  URL / Link
                                </label>

                                <input
                                  type="text"
                                  value={item.url ?? ""}
                                  onChange={(event) =>
                                    updateItem(
                                      item.id,
                                      "url",
                                      event.target.value
                                    )
                                  }
                                  className="mt-2 w-full rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none focus:border-[#18b8ee] focus:ring-2 focus:ring-[#18b8ee]/20"
                                />
                              </div>
                            )}

                            <div className="flex justify-end">
                              <button
                                type="button"
                                onClick={() => saveItem(item)}
                                disabled={saving}
                                className="rounded-lg bg-[#087dcc] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#0b8cda] disabled:opacity-50"
                              >
                                Save
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              ))}
            </div>
          </>
        )}
      </div>

      <footer className="border-t border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-6 py-6 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} CURA. All rights reserved.</p>

          <Link
            href="/admin"
            className="font-semibold text-[#071d41] transition hover:text-[#087dcc]"
          >
            Return to Administration →
          </Link>
        </div>
      </footer>
    </main>
  )
}
