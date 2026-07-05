import { cn } from "@/lib/utils";

/**
 * Signature coastline/wave divider (Section 5.4) — a thin single-color swell
 * with a distant island silhouette, echoing the business card's
 * mountain-and-palm motif. Fill color comes from `currentColor`, so set a
 * text-* class matching the section it transitions INTO (or out of, with flip).
 * Purely decorative — hidden from assistive tech.
 */
export function Divider({
  className,
  flip = false,
}: {
  className?: string;
  flip?: boolean;
}) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 1440 56"
      preserveAspectRatio="none"
      className={cn("block h-8 w-full md:h-12", flip && "rotate-180", className)}
    >
      {/* Gentle swell with a low island rise off-center */}
      <path
        fill="currentColor"
        d="M0 56V34c96-10 192-16 288-12s192 18 288 18 192-16 288-22c64-4 106 2 148 8 20 3 38-10 58-12 46-5 90 8 134 14 78 10 158 8 236-2v30H0Z"
      />
    </svg>
  );
}
