import Image from "next/image";
import Link from "next/link";
import { PlanetCommit } from "@/components/PlanetCommit";
import { CONTACT, SOCIAL } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="mt-auto bg-mountain text-sand">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 md:grid-cols-4 md:px-6">
        <div className="md:col-span-2">
          <div className="flex items-center gap-3">
            <Image
              src="/logo.png"
              alt=""
              width={48}
              height={48}
              className="h-12 w-12 rounded-full bg-sand object-contain"
            />
            <p className="font-display text-3xl tracking-[0.08em]">
              Outeniqua Bound
            </p>
          </div>
          <p className="mt-4 max-w-md font-serif text-lg leading-relaxed text-sand/80">
            Start where you are. Gear packed in George — bound to the
            Outeniquas, not to polish.
          </p>
          <div className="mt-5 max-w-md text-sand/85 [&_.stamp]:border-sand/50">
            <PlanetCommit tone="sand" />
          </div>
          <p className="mt-4 stamp text-sun">Free shipping over R999</p>
        </div>
        <div>
          <p className="font-display text-sm tracking-[0.22em] text-sky">
            Field notes
          </p>
          <ul className="mt-3 space-y-2 font-serif">
            <li>
              <Link href="/shop" className="hover:text-sun">
                Shop
              </Link>
            </li>
            <li>
              <Link href="/quiz" className="hover:text-sun">
                Kit quiz
              </Link>
            </li>
            <li>
              <Link href="/lookbook" className="hover:text-sun">
                Lookbook
              </Link>
            </li>
            <li>
              <Link href="/ranges" className="hover:text-sun">
                Ranges
              </Link>
            </li>
            <li>
              <Link href="/about" className="hover:text-sun">
                About
              </Link>
            </li>
            <li>
              <Link href="/second-summit" className="hover:text-sun">
                Second Summit
              </Link>
            </li>
            <li>
              <Link href="/size-guide" className="hover:text-sun">
                Size guide
              </Link>
            </li>
            <li>
              <Link href="/shipping" className="hover:text-sun">
                Shipping
              </Link>
            </li>
            <li>
              <Link href="/returns" className="hover:text-sun">
                Returns
              </Link>
            </li>
            <li>
              <Link href="/product/gift-card" className="hover:text-sun">
                Gift card
              </Link>
            </li>
            <li>
              <Link href="/cart" className="hover:text-sun">
                Cart
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <p className="font-display text-sm tracking-[0.22em] text-sky">
            Trail kiosk
          </p>
          <p className="mt-3 font-serif text-sand/80">{CONTACT.address}</p>
          <p className="mt-2 font-serif">
            <a href={`tel:${CONTACT.phone.replace(/\s/g, "")}`} className="hover:text-sun">
              {CONTACT.phone}
            </a>
          </p>
          <p className="font-serif">
            <a href={`mailto:${CONTACT.email}`} className="hover:text-sun">
              {CONTACT.email}
            </a>
          </p>
          <div className="mt-4 flex gap-4 font-display text-sm tracking-[0.18em]">
            <a href={SOCIAL.instagram} target="_blank" rel="noreferrer" className="hover:text-sun">
              Instagram
            </a>
            <a href={SOCIAL.facebook} target="_blank" rel="noreferrer" className="hover:text-sun">
              Facebook
            </a>
          </div>
        </div>
      </div>
      <div className="border-t border-sand/15 px-4 py-4 text-center font-display text-xs tracking-[0.2em] text-sand/55">
        © {new Date().getFullYear()} Outeniqua Bound · George, Western Cape
      </div>
    </footer>
  );
}
