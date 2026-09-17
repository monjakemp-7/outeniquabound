import { existsSync } from "node:fs";
import { join } from "node:path";
import { ASSETS } from "./constants";
import { shoppableBySlug, type ShoppablePiece } from "./shoppable";
import type { WooProduct } from "./types";

const LIFESTYLE = {
  womensHoodieCoastline: "/images/lifestyle/womens-hoodie-coastline.jpg",
  womensHoodieGraphic: "/images/lifestyle/womens-hoodie-graphic-socks.jpg",
  womensHoodieRidge: "/images/lifestyle/womens-hoodie-ridge.jpg",
  mensHoodieSummit: "/images/lifestyle/mens-hoodie-summit.jpg",
  mensTeeDark: "/images/lifestyle/mens-tee-dark.jpg",
} as const;

function present(src: string) {
  if (!src.startsWith("/")) return src;
  return existsSync(join(process.cwd(), "public", src.replace(/^\//, "")))
    ? src
    : undefined;
}

export type LookbookFrame = {
  id: string;
  kicker: string;
  title: string;
  note: string;
  image: string;
  fallback: string;
  objectPosition?: string;
  /** Photo is a confirmed match for this slug. Others complete the outfit. */
  confirmedSlug?: string;
  slugs: string[];
};

export type LookbookFrameResolved = LookbookFrame & {
  src: string;
  items: ShoppablePiece[];
};

/**
 * Lifestyle stills → in-stock Baseline outfits.
 * Confirmed slug matches are called out. Other links complete the kit
 * from the live shelf — not a claim that every garment is in the photo.
 */
export const LOOKBOOK: LookbookFrame[] = [
  {
    id: "summit-pass",
    kicker: "Cool morning",
    title: "On the pass",
    note: "Summit hoodie as worn. Buff and socks from the same shelf.",
    image: LIFESTYLE.mensHoodieSummit,
    fallback: ASSETS.mensHoodies,
    confirmedSlug: "ob00003-blac",
    slugs: ["ob00003-blac", "ob00020-0001", "ob00024-blac"],
  },
  {
    id: "coast-road",
    kicker: "Salt air",
    title: "Coast road",
    note: "Coastline hoodie as worn. Buff and socks for the rest of the day.",
    image: LIFESTYLE.womensHoodieCoastline,
    fallback: ASSETS.womensHoodies,
    confirmedSlug: "ob00005-sand",
    slugs: ["ob00005-sand", "ob00023-0001", "ob00028-mdstn"],
  },
  {
    id: "ridge",
    kicker: "Women’s layers",
    title: "On the ridge",
    note: "Merchandising still — not locked to one SKU. Moonrise, a tee, and socks from the women’s shelf.",
    image: LIFESTYLE.womensHoodieRidge,
    fallback: ASSETS.womensHoodies,
    slugs: ["ob00006-blue", "ob00012-whit", "ob00027-ltpi"],
  },
  {
    id: "graphic-socks",
    kicker: "Graphic day",
    title: "Graphic, then socks",
    note: "Socks sit in the frame. The hoodie and buff are live graphic pieces from the women’s shelf.",
    image: LIFESTYLE.womensHoodieGraphic,
    fallback: ASSETS.womensHoodies,
    slugs: ["ob00005-sand", "ob00022-0001", "ob00027-ltpi"],
  },
  {
    id: "dark-tee",
    kicker: "Warm day",
    title: "Dark tee, long day",
    note: "Merchandising still. Geelhout is the dark tee on the shelf today — not a locked match to this photo.",
    image: LIFESTYLE.mensTeeDark,
    fallback: ASSETS.mensTees,
    slugs: ["ob00011-forgr", "ob00021-0001", "ob00026-black"],
  },
];

function frameSrc(frame: LookbookFrame) {
  return present(frame.image) ?? frame.fallback;
}

export function resolveLookbook(
  catalog: WooProduct[],
  imageFor: (product: WooProduct) => string | undefined,
  { limit }: { limit?: number } = {},
): LookbookFrameResolved[] {
  const frames = LOOKBOOK.map((frame) => {
    const items = frame.slugs
      .map((slug) => shoppableBySlug(catalog, slug, imageFor))
      .filter((item): item is ShoppablePiece => Boolean(item));
    if (!items.length) return null;
    return {
      ...frame,
      src: frameSrc(frame),
      items,
    };
  }).filter((frame): frame is LookbookFrameResolved => Boolean(frame));

  return typeof limit === "number" ? frames.slice(0, limit) : frames;
}
