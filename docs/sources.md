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
