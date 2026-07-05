import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/** Small trust pill — "Licensed & Insured", "5.0 ★ Google", etc. */
export function Badge({
  children,
  onDark = false,
  className,
}: {
  children: ReactNode;
  onDark?: boolean;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-sm font-medium",
        onDark
          ? "border border-white/20 bg-white/10 text-white"
          : "border border-sand-200 bg-sand-50 text-navy-700",
        className,
      )}
    >
      {children}
    </span>
  );
}
