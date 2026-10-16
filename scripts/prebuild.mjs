#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";

const raw = path.join(process.cwd(), "raw-images");
if (fs.existsSync(raw)) {
  console.log("raw-images found — running image optimization…");
  const result = spawnSync("node", ["scripts/optimize-images.mjs"], {
    stdio: "inherit",
  });
  process.exit(result.status ?? 1);
} else {
  console.log("No raw-images/ — skipping image optimization.");
}
