import type { Metadata } from "next";
import HeroSection from "@/components/HeroSection";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Contact ApalyRx | Request a Conversation",
  description:
    "Reach out to learn how ApalyRx provides real-time independent prescription routing for PBMs, employers, health plans, consultants, manufacturers, and pharmacies.",
  openGraph: {
    title: "Contact ApalyRx | Request a Conversation",
    description:
      "Reach out to learn how ApalyRx provides real-time independent prescription routing for PBMs, employers, health plans, consultants, manufacturers, and pharmacies.",
  },
};

export default function ContactPage() {
  return (
    <>
      <HeroSection
        headline="Let's Talk"
        subtitle="Whether you are a PBM, employer, health plan, consultant, manufacturer, or pharmacy — we welcome the conversation."
      />

      <section className="bg-white">
        <div className="max-w-[600px] mx-auto px-6 py-20 md:py-24">
          <ContactForm />

          <div className="mt-12 text-center space-y-4">
            <p className="text-secondary-text">
              Or reach us directly:{" "}
              <a
                href="mailto:sales@apalyrx.com"
                className="text-orange hover:text-orange-hover font-semibold transition-colors"
              >
                sales@apalyrx.com
              </a>
            </p>
            <p>
              <a
                href="https://drugbenefitintegrity.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-orange hover:text-orange-hover font-semibold transition-colors"
              >
                Learn about the Drug Benefit Integrity standard &rarr;
              </a>
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
