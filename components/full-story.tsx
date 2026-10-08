'use client';
import { useRef } from 'react';
import type { LongStory } from '@/lib/places';
export function FullStory({story,sources}:{story:LongStory;sources:{title:string;url:string}[]}) {
 const start=useRef<HTMLHeadingElement>(null);
 const minutes=Math.max(1,Math.ceil(story.chapters.reduce((n,c)=>n+c.text.split(/\s+/).length,story.opening.split(/\s+/).length)/200));
 return <details className="long-story full-story" onToggle={event=>{
  if(event.currentTarget.open){start.current?.focus({preventScroll:true});start.current?.scrollIntoView({block:'start',behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});}
 }}><summary><span><span className="story-invitation">Read the full story</span><span className="story-length">{story.chapters.length} chapters · {minutes} min read</span></span><span className="story-toggle" aria-hidden="true">+</span></summary><div className="story-expansion"><h2 ref={start} tabIndex={-1} className="reader-start">A closer look</h2>{story.chapters.map((chapter,i)=><section className="story-chapter" key={chapter.title}><p className="eyebrow">{String(i+1).padStart(2,'0')} / {chapter.kind==='folklore'?'Local folklore':chapter.kind==='context'?'Context':'The story'}</p><h3>{chapter.title}</h3><p>{chapter.text}<span className="story-citations">{chapter.references.map(url=>{const index=sources.findIndex(s=>s.url===url);return <a key={url} href={`#source-${index+1}`} aria-label={`Source ${index+1}: ${sources[index]?.title}`}>[{index+1}]</a>;})}</span></p></section>)}</div></details>;
}
