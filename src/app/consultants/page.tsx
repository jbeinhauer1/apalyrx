import type { Metadata } from "next";
import Link from "next/link";
import FaqAccordion from "@/components/FaqAccordion";
import WebPageSchema from "@/components/WebPageSchema";
import FaqSchema from "@/components/FaqSchema";
import {
  MessageSquare,
  AlertTriangle,
  FileText,
  BarChart3,
  Scale,
  Repeat,
  CheckCircle2,
  Route,
  Shield,
  Award,
  TrendingUp,
  FileCheck,
  ClipboardCheck,
  GitCompare,
  Share2,
  Zap,
  Users,
  Lock,
} from "lucide-react";

export const metadata: Metadata = {
  title: "ApalyRx for Benefits Consultants | Drug Benefit Integrity",
  description:
    "Transform PBM evaluations with real-time independent routing. Give clients a structural standard that changes the pharmacy benefit conversation - from pricing comparisons to accountability and integrity.",
  openGraph: {
    title: "ApalyRx for Benefits Consultants | Drug Benefit Integrity",
    description:
      "Transform PBM evaluations with real-time independent routing. Give clients a structural standard that changes the pharmacy benefit conversation - from pricing comparisons to accountability and integrity.",
  },
};

/* ─── Data ─── */

const problemCards = [
  {
    icon: FileText,
    num: 1,
    title: "Self-Reported Data",
    desc: "Pricing analyses, rebate guarantees, and utilization reports are all produced by the PBM you are evaluating. The entity making routing decisions is the same entity reporting on whether those decisions were optimal. No independent party is in the loop.",
  },
  {
    icon: BarChart3,
    num: 2,
    title: "Aggregate Reporting",
    desc: "PBM reports show totals - total spend, total rebates, overall generic fill rates. They do not show a decision-level record for each prescription: which channels were evaluated, what the actual net cost was at each, and why the winning channel was selected.",
  },
  {
    icon: Scale,
    num: 3,
    title: "Fiduciary Exposure",
    desc: "Your clients face personal fiduciary liability for drug benefit decisions under ERISA and the CAA. Recommending a PBM program without independent verification of routing decisions leaves a documentation gap that regulators and auditors are increasingly focused on.",
  },
  {
    icon: Repeat,
    num: 4,
    title: "Same Conversation Every Cycle",
    desc: "Every renewal, you compare PBM proposals on price, rebates, and service. The proposals look similar. The guarantees are structured similarly. You are competing on the same axis as every other consultant - and your clients are not getting structurally better outcomes.",
  },
];

const solutionCards = [
  {
    icon: Route,
    title: "Real-Time Independent Routing",
    subtitle: "Alongside Any PBM",
    stat: "Every",
    statLabel: "script",
    desc: "Recommend ApalyRx as a routing layer that works alongside your client\u2019s current PBM. Their high-cost prescriptions get real-time lowest-net-cost routing across all channels - PBM specialty, PBM mail, manufacturer-direct, and independent pharmacy - with decision-level documentation for every script.",
  },
  {
    icon: Shield,
    title: "Fiduciary Protection",
    subtitle: "Documentation Your Clients Need",
    stat: "100%",
    statLabel: "documented",
    desc: "In an environment of increasing fiduciary scrutiny, recommending independent routing and decision-level documentation demonstrates your commitment to your client\u2019s best interest. Every routing decision is recorded - channels compared, rules applied, rationale documented. This is the proof fiduciaries need.",
  },
  {
    icon: Award,
    title: "Practice Differentiation",
    subtitle: "Define the New Standard",
    stat: "First",
    statLabel: "mover",
    desc: "Be the consultant who introduces real-time independent routing to your market. The first consultants to adopt this approach will define how their clients evaluate pharmacy benefits - shifting the conversation from pricing comparisons to structural integrity.",
  },
  {
    icon: TrendingUp,
    title: "Better Client Outcomes",
    subtitle: "Measurable Impact",
    stat: "20-40%",
    statLabel: "savings",
    desc: "Independent routing across all channels consistently identifies lower-cost options for high-cost medications. Your clients see real savings - typically 20-40% on in-scope drugs - with transparent, pass-through economics and no hidden spread. The results speak for themselves.",
  },
];

const dbiCards = [
  {
    icon: ClipboardCheck,
    title: "Evaluate",
    desc: "Score your client\u2019s current PBM arrangement against the five DBI requirements. Any \u2018No\u2019 identifies a structural verification gap.",
  },
  {
    icon: GitCompare,
    title: "Compare",
    desc: "Use the framework in your next PBM review or RFP evaluation. Ask every finalist: can you demonstrate independent routing and decision-level documentation?",
  },
  {
    icon: FileText,
    title: "Document",
    desc: "A completed DBI framework evaluation provides fiduciary evidence that drug benefit decisions were assessed against an independent structural standard.",
  },
  {
    icon: Share2,
    title: "Share",
    desc: "Forward the framework to plan fiduciaries, HR leaders, and CFOs. The more people asking the question, the faster independent verification becomes expected.",
  },
];

const whyCards = [
  {
    icon: Zap,
    title: "Regulatory Tailwinds",
    desc: "The CAA, FTC enforcement, and DOL proposed rules are all pushing toward independent verification of drug benefit decisions. Consultants who introduce these concepts now are positioned as forward-thinking advisors - not reactive order-takers.",
  },
  {
    icon: Users,
    title: "Client Demand",
    desc: "Employers are hearing about independent routing from industry coverage, peer networks, and other advisors. The consultants who bring the conversation to their clients first own the relationship. Those who wait will be responding to questions they did not initiate.",
  },
  {
    icon: Lock,
    title: "Competitive Moat",
    desc: "Once you introduce the DBI standard to your clients, it becomes part of how they evaluate PBMs going forward. You are not selling a point solution - you are establishing a structural expectation that keeps you at the center of every renewal conversation.",
  },
];

const faqItems = [
  {
    question: "Does this require my client to change PBMs?",
    answer:
      "No. ApalyRx works alongside any PBM. The PBM continues to manage formularies, negotiate contracts, and administer the benefit. ApalyRx adds an independent routing layer for high-cost medications - typically about 30 drugs representing 40% or more of pharmacy spend. The rest of the benefit stays exactly as it is.",
  },
  {
    question: "How do I position this to my clients?",
    answer:
      "Frame it as a fiduciary best practice: independent verification of high-cost drug routing decisions. Your client is not replacing their PBM - they are adding a layer of accountability and documentation that strengthens their program and protects their fiduciary position. If their PBM\u2019s routing is already optimal, the documentation proves it.",
  },
  {
    question: "What if the client\u2019s PBM pushes back?",
    answer:
      "Many PBMs are choosing to offer ApalyRx as part of their own program - independent routing strengthens their client relationships. Position it to the PBM as a competitive advantage: their pharmacies are always in the evaluation, and when they win, there is independent proof. PBMs that embrace this proactively are in a stronger position than those that resist it.",
  },
  {
    question: "What is my role in the implementation?",
    answer:
      "You introduce the concept and make the recommendation. ApalyRx handles all implementation - technical integration, member experience, operations, and reporting. You receive program-level reporting to share with your client. There is no operational burden on your team.",
  },
  {
    question: "How does this affect my compensation or PBM override arrangements?",
    answer:
      "ApalyRx programs are scoped to a targeted set of high-cost drugs and operate alongside the existing PBM relationship. Your compensation arrangements with the PBM are between you and the PBM. ApalyRx does not interfere with those arrangements. We can discuss how to structure the engagement so all parties benefit.",
  },
  {
    question: "Is the DBI Framework something I can use in RFPs today?",
    answer:
      "Yes. The DBI Framework is a free, one-page evaluation tool available at drugbenefitintegrity.com. You can include the five DBI requirements in any RFP or PBM evaluation. Ask every finalist whether they can demonstrate independent routing, decision-level documentation, and structural independence from dispensing channels.",
  },
  {
    question: "What results should I tell my clients to expect?",
    answer:
      "Independent routing across all channels consistently identifies lower-cost options for high-cost medications - typically 20-40% savings on in-scope drugs. Clients also receive decision-level documentation for every prescription, fiduciary-grade reporting, and an improved member experience with concierge support and home delivery.",
  },
  {
    question: "What is Drug Benefit Integrity?",
    answer:
      "Drug Benefit Integrity (DBI) is an independent industry standard with five structural requirements for ensuring pharmacy benefit decisions are made in the plan\u2019s interest. ApalyRx is the only entity that meets all five. The DBI Framework gives you a structured, defensible way to evaluate any PBM program - and to document that evaluation for your client\u2019s fiduciary records. Learn more at drugbenefitintegrity.com.",
  },
];

/* ─── Page ─── */

export default function ConsultantsPage() {
  return (
    <>
      <WebPageSchema
        title="ApalyRx for Benefits Consultants"
        description="Transform PBM evaluations with real-time independent routing. Give clients a structural standard that changes the pharmacy benefit conversation."
        url="https://www.apalyrx.com/consultants"
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
            <MessageSquare className="w-4 h-4" />
            <span className="font-heading">For Benefits Consultants</span>
          </div>
          <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-white mb-4">
            Change the Question Your Clients Ask About PBMs
          </h1>
          <p className="font-heading text-xl sm:text-2xl md:text-3xl text-[#F26522] font-semibold mb-6">
            From Pricing Comparisons to Structural Accountability
          </p>
          <p className="font-body text-base sm:text-lg md:text-xl text-white/80 mb-8 max-w-3xl mx-auto">
            Real-time independent routing gives benefits consultants a structural standard that moves
            the conversation beyond pricing, rebates, and service levels. Can the PBM demonstrate -
            through an independent party - that each high-cost prescription was routed to the lowest
            net cost? If not, there is a gap your client should know about.
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
              <span className="font-heading">The Evaluation Gap</span>
            </div>
            <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-navy leading-tight mb-4">
              Every PBM Evaluation Has the Same Blind Spot
            </h2>
            <p className="font-body text-base sm:text-lg text-muted-foreground max-w-3xl mx-auto">
              The data you use to evaluate PBMs comes from the PBM being evaluated.
            </p>
          </div>

          <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {problemCards.map((card) => (
              <div
                key={card.title}
                className="relative bg-white rounded-xl p-6 md:p-8 shadow-lg border border-red-100 hover:border-red-200 transition-all duration-300 hover:shadow-xl group"
              >
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-red-500 to-orange-500 rounded-t-xl" />
                <div className="absolute -top-3 -right-3 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center font-bold text-sm shadow-lg">
                  {card.num}
                </div>
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 p-3 rounded-xl bg-red-100 group-hover:bg-red-500 transition-colors duration-300">
                    <card.icon className="h-6 w-6 text-red-600 group-hover:text-white transition-colors duration-300" />
                  </div>
                  <div>
                    <h3 className="font-heading text-xl md:text-2xl font-bold text-foreground mb-2">
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
              Real-time independent routing changes the question from &lsquo;Is this a good
              deal?&rsquo; to &lsquo;
              <span className="text-[#F26522]">Does this have integrity?</span>&rsquo;
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
              <span className="font-heading">Your New Advantage</span>
            </div>
            <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold leading-tight mb-4">
              What You Can Offer Clients
            </h2>
            <p className="font-body text-base sm:text-lg text-white/70 max-w-3xl mx-auto">
              A structural standard that differentiates your advisory practice
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
                  Your recommendation. Their savings.{" "}
                  <span className="text-[#F26522] font-semibold">Independent proof</span> it
                  worked.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 4: THE DBI FRAMEWORK ── */}
      <section className="bg-white py-16 md:py-24">
        <div className="max-w-content mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-[#0F1C2E] text-white text-sm font-semibold px-4 py-2 rounded-full mb-6">
              <FileCheck className="w-4 h-4" />
              <span className="font-heading">Free Evaluation Tool</span>
            </div>
            <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-navy leading-tight mb-6">
              Use the Drug Benefit Integrity Framework
            </h2>
            <p className="font-body text-base sm:text-lg text-muted-foreground max-w-3xl mx-auto">
              The DBI Framework is a free, one-page evaluation tool with five binary requirements.
              Use it in RFP evaluations, PBM reviews, and strategy meetings. It gives you a
              structured, defensible way to evaluate whether a pharmacy benefit program has structural
              integrity - and to document that evaluation for your client&apos;s fiduciary records.
            </p>
          </div>

          <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {dbiCards.map((card) => (
              <div
                key={card.title}
                className="group bg-white rounded-xl p-6 shadow-lg border border-gray-100 border-t-4 border-t-[#F26522] hover:border-[#F26522]/30 hover:shadow-xl transition-all duration-300"
              >
                <div className="p-3 rounded-lg bg-[#F26522] text-white w-fit mb-4">
                  <card.icon className="h-7 w-7" />
                </div>
                <h3 className="font-heading text-xl md:text-2xl font-semibold text-navy mb-2">
                  {card.title}
                </h3>
                <p className="font-body text-sm md:text-base text-muted-foreground leading-relaxed">
                  {card.desc}
                </p>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <a
              href="https://drugbenefitintegrity.com/framework"
              target="_blank"
              rel="noopener noreferrer"
              className="font-heading text-[#F26522] hover:text-[#F26522]/80 font-semibold text-lg transition-all duration-300"
            >
              Download the DBI Framework at drugbenefitintegrity.com &rarr;
            </a>
          </div>
        </div>
      </section>

      {/* ── SECTION 5: WHY CONSULTANTS ARE MOVING FIRST ── */}
      <section className="bg-[#0F1C2E]/5 py-16 md:py-24">
        <div className="max-w-content mx-auto px-4">
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 bg-[#0F1C2E] text-white text-sm font-semibold px-4 py-2 rounded-full mb-6">
              <TrendingUp className="w-4 h-4" />
              <span className="font-heading">Market Opportunity</span>
            </div>
            <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-navy leading-tight">
              Why Consultants Are Moving First
            </h2>
          </div>

          <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
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
        </div>
      </section>

      {/* ── SECTION 6: FAQ ── */}
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

      {/* ── SECTION 7: FINAL CTA ── */}
      <section className="bg-[#0F1C2E] text-white py-16 md:py-24">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4">
            Bring Independent Routing to Your Clients
          </h2>
          <p className="font-heading text-xl sm:text-2xl md:text-3xl text-[#F26522] font-semibold mb-6">
            The First Consultants to Adopt This Will Define the Standard.
          </p>
          <p className="font-body text-base sm:text-lg md:text-xl text-white/80 mb-10 max-w-2xl mx-auto">
            Tell us about your client base and how you approach PBM evaluations. We will show you how
            ApalyRx fits alongside your clients&apos; existing programs - and how the DBI Framework
            can become part of your evaluation toolkit.
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
