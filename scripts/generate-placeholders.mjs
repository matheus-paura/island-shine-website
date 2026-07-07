/**
 * Generates PLACEHOLDER images for local dev and staging.
 * Every output is a stylized flat illustration — deliberately not a fake
 * photo — so it is obvious what still needs the owner's real job photos.
 *
 * The before/after gallery now uses real job photos — see
 * scripts/import-gallery-photos.mjs and public/images/gallery/ — so this
 * script only covers the hero and share images.
 *
 * TODO: delete the generated file and drop in a real photo before launch:
 *   public/images/hero.jpg → real Victoria home / before-after shot
 *
 * Run: npm run placeholders
 */
import sharp from "sharp";
import { mkdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const imagesDir = path.join(root, "public", "images");

const navy = { 900: "#071E38", 800: "#0A2540", 700: "#0B2E52", 600: "#12446F", 500: "#1B5A8C" };
const orange = { 500: "#EA6A1E", 400: "#F5852F" };
const sand = { 50: "#F7F8FA", 100: "#EEF1F4", 200: "#DCE2E8" };

/** Deterministic pseudo-random generator so output is reproducible. */
function rng(seed) {
  let s = seed;
  return () => {
    s = (s * 1103515245 + 12345) % 2147483648;
    return s / 2147483648;
  };
}

function grimeBlotches(seed, count, w, h, colors, opacityRange = [0.15, 0.4]) {
  const rand = rng(seed);
  let out = "";
  for (let i = 0; i < count; i++) {
    const cx = rand() * w;
    const cy = rand() * h;
    const r = 8 + rand() * 60;
    const color = colors[Math.floor(rand() * colors.length)];
    const opacity = opacityRange[0] + rand() * (opacityRange[1] - opacityRange[0]);
    out += `<circle cx="${cx.toFixed(1)}" cy="${cy.toFixed(1)}" r="${r.toFixed(1)}" fill="${color}" opacity="${opacity.toFixed(2)}"/>`;
  }
  return out;
}

function waveLines(w, y, color, opacity, rows = 4) {
  let out = "";
  for (let i = 0; i < rows; i++) {
    const yy = y + i * 14;
    out += `<path d="M0 ${yy} q ${w / 8} -8 ${w / 4} 0 t ${w / 4} 0 t ${w / 4} 0 t ${w / 4} 0" stroke="${color}" stroke-width="3" fill="none" opacity="${opacity}"/>`;
  }
  return out;
}

/* ---------------------------------------------------------------- hero */
function heroSvg(w = 1920, h = 1280) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}">
    <defs>
      <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="${navy[900]}"/>
        <stop offset="0.55" stop-color="${navy[600]}"/>
        <stop offset="0.72" stop-color="${navy[500]}"/>
      </linearGradient>
      <linearGradient id="sea" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="${navy[700]}"/>
        <stop offset="1" stop-color="${navy[900]}"/>
      </linearGradient>
    </defs>
    <rect width="${w}" height="${h}" fill="url(#sky)"/>
    <circle cx="${w * 0.72}" cy="${h * 0.34}" r="90" fill="${orange[400]}" opacity="0.9"/>
    <circle cx="${w * 0.72}" cy="${h * 0.34}" r="130" fill="${orange[500]}" opacity="0.18"/>
    <!-- distant island -->
    <path d="M0 ${h * 0.62} L ${w * 0.18} ${h * 0.5} L ${w * 0.3} ${h * 0.58} L ${w * 0.44} ${h * 0.47} L ${w * 0.58} ${h * 0.6} L ${w * 0.75} ${h * 0.53} L ${w} ${h * 0.62} V ${h} H 0 Z" fill="${navy[800]}"/>
    <rect y="${h * 0.66}" width="${w}" height="${h * 0.34}" fill="url(#sea)"/>
    ${waveLines(w, h * 0.7, sand[200], 0.12, 6)}
    <path d="M0 ${h * 0.66} h ${w}" stroke="${orange[400]}" stroke-width="4" opacity="0.5"/>
  </svg>`;
}

/* ------------------------------------------------------------ og image */
function ogSvg(w = 1200, h = 630) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}">
    <rect width="${w}" height="${h}" fill="${navy[900]}"/>
    <path d="M0 ${h - 120} q 150 -40 300 0 t 300 0 t 300 0 t 300 0 V ${h} H 0 Z" fill="${navy[700]}"/>
    <path d="M0 ${h - 80} q 150 -30 300 0 t 300 0 t 300 0 t 300 0 V ${h} H 0 Z" fill="${navy[600]}"/>
    <circle cx="990" cy="150" r="60" fill="${orange[400]}"/>
    <text x="90" y="270" font-family="Arial Black, Arial, sans-serif" font-size="92" font-weight="900" fill="#FFFFFF" letter-spacing="4">ISLAND SHINE</text>
    <text x="92" y="330" font-family="Arial, sans-serif" font-size="34" fill="${sand[200]}">Window Cleaning · Pressure Washing · Soft Washing</text>
    <text x="92" y="390" font-family="Arial, sans-serif" font-size="30" font-weight="bold" fill="${orange[400]}">Victoria, BC · Licensed &amp; Insured</text>
  </svg>`;
}

/* ----------------------------------------------------------- apple icon */
function appleIconSvg(s = 180) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${s}" height="${s}" viewBox="0 0 64 64">
    <rect width="64" height="64" fill="${navy[900]}"/>
    <path d="M26 50 40 26l6 11 3.5-5L58 50H26Z" fill="${navy[500]}"/>
    <path d="M21 50c.8-9 .4-16-2.2-22" stroke="${orange[500]}" stroke-width="3" stroke-linecap="round" fill="none"/>
    <path d="M18.5 28c-4.5-3.7-9-4.5-12.7-2.2 4.5-6.7 10.5-8.2 14.2-6-0.7-4.5 1.5-7.5 6-9.7-2.2 3.7-2.2 6.7-.7 9.7 3.7-3 8.2-3 12 0-4.5-.7-8.2.7-11.2 3.7 3.7 0 6.7 2.2 8.2 6-3.7-3-7.5-3.7-11.2-2.2" stroke="${orange[500]}" stroke-width="2.6" stroke-linecap="round" fill="none"/>
    <path d="M8 55c5-2.6 10-2.6 15 0s10 2.6 15 0 10-2.6 15 0" stroke="${orange[400]}" stroke-width="2.6" stroke-linecap="round" fill="none"/>
  </svg>`;
}

async function jpeg(svg, file, quality = 72) {
  await sharp(Buffer.from(svg)).jpeg({ quality, mozjpeg: true }).toFile(file);
  console.log("wrote", path.relative(root, file));
}

async function main() {
  await mkdir(imagesDir, { recursive: true });

  await jpeg(heroSvg(), path.join(imagesDir, "hero.jpg"), 70);
  await jpeg(ogSvg(), path.join(imagesDir, "og-image.jpg"), 80);

  await sharp(Buffer.from(appleIconSvg()))
    .resize(180, 180)
    .png()
    .toFile(path.join(root, "app", "apple-icon.png"));
  console.log("wrote app/apple-icon.png");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
