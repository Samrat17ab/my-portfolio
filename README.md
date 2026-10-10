# Samrat Lamsal — Portfolio

Live at **[samratlamsal24.com.np](https://samratlamsal24.com.np)**

A cinematic, motion-first personal portfolio — a scroll-driven procedural sunrise reveal for
the hero, a draggable physics-based project deck, scroll-linked reveals throughout, and a
fully worked "proof of thinking" section of estimation exercises with the math shown in the
open. Fully static, no backend.

## Tech stack

- **Next.js 16** (App Router, static export) + **TypeScript**
- **Tailwind CSS v4** (CSS-based theming, no `tailwind.config`)
- **Motion** (`motion/react`) for all animation
- Hand-built shadcn-style UI primitives (`components/ui/`)
- Deployed on **Cloudflare Pages**, DNS on Cloudflare

## Features

- **Procedural sunrise hero** — seeded RNG generates the torn-paper crack and mountain ridgeline,
  so the effect is deterministic across server and client renders. Scroll tears the title sheet
  in two and a mountain range rises behind it.
- **Draggable project deck** — physics-based drag with spring 3D tilt on pointer position, throw-
  and-settle on release. Falls back to a static grid under reduced motion.
- **Animated stat counters, parallax sections, magnetic buttons** throughout.
- **Certificate lightbox** — click a certification to view the actual certificate image inline,
  with a link out to the original source.
- **10 worked guesstimates** — full reasoning shown for each estimate, including the ones where
  the first pass was wrong.
- **`prefers-reduced-motion` respected everywhere** — every animated component has a static
  fallback that renders the end state instantly. No exceptions.

## Getting started

```bash
npm install
npm run dev
```

Visit `http://localhost:3000`.

```bash
npm run build   # static export — every route prerenders to out/
npm run lint     # eslint
```

## Project structure

- `app/` — landing page, `/work/[slug]` case-study routes, `/guesstimates`.
- `components/` — section components, the sunrise-reveal hero, the draggable project deck, and
  shadcn-style primitives in `components/ui/`.
- `lib/content.ts` — all copy and data, typed and centralized.
- `lib/motion-math.ts` — the seeded RNG and easing helpers the hero and project deck reuse.

## Blog

A blog at `/blog`, switched on or off with one line in `lib/blog/config.ts` (`BLOG_ENABLED`).
When off, the pages show "not found" and the nav link and homepage section disappear.

To write a post, copy `content/blog/_template.md` to a new file (the file name becomes the URL)
and write in Markdown. Every post needs a `category`: `product`, `findings`, `wins` or
`personal` (defined in `lib/blog/taxonomy.ts`). Keep `draft: true` while writing: drafts appear
in `npm run dev` but never in a production build. Old `/journal` links redirect to `/blog` via
`public/_redirects`.

## Deployment

Static export, deployed to Cloudflare Pages:

```bash
npm run build
npx wrangler pages deploy out --project-name=samrat-lamsal-portfolio
```

## License

Personal portfolio — content and copy are © Samrat Lamsal. Feel free to reference the code/
architecture for your own projects.
