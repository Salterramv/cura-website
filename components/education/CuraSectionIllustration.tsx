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

const NAVY = "#071B3A"
const BLUE = "#145D8F"
const CYAN = "#24B8ED"
const BORDER = "#DFE7EF"
const PALE = "#F5F8FB"
const LIGHT_BLUE = "#E8F6FB"

function Card({
  children,
  active = false,
  dark = false,
}: {
  children: React.ReactNode
  active?: boolean
  dark?: boolean
}) {
  return (
    <div
      className={[
        "rounded-2xl border p-4 text-center shadow-[0_6px_18px_rgba(7,27,58,0.06)]",
        dark
          ? "border-[#071B3A] bg-[#071B3A] text-white"
          : active
            ? "border-[#24B8ED] bg-[#E8F6FB]"
            : "border-[#DFE7EF] bg-white",
      ].join(" ")}
    >
      <div
        className={[
          "text-sm font-semibold leading-5",
          dark ? "text-white" : "text-[#071B3A]",
        ].join(" ")}
      >
        {children}
      </div>
    </div>
  )
}

function Arrow() {
  return (
    <span className="shrink-0 text-xl font-bold text-[#24B8ED]">
      →
    </span>
  )
}

function Flow({
  nodes,
}: {
  nodes: string[]
}) {
  return (
    <div className="flex flex-wrap items-center justify-center gap-2">
      {nodes.map((node, index) => (
        <React.Fragment key={`${node}-${index}`}>
          <Card active={index === 0}>
            {node}
          </Card>

          {index < nodes.length - 1 && <Arrow />}
        </React.Fragment>
      ))}
    </div>
  )
}

function Decision({
  nodes,
}: {
  nodes: string[]
}) {
  return (
    <div className="mx-auto max-w-3xl">
      <div className="grid gap-3">
        {nodes.map((node, index) => (
          <React.Fragment key={`${node}-${index}`}>
            <div className="flex items-center gap-4 rounded-2xl border border-[#DFE7EF] bg-white p-4 shadow-sm">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#E8F6FB] text-sm font-bold text-[#145D8F]">
                {index + 1}
              </div>

              <div className="flex-1 text-left text-sm font-semibold text-[#071B3A]">
                {node}
              </div>

              {index === nodes.length - 1 && (
                <div className="text-lg font-bold text-[#24B8ED]">
                  ✓
                </div>
              )}
            </div>

            {index < nodes.length - 1 && (
              <div className="flex justify-center text-[#24B8ED]">
                ↓
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  )
}

function Measurement({
  nodes,
}: {
  nodes: string[]
}) {
  const first = nodes[0]
  const middle = nodes.slice(1, -1)
  const result = nodes[nodes.length - 1]

  return (
    <div className="mx-auto max-w-5xl">
      <div className="grid gap-4 md:grid-cols-[1fr_60px_1.2fr_60px_1fr] md:items-center">
        <Card>{first}</Card>

        <div className="text-center text-2xl font-bold text-[#24B8ED]">
          →
        </div>

        <div className="space-y-2">
          {middle.map((node, index) => (
            <Card key={`${node}-${index}`}>
              {node}
            </Card>
          ))}
        </div>

        <div className="text-center text-2xl font-bold text-[#24B8ED]">
          →
        </div>

        <Card active>{result}</Card>
      </div>
    </div>
  )
}

function Timeline({
  nodes,
}: {
  nodes: string[]
}) {
  return (
    <div className="relative">
      <div className="hidden md:block absolute left-[6%] right-[6%] top-[32px] h-px bg-[#BFE7F4]" />

      <div className="relative grid gap-3 md:grid-cols-2 lg:grid-cols-4">
        {nodes.map((node, index) => (
          <div
            key={`${node}-${index}`}
            className="rounded-2xl border border-[#DFE7EF] bg-white p-4 shadow-sm"
          >
            <div className="mb-3 flex h-8 w-8 items-center justify-center rounded-full bg-[#E8F6FB] text-xs font-bold text-[#145D8F]">
              {index + 1}
            </div>

            <div className="text-sm font-semibold leading-5 text-[#071B3A]">
              {node}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function Comparison({
  nodes,
}: {
  nodes: string[]
}) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {nodes.map((node, index) => (
        <div
          key={`${node}-${index}`}
          className={[
            "rounded-[22px] border p-5",
            index === nodes.length - 1
              ? "border-[#24B8ED] bg-[#E8F6FB]"
              : "border-[#DFE7EF] bg-white",
          ].join(" ")}
        >
          <div className="mb-3 text-[10px] font-bold uppercase tracking-[0.18em] text-[#168BC4]">
            {index === nodes.length - 1
              ? "CURA conclusion"
              : `Option ${index + 1}`}
          </div>

          <div className="text-sm font-semibold leading-6 text-[#071B3A]">
            {node}
          </div>
        </div>
      ))}
    </div>
  )
}

function Process({
  nodes,
}: {
  nodes: string[]
}) {
  return (
    <div className="mx-auto max-w-4xl">
      <div className="grid gap-3">
        {nodes.map((node, index) => (
          <React.Fragment key={`${node}-${index}`}>
            <div className="flex items-center gap-4 rounded-2xl border border-[#DFE7EF] bg-white p-4 shadow-sm">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#071B3A] text-xs font-bold text-white">
                {index + 1}
              </div>

              <div className="text-sm font-semibold text-[#071B3A]">
                {node}
              </div>
            </div>

            {index < nodes.length - 1 && (
              <div className="ml-5 text-[#24B8ED]">
                ↓
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  )
}

function Journal({
  nodes,
}: {
  nodes: string[]
}) {
  return (
    <div className="mx-auto max-w-4xl">
      <div className="rounded-[24px] border border-[#DFE7EF] bg-white p-5 shadow-sm">
        <div className="grid gap-3 md:grid-cols-2">
          {nodes.map((node, index) => (
            <div
              key={`${node}-${index}`}
              className="rounded-xl bg-[#F5F8FB] p-4"
            >
              <div className="mb-1 text-[10px] font-bold uppercase tracking-[0.16em] text-[#168BC4]">
                Step {index + 1}
              </div>

              <div className="text-sm font-semibold leading-5 text-[#071B3A]">
                {node}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-5 rounded-xl border-2 border-[#24B8ED] bg-[#E8F6FB] p-4 text-center text-sm font-bold text-[#071B3A]">
          Accounting entry follows from the identified movement.
        </div>
      </div>
    </div>
  )
}

function Matrix({
  nodes,
}: {
  nodes: string[]
}) {
  return (
    <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
      {nodes.map((node, index) => (
        <div
          key={`${node}-${index}`}
          className="rounded-2xl border border-[#DFE7EF] bg-white p-5"
        >
          <div className="mb-3 flex h-8 w-8 items-center justify-center rounded-full bg-[#E8F6FB] text-xs font-bold text-[#145D8F]">
            {index + 1}
          </div>

          <div className="text-sm font-semibold leading-5 text-[#071B3A]">
            {node}
          </div>
        </div>
      ))}
    </div>
  )
}

function Example({
  nodes,
}: {
  nodes: string[]
}) {
  return (
    <div className="mx-auto max-w-5xl">
      <div className="grid gap-4 md:grid-cols-5">
        {nodes.map((node, index) => (
          <div
            key={`${node}-${index}`}
            className={[
              "relative rounded-[22px] border p-5 text-center",
              index === 0
                ? "border-[#DFE7EF] bg-white"
                : index === nodes.length - 1
                  ? "border-[#071B3A] bg-[#071B3A]"
                  : "border-[#24B8ED] bg-[#E8F6FB]",
            ].join(" ")}
          >
            <div
              className={[
                "mb-3 text-[10px] font-bold uppercase tracking-[0.16em]",
                index === nodes.length - 1
                  ? "text-[#35B5E5]"
                  : "text-[#168BC4]",
              ].join(" ")}
            >
              {index === 0
                ? "Facts"
                : index === nodes.length - 1
                  ? "Result"
                  : `Step ${index}`}
            </div>

            <div
              className={[
                "text-sm font-semibold leading-5",
                index === nodes.length - 1
                  ? "text-white"
                  : "text-[#071B3A]",
              ].join(" ")}
            >
              {node}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

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
    (n): n is string =>
      typeof n === "string" && n.trim().length > 0
  )

  if (!nodes.length) return null

  let content: React.ReactNode

  switch (String(visual.type || "flow").toLowerCase()) {
    case "decision":
    case "recognition-gates":
      content = <Decision nodes={nodes} />
      break

    case "measurement":
    case "measurement-bridge":
      content = <Measurement nodes={nodes} />
      break

    case "timeline":
    case "lifecycle":
      content = <Timeline nodes={nodes} />
      break

    case "comparison":
    case "bearer-split":
    case "outside-scope":
      content = <Comparison nodes={nodes} />
      break

    case "journal":
      content = <Journal nodes={nodes} />
      break

    case "matrix":
      content = <Matrix nodes={nodes} />
      break

    case "example":
      content = <Example nodes={nodes} />
      break

    case "process":
    case "agriculture-chain":
    case "harvest-transition":
      content = <Process nodes={nodes} />
      break

    default:
      content = <Flow nodes={nodes} />
      break
  }

  return (
    <div className="mb-8 overflow-hidden rounded-[28px] border border-[#24B8ED]/15 bg-gradient-to-br from-[#F7FCFE] to-white">
      <div className="p-6 md:p-8">
        <div className="mb-6">
          <div className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#168BC4]">
            {visual.eyebrow || "CURA concept visual"}
          </div>

          <h3 className="mt-2 text-lg font-semibold leading-7 text-[#071B3A] md:text-xl">
            {visual.title}
          </h3>
        </div>

        {content}

        {visual.note && (
          <div className="mt-6 rounded-2xl bg-[#F5F8FB] px-5 py-4 text-sm leading-6 text-[#173565]">
            {visual.note}
          </div>
        )}
      </div>
    </div>
  )
}
