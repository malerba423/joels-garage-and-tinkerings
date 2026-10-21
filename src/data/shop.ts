// Shop settings shown across the site. Fill in the bracketed bits.
export const shop = {
  /** Where "Claim", "Send a question" and work orders email to. */
  email: "malerba423@gmail.com",
  /** Shown next to the address in the visitor's To: field. */
  name: "Joel Malerba",
  delivery: [
    {
      title: "Garage pickup",
      detail: "Free. See the bench while you're here.",
    },
    { title: "Hand delivered", detail: "Within 30 miles. $50 delivery fee." },
    { title: "Crated & shipped", detail: "Tracked. Price varies." },
  ],
};

export const mailto = (subject: string, body = "") =>
  `mailto:${encodeURIComponent(`${shop.name} <${shop.email}>`)}?subject=${encodeURIComponent(subject)}${body ? `&body=${encodeURIComponent(body)}` : ""}`;
