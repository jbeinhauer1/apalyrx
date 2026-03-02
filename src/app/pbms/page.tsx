import type { Metadata } from "next";
import HeroSection from "@/components/HeroSection";
import SectionWrapper from "@/components/SectionWrapper";
import CtaSection from "@/components/CtaSection";

export const metadata: Metadata = {
  title: "ApalyRx for PBMs & Health Plans | Real-Time Independent Routing",
  description:
    "Strengthen client relationships with real-time independent prescription routing. ApalyRx works alongside your PBM program to route and document every high-cost decision.",
  openGraph: {
    title: "ApalyRx for PBMs & Health Plans | Real-Time Independent Routing",
    description:
      "Strengthen client relationships with real-time independent prescription routing. ApalyRx works alongside your PBM program to route and document every high-cost decision.",
  },
};

const valueCards = [
  {
    title: "Client Retention",
    desc: "Employers need detailed fiduciary documentation. Offering independent routing and decision-level reporting proactively demonstrates that you welcome scrutiny and strengthens renewal conversations.",
  },
  {
    title: "Consultant Confidence",
    desc: "When consultants evaluate your program, a real-time independent routing layer already in place sets you apart from competitors who cannot demonstrate the same level of accountability.",
  },
  {
    title: "Regulatory Readiness",
    desc: "CAA reporting requirements, FTC enforcement, and DOL proposed rules are all moving toward greater PBM accountability. Independent routing and documentation positions you ahead of these requirements.",
  },
];

export default function PBMsPage() {
  return (
    <>
      <HeroSection
        headline="Strengthen Your Program With Independent Routing"
        subtitle="ApalyRx works alongside your program to give clients what they are increasingly asking for — real-time, independent routing of high-cost prescriptions to the lowest net cost, with decision-level documentation for every script."
        primaryCta={{ label: "Request a Conversation", href: "/contact" }}
      />

      {/* The Market Reality */}
      <SectionWrapper bg="light">
        <div className="max-w-3xl mx-auto animate-fade-up">
          <h2 className="text-3xl md:text-[2.5rem] font-bold text-navy mb-6 leading-tight text-center">
            Your Clients Are Asking Harder Questions
          </h2>
          <p className="text-[17px] md:text-lg text-body leading-relaxed text-center">
            Benefits consultants are putting alternative PBM models on every finalist slate. Employers are demanding documentation beyond aggregate reporting. The CAA now designates PBMs as ERISA covered service providers. The FTC is expanding enforcement. In this environment, the ability to offer independent routing and decision-level documentation will become the standard — and PBMs that adopt it proactively will define the next generation of client trust rather than reacting to mandates.
          </p>
        </div>
      </SectionWrapper>

      {/* How It Works With Your Program */}
      <SectionWrapper bg="white">
        <div className="max-w-3xl mx-auto animate-fade-up">
          <h2 className="text-3xl md:text-[2.5rem] font-bold text-navy mb-6 leading-tight text-center">
            ApalyRx Complements Your PBM — It Does Not Replace It
          </h2>
          <p className="text-[17px] md:text-lg text-body leading-relaxed text-center">
            Your PBM continues to manage formularies, negotiate contracts, process claims, and administer the benefit. ApalyRx operates as a real-time routing layer for high-cost, high-variability prescriptions. Our routing logic evaluates every in-scope eRx across all available channels in real time — including manufacturer-direct options and your PBM&apos;s own pharmacies — and routes to the lowest net cost. The winning channel may be your specialty pharmacy, your mail operation, a manufacturer-direct program, or an independent pharmacy. The routing is based on actual net cost, and every decision is documented with a complete audit trail.
          </p>
        </div>
      </SectionWrapper>

      {/* Value to Your Business */}
      <SectionWrapper bg="light">
        <div className="text-center mb-14 animate-fade-up">
          <h2 className="text-3xl md:text-[2.5rem] font-bold text-navy leading-tight">
            Value to Your Business
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 stagger-children">
          {valueCards.map((card) => (
            <div
              key={card.title}
              className="bg-white rounded-xl p-7 shadow-sm border border-gray-100 border-t-4 border-t-orange"
            >
              <h3 className="text-xl font-bold text-navy mb-3">{card.title}</h3>
              <p className="text-[16px] text-body leading-relaxed">{card.desc}</p>
            </div>
          ))}
        </div>
      </SectionWrapper>

      {/* Implementation */}
      <SectionWrapper bg="white">
        <div className="max-w-3xl mx-auto animate-fade-up">
          <h2 className="text-3xl md:text-[2.5rem] font-bold text-navy mb-6 leading-tight text-center">
            Designed for Easy Integration
          </h2>
          <p className="text-[17px] md:text-lg text-body leading-relaxed text-center">
            ApalyRx integrates with existing PBM workflows without disrupting operations. Implementation targets the approximately 30 high-cost medications that typically account for 40% or more of employer and health plan pharmacy spend — where net cost variability across channels is greatest and the impact of optimized routing is most significant. Integration is technical and straightforward — we work with your team to connect to existing data flows and begin routing.
          </p>
        </div>
      </SectionWrapper>

      <CtaSection text="Explore how independent routing fits with your program." />
    </>
  );
}
