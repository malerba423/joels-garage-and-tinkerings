// Shop settings shown across the site. Fill in the bracketed bits.
export const shop = {
  /** Where "Claim", "Send a question" and work orders email to. */
  email: "you@example.com",
  delivery: [
    { title: "Garage pickup", detail: "Free. See the bench while you're here." },
    { title: "Hand delivered", detail: "Within [DISTANCE]. [FEE]" },
    { title: "Crated & shipped", detail: "Tracked. [SHIPPING]" },
  ],
};

export const mailto = (subject: string, body = "") =>
  `mailto:${shop.email}?subject=${encodeURIComponent(subject)}${body ? `&body=${encodeURIComponent(body)}` : ""}`;
