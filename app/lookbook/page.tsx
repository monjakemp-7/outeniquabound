import type { Metadata } from "next";
import Link from "next/link";
import { LookbookGrid } from "@/components/LookbookGrid";
import { resolveLookbook } from "@/lib/lookbook";
import { cardPrimary } from "@/lib/product-imagery";
import { getShopProducts } from "@/lib/woo";

export const metadata: Metadata = {
  title: "On the hill",
  description:
    "Shoppable outfits from Outeniqua Bound lifestyle stills — hoodie, buff, socks, tee. What’s on the shelf.",
};

export default async function LookbookPage() {
  const catalog = await getShopProducts({ per_page: 100 });
  const frames = resolveLookbook(catalog, (product) => cardPrimary(product)?.src);

  return (
    <div className="mx-auto max-w-6xl px-4 pb-14 pt-20 md:px-6">
      <p className="stamp text-forest">On the hill</p>
      <h1 className="mt-3 font-display text-6xl md:text-7xl">Lookbook</h1>
      <p className="mt-5 max-w-2xl font-serif text-lg leading-relaxed text-mountain/80">
        Pieces in the weather. Each frame sells a small kit from the shelf —
        not an orphan gallery. Where the photo is a confirmed garment, we say
        so.
      </p>
      <div className="mt-12">
        {frames.length ? (
          <LookbookGrid frames={frames} />
        ) : (
          <p className="font-serif text-lg text-mountain/70">
            The hill is quiet right now.{" "}
            <Link href="/shop" className="text-earth underline underline-offset-4">
              Shop Baseline
            </Link>
            .
          </p>
        )}
      </div>
      <div className="mt-12 flex flex-wrap gap-4">
        <Link
          href="/quiz"
          className="bg-earth px-6 py-3 font-display tracking-[0.18em] text-sand hover:bg-mountain"
        >
          Find your kit
        </Link>
        <Link
          href="/shop"
          className="font-display tracking-[0.16em] text-earth hover:underline"
        >
          Shop →
        </Link>
      </div>
    </div>
  );
}
