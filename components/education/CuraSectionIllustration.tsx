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

const NAVY = "#071B49"
const BLUE = "#168BC4"
const CYAN = "#35B5E5"
const PALE = "#E8F6FB"
const BORDER = "#D7E6EE"

function Box({
  children,
  active = false,
  muted = false,
}: {
  children: React.ReactNode
  active?: boolean
  muted?: boolean
}) {
  return (
    <div
      className={[
        "rounded-2xl border px-4 py-3 text-center",
        "shadow-[0_6px_18px_rgba(7,27,73,0.06)]",
        active
          ? "border-[#168BC4] bg-[#E8F6FB]"
          : muted
            ? "border-[#D7E6EE] bg-[#F5F8FC]"
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

function DownArrow() {
  return (
    <span
      aria-hidden="true"
      className="text-lg font-bold text-[#168BC4]"
    >
      ↓
    </span>
  )
}

/* ============================================================
   AGRICULTURE MAP
   ============================================================ */

function AgricultureMap({
  nodes,
}: {
  nodes: string[]
}) {
  return (
    <div className="relative">
      <div className="hidden md:block absolute left-[8%] right-[8%] top-[34px] h-px bg-[#BFE7F4]" />

      <div className="relative grid gap-3 md:grid-cols-3 lg:grid-cols-6">
        {nodes.map((node, index) => (
          <div
            key={`${node}-${index}`}
            className="relative rounded-2xl border border-[#D7E6EE] bg-white p-4 text-center shadow-sm"
          >
            <div
              className={[
                "mx-auto mb-3 flex h-9 w-9 items-center justify-center rounded-full",
                index === 0
                  ? "bg-[#168BC4] text-white"
                  : "bg-[#E8F6FB] text-[#168BC4]",
              ].join(" ")}
            >
              <span className="text-xs font-bold">
                {index + 1}
              </span>
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

/* ============================================================
   AGRICULTURE DECISION CHAIN
   ============================================================ */

function AgricultureChain({
  nodes,
}: {
  nodes: string[]
}) {
  return (
    <div className="relative">
      <div className="hidden lg:block absolute left-[5%] right-[5%] top-[34px] h-px bg-[#BFE7F4]" />

      <div className="relative flex flex-wrap items-center justify-center gap-2">
        {nodes.map((node, index) => (
          <React.Fragment key={`${node}-${index}`}>
            <div className="min-w-[170px] max-w-[220px]">
              <Box active={index === 0}>
                {node}
              </Box>
            </div>

            {index < nodes.length - 1 && (
              <Arrow />
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  )
}

/* ============================================================
   SCOPE
   ============================================================ */

function AgricultureScope({
  nodes,
}: {
  nodes: string[]
}) {
  return (
    <div className="grid gap-5 md:grid-cols-2">
      <div className="rounded-[24px] border border-[#168BC4]/20 bg-[#F5FBFD] p-5">
        <div className="mb-4 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#168BC4] text-white">
            ✓
          </div>

          <div>
            <div className="text-xs font-bold uppercase tracking-[0.18em] text-[#168BC4]">
              Within the model
            </div>
            <div className="mt-1 text-sm font-semibold text-[#071B49]">
              IAS 41
            </div>
          </div>
        </div>

        <div className="space-y-3">
          {nodes.slice(0, 3).map((node, index) => (
            <Box
              key={`${node}-${index}`}
              active={index === 0}
            >
              {node}
            </Box>
          ))}
        </div>
      </div>

      <div className="rounded-[24px] border border-[#071B49]/10 bg-white p-5">
        <div className="mb-4 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#F5F8FC] text-[#071B49]">
            →
          </div>

          <div>
            <div className="text-xs font-bold uppercase tracking-[0.18em] text-[#071B49]/60">
              Boundary
            </div>
            <div className="mt-1 text-sm font-semibold text-[#071B49]">
              Other standards
            </div>
          </div>
        </div>

        <div className="space-y-3">
          {nodes.slice(3).map((node, index) => (
            <Box
              key={`${node}-${index}`}
              muted
            >
              {node}
            </Box>
          ))}
        </div>
      </div>
    </div>
  )
}

/* ============================================================
   RECOGNITION GATES
   ============================================================ */

function RecognitionGates({
  nodes,
}: {
  nodes: string[]
}) {
  return (
    <div className="mx-auto max-w-3xl">
      <div className="grid gap-3">
        {nodes.slice(0, -1).map((node, index) => (
          <React.Fragment key={`${node}-${index}`}>
            <div className="flex items-center gap-4 rounded-2xl border border-[#D7E6EE] bg-white p-4 shadow-sm">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#E8F6FB] text-sm font-bold text-[#168BC4]">
                {index + 1}
              </div>

              <span className="text-sm font-semibold text-[#071B49]">
                {node}
              </span>

              <span className="ml-auto text-[#168BC4]">
                ✓
              </span>
            </div>

            {index < nodes.length - 2 && (
              <div className="flex justify-center">
                <DownArrow />
              </div>
            )}
          </React.Fragment>
        ))}

        <div className="mt-2 rounded-2xl border-2 border-[#168BC4] bg-[#E8F6FB] p-5 text-center">
          <div className="text-xs font-bold uppercase tracking-[0.18em] text-[#168BC4]">
            Recognition
          </div>

          <div className="mt-2 text-base font-bold text-[#071B49]">
            {nodes[nodes.length - 1]}
          </div>
        </div>
      </div>
    </div>
  )
}

/* ============================================================
   MEASUREMENT BRIDGE
   ============================================================ */

function MeasurementBridge({
  nodes,
}: {
  nodes: string[]
}) {
  return (
    <div className="mx-auto max-w-4xl">
      <div className="grid gap-3 md:grid-cols-[1fr_70px_1fr_70px_1fr] md:items-center">
        <Box>
          {nodes[0]}
        </Box>

        <div className="flex justify-center text-2xl font-bold text-[#168BC4]">
          −
        </div>

        <Box>
          {nodes[1]}
        </Box>

        <div className="flex justify-center text-2xl font-bold text-[#168BC4]">
          =
        </div>

        <Box active>
          {nodes[2]}
        </Box>
      </div>

      {nodes[3] && (
        <div className="mt-5 flex items-center justify-center gap-3">
          <Arrow />

          <div className="rounded-2xl border border-[#168BC4]/20 bg-[#F5FBFD] px-6 py-4 text-center">
            <div className="text-xs font-bold uppercase tracking-[0.16em] text-[#168BC4]">
              Result
            </div>

            <div className="mt-1 text-sm font-semibold text-[#071B49]">
              {nodes[3]}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

/* ============================================================
   AGRICULTURE LIFECYCLE
   ============================================================ */

function AgricultureLifecycle({
  nodes,
}: {
  nodes: string[]
}) {
  return (
    <div className="relative">
      <div className="hidden lg:block absolute left-[6%] right-[6%] top-[36px] h-px bg-[#BFE7F4]" />

      <div className="relative grid gap-3 md:grid-cols-3 lg:grid-cols-6">
        {nodes.map((node, index) => (
          <div
            key={`${node}-${index}`}
            className="rounded-2xl border border-[#D7E6EE] bg-white p-4 text-center shadow-sm"
          >
            <div
              className={[
                "mx-auto mb-3 flex h-9 w-9 items-center justify-center rounded-full text-xs font-bold",
                index === nodes.length - 1
                  ? "bg-[#071B49] text-white"
                  : "bg-[#E8F6FB] text-[#168BC4]",
              ].join(" ")}
            >
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

/* ============================================================
   HARVEST TRANSITION
   ============================================================ */

function HarvestTransition({
  nodes,
}: {
  nodes: string[]
}) {
  return (
    <div className="mx-auto max-w-4xl">
      <div className="grid gap-3 md:grid-cols-5 md:items-center">
        {nodes.map((node, index) => (
          <React.Fragment key={`${node}-${index}`}>
            <div
              className={[
                "rounded-2xl border p-5 text-center",
                index === 1
                  ? "border-[#168BC4] bg-[#E8F6FB]"
                  : index === 4
                    ? "border-[#071B49] bg-[#071B49]"
                    : "border-[#D7E6EE] bg-white",
              ].join(" ")}
            >
              <div
                className={[
                  "mb-2 text-[10px] font-bold uppercase tracking-[0.18em]",
                  index === 4
                    ? "text-[#35B5E5]"
                    : "text-[#168BC4]",
                ].join(" ")}
              >
                {index === 1
                  ? "Critical point"
                  : index === 4
                    ? "Next standard"
                    : `Step ${index + 1}`}
              </div>

              <div
                className={[
                  "text-sm font-semibold leading-5",
                  index === 4
                    ? "text-white"
                    : "text-[#071B49]",
                ].join(" ")}
              >
                {node}
              </div>
            </div>

            {index < nodes.length - 1 && (
              <div className="hidden justify-center md:flex">
                <Arrow />
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  )
}

/* ============================================================
   BEARER PLANT SPLIT
   ============================================================ */

function BearerSplit({
  nodes,
}: {
  nodes: string[]
}) {
  return (
    <div className="grid gap-5 md:grid-cols-3">
      {nodes.map((node, index) => (
        <div
          key={`${node}-${index}`}
          className="relative rounded-[24px] border border-[#D7E6EE] bg-white p-5 text-center shadow-sm"
        >
          <div
            className={[
              "mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full",
              index === 0
                ? "bg-[#071B49] text-white"
                : index === 1
                  ? "bg-[#E8F6FB] text-[#168BC4]"
                  : "bg-[#F5F8FC] text-[#071B49]",
            ].join(" ")}
          >
            <span className="text-lg font-bold">
              {index + 1}
            </span>
          </div>

          <div className="text-sm font-semibold leading-6 text-[#071B49]">
            {node}
          </div>

          {index < nodes.length - 1 && (
            <div className="mt-4 text-[#168BC4]">
              ↓
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

/* ============================================================
   OUTSIDE SCOPE
   ============================================================ */

function OutsideScope({
  nodes,
}: {
  nodes: string[]
}) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {nodes.map((node, index) => (
        <div
          key={`${node}-${index}`}
          className="flex items-center gap-4 rounded-2xl border border-[#D7E6EE] bg-white p-4 shadow-sm"
        >
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#F5F8FC] text-sm font-bold text-[#071B49]">
            {index + 1}
          </div>

          <div className="text-sm font-semibold leading-5 text-[#071B49]">
            {node}
          </div>
        </div>
      ))}
    </div>
  )
}

/* ============================================================
   GOVERNMENT GRANT DECISION
   ============================================================ */

function GrantDecision({
  nodes,
}: {
  nodes: string[]
}) {
  return (
    <div className="mx-auto max-w-4xl">
      <div className="mb-5 rounded-2xl border-2 border-[#168BC4] bg-[#E8F6FB] p-5 text-center">
        <div className="text-xs font-bold uppercase tracking-[0.18em] text-[#168BC4]">
          Start here
        </div>

        <div className="mt-2 text-sm font-bold text-[#071B49]">
          {nodes[0]}
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {nodes.slice(1).map((node, index) => (
          <div
            key={`${node}-${index}`}
            className="rounded-3xl border border-[#D7E6EE] bg-white p-5 text-center shadow-sm"
          >
            <div className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-[#168BC4]">
              Route {index + 1}
            </div>

            <div className="text-sm font-semibold leading-6 text-[#071B49]">
              {node}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ============================================================
   STANDARD FLOW
   ============================================================ */

function StandardFlow({
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

/* ============================================================
   MAIN COMPONENT
   ============================================================ */

export default function CuraSectionIllustration({
  visual,
}: Props) {
  if (
    !visual ||
    !visual.title ||
    !Array.isArray(visual.nodes) ||
    visual.nodes.length === 0
  ) {
    return null
  }

  const nodes = visual.nodes.filter(
    (node): node is string =>
      typeof node === "string" &&
      node.trim().length > 0
  )

  if (nodes.length === 0) {
    return null
  }

  const type =
    String(visual.type || "flow").toLowerCase()

  let content: React.ReactNode

  switch (type) {
    case "agriculture-map":
      content = (
        <AgricultureMap nodes={nodes} />
      )
      break

    case "agriculture-chain":
      content = (
        <AgricultureChain nodes={nodes} />
      )
      break

    case "agriculture-scope":
    case "scope":
      content = (
        <AgricultureScope nodes={nodes} />
      )
      break

    case "recognition-gates":
      content = (
        <RecognitionGates nodes={nodes} />
      )
      break

    case "measurement-bridge":
      content = (
        <MeasurementBridge nodes={nodes} />
      )
      break

    case "agriculture-lifecycle":
      content = (
        <AgricultureLifecycle nodes={nodes} />
      )
      break

    case "harvest-transition":
      content = (
        <HarvestTransition nodes={nodes} />
      )
      break

    case "bearer-split":
      content = (
        <BearerSplit nodes={nodes} />
      )
      break

    case "outside-scope":
      content = (
        <OutsideScope nodes={nodes} />
      )
      break

    case "grant-decision":
      content = (
        <GrantDecision nodes={nodes} />
      )
      break

    case "measurement":
    case "fair-value":
      content = (
        <MeasurementBridge nodes={nodes} />
      )
      break

    case "lifecycle":
    case "cycle":
    case "timeline":
      content = (
        <AgricultureLifecycle nodes={nodes} />
      )
      break

    default:
      content = (
        <StandardFlow nodes={nodes} />
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
          <div className="mt-6 rounded-2xl bg-[#F5F8FC] px-5 py-4 text-sm leading-6 text-[#173565]">
            {visual.note}
          </div>
        )}
      </div>
    </div>
  )
}
