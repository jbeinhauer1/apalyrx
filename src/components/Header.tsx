"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

const navLinks = [
  { href: "/manufacturers", label: "Manufacturers" },
  { href: "/employers", label: "Employers & Health Plans" },
  { href: "/pharmacies", label: "Independent Pharmacies" },
  { href: "/#how-it-works", label: "How It Works" },
  { href: "/resources", label: "Resources" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const resolveHref = (href: string) => {
    if (href === "/#how-it-works") {
      return pathname === "/" ? "#how-it-works" : "/#how-it-works";
    }
    return href;
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 bg-white transition-shadow duration-300 ${
        scrolled ? "shadow-sm" : ""
      }`}
      style={{ borderBottom: "1px solid rgba(16,42,76,0.10)", height: "68px" }}
    >
      <div className="max-w-content mx-auto px-6 md:px-12 flex items-center justify-between h-full">
        {/* Logo */}
        <Link href="/" className="flex-shrink-0">
          <span className="font-serif text-[22px] tracking-tight-display">
            <span className="text-navy">Apaly</span>
            <span className="text-orange">Rx</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={resolveHref(link.href)}
              className="font-sans text-nav-link text-text-secondary hover:text-navy transition-colors duration-200"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden lg:flex items-center gap-5">
          <a
            href="https://apalyrx.net"
            target="_blank"
            rel="noopener noreferrer"
            className="font-sans text-xs text-text-muted hover:text-navy transition-colors duration-200"
          >
            Member Portal &rarr;
          </a>
          <Link
            href="/contact"
            className="font-sans text-btn bg-navy hover:bg-navy-dark text-white px-6 py-2.5 transition-colors duration-200"
          >
            Schedule a Briefing
          </Link>
        </div>

        {/* Mobile Hamburger */}
        <button
          className="lg:hidden flex flex-col justify-center items-center w-10 h-10 gap-1.5"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          <span
            className={`block w-5 h-px bg-navy transition-all duration-300 ${
              mobileOpen ? "rotate-45 translate-y-[7px]" : ""
            }`}
          />
          <span
            className={`block w-5 h-px bg-navy transition-all duration-300 ${
              mobileOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`block w-5 h-px bg-navy transition-all duration-300 ${
              mobileOpen ? "-rotate-45 -translate-y-[7px]" : ""
            }`}
          />
        </button>
      </div>

      {/* Mobile Backdrop */}
      {mobileOpen && (
        <div
          className="lg:hidden fixed inset-0 top-[68px] bg-black/20 z-40"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Mobile Drawer */}
      <div
        className={`lg:hidden fixed top-[68px] left-0 right-0 bg-navy z-50 transition-all duration-300 overflow-hidden ${
          mobileOpen ? "max-h-screen" : "max-h-0"
        }`}
      >
        <nav className="flex flex-col px-6 py-8 gap-5">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={resolveHref(link.href)}
              className="font-sans text-base text-white/80 hover:text-white transition-colors duration-200"
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <div className="border-t border-white/[0.07] pt-5 mt-2 flex flex-col gap-4">
            <a
              href="https://apalyrx.net"
              target="_blank"
              rel="noopener noreferrer"
              className="font-sans text-sm text-white/50 hover:text-white transition-colors duration-200"
              onClick={() => setMobileOpen(false)}
            >
              Member Portal &rarr;
            </a>
            <Link
              href="/contact"
              className="font-sans text-btn bg-white/[0.07] hover:bg-white/[0.12] text-white border border-white/[0.45] px-6 py-3 text-center transition-colors duration-200"
              onClick={() => setMobileOpen(false)}
            >
              Schedule a Briefing
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}
