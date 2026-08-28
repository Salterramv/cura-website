import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

async function requireAdmin() {
  const supabase = await createClient()

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser()

  if (userError || !user) {
    return {
      supabase,
      response: NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      ),
    }
  }

  const {
    data: isAdmin,
    error: adminError,
  } = await supabase.rpc(
    "is_current_user_admin",
    {
      user_id: user.id,
    }
  )

  if (adminError || !isAdmin) {
    return {
      supabase,
      response: NextResponse.json(
        { error: "Forbidden" },
        { status: 403 }
      ),
    }
  }

  return {
    supabase,
    response: null,
  }
}

function makeAreaKey(value: string) {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
}

export async function GET() {
  try {
    const {
      supabase,
      response,
    } = await requireAdmin()

    if (response) return response

    const {
      data,
      error,
    } = await supabase
      .from("education_areas")
      .select(
        "area_key,name,description,display_order,is_active"
      )
      .order("display_order", {
        ascending: true,
      })

    if (error) {
      throw error
    }

    return NextResponse.json({
      areas: data ?? [],
    })
  } catch (error) {
    console.error(
      "Education areas GET error:",
      error
    )

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Unable to load education areas.",
      },
      { status: 500 }
    )
  }
}

export async function POST(
  request: Request
) {
  try {
    const {
      supabase,
      response,
    } = await requireAdmin()

    if (response) return response

    const body = await request.json()

    const name =
      typeof body?.name === "string"
        ? body.name.trim()
        : ""

    const description =
      typeof body?.description === "string"
        ? body.description.trim()
        : ""

    if (!name) {
      return NextResponse.json(
        {
          error:
            "Education area name is required.",
        },
        { status: 400 }
      )
    }

    const areaKey =
      makeAreaKey(name)

    if (!areaKey) {
      return NextResponse.json(
        {
          error:
            "Unable to create a valid area key.",
        },
        { status: 400 }
      )
    }

    const {
      data: existing,
    } = await supabase
      .from("education_areas")
      .select("area_key")
      .or(
        `area_key.eq.${areaKey},name.ilike.${name}`
      )
      .maybeSingle()

    if (existing) {
      return NextResponse.json(
        {
          error:
            "An education area with this name already exists.",
        },
        { status: 409 }
      )
    }

    const {
      data: lastArea,
    } = await supabase
      .from("education_areas")
      .select("display_order")
      .order("display_order", {
        ascending: false,
      })
      .limit(1)
      .maybeSingle()

    const displayOrder =
      Number(
        lastArea?.display_order ?? 0
      ) + 1

    const {
      data,
      error,
    } = await supabase
      .from("education_areas")
      .insert({
        area_key: areaKey,
        name,
        description,
        display_order: displayOrder,
        is_active: true,
      })
      .select(
        "area_key,name,description,display_order,is_active"
      )
      .single()

    if (error) {
      throw error
    }

    return NextResponse.json(
      { area: data },
      { status: 201 }
    )
  } catch (error) {
    console.error(
      "Education area POST error:",
      error
    )

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Unable to create education area.",
      },
      { status: 500 }
    )
  }
}

export async function PATCH(
  request: Request
) {
  try {
    const {
      supabase,
      response,
    } = await requireAdmin()

    if (response) return response

    const body = await request.json()

    const areaKey =
      typeof body?.area_key === "string"
        ? body.area_key.trim()
        : ""

    if (!areaKey) {
      return NextResponse.json(
        {
          error:
            "area_key is required.",
        },
        { status: 400 }
      )
    }

    const {
      data: currentArea,
      error: currentError,
    } = await supabase
      .from("education_areas")
      .select(
        "area_key,name,description,display_order,is_active"
      )
      .eq("area_key", areaKey)
      .single()

    if (currentError || !currentArea) {
      return NextResponse.json(
        {
          error:
            "Education area not found.",
        },
        { status: 404 }
      )
    }

    const updates: Record<
      string,
      unknown
    > = {}

    let newName:
      | string
      | null = null

    if (
      typeof body?.name === "string"
    ) {
      newName =
        body.name.trim()

      if (!newName) {
        return NextResponse.json(
          {
            error:
              "Area name cannot be empty.",
          },
          { status: 400 }
        )
      }

      updates.name = newName
    }

    if (
      typeof body?.description ===
      "string"
    ) {
      updates.description =
        body.description.trim()
    }

    if (
      typeof body?.display_order ===
      "number"
    ) {
      updates.display_order =
        body.display_order
    }

    if (
      typeof body?.is_active ===
      "boolean"
    ) {
      updates.is_active =
        body.is_active
    }

    if (
      Object.keys(updates).length === 0
    ) {
      return NextResponse.json(
        {
          error:
            "No changes supplied.",
        },
        { status: 400 }
      )
    }

    /*
     * The education_topics table currently stores
     * the education area name in `category`.
     *
     * When an area is renamed, keep existing topics
     * attached to the renamed area.
     */
    if (
      newName &&
      newName !== currentArea.name
    ) {
      const {
        data: duplicate,
      } = await supabase
        .from("education_areas")
        .select("area_key")
        .ilike("name", newName)
        .neq("area_key", areaKey)
        .maybeSingle()

      if (duplicate) {
        return NextResponse.json(
          {
            error:
              "Another education area already uses this name.",
          },
          { status: 409 }
        )
      }

      const {
        error: topicUpdateError,
      } = await supabase
        .from("education_topics")
        .update({
          category: newName,
        })
        .eq(
          "category",
          currentArea.name
        )

      if (topicUpdateError) {
        throw topicUpdateError
      }
    }

    const {
      data,
      error,
    } = await supabase
      .from("education_areas")
      .update(updates)
      .eq("area_key", areaKey)
      .select(
        "area_key,name,description,display_order,is_active"
      )
      .single()

    if (error) {
      throw error
    }

    return NextResponse.json({
      area: data,
    })
  } catch (error) {
    console.error(
      "Education area PATCH error:",
      error
    )

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Unable to update education area.",
      },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: Request
) {
  try {
    const {
      supabase,
      response,
    } = await requireAdmin()

    if (response) return response

    const body = await request.json()

    const areaKey =
      typeof body?.area_key === "string"
        ? body.area_key.trim()
        : ""

    if (!areaKey) {
      return NextResponse.json(
        {
          error:
            "area_key is required.",
        },
        { status: 400 }
      )
    }

    const {
      data,
      error,
    } = await supabase
      .from("education_areas")
      .update({
        is_active: false,
      })
      .eq("area_key", areaKey)
      .select(
        "area_key,name,description,display_order,is_active"
      )
      .single()

    if (error) {
      throw error
    }

    return NextResponse.json({
      area: data,
    })
  } catch (error) {
    console.error(
      "Education area DELETE error:",
      error
    )

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Unable to deactivate education area.",
      },
      { status: 500 }
    )
  }
}
