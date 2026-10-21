# Search Console baseline and focused improvements

Export: oddatlas.world-Performance-on-Search-2026-10-21.xlsx, supplied by the owner. Daily rows cover 8–18 October 2026; the filename is not the report end date. Search type: Web.

- Chart totals: 99 impressions, 1 click, 1.01% CTR; impression-weighted average position approximately 37.2 (daily positions are rounded).
- Pages: /places/hashima has 35 impressions, 0 clicks, position 31; /places/kuldhara has 2 impressions, 0 clicks, position 11. The Hashima visiting blog has 1 impression, position 46.
- Queries: “why was hashima island abandoned” has 5 impressions, position 9; “why is hashima island abandoned” has 2 impressions, position 9. “kuldhara abandoned village” and “why was kuldhara abandoned” each have 1 impression, position 11. All four have 0 clicks.
- These are separate page and query aggregates. This workbook does not establish which URL appeared for each query. Check a query filter followed by the Pages tab before claiming query-to-page attribution or cannibalisation.
- Seven impressions around position 9 do not establish that a snippet is underperforming. The homepage received the single click. No claim of a fixed search-results page or guaranteed ranking improvement.

## Implementation

Branch: codex/hashima-kuldhara-search-answers. Earlier uncommitted query-alignment changes were retained.

- Replace the generic “known for” opening on these two stories with an always-visible abandonment question, direct answer, named sources and a practical guide link. The existing detailed narrative and editorial styling remain.
- Hashima: explain closure around 1974 and departure of the mining community using JNTO. Update its description to match the answer. Preserve its existing resolved title.
- Kuldhara: state that the cause is disputed; distinguish Rajasthan Tourism's legend from the 2017 earthquake interpretation and 2018 scholarly debate. Preserve the title and description.
- Keep visiting guides focused on logistics. Do not add competing abandonment articles, FAQ schema promises, new packages or speculative access information.
- Advance the two place editorial modification dates to 21 October, without implying a fresh review of every visitor source.

## Measurement after deployment

Record the actual deployment date. Compare the next 14 days against this baseline for the four queries and the two place URLs. Track impressions, clicks and position at query and page level, acknowledging different country/device mixes and the small sample. Avoid repeated title changes during observation. Local generated HTML checks cannot verify deployment, indexing or ranking changes.
