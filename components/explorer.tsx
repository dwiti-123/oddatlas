'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search, Shuffle } from 'lucide-react';
import { Tabs,TabsList,TabsTrigger,TabsContent } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { PlaceCard } from './place-card';
import { categories,places } from '@/lib/places';
export function Explorer() {
 const router=useRouter();
 const [category,setCategory]=useState('all'); const [query,setQuery]=useState('');
 const normalize=(value:string)=>value.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();
 const results=places.filter(p=>(category==='all'||p.category===category)&&normalize(`${p.name} ${p.region} ${p.country} ${p.hook} ${p.categoryName}`).includes(normalize(query).trim()));
 const random=()=>router.push(`/places/${places[Math.floor(Math.random()*places.length)].slug}`);
 return <section id="places" className="collection wrap"><div className="collection-heading"><div><p className="eyebrow">The collection / 001—{String(places.length).padStart(3,'0')}</p><h2>Worth a closer look.</h2></div><Button variant="ghost" className="random-button" onClick={random}><Shuffle size={16}/> Take me somewhere strange</Button></div><div className="search-box"><Search size={18} aria-hidden="true"/><Input aria-label="Search places, countries, or stories" placeholder="A place, a country, a curious story…" value={query} onChange={e=>setQuery(e.target.value)} type="search"/></div><Tabs value={category} onValueChange={setCategory}><TabsList variant="line" className="category-tabs" aria-label="Place category">{categories.map(c=><TabsTrigger key={c.id} value={c.id}>{c.label}</TabsTrigger>)}</TabsList>{categories.map(c=><TabsContent value={c.id} key={c.id}><p className="result-count" role="status">{results.length} {results.length===1?'place':'places'} to explore</p><div className="place-grid">{results.map(p=><PlaceCard key={p.slug} place={p}/>)}</div>{results.length===0&&<div className="no-results"><h3>No places found this time.</h3><p>Try a country name or explore the whole collection.</p><Button variant="outline" onClick={()=>{setQuery('');setCategory('all');}}>Clear filters</Button></div>}</TabsContent>)}</Tabs></section>;
}
