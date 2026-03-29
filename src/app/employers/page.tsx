import type { Metadata } from "next";
import Link from "next/link";
import WebPageSchema from "@/components/WebPageSchema";
import CredentialStrip from "@/components/CredentialStrip";

export const metadata: Metadata = {
  title: "Employers & Health Plans | Lowest Net Cost Drug Benefit Infrastructure",
  description:
    "ApalyRx operates alongside your existing PBM and TPA. Carve out only the high-cost drugs where routing optimization has the greatest impact. Decision-level documentation for every routing decision.",
  openGraph: {
    title: "Employers & Health Plans | ApalyRx",
    description:
      "Lowest net cost for every high-cost drug with documented proof for every decision. Works alongside your existing PBM and TPA.",
    url: "https://www.apalyrx.com/employers",
    siteName: "ApalyRx",
    type: "website",
  },
};

const dbiRequirements = [
  "Real-time routing to lowest net cost across all channels",
  "Pharmacy-licensed operator with no channel ownership",
  "Manufacturer-direct programs built into the benefit",
  "Fulfilled through independent community pharmacies",
  "Decision-level records for every script",
];

export default function EmployersPage() {
  return (
    <>
      <WebPageSchema
        title="ApalyRx for Employers & Health Plans"
        description="The lowest net cost for every high-cost drug. Documented proof for every decision. Works alongside your existing PBM and TPA."
        url="https://www.apalyrx.com/employers"
      />

      {/* ── SECTION 1: HERO ── */}
      <section className="relative bg-navy overflow-hidden">
        <div
          className="absolute top-0 right-0 w-[600px] h-[600px]"
          style={{
            background: "radial-gradient(circle at center, rgba(255,94,0,0.05), transparent 70%)",
          }}
        />
        <div className="relative max-w-content mx-auto px-6 md:px-12 pt-[140px] md:pt-[180px] pb-16 md:pb-24">
          <span className="font-sans text-eyebrow uppercase text-white/[0.35] block mb-5">
            For Employers &amp; Health Plans
          </span>
          <div className="w-10 h-[2px] bg-orange mb-8" />
          <h1 className="font-serif text-[34px] md:text-[46px] lg:text-[56px] text-white leading-[1.1] tracking-tighter-display max-w-[720px] mb-6">
            The Lowest Net Cost for Every High-Cost Drug. Documented Proof for Every Decision.
          </h1>
          <p className="font-sans text-base md:text-lg text-white/[0.60] max-w-[600px] leading-body mb-10">
            ApalyRx operates alongside your existing PBM and TPA. Carve out only the high-cost
            drugs where routing optimization has the greatest impact. Nothing else changes except
            the cost and the audit trail.
          </p>
          <Link
            href="/contact"
            className="font-sans text-btn bg-white text-navy hover:bg-white/90 px-6 py-2.5 transition-colors duration-200 inline-block"
          >
            Schedule a Briefing
          </Link>
        </div>
      </section>

      {/* ── SECTION 2: CREDENTIAL STRIP ── */}
      <CredentialStrip />

      {/* ── SECTION 3: THE PROBLEM ── */}
      <section className="bg-off-white">
        <div className="max-w-content mx-auto px-6 md:px-12 py-16 md:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-12 lg:gap-24">
            {/* Left column */}
            <div>
              <span className="font-sans text-eyebrow uppercase text-orange block mb-4">
                The Problem
              </span>
              <h2 className="font-serif text-[28px] md:text-[36px] lg:text-[42px] text-text-primary leading-[1.15] tracking-tight-display mb-8">
                Overpaying on High-Cost Drugs with No Way to Verify
              </h2>
              <div className="space-y-5 font-sans text-base text-text-secondary leading-body">
                <p>
                  Self-funded employers bear the direct cost of their members&apos; drug spend,
                  yet have no independent way to verify that each high-cost prescription was
                  routed to the lowest net cost across all available channels. The entity making
                  routing decisions has financial relationships with the dispensing channels being
                  evaluated.
                </p>
                <p>
                  Manufacturer-direct pricing programs, often the lowest net cost option for
                  high-cost specialty drugs, sit outside PBM adjudication entirely. They are
                  invisible to the benefit. Employers cannot access what they cannot see.
                </p>
                <p>
                  Under ERISA, plan fiduciaries face personal liability for drug benefit decisions.
                  The Consolidated Appropriations Act designates PBMs as covered service providers
                  with significant noncompliance penalties. Without decision-level documentation,
                  fiduciaries cannot demonstrate that routing decisions were made in the
                  plan&apos;s interest.
                </p>
              </div>
            </div>

            {/* Right column - stat callouts */}
            <div className="border-t lg:border-t-0 lg:border-l border-border pt-8 lg:pt-0 lg:pl-20">
              <div className="space-y-0">
                <div className="pb-8 border-b border-border">
                  <div className="font-serif text-[40px] md:text-[46px] text-navy tracking-tight-display leading-none mb-3">
                    20&ndash;40%
                  </div>
                  <p className="font-sans text-[13px] text-text-secondary max-w-[280px] leading-relaxed">
                    overpay on high-cost drugs vs. manufacturer-direct pricing
                  </p>
                </div>
                <div className="py-8 border-b border-border">
                  <div className="font-serif text-[40px] md:text-[46px] text-navy tracking-tight-display leading-none mb-3">
                    0
                  </div>
                  <p className="font-sans text-[13px] text-text-secondary max-w-[280px] leading-relaxed">
                    independent routing records in standard PBM-administered benefit
                  </p>
                </div>
                <div className="pt-8">
                  <div className="font-serif text-[14px] md:text-[16px] text-navy tracking-tight-display leading-none mb-3 uppercase tracking-eyebrow">
                    Personal
                  </div>
                  <p className="font-sans text-[13px] text-text-secondary max-w-[280px] leading-relaxed">
                    fiduciary liability for plan decisions under ERISA
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 4: HOW IT WORKS ── */}
      <section className="bg-white">
        <div className="max-w-content mx-auto px-6 md:px-12 py-16 md:py-24">
          <span className="font-sans text-eyebrow uppercase text-orange block mb-4">
            How It Works
          </span>
          <h2 className="font-serif text-[28px] md:text-[36px] lg:text-[42px] text-text-primary leading-[1.15] tracking-tight-display mb-12">
            Configure, Route, Settle
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-0">
            {/* Step 01 */}
            <div className="border-t border-border pt-8 pb-8 lg:pr-8">
              <span className="font-serif text-xs text-orange tracking-[0.06em] block mb-4">01</span>
              <h4 className="font-serif text-[19px] text-text-primary leading-[1.3] mb-4">
                Configure
              </h4>
              <p className="font-sans text-sm text-text-secondary leading-relaxed">
                Select the high-cost drugs driving your spend. Define program rules: member cost
                share, prior authorization criteria, allowed fulfillment channels, and eligibility
                requirements. Your rules, your control. The platform is configured and ready to
                receive prescriptions through the standard e-prescribing workflow.
              </p>
            </div>
            {/* Step 02 */}
            <div className="border-t border-border pt-8 pb-8 lg:px-8 lg:border-l">
              <span className="font-serif text-xs text-orange tracking-[0.06em] block mb-4">02</span>
              <h4 className="font-serif text-[19px] text-text-primary leading-[1.3] mb-4">
                Route
              </h4>
              <p className="font-sans text-sm text-text-secondary leading-relaxed">
                Every in-scope prescription is evaluated across all available channels in real time:
                PBM specialty, PBM mail, retail, manufacturer-direct, and independent pharmacy.
                The platform applies your program rules and routes to the lowest net cost. This is
                a routing decision across categorically distinct supply chain architectures, not a
                selection among pharmacies within a single channel.
              </p>
            </div>
            {/* Step 03 */}
            <div className="border-t border-border pt-8 pb-8 lg:pl-8 lg:border-l">
              <span className="font-serif text-xs text-orange tracking-[0.06em] block mb-4">03</span>
              <h4 className="font-serif text-[19px] text-text-primary leading-[1.3] mb-4">
                Settle
              </h4>
              <p className="font-sans text-sm text-text-secondary leading-relaxed">
                Collect member cost share and report to plan accumulators. Bill plan portion through
                medical claim to TPA for data continuity. Pay suppliers via ACH with transparent,
                pass-through economics. Every prescription generates a decision-level record: channels
                compared, rules applied, routing rationale, net cost components.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 5: FIVE REASONS ── */}
      <section className="bg-navy">
        <div className="max-w-content mx-auto px-6 md:px-12 py-16 md:py-24">
          <span className="font-sans text-eyebrow uppercase text-white/[0.35] block mb-4">
            Why ApalyRx
          </span>
          <h2 className="font-serif text-[28px] md:text-[36px] lg:text-[42px] text-white leading-[1.15] tracking-tight-display mb-14">
            Five Structural Advantages
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-0">
            {[
              {
                title: "Independent",
                desc: "No ownership in any dispensing channel. Routing decisions are structurally independent. The evaluation has no financial interest in the outcome.",
              },
              {
                title: "Real-Time",
                desc: "Every prescription routed at the point of decision, not sampled retrospectively, not reported after the fact. Real-time all-channel evaluation.",
              },
              {
                title: "Documented",
                desc: "Decision-level records for every script: channels compared, rules applied, routing rationale, and closed-loop financial reconciliation.",
              },
              {
                title: "Compatible",
                desc: "Works alongside your existing PBM and TPA. Carve out only the high-cost drugs where routing optimization has the greatest impact.",
              },
              {
                title: "Manufacturer-Ready",
                desc: "Infrastructure for manufacturer direct-to-employer programs: eRx intake, eligibility, billing, settlement, and accumulator reporting built in.",
              },
            ].map((item, i) => (
              <div
                key={item.title}
                className={`border-t border-white/[0.07] pt-6 pb-6 ${
                  i > 0 ? "lg:border-l lg:pl-6" : ""
                } ${i < 4 ? "lg:pr-6" : ""}`}
              >
                <h4 className="font-serif text-base text-white mb-3">{item.title}</h4>
                <p className="font-sans text-xs text-white/[0.45] leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 6: DBI STANDARD ── */}
      <section className="bg-off-white">
        <div className="max-w-content mx-auto px-6 md:px-12 py-16 md:py-24">
          <span className="font-sans text-eyebrow uppercase text-orange block mb-4">
            Drug Benefit Integrity
          </span>
          <h2 className="font-serif text-[28px] md:text-[36px] lg:text-[42px] text-text-primary leading-[1.15] tracking-tight-display mb-4">
            Built on the Drug Benefit Integrity Standard
          </h2>
          <p className="font-sans text-base text-text-secondary leading-body max-w-[680px] mb-10">
            Drug Benefit Integrity (DBI) is an independent industry standard with five structural
            requirements for ensuring that pharmacy benefit decisions are made in the plan&apos;s
            interest. ApalyRx meets all five.
          </p>

          <div className="max-w-[600px]">
            {dbiRequirements.map((req, i) => (
              <div key={i} className="flex items-start gap-4 py-4 border-b border-border">
                <svg
                  className="w-5 h-5 text-orange flex-shrink-0 mt-0.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                <span className="font-sans text-sm text-text-primary">
                  {req}
                </span>
              </div>
            ))}
          </div>

          <p className="font-serif text-lg text-text-primary mt-8 mb-4">
            ApalyRx is the only entity that meets all five requirements.
          </p>
          <Link
            href="/resources/drug-benefit-integrity"
            className="font-sans text-[13px] text-navy border-b border-border hover:border-navy pb-0.5 tracking-link transition-colors duration-200"
          >
            Learn more about the DBI standard &rarr;
          </Link>
        </div>
      </section>

      {/* ── SECTION 7: CTA ── */}
      <section className="bg-white">
        <div className="max-w-content mx-auto px-6 md:px-12 py-16 md:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <div>
              <span className="font-sans text-eyebrow uppercase text-orange block mb-4">
                Get Started
              </span>
              <h2 className="font-serif text-[28px] md:text-[36px] lg:text-[42px] text-text-primary leading-[1.15] tracking-tight-display mb-6">
                Let&apos;s Define Your Key Problem Drugs.
              </h2>
              <p className="font-sans text-base text-text-secondary leading-body">
                Tell us which drug categories are driving your costs. We will show you how ApalyRx
                routes those prescriptions to the lowest net cost alongside your existing PBM and
                TPA, with decision-level documentation for every script and real savings projections
                based on your population.
              </p>
            </div>
            <div className="flex flex-col items-start lg:items-end gap-4">
              <Link
                href="/contact"
                className="font-sans text-btn bg-navy hover:bg-navy-dark text-white px-6 py-2.5 transition-colors duration-200"
              >
                Schedule a Briefing
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
