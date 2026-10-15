'use client';

import {useEffect, useRef, useState, type CSSProperties, type PointerEvent} from 'react';
import {maxStrokes, maxStrokePoints, type InkPoint, type InkStroke} from '@/lib/adventure-wall';

type PlaceChoice={slug:string;name:string;country:string};
export type PaperContent={message:string;place:string;noteMode:'type'|'handwrite';ink:InkStroke[]};

export function InkDrawing({ink}:{ink:InkStroke[]}){
 return <svg className="wall-handwriting" viewBox="0 0 100 60" role="img" aria-label="Handwritten note">
  {ink.map((stroke,i)=>stroke.length===1?<circle key={i} cx={stroke[0].x} cy={stroke[0].y*.6} r=".6" fill="currentColor"/>:<polyline key={i} points={stroke.map(p=>`${p.x},${p.y*.6}`).join(' ')} fill="none" stroke="currentColor" strokeWidth=".9" strokeLinecap="round" strokeLinejoin="round"/>)}
 </svg>;
}

export function WallNoteEditor({kind,spot,initialPlace,places,onPost,onCancel,busy=false,sharing=false}:{kind:'note'|'ticket';spot:{x:number;y:number};initialPlace:string;places:PlaceChoice[];onPost:(content:PaperContent)=>void;onCancel:()=>void;busy?:boolean;sharing?:boolean}){
 const [mode,setMode]=useState<'type'|'handwrite'>('type');
 const [message,setMessage]=useState('');
 const [place,setPlace]=useState(initialPlace);
 const [ink,setInk]=useState<InkStroke[]>([]);
 const [current,setCurrent]=useState<InkStroke>([]);
 const [error,setError]=useState('');
 const paper=useRef<HTMLFormElement>(null);
 const textarea=useRef<HTMLTextAreaElement>(null);
 const active=useRef<{id:number;points:InkStroke}|null>(null);
 useEffect(()=>{
  paper.current?.scrollIntoView({block:'center',inline:'center',behavior:'instant'});
  if(kind==='note')textarea.current?.focus({preventScroll:true});
  else paper.current?.querySelector('select')?.focus({preventScroll:true});
 },[kind]);
 function point(event:PointerEvent<SVGSVGElement>):InkPoint{
  const rect=event.currentTarget.getBoundingClientRect();
  return {x:Math.round(Math.min(100,Math.max(0,(event.clientX-rect.left)/rect.width*100))*10)/10,y:Math.round(Math.min(100,Math.max(0,(event.clientY-rect.top)/rect.height*100))*10)/10};
 }
 function finish(event:PointerEvent<SVGSVGElement>){
  if(active.current?.id!==event.pointerId)return;
  const stroke=active.current.points;
  active.current=null;setCurrent([]);setInk(previous=>[...previous,stroke]);
  if(event.currentTarget.hasPointerCapture(event.pointerId))event.currentTarget.releasePointerCapture(event.pointerId);
 }
 return <form ref={paper} className={`wall-inline-draft draft-${kind}`} data-tools={spot.y>=50?'above':'below'} data-align={spot.x<15?'start':spot.x>85?'end':'center'} style={{left:spot.x+'%',top:spot.y+'%'} as CSSProperties} aria-busy={busy} aria-label={kind==='note'?'Write on your note':'Edit your ticket'} onClick={event=>event.stopPropagation()} onKeyDown={event=>{if(event.key==='Escape'&&!busy){event.preventDefault();onCancel();}}} onSubmit={event=>{
  event.preventDefault();if(busy)return;
  if(kind==='note'&&(mode==='type'?!message.trim():!ink.length)){setError(mode==='type'?'Write a little thought before posting.':'Draw something before posting, or choose Type.');return;}
  onPost({message:mode==='type'?message.trim():'',place,noteMode:mode,ink:mode==='handwrite'?ink:[]});
 }}>
  <div className="draft-paper-surface"><span className="draft-paper-origin">Your trace</span>
  {kind==='note'&&<>
   {mode==='type'?<textarea ref={textarea} aria-label="Your note" placeholder="Write here…" maxLength={120} disabled={busy} rows={3} value={message} onChange={event=>{setMessage(event.target.value);setError('');}} aria-invalid={!!error} aria-describedby={error?'inline-note-error':undefined}/>:<>
    <svg className="wall-ink-input" viewBox="0 0 100 60" role="img" aria-label="Handwriting area. Draw with a finger, stylus or mouse. Choose Type for keyboard writing." onPointerDown={event=>{
     if(busy)return;
     if(!event.isPrimary||event.button!==0||active.current)return;
     if(ink.length>=maxStrokes){setError('This note has plenty of ink. Undo a stroke or clear it to write again.');return;}
     event.preventDefault();event.currentTarget.setPointerCapture(event.pointerId);const points=[point(event)];active.current={id:event.pointerId,points};setCurrent(points);setError('');
    }} onPointerMove={event=>{
     if(active.current?.id!==event.pointerId)return;
     const next=point(event),old=active.current.points;
     if(Math.hypot(next.x-old[old.length-1].x,next.y-old[old.length-1].y)<.35)return;
     const points=[...(old.length>=maxStrokePoints?old.filter((_,i)=>i%2===0):old),next];active.current.points=points;setCurrent(points);
    }} onPointerUp={finish} onPointerCancel={finish} onLostPointerCapture={finish}>
     <g color="#384132">{[...ink,...(current.length?[current]:[])].map((stroke,i)=>stroke.length===1?<circle key={i} cx={stroke[0].x} cy={stroke[0].y*.6} r=".6"/>:<polyline key={i} points={stroke.map(p=>`${p.x},${p.y*.6}`).join(' ')} fill="none" stroke="currentColor" strokeWidth=".9" strokeLinecap="round" strokeLinejoin="round"/>)}</g>
    </svg>

   </>}
  </>}
  {kind==='ticket'&&<label className="inline-place ticket-destination">{kind==='ticket'?'Next stop':'A place in mind'}<select aria-label={kind==='ticket'?'Ticket destination':'Note destination'} value={place} onChange={event=>setPlace(event.target.value)}>{places.map(p=><option key={p.slug} value={p.slug}>{p.name} · {p.country}</option>)}</select></label>}
  <span className="paper-curl" aria-hidden="true"/></div>
  <div className="draft-toolbelt" aria-label="Paper tools">
  {kind==='note'&&<>   <div className="note-mode-picker" role="group" aria-label="How to write your note"><button type="button" aria-pressed={mode==='type'} onClick={()=>{setMode('type');setError('');requestAnimationFrame(()=>textarea.current?.focus({preventScroll:true}));}}>Type</button><button type="button" aria-pressed={mode==='handwrite'} onClick={()=>{setMode('handwrite');setError('');}}>Handwrite</button></div>
{mode==='handwrite'&&<>    <div className="ink-tools"><span>Make your mark.</span><button type="button" disabled={!ink.length} onClick={()=>{setInk(ink.slice(0,-1));setError('');}}>Undo</button><button type="button" disabled={!ink.length} onClick={()=>{setInk([]);setError('');}}>Clear</button></div></>}</>}
  {kind==='note'&&<label className="inline-place">A place in mind<select aria-label="Note destination" value={place} onChange={event=>setPlace(event.target.value)}>{places.map(p=><option key={p.slug} value={p.slug}>{p.name} · {p.country}</option>)}</select></label>}

  {error&&<p id="inline-note-error" className="wall-error" role="alert">{error}</p>}
  <div className="inline-paper-actions"><button className="wall-button" type="submit" disabled={busy}>{busy?'Posting…':kind==='note'?'Post note':'Keep ticket'}</button><button className="wall-button" type="button" disabled={busy} onClick={onCancel}>Cancel</button></div>
  <small className="draft-visibility">{sharing?'Public · visible to other travellers':'Private preview · saved on this device'}</small></div>
 </form>;
}
