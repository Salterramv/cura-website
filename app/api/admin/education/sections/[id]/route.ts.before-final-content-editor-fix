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

export async function DELETE(
  _request: Request,
  context: {
    params: Promise<{ id: string }>
  }
) {
  try {
    const { id } = await context.params
    const supabase = db()

    /*
     * Safe removal:
     * do not physically delete existing content.
     */
    const { error } =
      await supabase
        .from("education_sections")
        .update({
          published: false,
          updated_at:
            new Date().toISOString(),
        })
        .eq("id", id)

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
            : "Unable to remove section.",
      },
      { status: 500 }
    )
  }
}
