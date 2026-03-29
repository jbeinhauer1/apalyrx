import type { Metadata } from "next";
import Link from "next/link";
import WebPageSchema from "@/components/WebPageSchema";
import CredentialStrip from "@/components/CredentialStrip";

export const metadata: Metadata = {
  title: "Independent Pharmacies | Fair Reimbursement, No Clawbacks",
  description:
    "ApalyRx has no competing channel interests. No PBM ownership. No mail-order infrastructure to protect. Fair reimbursement, no clawbacks, and a growing volume of high-cost specialty scripts routed to community pharmacies by design.",
  openGraph: {
    title: "Independent Pharmacies | ApalyRx",
    description:
      "A channel built around your pharmacy, not around ours. Fair reimbursement, no clawbacks, and growing specialty prescription volume.",
    url: "https://www.apalyrx.com/pharmacies",
    siteName: "ApalyRx",
    type: "website",
  },
};

export default function PharmaciesPage() {
  return (
    <>
      <WebPageSchema
        title="ApalyRx for Independent Pharmacies"
        description="A channel built around your pharmacy. Fair reimbursement, no clawbacks, and a growing volume of high-cost specialty scripts."
        url="https://www.apalyrx.com/pharmacies"
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
            For Independent Pharmacies
          </span>
          <div className="w-10 h-[2px] bg-orange mb-8" />
          <h1 className="font-serif text-[34px] md:text-[46px] lg:text-[56px] text-white leading-[1.1] tracking-tighter-display max-w-[680px] mb-6">
            A Channel Built Around Your Pharmacy, Not Around Ours.
          </h1>
          <p className="font-sans text-base md:text-lg text-white/[0.60] max-w-[600px] leading-body mb-10">
            ApalyRx has no competing channel interests. No PBM ownership. No mail-order
            infrastructure to protect. Fair reimbursement, no clawbacks, and a growing volume
            of high-cost specialty scripts routed to community pharmacies by design.
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

      {/* ── SECTION 3: WHY APALYRX ── */}
      <section className="bg-off-white">
        <div className="max-w-content mx-auto px-6 md:px-12 py-16 md:py-24">
          <span className="font-sans text-eyebrow uppercase text-orange block mb-4">
            Why ApalyRx
          </span>
          <h2 className="font-serif text-[28px] md:text-[36px] lg:text-[42px] text-text-primary leading-[1.15] tracking-tight-display mb-12">
            A Platform with No Competing Interests
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-0">
            {/* Column 1 */}
            <div className="border-t border-border pt-8 pb-8 lg:pr-8">
              <h4 className="font-serif text-[19px] text-text-primary leading-[1.3] mb-4">
                Fair Reimbursement
              </h4>
              <p className="font-sans text-sm text-text-secondary leading-relaxed">
                Dispensing fees and pharmacy of record fees set transparently. No spread, no
                clawbacks, no DIR fees. What you are paid when you fill is what you keep.
              </p>
            </div>
            {/* Column 2 */}
            <div className="border-t border-border pt-8 pb-8 lg:px-8 lg:border-l">
              <h4 className="font-serif text-[19px] text-text-primary leading-[1.3] mb-4">
                Designed for Community Pharmacy
              </h4>
              <p className="font-sans text-sm text-text-secondary leading-relaxed">
                The platform prioritizes the member&apos;s local pharmacy. Scripts route to the
                member&apos;s own community pharmacist where possible, preserving the
                patient-pharmacist relationship.
              </p>
            </div>
            {/* Column 3 */}
            <div className="border-t border-border pt-8 pb-8 lg:pl-8 lg:border-l">
              <h4 className="font-serif text-[19px] text-text-primary leading-[1.3] mb-4">
                Two Participation Models
              </h4>
              <p className="font-sans text-sm text-text-secondary leading-relaxed">
                Pharmacy of Record: receive a fee to sign off and release scripts for home
                delivery. Dispensing Pharmacy: receive drug directly and dispense in-person. Both
                models available.
              </p>
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
            Four Steps to Receiving Prescriptions
          </h2>

          <div className="max-w-[640px] space-y-0">
            {[
              {
                num: "01",
                title: "Enroll",
                desc: "Complete the pharmacy partner application. Requirements include independent ownership with no vertical ties to PBMs, insurers, or GPOs, and active state pharmacy licensure.",
              },
              {
                num: "02",
                title: "Receive Routing",
                desc: "Once onboarded, your pharmacy is live on the platform. Prescriptions begin routing to you based on your pricing, service area, and program eligibility.",
              },
              {
                num: "03",
                title: "Review and Release",
                desc: "Conduct drug utilization review, verify the prescription, and provide clinical oversight. In dispensing models, fill and dispense directly. In pharmacy of record models, release for home delivery fulfillment.",
              },
              {
                num: "04",
                title: "Get Paid",
                desc: "Reimbursement at acquisition cost plus a fair dispensing fee, agreed upon upfront. No retroactive adjustments. No DIR fees. No clawbacks. Payment terms are transparent and predictable.",
              },
            ].map((step) => (
              <div key={step.num} className="flex gap-6 py-6 border-b border-border">
                <span className="font-serif text-xs text-orange tracking-[0.06em] pt-1 flex-shrink-0">
                  {step.num}
                </span>
                <div>
                  <h4 className="font-serif text-[19px] text-text-primary leading-[1.3] mb-2">
                    {step.title}
                  </h4>
                  <p className="font-sans text-sm text-text-secondary leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 5: CTA ── */}
      <section className="bg-off-white">
        <div className="max-w-content mx-auto px-6 md:px-12 py-16 md:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <div>
              <span className="font-sans text-eyebrow uppercase text-orange block mb-4">
                Get Started
              </span>
              <h2 className="font-serif text-[28px] md:text-[36px] lg:text-[42px] text-text-primary leading-[1.15] tracking-tight-display mb-6">
                Join the ApalyRx Platform.
              </h2>
              <p className="font-sans text-base text-text-secondary leading-body">
                Independent community pharmacies are the foundation of the ApalyRx model. As more
                employers, health plans, and manufacturers deploy programs through the platform,
                prescription volume flowing to independent pharmacy partners grows. Apply to partner
                and start receiving prescriptions with economics that work for your business.
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
