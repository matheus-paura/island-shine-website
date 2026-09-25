import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  /** id placed on the <h2> — point the section's aria-labelledby here. */
  id: string;
  eyebrow?: string;
  title: string;
  subtext?: string;
  onDark?: boolean;
  align?: "left" | "center";
  className?: string;
};

/** Eyebrow label + H2 + optional subtext (Section 5.5). */
export function SectionHeading({
  id,
  eyebrow,
  title,
  subtext,
  onDark = false,
  align = "center",
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "max-w-2xl",
        align === "center" ? "mx-auto text-center" : "text-left",
        className,
      )}
    >
      {eyebrow && (
        <p
          className={cn(
            "text-eyebrow uppercase",
            onDark ? "text-orange-400" : "text-orange-700",
          )}
        >
          {eyebrow}
        </p>
      )}
      <h2
        id={id}
        className={cn(
          "heading-display mt-2 text-display-2 tracking-wide",
          onDark ? "text-white" : "text-navy-800",
        )}
      >
        {title}
      </h2>
      {subtext && (
        <p className={cn("mt-4", onDark ? "text-sand-200" : "text-ink-500")}>
          {subtext}
        </p>
      )}
    </div>
  );
}
