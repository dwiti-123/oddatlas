import type { Metadata } from 'next';
import { AdventureWall } from '@/components/adventure-wall';
import { places } from '@/lib/places';
import './wall.css';
export const metadata:Metadata={title:'The Traveller’s Wall — interactive preview',description:'Peel a note, pick a place, and leave a little trace on your own adventure wall.',robots:{index:false,follow:true}};
export default function AdventureWallPage(){return <AdventureWall places={places.map(p=>({slug:p.slug,name:p.name,country:p.country}))}/>;}
