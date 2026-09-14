import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { RANGES } from "@/lib/ranges";

export const metadata: Metadata = {
  title: "The collection architecture",
  description:
    "Four ranges: Technical, Baseline, SWYA, and Bound. Perform, represent, express, live.",
};

export default function RangesPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 pb-14 pt-20 md:px-6">
      <p className="stamp text-forest">The collection</p>
      <h1 className="mt-3 font-display text-6xl md:text-7xl">
        Four ranges
      </h1>
      <p className="mt-5 max-w-2xl font-serif text-lg leading-relaxed text-mountain/80">
        PERFORM · REPRESENT · EXPRESS · LIVE. Baseline is on the shelf now.
        SWYA, Bound, and Technical are coming into the architecture — not
        pretend products with a buy button.
      </p>
      <div className="mt-12 grid gap-6 md:grid-cols-2">
        {RANGES.map((range) => (
          <Link
            key={range.slug}
            href={range.href}
            className="group grid overflow-hidden border border-mountain/15 md:grid-cols-[0.9fr_1.1fr]"
          >
            <div className="relative aspect-[4/5] min-h-[220px]">
              <Image
                src={range.image}
                alt={range.imageAlt}
                fill
                sizes="(min-width: 768px) 25vw, 100vw"
                className="object-cover transition duration-500 group-hover:scale-105"
              />
            </div>
            <div className="flex flex-col justify-between p-6">
              <div>
                <p className="stamp text-earth">{range.verb}</p>
                <h2 className="mt-3 font-display text-4xl">{range.name}</h2>
                <p className="mt-1 font-display text-sm tracking-[0.16em] text-mountain/50">
                  {range.role}
                </p>
                <p className="mt-4 font-serif leading-relaxed text-mountain/80">
                  {range.summary}
                </p>
              </div>
              <p className="mt-6 font-display text-sm tracking-[0.16em] text-earth">
                {range.live ? "On the shelf →" : "Coming into the architecture →"}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
