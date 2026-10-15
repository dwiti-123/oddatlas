import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Header, Footer } from '@/components/site-shell';
import { PlaceCard } from '@/components/place-card';
import { directoryCategories, entriesFor, findCategory, siteUrl } from '@/lib/discovery';
export const dynamic='force-static';
export const revalidate=86400;
export function generateStaticParams(){return directoryCategories.map(c=>({'anomaly-type':c.slug}));}
type Props={params:Promise<{'anomaly-type':string}>};
export async function generateMetadata({params}:Props):Promise<Metadata>{
 const category=findCategory((await params)['anomaly-type']);if(!category)notFound();
 return {title:category.title,description:category.description,alternates:{canonical:`/category/${category.slug}`},openGraph:{title:category.title,description:category.description,url:`/category/${category.slug}`}};
}
export default async function CategoryPage({params}:Props){
 const category=findCategory((await params)['anomaly-type']);if(!category)notFound();const entries=entriesFor(category.slug);
 const structured={'@context':'https://schema.org','@type':'CollectionPage',name:category.title,url:`${siteUrl}/category/${category.slug}`,description:category.description,mainEntity:{'@type':'ItemList',itemListElement:entries.map((p,i)=>({'@type':'ListItem',position:i+1,name:p.name,url:`${siteUrl}/places/${p.slug}`}))}};
 return <><Header/><main id="main" className="guide-page wrap"><div className="breadcrumb"><Link href="/">Home</Link> / The collection</div><p className="eyebrow">{entries.length} places · Carefully collected</p><h1>{category.title}</h1><p className="guide-intro">{category.description}</p><nav className="directory-links" aria-label="Explore categories">{directoryCategories.map(c=><Link key={c.slug} href={`/category/${c.slug}`} aria-current={c.slug===category.slug?'page':undefined}>{c.title}</Link>)}</nav><div className="place-grid">{entries.map(p=><PlaceCard key={p.slug} place={p}/>)}</div><section className="guide-ending"><h2>How should you plan a visit?</h2><p>Start with each place’s access notes and original sources. An abandoned building is not automatically open to visitors, and a reported haunting is not a verified event. Hotel and expedition arrangements come directly from their operators.</p><Link className="text-link" href="/tools/random-weird-place">Let curiosity choose your next place</Link></section><script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(structured).replace(/</g,'\\u003c')}}/></main><Footer/></>;
}
