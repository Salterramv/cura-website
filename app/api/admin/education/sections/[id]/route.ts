import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

async function db() {
  return await createClient()
}

export async function DELETE(
  _request: Request,
  context: {
    params: Promise<{ id: string }>
  }
) {
  try {
    const { id } = await context.params
    const supabase = await db()

    /*
     * Safe removal:
     * do not physically delete existing content.
     */
    const { error } =
      await supabase
        .from("education_sections")
        .update({
          is_published: false,
          updated_at:
            new Date().toISOString(),
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
    const body = await request.json()
    const supabase = await createClient()

    const update: Record<string, unknown> = {
      updated_at: new Date().toISOString(),
    }

    if (typeof body.title === "string") {
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

    if (typeof body.is_published === "boolean") {
      update.is_published = body.is_published
    }

    const { data, error } = await supabase
      .from("education_sections")
      .update(update)
      .eq("id", id)
      .select()
      .single()

    if (error) {
      throw error
    }

    return NextResponse.json({
      success: true,
      section: data,
    })
  } catch (error) {
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

