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
  request: Request,
  context: {
    params: Promise<{ id: string }>
  }
) {
  try {
    const { id } = await context.params
    const body = await request.json()
    const supabase = db()

    const { data: maxRow } =
      await supabase
        .from("education_block_items")
        .select("display_order")
        .eq("block_id", id)
        .order("display_order", {
          ascending: false,
        })
        .limit(1)
        .maybeSingle()

    const nextOrder =
      Number(
        maxRow?.display_order ?? -1
      ) + 1

    const { data, error } =
      await supabase
        .from("education_block_items")
        .insert({
          block_id: id,
          content:
            typeof body.content ===
            "string"
              ? body.content
              : "",
          item_type:
            typeof body.item_type ===
            "string"
              ? body.item_type
              : "item",
          display_order: nextOrder,
        })
        .select()
        .single()

    if (error) throw error

    return NextResponse.json({
      item: data,
    })
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Unable to add point.",
      },
      { status: 500 }
    )
  }
}
