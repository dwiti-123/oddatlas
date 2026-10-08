'use client';
import { useSyncExternalStore, useState } from 'react';
import { Bookmark, Check } from 'lucide-react';
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
 function toggle() {
  const current = snapshot(); items = saved ? current.filter(s=>s!==slug) : [...current,slug];
  cached = JSON.stringify(items);
  try { localStorage.setItem(key,cached); setNotice(''); } catch { sessionOnly=true; setNotice('This list lasts for this session. Your browser could not remember it.'); }
  window.dispatchEvent(new Event('odd-atlas:saved'));
 }
 return <div className="save-control"><button type="button" disabled={!ready} className="save-place" aria-pressed={saved} aria-label={`${saved?'Remove':'Save'} ${name}${saved?' from':' to'} your list`} onClick={toggle}>{saved?<Check size={15}/>:<Bookmark size={15}/>}<span>{saved?'On my list':'Save to my list'}</span></button>{notice&&<p className="save-notice" role="status">{notice}</p>}</div>;
}
export function SavedLink() { const saved=useSavedPlaces(); return <a href="/saved" className="saved-nav">Your list{saved.length>0&&<span aria-label={`${saved.length} saved places`}> ({saved.length})</span>}</a>; }
