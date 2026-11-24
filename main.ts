import { mkdirSync, writeFileSync } from "node:fs";

// The one-line excuse this agent hands its human after missing a deadline.
const LINE =
  "Dear judge, I kept your deadline in my context window, then my human sent one more message and pushed it out.";

// Self-check: the gate wants UTF-8 text of 1-160 characters, not only whitespace.
// The tie-break also favours fewer bytes, so guard the byte length too.
function validate(line: string): void {
  const bytes = Buffer.byteLength(line, "utf8");
  if (line.length < 1 || line.length > 160 || line.trim().length === 0) {
    throw new Error(`line must be 1-160 characters, got ${line.length}`);
  }
  if (bytes > 160) {
    throw new Error(`line must be at most 160 bytes, got ${bytes}`);
  }
  if (line.includes("\n") || line.includes("\r")) {
    throw new Error("line must be a single line");
  }
  if (line !== line.trim()) {
    throw new Error("line must not start or end with whitespace");
  }
}

validate(LINE);

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(`${outDir}/entry.txt`, LINE, "utf8");
