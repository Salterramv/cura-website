export default function TeamPage() {
  const team = [
    {
      name: "Team Member",
      role: "Managing Director",
      qualifications: "ACCA, MBA",
      bio: "Experienced professional providing audit, tax and advisory services with a focus on practical, commercially focused solutions.",
    },
    {
      name: "Team Member",
      role: "Director",
      qualifications: "ACA, BSc",
      bio: "Experienced in delivering assurance and advisory services to businesses across a range of industries.",
    },
    {
      name: "Team Member",
      role: "Manager",
      qualifications: "ACCA",
      bio: "Specialising in audit, taxation and financial reporting, helping clients navigate complex business requirements.",
    },
  ]

  return (
    <main className="min-h-screen bg-[#F5F8FC] text-[#071B49]">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="mx-auto max-w-6xl px-6 pb-20 pt-24 md:pb-28 md:pt-32">
          <div className="max-w-3xl">
            <p className="mb-5 text-sm font-semibold uppercase tracking-[0.25em] text-[#1B5DBF]">
              Our Team
            </p>

            <h1 className="text-5xl font-semibold tracking-tight md:text-6xl">
              The people behind
              <span className="block text-[#1B5DBF]">CURA.</span>
            </h1>

            <p className="mt-7 max-w-2xl text-lg leading-8 text-slate-600">
              At CURA, we combine technical expertise, practical experience
              and a commitment to doing things right. Our team works alongside
              clients to provide clear, reliable and commercially focused
              solutions.
            </p>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="mx-auto max-w-6xl px-6 pb-24">
        <div className="mb-12">
          <h2 className="text-3xl font-semibold tracking-tight">
            Meet our team
          </h2>

          <p className="mt-3 max-w-2xl text-slate-600">
            Experienced professionals committed to helping businesses
            understand their numbers, meet their obligations and make better
            decisions.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {team.map((member) => (
            <article
              key={member.name}
              className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              {/* Photo placeholder */}
              <div className="aspect-[4/3] bg-slate-100">
                <div className="flex h-full items-center justify-center text-sm text-slate-400">
                  Team Photo
                </div>
              </div>

              <div className="p-7">
                <p className="text-sm font-medium text-[#1B5DBF]">
                  {member.role}
                </p>

                <h3 className="mt-2 text-2xl font-semibold">
                  {member.name}
                </h3>

                <p className="mt-2 text-sm font-medium text-slate-500">
                  {member.qualifications}
                </p>

                <p className="mt-5 text-sm leading-7 text-slate-600">
                  {member.bio}
                </p>

                <button
                  type="button"
                  className="mt-6 text-sm font-semibold text-[#071B49] transition-colors group-hover:text-[#1B5DBF]"
                >
                  View profile →
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#071B49]">
        <div className="mx-auto max-w-6xl px-6 py-20 text-center">
          <h2 className="text-3xl font-semibold text-white md:text-4xl">
            Let’s work together.
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-slate-300">
            Whether you need audit, tax, advisory or legal support, our team
            is ready to help you find a practical way forward.
          </p>

          <a
            href="/contact"
            className="mt-8 inline-flex rounded-full bg-white px-7 py-3 text-sm font-semibold text-[#071B49] transition hover:bg-slate-100"
          >
            Get in touch
          </a>
        </div>
      </section>
    </main>
  )
}