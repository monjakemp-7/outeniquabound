import { WOO_URL } from "./constants";
import { dedupeCatalog, isGiftCard } from "./catalog";
import type { WooCategory, WooProduct } from "./types";

const STORE = `${WOO_URL.replace(/\/$/, "")}/wp-json/wc/store/v1`;

async function storeFetch<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${STORE}${path}`, {
    ...init,
    headers: {
      Accept: "application/json",
      ...(init?.headers ?? {}),
    },
    next: { revalidate: 120 },
  });
  if (!res.ok) {
    throw new Error(`Woo Store API ${res.status} for ${path}`);
  }
  return res.json() as Promise<T>;
}

export async function getProducts(params: Record<string, string | number> = {}) {
  const search = new URLSearchParams();
  search.set("per_page", String(params.per_page ?? 100));
  if (params.category) search.set("category", String(params.category));
  if (params.slug) search.set("slug", String(params.slug));
  if (params.search) search.set("search", String(params.search));
  if (params.orderby) search.set("orderby", String(params.orderby));
  if (params.featured) search.set("featured", String(params.featured));
  try {
    return await storeFetch<WooProduct[]>(`/products?${search.toString()}`);
  } catch {
    return [] as WooProduct[];
  }
}

export async function getProductById(id: number) {
  try {
    return await storeFetch<WooProduct>(`/products/${id}`);
  } catch {
    return null;
  }
}

/** Variations (pretty slugs) resolve to the parent variable product. */
export async function resolveVariableParent(product: WooProduct) {
  if (product.type === "variation" && product.parent) {
    const parent = await getProductById(product.parent);
    if (parent) return parent;
  }
  return product;
}

export async function getProductBySlug(slug: string) {
  const bySlug = await getProducts({ slug, per_page: 5 });
  let found: WooProduct | null = bySlug.find((p) => p.slug === slug) ?? null;
  if (!found) {
    const products = await getProducts({ search: slug, per_page: 20 });
    found = products.find((p) => p.slug === slug) ?? null;
  }
  if (!found) return null;
  return resolveVariableParent(found);
}

export async function getCategories() {
  try {
    return await storeFetch<WooCategory[]>(
      "/products/categories?per_page=50",
    );
  } catch {
    return [] as WooCategory[];
  }
}

export async function getShopProducts(params: Record<string, string | number> = {}) {
  const products = await getProducts(params);
  const category = String(params.category ?? "").toLowerCase();
  const giftShelf = category.includes("gift");
  return dedupeCatalog(products, { gifts: giftShelf ? "end" : "hide" });
}

export async function getFeaturedProducts() {
  const all = await getShopProducts({ per_page: 100 });
  const branded = all.filter((p) => {
    if (isGiftCard(p)) return false;
    const sku = (p.sku || "").toUpperCase();
    if (!sku.startsWith("OB")) return false;
    return true;
  });
  const picks = branded.slice(0, 8);
  return picks.length ? picks : all.filter((p) => !isGiftCard(p)).slice(0, 8);
}

export function variationIdForSize(product: WooProduct, sizeSlug: string) {
  const match = product.variations.find((v) =>
    v.attributes.some(
      (a) =>
        a.name.toLowerCase() === "size" &&
        a.value.toLowerCase() === sizeSlug.toLowerCase(),
    ),
  );
  return match?.id ?? product.variations[0]?.id ?? product.id;
}
