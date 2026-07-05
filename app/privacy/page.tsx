import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { Container } from "@/components/ui/Container";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `How ${siteConfig.name} collects, uses, and protects your information.`,
};

// TODO: have the owner review this policy (and get legal advice if needed)
// before running paid ads. It is written to cover the current setup: quote
// form + phone/WhatsApp contact + optional analytics cookies.
export default function PrivacyPage() {
  return (
    <>
      <section className="on-dark bg-navy-900 pb-12 pt-28 md:pt-36">
        <Container className="max-w-3xl">
          <h1 className="heading-display text-display-1 tracking-wide text-white">
            Privacy policy
          </h1>
          <p className="mt-3 text-sand-200">
            {siteConfig.name} · Last updated July 2026
          </p>
        </Container>
      </section>

      <section aria-label="Privacy policy details" className="bg-white py-12 md:py-16">
        <Container className="max-w-3xl space-y-8 leading-relaxed text-ink-700">
          <div>
            <h2 className="heading-display text-display-3 text-navy-800">
              What we collect
            </h2>
            <p className="mt-2">
              When you request a quote, we collect the details you give us: your name,
              phone number, service area, and anything you add to your message
              (email is optional). We use this information only to prepare your quote
              and contact you about it. We never sell or share your details with third
              parties for marketing.
            </p>
          </div>

          <div>
            <h2 className="heading-display text-display-3 text-navy-800">
              Cookies &amp; analytics
            </h2>
            <p className="mt-2">
              With your consent, we use analytics tools (such as Google Analytics and
              the Meta Pixel) to understand how visitors use our site and to measure
              our advertising. These tools set cookies only after you click
              &ldquo;Accept&rdquo; on our cookie banner. If you decline, no analytics
              or advertising cookies are set, and the site works exactly the same.
            </p>
          </div>

          <div>
            <h2 className="heading-display text-display-3 text-navy-800">
              How long we keep information
            </h2>
            <p className="mt-2">
              Quote requests are kept only as long as needed to respond and complete
              any work you book. You can ask us to delete your information at any time.
            </p>
          </div>

          <div>
            <h2 className="heading-display text-display-3 text-navy-800">
              Contact us
            </h2>
            <p className="mt-2">
              Questions about this policy or your data? Email{" "}
              <a
                href={`mailto:${siteConfig.email}`}
                className="font-semibold text-navy-700 underline"
              >
                {siteConfig.email}
              </a>{" "}
              or call{" "}
              <a
                href={`tel:${siteConfig.phoneE164}`}
                className="font-semibold text-navy-700 underline"
              >
                {siteConfig.phone}
              </a>
              .
            </p>
          </div>

          <p>
            <Link href="/" className="font-semibold text-orange-600 underline">
              ← Back to home
            </Link>
          </p>
        </Container>
      </section>
    </>
  );
}
