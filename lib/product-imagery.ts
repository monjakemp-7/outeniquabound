import { existsSync } from "node:fs";
import { join } from "node:path";
import { ASSETS, LOOKBOOK_FRAMES } from "./constants";
import type { WooImage, WooProduct } from "./types";

/**
 * Drive stills (Zane Schmahl) → local public paths.
 *
 * 7403209  womens-hoodie-coastline.jpg
 * 7403068  womens-hoodie-graphic-socks.jpg
 * 7403451  mens-hoodie-summit.jpg
 * 7403547  mens-tee-dark.jpg
 * 7403302  gear-duffel.jpg          (campaign only — no live duffel SKU)
 * 7403049  womens-hoodie-ridge.jpg
 *
 * Optional extras from an earlier drop, used only if the files exist:
 * story-ridge.jpg, hero-campfire.jpg
 */
export const LIFESTYLE = {
  womensHoodieCoastline: "/images/lifestyle/womens-hoodie-coastline.jpg",
  womensHoodieGraphic: "/images/lifestyle/womens-hoodie-graphic-socks.jpg",
  womensHoodieRidge: "/images/lifestyle/womens-hoodie-ridge.jpg",
  mensHoodieSummit: "/images/lifestyle/mens-hoodie-summit.jpg",
  mensTeeDark: "/images/lifestyle/mens-tee-dark.jpg",
  gearDuffel: "/images/lifestyle/gear-duffel.jpg",
  storyRidge: "/images/lifestyle/story-ridge.jpg",
  heroCampfire: "/images/lifestyle/hero-campfire.jpg",
} as const;

export type ProductImage = {
  src: string;
  alt: string;
  kind: "lifestyle" | "studio";
};

function publicPath(src: string) {
  return join(process.cwd(), "public", src.replace(/^\//, ""));
}

/** Remote URLs always count; local public files must be on disk. */
export function assetOnDisk(src: string) {
  if (!src.startsWith("/")) return true;
  return existsSync(publicPath(src));
}

function present(src: string | undefined) {
  return src && assetOnDisk(src) ? src : undefined;
}

/**
 * Confirmed slug matches only. Do not add a SKU here unless the photo
 * is known to show that garment.
 */
const SLUG_LIFESTYLE: Record<string, string[]> = {
  "ob00005-sand": [LIFESTYLE.womensHoodieCoastline],
  "ob00003-blac": [LIFESTYLE.mensHoodieSummit],
  "ob00002-blk": [LIFESTYLE.mensHoodieSummit],
};

type CategoryKey = "womens-hoodies" | "womens-socks";

/**
 * Product-card merchandising when the slug is not confirmed.
 * Heritage navy is a men's hoodie but is NOT the black Summit/Traverse
 * garment — it stays on Woo studio. Men's tees and women's tees use
 * category tiles only (7403547 / 7403068 are not confirmed per-SKU).
 */
const CATEGORY_CARD_LIFESTYLE: Record<CategoryKey, string[]> = {
  "womens-hoodies": [
    LIFESTYLE.womensHoodieCoastline,
    LIFESTYLE.womensHoodieRidge,
  ],
  "womens-socks": [LIFESTYLE.womensHoodieGraphic],
};

/** Shop / homepage category tiles — merchandising only, not SKUs. */
export const CATEGORY_TILE: Record<string, string> = {
  men: LIFESTYLE.mensHoodieSummit,
  hoodies: LIFESTYLE.mensHoodieSummit,
  "t-shirts-clothing": LIFESTYLE.mensTeeDark,
  "hoodies-clothing-womens": LIFESTYLE.womensHoodieCoastline,
  "t-shirts": LIFESTYLE.womensHoodieGraphic,
  "socks-accessories-womens": LIFESTYLE.womensHoodieGraphic,
  womens: LIFESTYLE.womensHoodieRidge,
};

/** About / brand-story stills. Duffel is campaign only — not a live SKU. */
export const HOMEPAGE_STRIP = [
  LIFESTYLE.womensHoodieCoastline,
  LIFESTYLE.womensHoodieRidge,
  LIFESTYLE.mensHoodieSummit,
  LIFESTYLE.gearDuffel,
  LIFESTYLE.womensHoodieGraphic,
  LIFESTYLE.mensTeeDark,
  LIFESTYLE.heroCampfire,
  LIFESTYLE.storyRidge,
];

const BRAND_GALLERY_FALLBACK = [
  ASSETS.midLifestyle,
  ASSETS.heroStill,
  ASSETS.secondSummitHeader,
];

function categorySlugs(product: WooProduct) {
  return product.categories.map((c) => c.slug.toLowerCase());
}

function merchandisingCategory(product: WooProduct): CategoryKey | null {
  const slugs = categorySlugs(product);
  const name = product.name.toLowerCase();
  const isWomens =
    slugs.includes("womens") ||
    slugs.some((s) => s.includes("womens")) ||
    name.includes("ladies") ||
    name.includes("women");

  if (
    isWomens &&
    (slugs.includes("hoodies") ||
      slugs.includes("hoodies-clothing-womens") ||
      name.includes("hoodie"))
  ) {
    return "womens-hoodies";
  }
  if (
    isWomens &&
    (slugs.includes("socks") ||
      slugs.includes("socks-accessories-womens") ||
      name.includes("socks"))
  ) {
    return "womens-socks";
  }
  return null;
}

function asLifestyle(src: string, alt: string): ProductImage {
  return { src, alt, kind: "lifestyle" };
}

function studioImages(product: WooProduct): ProductImage[] {
  const altBase = product.name;
  return product.images.map((img: WooImage) => ({
    src: img.src,
    alt: img.alt || altBase,
    kind: "studio" as const,
  }));
}

function unique(images: ProductImage[]) {
  const seen = new Set<string>();
  return images.filter((img) => {
    if (seen.has(img.src)) return false;
    seen.add(img.src);
    return true;
  });
}

function existingLifestyle(srcs: string[], alt: string): ProductImage[] {
  return srcs.filter(assetOnDisk).map((src) => asLifestyle(src, alt));
}

/** Shop cards + featured: slug match, else category merchandising, then Woo studio. */
export function cardImages(product: WooProduct): ProductImage[] {
  const alt = product.name;
  const fromSlug = existingLifestyle(SLUG_LIFESTYLE[product.slug] ?? [], alt);
  const cat = merchandisingCategory(product);
  const fromCat =
    fromSlug.length === 0 && cat
      ? existingLifestyle(CATEGORY_CARD_LIFESTYLE[cat] ?? [], alt)
      : [];
  return unique([...fromSlug, ...fromCat, ...studioImages(product)]);
}

/**
 * PDP gallery: confirmed slug lifestyle first, then Woo studio.
 * Category-level photos stay off the PDP so we do not imply the wrong SKU.
 */
export function galleryImages(product: WooProduct): ProductImage[] {
  const alt = product.name;
  const fromSlug = existingLifestyle(SLUG_LIFESTYLE[product.slug] ?? [], alt);
  return unique([...fromSlug, ...studioImages(product)]);
}

export function cardPrimary(product: WooProduct): ProductImage | undefined {
  return cardImages(product)[0];
}

export function tileForShopFilter(slug: string) {
  return present(CATEGORY_TILE[slug]);
}

export function categoryTileSrc(image: string, fallback?: string) {
  return present(image) ?? fallback ?? image;
}

export function homepageStrip(): string[] {
  const local = HOMEPAGE_STRIP.filter(assetOnDisk);
  const seen = new Set<string>();
  const out: string[] = [];
  for (const src of [...local, ...BRAND_GALLERY_FALLBACK]) {
    if (seen.has(src)) continue;
    seen.add(src);
    out.push(src);
    if (out.length >= 8) break;
  }
  return out;
}

export function storyImages() {
  return homepageStrip().slice(0, 4);
}

export function lookbookFrames() {
  return LOOKBOOK_FRAMES.map((frame) => ({
    label: frame.label,
    href: frame.href,
    src: present(frame.image) ?? frame.fallback,
  })).slice(0, 6);
}

export function originStill() {
  return (
    present(LIFESTYLE.womensHoodieRidge) ??
    present(LIFESTYLE.womensHoodieCoastline) ??
    ASSETS.midLifestyle
  );
}

export function heroPoster() {
  return present(LIFESTYLE.heroCampfire) ?? ASSETS.videoPoster;
}

export function aboutHero() {
  return (
    present(LIFESTYLE.womensHoodieRidge) ??
    present(LIFESTYLE.womensHoodieCoastline) ??
    ASSETS.heroStill
  );
}
