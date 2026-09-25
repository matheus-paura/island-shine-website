/** Visually-hidden "Skip to content" link — first focusable element on the page. */
export function SkipLink() {
  return (
    <a
      href="#main-content"
      className="sr-only z-50 rounded-control bg-orange-700 px-4 py-3 font-semibold text-white focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
    >
      Skip to content
    </a>
  );
}
