import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

const BUCKET = "cura-education"

function adminDb() {
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

  return createClient(
    url,
    key
  )
}

function safeFilename(
  value: string
) {
  return value
    .toLowerCase()
    .replace(
      /[^a-z0-9._-]+/g,
      "-"
    )
    .replace(
      /-+/g,
      "-"
    )
}

export async function POST(
  request: Request
) {
  try {
    const formData =
      await request.formData()

    const file =
      formData.get("file")

    const blockId =
      formData.get("block_id")

    if (
      !(file instanceof File)
    ) {
      return NextResponse.json(
        {
          error:
            "No image file was supplied.",
        },
        { status: 400 }
      )
    }

    // block_id is optional for pictures inserted directly
    // into the rich-text editor. Standalone illustration
    // blocks still supply block_id and are validated below.
    const hasBlockId =
      typeof blockId === "string" &&
      blockId.trim().length > 0

    const allowedTypes = [
      "image/png",
      "image/jpeg",
      "image/webp",
    ]

    if (
      !allowedTypes.includes(
        file.type
      )
    ) {
      return NextResponse.json(
        {
          error:
            "Only PNG, JPG, JPEG and WebP images are supported.",
        },
        { status: 400 }
      )
    }

    /*
     * 10 MB maximum for educational illustrations.
     */
    const maxBytes =
      10 * 1024 * 1024

    if (
      file.size >
      maxBytes
    ) {
      return NextResponse.json(
        {
          error:
            "The illustration must be 10 MB or smaller.",
        },
        { status: 400 }
      )
    }

    const supabase =
      adminDb()

    /*
     * Confirm that the block really exists
     * before uploading an orphaned file.
     */
    let sectionFolder = "inline"

    if (hasBlockId) {
      const { data: block, error: blockError } =
        await supabase
          .from("education_content_blocks")
          .select("id,section_id,block_type")
          .eq("id", blockId)
          .single()

      if (blockError) {
        return NextResponse.json(
          { error: "Content block was not found." },
          { status: 404 }
        )
      }

      if (
        !["illustration", "image", "figure"].includes(
          block.block_type
        )
      ) {
        return NextResponse.json(
          {
            error:
              "This content block is not an illustration block.",
          },
          { status: 400 }
        )
      }

      sectionFolder = block.section_id
    }

    /*
     * Use block ID so each illustration gets a stable
     * and collision-resistant path.
     */
    const original =
      safeFilename(
        file.name
      )

    const ext =
      original.includes(".")
        ? original.substring(
            original.lastIndexOf(".")
          )
        : ".png"

    const uniqueName =
      `${Date.now()}-${crypto.randomUUID()}${ext}`

    const path =
      `accounting/${sectionFolder}/${uniqueName}`

    const buffer =
      Buffer.from(
        await file.arrayBuffer()
      )

    const { error:
      uploadError } =
      await supabase.storage
        .from(BUCKET)
        .upload(
          path,
          buffer,
          {
            contentType:
              file.type,
            cacheControl:
              "31536000",
            upsert: false,
          }
        )

    if (uploadError) {
      throw uploadError
    }

    const { data } =
      supabase.storage
        .from(BUCKET)
        .getPublicUrl(
          path
        )

    if (!data?.publicUrl) {
      throw new Error(
        "Unable to generate the public illustration URL."
      )
    }

    return NextResponse.json({
      url:
        data.publicUrl,
      path,
      bucket:
        BUCKET,
      mime_type:
        file.type,
      file_size:
        file.size,
    })
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Unable to upload illustration.",
      },
      { status: 500 }
    )
  }
}
