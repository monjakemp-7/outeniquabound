import Link from "next/link";
import { PaymentTrust } from "./PaymentTrust";
import { isGiftCard } from "@/lib/catalog";
import { COPY } from "@/lib/constants";
import type { WooProduct } from "@/lib/types";

export function ProductTrust({ product }: { product: WooProduct }) {
  const gift = isGiftCard(product);
  return (
    <div>
      <ul className="mt-5 space-y-1.5 font-serif text-sm text-mountain/70">
        <li>
          <Link href="/shipping" className="underline decoration-mountain/25 underline-offset-4 hover:text-earth">
            {COPY.shippingFree}
          </Link>
        </li>
        <li>{COPY.shippingUnder}</li>
        <li>
          <Link href="/returns" className="underline decoration-mountain/25 underline-offset-4 hover:text-earth">
            30-day returns
          </Link>
        </li>
        {gift ? null : (
          <li>
            <Link href="/size-guide" className="underline decoration-mountain/25 underline-offset-4 hover:text-earth">
              Size guide
            </Link>
          </li>
        )}
        <li>Packed in George · Second Summit when you’re done.</li>
      </ul>
      <PaymentTrust />
    </div>
  );
}
