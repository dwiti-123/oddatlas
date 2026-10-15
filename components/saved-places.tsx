'use client';
import Link from 'next/link';
import { useId, useState, type FormEvent } from 'react';
import { createDeviceList, updateLists, useDeviceLists, useListsReady } from '@/lib/device-lists';
import { listNameLimit } from '@/lib/shared-list';
import { Dialog, DialogContent, DialogTitle, DialogDescription, DialogTrigger } from './ui/dialog';
export function SavePlace({slug,name,listId}: {slug:string;name:string;listId?:string}) {
 const lists = useDeviceLists();
 const ready = useListsReady();
 const saved = lists.some(list=>(!listId || list.id===listId) && list.slugs.includes(slug));
 const [open,setOpen] = useState(false);
 const [notice,setNotice] = useState('');
 const inputId = useId();
 function toggle(id:string) {
  const persistent = updateLists(current=>current.map(list=>list.id===id?{...list,slugs:list.slugs.includes(slug)?list.slugs.filter(s=>s!==slug):[...list.slugs,slug]}:list));
  setNotice(persistent?'List updated.':'Saved for this session only. Browser storage is unavailable.');
 }
 function create(event:FormEvent<HTMLFormElement>) {
  event.preventDefault(); const form = event.currentTarget;
  const value = String(new FormData(form).get('name') || '').trim();
  if (!value) return;
  const result = createDeviceList(value,[slug]); form.reset();
  setNotice(result.persistent?'List created and place saved.':'Saved for this session only. Browser storage is unavailable.');
 }
 if (listId) return <div className="save-control"><button type="button" className="save-place" disabled={!ready} onClick={()=>toggle(listId)} aria-label={`Remove ${name} from this list`}>Remove from this list</button>{notice&&<p role="status" className="save-notice">{notice}</p>}</div>;
 return <div className="save-control"><Dialog open={open} onOpenChange={setOpen}><DialogTrigger asChild><button type="button" disabled={!ready} className="save-place" aria-label={`Choose lists for ${name}`}><svg className={`bookmark-icon ${saved?'is-saved':''}`} width="22" height="24" viewBox="0 0 24 26" fill="none" aria-hidden="true"><path className="bookmark-paper" d="M6 3h12v20l-6-4-6 4V3Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round"/><path className="bookmark-check" d="m9 11 2 2 4-4" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg><span>{saved?'Saved · manage lists':'Save to a list'}</span></button></DialogTrigger><DialogContent className="list-picker"><DialogTitle>Keep {name} in mind.</DialogTitle><DialogDescription>Choose a list. Every change is saved immediately on this device.</DialogDescription><div className="list-picker-options">{lists.map((list,index)=><label key={list.id}><input type="checkbox" checked={list.slugs.includes(slug)} onChange={()=>toggle(list.id)}/><span>{list.name}<small>List {index+1} · {list.slugs.length} {list.slugs.length===1?'place':'places'}</small></span></label>)}</div><form onSubmit={create}><label htmlFor={inputId}>Or create a new list</label><div className="list-name-row"><input id={inputId} name="name" placeholder="My next adventure" maxLength={listNameLimit} required/><button className="list-action" type="submit">Create & save</button></div></form>{notice&&<p role="status" className="save-notice">{notice}</p>}</DialogContent></Dialog></div>;
}
export function SavedLink() {
 const lists=useDeviceLists(); const count=new Set(lists.flatMap(list=>list.slugs)).size;
 return <Link href="/saved" className="saved-nav">Your lists{count>0&&<span aria-label={`${count} saved places`}> ({count})</span>}</Link>;
}
