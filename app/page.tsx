import Image from "next/image";
import Link from "next/link";
import { ProductGrid } from "@/components/ProductCard";
import { STICKERS, StickerStamp } from "@/components/StickerStamp";
import { ASSETS, COPY, HOME_PATHS } from "@/lib/constants";
import {
  categoryTileSrc,
  heroPoster,
  lookbookFrames,
  originStill,
} from "@/lib/product-imagery";
import { getFeaturedProducts } from "@/lib/woo";

export default async function HomePage() {
  const featured = await getFeaturedProducts();
  const lookbook = lookbookFrames();

  return (
    <div>
      <section className="hero-bleed text-sand">
        <video
          autoPlay
          muted
          loop
          playsInline
          poster={heroPoster()}
          aria-hidden
        >
          <source src={ASSETS.video} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-t from-mountain via-mountain/35 to-mountain/15" />
        <div className="relative mx-auto flex min-h-[100svh] max-w-6xl flex-col justify-end px-4 pb-16 pt-28 md:px-6">
          <p className="stamp w-fit text-sun">{COPY.heroKicker}</p>
          <h1 className="mt-5 max-w-4xl font-display text-[18vw] leading-[0.82] tracking-[0.04em] sm:text-[7.5rem] md:text-[9rem]">
            {COPY.heroLine1}
            <br />
            {COPY.heroLine2}
          </h1>
          <p className="mt-6 max-w-xl font-serif text-xl text-sand/85">
            {COPY.heroSupport}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/shop"
              className="bg-earth px-6 py-3 font-display text-lg tracking-[0.18em] text-sand hover:bg-sun hover:text-mountain"
            >
              {COPY.ctaShop}
            </Link>
            <Link
              href="/second-summit"
              className="border border-sand/40 px-6 py-3 font-display text-lg tracking-[0.18em] hover:border-sun hover:text-sun"
            >
              {COPY.ctaSecond}
            </Link>
          </div>
        </div>
      </section>

      <section className="border-y border-mountain/10 bg-sun">
        <p className="mx-auto max-w-6xl px-4 py-3 font-display text-lg tracking-[0.18em] text-mountain md:px-6">
          {COPY.trustBar}
        </p>
      </section>

      <section className="relative isolate overflow-visible bg-mountain py-20 text-sand">
        <StickerStamp
          src={STICKERS.outeniquaBound}
          className="absolute right-6 top-8 hidden lg:block"
          rotate={-9}
          size={120}
        />
        <div className="relative z-0 mx-auto max-w-6xl px-4 md:px-6">
          <p className="stamp text-sky">01 · Paths</p>
          <h2 className="mt-3 font-display text-5xl md:text-6xl">
            Shop the field
          </h2>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {HOME_PATHS.map((path) => (
              <Link
                key={path.label}
                href={path.href}
                className="group relative z-0 aspect-[4/3] overflow-hidden"
              >
                <Image
                  src={categoryTileSrc(path.image, path.fallback)}
                  alt={path.label}
                  fill
                  sizes="(min-width: 1024px) 25vw, 50vw"
                  className="object-cover transition duration-500 group-hover:scale-105"
                  style={
                    path.objectPosition
                      ? { objectPosition: path.objectPosition }
                      : undefined
                  }
                />
                <div className="absolute inset-0 bg-mountain/35 group-hover:bg-mountain/20" />
                <span className="absolute inset-x-0 bottom-0 p-4 font-display text-2xl tracking-[0.08em]">
                  {path.label}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="relative isolate mx-auto max-w-6xl overflow-visible px-4 py-20 md:px-6">
        <StickerStamp
          src={STICKERS.obMark}
          className="absolute -right-1 -top-2 hidden lg:block"
          rotate={-7}
          size={104}
        />
        <div className="relative z-0 mb-8 flex items-end justify-between gap-4">
          <div>
            <p className="stamp text-forest">02 · Collection</p>
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

      <section className="relative isolate mx-auto grid max-w-6xl items-center gap-10 overflow-visible px-4 py-20 md:grid-cols-2 md:px-6">
        <StickerStamp
          src={STICKERS.yellowWood}
          className="absolute left-4 top-16 hidden md:block"
          rotate={-11}
          size={120}
        />
        <div className="relative z-0 aspect-[4/5] overflow-hidden">
          <Image
            src={originStill()}
            alt="Outeniqua ridge at last light"
            fill
            sizes="50vw"
            className="object-cover"
          />
        </div>
        <div>
          <p className="stamp text-earth">03 · Origin</p>
          <h2 className="mt-3 font-display text-5xl leading-none md:text-6xl">
            Born in the Outeniquas
          </h2>
          <p className="mt-6 font-serif text-lg leading-relaxed text-mountain/85">
            {COPY.homeBrandBeat}
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

      {lookbook.length ? (
        <section className="relative isolate mx-auto max-w-6xl overflow-visible px-4 py-20 md:px-6">
          <StickerStamp
            src={STICKERS.georgePeak}
            className="absolute right-3 top-28 hidden md:block"
            rotate={12}
            size={112}
          />
          <StickerStamp
            src={STICKERS.pepsiPools}
            className="absolute left-3 bottom-8 hidden lg:block"
            rotate={-6}
            size={118}
          />
          <p className="stamp text-forest">05 · Worn</p>
          <h2 className="mt-3 font-display text-5xl md:text-6xl">
            On the hill
          </h2>
          <p className="mt-4 max-w-xl font-serif text-lg text-mountain/75">
            Pieces in the weather. Tap through to the piece or the shelf.
          </p>
          <div className="relative z-0 mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {lookbook.map((frame) => (
              <Link
                key={frame.href + frame.label}
                href={frame.href}
                className="group relative z-0 aspect-[4/5] overflow-hidden"
              >
                <Image
                  src={frame.src}
                  alt={frame.label}
                  fill
                  sizes="(min-width: 1024px) 33vw, 50vw"
                  className="object-cover transition duration-500 group-hover:scale-105"
                  style={
                    frame.objectPosition
                      ? { objectPosition: frame.objectPosition }
                      : undefined
                  }
                />
                <div className="absolute inset-0 bg-gradient-to-t from-mountain/70 via-transparent to-transparent" />
                <span className="absolute inset-x-0 bottom-0 p-4 font-display text-2xl tracking-[0.08em] text-sand">
                  {frame.label}
                </span>
              </Link>
            ))}
          </div>
        </section>
      ) : null}
    </div>
  );
}
