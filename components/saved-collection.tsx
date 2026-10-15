'use client';
import Link from 'next/link';
import { useState, useSyncExternalStore } from 'react';
import type { FormEvent } from 'react';
import { places } from '@/lib/places';
import { cleanListName, defaultListName, listNameLimit, sharedListPath } from '@/lib/shared-list';
import { useSavedPlaces } from './saved-places';
import { PlaceCard } from './place-card';
const nameKey='odd-atlas:list-name';
let memoryName=defaultListName;
let sessionName=false;
function nameSnapshot() {
 if(sessionName)return memoryName;
 try {memoryName=cleanListName(localStorage.getItem(nameKey)||'');} catch { /* Retain session name when storage is unavailable. */ }
 return memoryName;
}
function subscribeName(notify:()=>void) {
 window.addEventListener('storage',notify);window.addEventListener('odd-atlas:list-name',notify);
 return ()=>{window.removeEventListener('storage',notify);window.removeEventListener('odd-atlas:list-name',notify);};
}
export function SavedCollection({shared}:{shared?:{name:string;slugs:string[]}}) {
 const saved=useSavedPlaces();
 const localName=useSyncExternalStore(subscribeName,nameSnapshot,()=>defaultListName);
 const ready=useSyncExternalStore(subscribeName,()=>true,()=>false);
 const name=shared?.name??localName;
 const selected=places.filter(p=>(shared?.slugs??saved).includes(p.slug));
 const [notice,setNotice]=useState('');
 const [manualLink,setManualLink]=useState('');
 const [sharing,setSharing]=useState(false);
 function rename(event:FormEvent<HTMLFormElement>) {
  event.preventDefault();
  memoryName=cleanListName(String(new FormData(event.currentTarget).get('name')??''));
  try {localStorage.setItem(nameKey,memoryName);setNotice('List name saved.');} catch {sessionName=true;setNotice('Name saved for this session. Your browser could not remember it.');}
  setManualLink('');window.dispatchEvent(new Event('odd-atlas:list-name'));
 }
 async function share() {
  const url=new URL(sharedListPath(name,selected.map(p=>p.slug)),window.location.origin).href;
  setSharing(true);setNotice('');setManualLink('');
  try {
   if(navigator.share) {
    try {await navigator.share({title:name,text:'A few unusual places to explore on Odd Atlas.',url});setNotice('Share options opened.');return;}
    catch(error) {if(error instanceof Error&&error.name==='AbortError')return;}
   }
   await navigator.clipboard.writeText(url);setNotice('Link copied. Anyone with it can open this version of your list.');
  } catch {setManualLink(url);setNotice('Copy the link below to share this list.');}
  finally {setSharing(false);}
 }
 return <><h1 className="list-title">{name}</h1><p className="saved-intro">{shared?'A traveller’s shortlist. Save any place to your own list, or explore its story.':'A few places to come back to. Your list and its name are remembered in this browser, on this device.'}</p>
 {shared?<Link className="text-link" href="/saved">Open your own list</Link>:<div className="list-tools"><form onSubmit={rename}><label htmlFor="list-name">Name your list</label><div className="list-name-row"><input id="list-name" name="name" key={localName} defaultValue={localName===defaultListName?'':localName} placeholder="My Rajasthan weekend" maxLength={listNameLimit} disabled={!ready}/><button className="list-action" type="submit" disabled={!ready}>Save name</button></div></form><button className="list-action share-list" type="button" disabled={!ready||!selected.length||sharing} onClick={share}>{sharing?'Sharing…':'Share list'}</button><p className="list-share-note">A shared link contains this version of your list. Later edits won’t change it.</p></div>}
 {notice&&<p className="save-notice" role="status">{notice}</p>}
 {manualLink&&<div className="manual-share"><label htmlFor="share-link">Shareable link</label><input id="share-link" value={manualLink} readOnly onFocus={e=>e.currentTarget.select()}/></div>}
 <p className="result-count" role="status">{selected.length} {selected.length===1?'place':'places'} {shared?'in this shared list':'on your list'}</p>{selected.length?<div className="place-grid">{selected.map(p=><PlaceCard key={p.slug} place={p}/>)}</div>:<div className="no-results"><h2>{shared?'No places in this shared list.':'A little room for curiosity.'}</h2><p>{shared?'The link contains no recognised places. You can start a list of your own.':'Save a place that catches your eye. You’ll find it here when you come back.'}</p><Link className="text-link" href="/#places">Explore the collection</Link></div>}</>;
}
