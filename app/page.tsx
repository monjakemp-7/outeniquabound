import Image from "next/image";
import Link from "next/link";
import { ProductGrid } from "@/components/ProductCard";
import {
  ASSETS,
  BRAND_STORY,
  HOME_CATEGORIES,
  LIFESTYLE,
} from "@/lib/constants";
import { getFeaturedProducts } from "@/lib/woo";

export default async function HomePage() {
  const featured = await getFeaturedProducts();

  return (
    <div>
      <section className="relative min-h-[88vh] overflow-hidden bg-mountain text-sand">
        <video
          className="absolute inset-0 h-full w-full object-cover opacity-70"
          autoPlay
          muted
          loop
          playsInline
          poster={ASSETS.videoPoster}
        >
          <source src={ASSETS.video} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-t from-mountain via-mountain/40 to-mountain/20" />
        <div className="relative mx-auto flex min-h-[88vh] max-w-6xl flex-col justify-end px-4 pb-16 pt-28 md:px-6">
          <p className="stamp w-fit text-sun">Field guide · George, SA</p>
          <h1 className="mt-5 max-w-4xl font-display text-[18vw] leading-[0.8] tracking-[0.02em] sm:text-[7.5rem] md:text-[9rem]">
            Start where
            <br />
            you are
          </h1>
          <p className="mt-6 max-w-xl font-serif text-xl text-sand/85">
            Clothing and kit shaped by ridgelines, fynbos, and the dirtbag
            instinct to keep good gear in the mountains.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/shop"
              className="bg-earth px-6 py-3 font-display text-lg tracking-[0.18em] text-sand hover:bg-sun hover:text-mountain"
            >
              Shop the range
            </Link>
            <Link
              href="/second-summit"
              className="border border-sand/40 px-6 py-3 font-display text-lg tracking-[0.18em] hover:border-sun hover:text-sun"
            >
              Second Summit
            </Link>
          </div>
        </div>
      </section>

      <section className="border-y border-mountain/10 bg-sun">
        <p className="mx-auto max-w-6xl px-4 py-3 font-display text-lg tracking-[0.18em] text-mountain md:px-6">
          Free shipping on orders over R999 · Packed in George · Built to be
          used, fixed, and used again
        </p>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-20 md:px-6">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <p className="stamp text-forest">01 · Kit</p>
            <h2 className="mt-3 font-display text-5xl md:text-6xl">
              Featured products
            </h2>
          </div>
          <Link
            href="/shop"
            className="hidden font-display tracking-[0.16em] text-earth md:inline hover:underline"
          >
            View all
          </Link>
        </div>
        <ProductGrid products={featured} />
      </section>

      <section className="bg-mountain py-20 text-sand">
        <div className="mx-auto max-w-6xl px-4 md:px-6">
          <p className="stamp text-sky">02 · Ground</p>
          <h2 className="mt-3 font-display text-5xl md:text-6xl">
            Shop by category
          </h2>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {HOME_CATEGORIES.map((cat) => (
              <Link
                key={cat.label}
                href={cat.href}
                className="group relative aspect-[4/3] overflow-hidden"
              >
                <Image
                  src={cat.image}
                  alt={cat.label}
                  fill
                  sizes="(min-width: 1024px) 25vw, 50vw"
                  className="object-cover transition duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-mountain/35 group-hover:bg-mountain/20" />
                <span className="absolute inset-x-0 bottom-0 p-4 font-display text-2xl tracking-[0.08em]">
                  {cat.label}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-20 md:grid-cols-2 md:px-6">
        <div className="relative aspect-[4/5] overflow-hidden">
          <Image
            src={ASSETS.midLifestyle}
            alt="Trail days in the Outeniquas"
            fill
            sizes="50vw"
            className="object-cover"
          />
        </div>
        <div>
          <p className="stamp text-earth">03 · Origin</p>
          <h2 className="mt-3 font-display text-5xl leading-none md:text-6xl">
            Local adventures
          </h2>
          <p className="mt-6 font-serif text-lg leading-relaxed text-mountain/85">
            {BRAND_STORY}
          </p>
          <Link
            href="/about"
            className="mt-8 inline-block bg-mountain px-6 py-3 font-display tracking-[0.18em] text-sand hover:bg-earth"
          >
            Read the story
          </Link>
        </div>
      </section>

      <section className="relative overflow-hidden">
        <div className="relative min-h-[520px]">
          <Image
            src={ASSETS.secondSummitHeader}
            alt="Second Summit"
            fill
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-mountain/55" />
          <div className="relative mx-auto flex min-h-[520px] max-w-6xl flex-col justify-end px-4 py-16 text-sand md:px-6">
            <p className="stamp text-sky">04 · Circular</p>
            <h2 className="mt-3 max-w-3xl font-display text-5xl leading-none md:text-7xl">
              Give gear a second life. Earn another turn.
            </h2>
            <p className="mt-5 max-w-xl font-serif text-lg text-sand/85">
              Second Summit keeps good outdoor equipment out of landfills and
              back on the trail — graded honestly, sold in person at Trail
              Kiosk, George.
            </p>
            <Link
              href="/second-summit"
              className="mt-8 inline-block w-fit bg-sun px-6 py-3 font-display tracking-[0.18em] text-mountain hover:bg-sand"
            >
              How it works
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-20 md:px-6">
        <p className="stamp text-forest">05 · On the ground</p>
        <h2 className="mt-3 font-display text-5xl md:text-6xl">Gallery</h2>
        <div className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-4">
          {LIFESTYLE.slice(0, 8).map((src) => (
            <div key={src} className="relative aspect-square overflow-hidden">
              <Image
                src={src}
                alt="Outeniqua Bound lifestyle"
                fill
                sizes="25vw"
                className="object-cover"
              />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
