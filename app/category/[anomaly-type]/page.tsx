import {SavePlace} from '@/components/saved-places';
import { CategoryNavigation } from '@/components/category-navigation';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Header, Footer } from '@/components/site-shell';
import { PlaceCard } from '@/components/place-card';
import { directoryCategories, entriesFor, findCategory, siteUrl } from '@/lib/discovery';
import { createSeoMetadata } from '@/lib/seo';
import { placeDrafts } from '@/lib/place-drafts';
import { VisitStayTag } from '@/components/visit-stay-tag';
export const dynamic='force-static';
export const revalidate=86400;
export function generateStaticParams(){return directoryCategories.map(c=>({'anomaly-type':c.slug}));}
type Props={params:Promise<{'anomaly-type':string}>};
export async function generateMetadata({params}:Props):Promise<Metadata>{
 const category=findCategory((await params)['anomaly-type']);if(!category)notFound();
 return createSeoMetadata({title:`${category.title} | Odd Atlas`,description:category.description,path:`/category/${category.slug}`});
}
export default async function CategoryPage({params}:Props){
 const category=findCategory((await params)['anomaly-type']);if(!category)notFound();const entries=entriesFor(category.slug);
 const draftCategory={ghost:'Ghost towns & forgotten cities',mystery:'Mystery & haunted places',stays:'Extraordinary stays'}[category.category];
 const drafts=placeDrafts.filter(place=>place.category===draftCategory);
 const structured={'@context':'https://schema.org','@type':'CollectionPage',name:category.title,url:`${siteUrl}/category/${category.slug}`,description:category.description,mainEntity:{'@type':'ItemList',itemListElement:[...entries,...drafts].map((p,i)=>({'@type':'ListItem',position:i+1,name:p.name,url:`${siteUrl}/places/${p.slug}`}))}};
 return <><Header/><main id="main" className="guide-page wrap"><div className="breadcrumb"><Link href="/">Home</Link> / The collection</div><p className="eyebrow">{entries.length+drafts.length} places</p><h1>{category.title}</h1><p className="guide-intro">{category.description}</p><CategoryNavigation active={category.category}/><div className="place-grid">{entries.map(p=><PlaceCard key={p.slug} place={p}/>)}{drafts.map((p,i)=><article className="place-card" key={p.slug}><Link href={`/places/${p.slug}`}><div className="card-photo">{p.image?<img src={p.image} alt={`${p.name}, ${p.country}`} width="960" height="640" loading="lazy" decoding="async"/>:<span className="image-label">Photo to be sourced</span>}<VisitStayTag stay={p.stay}/></div><div className="card-meta"><span>{p.region}, {p.country}</span><span className="card-number">{String(entries.length+i+1).padStart(2,'0')}</span></div><h3>{p.name}</h3><p>{p.hook}</p></Link><div className="card-category">{p.category}</div><SavePlace slug={p.slug} name={p.name}/></article>)}</div><section className="guide-ending"><h2>How should you plan a visit?</h2><p>Start with each place’s access notes and original sources. An abandoned building is not automatically open to visitors, and a reported haunting is not a verified event. Hotel and expedition arrangements come directly from their operators.</p><Link className="text-link" href="/tools/random-weird-place">Let curiosity choose your next place</Link></section><script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(structured).replace(/</g,'\\u003c')}}/></main><Footer/></>;
}
