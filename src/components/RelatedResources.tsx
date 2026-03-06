import Link from "next/link";
import { ArrowRight } from "lucide-react";

const allResources = [
  {
    href: "/resources/drug-benefit-integrity",
    category: "Industry Standard",
    title: "Drug Benefit Integrity (DBI): The Five-Requirement Standard",
  },
  {
    href: "/resources/direct-to-employer-drug-programs",
    category: "Education",
    title: "Direct-to-Employer Drug Programs (DTE): What Employers Need to Know",
  },
  {
    href: "/resources/lowest-net-cost-routing",
    category: "Education",
    title: "What Is Lowest Net Cost Prescription Routing?",
  },
  {
    href: "/resources/pbm-fiduciary-compliance",
    category: "Compliance",
    title: "PBM Fiduciary Compliance: How Employers Can Prove Prudent Oversight",
  },
];

export default function RelatedResources({ currentHref }: { currentHref: string }) {
  const related = allResources.filter((r) => r.href !== currentHref);

  return (
    <div className="mb-16">
      <h2 className="font-heading text-2xl sm:text-3xl font-bold text-[#0F1C2E] mb-8">
        Related Resources
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {related.map((resource) => (
          <Link
            key={resource.href}
            href={resource.href}
            className="group bg-[#f8f9fb] rounded-xl border border-gray-200 p-6 hover:shadow-md hover:border-[#F26522]/30 transition-all duration-300"
          >
            <span className="inline-block font-heading text-[10px] font-semibold uppercase tracking-wider text-[#F26522] bg-[#F26522]/10 px-2.5 py-0.5 rounded-full mb-3">
              {resource.category}
            </span>
            <h3 className="font-heading text-base font-bold text-[#0F1C2E] mb-3 group-hover:text-[#F26522] transition-colors duration-300 leading-snug">
              {resource.title}
            </h3>
            <span className="inline-flex items-center gap-1.5 font-heading text-sm font-semibold text-[#F26522] group-hover:gap-2.5 transition-all duration-300">
              Read <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
