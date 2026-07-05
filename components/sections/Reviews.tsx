import { ExternalLink, Star } from "lucide-react";
import { siteConfig } from "@/config/site";
import { reviews } from "@/content/reviews";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

function StarRow({ rating }: { rating: number }) {
  return (
    <div
      className="flex gap-0.5"
      role="img"
      aria-label={`${rating} out of 5 stars`}
    >
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={
            i < rating
              ? "h-4 w-4 fill-orange-400 text-orange-400"
              : "h-4 w-4 text-white/30"
          }
          aria-hidden="true"
        />
      ))}
    </div>
  );
}

/** Reviews on navy (Section 7.5). Content comes from content/reviews.ts. */
export function Reviews() {
  return (
    <section
      id="reviews"
      aria-labelledby="reviews-heading"
      className="on-dark bg-navy-800 py-16 md:py-24"
    >
      <Container>
        <SectionHeading
          id="reviews-heading"
          eyebrow="Reviews"
          title="What neighbours say"
          subtext={`Rated ${siteConfig.trust.googleRating.toFixed(1)} on Google by homeowners across Greater Victoria.`}
          onDark
        />

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {reviews.map((review, index) => (
            <Reveal key={review.name} delay={index * 80}>
              <figure className="h-full rounded-card border border-white/10 bg-white/5 p-6">
                <StarRow rating={review.rating} />
                <blockquote className="mt-4 leading-relaxed text-sand-100">
                  “{review.quote}”
                </blockquote>
                <figcaption className="mt-4 text-sm font-medium text-sand-200">
                  {review.name} · {review.neighbourhood}
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>

        {siteConfig.trust.googleReviewsUrl && (
          <p className="mt-8 text-center">
            <a
              href={siteConfig.trust.googleReviewsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 font-semibold text-orange-400 transition-colors hover:text-orange-500"
            >
              See all reviews on Google
              <ExternalLink className="h-4 w-4" aria-hidden="true" />
            </a>
          </p>
        )}
      </Container>
    </section>
  );
}
