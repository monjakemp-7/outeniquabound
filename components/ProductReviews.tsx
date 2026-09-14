import type { PlaceholderReview } from "@/lib/reviews";

function Stars({ n }: { n: number }) {
  return (
    <span className="font-display tracking-[0.12em] text-earth" aria-label={`${n} out of 5`}>
      {"★".repeat(n)}
      <span className="text-mountain/25">{"★".repeat(5 - n)}</span>
    </span>
  );
}

export function ProductReviews({ reviews }: { reviews: PlaceholderReview[] }) {
  if (!reviews.length) return null;

  return (
    <section className="mt-12 border-t border-mountain/15 pt-10">
      <p className="stamp text-forest">Placeholder reviews</p>
      <h2 className="mt-3 font-display text-4xl">From the hill</h2>
      <p className="mt-2 max-w-xl font-serif text-mountain/70">
        Sample notes to show the pattern. These are not verified purchases.
        Real reviews will replace them.
      </p>
      <ul className="mt-8 grid gap-6 md:grid-cols-3">
        {reviews.map((review) => (
          <li key={`${review.name}-${review.body.slice(0, 24)}`} className="border border-mountain/15 p-5">
            <Stars n={review.stars} />
            <p className="mt-3 font-serif leading-relaxed text-mountain/85">
              “{review.body}”
            </p>
            <p className="mt-4 font-display text-sm tracking-[0.16em] text-mountain/60">
              {review.name} · {review.place}
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}
