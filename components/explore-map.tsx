'use client';
/* eslint-disable @next/next/no-img-element -- Licensed precompressed images shared with the collection. */
import { useState, useRef } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { MapPin, List, Map as MapIcon, Search, RotateCcw } from 'lucide-react';
import type { MapPlace } from '@/lib/map-places';
import { VisitStayTag } from './visit-stay-tag';
import { Button } from './ui/button';

const Canvas=dynamic(()=>import('./atlas-map-canvas'),{ssr:false,loading:()=> <div className="atlas-map-loading" role="status"><MapPin aria-hidden="true"/><p>Unfolding the atlas…</p><p className="source-context">The place list is ready to explore below.</p></div>});

export function ExploreMap({places}:{places:MapPlace[]}){
 const [category,setCategory]=useState('all'),[access,setAccess]=useState('all'),[query,setQuery]=useState('');
 const [view,setView]=useState<'map'|'list'>('map'),[selectedSlug,setSelectedSlug]=useState<string|null>(null),[viewToken,setViewToken]=useState(0);
 const mapPanel=useRef<HTMLDivElement>(null);
 const normalize=(s:string)=>s.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();
 const filtered=places.filter(p=>(category==='all'||p.category===category)&&(access==='all'||(access==='stay'?p.stay:!p.stay))&&normalize(`${p.name} ${p.region} ${p.country} ${p.hook}`).includes(normalize(query).trim()));
 const selected=filtered.find(p=>p.slug===selectedSlug);
 function select(slug:string){
  setSelectedSlug(slug);setViewToken(n=>n+1);setView('map');
  if(window.matchMedia('(max-width:760px)').matches)requestAnimationFrame(()=>{
   mapPanel.current?.focus({preventScroll:true});
   mapPanel.current?.scrollIntoView({block:'start',behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});
  });
 }
 function reset(){setCategory('all');setAccess('all');setQuery('');setSelectedSlug(null);setViewToken(n=>n+1);}
 return <section className="atlas-browser" aria-label="Explore places on the map">
  <div className="atlas-controls"><div className="atlas-search"><Search size={17} aria-hidden="true"/><input aria-label="Search the atlas" type="search" placeholder="A place, a country, a story…" value={query} onChange={e=>setQuery(e.target.value)}/></div>
   <label><span>Collection</span><select value={category} onChange={e=>setCategory(e.target.value)}><option value="all">All places</option><option value="ghost">Ghost towns</option><option value="mystery">Mystery & haunted</option><option value="stays">Extraordinary stays</option></select></label>
   <label><span>Access</span><select value={access} onChange={e=>setAccess(e.target.value)}><option value="all">Visit or stay</option><option value="visit">Visit only</option><option value="stay">You can stay here</option></select></label>
   <Button variant="ghost" onClick={reset} aria-label="Reset filters and world map"><RotateCcw size={16}/> Reset</Button>
  </div>
  <div className="atlas-view-bar"><p role="status">{filtered.length} {filtered.length===1?'place':'places'} to explore{selected?` · ${selected.name} selected`:''}</p><div className="atlas-view-toggle" role="group" aria-label="Choose map or list"><Button variant="ghost" aria-pressed={view==='map'} onClick={()=>setView('map')}><MapIcon size={16}/> Map</Button><Button variant="ghost" aria-pressed={view==='list'} onClick={()=>setView('list')}><List size={16}/> List</Button></div><div className="atlas-legend"><span><i className="visit-dot"/>Visit only</span><span><i className="stay-dot"/>You can stay here</span></div></div>
  <div className={`atlas-layout atlas-view-${view}`}><div ref={mapPanel} className="atlas-map-panel" role="region" aria-label="Interactive world map" tabIndex={-1}><Canvas places={filtered} selectedSlug={selected?.slug??null} onSelect={select} viewToken={viewToken}/>{selected&&<div className="atlas-location-note"><strong>{selected.name}</strong><p>{selected.mapNote}</p><a href={selected.coordinateSource}>Coordinate source ↗</a></div>}</div>
   <div className="atlas-place-list" aria-label="Places in the map collection">{filtered.length?filtered.map(p=><article key={p.slug} className={`atlas-list-card ${selected?.slug===p.slug?'is-selected':''}`}>
    <Link href={`/places/${p.slug}`} className="atlas-card-photo"><img src={p.image} alt={p.alt} width="280" height="220" loading="lazy"/>{p.imageKind==='illustration'&&<span className="atlas-image-kind">Illustration</span>}</Link>
    <div className="atlas-card-copy"><p className="eyebrow">{p.country} · {p.category==='ghost'?'Ghost town':p.category==='mystery'?'Mystery':'Stay'}</p><h2><Link href={`/places/${p.slug}`}>{p.name}</Link></h2><VisitStayTag stay={p.stay} className="inline-access"/><p className="atlas-hook">{p.hook}</p><div className="atlas-card-actions"><button type="button" onClick={()=>select(p.slug)} aria-label={`Show ${p.name} on map`}><MapPin size={14}/>Show on map</button><Link href={`/places/${p.slug}`}>Read the story ↗</Link></div></div>
   </article>):<div className="atlas-empty"><h2>No places in this corner yet.</h2><p>Try another country, category or visit/stay filter.</p><Button variant="outline" onClick={reset}>Show all places</Button></div>}</div>
  </div><noscript><p>The interactive map needs JavaScript. Explore every story here instead.</p><ul>{places.map(p=><li key={p.slug}><Link href={`/places/${p.slug}`}>{p.name}, {p.country}</Link></li>)}</ul></noscript>
 </section>;
}
