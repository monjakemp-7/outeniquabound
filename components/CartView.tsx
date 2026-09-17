"use client";

import Image from "next/image";
import Link from "next/link";
import { FreeShippingBar } from "@/components/FreeShippingBar";
import { PaymentTrust } from "@/components/PaymentTrust";
import { useCart } from "@/components/CartProvider";
import { COPY, WOO_URL } from "@/lib/constants";
import { productName } from "@/lib/html";
import { formatMinor } from "@/lib/money";

export function CartView() {
  const { cart, updateItem, removeItem } = useCart();
  const items = cart?.items ?? [];
  const totals = cart?.totals;
  const minor = totals?.currency_minor_unit ?? 2;
  const itemsInclTax =
    Number(totals?.total_items ?? 0) + Number(totals?.total_items_tax ?? 0);

  if (!items.length) {
    return (
      <div className="border border-mountain/15 bg-sand p-10 text-center">
        <p className="font-display text-4xl">The pack is empty</p>
        <p className="mt-3 font-serif text-mountain/70">
          Start where you are. The collection is on the shop floor.
        </p>
        <div className="mt-6 flex flex-col items-center gap-3">
          <Link
            href="/shop"
            className="inline-block bg-earth px-6 py-3 font-display tracking-[0.18em] text-sand"
          >
            Shop
          </Link>
          <Link
            href="/quiz"
            className="font-display tracking-[0.16em] text-earth hover:underline"
          >
            Or find a kit
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="grid gap-10 lg:grid-cols-[1.4fr_0.8fr]">
      <ul className="space-y-6">
        {items.map((item) => {
          const img = item.images[0];
          const variation = item.variation
            ?.map((v) => `${v.attribute}: ${v.value}`)
            .join(" · ");
          return (
            <li
              key={item.key}
              className="grid grid-cols-[96px_1fr] gap-4 border-b border-mountain/10 pb-6"
            >
              <div className="relative h-24 w-24 overflow-hidden bg-mountain/10">
                {img ? (
                  <Image
                    src={img.src}
                    alt={productName(item.name)}
                    fill
                    sizes="96px"
                    className="object-cover"
                  />
                ) : null}
              </div>
              <div>
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-display text-2xl leading-none">
                      {productName(item.name)}
                    </p>
                    {variation ? (
                      <p className="mt-1 font-serif text-sm text-mountain/65">
                        {variation}
                      </p>
                    ) : null}
                  </div>
                  <p className="font-serif text-earth">
                    {formatMinor(
                      Number(item.totals.line_total) +
                        Number(item.totals.line_total_tax),
                      item.totals.currency_minor_unit,
                    )}
                  </p>
                </div>
                <div className="mt-3 flex items-center gap-3">
                  <label className="sr-only" htmlFor={`qty-${item.key}`}>
                    Quantity
                  </label>
                  <input
                    id={`qty-${item.key}`}
                    type="number"
                    min={item.quantity_limits.minimum}
                    max={item.quantity_limits.maximum}
                    value={item.quantity}
                    onChange={(e) =>
                      void updateItem(item.key, Number(e.target.value) || 1)
                    }
                    className="w-16 border border-mountain/25 bg-sand px-2 py-1 font-serif"
                  />
                  <button
                    type="button"
                    onClick={() => void removeItem(item.key)}
                    className="font-display text-sm tracking-[0.14em] text-mountain/60 hover:text-earth"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
      <aside className="h-fit border border-mountain/15 bg-sand p-6">
        <h2 className="font-display text-3xl">Order notes</h2>
        <FreeShippingBar itemTotalMinor={itemsInclTax} minorUnit={minor} />
        <dl className="mt-6 space-y-2 font-serif">
          <div className="flex justify-between">
            <dt>Subtotal</dt>
            <dd>{formatMinor(itemsInclTax, minor)}</dd>
          </div>
          <div className="flex justify-between text-mountain/70">
            <dt>Shipping</dt>
            <dd>
              {Number(totals?.total_shipping)
                ? formatMinor(
                    Number(totals?.total_shipping) +
                      Number(totals?.total_shipping_tax ?? 0),
                    minor,
                  )
                : "Calculated at checkout"}
            </dd>
          </div>
          <div className="flex justify-between border-t border-mountain/15 pt-3 font-display text-2xl tracking-[0.06em]">
            <dt>Total</dt>
            <dd>{formatMinor(totals?.total_price ?? "0", minor)}</dd>
          </div>
        </dl>
        <p className="mt-6 font-serif text-sm leading-relaxed text-mountain/70">
          {COPY.shippingFree}. {COPY.shippingUnder} 30-day returns. Packed in
          George.
        </p>
        <PaymentTrust compact />
        <a
          href={`${WOO_URL.replace(/\/$/, "")}/checkout`}
          className="mt-4 block bg-earth px-6 py-3 text-center font-display text-lg tracking-[0.18em] text-sand hover:bg-mountain"
        >
          Checkout
        </a>
        <p className="mt-3 font-serif text-sm text-mountain/65">
          Secure payment is completed on outeniquabound.com. Your cart is held
          by the WooCommerce Store API.
        </p>
        <Link
          href="/shop"
          className="mt-4 inline-block font-display tracking-[0.16em] text-forest hover:text-earth"
        >
          Continue shopping
        </Link>
      </aside>
    </div>
  );
}
