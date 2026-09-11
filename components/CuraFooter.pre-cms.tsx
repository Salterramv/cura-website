export default function CuraFooter() {
  return (
    <footer className="bg-[#071B49] text-white">
      <div className="mx-auto max-w-7xl px-6 py-12 md:px-10 lg:px-12">

        <div className="grid gap-10 md:grid-cols-3">

          {/* BRAND */}
          <div>
            <img
              src="/cura-logo.png"
              alt="CURA"
              className="h-14 w-auto object-contain brightness-0 invert"
            />

            <p className="mt-5 max-w-sm text-sm leading-6 text-slate-300">
              CURA brings together practical knowledge in taxation,
              accounting, audit, advisory and law — helping businesses
              and professionals make better-informed decisions.
            </p>
          </div>

          {/* QUICK LINKS */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-[#18b8ee]">
              Explore
            </h3>

            <div className="mt-4 space-y-3 text-sm text-slate-300">
              <a href="/articles" className="block hover:text-white">
                Knowledge
              </a>

              <a href="/cases" className="block hover:text-white">
                Legal Cases
              </a>

              <a href="/exchange-rate" className="block hover:text-white">
                Exchange Rates
              </a>

              <a href="/careers" className="block hover:text-white">
                Careers
              </a>

              <a href="/team" className="block hover:text-white">
                Our Team
              </a>
            </div>
          </div>

          {/* CONTACT */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-[#18b8ee]">
              Contact
            </h3>

            <div className="mt-4 space-y-3 text-sm text-slate-300">
              <a href="/#contact" className="block hover:text-white">
                Get in touch with CURA
              </a>

              <p>Maldives</p>
            </div>
          </div>

        </div>

        {/* COPYRIGHT */}
        <div className="mt-10 border-t border-white/10 pt-5 text-xs text-slate-400">
          © {new Date().getFullYear()} CURA. All rights reserved.
        </div>

      </div>
    </footer>
  )
}