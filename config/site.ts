/**
 * SINGLE SOURCE OF TRUTH for all business data (Section 4 of the build spec).
 * Every user-facing phone number, address, hour, and trust signal is read from
 * here — never hardcode NAP data anywhere else. Keep identical to the
 * Google Business Profile.
 */
export const siteConfig = {
  name: "Island Shine Property Services",
  shortName: "Island Shine",
  tagline: "Quality is our #1 priority",
  description:
    "Professional window cleaning, pressure washing, and soft washing in Victoria, BC. " +
    "Licensed, insured, and owner-operated. Free quotes — call today.",
  url: "https://islandshine.ca",
  ogImage: "/images/og-image.jpg", // 1200x630

  // Contact / NAP — keep identical to Google Business Profile
  // TODO: confirm phone; 289 is an Ontario area code — a local 250/236/778
  // number builds more local trust in Victoria.
  phone: "289-925-9779",
  phoneE164: "+12899259779", // used for tel: links
  email: "hello@islandshine.ca", // TODO: confirm real inbox

  address: {
    // Service-area business; street address optional, city/region required.
    locality: "Victoria",
    region: "BC",
    regionName: "British Columbia",
    postalCode: "", // TODO: optional
    country: "CA",
  },

  // Approx. geo for LocalBusiness schema + geo meta (Victoria, BC)
  geo: { lat: 48.4284, lng: -123.3656 },

  owner: { name: "Laughlan Crockett", role: "Owner-Operator" },

  // Trust signals shown across the site
  trust: {
    licensedInsured: true,
    googleRating: 5.0,
    googleReviewsUrl: "", // TODO: paste Google Business Profile review link
    yearsExperience: null as number | null, // TODO if applicable
  },

  hours: [
    // TODO: confirm. Used for schema + the "hours" line in the footer.
    { days: "Mon–Fri", opens: "08:00", closes: "18:00" },
    { days: "Sat", opens: "09:00", closes: "16:00" },
  ],

  social: {
    google: "", // TODO
    facebook: "", // TODO (business card / profile exists)
    instagram: "",
  },

  // Response promise used in CTAs
  responsePromise: "We reply within 24 hours",

  priceRange: "$$",

  // Analytics IDs are read from env, NOT stored here (Section 9).
} as const;

export type SiteConfig = typeof siteConfig;

/** Human-readable phone for display; tel:/wa.me links must use phoneE164. */
export function formatPhoneDisplay(): string {
  return siteConfig.phone;
}

export function telUrl(): string {
  return `tel:${siteConfig.phoneE164}`;
}
