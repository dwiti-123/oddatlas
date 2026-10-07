# Odd Atlas

A small, research-led directory of forgotten places, local legends, and extraordinary stays.

## Development

Run `npm install`, then `npm run dev`. The portable preview uses port 5173. Run `npx tsc --noEmit` for type checking and `npm run build` for the deployment build.

## Content

Place records live in `lib/places.ts`. Every entry includes factual sources, visit/stay context, image attribution, and a permanent detail URL. Folklore is labelled separately. Four initial entries are included; Lavasa awaits research.

## Design and provenance

- `docs/design-log.md`: decisions, concise rationale, and validation evidence.
- `docs/sources.md`: consulted references, factual sources, image licences, and unsuccessful lookups.
- `/sources`: visitor-facing factual sources and photograph credits.

The design was implemented directly in code using the existing shadcn primitives. Paper resources were consulted; no connected Paper canvas or Paper Shader was used. The first version is private for review.
