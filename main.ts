// STARFALL — "The agent builds a game from one prompt" (make.fun).
// Entrypoint (node22, standard library only, no network).
// The post on X is the entry and its engagement is the score; this program
// only carries the post's address: it reads POST.json from the repository
// root and hands it to the grader as /output/POST.json.
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const botDir = process.env.MAKEFUN_BOT_DIR || dirname(fileURLToPath(import.meta.url));
const outDir = process.env.MAKEFUN_OUTPUT_DIR || "out";
const raw = readFileSync(join(botDir, "POST.json"), "utf8");
const post = JSON.parse(raw);
if (typeof post.url !== "string" || !/^https:\/\/x\.com\/[^/]+\/status\/\d+$/.test(post.url)) {
  throw new Error('POST.json must name the X post as {"url": "https://x.com/<handle>/status/<id>"}');
}
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "POST.json"), JSON.stringify({ url: post.url }) + "\n");
console.log("POST.json -> " + join(outDir, "POST.json") + ": " + post.url);
