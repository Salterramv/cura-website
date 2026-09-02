import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

export async function DELETE(
  _request: Request,
  context: {
    params: Promise<{ id: string }>
  }
) {
  try {
    const { id } = await context.params

    if (!id) {
      return NextResponse.json(
        {
          error: "Section ID is required.",
        },
        { status: 400 }
      )
    }

    const supabase = await createClient()

    const {
      data,
      error,
    } = await supabase
      .from("education_sections")
      .update({
        is_published: false,
        updated_at: new Date().toISOString(),
      })
      .eq("id", id)
      .select()
      .single()

    if (error) {
      throw error
    }

    if (!data) {
      return NextResponse.json(
        {
          error: "Section not found.",
        },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      section: data,
    })
  } catch (error) {
    console.error(
      "Education section DELETE error:",
      error
    )

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

export async function PATCH(
  request: Request,
  context: {
    params: Promise<{ id: string }>
  }
) {
  try {
    const { id } = await context.params

    if (!id) {
      return NextResponse.json(
        {
          error: "Section ID is required.",
        },
        { status: 400 }
      )
    }

    const body = await request.json()

    const supabase = await createClient()

    const update: Record<string, unknown> = {
      updated_at: new Date().toISOString(),
    }

    if (typeof body?.title === "string") {
      const title = body.title.trim()

      if (!title) {
        return NextResponse.json(
          {
            error: "Section title cannot be empty.",
          },
          { status: 400 }
        )
      }

      update.title = title
    }

    if (typeof body?.is_published === "boolean") {
      update.is_published = body.is_published
    }

    if (Object.keys(update).length === 1) {
      return NextResponse.json(
        {
          error:
            "No valid section changes were supplied.",
        },
        { status: 400 }
      )
    }

    const {
      data,
      error,
    } = await supabase
      .from("education_sections")
      .update(update)
      .eq("id", id)
      .select()
      .single()

    if (error) {
      throw error
    }

    if (!data) {
      return NextResponse.json(
        {
          error: "Section not found.",
        },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      section: data,
    })
  } catch (error) {
    console.error(
      "Education section PATCH error:",
      error
    )

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Unable to update section.",
      },
      { status: 500 }
    )
  }
}
