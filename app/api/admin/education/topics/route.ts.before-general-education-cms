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

function makeSlug(value: string) {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
}

export async function GET() {
  try {
    const supabase = supabaseAdmin()

    const { data, error } =
      await supabase
        .from("education_topics")
        .select(
          "id,slug,title,display_order,published"
        )
        .eq("category", "Education")
        .order("display_order", {
          ascending: true,
        })

    if (error) {
      throw error
    }

    return NextResponse.json({
      topics: data || [],
    })
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Unable to load topics.",
      },
      { status: 500 }
    )
  }
}

export async function POST(
  request: Request
) {
  try {
    const body = await request.json()

    const title =
      typeof body.title === "string"
        ? body.title.trim()
        : ""

    if (!title) {
      return NextResponse.json(
        {
          error:
            "Topic name is required.",
        },
        { status: 400 }
      )
    }

    const supabase = supabaseAdmin()

    const slug = makeSlug(title)

    const { data: existing } =
      await supabase
        .from("education_topics")
        .select("id")
        .eq("slug", slug)
        .maybeSingle()

    if (existing) {
      return NextResponse.json(
        {
          error:
            "A topic with this name already exists.",
        },
        { status: 409 }
      )
    }

    const { data: maxRow } =
      await supabase
        .from("education_topics")
        .select("display_order")
        .eq("category", "Education")
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
        .from("education_topics")
        .insert({
          title,
          slug,
          category: "Education",
          display_order: nextOrder,
          published: false,
        })
        .select()
        .single()

    if (error) {
      throw error
    }

    return NextResponse.json({
      topic: data,
    })
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Unable to create topic.",
      },
      { status: 500 }
    )
  }
}
