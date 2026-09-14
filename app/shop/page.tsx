import type { Metadata } from "next";
import Link from "next/link";
import { ProductGrid } from "@/components/ProductCard";
import { SHOP_FILTERS, SHOP_GROUPS } from "@/lib/constants";
import { RANGES, SWYA_DROPS, rangeBySlug } from "@/lib/ranges";
import { getCategories, getProducts } from "@/lib/woo";

export const metadata: Metadata = {
  title: "Shop",
  description: "Hoodies, tees, buffs, socks, and hydration from Outeniqua Bound.",
};

export default async function ShopPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; group?: string; range?: string }>;
}) {
  const { category, group, range } = await searchParams;
  const selectedRange = range ? rangeBySlug(range) : undefined;
  const comingRange = selectedRange && !selectedRange.live;

  const categories = await getCategories();
  const groupSlugs = group ? SHOP_GROUPS[group] : undefined;

  let products = comingRange ? [] : await getProducts({ per_page: 100 });
  if (!comingRange && groupSlugs) {
    const allowed = new Set(groupSlugs);
    products = products.filter((p) =>
      p.categories.some((c) => allowed.has(c.slug)),
    );
  } else if (!comingRange && category) {
    const categoryId = categories.find((c) => c.slug === category)?.id;
    products = await getProducts({
      per_page: 100,
      ...(categoryId ? { category: categoryId } : { category }),
    });
  }

  const activeSlug = category ?? "";
  const activeGroup = group ?? "";
  const match = categories.find((c) => c.slug === category);

  return (
    <div className="mx-auto max-w-6xl px-4 pb-14 pt-20 md:px-6">
      <p className="stamp text-forest">Field store</p>
      <h1 className="mt-3 font-display text-6xl md:text-7xl">Shop</h1>
      <p className="mt-4 max-w-2xl font-serif text-lg text-mountain/75">
        Honest gear for the Outeniquas and everywhere you take them. Free
        shipping over R999. What you can buy now is Baseline.
      </p>

      <p className="mt-8 font-display text-sm tracking-[0.18em] text-mountain/50">
        Range
      </p>
      <div className="mt-2 flex flex-wrap gap-2">
        {RANGES.map((item) => {
          const selected = selectedRange
            ? selectedRange.slug === item.slug
            : item.slug === "baseline";
          return (
            <Link
              key={item.slug}
              href={item.live ? item.shopHref : `/shop?range=${item.slug}`}
              className={`border px-3 py-1.5 font-display text-sm tracking-[0.14em] ${
                selected
                  ? "border-earth bg-earth text-sand"
                  : "border-mountain/20 hover:border-mountain"
              }`}
            >
              {item.name}
            </Link>
          );
        })}
      </div>

      {!comingRange ? (
        <>
          <p className="mt-8 font-display text-sm tracking-[0.18em] text-mountain/50">
            Pieces
          </p>
          <div className="mt-2 flex flex-wrap gap-2">
            {SHOP_FILTERS.map((filter) => {
              const href = filter.group
                ? `/shop?group=${filter.group}`
                : filter.slug
                  ? `/shop?category=${filter.slug}`
                  : "/shop?range=baseline";
              const selected = filter.group
                ? activeGroup === filter.group
                : !activeGroup &&
                  (filter.slug
                    ? activeSlug === filter.slug
                    : !activeSlug);
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
        </>
      ) : null}

      {match?.description && !comingRange ? (
        <p className="mt-6 max-w-3xl font-serif text-mountain/80">
          {match.description}
        </p>
      ) : null}

      {comingRange ? (
        <div className="mt-10 max-w-3xl">
          <p className="stamp text-earth">{selectedRange.verb}</p>
          <h2 className="mt-3 font-display text-4xl">{selectedRange.name}</h2>
          <p className="mt-4 font-serif text-lg leading-relaxed text-mountain/80">
            {selectedRange.summary} Coming into the architecture — nothing
            here is for sale yet.
          </p>
          {selectedRange.slug === "swya" ? (
            <div className="mt-8 grid gap-4">
              {SWYA_DROPS.map((drop) => (
                <div key={drop.title} className="border border-mountain/15 p-5">
                  <p className="font-display text-2xl">{drop.title}</p>
                  <p className="mt-2 font-serif text-mountain/75">{drop.line}</p>
                  <p className="mt-3 font-display text-xs tracking-[0.16em] text-mountain/45">
                    Coming drop · not for sale
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p className="mt-6 border border-mountain/15 p-5 font-serif text-mountain/75">
              No fake shelf. When {selectedRange.name} lands, it will show up
              here.
            </p>
          )}
          <Link
            href={selectedRange.href}
            className="mt-8 inline-block font-display tracking-[0.16em] text-earth hover:underline"
          >
            Read the {selectedRange.name} story →
          </Link>
        </div>
      ) : (
        <div className="mt-10">
          <ProductGrid products={products} />
        </div>
      )}
    </div>
  );
}
