import type { Metadata } from "next";
import HeroSection from "@/components/HeroSection";
import SectionWrapper from "@/components/SectionWrapper";
import CtaSection from "@/components/CtaSection";
import {
  FileText,
  CheckCircle2,
  DollarSign,
  Receipt,
  Building2,
  Truck,
} from "lucide-react";

export const metadata: Metadata = {
  title: "ApalyRx for Pharmaceutical Manufacturers | Direct-to-Employer Infrastructure",
  description:
    "Turn-key operational infrastructure for manufacturer direct-to-employer drug programs. Eligibility, fulfillment, billing, payment, and accumulator reporting — without building it yourself.",
  openGraph: {
    title: "ApalyRx for Pharmaceutical Manufacturers | Direct-to-Employer Infrastructure",
    description:
      "Turn-key operational infrastructure for manufacturer direct-to-employer drug programs. Eligibility, fulfillment, billing, payment, and accumulator reporting — without building it yourself.",
  },
};

const infrastructure = [
  {
    title: "eRx Intake & Routing",
    desc: "ApalyRx receives electronic prescriptions directly, applies program rules and conversion logic, and routes to the appropriate channel.",
    icon: FileText,
    borderColor: "border-t-[#F26522]",
    iconBg: "bg-[#F26522]",
  },
  {
    title: "Eligibility & Program Validation",
    desc: "Real-time confirmation of participating employer, member eligibility, drug-in-program status, and program parameters.",
    icon: CheckCircle2,
    borderColor: "border-t-[#0F1C2E]",
    iconBg: "bg-[#0F1C2E]",
  },
  {
    title: "Member Cost-Share & Accumulators",
    desc: "Collection of member cost-share and reporting to plan accumulators so the member's benefit experience is seamless and compliant.",
    icon: DollarSign,
    borderColor: "border-t-[#F26522]",
    iconBg: "bg-[#F26522]",
  },
  {
    title: "Medical-Claim Billing",
    desc: "Claims submitted through standard medical billing channels to preserve plan data continuity, reporting, and integration with existing benefit administration.",
    icon: Receipt,
    borderColor: "border-t-[#0F1C2E]",
    iconBg: "bg-[#0F1C2E]",
  },
  {
    title: "Supplier Settlement",
    desc: "Automated payment to manufacturers and suppliers via ACH with transparent, pass-through drug economics. No spread, no markup on drug cost.",
    icon: Building2,
    borderColor: "border-t-[#F26522]",
    iconBg: "bg-[#F26522]",
  },
  {
    title: "Fulfillment Orchestration",
    desc: "Prescriptions routed to licensed independent partner pharmacies serving as dispensing pharmacy or pharmacy of record, with product shipped directly to the member via manufacturer-designated or third-party logistics.",
    icon: Truck,
    borderColor: "border-t-[#0F1C2E]",
    iconBg: "bg-[#0F1C2E]",
  },
];

export default function ManufacturersPage() {
  return (
    <>
      <HeroSection
        headline="Direct-to-Employer Infrastructure, Ready to Go"
        subtitle="Most manufacturers investing in direct-to-employer drug access programs do not have the operational infrastructure to deploy them. ApalyRx provides a turn-key platform — prescription intake, eligibility, fulfillment orchestration, billing, payment, and accumulator reporting — so you can launch programs without building the plumbing."
        primaryCta={{ label: "Request a Conversation", href: "/contact" }}
        pattern="blur"
      />

      {/* The Infrastructure Gap */}
      <SectionWrapper bg="light">
        <div className="max-w-4xl mx-auto animate-fade-up">
          <h2 className="font-heading text-3xl md:text-[2.5rem] font-bold text-navy mb-6 leading-tight text-center">
            The Programs Exist. The Infrastructure Doesn&apos;t.
          </h2>
          <p className="font-body text-[17px] md:text-lg text-muted-foreground leading-relaxed text-center">
            Pharmaceutical manufacturers are investing billions in patient access and affordability — copay programs, patient assistance, direct pricing, and direct-to-employer models. The clinical and economic value is real. But deploying these programs at scale requires operational infrastructure that most manufacturers do not have in-house: electronic prescription intake, program eligibility validation, member cost-share collection, accumulator reporting, medical-claim billing for data continuity, and automated supplier settlement. Without this infrastructure, programs remain outside the benefit — invisible to the plan and inaccessible to eligible patients through normal benefit channels.
          </p>
        </div>
      </SectionWrapper>

      {/* What ApalyRx Provides */}
      <SectionWrapper bg="white">
        <div className="text-center mb-6 animate-fade-up">
          <h2 className="font-heading text-3xl md:text-[2.5rem] font-bold text-navy mb-4 leading-tight">
            End-to-End Operational Infrastructure
          </h2>
          <p className="font-body text-[17px] md:text-lg text-muted-foreground max-w-4xl mx-auto">
            ApalyRx provides the complete operating layer manufacturers need to deploy direct-to-employer programs at scale. We handle the operational complexity so your programs run like a seamless benefit experience — not a parallel vendor workflow.
          </p>
        </div>

        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mt-12 stagger-children">
          {infrastructure.map((item) => (
            <div
              key={item.title}
              className={`group bg-white rounded-xl p-6 shadow-lg border border-gray-100 border-t-4 ${item.borderColor} hover:border-[#F26522]/30 hover:shadow-xl transition-all duration-300`}
            >
              <div className={`p-3 rounded-lg ${item.iconBg} text-white w-fit mb-4`}>
                <item.icon className="h-8 w-8" />
              </div>
              <h3 className="font-heading text-xl md:text-2xl font-semibold text-navy mb-2">{item.title}</h3>
              <p className="font-body text-sm md:text-base text-muted-foreground leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </SectionWrapper>

      {/* How It Works */}
      <SectionWrapper bg="light">
        <div className="max-w-4xl mx-auto animate-fade-up">
          <h2 className="font-heading text-3xl md:text-[2.5rem] font-bold text-navy mb-6 leading-tight text-center">
            A Carve-Out That Behaves Like a Benefit
          </h2>
          <p className="font-body text-[17px] md:text-lg text-muted-foreground leading-relaxed text-center">
            Traditional carve-outs feel like bolt-on services — separate workflows, inconsistent accumulator behavior, fragmented reporting, manual coordination. That friction limits adoption and makes programs difficult to scale. ApalyRx is structured so that programs running outside PBM adjudication still deliver the operational experience stakeholders expect: eligibility validation, cost-share collection, accumulator reporting, claims-based billing, and closed-loop financial reconciliation. The result is a direct-to-employer program that operates like a benefit, not a workaround.
          </p>
        </div>
      </SectionWrapper>

      {/* Partnership Approach */}
      <SectionWrapper bg="white">
        <div className="max-w-4xl mx-auto animate-fade-up">
          <h2 className="font-heading text-3xl md:text-[2.5rem] font-bold text-navy mb-6 leading-tight text-center">
            Built to Complement Your Distribution Strategy
          </h2>
          <p className="font-body text-[17px] md:text-lg text-muted-foreground leading-relaxed text-center">
            ApalyRx works with manufacturers to operationalize direct programs under your commercial terms. You supply product and define program parameters. ApalyRx handles prescription orchestration, program operations, billing, and settlement. Integration is straightforward and designed to complement your existing distribution — not disrupt it. Programs can launch with a single product and expand to additional medications under the same operating framework.
          </p>
        </div>
      </SectionWrapper>

      <CtaSection text="Explore how to operationalize your direct-to-employer programs." />
    </>
  );
}
