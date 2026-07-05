"use client";

import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
import { track, type EventName } from "@/lib/analytics";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost";
type Size = "sm" | "md" | "lg";

type CommonProps = {
  variant?: Variant;
  size?: Size;
  /** Adapts secondary/ghost colors for navy sections. */
  onDark?: boolean;
  /** Tracking event fired on click (Section 9.3). */
  event?: EventName;
  eventParams?: Record<string, unknown>;
  className?: string;
  children: ReactNode;
};

type ButtonAsLink = CommonProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };
type ButtonAsButton = CommonProps &
  ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };

export type ButtonProps = ButtonAsLink | ButtonAsButton;

const base =
  "inline-flex min-h-11 cursor-pointer items-center justify-center gap-2 rounded-control font-semibold transition-all duration-200 active:translate-y-0";

const variants: Record<Variant, { light: string; dark: string }> = {
  primary: {
    light:
      "bg-orange-500 text-white shadow-card hover:-translate-y-0.5 hover:bg-orange-600 hover:shadow-card-hover",
    dark: "bg-orange-500 text-white shadow-card hover:-translate-y-0.5 hover:bg-orange-600 hover:shadow-card-hover",
  },
  secondary: {
    light:
      "border-2 border-navy-800 bg-transparent text-navy-800 hover:-translate-y-0.5 hover:bg-navy-800 hover:text-white",
    dark: "border-2 border-white/80 bg-transparent text-white hover:-translate-y-0.5 hover:border-white hover:bg-white hover:text-navy-800",
  },
  ghost: {
    light: "bg-transparent text-navy-600 hover:bg-sand-100 hover:text-navy-800",
    dark: "bg-transparent text-white/90 hover:bg-white/10 hover:text-white",
  },
};

const sizes: Record<Size, string> = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-base",
  lg: "px-8 py-4 text-lg",
};

/**
 * The one button. Links render a real <a> (tel:/wa.me/anchors all work
 * without JS); tracking events fire on click when `event` is set.
 */
export function Button(props: ButtonProps) {
  const {
    variant = "primary",
    size = "md",
    onDark = false,
    event,
    eventParams,
    className,
    children,
    ...rest
  } = props;

  const classes = cn(
    base,
    variants[variant][onDark ? "dark" : "light"],
    sizes[size],
    className,
  );

  const fireEvent = () => {
    if (event) track(event, eventParams);
  };

  if ("href" in rest && rest.href !== undefined) {
    const { onClick, ...anchorRest } = rest as ButtonAsLink;
    return (
      <a
        {...anchorRest}
        className={classes}
        onClick={(e) => {
          fireEvent();
          onClick?.(e);
        }}
      >
        {children}
      </a>
    );
  }

  const { onClick, type, ...buttonRest } = rest as ButtonAsButton;
  return (
    <button
      {...buttonRest}
      type={type ?? "button"}
      className={classes}
      onClick={(e) => {
        fireEvent();
        onClick?.(e);
      }}
    >
      {children}
    </button>
  );
}
