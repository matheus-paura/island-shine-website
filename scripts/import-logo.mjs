/**
 * Builds every logo asset from the owner's three source files in
 * scripts/logo-source/:
 *  - lockup-navy.png: full wordmark on navy. Background is keyed out to
 *    transparency -> public/images/logo/lockup.png (header/footer).
 *  - badge.webp: circular badge -> favicon + apple touch icon.
 *  - OG image is the navy lockup centered on a 1200x630 canvas.
 *
 * Run: node scripts/import-logo.mjs
 */
import sharp from "sharp";
import { mkdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const src = (f) => path.join(root, "scripts", "logo-source", f);
const outDir = path.join(root, "public", "images", "logo");
const bg = { r: 2, g: 25, b: 57 };
const siteNavy = { r: 7, g: 30, b: 56, alpha: 1 };

// Content bounds of lockup-navy.png (measured), plus a little padding.
const pad = 12;
const lockupCrop = { left: 61 - pad, top: 120 - pad, width: 844 + pad * 2, height: 316 + pad * 2 };

async function keyOutBackground(file, crop) {
  const { data, info } = await sharp(file)
    .extract(crop)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });
  for (let i = 0; i < data.length; i += 4) {
    const d = Math.max(
      Math.abs(data[i] - bg.r),
      Math.abs(data[i + 1] - bg.g),
      Math.abs(data[i + 2] - bg.b),
    );
    data[i + 3] = Math.max(0, Math.min(255, Math.round(((d - 10) / 50) * 255)));
  }
  return sharp(data, { raw: info });
}

async function circleMask(size, r) {
  return Buffer.from(
    `<svg width="${size}" height="${size}"><circle cx="${size / 2}" cy="${size / 2}" r="${r}" fill="#fff"/></svg>`,
  );
}

async function main() {
  await mkdir(outDir, { recursive: true });

  // Header/footer lockup with transparent background.
  const lockup = await keyOutBackground(src("lockup-navy.png"), lockupCrop);
  await lockup
    .resize({ width: 640 })
    .png({ palette: true, quality: 85, colours: 192, effort: 10 })
    .toFile(path.join(outDir, "lockup.png"));
  console.log("wrote public/images/logo/lockup.png");

  // Badge cropped to a circle (transparent corners) for the favicon.
  const mask = await circleMask(960, 466);
  const badgeCircle = await sharp(src("badge.webp"))
    .ensureAlpha()
    .composite([{ input: mask, blend: "dest-in" }])
    .png()
    .toBuffer();
  await sharp(badgeCircle)
    .resize(256, 256)
    .png({ palette: true, quality: 85, colours: 128, effort: 10 })
    .toFile(path.join(root, "app", "icon.png"));
  console.log("wrote app/icon.png");

  // Apple touch icon must be opaque: badge on the site's navy.
  const onNavy = await sharp({
    create: { width: 960, height: 960, channels: 4, background: siteNavy },
  })
    .composite([{ input: badgeCircle }])
    .png()
    .toBuffer();
  await sharp(onNavy)
    .resize(180, 180)
    .png()
    .toFile(path.join(root, "app", "apple-icon.png"));
  console.log("wrote app/apple-icon.png");

  // Open Graph image (1200x630): keyed lockup centered on the site navy with
  // wide margins. Link previews (WhatsApp, iMessage, Facebook) crop to
  // different ratios, so the logo stays inside a safe central area.
  const ogLogo = await (await keyOutBackground(src("lockup-navy.png"), lockupCrop))
    .resize({ width: 700 })
    .png()
    .toBuffer();
  const ogMeta = await sharp(ogLogo).metadata();
  await sharp({ create: { width: 1200, height: 630, channels: 4, background: siteNavy } })
    .composite([
      {
        input: ogLogo,
        left: Math.round((1200 - (ogMeta.width ?? 0)) / 2),
        top: Math.round((630 - (ogMeta.height ?? 0)) / 2),
      },
    ])
    .jpeg({ quality: 88, mozjpeg: true })
    .toFile(path.join(root, "public", "images", "og-image-v2.jpg"));
  console.log("wrote public/images/og-image-v2.jpg");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
