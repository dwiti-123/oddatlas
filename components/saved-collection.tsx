'use client';
import Link from 'next/link';
import { places } from '@/lib/places';
import { useSavedPlaces } from './saved-places';
import { PlaceCard } from './place-card';
export function SavedCollection() {
 const saved=useSavedPlaces(); const selected=places.filter(p=>saved.includes(p.slug));
 return <><p className="result-count" role="status">{selected.length} {selected.length===1?'place':'places'} on your list</p>{selected.length?<div className="place-grid">{selected.map(p=><PlaceCard key={p.slug} place={p}/>)}</div>:<div className="no-results"><h2>A little room for curiosity.</h2><p>Save a place that catches your eye. You’ll find it here when you come back.</p><Link className="text-link" href="/#places">Explore the collection</Link></div>}</>;
}
