import Image from "next/image";
import { MapPin, ShieldCheck, Star, UserCheck } from "lucide-react";
import { siteConfig, telUrl } from "@/config/site";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

/**
 * Hero (Section 7.1) — the LCP element. Navy overlay over the hero photo;
 * image is priority-loaded via next/image.
 */
export function Hero() {
  return (
    <section aria-labelledby="hero-heading" className="on-dark relative bg-navy-900">
      {/* TODO: replace with a real before/after shot or a clean Victoria home */}
      <Image
        src="/images/hero.jpg"
        alt="Freshly cleaned home exterior on Vancouver Island with clear windows"
        fill
        priority
        sizes="100vw"
        className="object-cover"
        quality={70}
      />
      {/* ~65% navy overlay keeps text readable at all sizes */}
      <div
        className="absolute inset-0 bg-gradient-to-b from-navy-900/80 via-navy-900/65 to-navy-900/80"
        aria-hidden="true"
      />

      <Container className="relative flex min-h-[88svh] flex-col justify-center pb-20 pt-28 md:min-h-[80svh] md:pt-36">
        <p className="text-eyebrow uppercase text-orange-400">
          <MapPin className="mr-1 inline-block h-4 w-4 align-[-2px]" aria-hidden="true" />
          {siteConfig.address.locality}, {siteConfig.address.region} · Licensed &amp;
          Insured
        </p>
        <h1
          id="hero-heading"
          className="heading-display mt-4 max-w-3xl text-display-1 tracking-wide text-white"
        >
          Make your property shine.
        </h1>
        <p className="mt-5 max-w-xl text-lg leading-relaxed text-sand-100 md:text-xl">
          Professional window cleaning, pressure washing &amp; soft washing on Vancouver
          Island.
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:gap-4">
          <Button
            href="/#quote"
            size="lg"
            event="cta_click"
            eventParams={{ location: "hero" }}
          >
            Get free quote
          </Button>
          <Button
            href={telUrl()}
            variant="secondary"
            size="lg"
            onDark
            event="phone_click"
            eventParams={{ location: "hero" }}
          >
            Call now · {siteConfig.phone}
          </Button>
        </div>

        {/* Trust row */}
        <ul className="mt-10 flex flex-wrap items-center gap-2.5" aria-label="Trust signals">
          <li>
            <Badge onDark>
              <Star
                className="h-4 w-4 fill-orange-400 text-orange-400"
                aria-hidden="true"
              />
              {siteConfig.trust.googleRating.toFixed(1)} Google
            </Badge>
          </li>
          <li>
            <Badge onDark>
              <ShieldCheck className="h-4 w-4 text-orange-400" aria-hidden="true" />
              Licensed &amp; Insured
            </Badge>
          </li>
          <li>
            <Badge onDark>
              <UserCheck className="h-4 w-4 text-orange-400" aria-hidden="true" />
              Owner-Operated
            </Badge>
          </li>
        </ul>
      </Container>
    </section>
  );
}
