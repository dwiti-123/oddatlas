'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search, Shuffle } from 'lucide-react';
import { CategoryNavigation } from './category-navigation';
import { requestPlaceHref } from '@/lib/contact';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { PlaceCard } from './place-card';
import { places } from '@/lib/places';
export function Explorer() {
 const router=useRouter();
 const [query,setQuery]=useState('');
 const normalize=(value:string)=>value.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();
 const results=places.filter(p=>normalize(`${p.name} ${p.region} ${p.country} ${p.hook} ${p.categoryName}`).includes(normalize(query).trim()));
 const random=()=>router.push(`/places/${places[Math.floor(Math.random()*places.length)].slug}`);
 return <section id="places" className="collection wrap"><div className="collection-heading"><div><p className="eyebrow">The collection / 001—{String(places.length).padStart(3,'0')}</p><h2>Worth a closer look.</h2></div><div className="collection-actions"><Button variant="ghost" className="random-button" onClick={random}><Shuffle size={16}/> Take me somewhere strange</Button><a className="request-place-button" href={requestPlaceHref}>Request a place <span aria-hidden="true">↗</span></a></div></div><div className="search-box"><Search size={18} aria-hidden="true"/><Input aria-label="Search places, countries, or stories" placeholder="A place, a country, a curious story…" value={query} onChange={e=>setQuery(e.target.value)} type="search"/></div><CategoryNavigation/><p className="result-count" role="status">{results.length} {results.length===1?'place':'places'} to explore</p><div className="place-grid">{results.map(p=><PlaceCard key={p.slug} place={p}/>)}</div>{results.length===0&&<div className="no-results"><h3>No places found this time.</h3><p>Try a country name or explore the whole collection.</p><Button variant="outline" onClick={()=>setQuery('')}>Clear filters</Button></div>}</section>;
}
