'use client';

import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import type { PostHog } from 'posthog-js';
import { analyticsAttribution, analyticsUrl, setAnalyticsClient } from '@/lib/analytics';

const token = process.env.NEXT_PUBLIC_POSTHOG_KEY;
const host = process.env.NEXT_PUBLIC_POSTHOG_HOST;

/**
 * Anonymous, cookieless product analytics.
 *
 * PostHog's `always` mode uses a privacy-preserving server hash rather than
 * cookies/local storage. Replay, autocapture and person profiles stay off:
 * Odd Atlas measures journeys, not typed content or identities.
 */
export function ProductAnalytics() {
 const pathname = usePathname();
 const [active, setActive] = useState(0);
 const instance = useRef<PostHog | null>(null);
 const lastPage = useRef<string | null>(null);

 useEffect(() => {
  if (!token || !host) return;
  let cancelled = false;
  void import('posthog-js').then(({ default: posthog }) => {
   if (cancelled) return;
   if (!instance.current) {
    posthog.init(token, {
     api_host: host,
     defaults: '2026-08-30',
     cookieless_mode: 'always',
     autocapture: false,
     capture_pageview: false,
     capture_pageleave: false,
     capture_exceptions: false,
     disable_session_recording: true,
     person_profiles: 'never',
     respect_dnt: true,
     persistence: 'memory',
     capture_dead_clicks: false,
     capture_heatmaps: false,
     capture_performance: false,
     disable_surveys: true,
     advanced_disable_flags: true,
     before_send: event => {
      if (!event) return null;
      delete event.properties.$title;
      delete event.properties.$set;
      delete event.properties.$set_once;
      for (const key of Object.keys(event.properties)) {
       if (key === '$pathname') continue;
       if (/url|referrer/i.test(key) && typeof event.properties[key] === 'string') {
        try { event.properties[key] = analyticsUrl(event.properties[key]); } catch { delete event.properties[key]; }
       }
      }
      return event;
     },
    });
    instance.current = posthog;
   }
   setAnalyticsClient(instance.current);
   setActive(version => version + 1);
  }).catch(() => { /* Analytics must never prevent browsing. */ });
  return () => { cancelled = true; setAnalyticsClient(null); };
 }, []);

 useEffect(() => {
  if (!active || !instance.current || lastPage.current === pathname) return;
  lastPage.current = pathname;
  instance.current.capture('$pageview', { $current_url: analyticsUrl(location.href), $pathname: pathname, ...analyticsAttribution() });
 }, [active, pathname]);

 useEffect(() => {
  if (!active) return;
  function click(event: MouseEvent) {
   const link = event.target instanceof Element ? event.target.closest('a[href]') : null;
   if (!(link instanceof HTMLAnchorElement)) return;
   const target = new URL(link.href);
   if (!['https:', 'http:'].includes(target.protocol)) return;
   if (target.origin !== location.origin) {
    instance.current?.capture('external_source_clicked', { destination: target.origin + target.pathname, page_path: pathname });
   } else if (pathname.startsWith('/blog/') && target.pathname.startsWith('/places/')) {
    instance.current?.capture('blog_place_clicked', { place_slug: target.pathname.split('/')[2], page_path: pathname });
   }
  }
  document.addEventListener('click', click);
  return () => document.removeEventListener('click', click);
 }, [active, pathname]);

 return null;
}
