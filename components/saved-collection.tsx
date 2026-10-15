'use client';
import Link from 'next/link';
import { useState, type FormEvent } from 'react';
import { places } from '@/lib/places';
import { cleanListName, listNameLimit, sharedListPath } from '@/lib/shared-list';
import { createDeviceList, selectDeviceList, updateLists, useActiveListId, useDeviceLists, useListsReady, type DeviceList } from '@/lib/device-lists';
import { PlaceCard } from './place-card';

type Shared = {name:string;slugs:string[]};
function ListContents({name,slugs,listId}:{name:string;slugs:string[];listId?:string}) {
 const selected=places.filter(p=>slugs.includes(p.slug));
 return <section aria-label={name}><p className="result-count" role="status">{selected.length} {selected.length===1?'place':'places'} in this list</p>{selected.length?<div className="place-grid">{selected.map(p=><PlaceCard key={p.slug} place={p} listId={listId}/>)}</div>:<div className="no-results"><h3>A little room for curiosity.</h3><p>Find somewhere unexpected, then choose this list when you save it.</p><Link className="text-link" href="/#places">Explore the collection</Link></div>}</section>;
}
function ListEditor({list,onDelete}:{list:DeviceList;onDelete:()=>void}) {
 const [notice,setNotice]=useState('');
 const [shareLink,setShareLink]=useState('');
 const [confirmDelete,setConfirmDelete]=useState(false);
 function rename(event:FormEvent<HTMLFormElement>) {
  event.preventDefault(); const form=event.currentTarget;
  const name=String(new FormData(form).get('name')||'').trim(); if(!name)return;
  const persistent=updateLists(current=>current.map(item=>item.id===list.id?{...item,name:cleanListName(name)}:item));
  form.reset(); setShareLink('');
  setNotice(persistent?'Name saved.':'Name saved for this session only. Browser storage is unavailable.');
 }
 async function share() {
  const url=new URL(sharedListPath(list.name,list.slugs),window.location.origin).href;
  setShareLink(url);
  try {await navigator.clipboard.writeText(url);setNotice('Link copied. Anyone with it can view this snapshot.');}
  catch {setNotice('Copy the link below to share this snapshot.');}
 }
 return <><div className="list-heading"><h2>{list.name}</h2><button type="button" className="text-link list-delete" onClick={()=>setConfirmDelete(!confirmDelete)}>Delete list</button></div>
 {confirmDelete&&<div className="list-delete-confirm"><p>Delete “{list.name}” from this device? Other lists and previously shared links will stay available.</p><button className="list-action" type="button" onClick={onDelete}>Yes, delete this list</button> <button className="list-action" type="button" onClick={()=>setConfirmDelete(false)}>Keep list</button></div>}
 <div className="list-tools"><form onSubmit={rename}><label htmlFor="rename-list">Rename this list</label><div className="list-name-row"><input id="rename-list" name="name" placeholder={list.name} maxLength={listNameLimit} required/><button className="list-action" type="submit">Save name</button></div></form><button className="list-action share-list" type="button" disabled={!list.slugs.length} onClick={share}>Share list</button><p className="list-share-note">A shared link is a fixed snapshot. Later changes won’t change that link.</p></div>
 {notice&&<p className="save-notice" role="status">{notice}</p>}{shareLink&&<div className="manual-share"><label htmlFor="share-link">Shareable link</label><input id="share-link" value={shareLink} readOnly onFocus={e=>e.currentTarget.select()}/></div>}
 <ListContents name={list.name} slugs={list.slugs} listId={list.id}/></>;
}
export function SavedCollection({shared}:{shared?:Shared}) {
 const lists=useDeviceLists(); const ready=useListsReady();
 const activeId=useActiveListId(); const [notice,setNotice]=useState('');
 const active=lists.find(list=>list.id===activeId)??lists[0];
 function create(event:FormEvent<HTMLFormElement>) {
  event.preventDefault(); const form=event.currentTarget;
  const name=String(new FormData(form).get('name')||'').trim(); if(!name)return;
  const result=createDeviceList(name); form.reset();
  setNotice(result.persistent?'List created. Find a place to add to it.':'List created for this session only. Browser storage is unavailable.');
 }
 function remove() {
  if(!active)return;
  const persistent=updateLists(current=>current.filter(list=>list.id!==active.id)); selectDeviceList('');
  setNotice(persistent?'List deleted.':'Deleted for this session only. Browser storage is unavailable.');
 }
 if(shared)return <><h1 className="list-title">{shared.name}</h1><p className="saved-intro">A traveller’s shortlist. Save any place to one of your own lists, or explore its story.</p><Link className="text-link" href="/saved">Open your own lists</Link><ListContents name={shared.name} slugs={shared.slugs}/></>;
 return <><h1 className="list-title">Your personal atlases.</h1><p className="saved-intro">A weekend away, a faraway dream, a little curiosity. Keep separate lists, remembered in this browser on this device.</p>
 <form className="new-list-form" onSubmit={create}><label htmlFor="new-list-name">Create a list</label><div className="list-name-row"><input id="new-list-name" name="name" placeholder="My Rajasthan weekend" maxLength={listNameLimit} required disabled={!ready}/><button className="list-action" type="submit" disabled={!ready}>Create list</button></div></form>
 {notice&&<p role="status" className="save-notice">{notice}</p>}
 {!ready?<p role="status">Opening your lists…</p>:lists.length?<><nav className="personal-lists" aria-label="Your saved lists">{lists.map((list,index)=><button key={list.id} type="button" aria-pressed={active?.id===list.id} onClick={()=>{selectDeviceList(list.id);setNotice('');}}><span>{list.name}</span><small>List {index+1} · {places.filter(p=>list.slugs.includes(p.slug)).length} places</small></button>)}</nav>{active&&<ListEditor key={active.id} list={active} onDelete={remove}/>}</>:<div className="no-results"><h2>Make room for your next adventure.</h2><p>Create your first list above, or save a place while exploring.</p><Link className="text-link" href="/#places">Explore the collection</Link></div>}
 <p className="device-list-note">Lists stay on this device. Clearing browser data removes them. Shared links include the list name and places—share only what you want others to see.</p></>;
}
