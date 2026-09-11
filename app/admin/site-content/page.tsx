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
    | "footer_column"
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
  default_value?: string | null
  default_url?: string | null
  default_image_url?: string | null
  default_visible?: boolean | null
  default_sort_order?: number | null
  is_custom?: boolean
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

    if (activeArea === "footer") {
      const defaultSocials: ContentItem[] = [
        {
          area: "footer",
          section_key: "social",
          item_key: "facebook",
          item_type: "link",
          label: "Facebook",
          value: "Facebook",
          url: null,
          image_url: null,
          visible: true,
          sort_order: 1,
          settings: {
            footer_role: "social",
            icon: "facebook",
          },
          default_value: "Facebook",
          default_url: null,
          default_image_url: null,
          default_visible: true,
          default_sort_order: 1,
          is_custom: false,
        },
        {
          area: "footer",
          section_key: "social",
          item_key: "instagram",
          item_type: "link",
          label: "Instagram",
          value: "Instagram",
          url: null,
          image_url: null,
          visible: true,
          sort_order: 2,
          settings: {
            footer_role: "social",
            icon: "instagram",
          },
          default_value: "Instagram",
          default_url: null,
          default_image_url: null,
          default_visible: true,
          default_sort_order: 2,
          is_custom: false,
        },
        {
          area: "footer",
          section_key: "social",
          item_key: "linkedin",
          item_type: "link",
          label: "LinkedIn",
          value: "LinkedIn",
          url: null,
          image_url: null,
          visible: true,
          sort_order: 3,
          settings: {
            footer_role: "social",
            icon: "linkedin",
          },
          default_value: "LinkedIn",
          default_url: null,
          default_image_url: null,
          default_visible: true,
          default_sort_order: 3,
          is_custom: false,
        },
      ]

      const existingSocialKeys = new Set(
        loaded
          .filter(
            (item) =>
              item.section_key === "social" &&
              item.settings?.footer_role === "social"
          )
          .map((item) => item.item_key)
      )

      const missingSocials = defaultSocials.filter(
        (item) => !existingSocialKeys.has(item.item_key)
      )

      if (missingSocials.length > 0) {
        const { data: insertedSocials, error: socialInsertError } =
          await supabase
            .from("site_content")
            .upsert(missingSocials, {
              onConflict: "area,section_key,item_key",
            })
            .select("*")

        if (socialInsertError) {
          setError(socialInsertError.message)
          setLoading(false)
          return
        }

        loaded = [...loaded, ...((insertedSocials ?? []) as ContentItem[])]
      }
    }

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
      default_value: item.default_value ?? item.value,
      default_url: item.default_url ?? item.url,
      default_image_url: item.default_image_url ?? item.image_url,
      default_visible:
        item.default_visible ?? item.visible,
      default_sort_order:
        item.default_sort_order ?? item.sort_order,
      is_custom: item.is_custom ?? false,
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
      default_value: item.default_value ?? item.value,
      default_url: item.default_url ?? item.url,
      default_image_url: item.default_image_url ?? item.image_url,
      default_visible:
        item.default_visible ?? item.visible,
      default_sort_order:
        item.default_sort_order ?? item.sort_order,
      is_custom: item.is_custom ?? false,
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

  function nextFooterOrder(sectionKey: string) {
    const sectionItems = items.filter(
      (item) => item.section_key === sectionKey
    )

    if (sectionItems.length === 0) return 1

    return (
      Math.max(...sectionItems.map((item) => item.sort_order || 0)) + 1
    )
  }

  async function addFooterColumn() {
    const heading = window.prompt("Enter the new footer column heading:")

    if (!heading?.trim()) return

    const keyBase =
      heading
        .trim()
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "_")
        .replace(/^_|_$/g, "") || "column"

    let key = keyBase
    let counter = 2

    while (
      items.some(
        (item) =>
          item.area === "footer" &&
          item.item_key === key &&
          item.item_type === "footer_column"
      )
    ) {
      key = `${keyBase}_${counter++}`
    }

    const item: ContentItem = {
      area: "footer",
      section_key: "footer_columns",
      item_key: key,
      item_type: "menu",
      label: heading.trim(),
      value: heading.trim(),
      url: null,
      image_url: null,
      visible: true,
      sort_order: nextFooterOrder("footer_columns"),
      settings: {
        footer_role: "column",
      },
      is_custom: true,
    }

    setSaving(true)
    setError("")
    setMessage("")

    const { data, error: insertError } = await supabase
      .from("site_content")
      .insert(item)
      .select("*")
      .single()

    if (insertError) {
      setError(insertError.message)
      setSaving(false)
      return
    }

    setItems((current) => [...current, data as ContentItem])
    setMessage(`Footer column "${heading.trim()}" added.`)
    setSaving(false)
  }

  async function addFooterLink(column: ContentItem) {
    const label = window.prompt(
      `Enter the link name for "${column.label || column.item_key}":`
    )

    if (!label?.trim()) return

    const url = window.prompt(
      "Enter the URL (for example /articles or https://example.com):",
      "/"
    )

    if (url === null || !url.trim()) return

    const columnKey = column.item_key

    const existingLinks = items.filter(
      (item) =>
        item.area === "footer" &&
        item.section_key === `column_${columnKey}` &&
        item.item_type === "link"
    )

    const item: ContentItem = {
      area: "footer",
      section_key: `column_${columnKey}`,
      item_key: `link_${Date.now()}`,
      item_type: "link",
      label: label.trim(),
      value: label.trim(),
      url: url.trim(),
      image_url: null,
      visible: true,
      sort_order:
        existingLinks.length > 0
          ? Math.max(...existingLinks.map((item) => item.sort_order || 0)) + 1
          : 1,
      settings: {
        footer_role: "link",
        column_key: columnKey,
      },
      is_custom: true,
    }

    setSaving(true)
    setError("")
    setMessage("")

    const { data, error: insertError } = await supabase
      .from("site_content")
      .insert(item)
      .select("*")
      .single()

    if (insertError) {
      setError(insertError.message)
      setSaving(false)
      return
    }

    setItems((current) => [...current, data as ContentItem])
    setMessage(`Footer link "${label.trim()}" added.`)
    setSaving(false)
  }

  async function addFooterSocial() {
    const label = window.prompt(
      "Enter the social platform name (for example Facebook, Instagram, LinkedIn):"
    )

    if (!label?.trim()) return

    const url = window.prompt(
      `Enter the ${label.trim()} profile URL:`,
      "https://"
    )

    if (url === null || !url.trim()) return

    const base =
      label
        .trim()
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "_")
        .replace(/^_|_$/g, "") || "social"

    const item: ContentItem = {
      area: "footer",
      section_key: "social",
      item_key: `${base}_${Date.now()}`,
      item_type: "link",
      label: label.trim(),
      value: label.trim(),
      url: url.trim(),
      image_url: null,
      visible: true,
      sort_order: nextFooterOrder("social"),
      settings: {
        footer_role: "social",
        icon: base,
      },
      is_custom: true,
    }

    setSaving(true)
    setError("")
    setMessage("")

    const { data, error: insertError } = await supabase
      .from("site_content")
      .insert(item)
      .select("*")
      .single()

    if (insertError) {
      setError(insertError.message)
      setSaving(false)
      return
    }

    setItems((current) => [...current, data as ContentItem])
    setMessage(`${label.trim()} social link added.`)
    setSaving(false)
  }

  async function deleteFooterItem(item: ContentItem) {
    if (!item.id) return

    const confirmed = window.confirm(
      `Delete "${item.label || item.item_key}"? Custom items are permanently removed from the footer.`
    )

    if (!confirmed) return

    setSaving(true)
    setError("")
    setMessage("")

    const { error: deleteError } = await supabase
      .from("site_content")
      .delete()
      .eq("id", item.id)

    if (deleteError) {
      setError(deleteError.message)
      setSaving(false)
      return
    }

    setItems((current) => current.filter((existing) => existing.id !== item.id))
    setMessage(`${item.label || item.item_key} deleted.`)
    setSaving(false)
  }

  async function revertFooterItem(item: ContentItem) {
    if (!item.id || item.is_custom) return

    const confirmed = window.confirm(
      `Revert "${item.label}" to the current CURA default?`
    )

    if (!confirmed) return

    setSaving(true)
    setError("")
    setMessage("")

    const payload = {
      value: item.default_value ?? item.value,
      url: item.default_url ?? item.url,
      image_url: item.default_image_url ?? item.image_url,
      visible: item.default_visible ?? item.visible,
      sort_order: item.default_sort_order ?? item.sort_order,
      settings: item.settings ?? {},
      is_custom: false,
    }

    const { data, error: revertError } = await supabase
      .from("site_content")
      .update(payload)
      .eq("id", item.id)
      .select("*")
      .single()

    if (revertError) {
      setError(revertError.message)
      setSaving(false)
      return
    }

    setItems((current) =>
      current.map((existing) =>
        existing.id === item.id ? (data as ContentItem) : existing
      )
    )

    setMessage(`${item.label} reverted to the CURA default.`)
    setSaving(false)
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

            {activeArea === "footer" ? (
              <div className="space-y-8">

                {/* Footer Builder introduction */}
                <section className="rounded-2xl border border-[#b9e8f7] bg-gradient-to-r from-[#effbff] to-white p-6">
                  <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-center">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#087dcc]">
                        Footer Builder
                      </p>
                      <h3 className="mt-2 text-2xl font-bold text-[#071d41]">
                        Build your CURA footer
                      </h3>
                      <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">
                        Add unlimited columns, links and social media accounts.
                        Existing CURA items can be edited, hidden or reverted
                        to their current default.
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-3">
                      <button
                        type="button"
                        onClick={addFooterColumn}
                        disabled={saving}
                        className="rounded-lg bg-[#061b3d] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#0b2a55] disabled:opacity-50"
                      >
                        + Add Column
                      </button>

                      <button
                        type="button"
                        onClick={addFooterSocial}
                        disabled={saving}
                        className="rounded-lg border border-[#087dcc] bg-white px-5 py-3 text-sm font-semibold text-[#087dcc] transition hover:bg-[#effbff] disabled:opacity-50"
                      >
                        + Add Social
                      </button>
                    </div>
                  </div>
                </section>

                {/* Brand */}
                <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                  <div className="border-b border-slate-200 bg-[#f8fafc] px-6 py-4">
                    <h3 className="text-lg font-bold text-[#071d41]">
                      Footer Brand
                    </h3>
                  </div>

                  <div className="p-6">
                    {items
                      .filter(
                        (item) =>
                          item.section_key === "brand" &&
                          item.visible !== false
                      )
                      .map((item) => (
                        <div
                          key={item.id ?? item.item_key}
                          className="grid gap-5 lg:grid-cols-[1fr_2fr]"
                        >
                          <div>
                            <p className="font-semibold text-[#071d41]">
                              {item.label}
                            </p>
                            <p className="mt-1 text-xs text-slate-400">
                              {item.is_custom ? "Custom item" : "CURA default"}
                            </p>
                          </div>

                          <div>
                            <textarea
                              value={item.value ?? ""}
                              onChange={(event) =>
                                updateItem(
                                  item.id,
                                  "value",
                                  event.target.value
                                )
                              }
                              rows={4}
                              className="w-full resize-y rounded-lg border border-slate-300 px-4 py-3 text-sm leading-6 outline-none focus:border-[#18b8ee] focus:ring-2 focus:ring-[#18b8ee]/20"
                            />

                            <div className="mt-3 flex flex-wrap justify-end gap-2">
                              {!item.is_custom && (
                                <button
                                  type="button"
                                  onClick={() => revertFooterItem(item)}
                                  disabled={saving}
                                  className="rounded-lg border border-slate-300 px-4 py-2 text-xs font-semibold text-slate-600 hover:border-[#087dcc] hover:text-[#087dcc] disabled:opacity-50"
                                >
                                  Revert to Default
                                </button>
                              )}

                              <button
                                type="button"
                                onClick={() => saveItem(item)}
                                disabled={saving}
                                className="rounded-lg bg-[#087dcc] px-4 py-2 text-xs font-semibold text-white hover:bg-[#0b8cda] disabled:opacity-50"
                              >
                                Save
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                </section>

                {/* Flexible columns */}
                <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                  <div className="border-b border-slate-200 bg-[#f8fafc] px-6 py-4">
                    <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
                      <div>
                        <h3 className="text-lg font-bold text-[#071d41]">
                          Footer Columns
                        </h3>
                        <p className="mt-1 text-sm text-slate-500">
                          Add as many columns and links as you need.
                        </p>
                      </div>

                      <button
                        type="button"
                        onClick={addFooterColumn}
                        disabled={saving}
                        className="rounded-lg bg-[#061b3d] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#0b2a55] disabled:opacity-50"
                      >
                        + Add Column
                      </button>
                    </div>
                  </div>

                  <div className="divide-y divide-slate-100">
                    {items
                      .filter(
                        (item) =>
                          item.area === "footer" &&
                          item.item_type === "menu" &&
                          item.settings?.footer_role === "column"
                      )
                      .sort((a, b) => a.sort_order - b.sort_order)
                      .map((column) => {
                        const links = items
                          .filter(
                            (item) =>
                              item.section_key ===
                                `column_${column.item_key}` &&
                              item.item_type === "link"
                          )
                          .sort((a, b) => a.sort_order - b.sort_order)

                        return (
                          <div key={column.id} className="p-6">
                            <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-start">
                              <div className="flex-1">
                                <div className="flex flex-wrap items-center gap-3">
                                  <input
                                    type="text"
                                    value={column.label}
                                    onChange={(event) =>
                                      updateItem(
                                        column.id,
                                        "label",
                                        event.target.value
                                      )
                                    }
                                    className="rounded-lg border border-slate-300 px-3 py-2 text-base font-semibold text-[#071d41] outline-none focus:border-[#18b8ee]"
                                  />

                                  <span className="rounded-full bg-[#effbff] px-3 py-1 text-[10px] font-bold uppercase tracking-wide text-[#087dcc]">
                                    Custom Column
                                  </span>
                                </div>

                                <div className="mt-4 flex items-center gap-4">
                                  <label className="flex items-center gap-2 text-sm text-slate-600">
                                    <input
                                      type="checkbox"
                                      checked={column.visible}
                                      onChange={(event) =>
                                        updateItem(
                                          column.id,
                                          "visible",
                                          event.target.checked
                                        )
                                      }
                                      className="h-4 w-4 rounded border-slate-300 text-[#087dcc]"
                                    />
                                    Show column
                                  </label>

                                  <label className="flex items-center gap-2 text-sm text-slate-600">
                                    Order
                                    <input
                                      type="number"
                                      value={column.sort_order}
                                      onChange={(event) =>
                                        updateItem(
                                          column.id,
                                          "sort_order",
                                          Number(event.target.value)
                                        )
                                      }
                                      className="w-20 rounded-lg border border-slate-300 px-2 py-1.5 text-sm"
                                    />
                                  </label>
                                </div>
                              </div>

                              <div className="flex flex-wrap gap-2">
                                <button
                                  type="button"
                                  onClick={() => addFooterLink(column)}
                                  disabled={saving}
                                  className="rounded-lg bg-[#087dcc] px-4 py-2.5 text-xs font-semibold text-white hover:bg-[#0b8cda] disabled:opacity-50"
                                >
                                  + Add Link
                                </button>

                                <button
                                  type="button"
                                  onClick={() => saveItem(column)}
                                  disabled={saving}
                                  className="rounded-lg border border-slate-300 px-4 py-2.5 text-xs font-semibold text-[#071d41] hover:border-[#087dcc] disabled:opacity-50"
                                >
                                  Save Column
                                </button>

                                <button
                                  type="button"
                                  onClick={() => deleteFooterItem(column)}
                                  disabled={saving}
                                  className="rounded-lg border border-red-200 px-4 py-2.5 text-xs font-semibold text-red-600 hover:bg-red-50 disabled:opacity-50"
                                >
                                  Delete
                                </button>
                              </div>
                            </div>

                            <div className="mt-6 space-y-3">
                              {links.length === 0 ? (
                                <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 p-5 text-center text-sm text-slate-500">
                                  No links in this column yet.
                                </div>
                              ) : (
                                links.map((link) => (
                                  <div
                                    key={link.id}
                                    className="rounded-xl border border-slate-200 bg-slate-50 p-4"
                                  >
                                    <div className="grid gap-4 lg:grid-cols-[1fr_1fr_auto]">
                                      <input
                                        type="text"
                                        value={link.label}
                                        onChange={(event) =>
                                          updateItem(
                                            link.id,
                                            "label",
                                            event.target.value
                                          )
                                        }
                                        placeholder="Link name"
                                        className="rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-[#18b8ee]"
                                      />

                                      <input
                                        type="text"
                                        value={link.url ?? ""}
                                        onChange={(event) =>
                                          updateItem(
                                            link.id,
                                            "url",
                                            event.target.value
                                          )
                                        }
                                        placeholder="/page or https://..."
                                        className="rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-[#18b8ee]"
                                      />

                                      <div className="flex items-center gap-2">
                                        <label className="flex items-center gap-2 text-xs text-slate-600">
                                          <input
                                            type="checkbox"
                                            checked={link.visible}
                                            onChange={(event) =>
                                              updateItem(
                                                link.id,
                                                "visible",
                                                event.target.checked
                                              )
                                            }
                                            className="h-4 w-4 rounded border-slate-300 text-[#087dcc]"
                                          />
                                          Show
                                        </label>

                                        <button
                                          type="button"
                                          onClick={() => saveItem(link)}
                                          disabled={saving}
                                          className="rounded-lg bg-[#087dcc] px-3 py-2 text-xs font-semibold text-white disabled:opacity-50"
                                        >
                                          Save
                                        </button>

                                        <button
                                          type="button"
                                          onClick={() => deleteFooterItem(link)}
                                          disabled={saving}
                                          className="rounded-lg border border-red-200 px-3 py-2 text-xs font-semibold text-red-600 hover:bg-red-50 disabled:opacity-50"
                                        >
                                          Delete
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                ))
                              )}
                            </div>
                          </div>
                        )
                      })}

                    {items.filter(
                      (item) =>
                        item.area === "footer" &&
                        item.item_type === "menu" &&
                        item.settings?.footer_role === "column"
                    ).length === 0 && (
                      <div className="p-10 text-center text-sm text-slate-500">
                        No custom footer columns yet. Your existing CURA
                        footer sections remain available below.
                      </div>
                    )}
                  </div>
                </section>

                {/* Social media */}
                <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                  <div className="border-b border-slate-200 bg-[#f8fafc] px-6 py-4">
                    <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
                      <div>
                        <h3 className="text-lg font-bold text-[#071d41]">
                          Social Media
                        </h3>
                        <p className="mt-1 text-sm text-slate-500">
                          Manage the links used by the existing Follow Us buttons
                          in the CURA footer.
                        </p>
                      </div>

                      <button
                        type="button"
                        onClick={addFooterSocial}
                        disabled={saving}
                        className="rounded-lg bg-[#087dcc] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#0b8cda] disabled:opacity-50"
                      >
                        + Add Social
                      </button>
                    </div>
                  </div>

                  <div className="divide-y divide-slate-100">
                    {items
                      .filter(
                        (item) =>
                          item.section_key === "social" &&
                          item.settings?.footer_role === "social"
                      )
                      .sort((a, b) => a.sort_order - b.sort_order)
                      .map((social) => {
                        const icon = String(
                          social.settings?.icon ?? social.item_key
                        ).toLowerCase()

                        return (
                          <div key={social.id} className="p-5">
                            <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
                              <div className="flex min-w-[210px] items-center gap-3">
                                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#effbff] text-[#087dcc]">
                                  {icon === "facebook" && (
                                    <svg
                                      viewBox="0 0 24 24"
                                      className="h-6 w-6 fill-current"
                                      aria-hidden="true"
                                    >
                                      <path d="M13.5 8H16V4h-2.5C10.46 4 8 6.24 8 10v2H5v4h3v4h4v-4h3.5l.5-4H12v-2c0-1.12.38-2 1.5-2Z" />
                                    </svg>
                                  )}

                                  {icon === "instagram" && (
                                    <svg
                                      viewBox="0 0 24 24"
                                      className="h-6 w-6 fill-none stroke-current"
                                      strokeWidth="2"
                                      aria-hidden="true"
                                    >
                                      <rect
                                        x="3"
                                        y="3"
                                        width="18"
                                        height="18"
                                        rx="5"
                                      />
                                      <circle cx="12" cy="12" r="4" />
                                      <circle
                                        cx="17.5"
                                        cy="6.5"
                                        r="1"
                                        className="fill-current stroke-none"
                                      />
                                    </svg>
                                  )}

                                  {icon === "linkedin" && (
                                    <svg
                                      viewBox="0 0 24 24"
                                      className="h-6 w-6 fill-current"
                                      aria-hidden="true"
                                    >
                                      <path d="M5 8H2V21H5V8ZM3.5 3A2 2 0 1 0 3.5 7A2 2 0 0 0 3.5 3ZM22 13.5C22 9.91 20.09 8 17.14 8C15.58 8 14.54 8.86 14 9.68V8H11V21H14V14.37C14 12.63 14.33 11 16.18 11C18 11 18 12.8 18 14.49V21H21V13.5H22Z" />
                                    </svg>
                                  )}

                                  {!["facebook", "instagram", "linkedin"].includes(
                                    icon
                                  ) && (
                                    <span className="text-lg font-bold">
                                      {social.label?.slice(0, 1).toUpperCase() || "S"}
                                    </span>
                                  )}
                                </div>

                                <div>
                                  <p className="font-semibold text-[#071d41]">
                                    {social.label}
                                  </p>
                                  <p className="text-xs text-slate-500">
                                    {social.is_custom
                                      ? "Custom social link"
                                      : "Default social button"}
                                  </p>
                                </div>
                              </div>

                              <input
                                type="text"
                                value={social.url ?? ""}
                                onChange={(event) =>
                                  updateItem(
                                    social.id,
                                    "url",
                                    event.target.value
                                  )
                                }
                                placeholder="Enter social media URL"
                                className="min-w-0 flex-1 rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-[#18b8ee]"
                              />

                              <div className="flex flex-wrap items-center gap-2">
                                <label className="flex items-center gap-2 px-1 text-xs text-slate-600">
                                  <input
                                    type="checkbox"
                                    checked={social.visible}
                                    onChange={(event) =>
                                      updateItem(
                                        social.id,
                                        "visible",
                                        event.target.checked
                                      )
                                    }
                                    className="h-4 w-4 rounded border-slate-300 text-[#087dcc]"
                                  />
                                  Show
                                </label>

                                <button
                                  type="button"
                                  onClick={() => saveItem(social)}
                                  disabled={saving}
                                  className="rounded-lg bg-[#087dcc] px-3 py-2 text-xs font-semibold text-white hover:bg-[#0b8cda] disabled:opacity-50"
                                >
                                  Save
                                </button>

                                {!social.is_custom && (
                                  <button
                                    type="button"
                                    onClick={() => revertFooterItem(social)}
                                    disabled={saving}
                                    className="rounded-lg border border-slate-300 px-3 py-2 text-xs font-semibold text-slate-700 hover:border-[#18b8ee] disabled:opacity-50"
                                  >
                                    Revert
                                  </button>
                                )}

                                {social.is_custom && (
                                  <button
                                    type="button"
                                    onClick={() => deleteFooterItem(social)}
                                    disabled={saving}
                                    className="rounded-lg border border-red-200 px-3 py-2 text-xs font-semibold text-red-600 hover:bg-red-50 disabled:opacity-50"
                                  >
                                    Delete
                                  </button>
                                )}
                              </div>
                            </div>
                          </div>
                        )
                      })}

                    {items.filter(
                      (item) =>
                        item.section_key === "social" &&
                        item.settings?.footer_role === "social"
                    ).length === 0 && (
                      <div className="p-10 text-center text-sm text-slate-500">
                        No social media buttons configured yet.
                      </div>
                    )}
                  </div>
                </section>

                {/* Existing CURA footer settings */}
                <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                  <div className="border-b border-slate-200 bg-[#f8fafc] px-6 py-4">
                    <h3 className="text-lg font-bold text-[#071d41]">
                      Existing CURA Footer Settings
                    </h3>
                    <p className="mt-1 text-sm text-slate-500">
                      These are the original CURA footer items. You can edit,
                      hide or revert them individually.
                    </p>
                  </div>

                  <div className="divide-y divide-slate-100">
                    {groupedItems
                      .filter(
                        ([section]) =>
                          !["footer_columns", "social"].includes(section)
                      )
                      .map(([section, sectionItems]) => (
                        <div key={section} className="p-6">
                          <h4 className="mb-4 text-base font-bold text-[#071d41]">
                            {sectionLabel(section)}
                          </h4>

                          <div className="space-y-5">
                            {sectionItems.map((item) => (
                              <div
                                key={item.id ?? item.item_key}
                                className="rounded-xl border border-slate-200 bg-slate-50 p-5"
                              >
                                <div className="grid gap-5 lg:grid-cols-[1fr_2fr]">
                                  <div>
                                    <div className="flex flex-wrap items-center gap-2">
                                      <span className="font-semibold text-[#071d41]">
                                        {item.label}
                                      </span>

                                      <span
                                        className={`rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide ${
                                          item.is_custom
                                            ? "bg-[#effbff] text-[#087dcc]"
                                            : "bg-emerald-50 text-emerald-700"
                                        }`}
                                      >
                                        {item.is_custom
                                          ? "Customized"
                                          : "Default"}
                                      </span>
                                    </div>

                                    <label className="mt-4 flex items-center gap-2 text-sm text-slate-600">
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
                                        className="h-4 w-4 rounded border-slate-300 text-[#087dcc]"
                                      />
                                      Show on website
                                    </label>
                                  </div>

                                  <div className="space-y-3">
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
                                      className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-[#18b8ee]"
                                    />

                                    <textarea
                                      value={item.value ?? ""}
                                      onChange={(event) =>
                                        updateItem(
                                          item.id,
                                          "value",
                                          event.target.value
                                        )
                                      }
                                      rows={item.item_type === "rich_text" ? 4 : 2}
                                      className="w-full resize-y rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm leading-6 outline-none focus:border-[#18b8ee]"
                                    />

                                    {(item.item_type === "link" ||
                                      item.item_type === "contact") && (
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
                                        placeholder="URL"
                                        className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-[#18b8ee]"
                                      />
                                    )}

                                    <div className="flex flex-wrap justify-end gap-2">
                                      <button
                                        type="button"
                                        onClick={() => saveItem(item)}
                                        disabled={saving}
                                        className="rounded-lg bg-[#087dcc] px-4 py-2 text-xs font-semibold text-white disabled:opacity-50"
                                      >
                                        Save
                                      </button>

                                      {!item.is_custom && (
                                        <button
                                          type="button"
                                          onClick={() => revertFooterItem(item)}
                                          disabled={saving}
                                          className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-xs font-semibold text-slate-600 hover:border-[#087dcc] hover:text-[#087dcc] disabled:opacity-50"
                                        >
                                          Revert to Default
                                        </button>
                                      )}

                                      {item.is_custom && (
                                        <button
                                          type="button"
                                          onClick={() => deleteFooterItem(item)}
                                          disabled={saving}
                                          className="rounded-lg border border-red-200 bg-white px-4 py-2 text-xs font-semibold text-red-600 hover:bg-red-50 disabled:opacity-50"
                                        >
                                          Delete
                                        </button>
                                      )}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                  </div>
                </section>
              </div>
            ) : (
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
                        <div
                          key={item.id ?? item.item_key}
                          className="p-6"
                        >
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
            )}
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
