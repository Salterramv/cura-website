import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

async function db() {
  return await createClient()
}

export async function POST(
  request: Request,
  context: {
    params: Promise<{ id: string }>
  }
) {
  try {
    const { id } = await context.params
    const body = await request.json()

    const allowed = [
      "paragraph",
      "heading",
      "bullet_list",
      "numbered_list",
      "callout",
      "note",
      "formula",
      "illustration",
      "table",
    ]

    const blockType =
      typeof body.block_type ===
      "string"
        ? body.block_type
        : "paragraph"

    if (!allowed.includes(blockType)) {
      return NextResponse.json(
        {
          error:
            "Invalid content block type.",
        },
        { status: 400 }
      )
    }

    const supabase = await db()

    const { data: maxRow } =
      await supabase
        .from("education_content_blocks")
        .select("display_order")
        .eq("section_id", id)
        .order("display_order", {
          ascending: false,
        })
        .limit(1)
        .maybeSingle()

    const nextOrder =
      Number(
        maxRow?.display_order ?? 0
      ) + 1

    const initialContent =
      blockType === "heading"
        ? "New heading"
        : ""

    const { data: block, error } =
      await supabase
        .from("education_content_blocks")
        .insert({
          section_id: id,
          block_type: blockType,
          content: initialContent,
          display_order: nextOrder,
          is_published: true,
          version: 1,
          presentation: {
            font: "Geist Sans",
            theme: "cura-professional",
            colors: {
              blue: "#145D8F",
              cyan: "#24B8ED",
              navy: "#071B3A",
            },
            layout: "reading-card",
          },
        })
        .select()
        .single()

    if (error) throw error

    if (
      blockType === "bullet_list" ||
      blockType === "numbered_list"
    ) {
      await supabase
        .from("education_block_items")
        .insert({
          block_id: block.id,
          content: "",
          item_type: "item",
          display_order: 0,
        })
    }

    return NextResponse.json({
      block,
    })
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Unable to create content block.",
      },
      { status: 500 }
    )
  }
}
