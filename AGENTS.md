# Odd Atlas — project standards

The user approved the first independent travel magazine design as the foundation. Preserve its quality and visual continuity while improving the product.

## Design
- Preserve the editorial hierarchy, real photography, restrained brick accent, thin rules, readable typography, and comfortable spacing.
- Avoid generic marketing templates, fantasy location images presented as photographs, excessive decoration, arbitrary gradients, and animation without a useful role.
- Keep browsing easy on mobile and desktop. Use existing shadcn primitives for matching controls and retain keyboard accessibility.
- Respect reduced-motion preferences. Maintain image compression and lazy loading where appropriate.
- Do not redesign the baseline unless requested. Evolve the existing components and shared CSS.

## Content and provenance
- Keep the three established categories and the visit/stay tags unless the user changes them.
- Place records belong in lib/places.ts; each entry requires factual sources and photo attribution/licensing.
- Distinguish documented history, current information, and folklore. Never invent access arrangements, costs, statistics, or accommodation.
- Update docs/sources.md for sources used and docs/design-log.md for observations, options, decisions, concise rationale, and validation evidence. Do not record private internal thought processes.

## Git and validation
- This directory is the source of truth and has its own Git repository; run Git commands here, not in the parent workspace repository.
- The approved visual baseline is tagged design-baseline-v1. Preserve it; never move the tag.
- Use codex/ branches for future feature work, and make focused commits when the user requests or authorizes them.
- Preserve unrelated user changes. Do not reset or force-push.
- For UI changes, run the production build and verify the affected flow on desktop and mobile. For documentation-only changes, inspect the diff instead of rebuilding unnecessarily.
- The current request establishes local development. Do not publish local changes unless the user requests publication.
