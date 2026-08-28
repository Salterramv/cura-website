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

    const { data: topic, error: topicError } =
      await supabase
        .from("education_topics")
        .select("id,title,slug")
        .eq("id", id)
        .single()

    if (topicError) {
      throw topicError
    }

    const { data: sections, error } =
      await supabase
        .from("education_sections")
        .select(
          "id,title,display_order,published"
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
      sections: sections || [],
    })
  } catch (error) {
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
    params: Promise<{ id: string }>
  }
) {
  try {
    const { id } = await context.params
    const body = await request.json()

    const title =
      typeof body.title === "string"
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

    const supabase = db()

    const { data: maxRow } =
      await supabase
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

    const { data, error } =
      await supabase
        .from("education_sections")
        .insert({
          topic_id: id,
          title,
          display_order: nextOrder,
          published: false,
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
