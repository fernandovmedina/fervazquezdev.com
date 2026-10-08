# fernandovazquez.dev

Personal portfolio built with [Next.js](https://nextjs.org) (App Router), styled with
[Tailwind CSS](https://tailwindcss.com) and animated with
[GSAP](https://gsap.com). Features an interactive orbital tech stack section
that lets visitors filter technologies by category.

## Tech Stack

- **[Next.js](https://nextjs.org)** — React framework (statically prerendered)
- **[Tailwind CSS](https://tailwindcss.com)** — styling
- **[GSAP](https://gsap.com)** — scroll-triggered and orbital animations
- **[three.js](https://threejs.org)** — generative contact scene
- **TypeScript**

## Requirements

- Node.js `>=22.12.0`
- [pnpm](https://pnpm.io)

## Getting Started

```bash
pnpm install     # install dependencies
pnpm dev         # start the dev server at http://localhost:3000
pnpm build       # build for production into ./.next
pnpm start       # serve the production build locally
pnpm typecheck   # run the TypeScript compiler
```

## Project Structure

```
src/
├── app/          # App Router: layout.tsx, page.tsx, globals.css
├── components/   # Reusable UI components (e.g. BallButton, Icon)
├── data/         # Data sources (stack.ts — tech stack items & categories)
├── icons/        # Inline SVG icon bodies rendered by components/Icon.tsx
├── lib/          # Small helpers
└── sections/     # Page sections (TechStack.tsx)
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
