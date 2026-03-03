import Link from "next/link";
import Image from "next/image";
import { Shield, Lock } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#0F1C2E] text-white">
      <div className="max-w-content mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Column 1 */}
          <div>
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

          {/* Column 2 */}
          <div>
            <h4 className="font-heading font-bold text-lg mb-5">Pages</h4>
            <nav className="flex flex-col gap-3">
              <Link href="/employers" className="font-body text-white/80 hover:text-[#F26522] transition-all duration-300 text-[15px]">
                Employers
              </Link>
              <Link href="/consultants" className="font-body text-white/80 hover:text-[#F26522] transition-all duration-300 text-[15px]">
                Consultants
              </Link>
              <Link href="/pbms" className="font-body text-white/80 hover:text-[#F26522] transition-all duration-300 text-[15px]">
                PBMs
              </Link>
              <Link href="/manufacturers" className="font-body text-white/80 hover:text-[#F26522] transition-all duration-300 text-[15px]">
                Manufacturers
              </Link>
              <Link href="/pharmacies" className="font-body text-white/80 hover:text-[#F26522] transition-all duration-300 text-[15px]">
                Pharmacies
              </Link>
              <Link href="/plan-members" className="font-body text-white/80 hover:text-[#F26522] transition-all duration-300 text-[15px]">
                Plan Members
              </Link>
              <Link href="/contact" className="font-body text-white/80 hover:text-[#F26522] transition-all duration-300 text-[15px]">
                Contact
              </Link>
              <a
                href="https://drugbenefitintegrity.com"
                target="_blank"
                rel="noopener noreferrer"
                className="font-body text-[#F26522] hover:text-orange-hover transition-all duration-300 text-[15px] mt-2"
              >
                Drug Benefit Integrity Standard &rarr;
              </a>
            </nav>
          </div>

          {/* Column 3 */}
          <div>
            <h4 className="font-heading font-bold text-lg mb-5">Contact</h4>
            <div className="flex flex-col gap-3 text-[15px]">
              <a
                href="mailto:sales@apalyrx.com"
                className="font-body text-white/80 hover:text-[#F26522] transition-all duration-300"
              >
                sales@apalyrx.com
              </a>
              <p className="font-body text-white/60">Tampa, FL</p>
            </div>
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
        </div>
      </div>
    </footer>
  );
}
