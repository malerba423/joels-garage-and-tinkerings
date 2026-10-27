// Every piece in the gallery lives here. To add one:
//   1. Drop the image(s) into public/art/
//   2. Add an entry below. A piece can have one image or many (different
//      angles, details, in-progress shots). The first one is the cover
//      shown in the gallery grid. width/height are each image's pixel
//      size, used so layouts don't crop or jump around while loading.

export type PieceImage = {
  src: string;
  width: number;
  height: number;
  caption?: string;
  /** Small copy for the grid and thumbnail strip. Filled in below; don't set it by hand. */
  thumb?: string;
};

// Selling. Leave `sale` off a piece and it's just in the gallery, not for sale.
//   available  — on the wall, can be claimed. `price` is shown as written ("$450").
//                `buyLink` is where "Claim" goes (e.g. a Stripe Payment Link);
//                without one, Claim opens an email to you.
//   hold       — someone's thinking it over. `holdUntil` is shown ("Thu").
//   sold       — red dot. `soldTo` is shown if set ("Maria, Portland").
//   commission — can build another like it; links to the work-order page.
export type SaleStatus = "available" | "hold" | "sold" | "commission";

export type Sale = {
  status: SaleStatus;
  price?: string;
  buyLink?: string;
  holdUntil?: string;
  soldTo?: string;
};

export type Piece = {
  slug: string;
  /** Part number on the tag and in the index. Permanent: never reuse or change one. */
  no: number;
  title: string;
  images: [PieceImage, ...PieceImage[]];
  year?: number;
  medium?: string;
  size?: string;
  tags: string[];
  notes?: string;
  /** What the parts tag lists. Defaults to `medium`. */
  parts?: string;
  sale?: Sale;
};

const catalog: Piece[] = [
  {
    slug: "rustic-megadesk",
    no: 1,
    title: "Rustic Mega Desk",
    images: [
      { src: "/art/standing-desk-1.jpg", width: 2400, height: 1800 },
      { src: "/art/standing-desk-2.jpg", width: 2400, height: 1800 },
    ],
    year: 2023,
    medium: "Steel, reclaimed wood",
    tags: ["desk", "table", "office", "standing", "bar-height", "garage"],
    notes:
      "4 inch channel steel frame with adjustable footsies and a reclaimed wood top. Shot under a single shop light.",
    sale: { status: "available", price: "$1,000.00" }, // example: change or remove
  },
  {
    slug: "wineopener-lamp",
    no: 2,
    title: "Wine Opener Lamp",
    images: [
      { src: "/art/wineopener-lamp-1.jpg", width: 1800, height: 2400 },
      { src: "/art/wineopener-lamp-2.jpg", width: 1800, height: 2400 },
      { src: "/art/wineopener-lamp-3.jpg", width: 1800, height: 2400 },
      { src: "/art/wineopener-lamp-4.jpg", width: 1800, height: 2400 },
    ],
    year: 2023,
    medium: "Steel, reclaimed wood",
    tags: ["lamp", "reclaimed", "wine-opener"],
    notes:
      "4 inch channel steel frame with adjustable footsies and a reclaimed wood top. Shot under a single shop light.",
    sale: { status: "available", price: "$100.00" }, // example: change or remove
  },
  {
    slug: "maple-steel-bench",
    no: 3,
    title: "Steel & Maple Bench",
    images: [
      { src: "/art/maple-bench-1.jpeg", width: 1800, height: 2400 },
      { src: "/art/maple-bench-2.jpeg", width: 2400, height: 1800 },
      { src: "/art/maple-bench-3.jpeg", width: 1800, height: 2400 },
    ],
    year: 2024,
    medium: "Steel, silver maple",
    tags: ["bench", "rustic", "maple"],
    notes:
      "Mild steel legs with live-edge silver maple benchtop and back. Shot under a single shop light.",
    sale: { status: "available", price: "$700.00" }, // example: change or remove
  },
  {
    slug: "retrofit-softclose-kitchen-pantry",
    no: 4,
    title: "Retrofit Soft-Close Kitchen Pantry",
    images: [
      { src: "/art/drawers-1.jpeg", width: 1800, height: 2400 },
      { src: "/art/drawers-2.jpeg", width: 1800, height: 2400 },
      { src: "/art/drawers-3.jpeg", width: 1800, height: 2400 },
      { src: "/art/drawers-4.jpeg", width: 1800, height: 2400 },
      { src: "/art/drawers-5.jpeg", width: 1800, height: 2400 },
      { src: "/art/drawers-6.jpeg", width: 1440, height: 1920 },
    ],
    year: 2026,
    medium: "Steel, silver maple",
    tags: ["Retrofit", "drawers", "kitchen", "pantry"],
    notes: "Built a custom set of kitchen cabinets for a soft-close pantry.",
  },
  {
    slug: "castle-joint-bedframe",
    no: 5,
    title: "Castle Joint Bedframe",
    images: [
      { src: "/art/bedframe-1.jpeg", width: 2400, height: 1800 },
      { src: "/art/bedframe-2.jpeg", width: 1800, height: 2400 },
      { src: "/art/bedframe-3.jpeg", width: 1800, height: 2400 },
      { src: "/art/bedframe-4.jpeg", width: 1800, height: 2400 },
      { src: "/art/bedframe-5.jpeg", width: 1800, height: 2400 },
    ],
    year: 2026,
    medium: "Basic dimensional lumber",
    tags: ["castle", "joint", "joinery", "bedframe"],
    notes:
      "Wanted to work on some more interesting joinery but didn't wanna botch the first go on expensive hardwood so I used basic doug fir.",
  },
  {
    slug: "entryway-tile-floor",
    no: 6,
    title: "Entryway Tile Floor",
    images: [
      { src: "/art/tile-floor-1.jpeg", width: 1800, height: 2400 },
      { src: "/art/tile-floor-2.jpeg", width: 1800, height: 2400 },
      { src: "/art/tile-floor-3.jpeg", width: 1800, height: 2400 },
      { src: "/art/tile-floor-4.jpeg", width: 1800, height: 2400 },
      { src: "/art/tile-floor-5.jpeg", width: 1800, height: 2400 },
      { src: "/art/tile-floor-6.jpeg", width: 1800, height: 2400 },
      { src: "/art/tile-floor-7.jpeg", width: 1800, height: 2400 },
      { src: "/art/tile-floor-8.jpeg", width: 2400, height: 1800 },
      { src: "/art/tile-floor-9.jpeg", width: 1800, height: 2400 },
      { src: "/art/tile-floor-10.jpeg", width: 2400, height: 1800 },
    ],
    year: 2026,
    medium: "Slate tile, grout, mortar",
    tags: [
      "tile",
      "floor",
      "butthead",
      "cat",
      "entryway",
      "franco",
      "baby",
      "frank",
    ],
    notes:
      "My butthead cat bit a bunch of holes in the washing machine greywater out hose so I got to do a fun mid-winter emergency flooring project. Thanks baby Franco.",
  },
  {
    slug: "live-edge-maple-shelf",
    no: 7,
    title: "Live Edge Maple Shelf",
    images: [
      { src: "/art/maple-shelf-1.jpg", width: 2400, height: 1800 },
      { src: "/art/maple-shelf-2.jpg", width: 2400, height: 1800 },
      { src: "/art/maple-shelf-3.jpg", width: 2400, height: 1800 },
      { src: "/art/maple-shelf-4.jpg", width: 2400, height: 1800 },
      { src: "/art/maple-shelf-5.jpg", width: 2400, height: 1800 },
      { src: "/art/maple-shelf-6.jpg", width: 1800, height: 2400 },
      { src: "/art/maple-shelf-7.jpg", width: 2400, height: 1800 },
    ],
    year: 2023,
    medium: "Big Leaf Maple, Steel",
    tags: ["maple", "big leaf", "steel", "shelf", "live edge"],
    notes:
      "This one started as a joke to make fun of my boss's whiskey shelf but deep down I truly am the very most passionate about maple, maple syrup, and all maple products.",
  },
  {
    slug: "dia-de-los-muertos-altar",
    no: 8,
    title: "Dia de los Muertos Altar",
    images: [
      { src: "/art/altar-1.jpeg", width: 2400, height: 1800 },
      { src: "/art/altar-2.jpeg", width: 2400, height: 1800 },
      { src: "/art/altar-3.jpeg", width: 2400, height: 1800 },
      { src: "/art/altar-4.jpeg", width: 2400, height: 1800 },
    ],
    year: 2025,
    medium: "Basic dimensional lumber",
    tags: ["plum", "altar", "dia de los muertos"],
    notes:
      "I'd been wanting to make a Dia de los Muertos altar for a while and finally got around to it. I used some scrap plum wood for this one.",
  },
  {
    slug: "driftwood-spoon-knife",
    no: 9,
    title: "Driftwood Spoon & Knife",
    images: [
      { src: "/art/spoon-knife-1.jpg", width: 2400, height: 1800 },
      { src: "/art/spoon-knife-2.jpg", width: 1800, height: 2400 },
      { src: "/art/spoon-knife-3.jpg", width: 2400, height: 1800 },
      { src: "/art/spoon-knife-4.jpg", width: 2400, height: 1800 },
      { src: "/art/spoon-knife-5.jpg", width: 1800, height: 2400 },
      { src: "/art/spoon-knife-6.jpg", width: 1800, height: 2400 },
    ],
    year: 2019,
    medium: "Sitka spruce driftwood",
    tags: ["driftwood", "spoon", "knife"],
    notes:
      "I found a piece of sitka spruce while hiking in the north cascades sometime in late 2018. At the time I was living in Madison, WI and working at a coffee shop which was owned by a fantastic woodworker and artist. He let me use some of the tools in his shop and I managed to bring my spoon and knife vision to life from the piece of driftwood. I gave the spoon to my mom and the knife to my brother for Christmas that year.",
  },
  /*
  {
    slug: "rust-bucket-carburetor",
    no: 0,
    title: "Rust Bucket Carburetor",
    images: [
      { src: "/art/rust-bucket-carburetor.svg", width: 1600, height: 1200 },
    ],
    year: 2026,
    medium: "Photograph",
    tags: ["photo", "garage"],
    notes: "Pulled off a '72 lawn tractor. Shot under a single shop light.",
  },
  {
    slug: "night-shift-sketch",
    no: 0,
    title: "Night Shift Sketch",
    images: [{ src: "/art/night-shift-sketch.svg", width: 1000, height: 1500 }],
    year: 2025,
    medium: "Graphite on paper",
    size: "9×12 in",
    tags: ["drawing"],
  },
  */
];

// Part numbers and slugs must be unique. This runs whenever the data loads, and the build
// imports this file (see vite.config.ts), so a duplicate fails `npm run build` too.
for (const key of ["no", "slug"] as const) {
  const seen = new Set<unknown>();
  for (const p of catalog) {
    if (seen.has(p[key]))
      throw new Error(`Two pieces share ${key} ${JSON.stringify(p[key])}`);
    seen.add(p[key]);
  }
}

// Image paths above are written from public/ ("/art/..."). The site is served under a path
// prefix, so add it here. (The build's duplicate check runs outside Vite, with no env.)
const base: string = import.meta.env?.BASE_URL ?? "/";
const withBase = (p: Piece): Piece => ({
  ...p,
  images: p.images.map((img) => {
    const path = img.src.replace(/^\//, "");
    return {
      ...img,
      src: base + path,
      thumb: base + path.replace(/^art\//, "art/thumbs/"),
    };
  }) as Piece["images"],
});

// Listed newest first. Within a year, the higher part number counts as newer.
export const pieces = catalog
  .map(withBase)
  .sort((a, b) => (b.year ?? -Infinity) - (a.year ?? -Infinity) || b.no - a.no);

export const allTags = [...new Set(pieces.flatMap((p) => p.tags))].sort();

export function filterByTag(tag: string | null) {
  return tag ? pieces.filter((p) => p.tags.includes(tag)) : pieces;
}

export const cover = (p: Piece) => p.images[0];

export const partNo = (p: Piece) => String(p.no).padStart(3, "0");

export const statusLabel: Record<SaleStatus, string> = {
  available: "Available",
  hold: "On hold",
  sold: "Sold",
  commission: "Can build another",
};

// Availability filter on the catalog. "For sale" is anything you can buy or
// order (available, on hold, or can build another); "Available now" is only
// what's on the wall and claimable today.
export type Availability =
  "all" | "for-sale" | "available" | "sold" | "not-for-sale";

export const availabilityFilters: {
  id: Availability;
  label: string;
  test: (p: Piece) => boolean;
}[] = [
  { id: "all", label: "Everything", test: () => true },
  {
    id: "for-sale",
    label: "For sale",
    test: (p) =>
      p.sale?.status === "available" ||
      p.sale?.status === "hold" ||
      p.sale?.status === "commission",
  },
  {
    id: "available",
    label: "Available now",
    test: (p) => p.sale?.status === "available",
  },
  { id: "sold", label: "Sold", test: (p) => p.sale?.status === "sold" },
  { id: "not-for-sale", label: "Not for sale", test: (p) => !p.sale },
];
