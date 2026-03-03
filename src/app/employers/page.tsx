import type { Metadata } from "next";
import HeroSection from "@/components/HeroSection";
import SectionWrapper from "@/components/SectionWrapper";
import CtaSection from "@/components/CtaSection";
import { ArrowRight, FileText, FlaskConical, Shield } from "lucide-react";

export const metadata: Metadata = {
  title: "ApalyRx for Self-Funded Employers | Real-Time Prescription Routing & Compliance",
  description:
    "Real-time routing of every high-cost prescription to the lowest net cost. Decision-level documentation for ERISA and CAA fiduciary compliance.",
  openGraph: {
    title: "ApalyRx for Self-Funded Employers | Real-Time Prescription Routing & Compliance",
    description:
      "Real-time routing of every high-cost prescription to the lowest net cost. Decision-level documentation for ERISA and CAA fiduciary compliance.",
  },
};

const features = [
  {
    title: "Real-Time Independent Routing",
    desc: "Every high-cost prescription evaluated across all channels and routed to the lowest net cost by an operator with no dispensing channel ownership.",
    icon: ArrowRight,
    borderColor: "border-t-[#F26522]",
    iconBg: "bg-[#F26522]",
  },
  {
    title: "Decision-Level Documentation",
    desc: "An auditable record for every script — channels compared, rules applied, routing rationale, net cost components, and closed-loop financial reconciliation. Real-time proof, not year-end summaries.",
    icon: FileText,
    borderColor: "border-t-[#0F1C2E]",
    iconBg: "bg-[#0F1C2E]",
  },
  {
    title: "Manufacturer-Direct Integration",
    desc: "Copay programs, patient assistance, and direct pricing evaluated as benefit options. If a lower-cost manufacturer-direct path exists, your plan knows about it and can route to it.",
    icon: FlaskConical,
    borderColor: "border-t-[#F26522]",
    iconBg: "bg-[#F26522]",
  },
  {
    title: "Fiduciary-Grade Compliance",
    desc: "Documentation designed for ERISA prudent expert standards and CAA audit requirements. Proof you can present to auditors, regulators, and beneficiaries.",
    icon: Shield,
    borderColor: "border-t-[#0F1C2E]",
    iconBg: "bg-[#0F1C2E]",
  },
];

export default function EmployersPage() {
  return (
    <>
      <HeroSection
        headline="Independent Proof That Every Prescription Serves Your Plan"
        subtitle="ApalyRx gives self-funded employers what no PBM can: real-time, independent routing of every high-cost prescription to the lowest net cost — with decision-level documentation for every script."
        primaryCta={{ label: "Request a Conversation", href: "/contact" }}
      />

      {/* The Fiduciary Challenge */}
      <SectionWrapper bg="light">
        <div className="max-w-4xl mx-auto animate-fade-up">
          <h2 className="font-heading text-3xl md:text-[2.5rem] font-bold text-navy mb-6 leading-tight text-center">
            The Rules Have Changed
          </h2>
          <p className="font-body text-[17px] md:text-lg text-muted-foreground leading-relaxed text-center">
            The Consolidated Appropriations Act of 2026 designates PBMs as ERISA covered service providers with significant noncompliance penalties. The DOL has proposed rules requiring detailed PBM compensation disclosure. Plan fiduciaries face personal liability for drug benefit decisions. Until now, there was no independent way to verify those decisions were made in the plan&apos;s interest. ApalyRx provides that — not as an after-the-fact audit, but as real-time routing with built-in documentation.
          </p>
        </div>
      </SectionWrapper>

      {/* What You Get */}
      <SectionWrapper bg="white">
        <div className="text-center mb-14 animate-fade-up">
          <h2 className="font-heading text-3xl md:text-[2.5rem] font-bold text-navy leading-tight">
            What You Get
          </h2>
        </div>

        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 stagger-children">
          {features.map((f) => (
            <div
              key={f.title}
              className={`group bg-white rounded-xl p-6 shadow-lg border border-gray-100 border-t-4 ${f.borderColor} hover:border-[#F26522]/30 hover:shadow-xl transition-all duration-300`}
            >
              <div className={`p-3 rounded-lg ${f.iconBg} text-white w-fit mb-5`}>
                <f.icon className="h-8 w-8" />
              </div>
              <h3 className="font-heading text-xl md:text-2xl font-semibold text-navy mb-3">{f.title}</h3>
              <p className="font-body text-sm md:text-base text-muted-foreground leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </SectionWrapper>

      {/* Works With Your Current PBM */}
      <SectionWrapper bg="light">
        <div className="max-w-4xl mx-auto animate-fade-up">
          <h2 className="font-heading text-3xl md:text-[2.5rem] font-bold text-navy mb-6 leading-tight text-center">
            ApalyRx Works Alongside Your PBM
          </h2>
          <p className="font-body text-[17px] md:text-lg text-muted-foreground leading-relaxed text-center">
            ApalyRx does not replace your PBM. Your PBM continues to manage your formulary, negotiate contracts, and administer your benefit. ApalyRx adds a real-time routing layer for high-cost prescriptions — evaluating all available channels (including your PBM&apos;s own pharmacies), routing to the lowest net cost, and documenting the result. You can implement ApalyRx directly or ask your PBM to add ApalyRx as part of their program.
          </p>
        </div>
      </SectionWrapper>

      {/* Where It Matters Most */}
      <SectionWrapper bg="white">
        <div className="max-w-4xl mx-auto animate-fade-up">
          <h2 className="font-heading text-3xl md:text-[2.5rem] font-bold text-navy mb-6 leading-tight text-center">
            Targeting the Drugs That Drive Your Spend
          </h2>
          <p className="font-body text-[17px] md:text-lg text-muted-foreground leading-relaxed text-center">
            Approximately 30 high-cost medications typically account for 40% or more of employer pharmacy spend. These are the drugs where net cost varies most across channels — and where optimized routing has the greatest financial impact. ApalyRx focuses here first, delivering measurable savings on the prescriptions that move your bottom line. The platform extends to additional therapeutic categories as your program evolves.
          </p>
        </div>
      </SectionWrapper>

      <CtaSection text="See what real-time independent routing looks like for your plan." />
    </>
  );
}
