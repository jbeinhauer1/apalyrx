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
}: HeroSectionProps) {
  return (
    <section className="relative bg-navy overflow-hidden">
      <div
        className="absolute top-0 right-0 w-[600px] h-[600px]"
        style={{
          background: "radial-gradient(circle at center, rgba(255,94,0,0.05), transparent 70%)",
        }}
      />
      <div className="relative max-w-content mx-auto px-6 md:px-12 pt-[140px] md:pt-[180px] pb-16 md:pb-24">
        <div className="max-w-3xl">
          <h1 className="font-serif text-[34px] md:text-[48px] lg:text-[60px] text-white leading-[1.1] tracking-tighter-display mb-6">
            {headline}
          </h1>
          <p className="font-sans text-base md:text-lg text-white/[0.60] leading-body mb-10 max-w-[560px]">
            {subtitle}
          </p>
          {(primaryCta || secondaryCta) && (
            <div className="flex flex-col sm:flex-row gap-4">
              {primaryCta && (
                <Link
                  href={primaryCta.href}
                  className="font-sans text-btn bg-white text-navy hover:bg-white/90 px-6 py-2.5 transition-colors duration-200 text-center"
                >
                  {primaryCta.label}
                </Link>
              )}
              {secondaryCta && (
                <Link
                  href={secondaryCta.href}
                  className="font-sans text-btn text-white border border-white/[0.45] hover:border-white hover:bg-white/[0.07] px-6 py-2.5 transition-colors duration-200 text-center"
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
