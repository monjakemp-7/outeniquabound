import type { Metadata } from "next";
import Link from "next/link";
import { QuizFlow } from "@/components/QuizFlow";
import { BASELINE_SKUS, isOnShelf } from "@/lib/baseline";
import { isGiftCard } from "@/lib/catalog";
import { cardPrimary } from "@/lib/product-imagery";
import { toShoppable } from "@/lib/shoppable";
import { getShopProducts } from "@/lib/woo";

export const metadata: Metadata = {
  title: "Find your kit",
  description:
    "Four questions. A small kit from the Outeniqua Bound shelf. Start where you are.",
};

export default async function QuizPage() {
  const catalog = await getShopProducts({ per_page: 100 });
  const allowed = new Set(BASELINE_SKUS.map((item) => item.slug));
  const shelf = catalog
    .filter(
      (product) =>
        allowed.has(product.slug) && isOnShelf(product) && !isGiftCard(product),
    )
    .map((product) => toShoppable(product, cardPrimary(product)?.src));

  return (
    <div className="mx-auto max-w-3xl px-4 pb-14 pt-20 md:px-6">
      <p className="stamp text-forest">Start where you are</p>
      <h1 className="mt-3 font-display text-6xl md:text-7xl">Find your kit</h1>
      <p className="mt-5 font-serif text-lg leading-relaxed text-mountain/80">
        Four questions. Two to four pieces from Baseline — what’s actually on
        the shelf. No hype. No fake drop.
      </p>
      <div className="mt-10">
        <QuizFlow shelf={shelf} />
      </div>
      <p className="mt-12 font-serif text-sm text-mountain/60">
        Want the long look instead?{" "}
        <Link href="/lookbook" className="text-earth hover:underline">
          On the hill
        </Link>
        .
      </p>
    </div>
  );
}
