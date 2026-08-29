import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

export async function DELETE(
  _request: Request,
  context: {
    params: Promise<{
      id: string
    }>
  }
) {
  try {
    const { id } =
      await context.params

    if (!id) {
      return NextResponse.json(
        {
          error:
            "Topic ID is required.",
        },
        { status: 400 }
      )
    }

    const supabase =
      await createClient()

    const {
      data: topic,
      error: findError,
    } = await supabase
      .from("education_topics")
      .select(
        "id,category"
      )
      .eq("id", id)
      .single()

    if (findError) {
      throw findError
    }

    if (!topic) {
      return NextResponse.json(
        {
          error:
            "Topic not found.",
        },
        { status: 404 }
      )
    }

    const {
      error,
    } = await supabase
      .from("education_topics")
      .update({
        is_published: false,
        status: "archived",
      })
      .eq("id", id)

    if (error) {
      throw error
    }

    return NextResponse.json({
      success: true,
    })
  } catch (error) {
    console.error(
      "Education topic DELETE error:",
      error
    )

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
