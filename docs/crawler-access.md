# Crawler access

Odd Atlas publishes server-rendered place stories and visiting guides, an XML sitemap, explicit search/retrieval crawler permissions in robots.txt, and a generated llms.txt index. The index uses the existing place/category/blog records; adding a record updates it on the next build/deployment. No model API key or new dependency is required.

llms.txt is an optional discovery aid, not an indexing protocol or a guarantee of citations. This change preserves the existing wildcard Allow policy, including the existing treatment of training crawlers. No firewall rule is changed by robots.txt.

## Repeatable checks

After building and starting the production preview:

```powershell
node scripts/audit-crawler-access.mjs http://127.0.0.1:5198 docs/research/crawler-access-local.json
```

After deploying, run the same command with https://www.oddatlas.world and a separate report path. It checks robots.txt, llms.txt, the linked page responses, and whether representative stories and guides are present in HTML when making requests labelled with six search/retrieval user agents. A success verifies only the network making that request. A user-agent string can be copied and does not authenticate a crawler.

When a server cannot be started, use `node scripts/audit-crawler-access.mjs --generated docs/research/crawler-access-generated.json`. This checks generated production files and response metadata only; its report explicitly records `networkChecked: false`.

## Actual Vercel verification

Use the existing Odd Atlas project, not a new project/deployment:

1. Open Firewall → Traffic. Check Allowed, Denied and Challenged requests, not just the overview chart.
2. Filter or inspect requests for OAI-SearchBot, ChatGPT-User, PerplexityBot, Perplexity-User, Claude-SearchBot and Claude-User. Expand the time window when there are no matches. No matches means no observed requests, not a confirmed block.
3. For a matching request, inspect the path, timestamp, decision, response and rule responsible. An IP owned by a large cloud provider is not sufficient to identify a crawler.
4. Verify bot identity using Vercel's verified-bot classification and, where available, the provider's current published IP information. Do not allow arbitrary requests merely because their user-agent says "bot".
5. AI Bots should not be in Deny for the search access we want. Vercel documents Allow as the inactive AI-bot ruleset. Do not disable DDoS protection or add a blanket firewall bypass to fix an unverified problem.
6. If a verified search crawler is denied or challenged, inspect that exact rule and prepare a narrowly scoped change. Recheck subsequent real requests after any approved change. robots.txt cannot override a WAF decision.
7. If the page returns 200 with its full article but an AI assistant still reports a fetch failure, record the assistant, exact URL and time and correlate that with traffic logs. Tool/cache errors are not enough to diagnose the site's firewall. Retrieval and recommendation are distinct outcomes.

## Evidence and pending work — 29 October 2026

- Before this change, direct public requests to robots.txt, sitemap.xml, the homepage, Hashima place page and Hashima blog returned 200; article text and story chapters were in HTML. llms.txt returned 404.
- The web search fetching tool reported fetch/cache errors despite successful direct requests. The cause is not established.
- No connected Vercel management tool was available. Chrome computer access was not approved; opening Vercel in the in-app browser timed out. Actual crawler logs and managed firewall settings remain unverified.
- Initial validation: production build, targeted lint and generated-file checks passed. The llms.txt index has 32 targets in the build; representative home, place and blog text checks passed. The existing sitemap SEO audit checked 33 pages with no failures. Starting a production preview server was declined at that stage, so this initial report records networkChecked=false. Public HTTP validation must be run after the approved release; it does not establish actual crawler-network access.
- The tested Kuldhara transport changes were released first as feature bb795ae, dev merge 3205457 and main release 5941d79 on 29 October. This crawler branch now follows that main release; the generated index uses the updated Kuldhara title. Named stashes remain recoverable snapshots and must not be reapplied blindly over the released changes.

## Primary references

- https://developers.openai.com/api/docs/bots — search, training and user retrieval roles; current published network references.
- https://docs.perplexity.ai/docs/resources/perplexity-crawlers — search/user agents and verification of source networks.
- https://privacy.claude.com/en/articles/8896518-does-anthropic-crawl-data-from-the-web-and-how-can-site-owners-block-the-crawler — Claude search, user and training crawler roles.
- https://vercel.com/docs/bot-management — managed AI-bot rules and verified bots.
- https://llmstxt.org/ — optional Markdown index proposal.
