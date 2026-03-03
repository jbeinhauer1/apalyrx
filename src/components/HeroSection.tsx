import Link from "next/link";

interface HeroSectionProps {
  headline: string;
  subtitle: string;
  primaryCta?: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
  pattern?: "dots" | "blur";
}

export default function HeroSection({
  headline,
  subtitle,
  primaryCta,
  secondaryCta,
  pattern = "dots",
}: HeroSectionProps) {
  return (
    <section className="relative bg-[#0F1C2E] overflow-hidden">
      {/* Background pattern */}
      {pattern === "dots" ? (
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, rgba(242, 101, 34, 0.3) 1px, transparent 0)",
            backgroundSize: "40px 40px",
          }}
        />
      ) : (
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#F26522] rounded-full blur-3xl opacity-10 translate-x-1/2 -translate-y-1/4" />
      )}

      <div className="relative max-w-4xl mx-auto px-4 pt-28 sm:pt-32 md:pt-48 lg:pt-56 pb-12 md:pb-20">
        <div className="max-w-3xl">
          <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-tight font-bold text-white mb-6 text-balance">
            {headline}
          </h1>
          <p className="font-body text-base sm:text-lg md:text-xl text-white/80 leading-relaxed mb-10 max-w-2xl">
            {subtitle}
          </p>
          {(primaryCta || secondaryCta) && (
            <div className="flex flex-col sm:flex-row gap-4">
              {primaryCta && (
                <Link
                  href={primaryCta.href}
                  className="inline-flex items-center justify-center bg-[#F26522] hover:bg-[#F26522]/90 text-white font-heading font-semibold shadow-lg text-lg px-8 py-6 rounded-lg transition-all duration-300"
                >
                  {primaryCta.label}
                </Link>
              )}
              {secondaryCta && (
                <Link
                  href={secondaryCta.href}
                  className="inline-flex items-center justify-center bg-white/10 hover:bg-white/20 text-white border border-white/30 font-heading font-semibold text-lg px-8 py-6 rounded-lg transition-all duration-300"
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
