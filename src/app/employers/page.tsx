import type { Metadata } from "next";
import Link from "next/link";
import FaqAccordion from "@/components/FaqAccordion";
import WebPageSchema from "@/components/WebPageSchema";
import FaqSchema from "@/components/FaqSchema";
import {
  Building2,
  AlertTriangle,
  EyeOff,
  Lock,
  DollarSign,
  UserX,
  CheckCircle2,
  Settings,
  Puzzle,
  Zap,
  Layers,
  Users,
  CreditCard,
  FileText,
  Shield,
  BarChart3,
  ArrowRightLeft,
  FileCheck,
  Clock,
  TestTube,
  PlayCircle,
  TrendingUp,
  Quote,
} from "lucide-react";

export const metadata: Metadata = {
  title:
    "ApalyRx for Employers & Health Plans | Independent Prescription Routing & Carve-Out Programs",
  description:
    "Fix the drugs driving your spend without replacing your PBM. ApalyRx operationalizes targeted carve-out programs with real-time independent routing, transparent pricing, and decision-level documentation.",
  openGraph: {
    title:
      "ApalyRx for Employers & Health Plans | Independent Prescription Routing & Carve-Out Programs",
    description:
      "Fix the drugs driving your spend without replacing your PBM. ApalyRx operationalizes targeted carve-out programs with real-time independent routing, transparent pricing, and decision-level documentation.",
  },
};

/* ─── Data ─── */

const problemCards = [
  {
    icon: EyeOff,
    num: 1,
    title: "Opaque Pricing",
    desc: "Rebate structures are completely opaque — you never know your true net cost until months later, if ever. No independent party verifies that each prescription reached the lowest available price.",
  },
  {
    icon: Lock,
    num: 2,
    title: "Loss of Control",
    desc: "Formulary choices are often shaped by contracts outside your control — reducing transparency and limiting your options on high-cost drugs. The entity making routing decisions has financial relationships with the dispensing channels being evaluated.",
  },
  {
    icon: DollarSign,
    num: 3,
    title: "Limited Access to Best Pricing",
    desc: "You can\u2019t access manufacturer-direct pricing or direct-to-consumer rates — those programs sit outside PBM adjudication, invisible to your benefit. Billions in manufacturer value goes unrecognized.",
  },
  {
    icon: UserX,
    num: 4,
    title: "Poor Member Experience",
    desc: "Members want clarity and momentum — clear expectations, timely updates, and fewer steps between prescription and delivery. Instead they navigate a fragmented system with no coordination.",
  },
];

const solutionCards = [
  {
    icon: DollarSign,
    title: "Lower Your Pharmacy Spend",
    subtitle: "Access Direct, Net Preferred Pricing",
    stat: "20-40%",
    statLabel: "cost reduction",
    desc: "ApalyRx focuses on the highest-impact medications — often approximately 30 drugs that represent 40-50% of pharmacy spend. Every prescription independently routed to the lowest net cost across all available channels.",
  },
  {
    icon: Settings,
    title: "Control Your Program Rules",
    subtitle: "Define Every Aspect of Your Program",
    stat: "100%",
    statLabel: "your control",
    desc: "Define cost share, PA/UM, eligibility, and allowed fulfillment channels program by program. Every rule you set is applied in real time and documented in the decision record for every script.",
  },
  {
    icon: Puzzle,
    title: "Keep Your Current Infrastructure",
    subtitle: "No PBM or TPA Rip-and-Replace",
    stat: "0",
    statLabel: "disruption",
    desc: "ApalyRx works alongside your PBM and TPA — carved-out drugs run through ApalyRx with independent routing and documentation; everything else stays in your existing pharmacy benefit flow.",
  },
  {
    icon: Zap,
    title: "Future-Proof Drug Routing",
    subtitle: "Automatic Adaptation",
    stat: "\u221E",
    statLabel: "scalability",
    desc: "As new drugs, biosimilars, and lower-cost alternatives emerge, ApalyRx automatically adapts routing through your existing connection — evaluating all channels in real time, no additional integration needed.",
  },
];

const howItWorksSteps = [
  {
    num: 1,
    title: "Select Your Drugs",
    desc: "You select the drugs to include in your programs (e.g., GLP-1s, specialty medications, other high-cost drugs driving your spend)",
  },
  {
    num: 2,
    title: "Define Program Rules",
    desc: "You define program rules: member cost share, PA/UM criteria, allowed fulfillment channels, eligibility requirements. Your rules, your control.",
  },
  {
    num: 3,
    title: "Members Create Accounts",
    desc: "Members create their account and direct prescribers to send scripts to ApalyRx for in-scope medications",
  },
  {
    num: 4,
    title: "Eligibility Validation",
    desc: "ApalyRx validates member eligibility and applies your program rules in real time — PA requirements, cost-share calculations, and channel controls",
  },
  {
    num: 5,
    title: "Independent Routing to Lowest Net Cost",
    desc: "Every in-scope prescription is evaluated across all available channels — PBM specialty, PBM mail, retail, manufacturer-direct, and independent pharmacy — and routed in real time to the lowest net cost",
  },
  {
    num: 6,
    title: "Collection & Settlement",
    desc: "ApalyRx collects member cost share, reports to accumulators, submits charges as medical claims to your TPA, and settles with suppliers via ACH — closed-loop financial reconciliation",
  },
  {
    num: 7,
    title: "Delivery, Support & Documentation",
    desc: "Medication ships to member\u2019s home with concierge support. Every prescription generates a decision-level record — channels compared, rules applied, routing rationale, and net cost components. Audit-ready by default.",
  },
];

const capabilities = [
  { icon: Layers, text: "Multi-program configuration (as many drug programs as you want)" },
  { icon: Settings, text: "Rules engine (cost share, PA/UM logic, exceptions workflow)" },
  { icon: Users, text: "Real-time eligibility validation" },
  { icon: CreditCard, text: "Pass-through transparent drug pricing (no spread, no markup)" },
  { icon: FileText, text: "Member platform + communications + concierge support workflows" },
  { icon: Shield, text: "Billed through claims (member cost share + employer portion + supplier ACH settlement)" },
  { icon: BarChart3, text: "Decision-level records and reporting dashboards for every script" },
  { icon: Zap, text: "Future-proof: add new drugs, biosimilars, categories as markets evolve" },
  { icon: ArrowRightLeft, text: "Drug optimization: brand to biosimilar conversion" },
  { icon: FileCheck, text: "Fiduciary-grade documentation meeting ERISA prudent expert and CAA audit requirements" },
];

const timelineMilestones = [
  { icon: FileText, title: "Contract & Design", desc: "Program scope, rules, pricing, and integration plan" },
  { icon: Settings, title: "Integration", desc: "TPA connection, eligibility feeds, accumulator setup" },
  { icon: TestTube, title: "Testing", desc: "End-to-end validation with real data" },
  { icon: PlayCircle, title: "Go-Live", desc: "Member enrollment and first prescriptions routed" },
  { icon: TrendingUp, title: "Optimize", desc: "Expand drug scope, refine rules, add programs" },
];

const caseStudyStats = [
  { value: "35%", label: "GLP-1 Cost Reduction" },
  { value: "20,000", label: "Employees Covered" },
  { value: "$2.8M", label: "Annual Savings" },
];

const faqItems = [
  {
    question: "What is ApalyRx?",
    answer:
      "ApalyRx is a prescription routing and benefit operations platform that helps employers and health plans access manufacturer-direct, lowest net-cost drugs by operationalizing targeted carve-out programs alongside their PBM. We provide real-time independent routing, transparent economics, and decision-level documentation for every script.",
  },
  {
    question: "Our PBM reports very low 'net' GLP-1 costs\u2014can Apaly still help?",
    answer:
      "Yes. Claim files can show \u2018net\u2019 costs differently depending on rebate timing, guarantees, and fee allocations. We provide an all-in comparison based on reconciled data. More importantly, ApalyRx provides independent, decision-level documentation for every prescription \u2014 showing which channels were evaluated and why the winning channel was selected. If your current routing is already optimal, the documentation proves it. If it is not, the savings speak for themselves.",
  },
  {
    question: "How does the routing actually work?",
    answer:
      "When a prescriber sends an e-prescription for an in-scope medication, ApalyRx evaluates it across all available channels in real time \u2014 PBM specialty, PBM mail, retail, manufacturer-direct, and independent pharmacy. The platform applies your program rules (cost share, PA/UM, channel controls) and routes to the lowest net cost. Every decision is documented with a complete audit trail.",
  },
  {
    question: "What drugs does ApalyRx focus on?",
    answer:
      "ApalyRx focuses on the highest-impact medications \u2014 typically approximately 30 high-cost drugs that represent 40-50% of employer pharmacy spend. These are the drugs where net cost varies most across channels and where optimized routing has the greatest financial impact. The platform extends to additional therapeutic categories as your program evolves.",
  },
  {
    question: "What does the member experience look like?",
    answer:
      "Members create an account on the ApalyRx platform and direct their prescribers to send in-scope prescriptions to ApalyRx. From there, the platform handles everything \u2014 eligibility validation, routing, fulfillment coordination, and concierge support. Medications ship directly to the member\u2019s home with real-time status updates and a dedicated support team.",
  },
  {
    question: "How does billing and settlement work?",
    answer:
      "ApalyRx collects member cost share at the point of service and reports to plan accumulators. The plan portion is submitted as a medical claim to your TPA for data continuity. Suppliers are paid via ACH with transparent, pass-through economics \u2014 no spread, no markup. Every transaction is reconciled in the decision-level record.",
  },
  {
    question: "What reporting and documentation do we get?",
    answer:
      "Every prescription generates a decision-level record showing which channels were evaluated, what rules were applied, the routing rationale, and net cost components. You also get reporting dashboards with program-level analytics, cost trends, and utilization data. All documentation is audit-ready by default.",
  },
  {
    question: "How long does implementation take?",
    answer:
      "Implementation follows a structured timeline: program design, TPA integration, testing, go-live, and optimization. Existing TPAs can go live in as little as 30 days. The timeline varies based on program complexity and integration requirements.",
  },
  {
    question: "What if we change PBMs or TPAs?",
    answer:
      "ApalyRx operates independently of your PBM and TPA. If you switch either one, your ApalyRx carve-out programs continue to run \u2014 we simply connect to your new TPA for claims submission and accumulator reporting. Your program rules, pricing, and documentation history are unaffected.",
  },
  {
    question: "Will this conflict with our existing PBM contract or guarantees?",
    answer:
      "ApalyRx does not require replacing your PBM. We implement carved-out programs with a clear scope and documentation so your PBM can continue managing the remainder of the pharmacy benefit. We support a structured review of relevant contract provisions and coordinate implementation steps to keep the program compliant. Many PBMs are choosing to offer ApalyRx as part of their own program \u2014 independent routing strengthens their client relationships rather than conflicting with them.",
  },
  {
    question: "Is ApalyRx pharmacy-licensed?",
    answer:
      "Yes. ApalyRx is a pharmacy-licensed operator with no ownership in any dispensing channel. This structural independence ensures that routing decisions are made solely based on lowest net cost \u2014 the evaluation has no financial interest in the outcome.",
  },
  {
    question: "What is Drug Benefit Integrity and how does it relate to ApalyRx?",
    answer:
      "Drug Benefit Integrity (DBI) is an independent industry standard with five structural requirements for ensuring pharmacy benefit decisions are made in the plan\u2019s interest. ApalyRx is the only entity that meets all five requirements \u2014 real-time all-channel routing, pharmacy-licensed operator with no channel ownership, manufacturer-direct programs built into the benefit, independent pharmacy fulfillment, and decision-level records for every script. Learn more at drugbenefitintegrity.com.",
  },
  {
    question: "Does ApalyRx help with ERISA and CAA fiduciary requirements?",
    answer:
      "Yes. The Consolidated Appropriations Act of 2026 designates PBMs as ERISA covered service providers with significant noncompliance penalties. Plan fiduciaries face personal liability for drug benefit decisions. ApalyRx produces decision-level documentation for every in-scope prescription \u2014 showing which channels were evaluated, what rules were applied, and why the winning channel was selected. This provides fiduciary-grade proof that can be presented to auditors, regulators, and beneficiaries.",
  },
];

/* ─── Page ─── */

export default function EmployersPage() {
  return (
    <>
      <WebPageSchema
        title="ApalyRx for Employers & Health Plans"
        description="Fix the drugs driving your spend without replacing your PBM. ApalyRx operationalizes targeted carve-out programs with real-time independent routing, transparent pricing, and decision-level documentation."
        url="https://www.apalyrx.com/employers"
      />
      <FaqSchema items={faqItems} />
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
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white text-sm font-semibold px-4 py-2 rounded-full mb-6 border border-white/20">
            <Building2 className="w-4 h-4" />
            <span className="font-heading">For Employers &amp; Health Plans</span>
          </div>
          <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-white mb-4">
            Fix the Drugs Driving Your Spend
          </h1>
          <p className="font-heading text-xl sm:text-2xl md:text-3xl text-[#F26522] font-semibold mb-6">
            Without Replacing Your PBM or TPA
          </p>
          <p className="font-body text-base sm:text-lg md:text-xl text-white/80 mb-8 max-w-3xl mx-auto">
            ApalyRx is a prescription routing and benefit operations platform that helps employers
            and health plans access manufacturer-direct, lowest net-cost drugs by operationalizing
            targeted carve-out programs alongside their PBM — with real-time independent routing,
            transparent economics, and decision-level documentation for every script.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center bg-[#F26522] hover:bg-[#F26522]/90 text-white font-heading font-semibold shadow-lg text-base md:text-lg px-6 md:px-8 py-4 md:py-6 rounded-lg transition-all duration-300"
          >
            Request a Conversation
          </Link>
        </div>
      </section>

      {/* ── SECTION 2: PBM PROBLEM SECTION ── */}
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
              <span className="font-heading">The Current Problem</span>
            </div>
            <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-navy leading-tight mb-4">
              Why Employers Are Frustrated
            </h2>
            <p className="font-body text-base sm:text-lg text-muted-foreground max-w-3xl mx-auto">
              The traditional model is broken. Here&apos;s what benefit managers face every day.
            </p>
          </div>

          <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {problemCards.map((card) => (
              <div
                key={card.title}
                className="group bg-white rounded-xl p-6 md:p-8 shadow-lg border border-red-100 hover:border-red-200 transition-all duration-300 relative overflow-hidden"
              >
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-red-500 to-orange-500 rounded-t-xl" />
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-orange-500 text-white rounded-full flex items-center justify-center font-bold text-sm shadow-lg">
                      {card.num}
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="p-2 rounded-lg bg-red-100 group-hover:bg-red-500 transition-all duration-300 w-fit mb-3">
                      <card.icon className="w-5 h-5 text-red-600 group-hover:text-white transition-all duration-300" />
                    </div>
                    <h3 className="font-heading text-xl md:text-2xl font-bold text-navy mb-2">
                      {card.title}
                    </h3>
                    <p className="font-body text-sm md:text-base text-muted-foreground leading-relaxed">
                      {card.desc}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <p className="inline-block font-body text-sm md:text-base text-muted-foreground bg-white/80 backdrop-blur-sm rounded-full px-6 py-3 border border-border">
              💸 Result: Overpaying by{" "}
              <span className="text-[#F26522] font-semibold">20-40%</span> on your highest-cost
              drugs,{" "}
              <span className="text-[#F26522] font-semibold">no independent proof</span> of optimal
              routing, and unhappy plan members.
            </p>
          </div>
        </div>
      </section>

      {/* ── SECTION 3: APALY SOLUTION SECTION ── */}
      <section className="relative bg-[#0F1C2E] text-white overflow-hidden py-16 md:py-24">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#F26522] rounded-full blur-3xl opacity-10 translate-x-1/2 -translate-y-1/4" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#F26522] rounded-full blur-3xl opacity-10 -translate-x-1/2 translate-y-1/4" />
        <div className="relative max-w-content mx-auto px-4">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white text-sm font-semibold px-4 py-2 rounded-full mb-6 border border-white/20">
              <CheckCircle2 className="w-4 h-4 text-green-400" />
              <span className="font-heading">The ApalyRx Solution</span>
            </div>
            <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold leading-tight mb-4">
              What You Get With ApalyRx
            </h2>
            <p className="font-body text-base sm:text-lg text-white/70 max-w-3xl mx-auto">
              A modern approach that puts you back in the driver&apos;s seat
            </p>
          </div>

          <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {solutionCards.map((card) => (
              <div
                key={card.title}
                className="group bg-white/5 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-white/10 hover:border-[#F26522]/50 hover:bg-white/10 transition-all duration-300"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-lg bg-[#F26522]/20">
                    <card.icon className="w-5 h-5 text-[#F26522]" />
                  </div>
                  <div>
                    <h3 className="font-heading text-lg md:text-xl font-bold">{card.title}</h3>
                    <p className="font-body text-sm text-white/50">{card.subtitle}</p>
                  </div>
                </div>
                <div className="mb-4">
                  <span className="font-heading text-4xl md:text-5xl font-bold text-[#F26522]">
                    {card.stat}
                  </span>
                  <span className="font-body text-sm text-white/60 ml-2">{card.statLabel}</span>
                </div>
                <p className="font-body text-sm md:text-base text-white/70 leading-relaxed">
                  {card.desc}
                </p>
              </div>
            ))}
          </div>

          <div className="max-w-4xl mx-auto mt-10">
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 text-center">
              <div className="flex items-center justify-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0" />
                <p className="font-body text-sm md:text-base text-white/80">
                  Same infrastructure.{" "}
                  <span className="text-[#F26522] font-semibold">Independent routing.</span>{" "}
                  Decision-level proof. Zero disruption.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 4: HOW IT WORKS ── */}
      <section className="bg-[#f8f9fb] py-16 md:py-24">
        <div className="max-w-content mx-auto px-4">
          <div className="text-center mb-14">
            <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-navy leading-tight">
              How ApalyRx Works
            </h2>
          </div>

          <div className="max-w-3xl mx-auto space-y-4">
            {howItWorksSteps.map((step) => (
              <div
                key={step.num}
                className="group bg-white rounded-xl p-5 md:p-6 shadow-card border border-border hover:shadow-elevated hover:border-[#F26522]/30 transition-all duration-300"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-[#F26522] to-[#d45519] text-white rounded-full flex items-center justify-center font-bold text-sm shadow-lg group-hover:scale-110 transition-all duration-300">
                    {step.num}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-heading text-lg md:text-xl font-bold text-navy mb-1">
                      {step.title}
                    </h3>
                    <p className="font-body text-sm md:text-base text-muted-foreground leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 5: CAPABILITIES SECTION ── */}
      <section className="relative bg-[#0F1C2E] text-white overflow-hidden py-16 md:py-24">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#F26522] rounded-full blur-3xl opacity-10 translate-x-1/2 -translate-y-1/4" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#F26522] rounded-full blur-3xl opacity-10 -translate-x-1/2 translate-y-1/4" />
        <div className="relative max-w-content mx-auto px-4">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white text-sm font-semibold px-4 py-2 rounded-full mb-6 border border-white/20">
              <CheckCircle2 className="w-4 h-4 text-green-400" />
              <span className="font-heading">Full Platform</span>
            </div>
            <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold leading-tight mb-4">
              Complete Platform Capabilities
            </h2>
            <p className="font-body text-base sm:text-lg text-white/70 max-w-3xl mx-auto">
              Everything you need to run high-cost drug programs, built in
            </p>
          </div>

          <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {capabilities.map((cap, i) => (
              <div
                key={i}
                className="group flex items-start gap-3 bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10 hover:border-[#F26522]/50 hover:bg-white/10 transition-all duration-300"
              >
                <div className="p-1.5 rounded-md bg-[#F26522]/20 flex-shrink-0 mt-0.5">
                  <cap.icon className="w-4 h-4 text-[#F26522]" />
                </div>
                <span className="font-body text-sm text-white/80">{cap.text}</span>
              </div>
            ))}
          </div>

          <div className="max-w-4xl mx-auto mt-10">
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 text-center">
              <div className="flex items-center justify-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0" />
                <p className="font-body text-sm md:text-base text-white/80">
                  One platform. Complete control.{" "}
                  <span className="text-[#F26522] font-semibold">Independent proof.</span>{" "}
                  Enterprise-ready.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 6: IMPLEMENTATION TIMELINE ── */}
      <section className="bg-white py-16 md:py-24">
        <div className="max-w-content mx-auto px-4">
          <div className="text-center mb-14">
            <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-navy leading-tight mb-4">
              Implementation Timeline
            </h2>
            <p className="font-body text-base sm:text-lg text-muted-foreground max-w-3xl mx-auto">
              A structured path from contract to live program
            </p>
          </div>

          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-6 relative">
              {timelineMilestones.map((milestone, i) => (
                <div key={i} className="text-center relative">
                  <div className="w-14 h-14 bg-gradient-to-br from-[#F26522] to-[#d45519] text-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                    <milestone.icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-heading text-base md:text-lg font-bold text-navy mb-1">
                    {milestone.title}
                  </h3>
                  <p className="font-body text-sm text-muted-foreground">
                    {milestone.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="text-center mt-12">
            <div className="inline-flex items-center gap-2 bg-[#f8f9fb] rounded-full px-6 py-3 border border-border">
              <Clock className="w-4 h-4 text-[#F26522]" />
              <p className="font-body text-sm md:text-base text-muted-foreground">
                Existing TPAs can go live in as little as{" "}
                <span className="text-[#F26522] font-semibold">30 days</span>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 7: CASE STUDY ── */}
      <section className="bg-[#f8f9fb] py-16 md:py-24">
        <div className="max-w-content mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl p-8 md:p-12 shadow-elevated border border-border">
              <div className="flex items-start gap-4 mb-8">
                <Quote className="w-10 h-10 text-[#F26522] flex-shrink-0 opacity-50" />
                <blockquote className="font-heading text-lg md:text-xl lg:text-2xl text-navy font-medium leading-relaxed italic">
                  &ldquo;We carved out our top GLP-1 and specialty drugs through ApalyRx. The savings were immediate, the documentation was better than anything our PBM provided, and our members had zero complaints about the experience.&rdquo;
                </blockquote>
              </div>
              <p className="font-body text-sm text-muted-foreground mb-8 pl-14">
                — Benefits Director, Self-Funded Employer
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-8 border-t border-border">
                {caseStudyStats.map((stat) => (
                  <div key={stat.label} className="text-center">
                    <span className="font-heading text-3xl md:text-4xl font-bold text-[#F26522]">
                      {stat.value}
                    </span>
                    <p className="font-body text-sm text-muted-foreground mt-1">{stat.label}</p>
                  </div>
                ))}
              </div>

              <div className="text-center mt-8">
                <p className="font-body text-sm text-muted-foreground">
                  Zero member complaints. Concierge support. Medications delivered to their door.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 8: FAQ ── */}
      <section className="bg-[#f8f9fb] py-16 md:py-24">
        <div className="max-w-content mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-navy leading-tight mb-4">
              Frequently Asked Questions
            </h2>
          </div>
          <div className="max-w-2xl mx-auto">
            <FaqAccordion items={faqItems} />
          </div>
        </div>
      </section>

      {/* ── SECTION 9: FINAL CTA ── */}
      <section className="bg-[#0F1C2E] text-white py-16 md:py-24">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
            Ready to Take Control of Your High-Cost Drug Spend?
          </h2>
          <p className="font-body text-base sm:text-lg md:text-xl text-white/80 mb-10 max-w-2xl mx-auto">
            We&apos;ll propose a carve-out program design that fits your plan — with real savings
            projections based on your population, independent routing across all channels, and
            decision-level documentation for every script.
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
