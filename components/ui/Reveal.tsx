"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * Reveal-on-scroll wrapper (Section 5.3). Content is fully visible in the
 * server HTML (no SEO/no-JS penalty); after hydration, elements still below
 * the viewport get the fade+rise treatment as they enter. Skipped entirely
 * when prefers-reduced-motion is set.
 */
export function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  /** Stagger delay in ms. */
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    // Elements already in (or near) view stay visible — no flicker on load.
    if (el.getBoundingClientRect().top < window.innerHeight * 0.9) return;

    el.style.transitionDelay = `${delay}ms`;
    el.classList.add("reveal");

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            el.classList.add("is-revealed");
            observer.disconnect();
          }
        }
      },
      { rootMargin: "0px 0px -40px 0px", threshold: 0.1 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [delay]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
