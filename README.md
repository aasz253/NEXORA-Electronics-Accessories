# NEXORA — Electronics & Accessories

Premium e-commerce website for **NEXORA Electronics & Accessories** (Kenya).

A dark-green, tech-forward 3D storefront built with Next.js — featuring a
three.js hero, product catalog, category browsing, quick-view, cart, live
search, and WhatsApp ordering.

## Tech Stack

- **Next.js 16** (App Router, Turbopack) + React 19 + TypeScript
- **Tailwind CSS v4** (design tokens in `@theme`)
- **Framer Motion** — scroll reveals, micro-interactions, page transitions
- **Three.js / React Three Fiber / drei** — 3D hero scene built from real product photos
- **lucide-react** — icons
- ESLint (flat config) for linting

## Getting Started

```bash
npm install        # install dependencies
npm run dev        # start dev server → http://localhost:3000
```

Production build & preview:

```bash
npm run build      # typechecks + builds static site
npm start          # serve the production build
```

Useful scripts:

| Command          | Description                         |
| ---------------- | ----------------------------------- |
| `npm run dev`    | Start the development server        |
| `npm run build`  | Create an optimized production build|
| `npm start`      | Serve the production build          |
| `npm run lint`   | Run ESLint                          |

> Note: if `npm run build` ever crashes with `Bus error (core dumped)`, the
> native `@next/swc` binary is likely corrupted (truncated download). Fix with
> `rm -rf node_modules package-lock.json && npm install`.

## Site Configuration

All business settings are centralized in **`src/lib/site.ts`**:

- **WhatsApp ordering** — `whatsappNumber` (`254757678341`), `whatsappDisplay`,
  and `ctaMessage` (pre-filled order message).
- **Business placeholders** — `location`, `email`, `hours`, and `social` links
  are clearly marked placeholders; replace them with the real details.
- **Navigation links** — `navLinks` (Home / Shop / Categories / About / Contact).

## Managing Products

Products live in **`src/data/products.ts`** (a single source of truth);
categories in **`src/data/categories.ts`**.

To add/update a product:

1. Drop the photo into `public/products/` (or an SVG into `public/illustrations/`).
2. Add an entry to `products.ts` using the helpers:
   - `P("my-photo.jpeg")` → resolves to `/products/my-photo.jpeg`
   - `ILLU("speaker.svg")` → resolves to `/illustrations/speaker.svg`
3. Set `price` to `null` to show **"Price on request"**, or set a `number` for a display price.
4. `availability` is `"in stock"` or `"on order"`.

Product & category pages are statically generated — new entries are picked up
automatically on the next `npm run build`.

## Routes

| Route                 | Description                                        |
| --------------------- | -------------------------------------------------- |
| `/`                   | Home — 3D hero, categories, featured, spotlights   |
| `/shop`               | Full catalog with sort, filters & search           |
| `/categories`         | All categories                                     |
| `/categories/[slug]`  | Category listing                                   |
| `/product/[id]`       | Product detail (gallery, specs, WhatsApp order)    |
| `/about`              | About / why NEXORA                                 |
| `/contact`            | Contact form → WhatsApp                            |
| `/cart`               | Cart (orders go through WhatsApp)                  |
| `/sitemap.xml`        | Auto-generated sitemap                             |
| `/robots.txt`         | Robots file                                        |

## Design

- **Palette** — dark-green backgrounds (`ink` tokens) with
  yellow/gold accents (`electric`), defined in `src/app/globals.css`
  under `@theme`. Editing those values re-themes the whole site.
- **WhatsApp green** (`#25D366`) is kept for WhatsApp CTAs.
- Fonts (Inter + Space Grotesk) are self-hosted via `next/font` — no external
  font requests, the site works fully offline after build.

## Deployment

The site builds to **100% static output** — deploy anywhere (Vercel, Netlify,
a simple static host, or S3). `next build` prerenders every product and
category page, including `/sitemap.xml`.