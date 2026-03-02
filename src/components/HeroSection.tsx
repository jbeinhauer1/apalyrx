import Link from "next/link";
import Image from "next/image";

interface HeroSectionProps {
  headline: string;
  subtitle: string;
  primaryCta?: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
}

export default function HeroSection({
  headline,
  subtitle,
  primaryCta,
  secondaryCta,
}: HeroSectionProps) {
  return (
    <section className="relative bg-navy overflow-hidden">
      {/* Abstract background pattern */}
      <div className="absolute inset-0 opacity-[0.07]">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-gradient-to-br from-orange to-transparent blur-3xl translate-x-1/3 -translate-y-1/4" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-gradient-to-tr from-blue-400 to-transparent blur-3xl -translate-x-1/4 translate-y-1/4" />
        <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <div className="relative max-w-content mx-auto px-6 pt-36 pb-24 md:pt-44 md:pb-32">
        <div className="max-w-3xl">
          <Image
            src="/apalyrx-logo-white-orange.png"
            alt=""
            width={180}
            height={48}
            className="h-12 w-auto mb-8 hidden"
            aria-hidden
          />
          <h1 className="text-[2.5rem] md:text-[3.25rem] leading-tight font-bold text-white mb-6 text-balance">
            {headline}
          </h1>
          <p className="text-lg md:text-xl text-white/80 leading-relaxed mb-10 max-w-2xl">
            {subtitle}
          </p>
          {(primaryCta || secondaryCta) && (
            <div className="flex flex-col sm:flex-row gap-4">
              {primaryCta && (
                <Link
                  href={primaryCta.href}
                  className="inline-flex items-center justify-center bg-orange hover:bg-orange-hover text-white font-semibold px-8 py-3.5 rounded-lg transition-colors text-[16px]"
                >
                  {primaryCta.label}
                </Link>
              )}
              {secondaryCta && (
                <Link
                  href={secondaryCta.href}
                  className="inline-flex items-center justify-center border-2 border-white/30 hover:border-white/60 text-white font-semibold px-8 py-3.5 rounded-lg transition-colors text-[16px]"
                >
                  {secondaryCta.label}
                </Link>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
