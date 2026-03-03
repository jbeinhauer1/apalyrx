import type { Metadata } from "next";
import Link from "next/link";
import FaqAccordion from "@/components/FaqAccordion";
import {
  Smile,
  AlertTriangle,
  DollarSign,
  HelpCircle,
  Headphones,
  CheckCircle2,
  Star,
  Eye,
  Truck,
  FileCheck,
  Bell,
  UserCheck,
  Settings,
  UserPlus,
  Stethoscope,
  Package,
} from "lucide-react";

export const metadata: Metadata = {
  title: "ApalyRx for Plan Members | Your Medications, Simplified",
  description:
    "VIP concierge support for your high-cost medications. Clear pricing, home delivery, and a dedicated support team — covered by your employer.",
  openGraph: {
    title: "ApalyRx for Plan Members | Your Medications, Simplified",
    description:
      "VIP concierge support for your high-cost medications. Clear pricing, home delivery, and a dedicated support team — covered by your employer.",
  },
};

const problemCards = [
  {
    icon: DollarSign,
    title: "Surprise Costs",
    desc: "You show up at the pharmacy and find out your medication costs $1,000. No one told you.",
  },
  {
    icon: HelpCircle,
    title: "Confusion",
    desc: "You don't know where to fill your prescription, what PA is needed, or what your next step is.",
  },
  {
    icon: Headphones,
    title: "No Support",
    desc: "You're stuck between your doctor and your insurance with no one helping you navigate.",
  },
];

const benefitCards = [
  {
    icon: Star,
    title: "VIP Concierge",
    stat: "24/7",
    statLabel: "support",
  },
  {
    icon: DollarSign,
    title: "Often Cheaper",
    stat: "20%+",
    statLabel: "savings",
  },
  {
    icon: Eye,
    title: "Cost Visibility",
    stat: "$0",
    statLabel: "surprises",
  },
  {
    icon: Truck,
    title: "Home Delivery",
    stat: "3-5",
    statLabel: "days",
  },
];

const additionalFeatures = [
  {
    icon: FileCheck,
    text: "Full prescription visibility — status, requirements, shipping",
  },
  {
    icon: Headphones,
    text: "PA support — we have automated the process",
  },
  {
    icon: Bell,
    text: "Proactive notifications — status updates, refill reminders",
  },
  {
    icon: UserCheck,
    text: "Member choice — select your preferred options",
  },
];

const steps = [
  {
    num: 1,
    icon: UserPlus,
    title: "Create Account",
    desc: "Sign up on the member portal",
  },
  {
    num: 2,
    icon: Stethoscope,
    title: "Tell Your Doctor",
    desc: "Ask them to send your prescription to Apaly Rx",
  },
  {
    num: 3,
    icon: Settings,
    title: "We Handle It",
    desc: "Coverage, cost share, PA, routing",
  },
  {
    num: 4,
    icon: Package,
    title: "Get Your Meds",
    desc: "Ships to your home with tracking",
  },
];

const faqItems = [
  {
    question: "Do I have to change doctors?",
    answer:
      "No. You keep your same doctor. Just ask them to send your prescription to Apaly Rx.",
  },
  {
    question: "How much will I pay?",
    answer:
      "Your cost share (copay or coinsurance) is determined by your employer\u2019s health plan. ApalyRx processes everything through your benefit, so your normal cost-sharing applies. In many cases, optimized routing results in lower out-of-pocket costs.",
  },
  {
    question: "How long does delivery take?",
    answer:
      "Most medications ship within 24 hours of processing and arrive within 3-5 business days with tracking provided.",
  },
  {
    question: "What if I have questions or issues?",
    answer:
      "You have a dedicated support team ready to help. Email us at support@apalyrx.com or call during business hours.",
  },
  {
    question: "Does this count toward my deductible?",
    answer:
      "Yes. All ApalyRx prescriptions are billed as medical claims through your employer\u2019s health plan, so they count toward your deductible and out-of-pocket maximum.",
  },
];

export default function PlanMembersPage() {
  return (
    <>
      {/* ── Section 1: Hero ── */}
      <section className="relative bg-[#0F1C2E] overflow-hidden pt-28 sm:pt-32 md:pt-48 lg:pt-56 pb-12 md:pb-20">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#F26522] rounded-full blur-3xl opacity-10 translate-x-1/2 -translate-y-1/4" />
        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 bg-[#F26522] text-white text-sm font-semibold px-4 py-2 rounded-full mb-8">
            <Smile className="w-4 h-4" />
            <span className="font-heading">For Plan Members</span>
          </div>
          <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-4">
            Your Medications, Simplified
          </h1>
          <p className="font-heading text-xl sm:text-2xl text-[#F26522] font-semibold mb-4">
            VIP Care. Clear Pricing. Home Delivery.
          </p>
          <p className="font-body text-base sm:text-lg md:text-xl text-white/80 mb-10 max-w-2xl mx-auto">
            Concierge support for certain high-cost medications — covered by
            your employer, with clear costs and home delivery.
          </p>
          <a
            href="https://apalyrx.net/sign-up"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center bg-[#F26522] hover:bg-[#F26522]/90 text-white font-heading font-semibold text-lg px-8 py-6 rounded-lg shadow-lg transition-all duration-300"
          >
            Create Account
          </a>
        </div>
      </section>

      {/* ── Section 2: The Old Way ── */}
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
              <span className="font-heading">The Old Way</span>
            </div>
            <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-navy leading-tight">
              You Deserve Better Than This
            </h2>
          </div>

          <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {problemCards.map((card) => (
              <div
                key={card.title}
                className="group bg-white rounded-xl p-6 md:p-8 shadow-lg border border-red-100 hover:border-red-200 transition-all duration-300 relative overflow-hidden"
              >
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-red-500 to-orange-500 rounded-t-xl" />
                <div className="p-3 rounded-xl bg-red-100 group-hover:bg-red-500 transition-all duration-300 w-fit mb-5">
                  <card.icon className="w-7 h-7 text-red-600 group-hover:text-white transition-all duration-300" />
                </div>
                <h3 className="font-heading text-xl font-bold text-navy mb-3">
                  {card.title}
                </h3>
                <p className="font-body text-sm md:text-base text-muted-foreground leading-relaxed">
                  {card.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Section 3: The Apaly Experience ── */}
      <section className="relative bg-[#0F1C2E] py-16 md:py-24 overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#F26522] rounded-full blur-3xl opacity-10 translate-x-1/2 -translate-y-1/4" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#F26522] rounded-full blur-3xl opacity-10 -translate-x-1/2 translate-y-1/4" />

        <div className="relative max-w-content mx-auto px-4">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-[#F26522] text-white text-sm font-semibold px-4 py-2 rounded-full mb-6">
              <CheckCircle2 className="w-4 h-4" />
              <span className="font-heading">The Apaly Experience</span>
            </div>
            <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight">
              The Experience You Deserve
            </h2>
          </div>

          {/* Stat Cards */}
          <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {benefitCards.map((card) => (
              <div
                key={card.title}
                className="group bg-white/5 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-white/10 hover:border-[#F26522]/50 hover:bg-white/10 transition-all duration-300"
              >
                <div className="p-3 rounded-xl bg-[#F26522]/20 group-hover:bg-[#F26522] transition-all duration-300 w-fit mb-4">
                  <card.icon className="w-6 h-6 text-[#F26522] group-hover:text-white transition-all duration-300" />
                </div>
                <h3 className="font-heading text-lg font-semibold text-white mb-2">
                  {card.title}
                </h3>
                <p className="font-heading text-2xl md:text-3xl font-bold text-[#F26522]">
                  {card.stat}
                </p>
                <p className="font-body text-xs text-white/50 uppercase tracking-wider">
                  {card.statLabel}
                </p>
              </div>
            ))}
          </div>

          {/* Additional Features */}
          <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4">
            {additionalFeatures.map((feature) => (
              <div
                key={feature.text}
                className="flex items-center gap-4 bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10"
              >
                <div className="p-2 rounded-lg bg-[#F26522]/20 flex-shrink-0">
                  <feature.icon className="w-5 h-5 text-[#F26522]" />
                </div>
                <span className="font-body text-sm md:text-base text-white/70">{feature.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Section 4: How It Works ── */}
      <section className="bg-white py-12 md:py-16">
        <div className="max-w-content mx-auto px-4">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-[#0F1C2E] text-white text-xs font-semibold px-3 py-1.5 rounded-full mb-6">
              <Settings className="w-3 h-3" />
              <span className="font-heading">Easy Process</span>
            </div>
            <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-navy leading-tight mb-3">
              4 Simple Steps
            </h2>
            <p className="font-body text-lg text-muted-foreground">
              Getting started with Apaly Rx is easy
            </p>
          </div>

          <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 items-center">
            {/* Image placeholder */}
            <div className="order-2 lg:order-1 relative">
              <div className="rounded-xl bg-[#f4f5f7] bg-gradient-to-br from-[#f4f5f7] to-[#e8eaed] aspect-[4/3] flex items-center justify-center">
                <div className="text-center text-muted-foreground">
                  <div className="w-16 h-16 bg-white/80 rounded-full flex items-center justify-center mx-auto mb-3 shadow-sm">
                    <Smile className="w-8 h-8 text-orange" />
                  </div>
                  <p className="font-heading text-sm font-medium">Member Portal</p>
                </div>
              </div>
              {/* Floating badge */}
              <div className="absolute bottom-4 right-4 bg-white rounded-lg shadow-lg p-3 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-success" />
                <div>
                  <p className="font-heading text-xs font-bold text-navy">Easy to use</p>
                  <p className="font-body text-xs text-muted-foreground">Simple app</p>
                </div>
              </div>
            </div>

            {/* Steps */}
            <div className="order-1 lg:order-2 space-y-3">
              {steps.map((step) => (
                <div
                  key={step.num}
                  className="group bg-white rounded-lg p-4 shadow-md border border-gray-100 hover:border-[#F26522]/30 hover:shadow-lg transition-all duration-300 flex items-center gap-4"
                >
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#F26522] to-[#d45519] text-white font-bold flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-all duration-300">
                    {step.num}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-heading text-base font-bold text-navy">
                      {step.title}
                    </h3>
                    <p className="font-body text-sm text-muted-foreground">{step.desc}</p>
                  </div>
                  <div className="p-1.5 rounded-md bg-[#F26522]/10 group-hover:bg-[#F26522] transition-all duration-300 flex-shrink-0">
                    <step.icon className="w-4 h-4 text-[#F26522] group-hover:text-white transition-all duration-300" />
                  </div>
                </div>
              ))}

              <div className="pt-4">
                <a
                  href="https://apalyrx.net/sign-up"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center bg-[#0F1C2E] hover:bg-navy-dark text-white font-heading font-semibold text-base px-8 py-5 rounded-lg transition-all duration-300"
                >
                  Create Account
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Section 5: FAQ ── */}
      <section className="bg-[#f8f9fb] py-12 md:py-16">
        <div className="max-w-content mx-auto px-4">
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-navy leading-tight text-center mb-10">
            Frequently Asked Questions
          </h2>
          <div className="max-w-2xl mx-auto">
            <FaqAccordion items={faqItems} />
          </div>
        </div>
      </section>

      {/* ── Section 6: Final CTA ── */}
      <section className="bg-[#0F1C2E] py-16 md:py-24">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-8">
            Questions About Your Medications?
          </h2>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center bg-[#F26522] hover:bg-[#F26522]/90 text-white font-heading font-semibold text-lg px-8 py-6 rounded-lg shadow-lg transition-all duration-300"
          >
            Contact Member Support
          </Link>
        </div>
      </section>
    </>
  );
}
