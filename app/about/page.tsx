import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ABOUT_STORY, BRAND_STORY, COPY } from "@/lib/constants";
import { PlanetCommit } from "@/components/PlanetCommit";
import { STICKERS, StickerStamp } from "@/components/StickerStamp";
import { aboutHero, aboutSideStill, storyImages } from "@/lib/product-imagery";

export const metadata: Metadata = {
  title: "About",
  description:
    "Outeniqua Bound was born in the Outeniqua Mountains — dirtbag gear packed in George.",
};

const FIELD_NOTES = [
  {
    kicker: "Place",
    title: "Under yellowwood",
    body: "Tea-coloured rivers. King proteas in the ditch. The Outeniquas sit above George and they don’t perform for anyone — you just start walking.",
  },
  {
    kicker: "Practice",
    title: "Bound to movement",
    body: "Dirtbag gear is meant to get dirty. Used, fixed, shared, used again. Wild places aren’t for show. They’re for living in.",
  },
  {
    kicker: "Pack",
    title: "From Saagmeul Street",
    body: "Hoodies, tees, buffs, socks named for the ground: Summit, Contour, Geelhout, Keurberg, Fynbos, Moonrise, Coastline. Packed here. Worn on the pass.",
  },
];

export default function AboutPage() {
  const stills = storyImages().slice(0, 3);

  return (
    <div>
      <section className="relative min-h-[70svh] w-full overflow-hidden bg-mountain text-sand">
        <Image
          src={aboutHero()}
          alt="Night camp on the hill"
          fill
          priority
          className="object-cover opacity-60"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-mountain via-mountain/40 to-transparent" />
        <div className="relative mx-auto flex min-h-[70svh] max-w-6xl flex-col justify-end px-4 pb-14 md:px-6">
          <p className="stamp text-sun">Field origin · George, SA</p>
          <h1 className="mt-4 font-display text-6xl leading-none md:text-8xl">
            Start where you are
          </h1>
        </div>
      </section>

      <section className="relative isolate mx-auto grid max-w-6xl gap-10 overflow-visible px-4 py-16 md:grid-cols-[1.1fr_0.9fr] md:px-6">
        <StickerStamp
          src={STICKERS.outeniquaBound}
          className="absolute right-6 top-6 hidden md:block"
          rotate={-7}
          size={118}
        />
        <StickerStamp
          src={STICKERS.sevenPasses}
          className="absolute right-6 top-24 hidden lg:block"
          rotate={10}
          size={104}
        />
        <div>
          <p className="stamp text-earth">The ground</p>
          <h2 className="mt-3 font-display text-5xl">Born in the Outeniquas</h2>
          <p className="mt-6 font-serif text-lg leading-relaxed text-mountain/85">
            {BRAND_STORY}
          </p>
          {ABOUT_STORY.map((para) => (
            <p
              key={para.slice(0, 24)}
              className="mt-4 font-serif text-lg leading-relaxed text-mountain/85"
            >
              {para}
            </p>
          ))}
          <p className="mt-6 font-serif text-xl italic text-mountain/80">
            Because not every outing is big. Most of them aren’t.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/shop"
              className="inline-block bg-earth px-6 py-3 font-display tracking-[0.18em] text-sand hover:bg-mountain"
            >
              {COPY.ctaShop}
            </Link>
            <Link
              href="/second-summit"
              className="inline-block border border-mountain/25 px-6 py-3 font-display tracking-[0.18em] hover:border-earth hover:text-earth"
            >
              {COPY.ctaSecond}
            </Link>
          </div>
        </div>
        <div className="relative z-0 min-h-[420px] overflow-hidden">
          <Image
            src={aboutSideStill()}
            alt="Gear on the hill"
            fill
            className="object-cover"
            sizes="40vw"
          />
        </div>
      </section>

      <section className="bg-forest py-16 text-sand">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 md:grid-cols-3 md:px-6">
          {[
            {
              k: "Place",
              v: "Born in the Outeniqua Mountains. Packed from George, Western Cape.",
            },
            {
              k: "Practice",
              v: "Gear should be used, fixed, shared, and used again. Wild places are for living in.",
            },
            {
              k: "Promise",
              v: "Free shipping over R999. Second Summit for circular gear at Trail Kiosk.",
            },
          ].map((item) => (
            <div key={item.k} className="border border-sand/20 p-6">
              <p className="font-display text-sm tracking-[0.22em] text-sun">
                {item.k}
              </p>
              <p className="mt-3 font-serif text-lg leading-relaxed">{item.v}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-y border-mountain/10 bg-sand">
        <div className="mx-auto max-w-6xl px-4 py-10 md:px-6">
          <p className="stamp text-earth">The 1%</p>
          <div className="mt-4 max-w-3xl">
            <PlanetCommit note />
          </div>
        </div>
      </section>

      {stills.length ? (
        <section className="relative isolate mx-auto max-w-6xl overflow-visible px-4 py-16 md:px-6">
          <StickerStamp
            src={STICKERS.leakyDam}
            className="absolute right-2 top-10 hidden md:block"
            rotate={9}
            size={110}
          />
          <StickerStamp
            src={STICKERS.dizzyHeights}
            className="absolute left-3 bottom-10 hidden lg:block"
            rotate={-10}
            size={108}
          />
          <StickerStamp
            src={STICKERS.apieSwaai}
            className="absolute right-10 bottom-28 hidden lg:block"
            rotate={6}
            size={100}
          />
          <StickerStamp
            src={STICKERS.yellowWood}
            className="absolute left-[28%] top-6 hidden xl:block"
            rotate={-7}
            size={112}
            opacity={0.95}
          />
          <p className="stamp text-forest">From the field</p>
          <h2 className="mt-3 font-display text-5xl">Notes from the ridge</h2>
          <div className="mt-10 space-y-16">
            {FIELD_NOTES.map((note, index) => {
              const src = stills[index];
              if (!src) return null;
              const reverse = index % 2 === 1;
              return (
                <article
                  key={note.title}
                  className="grid items-center gap-8 md:grid-cols-2"
                >
                  <div
                    className={`relative z-0 aspect-[4/5] overflow-hidden ${reverse ? "md:order-2" : ""}`}
                  >
                    <Image
                      src={src}
                      alt={note.title}
                      fill
                      sizes="(min-width: 768px) 50vw, 100vw"
                      className="object-cover"
                    />
                  </div>
                  <div className={reverse ? "md:order-1" : ""}>
                    <p className="stamp text-earth">{note.kicker}</p>
                    <h3 className="mt-3 font-display text-4xl md:text-5xl">
                      {note.title}
                    </h3>
                    <p className="mt-4 font-serif text-lg leading-relaxed text-mountain/85">
                      {note.body}
                    </p>
                  </div>
                </article>
              );
            })}
          </div>
        </section>
      ) : null}
    </div>
  );
}
