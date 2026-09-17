import { isGiftCard } from "./catalog";
import type { WooProduct } from "./types";

export type FitNote = {
  kicker: string;
  model: string;
  fit: string;
};

function hay(product: WooProduct) {
  const cats = product.categories.map((c) => c.slug.toLowerCase()).join(" ");
  return `${product.name} ${product.slug} ${cats}`.toLowerCase();
}

function isBottle(product: WooProduct) {
  const text = hay(product);
  return (
    text.includes("hydrat") ||
    text.includes("bottle") ||
    text.includes("kanteen") ||
    text.includes("tumbler")
  );
}

function isWomens(product: WooProduct) {
  const text = hay(product);
  return (
    text.includes("womens") ||
    text.includes("ladies") ||
    text.includes("women")
  );
}

export function fitNoteFor(product: WooProduct): FitNote | null {
  if (isGiftCard(product) || isBottle(product)) return null;
  const text = hay(product);
  const womens = isWomens(product);

  if (text.includes("hoodie")) {
    return {
      kicker: "Fit notes",
      model:
        "Model height isn’t on file for this piece yet — a working note, not a studio measurement. Typical wear: M.",
      fit: womens
        ? "True to size, with room for a tee underneath. Between sizes, take the larger one. Size guide has the centimetres."
        : "True to size, roomy enough for a tee underneath. Between sizes, take the larger one. Size guide has the centimetres.",
    };
  }

  if (
    text.includes("t-shirt") ||
    text.includes("tshirt") ||
    /\btees?\b/.test(text) ||
    (text.includes("shirt") && !text.includes("hoodie"))
  ) {
    return {
      kicker: "Fit notes",
      model:
        "Model height isn’t on file for this piece yet — a working note, not a studio measurement. Typical wear: M.",
      fit: "True to size. If you like a bit of air through the body, size up. Size guide has the centimetres.",
    };
  }

  if (text.includes("buff")) {
    return {
      kicker: "Fit notes",
      model: "No model line — buffs don’t run a size set.",
      fit: "One size. Stretch fabric, worn as a neck, wrap, or visor.",
    };
  }

  if (text.includes("sock")) {
    return {
      kicker: "Fit notes",
      model: "No model line on socks.",
      fit: "As marked on the pair. 4–7 and 8–12 are shoe sizes. Between sizes, go up.",
    };
  }

  return null;
}
