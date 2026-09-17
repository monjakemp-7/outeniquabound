import type { WooProduct } from "./types";

export type Who = "men" | "women" | "unisex";
export type Weather = "cool" | "warm";
export type Distance = "hill" | "half" | "long";
export type Vibe = "quiet" | "graphic";
export type Layer = "hoodie" | "tee" | "buff" | "socks";

export type BaselineSku = {
  slug: string;
  sku: string;
  name: string;
  gender: Who;
  layer: Layer;
  vibe: Vibe;
};

/**
 * Live Baseline SKUs (Woo Store API, 2026-09-17). Quiet vs graphic is a
 * merchandising split for the quiz — not a fabric claim.
 */
export const BASELINE_SKUS: BaselineSku[] = [
  {
    slug: "ob00003-blac",
    sku: "OB00003",
    name: "Summit Hoodie",
    gender: "men",
    layer: "hoodie",
    vibe: "quiet",
  },
  {
    slug: "ob00002-blk",
    sku: "OB00002",
    name: "Traverse Hoodie",
    gender: "men",
    layer: "hoodie",
    vibe: "graphic",
  },
  {
    slug: "ob00004-navy",
    sku: "OB00004",
    name: "Heritage Hoodie",
    gender: "men",
    layer: "hoodie",
    vibe: "quiet",
  },
  {
    slug: "ob00005-sand",
    sku: "OB00005",
    name: "Coastline Hoodie",
    gender: "women",
    layer: "hoodie",
    vibe: "graphic",
  },
  {
    slug: "ob00006-blue",
    sku: "OB00006",
    name: "Moonrise Hoodie",
    gender: "women",
    layer: "hoodie",
    vibe: "quiet",
  },
  {
    slug: "ob00008-white",
    sku: "OB00008",
    name: "Summit Tee",
    gender: "men",
    layer: "tee",
    vibe: "quiet",
  },
  {
    slug: "ob00009-white",
    sku: "OB00009",
    name: "Contour Tee",
    gender: "men",
    layer: "tee",
    vibe: "quiet",
  },
  {
    slug: "ob00010-wht",
    sku: "OB00010",
    name: "Keurberg Tee",
    gender: "men",
    layer: "tee",
    vibe: "graphic",
  },
  {
    slug: "ob00011-forgr",
    sku: "OB00011",
    name: "Geelhout Tee",
    gender: "men",
    layer: "tee",
    vibe: "quiet",
  },
  {
    slug: "ob00012-whit",
    sku: "OB00012",
    name: "Trail Tee",
    gender: "women",
    layer: "tee",
    vibe: "quiet",
  },
  {
    slug: "ob00013-wht",
    sku: "OB00013",
    name: "Fynbos Tee",
    gender: "women",
    layer: "tee",
    vibe: "graphic",
  },
  {
    slug: "ob00020-0001",
    sku: "OB00020",
    name: "Summit Buff",
    gender: "unisex",
    layer: "buff",
    vibe: "quiet",
  },
  {
    slug: "ob00021-0001",
    sku: "OB00021",
    name: "George Peak Buff",
    gender: "unisex",
    layer: "buff",
    vibe: "quiet",
  },
  {
    slug: "ob00022-0001",
    sku: "OB00022",
    name: "Explorer Buff",
    gender: "unisex",
    layer: "buff",
    vibe: "graphic",
  },
  {
    slug: "ob00023-0001",
    sku: "OB00023",
    name: "Wild Lily Buff",
    gender: "women",
    layer: "buff",
    vibe: "graphic",
  },
  {
    slug: "ob00024-blac",
    sku: "OB00024",
    name: "Summit Socks",
    gender: "men",
    layer: "socks",
    vibe: "quiet",
  },
  {
    slug: "ob00025-blkwh",
    sku: "OB00025",
    name: "Contour Socks",
    gender: "men",
    layer: "socks",
    vibe: "quiet",
  },
  {
    slug: "ob00026-black",
    sku: "OB00026",
    name: "Peak Route Socks",
    gender: "men",
    layer: "socks",
    vibe: "graphic",
  },
  {
    slug: "ob00027-ltpi",
    sku: "OB00027",
    name: "Wild Flora Socks",
    gender: "women",
    layer: "socks",
    vibe: "graphic",
  },
  {
    slug: "ob00028-mdstn",
    sku: "OB00028",
    name: "Fynbos Bloom Socks",
    gender: "women",
    layer: "socks",
    vibe: "graphic",
  },
];

export const BASELINE_BY_SLUG = Object.fromEntries(
  BASELINE_SKUS.map((item) => [item.slug, item]),
) as Record<string, BaselineSku>;

export function isOnShelf(product: WooProduct) {
  return product.is_in_stock && product.is_purchasable;
}
