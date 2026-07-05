"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { applyConsent, getStoredConsent } from "@/lib/analytics";

/**
 * Small, non-blocking cookie banner (Section 9.4 — PIPEDA-friendly).
 * Shown only until a choice is stored; consent defaults are "denied" either way.
 * Sits above the sticky call bar on mobile.
 */
export function ConsentBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (getStoredConsent() === null) setVisible(true);
  }, []);

  if (!visible) return null;

  const choose = (choice: "granted" | "denied") => {
    applyConsent(choice);
    setVisible(false);
  };

  return (
    <div
      role="region"
      aria-label="Cookie consent"
      className="fixed inset-x-3 bottom-[calc(4.75rem+env(safe-area-inset-bottom))] z-50 mx-auto max-w-xl rounded-card border border-sand-200 bg-white p-4 shadow-card-hover md:bottom-4"
    >
      <p className="text-sm text-ink-700">
        We use cookies to understand how visitors use our site and to measure our ads.{" "}
        <Link href="/privacy" className="font-medium text-navy-600 underline">
          Privacy policy
        </Link>
      </p>
      <div className="mt-3 flex gap-3">
        <button
          type="button"
          onClick={() => choose("granted")}
          className="min-h-11 flex-1 rounded-control bg-navy-800 px-4 text-sm font-semibold text-white transition-colors hover:bg-navy-700"
        >
          Accept
        </button>
        <button
          type="button"
          onClick={() => choose("denied")}
          className="min-h-11 flex-1 rounded-control border border-sand-200 bg-white px-4 text-sm font-semibold text-ink-700 transition-colors hover:bg-sand-50"
        >
          Decline
        </button>
      </div>
    </div>
  );
}
