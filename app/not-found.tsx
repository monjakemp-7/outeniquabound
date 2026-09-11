import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-24 text-center">
      <p className="stamp text-earth">Off the map</p>
      <h1 className="mt-4 font-display text-6xl">Page not found</h1>
      <p className="mt-4 font-serif text-lg text-mountain/70">
        This trail peters out. Start where you are.
      </p>
      <Link
        href="/"
        className="mt-8 inline-block bg-mountain px-6 py-3 font-display tracking-[0.18em] text-sand"
      >
        Home
      </Link>
    </div>
  );
}
