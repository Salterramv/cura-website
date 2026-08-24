import { accountingTopics as baseTopics } from "./accountingTopicsBase"

export type {
  AccountingBlock,
  AccountingQuizQuestion,
  AccountingPracticeSet,
  AccountingTopic,
} from "./accountingTopicsBase"

type Topic = (typeof baseTopics)[number]

function normalizeItems(items: string[]): string[] {
  const out: string[] = []

  const cleaned = items
    .map((value) => value.replace(/\s+/g, " ").trim())
    .filter(Boolean)

  for (const value of cleaned) {
    const previous = out[out.length - 1]

    /*
     * The original material contains many lines that were split
     * across multiple extraction fragments. Rejoin obvious
     * continuations without changing actual sentences.
     */
    if (
      previous &&
      !/[.!?:;]$/.test(previous) &&
      /^(?:and|or|of|to|for|from|during|period|asset|amount|life|the|a|an|is|are|was|were|with|used|under|in|on|by|at)\b/i.test(value)
    ) {
      out[out.length - 1] = `${previous} ${value}`
      continue
    }

    out.push(value)
  }

  return out
}

/*
 * Exact reconstruction of the Rate of Interest slide.
 *
 * Source:
 *
 * Borrowing Cost to be Capitalized
 * =
 * Borrowing costs actually incurred during capitalization period
 * -
 * Investment income from temporary investment of the funds
 * during capitalization period
 *
 * and:
 *
 * Borrowing Cost to be Capitalized
 * =
 * Amount of general borrowings used for the asset
 * ×
 * Weighted Average Interest rate
 */
function repairRateOfInterest(topic: Topic): Topic {
  const blocks = topic.blocks.map((block) => {
    if (block.title.trim().toLowerCase() !== "rate of interest") {
      return block
    }

    if (
      !block.items.some(
        (item) => item.toLowerCase().includes("borrowing cost to be")
      )
    ) {
      return block
    }

    return {
      ...block,
      items: [
        "Where borrowings are made Specifically to acquire a qualifying asset:",
        "Borrowing Cost to be Capitalized = Borrowing costs actually incurred during capitalization period – Investment income from temporary investment of the funds during capitalization period",
        "Where funds for the project are taken from General borrowings:",
        "Borrowing Cost to be Capitalized = Amount of general borrowings used for the asset × Weighted Average Interest rate",
      ],
    }
  })

  return {
    ...topic,
    blocks,
  }
}

export const accountingTopics = baseTopics.map((topic) => {
  let repaired = {
    ...topic,
    blocks: topic.blocks.map((block) => ({
      ...block,
      items: normalizeItems(block.items),
    })),
  }

  repaired = repairRateOfInterest(repaired)

  return repaired
})
