'use client';
import Link from 'next/link';
import Image from 'next/image';
import { useRef, useState, useSyncExternalStore, type CSSProperties, type DragEvent, type FormEvent } from 'react';
import { ArrowRight, Check, Grip, Heart, MapPin, Mountain, Pause, Play, Plus, Stamp, StickyNote, Ticket, X } from 'lucide-react';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogTitle } from './ui/alert-dialog';
import { emptyWall, limit, parseWall, sampleTraces, traceKinds, wallKey, wallPoint, type Trace, type TraceKind, type WallState } from '@/lib/adventure-wall';

type PlaceChoice={slug:string;name:string;country:string};
type Spot={x:number;y:number};
type Draft={kind:TraceKind;art:number;message:string;signature:string;place:string;spot?:Spot};
const assetNames=['Island ruins','Fort arches','Desert town','Mountain escape','Forest hideaway','Old mountain hotel'];
const artPlaces=['hashima','bhangarh','kolmanskop','deep-sleep','mirrorcube','stanley-hotel'];
const kindLabels={note:'Notes',ticket:'Tickets',stamp:'Stamps',sticker:'Stickers'};
const kindIcons={note:StickyNote,ticket:Ticket,stamp:Stamp,sticker:Mountain};
const dragType='application/x-odd-atlas-trace';
const changeEvent='odd-atlas:wall-change';
let cached:string|null|undefined;
let memory:WallState=emptyWall;
let sessionOnly=false;
function snapshot(){
 if(sessionOnly)return memory;
 try{const raw=localStorage.getItem(wallKey);if(raw!==cached){memory=parseWall(raw);cached=raw;}}catch{/* Keep session contributions when storage is unavailable. */}
 return memory;
}
function subscribe(notify:()=>void){window.addEventListener('storage',notify);window.addEventListener(changeEvent,notify);return()=>{window.removeEventListener('storage',notify);window.removeEventListener(changeEvent,notify);};}
function persist(value:WallState){memory=value;cached=JSON.stringify(value);let saved=true;try{localStorage.setItem(wallKey,cached);}catch{sessionOnly=true;saved=false;}window.dispatchEvent(new Event(changeEvent));return saved;}
function Artwork({art,className=''}:{art:number;className?:string}){return <span aria-hidden="true" className={`wall-art ${className}`} style={{backgroundPosition:`${(art%3)*50}% ${art<3?0:100}%`}}/>;}
function Explorer(){return <svg viewBox="0 0 70 100" aria-hidden="true" className="wall-explorer-person"><g stroke="#263c31" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path className="explorer-leg-back" d="M36 60 24 78 13 91" fill="none"/><path className="explorer-leg-front" d="m37 60 10 18 10 13" fill="none"/><path d="m13 91-7 2m51-2 7 2"/><path d="m35 29-8 30 16 4 3-31Z" fill="#617267"/><path d="M28 31c-19-7-23 22-13 27l13-3" fill="#ae7150"/><path d="m43 36 10 14 9-9" fill="none"/><path d="m58 38 9 2-2 11-9-2Z" fill="#f1e4c8"/><path d="m30 34-7 17 7 9" fill="none"/><circle cx="40" cy="19" r="8" fill="#dec9a9"/><path d="M28 15q2-12 17-8l4 9-21 3-7-2Z" fill="#657967"/><path d="m37 26-2 5"/></g></svg>;}

export function AdventureWall({places}:{places:PlaceChoice[]}){
 const wall=useSyncExternalStore(subscribe,snapshot,()=>emptyWall);
 const ready=useSyncExternalStore(subscribe,()=>true,()=>false);
 const [activeKind,setActiveKind]=useState<TraceKind>('sticker');
 const [draft,setDraft]=useState<Draft|null>(null);
 const [placing,setPlacing]=useState(false);
 const [movingId,setMovingId]=useState<string|null>(null);
 const [target,setTarget]=useState<Spot>({x:51,y:66});
 const [notice,setNotice]=useState('');
 const [error,setError]=useState('');
 const [showExamples,setShowExamples]=useState(true);
 const [dragging,setDragging]=useState(false);
 const [removeId,setRemoveId]=useState<string|null>(null);
 const [paused,setPaused]=useState(false);
 const board=useRef<HTMLDivElement>(null);
 const scroll=useRef<HTMLDivElement>(null);
 const writing=useRef<HTMLTextAreaElement>(null);
 const tray=useRef<HTMLDivElement>(null);
 const traces=[...(showExamples?sampleTraces:[]),...wall.traces];
 function begin(kind:TraceKind,art:number,spot?:Spot){
  if(wall.traces.length>=limit){setNotice('Your wall has 24 traces. Remove one to make room for another.');return;}
  setActiveKind(kind);setPlacing(false);setMovingId(null);setError('');
  setDraft(current=>({kind,art,message:current?.message??'',signature:current?.signature??'',place:places.find(p=>p.slug===artPlaces[art])?.slug??places[0].slug,spot}));
  requestAnimationFrame(()=>writing.current?.focus({preventScroll:false}));
 }
 function saveTrace(current:Draft,spot:Spot){
  const state=snapshot();if(state.traces.length>=limit){setNotice('Your wall is full. Remove a trace to make room.');return;}
  const place=places.find(p=>p.slug===current.place);
  const trace:Trace={id:crypto.randomUUID(),kind:current.kind,art:current.art,message:current.message.trim().slice(0,120),signature:current.signature.trim().slice(0,28),place:place?.name??places[0].name,...wallPoint(spot.x,spot.y),angle:(state.traces.length%5-2)*1.5};
  const saved=persist({...state,traces:[...state.traces,trace]});
  setDraft(null);setPlacing(false);setMovingId(null);setNotice(saved?'Your trace is on the wall. It will be here when you return on this device.':'Placed for this session. Browser storage is unavailable.');
 }
 function move(id:string,spot:Spot){const state=snapshot();const saved=persist({...state,traces:state.traces.map(t=>t.id===id?{...t,...wallPoint(spot.x,spot.y)}:t)});setMovingId(null);setPlacing(false);setNotice(saved?'A new spot for your story.':'Moved for this session. Browser storage is unavailable.');}
 function placeAt(spot:Spot){if(movingId)move(movingId,spot);else if(draft)saveTrace(draft,spot);}
 function startPlacement(event:FormEvent){
  event.preventDefault();if(!draft)return;
  if(draft.kind==='note'&&!draft.message.trim()){setError('Write a little thought for your note.');writing.current?.focus();return;}
  if(draft.spot){saveTrace(draft,draft.spot);return;}
  setPlacing(true);setTarget({x:51,y:66});setNotice('Choose your spot on the map. Use arrow keys and Enter, or tap anywhere.');
  requestAnimationFrame(()=>{board.current?.focus({preventScroll:true});scroll.current?.scrollIntoView({behavior:'auto',block:'center'});if(scroll.current)scroll.current.scrollLeft=(scroll.current.scrollWidth-scroll.current.clientWidth)/2;});
 }
 function drag(event:DragEvent,kind:TraceKind,art:number,id?:string){event.dataTransfer.setData(dragType,JSON.stringify({kind,art,id}));event.dataTransfer.effectAllowed=id?'move':'copy';setDragging(true);}
 function drop(event:DragEvent){
  if(!event.dataTransfer.types.includes(dragType))return;event.preventDefault();setDragging(false);
  const bounds=board.current!.getBoundingClientRect();const spot=wallPoint((event.clientX-bounds.left)/bounds.width*100,(event.clientY-bounds.top)/bounds.height*100);
  try{const payload=JSON.parse(event.dataTransfer.getData(dragType));if(payload.id&&snapshot().traces.some(t=>t.id===payload.id)){move(payload.id,spot);return;}if(traceKinds.includes(payload.kind)&&Number.isInteger(payload.art)&&payload.art>=0&&payload.art<6)begin(payload.kind,payload.art,spot);}catch{setNotice('Choose a fresh piece from the tray.');}
 }
 function vote(id:string){const state=snapshot();const voted=state.votes.includes(id);const saved=persist({...state,votes:voted?state.votes.filter(v=>v!==id):[...state.votes,id]});setNotice(saved?(voted?'Removed from your wall wishes.':'A little vote for your next adventure. Remembered on this device.'):'Your wish is saved for this session only.');}
 function focusTray(){tray.current?.scrollIntoView({behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth',block:'center'});tray.current?.querySelector<HTMLButtonElement>('.wall-supply')?.focus({preventScroll:true});}
 return <div className="adventure-wall-page"><a className="skip-link" href="#main">Skip to content</a>
 <header className="wall-masthead"><div className="wall-brand"><Link href="/" aria-label="Odd Atlas home">odd atlas.</Link><span>The traveller’s wall</span></div><div className="wall-title"><h1>Leave a little trace.</h1><p>A note, a ticket, a stamp. Something of you, somewhere in the world.</p></div><nav aria-label="Wall navigation"><Link href="/#places">Explore</Link><button onClick={focusTray} type="button">Add a trace <Plus size={13}/></button><a href="#about-wall">About</a></nav></header>
 <main id="main"><div className="wall-preview-bar"><span><i/> Your own little corner of the world</span><span>Device-only preview <span aria-hidden="true">·</span> <button onClick={()=>setShowExamples(!showExamples)} type="button">{showExamples?'Hide examples':'Show examples'}</button></span></div>
 <section className={`wall-stage ${dragging?'is-dragging':''} ${placing?'is-placing':''}`} aria-label="Adventure wall">
 <div className="wall-scroll" ref={scroll}><div ref={board} className="wall-canvas" tabIndex={placing?0:-1} role="group" aria-label={placing?'Choose a spot. Arrow keys move the marker; Enter places your trace; Escape goes back.':'Your adventure wall. Scroll sideways to explore.'} onDragOver={event=>{if(event.dataTransfer.types.includes(dragType))event.preventDefault();}} onDrop={drop} onClick={event=>{if(!placing)return;const bounds=event.currentTarget.getBoundingClientRect();placeAt(wallPoint((event.clientX-bounds.left)/bounds.width*100,(event.clientY-bounds.top)/bounds.height*100));}} onKeyDown={event=>{if(!placing||event.target!==event.currentTarget)return;const step=event.shiftKey?10:3;if(['ArrowLeft','ArrowRight','ArrowUp','ArrowDown'].includes(event.key)){event.preventDefault();setTarget(current=>wallPoint(current.x+(event.key==='ArrowRight'?step:event.key==='ArrowLeft'?-step:0),current.y+(event.key==='ArrowDown'?step:event.key==='ArrowUp'?-step:0)));}else if(event.key==='Enter'||event.key===' '){event.preventDefault();placeAt(target);}else if(event.key==='Escape'){setPlacing(false);setMovingId(null);if(draft)requestAnimationFrame(()=>writing.current?.focus());}}}>
 <div className="wall-map-label map-label-america">North America</div><div className="wall-map-label map-label-europe">Europe</div><div className="wall-map-label map-label-africa">Africa</div><div className="wall-map-label map-label-asia">Asia</div><div className="wall-map-label map-label-oceania">Oceania</div><div className="wall-compass" aria-hidden="true"><span>N</span>✧</div><span className="wall-map-motto">Far places<br/>curious people<br/>little traces</span>
 {traces.map(trace=>{const example=trace.id.startsWith('example-');const voted=wall.votes.includes(trace.id);return <article key={trace.id} className={`wall-trace trace-${trace.kind} ${example?'is-example':'is-own'}`} style={{left:trace.x+'%',top:trace.y+'%','--trace-angle':trace.angle+'deg'} as CSSProperties} draggable={!example&&!placing} onDragStart={event=>drag(event,trace.kind,trace.art,trace.id)} onDragEnd={()=>setDragging(false)} onClick={event=>event.stopPropagation()} aria-label={`${example?'Example':'Your'} ${trace.kind}: ${trace.place}`}>
 <div className="wall-paper"><span className="trace-origin">{example?'Example':trace.signature||'Your trace'}</span>{trace.kind!=='note'&&<Artwork art={trace.art}/>}<span className="trace-place">{trace.kind==='ticket'&&<small>Next stop</small>}{trace.place}</span>{trace.message&&<p>{trace.message}</p>}{trace.kind==='note'&&<Artwork art={trace.art}/>}<span className="paper-curl" aria-hidden="true"/>{trace.kind==='ticket'&&<span className="ticket-stub" aria-hidden="true">ADMIT CURIOSITY</span>}</div>
 <div className="trace-caption"><span><MapPin size={10}/>{trace.place}</span><button type="button" aria-pressed={voted} aria-label={`I’d visit ${trace.place}`} disabled={!ready} onClick={()=>vote(trace.id)}>{voted?<Check size={12}/>:<Heart size={12}/>}<span>{voted?'I’d visit':'I’d visit'}</span></button></div>
 {!example&&!placing&&<div className="trace-own-actions"><button type="button" onClick={()=>{setMovingId(trace.id);setDraft(null);setTarget({x:trace.x,y:trace.y});setPlacing(true);requestAnimationFrame(()=>board.current?.focus({preventScroll:true}));}} aria-label={`Move your ${trace.kind}`}><Grip size={12}/>Move</button><button type="button" aria-label={`Remove your ${trace.kind}`} onClick={()=>setRemoveId(trace.id)}><X size={12}/></button></div>}
 </article>;})}
 {placing&&<div className="wall-placement-target" style={{left:target.x+'%',top:target.y+'%'}} aria-hidden="true"><span>{movingId?'Move it here':'Your little trace'}</span><Plus size={25}/></div>}
 {!placing&&!draft&&<div className="wall-drop-hint" aria-hidden="true"><span>There’s a story missing here.</span><span>Yours, perhaps?</span><svg width="74" height="35" viewBox="0 0 74 35"><path d="M2 2q20 28 64 23m-10-8 11 8-10 8" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4"/></svg></div>}
 </div></div>
 {draft&&!placing&&<form className="wall-composer" onSubmit={startPlacement} noValidate aria-label="Write your trace" onKeyDown={event=>{if(event.key==='Escape'){event.preventDefault();setDraft(null);setError('');}}}><button className="composer-close" type="button" aria-label="Close writing card" onClick={()=>{setDraft(null);setError('');}}><X size={16}/></button><span className="composer-eyebrow">Make it yours <span>0{traceKinds.indexOf(draft.kind)+1}</span></span><label htmlFor="wall-message">Your thought {draft.kind!=='note'&&<small>(optional)</small>}</label><textarea id="wall-message" ref={writing} value={draft.message} onChange={event=>{setDraft({...draft,message:event.target.value});setError('');}} maxLength={120} placeholder="This is where my next story starts…" rows={2} aria-invalid={!!error} aria-describedby={error?'wall-write-error':undefined}/><div className="composer-signature"><div><label htmlFor="wall-signature">Name <small>(optional)</small></label><input id="wall-signature" value={draft.signature} onChange={event=>setDraft({...draft,signature:event.target.value})} maxLength={28} placeholder="A fellow wanderer"/></div><div><label htmlFor="wall-place">A place in mind</label><select id="wall-place" value={draft.place} onChange={event=>setDraft({...draft,place:event.target.value})}>{places.map(p=><option value={p.slug} key={p.slug}>{p.name} · {p.country}</option>)}</select></div></div>{error&&<p id="wall-write-error" className="wall-error" role="alert">{error}</p>}<div className="composer-actions"><button className="wall-button" type="submit">{draft.spot?'Stick it here':'Choose a spot'} <ArrowRight size={14}/></button><button className="wall-button" type="button" onClick={()=>setDraft(null)}>Cancel</button></div></form>}
 {placing&&<div className="wall-placement-bar"><span>{movingId?'Give it a new home.':'Where does your story belong?'}</span><span>Tap the map, or use arrow keys.</span><button className="wall-button" type="button" onClick={()=>placeAt(target)}>Place here <Check size={14}/></button><button type="button" className="wall-button" onClick={()=>{setPlacing(false);setMovingId(null);}}>Cancel</button></div>}
 <div className="wall-stage-foot"><span>Illustrated atlas · place freely, not geographically</span><span>↔ Pan to wander</span></div>
 </section>
 <div className="wall-live-note" role="status">{notice||'The notes above are examples. Your additions and “I’d visit” wishes stay on this device.'}</div>
 <section className="wall-stationery" ref={tray} aria-label="Choose your stationery"><div className="wall-kind-picker" role="group" aria-label="Choose a trace type">{traceKinds.map(kind=>{const Icon=kindIcons[kind];return <button key={kind} type="button" aria-pressed={activeKind===kind} onClick={()=>setActiveKind(kind)}><Icon size={17}/>{kindLabels[kind]}<span>0{traceKinds.indexOf(kind)+1}</span></button>;})}</div>
 <div className="wall-tray"><div className={`tray-column ${activeKind==='note'?'is-active':''}`}><button className="wall-supply supply-notes" type="button" disabled={!ready} aria-label="Peel a blank note" draggable={ready} onClick={()=>begin('note',0)} onDragStart={event=>drag(event,'note',0)} onDragEnd={()=>setDragging(false)}><span className="note-under"/><span className="note-face"><small>A LITTLE THOUGHT</small><span>Write your<br/>next chapter.</span><i className="supply-curl"/></span></button><span className="tray-caption">A thought worth keeping.</span></div>
 <div className={`tray-column ${activeKind==='ticket'?'is-active':''}`}><button className="wall-supply supply-ticket" type="button" disabled={!ready} aria-label="Peel an adventure ticket" draggable={ready} onClick={()=>begin('ticket',2)} onDragStart={event=>drag(event,'ticket',2)} onDragEnd={()=>setDragging(false)}><span><small>ONE WAY TO</small><strong>Somewhere<br/>further</strong><span className="ticket-plane">✈</span></span><span className="ticket-tear">GOOD FOR<br/>ANOTHER<br/>STORY<br/><small>008310</small></span><i className="supply-curl"/></button><span className="tray-caption">Admit one curious soul.</span></div>
 <div className={`tray-column ${activeKind==='stamp'?'is-active':''}`}><div className="supply-stamp-sheet">{[1,3,4,2,0,5].map(art=><button className="wall-supply supply-stamp" key={art} type="button" disabled={!ready} aria-label={`Peel ${assetNames[art]} stamp`} draggable={ready} onClick={()=>begin('stamp',art)} onDragStart={event=>drag(event,'stamp',art)} onDragEnd={()=>setDragging(false)}><Artwork art={art}/><i className="supply-curl"/></button>)}</div><span className="tray-caption">A passport for the imagination.</span></div>
 <div className={`tray-column ${activeKind==='sticker'?'is-active':''}`}><div className="supply-sticker-sheet">{[0,1,3,4].map(art=><button className="wall-supply supply-sticker" key={art} type="button" disabled={!ready} aria-label={`Peel ${assetNames[art]} sticker`} draggable={ready} onClick={()=>begin('sticker',art)} onDragStart={event=>drag(event,'sticker',art)} onDragEnd={()=>setDragging(false)}><Artwork art={art}/><i className="supply-curl"/></button>)}</div><span className="tray-caption">Some places stick with you.</span></div></div>
 <div className="wall-tray-bottom"><p>Peel one. Make it yours. Place it anywhere.</p><span>Click or drag a piece to begin <ArrowRight size={13}/></span></div></section>
 <section className="wall-landscape" aria-label="An explorer’s little journey" data-paused={paused}><Image src="/images/adventure-wall/landscape.webp" sizes="(max-width: 760px) 900px, 100vw" alt="Illustrated island ruins, desert houses, fort arches and mountains" width="1800" height="600" loading="eager"/><svg className="explorer-path" viewBox="0 0 1400 120" preserveAspectRatio="none" aria-hidden="true"><path d="M0 96Q170 35 330 80T680 72T1030 78T1400 50" stroke="#aa5a3c" fill="none" strokeWidth="1.5" strokeDasharray="5 6"/></svg><div className="wall-explorer"><Explorer/></div><button type="button" disabled={!ready} onClick={()=>setPaused(!paused)} aria-label={paused?'Play explorer animation':'Pause explorer animation'}>{paused?<Play size={13}/>:<Pause size={13}/>}</button></section>
 <details id="about-wall" className="wall-about"><summary>A little about this wall</summary><p>This is a personal prototype: examples are marked, your notes and wishes are stored in this browser, and nothing is published to other travellers. Clearing browser data removes your additions. Drag your own traces to move them, or use their Move button and arrow keys. The map and place stickers are illustrations, not geographic guidance or photographs of the destinations.</p></details>
 </main><footer className="wall-footer"><Link href="/" className="wall-footer-brand">odd atlas.</Link><span>Places for a more curious world.</span><nav aria-label="Footer navigation"><Link href="/sources">Sources</Link><Link href="/saved">Your lists</Link><a href="#about-wall">About the wall</a></nav></footer>
 <AlertDialog open={!!removeId} onOpenChange={open=>{if(!open)setRemoveId(null);}}><AlertDialogContent className="list-delete-modal"><AlertDialogTitle>Remove this little trace?</AlertDialogTitle><AlertDialogDescription>This removes your contribution from this device. The example notes stay available.</AlertDialogDescription><div className="list-heading-actions"><AlertDialogCancel className="list-action">Keep it</AlertDialogCancel><AlertDialogAction className="list-action" onClick={()=>{const current=snapshot();persist({...current,traces:current.traces.filter(t=>t.id!==removeId),votes:current.votes.filter(id=>id!==removeId)});setRemoveId(null);setNotice('A little space for another story.');}}>Remove</AlertDialogAction></div></AlertDialogContent></AlertDialog>
 </div>;
}
