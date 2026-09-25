import Link from "next/link";
import { MapPin, Phone } from "lucide-react";
import { telUrl } from "@/config/site";
import { serviceAreas } from "@/content/service-areas";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

/** Section 7.6 — links every area page for local SEO. */
export function ServiceAreaTeaser() {
  return (
    <section
      id="areas"
      aria-labelledby="areas-heading"
      className="bg-white py-16 md:py-24"
    >
      <Container>
        <SectionHeading
          id="areas-heading"
          eyebrow="Where we work"
          title="We serve Greater Victoria"
          subtext="From downtown Victoria to Sooke and the Saanich Peninsula, if you're on the South Island, we've got you covered."
        />

        <Reveal className="mt-10">
          <ul className="flex flex-wrap justify-center gap-3">
            {serviceAreas.map((area) => (
              <li key={area.slug}>
                <Link
                  href={`/service-areas/${area.slug}`}
                  className="inline-flex min-h-11 items-center gap-1.5 rounded-full border border-sand-200 bg-sand-50 px-5 py-2.5 font-medium text-navy-700 transition-all duration-200 hover:-translate-y-0.5 hover:border-orange-500 hover:text-orange-700 hover:shadow-card"
                >
                  <MapPin className="h-4 w-4 text-orange-500" aria-hidden="true" />
                  {area.name}
                </Link>
              </li>
            ))}
          </ul>
        </Reveal>

        <p className="mt-8 text-center text-ink-500">
          Not sure if we cover your area?{" "}
          <a
            href={telUrl()}
            className="inline-flex items-center gap-1 font-semibold text-navy-700 underline decoration-orange-500 decoration-2 underline-offset-4 transition-colors hover:text-orange-700"
          >
            <Phone className="h-4 w-4" aria-hidden="true" />
            Call us, we probably do.
          </a>
        </p>
      </Container>
    </section>
  );
}
