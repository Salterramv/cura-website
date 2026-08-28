import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

function db() {
  const url =
    process.env.NEXT_PUBLIC_SUPABASE_URL

  const key =
    process.env.SUPABASE_SERVICE_ROLE_KEY ||
    process.env.SUPABASE_SERVICE_KEY

  if (!url || !key) {
    throw new Error(
      "Supabase environment variables are missing."
    )
  }

  return createClient(url, key)
}

export async function GET(
  _request: Request,
  context: {
    params: Promise<{ id: string }>
  }
) {
  try {
    const { id } = await context.params
    const supabase = db()

    const { data: section, error } =
      await supabase
        .from("education_sections")
        .select(
          `
          id,
          title,
          display_order,
          is_published,
          topic:education_topics(
            id,
            title,
            slug
          )
          `
        )
        .eq("id", id)
        .single()

    if (error) throw error

    const { data: blocks, error: blockError } =
      await supabase
        .from("education_content_blocks")
        .select("*")
        .eq("section_id", id)
        .order("display_order", {
          ascending: true,
        })

    if (blockError) throw blockError

    const blockIds =
      (blocks || []).map(
        (block) => block.id
      )

    let items = []

    if (blockIds.length > 0) {
      const { data: itemRows, error } =
        await supabase
          .from("education_block_items")
          .select("*")
          .in("block_id", blockIds)
          .order("display_order", {
            ascending: true,
          })

      if (error) throw error

      items = itemRows || []
    }

    const enriched =
      (blocks || []).map(
        (block) => ({
          ...block,
          items: items.filter(
            (item) =>
              item.block_id ===
              block.id
          ),
        })
      )

    return NextResponse.json({
      section,
      blocks: enriched,
    })
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Unable to load section editor.",
      },
      { status: 500 }
    )
  }
}
