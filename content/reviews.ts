export type Review = {
  quote: string;
  name: string;
  /** Neighbourhood, when known — omitted for reviews pulled straight from Google. */
  neighbourhood?: string;
  rating: number; // 1–5
};

// Real 5.0-star Google reviews, copied word-for-word.
// TODO: paste the Google Business Profile review link into
// config/site.ts → trust.googleReviewsUrl (also switches on the
// aggregateRating structured data) and keep this list in sync as new
// reviews come in.
export const reviews: Review[] = [
  {
    quote:
      "Excellent service! The team was professional, punctual, and did an amazing job. " +
      "They were friendly, efficient, and paid attention to every detail. I highly " +
      "recommend them and will definitely use their services again!",
    name: "Caron Clark",
    rating: 5,
  },
  {
    quote:
      "Laughlan and his team did a great job with my window washing. Showed up when he " +
      "said he was going to, was great to communicate with and left no mess behind. I'd " +
      "highly recommend him for your exterior needs.",
    name: "Tricia Keller",
    rating: 5,
  },
  {
    quote:
      "Exceeded our expectations. We were going to wait for our friend to come over and " +
      "do our windows but decided to let this young business have a go. They were very " +
      "professional, honest, and best of all they did a fantastic job! Very happy with " +
      "these guys and wish them the best of luck on their business!",
    name: "Shawn Madeiros",
    rating: 5,
  },
  {
    quote:
      "We have been working with Island Shine with some of our larger window cleanings " +
      "they are great and very thorough highly recommend this company we will be using " +
      "them moving forward.",
    name: "Riley Cook",
    rating: 5,
  },
];
