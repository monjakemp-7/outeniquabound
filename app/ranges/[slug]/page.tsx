import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { RANGES, RANGE_SLUGS, SWYA_DROPS, rangeBySlug } from "@/lib/ranges";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return RANGE_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const range = rangeBySlug(slug);
  if (!range) return { title: "Range" };
  return {
    title: range.name,
    description: range.summary,
  };
}

export default async function RangePage({ params }: Props) {
  const { slug } = await params;
  const range = rangeBySlug(slug);
  if (!range) notFound();

  return (
    <div>
      <section className="relative min-h-[50svh] overflow-hidden bg-mountain text-sand">
        <Image
          src={range.image}
          alt={range.imageAlt}
          fill
          priority
          className="object-cover opacity-55"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-mountain via-mountain/45 to-transparent" />
        <div className="relative mx-auto flex min-h-[50svh] max-w-6xl flex-col justify-end px-4 pb-12 md:px-6">
          <p className="stamp text-sun">{range.verb}</p>
          <h1 className="mt-4 font-display text-6xl leading-none md:text-8xl">
            {range.name}
          </h1>
          <p className="mt-3 max-w-xl font-serif text-xl text-sand/85">
            {range.summary}
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-4 py-16 md:px-6">
        <p className="stamp text-earth">{range.role}</p>
        {range.story.map((para) => (
          <p
            key={para.slice(0, 28)}
            className="mt-5 font-serif text-lg leading-relaxed text-mountain/85"
          >
            {para}
          </p>
        ))}
        <ul className="mt-8 flex flex-wrap gap-2">
          {range.traits.map((trait) => (
            <li key={trait} className="stamp text-forest">
              {trait}
            </li>
          ))}
        </ul>

        {range.slug === "swya" ? (
          <div className="mt-12">
            <p className="stamp text-sky">Coming drop</p>
            <h2 className="mt-3 font-display text-4xl">Not on the shelf yet</h2>
            <div className="mt-6 grid gap-4">
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
          </div>
        ) : null}

        {!range.live && range.slug !== "swya" ? (
          <p className="mt-10 border border-mountain/15 p-5 font-serif text-mountain/75">
            Coming into the architecture. No products to buy here yet — we
            won’t invent a shelf.
          </p>
        ) : null}

        <div className="mt-10 flex flex-wrap gap-3">
          {range.live ? (
            <Link
              href={range.shopHref}
              className="bg-earth px-6 py-3 font-display tracking-[0.18em] text-sand hover:bg-mountain"
            >
              Shop Baseline
            </Link>
          ) : (
            <Link
              href="/shop?range=baseline"
              className="bg-mountain px-6 py-3 font-display tracking-[0.18em] text-sand hover:bg-earth"
            >
              Shop Baseline for now
            </Link>
          )}
          <Link
            href="/ranges"
            className="border border-mountain/25 px-6 py-3 font-display tracking-[0.18em] hover:border-earth"
          >
            All four ranges
          </Link>
        </div>
      </section>

      <nav className="mx-auto flex max-w-6xl flex-wrap gap-3 px-4 pb-16 md:px-6">
        {RANGES.map((item) => (
          <Link
            key={item.slug}
            href={item.href}
            className={`border px-3 py-1.5 font-display text-sm tracking-[0.14em] ${
              item.slug === range.slug
                ? "border-earth bg-earth text-sand"
                : "border-mountain/20 hover:border-mountain"
            }`}
          >
            {item.name}
          </Link>
        ))}
      </nav>
    </div>
  );
}
