import { siteConfig, telUrl } from "@/config/site";
import { QuoteForm } from "@/components/forms/QuoteForm";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";

/** Final CTA + quote form on navy (Section 7.8). */
export function FinalCta() {
  return (
    <section
      id="quote"
      aria-labelledby="quote-heading"
      className="on-dark bg-navy-900 py-16 md:py-24"
    >
      <Container className="max-w-3xl">
        <div className="text-center">
          <p className="text-eyebrow uppercase text-orange-400">Free, no-obligation</p>
          <h2
            id="quote-heading"
            className="heading-display mt-2 text-display-2 tracking-wide text-white"
          >
            Ready for a free quote?
          </h2>
          <p className="mt-4 text-sand-200">
            {siteConfig.responsePromise}, usually much sooner.
          </p>
        </div>

        <Reveal className="mt-10">
          <QuoteForm />
        </Reveal>

        <p className="mt-8 text-center text-sand-200">Rather talk to a person?</p>
        <div className="mt-3 text-center">
          <Button
            href={telUrl()}
            variant="secondary"
            onDark
            event="phone_click"
            eventParams={{ location: "final_cta" }}
          >
            Call now · {siteConfig.phone}
          </Button>
        </div>
      </Container>
    </section>
  );
}
