import type { Metadata } from "next";
import Link from "next/link";
import HeroSection from "@/components/HeroSection";
import SectionWrapper from "@/components/SectionWrapper";
import CtaSection from "@/components/CtaSection";

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
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
      </svg>
    ),
  },
  {
    num: 2,
    title: "All Channels Evaluated",
    desc: "Every in-scope prescription is evaluated in real time across all available fulfillment channels — PBM specialty, PBM mail, retail, manufacturer-direct programs, and independent pharmacy options.",
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
      </svg>
    ),
  },
  {
    num: 3,
    title: "Lowest Net Cost Routed",
    desc: "The prescription is routed to the optimal channel based on actual net cost to the plan — factoring in contract rates, manufacturer programs, and all available pricing. Because ApalyRx has no ownership in any dispensing channel, the routing decision is structurally independent.",
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />
      </svg>
    ),
  },
  {
    num: 4,
    title: "Independent Fulfillment",
    desc: "Prescriptions are processed or dispensed through independent community pharmacies with no vertical ownership ties to the entity that made the routing decision. In manufacturer-direct models, the independent pharmacy serves as pharmacy of record while the product is shipped directly to the member.",
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 21v-7.5a.75.75 0 01.75-.75h3a.75.75 0 01.75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349m-16.5 11.65V9.35m0 0a3.001 3.001 0 003.75-.615A2.993 2.993 0 009.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 002.25 1.016c.896 0 1.7-.393 2.25-1.016A3.001 3.001 0 0021 9.349m-18 0V3.25a.75.75 0 01.75-.75h16.5a.75.75 0 01.75.75v6.1" />
      </svg>
    ),
  },
  {
    num: 5,
    title: "Decision Record Produced",
    desc: "Every prescription generates an automatic, auditable record — channels compared, rules applied, routing rationale, net cost components, and closed-loop financial reconciliation. Decision-level documentation for every script.",
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
      </svg>
    ),
  },
];

const stakeholders = [
  {
    title: "PBMs & Health Plans",
    desc: "Add a real-time independent routing layer that strengthens client confidence and positions your program ahead of emerging regulatory requirements.",
    href: "/pbms",
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008z" />
      </svg>
    ),
  },
  {
    title: "Self-Funded Employers",
    desc: "Independent routing and documentation that every high-cost prescription reached the lowest net cost channel. Fiduciary-grade proof for ERISA and CAA compliance.",
    href: "/employers",
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0M12 12.75h.008v.008H12v-.008z" />
      </svg>
    ),
  },
  {
    title: "Benefits Consultants",
    desc: "A new dimension for PBM evaluations. Move the conversation from pricing comparisons to structural accountability and integrity.",
    href: "/consultants",
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5m.75-9l3-3 2.148 2.148A12.061 12.061 0 0116.5 7.605" />
      </svg>
    ),
  },
  {
    title: "Pharmaceutical Manufacturers",
    desc: "Turn-key operational infrastructure to deploy direct-to-employer drug access programs — without building your own fulfillment, billing, eligibility, or payment systems.",
    href: "/manufacturers",
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" />
      </svg>
    ),
  },
  {
    title: "Independent Pharmacies",
    desc: "Dispense prescriptions or serve as pharmacy of record in manufacturer-direct models. Fair reimbursement from a network with no competing channel interests.",
    href: "/pharmacies",
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
      </svg>
    ),
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
        subtitle="ApalyRx works alongside your PBM to independently route every high-cost prescription in real time to the lowest net cost supplier — and produces decision-level documentation to prove it."
        primaryCta={{ label: "See How It Works", href: "#how-it-works" }}
        secondaryCta={{ label: "Request a Conversation", href: "/contact" }}
      />

      {/* The Verification Gap */}
      <SectionWrapper bg="light">
        <div className="max-w-3xl mx-auto text-center animate-fade-up">
          <h2 className="text-3xl md:text-[2.5rem] font-bold text-navy mb-6 leading-tight">
            Pharmacy Benefits Have a Verification Gap
          </h2>
          <p className="text-[17px] md:text-lg text-body leading-relaxed">
            Every major financial system requires independent verification. Banks have independent auditors. Securities markets have independent clearing houses. Investment advisors must demonstrate best execution through independent documentation. Pharmacy benefits — at $400 billion a year — has no equivalent. The entities making drug benefit routing decisions often have financial relationships with the dispensing channels being evaluated. This is not a criticism of any company. It is a structural reality. ApalyRx closes this gap by adding an independent real-time eRx routing and verification layer that works alongside existing pharmacy benefit programs.
          </p>
        </div>
      </SectionWrapper>

      {/* How It Works */}
      <SectionWrapper bg="white" id="how-it-works">
        <div className="text-center mb-16 animate-fade-up">
          <h2 className="text-3xl md:text-[2.5rem] font-bold text-navy mb-4 leading-tight">
            How ApalyRx Works
          </h2>
          <p className="text-lg md:text-xl text-secondary-text">
            Every in-scope prescription. All channels. Real time.
          </p>
        </div>

        <div className="relative">
          {/* Connecting line */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-orange/20 via-orange/40 to-orange/20 -translate-x-1/2" />

          <div className="space-y-12 md:space-y-0 stagger-children">
            {steps.map((step, i) => (
              <div
                key={step.num}
                className={`relative md:flex items-center gap-12 ${
                  i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                } ${i > 0 ? "md:mt-8" : ""}`}
              >
                {/* Content card */}
                <div className={`md:w-[calc(50%-2rem)] ${i % 2 === 0 ? "md:text-right" : "md:text-left"}`}>
                  <div className="bg-white rounded-xl p-6 md:p-8 shadow-sm border border-gray-100">
                    <div className={`flex items-center gap-3 mb-3 ${i % 2 === 0 ? "md:justify-end" : ""}`}>
                      <span className="text-orange">{step.icon}</span>
                      <h3 className="text-xl md:text-[22px] font-semibold text-navy">
                        {step.title}
                      </h3>
                    </div>
                    <p className="text-[16px] text-body leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                </div>

                {/* Center number */}
                <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 w-12 h-12 bg-orange text-white rounded-full items-center justify-center font-bold text-lg shadow-lg z-10">
                  {step.num}
                </div>

                {/* Spacer for alternating layout */}
                <div className="hidden md:block md:w-[calc(50%-2rem)]" />
              </div>
            ))}
          </div>
        </div>
      </SectionWrapper>

      {/* Who We Work With */}
      <SectionWrapper bg="light">
        <div className="text-center mb-14 animate-fade-up">
          <h2 className="text-3xl md:text-[2.5rem] font-bold text-navy mb-4 leading-tight">
            Built for Every Stakeholder
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 stagger-children">
          {stakeholders.map((s) => (
            <Link
              key={s.href}
              href={s.href}
              className="group bg-white rounded-xl p-7 shadow-sm border border-gray-100 hover:shadow-md hover:border-orange/20 transition-all duration-300"
            >
              <div className="w-12 h-12 bg-orange/10 rounded-lg flex items-center justify-center text-orange mb-4 group-hover:bg-orange group-hover:text-white transition-colors duration-300">
                {s.icon}
              </div>
              <h3 className="text-lg font-bold text-navy mb-2">{s.title}</h3>
              <p className="text-[15px] text-body leading-relaxed mb-4">
                {s.desc}
              </p>
              <span className="text-orange font-semibold text-[15px] group-hover:translate-x-1 inline-block transition-transform duration-300">
                Learn More &rarr;
              </span>
            </Link>
          ))}
        </div>
      </SectionWrapper>

      {/* The DBI Standard */}
      <SectionWrapper bg="white">
        <div className="max-w-3xl mx-auto animate-fade-up">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-[2.5rem] font-bold text-navy mb-6 leading-tight">
              Built on the Drug Benefit Integrity Standard
            </h2>
            <p className="text-[17px] md:text-lg text-body leading-relaxed">
              Drug Benefit Integrity (DBI) is an independent industry standard with five structural requirements for ensuring that pharmacy benefit decisions are made in the plan&apos;s interest. ApalyRx meets all five.
            </p>
          </div>

          <div className="bg-light-bg rounded-xl p-8 md:p-10">
            <ul className="space-y-4">
              {dbiRequirements.map((req, i) => (
                <li key={i} className="flex items-start gap-3">
                  <svg
                    className="w-6 h-6 text-success flex-shrink-0 mt-0.5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-[16px] md:text-[17px] text-body font-medium">
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
              className="text-orange hover:text-orange-hover font-semibold transition-colors"
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
