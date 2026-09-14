"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { CartLink } from "./CartProvider";

const NAV = [
  { href: "/shop", label: "Shop" },
  { href: "/ranges", label: "Ranges" },
  { href: "/about", label: "About" },
  { href: "/second-summit", label: "Second Summit" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const overHero = pathname === "/";

  useEffect(() => {
    if (!overHero) {
      setScrolled(false);
      return;
    }
    const onScroll = () => setScrolled(window.scrollY > 32);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [overHero]);

  const headerClass = overHero
    ? `fixed inset-x-0 top-0 z-50 border-b text-sand ${
        scrolled
          ? "border-sand/15 bg-mountain"
          : "border-sand/10 bg-mountain/45 backdrop-blur-sm"
      }`
    : "sticky top-0 z-50 border-b border-sand/15 bg-mountain text-sand";

  return (
    <header className={headerClass}>
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 md:px-6">
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/logo.png"
            alt="Outeniqua Bound"
            width={40}
            height={40}
            className="h-10 w-10 rounded-full bg-sand object-contain"
            priority
          />
          <span className="font-display text-xl leading-none tracking-[0.12em] md:text-2xl">
            Outeniqua Bound
          </span>
        </Link>
        <nav className="hidden items-center gap-7 md:flex">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="font-display text-[15px] tracking-[0.18em] text-sand/90 hover:text-sun"
            >
              {item.label}
            </Link>
          ))}
          <CartLink />
        </nav>
        <button
          type="button"
          className="font-display text-sm tracking-[0.2em] md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label="Toggle menu"
        >
          {open ? "Close" : "Menu"}
        </button>
      </div>
      {open ? (
        <div className="border-t border-sand/15 bg-mountain px-4 py-4 md:hidden">
          <nav className="flex flex-col gap-3">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="font-display text-lg tracking-[0.16em]"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <span onClick={() => setOpen(false)}>
              <CartLink />
            </span>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
