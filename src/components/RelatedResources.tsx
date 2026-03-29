import Link from "next/link";

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
      <h2 className="font-serif text-[28px] md:text-[32px] text-text-primary tracking-tight-display mb-8">
        Related Resources
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {related.map((resource) => (
          <Link
            key={resource.href}
            href={resource.href}
            className="group bg-off-white border border-border p-6 hover:border-navy/20 transition-all duration-200"
          >
            <span className="font-sans text-eyebrow uppercase text-orange block mb-3">
              {resource.category}
            </span>
            <h3 className="font-serif text-base text-text-primary mb-3 group-hover:text-navy transition-colors duration-200 leading-snug">
              {resource.title}
            </h3>
            <span className="font-sans text-[13px] text-navy border-b border-border group-hover:border-navy pb-0.5 tracking-link transition-colors duration-200">
              Read &rarr;
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
