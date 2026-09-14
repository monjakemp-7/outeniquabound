import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Shipping",
  description:
    "Free SA shipping over R999. Packed in George. Placeholder times while we confirm the final policy.",
};

export default function ShippingPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-14 md:px-6">
      <p className="stamp text-forest">Policy details to be confirmed</p>
      <h1 className="mt-3 font-display text-6xl md:text-7xl">Shipping</h1>
      <p className="mt-5 font-serif text-lg leading-relaxed text-mountain/80">
        Packed in George. Sent on from here — Garden Route, Cape Town, and
        the rest of South Africa. This page is a working note, not a locked
        legal wall. We’ll tighten the times as the bench confirms them.
      </p>

      <section className="mt-12">
        <h2 className="font-display text-4xl">What we ship</h2>
        <p className="mt-4 font-serif leading-relaxed text-mountain/80">
          Baseline pieces: hoodies, tees, buffs, socks, bottles. South Africa
          for now. If you need something sent further, write us.
        </p>
      </section>

      <section className="mt-12">
        <h2 className="font-display text-4xl">Cost</h2>
        <p className="mt-4 font-serif leading-relaxed text-mountain/80">
          Free SA shipping over R999. Under that, postage is added at checkout.
        </p>
      </section>

      <section className="mt-12">
        <h2 className="font-display text-4xl">From the bench</h2>
        <p className="mt-4 font-serif leading-relaxed text-mountain/80">
          Packed at Trail Kiosk, 1 Saagmeul Street, George. Parcels leave this
          bench. Some South African routes then move through a Cape Town DC.
          Garden Route and Cape Town metros usually see the shorter window.
        </p>
      </section>

      <section className="mt-12">
        <h2 className="font-display text-4xl">Times</h2>
        <p className="mt-4 font-serif leading-relaxed text-mountain/80">
          Metro runs — Cape Town, George, Garden Route — typically 2–5
          business days once a parcel leaves the bench. Regional routes take
          longer. Public holidays and weather on the pass can add a day.
        </p>
      </section>

      <p className="mt-12 font-serif text-mountain/70">
        Questions:{" "}
        <a className="text-earth hover:underline" href="mailto:support@outeniquabound.com">
          support@outeniquabound.com
        </a>{" "}
        or Trail Kiosk, George.
      </p>
      <Link
        href="/returns"
        className="mt-8 inline-block font-display tracking-[0.16em] text-earth hover:underline"
      >
        Returns →
      </Link>
    </div>
  );
}
