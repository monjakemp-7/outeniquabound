import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Returns",
  description:
    "Placeholder returns window: 30 days, unused, tags on. Policy details to be confirmed.",
};

export default function ReturnsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 pb-14 pt-20 md:px-6">
      <p className="stamp text-forest">Policy details to be confirmed</p>
      <h1 className="mt-3 font-display text-6xl md:text-7xl">Returns</h1>
      <p className="mt-5 font-serif text-lg leading-relaxed text-mountain/80">
        Gear should be used. If it isn’t the right piece, send it back unused
        and we’ll sort it. This is a working note — the window and the
        paperwork may tighten.
      </p>

      <section className="mt-12">
        <h2 className="font-display text-4xl">Window</h2>
        <p className="mt-4 font-serif leading-relaxed text-mountain/80">
          30 days from delivery. Unworn, unwashed, tags on. Buffs and socks
          that have been on the trail stay with you.
        </p>
      </section>

      <section className="mt-12">
        <h2 className="font-display text-4xl">How to start</h2>
        <p className="mt-4 font-serif leading-relaxed text-mountain/80">
          Write{" "}
          <a className="text-earth hover:underline" href="mailto:support@outeniquabound.com">
            support@outeniquabound.com
          </a>{" "}
          with your order number, or bring the piece to Trail Kiosk, 1
          Saagmeul Street, George. We’ll tell you where to send it.
        </p>
      </section>

      <section className="mt-12">
        <h2 className="font-display text-4xl">Exchanges</h2>
        <p className="mt-4 font-serif leading-relaxed text-mountain/80">
          Size swaps in the same window, when stock allows. If the size is
          gone, we’ll refund and you can order again.
        </p>
      </section>

      <Link
        href="/shipping"
        className="mt-10 inline-block font-display tracking-[0.16em] text-earth hover:underline"
      >
        Shipping →
      </Link>
    </div>
  );
}
