import { MapPin, ShieldCheck, Star, UserCheck } from "lucide-react";
import { siteConfig } from "@/config/site";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

const valueProps = [
  {
    icon: UserCheck,
    title: "You deal with the owner",
    text: `${siteConfig.owner.name} quotes, cleans, and follows up personally — not a call center, not a rotating crew.`,
  },
  {
    icon: ShieldCheck,
    title: "Licensed & insured",
    text: "Your property is fully protected while we work. Proof of insurance available on request.",
  },
  {
    icon: MapPin,
    title: "Local to Vancouver Island",
    text: "We know the coastal climate — the salt spray, the winter moss, the algae — and how to beat it.",
  },
  {
    icon: Star,
    title: `${siteConfig.trust.googleRating.toFixed(1)}-star rated`,
    text: "Trusted by Victoria homeowners and property managers, with a perfect Google rating.",
  },
];

/** Section 7.4 — where a solo operator wins against faceless franchises. */
export function WhyChooseUs() {
  return (
    <section
      aria-labelledby="why-heading"
      className="bg-sand-100 py-16 md:py-24"
    >
      <Container>
        <SectionHeading
          id="why-heading"
          eyebrow="Why Island Shine"
          title="Small company, higher standard"
          subtext="No franchises, no subcontractors — just careful, insured work from a local owner who answers his own phone."
        />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {valueProps.map((prop, index) => (
            <Reveal key={prop.title} delay={index * 80}>
              <div className="h-full rounded-card bg-white p-6 shadow-card">
                <prop.icon className="h-8 w-8 text-orange-500" aria-hidden="true" />
                <h3 className="heading-display mt-4 text-display-3 text-navy-800">
                  {prop.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-500">{prop.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
