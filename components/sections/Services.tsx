import Image from "next/image";
import { ArrowRight, Droplets, ShowerHead, Sparkles } from "lucide-react";
import { services, type Service } from "@/content/services";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

const icons: Record<Service["icon"], typeof Sparkles> = {
  Sparkles,
  Droplets,
  ShowerHead,
};

const serviceImages: Record<string, { src: string; alt: string }> = {
  "window-cleaning": {
    src: "/images/work/service-window.jpg",
    alt: "Clean glass windows and railing on a Victoria home after window cleaning",
  },
  "pressure-washing": {
    src: "/images/work/service-pressure.jpg",
    alt: "Balcony surface after pressure washing at a marina-view home",
  },
  "soft-washing": {
    src: "/images/work/service-soft.jpg",
    alt: "Moss-free asphalt shingle roof after soft washing",
  },
};

/** Services grid (Section 7.2) — 1 col mobile → 3 col desktop. */
export function Services() {
  return (
    <section
      id="services"
      aria-labelledby="services-heading"
      className="bg-sand-50 py-16 md:py-24"
    >
      <Container>
        <SectionHeading
          id="services-heading"
          eyebrow="What we do"
          title="Exterior cleaning, done right"
          subtext="Three core services keep Victoria homes and businesses looking their best in our salty, mossy coastal climate."
        />

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {services.map((service, index) => {
            const Icon = icons[service.icon];
            const photo = serviceImages[service.slug];
            return (
              <Reveal key={service.slug} delay={index * 80}>
                <article className="group flex h-full flex-col overflow-hidden rounded-card border border-l-4 border-sand-200 border-l-orange-500 bg-white shadow-card transition-all duration-200 hover:-translate-y-0.5 hover:shadow-card-hover">
                  {photo && (
                    <div className="relative aspect-[10/7] w-full">
                      <Image
                        src={photo.src}
                        alt={photo.alt}
                        fill
                        sizes="(max-width: 768px) 100vw, 384px"
                        className="object-cover"
                      />
                    </div>
                  )}
                  <div className="flex flex-1 flex-col p-6">
                    <Icon className="h-9 w-9 text-orange-500" aria-hidden="true" />
                    <h3 className="heading-display mt-4 text-display-3 text-navy-800">
                      {service.name}
                    </h3>
                    <p className="mt-1 font-medium text-ink-700">{service.short}</p>
                    <p className="mt-3 text-sm leading-relaxed text-ink-500">
                      {service.description}
                    </p>
                    <ul className="mt-4 space-y-1.5 text-sm text-ink-700">
                      {service.bullets.map((bullet) => (
                        <li key={bullet} className="flex items-center gap-2">
                          <span
                            className="h-1.5 w-1.5 shrink-0 rounded-full bg-orange-500"
                            aria-hidden="true"
                          />
                          {bullet}
                        </li>
                      ))}
                    </ul>
                    <div className="mt-auto pt-5">
                      <Button
                        href="/#quote"
                        variant="ghost"
                        size="sm"
                        event="cta_click"
                        eventParams={{ location: `service_card_${service.slug}` }}
                        className="-ml-2"
                      >
                        Get a quote
                        <ArrowRight
                          className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                          aria-hidden="true"
                        />
                      </Button>
                    </div>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
