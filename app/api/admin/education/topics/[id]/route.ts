import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"


export async function PUT(
  request: Request,
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
          error: "Topic ID is required.",
        },
        { status: 400 }
      )
    }

    const body = await request.json()

    const title =
      typeof body.title === "string"
        ? body.title.trim()
        : ""

    if (!title) {
      return NextResponse.json(
        {
          error: "Topic name is required.",
        },
        { status: 400 }
      )
    }

    const supabase = await createClient()

    const {
      data: existingTopic,
      error: existingError,
    } = await supabase
      .from("education_topics")
      .select("id,title")
      .eq("id", id)
      .single()

    if (existingError) {
      throw existingError
    }

    if (!existingTopic) {
      return NextResponse.json(
        {
          error: "Topic not found.",
        },
        { status: 404 }
      )
    }

    const {
      data: duplicateTopic,
      error: duplicateError,
    } = await supabase
      .from("education_topics")
      .select("id")
      .eq("title", title)
      .neq("id", id)
      .limit(1)
      .maybeSingle()

    if (duplicateError) {
      throw duplicateError
    }

    if (duplicateTopic) {
      return NextResponse.json(
        {
          error: "Another topic already uses this name.",
        },
        { status: 409 }
      )
    }

    /*
     * IMPORTANT:
     *
     * We intentionally do NOT change the slug.
     *
     * This keeps existing public URLs, bookmarks and
     * references working after a topic is renamed.
     */
    const {
      data: updatedTopic,
      error: updateError,
    } = await supabase
      .from("education_topics")
      .update({
        title,
      })
      .eq("id", id)
      .select(
        "id,title,slug,category"
      )
      .single()

    if (updateError) {
      throw updateError
    }

    return NextResponse.json({
      success: true,
      topic: updatedTopic,
    })
  } catch (error) {
    console.error(
      "Education topic UPDATE error:",
      error
    )

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Unable to rename topic.",
      },
      { status: 500 }
    )
  }
}

export async function PATCH(
  request: Request,
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
          error: "Topic ID is required.",
        },
        { status: 400 }
      )
    }

    const body = await request.json()

    const supabase = await createClient()

    const {
      data: existingTopic,
      error: existingError,
    } = await supabase
      .from("education_topics")
      .select(
        "id,is_published,status"
      )
      .eq("id", id)
      .single()

    if (existingError) {
      throw existingError
    }

    if (!existingTopic) {
      return NextResponse.json(
        {
          error: "Topic not found.",
        },
        { status: 404 }
      )
    }

    const changes: Record<
      string,
      unknown
    > = {}

    if (
      typeof body?.is_published ===
      "boolean"
    ) {
      changes.is_published =
        body.is_published

      changes.status =
        body.is_published
          ? "published"
          : "draft"
    }

    if (
      Object.keys(changes).length === 0
    ) {
      return NextResponse.json(
        {
          error:
            "No valid topic changes were supplied.",
        },
        { status: 400 }
      )
    }

    const {
      data: updatedTopic,
      error: updateError,
    } = await supabase
      .from("education_topics")
      .update(changes)
      .eq("id", id)
      .select(
        "id,slug,title,category,display_order,is_published,status"
      )
      .single()

    if (updateError) {
      throw updateError
    }

    return NextResponse.json({
      success: true,
      topic: updatedTopic,
    })
  } catch (error) {
    console.error(
      "Education topic PATCH error:",
      error
    )

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Unable to update topic.",
      },
      { status: 500 }
    )
  }
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
