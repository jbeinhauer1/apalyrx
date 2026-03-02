import type { Metadata } from "next";
import HeroSection from "@/components/HeroSection";
import SectionWrapper from "@/components/SectionWrapper";
import CtaSection from "@/components/CtaSection";

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
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
      </svg>
    ),
  },
  {
    title: "Eligibility & Program Validation",
    desc: "Real-time confirmation of participating employer, member eligibility, drug-in-program status, and program parameters.",
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    title: "Member Cost-Share & Accumulators",
    desc: "Collection of member cost-share and reporting to plan accumulators so the member's benefit experience is seamless and compliant.",
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z" />
      </svg>
    ),
  },
  {
    title: "Medical-Claim Billing",
    desc: "Claims submitted through standard medical billing channels to preserve plan data continuity, reporting, and integration with existing benefit administration.",
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 14.25l6-6m4.5-3.493V21.75l-3.75-1.5-3.75 1.5-3.75-1.5-3.75 1.5V4.757c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0c1.1.128 1.907 1.077 1.907 2.185zM9.75 9h.008v.008H9.75V9zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm4.125 4.5h.008v.008h-.008V13.5zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
      </svg>
    ),
  },
  {
    title: "Supplier Settlement",
    desc: "Automated payment to manufacturers and suppliers via ACH with transparent, pass-through drug economics. No spread, no markup on drug cost.",
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0012 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75z" />
      </svg>
    ),
  },
  {
    title: "Fulfillment Orchestration",
    desc: "Prescriptions routed to licensed independent partner pharmacies serving as dispensing pharmacy or pharmacy of record, with product shipped directly to the member via manufacturer-designated or third-party logistics.",
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
      </svg>
    ),
  },
];

export default function ManufacturersPage() {
  return (
    <>
      <HeroSection
        headline="Direct-to-Employer Infrastructure, Ready to Go"
        subtitle="Most manufacturers investing in direct-to-employer drug access programs do not have the operational infrastructure to deploy them. ApalyRx provides a turn-key platform — prescription intake, eligibility, fulfillment orchestration, billing, payment, and accumulator reporting — so you can launch programs without building the plumbing."
        primaryCta={{ label: "Request a Conversation", href: "/contact" }}
      />

      {/* The Infrastructure Gap */}
      <SectionWrapper bg="light">
        <div className="max-w-3xl mx-auto animate-fade-up">
          <h2 className="text-3xl md:text-[2.5rem] font-bold text-navy mb-6 leading-tight text-center">
            The Programs Exist. The Infrastructure Doesn&apos;t.
          </h2>
          <p className="text-[17px] md:text-lg text-body leading-relaxed text-center">
            Pharmaceutical manufacturers are investing billions in patient access and affordability — copay programs, patient assistance, direct pricing, and direct-to-employer models. The clinical and economic value is real. But deploying these programs at scale requires operational infrastructure that most manufacturers do not have in-house: electronic prescription intake, program eligibility validation, member cost-share collection, accumulator reporting, medical-claim billing for data continuity, and automated supplier settlement. Without this infrastructure, programs remain outside the benefit — invisible to the plan and inaccessible to eligible patients through normal benefit channels.
          </p>
        </div>
      </SectionWrapper>

      {/* What ApalyRx Provides */}
      <SectionWrapper bg="white">
        <div className="text-center mb-6 animate-fade-up">
          <h2 className="text-3xl md:text-[2.5rem] font-bold text-navy mb-4 leading-tight">
            End-to-End Operational Infrastructure
          </h2>
          <p className="text-[17px] md:text-lg text-secondary-text max-w-3xl mx-auto">
            ApalyRx provides the complete operating layer manufacturers need to deploy direct-to-employer programs at scale. We handle the operational complexity so your programs run like a seamless benefit experience — not a parallel vendor workflow.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12 stagger-children">
          {infrastructure.map((item) => (
            <div
              key={item.title}
              className="bg-light-bg rounded-xl p-7 border border-gray-100"
            >
              <div className="w-12 h-12 bg-orange/10 rounded-lg flex items-center justify-center text-orange mb-4">
                {item.icon}
              </div>
              <h3 className="text-lg font-bold text-navy mb-2">{item.title}</h3>
              <p className="text-[15px] text-body leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </SectionWrapper>

      {/* How It Works */}
      <SectionWrapper bg="light">
        <div className="max-w-3xl mx-auto animate-fade-up">
          <h2 className="text-3xl md:text-[2.5rem] font-bold text-navy mb-6 leading-tight text-center">
            A Carve-Out That Behaves Like a Benefit
          </h2>
          <p className="text-[17px] md:text-lg text-body leading-relaxed text-center">
            Traditional carve-outs feel like bolt-on services — separate workflows, inconsistent accumulator behavior, fragmented reporting, manual coordination. That friction limits adoption and makes programs difficult to scale. ApalyRx is structured so that programs running outside PBM adjudication still deliver the operational experience stakeholders expect: eligibility validation, cost-share collection, accumulator reporting, claims-based billing, and closed-loop financial reconciliation. The result is a direct-to-employer program that operates like a benefit, not a workaround.
          </p>
        </div>
      </SectionWrapper>

      {/* Partnership Approach */}
      <SectionWrapper bg="white">
        <div className="max-w-3xl mx-auto animate-fade-up">
          <h2 className="text-3xl md:text-[2.5rem] font-bold text-navy mb-6 leading-tight text-center">
            Built to Complement Your Distribution Strategy
          </h2>
          <p className="text-[17px] md:text-lg text-body leading-relaxed text-center">
            ApalyRx works with manufacturers to operationalize direct programs under your commercial terms. You supply product and define program parameters. ApalyRx handles prescription orchestration, program operations, billing, and settlement. Integration is straightforward and designed to complement your existing distribution — not disrupt it. Programs can launch with a single product and expand to additional medications under the same operating framework.
          </p>
        </div>
      </SectionWrapper>

      <CtaSection text="Explore how to operationalize your direct-to-employer programs." />
    </>
  );
}
