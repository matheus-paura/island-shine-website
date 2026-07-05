export type ServiceArea = {
  slug: string;
  name: string;
  blurb: string; // unique per-area copy — no thin duplicate content
};

// TODO: owner to confirm real coverage area. Each blurb is intentionally
// unique and mentions something locally specific to avoid thin content.
export const serviceAreas: ServiceArea[] = [
  {
    slug: "victoria",
    name: "Victoria",
    blurb:
      "From James Bay heritage homes to downtown storefronts, Victoria properties take " +
      "the brunt of the harbour's salt air. We keep windows clear of ocean film and give " +
      "walkways and siding a clean that holds up to the city's busiest sidewalks.",
  },
  {
    slug: "saanich",
    name: "Saanich",
    blurb:
      "Saanich's leafy streets around Swan Lake, Gordon Head, and Royal Oak mean shade — " +
      "and shade means moss. Our soft washing clears green growth from siding and roofs, " +
      "and we pressure wash driveways stained by years of fir and maple debris.",
  },
  {
    slug: "oak-bay",
    name: "Oak Bay",
    blurb:
      "Oak Bay's character homes deserve careful hands. We clean leaded and heritage " +
      "windows without streaks, and use low-pressure methods on older stucco and brick " +
      "so the Tweed Curtain's classic exteriors stay classic — just cleaner.",
  },
  {
    slug: "esquimalt",
    name: "Esquimalt",
    blurb:
      "Sitting right on the water, Esquimalt homes collect salt spray faster than almost " +
      "anywhere in Greater Victoria. Regular window cleaning keeps the harbour views " +
      "sharp, and our exterior washes strip the coastal grime that builds up each winter.",
  },
  {
    slug: "view-royal",
    name: "View Royal",
    blurb:
      "Between the Gorge and Thetis Cove, View Royal's mix of waterfront and wooded lots " +
      "sees both salt film and heavy moss. We handle both — streak-free windows facing " +
      "the water and soft-washed roofs under the tree canopy.",
  },
  {
    slug: "langford",
    name: "Langford",
    blurb:
      "Langford is growing fast, and new builds on Bear Mountain and around Langford Lake " +
      "stay looking new with regular exterior care. We clean construction dust off " +
      "windows, brighten concrete driveways, and keep modern siding spotless.",
  },
  {
    slug: "colwood",
    name: "Colwood",
    blurb:
      "From Royal Bay's new oceanside streets to established homes near Esquimalt Lagoon, " +
      "Colwood properties face wind-driven salt and sand. We wash it off — windows, " +
      "siding, driveways — so the ocean stays in view, not on the glass.",
  },
  {
    slug: "sooke",
    name: "Sooke",
    blurb:
      "Out on the wild west coast, Sooke homes weather more rain and wind than anywhere " +
      "else we serve. Annual soft washing keeps moss and algae from taking hold, and " +
      "we're happy to make the drive — no surcharge for T'Sou-ke territory addresses.",
  },
  {
    slug: "sidney",
    name: "Sidney",
    blurb:
      "Sidney-by-the-Sea earns its name — and its windows earn a salt film to match. We " +
      "keep seaside condos, bungalows, and Beacon Avenue storefronts crystal clear, with " +
      "gentle washes for the town's many stucco exteriors.",
  },
  {
    slug: "central-saanich",
    name: "Central Saanich",
    blurb:
      "Brentwood Bay and Saanichton mix farmland dust with sea air — a combination that " +
      "coats windows and siding in no time. We restore the shine on rural properties, " +
      "hobby farms, and village homes across Central Saanich.",
  },
  {
    slug: "north-saanich",
    name: "North Saanich",
    blurb:
      "Larger lots, long driveways, and waterfront exposure define North Saanich around " +
      "Deep Cove and Ardmore. We handle big jobs comfortably — full-property window " +
      "cleaning, long concrete runs, and soft washing for extensive siding.",
  },
];

export function getAreaBySlug(slug: string): ServiceArea | undefined {
  return serviceAreas.find((area) => area.slug === slug);
}
