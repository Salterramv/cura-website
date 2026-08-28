import { createClient } from "@supabase/supabase-js"

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

const supabase =
  createClient(
    url,
    key
  )

const BUCKET =
  "cura-education"

async function main() {
  console.log("")
  console.log("============================================================")
  console.log(" CURA EDUCATION STORAGE SETUP")
  console.log("============================================================")
  console.log("")

  const { data: buckets, error: listError } =
    await supabase.storage.listBuckets()

  if (listError) {
    throw listError
  }

  const existing =
    (buckets || []).find(
      (bucket) =>
        bucket.id === BUCKET
    )

  if (existing) {
    console.log(
      `✓ Bucket already exists: ${BUCKET}`
    )
  } else {
    const { error } =
      await supabase.storage.createBucket(
        BUCKET,
        {
          public: true,
          fileSizeLimit:
            "10485760",
          allowedMimeTypes: [
            "image/png",
            "image/jpeg",
            "image/webp",
          ],
        }
      )

    if (error) {
      throw error
    }

    console.log(
      `✓ Created bucket: ${BUCKET}`
    )
  }

  console.log("")
  console.log(
    "Bucket purpose: manually uploaded CURA education illustrations."
  )
  console.log("")
}

main().catch(
  (error) => {
    console.error(error)
    process.exit(1)
  }
)
