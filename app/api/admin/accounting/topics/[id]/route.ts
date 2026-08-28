import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

function supabaseAdmin() {
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
    params: Promise<{
      id: string
    }>
  }
) {
  try {
    const { id } = await context.params

    if (!id) {
      return NextResponse.json(
        {
          error:
            "Topic ID is required.",
        },
        { status: 400 }
      )
    }

    const supabase = supabaseAdmin()

    const { data: topic, error: findError } =
      await supabase
        .from("education_topics")
        .select("id,category")
        .eq("id", id)
        .single()

    if (findError) {
      throw findError
    }

    if (topic.category !== "Accounting") {
      return NextResponse.json(
        {
          error:
            "Only Accounting topics can be managed here.",
        },
        { status: 403 }
      )
    }

    /*
     * Existing content must not be silently destroyed.
     *
     * Therefore deletion is implemented as an archive/
     * unpublish operation at this stage.
     */
    const { error } =
      await supabase
        .from("education_topics")
        .update({
          published: false,
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
            : "Unable to remove topic.",
      },
      { status: 500 }
    )
  }
}
