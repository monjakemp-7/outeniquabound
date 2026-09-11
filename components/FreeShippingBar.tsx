import { formatMinor } from "@/lib/money";
import { shippingProgress } from "@/lib/money";

export function FreeShippingBar({
  itemTotalMinor,
  minorUnit = 2,
}: {
  itemTotalMinor: number;
  minorUnit?: number;
}) {
  const { remaining, pct, qualified } = shippingProgress(itemTotalMinor);

  return (
    <div className="border border-mountain/15 bg-sand px-4 py-3">
      <div className="flex items-center justify-between gap-3">
        <p className="font-display text-sm tracking-[0.16em]">
          {qualified
            ? "Free shipping unlocked"
            : `${formatMinor(remaining, minorUnit)} to free shipping`}
        </p>
        <span className="stamp text-forest">R999</span>
      </div>
      <div className="mt-2 h-1.5 overflow-hidden bg-mountain/10">
        <div
          className="h-full bg-earth transition-all"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
