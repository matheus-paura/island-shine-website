export type Faq = {
  question: string;
  answer: string;
};

// TODO: owner to review and adjust answers (especially pricing guidance and
// coverage). These power both the on-page FAQ accordion and the FAQPage
// JSON-LD, so keep them in sync — edit here only.
export const faqs: Faq[] = [
  {
    question: "How much does window cleaning or pressure washing cost?",
    answer:
      "Every property is different, so we quote each job individually — for free. " +
      "Send a few details through the quote form or call us, and we'll get you a " +
      "clear, no-obligation price within 24 hours. No hidden fees, and the price we " +
      "quote is the price you pay.",
  },
  {
    question: "How do I get a quote?",
    answer:
      "Three easy ways: call us, message us on WhatsApp, or fill out the short quote " +
      "form on this page. Tell us your neighbourhood and what you'd like cleaned, and " +
      "we'll reply within 24 hours — usually much sooner.",
  },
  {
    question: "Are you licensed and insured?",
    answer:
      "Yes. Island Shine Property Services is fully licensed and insured, so your home " +
      "and property are protected while we work. We're happy to show proof of insurance " +
      "on request.",
  },
  {
    question: "How often should I have my windows and exterior cleaned in Victoria?",
    answer:
      "Victoria's coastal climate is tough on properties: salt spray films windows, and " +
      "the mild, wet winters grow moss and algae fast. Most homeowners do windows two to " +
      "four times a year and a full exterior clean (driveway, siding, gutters) once a " +
      "year, usually in spring or fall.",
  },
  {
    question: "What's the difference between pressure washing and soft washing?",
    answer:
      "Pressure washing uses controlled high pressure for hard surfaces like driveways, " +
      "patios, and walkways. Soft washing uses low pressure and gentle cleaning solutions " +
      "for delicate surfaces like siding, stucco, and roofs — it removes moss and algae " +
      "without damaging the surface. We'll recommend the right method for each area of " +
      "your property.",
  },
  {
    question: "Which areas do you serve?",
    answer:
      "We serve all of Greater Victoria, including Victoria, Saanich, Oak Bay, Esquimalt, " +
      "View Royal, Langford, Colwood, Sooke, Sidney, and the Saanich Peninsula. Not sure " +
      "if we cover your area? Call us — we probably do.",
  },
  {
    question: "Do I need to be home during the cleaning?",
    answer:
      "For exterior-only work, no — as long as we can access the areas being cleaned, " +
      "you can go about your day. For interior window cleaning we'll arrange a time that " +
      "works for you. Either way, you'll deal directly with the owner from quote to " +
      "finished job.",
  },
];
