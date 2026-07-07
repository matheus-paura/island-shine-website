/**
 * One-off import of the owner's real logo (public/images/logo/) from the
 * source PNGs. Produces:
 *  - icon-square.png: just the island/palm mark, padded to a square on the
 *    logo's own navy background — used as the source for the site's
 *    favicon / apple touch icon (which need an opaque background).
 *  - icon-transparent.png: the same mark with no background, cropped from
 *    the owner's background-removed export — used inline in the header
 *    and footer so it sits directly on our navy without a hard box edge.
 *  - full-logo.png: icon + wordmark trimmed of empty canvas — used for the
 *    Open Graph / share image.
 *
 * Crop boundaries below were measured by scanning each source PNG for
 * non-background/non-transparent pixels (see conversation history) —
 * re-run the same measurement if the source logo files change.
 *
 * Run: node scripts/import-logo.mjs
 */
import sharp from "sharp";
import { mkdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const outDir = path.join(root, "public", "images", "logo");
const source = "/Users/paura/Downloads/ISLAND SHINE.PNG";
const transparentSource = "/Users/paura/Downloads/ISLAND SHINE-Photoroom.png";
const navy = { r: 6, g: 21, b: 53, alpha: 1 }; // sampled from the logo's own background

// Shared icon-only bounding box (mountain + palms, excludes the wordmark)
// measured on both source files — they share the same artwork/canvas.
const iconCrop = { left: 206, top: 292, width: 1562, height: 723 };

async function main() {
  await mkdir(outDir, { recursive: true });

  // Icon-only crop, padded to a square on navy (opaque — for favicons).
  await sharp(source)
    .extract(iconCrop)
    .resize({ width: 1600, height: 1600, fit: "contain", background: navy })
    .resize(1024, 1024)
    .png()
    .toFile(path.join(outDir, "icon-square.png"));
  console.log("wrote public/images/logo/icon-square.png");

  // Icon-only crop with transparent background (for header/footer).
  await sharp(transparentSource)
    .extract(iconCrop)
    .resize({ width: 1200, withoutEnlargement: true })
    .png()
    .toFile(path.join(outDir, "icon-transparent.png"));
  console.log("wrote public/images/logo/icon-transparent.png");

  // Full lockup (icon + wordmark), trimmed of empty canvas, for the OG image.
  await sharp(source)
    .extract({ left: 76, top: 292, width: 1850, height: 1275 })
    .png()
    .toFile(path.join(outDir, "full-logo.png"));
  console.log("wrote public/images/logo/full-logo.png");

  // App icon + apple touch icon, generated from the square icon crop.
  await sharp(path.join(outDir, "icon-square.png"))
    .resize(512, 512)
    .png()
    .toFile(path.join(root, "app", "icon.png"));
  console.log("wrote app/icon.png");

  await sharp(path.join(outDir, "icon-square.png"))
    .resize(180, 180)
    .png()
    .toFile(path.join(root, "app", "apple-icon.png"));
  console.log("wrote app/apple-icon.png");

  // Open Graph / social share image (1200x630): full logo centered on navy.
  const logo = await sharp(path.join(outDir, "full-logo.png"))
    .resize({ height: 560, withoutEnlargement: true })
    .toBuffer();
  const logoMeta = await sharp(logo).metadata();
  await sharp({
    create: { width: 1200, height: 630, channels: 4, background: navy },
  })
    .composite([
      {
        input: logo,
        left: Math.round((1200 - (logoMeta.width ?? 0)) / 2),
        top: Math.round((630 - (logoMeta.height ?? 0)) / 2),
      },
    ])
    .jpeg({ quality: 88, mozjpeg: true })
    .toFile(path.join(root, "public", "images", "og-image.jpg"));
  console.log("wrote public/images/og-image.jpg");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
