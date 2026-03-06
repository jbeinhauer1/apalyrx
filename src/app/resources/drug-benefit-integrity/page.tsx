import type { Metadata } from "next";
import Link from "next/link";
import FaqAccordion from "@/components/FaqAccordion";
import WebPageSchema from "@/components/WebPageSchema";
import FaqSchema from "@/components/FaqSchema";
import ArticleSchema from "@/components/ArticleSchema";
import RelatedResources from "@/components/RelatedResources";
import {
  Shield,
  Route,
  Building2,
  Package,
  Store,
  FileCheck,
  CheckCircle2,
} from "lucide-react";

export const metadata: Metadata = {
  title:
    "Drug Benefit Integrity (DBI): The Five-Requirement Standard for Pharmacy Benefits",
  description:
    "Drug Benefit Integrity (DBI) is an independent standard with five structural requirements ensuring pharmacy benefit decisions are made in the plan's interest. Learn the five requirements, why transparency alone isn't enough, and how DBI compares to integrity standards in financial services.",
  openGraph: {
    title: "Drug Benefit Integrity (DBI) Standard | ApalyRx",
    description:
      "Five structural requirements ensuring pharmacy benefit decisions are made in the plan's interest. The independent standard for drug benefit verification.",
    url: "https://www.apalyrx.com/resources/drug-benefit-integrity",
    siteName: "ApalyRx",
    type: "website",
  },
};

const faqItems = [
  {
    question: "What does \"Drug Benefit Integrity\" mean?",
    answer:
      "Drug Benefit Integrity (DBI) is an independent standard with five structural requirements for ensuring that pharmacy benefit decisions are made in the plan's interest. It goes beyond transparency by requiring independent, real-time verification of every routing decision.",
  },
  {
    question: "How is DBI different from PBM transparency?",
    answer:
      "Transparency means seeing the data - rebate reports, spread pricing disclosures, compensation summaries. DBI means independently verifying that each prescription routing decision was optimal. Transparency shows you what happened. DBI proves the decision was sound.",
  },
  {
    question: "Who created the DBI standard?",
    answer:
      "The DBI standard was developed as an independent framework for evaluating whether pharmacy benefit operations meet structural requirements for integrity. It is not owned or controlled by any single company.",
  },
  {
    question: "Does DBI replace my PBM?",
    answer:
      "No. DBI is a verification standard, not a replacement for PBM services. An entity that meets the DBI standard operates alongside existing PBMs and TPAs, independently verifying routing decisions without replacing the underlying benefit infrastructure.",
  },
  {
    question: "How does DBI help with ERISA fiduciary compliance?",
    answer:
      "ERISA requires plan fiduciaries to act prudently and in the best interest of plan participants. DBI provides decision-level documentation for every prescription - the specific evidence plan sponsors need to demonstrate that each benefit decision was independently verified as optimal.",
  },
  {
    question: "What are the five requirements of DBI?",
    answer:
      "The five requirements are: (1) real-time routing to lowest net cost across all channels, (2) pharmacy-licensed operator with no channel ownership, (3) manufacturer-direct programs built into the benefit, (4) fulfillment through independent community pharmacies, and (5) decision-level records for every prescription.",
  },
  {
    question: "Can a PBM meet the DBI standard?",
    answer:
      "A PBM would need to meet all five requirements, including having no ownership interest in any dispensing channel. Since the three largest PBMs own retail, mail-order, and specialty pharmacies, they cannot meet the channel independence requirement. A structurally independent PBM without channel ownership could potentially qualify.",
  },
  {
    question:
      "How does DBI relate to the Consolidated Appropriations Act of 2026?",
    answer:
      "CAA 2026 requires PBM compensation disclosure and rebate pass-through. DBI complements these requirements by providing the independent verification layer that proves disclosed information is accurate and that routing decisions serve the plan's interest.",
  },
];

const fiveRequirements = [
  {
    icon: Route,
    num: "1",
    title: "Real-Time Routing to Lowest Net Cost Across All Channels",
    content: [
      "Every in-scope prescription must be evaluated across all available fulfillment channels at the point of decision - not retrospectively, not in an annual audit, and not by sampling. The channels evaluated must include PBM specialty, PBM mail-order, retail pharmacy, manufacturer-direct programs, and independent pharmacy.",
      "The routing decision must be based on actual net cost after all discounts, fees, and rebates - not list price, not AWP, not an estimated average.",
    ],
    why: "Retrospective analysis can identify patterns, but it cannot change the decision that was already made. Real-time routing ensures the lowest-cost channel is selected before the prescription is filled, not after.",
  },
  {
    icon: Building2,
    num: "2",
    title: "Pharmacy-Licensed Operator With No Channel Ownership",
    content: [
      "The entity performing the routing evaluation must hold appropriate pharmacy licensure and must have no ownership interest in any dispensing channel - no retail pharmacies, no mail-order pharmacies, no specialty pharmacies, no infusion centers.",
    ],
    why: "If the routing entity owns a pharmacy, it has a financial incentive to route prescriptions to its own channel regardless of cost. Structural independence eliminates this conflict at the entity level, not just the transaction level.",
  },
  {
    icon: Package,
    num: "3",
    title: "Manufacturer-Direct Programs Built Into the Benefit",
    content: [
      "Manufacturer copay programs, patient assistance programs, and direct pricing must be evaluated alongside traditional channels as part of the routing decision - not treated as out-of-benefit workarounds.",
    ],
    why: "Manufacturers invest billions in programs designed to lower costs for patients and plans. But these programs typically sit outside PBM adjudication, invisible to the benefit. If manufacturer-direct options are not included in the routing evaluation, the \"lowest net cost\" calculation is incomplete by definition.",
  },
  {
    icon: Store,
    num: "4",
    title: "Fulfilled Through Independent Community Pharmacies",
    content: [
      "Prescriptions that are dispensed through a retail pharmacy must be filled by independently owned community pharmacies that have no vertical ties to PBMs, insurers, or group purchasing organizations.",
    ],
    why: "Independent pharmacies face below-cost reimbursement, retroactive clawbacks, and network exclusion from vertically integrated PBMs. Requiring independent pharmacy fulfillment ensures that the dispensing channel has no financial relationship with the entity that manages the benefit. It also addresses the pharmacy desert crisis - nearly 30% of independent pharmacies closed between 2010 and 2021.",
  },
  {
    icon: FileCheck,
    num: "5",
    title: "Decision-Level Records for Every Prescription",
    content: [
      "Every routing decision must produce a complete, auditable record documenting: which channels were evaluated, what the net cost was in each channel, which program rules were applied, why the selected channel was chosen, and the complete financial reconciliation.",
    ],
    why: "This is the proof mechanism. Without decision-level documentation, there is no way to independently verify that any individual prescription was routed optimally. Aggregate reporting - \"we saved the plan 20% overall\" - cannot demonstrate that each decision was sound. Decision-level records provide the granular, per-script evidence that plan fiduciaries need to demonstrate prudent oversight under ERISA and the Consolidated Appropriations Act.",
  },
];

export default function DrugBenefitIntegrityPage() {
  return (
    <>
      <WebPageSchema
        title="Drug Benefit Integrity (DBI): The Five-Requirement Standard for Pharmacy Benefits"
        description="An independent standard with five structural requirements ensuring pharmacy benefit decisions are made in the plan's interest."
        url="https://www.apalyrx.com/resources/drug-benefit-integrity"
      />
      <ArticleSchema
        headline="Drug Benefit Integrity (DBI): The Five-Requirement Standard for Pharmacy Benefits"
        description="An independent standard with five structural requirements ensuring pharmacy benefit decisions are made in the plan's interest."
        url="https://www.apalyrx.com/resources/drug-benefit-integrity"
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
            <Shield className="w-4 h-4" />
            <span className="font-heading">Industry Standard</span>
          </div>
          <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-white mb-6">
            Drug Benefit Integrity (DBI)
          </h1>
          <p className="font-body text-base sm:text-lg md:text-xl text-white/80 max-w-3xl mx-auto leading-relaxed">
            Drug Benefit Integrity is an independent standard with five structural requirements for
            ensuring that pharmacy benefit decisions are made in the plan&apos;s interest - not the
            vendor&apos;s, the channel&apos;s, or the intermediary&apos;s. It establishes a framework for
            verifying that each prescription routing decision is independently documented,
            structurally sound, and free of conflicting financial interest.
          </p>
        </div>
      </section>

      {/* Article Body */}
      <section className="bg-white">
        <div className="max-w-4xl mx-auto px-4 py-16 md:py-24">
          {/* Why the Industry Needs an Integrity Standard */}
          <div className="mb-16">
            <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl font-bold text-[#0F1C2E] mb-6">
              Why the Industry Needs an Integrity Standard
            </h2>
            <div className="space-y-5 font-body text-lg text-muted-foreground leading-relaxed">
              <p>
                Pharmacy benefits in the United States now exceed $650 billion annually. Three
                vertically integrated companies process roughly 80% of all prescriptions, operating
                PBMs, specialty pharmacies, mail-order pharmacies, and insurance plans under the same
                corporate umbrella.
              </p>
              <p>
                This level of concentration creates a structural challenge: the entity making
                prescription routing decisions often has a financial interest in where the
                prescription is filled. The same company that decides which pharmacy a patient uses
                may also own that pharmacy.
              </p>
              <p>
                Regulators have responded with transparency requirements. The Consolidated
                Appropriations Act of 2026 mandates PBM compensation disclosure, 100% rebate
                pass-through, and semiannual reporting to plan sponsors. The Department of Labor has
                proposed rules requiring PBMs to disclose all direct and indirect compensation.
                States like California have imposed fiduciary duties on PBMs directly.
              </p>
              <p>
                These are meaningful reforms. But they address visibility, not verification. They
                tell plan sponsors what happened - they do not prove that what happened was in the
                plan&apos;s interest.
              </p>
            </div>

            {/* Callout */}
            <div className="my-10 border-l-4 border-[#F26522] bg-[#F26522]/5 rounded-r-lg px-6 py-5">
              <p className="font-heading text-lg md:text-xl font-bold text-[#0F1C2E]">
                Transparency tells you what happened. Integrity proves the decision was sound.
              </p>
            </div>

            <div className="space-y-5 font-body text-lg text-muted-foreground leading-relaxed">
              <p>
                Every other major financial system has recognized this distinction:
              </p>
              <p>
                <strong className="text-[#0F1C2E]">Securities markets</strong> require independent
                clearing and settlement. The entity executing a trade cannot also verify that the
                trade was executed at the best available price.
              </p>
              <p>
                <strong className="text-[#0F1C2E]">Investment advisors</strong> must demonstrate
                &quot;best execution&quot; - independent documentation that each transaction was routed to
                achieve the most favorable terms for the client.
              </p>
              <p>
                <strong className="text-[#0F1C2E]">Banking</strong> requires independent audits. The
                entity managing deposits cannot also certify its own compliance.
              </p>
              <p>
                Pharmacy benefits - a system larger than many of these financial markets - has no
                structural equivalent. Plan sponsors receive reports from the same entity that made
                the decisions being reported. There is no independent verification layer.
              </p>
              <p>Drug Benefit Integrity fills that gap.</p>
            </div>
          </div>

          {/* The Five Requirements */}
          <div className="mb-16">
            <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl font-bold text-[#0F1C2E] mb-4">
              The Five Requirements
            </h2>
            <p className="font-body text-lg text-muted-foreground leading-relaxed mb-10">
              DBI is defined by five structural requirements. All five must be met simultaneously.
              Meeting four out of five is not sufficient - each requirement exists because the
              others depend on it.
            </p>

            <div className="space-y-12">
              {fiveRequirements.map((req) => (
                <div key={req.num}>
                  <div className="flex items-start gap-4 mb-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-[#F26522]/10 flex items-center justify-center">
                      <req.icon className="w-5 h-5 text-[#F26522]" />
                    </div>
                    <h3 className="font-heading text-xl md:text-2xl font-bold text-[#0F1C2E]">
                      {req.num}. {req.title}
                    </h3>
                  </div>
                  <div className="space-y-4 font-body text-lg text-muted-foreground leading-relaxed ml-14">
                    {req.content.map((p, i) => (
                      <p key={i}>{p}</p>
                    ))}
                  </div>
                  <div className="mt-4 ml-14 border-l-4 border-[#F26522] bg-[#F26522]/5 rounded-r-lg px-6 py-4">
                    <p className="font-body text-base text-muted-foreground leading-relaxed">
                      <strong className="text-[#0F1C2E]">Why this matters:</strong> {req.why}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Transparency vs. Integrity */}
          <div className="mb-16">
            <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl font-bold text-[#0F1C2E] mb-6">
              Transparency vs. Integrity
            </h2>
            <div className="space-y-5 font-body text-lg text-muted-foreground leading-relaxed">
              <p>
                The distinction between transparency and integrity is the central insight behind
                DBI.
              </p>
              <p>
                <strong className="text-[#0F1C2E]">Transparency</strong> means the plan sponsor can
                see the data: spread pricing disclosures, rebate reports, compensation summaries,
                formulary details. Transparency reforms - including CAA 2026, the DOL proposed rule,
                and state PBM laws - are significant and necessary. They give plan sponsors more
                visibility than they have ever had.
              </p>
              <p>
                But transparency alone has a structural limitation: the plan sponsor is reviewing
                reports generated by the same entity whose decisions are being evaluated. The PBM
                reports on its own routing decisions. The PBM reports on its own rebate
                pass-through. The PBM reports on its own compensation.
              </p>
              <p>
                <strong className="text-[#0F1C2E]">Integrity</strong> means an independent entity
                verifies that each decision was made in the plan&apos;s interest - in real time, at the
                point of decision, with no financial interest in the outcome. The verification is
                structural, not contractual. It does not depend on the vendor&apos;s willingness to
                cooperate or the plan sponsor&apos;s ability to negotiate better contract language.
              </p>
            </div>

            <div className="my-10 border-l-4 border-[#F26522] bg-[#F26522]/5 rounded-r-lg px-6 py-5">
              <p className="font-heading text-lg md:text-xl font-bold text-[#0F1C2E]">
                Transparency is necessary. Integrity is sufficient.
              </p>
            </div>
          </div>

          {/* Who Meets the DBI Standard */}
          <div className="mb-16">
            <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl font-bold text-[#0F1C2E] mb-6">
              Who Meets the DBI Standard
            </h2>
            <div className="space-y-5 font-body text-lg text-muted-foreground leading-relaxed">
              <p>
                ApalyRx is currently the only entity that meets all five requirements of the Drug
                Benefit Integrity standard.
              </p>
              <p>
                ApalyRx operates as a pharmacy-licensed platform (Texas Class-G Centralized
                Prescription Processing Pharmacy) that works alongside existing PBMs and TPAs. It
                evaluates every in-scope prescription across all available channels in real time,
                includes manufacturer-direct programs in the routing evaluation, fulfills through
                independent community pharmacies, and produces decision-level documentation for
                every script.
              </p>
              <p>
                ApalyRx does not own pharmacies. It does not retain rebates. It does not operate
                mail-order or specialty dispensing. Its routing decisions are structurally independent
                - the evaluation has no financial interest in the outcome.
              </p>
            </div>
          </div>

          {/* How DBI Relates to Current Regulatory Reform */}
          <div className="mb-16">
            <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl font-bold text-[#0F1C2E] mb-6">
              How DBI Relates to Current Regulatory Reform
            </h2>
            <div className="space-y-5 font-body text-lg text-muted-foreground leading-relaxed">
              <p>
                DBI is not a replacement for regulatory reform. It is complementary infrastructure.
              </p>
              <p>
                <strong className="text-[#0F1C2E]">CAA 2026</strong> requires PBM compensation
                disclosure and rebate pass-through. DBI provides the independent verification layer
                that proves the disclosed information is accurate and that routing decisions reflect
                the plan&apos;s interest.
              </p>
              <p>
                <strong className="text-[#0F1C2E]">The DOL proposed rule</strong> requires PBMs to
                disclose direct and indirect compensation. DBI provides the per-decision
                documentation that allows plan sponsors to verify compensation disclosures against
                actual routing behavior.
              </p>
              <p>
                <strong className="text-[#0F1C2E]">ERISA fiduciary duty</strong> requires plan
                sponsors to act with prudence and in the best interest of plan participants. DBI
                provides the decision-level evidence that demonstrates prudent oversight - not just
                that the plan sponsor asked for transparency, but that each benefit decision was
                independently verified as optimal.
              </p>
              <p>
                <strong className="text-[#0F1C2E]">State PBM laws</strong> (California SB 41,
                Arkansas Act 1114, and others) impose fiduciary duties and transparency requirements
                on PBMs. DBI provides the structural standard against which PBM compliance can be
                measured.
              </p>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="mb-16">
            <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl font-bold text-[#0F1C2E] mb-8">
              Frequently Asked Questions
            </h2>
            <FaqAccordion items={faqItems} />
          </div>

          {/* Related Resources */}
          <RelatedResources currentHref="/resources/drug-benefit-integrity" />

          {/* External resource link */}
          <div className="text-center mb-8">
            <a
              href="https://drugbenefitintegrity.com"
              target="_blank"
              rel="noopener noreferrer"
              className="font-heading text-[#F26522] hover:text-[#F26522]/80 font-semibold transition-all duration-300"
            >
              Visit drugbenefitintegrity.com for additional resources &rarr;
            </a>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="bg-[#0F1C2E] text-white py-16 md:py-24">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold leading-tight mb-4">
            Learn How Drug Benefit Integrity Works in Practice
          </h2>
          <p className="font-body text-base sm:text-lg text-white/80 mb-8 max-w-2xl mx-auto">
            See how ApalyRx meets all five DBI requirements and produces decision-level
            documentation for every prescription.
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
