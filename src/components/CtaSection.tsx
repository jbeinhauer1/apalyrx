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
    <section className="relative bg-navy overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] rounded-full bg-gradient-to-r from-orange to-orange/0 blur-3xl" />
      </div>
      <div className="relative max-w-content mx-auto px-6 py-20 md:py-24 text-center">
        <p className="text-2xl md:text-3xl font-bold text-white mb-8 max-w-2xl mx-auto text-balance">
          {text}
        </p>
        <Link
          href={buttonHref}
          className="inline-flex items-center justify-center bg-orange hover:bg-orange-hover text-white font-semibold px-10 py-4 rounded-lg transition-colors text-lg"
        >
          {buttonLabel}
        </Link>
      </div>
    </section>
  );
}
