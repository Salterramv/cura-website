import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

export async function GET(
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

    const supabase =
      await createClient()

    const {
      data: topic,
      error: topicError,
    } = await supabase
      .from("education_topics")
      .select(
        "id,title,slug,category"
      )
      .eq("id", id)
      .single()

    if (topicError) {
      throw topicError
    }

    const {
      data: sections,
      error,
    } = await supabase
      .from("education_sections")
      .select(
        "id,title,display_order,is_published"
      )
      .eq("topic_id", id)
      .order("display_order", {
        ascending: true,
      })

    if (error) {
      throw error
    }

    return NextResponse.json({
      topic,
      sections:
        sections ?? [],
    })
  } catch (error) {
    console.error(
      "Education sections GET error:",
      error
    )

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Unable to load sections.",
      },
      { status: 500 }
    )
  }
}

export async function POST(
  request: Request,
  context: {
    params: Promise<{
      id: string
    }>
  }
) {
  try {
    const { id } =
      await context.params

    const body =
      await request.json()

    const title =
      typeof body?.title === "string"
        ? body.title.trim()
        : ""

    if (!title) {
      return NextResponse.json(
        {
          error:
            "Section name is required.",
        },
        { status: 400 }
      )
    }

    const supabase =
      await createClient()

    const {
      data: maxRow,
    } = await supabase
      .from("education_sections")
      .select("display_order")
      .eq("topic_id", id)
      .order("display_order", {
        ascending: false,
      })
      .limit(1)
      .maybeSingle()

    const nextOrder =
      Number(
        maxRow?.display_order ?? 0
      ) + 1

    const {
      data,
      error,
    } = await supabase
      .from("education_sections")
      .insert({
        topic_id: id,
        title,
        display_order:
          nextOrder,
        is_published: false,
      })
      .select()
      .single()

    if (error) {
      throw error
    }

    return NextResponse.json({
      section: data,
    })
  } catch (error) {
    console.error(
      "Education sections POST error:",
      error
    )

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Unable to create section.",
      },
      { status: 500 }
    )
  }
}
