import type { WooProduct } from "./types";

export type ProductCopy = {
  sku: string;
  short: string;
  facts: string[];
};

const SWYA = "Start where you are.";

function line(body: string) {
  return `${body} ${SWYA}`;
}

/**
 * 2026 production-schedule copy, Field Guide voice.
 * Matched on SKU stem (OB00003 from OB00003-BLAC).
 */
const BY_SKU: Record<string, Omit<ProductCopy, "sku">> = {
  OB00008: {
    short: line(
      "Soft everyday cotton for trail days, town days, and everything in between.",
    ),
    facts: ["100% cotton knitted jersey", "Colour: oyster mushroom grey"],
  },
  OB00009: {
    short: line(
      "Soft everyday cotton for trail days, town days, and everything in between.",
    ),
    facts: ["100% cotton knitted jersey", "Colour: lucent white"],
  },
  OB00010: {
    short: line(
      "Soft everyday cotton for trail days, town days, and everything in between.",
    ),
    facts: ["100% cotton knitted jersey", "Colour: lucent white"],
  },
  OB00011: {
    short: line(
      "Soft everyday cotton for trail days, town days, and everything in between.",
    ),
    facts: ["100% cotton knitted jersey", "Colour: forest green"],
  },
  OB00002: {
    short: line("Brushed fleece for cool mornings on the pass."),
    facts: [
      "330gsm brushed fleece (mostly cotton, a little polyester)",
      "Colour: black",
      "Puff print on the front, water-based ink on the back",
    ],
  },
  OB00003: {
    short: line("Brushed fleece for cool mornings on the pass."),
    facts: [
      "330gsm brushed fleece (mostly cotton, a little polyester)",
      "Colour: black",
      "Water-based ink and puff print on the front",
    ],
  },
  OB00004: {
    short: line("Brushed fleece for cool mornings on the pass."),
    facts: [
      "330gsm brushed fleece (mostly cotton, a little polyester)",
      "Colour: navy",
      "Water-based colour and puff print on the front",
    ],
  },
  OB00012: {
    short: line(
      "A light cotton tee for the first hill behind the house and the long ridge after.",
    ),
    facts: ["100% cotton knitted jersey", "Colour: lucent white"],
  },
  OB00013: {
    short: line(
      "A light cotton tee for the first hill behind the house and the long ridge after.",
    ),
    facts: ["100% cotton knitted jersey", "Colour: lucent white"],
  },
  OB00005: {
    short: line("Brushed fleece for cool mornings on the coast road."),
    facts: [
      "330gsm brushed fleece",
      "Colour: coconut milk / cream",
      "Water-based colour and puff print on the front",
    ],
  },
  OB00006: {
    short: line("Brushed fleece for cool mornings under a pale sky."),
    facts: [
      "330gsm brushed fleece",
      "Colour: country air / light blue",
      "Embroidered front",
    ],
  },
  OB00020: {
    short: line("Trail buff for sun, wind, and the long way home."),
    facts: ["One size"],
  },
  OB00021: {
    short: line("Trail buff for sun, wind, and the long way home."),
    facts: ["One size"],
  },
  OB00022: {
    short: line("Trail buff for sun, wind, and the long way home."),
    facts: ["One size"],
  },
  OB00023: {
    short: line("Trail buff for sun, wind, and the long way home."),
    facts: ["One size"],
  },
  OB00024: {
    short: line("Made for kilometres that don’t always look like a race."),
    facts: [],
  },
  OB00025: {
    short: line("Made for kilometres that don’t always look like a race."),
    facts: [],
  },
  OB00026: {
    short: line("Made for kilometres that don’t always look like a race."),
    facts: [],
  },
  OB00027: {
    short: line("Made for kilometres that don’t always look like a race."),
    facts: [],
  },
  OB00028: {
    short: line("Made for kilometres that don’t always look like a race."),
    facts: [],
  },
};

const BAG_COPY: Omit<ProductCopy, "sku"> = {
  short: line(
    "Repurposed tent, kite, or banner cloth — gear that already has a story.",
  ),
  facts: ["Second Summit / circular materials"],
};

const NAME_HINTS: [RegExp, string][] = [
  [/summit[-\s]*tee/i, "OB00008"],
  [/contour[-\s]*tee/i, "OB00009"],
  [/keurberg/i, "OB00010"],
  [/geelhout/i, "OB00011"],
  [/traverse/i, "OB00002"],
  [/heritage/i, "OB00004"],
  [/summit[-\s]*hoodie/i, "OB00003"],
  [/trail[-\s]*tee/i, "OB00012"],
  [/fynbos[-\s]*tee/i, "OB00013"],
  [/coastline/i, "OB00005"],
  [/moonrise/i, "OB00006"],
  [/summit[-\s]*buff/i, "OB00020"],
  [/george[-\s]*peak/i, "OB00021"],
  [/explorer[-\s]*buff/i, "OB00022"],
  [/wild[-\s]*lily/i, "OB00023"],
  [/summit[-\s]*socks/i, "OB00024"],
  [/contour[-\s]*socks/i, "OB00025"],
  [/peak[-\s]*route/i, "OB00026"],
  [/wild[-\s]*flora/i, "OB00027"],
  [/fynbos[-\s]*bloom/i, "OB00028"],
];
function skuStem(sku: string) {
  const compact = sku.toUpperCase().replace(/[^A-Z0-9]/g, "");
  return compact.match(/^(OB\d{5})/)?.[1] ?? "";
}

function isEventSku(product: WooProduct) {
  const hay = `${product.name} ${product.sku}`.toLowerCase();
  return hay.includes("mut") || hay.includes("volunteer");
}

export function productCopy(product: WooProduct): ProductCopy | null {
  if (isEventSku(product)) return null;
  const stem = skuStem(product.sku || "");
  if (stem) {
    const numbered = Number(stem.slice(2));
    const found = BY_SKU[stem];
    if (found) return { sku: stem, ...found };
    if (numbered >= 29 && numbered <= 39) return { sku: stem, ...BAG_COPY };
  }
  const hay = `${product.name} ${product.slug}`;
  for (const [re, sku] of NAME_HINTS) {
    if (re.test(hay) && BY_SKU[sku]) return { sku, ...BY_SKU[sku] };
  }
  return null;
}
