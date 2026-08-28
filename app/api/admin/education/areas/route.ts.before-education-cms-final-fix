import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

function getSupabaseAdmin() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key =
    process.env.SUPABASE_SERVICE_ROLE_KEY ||
    process.env.SUPABASE_SERVICE_KEY

  if (!url || !key) {
    throw new Error(
      "Supabase environment variables are missing."
    )
  }

  return createClient(url, key, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  })
}

async function requireAdmin() {
  const supabase = getSupabaseAdmin()

  /*
   * Keep authentication consistent with the existing
   * Education administration APIs.
   */
  const {
    data: {
      user,
    },
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

  const { data: isAdmin, error } =
    await supabase.rpc(
      "is_current_user_admin",
      {
        user_id: user.id,
      }
    )

  if (error || !isAdmin) {
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

/*
 * GET
 * Load all education areas.
 */
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
      console.error(
        "Education areas GET error:",
        error
      )

      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      )
    }

    return NextResponse.json({
      areas: data ?? [],
    })
  } catch (error) {
    console.error(error)

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

/*
 * POST
 * Create a new education area.
 */
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

    const suppliedKey =
      typeof body?.area_key === "string"
        ? body.area_key.trim()
        : ""

    const areaKey =
      suppliedKey ||
      name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "")

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
      console.error(
        "Education area POST error:",
        error
      )

      return NextResponse.json(
        {
          error:
            error.code === "23505"
              ? "An education area with this key already exists."
              : error.message,
        },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { area: data },
      { status: 201 }
    )
  } catch (error) {
    console.error(error)

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

/*
 * PATCH
 * Rename, reorder, activate/deactivate,
 * or change description.
 */
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

    const updates: Record<
      string,
      unknown
    > = {}

    if (
      typeof body?.name === "string"
    ) {
      const name =
        body.name.trim()

      if (!name) {
        return NextResponse.json(
          {
            error:
              "Area name cannot be empty.",
          },
          { status: 400 }
        )
      }

      updates.name = name
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
      typeof body?.new_area_key ===
        "string" &&
      body.new_area_key.trim()
    ) {
      updates.area_key =
        body.new_area_key.trim()
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
      console.error(
        "Education area PATCH error:",
        error
      )

      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      )
    }

    return NextResponse.json({
      area: data,
    })
  } catch (error) {
    console.error(error)

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

/*
 * DELETE
 *
 * "Delete" means deactivate.
 * Nothing underneath the area is deleted.
 */
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
      console.error(
        "Education area DELETE error:",
        error
      )

      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      )
    }

    return NextResponse.json({
      area: data,
    })
  } catch (error) {
    console.error(error)

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
