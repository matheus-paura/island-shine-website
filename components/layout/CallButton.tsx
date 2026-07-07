"use client";

import { Phone } from "lucide-react";
import { siteConfig, telUrl } from "@/config/site";
import { track } from "@/lib/analytics";

/**
 * Floating call action button (Section 6.3) — desktop only. Mobile already
 * has the full-width sticky call bar, so this would just duplicate it there.
 * The owner has no WhatsApp number, so this is a direct tel: link rather
 * than a chat handoff.
 */
export function CallButton() {
  return (
    <a
      href={telUrl()}
      onClick={() => track("phone_click", { location: "floating_button" })}
      aria-label={`Call ${siteConfig.shortName} — get a free quote`}
      className="fixed bottom-6 right-6 z-30 hidden h-14 w-14 items-center justify-center rounded-full bg-success text-white shadow-card-hover transition-transform duration-200 hover:-translate-y-1 md:flex"
    >
      <Phone className="h-7 w-7" aria-hidden="true" />
    </a>
  );
}
