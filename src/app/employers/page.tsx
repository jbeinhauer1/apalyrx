import type { Metadata } from "next";
import HeroSection from "@/components/HeroSection";
import SectionWrapper from "@/components/SectionWrapper";
import CtaSection from "@/components/CtaSection";

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
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />
      </svg>
    ),
  },
  {
    title: "Decision-Level Documentation",
    desc: "An auditable record for every script — channels compared, rules applied, routing rationale, net cost components, and closed-loop financial reconciliation. Real-time proof, not year-end summaries.",
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25z" />
      </svg>
    ),
  },
  {
    title: "Manufacturer-Direct Integration",
    desc: "Copay programs, patient assistance, and direct pricing evaluated as benefit options. If a lower-cost manufacturer-direct path exists, your plan knows about it and can route to it.",
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" />
      </svg>
    ),
  },
  {
    title: "Fiduciary-Grade Compliance",
    desc: "Documentation designed for ERISA prudent expert standards and CAA audit requirements. Proof you can present to auditors, regulators, and beneficiaries.",
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
      </svg>
    ),
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
        <div className="max-w-3xl mx-auto animate-fade-up">
          <h2 className="text-3xl md:text-[2.5rem] font-bold text-navy mb-6 leading-tight text-center">
            The Rules Have Changed
          </h2>
          <p className="text-[17px] md:text-lg text-body leading-relaxed text-center">
            The Consolidated Appropriations Act of 2026 designates PBMs as ERISA covered service providers with significant noncompliance penalties. The DOL has proposed rules requiring detailed PBM compensation disclosure. Plan fiduciaries face personal liability for drug benefit decisions. Until now, there was no independent way to verify those decisions were made in the plan&apos;s interest. ApalyRx provides that — not as an after-the-fact audit, but as real-time routing with built-in documentation.
          </p>
        </div>
      </SectionWrapper>

      {/* What You Get */}
      <SectionWrapper bg="white">
        <div className="text-center mb-14 animate-fade-up">
          <h2 className="text-3xl md:text-[2.5rem] font-bold text-navy leading-tight">
            What You Get
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 stagger-children">
          {features.map((f) => (
            <div
              key={f.title}
              className="bg-light-bg rounded-xl p-8 border border-gray-100"
            >
              <div className="w-14 h-14 bg-orange/10 rounded-xl flex items-center justify-center text-orange mb-5">
                {f.icon}
              </div>
              <h3 className="text-xl font-bold text-navy mb-3">{f.title}</h3>
              <p className="text-[16px] text-body leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </SectionWrapper>

      {/* Works With Your Current PBM */}
      <SectionWrapper bg="light">
        <div className="max-w-3xl mx-auto animate-fade-up">
          <h2 className="text-3xl md:text-[2.5rem] font-bold text-navy mb-6 leading-tight text-center">
            ApalyRx Works Alongside Your PBM
          </h2>
          <p className="text-[17px] md:text-lg text-body leading-relaxed text-center">
            ApalyRx does not replace your PBM. Your PBM continues to manage your formulary, negotiate contracts, and administer your benefit. ApalyRx adds a real-time routing layer for high-cost prescriptions — evaluating all available channels (including your PBM&apos;s own pharmacies), routing to the lowest net cost, and documenting the result. You can implement ApalyRx directly or ask your PBM to add ApalyRx as part of their program.
          </p>
        </div>
      </SectionWrapper>

      {/* Where It Matters Most */}
      <SectionWrapper bg="white">
        <div className="max-w-3xl mx-auto animate-fade-up">
          <h2 className="text-3xl md:text-[2.5rem] font-bold text-navy mb-6 leading-tight text-center">
            Targeting the Drugs That Drive Your Spend
          </h2>
          <p className="text-[17px] md:text-lg text-body leading-relaxed text-center">
            Approximately 30 high-cost medications typically account for 40% or more of employer pharmacy spend. These are the drugs where net cost varies most across channels — and where optimized routing has the greatest financial impact. ApalyRx focuses here first, delivering measurable savings on the prescriptions that move your bottom line. The platform extends to additional therapeutic categories as your program evolves.
          </p>
        </div>
      </SectionWrapper>

      <CtaSection text="See what real-time independent routing looks like for your plan." />
    </>
  );
}
