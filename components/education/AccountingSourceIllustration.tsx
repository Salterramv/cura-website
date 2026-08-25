import type { ReactNode } from "react"
import { accountingIllustrations } from "@/app/education/materials/accounting/data/illustrations"

function normalize(value: string) {
  return value
    .toLowerCase()
    .replace(/[–—-]/g, " ")
    .replace(/\s+/g, " ")
    .trim()
}

export default function AccountingSourceIllustration({
  sourceText,
  children,
}: {
  sourceText: string
  children: ReactNode
}) {
  const normalized = normalize(sourceText)

  const matches = accountingIllustrations.filter((visual) => {
    const label = normalize(visual.sourceLabel)

    return normalized.includes(label)
  })

  if (matches.length === 0) {
    return <>{children}</>
  }

  return (
    <>
      {children}

      <div className="mt-8 space-y-8">
        {matches.map((visual) => (
          <figure
            key={visual.id}
            className="
              overflow-hidden
              rounded-2xl
              border
              border-slate-200
              bg-white
            "
          >
            <img
              src={visual.asset}
              alt={visual.sourceLabel}
              className="block h-auto w-full"
            />
          </figure>
        ))}
      </div>
    </>
  )
}
