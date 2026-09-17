"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { ProductTrust } from "./ProductTrust";
import { FitNote } from "./FitNote";
import { useCart } from "./CartProvider";
import {
  GIFT_AMOUNTS,
  GIFT_CUSTOM_MAX,
  GIFT_CUSTOM_MIN,
  giftAmountLabel,
  giftVariationId,
  isGiftCard,
  isHiddenSizeSlug,
} from "@/lib/catalog";
import { variationIdForSize } from "@/lib/woo";
import { fitNoteFor } from "@/lib/fit";
import type { WooProduct } from "@/lib/types";

const SIZE_ORDER = ["xs", "s", "m", "l", "xl", "xxl", "xxxl", "4-7", "8-12", "ns", "os"];

export function AddToCart({ product }: { product: WooProduct }) {
  const { addItem } = useCart();
  const gift = isGiftCard(product);
  const sizeAttr = product.attributes.find((a) => a.has_variations);
  const allSizes = useMemo(() => {
    const terms = sizeAttr?.terms ?? [];
    return [...terms].sort(
      (a, b) =>
        SIZE_ORDER.indexOf(a.slug.toLowerCase()) -
        SIZE_ORDER.indexOf(b.slug.toLowerCase()),
    );
  }, [sizeAttr]);

  const visibleSizes = gift
    ? []
    : allSizes.filter((term) => !isHiddenSizeSlug(term.slug));
  const implicitSize =
    !gift && visibleSizes.length === 0
      ? allSizes.find((term) => isHiddenSizeSlug(term.slug))?.slug || ""
      : "";

  const defaultSize =
    visibleSizes.find((s) => s.default)?.slug || visibleSizes[0]?.slug || implicitSize;
  const [size, setSize] = useState(defaultSize);
  const [qty, setQty] = useState(1);
  const [amount, setAmount] = useState<number | "custom">(GIFT_AMOUNTS[0]);
  const [custom, setCustom] = useState(String(GIFT_AMOUNTS[0]));
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">(
    "idle",
  );
  const [message, setMessage] = useState("");
  const atcRef = useRef<HTMLButtonElement>(null);
  const [away, setAway] = useState(false);
  const [portal, setPortal] = useState(false);

  useEffect(() => {
    setPortal(true);
  }, []);

  useEffect(() => {
    const node = atcRef.current;
    if (!node) return;
    const io = new IntersectionObserver(
      ([entry]) => setAway(!entry.isIntersecting),
      { threshold: 0 },
    );
    io.observe(node);
    return () => io.disconnect();
  }, []);

  const giftRand = amount === "custom" ? Number(custom) : amount;
  const giftValid =
    Number.isFinite(giftRand) &&
    giftRand >= GIFT_CUSTOM_MIN &&
    giftRand <= GIFT_CUSTOM_MAX;

  async function onAdd() {
    setStatus("loading");
    setMessage("");

    if (gift) {
      if (!giftValid) {
        setStatus("error");
        setMessage(`Choose an amount between R${GIFT_CUSTOM_MIN} and R${GIFT_CUSTOM_MAX}.`);
        return;
      }
      const id = giftVariationId(product);
      const extra = {
        variation: [
          { attribute: "Gift Card Amount", value: "Other amount" },
        ],
        pw_gift_card_amount: String(giftRand),
        "pw-gift-card-amount": String(giftRand),
        pw_gift_card_custom_amount: String(giftRand),
      };
      const result = await addItem(id, qty, extra);
      if (result.ok && !result.zeroPrice) {
        setStatus("done");
        setMessage("Packed in the cart.");
      } else if (result.ok && result.zeroPrice) {
        setStatus("error");
        setMessage("This till doesn’t take a R0 card. Finish the amount on outeniquabound.com.");
      } else {
        setStatus("error");
        setMessage(result.message || "Could not add the card here — finish it on the till.");
      }
      return;
    }

    const chosen = size || implicitSize;
    const id = chosen ? variationIdForSize(product, chosen) : product.id;
    const result = await addItem(id, qty);
    if (result.ok) {
      setStatus("done");
      setMessage("Packed in the cart.");
    } else {
      setStatus("error");
      setMessage(result.message || "Could not add to cart.");
    }
  }

  if (!product.is_purchasable || !product.is_in_stock) {
    return (
      <p className="font-serif text-mountain/70">This piece is off the shelf.</p>
    );
  }

  const stickyVisible = away;
  const fit = fitNoteFor(product);
  const stickyBar =
    stickyVisible && portal ? (
      <div className="fixed inset-x-0 bottom-0 z-[60] border-t border-sand/20 bg-mountain p-3 md:hidden">
        <button
          type="button"
          onClick={() => void onAdd()}
          disabled={status === "loading"}
          className="w-full bg-earth px-6 py-3 font-display text-lg tracking-[0.18em] text-sand disabled:opacity-60"
        >
          {status === "loading" ? "Packing…" : "Add to cart"}
        </button>
      </div>
    ) : null;

  return (
    <div className="space-y-4">
      {gift ? (
        <fieldset>
          <legend className="font-display text-sm tracking-[0.2em] text-forest">
            Amount
          </legend>
          <div className="mt-2 flex flex-wrap gap-2">
            {GIFT_AMOUNTS.map((value) => {
              const selected = amount === value;
              return (
                <button
                  key={value}
                  type="button"
                  onClick={() => {
                    setAmount(value);
                    setCustom(String(value));
                  }}
                  className={`min-w-12 border px-3 py-2 font-display text-sm tracking-[0.14em] ${
                    selected
                      ? "border-earth bg-earth text-sand"
                      : "border-mountain/25 bg-sand hover:border-mountain"
                  }`}
                >
                  {giftAmountLabel(value)}
                </button>
              );
            })}
            <button
              type="button"
              onClick={() => setAmount("custom")}
              className={`min-w-12 border px-3 py-2 font-display text-sm tracking-[0.14em] ${
                amount === "custom"
                  ? "border-earth bg-earth text-sand"
                  : "border-mountain/25 bg-sand hover:border-mountain"
              }`}
            >
              Custom
            </button>
          </div>
          {amount === "custom" ? (
            <label className="mt-3 block font-serif text-sm text-mountain/70">
              Your amount (R{GIFT_CUSTOM_MIN}–R{GIFT_CUSTOM_MAX})
              <input
                type="number"
                min={GIFT_CUSTOM_MIN}
                max={GIFT_CUSTOM_MAX}
                step={50}
                value={custom}
                onChange={(e) => setCustom(e.target.value)}
                className="mt-2 w-40 border border-mountain/25 bg-sand px-2 py-2 font-serif text-mountain"
              />
            </label>
          ) : null}
        </fieldset>
      ) : visibleSizes.length > 0 ? (
        <fieldset>
          <legend className="flex w-full items-center justify-between gap-4 font-display text-sm tracking-[0.2em] text-forest">
            <span>Size</span>
            <Link
              href="/size-guide"
              className="tracking-[0.16em] text-earth hover:underline"
            >
              Size guide
            </Link>
          </legend>
          <div className="mt-2 flex flex-wrap gap-2">
            {visibleSizes.map((term) => {
              const selected = term.slug === size;
              return (
                <button
                  key={term.slug}
                  type="button"
                  onClick={() => setSize(term.slug)}
                  className={`min-w-12 border px-3 py-2 font-display text-sm tracking-[0.14em] ${
                    selected
                      ? "border-earth bg-earth text-sand"
                      : "border-mountain/25 bg-sand hover:border-mountain"
                  }`}
                >
                  {term.name}
                </button>
              );
            })}
          </div>
        </fieldset>
      ) : null}
      {fit ? <FitNote note={fit} /> : null}
      <div className="flex items-center gap-3">
        <label className="font-display text-sm tracking-[0.2em]" htmlFor="qty">
          Qty
        </label>
        <input
          id="qty"
          type="number"
          min={1}
          max={99}
          value={qty}
          onChange={(e) => setQty(Math.max(1, Number(e.target.value) || 1))}
          className="w-20 border border-mountain/25 bg-sand px-2 py-2 font-serif"
        />
      </div>
      <button
        ref={atcRef}
        type="button"
        onClick={() => void onAdd()}
        disabled={status === "loading"}
        className="w-full bg-earth px-6 py-3 font-display text-lg tracking-[0.18em] text-sand hover:bg-mountain disabled:opacity-60"
      >
        {status === "loading" ? "Packing…" : "Add to cart"}
      </button>
      {message ? (
        <p
          className={`font-serif text-sm ${status === "error" ? "text-earth" : "text-forest"}`}
        >
          {message}
        </p>
      ) : null}
      {gift && status === "error" ? (
        <p className="font-serif text-sm text-mountain/70">
          Or buy the card on{" "}
          <a
            href="https://outeniquabound.com/product/gift-card/"
            className="text-earth underline underline-offset-4"
          >
            outeniquabound.com
          </a>
          .
        </p>
      ) : null}
      <ProductTrust product={product} />
      {stickyBar ? createPortal(stickyBar, document.body) : null}
    </div>
  );
}
