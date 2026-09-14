import { ASSETS } from "./constants";
import { LIFESTYLE } from "./product-imagery";

export const RANGE_SLUGS = ["technical", "baseline", "swya", "bound"] as const;
export type RangeSlug = (typeof RANGE_SLUGS)[number];

export type Range = {
  slug: RangeSlug;
  name: string;
  verb: string;
  role: string;
  summary: string;
  story: string[];
  live: boolean;
  href: string;
  shopHref: string;
  image: string;
  imageAlt: string;
  traits: string[];
};

export const RANGES: Range[] = [
  {
    slug: "technical",
    name: "Technical",
    verb: "Perform",
    role: "Technical credibility",
    summary: "I need it for my activity.",
    story: [
      "Activity-specific gear when the work asks for it — not a costume, not a statement. The piece you take because the day requires it.",
      "This range is coming into the architecture. Nothing here is for sale yet. When it lands, it will earn its place on the hill, not on a moodboard.",
    ],
    live: false,
    href: "/ranges/technical",
    shopHref: "/shop?range=technical",
    image: ASSETS.hydration,
    imageAlt: "Hydration on the trail",
    traits: ["Activity-specific", "Credible", "Built for the job"],
  },
  {
    slug: "baseline",
    name: "Baseline",
    verb: "Represent",
    role: "Brand equity",
    summary: "The core. Consistent OB identity — clean, logo-led, repeatable.",
    story: [
      "Baseline is the brand-building layer. Hoodies, tees, buffs, socks, bottles with names from the ground. Premium without polish for polish’s sake.",
      "What you can buy now lives here. Same voice, same cut logic, same George packing bench. Recognisable on the pass and at the tap.",
    ],
    live: true,
    href: "/ranges/baseline",
    shopHref: "/shop",
    image: LIFESTYLE.mensHoodieSummit,
    imageAlt: "Summit hoodie",
    traits: ["Consistent", "Recognisable", "Repeatable", "Premium", "Core"],
  },
  {
    slug: "swya",
    name: "SWYA",
    verb: "Express",
    role: "Newness & desire",
    summary: "Limited-edition lifestyle drops. Graphic. Local. Start where you are.",
    story: [
      "SWYA is not simply graphic tees. It is a controlled, limited-edition lifestyle proposition — collectable, placed, and meant to feel like a drop, not a restock.",
      "Tees from locally grown cotton, produced in South Africa. The slogan holds: start where you are. Drops will be announced; they are not on the shelf yet.",
    ],
    live: false,
    href: "/ranges/swya",
    shopHref: "/shop?range=swya",
    image: ASSETS.swya,
    imageAlt: "Start where you are",
    traits: ["Limited", "Collectable", "Graphic", "Local", "Newness"],
  },
  {
    slug: "bound",
    name: "Bound",
    verb: "Live",
    role: "Lifestyle & reach",
    summary: "More activities. More occasions. More reasons to wear OB.",
    story: [
      "Bound is the versatile outdoor lifestyle range — fishing, hiking, cycling, beach, the ordinary Tuesday. More days that count as Outeniqua days.",
      "This range is coming into the architecture. When it arrives, it will widen where the clothes go, not invent a different brand.",
    ],
    live: false,
    href: "/ranges/bound",
    shopHref: "/shop?range=bound",
    image: LIFESTYLE.heroCampfire,
    imageAlt: "Night around the fire",
    traits: ["Versatile", "Everyday", "More occasions"],
  },
];

export function rangeBySlug(slug: string) {
  return RANGES.find((range) => range.slug === slug);
}

export const SWYA_DROPS = [
  {
    title: "SWYA tee",
    line: "Locally grown cotton. Produced in South Africa. Graphic drop — date to follow.",
  },
  {
    title: "Limited cut",
    line: "A small run. Start where you are. Not a restock of Baseline.",
  },
];
