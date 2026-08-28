import { createClient } from "@supabase/supabase-js"

const url = process.env.NEXT_PUBLIC_SUPABASE_URL

const key =
  process.env.SUPABASE_SERVICE_ROLE_KEY ||
  process.env.SUPABASE_SERVICE_KEY

if (!url || !key) {
  throw new Error(
    "NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY/SUPABASE_SERVICE_KEY are required."
  )
}

const supabase = createClient(url, key)

/*
 * ============================================================
 * AUTHORITATIVE SOURCE ILLUSTRATIONS
 * ============================================================
 *
 * These are the illustrations explicitly registered in:
 *
 * app/education/materials/accounting/data/illustrations.ts
 *
 * Matching is performed by SOURCE PAGE, not by section title.
 * ============================================================
 */

const illustrations = [
  {
    id: "ch9-p17",
    topicHints: ["employee-benefits"],
    sourceFile: "Chapter 9_Employee Benefits.pdf",
    sourcePage: 17,
    sourceLabel: "Illustration 1, 2, 3",
    asset:
      "/education/accounting/illustrations/chapter-9-employee-benefits-p17-illustration-1-2-3.png",
  },
  {
    id: "ch9-p20",
    topicHints: ["employee-benefits"],
    sourceFile: "Chapter 9_Employee Benefits.pdf",
    sourcePage: 20,
    sourceLabel: "Illustration 4",
    asset:
      "/education/accounting/illustrations/chapter-9-employee-benefits-p20-illustration-4.png",
  },
  {
    id: "ch5-p67",
    topicHints: [],
    sourceFile: "Chapter 5.pdf",
    sourcePage: 67,
    sourceLabel: "Illustration 1 & 2",
    asset:
      "/education/accounting/illustrations/chapter-5-p67-illustration-1-2.png",
  },
  {
    id: "ch5-p75",
    topicHints: [],
    sourceFile: "Chapter 5.pdf",
    sourcePage: 75,
    sourceLabel: "Illustration 1",
    asset:
      "/education/accounting/illustrations/chapter-5-p75-illustration-1.png",
  },
  {
    id: "ch5-p111",
    topicHints: [],
    sourceFile: "Chapter 5.pdf",
    sourcePage: 111,
    sourceLabel: "Illustration 3",
    asset:
      "/education/accounting/illustrations/chapter-5-p111-illustration-3-tuu-11-homework-tuu-13.png",
  },
  {
    id: "ch18-associates-p5",
    topicHints: ["associates"],
    sourceFile: "Chapter 18_Associates.pdf",
    sourcePage: 5,
    sourceLabel: "Illustration 1",
    asset:
      "/education/accounting/illustrations/chapter-18-associates-p5-illustration-1.png",
  },
  {
    id: "ch18-associates-p11",
    topicHints: ["associates"],
    sourceFile: "Chapter 18_Associates.pdf",
    sourcePage: 11,
    sourceLabel: "Illustration 2",
    asset:
      "/education/accounting/illustrations/chapter-18-associates-p11-illustration-2.png",
  },
  {
    id: "ch8-leases-p20",
    topicHints: ["leases"],
    sourceFile: "Chapter 8_Leases.pdf",
    sourcePage: 20,
    sourceLabel: "Illustration 1",
    asset:
      "/education/accounting/illustrations/chapter-8-leases-p20-illustration-1.png",
  },
  {
    id: "ch8-leases-p44",
    topicHints: ["leases"],
    sourceFile: "Chapter 8_Leases.pdf",
    sourcePage: 44,
    sourceLabel: "Illustration 2",
    asset:
      "/education/accounting/illustrations/chapter-8-leases-p44-illustration-2.png",
  },
  {
    id: "ch18-cspl-p13",
    topicHints: ["consolidated-statement-of-profit-or-loss"],
    sourceFile: "Chapter 18_CSPL.pdf",
    sourcePage: 13,
    sourceLabel: "Illustration 1",
    asset:
      "/education/accounting/illustrations/chapter-18-cspl-p13-illustration-1.png",
  },
  {
    id: "ch18-cspl-p16",
    topicHints: ["consolidated-statement-of-profit-or-loss"],
    sourceFile: "Chapter 18_CSPL.pdf",
    sourcePage: 16,
    sourceLabel: "Illustration 2",
    asset:
      "/education/accounting/illustrations/chapter-18-cspl-p16-illustration-2.png",
  },
  {
    id: "ch18-cspl-p30",
    topicHints: ["consolidated-statement-of-profit-or-loss"],
    sourceFile: "Chapter 18_CSPL.pdf",
    sourcePage: 30,
    sourceLabel: "Illustration 3",
    asset:
      "/education/accounting/illustrations/chapter-18-cspl-p30-illustration-3.png",
  },
  {
    id: "ch18-cspl-p32",
    topicHints: ["consolidated-statement-of-profit-or-loss"],
    sourceFile: "Chapter 18_CSPL.pdf",
    sourcePage: 32,
    sourceLabel: "Illustration 4",
    asset:
      "/education/accounting/illustrations/chapter-18-cspl-p32-illustration-4.png",
  },
  {
    id: "ch18-csfp-p48",
    topicHints: ["consolidated-statement-of-financial-position"],
    sourceFile: "Chapter 18_CSFP.pdf",
    sourcePage: 48,
    sourceLabel: "Illustration 2",
    asset:
      "/education/accounting/illustrations/chapter-18-csfp-p48-illustration-2.png",
  },
  {
    id: "ch18-csfp-p81",
    topicHints: ["consolidated-statement-of-financial-position"],
    sourceFile: "Chapter 18_CSFP.pdf",
    sourcePage: 81,
    sourceLabel: "Illustration 5",
    asset:
      "/education/accounting/illustrations/chapter-18-csfp-p81-illustration-5.png",
  },
  {
    id: "ch18-csfp-p82",
    topicHints: ["consolidated-statement-of-financial-position"],
    sourceFile: "Chapter 18_CSFP.pdf",
    sourcePage: 82,
    sourceLabel: "Illustration 6",
    asset:
      "/education/accounting/illustrations/chapter-18-csfp-p82-illustration-6-tuu-7.png",
  },
  {
    id: "ch19-group-p7",
    topicHints: ["change-in-group-structure"],
    sourceFile: "Chapter 19_Change in Group Structure.pdf",
    sourcePage: 7,
    sourceLabel: "Illustration 2",
    asset:
      "/education/accounting/illustrations/chapter-19-change-in-group-structure-p7-illustration-2.png",
  },
  {
    id: "ch19-group-p13",
    topicHints: ["change-in-group-structure"],
    sourceFile: "Chapter 19_Change in Group Structure.pdf",
    sourcePage: 13,
    sourceLabel: "Illustration 3 & 4",
    asset:
      "/education/accounting/illustrations/chapter-19-change-in-group-structure-p13-illustration-3-4.png",
  },
  {
    id: "ch18-special-p19",
    topicHints: ["consolidation-special-areas"],
    sourceFile: "Chapter 18_Consolidation_Special Areas.pdf",
    sourcePage: 19,
    sourceLabel: "Illustration 5",
    asset:
      "/education/accounting/illustrations/chapter-18-consolidation-special-areas-p19-illustration-5.png",
  },
  {
    id: "ch18-special-p28",
    topicHints: ["consolidation-special-areas"],
    sourceFile: "Chapter 18_Consolidation_Special Areas.pdf",
    sourcePage: 28,
    sourceLabel: "Illustration 3",
    asset:
      "/education/accounting/illustrations/chapter-18-consolidation-special-areas-p28-illustration-3.png",
  },
  {
    id: "ch10-share-p17",
    topicHints: ["share-based-payments"],
    sourceFile: "Chapter 10_Share-based Payments.pdf",
    sourcePage: 17,
    sourceLabel: "Illustration 2",
    asset:
      "/education/accounting/illustrations/chapter-10-share-based-payments-p17-illustration-2.png",
  },
]

function normalize(value) {
  return String(value || "")
    .toLowerCase()
    .replace(/[–—]/g, "-")
    .replace(/[_\s]+/g, "-")
    .replace(/[^a-z0-9-]/g, "")
}

function topicMatches(topic, illustration) {
  const slug = normalize(topic.slug)
  const title = normalize(topic.title)

  if (!illustration.topicHints?.length) {
    return true
  }

  return illustration.topicHints.some((hint) => {
    const h = normalize(hint)

    return (
      slug.includes(h) ||
      h.includes(slug) ||
      title.includes(h)
    )
  })
}

function getSourcePages(section) {
  const presentation =
    section.presentation &&
    typeof section.presentation === "object"
      ? section.presentation
      : {}

  const pages =
    presentation.source_pages

  if (Array.isArray(pages)) {
    return pages
      .map(Number)
      .filter(Number.isFinite)
  }

  if (typeof pages === "number") {
    return [pages]
  }

  if (typeof pages === "string") {
    return pages
      .split(/[,\s]+/)
      .map(Number)
      .filter(Number.isFinite)
  }

  return []
}

function removeVisualMetadata(presentation) {
  const next =
    presentation &&
    typeof presentation === "object"
      ? { ...presentation }
      : {}

  delete next.cura_visual
  delete next.cura_visuals
  delete next.cura_illustration
  delete next.cura_illustrations
  delete next.cura_source_visual
  delete next.source_visual
  delete next.section_visual

  return next
}

async function main() {
  console.log("")
  console.log("============================================================")
  console.log(" CURA SOURCE-PAGE VISUAL UPDATE")
  console.log("============================================================")
  console.log("")

  const { data: topics, error: topicError } =
    await supabase
      .from("education_topics")
      .select("id,slug,title")
      .order("display_order", {
        ascending: true,
      })

  if (topicError) throw topicError

  let sectionsChecked = 0
  let visualsApplied = 0
  let sectionsCleared = 0

  for (const topic of topics || []) {
    const { data: sections, error } =
      await supabase
        .from("education_sections")
        .select(
          "id,title,display_order,presentation"
        )
        .eq("topic_id", topic.id)
        .order("display_order", {
          ascending: true,
        })

    if (error) throw error

    for (const section of sections || []) {
      sectionsChecked++

      const base =
        removeVisualMetadata(
          section.presentation
        )

      /*
       * CURA Learning Map and Key Takeaways are native
       * CURA sections, not source-material illustration
       * sections.
       */
      if (
        section.display_order === 0 ||
        section.display_order === 1
      ) {
        await supabase
          .from("education_sections")
          .update({
            presentation: base,
            updated_at:
              new Date().toISOString(),
          })
          .eq("id", section.id)

        continue
      }

      const pages =
        getSourcePages(section)

      /*
       * Find an illustration whose source page actually
       * belongs to this section and whose source topic
       * corresponds to the current topic.
       */
      const matches =
        illustrations.filter(
          (illustration) =>
            pages.includes(
              illustration.sourcePage
            ) &&
            topicMatches(
              topic,
              illustration
            )
        )

      if (!matches.length) {
        await supabase
          .from("education_sections")
          .update({
            presentation: base,
            updated_at:
              new Date().toISOString(),
          })
          .eq("id", section.id)

        sectionsCleared++
        continue
      }

      /*
       * One section can contain more than one source
       * illustration.
       */
      const visuals =
        matches.map((illustration) => ({
          version: 1,
          source_controlled: true,
          type: "source-material-recreation-reference",
          eyebrow:
            "CURA source-material visual",
          title:
            illustration.sourceLabel,
          source: {
            id: illustration.id,
            sourceFile:
              illustration.sourceFile,
            sourcePage:
              illustration.sourcePage,
            sourceLabel:
              illustration.sourceLabel,
            asset:
              illustration.asset,
          },
        }))

      base.cura_source_visuals =
        visuals

      /*
       * Preserve backwards compatibility with the
       * renderer if it expects one visual.
       */
      base.cura_source_visual =
        visuals[0]

      const { error: updateError } =
        await supabase
          .from("education_sections")
          .update({
            presentation: base,
            updated_at:
              new Date().toISOString(),
          })
          .eq("id", section.id)

      if (updateError) throw updateError

      visualsApplied += matches.length

      console.log(
        `✓ ${topic.slug} | ${section.title} | ${matches.map((x) => `${x.sourceLabel} p.${x.sourcePage}`).join(", ")}`
      )
    }
  }

  console.log("")
  console.log("============================================================")
  console.log(" COMPLETE")
  console.log("============================================================")
  console.log(`Sections checked: ${sectionsChecked}`)
  console.log(`Source visuals applied: ${visualsApplied}`)
  console.log(`Sections with no source visual: ${sectionsCleared}`)
  console.log("")
  console.log("RULE:")
  console.log("No source-page match = no illustration.")
  console.log("No generic title-based illustration is generated.")
  console.log("")
}

main().catch((error) => {
  console.error("")
  console.error("SOURCE VISUAL UPDATE FAILED")
  console.error(error)
  process.exit(1)
})
