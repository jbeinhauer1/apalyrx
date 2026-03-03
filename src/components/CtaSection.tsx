import Link from "next/link";

interface CtaSectionProps {
  text: string;
  buttonLabel?: string;
  buttonHref?: string;
}

export default function CtaSection({
  text,
  buttonLabel = "Request a Conversation",
  buttonHref = "/contact",
}: CtaSectionProps) {
  return (
    <section className="bg-[#0F1C2E] text-white py-16 md:py-24">
      <div className="max-w-3xl mx-auto px-4 text-center">
        <p className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-8 text-balance">
          {text}
        </p>
        <Link
          href={buttonHref}
          className="inline-flex items-center justify-center bg-[#F26522] hover:bg-[#F26522]/90 text-white font-heading font-semibold shadow-lg text-lg px-8 py-6 rounded-lg transition-all duration-300"
        >
          {buttonLabel}
        </Link>
      </div>
    </section>
  );
}
