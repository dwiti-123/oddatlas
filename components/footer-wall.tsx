'use client';
import dynamic from 'next/dynamic';
import {useEffect,useRef,useState} from 'react';
import '@/app/adventure-wall/wall.css';
const Wall=dynamic(()=>import('./adventure-wall').then(module=>module.AdventureWall),{loading:()=> <p className="footer-wall-loading" role="status">Unrolling the traveller’s wall…</p>});
export function FooterWall({places}:{places:{slug:string;name:string;country:string}[]}){
 const root=useRef<HTMLDivElement>(null);
 const [visible,setVisible]=useState(false);
 useEffect(()=>{const observer=new IntersectionObserver(entries=>{if(entries.some(entry=>entry.isIntersecting)){setVisible(true);observer.disconnect();}},{rootMargin:'300px'});if(root.current)observer.observe(root.current);return()=>observer.disconnect();},[]);
 return <div ref={root} className="footer-wall-slot">{visible?<Wall embedded places={places}/>:<p className="footer-wall-loading">A little space for your next adventure.</p>}</div>;
}
