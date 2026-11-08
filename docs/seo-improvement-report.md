# Odd Atlas SEO, AEO and GEO improvement report

**Prepared:** 5 November 2026  
**Scope:** Improvements beyond adding new place drafts  
**Evidence:** The supplied discovery assessment and the current Odd Atlas codebase

## Executive summary

Odd Atlas is not starting from zero. The site already has crawlable HTML, canonical URLs on the main editorial routes, an XML sitemap, `robots.txt`, source-backed place records, JSON-LD on several page types, and useful internal links.

The main opportunity is not to add SEO keywords everywhere. It is to make Odd Atlas easier to understand as **a research-led directory of unusual places that people can actually visit**, then make every important page answer a complete search question.

The recommended order is:

1. Make metadata and structured data consistent across every indexable route.
2. Strengthen the homepage and category pages around discovery intent.
3. Give every place page a consistent, source-backed answer and visit-planning structure.
4. Build editorial collections and comparison pages that connect the existing places.
5. Measure search visibility, engagement and external citations before changing titles again.

Adding places remains useful, but it should follow this foundation. More inventory alone will not solve unclear positioning, weak query coverage or missing evidence of authority.

## What is already working

- Public content is server-rendered and does not depend on JavaScript for the core story.
- `/sitemap.xml` includes the homepage, categories, places, blog posts, tools and guides.
- `/robots.txt` points to the sitemap and explicitly allows major search/retrieval crawlers.
- The homepage, browse page, category pages and place pages have canonical metadata.
- Place pages have unique titles/descriptions, Open Graph metadata, breadcrumbs and source citations.
- Category pages expose `CollectionPage` and `ItemList` JSON-LD.
- Place pages expose article/place information and `BreadcrumbList` JSON-LD.
- Images use local WebP assets, dimensions and descriptive alt text.
- Place pages link to category pages, practical guides and related places.
- The site distinguishes documented history, current visitor information and folklore.
- `/llms.txt` provides a useful machine-readable index of categories, guides and place stories.

These are foundations to preserve, not replace.

## Priority backlog

### P0 — Make the existing site consistently understandable

#### 1. Standardise metadata across all indexable pages

Create one shared metadata helper and use it for places, categories, guides, blog posts, tools and the source page. Audit each route for:

- one clear title, normally 50–60 characters where practical;
- a useful, non-duplicated description;
- an absolute canonical URL;
- Open Graph title, description, URL and image;
- Twitter card metadata;
- a stable `metadataBase`;
- explicit robots behaviour for private or utility pages.

The current implementation is good on many routes but inconsistent: some pages have no Twitter metadata or social image, while the root layout description and homepage description describe slightly different products. This is a quality and sharing issue, not a reason to add more keywords.

**Acceptance check:** export a route inventory and confirm every indexable URL has one canonical, one title, one description and valid social metadata.

#### 2. Add a schema validation pass

Keep JSON-LD, but make the types match the page purpose:

- homepage: `WebSite` plus `Organization`;
- browse page: `CollectionPage` plus `ItemList`;
- category pages: `CollectionPage` plus `ItemList`;
- place pages: `Article` with an associated `Place`, plus `BreadcrumbList`;
- visiting guides: `Article` plus `BreadcrumbList`;
- tools: `WebApplication` only where the page genuinely behaves as an application.

Do not add `FAQPage`, ratings, reviews, prices or tourist-attraction claims unless the visible page contains the same, verifiable information. Structured data should describe the page, not manufacture eligibility for rich results.

**Acceptance check:** validate representative homepage, category, place, guide and tool URLs in Schema Markup Validator and Google Rich Results Test.

#### 3. Complete the place-page answer pattern

Every place page should visibly answer, in a predictable order:

1. What is unusual about this place?
2. Where is it?
3. What happened here?
4. What is there today?
5. Can people visit or stay?
6. How do they plan the visit?
7. Which sources support the claims?

The code already enforces a minimum amount of location prose and has strong source handling. The remaining gap is consistency: direct question-led answers such as the Hashima and Kuldhara sections should become a standard editorial component, with wording adapted to each place.

**Acceptance check:** a reviewer can answer the seven questions from the page without opening another page, while current logistics still link to the relevant official operator or authority.

### P1 — Improve discovery and query coverage without changing the identity

#### 4. Rewrite the homepage positioning

Keep the visual/editorial voice, but make the first screen explicit:

> Discover the world’s strangest places: abandoned towns, mysterious locations, unusual natural wonders and extraordinary stays, with researched stories and practical visiting guides.

Use a concise supporting line and a visible link to the collection. The current “Somewhere out of the ordinary” headline is memorable but does not state the category strongly enough for a new visitor, search engine or AI system.

Suggested title:

`Odd Atlas — Unusual Places to Visit Around the World`

Suggested description:

`Discover unusual places around the world: abandoned towns, mysterious locations, unusual natural wonders and extraordinary stays, with researched stories and practical visiting guides.`

#### 5. Add search-intent collection pages using existing places

Do not replace the three established categories. Add editorial routes that answer distinct intents and link into the detailed place pages:

- `Strange places to visit around the world`
- `Abandoned places you can legally visit`
- `Places that look like another planet`
- `Unusual islands and remote destinations`
- `Extraordinary places to stay`
- `Haunted places: legends, history and how to visit`

Each collection should have an original introduction, selection criteria, a comparison table or useful summary, and links to the full story. Avoid thin “top 10” pages that only repeat card titles.

#### 6. Build a topic and internal-link map

Use three link layers:

- broad discovery page → category;
- category or collection → place;
- place → related place, guide, source and planning tool.

Add contextual links in prose, not only repeated card grids. Use descriptive anchor text such as “abandoned mining islands in Japan” rather than repeated “read more”.

**Acceptance check:** every published place is reachable from the homepage or browse page within three clicks and has at least two relevant contextual internal links.

#### 7. Improve query targeting without keyword stuffing

Map one primary question and a small set of supporting questions to each URL. Examples:

- `/places/hashima`: “Why was Hashima Island abandoned?” and “Can you visit Gunkanjima?”
- `/places/kuldhara`: “Why was Kuldhara abandoned?” and “How do you visit Kuldhara from Jaisalmer?”
- `/blog/...`: route, access, cost-checking and planning questions.

Avoid publishing separate pages for every slight wording variation. Where the intent is the same, improve the canonical page and link to it.

### P2 — Earn authority and improve AI discoverability

#### 8. Publish original, citable editorial assets

Give other publishers a reason to cite Odd Atlas:

- a maintained map of unusual places with source and access-status fields;
- a documented “history vs legend” methodology;
- a comparison of visitable, restricted and stayable places;
- original photography provenance and licensing notes;
- transparent update dates and change logs for visitor information.

The existing source page and `/llms.txt` are a good base. Make the methodology and update policy more visible on the site.

#### 9. Pursue relevant editorial mentions

Prioritise genuine links from geography, history, travel-planning, photography and regional publications. Pitch a useful research asset or a specific destination story, not a generic site announcement. Do not buy links or use automated directory submissions.

#### 10. Make citations easy for AI systems to preserve

On important pages:

- put the direct answer near the relevant question heading;
- name the source and link it beside the claim;
- state uncertainty explicitly;
- include “checked on” dates for changeable logistics;
- use stable, descriptive headings;
- keep the same facts consistent across the place page, guide and `/llms.txt`.

This improves answer extraction without trying to manipulate recommendations.

## Measurement plan

Before changing titles repeatedly, establish a baseline in Google Search Console and Bing Webmaster Tools:

- indexed URL count and exclusions;
- impressions, clicks, CTR and average position by page;
- queries containing “unusual”, “strange”, “abandoned”, “haunted”, “weird”, “visit” and destination names;
- Core Web Vitals and mobile usability;
- sitemap processing and crawl errors;
- external referring domains;
- engagement: place-page views, related-place clicks, guide clicks and return visits.

Add a lightweight route-level event taxonomy:

- `place_view`
- `guide_click`
- `related_place_click`
- `source_click`
- `collection_click`

Review monthly. Promote pages with impressions but low CTR for title/description testing; improve pages with clicks but low engagement by fixing intent matching and internal links.

## Verification still required

The supplied assessment explicitly did not verify live robots behaviour, sitemap processing, canonical responses, structured-data validity, page speed or Search Console data. Those should be checked after deployment. The code review alone cannot confirm:

- whether every sitemap URL returns a 200 response;
- whether the public domain serves the expected canonical tags;
- whether any redirects, duplicate URLs or accidental noindex responses exist;
- actual Core Web Vitals;
- indexing, CTR or external-link performance.

## Suggested implementation sequence

### Sprint 1

- shared metadata helper and route inventory;
- homepage positioning update;
- schema validation and missing social metadata;
- consistent place-page answer component;
- sitemap/robots/canonical live crawl.

### Sprint 2

- two high-value collection pages;
- internal-link map and contextual links;
- Search Console/Bing baseline and event taxonomy;
- content update/date policy.

### Sprint 3

- original research asset;
- targeted outreach;
- expand destinations only where a clear query gap remains.

## Definition of success

Success is not simply “more pages” or forcing Odd Atlas into AI answers. The site should become the clearest, most trustworthy result for people looking for unusual places they can understand and realistically experience:

- search engines can classify every important page;
- visitors immediately understand what Odd Atlas covers;
- every place page answers the practical and factual questions;
- related pages form a useful discovery path;
- sources and uncertainty are visible;
- impressions, CTR, engagement and relevant citations improve over time.
