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

export async function POST(
  request: Request
) {
  try {
    const body = await request.json()

    const firstId = body.first_id
    const secondId = body.second_id

    if (!firstId || !secondId) {
      return NextResponse.json(
        {
          error:
            "Both block IDs are required.",
        },
        { status: 400 }
      )
    }

    const supabase = db()

    const { data: first, error: firstError } =
      await supabase
        .from("education_content_blocks")
        .select("id,section_id,display_order")
        .eq("id", firstId)
        .single()

    if (firstError) throw firstError

    const { data: second, error: secondError } =
      await supabase
        .from("education_content_blocks")
        .select("id,section_id,display_order")
        .eq("id", secondId)
        .single()

    if (secondError) throw secondError

    if (
      first.section_id !==
      second.section_id
    ) {
      return NextResponse.json(
        {
          error:
            "Blocks must belong to the same section.",
        },
        { status: 400 }
      )
    }

    const temporary =
      Math.max(
        first.display_order,
        second.display_order
      ) + 1000

    await supabase
      .from("education_content_blocks")
      .update({
        display_order:
          temporary,
      })
      .eq("id", first.id)

    await supabase
      .from("education_content_blocks")
      .update({
        display_order:
          first.display_order,
      })
      .eq("id", second.id)

    await supabase
      .from("education_content_blocks")
      .update({
        display_order:
          second.display_order,
        updated_at:
          new Date().toISOString(),
      })
      .eq("id", first.id)

    return NextResponse.json({
      success: true,
    })
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Unable to reorder blocks.",
      },
      { status: 500 }
    )
  }
}
