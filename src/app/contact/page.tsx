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

      <section className="bg-[#f8f9fb]">
        <div className="max-w-2xl mx-auto px-4 py-16 md:py-24">
          <div className="bg-white border border-gray-200 rounded-lg p-5 sm:p-8 shadow-elevated">
            <ContactForm />
          </div>

          <div className="mt-12 text-center space-y-4">
            <p className="font-body text-muted-foreground">
              Or reach us directly:{" "}
              <a
                href="mailto:sales@apalyrx.com"
                className="font-heading text-[#F26522] hover:text-orange-hover font-semibold transition-all duration-300"
              >
                sales@apalyrx.com
              </a>
            </p>
            <p>
              <a
                href="https://drugbenefitintegrity.com"
                target="_blank"
                rel="noopener noreferrer"
                className="font-heading text-[#F26522] hover:text-orange-hover font-semibold transition-all duration-300"
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
