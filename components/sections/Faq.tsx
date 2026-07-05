import { ChevronDown } from "lucide-react";
import { faqs } from "@/content/faqs";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

/**
 * FAQ accordion (Section 7.7) built on native <details>/<summary> — fully
 * keyboard-accessible with zero JS, and every answer is in the server HTML
 * for SEO. Also powers the FAQPage JSON-LD (emitted on the home page).
 */
export function Faq() {
  return (
    <section
      id="faq"
      aria-labelledby="faq-heading"
      className="bg-sand-50 py-16 md:py-24"
    >
      <Container className="max-w-3xl">
        <SectionHeading
          id="faq-heading"
          eyebrow="Questions"
          title="Frequently asked questions"
        />

        <Reveal className="mt-10 space-y-3">
          {faqs.map((faq) => (
            <details
              key={faq.question}
              name="faq"
              className="group rounded-card border border-sand-200 bg-white shadow-card open:shadow-card-hover"
            >
              <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-4 rounded-card px-5 py-4 font-semibold text-navy-800 [&::-webkit-details-marker]:hidden">
                {faq.question}
                <ChevronDown
                  className="h-5 w-5 shrink-0 text-orange-500 transition-transform duration-200 group-open:rotate-180"
                  aria-hidden="true"
                />
              </summary>
              <p className="px-5 pb-5 leading-relaxed text-ink-500">{faq.answer}</p>
            </details>
          ))}
        </Reveal>
      </Container>
    </section>
  );
}
