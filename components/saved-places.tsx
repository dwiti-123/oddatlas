'use client';
import Link from 'next/link';
import { useSyncExternalStore, useState } from 'react';
const key = 'odd-atlas:saved-places';
let cached = '';
let items: string[] = [];
let sessionOnly = false;
function snapshot() {
 if (sessionOnly) return items;
 try {
  const raw = localStorage.getItem(key) || '[]';
  if (raw !== cached) { const value = JSON.parse(raw); items = Array.isArray(value) ? value.filter((v): v is string => typeof v === 'string') : []; cached = raw; }
 } catch { /* Keep in-memory saves available if storage is blocked. */ }
 return items;
}
const empty: string[] = [];
function subscribe(notify: () => void) {
 window.addEventListener('storage', notify); window.addEventListener('odd-atlas:saved', notify);
 return () => { window.removeEventListener('storage', notify); window.removeEventListener('odd-atlas:saved', notify); };
}
export function useSavedPlaces() { return useSyncExternalStore(subscribe, snapshot, () => empty); }
export function SavePlace({slug,name}: {slug:string;name:string}) {
 const saved = useSavedPlaces().includes(slug);
 const ready = useSyncExternalStore(subscribe, () => true, () => false);
 const [notice,setNotice] = useState('');
 const [stamp,setStamp] = useState(0);
 function toggle() {
  const current = snapshot(); items = saved ? current.filter(s=>s!==slug) : [...current,slug];
  cached = JSON.stringify(items);
  try { localStorage.setItem(key,cached); setNotice(''); } catch { sessionOnly=true; setNotice('This list lasts for this session. Your browser could not remember it.'); }
  window.dispatchEvent(new Event('odd-atlas:saved'));
  setStamp(saved?0:stamp+1);
 }
 return <div className="save-control"><button type="button" disabled={!ready} className="save-place" aria-pressed={saved} aria-label={`${saved?'Remove':'Save'} ${name}${saved?' from':' to'} your list`} onClick={toggle}><svg key={stamp} className={`bookmark-icon ${saved?'is-saved':''} ${saved&&stamp?'just-saved':''}`} width="22" height="24" viewBox="0 0 24 26" fill="none" aria-hidden="true"><path className="bookmark-paper" d="M6 3h12v20l-6-4-6 4V3Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round"/><path className="bookmark-check" d="m9 11 2 2 4-4" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/><path className="bookmark-ink" d="M2 6 0 5M22 6l2-1M12 1V0" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/></svg><span>{saved?'On my list':'Save to my list'}</span></button>{notice&&<p className="save-notice" role="status">{notice}</p>}</div>;
}
export function SavedLink() { const saved=useSavedPlaces(); return <Link href="/saved" className="saved-nav">Your list{saved.length>0&&<span aria-label={`${saved.length} saved places`}> ({saved.length})</span>}</Link>; }
