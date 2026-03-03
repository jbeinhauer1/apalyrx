import type { Metadata } from "next";
import Link from "next/link";
import HeroSection from "@/components/HeroSection";
import SectionWrapper from "@/components/SectionWrapper";
import CtaSection from "@/components/CtaSection";
import {
  FileText,
  LayoutGrid,
  ArrowRight,
  Store,
  Shield,
  CheckCircle2,
  Building2,
  Briefcase,
  BarChart3,
  FlaskConical,
  Heart,
} from "lucide-react";

export const metadata: Metadata = {
  title: "ApalyRx | Real-Time Prescription Routing & Benefit Operations Platform",
  description:
    "ApalyRx works alongside PBMs to independently route high-cost prescriptions in real time to the lowest net cost — and documents every decision.",
  openGraph: {
    title: "ApalyRx | Real-Time Prescription Routing & Benefit Operations Platform",
    description:
      "ApalyRx works alongside PBMs to independently route high-cost prescriptions in real time to the lowest net cost — and documents every decision.",
  },
};

const steps = [
  {
    num: 1,
    title: "Prescription Received",
    desc: "ApalyRx operates within the e-prescribing workflow under its pharmacy license, receiving prescriptions directly. This enables routing decisions at the point of prescribing — not after the fact.",
    icon: FileText,
  },
  {
    num: 2,
    title: "All Channels Evaluated",
    desc: "Every in-scope prescription is evaluated in real time across all available fulfillment channels — PBM specialty, PBM mail, retail, manufacturer-direct programs, and independent pharmacy options.",
    icon: LayoutGrid,
  },
  {
    num: 3,
    title: "Lowest Net Cost Routed",
    desc: "The prescription is routed to the optimal channel based on actual net cost to the plan — factoring in contract rates, manufacturer programs, and all available pricing. Because ApalyRx has no ownership in any dispensing channel, the routing decision is structurally independent.",
    icon: ArrowRight,
  },
  {
    num: 4,
    title: "Independent Fulfillment",
    desc: "Prescriptions are processed or dispensed through independent community pharmacies with no vertical ownership ties to the entity that made the routing decision. In manufacturer-direct models, the independent pharmacy serves as pharmacy of record while the product is shipped directly to the member.",
    icon: Store,
  },
  {
    num: 5,
    title: "Decision Record Produced",
    desc: "Every prescription generates an automatic, auditable record — channels compared, rules applied, routing rationale, net cost components, and closed-loop financial reconciliation. Decision-level documentation for every script.",
    icon: Shield,
  },
];

const stakeholders = [
  {
    title: "PBMs & Health Plans",
    desc: "Add a real-time independent routing layer that strengthens client confidence and positions your program ahead of emerging regulatory requirements.",
    href: "/pbms",
    icon: Building2,
    borderColor: "border-l-[#0F1C2E]",
    iconBg: "bg-[#0F1C2E]",
  },
  {
    title: "Self-Funded Employers",
    desc: "Independent routing and documentation that every high-cost prescription reached the lowest net cost channel. Fiduciary-grade proof for ERISA and CAA compliance.",
    href: "/employers",
    icon: Briefcase,
    borderColor: "border-l-[#F26522]",
    iconBg: "bg-[#F26522]",
  },
  {
    title: "Benefits Consultants",
    desc: "A new dimension for PBM evaluations. Move the conversation from pricing comparisons to structural accountability and integrity.",
    href: "/consultants",
    icon: BarChart3,
    borderColor: "border-l-[#0F1C2E]",
    iconBg: "bg-[#0F1C2E]",
  },
  {
    title: "Pharmaceutical Manufacturers",
    desc: "Turn-key operational infrastructure to deploy direct-to-employer drug access programs — without building your own fulfillment, billing, eligibility, or payment systems.",
    href: "/manufacturers",
    icon: FlaskConical,
    borderColor: "border-l-[#F26522]",
    iconBg: "bg-[#F26522]",
  },
  {
    title: "Independent Pharmacies",
    desc: "Dispense prescriptions or serve as pharmacy of record in manufacturer-direct models. Fair reimbursement from a network with no competing channel interests.",
    href: "/pharmacies",
    icon: Heart,
    borderColor: "border-l-[#0F1C2E]",
    iconBg: "bg-[#0F1C2E]",
  },
];

const dbiRequirements = [
  "Real-time routing to lowest net cost across all channels",
  "Pharmacy-licensed operator with no channel ownership",
  "Manufacturer-direct programs built into the benefit",
  "Fulfilled through independent community pharmacies",
  "Decision-level records for every script",
];

export default function Home() {
  return (
    <>
      {/* Hero */}
      <HeroSection
        headline="Real-Time Prescription Routing. Independent Proof."
        subtitle="ApalyRx works alongside PBMs to independently route every high-cost prescription in real time to the lowest net-cost supplier, and produces decision-level documentation to prove it."
        primaryCta={{ label: "See How It Works", href: "#how-it-works" }}
        secondaryCta={{ label: "Request a Conversation", href: "/contact" }}
      />

      {/* The Verification Gap */}
      <SectionWrapper bg="light">
        <div className="max-w-4xl mx-auto text-center animate-fade-up">
          <h2 className="font-heading text-3xl md:text-[2.5rem] font-bold text-navy mb-6 leading-tight">
            Pharmacy Benefits Have a Verification Gap
          </h2>
          <p className="font-body text-[17px] md:text-lg text-muted-foreground leading-relaxed">
            Every major financial system requires independent verification. Banks have independent auditors. Securities markets have independent clearing houses. Investment advisors must demonstrate best execution through independent documentation. Pharmacy benefits — at $400 billion a year — has no equivalent. The entities making drug benefit routing decisions often have financial relationships with the dispensing channels being evaluated. This is not a criticism of any company. It is a structural reality. ApalyRx closes this gap by adding an independent real-time eRx routing and verification layer that works alongside existing pharmacy benefit programs.
          </p>
        </div>
      </SectionWrapper>

      {/* How It Works */}
      <SectionWrapper bg="white" id="how-it-works">
        <div className="text-center mb-16 animate-fade-up">
          <div className="inline-flex items-center gap-2 bg-[#0F1C2E] text-white text-sm font-semibold px-4 py-2 rounded-full mb-6">
            <span>How It Works</span>
          </div>
          <h2 className="font-heading text-3xl md:text-[2.5rem] font-bold text-navy mb-4 leading-tight">
            How ApalyRx Works
          </h2>
          <p className="font-body text-lg md:text-xl text-muted-foreground">
            Every in-scope prescription. All channels. Real time.
          </p>
        </div>

        {/* Horizontal step layout */}
        <div className="max-w-5xl mx-auto">
          <div className="space-y-4 stagger-children">
            {steps.map((step, i) => (
              <div key={step.num}>
                <div className="group bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:border-[#F26522]/30 hover:shadow-xl transition-all duration-300 flex items-start gap-5">
                  <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-[#F26522] to-[#d45519] text-white rounded-full flex items-center justify-center font-bold text-lg shadow-lg group-hover:scale-110 transition-all duration-300">
                    {step.num}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-heading text-xl md:text-2xl font-semibold text-navy">
                        {step.title}
                      </h3>
                    </div>
                    <p className="font-body text-sm md:text-base text-muted-foreground leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                  <div className="hidden sm:flex p-1.5 rounded-md bg-[#F26522]/10 group-hover:bg-[#F26522] transition-all duration-300 flex-shrink-0 mt-1">
                    <step.icon className="w-5 h-5 text-[#F26522] group-hover:text-white transition-all duration-300" />
                  </div>
                </div>
                {i < steps.length - 1 && (
                  <div className="hidden md:flex justify-center py-1">
                    <ArrowRight className="w-5 h-5 text-[#F26522] rotate-90" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </SectionWrapper>

      {/* Who We Work With */}
      <SectionWrapper bg="light">
        <div className="text-center mb-14 animate-fade-up">
          <h2 className="font-heading text-3xl md:text-[2.5rem] font-bold text-navy mb-4 leading-tight">
            Built for Every Stakeholder
          </h2>
        </div>

        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 stagger-children">
          {stakeholders.map((s) => (
            <Link
              key={s.href}
              href={s.href}
              className={`group bg-white rounded-xl p-6 shadow-lg border-l-4 ${s.borderColor} hover:shadow-xl transition-all duration-300`}
            >
              <div className={`p-2 rounded-lg ${s.iconBg} text-white w-fit mb-4`}>
                <s.icon className="w-6 h-6" />
              </div>
              <h3 className="font-heading text-lg font-bold text-navy mb-2">{s.title}</h3>
              <p className="font-body text-sm text-muted-foreground leading-relaxed mb-4">
                {s.desc}
              </p>
              <span className="font-heading text-[#F26522] font-semibold text-sm group-hover:translate-x-1 inline-block transition-transform duration-300">
                Learn More &rarr;
              </span>
            </Link>
          ))}
        </div>
      </SectionWrapper>

      {/* The DBI Standard */}
      <SectionWrapper bg="white">
        <div className="max-w-4xl mx-auto animate-fade-up">
          <div className="text-center mb-10">
            <h2 className="font-heading text-3xl md:text-[2.5rem] font-bold text-navy mb-6 leading-tight">
              Built on the Drug Benefit Integrity Standard
            </h2>
            <p className="font-body text-[17px] md:text-lg text-muted-foreground leading-relaxed">
              Drug Benefit Integrity (DBI) is an independent industry standard with five structural requirements for ensuring that pharmacy benefit decisions are made in the plan&apos;s interest. <span className="font-heading font-bold text-[#0F1C2E]">ApalyRx meets all five.</span>
            </p>
          </div>

          <div className="bg-white rounded-xl p-8 md:p-10">
            <ul className="space-y-4">
              {dbiRequirements.map((req, i) => (
                <li key={i} className="flex items-start gap-3">
                  <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="font-body text-[16px] md:text-[17px] text-body font-medium">
                    {req}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="text-center mt-8">
            <a
              href="https://drugbenefitintegrity.com"
              target="_blank"
              rel="noopener noreferrer"
              className="font-heading text-[#F26522] hover:text-orange-hover font-semibold transition-all duration-300"
            >
              Learn more about the DBI standard &rarr;
            </a>
          </div>
        </div>
      </SectionWrapper>

      {/* CTA */}
      <CtaSection text="Ready to add real-time independent routing to your program?" />
    </>
  );
}
