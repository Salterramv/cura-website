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

    const { error } =
      await supabase
        .from("education_block_items")
        .update({
          content:
            typeof body.content ===
            "string"
              ? body.content
              : "",
          item_type:
            typeof body.item_type ===
            "string"
              ? body.item_type
              : undefined,
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
            : "Unable to update point.",
      },
      { status: 500 }
    )
  }
}
