import type { Metadata } from "next";
import HeroSection from "@/components/HeroSection";
import SectionWrapper from "@/components/SectionWrapper";
import CtaSection from "@/components/CtaSection";
import { TrendingUp, Eye, Shield } from "lucide-react";

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
    icon: TrendingUp,
    borderColor: "border-t-[#F26522]",
    iconBg: "bg-[#F26522]",
  },
  {
    title: "Transparent Reimbursement",
    desc: "ApalyRx operates on a pass-through model. Reimbursement is based on actual acquisition costs plus a fair dispensing fee. No hidden spreads, no retroactive DIR fees, no clawbacks.",
    icon: Eye,
    borderColor: "border-t-[#0F1C2E]",
    iconBg: "bg-[#0F1C2E]",
  },
  {
    title: "No Competing Interests",
    desc: "ApalyRx has no ownership in any dispensing channel. There is no affiliated mail pharmacy, no owned specialty pharmacy, no retail chain competing for the same prescriptions. Your volume is earned, not redirected.",
    icon: Shield,
    borderColor: "border-t-[#F26522]",
    iconBg: "bg-[#F26522]",
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
        <div className="max-w-4xl mx-auto animate-fade-up">
          <h2 className="font-heading text-3xl md:text-[2.5rem] font-bold text-navy mb-6 leading-tight text-center">
            Dispense Directly or Serve as Pharmacy of Record
          </h2>
          <p className="font-body text-[17px] md:text-lg text-muted-foreground leading-relaxed text-center">
            Independent pharmacies in the ApalyRx network can serve in two capacities depending on the program and product. In standard routing, you are the dispensing pharmacy — filling prescriptions that were independently routed to you based on lowest net cost. In manufacturer-direct models, you serve as the pharmacy of record while the product is shipped directly to the member from the manufacturer&apos;s logistics partner. Both roles are critical to maintaining the structural independence that the ApalyRx model requires.
          </p>
        </div>
      </SectionWrapper>

      {/* What This Means For Your Pharmacy */}
      <SectionWrapper bg="white">
        <div className="text-center mb-14 animate-fade-up">
          <h2 className="font-heading text-3xl md:text-[2.5rem] font-bold text-navy leading-tight">
            What This Means For Your Pharmacy
          </h2>
        </div>

        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 stagger-children">
          {benefitCards.map((card) => (
            <div
              key={card.title}
              className={`group bg-white rounded-xl p-6 shadow-lg border border-gray-100 border-t-4 ${card.borderColor} hover:border-[#F26522]/30 hover:shadow-xl transition-all duration-300`}
            >
              <div className={`p-3 rounded-lg ${card.iconBg} text-white w-fit mb-4`}>
                <card.icon className="h-8 w-8" />
              </div>
              <h3 className="font-heading text-xl md:text-2xl font-semibold text-navy mb-3">{card.title}</h3>
              <p className="font-body text-sm md:text-base text-muted-foreground leading-relaxed">{card.desc}</p>
            </div>
          ))}
        </div>
      </SectionWrapper>

      {/* How To Join */}
      <SectionWrapper bg="light">
        <div className="max-w-4xl mx-auto animate-fade-up">
          <h2 className="font-heading text-3xl md:text-[2.5rem] font-bold text-navy mb-6 leading-tight text-center">
            Join the ApalyRx Network
          </h2>
          <p className="font-body text-[17px] md:text-lg text-muted-foreground leading-relaxed text-center">
            Independent community pharmacies interested in participating can reach out to begin onboarding. Requirements include independent ownership (no vertical ties to PBMs, insurers, or GPOs), active state pharmacy licensure, and willingness to accept transparent, pass-through reimbursement terms.
          </p>
        </div>
      </SectionWrapper>

      <CtaSection text="Interested in joining the network?" />
    </>
  );
}
