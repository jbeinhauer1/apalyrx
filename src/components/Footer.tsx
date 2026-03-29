import Link from "next/link";

const platformLinks = [
  { href: "/manufacturers", label: "Manufacturers" },
  { href: "/employers", label: "Employers & Health Plans" },
  { href: "/pharmacies", label: "Independent Pharmacies" },
  { href: "/#how-it-works", label: "How It Works" },
];

const companyLinks = [
  { href: "https://apaly.com/about-apaly/", label: "About", external: true },
  { href: "/resources", label: "Resources" },
  { href: "/resources/drug-benefit-integrity", label: "Drug Benefit Integrity" },
  { href: "/contact", label: "Contact" },
];

const accountLinks = [
  { href: "https://apalyrx.net", label: "Member Portal", external: true },
  { label: "Terms" },
  { label: "Privacy" },
];

const badges = ["HIPAA Compliant", "SOC 2 Type II", "Patent Pending 2026", "TX Class G Pharmacy"];

export default function Footer() {
  return (
    <footer className="bg-[#071428] text-white">
      <div className="max-w-content mx-auto px-6 md:px-12 py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1fr] gap-10 lg:gap-8">
          {/* Col 1 - Brand */}
          <div>
            <div className="mb-5">
              <span className="font-serif text-[22px] tracking-tight-display">
                <span className="text-white">Apaly</span>
                <span className="text-orange">Rx</span>
              </span>
            </div>
            <p className="font-sans text-sm text-white/50 leading-relaxed max-w-xs">
              Licensed centralized prescription processing pharmacy and patent-pending
              direct-to-employer drug benefit infrastructure platform. Texas Class G
              Pharmacy. NPI 1912873969
            </p>
          </div>

          {/* Col 2 - Platform */}
          <div>
            <h4 className="font-sans text-xs uppercase tracking-eyebrow text-white/[0.35] mb-5">
              Platform
            </h4>
            <nav className="flex flex-col gap-3">
              {platformLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="font-sans text-sm text-white/60 hover:text-white transition-colors duration-200"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Col 3 - Company */}
          <div>
            <h4 className="font-sans text-xs uppercase tracking-eyebrow text-white/[0.35] mb-5">
              Company
            </h4>
            <nav className="flex flex-col gap-3">
              {companyLinks.map((link) =>
                link.external ? (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-sans text-sm text-white/60 hover:text-white transition-colors duration-200"
                  >
                    {link.label}
                  </a>
                ) : (
                  <Link
                    key={link.label}
                    href={link.href}
                    className="font-sans text-sm text-white/60 hover:text-white transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                )
              )}
            </nav>
          </div>

          {/* Col 4 - Account */}
          <div>
            <h4 className="font-sans text-xs uppercase tracking-eyebrow text-white/[0.35] mb-5">
              Account
            </h4>
            <nav className="flex flex-col gap-3">
              {accountLinks.map((link) =>
                'href' in link && link.href ? (
                  link.external ? (
                    <a
                      key={link.label}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-sans text-sm text-white/60 hover:text-white transition-colors duration-200"
                    >
                      {link.label} &rarr;
                    </a>
                  ) : null
                ) : (
                  <span
                    key={link.label}
                    className="font-sans text-sm text-white/40"
                  >
                    {link.label}
                  </span>
                )
              )}
            </nav>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-white/[0.07] flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <p className="font-sans text-xs text-white/30">
            &copy; 2026 ApalyRx. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center gap-4">
            {badges.map((badge) => (
              <span
                key={badge}
                className="font-sans text-[10px] uppercase tracking-wider text-white/30 border border-white/[0.07] px-3 py-1"
              >
                {badge}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
