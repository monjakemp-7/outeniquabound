import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ASSETS, BRAND_STORY, LIFESTYLE } from "@/lib/constants";

export const metadata: Metadata = {
  title: "About",
  description:
    "Outeniqua Bound was born in the Outeniqua Mountains — gear for living in wild places.",
};

export default function AboutPage() {
  return (
    <div>
      <section className="relative min-h-[60vh] overflow-hidden bg-mountain text-sand">
        <Image
          src={ASSETS.heroStill}
          alt="Outeniqua landscape"
          fill
          priority
          className="object-cover opacity-60"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-mountain via-mountain/40 to-transparent" />
        <div className="relative mx-auto flex min-h-[60vh] max-w-6xl flex-col justify-end px-4 pb-14 md:px-6">
          <p className="stamp text-sun">Field origin</p>
          <h1 className="mt-4 font-display text-6xl leading-none md:text-8xl">
            Start where you are
          </h1>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-10 px-4 py-16 md:grid-cols-[1.1fr_0.9fr] md:px-6">
        <div>
          <h2 className="font-display text-5xl">Local adventures</h2>
          <p className="mt-6 font-serif text-lg leading-relaxed text-mountain/85">
            {BRAND_STORY}
          </p>
          <p className="mt-6 font-serif text-lg leading-relaxed text-mountain/85">
            We make clothing that looks like it already has a few summits in it
            — tees, hoodies, buffs, and socks named for the ground that raised
            us: Summit, Contour, Geelhout, Keurberg, Fynbos, Moonrise,
            Coastline. Nothing flashy. Nothing performing. Just honest pieces
            worn soft from the first time.
          </p>
          <Link
            href="/shop"
            className="mt-8 inline-block bg-earth px-6 py-3 font-display tracking-[0.18em] text-sand hover:bg-mountain"
          >
            Shop the range
          </Link>
        </div>
        <div className="relative min-h-[420px] overflow-hidden">
          <Image
            src={LIFESTYLE[0]}
            alt="Outeniqua Bound on the trail"
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
              v: "Free shipping over R999. Second Summit for circular kit at Trail Kiosk.",
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

      <section className="mx-auto max-w-6xl px-4 py-16 md:px-6">
        <h2 className="font-display text-5xl">From the field</h2>
        <div className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-3">
          {LIFESTYLE.slice(1, 7).map((src) => (
            <div key={src} className="relative aspect-[4/5] overflow-hidden">
              <Image
                src={src}
                alt="Lifestyle photograph"
                fill
                sizes="33vw"
                className="object-cover"
              />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
