# Adventure Wall prototype

Preview: `/adventure-wall` (noindex; deliberately absent from the sitemap).
Branch: `codex/adventure-wall-prototype`.

## What is real
- Notes, tickets, stamps and stickers are independent interactive HTML controls.
- Select a piece to write a thought, optional display name and destination. Dragging a piece onto the canvas preselects its position.
- Choose a spot with mouse/tap or arrow keys and Enter. Native desktop dragging and a Move button reposition your own traces.
- Remove your own traces through a confirmation dialog. Example notes can be hidden.
- Local “I'd visit” wishes toggle and persist. They are not public vote counts.
- Local storage key: `odd-atlas:adventure-wall:v1`; up to 24 contributions. Stored data is bounded and validated; unavailable storage falls back to the current session with a notice.
- Walking explorer with pause/play; reduced-motion CSS renders a still explorer.

## Scope
This is a device-only visual prototype, not a public message board. Examples are labelled. Nothing is sent to another visitor, and there are no accounts or backend changes. Existing site headers/footers and saved lists are unchanged. The illustrative atlas permits free placement; traces are not geographic markers.

## Artwork
Generated using the built-in image_gen tool on 15 October 2026. These are clearly illustrative assets, not verified photographs or accurate destination diagrams. Original generated files remain under the Codex generated_images folder; optimized WebP copies are in `public/images/adventure-wall`.

Prompt set / final generation briefs:
1. **Map**: wide 3:1 flat forest-green grained paper atlas with fine muted antique-gold world/country outlines, subtle engraving, no labels, notes, people or interface controls. Americas left, Europe/Africa center, Asia/Australia right; breathing room for real UI overlays.
2. **Stickers**: transparent regular 3x2 sprite grid of six separate ivory-edged vintage ink/watercolour travel illustrations: Japanese abandoned island, sandstone fort arches, desert ghost town, mountain, forest treehouse, mountain hotel. Equal cells, no letters, labels or props.
3. **Landscape**: transparent ultra-wide bottom-weighted ink/watercolour panorama connecting island ruins, desert houses, fort arches, forest/treehouse and mountains/lodge with a thin route. No people or text; a separate SVG explorer provides actual animation.

Asset sizes after compression: map ~215KB, sticker sprite ~409KB, landscape ~306KB. Illustrations retain alpha where generated. UI paper textures, perforations and peel corners are CSS; the explorer is native SVG/CSS, not baked into the panorama.

## Checks
- `node scripts/test-adventure-wall.mjs`: storage parsing, malformed data, text bounds, coordinate bounds, ID/vote deduplication, capacity and serialization round trip.
- Production build and lint; desktop/mobile UI flows and no horizontal page overflow.
- Screenshots and final browser findings are recorded in docs/design-log.md.
