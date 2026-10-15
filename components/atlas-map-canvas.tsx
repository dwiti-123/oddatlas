'use client';
/* eslint-disable @next/next/no-img-element -- Licensed precompressed images shared with the collection. */
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { MapContainer, TileLayer, CircleMarker, Popup, useMap } from 'react-leaflet';
import type { CircleMarker as LeafletCircleMarker } from 'leaflet';
import type { MapPlace } from '@/lib/map-places';
import { VisitStayTag } from './visit-stay-tag';

function Viewport({selected,viewToken,places}:{selected:MapPlace|undefined;viewToken:number;places:MapPlace[]}){
 const map=useMap();
 useEffect(()=>{
  const observer=new ResizeObserver(()=>map.invalidateSize({pan:false}));
  observer.observe(map.getContainer());
  return ()=>observer.disconnect();
 },[map]);
 useEffect(()=>{
  map.invalidateSize({pan:false});
  if(selected)map.flyTo([selected.latitude,selected.longitude],7,{animate:!window.matchMedia('(prefers-reduced-motion: reduce)').matches,duration:.8});
  else if(places.length)map.fitBounds(places.map(p=>[p.latitude,p.longitude] as [number,number]),{padding:[35,35],maxZoom:5,animate:false});
  else map.setView([18,15],1,{animate:false});
 },[map,selected,viewToken,places]);
 return null;
}

function PlaceMarker({place,selected,onSelect,viewToken}:{place:MapPlace;selected:boolean;onSelect:(slug:string)=>void;viewToken:number}){
 const marker=useRef<LeafletCircleMarker>(null);
 useEffect(()=>{if(selected)marker.current?.openPopup();},[selected,viewToken]);
 const color=place.stay?'#243c31':'#a43d29';
 return <CircleMarker ref={marker} center={[place.latitude,place.longitude]} radius={selected?11:8} pathOptions={{color:'#fff',weight:2,fillColor:color,fillOpacity:1}} eventHandlers={{click:()=>onSelect(place.slug)}}>
  <Popup minWidth={210} maxWidth={270} autoPan keepInView autoPanPadding={[18,18]}>
   <div className="atlas-popup"><img src={place.image} alt={place.alt} width="250" height="150" loading="lazy"/>{place.imageKind==='illustration'&&<span className="atlas-image-kind">Concept illustration</span>}<p className="eyebrow">{place.country}</p><h2>{place.name}</h2><VisitStayTag stay={place.stay} className="inline-access"/><p>{place.hook}</p><Link href={`/places/${place.slug}`} className="text-link">Read the story ↗</Link></div>
  </Popup>
 </CircleMarker>;
}

export default function AtlasMapCanvas({places,selectedSlug,onSelect,viewToken}:{places:MapPlace[];selectedSlug:string|null;onSelect:(slug:string)=>void;viewToken:number}){
 const [tileError,setTileError]=useState(false);
 const selected=places.find(p=>p.slug===selectedSlug);
 return <><MapContainer center={[18,15]} zoom={1} minZoom={0} maxZoom={18} scrollWheelZoom={false} className="atlas-leaflet" aria-label="World map of the Odd Atlas collection">
  <TileLayer url="https://tile.openstreetmap.org/{z}/{x}/{y}.png" attribution={'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'} eventHandlers={{tileerror:()=>setTileError(true)}}/>
  <Viewport selected={selected} viewToken={viewToken} places={places}/>
  {places.map(p=><PlaceMarker key={p.slug} place={p} selected={p.slug===selectedSlug} onSelect={onSelect} viewToken={viewToken}/>)}
 </MapContainer>{tileError&&<p className="atlas-tile-notice" role="status">Some map tiles could not load. The place list and story links still work.</p>}</>;
}
