import fs from "fs"
import path from "path"

const candidates = [
  "accountingTopics_FULL.ts",
  "data/accountingTopics_FULL.ts",
  "lib/accountingTopics_FULL.ts",
  "app/education/materials/accounting/accountingTopics_FULL.ts",
  "app/education/materials/accounting/data/accountingTopics_FULL.ts",
]

let file = null

for (const candidate of candidates) {
  const full = path.resolve(candidate)
  if (fs.existsSync(full)) {
    file = full
    break
  }
}

if (!file) {
  throw new Error(
    "Could not locate accountingTopics_FULL.ts. Run: find . -name 'accountingTopics_FULL.ts'"
  )
}

const source = fs.readFileSync(file, "utf8")

console.log("")
console.log("============================================================")
console.log(" CURA RAW-MATERIAL VISUAL AUDIT")
console.log("============================================================")
console.log("")
console.log(`Source: ${file}`)
console.log("")

/*
 * We intentionally look for source-material indicators.
 * We DO NOT create or infer a visual from a normal section.
 */

const patterns = [
  {
    name: "Illustration",
    regex: /illustration/gi,
  },
  {
    name: "Figure",
    regex: /\bfigure\b/gi,
  },
  {
    name: "Diagram",
    regex: /\bdiagram\b/gi,
  },
  {
    name: "Flow",
    regex: /\bflow\b/gi,
  },
  {
    name: "Hierarchy",
    regex: /\bhierarchy\b/gi,
  },
  {
    name: "Formula",
    regex: /kind:\s*"formula"/gi,
  },
  {
    name: "Structured calculation",
    regex: /\bcalculation\b/gi,
  },
]

/*
 * Extract topic objects approximately from the TypeScript
 * source. We only need a reliable audit report here.
 */

const topicRegex =
  /\{\s*slug:\s*"([^"]+)"[\s\S]*?title:\s*"([^"]+)"[\s\S]*?slides:\s*\[/g

const topics = []

let match

while ((match = topicRegex.exec(source)) !== null) {
  topics.push({
    slug: match[1],
    title: match[2],
    start: match.index,
  })
}

console.log(`Topics detected: ${topics.length}`)
console.log("")

for (let i = 0; i < topics.length; i++) {
  const topic = topics[i]

  const end =
    i + 1 < topics.length
      ? topics[i + 1].start
      : source.length

  const body =
    source.slice(topic.start, end)

  const hits = []

  for (const pattern of patterns) {
    const matches =
      body.match(pattern.regex)

    if (matches) {
      hits.push(
        `${pattern.name}: ${matches.length}`
      )
    }
  }

  if (!hits.length) {
    continue
  }

  console.log("------------------------------------------------------------")
  console.log(`${topic.title}`)
  console.log(`slug: ${topic.slug}`)
  console.log(hits.join(" | "))

  /*
   * Print source lines containing explicit illustration /
   * figure / diagram references.
   */

  const lines = body.split("\n")

  for (let n = 0; n < lines.length; n++) {
    const line = lines[n]

    if (
      /illustration|figure|diagram|flow|hierarchy/i.test(
        line
      )
    ) {
      console.log(
        `  ${line.trim().slice(0, 300)}`
      )
    }
  }
}

console.log("")
console.log("============================================================")
console.log(" END OF SOURCE VISUAL AUDIT")
console.log("============================================================")
console.log("")
console.log("No Supabase records were changed.")
console.log("No website files were changed.")
console.log("")
