export type Review = {
  quote: string;
  name: string; // first name only
  neighbourhood: string;
  rating: number; // 1–5
};

// TODO: replace ALL placeholder reviews below with the owner's real 5.0 Google
// reviews (copy them word-for-word and link to the Google profile). Do not ship
// invented reviews — swap these before launch.
export const reviews: Review[] = [
  {
    quote:
      "Laughlan cleaned every window in the house, inside and out, and they've honestly " +
      "never looked better. He showed up on time and the quote was exactly what we paid.",
    name: "Placeholder — Sarah",
    neighbourhood: "Oak Bay",
    rating: 5,
  },
  {
    quote:
      "Our driveway looked ten years newer after the pressure wash. Fast to reply, " +
      "friendly, and tidy — he even rinsed the walkway on his way out.",
    name: "Placeholder — Mike",
    neighbourhood: "Saanich",
    rating: 5,
  },
  {
    quote:
      "The moss on our north-facing siding was out of control. The soft wash took it all " +
      "off without damaging anything. Booking again in the spring.",
    name: "Placeholder — Jennifer",
    neighbourhood: "Langford",
    rating: 5,
  },
  {
    quote:
      "Great communication from the first message to the final walkthrough. It's nice " +
      "dealing with the owner directly instead of a call center.",
    name: "Placeholder — David",
    neighbourhood: "Sidney",
    rating: 5,
  },
];
