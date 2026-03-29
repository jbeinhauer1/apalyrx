import type { Metadata } from "next";
import Link from "next/link";
import HeroSection from "@/components/HeroSection";
import ContactForm from "@/components/ContactForm";
import WebPageSchema from "@/components/WebPageSchema";

export const metadata: Metadata = {
  title: "Contact ApalyRx | Schedule a Briefing",
  description:
    "Contact ApalyRx to discuss manufacturer direct-to-employer programs, employer drug benefit optimization, or independent pharmacy partnerships. We will show you how the platform addresses your specific requirements.",
  openGraph: {
    title: "Contact ApalyRx | Schedule a Briefing",
    description:
      "Contact us to discuss your portfolio, your existing distribution model, and the fastest path to a live direct-to-employer deployment.",
    url: "https://www.apalyrx.com/contact",
    siteName: "ApalyRx",
    type: "website",
  },
};

export default function ContactPage() {
  return (
    <>
      <WebPageSchema
        title="Contact ApalyRx"
        description="Schedule a briefing to discuss how ApalyRx provides direct-to-employer drug benefit infrastructure for manufacturers, employers, and independent pharmacies."
        url="https://www.apalyrx.com/contact"
      />
      <HeroSection
        headline="Schedule a Briefing"
        subtitle="Whether you are a manufacturer, employer, health plan, or pharmacy, we welcome the conversation."
      />

      <section className="bg-off-white">
        <div className="max-w-2xl mx-auto px-6 md:px-12 py-16 md:py-24">
          <div className="bg-white border border-border p-6 sm:p-10">
            <ContactForm />
          </div>

          <div className="mt-12 text-center space-y-4">
            <p className="font-sans text-sm text-text-secondary">
              Or reach us directly:{" "}
              <a
                href="mailto:sales@apalyrx.com"
                className="font-sans text-navy border-b border-border hover:border-navy pb-0.5 transition-colors duration-200"
              >
                sales@apalyrx.com
              </a>
            </p>
            <p>
              <Link
                href="/resources/drug-benefit-integrity"
                className="font-sans text-[13px] text-navy border-b border-border hover:border-navy pb-0.5 tracking-link transition-colors duration-200"
              >
                Learn about the Drug Benefit Integrity standard &rarr;
              </Link>
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
