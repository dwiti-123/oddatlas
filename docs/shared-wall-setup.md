# Connect the shared traveller’s wall

The interface and Supabase integration are implemented locally. On 15 October 2026, the owner added the public connection settings, applied the migration and enabled anonymous sign-ins. Live checks confirmed typed/freehand posting, unauthenticated reading and cross-user ownership restrictions. Temporary test posts were soft-removed and verified absent from the public feed. Existing private traces are never uploaded automatically. Deployment to the public website remains separate.

## 1. Add your public connection values

Fill the two blank values in `.env.local` (a safe template is in `.env.example`):

```dotenv
NEXT_PUBLIC_SUPABASE_URL=https://YOUR-PROJECT.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=YOUR-PUBLISHABLE-KEY
```

Find these in your intended Supabase project's Connect/API settings. The legacy anon key is also supported via `NEXT_PUBLIC_SUPABASE_ANON_KEY`. Never use a service-role/secret key or database password in a NEXT_PUBLIC variable. No service-role key is needed by this implementation.

## 2. Add the wall database objects

In that project's SQL Editor, run `supabase/migrations/202610150001_odd_wall.sql` once. It creates only Odd Atlas-prefixed tables/functions in a transaction. It does not change existing app tables. Re-running the same migration intentionally fails rather than replacing existing data.

## 3. Enable anonymous sign-ins

In Authentication → Sign In / Providers, enable Anonymous Sign-Ins. If this project also serves another app, review that app’s existing authenticated-role policies first: Supabase anonymous identities also receive the authenticated role. A separate project avoids changing that app’s access assumptions. Visitors can read without signing in. A browser gets an anonymous identity only when it posts or reports. Ownership is attached to that identity, not a client-supplied owner ID.

Restart the development server after adding the environment values. For production, set the same public variables in Vercel and rebuild; public Next.js environment values are included at build time.

## Verify before publishing

- Open the wall in two separate browser profiles, not merely two tabs sharing storage.
- Post a note in the first; choose Refresh wall in the second. It should show the public trace.
- The second profile must not have Move/Remove controls for the first profile's trace.
- A report should appear in `odd_wall_reports`, visible through your Supabase dashboard/SQL Editor, not to other travellers.
- Remove your first profile's test post, then refresh the second profile.
- Existing local-only notes should still say Only on this device, and should not appear in the other profile.

The local PostgreSQL test runner verifies the migration, row security, ownership, direct-write denial, validation, idempotent retry, post/report limits and moderation visibility. It does not verify your project's actual API keys, anonymous Auth settings or Vercel deployment. Run `node scripts/test-shared-wall.mjs` to repeat it.

## Moderation

Reports are a review queue, not an automatic takedown system. As the owner, use the Supabase dashboard/SQL Editor to review reports and the related trace, then set its status to hidden if appropriate. For example, replacing the sample UUID with the reviewed trace ID:

```sql
select r.trace_id, r.reason, r.created_at, t.payload
from public.odd_wall_reports r
join public.odd_wall_traces t on t.id = r.trace_id
order by r.created_at desc;

-- Only after reviewing that specific trace:
update public.odd_wall_traces
set status = 'hidden'
where id = 'REVIEWED-TRACE-UUID';
```

Published notes/drawings are public. The browser can read the trace payload, date and anonymous owner UUID, but no account email or auth tokens are exposed by the wall table. Keep personal information out of public traces. Reports themselves have no browser read permission. Soft-removed or hidden traces are excluded from the shared feed.

The feed reads the latest 24 public traces, plus up to 24 of the current owner's traces so they remain manageable. It refreshes on opening or with Refresh wall, not constant polling. The site-wide footer loads the interactive wall and its database read when the footer approaches the viewport. The landscape itself remains static. “I’d visit” wishes remain local, with no invented public counts.

Posting is limited to 3 traces/minute, 12/hour and 24 currently published traces per anonymous identity. Reports are limited to 5/day per identity and one per trace. These are not IP-wide limits: resetting a browser identity can bypass identity-based limits. Review Supabase Auth abuse protection before opening a high-traffic public wall; the current code does not implement an external CAPTCHA flow.

## References

- Supabase anonymous sign-ins: https://supabase.com/docs/guides/auth/auth-anonymous
- API keys: https://supabase.com/docs/guides/getting-started/api-keys
- Row-level security: https://supabase.com/docs/guides/database/postgres/row-level-security
- Database functions: https://supabase.com/docs/guides/database/functions
