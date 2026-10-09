# Odd Atlas

A small, research-led directory of forgotten places, local legends, and extraordinary stays.

## Development

Use Node.js 22. Run `npm ci`, then `npm run dev` to start native Next.js at http://127.0.0.1:5173.

- `npm run build`: create the production build in `.next`.
- `npm start`: serve the production build (port 3000 by default).
- `npm run typecheck`: check TypeScript.
- `npm run lint`: check application code.

Development, builds and production all use native Next.js. The retired Vinext/Sites runtime is preserved in Git history.

On this Windows machine, if the npm launcher fails, use the direct commands:

```powershell
node node_modules/next/dist/bin/next dev --hostname 127.0.0.1 --port 5173
node node_modules/typescript/bin/tsc --noEmit
node node_modules/next/dist/bin/next build
node node_modules/next/dist/bin/next start
```

## Local project and Git

This folder contains the complete project and its own Git history. Run commands from this folder, rather than the parent workspace.

The first approved design is preserved at `design-baseline-v1` (commit `259d14f`). Compare future changes against it with `git diff design-baseline-v1`. Start focused work on a branch such as `git switch -c codex/place-details`. The tag provides a stable reference without duplicating the project.

Consult `AGENTS.md` for the design, content, and validation standards. The repository is https://github.com/dwiti-123/oddatlas. This migration lives on `codex/native-nextjs`; do not merge it into `main` without the user's approval.

## Vercel preview

Import the repository using the Next.js framework preset. `vercel.json` selects `npm run build` and the `.next` output directory. Deploy `codex/native-nextjs` as a preview branch while reviewing the migration; keep the production branch set to `main`.

Canonical URLs currently retain the original preview domain. Updating them to the final public domain is a separate deployment step.

## Content

Place records live in `lib/places.ts`. The selected collection contains 15 places, five per category. Every entry includes factual sources, visit/stay context, image attribution, and a permanent detail URL. Folklore is labelled separately. Treehotel is represented by Mirrorcube alone. The initial Bodie URL remains accessible but is outside the selected collection.

Eleven entries use licensed photographs. Four extraordinary stays use clearly labelled AI-generated editorial illustrations; these are not exact representations of rooms or facilities. `lib/image-provenance.json` records the new image credits. `docs/research/selected-place-sources.md` lists every selected entry's sources and image provenance.

Run `node scripts/collection-audit.mjs` to check the collection and decode its images. With a local preview running, `node scripts/collection-audit.mjs http://127.0.0.1:5173` also checks every story/image URL, the sources page, sitemap, robots, the preserved Bodie URL, and missing-place handling. This audit also refreshes the source register and visual contact sheet.

## Design and provenance

- `docs/design-log.md`: decisions, concise rationale, and validation evidence.
- `docs/sources.md`: consulted references, factual sources, image licences, and unsuccessful lookups.
- `/sources`: visitor-facing factual sources and photograph credits.

The design was implemented directly in code using the existing shadcn primitives. Paper resources were consulted; no connected Paper canvas or Paper Shader was used. The first version is private for review.
