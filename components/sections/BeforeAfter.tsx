"use client";

import Image from "next/image";
import { useCallback, useRef, useState } from "react";
import { GripVertical } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";
import { SectionHeading } from "@/components/ui/SectionHeading";

type GalleryItem = {
  slug: string;
  label: string;
  before: string;
  after: string;
  /** Small pre-sized "before" shot for the selector card. */
  thumb: string;
  beforeAlt: string;
  afterAlt: string;
  /** width / height, used to size the comparison box without layout shift */
  aspectRatio: number;
};

// Real job photos, no stock images. Soft wash is first, so it is the
// comparison shown when the page loads (moss removal is the most dramatic
// result); the selector cards below swap which job the slider shows.
const GALLERY_ITEMS: GalleryItem[] = [
  {
    slug: "soft-wash",
    label: "Roof Soft Wash",
    before: "/images/gallery/soft-wash-before.jpg",
    after: "/images/gallery/soft-wash-after.jpg",
    thumb: "/images/gallery/soft-wash-before-thumb.jpg",
    beforeAlt: "Roof heavily covered in green moss before soft washing, Victoria BC",
    afterAlt: "The same roof moss-free after professional soft washing",
    aspectRatio: 2200 / 2933,
  },
  {
    slug: "window-cleaning",
    label: "Window Cleaning",
    before: "/images/gallery/window-cleaning-before.jpg",
    after: "/images/gallery/window-cleaning-after.jpg",
    thumb: "/images/gallery/window-cleaning-before-thumb.jpg",
    beforeAlt: "Hazy, streaked window before professional cleaning, Victoria BC",
    afterAlt: "The same window crystal clear after professional cleaning",
    aspectRatio: 2200 / 1650,
  },
  {
    slug: "pressure-wash",
    label: "Pressure Wash",
    before: "/images/gallery/driveway-before.jpg",
    after: "/images/gallery/driveway-after.jpg",
    thumb: "/images/gallery/driveway-before-thumb.jpg",
    beforeAlt: "Composite deck stained with dirt and grime before pressure washing",
    afterAlt: "The same deck restored to a like-new finish after pressure washing",
    aspectRatio: 2200 / 2933,
  },
];

/**
 * Dependency-free before/after slider (Section 7.3). Mouse drag, touch drag,
 * and keyboard all move the divider; the handle is a proper ARIA slider with
 * a visible focus ring. Both images share identical dimensions (aspect-ratio
 * box from the source photos), so there is zero CLS.
 */
function ComparisonSlider({ item, priority = false }: { item: GalleryItem; priority?: boolean }) {
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

  // Portrait photos (roof, deck) are capped by height so they never
  // dominate the page, but the width is also clamped to the container: a
  // height-derived width wider than a phone screen widens the whole page.
  // Landscape photos (windows) fill the available width.
  const isPortrait = item.aspectRatio < 1;
  const sizeStyle: React.CSSProperties = isPortrait
    ? {
        aspectRatio: item.aspectRatio,
        width: `min(100%, calc(min(75vh, 640px) * ${item.aspectRatio}))`,
      }
    : { aspectRatio: item.aspectRatio, width: "100%" };

  return (
    <div
      ref={containerRef}
      className="relative mx-auto select-none overflow-hidden rounded-card shadow-card-hover"
      style={{ ...sizeStyle, touchAction: "pan-y" }}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
    >
      <Image
        src={item.before}
        alt={item.beforeAlt}
        fill
        priority={priority}
        sizes="(max-width: 768px) 100vw, 1024px"
        className="object-cover"
        draggable={false}
      />
      <div className="absolute inset-0" style={{ clipPath: `inset(0 0 0 ${position}%)` }}>
        <Image
          src={item.after}
          alt={item.afterAlt}
          fill
          priority={priority}
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
        aria-label={`Compare ${item.label} before and after. Use arrow keys or drag to move the divider`}
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
  );
}

/** Selector card: shows the "before" shot; selecting it loads that job into the slider above. */
function GalleryThumbnail({
  item,
  active,
  onSelect,
}: {
  item: GalleryItem;
  active: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={active}
      aria-label={`Show before and after: ${item.label}`}
      className={cn(
        "group overflow-hidden rounded-card text-left shadow-card outline-2 outline-offset-2 transition-all duration-200",
        active
          ? "outline outline-orange-500"
          : "opacity-75 hover:-translate-y-0.5 hover:opacity-100 hover:shadow-card-hover",
      )}
    >
      <div className="relative aspect-[4/3] w-full">
        <Image
          src={item.thumb}
          alt=""
          fill
          sizes="(max-width: 640px) 33vw, 200px"
          className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
        />
      </div>
      <div
        className={cn(
          "px-2 py-2 text-center text-xs font-medium sm:text-sm",
          active ? "bg-orange-500 text-white" : "bg-navy-900/60 text-sand-100",
        )}
      >
        {item.label}
      </div>
    </button>
  );
}

export function BeforeAfter() {
  const [activeSlug, setActiveSlug] = useState(GALLERY_ITEMS[0].slug);
  const sliderRef = useRef<HTMLDivElement>(null);
  const active = GALLERY_ITEMS.find((i) => i.slug === activeSlug) ?? GALLERY_ITEMS[0];

  const select = (slug: string) => {
    setActiveSlug(slug);
    const el = sliderRef.current;
    if (!el) return;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    // Bring the slider back into view when a card below was tapped.
    const rect = el.getBoundingClientRect();
    if (rect.top < 80 || rect.bottom > window.innerHeight) {
      el.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "center" });
    }
  };

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
          subtext="Drag the slider to compare. Every photo is a real job, not a stock image."
          onDark
        />

        <Reveal className="mx-auto mt-12 max-w-2xl">
          <div ref={sliderRef} aria-live="polite">
            <ComparisonSlider key={active.slug} item={active} />
          </div>
        </Reveal>

        <div className="mx-auto mt-6 grid max-w-2xl grid-cols-3 gap-3 sm:gap-4">
          {GALLERY_ITEMS.map((item) => (
            <GalleryThumbnail
              key={item.slug}
              item={item}
              active={item.slug === active.slug}
              onSelect={() => select(item.slug)}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
