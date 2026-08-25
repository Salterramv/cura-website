import { accountingTopics as rawAccountingTopics } from "./accountingTopicsBase"

export type {
  AccountingBlock,
  AccountingQuizQuestion,
  AccountingPracticeSet,
  AccountingTopic,
} from "./accountingTopicsBase"

/*
 * CURA Accounting source-of-truth layer.
 *
 * The raw material has already been reconstructed from the supplied
 * source presentations. Do not merge blocks by heading and do not
 * perform fuzzy duplicate removal here.
 *
 * A repeated heading is allowed when it represents a different slide.
 */
export const accountingTopics = rawAccountingTopics
