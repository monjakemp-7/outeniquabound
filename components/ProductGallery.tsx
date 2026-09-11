"use client";

import Image from "next/image";
import { useState } from "react";
import type { ProductImage } from "@/lib/product-imagery";

export function ProductGallery({
  images,
  name,
}: {
  images: ProductImage[];
  name: string;
}) {
  const [active, setActive] = useState(0);
  const current = images[active] ?? images[0];

  if (!current) {
    return (
      <div className="flex aspect-square items-center justify-center bg-mountain/10 font-display tracking-[0.2em] text-mountain/40">
        No image
      </div>
    );
  }

  return (
    <div>
      <div className="relative aspect-[4/5] overflow-hidden bg-sand sm:aspect-square">
        <Image
          src={current.src}
          alt={current.alt || name}
          fill
          priority
          sizes="(min-width: 768px) 50vw, 100vw"
          className="object-cover"
        />
        {current.kind === "lifestyle" ? (
          <span className="absolute left-3 top-3 stamp bg-sand/90 text-mountain">
            On the trail
          </span>
        ) : null}
      </div>
      {images.length > 1 ? (
        <div className="mt-3 grid grid-cols-5 gap-2">
          {images.slice(0, 6).map((image, index) => (
            <button
              key={image.src}
              type="button"
              onClick={() => setActive(index)}
              className={`relative aspect-square overflow-hidden border ${
                index === active ? "border-earth" : "border-transparent"
              }`}
            >
              <Image
                src={image.src}
                alt=""
                fill
                sizes="80px"
                className="object-cover"
              />
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
