"use client";

import { useAnimateOnScroll } from "./useAnimateOnScroll";

interface SectionWrapperProps {
  children: React.ReactNode;
  bg?: "white" | "light" | "navy";
  id?: string;
  className?: string;
}

export default function SectionWrapper({
  children,
  bg = "white",
  id,
  className = "",
}: SectionWrapperProps) {
  const ref = useAnimateOnScroll();
  const bgClass =
    bg === "navy"
      ? "bg-navy text-white"
      : bg === "light"
      ? "bg-off-white"
      : "bg-white";

  return (
    <section id={id} ref={ref} className={`${bgClass} ${className}`}>
      <div className="max-w-content mx-auto px-6 md:px-12 py-16 md:py-24">
        {children}
      </div>
    </section>
  );
}
