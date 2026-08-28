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

    const { data, error } =
      await supabase
        .from("education_tables")
        .select("*")
        .eq("block_id", id)
        .limit(1)
        .maybeSingle()

    if (error) throw error

    return NextResponse.json({
      table: data || null,
    })
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Unable to load table.",
      },
      { status: 500 }
    )
  }
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

    const columns =
      Array.isArray(body.columns)
        ? body.columns
        : []

    const rows =
      Array.isArray(body.rows)
        ? body.rows
        : []

    if (
      columns.length === 0 ||
      rows.length === 0
    ) {
      return NextResponse.json(
        {
          error:
            "A table requires at least one column and one row.",
        },
        { status: 400 }
      )
    }

    if (
      rows.some(
        (row: unknown) =>
          !Array.isArray(row) ||
          row.length !== columns.length
      )
    ) {
      return NextResponse.json(
        {
          error:
            "Every table row must contain the same number of cells as the columns.",
        },
        { status: 400 }
      )
    }

    const presentation =
      body.presentation &&
      typeof body.presentation ===
        "object"
        ? body.presentation
        : {}

    /*
     * The current education_tables table has:
     *
     * id
     * block_id
     * columns
     * rows
     * caption
     *
     * Store additional visual settings in the
     * associated content block's presentation JSON.
     */
    const { data: existing } =
      await supabase
        .from("education_tables")
        .select("id")
        .eq("block_id", id)
        .limit(1)
        .maybeSingle()

    let tableError = null

    if (existing) {
      const result =
        await supabase
          .from("education_tables")
          .update({
            columns,
            rows,
            caption:
              typeof body.caption ===
              "string"
                ? body.caption
                : null,
            updated_at:
              new Date().toISOString(),
          })
          .eq("id", existing.id)

      tableError = result.error
    } else {
      const result =
        await supabase
          .from("education_tables")
          .insert({
            block_id: id,
            columns,
            rows,
            caption:
              typeof body.caption ===
              "string"
                ? body.caption
                : null,
          })

      tableError = result.error
    }

    if (tableError) {
      throw tableError
    }

    const { data: block, error: blockError } =
      await supabase
        .from("education_content_blocks")
        .select("presentation")
        .eq("id", id)
        .single()

    if (blockError) {
      throw blockError
    }

    const currentPresentation =
      block.presentation &&
      typeof block.presentation ===
        "object"
        ? {
            ...block.presentation,
          }
        : {}

    currentPresentation.table =
      presentation

    const { error:
      presentationError } =
      await supabase
        .from("education_content_blocks")
        .update({
          presentation:
            currentPresentation,
          updated_at:
            new Date().toISOString(),
        })
        .eq("id", id)

    if (presentationError) {
      throw presentationError
    }

    return NextResponse.json({
      success: true,
    })
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Unable to save table.",
      },
      { status: 500 }
    )
  }
}
