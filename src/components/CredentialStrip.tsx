export default function CredentialStrip() {
  const stats = [
    { value: "500K+", label: "Covered lives" },
    { value: "88", label: "NPS" },
    { value: "20%+", label: "Cost reduction" },
    { value: "2018", label: "Operating since" },
  ];

  const badges = ["HIPAA", "SOC 2", "Patent Pending 2026"];

  return (
    <section className="bg-[#0a1e38]">
      <div className="max-w-content mx-auto px-6 md:px-12 py-6 md:py-8">
        <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4 md:gap-x-12">
          {stats.map((stat, i) => (
            <div key={stat.label} className="flex items-center gap-8 md:gap-12">
              <div className="text-center">
                <div className="font-serif text-white text-2xl md:text-[30px] tracking-tight-display">
                  {stat.value}
                </div>
                <div className="font-sans text-white/[0.38] text-xs tracking-wide mt-0.5">
                  {stat.label}
                </div>
              </div>
              {i < stats.length - 1 && (
                <div className="hidden md:block w-px h-8 bg-white/[0.07]" />
              )}
            </div>
          ))}
          <div className="hidden md:block w-px h-8 bg-white/[0.07]" />
          <div className="flex items-center gap-3">
            {badges.map((badge) => (
              <span
                key={badge}
                className="text-[10px] uppercase tracking-wider text-white/[0.38] border border-white/[0.10] px-3 py-1.5"
              >
                {badge}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
