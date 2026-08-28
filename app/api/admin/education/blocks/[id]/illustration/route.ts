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

  return createClient(
    url,
    key
  )
}

export async function GET(
  _request: Request,
  context: {
    params: Promise<{ id: string }>
  }
) {
  try {
    const { id } =
      await context.params

    const supabase =
      db()

    const { data, error } =
      await supabase
        .from("education_assets")
        .select("*")
        .eq("block_id", id)
        .eq(
          "asset_type",
          "illustration"
        )
        .limit(1)
        .maybeSingle()

    if (error) {
      throw error
    }

    return NextResponse.json({
      asset:
        data || null,
    })
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Unable to load illustration.",
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
    const { id } =
      await context.params

    const body =
      await request.json()

    const supabase =
      db()

    const url =
      typeof body.url ===
      "string"
        ? body.url.trim()
        : ""

    if (!url) {
      return NextResponse.json(
        {
          error:
            "Illustration URL is required.",
        },
        { status: 400 }
      )
    }

    await supabase
      .from("education_assets")
      .delete()
      .eq("block_id", id)
      .eq(
        "asset_type",
        "illustration"
      )

    const { error } =
      await supabase
        .from("education_assets")
        .insert({
          block_id: id,
          asset_type:
            "illustration",
          url,
          title:
            typeof body.title ===
            "string"
              ? body.title.trim()
              : null,
          caption:
            typeof body.caption ===
            "string"
              ? body.caption.trim()
              : null,
          alt_text:
            typeof body.alt_text ===
            "string"
              ? body.alt_text.trim()
              : null,
          mime_type:
            typeof body.mime_type ===
            "string"
              ? body.mime_type
              : null,
          file_size:
            Number.isFinite(
              body.file_size
            )
              ? body.file_size
              : null,
          storage_bucket:
            typeof body.storage_bucket ===
            "string"
              ? body.storage_bucket
              : null,
          storage_path:
            typeof body.storage_path ===
            "string"
              ? body.storage_path
              : null,
          width:
            Number.isFinite(
              body.width
            )
              ? body.width
              : null,
          height:
            Number.isFinite(
              body.height
            )
              ? body.height
              : null,
          display_order: 0,
        })

    if (error) {
      throw error
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
            : "Unable to save illustration.",
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
    const { id } =
      await context.params

    const supabase =
      db()

    const { data: asset } =
      await supabase
        .from("education_assets")
        .select(
          "storage_bucket,storage_path"
        )
        .eq("block_id", id)
        .eq(
          "asset_type",
          "illustration"
        )
        .limit(1)
        .maybeSingle()

    const { error } =
      await supabase
        .from("education_assets")
        .delete()
        .eq("block_id", id)
        .eq(
          "asset_type",
          "illustration"
        )

    if (error) {
      throw error
    }

    /*
     * Remove the uploaded Storage object when it
     * belongs to the CURA education bucket.
     */
    if (
      asset?.storage_bucket &&
      asset?.storage_path
    ) {
      await supabase.storage
        .from(
          asset.storage_bucket
        )
        .remove([
          asset.storage_path,
        ])
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
            : "Unable to remove illustration.",
      },
      { status: 500 }
    )
  }
}
