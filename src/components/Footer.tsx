import Link from "next/link";
import Image from "next/image";
import { Shield, Lock } from "lucide-react";

const solutionsLinks = [
  { href: "/pbms", label: "PBMs" },
  { href: "/employers", label: "Health Plans" },
  { href: "/consultants", label: "Benefits Consultants" },
  { href: "/manufacturers", label: "Manufacturers" },
  { href: "/pharmacies", label: "Independent Pharmacies" },
  { href: "/members", label: "Plan Members" },
];

const companyLinks = [
  { href: "https://apaly.com/about-apaly/", label: "About", external: true },
  { href: "/contact", label: "Contact", external: false },
];

const legalLinks = [
  { label: "Terms of Service" },
  { label: "Privacy Policy" },
  { label: "Cookie Policy" },
];

const linkClass = "font-body text-white/80 hover:text-[#F26522] transition-all duration-300 text-[15px]";

export default function Footer() {
  return (
    <footer className="bg-[#0F1C2E] text-white">
      <div className="max-w-content mx-auto px-4 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8">
          {/* Column 1 - Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Image
              src="/apalyrx-logo-white-orange.png"
              alt="ApalyRx"
              width={160}
              height={44}
              className="h-11 w-auto mb-5"
            />
            <p className="font-body text-white/80 text-[15px] leading-relaxed mb-4">
              Real-time prescription routing.
              <br />
              Independent proof.
            </p>
            <p className="font-body text-white/60 text-sm">
              Pharmacy-licensed &middot; No channel ownership
            </p>
          </div>

          {/* Column 2 - Solutions */}
          <div>
            <h4 className="font-heading font-bold text-lg mb-5">Solutions</h4>
            <nav className="flex flex-col gap-3">
              {solutionsLinks.map((link) => (
                <Link key={link.href} href={link.href} className={linkClass}>
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Column 3 - Company */}
          <div>
            <h4 className="font-heading font-bold text-lg mb-5">Company</h4>
            <nav className="flex flex-col gap-3">
              {companyLinks.map((link) =>
                link.external ? (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={linkClass}
                  >
                    {link.label}
                  </a>
                ) : (
                  <Link key={link.label} href={link.href} className={linkClass}>
                    {link.label}
                  </Link>
                )
              )}
            </nav>
          </div>

          {/* Column 4 - Resources */}
          <div>
            <h4 className="font-heading font-bold text-lg mb-5">Resources</h4>
            <nav className="flex flex-col gap-3">
              <a
                href="https://drugbenefitintegrity.com"
                target="_blank"
                rel="noopener noreferrer"
                className={linkClass}
              >
                Drug Benefit Integrity Standard
              </a>
            </nav>
          </div>

          {/* Column 5 - Legal */}
          <div>
            <h4 className="font-heading font-bold text-lg mb-5">Legal</h4>
            <nav className="flex flex-col gap-3">
              {legalLinks.map((link) => (
                <span key={link.label} className="font-body text-white/60 text-[15px]">
                  {link.label}
                </span>
              ))}
            </nav>
          </div>
        </div>

        {/* Trust Badges */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-6 text-[11px] md:text-xs text-gray-400">
          <div className="flex items-center gap-1.5">
            <Shield className="w-3.5 h-3.5" />
            <span>HIPAA Compliant</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Lock className="w-3.5 h-3.5" />
            <span>SOC 2 Type II</span>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-8 pt-8 border-t border-gray-700 flex flex-col sm:flex-row items-center justify-between gap-4 pb-16 md:pb-20">
          <p className="text-xs md:text-sm text-gray-400">&copy; 2026 ApalyRx</p>
          <p className="text-xs md:text-sm text-gray-400">
            Questions?{" "}
            <a
              href="mailto:sales@apalyrx.com"
              className="text-white/80 hover:text-[#F26522] transition-all duration-300"
            >
              Email sales@apalyrx.com
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
