"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, Phone, X } from "lucide-react";
import { siteConfig, telUrl } from "@/config/site";
import { track } from "@/lib/analytics";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/#services", label: "Services" },
  { href: "/#gallery", label: "Gallery" },
  { href: "/#areas", label: "Areas" },
  { href: "/#reviews", label: "Reviews" },
];

/**
 * Sticky header (Section 6.1). Transparent over the navy hero, gains a solid
 * navy background + shadow after ~40px of scroll. Fixed positioning, so no
 * layout shift.
 */
export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  return (
    <header
      className={cn(
        "on-dark fixed inset-x-0 top-0 z-40 transition-all duration-300",
        scrolled || menuOpen
          ? "bg-navy-900/95 shadow-card backdrop-blur-sm"
          : "bg-transparent",
      )}
    >
      <div className="mx-auto flex h-16 max-w-container items-center justify-between px-5 md:h-20 md:px-8">
        <Link
          href="/"
          className="flex items-center gap-2 text-white"
          aria-label={`${siteConfig.shortName} home`}
        >
          <Image
            src="/images/logo/icon-transparent.png"
            alt=""
            width={216}
            height={100}
            className="h-10 w-auto md:h-12"
            priority
          />
          <span className="heading-display text-xl font-bold tracking-wide">
            {siteConfig.shortName}
          </span>
        </Link>

        {/* Desktop nav */}
        <nav aria-label="Main navigation" className="hidden items-center gap-6 lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-white/85 transition-colors hover:text-white"
            >
              {link.label}
            </Link>
          ))}
          <a
            href={telUrl()}
            onClick={() => track("phone_click", { location: "header" })}
            className="flex items-center gap-1.5 text-sm font-semibold text-white transition-colors hover:text-orange-400"
          >
            <Phone className="h-4 w-4" aria-hidden="true" />
            {siteConfig.phone}
          </a>
          <Link
            href="/#quote"
            onClick={() => track("cta_click", { location: "header" })}
            className="inline-flex min-h-11 cursor-pointer items-center rounded-control bg-orange-500 px-5 py-2.5 text-sm font-semibold text-white shadow-card transition-all duration-200 hover:-translate-y-0.5 hover:bg-orange-600"
          >
            Get free quote
          </Link>
        </nav>

        {/* Mobile: tap-to-call + hamburger */}
        <div className="flex items-center gap-2 lg:hidden">
          <a
            href={telUrl()}
            onClick={() => track("phone_click", { location: "header_mobile" })}
            className="inline-flex min-h-11 items-center gap-1.5 rounded-control bg-orange-500 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-orange-600"
          >
            <Phone className="h-4 w-4" aria-hidden="true" />
            Call
          </a>
          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            className="inline-flex h-11 w-11 items-center justify-center rounded-control text-white transition-colors hover:bg-white/10"
          >
            {menuOpen ? (
              <X className="h-6 w-6" aria-hidden="true" />
            ) : (
              <Menu className="h-6 w-6" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <nav
          id="mobile-menu"
          aria-label="Mobile navigation"
          className="border-t border-white/10 bg-navy-900/95 px-5 pb-6 pt-2 backdrop-blur-sm lg:hidden"
        >
          <ul>
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="block min-h-11 py-3 text-base font-medium text-white/90 transition-colors hover:text-white"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <Link
            href="/#quote"
            onClick={() => {
              track("cta_click", { location: "mobile_menu" });
              setMenuOpen(false);
            }}
            className="mt-3 inline-flex min-h-11 w-full items-center justify-center rounded-control bg-orange-500 px-5 py-3 font-semibold text-white transition-colors hover:bg-orange-600"
          >
            Get free quote
          </Link>
        </nav>
      )}
    </header>
  );
}
