"use client";

import { MessageCircle } from "lucide-react";
import { siteConfig, whatsappUrl } from "@/config/site";
import { track } from "@/lib/analytics";

/**
 * Floating WhatsApp action button (Section 6.3). Sits above the sticky call
 * bar on mobile; bottom-right corner on desktop.
 */
export function WhatsAppButton() {
  return (
    <a
      href={whatsappUrl()}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => track("whatsapp_click", { location: "floating_button" })}
      aria-label={`Message ${siteConfig.shortName} on WhatsApp — get a free quote`}
      className="fixed bottom-[calc(4.5rem+env(safe-area-inset-bottom))] right-4 z-30 flex h-14 w-14 items-center justify-center rounded-full bg-success text-white shadow-card-hover transition-transform duration-200 hover:-translate-y-1 md:bottom-6 md:right-6"
    >
      <MessageCircle className="h-7 w-7" aria-hidden="true" />
    </a>
  );
}
