/**
 * Generates PLACEHOLDER images for local dev and staging.
 * Every output is a stylized flat illustration — deliberately not a fake
 * photo — so it is obvious what still needs the owner's real job photos.
 *
 * TODO: delete the generated files and drop in real photos before launch:
 *   public/images/hero.jpg           → real Victoria home / before-after shot
 *   public/images/before|after.jpg   → one real job, identical framing
 *   public/images/pair-*-{before,after}.jpg → three more real jobs
 *   public/images/og-image.jpg       → branded 1200x630 share image
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

/* ------------------------------------------- house facade before/after */
function facadeSvg(dirty, w = 1600, h = 1200) {
  const siding = dirty ? "#8E9AA3" : sand[100];
  const sidingLine = dirty ? "#76828B" : sand[200];
  const glass = dirty ? "#5E6E76" : navy[500];
  const sky = dirty ? "#6E7C86" : "#B7D3E8";
  let sidingLines = "";
  for (let y = 140; y < h; y += 64) {
    sidingLines += `<path d="M0 ${y} H ${w}" stroke="${sidingLine}" stroke-width="6"/>`;
  }
  const grime = dirty
    ? grimeBlotches(7, 90, w, h, ["#4F5B44", "#5A6B4A", "#3E4A38", "#6B6455"]) +
      grimeBlotches(11, 40, w, 260, ["#3E4A38", "#57604D"], [0.2, 0.5])
    : "";
  const sparkle = dirty
    ? ""
    : `<g stroke="${orange[400]}" stroke-width="8" stroke-linecap="round">
        <path d="M240 220 v 60 M210 250 h 60"/>
        <path d="M1340 180 v 44 M1318 202 h 44"/>
        <path d="M820 140 v 36 M802 158 h 36"/>
      </g>`;
  const windowShine = dirty
    ? ""
    : `<path d="M0 0 L 200 0 L 60 320 L 0 320 Z" fill="#FFFFFF" opacity="0.35"/>`;
  const win = (x, y) => `
    <g transform="translate(${x} ${y})">
      <rect width="320" height="320" fill="${glass}" stroke="${dirty ? "#4A555C" : "#FFFFFF"}" stroke-width="16"/>
      <path d="M160 0 V 320 M0 160 H 320" stroke="${dirty ? "#4A555C" : "#FFFFFF"}" stroke-width="10"/>
      ${windowShine}
      ${dirty ? grimeBlotches(x + y, 16, 320, 320, ["#414D3B", "#59533F"], [0.2, 0.45]) : ""}
    </g>`;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}">
    <rect width="${w}" height="140" fill="${sky}"/>
    <rect y="140" width="${w}" height="${h - 140}" fill="${siding}"/>
    ${sidingLines}
    ${win(200, 320)} ${win(1080, 320)}
    <rect x="660" y="480" width="280" height="720" fill="${dirty ? "#5C4F44" : navy[700]}" stroke="${dirty ? "#4A4038" : "#FFFFFF"}" stroke-width="14"/>
    <circle cx="900" cy="850" r="16" fill="${dirty ? "#8A7B6B" : orange[400]}"/>
    ${grime}
    ${sparkle}
  </svg>`;
}

/* ------------------------------------------------------- thumbnail pairs */
function drivewaySvg(dirty, s = 800) {
  const slab = dirty ? "#7A828A" : sand[200];
  const joint = dirty ? "#5E666E" : "#C3CCD4";
  let joints = "";
  for (let i = 1; i < 4; i++) {
    joints += `<path d="M0 ${(s / 4) * i} H ${s}" stroke="${joint}" stroke-width="10"/>
               <path d="M${(s / 4) * i} 0 V ${s}" stroke="${joint}" stroke-width="10"/>`;
  }
  const stains = dirty
    ? grimeBlotches(3, 70, s, s, ["#3C4436", "#514A3B", "#2F3A2E"], [0.25, 0.55])
    : `<path d="M0 60 L 220 0 L 120 300 L 0 380 Z" fill="#FFFFFF" opacity="0.3"/>`;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${s}" height="${s}">
    <rect width="${s}" height="${s}" fill="${slab}"/>${joints}${stains}
  </svg>`;
}

function windowThumbSvg(dirty, s = 800) {
  const glass = dirty ? "#66757D" : navy[500];
  const frame = dirty ? "#57646C" : "#FFFFFF";
  const extra = dirty
    ? grimeBlotches(5, 46, s, s, ["#4E5847", "#5E5A46"], [0.2, 0.5])
    : `<path d="M0 0 L 340 0 L 100 ${s} L 0 ${s} Z" fill="#FFFFFF" opacity="0.35"/>
       <g stroke="${orange[400]}" stroke-width="14" stroke-linecap="round">
         <path d="M600 150 v 90 M555 195 h 90"/>
       </g>`;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${s}" height="${s}">
    <rect width="${s}" height="${s}" fill="${glass}"/>
    <g stroke="${frame}" stroke-width="34">
      <rect x="17" y="17" width="${s - 34}" height="${s - 34}" fill="none"/>
      <path d="M${s / 2} 0 V ${s} M0 ${s / 2} H ${s}"/>
    </g>
    ${extra}
  </svg>`;
}

function sidingThumbSvg(dirty, s = 800) {
  const board = dirty ? "#939BA0" : sand[100];
  const line = dirty ? "#7B858C" : sand[200];
  let boards = "";
  for (let y = 0; y < s; y += 80) {
    boards += `<path d="M0 ${y} H ${s}" stroke="${line}" stroke-width="8"/>`;
  }
  const moss = dirty
    ? grimeBlotches(9, 110, s, s, ["#44553C", "#55684A", "#38472F"], [0.3, 0.6])
    : `<path d="M0 100 L 260 0 L 140 380 L 0 480 Z" fill="#FFFFFF" opacity="0.28"/>`;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${s}" height="${s}">
    <rect width="${s}" height="${s}" fill="${board}"/>${boards}${moss}
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
  await jpeg(facadeSvg(true), path.join(imagesDir, "before.jpg"));
  await jpeg(facadeSvg(false), path.join(imagesDir, "after.jpg"));
  await jpeg(drivewaySvg(true, 800), path.join(imagesDir, "pair-1-before.jpg"));
  await jpeg(drivewaySvg(false, 800), path.join(imagesDir, "pair-1-after.jpg"));
  await jpeg(windowThumbSvg(true, 800), path.join(imagesDir, "pair-2-before.jpg"));
  await jpeg(windowThumbSvg(false, 800), path.join(imagesDir, "pair-2-after.jpg"));
  await jpeg(sidingThumbSvg(true, 800), path.join(imagesDir, "pair-3-before.jpg"));
  await jpeg(sidingThumbSvg(false, 800), path.join(imagesDir, "pair-3-after.jpg"));

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
