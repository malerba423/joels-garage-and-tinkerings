# Joel's Garage & Tinkerings

A little gallery for photos and art: React + Vite, no backend.

```bash
npm install
npm run dev
```

## Adding a piece

1. Drop the image(s) in `public/art/` (export ~2000px on the long edge for a good balance of quality and size).
2. Add an entry to `src/data/pieces.ts` with a `slug`, `title` and an `images` list, plus whatever of `year`, `medium`, `size`, `notes`, `tags` you want.
   Each image needs its `src` and its `width`/`height` in pixels, and can have an optional `caption` ("Side view").
   The first image is the cover in the gallery grid. Pieces with more than one get a thumbnail strip on their page.

```ts
images: [
  { src: "/art/lamp-front.jpg", width: 3024, height: 4032 },
  { src: "/art/lamp-side.jpg", width: 3024, height: 4032, caption: "Side view" },
],
```

On a Mac, `sips -g pixelWidth -g pixelHeight public/art/*.jpg` prints the sizes.

Tags become filter buttons on the gallery automatically.

## Pages

- `/`: gallery grid, filterable by tag (`/?tag=painting`)
- `/piece/:slug`: detail page; click the image to zoom
- `/present`: full-screen slideshow. `/present?tag=painting` for just one tag, `?start=slug` to start on a piece.
  Keys: ← → / space step through every image, ↑ ↓ jump between pieces, **F** fullscreen, **P** auto-play, **I** toggle caption, **Esc** exit.

## Deploying

`npm run build` outputs a static site to `dist/`. Netlify, Vercel or Cloudflare Pages work out of the box;
set the SPA fallback (all routes → `index.html`) so direct links to `/piece/...` work.
