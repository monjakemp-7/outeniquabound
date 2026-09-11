import { FREE_SHIPPING_MINOR } from "./constants";
import type { WooPrice } from "./types";

export function formatMinor(
  value: string | number,
  minorUnit = 2,
  prefix = "R",
): string {
  const n = typeof value === "string" ? Number(value) : value;
  if (!Number.isFinite(n)) return `${prefix}0`;
  const amount = n / 10 ** minorUnit;
  const formatted = amount.toLocaleString("en-ZA", {
    minimumFractionDigits: amount % 1 === 0 ? 0 : 2,
    maximumFractionDigits: 2,
  });
  return `${prefix}${formatted}`;
}

export function formatWooPrice(prices: WooPrice) {
  return formatMinor(
    prices.price,
    prices.currency_minor_unit,
    prices.currency_prefix || prices.currency_symbol || "R",
  );
}

export function shippingProgress(itemTotalMinor: number) {
  const remaining = Math.max(0, FREE_SHIPPING_MINOR - itemTotalMinor);
  const pct = Math.min(100, (itemTotalMinor / FREE_SHIPPING_MINOR) * 100);
  return { remaining, pct, qualified: remaining === 0 };
}
