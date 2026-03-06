import type { Metadata } from "next";
import Link from "next/link";
import SectionWrapper from "@/components/SectionWrapper";
import OrganizationSchema from "@/components/OrganizationSchema";
import {
  Users,
  Star,
  TrendingDown,
  AlertTriangle,
  Building2,
  Factory,
  GitMerge,
  MessageSquare,
  Rocket,
  Home,
  ClipboardCheck,
  Settings,
  Send,
  CheckCircle2,
  Route,
  Package,
  DollarSign,
  CreditCard,
  BarChart3,
  Zap,
  FileCheck,
  Puzzle,
} from "lucide-react";

export const metadata: Metadata = {
  title: {
    absolute: "ApalyRx | Independent Prescription Routing for Self-Funded Employers",
  },
  description:
    "ApalyRx works alongside your PBM and TPA to independently route high-cost prescriptions to the lowest net cost in real time. Decision-level documentation for every script. Pharmacy-licensed. No channel ownership. Built on the Drug Benefit Integrity standard.",
  openGraph: {
    title: "ApalyRx | Independent Prescription Routing for Self-Funded Employers",
    description:
      "Real-time prescription routing to the lowest net cost across all channels - PBM, specialty, mail, manufacturer-direct. Decision-level documentation for every script.",
    url: "https://www.apalyrx.com",
    siteName: "ApalyRx",
    type: "website",
    locale: "en_US",
  },
};

/* ─── Data ─── */

const trustStats = [
  { icon: Users, value: "500K+", label: "Covered Lives" },
  { icon: Star, value: "88", label: "NPS Score" },
  { icon: TrendingDown, value: "20%+", label: "Cost Reduction on High-Cost Drugs" },
];

const problemCards = [
  {
    icon: Building2,
    audience: "Employers & Health Plans",
    title: "Overpay by 20-40%",
    desc: "Complex benefit structures, multiple pricing layers, and no independent way to verify that each prescription was routed to the lowest net cost across all available channels. Plan fiduciaries face personal liability for drug benefit decisions they cannot independently prove were optimal.",
  },
  {
    icon: Factory,
    audience: "Manufacturers",
    title: "Lose Market Share",
    desc: "Manufacturers invest billions in copay programs, patient assistance, and direct pricing, but these programs sit outside the benefit, with no way to evaluate them alongside traditional channels at the point of decision. Clinically valuable options go unused because no infrastructure exists to bring these programs inside the benefit at scale.",
  },
  {
    icon: Users,
    audience: "Members",
    title: "Get Lost in Chaos",
    desc: "Surprise costs, unclear requirements, poor experience. Members navigate between their doctor, insurance, and pharmacy with no coordination and no one helping them through the process.",
  },
];

const stakeholders = [
  {
    icon: GitMerge,
    iconBg: "bg-[#0F1C2E]",
    borderColor: "border-l-[#0F1C2E]",
    tag: "For PBMs",
    title: "Strengthen Your Program With Independent Routing",
    desc: "Add a real-time independent routing layer that evaluates every high-cost prescription across all channels - including your own pharmacies - and produces decision-level documentation for your clients.",
    href: "/pbms",
  },
  {
    icon: Building2,
    iconBg: "bg-[#F26522]",
    borderColor: "border-l-[#F26522]",
    tag: "For Health Plans",
    title: "Operate Targeted Drug Carve-Out Programs",
    desc: "You select what drugs are included in your drug programs. Set your own program rules and controls. Access direct, pass-through, net pricing - no rebates, no hidden spread. Every routing decision independently documented with full audit trail.",
    href: "/employers",
  },
  {
    icon: MessageSquare,
    iconBg: "bg-[#0F1C2E]",
    borderColor: "border-l-[#0F1C2E]",
    tag: "For Benefits Consultants",
    title: "Change the PBM Conversation",
    desc: "Move client evaluations from pricing comparisons to structural accountability and integrity. Introduce a standard that differentiates your advisory practice.",
    href: "/consultants",
  },
  {
    icon: Rocket,
    iconBg: "bg-[#F26522]",
    borderColor: "border-l-[#F26522]",
    tag: "For Manufacturers",
    title: "Turn-Key Direct-to-Employer Infrastructure",
    desc: "Deploy direct-to-employer drug access programs at scale - eRx intake, eligibility, cost-share collection, accumulator reporting, medical-claim billing, and supplier settlement. No need to build the plumbing.",
    href: "/manufacturers",
  },
  {
    icon: Home,
    iconBg: "bg-[#0F1C2E]",
    borderColor: "border-l-[#0F1C2E]",
    tag: "For Independent Pharmacies",
    title: "New Revenue. Fair Reimbursement. No Clawbacks.",
    desc: "Dispense prescriptions or serve as pharmacy of record in manufacturer-direct models. Fair reimbursement from a platform with no competing channel interests.",
    href: "/pharmacies",
  },
];

const howItWorksSteps = [
  {
    num: 1,
    title: "Configure Programs & Pricing",
    subtitle: "Set up your customized drug program",
    bullets: [
      { icon: ClipboardCheck, text: "Employers and health plans define drug programs - scope, eligibility, cost-share, PA requirements, and channel controls" },
      { icon: Factory, text: "Manufacturers integrate direct pricing, copay programs, and patient assistance into the routing evaluation" },
      { icon: Settings, text: "Platform configured and ready to receive prescriptions through the e-prescribing workflow" },
    ],
  },
  {
    num: 2,
    title: "Validate, Route & Fulfill",
    subtitle: "Real-time all-channel eRx routing",
    bullets: [
      { icon: Send, text: "Prescriptions received directly through the e-prescribing workflow" },
      { icon: CheckCircle2, text: "Every in-scope eRx evaluated across all available channels - PBM specialty, PBM mail, retail, manufacturer-direct, and independent pharmacy" },
      { icon: Route, text: "Routed in real time to the lowest net cost based on actual pricing across all channels" },
      { icon: Package, text: "Fulfilled through independent community pharmacies or shipped direct to member in manufacturer-direct models" },
    ],
  },
  {
    num: 3,
    title: "Collect, Pay & Report",
    subtitle: "Closed-loop financials and decision-level records",
    bullets: [
      { icon: DollarSign, text: "Collect member cost share and report to plan accumulators" },
      { icon: CreditCard, text: "Bill plan portion through medical claim to TPA for data continuity" },
      { icon: Building2, text: "Pay suppliers via ACH with transparent, pass-through economics" },
      { icon: BarChart3, text: "Decision-level record produced for every prescription - channels compared, rules applied, routing rationale, net cost components" },
    ],
  },
];

const whyCards = [
  {
    icon: GitMerge,
    title: "Independent",
    desc: "No ownership in any dispensing channel. Routing decisions are structurally independent - the evaluation has no financial interest in the outcome.",
  },
  {
    icon: Zap,
    title: "Real-Time",
    desc: "Every prescription routed at the point of decision - not sampled retrospectively, not reported after the fact. Real-time all-channel evaluation.",
  },
  {
    icon: FileCheck,
    title: "Documented",
    desc: "Decision-level records for every script - channels compared, rules applied, routing rationale, and closed-loop financial reconciliation. Audit-ready by default.",
  },
  {
    icon: Puzzle,
    title: "Compatible",
    desc: "Works alongside your existing PBM and TPA. Carve out only the high-cost drugs where routing optimization has the greatest impact. Nothing else changes.",
  },
  {
    icon: Factory,
    title: "Manufacturer-Ready",
    desc: "Turn-key infrastructure for manufacturer direct-to-employer programs - eRx intake, eligibility, billing, settlement, and accumulator reporting built in.",
  },
];

const dbiRequirements = [
  "Real-time routing to lowest net cost across all channels",
  "Pharmacy-licensed operator with no channel ownership",
  "Manufacturer-direct programs built into the benefit",
  "Fulfilled through independent community pharmacies",
  "Decision-level records for every script",
];

/* ─── Page ─── */

export default function HomePage() {
  return (
    <>
      <OrganizationSchema />
      {/* ── SECTION 1: HERO ── */}
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
          <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-white mb-6">
            Direct Drug Access - Simplified.
          </h1>
          <p className="font-body text-base sm:text-lg md:text-xl text-white/80 mb-8 max-w-3xl mx-auto">
            The drug program operating system with configurable rules, real-time eRx routing to the lowest net cost across all channels, medical claims settlement, decision-level reporting, and VIP member experience - built to work alongside your PBM and TPA with full structural independence.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center bg-[#F26522] hover:bg-[#F26522]/90 text-white font-heading font-semibold shadow-lg text-base md:text-lg px-6 md:px-8 py-4 md:py-6 rounded-lg transition-all duration-300"
            >
              Request a Conversation
            </Link>
            <Link
              href="#how-it-works"
              className="inline-flex items-center justify-center bg-white/10 hover:bg-white/20 text-white border border-white/30 font-heading font-semibold text-base md:text-lg px-6 md:px-8 py-4 md:py-6 rounded-lg transition-all duration-300"
            >
              See How It Works
            </Link>
          </div>
        </div>
      </section>

      {/* ── SECTION 2: TRUST BAR ── */}
      <section className="bg-white border-b border-border">
        <div className="max-w-content mx-auto px-4 py-10 md:py-14">
          <p className="font-heading text-sm md:text-base text-muted-foreground text-center mb-8">
            Trusted by employers and health plans covering 500K+ lives
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-3xl mx-auto">
            {trustStats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <stat.icon className="w-5 h-5 text-[#F26522] mr-2" />
                  <span className="font-heading text-2xl md:text-3xl font-bold text-navy">
                    {stat.value}
                  </span>
                </div>
                <p className="font-body text-sm text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 3: THE PROBLEM ── */}
      <section className="relative bg-gradient-to-br from-red-50 via-orange-50 to-white py-16 md:py-24 overflow-hidden">
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage:
              "repeating-linear-gradient(45deg, #dc2626 0, #dc2626 1px, transparent 0, transparent 50%)",
            backgroundSize: "20px 20px",
          }}
        />
        <div className="relative max-w-content mx-auto px-4">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-red-100 text-red-700 text-sm font-semibold px-4 py-2 rounded-full mb-6">
              <AlertTriangle className="w-4 h-4" />
              <span className="font-heading">The Broken System</span>
            </div>
            <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-navy leading-tight">
              Employers Overpay. Manufacturers Lose. Members Suffer.
            </h2>
          </div>

          <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {problemCards.map((card) => (
              <div
                key={card.title}
                className="group bg-white rounded-xl p-6 md:p-8 shadow-lg border border-red-100 hover:border-red-200 transition-all duration-300 relative overflow-hidden"
              >
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-red-500 to-orange-500 rounded-t-xl" />
                <div className="p-3 rounded-xl bg-red-100 group-hover:bg-red-500 transition-all duration-300 w-fit mb-4">
                  <card.icon className="w-7 h-7 text-red-600 group-hover:text-white transition-all duration-300" />
                </div>
                <p className="font-heading text-xs font-semibold text-red-600 uppercase tracking-wider mb-2">
                  {card.audience}
                </p>
                <h3 className="font-heading text-xl md:text-2xl font-bold text-navy mb-3">
                  {card.title}
                </h3>
                <p className="font-body text-sm md:text-base text-muted-foreground leading-relaxed">
                  {card.desc}
                </p>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <p className="inline-block font-body text-sm md:text-base text-white bg-[#0F1C2E] rounded-full px-6 py-3">
              <span className="text-[#F26522] font-semibold">ApalyRx</span> closes this gap with real-time independent routing, decision-level documentation, and turn-key manufacturer infrastructure
            </p>
          </div>
        </div>
      </section>

      {/* ── SECTION 4: WHO WE SERVE ── */}
      <SectionWrapper bg="white">
        <div className="text-center mb-14 animate-fade-up">
          <h2 className="font-heading text-3xl md:text-[2.5rem] font-bold text-navy mb-4 leading-tight">
            Who We Serve
          </h2>
        </div>

        <div className="max-w-5xl mx-auto grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 stagger-children">
          {stakeholders.map((s) => (
            <Link
              key={s.href}
              href={s.href}
              className={`group bg-white rounded-xl p-6 shadow-lg border-l-4 ${s.borderColor} hover:shadow-xl transition-all duration-300`}
            >
              <div className={`p-2 rounded-lg ${s.iconBg} text-white w-fit mb-3`}>
                <s.icon className="w-6 h-6" />
              </div>
              <p className="font-heading text-xs font-semibold text-[#F26522] uppercase tracking-wider mb-1">
                {s.tag}
              </p>
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

      {/* ── SECTION 5: HOW IT WORKS ── */}
      <section id="how-it-works" className="relative bg-[#0F1C2E] text-white overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#F26522] rounded-full blur-3xl opacity-10 translate-x-1/2 -translate-y-1/4" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#F26522] rounded-full blur-3xl opacity-10 -translate-x-1/2 translate-y-1/4" />
        <div className="relative max-w-content mx-auto px-4 py-16 md:py-24">
          <div className="text-center mb-14">
            <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold leading-tight mb-4">
              How It Works: Configure, Route, Settle
            </h2>
            <p className="font-body text-lg md:text-xl text-white/70">
              A seamless process from prescription to delivery
            </p>
          </div>

          <div className="max-w-5xl mx-auto space-y-6">
            {howItWorksSteps.map((step) => (
              <div
                key={step.num}
                className="group bg-white/5 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-white/10 hover:border-[#F26522]/50 hover:bg-white/10 transition-all duration-300"
              >
                <div className="flex items-start gap-5">
                  <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-[#F26522] to-[#d45519] text-white rounded-full flex items-center justify-center font-bold text-lg shadow-lg group-hover:scale-110 transition-all duration-300">
                    {step.num}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-heading text-xl md:text-2xl font-bold mb-1">
                      {step.title}
                    </h3>
                    <p className="font-body text-sm md:text-base text-white/50 mb-5">
                      {step.subtitle}
                    </p>
                    <ul className="space-y-3">
                      {step.bullets.map((bullet, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <div className="p-1.5 rounded-md bg-[#F26522]/20 flex-shrink-0 mt-0.5">
                            <bullet.icon className="w-4 h-4 text-[#F26522]" />
                          </div>
                          <span className="font-body text-sm md:text-base text-white/70">
                            {bullet.text}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom callout */}
          <div className="max-w-4xl mx-auto mt-10">
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 text-center">
              <p className="font-body text-sm md:text-base text-white/80">
                Your PBM and plan stay untouched. ApalyRx operates alongside existing infrastructure - routing high-cost prescriptions to the lowest net cost and documenting every decision.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 6: WHY APALYRX ── */}
      <SectionWrapper bg="light">
        <div className="text-center mb-14 animate-fade-up">
          <h2 className="font-heading text-3xl md:text-[2.5rem] font-bold text-navy mb-4 leading-tight">
            Five Reasons to Choose ApalyRx
          </h2>
        </div>

        <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 stagger-children">
          {whyCards.map((card) => (
            <div
              key={card.title}
              className="group bg-white rounded-xl p-6 shadow-lg border border-gray-100 border-t-4 border-t-[#F26522] hover:border-[#F26522]/30 hover:shadow-xl transition-all duration-300"
            >
              <div className="p-3 rounded-lg bg-[#F26522] text-white w-fit mb-4">
                <card.icon className="h-8 w-8" />
              </div>
              <h3 className="font-heading text-xl md:text-2xl font-semibold text-navy mb-3">
                {card.title}
              </h3>
              <p className="font-body text-sm md:text-base text-muted-foreground leading-relaxed">
                {card.desc}
              </p>
            </div>
          ))}
        </div>
      </SectionWrapper>

      {/* ── SECTION 7: DBI STANDARD ── */}
      <SectionWrapper bg="white">
        <div className="max-w-4xl mx-auto text-center animate-fade-up">
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-navy mb-6 leading-tight">
            Built on the Drug Benefit Integrity Standard
          </h2>
          <p className="font-body text-base sm:text-lg text-muted-foreground mb-10 max-w-3xl mx-auto">
            Drug Benefit Integrity (DBI) is an independent industry standard with five structural requirements for ensuring that pharmacy benefit decisions are made in the plan&apos;s interest. ApalyRx meets all five.
          </p>
        </div>

        <div className="max-w-3xl mx-auto animate-fade-up">
          <div className="divide-y divide-border">
            {dbiRequirements.map((req, i) => (
              <div key={i} className="flex items-start gap-4 py-4">
                <CheckCircle2 className="w-7 h-7 text-green-500 flex-shrink-0 mt-0.5" />
                <span className="font-body text-base md:text-lg text-navy font-medium">
                  {req}
                </span>
              </div>
            ))}
          </div>

          <div className="text-center mt-8 mb-6">
            <p className="font-heading text-lg md:text-xl font-bold text-[#0F1C2E]">
              ApalyRx is the only entity that meets all five requirements.
            </p>
          </div>
          <div className="text-center">
            <a
              href="https://drugbenefitintegrity.com"
              target="_blank"
              rel="noopener noreferrer"
              className="font-heading text-[#F26522] hover:text-[#F26522]/80 font-semibold transition-all duration-300"
            >
              Learn more about the DBI standard &rarr;
            </a>
          </div>
        </div>
      </SectionWrapper>

      {/* ── SECTION 8: FINAL CTA ── */}
      <section className="bg-[#0F1C2E] text-white py-16 md:py-24">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4">
            Ready to Take Control?
          </h2>
          <p className="font-heading text-xl sm:text-2xl md:text-3xl text-[#F26522] font-semibold mb-6">
            Let&apos;s Define Your Key Problem Drugs.
          </p>
          <p className="font-body text-base sm:text-lg md:text-xl text-white/80 mb-10 max-w-2xl mx-auto">
            Tell us which drug categories are driving your costs. We will show you how ApalyRx can route those prescriptions to the lowest net cost alongside your existing PBM and TPA - with decision-level documentation for every script and real savings projections based on your population.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center bg-[#F26522] hover:bg-[#F26522]/90 text-white font-heading font-semibold shadow-lg text-base md:text-lg px-6 md:px-8 py-4 md:py-6 rounded-lg transition-all duration-300"
          >
            Request a Conversation
          </Link>
        </div>
      </section>
    </>
  );
}
