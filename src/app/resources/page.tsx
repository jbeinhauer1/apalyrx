import type { Metadata } from "next";
import Link from "next/link";
import WebPageSchema from "@/components/WebPageSchema";
import { BookOpen, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Resources | Pharmacy Benefit Education & Industry Standards",
  description:
    "Authoritative resources on drug benefit integrity, lowest net cost prescription routing, PBM fiduciary compliance, and direct-to-employer drug programs from ApalyRx.",
  openGraph: {
    title: "Resources | Pharmacy Benefit Education & Industry Standards",
    description:
      "Authoritative resources on drug benefit integrity, prescription routing, PBM compliance, and direct-to-employer programs.",
    url: "https://www.apalyrx.com/resources",
    siteName: "ApalyRx",
    type: "website",
  },
};

const resources = [
  {
    category: "Industry Standard",
    title: "Drug Benefit Integrity (DBI): The Five-Requirement Standard",
    description:
      "An independent standard with five structural requirements for ensuring that pharmacy benefit decisions are made in the plan's interest. Learn what DBI means, why it matters, and how it compares to transparency alone.",
    href: "/resources/drug-benefit-integrity",
  },
];

export default function ResourcesPage() {
  return (
    <>
      <WebPageSchema
        title="Resources | Pharmacy Benefit Education & Industry Standards"
        description="Authoritative resources on drug benefit integrity, prescription routing, PBM compliance, and direct-to-employer programs."
        url="https://www.apalyrx.com/resources"
      />

      {/* Hero */}
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
            <BookOpen className="w-4 h-4" />
            <span className="font-heading">Resources</span>
          </div>
          <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-white mb-4">
            Industry Standards &amp; Education
          </h1>
          <p className="font-body text-base sm:text-lg md:text-xl text-white/80 max-w-3xl mx-auto">
            Authoritative resources on pharmacy benefit integrity, prescription routing, and the
            structural standards shaping the future of drug benefits.
          </p>
        </div>
      </section>

      {/* Resource Cards Grid */}
      <section className="bg-[#f8f9fb]">
        <div className="max-w-content mx-auto px-4 py-16 md:py-24">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {resources.map((resource) => (
              <Link
                key={resource.href}
                href={resource.href}
                className="group bg-white rounded-xl border border-gray-200 p-8 shadow-sm hover:shadow-lg hover:border-[#F26522]/30 transition-all duration-300"
              >
                <span className="inline-block font-heading text-xs font-semibold uppercase tracking-wider text-[#F26522] bg-[#F26522]/10 px-3 py-1 rounded-full mb-4">
                  {resource.category}
                </span>
                <h2 className="font-heading text-xl md:text-2xl font-bold text-[#0F1C2E] mb-3 group-hover:text-[#F26522] transition-colors duration-300">
                  {resource.title}
                </h2>
                <p className="font-body text-muted-foreground text-sm md:text-base leading-relaxed mb-6">
                  {resource.description}
                </p>
                <span className="inline-flex items-center gap-2 font-heading text-sm font-semibold text-[#F26522] group-hover:gap-3 transition-all duration-300">
                  Read More <ArrowRight className="w-4 h-4" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
