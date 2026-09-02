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

    if (
      typeof body?.is_published !== "boolean" &&
      typeof body?.title !== "string"
    ) {
      return NextResponse.json(
        {
          error: "No valid section changes were supplied.",
        },
        { status: 400 }
      )
    }

    const supabase = await createClient()

    /*
     * First confirm that the section exists.
     */
    const {
      data: existingSection,
      error: existingError,
    } = await supabase
      .from("education_sections")
      .select("id,is_published,title")
      .eq("id", id)
      .single()

    if (existingError) {
      throw existingError
    }

    if (!existingSection) {
      return NextResponse.json(
        {
          error: "Section not found.",
        },
        { status: 404 }
      )
    }

    /*
     * Build the section update.
     */
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

    let publicationChange: boolean | null = null

    if (typeof body?.is_published === "boolean") {
      publicationChange = body.is_published
      update.is_published = body.is_published
    }

    /*
     * Update the section itself.
     */
    const {
      data: updatedSection,
      error: updateError,
    } = await supabase
      .from("education_sections")
      .update(update)
      .eq("id", id)
      .select()
      .single()

    if (updateError) {
      throw updateError
    }

    if (!updatedSection) {
      return NextResponse.json(
        {
          error: "Section could not be updated.",
        },
        { status: 500 }
      )
    }

    /*
     * IMPORTANT:
     *
     * Section publication controls the visibility of
     * everything inside that section.
     *
     * Therefore publishing/unpublishing a section also
     * updates every content block belonging to it.
     */
    if (publicationChange !== null) {
      const {
        error: blockUpdateError,
      } = await supabase
        .from("education_content_blocks")
        .update({
          is_published: publicationChange,
          updated_at: new Date().toISOString(),
        })
        .eq("section_id", id)

      if (blockUpdateError) {
        /*
         * Roll the section back if its blocks could not
         * be updated. This prevents the UI from showing
         * a misleading publication state.
         */
        await supabase
          .from("education_sections")
          .update({
            is_published: existingSection.is_published,
            updated_at: new Date().toISOString(),
          })
          .eq("id", id)

        throw blockUpdateError
      }
    }

    /*
     * Return the final section state.
     */
    return NextResponse.json({
      success: true,
      section: updatedSection,
      publication_cascaded:
        publicationChange !== null,
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

