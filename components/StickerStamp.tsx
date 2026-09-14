import Image from "next/image";
import { assetOnDisk } from "@/lib/product-imagery";

export const STICKERS = {
  secondSummit: "/images/stickers/second-summit.png",
  outeniquaBound: "/images/stickers/outeniqua-bound.png",
  yellowWood: "/images/stickers/yellow-wood.png",
  apieSwaai: "/images/stickers/apie-swaai.png",
  tonnelbos: "/images/stickers/tonnelbos.png",
  pepsiPools: "/images/stickers/pepsi-pools.png",
  sevenPasses: "/images/stickers/7-passes.png",
  keurkop: "/images/stickers/keurkop.png",
  georgePeak: "/images/stickers/george-peak.png",
  vicBay: "/images/stickers/vic-bay.png",
  craddockPass: "/images/stickers/craddock-pass.png",
  leakyDam: "/images/stickers/leaky-dam.png",
  losberg: "/images/stickers/losberg.png",
  dizzyHeights: "/images/stickers/dizzy-heights.png",
  kaaimans: "/images/stickers/kaaimans.png",
  vanDalEns: "/images/stickers/van-dal-ens.png",
  vensterberg: "/images/stickers/vensterberg.png",
  craddockPeak: "/images/stickers/craddock-peak.png",
  tierkop: "/images/stickers/tierkop.png",
  montaguPass: "/images/stickers/montagu-pass.png",
  obMark: "/images/stickers/ob-mark.png",
} as const;

export function stickerIfPresent(src: string) {
  return assetOnDisk(src) ? src : undefined;
}

export function StickerStamp({
  src,
  className = "",
  rotate = -8,
  size = 112,
  opacity = 1,
}: {
  src: string;
  className?: string;
  rotate?: number;
  size?: number;
  opacity?: number;
}) {
  if (!assetOnDisk(src)) return null;
  return (
    <Image
      src={src}
      alt=""
      width={size}
      height={size}
      aria-hidden
      draggable={false}
      unoptimized
      className={`pointer-events-none z-20 select-none object-contain ${className}`}
      style={{ transform: `rotate(${rotate}deg)`, opacity }}
    />
  );
}

const PLACE_STAMPS: { test: RegExp; src: string }[] = [
  { test: /george.?peak/i, src: STICKERS.georgePeak },
  { test: /keurberg|keurkop/i, src: STICKERS.keurkop },
  { test: /geelhout|yellow.?wood/i, src: STICKERS.yellowWood },
  { test: /fynbos/i, src: STICKERS.yellowWood },
  { test: /coastline|vic.?bay/i, src: STICKERS.vicBay },
  { test: /summit/i, src: STICKERS.secondSummit },
  { test: /montagu/i, src: STICKERS.montaguPass },
  { test: /craddock/i, src: STICKERS.craddockPass },
];

export function placeStampForProduct(name: string, slug: string) {
  const hay = `${name} ${slug}`;
  const hit = PLACE_STAMPS.find((row) => row.test.test(hay));
  return hit?.src;
}
