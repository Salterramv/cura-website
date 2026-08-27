import Image from "next/image"

export type CuraSourceVisual = {
  version?: number
  source_controlled?: boolean
  type?: string
  eyebrow?: string
  title?: string
  source?: {
    id?: string
    sourceFile?: string
    sourcePage?: number
    sourceLabel?: string
    asset?: string
  }
}

/*
 * ============================================================
 * CURA SOURCE-CONTROLLED VISUAL
 * ============================================================
 *
 * IMPORTANT:
 *
 * This component deliberately does NOT generate an illustration
 * from a section title.
 *
 * It renders ONLY a visual which has been explicitly connected
 * to an illustration from the supplied accounting material.
 *
 * No source visual = nothing rendered.
 * ============================================================
 */

export default function CuraSectionIllustration({
  visual,
}: {
  visual?: CuraSourceVisual | null
}) {
  if (!visual?.source_controlled) {
    return null
  }

  const source = visual.source

  if (!source?.asset) {
    return null
  }

  return (
    <figure className="my-8 overflow-hidden rounded-[28px] border border-[#dfe7e3] bg-[#f7faf8] shadow-[0_12px_40px_rgba(17,65,48,0.08)]">
      <div className="flex items-center justify-between gap-4 border-b border-[#dfe7e3] px-5 py-3 sm:px-6">
        <div className="min-w-0">
          <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#1f6b52]">
            {visual.eyebrow || "CURA visual"}
          </div>

          {visual.title && (
            <div className="mt-1 text-sm font-semibold text-[#173d32]">
              {visual.title}
            </div>
          )}
        </div>

        {source.sourcePage && (
          <div className="shrink-0 rounded-full bg-white px-3 py-1 text-[10px] font-medium text-[#527066]">
            Source p. {source.sourcePage}
          </div>
        )}
      </div>

      <div className="bg-white p-4 sm:p-6">
        <div className="relative mx-auto max-w-5xl overflow-hidden rounded-2xl bg-white">
          <Image
            src={source.asset}
            alt={
              source.sourceLabel
                ? `${source.sourceLabel} — CURA accounting visual`
                : "CURA accounting visual"
            }
            width={1800}
            height={1000}
            className="h-auto w-full object-contain"
            priority={false}
          />
        </div>
      </div>

      {(source.sourceFile || source.sourceLabel) && (
        <figcaption className="border-t border-[#dfe7e3] px-5 py-3 text-xs leading-5 text-[#667d74] sm:px-6">
          {source.sourceLabel && (
            <span className="font-medium text-[#355f51]">
              {source.sourceLabel}
            </span>
          )}

          {source.sourceFile && (
            <>
              {source.sourceLabel ? " · " : ""}
              {source.sourceFile}
            </>
          )}
        </figcaption>
      )}
    </figure>
  )
}
