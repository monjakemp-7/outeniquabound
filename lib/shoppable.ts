import { displayPrice, isGiftCard, isHiddenSizeSlug } from "./catalog";
import { productName } from "./html";
import type { WooProduct } from "./types";

export type ShoppablePiece = {
  id: number;
  slug: string;
  name: string;
  sku: string;
  price: string | null;
  image?: string;
  inStock: boolean;
  sizeTerms: { slug: string; name: string }[];
  variations: { id: number; size: string }[];
};

export function toShoppable(
  product: WooProduct,
  image?: string,
): ShoppablePiece {
  const sizeAttr = product.attributes.find((a) => a.has_variations);
  const sizeTerms = (sizeAttr?.terms ?? [])
    .filter((term) => !isHiddenSizeSlug(term.slug))
    .map((term) => ({ slug: term.slug, name: term.name }));

  return {
    id: product.id,
    slug: product.slug,
    name: productName(product.name),
    sku: product.sku,
    price: displayPrice(product),
    image,
    inStock: product.is_in_stock && product.is_purchasable,
    sizeTerms,
    variations: product.variations.map((variation) => ({
      id: variation.id,
      size:
        variation.attributes.find((a) => a.name.toLowerCase() === "size")
          ?.value ?? "",
    })),
  };
}

export function shoppableBySlug(
  catalog: WooProduct[],
  slug: string,
  imageFor: (product: WooProduct) => string | undefined,
) {
  const product = catalog.find((item) => item.slug === slug);
  if (!product || isGiftCard(product) || !product.is_in_stock) return null;
  return toShoppable(product, imageFor(product));
}

export function variationIdForKit(
  piece: ShoppablePiece,
  apparelSize: string,
  sockSize: string,
) {
  const sizes = piece.variations.map((v) => v.size.toLowerCase());
  if (sizes.includes("os") || sizes.includes("ns")) {
    return (
      piece.variations.find((v) => /^(os|ns)$/i.test(v.size))?.id ?? piece.id
    );
  }
  if (sizes.includes("4-7") || sizes.includes("8-12")) {
    const hit = piece.variations.find(
      (v) => v.size.toLowerCase() === sockSize.toLowerCase(),
    );
    return hit?.id ?? piece.variations[0]?.id ?? piece.id;
  }
  const hit = piece.variations.find(
    (v) => v.size.toLowerCase() === apparelSize.toLowerCase(),
  );
  return hit?.id ?? piece.variations[0]?.id ?? piece.id;
}
