import React from "react"

export type CuraSectionVisual = {
  type?: string
  eyebrow?: string
  title?: string
  nodes?: string[]
  note?: string
}

type Props = {
  visual?: CuraSectionVisual | null
}

const navy = "#071B49"
const blue = "#168BC4"
const cyan = "#35B5E5"

function Box({
  children,
  active = false,
}: {
  children: React.ReactNode
  active?: boolean
}) {
  return (
    <div
      className={[
        "rounded-2xl border px-4 py-3 text-center",
        "shadow-[0_6px_18px_rgba(7,27,73,0.06)]",
        active
          ? "border-[#168BC4] bg-[#E8F6FB]"
          : "border-[#D7E6EE] bg-white",
      ].join(" ")}
    >
      <span className="text-sm font-semibold leading-5 text-[#071B49]">
        {children}
      </span>
    </div>
  )
}

function Arrow() {
  return (
    <span
      aria-hidden="true"
      className="shrink-0 text-lg font-bold text-[#168BC4]"
    >
      →
    </span>
  )
}

function FlowVisual({
  nodes,
}: {
  nodes: string[]
}) {
  return (
    <div className="flex flex-wrap items-center justify-center gap-2">
      {nodes.map((node, index) => (
        <React.Fragment key={`${node}-${index}`}>
          <Box active={index === 0}>
            {node}
          </Box>

          {index < nodes.length - 1 && (
            <Arrow />
          )}
        </React.Fragment>
      ))}
    </div>
  )
}

function VerticalFlow({
  nodes,
}: {
  nodes: string[]
}) {
  return (
    <div className="mx-auto flex max-w-xl flex-col items-center">
      {nodes.map((node, index) => (
        <React.Fragment key={`${node}-${index}`}>
          <Box active={index === 0}>
            {node}
          </Box>

          {index < nodes.length - 1 && (
            <div className="flex h-7 items-center">
              <span className="text-lg font-bold text-[#168BC4]">
                ↓
              </span>
            </div>
          )}
        </React.Fragment>
      ))}
    </div>
  )
}

function DecisionVisual({
  nodes,
}: {
  nodes: string[]
}) {
  const first = nodes[0] || "Question"
  const rest = nodes.slice(1)

  return (
    <div className="mx-auto max-w-2xl">
      <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-[24px] border-2 border-[#168BC4] bg-[#E8F6FB]">
        <div className="h-9 w-9 rotate-45 rounded-lg border-2 border-[#071B49] bg-white" />
      </div>

      <p className="mt-3 text-center text-sm font-semibold text-[#071B49]">
        {first}
      </p>

      <div className="mx-auto my-5 h-7 w-px bg-[#35B5E5]" />

      <div className="grid gap-3 sm:grid-cols-2">
        {rest.map((node, index) => (
          <div
            key={`${node}-${index}`}
            className="rounded-2xl border border-[#D7E6EE] bg-white p-4 text-center shadow-sm"
          >
            <div className="mb-2 text-xs font-bold uppercase tracking-[0.16em] text-[#168BC4]">
              {index === 0 ? "YES / APPLY" : "NO / OTHER"}
            </div>

            <div className="text-sm font-semibold text-[#071B49]">
              {node}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function MeasurementVisual({
  nodes,
}: {
  nodes: string[]
}) {
  return (
    <div className="grid gap-4 md:grid-cols-[1fr_90px_1fr] md:items-center">
      <Box>
        {nodes[0] || "Carrying amount"}
      </Box>

      <div className="flex justify-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-[#168BC4] bg-[#E8F6FB]">
          <span className="text-xl font-bold text-[#071B49]">
            =
          </span>
        </div>
      </div>

      <Box active>
        {nodes[1] || "Measurement basis"}
      </Box>

      {nodes.slice(2).map((node, index) => (
        <div
          key={`${node}-${index}`}
          className="rounded-2xl border border-[#D7E6EE] bg-[#F8FBFD] p-4 text-center md:col-span-3"
        >
          <span className="text-sm font-semibold text-[#071B49]">
            {node}
          </span>
        </div>
      ))}
    </div>
  )
}

function ComparisonVisual({
  nodes,
}: {
  nodes: string[]
}) {
  const midpoint = Math.ceil(nodes.length / 2)

  return (
    <div className="grid gap-5 md:grid-cols-2">
      <div className="rounded-3xl border border-[#168BC4]/20 bg-[#F5FAFC] p-5">
        <p className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-[#168BC4]">
          Accounting route A
        </p>

        <div className="space-y-3">
          {nodes.slice(0, midpoint).map((node, index) => (
            <Box key={`${node}-${index}`}>
              {node}
            </Box>
          ))}
        </div>
      </div>

      <div className="rounded-3xl border border-[#071B49]/10 bg-white p-5">
        <p className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-[#071B49]/60">
          Accounting route B
        </p>

        <div className="space-y-3">
          {nodes.slice(midpoint).map((node, index) => (
            <Box key={`${node}-${index}`}>
              {node}
            </Box>
          ))}
        </div>
      </div>
    </div>
  )
}

function LifecycleVisual({
  nodes,
}: {
  nodes: string[]
}) {
  return (
    <div className="relative mx-auto max-w-3xl">
      <div className="absolute left-8 right-8 top-1/2 hidden h-px bg-[#BFE7F4] md:block" />

      <div className="relative grid gap-3 md:grid-cols-5">
        {nodes.slice(0, 5).map((node, index) => (
          <div
            key={`${node}-${index}`}
            className="relative rounded-2xl border border-[#D7E6EE] bg-white p-4 text-center shadow-sm"
          >
            <div className="mx-auto mb-3 flex h-8 w-8 items-center justify-center rounded-full bg-[#E8F6FB] text-xs font-bold text-[#168BC4]">
              {index + 1}
            </div>

            <div className="text-sm font-semibold leading-5 text-[#071B49]">
              {node}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function HierarchyVisual({
  nodes,
}: {
  nodes: string[]
}) {
  return (
    <div className="mx-auto max-w-2xl">
      <div className="flex flex-col items-center gap-3">
        {nodes.slice(0, 4).map((node, index) => (
          <React.Fragment key={`${node}-${index}`}>
            <div
              className="rounded-2xl border-2 px-8 py-3 text-center"
              style={{
                borderColor:
                  index === 0
                    ? blue
                    : "#D7E6EE",
                background:
                  index === 0
                    ? "#E8F6FB"
                    : "white",
                width: `${Math.max(
                  45,
                  100 - index * 15
                )}%`,
              }}
            >
              <span className="text-sm font-semibold text-[#071B49]">
                {node}
              </span>
            </div>

            {index < Math.min(nodes.length, 4) - 1 && (
              <span className="text-[#168BC4]">
                ↓
              </span>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  )
}

function CashFlowVisual({
  nodes,
}: {
  nodes: string[]
}) {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      {nodes.slice(0, 3).map((node, index) => (
        <div
          key={`${node}-${index}`}
          className="relative rounded-3xl border border-[#D7E6EE] bg-white p-5 text-center shadow-sm"
        >
          <div
            className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full"
            style={{
              background:
                index === 0
                  ? "#E8F6FB"
                  : "#F5F8FC",
            }}
          >
            <span className="text-2xl font-bold text-[#168BC4]">
              {index === 0
                ? "→"
                : index === 1
                  ? "↔"
                  : "←"}
            </span>
          </div>

          <div className="text-sm font-semibold text-[#071B49]">
            {node}
          </div>
        </div>
      ))}
    </div>
  )
}

function EliminationVisual({
  nodes,
}: {
  nodes: string[]
}) {
  return (
    <div className="grid gap-4 md:grid-cols-[1fr_80px_1fr] md:items-center">
      <Box>
        {nodes[0] || "Group entity A"}
      </Box>

      <div className="flex items-center justify-center">
        <span className="text-3xl font-bold text-[#168BC4]">
          −
        </span>
      </div>

      <Box>
        {nodes[1] || "Group entity B"}
      </Box>

      {nodes.slice(2).length > 0 && (
        <div className="rounded-2xl border border-[#168BC4]/20 bg-[#E8F6FB] p-4 text-center md:col-span-3">
          <span className="text-sm font-semibold text-[#071B49]">
            {nodes.slice(2).join(" → ")}
          </span>
        </div>
      )}
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

  const type =
    (visual.type || "flow").toLowerCase()

  let content: React.ReactNode

  if (
    type === "decision" ||
    type === "scope"
  ) {
    content = (
      <DecisionVisual
        nodes={nodes}
      />
    )
  } else if (
    type === "measurement" ||
    type === "fair-value"
  ) {
    content = (
      <MeasurementVisual
        nodes={nodes}
      />
    )
  } else if (
    type === "comparison" ||
    type === "split"
  ) {
    content = (
      <ComparisonVisual
        nodes={nodes}
      />
    )
  } else if (
    type === "lifecycle" ||
    type === "cycle" ||
    type === "timeline"
  ) {
    content = (
      <LifecycleVisual
        nodes={nodes}
      />
    )
  } else if (
    type === "hierarchy"
  ) {
    content = (
      <HierarchyVisual
        nodes={nodes}
      />
    )
  } else if (
    type === "cashflow"
  ) {
    content = (
      <CashFlowVisual
        nodes={nodes}
      />
    )
  } else if (
    type === "elimination" ||
    type === "consolidation"
  ) {
    content = (
      <EliminationVisual
        nodes={nodes}
      />
    )
  } else if (
    type === "vertical"
  ) {
    content = (
      <VerticalFlow
        nodes={nodes}
      />
    )
  } else {
    content = (
      <FlowVisual
        nodes={nodes}
      />
    )
  }

  return (
    <div className="mb-8 overflow-hidden rounded-[28px] border border-[#168BC4]/15 bg-gradient-to-br from-[#F7FCFE] to-white">
      <div className="p-6 md:p-8">
        <div className="mb-6">
          <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#168BC4]">
            {visual.eyebrow || "CURA concept visual"}
          </p>

          <h3 className="mt-2 text-lg font-semibold leading-7 text-[#071B49] md:text-xl">
            {visual.title}
          </h3>
        </div>

        {content}

        {visual.note && (
          <p className="mt-6 rounded-2xl bg-[#F5F8FC] px-5 py-4 text-sm leading-6 text-[#173565]">
            {visual.note}
          </p>
        )}
      </div>
    </div>
  )
}
