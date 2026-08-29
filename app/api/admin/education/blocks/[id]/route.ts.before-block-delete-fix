import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

async function db() {
  return await createClient()
}

export async function PATCH(
  request: Request,
  context: {
    params: Promise<{ id: string }>
  }
) {
  try {
    const { id } = await context.params
    const body = await request.json()
    const supabase = await db()

    const update: Record<
      string,
      unknown
    > = {}

    if (
      typeof body.content ===
      "string"
    ) {
      update.content = body.content
    }

    if (
      typeof body.title ===
      "string"
    ) {
      update.title = body.title
    }

    if (
      typeof body.presentation ===
      "object"
    ) {
      update.presentation =
        body.presentation
    }

    if (
      typeof body.is_published ===
      "boolean"
    ) {
      update.is_published =
        body.is_published
    }

    update.updated_at =
      new Date().toISOString()

    const { error } =
      await supabase
        .from("education_content_blocks")
        .update(update)
        .eq("id", id)

    if (error) throw error

    return NextResponse.json({
      success: true,
    })
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Unable to update block.",
      },
      { status: 500 }
    )
  }
}

export async function DELETE(
  _request: Request,
  context: {
    params: Promise<{ id: string }>
  }
) {
  try {
    const { id } = await context.params
    const supabase = await db()

    const { error } =
      await supabase
        .from("education_content_blocks")
        .update({
          is_published: false,
          updated_at:
            new Date().toISOString(),
        })
        .eq("id", id)

    if (error) throw error

    return NextResponse.json({
      success: true,
    })
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Unable to remove block.",
      },
      { status: 500 }
    )
  }
}
