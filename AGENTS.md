# fernandovazquez.dev

Personal portfolio for Fernando Vazquez (fullstack dev, Saltillo, MX). Static site — no backend.
The original brief lives in `PROMPT.md`; all personal info, projects, jobs and contest results come from there.

## Stack & commands

- Astro 7 + Tailwind 4 (via `@tailwindcss/vite`, theme tokens in `src/styles/global.css` under `@theme`) + GSAP (+ ScrollTrigger) + three.js (contact scene only) + astro-icon.
- `pnpm dev` / `pnpm build` / `pnpm preview` / `pnpm astro check` (keep it at 0 errors).
- Node >= 22, pnpm.

## Architecture

`src/pages/index.astro` assembles everything in order:
Navbar → Hero → About → Experience → TechStack → Projects → Achievements → Contact → Footer.

- **Sections** (`src/sections/`): one file per page section. `TechStack.astro` (orbit of skillicons with category filters) predates the rest — don't restructure it.
- **Components** (`src/components/`): `Navbar`, `Cursor` (custom violet dot+ring cursor, fine-pointer devices only), `LiquidButton` + `GlassFilter` (glass button w/ SVG displacement filter), `WebGLShader` (hero background), `SectionHeading` (eyebrow/title/subtitle pattern — use it for any new section), `BallButton` (pre-existing, used by TechStack).
- **Content data** (`src/data/`): `site.ts` (identity, socials, nav links), `projects.ts`, `experience.ts`, `achievements.ts`, `stack.ts` (orbit icons/categories). **Edit content here, not in the section markup.**
- **Icons** (`src/icons/`): loaded by astro-icon (`<Icon name="..."/>`). Must be a single flat `<svg>` — a nested `<svg>` inside an `<svg>` breaks `astro build`. Use `currentColor` (or plain fill) so CSS colors them.
- **Assets** (`public/`): `cv.pdf`, `favicon.svg`, `projects/*.svg` (hand-made 800×500 card covers). Covers are decorative only — no title text inside them, because the Projects cards render tag/title/description as an HTML overlay on top.

## Design system

- Ground `#0f0f0f`, accent violet `#a855f7` (`text-violet-300/400` for hovers), borders `white/10`, cards `bg-white/[0.03] rounded-2xl`, chips `rounded-full border border-white/10`.
- Fonts (self-hosted via @fontsource-variable, imported in `global.css`): DM Sans = body (`font-dm`, default on body), Space Grotesk = headings (`font-display`).
- Scroll reveals: put `data-reveal="up|down|left|right|fade"` (+ optional `data-reveal-delay="0.2"`) on any element; a global GSAP/ScrollTrigger script in `Layout.astro` animates them. Don't write per-section reveal code.
- Every script must respect `prefers-reduced-motion` and should pause work off-screen (IntersectionObserver) — the existing scripts all do.

## Ported 21st.dev components (do not add React)

PROMPT.md required three 21st.dev React components; they were ported to Astro-native code to keep the site Astro+Tailwind only:

1. **Hero**: `web-gl-shader` (@aliimam) — exact GLSL on a raw WebGL canvas in `WebGLShader.astro` (~2KB, no three.js), plus `LiquidButton` port.
2. **Projects**: `card-stack` fan carousel rebuilt in vanilla TS + GSAP inside `Projects.astro` — signed-offset fan geometry, click-to-focus, drag/swipe w/ velocity threshold, dots, arrow keys, 3.5s auto-advance (paused on hover), details panel synced from `projects.ts`.
3. **Contact**: `anomalous-matter-hero` scene in `Contact.astro` — three.js wireframe icosahedron + simplex-noise displacement, mouse-following light. three.js is dynamically imported only when the section approaches (keep it that way; it's the only heavy dep). Two upstream bugs were fixed in the port: uniform name `pointLightPos` (fragment shader originally referenced a mismatched name) and the color (original used an unparseable CSS var; now `#a855f7`).

## Live preview artifact

`node scripts/pack-artifact.mjs` (after `pnpm build`) produces `dist/fernandovazquez-portfolio.html` — a fully self-contained single file: bundles all module scripts with esbuild, inlines CSS + woff2 fonts + cover SVGs + cv.pdf as data URIs, fetches and embeds the skillicons.dev icons, and prepends a DOMContentLoaded-replay shim. Published at:
https://claude.ai/code/artifact/e6d4c172-b692-4a72-b707-3ef7c1b5c668
To update the shared preview, rebuild, re-run the packer, and redeploy the Artifact **to that same URL**.

## Known quirks

- The tech-orbit icons load from `https://skillicons.dev` at runtime (only external dependency of the deployed site).
- Logo text appears in `Navbar.astro` and `Footer.astro` and they are set independently (currently `fv.` in the navbar, `froot.` in the footer).
- Project card GitHub links in `projects.ts` point to the GitHub profile (real repo URLs unknown); About-section stats are estimates from PROMPT.md.
