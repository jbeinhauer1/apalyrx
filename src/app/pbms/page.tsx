import type { Metadata } from "next";
import Link from "next/link";
import FaqAccordion from "@/components/FaqAccordion";
import WebPageSchema from "@/components/WebPageSchema";
import FaqSchema from "@/components/FaqSchema";
import {
  GitMerge,
  AlertTriangle,
  MessageSquare,
  FileText,
  Scale,
  Shield,
  CheckCircle2,
  Route,
  FileCheck,
  Users,
  Zap,
  TrendingUp,
  Award,
  Rocket,
  Settings,
  TestTube,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Independent Routing Layer for PBMs | Strengthen Client Retention",
  description:
    "Add an independent, real-time prescription routing and verification layer to your PBM services. Produce decision-level documentation that proves lowest-net-cost routing for every high-cost script. Help your clients meet fiduciary obligations and differentiate in competitive RFPs.",
  openGraph: {
    title: "Independent Routing Layer for PBMs | ApalyRx",
    description:
      "Add independent prescription routing verification to your PBM. Decision-level documentation for every script. Differentiate in competitive RFPs.",
    url: "https://www.apalyrx.com/pbms",
    siteName: "ApalyRx",
    type: "website",
  },
};

/* ─── Data ─── */

const problemCards = [
  {
    icon: MessageSquare,
    num: 1,
    title: "Consultant Pressure",
    desc: "Benefits consultants are putting alternative PBM models on every finalist slate. Transparent PBM options, direct-to-employer programs, and carve-out models are all being evaluated. The question is no longer just about pricing - it is about structural accountability.",
  },
  {
    icon: FileText,
    num: 2,
    title: "Documentation Demands",
    desc: "Employers are asking for documentation beyond aggregate reporting. They want decision-level proof that each high-cost prescription was routed to the lowest net cost - not a summary showing total spend went down. The shift is from reporting to verification.",
  },
  {
    icon: Scale,
    num: 3,
    title: "Regulatory Momentum",
    desc: "The CAA designates PBMs as ERISA covered service providers with $10,000/day noncompliance penalties. The FTC is expanding enforcement. The DOL has proposed rules requiring detailed PBM compensation disclosure. Independent routing and documentation is where the regulatory trajectory is heading.",
  },
  {
    icon: Shield,
    num: 4,
    title: "Fiduciary Scrutiny",
    desc: "Plan fiduciaries face personal liability for drug benefit decisions. They are asking their PBMs to demonstrate - through independent means - that routing was optimal. The PBMs that can answer this question proactively will retain and win clients. Those that cannot will be defending the gap.",
  },
];

const solutionCards = [
  {
    icon: Route,
    title: "Independent Routing Layer",
    subtitle: "Real-Time All-Channel Evaluation",
    stat: "100%",
    statLabel: "independent",
    desc: "ApalyRx evaluates every in-scope prescription across all available channels in real time - including your PBM\u2019s own specialty, mail, and retail pharmacies, plus manufacturer-direct programs and independent pharmacies. The routing is based on actual net cost. Your channel can win on merit - and when it does, there is independent proof.",
  },
  {
    icon: FileCheck,
    title: "Decision-Level Documentation",
    subtitle: "Audit-Ready by Default",
    stat: "Every",
    statLabel: "script",
    desc: "Every prescription generates a decision-level record: which channels were compared, what rules were applied, why the winning channel was selected, and the net cost components. This is the documentation your clients\u2019 fiduciaries need - produced automatically, not assembled after the fact.",
  },
  {
    icon: Users,
    title: "Client Retention",
    subtitle: "Strengthen Renewal Conversations",
    stat: "0",
    statLabel: "disruption",
    desc: "Offering independent routing and decision-level documentation proactively demonstrates that you welcome scrutiny. In renewal conversations, this is the strongest possible position - your clients get the verification they need without leaving your program.",
  },
  {
    icon: Zap,
    title: "Competitive Differentiation",
    subtitle: "Win Against Alternative Models",
    stat: "First",
    statLabel: "mover",
    desc: "When consultants evaluate your program against other PBMs, direct employer models, and carve-out alternatives, having a real-time independent routing layer already in place sets you apart. You are not defending your model - you are demonstrating structural integrity that competitors cannot match.",
  },
];

const howItWorksSteps = [
  {
    num: 1,
    title: "Scope the Program",
    desc: "Together we identify the approximately 30 high-cost medications that typically account for 40% or more of employer and health plan pharmacy spend - where net cost variability across channels is greatest and the impact of optimized routing is most significant.",
  },
  {
    num: 2,
    title: "Technical Integration",
    desc: "ApalyRx connects to your existing data flows - eligibility feeds, accumulator files, and claims reporting pathways. Integration is technical and straightforward. Your team works with ours to establish the data connection.",
  },
  {
    num: 3,
    title: "Prescriptions Flow Through ApalyRx",
    desc: "For in-scope medications, prescriptions are received through the e-prescribing workflow under ApalyRx\u2019s pharmacy license. Your PBM continues to handle all other medications through normal adjudication.",
  },
  {
    num: 4,
    title: "Real-Time All-Channel Routing",
    desc: "Every in-scope prescription is evaluated across all available channels in real time - your PBM specialty, your PBM mail, retail, manufacturer-direct, and independent pharmacies. The prescription routes to the lowest net cost. Your channel is always in the evaluation - and wins when it offers the best price.",
  },
  {
    num: 5,
    title: "Documentation & Reporting",
    desc: "Every routing decision generates a decision-level record. Your clients receive documentation showing channels compared, rules applied, routing rationale, and net cost components - for every script, not a sample. You receive program-level reporting on routing outcomes, channel performance, and cost impact.",
  },
];

const valueCards = [
  {
    icon: Shield,
    title: "Client Retention",
    desc: "Employers need detailed fiduciary documentation. Offering independent routing and decision-level reporting proactively demonstrates that you welcome scrutiny and strengthens renewal conversations. When clients ask hard questions, you already have the answer.",
  },
  {
    icon: Award,
    title: "Consultant Confidence",
    desc: "When consultants evaluate your program, a real-time independent routing layer already in place sets you apart from competitors who cannot demonstrate the same level of accountability. You move from defending pricing to demonstrating structural integrity.",
  },
  {
    icon: Scale,
    title: "Regulatory Readiness",
    desc: "CAA reporting requirements, FTC enforcement, and DOL proposed rules are all moving toward greater PBM accountability. Independent routing and decision-level documentation positions you ahead of these requirements - rather than scrambling to meet them after the fact.",
  },
];

const timelineMilestones = [
  { icon: FileText, week: "Week 1-2", title: "Scope & Contract", desc: "Define drug scope, review PBM contract provisions, establish program parameters" },
  { icon: Settings, week: "Week 3-4", title: "Technical Integration", desc: "Connect eligibility feeds, accumulator files, and claims reporting pathways" },
  { icon: TestTube, week: "Week 5-6", title: "Testing & Validation", desc: "QA testing, routing validation, and client communication preparation" },
  { icon: Rocket, week: "Week 7-8", title: "Go-Live", desc: "Launch with active monitoring across initial client population" },
  { icon: TrendingUp, week: "Ongoing", title: "Scale", desc: "Expand drug scope, add clients, optimize routing based on performance data" },
];

const faqItems = [
  {
    question: "Does ApalyRx replace us the PBM?",
    answer:
      "No. You continue to manage formularies, process claims, and administer the benefit. ApalyRx operates as a real-time routing layer for a targeted set of high-cost medications. Everything else stays in your existing flow and control.",
  },
  {
    question: "Will our pharmacies still be in the evaluation?",
    answer:
      "Yes. ApalyRx evaluates every in-scope prescription across all available channels - including your PBM\u2019s own specialty, mail, and retail pharmacies. Your channel can win on merit. When it offers the lowest net cost, it wins - and there is independent documentation to prove it.",
  },
  {
    question: "What happens when our channel wins the routing?",
    answer:
      "The prescription fills through your pharmacy as normal. The difference is that the decision is now independently documented - showing which channels were evaluated, what the pricing was, and why your channel was selected. This is valuable documentation for your client relationships.",
  },
  {
    question: "What about our rebate arrangements?",
    answer:
      "ApalyRx routing is based on actual net cost after all available pricing is evaluated. If your rebated channel offers the best net cost, it wins. Rebate arrangements on drugs outside the ApalyRx scope are completely unaffected. For in-scope drugs, the routing decision is transparent and documented.",
  },
  {
    question: "How do our clients access this?",
    answer:
      "You offer ApalyRx as part of your program. Your clients see it as a capability of your PBM - independent routing and documentation included in their relationship with you. ApalyRx operates in the background. Your brand stays front and center.",
  },
  {
    question: "What does the client experience look like?",
    answer:
      "Clients receive decision-level documentation for every in-scope prescription - channels compared, rules applied, routing rationale, and net cost components. They also receive program-level reporting on cost impact, channel performance, and utilization. Their members receive a concierge experience with clear costs, status tracking, and home delivery.",
  },
  {
    question: "How much work is this for our team?",
    answer:
      "Implementation requires technical integration - eligibility feeds, accumulator files, and claims reporting pathways. ApalyRx handles operations, member experience, fulfillment orchestration, and reporting. After go-live, your team receives reporting and can manage program parameters. Day-to-day operations are handled by ApalyRx.",
  },
  {
    question: "What drugs are included?",
    answer:
      "ApalyRx targets approximately 30 high-cost medications that typically account for 40% or more of employer and health plan pharmacy spend - where net cost variability across channels is greatest. These are the drugs where independent routing has the most impact. You have full control over which drugs are in scope.",
  },
  {
    question: "How does this relate to Drug Benefit Integrity?",
    answer:
      "Drug Benefit Integrity (DBI) is an independent industry standard with five structural requirements for ensuring pharmacy benefit decisions are made in the plan\u2019s interest. ApalyRx meets all five requirements. By offering ApalyRx as part of your program, you are demonstrating alignment with the DBI standard - a competitive differentiator as consultants and employers increasingly evaluate PBMs on structural integrity, not just pricing. Learn more at drugbenefitintegrity.com.",
  },
];

/* ─── Page ─── */

export default function PBMsPage() {
  return (
    <>
      <WebPageSchema
        title="ApalyRx for PBMs"
        description="Strengthen your PBM program with real-time independent routing. ApalyRx evaluates every high-cost prescription across all channels and produces decision-level documentation for your clients."
        url="https://www.apalyrx.com/pbms"
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
            <GitMerge className="w-4 h-4" />
            <span className="font-heading">For PBMs</span>
          </div>
          <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-white mb-4">
            Strengthen Your Program With Independent Routing
          </h1>
          <p className="font-heading text-xl sm:text-2xl md:text-3xl text-[#F26522] font-semibold mb-6">
            The Competitive Advantage Your Clients Are Starting to Expect
          </p>
          <p className="font-body text-base sm:text-lg md:text-xl text-white/80 mb-8 max-w-3xl mx-auto">
            ApalyRx works alongside your program to give clients what they are increasingly asking
            for - real-time, independent routing of high-cost prescriptions to the lowest net cost,
            with decision-level documentation for every script. Your PBM continues to manage
            formularies, negotiate contracts, and administer the benefit. ApalyRx adds a structural
            layer that makes your program stronger.
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
              <span className="font-heading">The Market Reality</span>
            </div>
            <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-navy leading-tight mb-4">
              Your Clients Are Asking Harder Questions
            </h2>
            <p className="font-body text-base sm:text-lg text-muted-foreground max-w-3xl mx-auto">
              The expectations facing PBMs are shifting - and the PBMs that move first will define
              the standard.
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
              The PBMs that adopt independent routing proactively will define the next generation of
              client trust - rather than reacting to mandates.
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
              What ApalyRx Adds to Your Program
            </h2>
            <p className="font-body text-base sm:text-lg text-white/70 max-w-3xl mx-auto">
              ApalyRx complements your PBM - it does not replace it
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
                  Your program. Your clients.{" "}
                  <span className="text-[#F26522] font-semibold">Independent proof</span> that
                  routing was optimal.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 4: HOW IT WORKS ── */}
      <section className="bg-[#f8f9fb] py-16 md:py-20">
        <div className="max-w-content mx-auto px-4">
          <div className="text-center mb-14">
            <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-navy leading-tight mb-4">
              How It Works With Your Program
            </h2>
            <p className="font-body text-base sm:text-lg text-muted-foreground max-w-3xl mx-auto">
              ApalyRx integrates with existing PBM workflows without disrupting operations
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-4">
            {howItWorksSteps.map((step) => (
              <div
                key={step.num}
                className="group bg-white rounded-xl p-5 md:p-6 shadow-card border border-border hover:shadow-elevated hover:border-[#F26522]/30 transition-all duration-300"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-[#0F1C2E] to-[#1a2d44] text-white rounded-full flex items-center justify-center font-bold text-sm shadow-lg group-hover:scale-110 transition-all duration-300">
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

      {/* ── SECTION 5: VALUE TO YOUR BUSINESS ── */}
      <section className="bg-[#0F1C2E]/5 py-16 md:py-24">
        <div className="max-w-content mx-auto px-4">
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 bg-[#0F1C2E] text-white text-sm font-semibold px-4 py-2 rounded-full mb-6">
              <TrendingUp className="w-4 h-4" />
              <span className="font-heading">Business Value</span>
            </div>
            <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-navy leading-tight">
              Why PBMs Are Adopting Independent Routing
            </h2>
          </div>

          <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {valueCards.map((card) => (
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

      {/* ── SECTION 6: IMPLEMENTATION ── */}
      <section className="bg-white py-16 md:py-24">
        <div className="max-w-content mx-auto px-4">
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 bg-[#0F1C2E] text-white text-sm font-semibold px-4 py-2 rounded-full mb-6">
              <Rocket className="w-4 h-4" />
              <span className="font-heading">Fast Implementation</span>
            </div>
            <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-navy leading-tight mb-4">
              Designed for Easy Integration
            </h2>
            <p className="font-body text-base sm:text-lg text-muted-foreground max-w-3xl mx-auto">
              Implementation targets the high-cost medications where routing optimization has the
              greatest impact
            </p>
          </div>

          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-6 relative">
              {timelineMilestones.map((milestone, i) => (
                <div key={i} className="text-center relative">
                  <div className="w-14 h-14 bg-gradient-to-br from-[#F26522] to-[#d45519] text-white rounded-full flex items-center justify-center mx-auto mb-3 shadow-lg">
                    <milestone.icon className="w-6 h-6" />
                  </div>
                  <p className="font-heading text-xs font-semibold text-[#F26522] uppercase tracking-wider mb-1">
                    {milestone.week}
                  </p>
                  <h3 className="font-heading text-base md:text-lg font-bold text-navy mb-1">
                    {milestone.title}
                  </h3>
                  <p className="font-body text-sm text-muted-foreground">{milestone.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="text-center mt-12">
            <div className="inline-flex items-center gap-2 bg-green-50 rounded-full px-6 py-3 border border-green-200">
              <CheckCircle2 className="w-4 h-4 text-green-600" />
              <p className="font-body text-sm md:text-base text-muted-foreground">
                Scoped to approximately 30 high-cost drugs. No disruption to your broader program.
              </p>
            </div>
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
            Explore How Independent Routing Fits With Your Program
          </h2>
          <p className="font-heading text-xl sm:text-2xl md:text-3xl text-[#F26522] font-semibold mb-6">
            The PBMs That Move First Define the Standard.
          </p>
          <p className="font-body text-base sm:text-lg md:text-xl text-white/80 mb-10 max-w-2xl mx-auto">
            Tell us about your program and client base. We will show you how ApalyRx integrates with
            your existing workflows - strengthening client relationships with independent routing and
            decision-level documentation for every high-cost prescription.
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
