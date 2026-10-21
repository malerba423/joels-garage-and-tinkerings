// Photo prep for public/art.
//
//   npm run thumbs   Makes a small copy of each photo in public/art/thumbs/ for the gallery
//                    grid and thumbnail strip. Runs on its own before `dev` and `build`.
//   npm run photos   Run after adding new photos: shrinks any that are oversized or still carry
//                    camera metadata (GPS location included), then prints each new photo's
//                    width/height for pieces.ts.
import { mkdir, readdir, rename, stat } from "node:fs/promises";
import { join } from "node:path";
import sharp from "sharp";

const ART = "public/art";
const THUMBS = join(ART, "thumbs");
const LONG_SIDE = 2400;
// Grid cards crop to a square around 360px wide, so 720px covers 2x screens.
const THUMB_SHORT_SIDE = 720;

const photos = (await readdir(ART)).filter((f) => /\.jpe?g$/i.test(f));

if (process.argv[2] === "thumbs") {
  await mkdir(THUMBS, { recursive: true });
  let made = 0;
  for (const f of photos) {
    const src = join(ART, f);
    const out = join(THUMBS, f);
    const existing = await stat(out).catch(() => null);
    if (existing && existing.mtimeMs >= (await stat(src)).mtimeMs) continue;
    await sharp(src)
      .rotate()
      .resize(THUMB_SHORT_SIDE, THUMB_SHORT_SIDE, { fit: "outside", withoutEnlargement: true })
      .jpeg({ quality: 78, progressive: true, mozjpeg: true })
      .toFile(out);
    made++;
  }
  console.log(`thumbs: ${made} made, ${photos.length - made} up to date`);
} else {
  for (const f of photos) {
    const src = join(ART, f);
    const meta = await sharp(src).metadata();
    const oversized = Math.max(meta.width, meta.height) > LONG_SIDE;
    if (!oversized && !meta.exif) continue;
    // .rotate() applies the camera's orientation to the pixels; output carries no metadata.
    const { width, height } = await sharp(src)
      .rotate()
      .resize(LONG_SIDE, LONG_SIDE, { fit: "inside", withoutEnlargement: true })
      .jpeg({ quality: 82, progressive: true, mozjpeg: true })
      .toFile(`${src}.tmp`);
    await rename(`${src}.tmp`, src);
    console.log(`{ src: "/art/${f}", width: ${width}, height: ${height} },`);
  }
}
