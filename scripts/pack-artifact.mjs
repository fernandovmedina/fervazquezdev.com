// Packages the built site (dist/) into one self-contained HTML file suitable for
// publishing as a Claude Artifact (strict CSP: no external requests allowed).
// Usage: pnpm build && node scripts/pack-artifact.mjs
import { readFileSync, writeFileSync, mkdtempSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { tmpdir } from "node:os";
import { build } from "esbuild";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const DIST = join(ROOT, "dist");
const OUT = join(DIST, "fernandovazquez-portfolio.html");

let html = readFileSync(join(DIST, "index.html"), "utf8");

const dataUri = (buf, mime) => `data:${mime};base64,${buf.toString("base64")}`;
const mimes = { svg: "image/svg+xml", woff2: "font/woff2", pdf: "application/pdf" };

// 1. CSS: inline the stylesheet, fonts as data URIs
const cssHref = html.match(/<link rel="stylesheet" href="([^"]+)">/)[1];
let css = readFileSync(join(DIST, cssHref.replace(/^\//, "")), "utf8");
css = css.replace(/url\(([^)]+\.woff2)\)/g, (_, p) => {
  const file = p.replace(/["']/g, "").split("/").pop();
  return `url(${dataUri(readFileSync(join(DIST, "_astro", file)), mimes.woff2)})`;
});
html = html.replace(/<link rel="stylesheet"[^>]*>/, "");

// 2. JS: bundle every external module script into one, in document order
// (esbuild inlines the dynamic import of three.js — laziness is lost, functionality kept)
const srcs = [...html.matchAll(/<script type="module" src="([^"]+)"><\/script>/g)].map((m) => m[1]);
const entryDir = mkdtempSync(join(tmpdir(), "pack-"));
writeFileSync(
  join(entryDir, "entry.js"),
  srcs.map((s) => `import "${join(DIST, s.replace(/^\//, ""))}";`).join("\n")
);
const bundle = await build({
  entryPoints: [join(entryDir, "entry.js")],
  bundle: true,
  minify: true,
  format: "esm",
  write: false,
});
const js = bundle.outputFiles[0].text;
html = html.replace(/<script type="module" src="[^"]+"><\/script>/g, "");

// Replay DOMContentLoaded for scripts evaluated after the document is ready
// (the artifact host may inject this page post-load)
const shim = `<script>(()=>{const a=document.addEventListener.bind(document);document.addEventListener=(t,f,o)=>{if(t==="DOMContentLoaded"&&document.readyState!=="loading"){try{f()}catch(e){console.error(e)}return}a(t,f,o)};})();</script>`;

// 3. Local assets -> data URIs
for (const [, src] of new Set(html.matchAll(/"(\/(?:projects\/[\w-]+\.svg|favicon\.svg))"/g))) {
  html = html.replaceAll(src, dataUri(readFileSync(join(ROOT, "public", src.slice(1))), mimes.svg));
}
const cvUri = dataUri(readFileSync(join(ROOT, "public", "cv.pdf")), mimes.pdf);
html = html.replaceAll('href="/cv.pdf" download', `href="${cvUri}" download="fernando-vazquez-cv.pdf"`);

// 4. skillicons.dev -> data URIs
const iconUrls = [...new Set([...html.matchAll(/https:\/\/skillicons\.dev\/icons\?i=[\w]+/g)].map((m) => m[0]))];
for (const url of iconUrls) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`fetch failed ${url}: ${res.status}`);
  html = html.replaceAll(url, dataUri(Buffer.from(await res.arrayBuffer()), mimes.svg));
}

// 5. Compose: artifacts get wrapped in doctype/head/body at publish time,
// so emit content only — but a <title> is allowed and used
const body = html.match(/<body>([\s\S]*)<\/body>/)[1];
const out = [
  "<title>Fernando Vazquez — Fullstack Developer</title>",
  `<style>${css}</style>`,
  shim,
  body.trim(),
  `<script type="module">${js}</script>`,
].join("\n");

writeFileSync(OUT, out);
console.log(`wrote ${OUT} (${(out.length / 1024 / 1024).toFixed(2)} MB, ${iconUrls.length} icons inlined)`);
