import { COPY, ONE_PERCENT_URL } from "@/lib/constants";

export function PlanetCommit({
  tone = "mountain",
  note = false,
}: {
  tone?: "mountain" | "sand";
  note?: boolean;
}) {
  const link =
    tone === "sand"
      ? "text-sun underline decoration-sun/40 underline-offset-4 hover:decoration-sun"
      : "text-earth underline decoration-earth/40 underline-offset-4 hover:decoration-earth";

  return (
    <div>
      <p className="flex flex-wrap items-center gap-3 font-serif text-lg leading-relaxed">
        <span className="stamp shrink-0" aria-hidden>
          1%
        </span>
        <span>
          {COPY.onePercentLead}{" "}
          <a
            href={ONE_PERCENT_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={link}
          >
            1% for the Planet
          </a>
          .
        </span>
      </p>
      {note ? (
        <p className="mt-3 max-w-2xl font-serif text-[15px] leading-relaxed text-mountain/60">
          A simple 1% mark — not the official member badge. The commitment sits
          in the till while we walk the membership path.
        </p>
      ) : null}
    </div>
  );
}
