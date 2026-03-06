import type { Metadata } from "next";
import Link from "next/link";
import FaqAccordion from "@/components/FaqAccordion";
import WebPageSchema from "@/components/WebPageSchema";
import FaqSchema from "@/components/FaqSchema";
import {
  Rocket,
  EyeOff,
  TrendingDown,
  Wrench,
  AlertTriangle,
  CheckCircle2,
  Settings,
  Shield,
  Users,
  Upload,
  Truck,
  Eye,
  FileCheck,
  Lock,
  BarChart3,
  FileText,
} from "lucide-react";

export const metadata: Metadata = {
  title: "ApalyRx for Manufacturers | Direct-to-Employer Infrastructure",
  description:
    "Turn-key operational infrastructure for manufacturer direct-to-employer drug programs. eRx intake, eligibility, fulfillment, billing, settlement, and decision-level documentation - without building it yourself.",
  openGraph: {
    title: "ApalyRx for Manufacturers | Direct-to-Employer Infrastructure",
    description:
      "Turn-key operational infrastructure for manufacturer direct-to-employer drug programs. eRx intake, eligibility, fulfillment, billing, settlement, and decision-level documentation - without building it yourself.",
  },
};

/* ─── Data ─── */

const problemCards = [
  {
    icon: EyeOff,
    num: 1,
    title: "Contract-Driven Access",
    desc: "Preferred access is determined upstream through PBM contracting and rebate economics - not clinical value. Your products compete on deal structure rather than outcomes, and your direct pricing programs sit outside the benefit where plans cannot see them.",
  },
  {
    icon: TrendingDown,
    num: 2,
    title: "Market Share Pressure",
    desc: "Preferred positioning shifts based on rebate renegotiations and formulary changes outside your control. Even when your product offers the best net cost, the plan has no independent way to verify that - and no infrastructure to route to you directly.",
  },
  {
    icon: Wrench,
    num: 3,
    title: "No Infrastructure for Direct-to-Employer",
    desc: "Launching a direct-to-employer program requires eRx intake, eligibility validation, cost-share collection, accumulator reporting, medical-claim billing, and supplier settlement. Most manufacturers do not have this infrastructure - and building it is not your core business.",
  },
  {
    icon: AlertTriangle,
    num: 4,
    title: "Channel Considerations",
    desc: "Manufacturers want to serve employer demand directly but hesitate due to channel complexity and existing contractual relationships. A parallel pathway that preserves PBM relationships while opening direct access - with documented proof of program value - has not existed until now.",
  },
];

const solutionCards = [
  {
    icon: Settings,
    title: "Operate at Scale",
    subtitle: "Complete End-to-End Infrastructure",
    stat: "90 days",
    statLabel: "to launch",
    desc: "ApalyRx provides the full operating layer: eRx intake, program rules and conversion logic, eligibility validation, cost-share collection, accumulator reporting, medical-claim billing, and automated supplier settlement via ACH. Your programs run like a seamless benefit - not a parallel vendor workflow.",
  },
  {
    icon: Shield,
    title: "Preserve Your PBM Channel",
    subtitle: "Parallel Pathway, Zero Disruption",
    stat: "0%",
    statLabel: "disruption",
    desc: "ApalyRx operates as a parallel employer pathway alongside existing PBM contracts. Your PBM relationships stay intact. Direct-to-employer programs run through ApalyRx independently - scoped, documented, and structurally separate from PBM adjudication.",
  },
  {
    icon: Users,
    title: "Demand Aggregation",
    subtitle: "Access Employer Lives at Scale",
    stat: "500K+",
    statLabel: "lives today",
    desc: "Access 500K+ covered lives today through ApalyRx\u2019s employer and health plan network - with growth to 1M+ by Q2 and 5M+ in pipeline. ApalyRx aggregates employer demand so you reach eligible patients through a documented benefit channel, not a fragmented cash-pay workaround.",
  },
  {
    icon: TrendingDown,
    title: "Set Your Price",
    subtitle: "Transparent Pass-Through Economics",
    stat: "100%",
    statLabel: "your control",
    desc: "You set competitive direct pricing under your commercial terms. ApalyRx passes it through transparently to the plan - no spread, no markup on drug cost. Every transaction generates a decision-level record showing why your channel was selected, giving employers documented proof of program value.",
  },
];

const launchSteps = [
  {
    num: 1,
    icon: Upload,
    title: "Load Products & Pricing",
    desc: "Upload your products and set pricing under your commercial terms. Define program parameters, conversion logic, and handling requirements. Full control over your economics.",
  },
  {
    num: 2,
    icon: Users,
    title: "We Bring the Clients",
    desc: "ApalyRx connects your programs with employer and health plan clients. Aggregated demand, no direct sales overhead. Your programs are evaluated inside the benefit alongside all other channels.",
  },
  {
    num: 3,
    icon: Settings,
    title: "We Run the Operations",
    desc: "Eligibility validation, program rules, PA/UM workflows, cost-share collection, accumulator reporting, medical-claim billing, and supplier settlement. Turnkey operations with decision-level documentation for every prescription.",
  },
  {
    num: 4,
    icon: Truck,
    title: "Turnkey Fulfillment",
    desc: "Prescriptions routed to licensed independent partner pharmacies serving as pharmacy of record. Product shipped directly to the member via your designated logistics or third-party carrier. White-glove member experience with tracking and concierge support.",
  },
];

const complianceCards = [
  { icon: Eye, text: "Pricing visible only to authorized parties" },
  { icon: FileCheck, text: "Audit logs, controlled access, structured governance" },
  { icon: Shield, text: "HIPAA compliant, SOC 2 Type II controls" },
  { icon: Lock, text: "No channel disruption - parallel pathway preserving existing contracts" },
];

const complianceCardsRow2 = [
  { icon: BarChart3, text: "Decision-level records for every prescription - channels compared, rules applied, routing rationale" },
  { icon: FileText, text: "Fiduciary-grade documentation supporting employer ERISA and CAA audit requirements" },
];

const faqItems = [
  {
    question: "Will this create unpredictable share or switching dynamics?",
    answer:
      "ApalyRx programs operate with defined commitment windows - typically 12 months. Volume is predictable because programs are configured with specific employer populations, drug scope, and channel rules. You have full visibility into program participation.",
  },
  {
    question: "Will this disrupt our PBM relationships?",
    answer:
      "No. ApalyRx operates as a parallel employer pathway that is structurally separate from PBM adjudication. Your PBM contracts remain intact. Programs are scoped, documented, and do not interfere with existing formulary or rebate arrangements. Many PBMs are choosing to offer ApalyRx as part of their own program - independent routing strengthens their client relationships.",
  },
  {
    question: "Do we lose control of pricing?",
    answer:
      "You set your own pricing under your commercial terms. ApalyRx passes it through transparently - no spread, no markup on drug cost. Pricing is visible only to authorized parties with contractual protections and structured governance.",
  },
  {
    question: "What operational burden does this create for us?",
    answer:
      "Minimal. ApalyRx provides turnkey execution - benefit configuration, eRx intake, eligibility validation, program rules, fulfillment orchestration, cost-share collection, accumulator reporting, medical-claim billing, and supplier settlement. You supply product and define program parameters. We handle everything else - including decision-level documentation.",
  },
  {
    question: "Do we have to contract with hundreds of individual employers?",
    answer:
      "No. ApalyRx operates a scalable platform model. You contract with ApalyRx, and we manage the employer and health plan relationships. Your programs reach aggregated demand through a single operational integration.",
  },
  {
    question: "How do you handle appropriate use without creating PA/UM friction?",
    answer:
      "ApalyRx supports configurable clinical guardrails - light-touch PA/UM workflows, conversion logic, and eligibility criteria that you and the employer define. The goal is appropriate use with minimal friction for prescribers and members.",
  },
  {
    question: "What is the member and prescriber experience?",
    answer:
      "Members receive a true benefit experience - clear costs, status tracking, concierge support, and home delivery. Prescribers use standard e-prescribing to send prescriptions to ApalyRx. No new portals, no additional steps for routine prescribing. The experience is designed to feel like a premium benefit, not a workaround.",
  },
  {
    question: "How do you handle compliance, privacy, and data sharing?",
    answer:
      "ApalyRx provides de-identified reporting and structured data governance. The platform is HIPAA compliant with SOC 2 Type II controls. Pricing is protected, access is controlled, and audit logs document every action.",
  },
  {
    question: "Can this scale beyond a pilot?",
    answer:
      "ApalyRx has been operating since 2018 and serves Fortune 500 employers. The platform is built for scale - multi-product, multi-employer, multi-program - with automated operations that do not require linear headcount growth.",
  },
  {
    question: "What proof do you have of employer adoption?",
    answer:
      "ApalyRx currently covers 500K+ lives, with growth to 1M+ by Q2 and 5M+ in the pipeline across employers, health plans, and PBMs. Employer demand for manufacturer-direct programs is accelerating as plans seek transparent, lowest-net-cost alternatives with independent documentation.",
  },
  {
    question: "What does the pharmacy of record model look like?",
    answer:
      "In manufacturer-direct models, ApalyRx routes prescriptions to licensed independent partner pharmacies that serve as pharmacy of record. The pharmacist conducts drug utilization review and final dispense verification. Product is shipped directly to the member from your designated logistics provider or a third-party carrier. The pharmacy of record model provides the regulatory and clinical framework while your logistics handle physical fulfillment.",
  },
  {
    question: "How does this relate to Drug Benefit Integrity?",
    answer:
      "Drug Benefit Integrity (DBI) is an independent industry standard with five structural requirements for ensuring pharmacy benefit decisions are made in the plan\u2019s interest. ApalyRx meets all five - including evaluating manufacturer-direct programs inside the benefit rather than leaving them invisible to the plan. For manufacturers, this means your programs are evaluated on merit alongside all other channels, and every routing decision is independently documented. When your program offers the best net cost, there is proof. Learn more at drugbenefitintegrity.com.",
  },
];

/* ─── Page ─── */

export default function ManufacturersPage() {
  return (
    <>
      <WebPageSchema
        title="ApalyRx for Manufacturers"
        description="Turn-key operational infrastructure for manufacturer direct-to-employer drug programs. eRx intake, eligibility, fulfillment, billing, settlement, and decision-level documentation."
        url="https://www.apalyrx.com/manufacturers"
      />
      <FaqSchema items={faqItems} />
      {/* ── SECTION 1: HERO ── */}
      <section className="relative bg-[#0F1C2E] overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#F26522] rounded-full blur-3xl opacity-10 translate-x-1/2 -translate-y-1/4" />
        <div className="relative max-w-4xl mx-auto px-4 pt-28 sm:pt-32 md:pt-48 lg:pt-56 pb-12 md:pb-20 text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white text-sm font-semibold px-4 py-2 rounded-full mb-6 border border-white/20">
            <Rocket className="w-4 h-4" />
            <span className="font-heading">For Manufacturers</span>
          </div>
          <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-white mb-4">
            Employer Direct - Operationally Simple
          </h1>
          <p className="font-heading text-xl sm:text-2xl md:text-3xl text-[#F26522] font-semibold mb-6">
            Without Disrupting Your Existing Channel Strategy
          </p>
          <p className="font-body text-base sm:text-lg md:text-xl text-white/80 mb-8 max-w-3xl mx-auto">
            ApalyRx is the operational layer for manufacturer direct-to-employer programs -
            configurable rules, eRx intake, real-time fulfillment routing, medical claims settlement,
            accumulator reporting, and decision-level documentation. Your programs run inside the
            benefit, not outside it.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center bg-[#F26522] hover:bg-[#F26522]/90 text-white font-heading font-semibold shadow-lg text-base md:text-lg px-6 md:px-8 py-4 md:py-6 rounded-lg transition-all duration-300"
          >
            Request a Conversation
          </Link>
        </div>
      </section>

      {/* ── SECTION 2: PROBLEM SECTION ── */}
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
            <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-navy leading-tight">
              Why Manufacturers Lose Market Share
            </h2>
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
            <p className="inline-block font-body text-sm md:text-base text-white bg-[#0F1C2E] rounded-full px-6 py-3">
              💸 Result: Billions invested in patient access programs that remain{" "}
              <span className="text-[#F26522] font-semibold">invisible to the benefit</span> - and
              no operational infrastructure to change it.
            </p>
          </div>
        </div>
      </section>

      {/* ── SECTION 3: SOLUTION SECTION ── */}
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
              Why Manufacturers Use ApalyRx
            </h2>
            <p className="font-body text-base sm:text-lg text-white/70 max-w-3xl mx-auto">
              The infrastructure you&apos;d have to build - but don&apos;t have to
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
                  Your products. Your pricing.{" "}
                  <span className="text-[#F26522] font-semibold">Inside the benefit.</span> Fully
                  documented.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 4: LAUNCH STEPS ── */}
      <section className="bg-white py-16 md:py-24">
        <div className="max-w-content mx-auto px-4">
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 bg-white border border-border text-navy text-sm font-semibold px-4 py-2 rounded-full mb-6 shadow-card">
              <Rocket className="w-4 h-4 text-[#F26522]" />
              <span className="font-heading">Quick Launch</span>
            </div>
            <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-navy leading-tight mb-4">
              4-Step Launch Process
            </h2>
            <p className="font-body text-base sm:text-lg text-muted-foreground max-w-3xl mx-auto">
              From product upload to market access in weeks, not months
            </p>
          </div>

          <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-4">
            {launchSteps.map((step, i) => (
              <div key={step.num} className="relative">
                <div className="group bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:border-[#F26522]/30 hover:shadow-xl transition-all duration-300 h-full">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#F26522] to-[#d45519] text-white rounded-full flex items-center justify-center font-bold text-lg shadow-lg mb-4 group-hover:scale-110 transition-all duration-300">
                    {step.num}
                  </div>
                  <div className="p-2 rounded-lg bg-[#F26522]/10 w-fit mb-3">
                    <step.icon className="w-5 h-5 text-[#F26522]" />
                  </div>
                  <h3 className="font-heading text-lg font-bold text-navy mb-2">{step.title}</h3>
                  <p className="font-body text-sm text-muted-foreground leading-relaxed">
                    {step.desc}
                  </p>
                </div>
                {/* Arrow connector */}
                {i < launchSteps.length - 1 && (
                  <div className="hidden lg:flex absolute top-1/2 -right-3 -translate-y-1/2 z-10 text-[#F26522]">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <path d="M5 10H15M15 10L10 5M15 10L10 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 5: COMPLIANCE SECTION ── */}
      <section className="bg-[#0F1C2E]/5 py-16 md:py-24">
        <div className="max-w-content mx-auto px-4">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 text-sm font-semibold px-4 py-2 rounded-full mb-6">
              <Shield className="w-4 h-4" />
              <span className="font-heading">Enterprise Platform</span>
            </div>
            <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-navy leading-tight">
              Secure, Compliant, and Documented
            </h2>
          </div>

          <div className="max-w-5xl mx-auto">
            {/* Row 1: 4 cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
              {complianceCards.map((card, i) => (
                <div
                  key={i}
                  className="group bg-white rounded-xl p-5 shadow-card border border-gray-100 hover:shadow-elevated hover:border-green-200 transition-all duration-300"
                >
                  <div className="p-2 rounded-lg bg-green-100 group-hover:bg-green-500 transition-all duration-300 w-fit mb-3">
                    <card.icon className="w-5 h-5 text-green-600 group-hover:text-white transition-all duration-300" />
                  </div>
                  <p className="font-body text-sm text-muted-foreground leading-relaxed">
                    {card.text}
                  </p>
                </div>
              ))}
            </div>

            {/* Row 2: 2 new cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 mt-4">
              {complianceCardsRow2.map((card, i) => (
                <div
                  key={i}
                  className="group bg-white rounded-xl p-5 shadow-card border border-gray-100 hover:shadow-elevated hover:border-green-200 transition-all duration-300"
                >
                  <div className="p-2 rounded-lg bg-green-100 group-hover:bg-green-500 transition-all duration-300 w-fit mb-3">
                    <card.icon className="w-5 h-5 text-green-600 group-hover:text-white transition-all duration-300" />
                  </div>
                  <p className="font-body text-sm text-muted-foreground leading-relaxed">
                    {card.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 6: FAQ ── */}
      <section className="bg-[#f8f9fb] py-16 md:py-24">
        <div className="max-w-content mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-navy leading-tight mb-4">
              Common Manufacturer Questions
            </h2>
            <p className="font-body text-base sm:text-lg text-muted-foreground">
              (and how ApalyRx addresses them)
            </p>
          </div>
          <div className="max-w-2xl mx-auto">
            <FaqAccordion items={faqItems} />
          </div>
        </div>
      </section>

      {/* ── SECTION 7: FINAL CTA ── */}
      <section className="bg-[#0F1C2E] text-white py-16 md:py-24">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4">
            Launch Your Employer Direct Program
          </h2>
          <p className="font-heading text-xl sm:text-2xl md:text-3xl text-[#F26522] font-semibold mb-6">
            Turn-Key Infrastructure. Inside the Benefit. Fully Documented.
          </p>
          <p className="font-body text-base sm:text-lg md:text-xl text-white/80 mb-10 max-w-2xl mx-auto">
            Tell us about your product portfolio and employer-direct objectives. We will show you how
            ApalyRx can operationalize your programs at scale - with transparent economics,
            decision-level documentation, and access to a growing network of employer and health plan
            clients.
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
