# Agreed map features — 15 October 2026

## Branch structure

Each feature is a local branch with a focused commit. These are stacked branches, meaning later branches include the earlier ones as dependencies. Main and dev are not changed. No branch has been pushed or deployed.

| Branch | Purpose | Based on |
| --- | --- | --- |
| `codex/discovery-seo` | Preserved earlier discovery draft | Existing main baseline |
| `codex/place-title-consistency` | Matching story H1 and search titles | Discovery draft |
| `codex/visit-stay-labels` | Shared two-colour visit/stay labels | Title consistency |
| `codex/explore-map` | Searchable world map, linked list, filters and mobile switch | Visit/stay labels |
| `codex/map-surprise-me` | Random selection from the current map results | Explore map |

The unfinished named saved-list draft remains in its pre-existing named Git stash. It is not part of these features.

## Implementation

- `/explore/map-view` is a separate page with server-rendered explanatory text and location links. The editorial homepage keeps its existing layout and gains a navigation link.
- `lib/map-places.ts` selects only the 15 curated records and passes slim public fields to the client. Existing sourced coordinates and approximate locator notes are retained.
- `components/explore-map.tsx` renders the searchable/filterable list in initial HTML. Only `atlas-map-canvas.tsx` is loaded without SSR, because Leaflet requires the browser.
- React Leaflet 5.0.0 and Leaflet 1.9.4 support the existing React 19 setup. No framework migration or external account is introduced.
- Desktop displays map and list together. At 760px and below, Map/List buttons choose the view. A ResizeObserver keeps the canvas sized after a view switch. Keyboard users can choose every place through the labelled list buttons and story links.
- Terracotta means Visit only; forest green means You can stay here. Text accompanies the colours. Overnight bookings are temporary, not permanent residency.
- Selecting a card focuses the point and opens its popup, with photo/illustration label, country, access label and story link. The selected locator note remains separate and visible.
- Filters cover category, visit/stay status and accent-insensitive text search. Reset restores the world view. Empty results offer a recovery action.
- Maps use official OpenStreetMap HTTPS tiles, with visible attribution, normal browser caching/referrers and no bulk downloading, offline caching or speculative prefetch. This is a starting provider for modest usage, not a guaranteed commercial tile service; select a suitable hosted provider as traffic grows.
- No geolocation, satellite imagery, booking, country guides or submission backend is included in this scope.

## Review and validation

Production build, lint and TypeScript are required. Inspect rendered HTML for matching H1/title text, all initial location links and the map sitemap entry. Browser verification covers desktop, 390px mobile, search, both access labels, category filters, no results/reset, list-to-marker selection, popup links, attribution and the mobile toggle. Final evidence is recorded in the design log.

Before publishing, review the earlier discovery draft as well as the individual feature commits. The cumulative branch contains those previous local changes. Existing dependency security findings are a separate outstanding task; these map additions do not constitute a full security update.
