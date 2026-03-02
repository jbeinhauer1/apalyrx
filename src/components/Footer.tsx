import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-navy text-white">
      <div className="max-w-content mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Column 1 */}
          <div>
            <Image
              src="/Logo WhiteOrange.png"
              alt="ApalyRx"
              width={160}
              height={44}
              className="h-11 w-auto mb-5"
            />
            <p className="text-white/80 text-[15px] leading-relaxed mb-4">
              Real-time prescription routing.
              <br />
              Independent proof.
            </p>
            <p className="text-white/60 text-sm">
              Pharmacy-licensed &middot; No channel ownership
            </p>
          </div>

          {/* Column 2 */}
          <div>
            <h4 className="font-bold text-lg mb-5">Pages</h4>
            <nav className="flex flex-col gap-3">
              <Link href="/employers" className="text-white/80 hover:text-orange transition-colors text-[15px]">
                Employers
              </Link>
              <Link href="/consultants" className="text-white/80 hover:text-orange transition-colors text-[15px]">
                Consultants
              </Link>
              <Link href="/pbms" className="text-white/80 hover:text-orange transition-colors text-[15px]">
                PBMs
              </Link>
              <Link href="/manufacturers" className="text-white/80 hover:text-orange transition-colors text-[15px]">
                Manufacturers
              </Link>
              <Link href="/pharmacies" className="text-white/80 hover:text-orange transition-colors text-[15px]">
                Pharmacies
              </Link>
              <Link href="/contact" className="text-white/80 hover:text-orange transition-colors text-[15px]">
                Contact
              </Link>
              <a
                href="https://drugbenefitintegrity.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-orange hover:text-orange-hover transition-colors text-[15px] mt-2"
              >
                Drug Benefit Integrity Standard &rarr;
              </a>
            </nav>
          </div>

          {/* Column 3 */}
          <div>
            <h4 className="font-bold text-lg mb-5">Contact</h4>
            <div className="flex flex-col gap-3 text-[15px]">
              <a
                href="mailto:sales@apalyrx.com"
                className="text-white/80 hover:text-orange transition-colors"
              >
                sales@apalyrx.com
              </a>
              <p className="text-white/60">Tampa, FL</p>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-14 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-white/50">
          <p>&copy; 2026 ApalyRx</p>
          <div className="flex items-center gap-4">
            <span>HIPAA Compliant</span>
            <span className="w-1 h-1 rounded-full bg-white/30" />
            <span>SOC 2 Type II</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
