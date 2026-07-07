"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { Expand, GripVertical } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

type GalleryItem = {
  slug: string;
  label: string;
  before: string;
  after: string;
  beforeAlt: string;
  afterAlt: string;
  /** width / height, used to size the comparison box without layout shift */
  aspectRatio: number;
};

// Real job photos — no stock images. Soft wash is the featured comparison
// (moss removal is the most visually dramatic result); the other two open
// in a modal on click.
const FEATURED: GalleryItem = {
  slug: "soft-wash",
  label: "Roof Soft Wash",
  before: "/images/gallery/soft-wash-before.jpg",
  after: "/images/gallery/soft-wash-after.jpg",
  beforeAlt: "Roof heavily covered in green moss before soft washing, Victoria BC",
  afterAlt: "The same roof moss-free after professional soft washing",
  aspectRatio: 2200 / 2933,
};

const GALLERY_ITEMS: GalleryItem[] = [
  {
    slug: "window-cleaning",
    label: "Window Cleaning",
    before: "/images/gallery/window-cleaning-before.jpg",
    after: "/images/gallery/window-cleaning-after.jpg",
    beforeAlt: "Hazy, streaked window before professional cleaning, Victoria BC",
    afterAlt: "The same window crystal clear after professional cleaning",
    aspectRatio: 2200 / 1650,
  },
  {
    slug: "deck-pressure-wash",
    label: "Deck Pressure Wash",
    before: "/images/gallery/driveway-before.jpg",
    after: "/images/gallery/driveway-after.jpg",
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
  // dominate the page; landscape photos (windows) fill the available width.
  const isPortrait = item.aspectRatio < 1;
  const sizeStyle: React.CSSProperties = isPortrait
    ? { aspectRatio: item.aspectRatio, height: "min(75vh, 640px)" }
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
        aria-label={`Compare ${item.label} before and after — arrow keys or drag to move the divider`}
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

/** Static thumbnail (shows the dirty "before" shot) that opens the full slider in a dialog. */
function GalleryThumbnail({ item, onOpen }: { item: GalleryItem; onOpen: () => void }) {
  return (
    <button
      type="button"
      onClick={onOpen}
      className="group relative overflow-hidden rounded-card text-left shadow-card transition-all duration-200 hover:-translate-y-0.5 hover:shadow-card-hover"
      aria-label={`See before and after photos: ${item.label}`}
    >
      <div className="relative w-full" style={{ aspectRatio: item.aspectRatio }}>
        <Image
          src={item.before}
          alt={item.beforeAlt}
          fill
          sizes="(max-width: 640px) 100vw, 480px"
          className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-navy-900/40 text-white opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100">
          <Expand className="h-8 w-8" aria-hidden="true" />
          <span className="text-sm font-semibold">See before &amp; after</span>
        </div>
        <span className="absolute left-3 top-3 rounded-full bg-navy-900/70 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-sand-200">
          Before
        </span>
      </div>
      <div className="bg-navy-900/60 px-4 py-3 text-center font-medium text-sand-100">
        {item.label}
      </div>
    </button>
  );
}

/** Modal comparison — opened from a thumbnail; native <dialog> gives focus trap + Esc-to-close for free. */
function GalleryDialog({
  item,
  onClose,
}: {
  item: GalleryItem | null;
  onClose: () => void;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (item && !dialog.open) dialog.showModal();
    if (!item && dialog.open) dialog.close();
  }, [item]);

  return (
    <dialog
      ref={dialogRef}
      onClose={onClose}
      onClick={(e) => {
        if (e.target === dialogRef.current) onClose();
      }}
      aria-label={item ? `${item.label} — before and after` : undefined}
      className="w-full max-w-2xl rounded-card bg-navy-900 p-4 shadow-card-hover backdrop:bg-navy-900/80 backdrop:backdrop-blur-sm md:p-6"
    >
      {item && (
        <>
          <div className="mb-4 flex items-center justify-between">
            <h3 className="heading-display text-display-3 text-white">{item.label}</h3>
            <button
              type="button"
              onClick={onClose}
              className="flex h-10 w-10 items-center justify-center rounded-control text-white/80 transition-colors hover:bg-white/10 hover:text-white"
              aria-label="Close"
            >
              <span aria-hidden="true" className="text-2xl leading-none">
                &times;
              </span>
            </button>
          </div>
          <ComparisonSlider item={item} />
        </>
      )}
    </dialog>
  );
}

export function BeforeAfter() {
  const [openSlug, setOpenSlug] = useState<string | null>(null);
  const openItem = GALLERY_ITEMS.find((i) => i.slug === openSlug) ?? null;

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

        <Reveal className="mx-auto mt-12 max-w-2xl">
          <ComparisonSlider item={FEATURED} />
        </Reveal>

        <div className="mx-auto mt-8 grid max-w-2xl grid-cols-1 gap-4 sm:grid-cols-2">
          {GALLERY_ITEMS.map((item) => (
            <GalleryThumbnail
              key={item.slug}
              item={item}
              onOpen={() => setOpenSlug(item.slug)}
            />
          ))}
        </div>
      </Container>

      <GalleryDialog item={openItem} onClose={() => setOpenSlug(null)} />
    </section>
  );
}
