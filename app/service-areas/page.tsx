import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";
import { siteConfig } from "@/config/site";
import { serviceAreas } from "@/content/service-areas";
import { breadcrumbSchema } from "@/lib/schema";
import { JsonLd } from "@/components/seo/JsonLd";
import { Container } from "@/components/ui/Container";

export const metadata: Metadata = {
  title: "Service Areas — Greater Victoria, BC",
  description:
    "Island Shine serves all of Greater Victoria: window cleaning, pressure washing " +
    "and soft washing in Victoria, Saanich, Oak Bay, Langford, Sidney, Sooke and more.",
};

export default function ServiceAreasPage() {
  return (
    <>
      <section className="on-dark bg-navy-900 pb-16 pt-28 md:pt-36">
        <Container>
          <nav aria-label="Breadcrumb" className="text-sm text-sand-200">
            <ol className="flex gap-2">
              <li>
                <Link href="/" className="hover:text-white">
                  Home
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li aria-current="page" className="text-white">
                Service areas
              </li>
            </ol>
          </nav>
          <h1 className="heading-display mt-4 text-display-1 tracking-wide text-white">
            Where we work
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-sand-200">
            {siteConfig.shortName} covers all of Greater Victoria and the Saanich
            Peninsula. Pick your community below — or just call{" "}
            <a
              href={`tel:${siteConfig.phoneE164}`}
              className="font-semibold text-white underline"
            >
              {siteConfig.phone}
            </a>{" "}
            and we&apos;ll confirm on the spot.
          </p>
        </Container>
      </section>

      <section aria-label="Service areas" className="bg-sand-50 py-16 md:py-20">
        <Container>
          <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {serviceAreas.map((area) => (
              <li key={area.slug}>
                <Link
                  href={`/service-areas/${area.slug}`}
                  className="group flex h-full flex-col rounded-card border border-sand-200 bg-white p-6 shadow-card transition-all duration-200 hover:-translate-y-0.5 hover:shadow-card-hover"
                >
                  <span className="flex items-center gap-2 font-display text-xl font-semibold uppercase tracking-wide text-navy-800">
                    <MapPin className="h-5 w-5 text-orange-500" aria-hidden="true" />
                    {area.name}
                  </span>
                  <span className="mt-3 line-clamp-3 text-sm leading-relaxed text-ink-500">
                    {area.blurb}
                  </span>
                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-orange-600">
                    Cleaning in {area.name}
                    <ArrowRight
                      className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                      aria-hidden="true"
                    />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: siteConfig.url },
          { name: "Service areas", url: `${siteConfig.url}/service-areas` },
        ])}
      />
    </>
  );
}
