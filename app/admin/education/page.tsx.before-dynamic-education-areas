import { Suspense } from "react"
import EducationMaterialsClient from "./EducationMaterialsClient"

function EducationMaterialsLoading() {
  return (
    <main className="min-h-screen bg-[#F6FAF8] px-6 py-10">
      <div className="mx-auto max-w-7xl">
        <div className="text-xs font-bold uppercase tracking-[0.18em] text-[#159B78]">
          CURA Education
        </div>

        <h1 className="mt-2 text-3xl font-bold tracking-tight text-[#071B49]">
          Education Materials
        </h1>

        <div className="mt-8 rounded-3xl border border-[#DCE9E4] bg-white px-6 py-14 text-center text-sm text-[#71827C]">
          Loading Education Materials…
        </div>
      </div>
    </main>
  )
}

export default function EducationMaterialsPage() {
  return (
    <Suspense fallback={<EducationMaterialsLoading />}>
      <EducationMaterialsClient />
    </Suspense>
  )
}
