"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

interface FaqItem {
  question: string;
  answer: string;
}

interface FaqAccordionProps {
  items: FaqItem[];
}

export default function FaqAccordion({ items }: FaqAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="space-y-2">
      {items.map((item, i) => {
        const isOpen = openIndex === i;
        return (
          <div
            key={i}
            className="bg-white rounded-lg border border-gray-200 px-4 py-1"
          >
            <button
              onClick={() => toggle(i)}
              className="w-full flex items-center justify-between text-left text-sm font-medium py-3"
            >
              <span>{item.question}</span>
              <ChevronDown
                className={`w-4 h-4 text-orange flex-shrink-0 ml-2 transition-transform duration-300 ${
                  isOpen ? "rotate-180" : ""
                }`}
              />
            </button>
            <div
              className="grid transition-all duration-300 ease-in-out"
              style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
            >
              <div className="overflow-hidden">
                <p className="text-gray-600 text-sm pb-3">{item.answer}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
