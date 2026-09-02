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

    if (!id) {
      return NextResponse.json(
        {
          error: "Section ID is required.",
        },
        { status: 400 }
      )
    }

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
      typeof body?.block_type === "string"
        ? body.block_type
        : "paragraph"

    if (!allowed.includes(blockType)) {
      return NextResponse.json(
        {
          error: "Invalid content block type.",
        },
        { status: 400 }
      )
    }

    const supabase = await db()

    /*
     * Make sure the section exists before creating
     * a content block.
     */
    const {
      data: section,
      error: sectionError,
    } = await supabase
      .from("education_sections")
      .select("id")
      .eq("id", id)
      .single()

    if (sectionError) {
      throw sectionError
    }

    if (!section) {
      return NextResponse.json(
        {
          error: "Section not found.",
        },
        { status: 404 }
      )
    }

    /*
     * Determine the next display order.
     */
    const {
      data: maxRow,
      error: maxError,
    } = await supabase
      .from("education_content_blocks")
      .select("display_order")
      .eq("section_id", id)
      .order("display_order", {
        ascending: false,
      })
      .limit(1)
      .maybeSingle()

    if (maxError) {
      throw maxError
    }

    const nextOrder =
      Number(maxRow?.display_order ?? 0) + 1

    const initialContent =
      blockType === "heading"
        ? "New heading"
        : ""

    const {
      data: block,
      error: blockError,
    } = await supabase
      .from("education_content_blocks")
      .insert({
        section_id: id,
        block_type: blockType,
        content: initialContent,
        display_order: nextOrder,

        /*
         * New blocks are immediately available to the
         * editor and can be published through Save &
         * Publish.
         */
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

    if (blockError) {
      throw blockError
    }

    /*
     * List blocks need an initial item so the editor
     * has something to edit.
     */
    if (
      blockType === "bullet_list" ||
      blockType === "numbered_list"
    ) {
      const {
        error: itemError,
      } = await supabase
        .from("education_block_items")
        .insert({
          block_id: block.id,
          content: "",
          item_type: "item",
          display_order: 0,
        })

      if (itemError) {
        throw itemError
      }
    }

    return NextResponse.json({
      success: true,
      block,
    })
  } catch (error) {
    console.error(
      "Education content block POST error:",
      error
    )

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
