#!/usr/bin/env node
/**
 * Reads /raw-images and writes optimized WebP assets to /public/images.
 * Usage: npm run images
 */
import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const ROOT = process.cwd();
const RAW = path.join(ROOT, "raw-images");
const OUT = path.join(ROOT, "public", "images");

const BUDGETS = {
  hero: 250 * 1024,
  heroMobile: 180 * 1024,
  service: 120 * 1024,
  gallery: 120 * 1024,
  parallax: 200 * 1024,
  owner: 150 * 1024,
  other: 150 * 1024,
};

/** @type {Array<{ match: RegExp, width: number, quality: number, budget: number, outName?: (name: string) => string }>} */
const RULES = [
  {
    match: /^hero\.(jpe?g|png|webp|avif)$/i,
    width: 1920,
    quality: 75,
    budget: BUDGETS.hero,
    outName: () => "hero.webp",
  },
  {
    match: /^hero-mobile\.(jpe?g|png|webp|avif)$/i,
    width: 960,
    quality: 75,
    budget: BUDGETS.heroMobile,
    outName: () => "hero-mobile.webp",
  },
  {
    match: /^parallax-1\.(jpe?g|png|webp|avif)$/i,
    width: 1600,
    quality: 75,
    budget: BUDGETS.parallax,
    outName: () => "parallax-1.webp",
  },
  {
    match: /^parallax-2\.(jpe?g|png|webp|avif)$/i,
    width: 1600,
    quality: 75,
    budget: BUDGETS.parallax,
    outName: () => "parallax-2.webp",
  },
  {
    match: /^owner\.(jpe?g|png|webp|avif)$/i,
    width: 800,
    quality: 75,
    budget: BUDGETS.owner,
    outName: () => "owner.webp",
  },
  {
    match: /^services\/.+\.(jpe?g|png|webp|avif)$/i,
    width: 800,
    quality: 75,
    budget: BUDGETS.service,
  },
  {
    match: /^gallery\/.+\.(jpe?g|png|webp|avif)$/i,
    width: 800,
    quality: 75,
    budget: BUDGETS.gallery,
  },
  {
    match: /^before-after\/.+\.(jpe?g|png|webp|avif)$/i,
    width: 1200,
    quality: 75,
    budget: BUDGETS.gallery,
  },
];

async function exists(p) {
  try {
    await fs.access(p);
    return true;
  } catch {
    return false;
  }
}

async function walk(dir, base = "") {
  if (!(await exists(dir))) return [];
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const rel = path.join(base, entry.name);
    const abs = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await walk(abs, rel)));
    } else if (/\.(jpe?g|png|webp|avif)$/i.test(entry.name)) {
      files.push(rel);
    }
  }
  return files;
}

function ruleFor(rel) {
  return RULES.find((r) => r.match.test(rel.replace(/\\/g, "/")));
}

async function optimizeOne(rel) {
  const rule = ruleFor(rel);
  const width = rule?.width ?? 1200;
  const quality = rule?.quality ?? 75;
  const budget = rule?.budget ?? BUDGETS.other;
  const normalized = rel.replace(/\\/g, "/");
  const outRel = rule?.outName
    ? rule.outName(normalized)
    : normalized.replace(/\.(jpe?g|png|webp|avif)$/i, ".webp");
  const input = path.join(RAW, rel);
  const output = path.join(OUT, outRel);
  await fs.mkdir(path.dirname(output), { recursive: true });

  let pipeline = sharp(input).rotate().resize({
    width,
    withoutEnlargement: true,
  });

  let buffer = await pipeline.webp({ quality, effort: 5 }).toBuffer();

  if (buffer.length > budget && quality > 55) {
    buffer = await sharp(input)
      .rotate()
      .resize({ width, withoutEnlargement: true })
      .webp({ quality: 60, effort: 6 })
      .toBuffer();
  }

  await fs.writeFile(output, buffer);

  const kb = (buffer.length / 1024).toFixed(1);
  const over = buffer.length > budget;
  if (over) {
    console.warn(
      `⚠ ${outRel}: ${kb} KB exceeds budget ${(budget / 1024).toFixed(0)} KB`,
    );
  } else {
    console.log(`✓ ${outRel}: ${kb} KB`);
  }

  // Auto-create mobile hero from hero if not provided
  if (normalized.match(/^hero\.(jpe?g|png|webp|avif)$/i)) {
    const mobileOut = path.join(OUT, "hero-mobile.webp");
    if (!(await exists(path.join(RAW, "hero-mobile.jpg"))) &&
        !(await exists(path.join(RAW, "hero-mobile.jpeg"))) &&
        !(await exists(path.join(RAW, "hero-mobile.png"))) &&
        !(await exists(path.join(RAW, "hero-mobile.webp")))) {
      const mobileBuf = await sharp(input)
        .rotate()
        .resize({ width: 960, withoutEnlargement: true })
        .webp({ quality: 75, effort: 5 })
        .toBuffer();
      await fs.writeFile(mobileOut, mobileBuf);
      console.log(
        `✓ hero-mobile.webp: ${(mobileBuf.length / 1024).toFixed(1)} KB (from hero)`,
      );
    }
  }

  return buffer.length;
}

async function publicSize() {
  const pub = path.join(ROOT, "public");
  async function sizeOf(dir) {
    let total = 0;
    const entries = await fs.readdir(dir, { withFileTypes: true });
    for (const e of entries) {
      const p = path.join(dir, e.name);
      if (e.isDirectory()) total += await sizeOf(p);
      else total += (await fs.stat(p)).size;
    }
    return total;
  }
  return sizeOf(pub);
}

async function main() {
  if (!(await exists(RAW))) {
    console.log("No /raw-images folder found — skipping optimization.");
    process.exit(0);
  }

  const files = await walk(RAW);
  if (files.length === 0) {
    console.log("No images in /raw-images — nothing to optimize.");
    process.exit(0);
  }

  console.log(`Optimizing ${files.length} image(s)…`);
  for (const file of files) {
    await optimizeOne(file);
  }

  const total = await publicSize();
  const mb = (total / (1024 * 1024)).toFixed(2);
  console.log(`\nTotal /public size: ${mb} MB`);
  if (total > 6 * 1024 * 1024) {
    console.warn("⚠ /public exceeds ~6 MB target. Consider fewer/smaller images.");
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
