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
};

export type Piece = {
  slug: string;
  title: string;
  images: [PieceImage, ...PieceImage[]];
  year?: number;
  medium?: string;
  size?: string;
  tags: string[];
  notes?: string;
};

export const pieces: Piece[] = [
  {
    slug: "rustic-megadesk",
    title: "Rustic Mega Desk",
    images: [
      { src: "/art/standing-desk-1.jpg", width: 4032, height: 3024 },
      { src: "/art/standing-desk-2.jpg", width: 4032, height: 3024 },
    ],
    year: 2026,
    medium: "Steel, reclaimed wood",
    tags: ["desk", "table", "office", "standing", "bar-height", "garage"],
    notes:
      "4 inch channel steel frame with adjustable footsies and a reclaimed wood top. Shot under a single shop light.",
  },
  {
    slug: "rust-bucket-carburetor",
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
    title: "Night Shift Sketch",
    images: [{ src: "/art/night-shift-sketch.svg", width: 1000, height: 1500 }],
    year: 2025,
    medium: "Graphite on paper",
    size: "9×12 in",
    tags: ["drawing"],
  },
  {
    slug: "copper-coil-lamp",
    title: "Copper Coil Lamp",
    images: [
      { src: "/art/copper-coil-lamp.svg", width: 1200, height: 1200 },
      {
        src: "/art/copper-coil-lamp-2.svg",
        width: 1000,
        height: 1400,
        caption: "Side view",
      },
      {
        src: "/art/copper-coil-lamp-3.svg",
        width: 1400,
        height: 1000,
        caption: "Lit up at night",
      },
    ],
    year: 2026,
    medium: "Copper tubing, salvaged bulb socket",
    size: "18 in tall",
    tags: ["build", "sculpture"],
    notes: "Bent by hand around a coffee can.",
  },
  {
    slug: "garage-door-mural",
    title: "Garage Door Mural",
    images: [{ src: "/art/garage-door-mural.svg", width: 2000, height: 900 }],
    year: 2024,
    medium: "Exterior latex on steel",
    size: "16×7 ft",
    tags: ["painting", "garage"],
  },
  {
    slug: "tin-robot-no-3",
    title: "Tin Robot No. 3",
    images: [
      { src: "/art/tin-robot-no-3.svg", width: 1100, height: 1450 },
      {
        src: "/art/tin-robot-no-3-2.svg",
        width: 1450,
        height: 1100,
        caption: "Back panel and wiring",
      },
    ],
    year: 2025,
    medium: "Tin cans, rivets",
    tags: ["build", "sculpture"],
  },
  {
    slug: "ink-study-hands",
    title: "Ink Study: Hands",
    images: [{ src: "/art/ink-study-hands.svg", width: 1400, height: 1000 }],
    year: 2026,
    medium: "India ink",
    size: "11×8.5 in",
    tags: ["drawing"],
  },
  {
    slug: "workbench-still-life",
    title: "Workbench Still Life",
    images: [
      { src: "/art/workbench-still-life.svg", width: 1500, height: 1100 },
    ],
    year: 2025,
    medium: "Oil on panel",
    size: "12×16 in",
    tags: ["painting", "garage"],
  },
  {
    slug: "blueprint-bicycle",
    title: "Blueprint Bicycle",
    images: [{ src: "/art/blueprint-bicycle.svg", width: 1600, height: 1000 }],
    year: 2026,
    medium: "Cyanotype",
    tags: ["print"],
  },
];

export const allTags = [...new Set(pieces.flatMap((p) => p.tags))].sort();

export function filterByTag(tag: string | null) {
  return tag ? pieces.filter((p) => p.tags.includes(tag)) : pieces;
}

export const cover = (p: Piece) => p.images[0];
