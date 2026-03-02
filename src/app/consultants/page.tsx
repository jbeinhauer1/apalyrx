import type { Metadata } from "next";
import HeroSection from "@/components/HeroSection";
import SectionWrapper from "@/components/SectionWrapper";
import CtaSection from "@/components/CtaSection";

export const metadata: Metadata = {
  title: "ApalyRx for Benefits Consultants | Drug Benefit Integrity",
  description:
    "Transform PBM evaluations with real-time independent routing. Give clients a structural standard that changes the pharmacy benefit conversation.",
  openGraph: {
    title: "ApalyRx for Benefits Consultants | Drug Benefit Integrity",
    description:
      "Transform PBM evaluations with real-time independent routing. Give clients a structural standard that changes the pharmacy benefit conversation.",
  },
};

const offerCards = [
  {
    title: "Real-Time Independent Routing",
    desc: "Recommend ApalyRx as a routing layer that works alongside any PBM. Your client gets real-time lowest-net-cost routing and decision-level documentation for every high-cost script.",
  },
  {
    title: "Fiduciary Protection",
    desc: "In an environment of increasing fiduciary scrutiny, recommending independent routing and documentation demonstrates your commitment to your client's best interest and strengthens your advisory position.",
  },
  {
    title: "Differentiation",
    desc: "Be the consultant who introduces real-time independent routing to your market. The first consultants to adopt this approach will define how their clients evaluate pharmacy benefits.",
  },
];

export default function ConsultantsPage() {
  return (
    <>
      <HeroSection
        headline="Change the Question Your Clients Ask About PBMs"
        subtitle="Real-time independent routing gives benefits consultants a structural standard that moves the conversation from pricing comparisons to accountability and integrity."
        primaryCta={{ label: "Request a Conversation", href: "/contact" }}
      />

      {/* The Consultant Opportunity */}
      <SectionWrapper bg="light">
        <div className="max-w-3xl mx-auto animate-fade-up">
          <h2 className="text-3xl md:text-[2.5rem] font-bold text-navy mb-6 leading-tight text-center">
            A New Dimension for PBM Evaluations
          </h2>
          <p className="text-[17px] md:text-lg text-body leading-relaxed text-center">
            Every renewal cycle, you evaluate PBM proposals on pricing, rebate guarantees, and service levels. These matter. But the data comes from the PBM being evaluated. Real-time independent routing adds a new dimension: can the PBM demonstrate, through an independent party, that each high-cost prescription was routed to the lowest net cost in real time? If not, there is a gap your client should know about.
          </p>
        </div>
      </SectionWrapper>

      {/* What You Can Offer Clients */}
      <SectionWrapper bg="white">
        <div className="text-center mb-14 animate-fade-up">
          <h2 className="text-3xl md:text-[2.5rem] font-bold text-navy leading-tight">
            What You Can Offer Clients
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 stagger-children">
          {offerCards.map((card) => (
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

      {/* The DBI Framework */}
      <SectionWrapper bg="light">
        <div className="max-w-3xl mx-auto animate-fade-up">
          <h2 className="text-3xl md:text-[2.5rem] font-bold text-navy mb-6 leading-tight text-center">
            Use the Drug Benefit Integrity Framework
          </h2>
          <p className="text-[17px] md:text-lg text-body leading-relaxed text-center mb-8">
            The DBI Framework is a free, one-page evaluation tool with five binary requirements. Use it in RFP evaluations, PBM reviews, and strategy meetings. It gives you a structured, defensible way to evaluate whether a pharmacy benefit program has structural integrity.
          </p>
          <div className="text-center">
            <a
              href="https://drugbenefitintegrity.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center bg-orange hover:bg-orange-hover text-white font-semibold px-8 py-3.5 rounded-lg transition-colors text-[16px]"
            >
              Download the Framework at drugbenefitintegrity.com &rarr;
            </a>
          </div>
        </div>
      </SectionWrapper>

      <CtaSection text="Want to bring real-time independent routing to your clients?" />
    </>
  );
}
