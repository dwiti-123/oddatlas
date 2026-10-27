# PostHog analytics

## Connect the project
1. Create/open the Odd Atlas project at https://app.posthog.com.
2. Open Project settings (Settings → Project). Copy the **Project API key / project token** from the project setup snippet, not a personal API key.
3. Add these to `.env.local` and the Vercel project environment variables:

```dotenv
NEXT_PUBLIC_POSTHOG_KEY=your_project_key
NEXT_PUBLIC_POSTHOG_HOST=https://us.i.posthog.com
```

For an EU project use `https://eu.i.posthog.com`. Copy the `api_host` from your project's install snippet if unsure. These values are public browser configuration. Never add a personal API key. Restart local development after changing them; Vercel needs a new deployment because public variables are embedded at build time.

## Behaviour and privacy
- Without both variables, the integration and preference UI are inactive.
- The SDK loads only after an explicit analytics opt-in. A remembered choice applies on later visits; Do Not Track is respected.
- Analytics preferences remain available below the footer. Declining or withdrawing stops capture. The consent preference itself is stored locally.
- After consent, PostHog uses browser persistence for pseudonymous returning-visitor attribution. No account identification or person profiles are created.
- Session replay, autocapture, exceptions, heatmaps, performance capture, surveys and feature flags are disabled.
- Shared-list query parameters, fragments and page titles are excluded from events. Only UTM campaign parameters are retained in URLs. Do not put personal information in UTM values.
- List names, note text, handwriting, emails and precise location are not captured by our custom events.
- Existing Vercel Analytics remains independent; this preference controls PostHog only.

## Events
- `$pageview`: initial page after consent and App Router pathname changes, once per navigation. Hash changes are not page views.
- `full_story_opened`: opening the full story, with place slug.
- `place_saved`: adding a place to an existing or new list, with place slug. Opening the picker and removing a place do not count.
- `external_source_clicked`: external HTTP(S) links, with destination origin/path and current page path. Includes source and operator links; does not imply a booking or completed purchase.
- `blog_place_clicked`: internal blog-to-place links, with destination slug and blog path.

- `travel_budget_saved` / `travel_budget_copied`: explicit calculator save or successful clipboard actions. No budget amounts, currency, traveller counts or input contents are included.

## Verify after adding the key
Open the site in a fresh browser context, accept analytics, and check PostHog Activity / live events for `$pageview`. Navigate to a place, open its full story, save it and click a source. Check that the events arrive once per action and that declining produces no PostHog traffic. Test with blockers disabled if live events do not appear.

Use Product analytics for pages/referrers/campaigns, and a funnel from page view → save or source click. Search Console remains the source for Google queries, impressions and ranking. Preview and local traffic use whichever project key is configured; use a separate test project or filter the URL hostname before analysing production traffic.

References: https://posthog.com/docs/libraries/next-js and https://posthog.com/docs/libraries/js/config
