import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ASSETS } from "@/lib/constants";
import {
  STICKERS,
  StickerStamp,
  stickerIfPresent,
} from "@/components/StickerStamp";

export const metadata: Metadata = {
  title: "Second Summit",
  description:
    "Give gear a second life. Outeniqua Bound’s circular system for selling and buying trail kit in George.",
};

const GRADES = [
  {
    color: "Green",
    swatch: "bg-[#3FA34D]",
    title: "Almost new",
    copy: "Minimal use, excellent condition, maximum life left. Ready for big missions.",
  },
  {
    color: "Blue",
    swatch: "bg-sky",
    title: "Still solid",
    copy: "Used but well cared for. Reliable, fully functional, and trail-worthy. Real value.",
  },
  {
    color: "Orange",
    swatch: "bg-earth",
    title: "Adventure worn",
    copy: "Shows its miles. More cosmetic wear, still useful and capable. Priced to make adventure accessible.",
  },
];

const STEPS = [
  "Bring it in at the Trail Kiosk pod (George) or a selected expo booth.",
  "We assess condition, functionality, and safety.",
  "We grade it Green / Blue / Orange — simple, transparent, honest.",
  "We clean it, prep it, and put it back into the system.",
  "You Second your gear, or someone else buys it for their next turn.",
];

export default function SecondSummitPage() {
  return (
    <div>
      <section className="relative min-h-[70vh] overflow-hidden bg-mountain text-sand">
        <Image
          src={ASSETS.secondSummitHeader}
          alt="Second Summit"
          fill
          priority
          className="object-cover opacity-70"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-mountain via-mountain/50 to-mountain/20" />
        <div className="relative mx-auto flex min-h-[70vh] max-w-6xl flex-col justify-end px-4 pb-16 md:px-6">
          <Image
            src={stickerIfPresent(STICKERS.secondSummit) ?? ASSETS.secondSummitLogo}
            alt="Second Summit"
            width={160}
            height={200}
            className="mb-6 h-32 w-auto object-contain drop-shadow-sm"
            unoptimized
          />
          <h1 className="max-w-4xl font-display text-5xl leading-none md:text-7xl">
            Give gear a second life. Earn another turn.
          </h1>
          <p className="mt-5 max-w-2xl font-serif text-xl text-sand/85">
            Second Summit is Outeniqua Bound’s circular gear system — a trusted
            way to keep good outdoor equipment out of landfills and back where
            it belongs: on the trail.
          </p>
        </div>
      </section>

      <section className="relative mx-auto max-w-6xl px-4 py-16 md:px-6">
        <StickerStamp
          src={STICKERS.secondSummit}
          className="absolute right-4 -top-4 hidden md:block"
          rotate={-8}
          size={96}
        />
        <StickerStamp
          src={STICKERS.outeniquaBound}
          className="absolute -left-2 bottom-4 hidden lg:block"
          rotate={7}
          size={80}
        />
        <StickerStamp
          src={STICKERS.obMark}
          className="absolute right-24 bottom-8 hidden lg:block"
          rotate={10}
          size={64}
          opacity={0.95}
        />
        <div className="grid gap-10 md:grid-cols-2">
          <div>
            <p className="stamp text-earth">Second your gear</p>
            <h2 className="mt-3 font-display text-4xl">Sell it back to us</h2>
            <p className="mt-4 font-serif text-lg leading-relaxed text-mountain/80">
              Outdoor gear is built to go far — not to end up in a bin. We
              assess every item, grade it clearly, and rehome it with someone
              who’ll put it to work again. Drop-offs currently in person only —
              Trail Kiosk pod (George) or selected expo booths. The mountain
              belongs to more people when good kit stays in circulation.
            </p>
          </div>
          <div>
            <p className="stamp text-sky">Buy for your Second Summit</p>
            <h2 className="mt-3 font-display text-4xl">Kit with life left</h2>
            <p className="mt-4 font-serif text-lg leading-relaxed text-mountain/80">
              Choose graded gear with plenty of life left. A smarter buy for
              you, a lighter footprint for the hills. Less new production.
              Less waste. More days out. Second your gear, or find pre-loved
              at Trail Kiosk. We’ll roll out an online Second Summit system in
              due course.
            </p>
            <p className="mt-4 font-serif text-lg italic text-mountain/75">
              Because not every outing is big. Most of them aren’t.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-mountain py-16 text-sand">
        <div className="mx-auto max-w-6xl px-4 md:px-6">
          <h2 className="font-display text-5xl">The grades</h2>
          <p className="mt-3 max-w-xl font-serif text-sand/75">
            One quick look, and you’ll know what you’re getting. All items are
            checked before they hit the shelf.
          </p>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {GRADES.map((grade) => (
              <div key={grade.color} className="border border-sand/20 p-6">
                <span className={`inline-block h-3 w-3 rounded-full ${grade.swatch}`} />
                <p className="mt-3 font-display text-2xl tracking-[0.1em]">
                  {grade.color}
                </p>
                <p className="font-serif text-sun">{grade.title}</p>
                <p className="mt-3 font-serif text-sand/80">{grade.copy}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative mx-auto max-w-6xl px-4 py-16 md:px-6">
        <StickerStamp
          src={STICKERS.pepsiPools}
          className="absolute right-6 -top-2 hidden md:block"
          rotate={-11}
          size={70}
        />
        <StickerStamp
          src={STICKERS.tonnelbos}
          className="absolute left-0 bottom-6 hidden lg:block"
          rotate={8}
          size={74}
        />
        <h2 className="font-display text-5xl">Step by step</h2>
        <ol className="mt-8 grid gap-4 md:grid-cols-5">
          {STEPS.map((step, i) => (
            <li key={step} className="border border-mountain/15 p-4">
              <p className="font-display text-3xl text-earth">
                {String(i + 1).padStart(2, "0")}
              </p>
              <p className="mt-2 font-serif text-sm leading-relaxed">{step}</p>
            </li>
          ))}
        </ol>
        <Link
          href="/shop"
          className="mt-10 inline-block bg-mountain px-6 py-3 font-display tracking-[0.18em] text-sand hover:bg-earth"
        >
          Shop new kit while you wait
        </Link>
      </section>
    </div>
  );
}
