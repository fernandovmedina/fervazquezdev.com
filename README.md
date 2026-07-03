# fernandovazquez.dev

Personal portfolio built with [Astro](https://astro.build), styled with
[Tailwind CSS](https://tailwindcss.com) and animated with
[GSAP](https://gsap.com). Features an interactive orbital tech stack section
that lets visitors filter technologies by category.

## Tech Stack

- **[Astro](https://astro.build)** — static site framework
- **[Tailwind CSS](https://tailwindcss.com)** — styling
- **[GSAP](https://gsap.com)** — scroll-triggered and orbital animations
- **[astro-icon](https://github.com/natemoo-re/astro-icon)** — SVG icons
- **TypeScript**

## Requirements

- Node.js `>=22.12.0`
- [pnpm](https://pnpm.io)

## Getting Started

```bash
pnpm install     # install dependencies
pnpm dev         # start the dev server at http://localhost:4321
pnpm build       # build for production into ./dist
pnpm preview     # preview the production build locally
```

## Project Structure

```
src/
├── components/   # Reusable UI components (e.g. BallButton)
├── data/         # Data sources (stack.ts — tech stack items & categories)
├── icons/        # SVG icons used via astro-icon
├── layouts/      # Page layouts
├── pages/        # Routes (index.astro)
├── sections/     # Page sections (TechStack.astro)
└── styles/       # Global styles
```

### Tech stack section

The interactive tech stack is driven by `src/data/stack.ts`. Each technology
declares the categories it belongs to, and the filter buttons are generated
automatically from the data. Available categories:

- All
- My Stack
- Frontend Stack
- Backend Stack
- Mobile Stack
- DevOps Stack
- Daily Tools

To add a technology, add an entry with its icon and categories to the relevant
array (`frameworks`, `languages`, `cloudInfra`, or `tools`) in `stack.ts`.
