import type { WooProduct } from "./types";

export type PlaceholderReview = {
  name: string;
  place: string;
  stars: 4 | 5;
  body: string;
};

const BY_KIND: Record<string, PlaceholderReview[]> = {
  hoodie: [
    {
      name: "Lindi",
      place: "George",
      stars: 5,
      body: "Worn it on the first hill behind the house. Soft enough. Warm enough. No fuss.",
    },
    {
      name: "Thabo",
      place: "Wilderness",
      stars: 5,
      body: "Holds up after a wet Outeniqua day. I hang it, it dries, I put it on again.",
    },
    {
      name: "Sam",
      place: "Cape Town",
      stars: 4,
      body: "Looks like the ridge. Wears like workwear. That’s the point.",
    },
    {
      name: "Riana",
      place: "Knysna",
      stars: 5,
      body: "Packed from George, worn on the pass. The name on the chest is the only speech it makes.",
    },
  ],
  tee: [
    {
      name: "Naledi",
      place: "Knysna",
      stars: 5,
      body: "Sits right. Feels like a shirt, not a poster. Washed it. Still holds.",
    },
    {
      name: "Ruan",
      place: "George",
      stars: 4,
      body: "Start where you are, they say. This one started in my pack and stayed there.",
    },
    {
      name: "Jess",
      place: "Mossel Bay",
      stars: 5,
      body: "Ordinary Tuesday cloth. That’s a compliment.",
    },
  ],
  buff: [
    {
      name: "Aisha",
      place: "Mossel Bay",
      stars: 5,
      body: "One piece, three jobs. Neck, forehead, pocket.",
    },
    {
      name: "Pieter",
      place: "Oudtshoorn",
      stars: 4,
      body: "No theatre. It does the work and gets out of the way.",
    },
    {
      name: "Chris",
      place: "George",
      stars: 5,
      body: "Salt, sweat, rinse. Still itself.",
    },
  ],
  socks: [
    {
      name: "Maya",
      place: "Stellenbosch",
      stars: 5,
      body: "Did the pass in them. Dry feet. That’s the whole review.",
    },
    {
      name: "Andile",
      place: "George",
      stars: 4,
      body: "Work socks with a name from the ground. Fair.",
    },
    {
      name: "Leah",
      place: "Plettenberg Bay",
      stars: 5,
      body: "No blister story to tell, which is the point.",
    },
  ],
  bottle: [
    {
      name: "Kobus",
      place: "George",
      stars: 5,
      body: "Fills at the tap. Goes on the pack. Comes home.",
    },
    {
      name: "Sinead",
      place: "Cape Town",
      stars: 4,
      body: "A bottle that looks like it belongs on a ridge, not a desk. Used on both.",
    },
    {
      name: "Farah",
      place: "Knysna",
      stars: 5,
      body: "Simple. Doesn’t leak. I take it.",
    },
  ],
};

const FALLBACK: PlaceholderReview[] = [
  {
    name: "Gareth",
    place: "George",
    stars: 5,
    body: "Dirtbag gear. Meant to get dirty. That’s why I bought it.",
  },
  {
    name: "Nomsa",
    place: "Wilderness",
    stars: 4,
    body: "Packed on Saagmeul Street. Worn where the fynbos starts.",
  },
  {
    name: "Ian",
    place: "Cape Town",
    stars: 5,
    body: "No hype on the tag. The hill does the talking.",
  },
];

export const SAMPLE_QUOTES = FALLBACK;

function kindFor(product: WooProduct) {
  const cats = product.categories.map((c) => c.slug.toLowerCase()).join(" ");
  const hay = `${product.name} ${product.slug} ${cats}`.toLowerCase();
  // Check bottles first: "Kanteen" contains the letters "tee".
  if (
    cats.includes("hydrat") ||
    hay.includes("bottle") ||
    hay.includes("kanteen")
  ) {
    return "bottle";
  }
  if (hay.includes("hoodie")) return "hoodie";
  if (hay.includes("buff")) return "buff";
  if (hay.includes("sock")) return "socks";
  if (
    hay.includes("t-shirt") ||
    hay.includes("tshirt") ||
    /\btees?\b/.test(hay) ||
    hay.includes("shirt")
  ) {
    return "tee";
  }
  return "default";
}

function hash(value: string) {
  let n = 0;
  for (const ch of value) n = (n * 31 + ch.charCodeAt(0)) >>> 0;
  return n;
}

/** Stable 3-review sample per product. Not verified purchases. */
export function placeholderReviews(product: WooProduct): PlaceholderReview[] {
  const pool = BY_KIND[kindFor(product)] ?? FALLBACK;
  const start = hash(product.slug) % pool.length;
  return [0, 1, 2].map((i) => pool[(start + i) % pool.length]);
}
