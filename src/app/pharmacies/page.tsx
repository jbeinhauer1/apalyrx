import type { Metadata } from "next";
import HeroSection from "@/components/HeroSection";
import SectionWrapper from "@/components/SectionWrapper";
import CtaSection from "@/components/CtaSection";

export const metadata: Metadata = {
  title: "ApalyRx for Independent Pharmacies | Dispensing & Pharmacy of Record Network",
  description:
    "Join a network where prescriptions are routed on merit. Dispense directly or serve as pharmacy of record for manufacturer-direct models. Fair, transparent reimbursement.",
  openGraph: {
    title: "ApalyRx for Independent Pharmacies | Dispensing & Pharmacy of Record Network",
    description:
      "Join a network where prescriptions are routed on merit. Dispense directly or serve as pharmacy of record for manufacturer-direct models. Fair, transparent reimbursement.",
  },
};

const benefitCards = [
  {
    title: "Volume From a Growing Network",
    desc: "As more PBMs, employers, health plans, and manufacturers deploy programs through ApalyRx, prescriptions flowing through the network grow. You receive volume because your pricing and service were the best available option.",
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
      </svg>
    ),
  },
  {
    title: "Transparent Reimbursement",
    desc: "ApalyRx operates on a pass-through model. Reimbursement is based on actual acquisition costs plus a fair dispensing fee. No hidden spreads, no retroactive DIR fees, no clawbacks.",
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
  {
    title: "No Competing Interests",
    desc: "ApalyRx has no ownership in any dispensing channel. There is no affiliated mail pharmacy, no owned specialty pharmacy, no retail chain competing for the same prescriptions. Your volume is earned, not redirected.",
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
      </svg>
    ),
  },
];

export default function PharmaciesPage() {
  return (
    <>
      <HeroSection
        headline="Prescriptions Routed on Merit"
        subtitle="ApalyRx routes prescriptions to independent community pharmacies because your pricing and service earned it — not because of channel ownership or network steering."
        primaryCta={{ label: "Request a Conversation", href: "/contact" }}
      />

      {/* Two Roles, One Network */}
      <SectionWrapper bg="light">
        <div className="max-w-3xl mx-auto animate-fade-up">
          <h2 className="text-3xl md:text-[2.5rem] font-bold text-navy mb-6 leading-tight text-center">
            Dispense Directly or Serve as Pharmacy of Record
          </h2>
          <p className="text-[17px] md:text-lg text-body leading-relaxed text-center">
            Independent pharmacies in the ApalyRx network can serve in two capacities depending on the program and product. In standard routing, you are the dispensing pharmacy — filling prescriptions that were independently routed to you based on lowest net cost. In manufacturer-direct models, you serve as the pharmacy of record while the product is shipped directly to the member from the manufacturer&apos;s logistics partner. Both roles are critical to maintaining the structural independence that the ApalyRx model requires.
          </p>
        </div>
      </SectionWrapper>

      {/* What This Means For Your Pharmacy */}
      <SectionWrapper bg="white">
        <div className="text-center mb-14 animate-fade-up">
          <h2 className="text-3xl md:text-[2.5rem] font-bold text-navy leading-tight">
            What This Means For Your Pharmacy
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 stagger-children">
          {benefitCards.map((card) => (
            <div
              key={card.title}
              className="bg-white rounded-xl p-7 shadow-sm border border-gray-100 border-t-4 border-t-orange"
            >
              <div className="w-12 h-12 bg-orange/10 rounded-lg flex items-center justify-center text-orange mb-4">
                {card.icon}
              </div>
              <h3 className="text-xl font-bold text-navy mb-3">{card.title}</h3>
              <p className="text-[16px] text-body leading-relaxed">{card.desc}</p>
            </div>
          ))}
        </div>
      </SectionWrapper>

      {/* How To Join */}
      <SectionWrapper bg="light">
        <div className="max-w-3xl mx-auto animate-fade-up">
          <h2 className="text-3xl md:text-[2.5rem] font-bold text-navy mb-6 leading-tight text-center">
            Join the ApalyRx Network
          </h2>
          <p className="text-[17px] md:text-lg text-body leading-relaxed text-center">
            Independent community pharmacies interested in participating can reach out to begin onboarding. Requirements include independent ownership (no vertical ties to PBMs, insurers, or GPOs), active state pharmacy licensure, and willingness to accept transparent, pass-through reimbursement terms.
          </p>
        </div>
      </SectionWrapper>

      <CtaSection text="Interested in joining the network?" />
    </>
  );
}
