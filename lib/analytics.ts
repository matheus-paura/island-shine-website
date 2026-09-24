/**
 * Central tracking utility (Section 9.3). Every trackable interaction on the
 * site calls track(); nothing else touches dataLayer/gtag/fbq directly.
 * Safe to call when no analytics are loaded — every global is guarded, so the
 * whole layer no-ops gracefully in local dev and before pixels are activated.
 */
export type EventName =
  | "phone_click"
  | "cta_click" // any "Get free quote" button
  | "form_start" // first interaction with the form
  | "generate_lead"; // successful form submit (primary conversion)

type DataLayerWindow = Window & {
  dataLayer?: Record<string, unknown>[];
  gtag?: (...args: unknown[]) => void;
  fbq?: (...args: unknown[]) => void;
  clarity?: (...args: unknown[]) => void;
  __loadClarity?: () => void;
};

export function track(event: EventName, params: Record<string, unknown> = {}): void {
  if (typeof window === "undefined") return;
  const w = window as DataLayerWindow;

  // 1) GTM dataLayer (always — GTM routes to GA4/Ads/Meta when configured)
  w.dataLayer = w.dataLayer || [];
  w.dataLayer.push({ event, ...params });

  // 2) GA4 direct (if gtag present)
  if (typeof w.gtag === "function") {
    w.gtag("event", event, params);
  }

  // 3) Meta Pixel standard-event mapping (if fbq present)
  if (typeof w.fbq === "function") {
    const map: Record<EventName, string | null> = {
      generate_lead: "Lead",
      phone_click: "Contact",
      cta_click: null, // custom
      form_start: null, // custom
    };
    const std = map[event];
    if (std) w.fbq("track", std, params);
    else w.fbq("trackCustom", event, params);
  }

  // 4) Google Ads conversion for leads (if configured)
  const adsId = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID;
  const leadLabel = process.env.NEXT_PUBLIC_GOOGLE_ADS_LEAD_LABEL;
  if (event === "generate_lead" && adsId && leadLabel && typeof w.gtag === "function") {
    w.gtag("event", "conversion", { send_to: `${adsId}/${leadLabel}` });
  }
}

/** localStorage key for the visitor's cookie-consent choice. */
export const CONSENT_STORAGE_KEY = "island-shine-consent";

export type ConsentChoice = "granted" | "denied";

export function getStoredConsent(): ConsentChoice | null {
  if (typeof window === "undefined") return null;
  try {
    const value = window.localStorage.getItem(CONSENT_STORAGE_KEY);
    return value === "granted" || value === "denied" ? value : null;
  } catch {
    return null;
  }
}

/**
 * Persist the choice and update Google Consent Mode v2 + Meta Pixel.
 * Defaults were set to "denied" before any tag loaded (TrackingScripts).
 */
export function applyConsent(choice: ConsentChoice): void {
  if (typeof window === "undefined") return;
  const w = window as DataLayerWindow;
  try {
    window.localStorage.setItem(CONSENT_STORAGE_KEY, choice);
  } catch {
    // Private browsing — consent still applies for this page view.
  }

  if (typeof w.gtag === "function") {
    w.gtag("consent", "update", {
      ad_storage: choice,
      analytics_storage: choice,
      ad_user_data: choice,
      ad_personalization: choice,
    });
  }
  if (typeof w.fbq === "function") {
    w.fbq("consent", choice === "granted" ? "grant" : "revoke");
  }
  if (choice === "granted") w.__loadClarity?.();
  else if (typeof w.clarity === "function") w.clarity("consent", false);
}
