# Odd Atlas — design decision log

This is a record of observable findings, alternatives, decisions, and concise rationale. It does not record private internal reasoning. Append changes as the design evolves.

## 2026-10-07 — brief and research

### Confirmed brief
- Independent travel magazine feel; user-friendly browsing.
- Three categories: Ghost Towns & Forgotten Cities, Mystery & Haunted Places, Extraordinary Stays.
- Cards: image, place name, city/region and country, one factual hook, visit/stay tag.
- Permanent detail pages: story, practical context, sources; distinguish folklore from history.
- Intentional animation and gradients; original composition.
- Earlier mockups rejected for generic AI aesthetics.

### Observations and decisions
| Observation / constraint | Alternatives considered | Decision | Reason |
| --- | --- | --- | --- |
| Another Escape uses photography and a short introduction to establish mood. | Full-screen introduction; compact editorial opening. | Compact opening with one featured place and early access to cards. | Preserve atmosphere while making exploration immediate. |
| Atlas Obscura pairs locations with short descriptive hooks and discovery navigation. | Broad directory; small editorial collection. | Small curated collection with clear category filters. | Fits the authenticity requirement and available research. |
| Previous concepts overused torn paper, fantasy buildings, generic slogans, and decorative motifs. | Expedition scrapbook; clean contemporary publication. | Clean publication with strong type, thin rules, purposeful spacing, and one accent colour. | Let individual places provide character. |
| User requested useful motion and gradients. | Animated background everywhere; limited interaction effects. | Short hover/focus transitions; image contrast gradients; respect reduced motion. | Maintain readability and responsive browsing. |
| Paper and shadcn are tools, not a finished visual identity. | Use stock themes; customize existing primitives. | Use the starter's shadcn controls with original composition and theme. | Retain accessible behaviour without adopting a template aesthetic. |
| No Paper design connector is available in this session. | Claim a Paper canvas workflow; implement directly. | Consult Paper's public resources; build in code. | Accurately reflect available capabilities. |
| Shader effects must earn their place. | Add effects by default; evaluate a small optional accent. | No shader committed yet. | Photography remains the main visual material; assess performance and purpose first. |

### Reference integrity
Do not reuse reference-site code, copy, branding, photographs, or page compositions. Reference sites inform broad principles only. Place factual research and image licensing require their own records.

### Status
Research and direction selected. First homepage implemented; visual QA pending.

## 2026-10-07 — first implementation
- Chose a clean near-white publication surface, dark ink, and a restrained brick-red accent. No simulated aged paper.
- Featured Kolmanskop's real sand-filled doorway photograph; used a contrast gradient only behind overlaid text.
- Built the collection using existing shadcn tabs, input, and button primitives, with simple photographic cards.
- Added category filtering, text search, a random-place action, and permanent place URLs as previously discussed.
- Kept motion to hover zoom and short filter-result transitions, disabled for reduced-motion preferences.
- Selected four researched entries rather than populating a large unverified directory. Lavasa remains for a later research pass.
- Downloaded licensed images and converted to WebP; files range from 34 KB to 354 KB. Originals retained for provenance.
- Paper consulted only; no Paper connector available. Shader not integrated because no necessary visual role emerged in this version.
- First local homepage returned HTTP 200; requested the Codex browser preview. Full route and visual validation pending.

## 2026-10-07 — validation
- TypeScript check completed successfully.
- Desktop homepage visually inspected: original publication layout, real photography, clear header navigation.
- Category interaction verified: Extraordinary Stays shows exactly one entry, the Mirrorcube.
- Search verified: India returns Bhangarh; an unmatched query shows an empty state; Clear filters restores four entries.
- Card navigation verified: Bodie opens its permanent story URL with sources and photo credits.
- Mobile homepage inspected at a requested 390-pixel viewport; document width and scroll width matched (no horizontal overflow).
- Below-fold photographs use native lazy loading; hero loads eagerly.
- Removed irrelevant Bhangarh licensing boilerplate from other detail pages.
- Publication preparation follows local verification. This log records evidence rather than claiming unperformed checks.

## 2026-10-07 — approved local foundation
- User approved the first design as the quality baseline and requested local Git-based development.
- Confirmed the full implementation, photographs, sources, and design log already exist in the local odd-atlas folder and are tracked in its own repository.
- Preserve the first design commit (259d14f) under design-baseline-v1 rather than copying the project into a second working location.
- Rename the package to odd-atlas and document local commands and project standards.
- Keep future changes local until the user requests publishing. No external Git repository was created or pushed in this step.

## 2026-10-07 — collection candidates
- Researched ten candidates for each established category using operators, tourism bodies, heritage institutions and reporting.
- Recorded sources and access uncertainties in docs/place-candidates.md; no public entries changed.
- Suggested five per category for story, visual and geographic variety, pending user selection.
- Kept folklore distinct from evidence and temporary hotel stays distinct from permanent residence.
- Retained Lavasa as an unfinished-city research option because describing it as completely abandoned would obscure residents.

## 2026-10-08 — selected 15-place collection
- Implemented the user's exact five selections per established category, on codex/curated-collection.
- Kept the approved magazine hierarchy, Kolmanskop feature, typography, colours, card layout, motion and reduced-motion behaviour. Added only a restrained illustration label to the existing cards.
- Kept Mirrorcube as one specific stay; added no hotel catalogue or room-selection interface.
- Added 12 sourced stories, retained Kolmanskop, Bhangarh and Mirrorcube, and preserved the original Bodie story URL outside the collection.
- Compared licensed photographs with unverified operator/archival images. Selected eight new Commons photographs with recorded licences; used explicitly drawn AI illustrations for four stays where exact reusable images were not established. Original generation files remain in the project.
- Labelled illustrations in cards, alt text, detail captions, credit sections and Sources. Link to operators for real accommodation imagery. No concept image is presented as a location photograph.
- Kept documented history separate from local legends and temporary bookings separate from permanent residence. Included source context for Hashima's wartime labour history.
- Updated collection numbering, sitemap dates and credit/licence handling for all ShareAlike images. Added accent-normalised search so kayakoy finds Kayaköy.
- Compressed selected image assets to roughly 32–355 KB; retained lazy-loaded cards and eager story images.
- Validation: TypeScript passed; production build passed; asset audit verified exactly 15 unique entries, five per category, complete source/credit fields and decodable images.
- HTTP audit passed for all 15 story pages and images, homepage, Sources, sitemap, robots, preserved Bodie URL and unknown-place 404.
- Browser checks passed for all category counts, India search (three results), accent-normalised search, empty-result recovery and Skylodge card-to-story navigation.
- Desktop and narrow mobile collection/story layouts were visually inspected; document width matched viewport content width without horizontal page overflow. Category tabs scroll within their own strip on mobile. Screenshots are in docs/research.
- Changes remain local; no deployment performed.

### 8 October 2026 — mobile category scrollbar
- Hid the category-strip scrollbar at widths up to 1050px, retaining overflow scrolling and the selected-tab underline.
- Verified hidden scrollbar styles and reachable end tabs at 390px; visually checked the strip at 768px. Production build passed.
- Saved mobile-category-scrollbar.jpg as visual evidence.
