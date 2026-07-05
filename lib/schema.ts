import { siteConfig } from "@/config/site";
import { serviceAreas } from "@/content/service-areas";
import type { Faq } from "@/content/faqs";
import type { Service } from "@/content/services";

/**
 * JSON-LD builders (Section 10.3). Only mark up what is visibly on the page.
 * aggregateRating is emitted only once the Google reviews URL is configured —
 * a proxy for "real reviews back this number up".
 */

const dayMap: Record<string, string[]> = {
  "Mon–Fri": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
  Sat: ["Saturday"],
  Sun: ["Sunday"],
};

function openingHours() {
  return siteConfig.hours.map((h) => ({
    "@type": "OpeningHoursSpecification",
    dayOfWeek: dayMap[h.days] ?? h.days,
    opens: h.opens,
    closes: h.closes,
  }));
}

function sameAs(): string[] {
  return Object.values(siteConfig.social).filter(Boolean);
}

export function localBusinessSchema() {
  const schema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${siteConfig.url}/#business`,
    name: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    telephone: siteConfig.phoneE164,
    email: siteConfig.email,
    image: `${siteConfig.url}${siteConfig.ogImage}`,
    priceRange: siteConfig.priceRange,
    address: {
      "@type": "PostalAddress",
      addressLocality: siteConfig.address.locality,
      addressRegion: siteConfig.address.region,
      addressCountry: siteConfig.address.country,
      ...(siteConfig.address.postalCode
        ? { postalCode: siteConfig.address.postalCode }
        : {}),
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: siteConfig.geo.lat,
      longitude: siteConfig.geo.lng,
    },
    areaServed: serviceAreas.map((area) => ({
      "@type": "City",
      name: `${area.name}, BC`,
    })),
    openingHoursSpecification: openingHours(),
  };

  const links = sameAs();
  if (links.length > 0) schema.sameAs = links;

  // Only claim the rating once it is backed by a public, real review profile.
  if (siteConfig.trust.googleReviewsUrl) {
    schema.aggregateRating = {
      "@type": "AggregateRating",
      ratingValue: siteConfig.trust.googleRating,
      bestRating: 5,
      // TODO: set the real review count from the Google Business Profile.
      reviewCount: 1,
    };
  }

  return schema;
}

export function serviceSchema(service: Service) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${siteConfig.url}/#service-${service.slug}`,
    name: service.name,
    serviceType: service.name,
    description: service.description,
    provider: { "@id": `${siteConfig.url}/#business` },
    areaServed: serviceAreas.map((area) => ({
      "@type": "City",
      name: `${area.name}, BC`,
    })),
  };
}

export function faqPageSchema(faqs: readonly Faq[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };
}

export type BreadcrumbItem = { name: string; url: string };

export function breadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}
