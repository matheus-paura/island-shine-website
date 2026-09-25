import Image from "next/image";
import { siteConfig, telUrl } from "@/config/site";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

/**
 * Hero (Section 7.1) — the LCP element. Navy overlay over the hero photo;
 * image is priority-loaded via next/image.
 */
export function Hero() {
  return (
    <section aria-labelledby="hero-heading" className="on-dark relative bg-navy-900">
      <Image
        src="/images/work/hero-ocean.jpg"
        alt="Island Shine cleaning windows with a water-fed pole at an oceanfront home on Vancouver Island"
        fill
        priority
        sizes="100vw"
        className="object-cover"
        quality={70}
      />
      {/* ~65% navy overlay keeps text readable at all sizes */}
      <div
        className="absolute inset-0 bg-gradient-to-b from-navy-900/85 via-navy-900/60 to-navy-900/85"
        aria-hidden="true"
      />

      <Container className="relative flex min-h-[88svh] flex-col justify-center pb-20 pt-28 md:min-h-[80svh] md:pt-36">
        <h1
          id="hero-heading"
          className="heading-display max-w-3xl text-display-1 tracking-wide text-white"
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
      </Container>
    </section>
  );
}
