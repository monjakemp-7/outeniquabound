import type { Metadata } from "next";
import { CartView } from "@/components/CartView";

export const metadata: Metadata = {
  title: "Cart",
  description: "Your Outeniqua Bound pack.",
};

export default function CartPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-14 md:px-6">
      <p className="stamp text-earth">The pack</p>
      <h1 className="mt-3 font-display text-6xl md:text-7xl">Cart</h1>
      <div className="mt-10">
        <CartView />
      </div>
    </div>
  );
}
