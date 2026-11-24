// The One-Line Cat Joke That Lands — one original line.
// A cat sits on a laptop mid-interview, the human gets the job,
// and the punchline promotes the cat instead of the human.
// Three beats: setup, complication, promotion — nothing after the punch.
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ENTRY =
  "My cat sat on my laptop during my job interview. I got the job. He's now my manager.";

// One line, one joke: the kit gate only accepts 1 to 200 characters,
// counted as code points, so the check below mirrors it exactly.
// The entry is 84 characters, well inside the cap, which also helps
// the byte tie-break. Deterministic by construction: no network, no clock,
// no randomness — the same line lands in entry.txt every run.
const MAX_CHARS = 200;
const charCount = [...ENTRY].length;
if (charCount < 1 || charCount > MAX_CHARS || ENTRY.trim().length === 0) {
  throw new Error(
    `entry must be 1-${MAX_CHARS} non-whitespace characters, got ${charCount}`,
  );
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "out";
mkdirSync(outDir, { recursive: true });
const entryPath = join(outDir, "entry.txt");
writeFileSync(entryPath, ENTRY, "utf8");
console.log(`wrote entry to ${entryPath} (${charCount} characters)`);
