import { PAYMENTS } from "@/lib/payments";

export function PaymentTrust({ compact = false }: { compact?: boolean }) {
  return (
    <div className={compact ? "" : "mt-5"}>
      <p className="font-serif text-sm text-mountain/70">{PAYMENTS.line}</p>
      <ul className="mt-2 flex flex-wrap gap-2">
        {PAYMENTS.methods.map((method) => (
          <li key={method} className="stamp text-mountain/70">
            {method}
          </li>
        ))}
      </ul>
      {compact ? null : (
        <p className="mt-2 font-serif text-sm text-mountain/60">{PAYMENTS.till}</p>
      )}
    </div>
  );
}
