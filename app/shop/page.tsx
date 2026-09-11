import type { Metadata } from "next";
import Link from "next/link";
import { ProductGrid } from "@/components/ProductCard";
import { SHOP_FILTERS, SHOP_GROUPS } from "@/lib/constants";
import { getCategories, getProducts } from "@/lib/woo";

export const metadata: Metadata = {
  title: "Shop",
  description: "Hoodies, tees, buffs, socks, and hydration from Outeniqua Bound.",
};

export default async function ShopPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; group?: string }>;
}) {
  const { category, group } = await searchParams;
  const categories = await getCategories();
  const groupSlugs = group ? SHOP_GROUPS[group] : undefined;

  let products;
  if (groupSlugs) {
    const allowed = new Set(groupSlugs);
    products = (await getProducts({ per_page: 100 })).filter((p) =>
      p.categories.some((c) => allowed.has(c.slug)),
    );
  } else if (category) {
    const categoryId = categories.find((c) => c.slug === category)?.id;
    products = await getProducts({
      per_page: 100,
      ...(categoryId ? { category: categoryId } : { category }),
    });
  } else {
    products = await getProducts({ per_page: 100 });
  }

  const activeSlug = category ?? "";
  const activeGroup = group ?? "";
  const match = categories.find((c) => c.slug === category);

  return (
    <div className="mx-auto max-w-6xl px-4 py-14 md:px-6">
      <p className="stamp text-forest">Field store</p>
      <h1 className="mt-3 font-display text-6xl md:text-7xl">Shop</h1>
      <p className="mt-4 max-w-2xl font-serif text-lg text-mountain/75">
        Honest kit for the Outeniquas and everywhere you take them. Free
        shipping over R999.
      </p>
      <div className="mt-8 flex flex-wrap gap-2">
        {SHOP_FILTERS.map((filter) => {
          const href = filter.group
            ? `/shop?group=${filter.group}`
            : filter.slug
              ? `/shop?category=${filter.slug}`
              : "/shop";
          const selected = filter.group
            ? activeGroup === filter.group
            : !activeGroup && activeSlug === (filter.slug ?? "");
          return (
            <Link
              key={filter.label}
              href={href}
              className={`border px-3 py-1.5 font-display text-sm tracking-[0.14em] ${
                selected
                  ? "border-earth bg-earth text-sand"
                  : "border-mountain/20 hover:border-mountain"
              }`}
            >
              {filter.label}
            </Link>
          );
        })}
      </div>
      {match?.description ? (
        <p className="mt-6 max-w-3xl font-serif text-mountain/80">
          {match.description}
        </p>
      ) : null}
      <div className="mt-10">
        <ProductGrid products={products} />
      </div>
    </div>
  );
}
