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

export async function PATCH(
  request: Request,
  context: {
    params: Promise<{ id: string }>
  }
) {
  try {
    const { id } = await context.params
    const body = await request.json()
    const supabase = db()

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
    const supabase = db()

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
