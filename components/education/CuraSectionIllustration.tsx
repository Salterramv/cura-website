import React from "react"

type CuraVisual = {
  type?: string
  eyebrow?: string
  title?: string
  nodes?: string[]
}

type Props = {
  visual?: CuraVisual | null
}

/*
 * ============================================================
 * CURA SECTION ILLUSTRATION
 * ============================================================
 *
 * These are educational diagrams rather than decorative images.
 *
 * The visual definition comes from:
 *
 * education_sections.presentation.cura_visual
 *
 * in Supabase.
 *
 * Each visual type changes the structure of the diagram so that
 * the illustration communicates the accounting relationship being
 * explained in that section.
 */

function Arrow() {
  return (
    <span
      aria-hidden="true"
      className="text-[#168BC4] text-lg font-bold"
    >
      →
    </span>
  )
}

function Node({
  children,
  index,
}: {
  children: React.ReactNode
  index: number
}) {
  return (
    <div
      className="
        min-w-0
        rounded-2xl
        border
        border-[#168BC4]/20
        bg-white
        px-4
        py-3
        text-center
        shadow-[0_5px_18px_rgba(7,27,73,0.06)]
      "
    >
      <div className="mx-auto mb-2 flex h-7 w-7 items-center justify-center rounded-full bg-[#E8F6FB] text-xs font-bold text-[#168BC4]">
        {index + 1}
      </div>

      <div className="text-sm font-semibold leading-5 text-[#071B49]">
        {children}
      </div>
    </div>
  )
}

function MiniIcon({
  type,
}: {
  type: string
}) {
  const common =
    "fill-none stroke-[#168BC4] strokeWidth={2.2} strokeLinecap=\"round\" strokeLinejoin=\"round\""

  if (type === "measurement") {
    return (
      <svg
        viewBox="0 0 80 80"
        className="h-20 w-20"
        aria-hidden="true"
      >
        <path
          d="M18 58h44"
          className={common}
        />
        <path
          d="M25 54l15-30 15 30"
          className={common}
        />
        <path
          d="M31 42h18"
          className={common}
        />
        <circle
          cx="40"
          cy="24"
          r="5"
          className="fill-[#35B5E5]"
        />
      </svg>
    )
  }

  if (type === "decision") {
    return (
      <svg
        viewBox="0 0 80 80"
        className="h-20 w-20"
        aria-hidden="true"
      >
        <path
          d="M40 10 68 40 40 70 12 40Z"
          className="fill-[#E8F6FB] stroke-[#168BC4]"
          strokeWidth="2.2"
        />
        <path
          d="M29 40h22M40 29v22"
          className={common}
        />
      </svg>
    )
  }

  if (type === "comparison" || type === "split") {
    return (
      <svg
        viewBox="0 0 80 80"
        className="h-20 w-20"
        aria-hidden="true"
      >
        <rect
          x="10"
          y="18"
          width="24"
          height="44"
          rx="5"
          className="fill-[#E8F6FB] stroke-[#168BC4]"
          strokeWidth="2.2"
        />
        <rect
          x="46"
          y="18"
          width="24"
          height="44"
          rx="5"
          className="fill-[#F5F8FC] stroke-[#071B49]"
          strokeWidth="2.2"
        />
        <path
          d="M40 22v36"
          className="stroke-[#35B5E5]"
          strokeWidth="2"
          strokeDasharray="4 4"
        />
      </svg>
    )
  }

  if (type === "transition") {
    return (
      <svg
        viewBox="0 0 80 80"
        className="h-20 w-20"
        aria-hidden="true"
      >
        <rect
          x="8"
          y="25"
          width="22"
          height="30"
          rx="5"
          className="fill-[#E8F6FB] stroke-[#168BC4]"
          strokeWidth="2.2"
        />
        <path
          d="M31 40h18"
          className={common}
        />
        <path
          d="m44 33 7 7-7 7"
          className={common}
        />
        <rect
          x="51"
          y="25"
          width="22"
          height="30"
          rx="5"
          className="fill-white stroke-[#071B49]"
          strokeWidth="2.2"
        />
      </svg>
    )
  }

  if (
    type === "cycle" ||
    type === "timeline"
  ) {
    return (
      <svg
        viewBox="0 0 80 80"
        className="h-20 w-20"
        aria-hidden="true"
      >
        <circle
          cx="40"
          cy="40"
          r="25"
          className="fill-[#E8F6FB] stroke-[#168BC4]"
          strokeWidth="2.2"
        />
        <path
          d="M40 15a25 25 0 0 1 24 18"
          className={common}
        />
        <path
          d="m61 27 4 7-8 1"
          className={common}
        />
        <path
          d="M40 65a25 25 0 0 1-24-18"
          className={common}
        />
        <path
          d="m19 53-4-7 8-1"
          className={common}
        />
      </svg>
    )
  }

  if (
    type === "formula" ||
    type === "bridge"
  ) {
    return (
      <svg
        viewBox="0 0 80 80"
        className="h-20 w-20"
        aria-hidden="true"
      >
        <rect
          x="12"
          y="16"
          width="56"
          height="48"
          rx="8"
          className="fill-[#E8F6FB] stroke-[#168BC4]"
          strokeWidth="2.2"
        />
        <path
          d="M24 32h32M24 48h20"
          className={common}
        />
        <circle
          cx="56"
          cy="48"
          r="5"
          className="fill-[#35B5E5]"
        />
      </svg>
    )
  }

  if (type === "hierarchy") {
    return (
      <svg
        viewBox="0 0 80 80"
        className="h-20 w-20"
        aria-hidden="true"
      >
        <path
          d="M40 12 68 62H12Z"
          className="fill-[#E8F6FB] stroke-[#168BC4]"
          strokeWidth="2.2"
        />
        <path
          d="M25 51h30M30 40h20M35 29h10"
          className={common}
        />
      </svg>
    )
  }

  if (
    type === "cashflow" ||
    type === "network"
  ) {
    return (
      <svg
        viewBox="0 0 80 80"
        className="h-20 w-20"
        aria-hidden="true"
      >
        <circle
          cx="20"
          cy="40"
          r="8"
          className="fill-[#E8F6FB] stroke-[#168BC4]"
          strokeWidth="2.2"
        />
        <circle
          cx="60"
          cy="22"
          r="8"
          className="fill-[#E8F6FB] stroke-[#168BC4]"
          strokeWidth="2.2"
        />
        <circle
          cx="60"
          cy="58"
          r="8"
          className="fill-[#E8F6FB] stroke-[#168BC4]"
          strokeWidth="2.2"
        />
        <path
          d="M28 37 52 25M28 43l24 12"
          className={common}
        />
      </svg>
    )
  }

  if (type === "five-step") {
    return (
      <svg
        viewBox="0 0 80 80"
        className="h-20 w-20"
        aria-hidden="true"
      >
        {[12, 26, 40, 54].map((x, i) => (
          <g key={x}>
            <circle
              cx={x}
              cy="40"
              r="7"
              className="fill-[#E8F6FB] stroke-[#168BC4]"
              strokeWidth="2"
            />
            {i < 3 && (
              <path
                d={`M${x + 8} 40h${6}`}
                className="stroke-[#35B5E5]"
                strokeWidth="2"
              />
            )}
          </g>
        ))}
        <circle
          cx="68"
          cy="40"
          r="7"
          className="fill-[#071B49]"
        />
      </svg>
    )
  }

  if (type === "elimination") {
    return (
      <svg
        viewBox="0 0 80 80"
        className="h-20 w-20"
        aria-hidden="true"
      >
        <rect
          x="10"
          y="24"
          width="22"
          height="32"
          rx="5"
          className="fill-[#E8F6FB] stroke-[#168BC4]"
          strokeWidth="2.2"
        />
        <rect
          x="48"
          y="24"
          width="22"
          height="32"
          rx="5"
          className="fill-[#F5F8FC] stroke-[#071B49]"
          strokeWidth="2.2"
        />
        <path
          d="m30 20 20 40M50 20 30 60"
          className="stroke-[#168BC4]"
          strokeWidth="2.5"
        />
      </svg>
    )
  }

  return (
    <svg
      viewBox="0 0 80 80"
      className="h-20 w-20"
      aria-hidden="true"
    >
      <rect
        x="12"
        y="16"
        width="56"
        height="48"
        rx="8"
        className="fill-[#E8F6FB] stroke-[#168BC4]"
        strokeWidth="2.2"
      />
      <path
        d="M24 40h32M40 28v24"
        className={common}
      />
    </svg>
  )
}

function FlowLayout({
  nodes,
}: {
  nodes: string[]
}) {
  return (
    <div className="flex flex-wrap items-center justify-center gap-2">
      {nodes.map((node, index) => (
        <React.Fragment key={`${node}-${index}`}>
          <Node
            index={index}
          >
            {node}
          </Node>

          {index < nodes.length - 1 && (
            <Arrow />
          )}
        </React.Fragment>
      ))}
    </div>
  )
}

function ComparisonLayout({
  nodes,
}: {
  nodes: string[]
}) {
  const midpoint = Math.ceil(
    nodes.length / 2
  )

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <div className="rounded-2xl border border-[#168BC4]/20 bg-[#F5FAFC] p-4">
        <p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-[#168BC4]">
          Treatment A
        </p>

        <div className="space-y-2">
          {nodes
            .slice(0, midpoint)
            .map((node, index) => (
              <Node
                key={`${node}-${index}`}
                index={index}
              >
                {node}
              </Node>
            ))}
        </div>
      </div>

      <div className="rounded-2xl border border-[#071B49]/10 bg-white p-4">
        <p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-[#071B49]/60">
          Treatment B
        </p>

        <div className="space-y-2">
          {nodes
            .slice(midpoint)
            .map((node, index) => (
              <Node
                key={`${node}-${index + midpoint}`}
                index={index + midpoint}
              >
                {node}
              </Node>
            ))}
        </div>
      </div>
    </div>
  )
}

export default function CuraSectionIllustration({
  visual,
}: Props) {
  if (
    !visual ||
    !visual.title
  ) {
    return null
  }

  const type =
    visual.type || "flow"

  const nodes =
    Array.isArray(visual.nodes)
      ? visual.nodes.filter(
          (node): node is string =>
            typeof node === "string" &&
            node.trim().length > 0
        )
      : []

  if (nodes.length === 0) {
    return null
  }

  const isComparison =
    type === "comparison" ||
    type === "split"

  return (
    <div
      className="
        mb-8
        overflow-hidden
        rounded-[28px]
        border
        border-[#168BC4]/15
        bg-gradient-to-br
        from-[#F8FCFE]
        to-white
      "
    >
      <div className="grid gap-6 p-6 md:grid-cols-[120px_minmax(0,1fr)] md:p-8">
        <div className="flex items-center justify-center">
          <div className="flex h-28 w-28 items-center justify-center rounded-[24px] border border-[#168BC4]/15 bg-white shadow-[0_8px_24px_rgba(7,27,73,0.06)]">
            <MiniIcon type={type} />
          </div>
        </div>

        <div className="min-w-0">
          <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#168BC4]">
            {visual.eyebrow || "CURA concept visual"}
          </p>

          <h3 className="mt-2 text-lg font-semibold leading-7 text-[#071B49] md:text-xl">
            {visual.title}
          </h3>

          <div className="mt-5">
            {isComparison ? (
              <ComparisonLayout
                nodes={nodes}
              />
            ) : (
              <FlowLayout
                nodes={nodes}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
