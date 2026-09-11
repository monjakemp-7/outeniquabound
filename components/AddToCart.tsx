"use client";

import { useMemo, useState } from "react";
import { useCart } from "./CartProvider";
import { variationIdForSize } from "@/lib/woo";
import type { WooProduct } from "@/lib/types";

const SIZE_ORDER = ["xs", "s", "m", "l", "xl", "xxl", "xxxl", "ns"];

export function AddToCart({ product }: { product: WooProduct }) {
  const { addItem } = useCart();
  const sizeAttr = product.attributes.find((a) => a.has_variations);
  const sizes = useMemo(() => {
    const terms = sizeAttr?.terms ?? [];
    return [...terms].sort(
      (a, b) =>
        SIZE_ORDER.indexOf(a.slug.toLowerCase()) -
        SIZE_ORDER.indexOf(b.slug.toLowerCase()),
    );
  }, [sizeAttr]);

  const defaultSize =
    sizes.find((s) => s.default)?.slug || sizes[0]?.slug || "";
  const [size, setSize] = useState(defaultSize);
  const [qty, setQty] = useState(1);
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">(
    "idle",
  );
  const [message, setMessage] = useState("");

  async function onAdd() {
    setStatus("loading");
    setMessage("");
    const id = size ? variationIdForSize(product, size) : product.id;
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

  return (
    <div className="space-y-4">
      {sizes.length > 0 ? (
        <fieldset>
          <legend className="font-display text-sm tracking-[0.2em] text-forest">
            Size
          </legend>
          <div className="mt-2 flex flex-wrap gap-2">
            {sizes.map((term) => {
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
    </div>
  );
}
