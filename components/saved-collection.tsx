'use client';
import Link from 'next/link';
import { useRef, useState, type FormEvent } from 'react';
import { places } from '@/lib/places';
import { cleanListName, listNameLimit, sharedListPath } from '@/lib/shared-list';
import { createDeviceList, selectDeviceList, updateLists, useActiveListId, useDeviceLists, useListsReady, type DeviceList } from '@/lib/device-lists';
import { PlaceCard } from './place-card';
import { AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogTitle, AlertDialogDescription, AlertDialogCancel, AlertDialogAction } from './ui/alert-dialog';

type Shared = {name:string;slugs:string[]};
function ListContents({name,slugs,listId}:{name:string;slugs:string[];listId?:string}) {
 const selected=places.filter(p=>slugs.includes(p.slug));
 return <section aria-label={name}><p className="result-count" role="status">{selected.length} {selected.length===1?'place':'places'} in this list</p>{selected.length?<div className="place-grid">{selected.map(p=><PlaceCard key={p.slug} place={p} listId={listId}/>)}</div>:<div className="no-results"><h3>A little room for curiosity.</h3><p>Find somewhere unexpected, then choose this list when you save it.</p><Link className="text-link" href="/#places">Explore the collection</Link></div>}</section>;
}
function fitTitle(field:HTMLTextAreaElement) { field.style.height='0px'; field.style.height=field.scrollHeight+'px'; }
function ListEditor({list,onDelete}:{list:DeviceList;onDelete:()=>void}) {
 const [notice,setNotice]=useState('');
 const [error,setError]=useState('');
 const [shareLink,setShareLink]=useState('');
 const [confirmDelete,setConfirmDelete]=useState(false);
 const [editing,setEditing]=useState(false);
 const editButton=useRef<HTMLButtonElement>(null);
 function closeEditor() { setEditing(false); setError(''); requestAnimationFrame(()=>editButton.current?.focus()); }
 function rename(event:FormEvent<HTMLFormElement>) {
  event.preventDefault(); const form=event.currentTarget;
  const name=String(new FormData(form).get('name')||'').trim();
  if(!name){setError('Please enter a list name.');(form.elements.namedItem('name') as HTMLTextAreaElement)?.focus();return;}
  const persistent=updateLists(current=>current.map(item=>item.id===list.id?{...item,name:cleanListName(name)}:item));
  setShareLink(''); closeEditor();
  setNotice(persistent?'Name saved.':'Name saved for this session only. Browser storage is unavailable.');
 }
 async function share() {
  const url=new URL(sharedListPath(list.name,list.slugs),window.location.origin).href;
  setShareLink(url);
  try {await navigator.clipboard.writeText(url);setNotice('Link copied. Anyone with it can view this snapshot.');}
  catch {setNotice('Copy the link below to share this snapshot.');}
 }
 return <AlertDialog open={confirmDelete} onOpenChange={setConfirmDelete}><div className="list-heading">{editing?<form id="list-name-editor" className="inline-list-title" noValidate onSubmit={rename} onKeyDown={event=>{if(event.key==='Escape'){event.preventDefault();closeEditor();}else if(event.key==='Enter'&&!event.shiftKey&&event.target instanceof HTMLTextAreaElement){event.preventDefault();event.currentTarget.requestSubmit();}}}>
 <div className="inline-title-field"><label className="sr-only" htmlFor="rename-list">List name</label><textarea ref={node=>{if(!node)return;fitTitle(node);let width=node.clientWidth;const observer=new ResizeObserver(()=>{if(node.clientWidth!==width){width=node.clientWidth;fitTitle(node);}});observer.observe(node);return ()=>observer.disconnect();}} autoFocus id="rename-list" name="name" defaultValue={list.name} maxLength={listNameLimit} rows={1} required aria-invalid={!!error} aria-describedby={error?'list-name-error':undefined} onInput={event=>{fitTitle(event.currentTarget);if(error)setError('');}}/>{error&&<p id="list-name-error" className="list-field-error" role="alert">{error}</p>}</div>
 <div className="list-heading-actions"><button className="list-action" type="submit">Save</button><button className="list-action list-action-secondary" type="button" onClick={closeEditor}>Cancel</button></div></form>:<><h2>{list.name}</h2><div className="list-heading-actions" aria-label="List actions"><button className="list-action" type="button" disabled={!list.slugs.length} onClick={share}>Share</button><button ref={editButton} type="button" className="list-action list-action-secondary" onClick={()=>{setEditing(true);setConfirmDelete(false);setNotice('');setShareLink('');}}>Edit</button><AlertDialogTrigger asChild><button type="button" className="list-action list-action-delete">Delete</button></AlertDialogTrigger></div></>}</div>
 <AlertDialogContent className="list-delete-modal"><AlertDialogTitle>Delete this list?</AlertDialogTitle><AlertDialogDescription>“{list.name}” and its saved places will be removed from this device. Other lists and previously shared links will stay available.</AlertDialogDescription><div className="list-heading-actions"><AlertDialogCancel className="list-action">Cancel</AlertDialogCancel><AlertDialogAction className="list-action list-action-delete" onClick={onDelete}>Delete list</AlertDialogAction></div></AlertDialogContent>
 {!editing&&<p className="list-share-note list-snapshot-note">Shared links are fixed snapshots. Later edits won’t change them.</p>}
 {notice&&<p className="save-notice" role="status">{notice}</p>}{shareLink&&<div className="manual-share"><label htmlFor="share-link">Shareable link</label><input id="share-link" value={shareLink} readOnly onFocus={e=>e.currentTarget.select()}/></div>}
 <ListContents name={list.name} slugs={list.slugs} listId={list.id}/></AlertDialog>;
}
export function SavedCollection({shared}:{shared?:Shared}) {
 const lists=useDeviceLists(); const ready=useListsReady();
 const activeId=useActiveListId(); const [notice,setNotice]=useState(''); const [createError,setCreateError]=useState('');
 const active=lists.find(list=>list.id===activeId)??lists[0];
 function create(event:FormEvent<HTMLFormElement>) {
  event.preventDefault(); const form=event.currentTarget;
  const name=String(new FormData(form).get('name')||'').trim(); if(!name){setCreateError('Please enter a list name.');return;} setCreateError('');
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
 <form className="new-list-form" noValidate onSubmit={create}><label htmlFor="new-list-name">Create a list</label><div className="list-name-row"><input id="new-list-name" name="name" placeholder="My Rajasthan weekend" maxLength={listNameLimit} required disabled={!ready} aria-invalid={!!createError} aria-describedby={createError?'create-list-error':undefined} onChange={()=>setCreateError('')}/><button className="list-action" type="submit" disabled={!ready}>Create list</button></div>{createError&&<p id="create-list-error" className="list-field-error" role="alert">{createError}</p>}</form>
 {notice&&<p role="status" className="save-notice">{notice}</p>}
 {!ready?<p role="status">Opening your lists…</p>:lists.length?<><nav className="personal-lists" aria-label="Your saved lists">{lists.map((list,index)=><button key={list.id} type="button" aria-pressed={active?.id===list.id} onClick={()=>{selectDeviceList(list.id);setNotice('');}}><span>{list.name}</span><small>List {index+1} · {places.filter(p=>list.slugs.includes(p.slug)).length} {places.filter(p=>list.slugs.includes(p.slug)).length===1?'place':'places'}</small></button>)}</nav>{active&&<ListEditor key={active.id} list={active} onDelete={remove}/>}</>:<div className="no-results"><h2>Make room for your next adventure.</h2><p>Create your first list above, or save a place while exploring.</p><Link className="text-link" href="/#places">Explore the collection</Link></div>}
 <p className="device-list-note">Lists stay on this device. Clearing browser data removes them. Shared links include the list name and places—share only what you want others to see.</p></>;
}
