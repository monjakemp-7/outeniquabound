import Image from "next/image";
import Link from "next/link";
import { productName } from "@/lib/html";
import { formatWooPrice } from "@/lib/money";
import { cardPrimary } from "@/lib/product-imagery";
import type { WooProduct } from "@/lib/types";

export function ProductCard({ product }: { product: WooProduct }) {
  const image = cardPrimary(product);
  const name = productName(product.name);

  return (
    <Link href={`/product/${product.slug}`} className="group block">
      <div className="relative aspect-[4/5] overflow-hidden bg-mountain/10">
        {image ? (
          <Image
            src={image.src}
            alt={image.alt || name}
            fill
            sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition duration-500 group-hover:scale-[1.03]"
          />
        ) : (
          <div className="flex h-full items-center justify-center font-display tracking-[0.2em] text-mountain/40">
            No image
          </div>
        )}
        <span className="absolute left-3 top-3 stamp bg-sand/90 text-mountain">
          {image?.kind === "lifestyle" ? "On the trail" : "Field kit"}
        </span>
      </div>
      <div className="mt-3 flex items-baseline justify-between gap-3">
        <h3 className="font-display text-xl leading-none tracking-[0.06em]">
          {name}
        </h3>
        <p className="shrink-0 font-serif text-sm text-earth">
          {formatWooPrice(product.prices)}
        </p>
      </div>
    </Link>
  );
}

export function ProductGrid({ products }: { products: WooProduct[] }) {
  if (!products.length) {
    return (
      <p className="font-serif text-lg text-mountain/70">
        The shelf is quiet right now. Check back after the next ridge.
      </p>
    );
  }

  return (
    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
