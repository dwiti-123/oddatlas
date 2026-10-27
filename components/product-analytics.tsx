'use client';
import { useEffect, useRef, useState, useSyncExternalStore } from 'react';
import { usePathname } from 'next/navigation';
import type { PostHog } from 'posthog-js';
import { analyticsUrl, setAnalyticsClient } from '@/lib/analytics';
import styles from './product-analytics.module.css';
const consentKey = 'odd-atlas:analytics-consent:v1';
const token = process.env.NEXT_PUBLIC_POSTHOG_KEY;
const host = process.env.NEXT_PUBLIC_POSTHOG_HOST;
type Consent = 'yes' | 'no' | null;
let sessionChoice: Consent = null;
function readConsent(): Consent {
 if (navigator.doNotTrack === '1') return 'no';
 try { const value = localStorage.getItem(consentKey); return value === 'yes' || value === 'no' ? value : sessionChoice; }
 catch { return sessionChoice; }
}
function subscribeConsent(notify: () => void) {
 window.addEventListener('storage', notify); window.addEventListener(consentKey, notify);
 return () => { window.removeEventListener('storage', notify); window.removeEventListener(consentKey, notify); };
}
const serverConsent = (): Consent => null;
const subscribeReady = () => () => {};

export function ProductAnalytics() {
 const pathname = usePathname();
 const consent = useSyncExternalStore(subscribeConsent, readConsent, serverConsent);
 const ready = useSyncExternalStore(subscribeReady, () => true, () => false);
 const [editing, setEditing] = useState(false);
 const [active, setActive] = useState(0);
 const instance = useRef<PostHog | null>(null);
 const lastPage = useRef<string | null>(null);
 useEffect(() => {
  if (!token || !host || consent !== 'yes') {
   setAnalyticsClient(null); instance.current?.opt_out_capturing();
   lastPage.current = null; return;
  }
  let cancelled = false;
  void import('posthog-js').then(({ default: posthog }) => {
   if (cancelled) return;
   if (!instance.current) {
    posthog.init(token, {
     api_host: host, defaults: '2026-08-30',
     autocapture: false, capture_pageview: false, capture_pageleave: false,
     capture_exceptions: false, disable_session_recording: true,
     person_profiles: 'never', respect_dnt: true, persistence: 'localStorage+cookie',
     capture_dead_clicks: false, capture_heatmaps: false, capture_performance: false,
     disable_surveys: true, advanced_disable_flags: true,
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
   instance.current.opt_in_capturing({ captureEventName: false });
   setAnalyticsClient(instance.current); setActive(version => version + 1);
  }).catch(() => { /* Analytics must never prevent browsing. */ });
  return () => { cancelled = true; setAnalyticsClient(null); };
 }, [consent]);
 useEffect(() => {
  if (consent !== 'yes' || !active || !instance.current || instance.current.has_opted_out_capturing() || lastPage.current === pathname) return;
  lastPage.current = pathname;
  instance.current.capture('$pageview', { $current_url: analyticsUrl(location.href), $pathname: pathname });
 }, [active, pathname, consent]);
 useEffect(() => {
  if (!active || consent !== 'yes') return;
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
 }, [active, pathname, consent]);
 function choose(value: 'yes' | 'no') {
  if (value === 'no') { setAnalyticsClient(null); instance.current?.opt_out_capturing(); }
  try { localStorage.setItem(consentKey, value); } catch { /* Remember this session. */ }
  sessionChoice = value; window.dispatchEvent(new Event(consentKey)); setEditing(false);
 }
 if (!token || !host || !ready) return null;
 return <aside className={styles.preferences} aria-label="Analytics preferences">
  {(consent === null || editing) ? <div className={styles.panel}>
   <p><strong>Help make the atlas more useful?</strong> Allow PostHog to measure page visits, saves and source clicks. No session recordings or note contents. Your choice is remembered on this device.</p>
   <div><button onClick={() => choose('yes')}>Allow analytics</button><button onClick={() => choose('no')}>No thanks</button></div>
  </div> : <button className={styles.settings} onClick={() => setEditing(true)}>Analytics preferences</button>}
 </aside>;
}
