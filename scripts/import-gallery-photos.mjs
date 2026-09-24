/**
 * One-off import of the owner's real before/after job photos into
 * public/images/gallery/. Source HEIC files come from the owner's Photos
 * export (paths below); re-run this if new photos replace them.
 *
 * sharp's bundled libheif can't decode this particular iPhone HEVC variant
 * ("Support for this compression format has not been built in"), so macOS's
 * own `sips` does the HEIC decode + rotate, and sharp does the final
 * resize/compress pass for consistent web output.
 *
 * These iPhone HEIC files have no EXIF orientation tag but store the pixel
 * data sideways, so each entry says how many degrees `sips` must rotate to
 * get it upright (confirmed visually before running this script).
 *
 * Requires macOS (for `sips`). Run: node scripts/import-gallery-photos.mjs
 */
import sharp from "sharp";
import { execFileSync } from "node:child_process";
import { mkdir, mkdtemp, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const outDir = path.join(root, "public", "images", "gallery");
const downloads = "/Users/paura/Downloads";

// `thumb: true` also renders a small `-thumb.jpg` variant — only needed for
// the three "before" shots used as selector cards in BeforeAfter.tsx; every
// "after" shot is only ever shown at slider size.
const jobs = [
  { src: "soft wash sujo.HEIC", out: "soft-wash-before.jpg", rotate: 90, thumb: true },
  { src: "soft wash limpo.HEIC", out: "soft-wash-after.jpg", rotate: 90 },
  {
    src: "Window cleaning sujo.HEIC",
    out: "window-cleaning-before.jpg",
    rotate: 0,
    thumb: true,
  },
  { src: "Window cleaning limpo.HEIC", out: "window-cleaning-after.jpg", rotate: 0 },
  {
    src: "Driveway pressure wash sujo.HEIC",
    out: "driveway-before.jpg",
    rotate: 90,
    thumb: true,
  },
  {
    src: "Driveway pressure wash sujo limpo.HEIC",
    out: "driveway-after.jpg",
    rotate: 90,
  },
];

// Static export (Cloudflare Pages) has no image-optimization server, so
// next/image can't generate responsive sizes on the fly — these pre-sized
// variants ARE the responsive sizes. 1400px comfortably covers the slider's
// largest on-screen size (~640px tall) at 2x retina; 480px covers the
// thumbnail cards (~300-380px wide) the same way.
const FULL_WIDTH = 1400;
const THUMB_WIDTH = 480;

async function main() {
  await mkdir(outDir, { recursive: true });
  const tmp = await mkdtemp(path.join(tmpdir(), "island-shine-gallery-"));

  try {
    for (const job of jobs) {
      const input = path.join(downloads, job.src);
      const decoded = path.join(tmp, job.out);
      const args = ["-s", "format", "jpeg", "-s", "formatOptions", "95"];
      if (job.rotate) args.push("--rotate", String(job.rotate));
      args.push(input, "--out", decoded);
      execFileSync("sips", args, { stdio: "pipe" });

      const output = path.join(outDir, job.out);
      await sharp(decoded)
        .resize({ width: FULL_WIDTH, withoutEnlargement: true })
        .jpeg({ quality: 78, mozjpeg: true })
        .toFile(output);
      console.log("wrote", path.relative(root, output));

      if (job.thumb) {
        const thumbOut = path.join(outDir, job.out.replace(/\.jpg$/, "-thumb.jpg"));
        await sharp(decoded)
          .resize({ width: THUMB_WIDTH, withoutEnlargement: true })
          .jpeg({ quality: 75, mozjpeg: true })
          .toFile(thumbOut);
        console.log("wrote", path.relative(root, thumbOut));
      }
    }
  } finally {
    await rm(tmp, { recursive: true, force: true });
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
