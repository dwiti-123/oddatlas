'use client';
import { useSyncExternalStore } from 'react';
import { cleanListName, defaultListName } from './shared-list';
export type DeviceList = { id: string; name: string; slugs: string[] };
export const listsKey = 'odd-atlas:lists:v1';
const eventName = 'odd-atlas:lists';
const activeKey = 'odd-atlas:active-list';
let activeMemory = '';
let activeSessionOnly = false;
const empty: DeviceList[] = [];
let cached: string | undefined;
let lists: DeviceList[] = empty;
let sessionOnly = false;
export function readLists(): DeviceList[] {
 if (sessionOnly) return lists;
 try {
  const raw = localStorage.getItem(listsKey);
  const legacy = raw === null ? JSON.stringify([localStorage.getItem('odd-atlas:saved-places'), localStorage.getItem('odd-atlas:list-name')]) : '';
  const signature = raw ?? legacy;
  if (signature === cached) return lists;
  if (raw !== null) {
   const value: unknown = JSON.parse(raw);
   if (!Array.isArray(value)) return lists;
   const ids = new Set<string>();
   lists = value.flatMap((entry): DeviceList[] => {
    if (!entry || typeof entry !== 'object') return [];
    const item = entry as Partial<DeviceList>;
    if (typeof item.id !== 'string' || ids.has(item.id) || typeof item.name !== 'string' || !Array.isArray(item.slugs)) return [];
    ids.add(item.id);
    return [{id:item.id, name:cleanListName(item.name), slugs:[...new Set(item.slugs.filter((s): s is string => typeof s === 'string'))]}];
   });
  } else {
   let old: unknown = [];
   try { old = JSON.parse(localStorage.getItem('odd-atlas:saved-places') || '[]'); } catch { /* Preserve the legacy name if old places cannot be read. */ }
   const slugs = Array.isArray(old) ? old.filter((s): s is string => typeof s === 'string') : [];
   const name = localStorage.getItem('odd-atlas:list-name');
   lists = slugs.length || name ? [{id:'legacy', name:cleanListName(name || defaultListName), slugs:[...new Set(slugs)]}] : empty;
  }
  cached = signature;
 } catch { /* Keep the last readable collection available. */ }
 return lists;
}
function subscribe(notify:()=>void) {
 window.addEventListener('storage',notify); window.addEventListener(eventName,notify);
 return ()=>{window.removeEventListener('storage',notify); window.removeEventListener(eventName,notify);};
}
export function useDeviceLists() { return useSyncExternalStore(subscribe,readLists,()=>empty); }
export function useListsReady() { return useSyncExternalStore(subscribe,()=>true,()=>false); }
function activeSnapshot() {
 if (!activeSessionOnly) {
  try { activeMemory = localStorage.getItem(activeKey) || ''; } catch { /* Retain the session selection. */ }
 }
 return activeMemory;
}
export function useActiveListId() { return useSyncExternalStore(subscribe,activeSnapshot,()=> ''); }
export function selectDeviceList(id:string) {
 activeMemory = id;
 try { localStorage.setItem(activeKey,id); activeSessionOnly = false; }
 catch { activeSessionOnly = true; }
 window.dispatchEvent(new Event(eventName));
}
export function updateLists(change:(current:DeviceList[])=>DeviceList[]) {
 lists = change(readLists()); cached = JSON.stringify(lists);
 let persistent = true;
 try { localStorage.setItem(listsKey,cached); sessionOnly = false; }
 catch { sessionOnly = true; persistent = false; }
 window.dispatchEvent(new Event(eventName));
 return persistent;
}
export function createDeviceList(name:string, slugs:string[] = []) {
 const id = crypto.randomUUID();
 const persistent = updateLists(current=>[...current,{id,name:cleanListName(name),slugs:[...new Set(slugs)]}]);
 selectDeviceList(id);
 return {id,persistent};
}
