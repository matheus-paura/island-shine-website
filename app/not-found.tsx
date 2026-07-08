import Link from "next/link";
import { siteConfig, telUrl } from "@/config/site";
import { Container } from "@/components/ui/Container";

export default function NotFound() {
  return (
    <section className="on-dark bg-navy-900 pb-24 pt-40 text-center">
      <Container>
        <p className="text-eyebrow uppercase text-orange-400">404</p>
        <h1 className="heading-display mt-3 text-display-1 tracking-wide text-white">
          This page washed away
        </h1>
        <p className="mx-auto mt-4 max-w-md text-sand-200">
          The page you&apos;re looking for doesn&apos;t exist, but a free quote is
          always one tap away.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            href="/"
            className="inline-flex min-h-11 items-center rounded-control bg-orange-500 px-6 py-3 font-semibold text-white transition-colors hover:bg-orange-600"
          >
            Back to home
          </Link>
          <a
            href={telUrl()}
            className="inline-flex min-h-11 items-center rounded-control border-2 border-white/80 px-6 py-3 font-semibold text-white transition-colors hover:bg-white hover:text-navy-800"
          >
            Call {siteConfig.phone}
          </a>
        </div>
      </Container>
    </section>
  );
}
