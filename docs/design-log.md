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

### 8 October 2026 — personal list and optional story context
- Added restrained bookmark controls on collection cards and story headers, with a shared Your list navigation link and browser-local persistence. No account is required.
- Kept card links and save buttons separate for accessible navigation. Disabled saves until hydration; handle blocked storage with a session-only notice.
- Added a personal saved collection with remove and empty states. Excluded this private browser-specific page from search indexing.
- Used native details/summary to reveal existing sourced context, folklore and visiting guidance. No fabricated longer story or new location claims were added. Sources remain visible outside the disclosure.
- Deferred postcards and characters as agreed. Preserved the editorial baseline, mobile navigation and reduced-motion support.
- Verified desktop save/navigation, persistence after reload, mobile removal/empty state, keyboard story expansion/collapse, and mobile document width. Screenshots: saved-list-desktop.jpg and story-interaction-mobile.jpg.
- Final validation: TypeScript and production build passed; git diff whitespace check passed. Changes remain local.

### 8 October 2026 — a story for every place, and an ink bookmark
- Developed an original opening and three distinct chapters for all fifteen selected places. Added history, turning points, architecture and experience using cited research rather than expanding the former practical-information toggle.
- Sources include official cultural and tourism bodies, museum accounts, UNESCO documents, operator/architect descriptions, Stephen King's own account, and the published Kuldhara research debate. Kayaköy's account stays within the Culture Ministry evidence; additional sources were not added just to inflate its bibliography.
- Labelled folklore and disputed interpretations. Added colonial context for Kolmanskop and retained Hashima's wartime labour context. No invented firsthand observations, supernatural events, facility claims or superlative hotel rankings.
- Kept the same canonical place URLs. Full text is server-rendered inside a native disclosure; opening it moves reading focus to the first chapter with reduced-motion handling. Numbered citation links point to an ordered source list at the end, followed by existing image credits.
- Preserved the short introduction, made visiting guidance independently available, and moved the mobile sidebar below the reading column.
- Reviewed Paper Shaders, Paper's roadmap and Motion's Three.js integration. Chose a custom 480ms SVG bookmark stamp, check stroke and brief ink accent: appropriate scale for a save action, no GPU canvas or extra animation dependency, and no new postcard feature.
- Save motion runs after a save action, not on load. Reduced-motion CSS keeps the static saved check visible.
- Validation: all fifteen stories have three developed chapters and resolved source URLs; every full story and numbered citation is present in server HTML. HTTP audit passed for all collection entries and images, supporting routes, preserved Bodie URL and missing-place 404.
- Browser checks: desktop Hashima expansion moves focus to the reader; citation 3 reaches the correct source. Mobile Skylodge expands by keyboard with no page overflow, saves with the 480ms gesture, persists after reload without replay, and removes cleanly. Kuldhara renders separate folklore/context labels and both sides of the published debate.
- Captured full-story-desktop.jpg and full-story-mobile.jpg. Refreshed the preview server after detecting stale CSS; confirmed 36px desktop chapter headings and the intended mobile reading layout.
- Final TypeScript check, production build and whitespace check passed. Changes remain local; no publishing performed.

### 8 October 2026 — source note spacing
- Added 28px top margin above the source-context note to separate it from the source list.
- Verified computed spacing on desktop and mobile; mobile has no horizontal overflow.
- Production build passed. Saved source-note-spacing.jpg as visual evidence.

### 9 October 2026 - complete native Next.js migration
- User explicitly requested native Next.js for the whole project on a separate branch. Work is isolated on codex/native-nextjs; main stays at the revert commit 2a955ed.
- Replaced development, build and production commands with next dev, next build and next start. Pinned Node.js to 22.x; retained the existing Next.js and React versions.
- Removed Vinext/Vite/Cloudflare dependencies, Sites worker/preview/auth/connector scaffolding and unused D1 examples. Retained the active place data, image research scripts, shadcn controls and browser-local saved list. Added sharp directly because asset scripts use it.
- Added Vercel configuration for the same native Next.js build used locally. Updated internal navigation to Next.js Link/useRouter while preserving styling and content. Kept precompressed images and documented the focused image lint exception.
- Updated README commands and preview-branch deployment guidance. Canonical URLs remain a separate domain configuration step.
- Validation: npm run build, npm run typecheck and npm run lint passed. Both native development and production servers returned the homepage successfully. Production HTTP audit passed all fifteen stories/images, sitemap, robots, sources, Bodie and missing-place 404.
- Browser checks: desktop categories, full-story expansion, save/list navigation, reload persistence and removal passed; mobile homepage and story had no horizontal overflow. All story images loaded and no browser console errors were recorded. Evidence: research/nextjs-desktop.png and research/nextjs-mobile.png.
- Next.js development generated its standard agent-rules block in AGENTS.md while retaining all project standards. Retained that block to keep subsequent development checkouts consistent.

### 9 October 2026 - public-domain crawl correction
- Read the live robots.txt and sitemap.xml at www.oddatlas.world; both still referenced the earlier Sites preview domain. Source inspection confirmed place canonicals and Article mainEntityOfPage did too.
- Prepared a focused correction on codex/public-domain-seo: replaced the old domain in metadata, structured data, sitemap and crawler sitemap link; added the homepage's own canonical. Kept page titles, stories and design unchanged. Main and the live deployment remain unchanged until merge approval.
- Validation: native production build and TypeScript passed. Production output checks confirmed the corrected robots sitemap link, all 17 public-domain sitemap entries, homepage and Hashima canonicals, and the Article URL. Temporary test server stopped.

### 9 October 2026 - Vercel Web Analytics
- User requested Vercel Analytics. Added the official @vercel/analytics Next.js component in the shared root layout on codex/vercel-analytics so pageviews cover all routes. No visual controls or custom events added.
- Chose the existing hosting provider's basic visitor analytics to minimize setup. Search Console remains the source for Google search queries and ranking data.
- Live collection requires dashboard activation and deployment; local integration does not enable the Vercel account setting. Main remains unchanged pending merge approval.
- Validation: production build, lint and standalone TypeScript passed. Initial sandbox build encountered Windows path access denial; the retry outside the sandbox passed. Live event delivery remains unverified until activation and deployment.

### 13 October 2026 - first organic-search improvements
- Work isolated on codex/search-guides. Improved homepage search wording and descriptive titles/descriptions for Bhangarh, Hashima and Dhanushkodi while retaining their URLs and editorial headings.
- Added visible, server-rendered practical answers with official-source links for those three places. Avoided speculative prices, opening hours, firsthand claims and FAQ rich-result promises.
- Added /guides/haunted-places with five existing mystery entries, access comparisons, real credited photographs, sources and clear folklore distinctions. Paris Catacombs are described as historically unsettling rather than claimed haunted.
- Added homepage discovery link and return links from mystery entries, canonical/Open Graph metadata, CollectionPage/ItemList data and the guide in the sitemap. Updated modification dates only for changed pages.
- Preserved the magazine typography, thin rules and restrained colours. No booking or Instagram features added. No publication performed.
- Validation: production build, lint and TypeScript passed. Browser verification confirmed the three descriptive titles, Bhangarh and guide canonicals, three visible practical answers per selected story, five guide ItemList entries and working homepage-to-guide navigation. Guide and homepage had no mobile horizontal overflow at 390px; desktop guide layout checked. No browser console errors recorded.
- Browser checks caught stale production CSS; clearing only the generated .next/cache and rebuilding restored the new styles. Evidence: research/seo-guide-desktop.png and research/seo-guide-mobile.png.
# 14 October 2026 — Discovery tools and crawlable directories

- Observation: the deployed architecture already had server-rendered location routes; the new request's map-only diagnosis did not match the code. Zero impressions alone cannot identify a rendering failure.
- Decision: extend the native Next.js App Router with generated static place/category pages and daily ISR. Reuse built-in metadata and sitemap support rather than introduce a package.
- Scope: preserve the selected 15-place collection and existing editorial design. Preserve Bodie's older route and include it in route generation. Add only three populated category directories; no fabricated border-anomaly entries or empty landing pages.
- Interaction: one random-place button with an HTML list fallback, and a five-question country quiz using real records, explanations, links, score and restart. No account or new storage.
- Content: question titles and headings, original image alt descriptions, sourced 300-word minimum location prose, and explicit separation of historical claims and folklore. Question headings and dwell time are not guarantees of rankings or rich-result placement.
- Maps: lazy OpenStreetMap embeds with attribution, visible coordinates and source links. Approximate property/regional points are labelled; no routing or unrestricted-access implications.
- Images: add descriptive compressed WebP aliases, keeping old image URLs working. Labels, credits and licence conditions stay visible.
- Git: `codex/discovery-seo`; unfinished named-list changes preserved in a named Git stash, not folded into this work.
- Validation: production build, TypeScript and lint passed. Production HTTP checks verified all 24 sitemap routes, 16 initial HTML articles/maps/images/canonicals and unknown-route 404s. Location prose counts range from 302 to 355 words, excluding navigation and credits. Browser checks covered the five-question quiz (four correct, one incorrect, 4/5 score and restart), random navigation, category links and an interactive OpenStreetMap zoom control. At 390px the quiz, random tool, location map and category page had no horizontal overflow. Fixed an existing global mobile navigation rule that hid the final category; verified all three category links visible. Screenshots: `docs/research/discovery-random-desktop.png`, `discovery-random-mobile.png`, `discovery-category-desktop.png`, `discovery-category-mobile.png`. Browser console reported no errors or warnings. Changes remain local, not merged or deployed.
# 14 October 2026 — More inviting place search titles

- User selected Google search titles for every place page. Updated all 15 collection entries and the preserved Bodie URL on `codex/discovery-seo`.
- Formula: recognisable place name plus a question the existing story answers. Keep haunted reputations as questions and legends; avoid asserting supernatural events or an unexplained disappearance as fact.
- Kept visible H1 headings, stories, descriptions, routes and design unchanged. Existing metadata also uses these titles for social previews and Article headlines.
- Titles range from 56 to 69 characters including ` | Odd Atlas`; this is an editorial length check, not a guarantee of Google’s display width or wording.
- Validation: production build and its TypeScript check passed. Inspected all 16 generated HTML files; each contains the exact updated title and its unchanged visible H1. No deployment or main-branch changes.

## 15 October 2026 — Matching place titles

Feature branch: `codex/place-title-consistency`, based on the preserved discovery draft. Place H1 headings now use the same title helper as metadata, social previews and Article headlines. Only the search title adds the brand suffix; map markers and cards retain short place names. Long headings use a restrained responsive type scale. Validation is performed with the integrated feature build.

## 15 October 2026 — Visit/stay labels

Feature branch: `codex/visit-stay-labels`, stacked on title consistency. A shared component gives every card and detail page the same accessible text and colours: terracotta Visit only, forest green You can stay here. Overnight stays remain temporary bookings; no residency claim. Saved cards inherit the shared component. Map cards will reuse it. Existing source records support the stay flag; no new external source used.

## 15 October 2026 — Explore map

Feature branch: `codex/explore-map`, stacked on visit/stay labels. Added a separate map/list experience with existing sourced coordinates, category/access/search filters, marker popups, story links, locator notes and mobile Map/List controls. Leaflet loads only on this route, with visible OpenStreetMap attribution. Existing homepage composition and Bhangarh story/access information are retained. A sidebar list and noscript links preserve non-map navigation. Final production build and TypeScript checks passed. Browser verification and evidence are recorded below.

## 15 October 2026 — Surprise me on the map

Feature branch: `codex/map-surprise-me`, stacked on Explore map. A single action picks from the current filtered results, avoids the current selection when alternatives exist, and uses the same pin/popup/mobile focus flow as a list card. Disabled for no results; a one-place result remains usable. Respects reduced motion. No new geographic data or external sources.

Map verification findings: fixed popup clipping/reselection and a hidden-canvas animation failure found when resizing with a selected place. Map resize handling now checks that the canvas has non-zero dimensions before invalidating or animating, closes hidden popups and skips hidden-marker popup creation. These fixes were fast-forwarded only into the map feature branch, leaving main/dev untouched.

Final feature validation: lint and production build passed. Existing HTTP verification passed for all 25 sitemap URLs, 16 place articles, image/canonical checks and unknown-route 404s. Compiled HTML checked for matching title/H1 text on all 16 places and 15 initial map cards. Browser checks covered direct pin selection, list-to-popup selection, accent-insensitive search, 6 stay and 9 visit-only results, category conflicts/no-results/reset, random selection without immediate repeat, popup story navigation, and matching Bhangarh heading/title. Repeated selected-place Map/List switching (three rounds), filter changes while hidden and tablet-to-phone resizing passed after the hidden-canvas fix. Width checks at 390px and 820px showed no horizontal overflow. Screenshots: `docs/research/agreed-map-desktop.png`, `agreed-map-mobile.png`, `agreed-title-mobile.png`. Main remains at d7f4d86; no dev branch exists, and nothing was pushed or deployed.

## 2026-10-15 — Named, shareable saved list
- Approved: rename the existing collection and share a fixed snapshot using an encoded URL; no account or extra dependency.
- Shared views do not overwrite the visitor’s own list. Duplicate names are allowed. Names are bounded and rendered as text; slugs are validated against the curated collection.
- Restored only the relevant draft files on codex/named-shareable-lists, preserving the stash and current map/title work.
- Translation researched separately; no translation library installed.

- Validation: lint passed; production webpack build passed after Turbopack worker startup failures. Browser checks passed for renaming/reload, fixed shared snapshots, invalid/duplicate slug filtering, personal-list isolation, native share completion, and a 390px layout with no horizontal overflow. Encoding/bounds checks passed; console had no errors. Screenshots: docs/research/named-list-mobile.png and shared-list-desktop.png.

## 2026-10-15 — Multiple lists on this device
- User approved separate named lists, device-only persistence, an immediate list picker, and clearing create/rename fields after submission.
- One versioned localStorage record now keeps each unique list ID, name and place membership together. Existing saved places and name migrate into the first list; old keys are retained as a fallback, never reimported after an intentional empty collection.
- Reused the existing Radix/shadcn dialog for accessible list selection. A place can belong to multiple lists, changes save immediately, and list-specific removal leaves other lists intact. Duplicate names are supported.
- Sharing remains an encoded fixed snapshot, with an explicit copyable link. Deletion asks for confirmation inside the page. No accounts, new packages, or translation changes.
- Added storage regression coverage for migration, duplicate names, rename/reload, independent membership, deletion, and unavailable storage.

- Final validation: production build (Next.js webpack) and lint passed. Storage regression checks passed. Browser verified migration of the existing My weekend collection, field clearing, create-from-place, multi-list membership, rename/reload, remembered selection, copied sharing, snapshot stability, list-specific removal, delete/cancel, and 390px layouts without overflow. Test-created lists were removed; the original collection was preserved. Screenshots: multiple-lists-desktop.png, multiple-lists-mobile.png, multiple-lists-picker-mobile.png.

## 2026-10-15 — Intentional list editing and tactile buttons
- User requested Edit list beside Delete list instead of an always-visible rename form. Editing opens a prefilled, focused name input with Save changes and Cancel; Escape cancels and returns focus to Edit list.
- List action buttons use the existing brick/cream palette with a second ink colour as a solid offset shadow. Hover slightly lowers the face; active presses it flush. Keyboard focus and reduced-motion support remain.
- Scoped to saved-list actions and the existing list picker; no additional package or changes to stored data. Feature branch: codex/list-edit-buttons.

- Validation: production webpack build, lint and existing device-storage regression checks passed. Browser checks confirmed prefilled/focused editing, Cancel without mutation, save/reload persistence, restored original name, Escape focus return, desktop and 390px mobile layout with no horizontal overflow. Screenshots: list-edit-desktop.png and list-edit-mobile.png.

## 2026-10-15 — Sharp tilted pop-button refinement
- User supplied VengeanceUI Pop Button as a motion reference, requesting sharp rather than soft corners and a tilted shadow.
- Inspected the registry: one React component, no dependencies. Adapted the layered press effect directly in existing CSS: square face, skewed hard-edged lower ink layer, hover compression and a flush press; retained editorial colours and reduced-motion support.
- No registry installer or new package needed. Separate branch codex/sharp-pop-buttons.

- Validation: production webpack build passed; desktop and 390px browser checks confirmed square faces, transformed hard-edged lower layers, working edit/cancel controls and no horizontal overflow. Screenshots: sharp-pop-desktop.png and sharp-pop-mobile.png.

## 2026-10-15 — Edit the list heading in place
- User clarified that only the displayed list title should become editable, without a separate input panel.
- Edit list now replaces the heading with a borderless, prefilled title field in the same position and typography. Save/Enter persists it; Cancel/Escape restores the heading without mutation and returns focus to Edit list.
- Kept the sharp tilted button style, local storage and shared snapshots unchanged. Separate branch codex/inline-list-title.

- Validation: production webpack build and lint passed. Browser confirmed editing replaces the title in place, current name/focus, Escape cancellation/focus return, Enter save, reload persistence, original name restored, and 1280px/390px layouts without horizontal overflow. Screenshots: inline-list-desktop.png and inline-list-mobile.png.

## 2026-10-15 — Refine list action hierarchy and responsive editing
- User approved one mobile action row and a quieter editorial treatment. Desktop actions sit beside the title; mobile uses one compact Share/Edit/Delete row with 44px targets. Share retains a 2px tactile shadow; Edit is outlined cream and Delete is understated text.
- While editing, normal actions are absent and only Save/Cancel remain. This prevents stale-name sharing and accidental draft loss through Delete. A wrapping title textarea grows with content and width changes; Enter saves, Shift+Enter inserts a line, Escape cancels.
- Added visible whitespace-name errors and corrected singular place counts in list tabs and the place picker. Removed superseded heavy-button/editor CSS. No dependencies or storage schema changes. Branch codex/refined-list-actions.

- Validation: production webpack build and lint passed. Browser measured Share/Edit/Delete on the same row at 320px, each 44px high, with no horizontal overflow; checked 390px, 820px and 1280px layouts. Confirmed blank-name alerts, wrapping/resizing titles, keyboard Cancel, Enter save/reload, original name restored, Share/Delete absent while editing, copied current-name links and delete cancellation. Browser console clean. Screenshots: refined-list-desktop.png and refined-list-mobile.png.

## 2026-10-15 — Consistent list buttons and deletion modal
- User approved one cream, sharp-border button style for Share/Edit/Delete, with equal spacing, height and press behaviour. Delete gets a brick hover/focus cue without a different shape.
- Replaced inline delete confirmation with the existing Radix/shadcn AlertDialog: named title/description, focus trap, Cancel-first default focus, Escape cancellation and trigger focus restoration. No new dependency. Branch codex/consistent-list-buttons.

- Validation: production webpack build and lint passed. Browser confirmed identical default face/border/padding/44px height/shadow on Share/Edit/Delete, one-row mobile layout, modal Cancel-first focus, Cancel/Escape dismissal with trigger focus restoration, and actual deletion of a temporary test list only. Original list preserved after reload; checked 320px/390px/1280px layouts. Screenshots: consistent-list-mobile.png, consistent-list-desktop.png and list-delete-modal-mobile.png.

## 2026-10-15 — Equal list action dimensions
- User requested equal button sizes. Share/Edit/Delete now each use an 80px-wide, 44px-high face with identical spacing and press effect, preserving a single row at 320px.
- Scoped to the main list action row; confirmation and form controls retain space for their longer labels. Branch codex/equal-list-action-sizes.

- User then noted that the faces blended into the page. Increased the shared cream fill contrast and darkened the common border/shadow, preserving identical styling across the row.
- Validation: production webpack build passed. Browser measured identical 80x44px faces on desktop and mobile, matching fill/border colours, a single row and no horizontal overflow at 320px. Screenshot: equal-contrast-buttons-mobile.png.

## 2026-10-15 — Slightly deeper tilted shadows
- User requested a larger dark shadow area and a small tilt. Shared button shadow now offsets 3px right/4px down with a 2-degree skew; hover and press still compress the layer. Equal button dimensions and face colours are unchanged. Branch codex/tilted-list-button-shadows.

- Validation: production webpack build passed. Browser confirmed identical tilted shadow transforms on all three 80x44px buttons, desktop/mobile appearance, and no horizontal overflow at 320px. Used and removed a temporary preview list because the current collection was empty. Screenshot: tilted-button-shadows-mobile.png.

## 2026-10-15 — Adventure Wall prototype
- User approved an isolated, device-only implementation of the combined forest pinboard/atlas mockup. Built /adventure-wall on codex/adventure-wall-prototype, preserving the existing site footer and saved-list feature.
- Generated three production illustration assets with image_gen, compressed to local WebP; real text, paper cards, writing form, stationery choices and placement controls overlay them. Art is labelled illustrative and example contributions are explicitly marked.
- Notes/tickets/stamps/stickers can be written, signed, dragged, tapped onto the canvas, moved via keyboard or removed with confirmation. Device-only wishes and bounded local storage are independent of saved lists. Explorer has pause/play and reduced-motion support.
- Details and generation briefs: docs/adventure-wall-prototype.md.

- Validation: final production webpack build and lint passed. Storage regression tests passed. Browser verified note validation/signature, all four stationery types, native tray drag/drop and existing-trace drag, tap placement at 320px, keyboard placement/move, removal confirmation, persistence after hydration, local wish toggles and animation pause/play. Checked 320px/390px/1440px layouts with no horizontal page overflow; the map itself pans intentionally. Production console clean and robots noindex confirmed. Removed test contributions and wishes. Screenshots: adventure-wall-desktop.png, adventure-wall-mobile.png and adventure-wall-writing.png.

## 2026-10-15 — A quieter, more tactile Adventure Wall
- User approved a focused tray, real ink seals and a clearer animated explorer.
- Only the chosen stationery drawer is visible. Three labelled examples replace the five-card starting layout; existing device entries retain their storage schema.
- Native SVG circular destination seals replace postage-like paper stamps. Double rings, interrupted strokes and destination lettering distinguish them from illustrated peelable stickers.
- Notes/stickers lift at the corner, tickets slide from the tray, seals press and settle. The explorer is larger, wears mustard and brick, starts visibly within the landscape and pauses during composition/placement. Reduced motion remains supported.
- No dependencies, backend, publishing or shared-data changes. The explorer is a native vector interpretation of the approved mockup, not an exact bitmap conversion.
- Validation: production webpack build and lint passed; storage parser checks passed. Browser checks covered desktop, tablet (768px), mobile (390px and 320px), drawer switching, seal placement/reload persistence, removal confirmation and automatic animation pause. Test contribution removed; existing device data preserved. No browser errors or page overflow observed.

## 2026-10-15 — Smaller wall pieces and focused writing
- Reduced all placed map pieces by 12%, preserving the tray choices and stored positions.
- Added a softly dimmed, blurred page backdrop only while the writing card is open. The card stays sharp and its close/cancel controls remain available; the backdrop clears for map placement.
- Scope is limited to these visual adjustments; prior uncommitted wall refinements remain preserved on the new branch.
- Validation: production build passed. Desktop/mobile visual checks confirmed the writing card remains sharp, closing restores the page, and placement clears the blur. No preview contribution was saved. Screenshot: docs/research/adventure-wall-writing-focus.png.

## 2026-10-15 — Place first, write on the paper
- User approved replacing the form with direct pick/place interactions, plus typed and freehand notes. Stamps/stickers now place immediately; tickets offer an on-paper destination choice. Keyboard placement and mobile tap fallback remain available; touch supplies also use pointer capture for dragging.
- Notes expose Type and Handwrite on the placed paper. Freehand supports pointer input, Undo and Clear. Empty notes cannot post. The drawing is bounded numeric stroke data, rendered as SVG; no uploaded HTML, SVG markup or image payload is accepted. Existing device records remain compatible.
- Removed the walking character and its controls, retaining the landscape. Removed obsolete modal/backdrop and walker styles.
- The Hashima example is now plain text on paper, because users cannot create a single combined note/sticker object. The example ink seal no longer has a caption users cannot compose in the new flow.
- No packages, shared counts, backend, publication or main-branch changes. Work is on codex/direct-wall-notes, preserving all earlier local refinements.
- Validation: production webpack build, TypeScript, lint and storage tests passed. Manual browser checks covered typed posting/empty validation, freehand strokes, Undo/Clear, handwriting reload persistence, keyboard seal placement, immediate native sticker drag/drop, ticket destination editing, desktop/mobile paper layout and cancellation. Production browser reported no warnings/errors; no horizontal page overflow. Mouse/pointer drawing was checked at mobile viewport dimensions; physical touch/stylus hardware was not available. All agent-created test contributions and drafts were removed without altering prior user records. Captures: adventure-wall-direct-desktop.png, adventure-wall-direct-note.png and adventure-wall-direct-mobile.png.

## 2026-10-15 — Shared wall foundation, tactile paper, common footer
- User approved connecting an existing Supabase project and will add environment values themselves. No remote project was modified; .env.local was created only if absent, with blank public connection fields. Added a tracked .env.example template.
- Official Supabase client handles public reads and anonymous Auth at the time of posting/reporting. Database migration adds only odd_wall-prefixed objects: public traces, private reports, RLS, ownership checks, numeric drawing validation, idempotent posts, soft removal and bounded posting/report limits. Existing local notes remain private. Failed posts retain the draft rather than silently publishing locally.
- Added a local PostgreSQL test dependency (PGlite) to exercise the actual migration without accessing the user's Supabase project. Ownership, policy and limit tests passed.
- The editor now uses the actual small paper footprint at the selected coordinates; controls float beside it instead of expanding it into a writing card. The native drag image uses the peeled paper face, not the full stack. Typed/freehand modes, Undo/Clear and tap/keyboard placement remain available.
- Extracted one illustrated AdventureFooter reused through the site shell and the dedicated wall, so the homepage, place stories, saved lists, categories, tools, sources, map and not-found page share the footer. The full interactive wall remains only at /adventure-wall. Footer artwork is lazy-loaded and makes no database requests.
- SEO deployment check: live Hashima, Bhangarh and Kolmanskop returned their older titles/headings. Latest local curiosity titles and title/H1 consistency are not deployed. No publish or merge performed.
- Validation: production webpack build/TypeScript and lint passed. Device-storage tests and local PostgreSQL shared-wall tests passed, including anonymous read, denied unauthenticated writes, cross-user mutation denial, report privacy, moderation hiding, payload bounds and rate limits. Production desktop/mobile checks verified small-paper controls, private posting/cancel, handwriting input, one common footer on homepage/place pages and no page overflow. No production browser warnings/errors. Supabase project connection, Auth configuration and cross-browser remote visibility remain unverified because the environment values/migration have not been supplied/applied. Existing user-created private traces were preserved; no automatic upload occurred.
- Preview evidence: docs/research/shared-wall-small-paper-desktop.png, shared-landscape-footer-desktop.png, shared-landscape-footer-mobile.png. Database setup instructions: docs/shared-wall-setup.md.

## 2026-10-17 — Five-role typography system
- User approved the reported five-role scale. Preserved contact/category work as local commit 0d92815, then created codex/consistent-typography. Added app/typography.css with display, section, card, body and support tokens, exact desktop/mobile endpoints and fluid intermediate sizing.
- Replaced bespoke sizes in global, wall, map, footer and blog CSS with role tokens; removed 51 redundant responsive size declarations. Mapped existing shadcn text utilities to the same roles. Logos and decorative SVG seal lettering remain exceptions. Contact us stays at supporting size, per the latest request.
- Increased tiny functional wall and footer copy to the supporting role; allowed navigation/captions to wrap and expanded paper tools rather than shrinking text. Removed whole-trace scaling so text is not visually reduced below its role. Heading leading is shared; reading leading stays comfortable.
- No new dependency or external design source. Read installed Next.js CSS documentation. Validation follows; no push or deployment.

## 2026-10-17 — Contact, place suggestions and category URLs
- Follow-up: user requested hiding the displayed email address. Replaced it with a single clickable Contact us heading; the destination remains in the mailto href. This hides the address from page copy, not from inspection of the link. Existing request email action retained.
- Follow-up sizing: reduced Contact us from 32px serif heading styling to a 14px sans-serif text link, matching the quieter footer actions. Email destination unchanged.
- Approved implementation on codex/contact-place-requests. Added a shared footer contact section with the user-provided email and a Request a place action beside the collection heading and in the footer. mailto links open a draft only; no email is sent by the site. Suggestions request a source, preferred credit name and permission before public credit.
- Replaced homepage client-only category tabs with crawlable category links, reusing existing static category URLs/canonicals. Category pages use the same navigation with aria-current; All places returns to /#places. Search still filters the homepage collection. URL changes are for navigation and discoverability, not a ranking guarantee.
- Responsive navigation wraps instead of using a horizontal scrollbar. Reused established colours and typography; no dependencies or external design sources. Read installed Next.js Link documentation.
- Validation passed: targeted ESLint, production webpack build (34 routes), desktop/390px category screenshots, correct active ghost category and five cards, matching canonical, Back navigation, all category route selections and All places return, search (Hashima: one result), mailto address/decoded draft fields, and footer layout at 390px/320px with no document overflow. Email actions were inspected without launching a mail client or sending email. Evidence: docs/research/category-navigation-desktop.png, category-navigation-mobile.png, contact-footer-desktop.png and contact-footer-mobile.png. Local preview port 5177; no push/deployment.

## 2026-10-16 — Direct access to all blogs
- User requested a blog section for direct access to all articles. Saved the completed Island of the Dolls work locally as 01e6cd6 and created codex/blog-directory. Added /blog, a server-rendered editorial index with two photographed article cards, descriptions, real image credits and CollectionPage/ItemList data.
- Header and shared discovery footer link directly to /blog. Both article breadcrumbs link back. A single lib/blog.ts registry drives the listing and sitemap entries. Kept the existing ivory/serif treatment and reused assets; no package or external design source.
- Validation passed: targeted ESLint, production webpack build (34 routes), desktop/390px visual checks and 320px overflow/navigation check. Both cards open their intended articles and header Blog returns to the index. Blog remains visible on narrow screens. Evidence: docs/research/blog-index-desktop.png and blog-index-mobile.png. Preview on port 5176. No push or deployment.

## 2026-10-16 — Header discovery and Island of the Dolls journal
- Added the requested Leave a trace header anchor to the current page's interactive footer. Narrow headers wrap navigation beneath the wordmark, keeping the action visible without shrinking tap targets. Saved as local commit bd74648 on codex/header-leave-a-trace; no push performed.
- User then requested an Island of the Dolls blog. Created codex/island-of-dolls-blog from the header change. Added /blog/how-to-visit-island-of-the-dolls with the existing journal styles, licensed place photograph, canonical, BlogPosting data, source references, sitemap entry and a link from its place page.
- Focus: visiting from Mexico City via Xochimilco, agreeing the destination/stop/price before boarding, the official Cuemanco route duration, and distinguishing the Don Julián legend from documented facts. Exact fares, guarantees and first-hand claims were deliberately omitted. Practical suggestions are identified as editorial advice. Keyword targets are relevance hypotheses, not measured search volumes.
- Read Mexico City Tourism's island and Cuemanco pages and Alcaldía Xochimilco's transport page live on 16 October 2026. Reused current photo licensing; no new package or imagery.
- Validation passed: targeted ESLint and production webpack build (33 routes), desktop and 390px article screenshots, 320px header visibility and no document overflow. Canonical matches the production article URL; all internal anchors resolve. Clicking the mobile header link scrolled to the footer (48px from viewport top) and loaded the embedded wall. No posts submitted. Evidence: docs/research/island-dolls-blog-desktop.png and island-dolls-blog-mobile.png. Preview on port 5175. No push or deployment.

## 2026-10-15 — Release preparation and requested branch promotion
- User explicitly requested smaller commits, push, feature-to-dev merge, then dev-to-main merge. Fetched origin; no local or remote dev existed, so create dev from current main before promotion. Preserve all existing feature commits and avoid history rewriting.
- Split remaining implementation into Supabase backend/security tests, interactive wall/footer, card alignment, Hashima blog, and documentation/evidence commits. Unrelated untracked adventure-wall-concepts folder remains local.
- Validation passed: production webpack build, ESLint, device list migration/persistence tests, wall parser tests, local PostgreSQL RLS/ownership/limits tests and production HTML discovery verification (26 sitemap routes, 16 location articles). Discovery used current port 5174; the older 5173 server had a stale route manifest.
- .env.local is ignored. Only the blank .env.example is tracked; tracked source scan found no embedded Supabase key/JWT/private-key literals. Vercel still needs public Supabase environment values configured in its production build settings; local .env.local is not uploaded.

## 2026-10-15 — First practical visiting journal
- Approved Hashima visiting article implemented on codex/hashima-visiting-blog at /blog/how-to-visit-hashima-island. It answers tour-planning intent separately from the existing history page; target phrases are hypotheses, not measured search volumes.
- Server-rendered article uses the established editorial type and real licensed Hashima photograph, a short answer, jump links, question headings, inline source references and a sources section. No first-hand experience or publication date invented.
- Added matching title/H1, description, canonical, social metadata and BlogPosting structured data, sitemap entry, Hashima sidebar link and shared discovery-footer link. Reused existing photo attribution/licence; no new dependency or generated imagery.
- Sources checked against official Nagasaki Tourism, Yamasa Shipping and JNTO pages. Kept volatile prices, schedules and refund percentages on operator sites; English/Japanese operator wording differed on refunds, so the article tells readers to check their booking terms instead of claiming a universal policy.
- Validation: production webpack build and targeted ESLint passed. Desktop and 390px mobile browser checks showed readable layout and no document overflow; title/H1 match, canonical resolves to the www production article URL, and all internal anchors have targets. Screenshots: docs/research/hashima-blog-desktop.png and hashima-blog-mobile.png. Preview on port 5174 because 5173 was occupied. Local only; no push or deployment.

## 2026-10-15 — Interactive footer and consistent collection cards
- Approved direction: let visitors contribute directly at the end of browsing, retaining the dedicated wall as a larger view. Reused the existing wall with an embedded variant that omits its masthead, main landmark and nested footer. The illustrated footer remains below the interaction.
- Deferred the wall module and Supabase read until its footer approaches the viewport using IntersectionObserver and Next dynamic loading. Mobile keeps a horizontally pannable board, rather than shrinking writing controls.
- Reserved two lines for place names and four for descriptions; made card links flexible so category/save controls align. No text truncation, fabricated content or new dependency.
- Created codex/interactive-wall-footer and codex/consistent-place-card-heights. Work remains uncommitted in the existing working tree; these branch pointers do not yet isolate separate feature commits. Main was not edited or deployed.
- Validation: production build and full lint passed before the last description-spacing refinement. Desktop cards measured equal heights and category positions. Mobile footer showed no document overflow and one main/footer; peel, placement, inline editor and cancellation worked without posting test content. Mobile exposed one shorter description, addressed by the four-line minimum. Final production rebuild follows.
- Final production rebuild passed. At 390px, all 15 cards measured the same 573px height with no document overflow. Local production preview restarted on port 5173.
- Evidence: docs/research/interactive-footer-desktop.png and interactive-footer-mobile.png. No external design sources used; read installed Next.js use-client documentation.

## 2026-10-15 — Live shared-wall connection verified
- Owner added the public environment values, applied the SQL migration successfully and enabled anonymous sign-ins in the Odd Atlas-only Supabase project. The organization is shared; this project's database is dedicated to Odd Atlas.
- Verified two isolated anonymous visitor sessions against the real project. Typed and handwritten test posts could be read with an unauthenticated public client, drawing strokes were preserved, and a second visitor could not move or remove the first visitor's traces (P0001 as expected).
- Soft-removed both temporary test traces using their owner session and verified neither appeared in the public feed. Test anonymous Auth identities were not administratively deleted; no elevated credentials were used. No user-created private traces were uploaded or modified.
- Rebuilt the local Next.js preview successfully with the supplied public environment values. Browser confirmation showed Shared traveller’s wall and Refresh wall after loading, without a shared-feed error. Production domain/deployment remains unchanged.

## 2026-10-17 — Tighter card description spacing
- Reduced description reservation from four lines to two and bottom margin from 16px to 10px. Longer text remains fully visible; flex layout keeps labels aligned within each row.
- Kept card numbering beside the country metadata to prevent uneven title positions after the typography update.
- Verified the final desktop row has equal heights and label positions; mobile has no horizontal overflow and uses the 10px margin. Evidence: docs/research/compact-card-spacing-desktop.png. Local only.

## 2026-10-17 — Request button breathing room
- Added a scoped 16px top margin to the footer Request a place button. Collection toolbar spacing is unchanged.
- Verified desktop and mobile computed spacing and no horizontal overflow. Evidence: docs/research/request-place-margin-mobile.png.

- Follow-up: increased only the button's top margin to 24px so the suggestion paragraph has more breathing room; section padding is unchanged.

- Reverted the Request a place top-margin additions at the user's request; restored original button spacing.

- Final footer button fix: applied a dedicated CSS Module class with 16px margin above only the bottom Request a place link. The open wall tab required a reload before the new styles appeared. Verified actual paragraph-to-button gap is 16px on desktop/mobile with no mobile overflow. Screenshot: docs/research/footer-request-button-gap.png.

## 2026-10-19 — Search presentation and visiting guide discovery
- Implemented on codex/search-presentation. Search metadata now resolves through the same helpers as H1 and structured data, using existing reviewed searchDetails for Bhangarh, Hashima and Dhanushkodi and specific descriptions for other places. Added location-led titles for Dolls, Deep Sleep, Skylodge and Mirrorcube; retained existing URLs.
- Clarified Dolls location and local name in the opening. Added a sourced three-part visiting summary above the guide photo, reusing already published route information and its original review date. Added homepage previews for both existing guides via the blog registry.
- Validation: production webpack build and targeted ESLint passed. Generated HTML checks confirmed matching title/H1 and descriptions for seven affected place pages. Desktop/mobile checks showed no horizontal overflow, visiting summary before photo and valid guide links. Evidence: docs/research/dolls-essentials-desktop.png, dolls-essentials-mobile.png and home-visiting-guides-desktop.png. Local only; no push or deployment. Search performance remains an experiment, with insufficient impressions to claim a CTR gain.

## 2026-10-19 — Deep Sleep article and expanded Hashima guide
- Article work continues on codex/deep-sleep-hashima-guides; the earlier uncommitted search-presentation changes are retained in the working tree. Created a practical Deep Sleep guide and expanded the existing Hashima URL to avoid a duplicate article.
- Deep Sleep distinguishes the guided camp from a conventional hotel, labels its concept illustration, cites Go Below and Visit Wales and avoids volatile prices. Direct operator fetch returned 404 in the research tool; an indexed operator snapshot supplied the FAQ, so the article discloses that limitation.
- Hashima adds history, booking comparison questions and visiting essentials. Updated its source-review date after checking official tourism and operator sources. Registered Deep Sleep in blog discovery and sitemap, linked from its place page and fixed blog image captions to distinguish illustrations from photographs.
- Desktop/mobile browser checks passed for both articles without overflow; internal section/source anchors resolve. Screenshots: docs/research/deep-sleep-guide-desktop.png, deep-sleep-guide-mobile.png and hashima-guide-expanded-desktop.png. Local only; not pushed or deployed.
