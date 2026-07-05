import { cn } from "@/lib/utils";

/**
 * Small palm-and-mountain glyph for the wordmark lockup.
 * TODO: replace with the real logo SVG when the owner provides it.
 * Decorative — hidden from assistive tech (the wordmark text carries the name).
 */
export function IslandMark({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 40 32"
      fill="none"
      className={cn("h-8 w-10", className)}
    >
      {/* Mountain */}
      <path
        d="M14 28 24 10l4.5 8L31 14l7 14H14Z"
        fill="currentColor"
        opacity="0.55"
      />
      {/* Palm trunk */}
      <path
        d="M11 28c.5-6 .2-11-1.5-15"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      {/* Palm fronds */}
      <path
        d="M9.5 13C6.5 10.5 3.5 10 1 11.5c3-4.5 7-5.5 9.5-4C10 4.5 11.5 2.5 14.5 1c-1.5 2.5-1.5 4.5-.5 6.5 2.5-2 5.5-2 8 0-3-.5-5.5.5-7.5 2.5 2.5 0 4.5 1.5 5.5 4-2.5-2-5-2.5-7.5-1.5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        fill="none"
      />
      {/* Waterline */}
      <path
        d="M2 30c4-2 8-2 12 0s8 2 12 0 8-2 12 0"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        opacity="0.7"
      />
    </svg>
  );
}
