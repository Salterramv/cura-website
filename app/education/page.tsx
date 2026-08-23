import Link from "next/link"
import CuraHeader from "@/components/CuraHeader"
import CuraFooter from "@/components/CuraFooter"

const options = [
  {
    number: "01",
    title: "Educational Materials",
    description:
      "CURA study guides, reference materials and practical learning resources covering taxation, accounting, audit and law.",
    href: "/education/materials",
    accent: "text-[#168BC4]",
  },
  {
    number: "02",
    title: "Test Your Knowledge",
    description:
      "Challenge yourself with timed multiple-choice tests based on current Maldives taxation and CURA learning materials.",
    href: "/education/test",
    accent: "text-[#D71920]",
  },
  {
    number: "03",
    title: "Technical Articles",
    description:
      "Explore CURA's technical articles covering tax developments, interpretation, practical issues and professional insights.",
    href: "/articles",
    accent: "text-[#168BC4]",
  },
  {
    number: "04",
    title: "Leaderboard",
    description:
      "See how your test results compare with other CURA learners.",
    href: "/education/leaderboard",
    accent: "text-[#D99A17]",
  },
]

export default function EducationPage() {
  return (
    <main className="min-h-screen bg-white text-[#071B49]">
      <CuraHeader />

      <section className="relative overflow-hidden bg-[#061936]">
        <div className="absolute inset-0">
          <div className="absolute right-0 top-0 h-full w-1/2 bg-gradient-to-l from-[#0D4F85] via-[#0A315F] to-transparent opacity-80" />
          <div className="absolute -right-32 -top-32 h-[600px] w-[600px] rounded-full bg-[#168BC4] opacity-20 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-7xl px-6 py-24 lg:px-8 lg:py-28">
          <p className="text-xs font-bold uppercase tracking-[0.35em] text-[#35B5E5]">
            CURA Education
          </p>

          <h1 className="mt-5 max-w-4xl text-5xl font-semibold leading-[1.05] tracking-tight text-white md:text-7xl">
            Learn. Understand. Apply.
          </h1>

          <p className="mt-7 max-w-2xl text-lg leading-8 text-slate-300">
            A dedicated learning space for practical professional knowledge
            in taxation, accounting, audit, financial reporting and law.
          </p>
        </div>
      </section>

      <section className="px-6 py-16 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-7xl">

          <div className="max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#168BC4]">
              Education Centre
            </p>

            <h2 className="mt-4 text-4xl font-semibold tracking-tight">
              Choose how you want to learn
            </h2>

            <p className="mt-4 leading-7 text-slate-600">
              Study the material, explore technical knowledge, test your
              understanding and see how you compare with other learners.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2">

            {options.map((option) => (
              <Link
                key={option.title}
                href={option.href}
                className="group rounded-2xl border border-slate-200 bg-white p-8 shadow-sm transition hover:-translate-y-1 hover:border-slate-300 hover:shadow-xl"
              >
                <div className="text-xs font-bold tracking-[0.2em] text-slate-400">
                  {option.number}
                </div>

                <h3
                  className={`mt-6 text-2xl font-semibold ${option.accent}`}
                >
                  {option.title}
                </h3>

                <p className="mt-4 leading-7 text-slate-600">
                  {option.description}
                </p>

                <div className="mt-8 text-sm font-semibold text-[#071B49] group-hover:text-[#D71920]">
                  Explore →
                </div>
              </Link>
            ))}

          </div>
        </div>
      </section>

      <CuraFooter />
    </main>
  )
}