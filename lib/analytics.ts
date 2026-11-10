'use client';
import type { PostHog } from 'posthog-js';
let client: PostHog | null = null;
export function setAnalyticsClient(value: PostHog | null) { client = value; }
export function captureAction(event: 'place_saved' | 'full_story_opened' | 'travel_budget_saved' | 'travel_budget_copied', properties: { place_slug?: string }) {
 client?.capture(event, properties);
}
// Never include shared-list names or arbitrary query parameters.
export function analyticsUrl(raw: string) {
 const url = new URL(raw, window.location.origin);
 const clean = new URL(url.origin + url.pathname);
 for (const key of ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term']) {
  const value = url.searchParams.get(key);
  if (value) clean.searchParams.set(key, value.slice(0, 150));
 }
 return clean.href;
}

const sourceAliases: Record<string,string> = {
 'chat.openai.com': 'chatgpt',
 'chatgpt.com': 'chatgpt',
 'gemini.google.com': 'gemini',
 'perplexity.ai': 'perplexity',
 'x.com': 'x',
 'twitter.com': 'x',
 'reddit.com': 'reddit',
 'www.reddit.com': 'reddit',
 'google.com': 'google_search',
 'www.google.com': 'google_search',
 'bing.com': 'bing_search',
 'www.bing.com': 'bing_search',
 'duckduckgo.com': 'duckduckgo',
};

/** Keep campaign attribution useful without sending search terms or full URLs. */
export function analyticsAttribution() {
 const current = new URL(location.href);
 const referrer = document.referrer ? new URL(document.referrer) : null;
 const utm = (name:string) => current.searchParams.get(name)?.slice(0, 150) || undefined;
 const referrerHost = referrer?.hostname.replace(/^www\./, '') || undefined;
 const inferredSource = referrerHost && (
  sourceAliases[referrerHost]
  || (/^google\./i.test(referrerHost) ? 'google_search' : undefined)
  || (/^bing\./i.test(referrerHost) ? 'bing_search' : undefined)
  || (/^(?:search\.)?yahoo\./i.test(referrerHost) ? 'yahoo_search' : undefined)
  || referrerHost
 );
 const source = utm('utm_source') || inferredSource || 'direct';
 return {
  source,
  medium: utm('utm_medium'),
  campaign: utm('utm_campaign'),
  content: utm('utm_content'),
  term: utm('utm_term'),
  referrer_domain: referrerHost,
 };
}
