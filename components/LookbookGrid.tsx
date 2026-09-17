import Image from "next/image";
import Link from "next/link";
import type { LookbookFrameResolved } from "@/lib/lookbook";

export function LookbookGrid({
  frames,
  compact = false,
}: {
  frames: LookbookFrameResolved[];
  compact?: boolean;
}) {
  if (!frames.length) return null;

  return (
    <div
      className={`grid gap-8 ${compact ? "sm:grid-cols-2" : ""}`}
    >
      {frames.map((frame) => (
        <article
          key={frame.id}
          className={`grid gap-4 ${compact ? "" : "md:grid-cols-2 md:items-center md:gap-8"}`}
        >
          <div className="relative z-0 aspect-[4/5] overflow-hidden">
            <Image
              src={frame.src}
              alt={frame.title}
              fill
              sizes={
                compact
                  ? "(min-width: 1024px) 50vw, 100vw"
                  : "(min-width: 768px) 50vw, 100vw"
              }
              className="object-cover"
              style={
                frame.objectPosition
                  ? { objectPosition: frame.objectPosition }
                  : undefined
              }
            />
            <div className="absolute inset-0 bg-gradient-to-t from-mountain/70 via-transparent to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-4 text-sand">
              <p className="stamp border-sand/50 text-sand">{frame.kicker}</p>
              <h3 className="mt-3 font-display text-3xl tracking-[0.08em]">
                {frame.title}
              </h3>
            </div>
          </div>
          <div className={compact ? "" : "md:py-4"}>
            <p className="font-serif leading-relaxed text-mountain/75">
              {frame.note}
            </p>
            <ul className="mt-4 space-y-2">
              {frame.items.map((item) => {
                const confirmed = item.slug === frame.confirmedSlug;
                return (
                  <li key={item.slug}>
                    <Link
                      href={`/product/${item.slug}`}
                      className="group flex items-baseline justify-between gap-3 border border-mountain/15 px-3 py-2 hover:border-earth"
                    >
                      <span>
                        <span className="font-display text-lg tracking-[0.08em]">
                          {item.name}
                        </span>
                        {confirmed ? (
                          <span className="ml-2 stamp text-forest">In the frame</span>
                        ) : null}
                      </span>
                      {item.price ? (
                        <span className="shrink-0 font-serif text-sm text-earth">
                          {item.price}
                        </span>
                      ) : null}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </article>
      ))}
    </div>
  );
}
