import type { Metadata } from "next";
import Link from "next/link";
import FaqAccordion from "@/components/FaqAccordion";
import WebPageSchema from "@/components/WebPageSchema";
import FaqSchema from "@/components/FaqSchema";
import ArticleSchema from "@/components/ArticleSchema";
import RelatedResources from "@/components/RelatedResources";
import { Route, CheckCircle2 } from "lucide-react";

export const metadata: Metadata = {
  title: "What Is Lowest Net Cost Prescription Routing?",
  description:
    "Lowest net cost prescription routing evaluates every fulfillment channel - PBM specialty, PBM mail, retail, manufacturer-direct, independent pharmacy - in real time to identify the actual lowest cost for each prescription. Learn how it works, why retrospective analysis falls short, and what decision-level documentation means.",
  openGraph: {
    title: "What Is Lowest Net Cost Prescription Routing? | ApalyRx",
    description:
      "Real-time evaluation of every fulfillment channel to identify the actual lowest net cost for each prescription. How it works and why it matters.",
    url: "https://www.apalyrx.com/resources/lowest-net-cost-routing",
    siteName: "ApalyRx",
    type: "website",
  },
};

const faqItems = [
  {
    question: 'What is "lowest net cost" in pharmacy benefits?',
    answer:
      "Lowest net cost means the final amount the plan pays for a prescription after all pricing adjustments - acquisition cost, fees, rebates, and discounts. It is the actual financial impact on the plan, not the list price or the member's cost-share.",
  },
  {
    question: "How is lowest net cost routing different from what my PBM does?",
    answer:
      "Most PBMs evaluate cost within their own channels - their specialty pharmacy, mail-order pharmacy, and contracted retail network. Lowest net cost routing evaluates all available channels, including manufacturer-direct programs and independent pharmacies, in real time at the point of decision.",
  },
  {
    question: "Why does real-time matter?",
    answer:
      "Real-time routing makes the cost comparison before the prescription is filled, ensuring the lowest-cost channel is selected at the point of decision. Retrospective analysis identifies savings opportunities after the fact, when the prescription has already been dispensed and paid for.",
  },
  {
    question: "What channels are compared in all-channel routing?",
    answer:
      "PBM specialty pharmacy, PBM mail-order, retail pharmacy, manufacturer-direct programs (including DTC, DTP, and DTE models), and independent community pharmacies.",
  },
  {
    question: "What is decision-level documentation?",
    answer:
      "A per-prescription record showing all channels evaluated, the net cost in each channel, rules applied, why the selected channel was chosen, and the complete financial reconciliation. It is auditable proof that the routing decision was optimal.",
  },
  {
    question: "How does this help with fiduciary compliance?",
    answer:
      "Decision-level documentation provides the specific, per-script evidence plan fiduciaries need to demonstrate prudent oversight under ERISA and CAA 2026 - proof that each prescription was independently evaluated across all channels and routed to the lowest net cost.",
  },
];

export default function LowestNetCostRoutingPage() {
  return (
    <>
      <WebPageSchema
        title="What Is Lowest Net Cost Prescription Routing?"
        description="Real-time evaluation of every fulfillment channel to identify the actual lowest net cost for each prescription."
        url="https://www.apalyrx.com/resources/lowest-net-cost-routing"
      />
      <ArticleSchema
        headline="What Is Lowest Net Cost Prescription Routing?"
        description="Real-time evaluation of every fulfillment channel to identify the actual lowest net cost for each prescription."
        url="https://www.apalyrx.com/resources/lowest-net-cost-routing"
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
            <Route className="w-4 h-4" />
            <span className="font-heading">Education</span>
          </div>
          <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-white mb-6">
            What Is Lowest Net Cost Prescription Routing?
          </h1>
          <p className="font-body text-base sm:text-lg md:text-xl text-white/80 max-w-3xl mx-auto leading-relaxed">
            &quot;Lowest net cost&quot; is one of the most frequently used - and least precisely defined -
            terms in pharmacy benefits. Every PBM claims to deliver it. Every employer wants it. But
            what does it actually mean to route a prescription to the lowest net cost, and how can a
            plan sponsor prove it happened?
          </p>
        </div>
      </section>

      {/* Article Body */}
      <section className="bg-white">
        <div className="max-w-4xl mx-auto px-4 py-16 md:py-24">
          {/* Defining "Net Cost" */}
          <div className="mb-16">
            <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl font-bold text-[#0F1C2E] mb-6">
              Defining &quot;Net Cost&quot;
            </h2>
            <div className="space-y-5 font-body text-lg text-muted-foreground leading-relaxed">
              <p>
                The net cost of a prescription is the final amount the plan pays after all pricing
                adjustments have been applied. This includes the drug acquisition cost, dispensing
                fees, administrative fees, rebates, discounts, and any other financial adjustments.
              </p>
              <p>
                Net cost is not the same as list price. A drug with a $1,000 list price and a $600
                rebate has a net cost of $400 to the plan. A different drug with a $450 list price
                and no rebate has a net cost of $450. In this case, the more expensive list-price
                drug is actually the lower net-cost option - but only if the rebate is fully passed
                through to the plan.
              </p>
              <p>
                Net cost is also not the same as the price the member pays. The member&apos;s
                cost-share (copay or coinsurance) is separate from the plan&apos;s net cost. A plan
                can have a low net cost while the member pays a high copay, or vice versa.
              </p>
              <p>
                For plan sponsors, net cost is the number that matters because it represents the
                actual financial impact on the plan. It is also the number that is hardest to verify
                because it depends on pricing components that are often opaque, delayed, or subject
                to retroactive adjustment.
              </p>
            </div>
          </div>

          {/* What "All Channels" Means */}
          <div className="mb-16">
            <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl font-bold text-[#0F1C2E] mb-6">
              What &quot;All Channels&quot; Means
            </h2>
            <p className="font-body text-lg text-muted-foreground leading-relaxed mb-6">
              True lowest-net-cost routing requires evaluating every available fulfillment channel
              for each prescription. In today&apos;s pharmacy landscape, the relevant channels
              include:
            </p>
            <div className="space-y-5 font-body text-lg text-muted-foreground leading-relaxed">
              <p>
                <strong className="text-[#0F1C2E]">PBM Specialty Pharmacy</strong> - The PBM&apos;s
                owned or affiliated specialty pharmacy, typically used for high-cost medications
                requiring special handling, clinical monitoring, or prior authorization.
              </p>
              <p>
                <strong className="text-[#0F1C2E]">PBM Mail-Order Pharmacy</strong> - The PBM&apos;s
                mail-order operation, usually offering 90-day fills at negotiated rates.
              </p>
              <p>
                <strong className="text-[#0F1C2E]">Retail Pharmacy</strong> - Chain and independent
                pharmacies where members fill prescriptions in person.
              </p>
              <p>
                <strong className="text-[#0F1C2E]">Manufacturer-Direct Programs</strong> - Copay
                programs, patient assistance programs, and direct pricing offered by drug
                manufacturers, including{" "}
                <Link
                  href="/resources/direct-to-employer-drug-programs"
                  className="text-[#F26522] hover:text-[#F26522]/80 font-semibold"
                >
                  DTC, DTP, and DTE models
                </Link>
                .
              </p>
              <p>
                <strong className="text-[#0F1C2E]">Independent Community Pharmacy</strong> -
                Independently owned pharmacies that are not affiliated with PBMs, insurers, or group
                purchasing organizations.
              </p>
              <p>
                The critical point: if any channel is excluded from the evaluation, the routing
                cannot be described as &quot;lowest net cost.&quot; A system that evaluates only PBM
                specialty and PBM mail but ignores manufacturer-direct options is not performing a
                complete comparison. A system that excludes independent pharmacy is not evaluating
                all available retail options.
              </p>
            </div>
          </div>

          {/* Why "Real-Time" Matters */}
          <div className="mb-16">
            <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl font-bold text-[#0F1C2E] mb-6">
              Why &quot;Real-Time&quot; Matters
            </h2>
            <p className="font-body text-lg text-muted-foreground leading-relaxed mb-6">
              Timing is the difference between routing and reporting.
            </p>
            <div className="space-y-5 font-body text-lg text-muted-foreground leading-relaxed">
              <p>
                <strong className="text-[#0F1C2E]">Real-time routing</strong> means the evaluation
                happens at the point of decision - when the prescription is received and before it
                is filled. The system evaluates all channels, compares net costs, and routes the
                prescription to the lowest-cost option. The decision is made before the member
                receives the medication.
              </p>
              <p>
                <strong className="text-[#0F1C2E]">Retrospective analysis</strong> means the
                evaluation happens after the fact - in a quarterly review, an annual audit, or a PBM
                performance report. The prescription has already been filled. The plan has already
                paid. The analysis can identify that a lower-cost option existed, but it cannot
                change the outcome.
              </p>
              <p>
                Most PBM reporting is retrospective. Even PBMs that claim &quot;lowest net cost&quot;
                routing are typically comparing within their own channels (specialty vs. mail vs.
                retail) rather than evaluating external channels like manufacturer-direct programs or
                independent pharmacies.
              </p>
            </div>

            <div className="my-10 border-l-4 border-[#F26522] bg-[#F26522]/5 rounded-r-lg px-6 py-5">
              <p className="font-heading text-lg md:text-xl font-bold text-[#0F1C2E]">
                The difference between real-time routing and retrospective analysis is the difference
                between preventing overpayment and discovering it after the fact.
              </p>
            </div>
          </div>

          {/* The Problem With Current "Lowest Net Cost" Claims */}
          <div className="mb-16">
            <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl font-bold text-[#0F1C2E] mb-6">
              The Problem With Current &quot;Lowest Net Cost&quot; Claims
            </h2>
            <p className="font-body text-lg text-muted-foreground leading-relaxed mb-6">
              When a PBM reports that it delivered the &quot;lowest net cost&quot; for a client,
              several questions are worth asking:
            </p>
            <div className="space-y-5 font-body text-lg text-muted-foreground leading-relaxed">
              <p>
                <strong className="text-[#0F1C2E]">Lowest compared to what?</strong> If the
                comparison only includes the PBM&apos;s own channels - its specialty pharmacy, its
                mail-order pharmacy, its contracted retail network - the evaluation is incomplete.
                Manufacturer-direct pricing and independent pharmacy options may offer lower costs
                but are not included in the comparison.
              </p>
              <p>
                <strong className="text-[#0F1C2E]">Lowest at what point in time?</strong> If the
                &quot;lowest net cost&quot; is calculated retrospectively after rebates and DIR fees
                are reconciled, the actual cost at the point of dispensing may have been higher.
                Retroactive adjustments can change the net cost months after the prescription was
                filled.
              </p>
              <p>
                <strong className="text-[#0F1C2E]">Lowest for whom?</strong> A PBM that owns
                pharmacies has a financial incentive to route prescriptions to its own channels, even
                when an independent pharmacy or manufacturer-direct option is cheaper for the plan.
                The PBM&apos;s &quot;lowest net cost&quot; may reflect the lowest cost within its
                vertically integrated operation, not the lowest cost available in the market.
              </p>
              <p>
                <strong className="text-[#0F1C2E]">Who verified it?</strong> If the entity
                reporting &quot;lowest net cost&quot; is the same entity that made the routing
                decision, the plan sponsor is relying on self-reported data. There is no independent
                verification.
              </p>
            </div>
          </div>

          {/* What Decision-Level Documentation Looks Like */}
          <div className="mb-16">
            <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl font-bold text-[#0F1C2E] mb-6">
              What Decision-Level Documentation Looks Like
            </h2>
            <div className="space-y-5 font-body text-lg text-muted-foreground leading-relaxed">
              <p>
                Decision-level documentation is the evidence that lowest-net-cost routing actually
                occurred. For each prescription, the documentation should include:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>All channels that were evaluated</li>
                <li>The net cost calculated for each channel</li>
                <li>
                  The program rules that were applied (formulary, prior authorization, quantity
                  limits, cost-share design)
                </li>
                <li>Which channel was selected and why</li>
                <li>The member&apos;s cost-share amount and how it was calculated</li>
                <li>
                  The financial reconciliation - what the plan paid, what the member paid, what was
                  billed
                </li>
              </ul>
              <p>
                This is not an aggregate report. It is a per-prescription record that can be audited
                individually. If a plan sponsor wants to verify that prescription #47,293 was routed
                to the lowest net cost, they can pull that specific record and see exactly what
                happened.
              </p>
              <p>
                This level of documentation is standard in other financial systems. Securities
                trades have execution reports. Insurance claims have adjudication records. Pharmacy
                benefit decisions - which can involve thousands of dollars per prescription - have
                historically had nothing comparable.
              </p>
            </div>
          </div>

          {/* How Lowest Net Cost Routing Supports Fiduciary Compliance */}
          <div className="mb-16">
            <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl font-bold text-[#0F1C2E] mb-6">
              How Lowest Net Cost Routing Supports Fiduciary Compliance
            </h2>
            <div className="space-y-5 font-body text-lg text-muted-foreground leading-relaxed">
              <p>
                Under ERISA, plan fiduciaries must act with prudence and in the best interest of
                plan participants. The Consolidated Appropriations Act of 2026 requires plan
                sponsors to attest that PBM fees and compensation are reasonable.
              </p>
              <p>
                Decision-level documentation from lowest-net-cost routing provides the specific,
                per-script evidence that fiduciaries need. Rather than relying on aggregate PBM
                reports that summarize overall performance, plan sponsors can point to individual
                routing records that demonstrate each decision was evaluated across all channels and
                routed to the optimal option.
              </p>
            </div>

            <div className="my-10 border-l-4 border-[#F26522] bg-[#F26522]/5 rounded-r-lg px-6 py-5">
              <p className="font-heading text-lg md:text-xl font-bold text-[#0F1C2E]">
                This is the difference between telling a court &quot;our PBM said they saved us
                money&quot; and showing a court &quot;here is the documented proof that each
                prescription was independently evaluated and routed to the lowest net cost.&quot;
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
          <RelatedResources currentHref="/resources/lowest-net-cost-routing" />
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="bg-[#0F1C2E] text-white py-16 md:py-24">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold leading-tight mb-4">
            See Lowest Net Cost Routing in Action
          </h2>
          <p className="font-body text-base sm:text-lg text-white/80 mb-8 max-w-2xl mx-auto">
            ApalyRx evaluates every in-scope prescription across all available channels in real time
            and documents every routing decision.
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
