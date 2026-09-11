# Outeniqua Bound

Headless Next.js storefront for [Outeniqua Bound](https://outeniquabound.com) — outdoor clothing and circular gear from the Outeniqua Mountains.

The WooCommerce catalogue stays the system of record. This app is the Field Guide storefront: App Router, TypeScript, Tailwind, and the Store API.

## Stack

- Next.js App Router + TypeScript
- Tailwind CSS (Field Guide tokens)
- WooCommerce Store API (`NEXT_PUBLIC_WOO_URL`)
- Vercel (`outeniquaboundsite`)

## Field Guide

| Token | Hex |
| --- | --- |
| Mountain | `#192315` |
| Sand | `#FFF1E4` |
| Earth | `#E86028` |
| Sky | `#4DC2C4` |
| Sun | `#F8B11A` |
| Forest | `#546F3E` |

Headings: **Bebas Neue** (all caps). Body: **Fraunces** / **Libre Baskerville**.

## Routes

- `/` — Start where you are, featured products, categories, brand story, Second Summit, free shipping over R999
- `/shop` — Catalogue with category filters
- `/product/[slug]` — Product detail + add to cart
- `/about` — Brand story
- `/second-summit` — Circular gear programme
- `/cart` — Store API cart

## Local development

```bash
cp .env.example .env.local
npm install
npm run dev
```

`NEXT_PUBLIC_WOO_URL` defaults to `https://outeniquabound.com`. Product and lifestyle images are loaded from `outeniquabound.com/wp-content/uploads` (see `next.config.ts` `images.remotePatterns`).

```bash
npm run build
```
