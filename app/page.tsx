import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { faqs } from "@/content/faqs";
import { services } from "@/content/services";
import { faqPageSchema, serviceSchema } from "@/lib/schema";
import { BeforeAfter } from "@/components/sections/BeforeAfter";
import { Faq } from "@/components/sections/Faq";
import { FinalCta } from "@/components/sections/FinalCta";
import { Hero } from "@/components/sections/Hero";
import { Reviews } from "@/components/sections/Reviews";
import { ServiceAreaTeaser } from "@/components/sections/ServiceAreaTeaser";
import { Services } from "@/components/sections/Services";
import { WhyChooseUs } from "@/components/sections/WhyChooseUs";
import { JsonLd } from "@/components/seo/JsonLd";
import { Divider } from "@/components/ui/Divider";

export const metadata: Metadata = {
  title: {
    absolute: "Window Cleaning & Pressure Washing in Victoria, BC | Island Shine",
  },
  description:
    "Streak-free window cleaning, pressure washing & soft washing across Greater " +
    "Victoria. Licensed, insured, owner-operated. Get your free quote today.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Window Cleaning & Pressure Washing in Victoria, BC | Island Shine",
    description:
      "Streak-free window cleaning, pressure washing & soft washing across Greater " +
      "Victoria. Licensed, insured, owner-operated. Get your free quote today.",
    url: siteConfig.url,
  },
};

/**
 * Home — a persuasion sequence (Section 7): each section removes one
 * objection and pushes toward contact. Coastline dividers stitch the
 * navy/light rhythm together.
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      {/* Wave into the light services section */}
      <div className="on-dark bg-sand-50">
        <Divider className="text-navy-900" flip />
      </div>
      <Services />
      <div className="bg-navy-800">
        <Divider className="text-sand-50" />
      </div>
      <BeforeAfter />
      <div className="bg-sand-100">
        <Divider className="text-navy-800" />
      </div>
      <WhyChooseUs />
      <div className="bg-navy-800">
        <Divider className="text-sand-100" />
      </div>
      <Reviews />
      <div className="bg-white">
        <Divider className="text-navy-800" />
      </div>
      <ServiceAreaTeaser />
      <Faq />
      <div className="bg-navy-900">
        <Divider className="text-sand-50" />
      </div>
      <FinalCta />

      {/* Structured data: services + FAQ (LocalBusiness ships in the layout) */}
      {services.map((service) => (
        <JsonLd key={service.slug} data={serviceSchema(service)} />
      ))}
      <JsonLd data={faqPageSchema(faqs)} />
    </>
  );
}
