import Link from "next/link";

interface CtaSectionProps {
  text: string;
  buttonLabel?: string;
  buttonHref?: string;
}

export default function CtaSection({
  text,
  buttonLabel = "Schedule a Briefing",
  buttonHref = "/contact",
}: CtaSectionProps) {
  return (
    <section className="bg-navy py-16 md:py-24">
      <div className="max-w-content mx-auto px-6 md:px-12 text-center">
        <p className="font-serif text-[28px] md:text-[36px] lg:text-[42px] text-white leading-[1.15] tracking-tight-display mb-10 max-w-[620px] mx-auto">
          {text}
        </p>
        <Link
          href={buttonHref}
          className="font-sans text-btn text-white border border-white/[0.45] hover:border-white hover:bg-white/[0.07] px-6 py-2.5 transition-colors duration-200 inline-block"
        >
          {buttonLabel}
        </Link>
      </div>
    </section>
  );
}
