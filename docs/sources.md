# Odd Atlas — sources

Research date: 2026-10-07. Sources below were consulted, not copied. Search results that were not used are excluded.

## Candidate research
See [place-candidates.md](place-candidates.md) for the original 30 researched candidates, supporting links, provisional access assessments and the Lavasa qualification. The selected collection below records the implemented subset. The remaining candidates are research options.

## Selected collection — 8 October 2026
The user selected five places per category. The complete factual and image-source list for those 15 entries is in [selected-place-sources.md](research/selected-place-sources.md), generated from the actual collection data. Sources are also linked on every detail page and the public Sources page.

- Eight new photographs use Wikimedia Commons licences verified through file metadata. Exact file URLs, creators, dates and licences are preserved in lib/image-provenance.json and docs/research/image-candidates.json. Original files are retained in public/images.
- Eleven selected places use real photographs, including the three retained foundation entries.
- Skylodge, Whichaway, Deep Sleep and Palacio de Sal use AI-generated editorial illustrations. They are labelled on cards, in alt text, in captions and in the credit sections. They are conceptual drawings, not precise room or building representations. Official operator links provide actual imagery.
- Illustrations were generated using textured gouache-and-pencil prompts, a restrained natural palette, no text or logos, and an explicit instruction to avoid photographic or exact architectural representations. Originals are in docs/research/illustration-originals; compressed WebP versions are used on the site.
- The Palacio de Sal Commons category was consulted, but its older salt-hotel photographs were not used because the precise current property identification was insufficiently clear.
- Hashima's history includes a link to the UNESCO/ICOMOS 2021 full-history interpretation mission. Whichaway's location is supported by the operator's published fact sheet. Practical guidance avoids unverified rates or live booking inventory.

## Design inspiration
1. [Another Escape](https://anotherescape.com/) — viewed homepage content and a browser screenshot; photography-led introduction and editorial story hierarchy.
2. [Atlas Obscura](https://www.atlasobscura.com/) — read homepage content; place/location/hook structure and discovery routes. No visual layout claims based on text inspection.

## Tools and implementation documentation
3. [Paper](https://paper.design/) — official product reference; no connected Paper canvas available in this session.
4. [Paper Shaders](https://shaders.paper.design/) — official shader reference; consulted as an optional technique, not yet integrated.
5. [shadcn/ui introduction](https://ui.shadcn.com/docs) — composable accessible primitives and code ownership.
6. [shadcn/ui components](https://ui.shadcn.com/docs/components) — official component reference.
7. [Official shadcn resources](https://ui.shadcn.com/docs/official) — verified official documentation domain.

## Attempted but not used
- [Sidetracked](https://www.sidetracked.com/) — blocked by security verification; not used as design evidence.

## Place facts and image credits
### Factual sources used
- [California State Parks — Bodie](https://parks.ca.gov/?page_id=509)
- [California State Parks — Bodie FAQs](https://www.parks.ca.gov/?page_id=31549)
- [Rajasthan Tourism — Bhangarh](https://www.tourism.rajasthan.gov.in/bhangarh-fort.html)
- [Ghost Town Tours — Kolmanskop](https://kolmanskuppe.com/)
- [Ghost Town Tours — tours and access](https://kolmanskuppe.com/tours-prices/)
- [Namibia Tourism Board — Ghost Town Tours](https://visitnamibia.com.na/directory/ghost_town_tours2038/)
- [Treehotel — accommodation information](https://agents.treehotel.se/)
- [Treehotel — press and media](https://treehotel.se/press-media/)

### Photographs used
- [Kolmanskop sand](https://commons.wikimedia.org/wiki/File:Kolmanskop_sand.jpg): Damien du Toit, 2006, CC BY 2.0.
- [Bodie — Ghost Town, NARA 543342](https://commons.wikimedia.org/wiki/File:Ghost_Town_-_NARA_-_543342.jpg): Dick Rowan/EPA/National Archives, 1972, public domain.
- [Bhangarh gallery](https://commons.wikimedia.org/wiki/File:A_view_of_the_gallery_of_the_haunted_fort_of_Bhangarh.jpg): KalkiRaj, 2016, CC BY-SA 4.0.
- [Mirrorcube](https://commons.wikimedia.org/wiki/File:The_Mirrorcube,_Treehotel_in_Harads,_Sweden_1_-_Jan_3,_2019.jpg): steffen l, 2019, CC BY 2.0.
- [CC BY 2.0 licence](https://creativecommons.org/licenses/by/2.0/), [CC BY-SA 4.0 licence](https://creativecommons.org/licenses/by-sa/4.0/).

Photographs are resized, compressed, and cropped for display; Bhangarh image adaptations retain CC BY-SA 4.0. Attribution and licence links are also present on detail pages and the public sources page. No reference-site photographs were copied.

### Consulted image candidates not used
- [Kolmanskop theatre](https://commons.wikimedia.org/wiki/File:Kolmanskop,_Namibia_(3147308849).jpg): Joachim Huber, CC BY-SA 2.0; replaced with sand-filled interior.
- [Bhangarh excavated site](https://commons.wikimedia.org/wiki/File:EXCAVTED_SITE_OF_BHANGARH.jpg) and [entire view](https://commons.wikimedia.org/wiki/File:Bhangarh_fort_entire_view.jpg): reviewed search previews only, not used.

### Personal-list interaction update, 8 October 2026
Uses existing project components and previously sourced place text. No new external inspiration, imagery or factual sources used.

### Full stories and save motion — 8 October 2026
- All story chapters, including folklore and disputed interpretation, have a linked source register: [Full-story research register](research/story-research.md).
- Updated complete entry sources and existing image credits: [Selected collection register](research/selected-place-sources.md).
- Reviewed [Paper Shaders](https://shaders.paper.design/), [Paper roadmap](https://paper.design/roadmap) and [Motion for Three.js](https://motion.dev/docs/three). The roadmap lists Three.js islands as planned; Motion documents an available integration. Chose original SVG/CSS motion for this small interaction; no animation assets or library code copied.

### Native Next.js migration - 9 October 2026
- https://nextjs.org/docs/app/getting-started/installation - native project scripts and installation.
- https://nextjs.org/docs/app/api-reference/cli/next - development, build and production CLI.
- https://vercel.com/docs/builds/configure-a-build - framework build and output settings.
- https://vercel.com/docs/project-configuration/vercel-json - repository deployment configuration.

### Public-domain SEO review - 9 October 2026
- Live inspection: https://www.oddatlas.world/robots.txt and https://www.oddatlas.world/sitemap.xml.
- Bundled Next.js metadata, robots and sitemap reference files in node_modules/next/dist/docs.
- Google Search Console performance report: https://support.google.com/webmasters/answer/7576553

### Vercel Web Analytics - 9 October 2026
- https://vercel.com/docs/analytics/quickstart - official Next.js integration and dashboard activation.
- https://vercel.com/docs/analytics/limits-and-pricing - plan limits and custom-event availability.
- Bundled Next.js app analytics guide in node_modules/next/dist/docs/01-app/02-guides/analytics.md.

### Search guides - 13 October 2026
- Rechecked https://www.japan.travel/en/spot/752/ for Hashima tour access and conditions.
- Rechecked https://ramanathapuram.nic.in/tourist-place/dhanushkodi/ for location, cyclone history and road access. This official page is dated 2018; no current timetables, fees or transport availability inferred.
- Rechecked https://www.tourism.rajasthan.gov.in/bhangarh-fort.html for folklore and the restriction before sunrise/after sunset.
- Haunted/mysterious guide summaries reuse the sourced place records; original photo credits and licence links remain on each full entry.
- Bundled Next.js generateMetadata and sitemap guides consulted for canonical metadata and sitemap generation.
# Discovery SEO implementation — 14 October 2026

- Next.js installed documentation: `generate-static-params.md`, `generate-metadata.md`, and metadata `sitemap.md` under `node_modules/next/dist/docs/01-app/03-api-reference`. Used for static routes, async params, metadata and the single root sitemap.
- Google Search Central: https://developers.google.com/search/docs/appearance/ai-features — standard SEO fundamentals apply; no special AI schema or citation guarantee.
- OpenStreetMap attribution: https://wiki.openstreetmap.org/wiki/Attribution and https://www.openstreetmap.org/copyright. Interactive maps use the official export iframe with attribution.
- Bodie source expansion and directions point: https://www.parks.ca.gov/?page_id=509 and https://www.parks.ca.gov/?page_id=31549. Original editorial prose; no invented first-hand visit.
- Locator research: each `discoveryDetails` entry in `lib/places.ts` records its coordinate source. Sources include Wikidata (Hashima/Bhangarh/Paris), GeoNames (Dhanushkodi/Kolmanskop), Urban Academy research (Kayaköy), Wikipedia locator data (Kuldhara/Dolls/Stanley/Deep Sleep), UNESCO nomination (Port Arthur), OpenStreetMap Treehotel node, Palacio de Sal's operator contact page, White Desert's current itinerary and a property listing for Skylodge.
- Approximate locators: Mirrorcube uses the Treehotel property point, Deep Sleep a non-precise regional point, Whichaway the current operator-published locator, and Skylodge an approximate listing locator. These are labelled and do not replace operator meeting-point instructions. No story/history claims were taken from coordinate-only sources.
- Existing verified image manifest and place source records remain the authority for photographs, licences and factual stories. New image filenames are byte-identical aliases, not new imagery.
# Place search title refinement — 14 October 2026

Titles use only the existing sourced stories in `lib/places.ts`; no new factual claims or external sources added. Native Next.js `generate-metadata.md` was consulted to confirm that absolute titles avoid duplicating the root title suffix. Source links for history, folklore and operator information remain on each entry.

## Map implementation references — 15 October 2026

- React Leaflet v5 installation: https://react-leaflet.js.org/docs/start-installation/ and map API: https://react-leaflet.js.org/docs/api-map/. Used for React 19 integration, MapContainer and useMap. Installed stable exact package versions rather than documentation prerelease examples.
- Leaflet reference: https://leafletjs.com/reference.html — map flyTo, fitBounds, CircleMarker and popup behaviour.
- OpenStreetMap tile policy: https://operations.osmfoundation.org/policies/tiles/ — official HTTPS tile URL, visible attribution, normal browser caching/referrer, no bulk fetch or offline prefetch.
- Installed Next.js lazy-loading guide: browser-only dynamic import lives inside a Client Component; the directory list and context stay server-rendered.
- Location coordinates, folklore/history distinctions and image licences use the existing place records and their individual source links; no new location claims added.

## 2026-10-15 — Lists and translation research
- Installed Next.js page API documentation: asynchronous searchParams for shared-list URLs.
- https://next-intl.dev/docs/routing/configuration — locale detection, preference cookies; translations supplied as messages.
- https://developers.weglot.com/javascript/javascript — hosted automatic translation integration, an alternative to curated messages.

- https://www.weglot.com/pricing and https://www.weglot.com/technical-presentation — hosted automatic translation plans and client-side versus server-side integration choices; research only.

## 2026-10-15 — Multiple device lists
- Installed Next.js forms guide and existing components/ui/dialog.tsx consulted for client form and accessible dialog integration. No external content or new libraries used.

- Implementation uses browser localStorage, crypto.randomUUID and clipboard APIs; no server database or translation service was added.

## 2026-10-15 — List editing UI
- User-described two-colour pressed-button reference; implemented in CSS using the existing editorial palette. Installed Next.js forms guide consulted. No external visual assets used.

- Native CSS box-shadow and transform implement the pressed state; no animation library or external script added.
