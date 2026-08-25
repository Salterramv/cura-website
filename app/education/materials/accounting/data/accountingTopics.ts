import { accountingTopics as baseTopics } from "./accountingTopicsBase"

export type {
  AccountingBlock,
  AccountingQuizQuestion,
  AccountingPracticeSet,
  AccountingTopic,
} from "./accountingTopicsBase"

type Topic = (typeof baseTopics)[number]

/*
 * CURA ACCOUNTING CONTENT PROCESSOR
 *
 * The base file remains the original source material.
 *
 * This layer performs only conservative processing.
 *
 * IMPORTANT:
 *
 * A repeated heading is NOT a duplicate.
 *
 * These are allowed:
 *
 *   Recognition
 *     A
 *     B
 *
 *   Recognition
 *     C
 *     D
 *
 * They represent different source blocks/slides.
 *
 * A block is only considered a duplicate when its complete
 * title AND complete content are identical.
 */

/* ---------------------------------------------------------
 * Normalisation used ONLY for duplicate comparison
 * --------------------------------------------------------- */

function normalizeForComparison(value: string): string {
  return value
    .replace(/\r/g, "")
    .replace(/[•✓✔▪▫◦‣▸]/g, "")
    .replace(/[–—]/g, "-")
    .replace(/\s+/g, " ")
    .trim()
    .toLowerCase()
}

/* ---------------------------------------------------------
 * Complete block signature
 * --------------------------------------------------------- */

function blockSignature(
  block: Topic["blocks"][number]
): string {
  return JSON.stringify({
    title: normalizeForComparison(block.title),
    items: block.items.map(normalizeForComparison),
  })
}

/* ---------------------------------------------------------
 * Remove exact duplicate blocks only.
 *
 * Heading alone is NEVER sufficient.
 * --------------------------------------------------------- */

function removeExactDuplicateBlocks(
  blocks: Topic["blocks"]
): Topic["blocks"] {
  const seen = new Set<string>()
  const result: Topic["blocks"] = []

  for (const block of blocks) {
    const signature = blockSignature(block)

    if (seen.has(signature)) {
      continue
    }

    seen.add(signature)
    result.push(block)
  }

  return result
}

/* ---------------------------------------------------------
 * Remove an exactly repeated sequence.
 *
 * This is intentionally conservative.
 *
 * A repeated sequence must contain at least four complete
 * blocks and every block in the later sequence must be
 * identical to the corresponding block in the earlier
 * sequence.
 *
 * No fuzzy matching.
 * No heading-only matching.
 * No similarity percentages.
 * --------------------------------------------------------- */

function removeExactRepeatedSequences(
  blocks: Topic["blocks"]
): Topic["blocks"] {
  const signatures = blocks.map(blockSignature)

  const minimumSequenceLength = 4

  if (
    signatures.length <
    minimumSequenceLength * 2
  ) {
    return blocks
  }

  for (
    let length = Math.floor(signatures.length / 2);
    length >= minimumSequenceLength;
    length--
  ) {
    for (
      let firstStart = 0;
      firstStart + length <= signatures.length;
      firstStart++
    ) {
      const firstSequence = signatures.slice(
        firstStart,
        firstStart + length
      )

      for (
        let secondStart = firstStart + length;
        secondStart + length <= signatures.length;
        secondStart++
      ) {
        const secondSequence = signatures.slice(
          secondStart,
          secondStart + length
        )

        const identical = firstSequence.every(
          (value, index) =>
            value === secondSequence[index]
        )

        if (!identical) {
          continue
        }

        /*
         * Keep the first occurrence.
         * Remove only the later exact sequence.
         */
        return blocks.filter(
          (_, index) =>
            index < secondStart ||
            index >= secondStart + length
        )
      }
    }
  }

  return blocks
}

/* ---------------------------------------------------------
 * Safe formatting cleanup
 *
 * Only whitespace is normalised.
 *
 * We do NOT combine neighbouring source items.
 * --------------------------------------------------------- */

function cleanFormatting(topic: Topic): Topic {
  return {
    ...topic,

    blocks: topic.blocks.map((block) => ({
      ...block,

      title: block.title
        .replace(/\r/g, "")
        .replace(/[ \t]+/g, " ")
        .trim(),

      items: block.items
        .map((item) =>
          item
            .replace(/\r/g, "")
            .replace(/[ \t]+/g, " ")
            .trim()
        )
        .filter(Boolean),
    })),
  }
}

/* ---------------------------------------------------------
 * Known Rate of Interest structure
 *
 * This is retained as an explicit correction rather than
 * applying generic text manipulation to accounting content.
 * --------------------------------------------------------- */

function repairRateOfInterest(
  topic: Topic
): Topic {
  const blocks = topic.blocks.map((block) => {
    if (
      block.title.trim().toLowerCase() !==
      "rate of interest"
    ) {
      return block
    }

    const hasBorrowingCost = block.items.some(
      (item) =>
        item
          .toLowerCase()
          .includes("borrowing cost to be")
    )

    if (!hasBorrowingCost) {
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

/* ---------------------------------------------------------
 * Process each topic
 * --------------------------------------------------------- */

function processTopic(topic: Topic): Topic {
  let result = cleanFormatting(topic)

  /*
   * Remove only complete exact duplicate blocks.
   */
  result = {
    ...result,

    blocks: removeExactDuplicateBlocks(
      result.blocks
    ),
  }

  /*
   * Remove only complete repeated sequences.
   */
  result = {
    ...result,

    blocks: removeExactRepeatedSequences(
      result.blocks
    ),
  }

  /*
   * Apply the explicit known correction.
   */
  result = repairRateOfInterest(result)

  return result
}

/* ---------------------------------------------------------
 * Public processed accounting topics
 * --------------------------------------------------------- */

export const accountingTopics =
  baseTopics.map(processTopic)
