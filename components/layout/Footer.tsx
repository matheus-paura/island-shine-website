import Image from "next/image";
import Link from "next/link";
import { Clock, Mail, MessageCircle, Phone, ShieldCheck, Star } from "lucide-react";
import { siteConfig, telUrl, whatsappUrl } from "@/config/site";
import { serviceAreas } from "@/content/service-areas";
import { Badge } from "@/components/ui/Badge";
import { Container } from "@/components/ui/Container";

const quickNav = [
  { href: "/#services", label: "Services" },
  { href: "/#gallery", label: "Gallery" },
  { href: "/#reviews", label: "Reviews" },
  { href: "/#faq", label: "FAQ" },
  { href: "/#quote", label: "Get a quote" },
  { href: "/service-areas", label: "Service areas" },
];

/** Navy footer (Section 6.4). NAP is read from siteConfig — never hardcoded. */
export function Footer() {
  return (
    <footer className="on-dark bg-navy-900 text-white">
      <Container className="py-14 md:py-16">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Business */}
          <div>
            <div className="flex items-center gap-2">
              <Image
                src="/images/logo/icon-square.png"
                alt=""
                width={36}
                height={36}
                className="h-9 w-9"
              />
              <span className="heading-display text-lg font-bold tracking-wide">
                {siteConfig.shortName}
              </span>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-sand-200">
              Professional window cleaning, pressure washing &amp; soft washing in{" "}
              {siteConfig.address.locality}, {siteConfig.address.region}.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              <Badge onDark>
                <ShieldCheck className="h-4 w-4 text-orange-400" aria-hidden="true" />
                Licensed &amp; Insured
              </Badge>
              <Badge onDark>
                <Star
                  className="h-4 w-4 fill-orange-400 text-orange-400"
                  aria-hidden="true"
                />
                {siteConfig.trust.googleRating.toFixed(1)} Google
              </Badge>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h2 className="heading-display text-sm font-semibold tracking-widest text-sand-200">
              Contact
            </h2>
            <ul className="mt-4 space-y-3 text-sm">
              <li>
                <a
                  href={telUrl()}
                  className="inline-flex items-center gap-2 text-white transition-colors hover:text-orange-400"
                >
                  <Phone className="h-4 w-4 text-orange-400" aria-hidden="true" />
                  {siteConfig.phone}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="inline-flex items-center gap-2 text-white transition-colors hover:text-orange-400"
                >
                  <Mail className="h-4 w-4 text-orange-400" aria-hidden="true" />
                  {siteConfig.email}
                </a>
              </li>
              <li>
                <a
                  href={whatsappUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-white transition-colors hover:text-orange-400"
                >
                  <MessageCircle className="h-4 w-4 text-orange-400" aria-hidden="true" />
                  Message on WhatsApp
                </a>
              </li>
              {siteConfig.hours.map((h) => (
                <li key={h.days} className="flex items-center gap-2 text-sand-200">
                  <Clock className="h-4 w-4 text-orange-400" aria-hidden="true" />
                  {h.days}: {h.opens}–{h.closes}
                </li>
              ))}
            </ul>
          </div>

          {/* Service areas — internal links for local SEO */}
          <div>
            <h2 className="heading-display text-sm font-semibold tracking-widest text-sand-200">
              Service areas
            </h2>
            <ul className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
              {serviceAreas.map((area) => (
                <li key={area.slug}>
                  <Link
                    href={`/service-areas/${area.slug}`}
                    className="text-sand-200 transition-colors hover:text-white"
                  >
                    {area.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick nav */}
          <div>
            <h2 className="heading-display text-sm font-semibold tracking-widest text-sand-200">
              Explore
            </h2>
            <ul className="mt-4 space-y-2 text-sm">
              {quickNav.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sand-200 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-3 border-t border-white/10 pt-6 text-sm text-sand-200 sm:flex-row sm:items-center">
          <p>
            © {new Date().getFullYear()} {siteConfig.name}. {siteConfig.address.locality},{" "}
            {siteConfig.address.region}, Canada.
          </p>
          <Link href="/privacy" className="transition-colors hover:text-white">
            Privacy policy
          </Link>
        </div>
      </Container>
    </footer>
  );
}
