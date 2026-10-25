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

## 2026-10-15 — Pop-button reference
- https://raw.githubusercontent.com/Ashutoshx7/VengeanceUI/main/public/r/pop-button.json — layered raised-button motion reference supplied by the user. Independently adapted using local CSS with square corners and a tilted lower layer; no dependency installed.

- Only the visual layering concept was used; the final CSS uses the Odd Atlas colours, independent pseudo-element construction and reduced-motion rules.

## 2026-10-15 — Inline list title
- User feedback and installed Next.js forms guide. Implemented as a labelled native input styled like the existing heading; no new dependency or external visual source.

- Title editing preserves native form submission and keyboard behaviour rather than using editable HTML.

## 2026-10-15 — Responsive list UX refinement
- User-approved senior UI review findings and existing editorial styles; installed Next.js forms documentation consulted. Native textarea, ResizeObserver and CSS handle the refinement; no external asset or package added.

- Final browser evidence includes action geometry, keyboard flows and content-height checks for long list names.

## 2026-10-15 — Delete confirmation
- Existing components/ui/alert-dialog.tsx and installed Next.js forms documentation consulted. User feedback defines the unified button treatment; no external assets or dependencies added.

- Delete confirmation uses the existing AlertDialog components without adding an installer or package.

## 2026-10-15 — Equal action dimensions
- User feedback; local CSS refinement only, no external reference or dependency.

- Validation used the local production preview and computed button geometry/colours; no new external source.

## 2026-10-15 — Tilted shadow adjustment
- User visual feedback; CSS-only change using the existing button layers, with no new assets or dependencies.

- Validated against the local production preview; no external visual asset used.

## 2026-10-15 — Adventure Wall
- User-approved combined concept: Codex generated image exec-158edafb-aefa-4e7a-9a8e-1ee922348be3.png. Used as visual direction; no external design copied.
- Built-in image_gen generated the forest atlas, transparent sticker sprite and transparent landscape. Generation briefs and provenance are in docs/adventure-wall-prototype.md; these illustrations are not documentary destination imagery.
- Installed Next.js use-client and page documentation; existing Radix/shadcn alert-dialog component. Native HTML drag/drop, keyboard placement and localStorage; no new package or external service added.

- Final production preview verified local assets and noindex metadata; detailed prompt briefs and asset sizes remain in docs/adventure-wall-prototype.md.

## Adventure Wall refinement — 2026-10-15
The approved generated wall concept informed the explorer silhouette and stationery interactions. Ink seals and the updated walker are original inline SVG/CSS in components/adventure-wall.tsx and app/adventure-wall/wall.css. No additional external images, packages or sources were used.

Wall focus adjustment (2026-10-15): original CSS only; no new assets, packages or external references.

## Direct wall interaction — 2026-10-15
Original React, pointer-event and SVG implementation; no new external assets or dependencies. The panorama remains the previously documented generated illustration. Hashima's example now mirrors an actual typed note, without an attached sticker.

## Shared wall and reusable footer — 2026-10-15
- Island of the Dolls visiting journal, checked 16 October 2026: https://mexicocity.cdmx.gob.mx/venues/isla-de-las-munecas/ (local legend, explicitly folklore); https://www.mexicocity.cdmx.gob.mx/venues/lago-de-xochimilco-embarcadero-de-cuemanco/?lang=en (Cuemanco boats, hourly party pricing model and four-hour listed island route); https://www.xochimilco.cdmx.gob.mx/como-llegar/ (borough public transport and boat-launch information). Reused existing licensed place photograph, no new image source.
- Hashima visiting blog: https://www.discover-nagasaki.com/en/featured-topics/gunkanjima-landing-tour (operator directory, departure locations, visitor preparations); https://www.gunkan-jima.net/en/ (operator itinerary, landing conditions and refund terms); https://www.japan.travel/en/spot/752/ (guided visitor access). Read live on 15 October 2026. Existing verified Hashima photograph reused with its attribution and licence. No keyword-volume claims.
- Interactive footer follow-up: installed Next.js documentation at node_modules/next/dist/docs/01-app/03-api-reference/01-directives/use-client.md for the serializable client boundary. Reused existing wall assets and controls; no new external design source or package.
- Supabase official documentation: https://supabase.com/docs/guides/auth/auth-anonymous, https://supabase.com/docs/guides/getting-started/api-keys, https://supabase.com/docs/guides/database/postgres/row-level-security, https://supabase.com/docs/guides/database/functions. Used for anonymous identity, publishable keys, RLS and constrained database functions.
- Runtime: @supabase/supabase-js. Local test-only PostgreSQL engine: @electric-sql/pglite. No additional imagery or design template. Shared footer reuses the existing documented generated panorama.

### 2026-10-19 — Search presentation refinement
- Google title guidance: https://developers.google.com/search/docs/appearance/title-link
- Google snippet guidance: https://developers.google.com/search/docs/appearance/snippet
- Reused the Dolls guide's existing Mexico City Tourism Cuemanco route citation: https://www.mexicocity.cdmx.gob.mx/venues/lago-de-xochimilco-embarcadero-de-cuemanco/?lang=en . This change reorganizes previously sourced information; it does not claim a fresh operator verification.
- No new external images, packages or design references.

### 2026-10-19 — Deep Sleep and Hashima guides
- Go Below itinerary and FAQ (indexed snapshot; direct fetch failed): https://www.go-below.co.uk/deep-sleep.asp
- Visit Wales: https://www.visitwales.com/activity/activity/go-below-underground-adventures-541721
- Nagasaki Tourism history: https://www.discover-nagasaki.com/en/sightseeing/51797
- Nagasaki Tourism landing guide: https://www.discover-nagasaki.com/en/featured-topics/gunkanjima-landing-tour
- Yamasa Shipping: https://www.gunkan-jima.net/en/
- JNTO: https://www.japan.travel/en/spot/752/
- Reused existing licensed Hashima photograph and clearly labelled Deep Sleep concept illustration. No new image licence or package.

### 2026-10-19 — Focused technical SEO audit
- Google sitemap dates and canonical URL guidance: https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap
- Google breadcrumb structured data: https://developers.google.com/search/docs/appearance/structured-data/breadcrumb
- Google crawlable links: https://developers.google.com/search/docs/crawling-indexing/links-crawlable
- Installed Next.js sitemap and generateMetadata documentation. No new travel facts or media sources; source-review dates were not refreshed by this technical audit.

### 2026-10-20 — Kayaköy and Kuldhara practical guides
- Türkiye Culture Ministry location, road access and historical context: https://www.kulturportali.gov.tr/turkiye/mugla/gezilecekyer/kayakoy
- Official museum directory: https://muze.gov.tr/muze-detay?DistId=KYK&SectionId=KYK02
- Turkish Museums ticket categories, facilities and seasonal listings: https://www.turkishmuseums.com/museum/detail/2187-mugla-kayakoy-archaeological-site/2187/4
- The museum pages show conflicting closing times; the guide records that conflict rather than selecting one as guaranteed. Ticket figures are dated snapshots.
- Rajasthan Tourism taxi access, protected status and folklore: https://www.tourism.rajasthan.gov.in/kuldhara.html
- Jaisalmer destination guide: https://www.tourism.rajasthan.gov.in/jaisalmer.html
- No verified current Kuldhara admission price or timetable was found in these sources. Existing place photos and attribution reused; no new imagery.

### 2026-10-21 — Query alignment
- User-supplied Search Console query table; date range and average positions not provided. No search-volume claims inferred.
- Google title links: https://developers.google.com/search/docs/appearance/title-link
- Google SEO Starter Guide: https://developers.google.com/search/docs/fundamentals/seo-starter-guide
- Geography reused from existing sourced place entries. Source-review dates were not advanced by this editorial wording change.

## 2026-10-21 — Visible abandonment answers
- Hashima: JNTO https://www.japan.travel/en/spot/752/ checked for mine closure around 1974, changed energy needs and resident departure.
- Kuldhara: Rajasthan Tourism https://www.tourism.rajasthan.gov.in/kuldhara.html checked for the attributed local legend. Existing Current Science research and correspondence re-read: https://www.researchgate.net/publication/312385113_Deserted_Nineteenth_Century_Paliwal_Villages_around_Jaisalmer_Western_Rajasthan_IndiaHistorical_Evidence_of_Palaeoseismicity and https://www.researchgate.net/publication/323797999_Kuldhara_Devastation_and_the_Great_Exodus. Disagreement is retained; no definitive cause asserted.

## 2026-10-23 — Topical-map planning
- Google link best practices: https://developers.google.com/search/docs/crawling-indexing/links-crawlable. Descriptive crawlable links support discovery and help readers understand relationships.
- Google helpful-content guidance: https://developers.google.com/search/docs/fundamentals/creating-helpful-content. Used to prioritise useful research gaps over duplicative pages. No new destination facts published.
- Metrics retain the source periods from the owner's two 21 October exports; see docs/topical-map.md and the earlier comparison.

## 2026-10-23 — Practical context and browse navigation
- Dhanushkodi: https://ramanathapuram.nic.in/tourist-place/dhanushkodi/ (district's approximate 18 km and road access) and https://dgll.nic.in/DGLL-light-house-location/about-chennai/dhanushkodi-lighthouse (19 km lighthouse locator, nearby church/station, commissioning date and fishing navigation role). Gallery description is not represented as verified current public opening.
- Palacio de Sal: https://palaciodesal.com.bo/en/first-salt-hotel/ confirms its relocation from within Salar de Uyuni to the edge. Booking/excursion questions are editorial planning advice, not verified package inclusions.
- EntityMap specification reviewed: https://entitymap.org/spec/v1.0. This independent publisher-assertion format is not evidence of search-engine adoption; omitted from the public implementation to avoid adding a duplicate machine-oriented content layer without a confirmed consumer.

## Hashima practical planning — checked 24 October 2026
- Gunkanjima Cruise: https://www.gunkanjima-cruise.jp/en/ — normal online adult fare ¥3,600 + ¥650 facility entry through March 2027; April 2027 revision; reception, schedule, cash and minimum age.
- Its dated landing closure notice, linked from the homepage (21 October 2026), reports suspension from 22 October with reopening undecided; alternative sightseeing trip ¥3,600 adult, about 2h20 via Takashima. The page URL slug contains an older month/day: the displayed date, heading and body are the evidence used.
- https://www.gunkanjima-cruise.jp/en/about/ — direct booking/payment, restrictions, weather and refund conditions.
- https://www.gunkanjima-cruise.jp/reserve_input.php?lang=en — reservation page specifies Japanese guiding only. No booking submitted.
- https://www.gunkanjima-concierge.com/cgi/web/ — Japanese calendar lists standard adult ¥5,500 + ¥650, specific days +¥500, museum included and credit-card-only payment. Normal pricing does not establish current landing access or availability.
- Half-day allowance and optional extra night are Odd Atlas editorial suggestions; prices exclude travel to Nagasaki, meals and accommodation. Historical sources and full story are unchanged.

- Hashima field-guide prototype: layout reuses the 24 October operator research above; no new factual claims or source-review dates introduced. Half-day plan remains explicitly editorial; published departure/check-in times are attributed to Gunkanjima Cruise.

- USD estimates: Investing.com USD/JPY Historical Data, https://www.investing.com/currencies/usd-jpy-historical-data — 23 October 2026 row: JPY156.87 per USD, checked 24 October. JPY3600≈USD23, JPY4250≈USD27, JPY6150≈USD39, JPY6650≈USD42. Bank conversion can differ. Bank of Japan PDF was inaccessible; not used as verified evidence.

- Shared place-page essentials (24 October layout update): labels in lib/place-essentials.ts summarise each existing record’s access/story and cited sources. No new price, timetable or fresh source-review claim. Stanley hotel stay action uses the hotel homepage rather than its separate tour page.


## Full practical guides for every place — 24 October2026

See docs/research/place-trip-source-audit-2026-10-24.md for per-place price evidence, exchange-rate links and source-access limitations.
- Ramanathapuram District — access and distances: https://ramanathapuram.nic.in/tourist-place/dhanushkodi/
- Ministry museum service — opening and ticket office: https://muze.gov.tr/muze-detay?DistId=KYK&SectionId=KYK02
- Culture Ministry — site and distance from Fethiye: https://www.kulturportali.gov.tr/turkiye/mugla/gezilecekyer/kayakoy
- Rajasthan Tourism — location and taxi access: https://www.tourism.rajasthan.gov.in/kuldhara.html
- Rajasthan Tourism — Bhangarh visitor restrictions: https://www.tourism.rajasthan.gov.in/bhangarh-fort.html
- Ghost Town Tours — 2026/27 rates and tour schedule: https://kolmanskuppe.com/tours-prices/
- Operator-linked ticket service: https://www.webtickets.com.na/v2/EventCategories.aspx?itemid=1502439554
- Bank of Namibia — NAD/ZAR one-to-one peg: https://www.bon.com.na/Informations/FAQ/Roles-of-the-Bank.aspx
- California State Parks — fees, directions and conditions: https://parks.ca.gov/?page_id=509
- Mexico City Tourism — Xochimilco: https://www.mexicocity.cdmx.gob.mx/locations/xochimilco/?lang=en
- Paris Catacombs — official site and indexed full tariff: https://www.catacombes.paris.fr/
- Museum — conditions before visiting: https://www.catacombes.paris.fr/en/visit/please-read-your-visit
- Port Arthur Historic Site — Ghost Tour rates and access: https://portarthur.org.au/ghost-tour/
- The Stanley — Ghost Tour price and conditions: https://www.stanleyhotel.com/tours/the-stanley-ghost-tours/
- The Stanley — hotel stays: https://www.stanleyhotel.com/
- Natura Vive — packages, suggested itinerary and inclusions: https://naturavive.com/web/skylodge-adventure-suites/
- Treehotel — Mirrorcube rate and facilities: https://treehotel.se/treerooms/mirrorcube/
- White Desert — Whichaway camp: https://white-desert.com/camps/whichaway-camp
- White Desert — rates and preparation process: https://white-desert.com/prices
- Go Below — cabin price, duration and age: https://www.go-below.co.uk/en/adventures/deep-sleep-cabin/
- Go Below — overnight experience and FAQs: https://www.go-below.co.uk/en/adventures/deep-sleep/
- Palacio de Sal — hotel information: https://palaciodesal.com.bo/en/
- Palacio de Sal — direct booking: https://palaciodesal.com.bo/en/booking/


## Island of the Dolls and Deep Sleep guides — checked 25 October 2026
- https://mexicocity.cdmx.gob.mx/venues/lago-de-xochimilco-embarcadero-de-cuemanco/?lang=en — official Cuemanco route list: four hours for Island of the Dolls; hourly boat charging rather than passenger charging; dock address. Successfully read through web tool.
- https://www.xochimilco.cdmx.gob.mx/turismo-2/ — borough publishes MX$750/hour for tourist/ecological boat rides and maximum 18 passengers. Direct Python request returned 403; full page text was available through live web fetch/search. Combined with the separate four-hour route as an explicitly labelled MX$3,000 boat-only calculation, not a confirmed route/package quote. Island admission not verified.
- https://www.xochimilco.cdmx.gob.mx/como-llegar/ — borough transport directions via Tasqueña and Tren Ligero to Xochimilco; not represented as a direct rail journey to Cuemanco.
- https://mexicocity.cdmx.gob.mx/venues/isla-de-las-munecas/ — original tourism/legend reference retained; ordinary HTTP fetch returned 200. Don Julián story presented as folklore. No claim of a verified replica-island inventory.
- https://ca.investing.com/currencies/usd-mxn-historical-data — pricing provider lists 23 October 2026 closing USD/MXN 18.6700. Rounded USD budget examples: MX$3,000 ≈ US$160, two sharing ≈ US$80 each, four sharing ≈ US$40 each. Original pesos and conversion date disclosed.
- https://www.go-below.co.uk/en/adventures/deep-sleep/ — directly read current HTTP 200 itinerary and FAQs: 17 hours; 14+; £399 cabin / £599 Grotto; 30-minute approach followed by about two hours underground descent; equipment, meals, bedding, heated rooms, toilet, Wi-Fi, 10°C mine, packing, fitness and overnight leaders. Current calendar shows 5 pm departures; no hardcoded live availability. Older deep-sleep.asp snapshot has different journey timings and was not used for current itinerary.
- https://www.go-below.co.uk/en/adventures/deep-sleep-cabin/ — directly read HTTP 200 cabin page: £399, two single beds, 17 hours, 14+, Tanygrisiau, dated availability. Price presented per cabin for up to two, not per person. Grotto mentioned only as a choice, not a room inventory.
- GBP→USD estimate reuses the already sourced 23 October rate in lib/place-trip-plans.ts (1.34 USD/GBP): https://wise.com/us/currency-converter/gbp-to-usd-rate/history/23-10-2026. No fresh-rate claim.
