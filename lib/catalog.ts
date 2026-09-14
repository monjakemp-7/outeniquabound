import { formatMinor, formatWooPrice } from "./money";
import type { WooProduct } from "./types";

export const GIFT_AMOUNTS = [250, 500, 1000] as const;
export const GIFT_CUSTOM_MIN = 250;
export const GIFT_CUSTOM_MAX = 1000;

const HIDDEN_SIZE_SLUGS = new Set(["ns", "os"]);

export function isGiftCard(product: WooProduct) {
  return (
    product.type === "pw-gift-card" ||
    product.slug.includes("gift-card") ||
    product.categories.some((c) => c.slug.includes("gift"))
  );
}

export function skuFamily(product: WooProduct) {
  const sku = (product.sku || "").toUpperCase();
  const kk = sku.match(/^(KK\d+)/);
  if (kk) return kk[1];
  return `id:${product.id}`;
}

export function colourLabel(product: WooProduct) {
  const named = product.attributes.find((a) =>
    a.name.toLowerCase().includes("product colour"),
  );
  const colour = named ?? product.attributes.find((a) => a.name.toLowerCase() === "colour");
  const term = colour?.terms[0];
  if (!term?.name) return "";
  return term.name.replace(/\b\w/g, (ch) => ch.toUpperCase());
}

export function familySiblings(catalog: WooProduct[], product: WooProduct) {
  const key = skuFamily(product);
  if (!key.startsWith("KK")) return [];
  return catalog.filter((item) => skuFamily(item) === key);
}

/** One card per KK family; gift cards kept or dropped by the caller. */
export function dedupeCatalog(products: WooProduct[], { gifts = "hide" }: { gifts?: "hide" | "end" } = {}) {
  const seen = new Set<string>();
  const core: WooProduct[] = [];
  const gift: WooProduct[] = [];

  for (const product of products) {
    if (isGiftCard(product)) {
      gift.push(product);
      continue;
    }
    const key = skuFamily(product);
    if (seen.has(key)) continue;
    seen.add(key);
    core.push(product);
  }

  if (gifts === "end") return [...core, ...gift];
  return core;
}

export function displayPrice(product: WooProduct) {
  if (isGiftCard(product)) return `from R${GIFT_AMOUNTS[0]}`;
  const amount = Number(product.prices.price);
  if (!Number.isFinite(amount) || amount <= 0) return null;
  return formatWooPrice(product.prices);
}

export function giftAmountLabel(rand: number) {
  return formatMinor(rand * 100, 2);
}

export function isHiddenSizeSlug(slug: string) {
  return HIDDEN_SIZE_SLUGS.has(slug.toLowerCase());
}

export function giftVariationId(product: WooProduct) {
  return product.variations[0]?.id ?? product.id;
}
