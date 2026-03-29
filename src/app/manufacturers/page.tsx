import type { Metadata } from "next";
import Link from "next/link";
import WebPageSchema from "@/components/WebPageSchema";
import FaqSchema from "@/components/FaqSchema";
import CredentialStrip from "@/components/CredentialStrip";
import ManufacturerFaq from "@/components/ManufacturerFaq";

export const metadata: Metadata = {
  title: "Direct-to-Employer Drug Program Infrastructure for Manufacturers",
  description:
    "ApalyRx provides the operational, regulatory, and technology infrastructure for manufacturer direct-to-employer programs. Your product, your pricing, your commercial strategy. ApalyRx is the platform that makes it executable at scale.",
  openGraph: {
    title: "Direct-to-Employer Drug Program Infrastructure | ApalyRx",
    description:
      "Complete operational infrastructure for manufacturer direct-to-employer drug programs. eRx intake, eligibility, fulfillment, billing, settlement, and decision-level documentation.",
    url: "https://www.apalyrx.com/manufacturers",
    siteName: "ApalyRx",
    type: "website",
  },
};

const operationalRows = [
  {
    requirement: "3PL Fulfillment Relationship",
    resolution: "ApalyRx contracts and manages the 3PL. The manufacturer ships to one designated address on the existing monthly bulk cadence, identical to any distributor shipment. No 3PL negotiation, contract management, or operational oversight required.",
  },
  {
    requirement: "Per-Script DSCSA T3 Documentation",
    resolution: "The manufacturer provides bulk serialization data per current procedures. The ApalyRx patent-pending Distribution Engine generates and retains all per-script T3 documentation automatically. No manufacturer system builds required.",
  },
  {
    requirement: "Employer-Direct Pricing and MFN Compliance",
    resolution: "WAC is preserved across all channels. A per-drug program rebate defined in the supply agreement is applied as a line deduction on the monthly invoice. One invoice, one rebate line, one payment. No new pricing tier, no MFN exposure.",
  },
  {
    requirement: "Pharmacy Credentialing Across 50 States",
    resolution: "ApalyRx LLC maintains written delegation agreements with all participating pharmacies of record. ApalyRx manages credentialing nationally. No pharmacy relationships to establish or manage.",
  },
  {
    requirement: "Cold Chain and Fulfillment Logistics",
    resolution: "ApalyRx manages all fulfillment from the 3PL ship-to address forward: temperature controls, last-mile delivery, and pharmacy pickup routing. Physical risk during custody and transit is covered by cargo insurance maintained in the ApalyRx-3PL agreement.",
  },
  {
    requirement: "Direct Employer Contracts",
    resolution: "The manufacturer's only counterparty is ApalyRx. There are no direct employer health plan relationships to establish or defend. Employer demand is transmitted by proxy through ApalyRx as the authorized channel operator, exactly as PBM contracts contemplate.",
  },
  {
    requirement: "ERISA and Plan Sponsor Compliance",
    resolution: "ApalyRx manages all health plan contracting, fee disclosure, and Consolidated Appropriations Act compliance obligations. The manufacturer's only plan-related document is the master supply agreement with ApalyRx.",
  },
  {
    requirement: "Member-Level Sell-Through Data",
    resolution: "Monthly dispense, adherence, prescriber attribution, and program performance reports delivered through the platform reporting portal. This is data the standard distributor channel structurally cannot provide: sell-through, not sell-in.",
  },
];

const timelinePhases = [
  {
    phase: "1",
    months: "Months 1\u20132",
    title: "Agreement and Commercial Framework",
    bullets: ["Master supply agreement", "Technology services agreement for DSCSA engine", "Per-drug rebate schedule structured and documented"],
  },
  {
    phase: "2",
    months: "Months 2\u20133",
    title: "Platform Integration",
    bullets: ["DSCSA engine integration with manufacturer serialization data", "JIT forecast calibration to first employer census", "3PL API integration and serialized inventory ingestion"],
  },
  {
    phase: "3",
    months: "Month 4",
    title: "Inaugural Employer Launch",
    bullets: ["First live deployment", "End-to-end operational validation: prescription flow, DSCSA documentation, invoicing, health plan reporting, member experience"],
  },
  {
    phase: "4",
    months: "Month 5",
    title: "Review and Channel Preparation",
    bullets: ["Performance review with manufacturer teams", "Reporting formats finalized", "Commercial team briefed on live channel for use in employer account discussions"],
  },
  {
    phase: "5",
    months: "Month 6",
    title: "Scale",
    bullets: ["Additional employer and health plan clients onboarded", "Monthly JIT cadence and consolidated reporting fully operational"],
  },
  {
    phase: "6",
    months: "Ongoing",
    title: "Growth",
    bullets: ["Manufacturer commercial team references the live DTE channel with employer accounts", "Additional drug categories activated"],
  },
];

const faqSections = [
  {
    title: "Operations Team",
    items: [
      {
        question: "Does this require new logistics or warehouse infrastructure?",
        answer: "No. The manufacturer's one new operational step is shipping to an ApalyRx-designated 3PL facility rather than a distributor warehouse. ApalyRx owns and manages the 3PL relationship entirely. All documentation and downstream fulfillment are handled by ApalyRx.",
      },
      {
        question: "Do we need new DSCSA systems?",
        answer: "No. The manufacturer provides serialization data per current procedures. The ApalyRx platform handles all per-script T3 documentation as a technology service. No manufacturer system builds required.",
      },
      {
        question: "Who manages cold chain during transit?",
        answer: "The manufacturer ships to the ApalyRx-designated 3PL using existing cold chain protocols. ApalyRx bears responsibility for cold chain management from the 3PL forward. Cold chain standards are contractual obligations in the ApalyRx-3PL service agreement.",
      },
    ],
  },
  {
    title: "Finance Team",
    items: [
      {
        question: "How does revenue recognition work?",
        answer: "Revenue is recognized at point of title transfer, confirmed home delivery or physical receipt at the participating pharmacy. This is a discrete, documentable event recorded by the ApalyRx platform. The monthly invoice reflects all title transfer events in the prior month.",
      },
      {
        question: "What is our credit exposure?",
        answer: "The manufacturer's counterparty is ApalyRx. Credit exposure is evaluated against ApalyRx as the contracting entity. The manufacturer has no direct financial relationship with any health plan.",
      },
      {
        question: "How does this interact with gross-to-net?",
        answer: "WAC is preserved. The per-drug program rebate is a separately documented supply agreement benefit. GTN for this channel is calculated as WAC minus the rebate, with no chargebacks, no distributor fees. Structurally cleaner than the standard rebate chain.",
      },
    ],
  },
  {
    title: "Legal Team",
    items: [
      {
        question: "Does this create new wholesale distribution obligations?",
        answer: "No. The 3PL is a licensed third-party logistics provider, not a wholesale distributor. Custody transfer to the 3PL without title transfer does not trigger wholesale distribution requirements under DSCSA or state law.",
      },
      {
        question: "Does the manufacturer contract with health plans?",
        answer: "No. The manufacturer's only counterparty is ApalyRx. Employer demand is transmitted by proxy through ApalyRx as the authorized channel operator. The manufacturer has no direct employer relationships to establish or defend.",
      },
      {
        question: "Will this trigger MFN provisions?",
        answer: "The WAC with employer-direct program rebate structure is designed to avoid triggering MFN provisions. WAC is preserved across all channels. Manufacturer legal teams should validate the specific MFN language in their PBM contracts against this structure.",
      },
    ],
  },
  {
    title: "Commercial and Market Access Team",
    items: [
      {
        question: "Is this a pilot program?",
        answer: "No. This is a live channel infrastructure built and operated by ApalyRx. 3PL fulfillment, DSCSA documentation systems, pharmacy credentialing across 50 states, and plan contracting are all operational today. The inaugural employer deployment is a live validation of a complete operational system, not a proof of concept.",
      },
      {
        question: "How does this affect existing PBM relationships?",
        answer: "The program is designed to function alongside existing PBM benefits. Health plans direct specific high-cost specialty drugs through the program while maintaining their PBM for the broader formulary. The manufacturer's existing formulary arrangements for all other drugs are unchanged.",
      },
      {
        question: "What does the manufacturer gain that no other channel provides?",
        answer: "Real-time member-level sell-through data, prescriber attribution, adherence metrics, and locked formulary position within employer-configured drug programs, combined with rebates applied at dispense rather than held 90 to 180 days by intermediaries.",
      },
    ],
  },
];

// Flatten for schema
const allFaqItems = faqSections.flatMap((s) => s.items);

export default function ManufacturersPage() {
  return (
    <>
      <WebPageSchema
        title="ApalyRx for Manufacturers"
        description="Complete operational infrastructure for manufacturer direct-to-employer drug programs."
        url="https://www.apalyrx.com/manufacturers"
      />
      <FaqSchema items={allFaqItems} />

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
            For Manufacturers
          </span>
          <div className="w-10 h-[2px] bg-orange mb-8" />
          <h1 className="font-serif text-[34px] md:text-[46px] lg:text-[56px] text-white leading-[1.1] tracking-tighter-display max-w-[680px] mb-6">
            Your DTE Channel. Built, Operational, Ready to Activate.
          </h1>
          <p className="font-sans text-base md:text-lg text-white/[0.60] max-w-[600px] leading-body mb-10">
            ApalyRx provides the operational, regulatory, and technology infrastructure for
            manufacturer direct-to-employer programs. Your product, your pricing, your commercial
            strategy. ApalyRx is the platform that makes it executable at scale.
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

      {/* ── SECTION 3: THE STRATEGIC DECISION ── */}
      <section className="bg-off-white">
        <div className="max-w-content mx-auto px-6 md:px-12 py-16 md:py-24">
          <span className="font-sans text-eyebrow uppercase text-orange block mb-4">
            The Strategic Decision
          </span>
          <h2 className="font-serif text-[28px] md:text-[36px] lg:text-[42px] text-text-primary leading-[1.15] tracking-tight-display max-w-[680px] mb-8">
            Does Your Organization Have a Direct-to-Employer Model?
          </h2>
          <div className="max-w-[740px] space-y-5 font-sans text-base text-text-secondary leading-body">
            <p>
              The employer-sponsored health plan market represents one of the most significant
              untapped opportunities in pharmaceutical distribution. Self-funded employers bear
              the direct cost of their members&apos; drug spend and are actively seeking
              manufacturer-direct access that removes intermediary margin and replaces opacity
              with accountability.
            </p>
            <p>
              A direct-to-employer channel is not a concept that can be tested with a single
              employer before committing resources. Every deployment uses the same core
              infrastructure: 3PL fulfillment, DSCSA documentation systems, pharmacy
              credentialing across 50 states, demand forecasting, and plan contracting. That
              infrastructure must be operational before the first script is processed.
            </p>
            <p>
              ApalyRx has built and operates that infrastructure. The question is not whether to
              construct it. It is whether your organization chooses to access what is already
              operational, or to watch other manufacturers establish the direct-to-employer
              standard first.
            </p>
          </div>
        </div>
      </section>

      {/* ── SECTION 4: WHAT YOU AVOID BUILDING ── */}
      <section className="bg-white">
        <div className="max-w-content mx-auto px-6 md:px-12 py-16 md:py-24">
          <span className="font-sans text-eyebrow uppercase text-orange block mb-4">
            The Operational Model
          </span>
          <h2 className="font-serif text-[28px] md:text-[36px] lg:text-[42px] text-text-primary leading-[1.15] tracking-tight-display mb-12">
            One New Ship-To Address.<br />
            ApalyRx Handles Everything Else.
          </h2>

          {/* Table header */}
          <div className="grid grid-cols-1 md:grid-cols-[1fr_1.5fr] gap-4 md:gap-8 pb-4 border-b border-border mb-0">
            <div className="font-sans text-xs uppercase tracking-eyebrow text-text-muted">
              What the Channel Requires
            </div>
            <div className="font-sans text-xs uppercase tracking-eyebrow text-text-muted hidden md:block">
              How ApalyRx Has Already Built It
            </div>
          </div>

          {/* Rows */}
          {operationalRows.map((row) => (
            <div
              key={row.requirement}
              className="grid grid-cols-1 md:grid-cols-[1fr_1.5fr] gap-4 md:gap-8 py-6 border-b border-border"
            >
              <div className="font-serif text-base md:text-lg text-text-primary">
                {row.requirement}
              </div>
              <div className="font-sans text-sm text-text-secondary leading-relaxed">
                {row.resolution}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── SECTION 5: PLATFORM ARCHITECTURE ── */}
      <section className="bg-navy">
        <div className="max-w-content mx-auto px-6 md:px-12 py-16 md:py-24">
          {/* Header */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 mb-14">
            <div>
              <span className="font-sans text-eyebrow uppercase text-white/[0.35] block mb-4">
                Platform Architecture
              </span>
              <h2 className="font-serif text-[28px] md:text-[36px] lg:text-[42px] text-white leading-[1.15] tracking-tight-display">
                Three Engines. One Integrated System.
              </h2>
            </div>
            <p className="font-sans text-base text-white/50 leading-body lg:pt-8">
              Built on a patent-pending architecture that handles every function from prescription
              intake to supplier payment. No existing distribution model, specialty pharmacy, or
              compliance tool has combined these capabilities in a single platform.
            </p>
          </div>

          {/* Three engines */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-0">
            <div className="border-t border-white/[0.07] pt-8 pb-8 lg:pr-8">
              <span className="font-serif text-xs text-orange tracking-[0.06em] block mb-4">01</span>
              <h4 className="font-serif text-[19px] text-white leading-[1.3] mb-4">
                Prescription and Member Engagement Engine
              </h4>
              <p className="font-sans text-sm text-white/[0.45] leading-relaxed">
                Receives electronic prescriptions via NCPDP SCRIPT from any intake pathway.
                Verifies member eligibility in real time. Initiates a single member interaction
                via SMS for pharmacy selection and cost-share collection. Executes prescription
                transfer. Initiates the four-event settlement sequence.
              </p>
            </div>
            <div className="border-t border-white/[0.07] pt-8 pb-8 lg:px-8 lg:border-l">
              <span className="font-serif text-xs text-orange tracking-[0.06em] block mb-4">02</span>
              <h4 className="font-serif text-[19px] text-white leading-[1.3] mb-4">
                Multi-Channel Lowest Net Cost Routing Engine
              </h4>
              <p className="font-sans text-sm text-white/[0.45] leading-relaxed">
                Evaluates every in-scope prescription against all plan-activated supply channel
                categories in real time: manufacturer-direct, standard PBM channel, platform
                pharmacy supplier. Selects the lowest net cost option. This is a routing decision
                across categorically distinct supply chain architectures, not a selection among
                pharmacies within a single channel.
              </p>
            </div>
            <div className="border-t border-white/[0.07] pt-8 pb-8 lg:pl-8 lg:border-l">
              <span className="font-serif text-xs text-orange tracking-[0.06em] block mb-4">03</span>
              <h4 className="font-serif text-[19px] text-white leading-[1.3] mb-4">
                Distribution and DSCSA Compliance Engine (Patent Pending)
              </h4>
              <p className="font-sans text-sm text-white/[0.45] leading-relaxed">
                Manages the serialized virtual pre-allocation pool for manufacturer-direct
                custodial inventory. Generates DSCSA-compliant per-prescription T3 documentation
                at the individual dispense level without a change-of-ownership trigger at the 3PL.
                Administers just-in-time replenishment against the enrolled member census.
                Provisional patent filed March 2026.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 6: COMMERCIAL STRUCTURE ── */}
      <section className="bg-off-white">
        <div className="max-w-content mx-auto px-6 md:px-12 py-16 md:py-24">
          <span className="font-sans text-eyebrow uppercase text-orange block mb-4">
            Commercial Structure
          </span>
          <h2 className="font-serif text-[28px] md:text-[36px] lg:text-[42px] text-text-primary leading-[1.15] tracking-tight-display mb-10">
            Transparent, Auditable Economics
          </h2>

          {/* 3-column stat grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-12 pb-12 border-b border-border">
            <div>
              <div className="font-serif text-[32px] md:text-[38px] text-navy tracking-tight-display leading-none mb-2">
                WAC Preserved
              </div>
              <p className="font-sans text-[13px] text-text-secondary">Across all channels</p>
            </div>
            <div>
              <div className="font-serif text-[32px] md:text-[38px] text-navy tracking-tight-display leading-none mb-2">
                One Counterparty
              </div>
              <p className="font-sans text-[13px] text-text-secondary">One invoice. One payment.</p>
            </div>
            <div>
              <div className="font-serif text-[32px] md:text-[38px] text-navy tracking-tight-display leading-none mb-2">
                &lt; 30 Days
              </div>
              <p className="font-sans text-[13px] text-text-secondary">Inventory dwell time at 3PL</p>
            </div>
          </div>

          {/* 2-column body */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16">
            <div>
              <h4 className="font-serif text-lg text-text-primary mb-3">Pricing mechanism</h4>
              <p className="font-sans text-sm text-text-secondary leading-relaxed">
                The manufacturer invoices at WAC. A per-drug employer-direct program rebate,
                defined in the master supply agreement, is applied as a line deduction on the
                monthly invoice. Net payment is WAC minus the rebate. This structure preserves
                most-favored-nation integrity because manufacturer rebates are almost universally
                excluded from MFN calculations under existing contracts.
              </p>
            </div>
            <div>
              <h4 className="font-serif text-lg text-text-primary mb-3">Data exchange</h4>
              <p className="font-sans text-sm text-text-secondary leading-relaxed">
                ApalyRx provides monthly member-level utilization reporting, adherence metrics,
                prescriber attribution, and program performance data through the platform portal.
                This is sell-through visibility, actual dispense events at the member level, that
                the traditional distributor channel structurally cannot provide.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 7: QUESTIONS BY TEAM ── */}
      <section className="bg-white">
        <div className="max-w-content mx-auto px-6 md:px-12 py-16 md:py-24">
          <span className="font-sans text-eyebrow uppercase text-orange block mb-4">
            Common Questions
          </span>
          <h2 className="font-serif text-[28px] md:text-[36px] lg:text-[42px] text-text-primary leading-[1.15] tracking-tight-display mb-12">
            Answers for Every Internal Stakeholder
          </h2>

          <div className="max-w-3xl">
            <ManufacturerFaq sections={faqSections} />
          </div>
        </div>
      </section>

      {/* ── SECTION 8: LAUNCH TIMELINE ── */}
      <section className="bg-off-white">
        <div className="max-w-content mx-auto px-6 md:px-12 py-16 md:py-24">
          <span className="font-sans text-eyebrow uppercase text-orange block mb-4">
            Implementation
          </span>
          <h2 className="font-serif text-[28px] md:text-[36px] lg:text-[42px] text-text-primary leading-[1.15] tracking-tight-display mb-12">
            Operational in Six Months
          </h2>

          {/* Timeline */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
            {timelinePhases.map((phase) => (
              <div key={phase.phase} className="border-t-2 border-orange pt-5">
                <span className="font-serif text-xs text-orange tracking-[0.06em] block mb-1">
                  Phase {phase.phase}
                </span>
                <span className="font-sans text-xs text-text-muted block mb-2">
                  {phase.months}
                </span>
                <h4 className="font-serif text-base text-text-primary leading-[1.3] mb-3">
                  {phase.title}
                </h4>
                <ul className="space-y-1.5">
                  {phase.bullets.map((b, i) => (
                    <li key={i} className="font-sans text-xs text-text-secondary leading-relaxed">
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 9: FINAL CTA ── */}
      <section className="bg-navy">
        <div className="max-w-content mx-auto px-6 md:px-12 py-16 md:py-24 text-center">
          <span className="font-sans text-eyebrow uppercase text-white/[0.35] block mb-4">
            Activate Your Channel
          </span>
          <h2 className="font-serif text-[28px] md:text-[36px] lg:text-[42px] text-white leading-[1.15] tracking-tight-display max-w-[620px] mx-auto mb-6">
            The Infrastructure Is Built. Activation Is the Only Remaining Step.
          </h2>
          <p className="font-sans text-base text-white/[0.55] max-w-[560px] mx-auto leading-body mb-10">
            Contact us to discuss your portfolio, your existing distribution model, and the
            fastest path to a live direct-to-employer deployment.
          </p>
          <Link
            href="/contact"
            className="font-sans text-btn text-white border border-white/[0.45] hover:border-white hover:bg-white/[0.07] px-6 py-2.5 transition-colors duration-200 inline-block"
          >
            Schedule a Briefing
          </Link>
        </div>
      </section>
    </>
  );
}
