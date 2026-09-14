"use client";

import Link from "next/link";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import type { WooCart } from "@/lib/types";

type CartContextValue = {
  cart: WooCart | null;
  loading: boolean;
  refresh: () => Promise<void>;
  addItem: (
    id: number,
    quantity?: number,
    extra?: Record<string, unknown>,
  ) => Promise<{ ok: boolean; message?: string; zeroPrice?: boolean }>;
  updateItem: (key: string, quantity: number) => Promise<void>;
  removeItem: (key: string) => Promise<void>;
};

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<WooCart | null>(null);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    try {
      const res = await fetch("/api/cart", { cache: "no-store" });
      const data = (await res.json()) as WooCart;
      setCart(data);
    } catch {
      /* keep last known cart */
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  const addItem = useCallback(
    async (id: number, quantity = 1, extra?: Record<string, unknown>) => {
      const res = await fetch("/api/cart/items", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, quantity, ...(extra ?? {}) }),
      });
      const data = await res.json();
      if (!res.ok) {
        return {
          ok: false,
          message: data?.message || "Could not add to cart",
        };
      }
      const cart = data as WooCart;
      setCart(cart);
      const added = cart.items?.find((item) => item.id === id);
      const line = Number(added?.prices?.price ?? added?.totals?.line_total ?? 1);
      return { ok: true, zeroPrice: Number.isFinite(line) && line <= 0 };
    },
    [],
  );

  const updateItem = useCallback(async (key: string, quantity: number) => {
    const res = await fetch("/api/cart/update", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ key, quantity }),
    });
    const data = await res.json();
    if (res.ok) setCart(data as WooCart);
  }, []);

  const removeItem = useCallback(async (key: string) => {
    const res = await fetch("/api/cart/remove", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ key }),
    });
    const data = await res.json();
    if (res.ok) setCart(data as WooCart);
  }, []);

  const value = useMemo(
    () => ({ cart, loading, refresh, addItem, updateItem, removeItem }),
    [cart, loading, refresh, addItem, updateItem, removeItem],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}

export function CartLink() {
  const { cart, loading } = useCart();
  const count = cart?.items_count ?? 0;
  const showCount = !loading && count > 0;
  return (
    <Link
      href="/cart"
      className="relative font-display text-[15px] tracking-[0.18em] text-sand hover:text-sun"
    >
      Cart
      {showCount ? (
        <span className="ml-1 text-earth">{String(count).padStart(2, "0")}</span>
      ) : null}
    </Link>
  );
}
