"use client";

import Image from "next/image";
import { useCallback, useRef, useState } from "react";
import { GripVertical } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

/**
 * Signature section (Section 7.3): dependency-free before/after slider.
 * Mouse drag, touch drag, and keyboard all move the divider; the handle is a
 * proper ARIA slider with a visible focus ring. Both images share identical
 * dimensions (aspect-ratio box), so there is zero CLS. Images lazy-load —
 * this is below the fold, never the LCP.
 */
function ComparisonSlider() {
  const [position, setPosition] = useState(50); // % from the left
  const containerRef = useRef<HTMLDivElement>(null);
  const draggingRef = useRef(false);

  const updateFromClientX = useCallback((clientX: number) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const pct = ((clientX - rect.left) / rect.width) * 100;
    setPosition(Math.min(100, Math.max(0, pct)));
  }, []);

  const onPointerDown = (e: React.PointerEvent) => {
    draggingRef.current = true;
    e.currentTarget.setPointerCapture(e.pointerId);
    updateFromClientX(e.clientX);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (draggingRef.current) updateFromClientX(e.clientX);
  };

  const onPointerUp = () => {
    draggingRef.current = false;
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    const step = 5;
    let next: number | null = null;
    if (e.key === "ArrowLeft" || e.key === "ArrowDown") next = position - step;
    if (e.key === "ArrowRight" || e.key === "ArrowUp") next = position + step;
    if (e.key === "Home") next = 0;
    if (e.key === "End") next = 100;
    if (next !== null) {
      e.preventDefault();
      setPosition(Math.min(100, Math.max(0, next)));
    }
  };

  return (
    <div
      ref={containerRef}
      className="relative select-none overflow-hidden rounded-card shadow-card-hover"
      style={{ touchAction: "pan-y" }}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
    >
      {/* Identical aspect boxes → no layout shift */}
      <div className="relative aspect-[4/3] md:aspect-[16/9]">
        {/* TODO: replace with a real before photo from the owner's jobs */}
        <Image
          src="/images/before.jpg"
          alt="Placeholder: home exterior before cleaning — grime and moss buildup"
          fill
          sizes="(max-width: 768px) 100vw, 1024px"
          className="object-cover"
          draggable={false}
        />
        {/* TODO: replace with the matching real after photo */}
        <div
          className="absolute inset-0"
          style={{ clipPath: `inset(0 0 0 ${position}%)` }}
        >
          <Image
            src="/images/after.jpg"
            alt="Placeholder: the same exterior after cleaning — bright and spotless"
            fill
            sizes="(max-width: 768px) 100vw, 1024px"
            className="object-cover"
            draggable={false}
          />
        </div>

        {/* Labels */}
        <span className="absolute left-3 top-3 rounded-full bg-navy-900/70 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-sand-200">
          Before
        </span>
        <span className="absolute right-3 top-3 rounded-full bg-orange-500 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-white">
          After
        </span>

        {/* Divider + focusable handle */}
        <div
          className="absolute bottom-0 top-0 w-0.5 -translate-x-1/2 bg-white"
          style={{ left: `${position}%` }}
          aria-hidden="true"
        />
        <div
          role="slider"
          tabIndex={0}
          aria-label="Compare before and after — arrow keys or drag to move the divider"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(position)}
          aria-valuetext={`${Math.round(position)}% revealed`}
          onKeyDown={onKeyDown}
          className="absolute top-1/2 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 cursor-ew-resize items-center justify-center rounded-full border-2 border-white bg-navy-800/90 text-white shadow-card-hover"
          style={{ left: `${position}%` }}
        >
          <GripVertical className="h-6 w-6" aria-hidden="true" />
        </div>
      </div>
    </div>
  );
}

// TODO: replace all thumbnails with the owner's real before/after job photos.
// Real photos only in this section — never stock.
const thumbnailPairs = [
  {
    slug: "driveway",
    label: "Driveway pressure wash",
    before: "/images/pair-1-before.jpg",
    after: "/images/pair-1-after.jpg",
  },
  {
    slug: "windows",
    label: "Window cleaning",
    before: "/images/pair-2-before.jpg",
    after: "/images/pair-2-after.jpg",
  },
  {
    slug: "siding",
    label: "Siding soft wash",
    before: "/images/pair-3-before.jpg",
    after: "/images/pair-3-after.jpg",
  },
];

export function BeforeAfter() {
  return (
    <section
      id="gallery"
      aria-labelledby="gallery-heading"
      className="on-dark bg-navy-800 py-16 md:py-24"
    >
      <Container>
        <SectionHeading
          id="gallery-heading"
          eyebrow="Our work"
          title="See the difference"
          subtext="Drag the slider to compare. Every photo is a real job — no stock images."
          onDark
        />

        <Reveal className="mx-auto mt-12 max-w-4xl">
          <ComparisonSlider />
        </Reveal>

        <div className="mx-auto mt-8 grid max-w-4xl grid-cols-1 gap-4 sm:grid-cols-3">
          {thumbnailPairs.map((pair) => (
            <figure key={pair.slug} className="overflow-hidden rounded-card">
              <div className="grid grid-cols-2">
                <div className="relative aspect-square">
                  <Image
                    src={pair.before}
                    alt={`Placeholder: ${pair.label.toLowerCase()} before, Victoria BC`}
                    fill
                    sizes="(max-width: 640px) 50vw, 160px"
                    className="object-cover"
                  />
                </div>
                <div className="relative aspect-square">
                  <Image
                    src={pair.after}
                    alt={`Placeholder: ${pair.label.toLowerCase()} after, Victoria BC`}
                    fill
                    sizes="(max-width: 640px) 50vw, 160px"
                    className="object-cover"
                  />
                </div>
              </div>
              <figcaption className="bg-navy-900/60 px-3 py-2 text-center text-sm text-sand-200">
                {pair.label}
              </figcaption>
            </figure>
          ))}
        </div>
      </Container>
    </section>
  );
}
