"use client";

import { useState } from "react";

interface FaqItem {
  question: string;
  answer: string;
}

interface FaqSection {
  title: string;
  items: FaqItem[];
}

interface ManufacturerFaqProps {
  sections: FaqSection[];
}

export default function ManufacturerFaq({ sections }: ManufacturerFaqProps) {
  const [openSection, setOpenSection] = useState<number | null>(null);

  return (
    <div className="space-y-0">
      {sections.map((section, si) => {
        const isOpen = openSection === si;
        return (
          <div key={si} className="border-b border-border">
            <button
              onClick={() => setOpenSection(isOpen ? null : si)}
              className={`w-full flex items-center justify-between text-left py-5 px-6 transition-colors duration-200 ${
                isOpen ? "bg-navy text-white" : "bg-white hover:bg-off-white"
              }`}
            >
              <span className={`font-serif text-lg ${isOpen ? "text-white" : "text-text-primary"}`}>
                {section.title}
              </span>
              <span
                className={`font-sans text-xl flex-shrink-0 transition-transform duration-300 ${
                  isOpen ? "rotate-45 text-white/60" : "text-text-muted"
                }`}
              >
                +
              </span>
            </button>
            <div
              className="grid transition-all duration-300 ease-in-out"
              style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
            >
              <div className="overflow-hidden">
                <div className="px-6 py-6 space-y-6 bg-white">
                  {section.items.map((item, qi) => (
                    <div key={qi}>
                      <h5 className="font-serif text-base text-text-primary mb-2">
                        {item.question}
                      </h5>
                      <p className="font-sans text-sm text-text-secondary leading-relaxed">
                        {item.answer}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
