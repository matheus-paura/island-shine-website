"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

/**
 * Renders children only once the placeholder is near the viewport. Keeps
 * far-below-the-fold images out of the initial page load so they never
 * compete with the hero for bandwidth. The wrapper reserves height so the
 * page does not jump when content mounts.
 */
export function LazyMount({
  children,
  minHeight,
  rootMargin = "600px",
}: {
  children: ReactNode;
  minHeight: number;
  rootMargin?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || visible) return;
    if (typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [visible, rootMargin]);

  return (
    <div ref={ref} style={visible ? undefined : { minHeight }}>
      {visible ? children : null}
    </div>
  );
}
