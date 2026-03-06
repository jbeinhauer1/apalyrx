import type { Metadata } from "next";
import Link from "next/link";
import FaqAccordion from "@/components/FaqAccordion";
import WebPageSchema from "@/components/WebPageSchema";
import FaqSchema from "@/components/FaqSchema";
import ArticleSchema from "@/components/ArticleSchema";
import RelatedResources from "@/components/RelatedResources";
import { Building2, CheckCircle2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Direct-to-Employer Drug Programs (DTE): What Employers Need to Know",
  description:
    "Direct-to-employer (DTE) drug programs let manufacturers bypass PBMs and offer pricing directly to employer-sponsored plans. Learn how DTE works, how it differs from DTC and DTP, what infrastructure is required, and how to bring these programs inside the benefit.",
  openGraph: {
    title: "Direct-to-Employer Drug Programs (DTE) Explained | ApalyRx",
    description:
      "Manufacturers are going direct. Learn what DTE means, how it compares to DTC and DTP, and what employers need to bring these programs inside the benefit.",
    url: "https://www.apalyrx.com/resources/direct-to-employer-drug-programs",
    siteName: "ApalyRx",
    type: "website",
  },
};

const faqItems = [
  {
    question: 'What does "Direct-to-Employer" (DTE) mean in pharmacy benefits?',
    answer:
      "DTE is a model where pharmaceutical manufacturers contract directly with employer-sponsored health plans to offer medication pricing that bypasses traditional PBM adjudication. The employer gets a negotiated price, and the transaction is integrated into the benefit so member cost-share applies to deductibles and accumulators.",
  },
  {
    question: "How is DTE different from DTC and DTP?",
    answer:
      "DTC (Direct-to-Consumer) sells to individual consumers outside the benefit. DTP (Direct-to-Patient) adds telehealth and clinical services but typically still sits outside the benefit. DTE integrates directly with the employer's plan, making manufacturer pricing part of the covered benefit.",
  },
  {
    question: "What medications are available through DTE programs?",
    answer:
      "Currently, DTE programs are most common for high-cost specialty medications and GLP-1 drugs for obesity and diabetes. Manufacturers including Eli Lilly, Novo Nordisk, AstraZeneca, and Pfizer have announced or launched direct pricing programs. The category is expanding rapidly.",
  },
  {
    question: "Does DTE replace my PBM?",
    answer:
      "No. DTE is an additional channel that can be evaluated alongside PBM specialty, PBM mail, retail, and independent pharmacy. The PBM continues to manage the broader formulary. DTE is most relevant for the high-cost drugs where the manufacturer's direct price may be lower than the PBM net cost.",
  },
  {
    question: "How does ApalyRx enable DTE programs?",
    answer:
      "ApalyRx provides the turn-key infrastructure to bring DTE programs inside the benefit - eRx intake, eligibility verification, cost-share collection, accumulator reporting, medical claim billing, and supplier settlement. It evaluates DTE alongside all other channels in real time and documents every routing decision.",
  },
  {
    question: "What is the Pharmacy of Record model?",
    answer:
      "In a Pharmacy of Record (POR) structure, an independent community pharmacy performs clinical functions - drug utilization review, patient counseling, medication therapy management - while the physical medication ships from the manufacturer's logistics network. The pharmacy earns a POR fee for clinical services.",
  },
  {
    question: "Is DTE compliant with ERISA and CAA 2026?",
    answer:
      "When properly integrated into the benefit with accumulator reporting, claims data continuity, and decision-level documentation, DTE programs can support ERISA fiduciary compliance. The key is infrastructure that treats DTE as a verified channel option, not an unaudited side arrangement.",
  },
];

export default function DTEPage() {
  return (
    <>
      <WebPageSchema
        title="Direct-to-Employer Drug Programs (DTE): What Employers Need to Know"
        description="Direct-to-employer drug programs let manufacturers bypass PBMs and offer pricing directly to employer-sponsored plans."
        url="https://www.apalyrx.com/resources/direct-to-employer-drug-programs"
      />
      <ArticleSchema
        headline="Direct-to-Employer Drug Programs (DTE): What Employers Need to Know"
        description="Direct-to-employer drug programs let manufacturers bypass PBMs and offer pricing directly to employer-sponsored plans."
        url="https://www.apalyrx.com/resources/direct-to-employer-drug-programs"
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
            <Building2 className="w-4 h-4" />
            <span className="font-heading">Education</span>
          </div>
          <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-white mb-6">
            Direct-to-Employer Drug Programs (DTE)
          </h1>
          <p className="font-body text-base sm:text-lg md:text-xl text-white/80 max-w-3xl mx-auto leading-relaxed">
            The pharmaceutical supply chain is changing. Manufacturers are building direct channels
            to reach patients - and increasingly, to reach the employers who fund their benefits.
            Direct-to-Employer (DTE) programs represent a structural shift in how high-cost
            medications are priced, accessed, and delivered. For employers managing pharmacy spend,
            understanding this shift is no longer optional.
          </p>
        </div>
      </section>

      {/* Article Body */}
      <section className="bg-white">
        <div className="max-w-4xl mx-auto px-4 py-16 md:py-24">
          {/* Three Direct Channels */}
          <div className="mb-16">
            <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl font-bold text-[#0F1C2E] mb-6">
              Three Direct Channels: DTC, DTP, and DTE
            </h2>
            <p className="font-body text-lg text-muted-foreground leading-relaxed mb-8">
              The industry uses three related but distinct terms for manufacturer-direct programs.
              Understanding the differences matters because each has different implications for
              employer plans, member experience, and benefit integration.
            </p>

            <h3 className="font-heading text-xl md:text-2xl font-bold text-[#0F1C2E] mb-4">
              Direct-to-Consumer (DTC)
            </h3>
            <p className="font-body text-lg text-muted-foreground leading-relaxed mb-8">
              DTC programs make medications available to individual consumers at manufacturer-set
              prices, typically through a dedicated website or coupon program. Examples include
              TrumpRx, GoodRx manufacturer pricing, and manufacturer copay cards. The consumer pays
              cash or uses a coupon. The transaction sits entirely outside the employer-sponsored
              benefit - it does not apply to deductibles or out-of-pocket maximums, and it is
              invisible to the plan.
            </p>

            <h3 className="font-heading text-xl md:text-2xl font-bold text-[#0F1C2E] mb-4">
              Direct-to-Patient (DTP)
            </h3>
            <p className="font-body text-lg text-muted-foreground leading-relaxed mb-8">
              DTP programs add clinical services to the DTC model. The manufacturer or a partner
              provides telehealth for diagnosis and prescribing, then manages the prescription,
              shipping, patient support, and ongoing monitoring. LillyDirect and NovoCare are
              prominent DTP examples. Eli Lilly reports that a significant and growing share of
              Zepbound prescriptions now come through its direct platform. Like DTC, most DTP
              programs currently sit outside the employer benefit.
            </p>

            <h3 className="font-heading text-xl md:text-2xl font-bold text-[#0F1C2E] mb-4">
              Direct-to-Employer (DTE)
            </h3>
            <div className="space-y-5 font-body text-lg text-muted-foreground leading-relaxed mb-8">
              <p>
                DTE programs contract directly with employer-sponsored health plans, offering
                manufacturer pricing that bypasses traditional PBM adjudication. The employer gets a
                negotiated price - often significantly below the PBM net cost - and the transaction
                is integrated into the benefit. Member cost-share applies to deductibles and
                accumulators. The plan sponsor has visibility into the actual cost.
              </p>
              <p>
                DTE is the model with the most significant implications for employer pharmacy
                benefits because it brings manufacturer pricing inside the benefit structure rather
                than operating as a parallel cash-pay workaround.
              </p>
            </div>
          </div>

          {/* Why Manufacturers Are Going Direct */}
          <div className="mb-16">
            <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl font-bold text-[#0F1C2E] mb-6">
              Why Manufacturers Are Going Direct
            </h2>
            <p className="font-body text-lg text-muted-foreground leading-relaxed mb-6">
              Three forces are driving the shift toward direct channels:
            </p>
            <div className="space-y-5 font-body text-lg text-muted-foreground leading-relaxed">
              <p>
                <strong className="text-[#0F1C2E]">
                  PBM economics no longer serve manufacturer interests in every category.
                </strong>{" "}
                For high-cost specialty and GLP-1 medications, manufacturers have found that PBM
                formulary placement - which traditionally required large rebates - is not the only
                path to market access. Direct channels offer an alternative that can be more
                cost-effective for the manufacturer while delivering a lower net price to the
                employer and patient.
              </p>
              <p>
                <strong className="text-[#0F1C2E]">
                  Regulatory tailwinds are accelerating direct models.
                </strong>{" "}
                In January 2026, HHS issued guidance clarifying that manufacturers can offer
                lower-cost drugs directly to patients - including Medicare and Medicaid enrollees -
                in a manner that is low risk under the federal anti-kickback statute. The
                Consolidated Appropriations Act of 2026 requires 100% rebate pass-through, which
                reduces the financial advantage of rebate-heavy PBM arrangements. TrumpRx launched
                in February 2026 with most-favored-nation pricing from major manufacturers.
              </p>
              <p>
                <strong className="text-[#0F1C2E]">The economics are compelling.</strong> When a
                manufacturer sells a GLP-1 medication through the traditional PBM channel, the list
                price may be $1,000+ per month, with a rebate returning 50-70% to the plan. The
                employer&apos;s net cost after rebate might be $400. Through a DTE program, the
                manufacturer might offer the same medication at $350 with no rebate - a lower net
                cost with complete price transparency and no reconciliation required.
              </p>
            </div>
          </div>

          {/* The Problem With Current DTE Models */}
          <div className="mb-16">
            <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl font-bold text-[#0F1C2E] mb-6">
              The Problem With Current DTE Models
            </h2>
            <p className="font-body text-lg text-muted-foreground leading-relaxed mb-6">
              Most current DTE models have a critical gap: they exist outside the employer&apos;s
              benefit infrastructure. This creates several problems:
            </p>
            <div className="space-y-5 font-body text-lg text-muted-foreground leading-relaxed">
              <p>
                <strong className="text-[#0F1C2E]">Accumulator disconnection.</strong> If a
                member&apos;s cost-share for a DTE prescription does not apply to their deductible or
                out-of-pocket maximum, the member is effectively paying twice - once for the DTE
                medication and again toward a deductible that does not reflect their actual spending.
              </p>
              <p>
                <strong className="text-[#0F1C2E]">No integration with plan administration.</strong>{" "}
                DTE transactions that sit outside the TPA&apos;s claims system create data gaps. The
                employer cannot see the full picture of its pharmacy spend. The TPA cannot
                coordinate benefits. Stop-loss carriers cannot assess exposure.
              </p>
              <p>
                <strong className="text-[#0F1C2E]">No independent verification.</strong> When a DTE
                program claims to offer the &quot;lowest price,&quot; there is no independent mechanism to
                verify that claim against all other available channels in real time. The employer is
                trusting the manufacturer&apos;s assertion rather than seeing a comparative evaluation.
              </p>
              <p>
                <strong className="text-[#0F1C2E]">Pharmacy exclusion.</strong> Most
                manufacturer-direct models use one or two nationally contracted mail-order
                pharmacies - typically CenterWell or CoAssist. Independent community pharmacies are
                cut out of the supply chain entirely, even though they are often the patient&apos;s
                preferred and most accessible dispensing point.
              </p>
            </div>
          </div>

          {/* What Infrastructure Is Required */}
          <div className="mb-16">
            <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl font-bold text-[#0F1C2E] mb-6">
              What Infrastructure Is Required to Bring DTE Inside the Benefit
            </h2>
            <p className="font-body text-lg text-muted-foreground leading-relaxed mb-6">
              For DTE to work as a true benefit integration - not just a cash-pay workaround -
              several operational components must be in place:
            </p>
            <div className="space-y-5 font-body text-lg text-muted-foreground leading-relaxed">
              <p>
                <strong className="text-[#0F1C2E]">eRx intake.</strong> The system must receive
                prescriptions through the standard e-prescribing workflow (NCPDP SCRIPT), just like
                any other pharmacy channel. Prescribers should not need to use a separate process.
              </p>
              <p>
                <strong className="text-[#0F1C2E]">Eligibility verification.</strong> The
                member&apos;s benefit eligibility must be verified in real time against the employer&apos;s
                plan enrollment data.
              </p>
              <p>
                <strong className="text-[#0F1C2E]">Cost-share calculation and collection.</strong>{" "}
                The member&apos;s cost-share (copay, coinsurance, deductible application) must be
                calculated according to the plan&apos;s benefit design and collected at the point of
                service.
              </p>
              <p>
                <strong className="text-[#0F1C2E]">Accumulator reporting.</strong> The member&apos;s
                cost-share must be reported to the plan&apos;s accumulators - deductible, out-of-pocket
                maximum - so it is reflected in their benefit status across all providers.
              </p>
              <p>
                <strong className="text-[#0F1C2E]">Medical claim billing.</strong> The plan&apos;s
                portion must be billed through the TPA&apos;s medical claims system for data continuity,
                stop-loss reporting, and financial reconciliation.
              </p>
              <p>
                <strong className="text-[#0F1C2E]">Supplier settlement.</strong> Payment to the
                manufacturer or its logistics partner must be processed with transparent,
                pass-through economics - no spread, no retained margin.
              </p>
              <p>
                <strong className="text-[#0F1C2E]">Decision-level documentation.</strong> For each
                prescription routed through a DTE channel, the system must document why that channel
                was selected, what other channels were evaluated, and what the net cost comparison
                showed.
              </p>
            </div>

            <div className="my-10 border-l-4 border-[#F26522] bg-[#F26522]/5 rounded-r-lg px-6 py-5">
              <p className="font-heading text-lg md:text-xl font-bold text-[#0F1C2E]">
                Without this infrastructure, DTE is just a manufacturer coupon dressed up as a
                benefit. With it, DTE becomes a genuine channel option that can be evaluated
                alongside PBM specialty, PBM mail, retail, and independent pharmacy.
              </p>
            </div>
          </div>

          {/* The Role of Independent Pharmacy */}
          <div className="mb-16">
            <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl font-bold text-[#0F1C2E] mb-6">
              The Role of Independent Pharmacy in DTE
            </h2>
            <div className="space-y-5 font-body text-lg text-muted-foreground leading-relaxed">
              <p>
                One of the most overlooked aspects of DTE is what happens at the pharmacy level. In
                most manufacturer-direct models, the medication ships from the manufacturer&apos;s
                logistics partner directly to the patient. The local pharmacy is bypassed entirely.
              </p>
              <p>
                This creates a structural problem: the patient loses their relationship with their
                community pharmacist, and the independent pharmacy loses revenue from prescriptions
                it would otherwise dispense.
              </p>
              <p>
                An alternative model preserves independent pharmacy involvement through a Pharmacy
                of Record (POR) structure. In this model, the independent pharmacy performs the
                clinical functions - drug utilization review, patient counseling, medication therapy
                management - while the physical product ships from the manufacturer&apos;s logistics
                network. The pharmacy earns a POR fee for clinical services rather than a dispensing
                margin.
              </p>
              <p>
                This structure keeps independent pharmacies inside the DTE supply chain, maintains
                the patient-pharmacist relationship, and ensures clinical oversight at the local
                level - while still delivering the cost advantages of manufacturer-direct pricing.
              </p>
            </div>
          </div>

          {/* How DTE Relates to Drug Benefit Integrity */}
          <div className="mb-16">
            <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl font-bold text-[#0F1C2E] mb-6">
              How DTE Relates to Drug Benefit Integrity
            </h2>
            <div className="space-y-5 font-body text-lg text-muted-foreground leading-relaxed">
              <p>
                The{" "}
                <Link
                  href="/resources/drug-benefit-integrity"
                  className="text-[#F26522] hover:text-[#F26522]/80 font-semibold"
                >
                  Drug Benefit Integrity (DBI)
                </Link>{" "}
                standard requires that manufacturer-direct programs be evaluated alongside all other
                channels at the point of decision - not treated as a separate, out-of-benefit
                program. This is DBI&apos;s third requirement.
              </p>
              <p>
                When DTE programs are integrated into the routing evaluation, the plan sponsor can
                see the actual net cost comparison: DTE price vs. PBM specialty price vs. PBM mail
                price vs. retail price. The routing decision is documented, and the plan sponsor has
                proof that the selected channel - whether DTE or not - was the lowest net cost
                option.
              </p>
              <p>
                Without this integration, DTE programs exist in a parallel universe where the
                employer trusts the manufacturer&apos;s pricing claim without independent verification.
                With DBI-compliant infrastructure, DTE becomes one evaluated channel among many -
                and the plan sponsor has the decision-level documentation to prove it.
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
          <RelatedResources currentHref="/resources/direct-to-employer-drug-programs" />
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="bg-[#0F1C2E] text-white py-16 md:py-24">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold leading-tight mb-4">
            Bring Manufacturer-Direct Programs Inside Your Benefit
          </h2>
          <p className="font-body text-base sm:text-lg text-white/80 mb-8 max-w-2xl mx-auto">
            See how ApalyRx provides turn-key DTE infrastructure with real-time routing across all
            channels.
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
