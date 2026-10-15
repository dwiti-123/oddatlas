# Discovery SEO architecture

The existing app was already server-rendered, not a client-only map canvas. This change extends the editorial collection without replacing the homepage or changing frameworks.

```text
app/
  places/[slug]/page.tsx                 static location pages, daily ISR
  category/[anomaly-type]/page.tsx       static category directories, daily ISR
  tools/random-weird-place/page.tsx     indexable utility landing page
  tools/geography-anomaly-quiz/page.tsx  server landing + client quiz
  sitemap.ts                           one root sitemap, generated from records
components/
  location-map.tsx                      lazy OpenStreetMap iframe + visible coordinates
  random-place-button.tsx               client navigation only
  geography-quiz.tsx                    accessible five-question quiz
  place-card.tsx                       reusable crawlable location links
lib/
  places.ts                            source records, stories, SEO titles and locator sources
  discovery.ts                         category definitions, URLs, metadata and image helpers
public/images/                         descriptive WebP aliases; old URLs preserved
scripts/verify-discovery.mjs            initial HTML and route checks against production server
next.config.ts                         disables X-Powered-By; no rewrites needed
```

## Rendering and publishing

`generateStaticParams` builds every record in `allPlaces`, including the preserved Bodie page. Location and category pages use `force-static` with `revalidate = 86400`. Unknown slugs return 404, rather than creating indexable empty pages. Existing `/places/*` URLs stay unchanged.

The TypeScript array is bundled application data. Adding a record updates location routes and `/sitemap.xml` at the next build/deployment, not immediately on the public site when a local file is edited. Daily ISR serves the deployed dataset; a future CMS would need runtime fetching and webhook revalidation. Google decides when to fetch and index the sitemap.

The sitemap currently includes 24 canonical URLs: home, sources, guide, 16 place pages, three categories and two tools. Saved lists stay outside it. New directory entries require a supported category; do not create empty or near-duplicate filter routes to inflate page count. Border anomalies and enclaves are not yet sourced entries in this collection.

## Adding a place

1. Add its record and original sources to `lib/places.ts`, with the correct existing category.
2. Write the sourced story and practical notes. At least 300 location-specific prose words are required for this implementation; length itself is not a ranking factor or a reason to add filler.
3. Add a truthful question title and locator coordinates with their source to `discoveryDetails`. Mark approximate/regional locators explicitly. Map pins are not walking routes or permission to enter. Static route generation stops the build if an entry has under 300 words or lacks discovery metadata.
4. Add a licensed, compressed image using the path returned by `placeImage`. Keep the record's `alt` as a description of the actual image. Label concept illustrations as illustrations. Preserve licensing and provenance fields.
5. Add the slug to `order` to include it in the selected collection, directories, and random generator. All records independently enter permanent routes and the sitemap.
6. Build, check the output, and deploy through the existing Vercel project once authorised. Do not create a new project or change the domain.

## Validation

Run `npm run build`, `npm run lint`, and `npm run typecheck`. Start the built app at port 5173 and run `node scripts/verify-discovery.mjs`. The script checks sitemap uniqueness and new routes, production HTTP responses, canonical links, initial HTML articles/maps/questions, image availability, minimum prose length and unknown-route 404s.

Manually check desktop/mobile category browsing, random navigation, correct/incorrect quiz answers, final score, restart, keyboard focus and layout overflow. Maps require network access to OpenStreetMap; the coordinates, source and Google Maps link remain in server HTML. The first quiz intentionally uses five fixed questions drawn from existing place records and reveals sourced explanations after each answer.

## SEO limits

Question headings help people find answers but do not guarantee People Also Ask placement. A quiz is a useful discovery interaction, not a guaranteed ranking signal through dwell time. More URLs, word counts and schema do not guarantee impressions or AI citations. Continue tracking actual indexing and queries in Search Console.

There are no new dependencies. `next-sitemap`, a map SDK and a database are unnecessary for the current scale. Existing dependency security findings remain a separate unresolved task; this change does not upgrade packages or change firewall settings.
