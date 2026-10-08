# Odd Atlas

A small, research-led directory of forgotten places, local legends, and extraordinary stays.

## Development

Run `npm install`, then `npm run dev`. The portable preview uses port 5173. Run `npx tsc --noEmit` for type checking and `npm run build` for the deployment build.

On this Windows machine, if the npm launcher fails, use the direct commands:

```powershell
node scripts/run-framework.mjs dev
node node_modules/typescript/bin/tsc --noEmit
node scripts/run-framework.mjs build
```

## Local project and Git

This folder contains the complete project and its own Git history. Run commands from this folder, rather than the parent workspace.

The first approved design is preserved at `design-baseline-v1` (commit `259d14f`). Compare future changes against it with `git diff design-baseline-v1`. Start focused work on a branch such as `git switch -c codex/place-details`. The tag provides a stable reference without duplicating the project.

Consult `AGENTS.md` for the design, content, and validation standards. Local edits stay local until publication is requested. No GitHub remote is configured.

## Content

Place records live in `lib/places.ts`. The selected collection contains 15 places, five per category. Every entry includes factual sources, visit/stay context, image attribution, and a permanent detail URL. Folklore is labelled separately. Treehotel is represented by Mirrorcube alone. The initial Bodie URL remains accessible but is outside the selected collection.

Eleven entries use licensed photographs. Four extraordinary stays use clearly labelled AI-generated editorial illustrations; these are not exact representations of rooms or facilities. `lib/image-provenance.json` records the new image credits. `docs/research/selected-place-sources.md` lists every selected entry's sources and image provenance.

Run `node scripts/collection-audit.mjs` to check the collection and decode its images. With a local preview running, `node scripts/collection-audit.mjs http://127.0.0.1:5173` also checks every story/image URL, the sources page, sitemap, robots, the preserved Bodie URL, and missing-place handling. This audit also refreshes the source register and visual contact sheet.

## Design and provenance

- `docs/design-log.md`: decisions, concise rationale, and validation evidence.
- `docs/sources.md`: consulted references, factual sources, image licences, and unsuccessful lookups.
- `/sources`: visitor-facing factual sources and photograph credits.

The design was implemented directly in code using the existing shadcn primitives. Paper resources were consulted; no connected Paper canvas or Paper Shader was used. The first version is private for review.
