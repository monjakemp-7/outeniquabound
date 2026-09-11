import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Size guide",
  description:
    "A starting fit for Outeniqua Bound hoodies and tees. Buffs are one size; socks follow the size on the pair.",
};

const TOPS = [
  { size: "XS", chest: "86–91", length: "66" },
  { size: "S", chest: "91–96", length: "69" },
  { size: "M", chest: "96–101", length: "72" },
  { size: "L", chest: "101–106", length: "74" },
  { size: "XL", chest: "106–111", length: "76" },
  { size: "XXL", chest: "111–117", length: "78" },
];

export default function SizeGuidePage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-14 md:px-6">
      <p className="stamp text-forest">Fit notes</p>
      <h1 className="mt-3 font-display text-6xl md:text-7xl">Size guide</h1>
      <p className="mt-5 font-serif text-lg leading-relaxed text-mountain/80">
        A starting point, not a promise. Hoodies and tees are cut to move.
        If you’re between sizes, take the larger one. Unsure? Write us or
        ask at Trail Kiosk, George.
      </p>

      <section className="mt-12">
        <h2 className="font-display text-4xl">Hoodies &amp; tees</h2>
        <p className="mt-3 font-serif text-mountain/75">
          Body measurements in centimetres. Chest is around the fullest part.
        </p>
        <div className="mt-6 overflow-x-auto border border-mountain/15">
          <table className="w-full min-w-[20rem] text-left font-serif">
            <thead className="bg-mountain text-sand">
              <tr>
                <th className="px-4 py-3 font-display text-sm tracking-[0.16em]">
                  Size
                </th>
                <th className="px-4 py-3 font-display text-sm tracking-[0.16em]">
                  Chest (cm)
                </th>
                <th className="px-4 py-3 font-display text-sm tracking-[0.16em]">
                  Length (cm)
                </th>
              </tr>
            </thead>
            <tbody>
              {TOPS.map((row) => (
                <tr key={row.size} className="border-t border-mountain/10">
                  <td className="px-4 py-3 font-display tracking-[0.12em]">
                    {row.size}
                  </td>
                  <td className="px-4 py-3">{row.chest}</td>
                  <td className="px-4 py-3">{row.length}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-3 font-serif text-sm text-mountain/60">
          Placeholder chart while we lock factory measurements. Use it as a
          steer, then check the garment notes on each product.
        </p>
      </section>

      <section className="mt-12 grid gap-6 md:grid-cols-2">
        <div className="border border-mountain/15 p-6">
          <p className="stamp text-earth">Buffs</p>
          <h2 className="mt-3 font-display text-3xl">One size</h2>
          <p className="mt-3 font-serif leading-relaxed text-mountain/80">
            Buffs are OS — stretch fabric, worn as a neck, wrap, or visor.
            No size picker on those pieces.
          </p>
        </div>
        <div className="border border-mountain/15 p-6">
          <p className="stamp text-sky">Socks</p>
          <h2 className="mt-3 font-display text-3xl">As marked</h2>
          <p className="mt-3 font-serif leading-relaxed text-mountain/80">
            Socks follow the size on the pair (and on the product page). If
            you’re between foot sizes, go up.
          </p>
        </div>
      </section>

      <Link
        href="/shop"
        className="mt-12 inline-block bg-mountain px-6 py-3 font-display tracking-[0.18em] text-sand hover:bg-earth"
      >
        Back to the field kit
      </Link>
    </div>
  );
}
