import type { Metadata } from "next";
import Link from "next/link";
import FaqAccordion from "@/components/FaqAccordion";
import WebPageSchema from "@/components/WebPageSchema";
import FaqSchema from "@/components/FaqSchema";
import ArticleSchema from "@/components/ArticleSchema";
import RelatedResources from "@/components/RelatedResources";
import { Scale, CheckCircle2 } from "lucide-react";

export const metadata: Metadata = {
  title: "PBM Fiduciary Compliance: How Employers Can Prove Prudent Oversight",
  description:
    "CAA 2026, the DOL proposed rule, and ERISA litigation are raising the bar on pharmacy benefit oversight. A practical guide to PBM fiduciary compliance - what plan sponsors must do, what documentation satisfies prudence, and how decision-level verification closes the gap between transparency and integrity.",
  openGraph: {
    title: "PBM Fiduciary Compliance Guide for Employers | ApalyRx",
    description:
      "Practical guide to PBM fiduciary compliance under CAA 2026 and ERISA. How to prove prudent oversight with decision-level verification.",
    url: "https://www.apalyrx.com/resources/pbm-fiduciary-compliance",
    siteName: "ApalyRx",
    type: "website",
  },
};

const faqItems = [
  {
    question: "What changed with CAA 2026 for PBM oversight?",
    answer:
      "CAA 2026 classifies PBMs as covered service providers under ERISA Section 408(b)(2), requiring them to disclose all compensation, pass through 100% of rebates, and provide detailed semiannual reporting. Noncompliance carries penalties up to $10,000 per day.",
  },
  {
    question: "Are PBMs now fiduciaries under ERISA?",
    answer:
      "CAA 2026 does not explicitly designate PBMs as ERISA fiduciaries, but it treats them as covered service providers subject to compensation disclosure and reasonableness requirements. The practical effect is that PBM oversight is now a statutory obligation of plan fiduciaries, not just a contractual negotiation.",
  },
  {
    question: 'What is the "innocent fiduciary" exception?',
    answer:
      "CAA 2026 includes a provision that may shield plan fiduciaries from breach if they did not know of a PBM's failure to remit rebates, reasonably believed compliance would occur, took written steps to compel remittance, and notified the DOL if the PBM failed to comply within 90 days. This does not eliminate general ERISA prudence obligations.",
  },
  {
    question: "How does decision-level verification help with fiduciary compliance?",
    answer:
      "It provides per-prescription evidence that each routing decision was evaluated across all channels and directed to the lowest net cost. This is the strongest form of fiduciary documentation - specific, auditable proof rather than aggregate PBM reports.",
  },
  {
    question: "Can I be sued for how my PBM routes prescriptions?",
    answer:
      "Yes. Recent lawsuits against J&J, Wells Fargo, and JPMorgan allege that plan sponsors breached fiduciary duties by failing to oversee PBM routing and pricing. Courts are increasingly willing to let these cases proceed.",
  },
  {
    question: "What should I do right now?",
    answer:
      "Review your PBM contract for audit rights and compensation disclosure language consistent with CAA 2026. Demand semiannual reports. Engage independent auditors. Evaluate whether your PBM's channel ownership creates routing conflicts. Consider implementing decision-level verification for high-cost prescriptions.",
  },
];

export default function PBMFiduciaryCompliancePage() {
  return (
    <>
      <WebPageSchema
        title="PBM Fiduciary Compliance: How Employers Can Prove Prudent Oversight"
        description="A practical guide to PBM fiduciary compliance under CAA 2026 and ERISA."
        url="https://www.apalyrx.com/resources/pbm-fiduciary-compliance"
      />
      <ArticleSchema
        headline="PBM Fiduciary Compliance: How Employers Can Prove Prudent Oversight"
        description="A practical guide to PBM fiduciary compliance under CAA 2026 and ERISA."
        url="https://www.apalyrx.com/resources/pbm-fiduciary-compliance"
      />
      <FaqSchema items={faqItems} />

      {/* Hero */}
      <section className="relative bg-[#0F1C2E] overflow-hidden">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, rgba(242, 101, 34, 0.3) 1px, transparent 0)",
            backgroundSize: "40px 40px",
          }}
        />
        <div className="relative max-w-4xl mx-auto px-4 pt-28 sm:pt-32 md:pt-48 lg:pt-56 pb-12 md:pb-20 text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white text-sm font-semibold px-4 py-2 rounded-full mb-6 border border-white/20">
            <Scale className="w-4 h-4" />
            <span className="font-heading">Compliance</span>
          </div>
          <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-white mb-6">
            PBM Fiduciary Compliance
          </h1>
          <p className="font-body text-base sm:text-lg md:text-xl text-white/80 max-w-3xl mx-auto leading-relaxed">
            The regulatory landscape for pharmacy benefits has shifted dramatically. The
            Consolidated Appropriations Act of 2026 now treats PBMs as covered service providers
            under ERISA. The Department of Labor has proposed requiring detailed PBM compensation
            disclosures. State laws are imposing fiduciary duties on PBMs directly. And ERISA
            litigation against plan sponsors - J&amp;J, Wells Fargo, JPMorgan - is accelerating. For
            self-funded employers, the question is no longer whether to oversee PBM arrangements,
            but how to prove that oversight is happening.
          </p>
        </div>
      </section>

      {/* Article Body */}
      <section className="bg-white">
        <div className="max-w-4xl mx-auto px-4 py-16 md:py-24">
          {/* The New Regulatory Landscape */}
          <div className="mb-16">
            <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl font-bold text-[#0F1C2E] mb-6">
              The New Regulatory Landscape
            </h2>

            <h3 className="font-heading text-xl md:text-2xl font-bold text-[#0F1C2E] mb-4">
              Consolidated Appropriations Act of 2026
            </h3>
            <div className="space-y-5 font-body text-lg text-muted-foreground leading-relaxed mb-8">
              <p>
                Signed into law on February 3, 2026, the CAA 2026 includes the most significant PBM
                reform provisions in decades. Key requirements for employer-sponsored plans include:
              </p>
              <p>
                PBMs are now classified as &quot;covered service providers&quot; under ERISA Section
                408(b)(2), requiring disclosure of all direct and indirect compensation.
                Compensation must be &quot;reasonable&quot; for the arrangement to qualify for the
                statutory prohibited transaction exemption. Plans must receive 100% pass-through of
                rebates and other remuneration, with limited exceptions for bona fide service fees.
                PBMs must provide detailed semiannual reporting on drug pricing, spread pricing,
                rebates, and compensation. Noncompliance penalties include up to $10,000 per day for
                late reporting and up to $100,000 for knowingly providing false information.
              </p>
            </div>

            <h3 className="font-heading text-xl md:text-2xl font-bold text-[#0F1C2E] mb-4">
              DOL Proposed Rule on PBM Disclosure
            </h3>
            <p className="font-body text-lg text-muted-foreground leading-relaxed mb-8">
              The Department of Labor has proposed requiring PBMs - and affiliated brokers and
              consultants - to disclose detailed information about their direct and indirect
              compensation to plan fiduciaries. The rule would also strengthen audit rights, giving
              plan fiduciaries the ability to verify whether PBM disclosures match actual revenue
              and compensation practices.
            </p>

            <h3 className="font-heading text-xl md:text-2xl font-bold text-[#0F1C2E] mb-4">
              State PBM Fiduciary Laws
            </h3>
            <p className="font-body text-lg text-muted-foreground leading-relaxed mb-8">
              States are moving independently. California&apos;s SB 41, effective January 2026,
              imposes an explicit fiduciary duty on PBMs toward their payer clients, prohibits
              spread pricing, mandates rebate pass-through, and requires state licensure. Arkansas
              banned PBM pharmacy ownership. Colorado and other states have enacted delinking laws.
              These state provisions apply to both fully insured and self-funded plans in many
              cases, though ERISA preemption questions remain for self-funded employer plans.
            </p>

            <h3 className="font-heading text-xl md:text-2xl font-bold text-[#0F1C2E] mb-4">
              ERISA Litigation
            </h3>
            <p className="font-body text-lg text-muted-foreground leading-relaxed">
              Recent lawsuits have put plan sponsors on notice. In the J&amp;J case, an
              employee-participant alleged the company breached fiduciary duties by allowing its PBM
              to steer prescriptions to PBM-owned mail-order pharmacies at inflated prices. The
              Wells Fargo case raised similar allegations - the PBM charged the plan up to 15 times
              the cash price for covered drugs. JPMorgan faces claims that it failed to monitor PBM
              contracts despite having access to market benchmarks. These cases signal that courts
              are increasingly willing to scrutinize plan sponsors&apos; PBM oversight practices.
            </p>
          </div>

          {/* What Fiduciary Duty Actually Requires */}
          <div className="mb-16">
            <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl font-bold text-[#0F1C2E] mb-6">
              What Fiduciary Duty Actually Requires
            </h2>
            <p className="font-body text-lg text-muted-foreground leading-relaxed mb-6">
              Under ERISA, plan fiduciaries must meet four core obligations:
            </p>
            <div className="space-y-5 font-body text-lg text-muted-foreground leading-relaxed">
              <p>
                <strong className="text-[#0F1C2E]">Loyalty</strong> - Act solely in the interest of
                plan participants and beneficiaries.
              </p>
              <p>
                <strong className="text-[#0F1C2E]">Prudence</strong> - Use care, skill, and
                diligence that a prudent person in a similar situation would exercise. This is a
                process standard, not an outcome standard - the question is whether the
                fiduciary&apos;s decision-making process was reasonable, not whether the outcome was
                optimal.
              </p>
              <p>
                <strong className="text-[#0F1C2E]">Reasonableness</strong> - Ensure that fees and
                compensation paid for plan services are reasonable.
              </p>
              <p>
                <strong className="text-[#0F1C2E]">Plan compliance</strong> - Follow the terms of
                plan documents.
              </p>
              <p>
                For pharmacy benefits specifically, these duties translate into concrete obligations.
                Plan sponsors must actively monitor PBM performance - not just at contract
                negotiation, but on an ongoing basis. They must evaluate whether PBM compensation is
                reasonable in light of services provided. They must assess whether routing decisions
                serve the plan&apos;s interest. And they must document their oversight activities.
              </p>
            </div>

            <div className="my-10 border-l-4 border-[#F26522] bg-[#F26522]/5 rounded-r-lg px-6 py-5">
              <p className="font-heading text-lg md:text-xl font-bold text-[#0F1C2E]">
                Outsourcing plan operations to a PBM does not eliminate fiduciary liability. Plan
                sponsors remain responsible for overseeing their vendors.
              </p>
            </div>
          </div>

          {/* The Gap Between Transparency and Compliance */}
          <div className="mb-16">
            <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl font-bold text-[#0F1C2E] mb-6">
              The Gap Between Transparency and Compliance
            </h2>
            <div className="space-y-5 font-body text-lg text-muted-foreground leading-relaxed">
              <p>
                CAA 2026 and the DOL proposed rule give plan sponsors more visibility into PBM
                operations than ever before. Semiannual reporting, compensation disclosure, rebate
                pass-through requirements - these are meaningful reforms.
              </p>
              <p>
                But visibility alone does not satisfy fiduciary prudence. Receiving a report is not
                the same as verifying its accuracy. Knowing what the PBM charged is not the same as
                proving the charge was reasonable. Seeing aggregate savings data is not the same as
                confirming that each individual routing decision was optimal.
              </p>
              <p>
                Consider the analogy to financial auditing. A company&apos;s CFO receives financial
                statements from its accounting department. But the existence of those statements
                does not satisfy the company&apos;s audit obligations. An independent auditor must
                verify that the statements are accurate and that internal controls are functioning.
              </p>
              <p>
                Pharmacy benefits have the statements - PBM reports, rebate reconciliations,
                performance guarantees. What they lack is the independent verification.
              </p>
            </div>
          </div>

          {/* A Practical Framework for Fiduciary Compliance */}
          <div className="mb-16">
            <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl font-bold text-[#0F1C2E] mb-6">
              A Practical Framework for Fiduciary Compliance
            </h2>
            <p className="font-body text-lg text-muted-foreground leading-relaxed mb-8">
              Based on the current regulatory landscape and litigation trends, plan sponsors should
              consider the following framework:
            </p>

            <div className="space-y-10">
              <div>
                <h3 className="font-heading text-xl md:text-2xl font-bold text-[#0F1C2E] mb-4">
                  1. Review and Renegotiate PBM Contracts
                </h3>
                <p className="font-body text-lg text-muted-foreground leading-relaxed">
                  Ensure contracts include broad audit rights, unrestricted data access, compensation
                  disclosure requirements consistent with CAA 2026, and 100% rebate pass-through
                  language. Remove any provisions that limit the plan&apos;s ability to verify PBM
                  performance.
                </p>
              </div>

              <div>
                <h3 className="font-heading text-xl md:text-2xl font-bold text-[#0F1C2E] mb-4">
                  2. Demand and Review Semiannual Reports
                </h3>
                <p className="font-body text-lg text-muted-foreground leading-relaxed">
                  Under CAA 2026, PBMs must provide detailed reporting. Plan sponsors must actually
                  review these reports - receiving them is not sufficient. Assess drug-level pricing,
                  spread between plan charges and pharmacy reimbursement, rebate amounts, and total
                  PBM compensation.
                </p>
              </div>

              <div>
                <h3 className="font-heading text-xl md:text-2xl font-bold text-[#0F1C2E] mb-4">
                  3. Conduct Independent Audits
                </h3>
                <p className="font-body text-lg text-muted-foreground leading-relaxed">
                  PBM self-reporting is necessary but not sufficient. Engage independent auditors -
                  not auditors recommended by the PBM - to verify that reported data matches actual
                  claims, rebates, and compensation. Audit rights should be exercised regularly, not
                  just when problems are suspected.
                </p>
              </div>

              <div>
                <h3 className="font-heading text-xl md:text-2xl font-bold text-[#0F1C2E] mb-4">
                  4. Evaluate Channel Independence
                </h3>
                <p className="font-body text-lg text-muted-foreground leading-relaxed">
                  Assess whether your PBM&apos;s routing decisions are influenced by channel
                  ownership. If the PBM owns specialty, mail-order, and retail pharmacies, the plan
                  sponsor should verify that routing decisions are based on{" "}
                  <Link
                    href="/resources/lowest-net-cost-routing"
                    className="text-[#F26522] hover:text-[#F26522]/80 font-semibold"
                  >
                    lowest net cost
                  </Link>{" "}
                  to the plan, not PBM channel revenue.
                </p>
              </div>

              <div>
                <h3 className="font-heading text-xl md:text-2xl font-bold text-[#0F1C2E] mb-4">
                  5. Implement Decision-Level Verification
                </h3>
                <p className="font-body text-lg text-muted-foreground leading-relaxed">
                  The strongest demonstration of fiduciary prudence is per-prescription documentation
                  showing that each routing decision was evaluated across all available channels and
                  directed to the lowest net cost option. This decision-level evidence provides the
                  specific, granular proof that aggregate reports cannot.
                </p>
              </div>

              <div>
                <h3 className="font-heading text-xl md:text-2xl font-bold text-[#0F1C2E] mb-4">
                  6. Document Everything
                </h3>
                <p className="font-body text-lg text-muted-foreground leading-relaxed">
                  Maintain a record of all fiduciary activities - PBM reviews, audit findings,
                  contract negotiations, vendor evaluations, and corrective actions. In ERISA
                  litigation, the court evaluates the process the fiduciary followed, not just the
                  outcome achieved. A well-documented oversight process is the strongest defense.
                </p>
              </div>
            </div>
          </div>

          {/* How Decision-Level Verification Closes the Gap */}
          <div className="mb-16">
            <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl font-bold text-[#0F1C2E] mb-6">
              How Decision-Level Verification Closes the Gap
            </h2>
            <div className="space-y-5 font-body text-lg text-muted-foreground leading-relaxed">
              <p>
                Decision-level verification is the bridge between transparency (seeing data) and{" "}
                <Link
                  href="/resources/drug-benefit-integrity"
                  className="text-[#F26522] hover:text-[#F26522]/80 font-semibold"
                >
                  integrity
                </Link>{" "}
                (proving decisions were sound). For each prescription, it provides:
              </p>
              <p>
                A record of every channel evaluated - including channels the PBM may have excluded
                from its own analysis. The actual net cost in each channel - not an estimate, not an
                average, but the real cost based on current pricing. The rules that were applied -
                formulary status, prior authorization requirements, cost-share design. The routing
                rationale - why the selected channel was chosen. A complete financial reconciliation
                - what was billed, what was paid, what the member contributed.
              </p>
              <p>
                This documentation exists at the individual prescription level, not in aggregate. It
                can be audited on a per-script basis. And because it is produced by an independent
                entity with no ownership in any dispensing channel, it is structurally free of the
                conflicts that compromise PBM self-reporting.
              </p>
            </div>

            <div className="my-10 border-l-4 border-[#F26522] bg-[#F26522]/5 rounded-r-lg px-6 py-5">
              <p className="font-heading text-lg md:text-xl font-bold text-[#0F1C2E]">
                For plan fiduciaries, decision-level verification transforms compliance from
                &quot;we trusted our PBM and reviewed their reports&quot; to &quot;we have
                independent, per-decision proof that every high-cost prescription was routed to the
                lowest net cost.&quot;
              </p>
            </div>
          </div>

          {/* FAQ */}
          <div className="mb-16">
            <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl font-bold text-[#0F1C2E] mb-8">
              Frequently Asked Questions
            </h2>
            <FaqAccordion items={faqItems} />
          </div>

          {/* Related Resources */}
          <RelatedResources currentHref="/resources/pbm-fiduciary-compliance" />
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="bg-[#0F1C2E] text-white py-16 md:py-24">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold leading-tight mb-4">
            Strengthen Your Fiduciary Position
          </h2>
          <p className="font-body text-base sm:text-lg text-white/80 mb-8 max-w-2xl mx-auto">
            ApalyRx provides independent, decision-level verification for every high-cost
            prescription - the documentation plan sponsors need to demonstrate prudent oversight.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center bg-[#F26522] hover:bg-[#F26522]/90 text-white font-heading font-semibold shadow-lg text-base md:text-lg px-6 md:px-8 py-4 md:py-6 rounded-lg transition-all duration-300"
          >
            <CheckCircle2 className="w-5 h-5 mr-2" />
            Request a Conversation
          </Link>
        </div>
      </section>
    </>
  );
}
