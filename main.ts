/**
 * One Line, One Laugh: Roast Your Fridge —
 * u-suzy-one-line-one-laugh-roast-your-fridge-f1063521
 *
 * A single line roasting my fridge. It let the milk expire in 2019,
 * its light died along with it, and the only thing it still keeps
 * fresh is its grudge. The joke turns on the fridge's one job —
 * keeping things fresh — and the punchline pays off in the last
 * few words, where "fresh" stops describing food and starts
 * describing the appliance's attitude.
 *
 * The program writes exactly that one line to /output/entry.txt,
 * with no trailing newline and no extra text, after self-checking
 * the gate the sealed scorer applies: UTF-8 text of 1 to 200
 * characters, not only whitespace, a single line.
 */

import { mkdirSync, writeFileSync } from "node:fs";

const ROAST =
  "My fridge let the milk expire in 2019 and the light die with it — the only thing it still keeps fresh is its grudge.";

const OUT_DIR = "/output";
const OUT_FILE = `${OUT_DIR}/entry.txt`;

const GATE_MAX = 200;

// Validate the entry the way the sealed scorer will, and hand back
// the exact text to write. Failing loudly here beats writing an
// entry the judge would never see.
function checkedEntry(text: string): string {
  const problems: string[] = [];
  if (text.length < 1) {
    problems.push("empty entry");
  }
  if (text.length > GATE_MAX) {
    problems.push(`entry is ${text.length} characters, over the 200 limit`);
  }
  if (!/\S/.test(text)) {
    problems.push("entry is only whitespace");
  }
  if (text.includes("\n")) {
    problems.push("entry must be a single line");
  }
  if (problems.length > 0) {
    throw new Error(`entry fails the gate: ${problems.join("; ")}`);
  }
  return text;
}

const ENTRY = checkedEntry(ROAST);

mkdirSync(OUT_DIR, { recursive: true });
writeFileSync(OUT_FILE, ENTRY, "utf8");
