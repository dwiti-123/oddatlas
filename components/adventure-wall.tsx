'use client';
import Link from 'next/link';
import { useSharedWall } from '@/lib/use-shared-wall';
import { AdventureFooter } from './adventure-footer';
import { useId, useRef, useState, useSyncExternalStore, type CSSProperties, type DragEvent } from 'react';
import { ArrowRight, Check, Grip, Heart, MapPin, Mountain, Plus, Stamp, StickyNote, Ticket, X } from 'lucide-react';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogTitle } from './ui/alert-dialog';
import { WallSupply } from './wall-supply';
import { WallNoteEditor, InkDrawing, type PaperContent } from './wall-note-editor';
import { emptyWall, limit, parseWall, sampleTraces, traceKinds, wallKey, wallPoint, type Trace, type TraceKind, type WallState } from '@/lib/adventure-wall';

type PlaceChoice={slug:string;name:string;country:string};
type Spot={x:number;y:number};
type Draft={id:string;kind:TraceKind;art:number;message:string;signature:string;place:string;spot?:Spot;noteMode?:PaperContent['noteMode'];ink?:PaperContent['ink']};
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
function InkSeal({art,place}:{art:number;place:string}){const id=useId().replace(/:/g,'');return <svg className="wall-ink-seal" viewBox="0 0 160 160" aria-hidden="true"><defs><path id={id} d="M25 80a55 55 0 1 1 110 0a55 55 0 1 1-110 0"/></defs><g fill="none" stroke="currentColor"><circle cx="80" cy="80" r="73" strokeWidth="3" strokeDasharray="110 3 51 2 74 4"/><circle cx="80" cy="80" r="67"/><circle cx="80" cy="80" r="43" strokeWidth="1.5" strokeDasharray="68 2 31 3"/></g><text fill="currentColor" fontSize="11" letterSpacing="2"><textPath href={'#'+id} startOffset="9%">{place.toUpperCase().slice(0,23)} · ODD ATLAS ·</textPath></text><g fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round">{art%3===0?<><path d="M49 88h62M58 88V68h14v20m4 0V59h16v29m5 0V73h10v15M48 96q8-5 16 0t16 0t16 0t16 0"/></>:art%3===1?<><path d="M51 94V68h9v-9h10v9h20v-9h10v9h9v26ZM72 94V82a8 8 0 0 1 16 0v12M61 76v5m38-5v5"/></>:<><path d="m48 95 23-39 13 21 10-15 20 33ZM62 72l9 4 7-7M90 78l5 3 5-6"/></>}</g><text x="80" y="115" textAnchor="middle" fill="currentColor" fontSize="7" letterSpacing="2">STAY CURIOUS</text></svg>;}

export function AdventureWall({places,embedded=false}:{places:PlaceChoice[];embedded?:boolean}){
 const Content=embedded?'div':'main';
 const shared=useSharedWall();
 const [posting,setPosting]=useState(false);
 const postingRef=useRef(false);
 const [reportId,setReportId]=useState<string|null>(null);
 const [reportReason,setReportReason]=useState('spam');
 const wall=useSyncExternalStore(subscribe,snapshot,()=>emptyWall);
 const ready=useSyncExternalStore(subscribe,()=>true,()=>false);
 const [activeKind,setActiveKind]=useState<TraceKind>('note');
 const [draft,setDraft]=useState<Draft|null>(null);
 const [placing,setPlacing]=useState(false);
 const [movingId,setMovingId]=useState<string|null>(null);
 const [target,setTarget]=useState<Spot>({x:51,y:66});
 const [notice,setNotice]=useState('');
 const [showExamples,setShowExamples]=useState(true);
 const [dragging,setDragging]=useState(false);
 const [removeId,setRemoveId]=useState<string|null>(null);
 const board=useRef<HTMLDivElement>(null);
 const scroll=useRef<HTMLDivElement>(null);
 const tray=useRef<HTMLDivElement>(null);
 const traces=[...(showExamples?sampleTraces.filter(t=>['example-hashima','example-fort','example-tree'].includes(t.id)):[]),...shared.traces,...wall.traces.filter(t=>!shared.traces.some(r=>r.id===t.id))];
 function cancelDraft(){if(postingRef.current)return;setDraft(null);setPlacing(false);setMovingId(null);setNotice('Choose another little piece whenever you like.');}
 function focusBoard(){requestAnimationFrame(()=>{board.current?.focus({preventScroll:true});scroll.current?.scrollIntoView({behavior:'auto',block:'center'});});}
 function begin(kind:TraceKind,art:number,spot?:Spot){
  if(postingRef.current)return;
  if(!shared.configured&&snapshot().traces.length>=limit){setNotice('Your wall has 24 traces. Remove one to make room for another.');return;}
  const next:Draft={id:spot&&draft?.kind===kind&&draft.art===art?draft.id:crypto.randomUUID(),kind,art,message:'',signature:'',place:places.find(p=>p.slug===artPlaces[art])?.slug??places[0].slug,spot};
  setActiveKind(kind);setMovingId(null);
  if(spot){if(kind==='stamp'||kind==='sticker'){saveTrace(next,spot);return;}setDraft(next);setPlacing(false);setNotice(kind==='note'?'Your paper is ready. Type or handwrite, then post it.':'Choose a destination on your ticket, or keep this one.');return;}
  setDraft(next);setPlacing(true);const scroller=scroll.current;
  setTarget(wallPoint(scroller?(scroller.scrollLeft+scroller.clientWidth/2)/scroller.scrollWidth*100:51,50));
  setNotice('Tap a spot on the map. Arrow keys and Enter work too. Escape cancels.');focusBoard();
 }
 async function saveTrace(current:Draft,spot:Spot){
  if(postingRef.current)return;postingRef.current=true;setPosting(true);
  try{
   const state=snapshot();if(!shared.configured&&state.traces.length>=limit){setNotice('Your wall is full. Remove a trace to make room.');return;}
   const place=places.find(p=>p.slug===current.place);
   const trace:Trace={id:current.id,kind:current.kind,art:current.art,message:current.message.trim().slice(0,120),signature:'',place:place?.name??places[0].name,...wallPoint(spot.x,spot.y),angle:(state.traces.length%5-2)*1.5,...(current.kind==='note'&&current.noteMode==='handwrite'?{noteMode:'handwrite' as const,ink:current.ink??[]}:{})};
   let saved=true;
   if(shared.configured)await shared.post(trace);else saved=persist({...state,traces:[...state.traces,trace]});
   setDraft(null);setPlacing(false);setMovingId(null);setNotice(shared.configured?'Your trace is on the shared wall. Other travellers can see it.':saved?'Saved on this device. Shared posting is not connected yet.':'Placed for this session. Browser storage is unavailable.');
  }catch(error){setNotice(error instanceof Error?error.message:'Could not post. Your draft is still here.');}
  finally{postingRef.current=false;setPosting(false);}
 }
 async function move(id:string,spot:Spot){
  try{if(shared.traces.some(t=>t.id===id))await shared.move(id,spot.x,spot.y);else {const state=snapshot();persist({...state,traces:state.traces.map(t=>t.id===id?{...t,...wallPoint(spot.x,spot.y)}:t)});}
   setMovingId(null);setPlacing(false);setNotice('A new spot for your story.');
  }catch(error){setNotice(error instanceof Error?error.message:'Could not move this trace.');}
 }
 async function removeTrace(){
  if(!removeId)return;
  try{if(shared.traces.some(t=>t.id===removeId))await shared.remove(removeId);else {const current=snapshot();persist({...current,traces:current.traces.filter(t=>t.id!==removeId),votes:current.votes.filter(id=>id!==removeId)});}setNotice('A little space for another story.');}
  catch(error){setNotice(error instanceof Error?error.message:'Could not remove this trace.');}finally{setRemoveId(null);}
 }
 function placeAt(spot:Spot){if(movingId)move(movingId,spot);else if(draft)begin(draft.kind,draft.art,spot);}
 function boardSpot(x:number,y:number){const rect=board.current?.getBoundingClientRect();if(!rect||x<rect.left||x>rect.right||y<rect.top||y>rect.bottom)return null;return wallPoint((x-rect.left)/rect.width*100,(y-rect.top)/rect.height*100);}
 function travel(x:number,y:number){const spot=boardSpot(x,y);if(spot)setTarget(spot);}
 function drag(event:DragEvent,kind:TraceKind,art:number,id?:string){const face=!id?event.currentTarget.querySelector(kind==='note'?'.note-face':'.wall-art'):null;if(face)event.dataTransfer.setDragImage(face,face.clientWidth/2,face.clientHeight/2);event.dataTransfer.setData(dragType,JSON.stringify({kind,art,id}));event.dataTransfer.effectAllowed=id?'move':'copy';setDragging(true);}
 function drop(event:DragEvent){
  if(!event.dataTransfer.types.includes(dragType))return;event.preventDefault();setDragging(false);
  const bounds=board.current!.getBoundingClientRect();const spot=wallPoint((event.clientX-bounds.left)/bounds.width*100,(event.clientY-bounds.top)/bounds.height*100);
  try{const payload=JSON.parse(event.dataTransfer.getData(dragType));if(payload.id&&(snapshot().traces.some(t=>t.id===payload.id)||shared.traces.some(t=>t.id===payload.id&&t.ownerId===shared.userId))){move(payload.id,spot);return;}if(traceKinds.includes(payload.kind)&&Number.isInteger(payload.art)&&payload.art>=0&&payload.art<6)begin(payload.kind,payload.art,spot);}catch{setNotice('Choose a fresh piece from the tray.');}
 }
 function vote(id:string){const state=snapshot();const voted=state.votes.includes(id);const saved=persist({...state,votes:voted?state.votes.filter(v=>v!==id):[...state.votes,id]});setNotice(saved?(voted?'Removed from your wall wishes.':'A little vote for your next adventure. Remembered on this device.'):'Your wish is saved for this session only.');}
 function focusTray(){tray.current?.scrollIntoView({behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth',block:'center'});tray.current?.querySelector<HTMLButtonElement>('.tray-column.is-active .wall-supply')?.focus({preventScroll:true});}
 return <div className={`adventure-wall-page ${embedded?'wall-embedded':''}`}>{!embedded&&<><a className="skip-link" href="#main">Skip to content</a>
 <header className="wall-masthead"><div className="wall-brand"><Link href="/" aria-label="Odd Atlas home">odd atlas.</Link><span>The traveller’s wall</span></div><div className="wall-title"><h1>Leave a little trace.</h1><p>A note, a ticket, a stamp. Something of you, somewhere in the world.</p></div><nav aria-label="Wall navigation"><Link href="/#places">Explore</Link><button onClick={focusTray} type="button">Add a trace <Plus size={13}/></button><a href="#about-wall">About</a></nav></header>
 </>}<Content id={embedded?undefined:'main'}><div className="wall-preview-bar"><span><i/> Your own little corner of the world</span><span>{shared.configured?'Shared traveller’s wall':'Device-only preview'} <span aria-hidden="true">·</span> <button onClick={()=>setShowExamples(!showExamples)} type="button">{showExamples?'Hide examples':'Show examples'}</button></span></div>
 <section className={`wall-stage ${dragging?'is-dragging':''} ${placing?'is-placing':''}`} aria-label="Adventure wall">
 <div className="wall-scroll" ref={scroll}><div ref={board} className="wall-canvas" tabIndex={placing?0:-1} role="group" aria-label={placing?'Choose a spot. Arrow keys move the marker; Enter places your trace; Escape goes back.':'Your adventure wall. Scroll sideways to explore.'} onDragOver={event=>{if(event.dataTransfer.types.includes(dragType))event.preventDefault();}} onDrop={drop} onPointerMove={event=>{if(!placing||event.pointerType!=='mouse')return;const rect=event.currentTarget.getBoundingClientRect();setTarget(wallPoint((event.clientX-rect.left)/rect.width*100,(event.clientY-rect.top)/rect.height*100));}} onClick={event=>{if(!placing)return;const bounds=event.currentTarget.getBoundingClientRect();placeAt(wallPoint((event.clientX-bounds.left)/bounds.width*100,(event.clientY-bounds.top)/bounds.height*100));}} onKeyDown={event=>{if(!placing||event.target!==event.currentTarget)return;const step=event.shiftKey?10:3;if(['ArrowLeft','ArrowRight','ArrowUp','ArrowDown'].includes(event.key)){event.preventDefault();setTarget(current=>wallPoint(current.x+(event.key==='ArrowRight'?step:event.key==='ArrowLeft'?-step:0),current.y+(event.key==='ArrowDown'?step:event.key==='ArrowUp'?-step:0)));}else if(event.key==='Enter'||event.key===' '){event.preventDefault();placeAt(target);}else if(event.key==='Escape'){cancelDraft();}}}>
 <div className="wall-map-label map-label-america">North America</div><div className="wall-map-label map-label-europe">Europe</div><div className="wall-map-label map-label-africa">Africa</div><div className="wall-map-label map-label-asia">Asia</div><div className="wall-map-label map-label-oceania">Oceania</div><div className="wall-compass" aria-hidden="true"><span>N</span>✧</div><span className="wall-map-motto">Far places<br/>curious people<br/>little traces</span>
 {traces.map(trace=>{const example=trace.id.startsWith('example-');const remote=shared.traces.find(t=>t.id===trace.id);const own=!example&&(!remote||remote.ownerId===shared.userId);const voted=wall.votes.includes(trace.id);return <article key={trace.id} className={`wall-trace trace-${trace.kind} ${example?'is-example':'is-own'}`} style={{left:trace.x+'%',top:trace.y+'%','--trace-angle':trace.angle+'deg'} as CSSProperties} draggable={own&&!placing&&!posting} onDragStart={event=>drag(event,trace.kind,trace.art,trace.id)} onDragEnd={()=>setDragging(false)} onClick={event=>event.stopPropagation()} aria-label={`${example?'Example':remote&&!own?'Traveller’s':'Your'} ${trace.kind}: ${trace.place}`}>
 <div className="wall-paper"><span className="trace-origin">{example?'Example':remote?'Shared trace':'Only on this device'}</span>{trace.kind==='stamp'?<InkSeal art={trace.art} place={trace.place}/>:trace.kind!=='note'&&<Artwork art={trace.art}/>}<span className="trace-place">{trace.kind==='ticket'&&<small>Next stop</small>}{trace.place}</span>{trace.kind==='note'&&trace.noteMode==='handwrite'?<InkDrawing ink={trace.ink??[]}/>:trace.message&&<p>{trace.message}</p>}<span className="paper-curl" aria-hidden="true"/>{trace.kind==='ticket'&&<span className="ticket-stub" aria-hidden="true">ADMIT CURIOSITY</span>}</div>
 <div className="trace-caption"><span><MapPin size={10}/>{trace.place}</span><button type="button" aria-pressed={voted} aria-label={`I’d visit ${trace.place}`} disabled={!ready} onClick={()=>vote(trace.id)}>{voted?<Check size={12}/>:<Heart size={12}/>}<span>{voted?'I’d visit':'I’d visit'}</span></button></div>
 {own&&!placing&&!posting&&<div className="trace-own-actions"><button type="button" onClick={()=>{setMovingId(trace.id);setDraft(null);setTarget({x:trace.x,y:trace.y});setPlacing(true);requestAnimationFrame(()=>board.current?.focus({preventScroll:true}));}} aria-label={`Move your ${trace.kind}`}><Grip size={12}/>Move</button><button type="button" aria-label={`Remove your ${trace.kind}`} onClick={()=>setRemoveId(trace.id)}><X size={12}/></button></div>}
 {!example&&remote&&!own&&<button className="trace-report" type="button" onClick={()=>setReportId(trace.id)}>Report</button>}
 </article>;})}
 {draft?.spot&&!placing&&(draft.kind==='note'||draft.kind==='ticket')&&<WallNoteEditor kind={draft.kind} spot={draft.spot} initialPlace={draft.place} places={places} busy={posting} sharing={shared.configured} onCancel={cancelDraft} onPost={content=>saveTrace({...draft,...content},draft.spot!)}/>}
 {placing&&<div className={`wall-placement-target preview-${draft?.kind??'move'}`} style={{left:target.x+'%',top:target.y+'%'}} aria-hidden="true">{draft?.kind==='stamp'?<InkSeal art={draft.art} place={places.find(p=>p.slug===draft.place)?.name??''}/>:draft?.kind==='sticker'?<Artwork art={draft.art}/>:<><span>{movingId?'Move it here':draft?.kind==='ticket'?'Your next stop':'Your little thought'}</span><Plus size={25}/></>}</div>}
 {!placing&&!draft&&<div className="wall-drop-hint" aria-hidden="true"><span>There’s a story missing here.</span><span>Yours, perhaps?</span><svg width="74" height="35" viewBox="0 0 74 35"><path d="M2 2q20 28 64 23m-10-8 11 8-10 8" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4"/></svg></div>}
 </div></div>
 {placing&&<div className="wall-placement-bar"><span>{movingId?'Give it a new home.':'Where does your story belong?'}</span><span>Tap the map, or use arrow keys.</span><button className="wall-button" type="button" disabled={posting} onClick={()=>placeAt(target)}>{posting?'Posting…':'Place here'} <Check size={14}/></button><button type="button" className="wall-button" onClick={cancelDraft}>Cancel</button></div>}
 <div className="wall-stage-foot"><span>Illustrated atlas · place freely, not geographically</span><span>↔ Pan to wander</span></div>
 </section>
 <div className="wall-live-note" role="status">{notice||(shared.configured?(shared.error||'Published traces are shared. Existing private notes and “I’d visit” wishes stay on this device.'):'The notes above are examples. Your additions and “I’d visit” wishes stay on this device.')} {shared.configured&&<button type="button" disabled={shared.loading||posting} onClick={()=>void shared.refresh()}>{shared.loading?'Loading…':'Refresh wall'}</button>}</div>
 <section className="wall-stationery" ref={tray} aria-label="Choose your stationery"><div className="wall-kind-picker" role="group" aria-label="Choose a trace type">{traceKinds.map(kind=>{const Icon=kindIcons[kind];return <button key={kind} type="button" aria-pressed={activeKind===kind} onClick={()=>setActiveKind(kind)}><Icon size={17}/>{kindLabels[kind]}<span>0{traceKinds.indexOf(kind)+1}</span></button>;})}</div>
 <div className="wall-tray"><div className={`tray-column ${activeKind==='note'?'is-active':''}`}><WallSupply className="wall-supply supply-notes" type="button" disabled={!ready||!!draft?.spot||posting} onPick={spot=>begin('note',0,spot)} onTravel={travel} getSpot={boardSpot} onCancelPick={cancelDraft} aria-label="Peel a blank note" draggable={ready} onDragStart={event=>drag(event,'note',0)} onDragEnd={()=>setDragging(false)}><span className="note-under"/><span className="note-face"><small>A LITTLE THOUGHT</small><span>Write your<br/>next chapter.</span><i className="supply-curl"/></span></WallSupply><span className="tray-caption">A thought worth keeping.</span></div>
 <div className={`tray-column ${activeKind==='ticket'?'is-active':''}`}><WallSupply className="wall-supply supply-ticket" type="button" disabled={!ready||!!draft?.spot} onPick={spot=>begin('ticket',2,spot)} onTravel={travel} getSpot={boardSpot} onCancelPick={cancelDraft} aria-label="Take an adventure ticket" draggable={ready} onDragStart={event=>drag(event,'ticket',2)} onDragEnd={()=>setDragging(false)}><span><small>ONE WAY TO</small><strong>Somewhere<br/>further</strong><span className="ticket-plane">✈</span></span><span className="ticket-tear">GOOD FOR<br/>ANOTHER<br/>STORY<br/><small>008310</small></span><i className="supply-curl"/></WallSupply><span className="tray-caption">Admit one curious soul.</span></div>
 <div className={`tray-column ${activeKind==='stamp'?'is-active':''}`}><div className="supply-stamp-sheet">{[1,3,4,2,0,5].map(art=><WallSupply className="wall-supply supply-stamp" key={art} type="button" disabled={!ready||!!draft?.spot} onPick={spot=>begin('stamp',art,spot)} onTravel={travel} getSpot={boardSpot} onCancelPick={cancelDraft} aria-label={`Choose ${assetNames[art]} ink seal`} draggable={ready} onDragStart={event=>drag(event,'stamp',art)} onDragEnd={()=>setDragging(false)}><InkSeal art={art} place={places.find(p=>p.slug===artPlaces[art])?.name??assetNames[art]}/></WallSupply>)}</div><span className="tray-caption">A passport for the imagination.</span></div>
 <div className={`tray-column ${activeKind==='sticker'?'is-active':''}`}><div className="supply-sticker-sheet">{[0,1,3,4].map(art=><WallSupply className="wall-supply supply-sticker" key={art} type="button" disabled={!ready||!!draft?.spot} onPick={spot=>begin('sticker',art,spot)} onTravel={travel} getSpot={boardSpot} onCancelPick={cancelDraft} aria-label={`Peel ${assetNames[art]} sticker`} draggable={ready} onDragStart={event=>drag(event,'sticker',art)} onDragEnd={()=>setDragging(false)}><Artwork art={art}/><i className="supply-curl"/></WallSupply>)}</div><span className="tray-caption">Some places stick with you.</span></div></div>
 <div className="wall-tray-bottom"><p>Pick a piece. Make it yours. Leave a trace.</p><span>Pick a piece, then tap or drag it onto the map <ArrowRight size={13}/></span></div></section>
 <details id="about-wall" className="wall-about"><summary>A little about this wall</summary><p>{shared.configured?'Posted traces are public. Existing private traces and wishes stay in this browser. Anonymous ownership lets you manage posts from this browser; clearing browser data can lose that access. Report inappropriate traces for review.':'This is a device-only preview until the shared wall is connected. Nothing here is published to other travellers. Clearing browser data removes your additions.'} Pick a piece and tap the map, or drag it into place. Notes support typed text or freehand ink; keyboard users can choose Type. Drag your own traces to move them, or use their Move button and arrow keys. The map and place stickers are illustrations, not geographic guidance or photographs of the destinations.</p></details>
 </Content>{!embedded&&<AdventureFooter onWall/>}
 <AlertDialog open={!!removeId} onOpenChange={open=>{if(!open)setRemoveId(null);}}><AlertDialogContent className="list-delete-modal"><AlertDialogTitle>Remove this little trace?</AlertDialogTitle><AlertDialogDescription>{shared.traces.some(t=>t.id===removeId)?'This removes your contribution from the shared wall.':'This removes your private contribution from this device.'}</AlertDialogDescription><div className="list-heading-actions"><AlertDialogCancel className="list-action">Keep it</AlertDialogCancel><AlertDialogAction className="list-action" onClick={()=>void removeTrace()}>Remove</AlertDialogAction></div></AlertDialogContent></AlertDialog>
 <AlertDialog open={!!reportId} onOpenChange={open=>{if(!open)setReportId(null);}}><AlertDialogContent className="list-delete-modal"><AlertDialogTitle>Report this trace?</AlertDialogTitle><AlertDialogDescription>Reports go to the wall owner for review.</AlertDialogDescription><label className="wall-report-reason">Reason<select value={reportReason} onChange={event=>setReportReason(event.target.value)}><option value="spam">Spam</option><option value="offensive">Offensive content</option><option value="personal-information">Personal information</option><option value="other">Something else</option></select></label><div className="list-heading-actions"><AlertDialogCancel className="list-action">Cancel</AlertDialogCancel><AlertDialogAction className="list-action" onClick={()=>{if(reportId)void shared.report(reportId,reportReason).then(()=>setNotice('Report sent for review.')).catch(error=>setNotice(error instanceof Error?error.message:'Could not send report.'));}}>Send report</AlertDialogAction></div></AlertDialogContent></AlertDialog>
 </div>;
}
