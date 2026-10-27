'use client';
import type { PostHog } from 'posthog-js';
let client: PostHog | null = null;
export function setAnalyticsClient(value: PostHog | null) { client = value; }
export function captureAction(event: 'place_saved' | 'full_story_opened', properties: { place_slug?: string }) {
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
