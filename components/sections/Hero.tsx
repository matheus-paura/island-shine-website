import { siteConfig, telUrl } from "@/config/site";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

/**
 * Hero (Section 7.1) — the LCP element. Navy overlay over the hero photo;
 * image is a native fetchpriority=high <img>.
 */
export function Hero() {
  return (
    <section aria-labelledby="hero-heading" className="on-dark relative bg-navy-900">
      {/* Native <img>: static export has no image optimizer, so a two-size
          srcSet keeps phones on the small file. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/images/work/hero-ocean.jpg"
        srcSet="/images/work/hero-ocean-800.jpg 720w, /images/work/hero-ocean.jpg 1440w"
        sizes="100vw"
        width={1440}
        height={1080}
        alt="Island Shine cleaning windows with a water-fed pole at an oceanfront home on Vancouver Island"
        fetchPriority="high"
        decoding="async"
        className="absolute inset-0 h-full w-full object-cover"
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
