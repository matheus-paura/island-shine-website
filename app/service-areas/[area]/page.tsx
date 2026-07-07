import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Droplets, ShowerHead, Sparkles, Star } from "lucide-react";
import { siteConfig, telUrl } from "@/config/site";
import { reviews } from "@/content/reviews";
import { getAreaBySlug, serviceAreas } from "@/content/service-areas";
import { services, type Service } from "@/content/services";
import { breadcrumbSchema } from "@/lib/schema";
import { QuoteForm } from "@/components/forms/QuoteForm";
import { JsonLd } from "@/components/seo/JsonLd";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

const icons: Record<Service["icon"], typeof Sparkles> = {
  Sparkles,
  Droplets,
  ShowerHead,
};

type Params = { area: string };

export const dynamicParams = false;

export function generateStaticParams(): Params[] {
  return serviceAreas.map((area) => ({ area: area.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { area: slug } = await params;
  const area = getAreaBySlug(slug);
  if (!area) return {};
  return {
    title: `Window Cleaning & Pressure Washing in ${area.name}, BC`,
    description:
      `Professional window cleaning, pressure washing and soft washing in ${area.name}, ` +
      `BC. Licensed, insured and owner-operated. Free quotes — we reply within 24 hours.`,
  };
}

export default async function ServiceAreaPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { area: slug } = await params;
  const area = getAreaBySlug(slug);
  if (!area) notFound();

  return (
    <>
      {/* Localized hero */}
      <section className="on-dark bg-navy-900 pb-16 pt-28 md:pt-36">
        <Container>
          <nav aria-label="Breadcrumb" className="text-sm text-sand-200">
            <ol className="flex flex-wrap gap-2">
              <li>
                <Link href="/" className="hover:text-white">
                  Home
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li>
                <Link href="/service-areas" className="hover:text-white">
                  Service areas
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li aria-current="page" className="text-white">
                {area.name}
              </li>
            </ol>
          </nav>
          <h1 className="heading-display mt-4 max-w-3xl text-display-1 tracking-wide text-white">
            Window cleaning &amp; pressure washing in {area.name}, BC
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-sand-100">
            {area.blurb}
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button
              href="#area-quote"
              size="lg"
              event="cta_click"
              eventParams={{ location: `area_hero_${area.slug}` }}
            >
              Get free quote
            </Button>
            <Button
              href={telUrl()}
              variant="secondary"
              size="lg"
              onDark
              event="phone_click"
              eventParams={{ location: `area_hero_${area.slug}` }}
            >
              Call now · {siteConfig.phone}
            </Button>
          </div>
        </Container>
      </section>

      {/* Services offered in this area */}
      <section
        aria-labelledby={`services-${area.slug}-heading`}
        className="bg-sand-50 py-16 md:py-20"
      >
        <Container>
          <h2
            id={`services-${area.slug}-heading`}
            className="heading-display text-center text-display-2 tracking-wide text-navy-800"
          >
            What we clean in {area.name}
          </h2>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {services.map((service) => {
              const Icon = icons[service.icon];
              return (
                <article
                  key={service.slug}
                  className="rounded-card border border-sand-200 border-l-4 border-l-orange-500 bg-white p-6 shadow-card"
                >
                  <Icon className="h-8 w-8 text-orange-500" aria-hidden="true" />
                  <h3 className="heading-display mt-3 text-display-3 text-navy-800">
                    {service.name}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-500">
                    {service.short} {service.description}
                  </p>
                </article>
              );
            })}
          </div>
        </Container>
      </section>

      {/* Social proof */}
      <section
        aria-label="Customer reviews"
        className="on-dark bg-navy-800 py-16 md:py-20"
      >
        <Container className="max-w-3xl">
          <div className="grid gap-6 sm:grid-cols-2">
            {reviews.slice(0, 2).map((review) => (
              <figure
                key={review.name}
                className="rounded-card border border-white/10 bg-white/5 p-6"
              >
                <div
                  className="flex gap-0.5"
                  role="img"
                  aria-label={`${review.rating} out of 5 stars`}
                >
                  {Array.from({ length: review.rating }).map((_, i) => (
                    <Star
                      key={i}
                      className="h-4 w-4 fill-orange-400 text-orange-400"
                      aria-hidden="true"
                    />
                  ))}
                </div>
                <blockquote className="mt-3 text-sm leading-relaxed text-sand-100">
                  “{review.quote}”
                </blockquote>
                <figcaption className="mt-3 text-sm font-medium text-sand-200">
                  {review.name} · {review.neighbourhood ?? "Google review"}
                </figcaption>
              </figure>
            ))}
          </div>
        </Container>
      </section>

      {/* Quote form */}
      <section
        id="area-quote"
        aria-labelledby={`quote-${area.slug}-heading`}
        className="on-dark bg-navy-900 py-16 md:py-20"
      >
        <Container className="max-w-3xl">
          <h2
            id={`quote-${area.slug}-heading`}
            className="heading-display text-center text-display-2 tracking-wide text-white"
          >
            Get your free {area.name} quote
          </h2>
          <p className="mt-4 text-center text-sand-200">
            {siteConfig.responsePromise} — or call{" "}
            <a href={telUrl()} className="font-semibold text-white underline">
              {siteConfig.phone}
            </a>
            .
          </p>
          <div className="mt-8">
            <QuoteForm />
          </div>
        </Container>
      </section>

      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: siteConfig.url },
          { name: "Service areas", url: `${siteConfig.url}/service-areas` },
          { name: area.name, url: `${siteConfig.url}/service-areas/${area.slug}` },
        ])}
      />
    </>
  );
}
