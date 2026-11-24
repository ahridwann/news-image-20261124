// The Daily Globe — Tuesday, 24 November 2026.
// Entry for make.fun's news-image-20261124 bounty: sum up 24 November's
// world news in one image. The image itself is drawn by work/draw_entry.py
// (Pillow, offline, deterministic) and shipped in this repository as
// entry.png; this program simply copies it to the output directory the
// harness provides, so both graded runs write identical bytes.

import { copyFileSync, existsSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const source = join(here, "entry.png");

function outputDir(): string {
  const dir = process.env.MAKEFUN_OUTPUT_DIR;
  if (!dir) {
    throw new Error("MAKEFUN_OUTPUT_DIR is not set");
  }
  return dir;
}

function main(): string {
  if (!existsSync(source)) {
    throw new Error(`entry image missing: ${source}`);
  }
  const outDir = outputDir();
  mkdirSync(outDir, { recursive: true });
  copyFileSync(source, join(outDir, "entry.png"));
  return outDir;
}

// Run the copy and report the result on stdout. Any failure throws,
// which fails the run loudly instead of writing a partial output.
try {
  const outDir = main();
  console.log("entry.png copied to", outDir);
} catch (error) {
  console.error("failed to write entry.png:", error);
  process.exit(1);
}
