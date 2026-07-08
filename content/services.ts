export type Service = {
  slug: string;
  name: string;
  short: string; // one-line benefit
  description: string; // 2–3 sentences
  icon: "Sparkles" | "Droplets" | "ShowerHead"; // lucide icon name
  bullets: string[]; // 3 short proof points
};

export const services: Service[] = [
  {
    slug: "window-cleaning",
    name: "Window Cleaning",
    short: "Crystal-clear views, inside and out.",
    description:
      "Streak-free interior and exterior window cleaning for homes and businesses. " +
      "We handle the ladders, the hard-to-reach panes, and the salt-spray film so you " +
      "just enjoy the view.",
    icon: "Sparkles",
    bullets: ["Interior & exterior", "Streak-free finish", "Residential & commercial"],
  },
  {
    slug: "pressure-washing",
    name: "Pressure Washing",
    short: "Blast away dirt, grime, and buildup.",
    description:
      "Restore driveways, patios, walkways, and hard surfaces with controlled " +
      "high-pressure cleaning that lifts years of dirt and instantly boosts curb appeal.",
    icon: "Droplets",
    bullets: ["Driveways & patios", "Instant curb appeal", "Safe, controlled pressure"],
  },
  {
    slug: "soft-washing",
    name: "Soft Washing",
    short: "Gentle deep-clean for delicate surfaces.",
    description:
      "Low-pressure soft washing safely removes moss, algae, and grime from siding, " +
      "stucco, and roofs, cleaning deeply without damaging the surface.",
    icon: "ShowerHead",
    bullets: ["Siding, stucco & roofs", "No surface damage", "Removes moss & algae"],
  },
];
