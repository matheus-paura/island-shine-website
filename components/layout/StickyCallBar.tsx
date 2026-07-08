"use client";

import { Phone } from "lucide-react";
import { siteConfig, telUrl } from "@/config/site";
import { track } from "@/lib/analytics";

/**
 * Mobile-only sticky bottom bar (Section 6.2): the fastest conversion path is
 * always one thumb-tap away. The root layout reserves matching bottom padding
 * so this never covers content.
 */
export function StickyCallBar() {
  return (
    <div
      className="fixed inset-x-0 bottom-0 z-40 border-t border-navy-900/20 pb-[env(safe-area-inset-bottom)] md:hidden"
      role="region"
      aria-label="Quick contact"
    >
      <a
        href={telUrl()}
        onClick={() => track("phone_click", { location: "sticky_bar" })}
        aria-label={`Call ${siteConfig.shortName} now at ${siteConfig.phone}`}
        className="flex min-h-14 items-center justify-center gap-2 bg-orange-500 font-semibold text-white transition-colors active:bg-orange-600"
      >
        <Phone className="h-5 w-5" aria-hidden="true" />
        Call now · {siteConfig.phone}
      </a>
    </div>
  );
}
