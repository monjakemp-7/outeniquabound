import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AddToCart } from "@/components/AddToCart";
import { ProductGallery } from "@/components/ProductGallery";
import { ProductGrid } from "@/components/ProductCard";
import { productName, stripHtml } from "@/lib/html";
import { formatWooPrice } from "@/lib/money";
import { getFeaturedProducts, getProductBySlug } from "@/lib/woo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) return { title: "Product" };
  return {
    title: productName(product.name),
    description: stripHtml(product.short_description || product.description),
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) notFound();

  const related = (await getFeaturedProducts())
    .filter((p) => p.id !== product.id)
    .slice(0, 4);
  const name = productName(product.name);

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 md:px-6">
      <p className="font-display text-sm tracking-[0.18em] text-forest">
        <Link href="/shop" className="hover:text-earth">
          Shop
        </Link>
        <span className="mx-2">/</span>
        {product.categories[0] ? productName(product.categories[0].name) : "Kit"}
      </p>
      <div className="mt-6 grid items-start gap-10 md:grid-cols-2">
        <ProductGallery images={product.images} name={name} />
        <div>
          <h1 className="font-display text-5xl leading-none md:text-6xl">
            {name}
          </h1>
          <p className="mt-4 font-serif text-2xl text-earth">
            {formatWooPrice(product.prices)}
          </p>
          {product.short_description ? (
            <div
              className="prose-field mt-6 font-serif text-lg leading-relaxed text-mountain/85"
              dangerouslySetInnerHTML={{ __html: product.short_description }}
            />
          ) : null}
          <div className="mt-8">
            <AddToCart product={product} />
          </div>
          {product.description ? (
            <div
              className="prose-field mt-10 border-t border-mountain/15 pt-8 font-serif leading-relaxed text-mountain/80"
              dangerouslySetInnerHTML={{ __html: product.description }}
            />
          ) : null}
        </div>
      </div>
      {related.length ? (
        <div className="mt-20">
          <h2 className="font-display text-4xl">Along the same trail</h2>
          <div className="mt-8">
            <ProductGrid products={related} />
          </div>
        </div>
      ) : null}
    </div>
  );
}
