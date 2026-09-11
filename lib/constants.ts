export const WOO_URL =
  process.env.NEXT_PUBLIC_WOO_URL ?? "https://outeniquabound.com";

export const SITE_NAME = "Outeniqua Bound";
export const FREE_SHIPPING_MINOR = 99900;
export const CART_COOKIE = "ob_cart_token";

export const SOCIAL = {
  instagram: "https://www.instagram.com/outeniquabound/",
  facebook: "https://www.facebook.com/profile.php?id=61590929294593",
};

export const CONTACT = {
  phone: "044 001 0005",
  email: "support@outeniquabound.com",
  address: "1 Saagmeul Street, George, 6529",
};

export const ASSETS = {
  logo: "https://outeniquabound.com/wp-content/uploads/2026/03/OB-Circle-Logo.png",
  video: "https://outeniquabound.com/wp-content/uploads/2026/05/Outeniqua-V4.mp4",
  videoPoster:
    "https://outeniquabound.com/wp-content/uploads/2026/05/ob-video-cover.webp",
  heroStill:
    "https://outeniquabound.com/wp-content/uploads/2026/03/OB-main-image-2.webp",
  midLifestyle:
    "https://outeniquabound.com/wp-content/uploads/2026/03/OB-HP-Mid.webp",
  secondSummitHeader:
    "https://outeniquabound.com/wp-content/uploads/2026/03/SS-Header-3.webp",
  secondSummitAlt:
    "https://outeniquabound.com/wp-content/uploads/2026/03/SS-Header-2.webp",
  secondSummitLogo:
    "https://outeniquabound.com/wp-content/uploads/2026/03/Second-Summit-Logo-PNG.png",
  swya: "https://outeniquabound.com/wp-content/uploads/2026/07/SWYA.png",
  hydration:
    "https://outeniquabound.com/wp-content/uploads/2026/05/OB-HYDRATION-CAT-NEW.webp",
  mensHoodies:
    "https://outeniquabound.com/wp-content/uploads/2026/05/Mens-hoodies-may.webp",
  mensTees:
    "https://outeniquabound.com/wp-content/uploads/2026/05/mens-shirts-may.webp",
  womensHoodies:
    "https://outeniquabound.com/wp-content/uploads/2026/05/womens-hoodies-may.webp",
  womensTees:
    "https://outeniquabound.com/wp-content/uploads/2026/05/OB-CAT-Womens-Shirts.webp",
  mensBuffs:
    "https://outeniquabound.com/wp-content/uploads/2026/05/OB-Cat-Mens-Buffs.webp",
  mensSocks:
    "https://outeniquabound.com/wp-content/uploads/2026/05/mens-socks.webp",
};

/** Field Guide voice. Observation, then invite. No hype, no “adventure awaits.” */
export const COPY = {
  heroKicker: "Field guide · George, Western Cape",
  heroLine1: "Start where",
  heroLine2: "you are",
  heroSupport:
    "Trail kit for Outeniqua days — from the first hill behind your house to the long ridge.",
  ctaShop: "Shop the field kit",
  ctaSecond: "Second Summit",
  trustBar:
    "Free SA shipping over R999 · Easy returns · Second Summit · George",
  homeBrandBeat:
    "Packed on Saagmeul Street in George. Named for the ground — Summit, Coastline, Fynbos, Keurberg. Dirtbag kit, meant to get dirty. Used, fixed, shared, used again. Second Summit keeps the good stuff on the trail.",
};

export const HOME_PATHS: {
  label: string;
  href: string;
  image: string;
  fallback?: string;
}[] = [
  {
    label: "Men",
    href: "/shop?category=men",
    image: "/images/lifestyle/mens-hoodie-summit.jpg",
    fallback: ASSETS.mensHoodies,
  },
  {
    label: "Women",
    href: "/shop?category=womens",
    image: "/images/lifestyle/womens-hoodie-coastline.jpg",
    fallback: ASSETS.womensHoodies,
  },
  {
    label: "Buffs & socks",
    href: "/shop?group=buffs-socks",
    image: ASSETS.mensBuffs,
  },
  {
    label: "Hydration",
    href: "/shop?category=hydration",
    image: ASSETS.hydration,
  },
];

export const LOOKBOOK_FRAMES: {
  label: string;
  href: string;
  image: string;
  fallback: string;
}[] = [
  {
    label: "Summit hoodie",
    href: "/product/ob00003-blac",
    image: "/images/lifestyle/mens-hoodie-summit.jpg",
    fallback: ASSETS.mensHoodies,
  },
  {
    label: "Coastline hoodie",
    href: "/product/ob00005-sand",
    image: "/images/lifestyle/womens-hoodie-coastline.jpg",
    fallback: ASSETS.womensHoodies,
  },
  {
    label: "Men’s tees",
    href: "/shop?category=t-shirts-clothing",
    image: "/images/lifestyle/mens-tee-dark.jpg",
    fallback: ASSETS.mensTees,
  },
  {
    label: "Women’s kit",
    href: "/shop?category=womens",
    image: "/images/lifestyle/womens-hoodie-ridge.jpg",
    fallback: ASSETS.midLifestyle,
  },
  {
    label: "Hydration",
    href: "/shop?category=hydration",
    image: ASSETS.hydration,
    fallback: ASSETS.hydration,
  },
  {
    label: "Buffs",
    href: "/shop?category=buffs",
    image: ASSETS.mensBuffs,
    fallback: ASSETS.mensBuffs,
  },
];

export const SHOP_GROUPS: Record<string, string[]> = {
  "buffs-socks": [
    "buffs",
    "socks",
    "buffs-accessories-womens",
    "socks-accessories-womens",
    "accessories",
    "accessories-womens",
  ],
};

export const SHOP_FILTERS: {
  label: string;
  slug?: string;
  group?: string;
}[] = [
  { label: "All", slug: "" },
  { label: "Men’s", slug: "men" },
  { label: "Women’s", slug: "womens" },
  { label: "Hoodies", slug: "hoodies" },
  { label: "T-Shirts", slug: "t-shirts-clothing" },
  { label: "Buffs & socks", group: "buffs-socks" },
  { label: "Hydration", slug: "hydration" },
];

export const BRAND_STORY = `Outeniqua Bound started in the Outeniquas above George — yellowwood shade, tea-coloured rivers, king proteas in the ditch. Proudly South African and dirtbag at heart: gear should be used, fixed, shared, and used again. Wild places aren’t for show. They’re for living in.`;

export const ABOUT_STORY = [
  "The Outeniquas sit above George and they don’t perform for anyone. You just start walking. Fynbos underfoot. A long ridge when you’re ready for it. The first hill behind the house counts.",
  "We pack from 1 Saagmeul Street: hoodies, tees, buffs, socks, bottles. Names from the ground — Summit, Traverse, Heritage, Coastline, Moonrise, Contour, Geelhout, Keurberg, Fynbos.",
  "Dirtbag kit is meant to get dirty. Second Summit at Trail Kiosk takes gear back, grades it honestly, and sends it out again. Circular on purpose. Bound to movement, not to polish.",
];
