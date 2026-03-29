import type { Metadata } from "next";
import Link from "next/link";
import OrganizationSchema from "@/components/OrganizationSchema";
import CredentialStrip from "@/components/CredentialStrip";

export const metadata: Metadata = {
  title: {
    absolute: "ApalyRx | The Operating Layer for Manufacturer Direct-to-Employer Programs",
  },
  description:
    "ApalyRx provides the complete operational, regulatory, and technology infrastructure that makes a manufacturer's direct-to-employer channel executable. Independent prescription routing to the lowest net cost with decision-level documentation.",
  openGraph: {
    title: "ApalyRx | The Operating Layer for Manufacturer Direct-to-Employer Programs",
    description:
      "Complete operational, regulatory, and technology infrastructure for manufacturer direct-to-employer drug benefit programs.",
    url: "https://www.apalyrx.com",
    siteName: "ApalyRx",
    type: "website",
    locale: "en_US",
  },
};

export default function HomePage() {
  return (
    <>
      <OrganizationSchema />

      {/* ── SECTION 1: HERO ── */}
      <section className="relative bg-navy overflow-hidden">
        {/* Subtle orange gradient in upper-right */}
        <div
          className="absolute top-0 right-0 w-[600px] h-[600px]"
          style={{
            background: "radial-gradient(circle at center, rgba(255,94,0,0.05), transparent 70%)",
          }}
        />
        <div className="relative max-w-content mx-auto px-6 md:px-12 pt-[140px] md:pt-[180px] pb-16 md:pb-24">
          <span className="font-sans text-eyebrow uppercase text-white/[0.35] block mb-5">
            Drug Benefit Infrastructure
          </span>
          {/* Orange rule */}
          <div className="w-10 h-[2px] bg-orange mb-8" />
          <h1 className="font-serif text-[34px] md:text-[48px] lg:text-[60px] text-white leading-[1.1] tracking-tighter-display max-w-[720px] mb-6">
            The Operating Layer for Manufacturer Direct-to-Employer Programs
          </h1>
          <p className="font-sans text-base md:text-lg text-white/[0.60] max-w-[560px] leading-body mb-10">
            ApalyRx provides the complete operational, regulatory, and technology infrastructure
            that makes a manufacturer&apos;s direct-to-employer channel executable. Existing
            distribution arrangements remain intact by architecture, not by workaround.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/manufacturers"
              className="font-sans text-btn bg-white text-navy hover:bg-white/90 px-6 py-2.5 transition-colors duration-200 text-center"
            >
              For Manufacturers
            </Link>
            <Link
              href="/employers"
              className="font-sans text-btn text-white border border-white/[0.45] hover:border-white hover:bg-white/[0.07] px-6 py-2.5 transition-colors duration-200 text-center"
            >
              For Employers
            </Link>
          </div>
        </div>
      </section>

      {/* ── SECTION 2: CREDENTIAL STRIP ── */}
      <CredentialStrip />

      {/* ── SECTION 3: THE MARKET MOMENT ── */}
      <section className="bg-off-white">
        <div className="max-w-content mx-auto px-6 md:px-12 py-16 md:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-12 lg:gap-24">
            {/* Left column */}
            <div>
              <span className="font-sans text-eyebrow uppercase text-orange block mb-4">
                The Market Moment
              </span>
              <h2 className="font-serif text-[28px] md:text-[36px] lg:text-[42px] text-text-primary leading-[1.15] tracking-tight-display mb-8">
                The Direct-to-Employer Channel Is Taking Shape Now
              </h2>
              <div className="space-y-5 font-sans text-base text-text-secondary leading-body">
                <p>
                  The employer-sponsored health plan market represents 154 million Americans in
                  self-funded plans. It is the only channel that does not require PBM formulary
                  permission. Manufacturers who establish credible, compliant direct-to-employer
                  infrastructure now will help define the standard.
                </p>
                <p>
                  The legislative environment has shifted materially. Regulatory scrutiny of
                  intermediary practices is at its highest point in a generation. The manufacturers
                  who move now will be significantly better positioned than those who wait.
                </p>
                <p>
                  ApalyRx has built the infrastructure. The question is not whether to build a
                  direct-to-employer channel. It is whether your organization accesses what is
                  already operational today.
                </p>
              </div>
            </div>

            {/* Right column - stat stack */}
            <div className="border-t lg:border-t-0 lg:border-l border-border pt-8 lg:pt-0 lg:pl-20">
              <div className="space-y-0">
                {/* Stat 1 */}
                <div className="pb-8 border-b border-border">
                  <div className="font-serif text-[40px] md:text-[46px] text-navy tracking-tight-display leading-none mb-3">
                    40&ndash;60%
                  </div>
                  <p className="font-sans text-[13px] text-text-secondary max-w-[280px] leading-relaxed">
                    of WAC captured by intermediaries in standard distribution. Wholesaler margin,
                    PBM spread, specialty pharmacy fees, and rebate float.
                  </p>
                </div>
                {/* Stat 2 */}
                <div className="py-8 border-b border-border">
                  <div className="font-serif text-[40px] md:text-[46px] text-navy tracking-tight-display leading-none mb-3">
                    90&ndash;180 days
                  </div>
                  <p className="font-sans text-[13px] text-text-secondary max-w-[280px] leading-relaxed">
                    rebates held by intermediaries before any portion reaches the employer plan
                  </p>
                </div>
                {/* Stat 3 */}
                <div className="pt-8">
                  <div className="font-serif text-[40px] md:text-[46px] text-navy tracking-tight-display leading-none mb-3">
                    154M
                  </div>
                  <p className="font-sans text-[13px] text-text-secondary max-w-[280px] leading-relaxed">
                    Americans in self-funded employer plans. A channel that does not require
                    formulary permission to access.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 4: WHO WE SERVE ── */}
      <section className="bg-white">
        <div className="max-w-content mx-auto px-6 md:px-12 py-16 md:py-24">
          <span className="font-sans text-eyebrow uppercase text-orange block mb-4">
            Who We Serve
          </span>
          <h2 className="font-serif text-[28px] md:text-[36px] lg:text-[42px] text-text-primary leading-[1.15] tracking-tight-display mb-12">
            Infrastructure Built for Two Parties.<br />
            Designed for One Outcome.
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2" style={{ gap: "2px", background: "rgba(16,42,76,0.10)" }}>
            {/* Card 1 - Manufacturers */}
            <div className="bg-white p-8 md:p-12">
              <span className="font-sans text-eyebrow uppercase text-orange block mb-3">
                For Manufacturers
              </span>
              <h3 className="font-serif text-[22px] md:text-[26px] text-text-primary leading-[1.2] tracking-tight-display mb-4">
                Your DTE Channel. Built, Operational, Ready to Activate.
              </h3>
              <p className="font-sans text-base text-text-secondary leading-body mb-6">
                ApalyRx provides the complete operating layer for manufacturer direct-to-employer
                programs: eRx intake, eligibility, fulfillment routing, medical-claim billing,
                accumulator reporting, and supplier settlement. Your existing channel arrangements
                remain intact by architecture, not by workaround.
              </p>
              <Link
                href="/manufacturers"
                className="font-sans text-[13px] text-navy border-b border-border hover:border-navy pb-0.5 tracking-link transition-colors duration-200"
              >
                Manufacturer Infrastructure &rarr;
              </Link>
            </div>
            {/* Card 2 - Employers */}
            <div className="bg-off-white p-8 md:p-12">
              <span className="font-sans text-eyebrow uppercase text-orange block mb-3">
                For Employers &amp; Health Plans
              </span>
              <h3 className="font-serif text-[22px] md:text-[26px] text-text-primary leading-[1.2] tracking-tight-display mb-4">
                Lowest Net Cost. Every Script. Full Audit Record.
              </h3>
              <p className="font-sans text-base text-text-secondary leading-body mb-6">
                Configure targeted drug programs, access manufacturer-direct pricing inside your
                benefit, and receive decision-level documentation for every routing decision. Works
                alongside your existing PBM and TPA. Nothing changes except the cost and the
                transparency.
              </p>
              <Link
                href="/employers"
                className="font-sans text-[13px] text-navy border-b border-border hover:border-navy pb-0.5 tracking-link transition-colors duration-200"
              >
                Employer Platform &rarr;
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 5: PLATFORM PILLARS ── */}
      <section id="how-it-works" className="bg-navy">
        <div className="max-w-content mx-auto px-6 md:px-12 py-16 md:py-24">
          {/* Header - 2 column */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 mb-14">
            <h2 className="font-serif text-[28px] md:text-[36px] lg:text-[42px] text-white leading-[1.15] tracking-tight-display">
              Built for Enterprise Scale and Compliance
            </h2>
            <p className="font-sans text-base text-white/50 leading-body lg:pt-2">
              ApalyRx is the only platform that meets all five Drug Benefit Integrity requirements
              simultaneously. Real-time routing, no channel ownership, manufacturer-direct programs
              inside the benefit, independent pharmacy fulfillment, and per-prescription
              decision-level records.
            </p>
          </div>

          {/* Three pillars */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-0">
            {/* Pillar 01 */}
            <div className="border-t border-white/[0.07] pt-8 pb-8 lg:pr-8">
              <span className="font-serif text-xs text-orange tracking-[0.06em] block mb-4">01</span>
              <h4 className="font-serif text-[19px] text-white leading-[1.3] mb-4">
                Existing Arrangements Protected by Architecture
              </h4>
              <p className="font-sans text-sm text-white/[0.45] leading-relaxed">
                The manufacturer&apos;s only counterparty is ApalyRx. There are no direct employer
                relationships to establish or defend. Existing channel relationships with distributors
                and commercial partners are preserved by design through a commercial structure built
                around a single contracted relationship, one counterparty, one monthly invoice, one
                rebate line deduction.
              </p>
            </div>
            {/* Pillar 02 */}
            <div className="border-t border-white/[0.07] pt-8 pb-8 lg:px-8 lg:border-l">
              <span className="font-serif text-xs text-orange tracking-[0.06em] block mb-4">02</span>
              <h4 className="font-serif text-[19px] text-white leading-[1.3] mb-4">
                Patent-Pending DSCSA Compliance in a Custody-Without-Title Model
              </h4>
              <p className="font-sans text-sm text-white/[0.45] leading-relaxed">
                The only platform that generates per-prescription DSCSA T3 documentation in a
                custody-without-title 3PL model without a standard change-of-ownership trigger.
                No existing compliance tool, distributor, or specialty pharmacy has solved this.
                No manufacturer system builds required. Provisional patent filed March 2026.
              </p>
            </div>
            {/* Pillar 03 */}
            <div className="border-t border-white/[0.07] pt-8 pb-8 lg:pl-8 lg:border-l">
              <span className="font-serif text-xs text-orange tracking-[0.06em] block mb-4">03</span>
              <h4 className="font-serif text-[19px] text-white leading-[1.3] mb-4">
                One Ship-To Address. ApalyRx Handles Everything Else.
              </h4>
              <p className="font-sans text-sm text-white/[0.45] leading-relaxed">
                The manufacturer ships bulk to the ApalyRx-designated 3PL on its existing monthly
                cadence, identical to any distributor shipment. ApalyRx manages 3PL coordination,
                pharmacy credentialing across all 50 states, DSCSA documentation, fulfillment
                routing, and all downstream operations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 6: FINAL CTA ── */}
      <section className="bg-off-white">
        <div className="max-w-content mx-auto px-6 md:px-12 py-16 md:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <div>
              <span className="font-sans text-eyebrow uppercase text-orange block mb-4">
                Get Started
              </span>
              <h2 className="font-serif text-[28px] md:text-[36px] lg:text-[42px] text-text-primary leading-[1.15] tracking-tight-display mb-6">
                This Is Not a Pilot Program. The Infrastructure Is Operational Today.
              </h2>
              <p className="font-sans text-base text-text-secondary leading-body">
                ApalyRx has been operating since 2018 and serves Fortune 500 employers. The platform
                is live, compliant, and ready to activate. Tell us which high-cost drugs are driving
                your costs. We will show you how ApalyRx addresses them.
              </p>
            </div>
            <div className="flex flex-col items-start lg:items-end gap-4">
              <Link
                href="/contact"
                className="font-sans text-btn bg-navy hover:bg-navy-dark text-white px-6 py-2.5 transition-colors duration-200"
              >
                Schedule a Briefing
              </Link>
              <Link
                href="/#how-it-works"
                className="font-sans text-[13px] text-navy border-b border-border hover:border-navy pb-0.5 tracking-link transition-colors duration-200"
              >
                View the Platform &rarr;
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
