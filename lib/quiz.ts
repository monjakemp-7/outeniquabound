import { BASELINE_SKUS, type Distance, type Layer, type Vibe, type Weather, type Who } from "./baseline";
import type { ShoppablePiece } from "./shoppable";

export type QuizAnswers = {
  who: Who;
  weather: Weather;
  distance: Distance;
  vibe: Vibe;
};

export type QuizOption<T extends string> = {
  value: T;
  label: string;
  hint: string;
};

export const QUIZ_STEPS: {
  key: keyof QuizAnswers;
  kicker: string;
  title: string;
  support: string;
  options: QuizOption<string>[];
}[] = [
  {
    key: "who",
    kicker: "01 · Who",
    title: "Who are you packing for?",
    support: "The cut follows the shelf. Either mixes both sides and keeps the unisex buffs.",
    options: [
      { value: "men", label: "Men", hint: "Men’s hoodies, tees, socks." },
      { value: "women", label: "Women", hint: "Women’s hoodies, tees, socks." },
      { value: "unisex", label: "Either", hint: "Both cuts, plus the shared buffs." },
    ],
  },
  {
    key: "weather",
    kicker: "02 · Air",
    title: "What’s the air like?",
    support: "Cool mornings want fleece. Warm days want a tee. Honest weather, not a forecast.",
    options: [
      { value: "cool", label: "Cool", hint: "Brushed fleece. A hoodie." },
      { value: "warm", label: "Warm", hint: "Light cotton. A tee." },
    ],
  },
  {
    key: "distance",
    kicker: "03 · Distance",
    title: "How far are you going?",
    support: "The first hill behind the house counts. So does the long ridge.",
    options: [
      { value: "hill", label: "The hill behind the house", hint: "A layer. Maybe socks." },
      { value: "half", label: "A half-day", hint: "Layer and a buff." },
      { value: "long", label: "A long ridge", hint: "Layer, buff, socks." },
    ],
  },
  {
    key: "vibe",
    kicker: "04 · Mark",
    title: "What sits on the chest?",
    support: "Quiet logo, or a bit of graphic. Both are Baseline. Neither is a costume.",
    options: [
      { value: "quiet", label: "Quiet logo", hint: "Clean mark. Repeatable." },
      { value: "graphic", label: "A bit of graphic", hint: "Print, place, flora." },
    ],
  },
];

function genderMatch(who: Who, gender: Who) {
  if (who === "unisex") return true;
  return gender === who || gender === "unisex";
}

function rankSku(
  layer: Layer,
  who: Who,
  vibe: Vibe,
  slug: string,
) {
  const sku = BASELINE_SKUS.find((item) => item.slug === slug);
  if (!sku || sku.layer !== layer) return -1;
  if (!genderMatch(who, sku.gender)) return -1;
  let score = 10;
  if (sku.vibe === vibe) score += 8;
  if (who !== "unisex" && sku.gender === who) score += 4;
  if (who === "unisex" && sku.gender === "unisex") score += 3;
  return score;
}

function pickLayer(
  shelf: ShoppablePiece[],
  layer: Layer,
  who: Who,
  vibe: Vibe,
  used: Set<string>,
) {
  const ranked = shelf
    .filter((item) => item.inStock && !used.has(item.slug))
    .map((item) => ({ item, score: rankSku(layer, who, vibe, item.slug) }))
    .filter((row) => row.score > 0)
    .sort((a, b) => b.score - a.score);
  return ranked[0]?.item ?? null;
}

function pickLayers(
  shelf: ShoppablePiece[],
  layer: Layer,
  who: Who,
  vibe: Vibe,
  used: Set<string>,
) {
  if (who !== "unisex") {
    const one = pickLayer(shelf, layer, who, vibe, used);
    return one ? [one] : [];
  }
  const men = pickLayer(shelf, layer, "men", vibe, used);
  if (men) used.add(men.slug);
  const women = pickLayer(shelf, layer, "women", vibe, used);
  if (men) used.delete(men.slug);
  return [men, women].filter((item): item is ShoppablePiece => Boolean(item));
}

export function recommendKit(answers: QuizAnswers, shelf: ShoppablePiece[]) {
  const layer: Layer = answers.weather === "cool" ? "hoodie" : "tee";
  const used = new Set<string>();
  const pieces: ShoppablePiece[] = [];

  const heroes = pickLayers(shelf, layer, answers.who, answers.vibe, used);
  for (const hero of heroes) {
    if (pieces.length >= 4) break;
    pieces.push(hero);
    used.add(hero.slug);
  }

  const wantBuff = answers.distance !== "hill" || answers.weather === "cool";
  const wantSocks =
    answers.distance === "long" ||
    (answers.distance === "half" && pieces.length < 3) ||
    (answers.distance === "hill" && pieces.length < 2);

  if (wantBuff && pieces.length < 4) {
    const buff =
      pickLayer(shelf, "buff", answers.who, answers.vibe, used) ??
      pickLayer(shelf, "buff", "unisex", answers.vibe, used);
    if (buff) {
      pieces.push(buff);
      used.add(buff.slug);
    }
  }

  if (wantSocks && pieces.length < 4) {
    const socks = pickLayer(shelf, "socks", answers.who, answers.vibe, used);
    if (socks) {
      pieces.push(socks);
      used.add(socks.slug);
    }
  }

  return pieces.slice(0, 4);
}

export function quizSummary(answers: QuizAnswers) {
  const who =
    answers.who === "men"
      ? "men’s cuts"
      : answers.who === "women"
        ? "women’s cuts"
        : "both cuts";
  const air = answers.weather === "cool" ? "cool air" : "warm air";
  const distance =
    answers.distance === "hill"
      ? "the hill behind the house"
      : answers.distance === "half"
        ? "a half-day"
        : "a long ridge";
  const mark = answers.vibe === "quiet" ? "a quiet logo" : "a bit of graphic";
  return `${who}, ${air}, ${distance}, ${mark}.`;
}

export function kitAddNote(pieces: ShoppablePiece[]) {
  const hasTop = pieces.some((p) => /hoodie|tee|shirt/i.test(p.name));
  const hasBuff = pieces.some((p) => /buff/i.test(p.name));
  const hasSocks = pieces.some((p) => /sock/i.test(p.name));
  const bits = [];
  if (hasTop) bits.push("hoodies and tees in the size you pick");
  if (hasBuff) bits.push("buffs in one size");
  if (hasSocks) bits.push("socks in the foot size you pick");
  if (!bits.length) return "Packed as they sit on the shelf.";
  return `The kit goes in as ${bits.join(", ")}. Wrong size? Take it out in the cart and pick again on the product page.`;
}
