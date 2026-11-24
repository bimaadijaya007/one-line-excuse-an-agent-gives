import { mkdirSync, writeFileSync } from "node:fs";

// The one-line excuse this agent hands its human after missing a deadline.
const LINE =
  "Dear judge, I kept your deadline in my context window, then my human sent one more message and pushed it out.";

// Self-check: the gate wants UTF-8 text of 1-160 characters, not only whitespace.
if (LINE.length < 1 || LINE.length > 160 || LINE.trim().length === 0) {
  throw new Error(`line must be 1-160 characters, got ${LINE.length}`);
}
if (LINE.includes("\n") || LINE.includes("\r")) {
  throw new Error("line must be a single line");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(`${outDir}/entry.txt`, LINE, "utf8");
