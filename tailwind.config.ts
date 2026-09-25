import type { Config } from "tailwindcss";

/**
 * Design tokens — Section 5 of the build spec.
 * Navy = primary surface. Orange 500 = the single action color (use sparingly).
 * Sand = light section backgrounds. Ink = text on light surfaces.
 * Never use raw hex values in components; always reference these tokens.
 */
const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./content/**/*.{ts,tsx}",
    "./config/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          900: "#071E38",
          800: "#0A2540",
          700: "#0B2E52",
          600: "#12446F",
          500: "#1B5A8C",
        },
        orange: {
          800: "#9A3412",
          700: "#C2410C",
          600: "#CF5A15",
          500: "#EA6A1E",
          400: "#F5852F",
        },
        sand: {
          50: "#F7F8FA",
          100: "#EEF1F4",
          200: "#DCE2E8",
        },
        ink: {
          900: "#0F1B2A",
          700: "#243546",
          500: "#5B6B7B",
        },
        success: "#1E9E75",
      },
      fontFamily: {
        display: ["var(--font-barlow-condensed)", "sans-serif"],
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      fontSize: {
        // Fluid type scale (Section 5.2). Mobile → desktop via clamp().
        "display-1": [
          "clamp(2.5rem, 1.6rem + 4vw, 4rem)",
          { lineHeight: "1", letterSpacing: "0.02em", fontWeight: "800" },
        ],
        "display-2": [
          "clamp(2rem, 1.4rem + 2.7vw, 3rem)",
          { lineHeight: "1.05", letterSpacing: "0.02em", fontWeight: "700" },
        ],
        "display-3": [
          "clamp(1.25rem, 1.1rem + 0.9vw, 1.75rem)",
          { lineHeight: "1.2", fontWeight: "600" },
        ],
        body: ["clamp(1rem, 0.96rem + 0.25vw, 1.125rem)", { lineHeight: "1.7" }],
        eyebrow: [
          "0.8125rem",
          { lineHeight: "1.4", letterSpacing: "0.12em", fontWeight: "500" },
        ],
      },
      borderRadius: {
        card: "12px",
        control: "10px",
      },
      boxShadow: {
        card: "0 1px 2px rgba(7, 30, 56, 0.06), 0 4px 16px rgba(7, 30, 56, 0.08)",
        "card-hover":
          "0 2px 4px rgba(7, 30, 56, 0.08), 0 10px 28px rgba(7, 30, 56, 0.14)",
      },
      maxWidth: {
        container: "72rem",
      },
      keyframes: {
        "fade-rise": {
          from: { opacity: "0", transform: "translateY(12px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "fade-rise": "fade-rise 0.6s ease-out both",
      },
    },
  },
  plugins: [],
};

export default config;
