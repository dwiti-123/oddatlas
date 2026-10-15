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
