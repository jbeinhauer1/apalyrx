"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { ChevronDown } from "lucide-react";

const solutionsLinks = [
  { href: "/pbms", label: "PBMs" },
  { href: "/employers", label: "Health Plans" },
  { href: "/consultants", label: "Benefits Consultants" },
  { href: "/manufacturers", label: "Manufacturers" },
  { href: "/pharmacies", label: "Independent Pharmacies" },
];

const mobileLinks = [
  { href: "/#how-it-works", label: "How It Works" },
  { href: "/pbms", label: "PBMs" },
  { href: "/employers", label: "Health Plans" },
  { href: "/consultants", label: "Benefits Consultants" },
  { href: "/manufacturers", label: "Manufacturers" },
  { href: "/pharmacies", label: "Independent Pharmacies" },
  { href: "/members", label: "Plan Members" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const pathname = usePathname();

  const howItWorksHref = pathname === "/" ? "#how-it-works" : "/#how-it-works";

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

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => setDropdownOpen(false), 150);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 bg-white border-b border-border transition-shadow duration-300 ${
        scrolled ? "shadow-sm" : ""
      }`}
    >
      <div className="max-w-content mx-auto px-4 flex items-center justify-between h-20 md:h-24 lg:h-28">
        <Link href="/" className="flex-shrink-0">
          <Image
            src="/apalyrx-logo-full-color.png"
            alt="ApalyRx"
            width={240}
            height={96}
            className="h-10 md:h-12 w-auto"
            priority
          />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-5 lg:gap-6">
          <Link
            href={howItWorksHref}
            className="font-heading text-sm lg:text-[15px] font-medium text-muted-foreground hover:text-navy transition-all duration-300"
          >
            How It Works
          </Link>

          {/* Solutions Dropdown */}
          <div
            ref={dropdownRef}
            className="relative"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <button
              className="font-heading text-sm lg:text-[15px] font-medium text-muted-foreground hover:text-navy transition-all duration-300 flex items-center gap-1"
              onClick={() => setDropdownOpen(!dropdownOpen)}
            >
              Solutions
              <ChevronDown
                className={`w-3.5 h-3.5 transition-transform duration-200 ${
                  dropdownOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            <div
              className={`absolute top-full left-1/2 -translate-x-1/2 mt-2 bg-white rounded-lg shadow-elevated border border-border py-2 min-w-[220px] transition-all duration-200 ${
                dropdownOpen
                  ? "opacity-100 translate-y-0 pointer-events-auto"
                  : "opacity-0 -translate-y-1 pointer-events-none"
              }`}
            >
              {solutionsLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block px-4 py-3 font-heading text-sm text-navy hover:bg-[#F26522]/5 hover:text-[#F26522] hover:border-l-2 hover:border-l-[#F26522] transition-colors"
                  onClick={() => setDropdownOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <Link
            href="/members"
            className="font-heading text-sm lg:text-[15px] font-medium text-muted-foreground hover:text-navy transition-all duration-300"
          >
            Plan Members
          </Link>

          <Link
            href="/contact"
            className="font-heading text-sm lg:text-[15px] font-medium text-muted-foreground hover:text-navy transition-all duration-300"
          >
            Contact
          </Link>

          <Link
            href="/contact"
            className="ml-2 bg-[#F26522] hover:bg-[#F26522]/90 text-white font-heading font-medium text-sm lg:text-[15px] px-5 py-2.5 rounded-lg transition-all duration-300"
          >
            Request a Conversation
          </Link>
        </nav>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden flex flex-col justify-center items-center w-10 h-10 gap-1.5"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          <span
            className={`block w-6 h-0.5 bg-navy transition-all duration-300 ${
              mobileOpen ? "rotate-45 translate-y-2" : ""
            }`}
          />
          <span
            className={`block w-6 h-0.5 bg-navy transition-all duration-300 ${
              mobileOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`block w-6 h-0.5 bg-navy transition-all duration-300 ${
              mobileOpen ? "-rotate-45 -translate-y-2" : ""
            }`}
          />
        </button>
      </div>

      {/* Mobile backdrop */}
      {mobileOpen && (
        <div
          className="md:hidden fixed inset-0 top-20 bg-black/30 z-40"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Mobile drawer */}
      <div
        className={`md:hidden fixed top-0 right-0 h-full w-[300px] bg-white shadow-xl z-50 transition-transform duration-300 ${
          mobileOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-end p-4">
          <button
            onClick={() => setMobileOpen(false)}
            aria-label="Close menu"
            className="w-10 h-10 flex items-center justify-center relative"
          >
            <span className="block w-6 h-0.5 bg-navy rotate-45 absolute" />
            <span className="block w-6 h-0.5 bg-navy -rotate-45 absolute" />
          </button>
        </div>
        <nav className="flex flex-col gap-5 px-6 pt-4">
          {mobileLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="font-heading text-lg font-medium text-muted-foreground hover:text-navy transition-all duration-300"
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/contact"
            className="mt-4 bg-[#F26522] hover:bg-[#F26522]/90 text-white font-heading font-medium px-8 py-3 rounded-lg transition-all duration-300 text-center"
            onClick={() => setMobileOpen(false)}
          >
            Request a Conversation
          </Link>
        </nav>
      </div>
    </header>
  );
}
