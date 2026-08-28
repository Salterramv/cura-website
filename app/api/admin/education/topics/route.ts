import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

async function db() {
  return await createClient()
}

async function getActiveAreaNames(
  supabase: Awaited<ReturnType<typeof createClient>>
) {
  const {
    data,
    error,
  } = await supabase
    .from("education_areas")
    .select("name")
    .eq("is_active", true)
    .order("display_order", {
      ascending: true,
    })

  if (error) {
    throw error
  }

  return (data ?? []).map(
    (row) => row.name
  )
}

function makeSlug(value: string) {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
}

export async function GET(
  request: Request
) {
  try {
    const supabase = await db()

    const url =
      new URL(request.url)

    const requestedCategory =
      url.searchParams.get(
        "category"
      )

    let query =
      supabase
        .from("education_topics")
        .select(
          "id,slug,title,category,display_order,is_published,status"
        )

    if (requestedCategory) {
      query =
        query.eq(
          "category",
          requestedCategory
        )
    }

    const {
      data,
      error,
    } = await query
      .order("category", {
        ascending: true,
      })
      .order("display_order", {
        ascending: true,
      })

    if (error) {
      throw error
    }

    return NextResponse.json({
      topics: data ?? [],
    })
  } catch (error) {
    console.error(
      "Education topics GET error:",
      error
    )

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
    const supabase = await db()

    const body =
      await request.json()

    const title =
      typeof body?.title === "string"
        ? body.title.trim()
        : ""

    const category =
      typeof body?.category === "string"
        ? body.category.trim()
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

    if (!category) {
      return NextResponse.json(
        {
          error:
            "Education area is required.",
        },
        { status: 400 }
      )
    }

    const {
      data: area,
      error: areaError,
    } = await supabase
      .from("education_areas")
      .select(
        "name,is_active"
      )
      .eq("name", category)
      .maybeSingle()

    if (areaError) {
      throw areaError
    }

    if (!area) {
      return NextResponse.json(
        {
          error:
            "Education area not found.",
        },
        { status: 404 }
      )
    }

    if (!area.is_active) {
      return NextResponse.json(
        {
          error:
            "This education area is inactive.",
        },
        { status: 400 }
      )
    }

    const slug =
      makeSlug(title)

    if (!slug) {
      return NextResponse.json(
        {
          error:
            "Unable to create a valid topic slug.",
        },
        { status: 400 }
      )
    }

    const {
      data: existing,
    } = await supabase
      .from("education_topics")
      .select("id")
      .eq("category", category)
      .eq("slug", slug)
      .maybeSingle()

    if (existing) {
      return NextResponse.json(
        {
          error:
            "A topic with this name already exists in this education area.",
        },
        { status: 409 }
      )
    }

    const {
      data: maxRow,
    } = await supabase
      .from("education_topics")
      .select("display_order")
      .eq("category", category)
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
      .from("education_topics")
      .insert({
        title,
        slug,
        category,
        display_order:
          nextOrder,
        is_published: false,
        status: "draft",
      })
      .select()
      .single()

    if (error) {
      throw error
    }

    return NextResponse.json(
      {
        topic: data,
      },
      { status: 201 }
    )
  } catch (error) {
    console.error(
      "Education topics POST error:",
      error
    )

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
