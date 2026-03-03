import type { Metadata } from "next";
import Link from "next/link";
import FaqAccordion from "@/components/FaqAccordion";
import WebPageSchema from "@/components/WebPageSchema";
import FaqSchema from "@/components/FaqSchema";
import {
  Store,
  AlertTriangle,
  TrendingDown,
  DollarSign,
  XCircle,
  PackageX,
  CheckCircle2,
  TrendingUp,
  Shield,
  Package,
  Layers,
  Scale,
  Eye,
  Ban,
  ShieldCheck,
  Rocket,
  UserPlus,
  ClipboardCheck,
  Settings,
  Star,
  FileCheck,
  Pill,
} from "lucide-react";

export const metadata: Metadata = {
  title: "ApalyRx for Independent Pharmacies | Dispensing & Pharmacy of Record",
  description:
    "Partner with ApalyRx - prescriptions routed on merit. Fair dispensing fees, no DIR fees, no clawbacks, and no competing channel interests. Dispense directly or serve as pharmacy of record in manufacturer-direct models.",
  openGraph: {
    title: "ApalyRx for Independent Pharmacies | Dispensing & Pharmacy of Record",
    description:
      "Partner with ApalyRx - prescriptions routed on merit. Fair dispensing fees, no DIR fees, no clawbacks, and no competing channel interests. Dispense directly or serve as pharmacy of record in manufacturer-direct models.",
  },
};

/* ─── Data ─── */

const problemCards = [
  {
    icon: TrendingDown,
    num: 1,
    title: "Reimbursement Below Acquisition Cost",
    desc: "Independent pharmacies are increasingly reimbursed less than what they paid their wholesaler for the same medication. When MAC pricing adjusts without notice and reimbursement rates lag behind acquisition costs, every fill can become a loss. One industry study found that roughly 75% of claims examined were insufficient to cover pharmacy labor and drug costs. The result: dispensing the very prescriptions your patients need can threaten your business.",
  },
  {
    icon: DollarSign,
    num: 2,
    title: "Retroactive Adjustments and Clawbacks",
    desc: "After dispensing a prescription and believing the economics are workable, pharmacies face retroactive reductions \u2014 DIR fees, post-sale adjustments, and clawbacks that erode margins months after the fact. These make it nearly impossible to predict revenue, manage cash flow, or plan for growth. The uncertainty is as damaging as the dollar amount.",
  },
  {
    icon: XCircle,
    num: 3,
    title: "Network Exclusion and Narrowing",
    desc: "Preferred pharmacy networks increasingly favor affiliated or chain pharmacies, reducing independent pharmacies\u2019 access to covered lives. Nearly 30% of all U.S. retail pharmacies closed between 2010 and 2021, with independent pharmacies significantly more likely to close than chain locations. When a community pharmacy closes, patients in that area often lose their most accessible healthcare provider.",
  },
  {
    icon: PackageX,
    num: 4,
    title: "Cut Out of Emerging Supply Chains",
    desc: "Manufacturer-direct programs like LillyDirect and NovoCare route prescriptions through one or two nationally contracted mail-order pharmacies \u2014 cutting local independents out of the supply chain entirely. As direct-to-consumer pharmacy grows and platforms like TrumpRx accelerate the trend, independent pharmacies risk being bypassed by the very models reshaping how high-cost medications reach patients.",
  },
];

const solutionCards = [
  {
    icon: TrendingUp,
    title: "New Prescription Volume",
    subtitle: "From a Growing Platform",
    stat: "500K+",
    statLabel: "lives today",
    desc: "As PBMs, employers, health plans, and manufacturers deploy programs through ApalyRx, prescriptions flow to independent pharmacy partners. You receive volume because your pricing and service earned it. The platform currently serves 500K+ covered lives with growth to 1M+ by Q2 and 5M+ in the pipeline \u2014 every new client means more prescriptions routed to independent pharmacies.",
  },
  {
    icon: DollarSign,
    title: "Fair, Transparent Reimbursement",
    subtitle: "No Hidden Spreads or Clawbacks",
    stat: "$0",
    statLabel: "DIR fees",
    desc: "ApalyRx operates on a pass-through model. Reimbursement is based on actual acquisition cost plus a fair dispensing fee \u2014 agreed upon upfront, not adjusted retroactively. No hidden spreads. No DIR fees. No clawbacks. No post-sale adjustments. You know exactly what you will be paid before you fill the prescription.",
  },
  {
    icon: Shield,
    title: "No Competing Interests",
    subtitle: "Structurally Independent",
    stat: "0",
    statLabel: "owned pharmacies",
    desc: "ApalyRx has no ownership in any dispensing channel. There is no affiliated mail pharmacy, no owned specialty pharmacy, no retail chain competing for the same prescriptions. When ApalyRx routes a prescription to your pharmacy, it is because you were the best option \u2014 not because someone upstream has a financial interest in sending it elsewhere.",
  },
  {
    icon: Package,
    title: "Inside the New Supply Chain",
    subtitle: "Don\u2019t Get Left Behind",
    stat: "2",
    statLabel: "revenue roles",
    desc: "While manufacturer-direct models typically contract with one or two national mail-order pharmacies, ApalyRx brings those programs to local independent pharmacies. You can serve as the dispensing pharmacy filling prescriptions directly, or as the pharmacy of record in manufacturer-direct models \u2014 conducting drug utilization review while product ships from manufacturer logistics. Either way, you are inside the supply chain, not watching it from the outside.",
  },
];

const dispensingBullets = [
  "Fill prescriptions routed based on lowest net cost",
  "Reimbursement at acquisition cost plus fair dispensing fee",
  "No retroactive adjustments or clawbacks",
  "Volume grows as more clients deploy ApalyRx programs",
];

const porBullets = [
  "Conduct DUR and final dispense verification",
  "Product ships from manufacturer logistics to patient",
  "Earn pharmacy of record fee for clinical services",
  "Participate in the manufacturer-direct supply chain that other models exclude you from",
];

const whyDifferentCards = [
  {
    icon: Scale,
    title: "Merit-Based Routing",
    desc: "Prescriptions route to your pharmacy because you offered the best net cost and service \u2014 not because of network tier, channel affiliation, or volume guarantees to a competing pharmacy. Every routing decision is based on actual economics, and you can see exactly why you won or did not win a given prescription.",
  },
  {
    icon: Eye,
    title: "Full Transparency",
    desc: "You see the reimbursement before you fill. The economics are agreed upon upfront. There is no hidden spread between what the plan pays and what you receive. ApalyRx passes through the actual cost \u2014 your dispensing fee is your dispensing fee.",
  },
  {
    icon: Ban,
    title: "No Retroactive Adjustments",
    desc: "No DIR fees. No post-sale clawbacks. No retroactive MAC adjustments months after dispensing. What you are paid when you fill is what you keep. Period.",
  },
  {
    icon: ShieldCheck,
    title: "No Competing Channel",
    desc: "ApalyRx does not own a pharmacy. Not a mail pharmacy, not a specialty pharmacy, not a retail chain. There is no affiliated dispensing channel that benefits from steering volume away from you. Your prescriptions are earned, not redirected.",
  },
  {
    icon: Rocket,
    title: "Growing Volume",
    desc: "ApalyRx currently serves 500K+ covered lives, growing to 1M+ by Q2 with 5M+ in the pipeline. Every new PBM, employer, health plan, or manufacturer that deploys programs through ApalyRx adds prescription volume flowing to independent pharmacy partners. The more the platform grows, the more prescriptions flow to you.",
  },
];

const joinSteps = [
  {
    num: 1,
    icon: ClipboardCheck,
    title: "Apply",
    desc: "Complete the pharmacy partner application. Requirements include independent ownership with no vertical ties to PBMs, insurers, or GPOs, and active state pharmacy licensure.",
  },
  {
    num: 2,
    icon: Settings,
    title: "Onboard",
    desc: "Complete credentialing, agree to transparent pass-through reimbursement terms, and connect to ApalyRx systems for prescription intake and fulfillment coordination.",
  },
  {
    num: 3,
    icon: CheckCircle2,
    title: "Start Receiving Prescriptions",
    desc: "Once onboarded, your pharmacy is live on the platform. Prescriptions begin routing to you based on your pricing, service area, and program eligibility. Volume grows as the platform grows.",
  },
];

const faqItems = [
  {
    question: "What types of prescriptions will I receive through ApalyRx?",
    answer:
      "ApalyRx programs typically focus on high-cost, high-variability medications \u2014 approximately 30 drugs that represent 40% or more of employer and health plan pharmacy spend. These are often specialty and branded medications where net cost differences across channels are significant. As the platform grows and more clients deploy programs, the scope of medications routed to pharmacy partners expands.",
  },
  {
    question: "How is reimbursement calculated?",
    answer:
      "Reimbursement is based on actual acquisition cost plus a fair dispensing fee, agreed upon upfront in your partner agreement. There are no hidden spreads between what the plan pays and what you receive. No DIR fees. No post-sale clawbacks. No retroactive MAC adjustments. The economics you see before you fill are the economics you keep.",
  },
  {
    question: "What does the pharmacy of record role involve?",
    answer:
      "In manufacturer-direct programs, you serve as the licensed pharmacy of record. You receive the prescription through e-prescribing, conduct drug utilization review, verify the prescription, and provide clinical oversight. The physical product ships directly to the member from the manufacturer\u2019s designated logistics provider. You earn a pharmacy of record fee for your clinical role. This model keeps you in the supply chain for manufacturer-direct programs that would otherwise bypass local pharmacies entirely.",
  },
  {
    question: "Do I need special technology or systems?",
    answer:
      "ApalyRx provides the technology integration for prescription intake, routing confirmation, and fulfillment coordination. Specific requirements will be reviewed during onboarding. The integration is designed to work with your existing pharmacy management systems without requiring major technology investments.",
  },
  {
    question: "Can I participate in both roles \u2014 dispensing and pharmacy of record?",
    answer:
      "Yes. Many ApalyRx pharmacy partners serve in both capacities. For some programs and products, you will be the dispensing pharmacy filling prescriptions directly. For manufacturer-direct programs, you may serve as pharmacy of record. Your role depends on the specific program, product, and routing outcome.",
  },
  {
    question: "What are the ownership requirements?",
    answer:
      "ApalyRx requires independent ownership \u2014 no vertical ties to PBMs, insurers, or GPOs. This is a structural requirement, not an arbitrary preference. The independence of the dispensing pharmacy is one of the five requirements of Drug Benefit Integrity. If your pharmacy has no upstream ownership by entities that also make routing decisions, you qualify.",
  },
  {
    question: "How does this compare to my current PBM network contracts?",
    answer:
      "ApalyRx is not a replacement for your existing PBM contracts. It is an additional volume channel. You continue participating in whatever PBM networks you currently contract with. ApalyRx adds a new source of prescriptions with different economics \u2014 transparent pass-through reimbursement, fair dispensing fees, no DIR fees, and no retroactive adjustments. Think of it as supplemental volume with better terms.",
  },
  {
    question: "How much volume can I expect?",
    answer:
      "Volume depends on your geography, pricing, and the number of ApalyRx programs active in your service area. ApalyRx currently serves 500K+ covered lives with growth to 1M+ by Q2 and 5M+ in the pipeline. As more employers, health plans, PBMs, and manufacturers deploy programs, prescription volume flowing to independent pharmacy partners increases. Early participants are positioned for the greatest volume growth.",
  },
  {
    question: "What about manufacturer-direct models that currently bypass local pharmacies?",
    answer:
      "This is one of the most important reasons to become an ApalyRx pharmacy partner. Manufacturer-direct programs like LillyDirect and NovoCare typically contract with one or two nationally licensed mail-order pharmacies, cutting local independents out entirely. ApalyRx\u2019s model is different \u2014 we bring manufacturer-direct programs to local independent pharmacies through the pharmacy of record structure. You provide the clinical oversight; the product ships from manufacturer logistics. Without this model, those prescriptions go to a mail-order pharmacy that has no relationship with the patient or the community.",
  },
  {
    question: "What is Drug Benefit Integrity and why does it matter for my pharmacy?",
    answer:
      "Drug Benefit Integrity (DBI) is an independent industry standard with five structural requirements \u2014 one of which is that prescriptions are fulfilled through independent pharmacies with no vertical ownership. This means the DBI model structurally requires independent pharmacies to function. As more employers, consultants, and health plans adopt the DBI standard, the demand for independent pharmacy fulfillment grows. Your participation as an ApalyRx pharmacy partner is not just a business decision \u2014 it is part of a structural shift that positions independent pharmacy at the center of how high-cost medications should be routed and verified. Learn more at drugbenefitintegrity.com.",
  },
];

/* ─── Page ─── */

export default function PharmaciesPage() {
  return (
    <>
      <WebPageSchema
        title="ApalyRx for Independent Pharmacies"
        description="Partner with ApalyRx - prescriptions routed on merit. Fair dispensing fees, no DIR fees, no clawbacks, and no competing channel interests."
        url="https://www.apalyrx.com/pharmacies"
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
          <div className="inline-flex items-center gap-2 bg-[#F26522] text-white text-sm font-semibold px-4 py-2 rounded-full mb-6">
            <Store className="w-4 h-4" />
            <span className="font-heading">For Independent Pharmacies</span>
          </div>
          <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-white mb-4">
            New Prescriptions. Fair Pay. No Clawbacks.
          </h1>
          <p className="font-heading text-xl sm:text-2xl md:text-3xl text-[#F26522] font-semibold mb-6">
            A New Revenue Channel Built for Independent Pharmacy
          </p>
          <p className="font-body text-base sm:text-lg md:text-xl text-white/80 mb-8 max-w-3xl mx-auto">
            ApalyRx partners with independent community pharmacies to fulfill prescriptions that are
            independently routed to the lowest net cost. As PBMs, employers, health plans, and
            manufacturers deploy programs through ApalyRx, a growing stream of prescriptions flows to
            independent pharmacy partners - with transparent reimbursement, fair dispensing fees, and
            no retroactive adjustments. Your pharmacy earns volume because your pricing and service
            earned it - not because of channel ownership or steering.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center bg-[#F26522] hover:bg-[#F26522]/90 text-white font-heading font-semibold shadow-lg text-base md:text-lg px-6 md:px-8 py-4 md:py-6 rounded-lg transition-all duration-300"
          >
            Become a Pharmacy Partner
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
              <span className="font-heading">The Reality</span>
            </div>
            <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-navy leading-tight mb-4">
              Independent Pharmacy Is Under Structural Pressure
            </h2>
            <p className="font-body text-base sm:text-lg text-muted-foreground max-w-3xl mx-auto">
              The economics that sustained community pharmacy for decades are changing - and
              independent pharmacies are bearing the greatest burden.
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
            <p className="inline-block font-heading text-base md:text-lg font-semibold text-white bg-[#0F1C2E] px-8 py-4 rounded-xl shadow-lg">
              Independent pharmacies are closing at a rate of roughly one per day. The economics have
              to change - and the supply chain has to{" "}
              <span className="text-[#F26522]">include you</span>.
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
              <span className="font-heading">The ApalyRx Platform</span>
            </div>
            <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold leading-tight mb-4">
              What ApalyRx Means for Your Pharmacy
            </h2>
            <p className="font-body text-base sm:text-lg text-white/70 max-w-3xl mx-auto">
              A platform built to route prescriptions to independent pharmacies - not away from them
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
                  Your pharmacy. Your patients.{" "}
                  <span className="text-[#F26522] font-semibold">Fair economics.</span> No competing
                  channel interests.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 4: TWO ROLES ── */}
      <section className="bg-white py-16 md:py-24">
        <div className="max-w-content mx-auto px-4">
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 bg-[#0F1C2E] text-white text-sm font-semibold px-4 py-2 rounded-full mb-6">
              <Layers className="w-4 h-4" />
              <span className="font-heading">Two Revenue Roles</span>
            </div>
            <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-navy leading-tight mb-4">
              Dispense Directly or Serve as Pharmacy of Record
            </h2>
            <p className="font-body text-base sm:text-lg text-muted-foreground max-w-3xl mx-auto">
              ApalyRx pharmacy partners can serve in two capacities depending on the program and
              product
            </p>
          </div>

          <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {/* Dispensing Pharmacy Card */}
            <div className="bg-white rounded-xl p-8 shadow-elevated border border-gray-100 border-t-4 border-t-[#F26522]">
              <div className="p-3 rounded-full bg-[#F26522] text-white w-fit mb-4">
                <Pill className="h-7 w-7" />
              </div>
              <h3 className="font-heading text-2xl font-bold text-navy mb-1">
                Dispensing Pharmacy
              </h3>
              <p className="font-heading text-sm text-[#F26522] font-semibold mb-4">
                Standard Routing Model
              </p>
              <p className="font-body text-sm md:text-base text-muted-foreground leading-relaxed mb-6">
                In standard routing programs, ApalyRx evaluates every in-scope prescription across
                all available channels in real time and routes to the lowest net cost. When your
                pharmacy offers the best option, the prescription comes to you. You dispense the
                medication, counsel the patient, and provide the clinical care you are trained to
                deliver.
              </p>
              <ul className="space-y-3">
                {dispensingBullets.map((bullet, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="font-body text-sm text-muted-foreground">{bullet}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Pharmacy of Record Card */}
            <div className="bg-white rounded-xl p-8 shadow-elevated border border-gray-100 border-t-4 border-t-[#F26522]">
              <div className="p-3 rounded-full bg-[#F26522] text-white w-fit mb-4">
                <FileCheck className="h-7 w-7" />
              </div>
              <h3 className="font-heading text-2xl font-bold text-navy mb-1">
                Pharmacy of Record
              </h3>
              <p className="font-heading text-sm text-[#F26522] font-semibold mb-4">
                Manufacturer-Direct Model
              </p>
              <p className="font-body text-sm md:text-base text-muted-foreground leading-relaxed mb-6">
                In manufacturer-direct programs, you serve as the pharmacy of record - the licensed
                pharmacist in the workflow. You conduct drug utilization review, verify the
                prescription, and provide clinical oversight. The physical product ships directly to
                the member from the manufacturer&apos;s designated logistics provider or a
                third-party carrier. You earn a pharmacy of record fee for your clinical role.
              </p>
              <ul className="space-y-3">
                {porBullets.map((bullet, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="font-body text-sm text-muted-foreground">{bullet}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <p className="font-body text-sm md:text-base text-muted-foreground text-center max-w-4xl mx-auto mt-10">
            Both roles are critical to maintaining the structural independence that the ApalyRx model
            requires. Independent pharmacies - with no upstream ownership by PBMs, insurers, or GPOs
            - are what make the model work.
          </p>
        </div>
      </section>

      {/* ── SECTION 5: WHY THIS IS DIFFERENT ── */}
      <section className="bg-[#0F1C2E]/5 py-16 md:py-24">
        <div className="max-w-content mx-auto px-4">
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 bg-[#0F1C2E] text-white text-sm font-semibold px-4 py-2 rounded-full mb-6">
              <Star className="w-4 h-4" />
              <span className="font-heading">Why ApalyRx</span>
            </div>
            <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-navy leading-tight">
              Why This Is Different
            </h2>
          </div>

          <div className="max-w-3xl mx-auto space-y-4">
            {whyDifferentCards.map((card) => (
              <div
                key={card.title}
                className="bg-white rounded-xl p-6 shadow-card border-l-4 border-l-[#F26522] hover:shadow-elevated transition-all duration-300"
              >
                <div className="flex items-start gap-4">
                  <div className="p-2 rounded-lg bg-[#F26522]/10 flex-shrink-0 mt-0.5">
                    <card.icon className="w-5 h-5 text-[#F26522]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-heading text-lg md:text-xl font-bold text-navy mb-1">
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
        </div>
      </section>

      {/* ── SECTION 6: BECOME A PARTNER ── */}
      <section className="bg-white py-16 md:py-24">
        <div className="max-w-content mx-auto px-4">
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 bg-[#0F1C2E] text-white text-sm font-semibold px-4 py-2 rounded-full mb-6">
              <UserPlus className="w-4 h-4" />
              <span className="font-heading">Partner With ApalyRx</span>
            </div>
            <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-navy leading-tight mb-4">
              Become an ApalyRx Pharmacy Partner
            </h2>
            <p className="font-body text-base sm:text-lg text-muted-foreground max-w-3xl mx-auto">
              Independent community pharmacies can apply to become fulfillment partners now
            </p>
          </div>

          <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-4">
            {joinSteps.map((step, i) => (
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
                {i < joinSteps.length - 1 && (
                  <div className="hidden sm:flex absolute top-1/2 -right-3 -translate-y-1/2 z-10 text-[#F26522]">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <path
                        d="M5 10H15M15 10L10 5M15 10L10 15"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center bg-[#F26522] hover:bg-[#F26522]/90 text-white font-heading font-semibold shadow-lg text-lg px-8 py-4 rounded-xl transition-all duration-300"
            >
              Apply to Partner
            </Link>
          </div>
        </div>
      </section>

      {/* ── SECTION 7: FAQ ── */}
      <section className="bg-[#f8f9fb] py-12 md:py-16">
        <div className="max-w-content mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-navy leading-tight">
              Frequently Asked Questions
            </h2>
          </div>
          <div className="max-w-2xl mx-auto">
            <FaqAccordion items={faqItems} />
          </div>
        </div>
      </section>

      {/* ── SECTION 8: FINAL CTA ── */}
      <section className="bg-[#0F1C2E] text-white py-16 md:py-24">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4">
            Your Pharmacy Belongs on This Platform
          </h2>
          <p className="font-heading text-xl sm:text-2xl md:text-3xl text-[#F26522] font-semibold mb-6">
            Fair Reimbursement. Growing Volume. No Competing Interests.
          </p>
          <p className="font-body text-base sm:text-lg md:text-xl text-white/80 mb-10 max-w-2xl mx-auto">
            Independent community pharmacies are the backbone of the ApalyRx model. As more PBMs,
            employers, health plans, and manufacturers deploy programs through our platform, the
            prescription volume flowing to independent pharmacy partners grows. Apply to partner and
            start receiving prescriptions - with economics that work for your business.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center bg-[#F26522] hover:bg-[#F26522]/90 text-white font-heading font-semibold shadow-lg text-base md:text-lg px-6 md:px-8 py-4 md:py-6 rounded-lg transition-all duration-300"
          >
            Apply to Join the Network
          </Link>
        </div>
      </section>
    </>
  );
}
