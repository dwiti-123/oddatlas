'use client';
import { useState } from 'react';
import { Search, Shuffle } from 'lucide-react';
import { Tabs,TabsList,TabsTrigger,TabsContent } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { categories,places } from '@/lib/places';
export function Explorer() {
 const [category,setCategory]=useState('all'); const [query,setQuery]=useState('');
 const normalize=(value:string)=>value.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();
 const results=places.filter(p=>(category==='all'||p.category===category)&&normalize(`${p.name} ${p.region} ${p.country} ${p.hook} ${p.categoryName}`).includes(normalize(query).trim()));
 const random=()=>window.location.assign(`/places/${places[Math.floor(Math.random()*places.length)].slug}`);
 return <section id="places" className="collection wrap"><div className="collection-heading"><div><p className="eyebrow">The collection / 001—{String(places.length).padStart(3,'0')}</p><h2>Worth a closer look.</h2></div><Button variant="ghost" className="random-button" onClick={random}><Shuffle size={16}/> Take me somewhere strange</Button></div><div className="search-box"><Search size={18} aria-hidden="true"/><Input aria-label="Search places, countries, or stories" placeholder="A place, a country, a curious story…" value={query} onChange={e=>setQuery(e.target.value)} type="search"/></div><Tabs value={category} onValueChange={setCategory}><TabsList variant="line" className="category-tabs" aria-label="Place category">{categories.map(c=><TabsTrigger key={c.id} value={c.id}>{c.label}</TabsTrigger>)}</TabsList>{categories.map(c=><TabsContent value={c.id} key={c.id}><p className="result-count" role="status">{results.length} {results.length===1?'place':'places'} to explore</p><div className="place-grid">{results.map(p=><a href={`/places/${p.slug}`} key={p.slug} className="place-card"><div className="card-photo"><img src={`/images/${p.slug}.webp`} alt={p.alt} width="960" height="640" loading="lazy" decoding="async"/>{p.imageKind==='illustration'&&<span className="image-label">Illustration</span>}<span className={`stay-tag ${p.stay?'stay':''}`}>{p.stay?'You can live here':'Visit only'}</span></div><div className="card-meta"><span>{p.region}, {p.country}</span><span className="card-number">{String(places.indexOf(p)+1).padStart(2,'0')}</span></div><h3>{p.name}</h3><p>{p.hook}</p><span className="card-category">{p.categoryName}</span></a>)}</div>{results.length===0&&<div className="no-results"><h3>No places found this time.</h3><p>Try a country name or explore the whole collection.</p><Button variant="outline" onClick={()=>{setQuery('');setCategory('all');}}>Clear filters</Button></div>}</TabsContent>)}</Tabs></section>;
}
