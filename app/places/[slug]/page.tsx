import {PlaceTripGuide} from '@/components/place-trip-guide';
import {placeTripPlans} from '@/lib/place-trip-plans';
import {placeEssentials} from '@/lib/place-essentials';
import styles from '@/components/place-page.module.css';
import {HashimaFieldGuide} from '@/components/hashima-visit-planning';
import {hashimaVisit} from '@/lib/hashima-visit';
import { PlaceContext } from '@/components/place-context';
import { placeModifiedDates } from '@/lib/content-dates';
import { VisitStayTag } from '@/components/visit-stay-tag';
import Link from 'next/link';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { FullStory } from '@/components/full-story';
import { SavePlace } from '@/components/saved-places';
import { Header, Footer } from '@/components/site-shell';
import { LocationMap } from '@/components/location-map';
import { findPlace, searchDetails } from '@/lib/places';
import { allPlaceRoutes, categoryFor, placeImage, placeTitle, placeDescription, reviewedDate, siteUrl, locationWordCount, relatedPlaces, historyAnswers } from '@/lib/discovery';

export const dynamic = 'force-static';
export const revalidate = 86400;
export function generateStaticParams() {
 return allPlaceRoutes().map(p=>{
  if(locationWordCount(p)<300)throw new Error(`${p.slug}: add at least 300 words of sourced location prose before publishing.`);
  if(!p.discovery)throw new Error(`${p.slug}: add a question title and sourced locator before publishing.`);
  return {slug:p.slug};
 });
}
type Props = {params:Promise<{slug:string}>};
export async function generateMetadata({params}:Props):Promise<Metadata> {
 const p=findPlace((await params).slug); if(!p)notFound();
 const title=placeTitle(p), description=placeDescription(p), url=`/places/${p.slug}`;
 return {title:{absolute:`${title} | Odd Atlas`},description,alternates:{canonical:url},openGraph:{title,description,url,type:'article',images:[{url:placeImage(p),alt:p.alt}]},twitter:{card:'summary_large_image',title,description,images:[placeImage(p)]}};
}
export default async function PlacePage({params}:Props) {
 const p=findPlace((await params).slug); if(!p)notFound();
 const seo=searchDetails[p.slug], category=categoryFor(p), history=historyAnswers[p.slug];
 const structured={'@context':'https://schema.org','@type':'Article',headline:placeTitle(p),description:placeDescription(p),image:`${siteUrl}${placeImage(p)}`,...(placeModifiedDates[p.slug]?{dateModified:placeModifiedDates[p.slug]}:{}),author:{'@type':'Organization',name:'Odd Atlas',url:siteUrl},mainEntityOfPage:`${siteUrl}/places/${p.slug}`,about:{'@type':'Place',name:p.name,address:{'@type':'PostalAddress',addressRegion:p.region,addressCountry:p.country},...(p.discovery?{geo:{'@type':'GeoCoordinates',latitude:p.discovery.latitude,longitude:p.discovery.longitude}}:{})},citation:[...p.sources.map(s=>s.url),...(p.slug==='hashima'?hashimaVisit.sources.map(s=>s.url):(placeTripPlans[p.slug]?.sources??[]).map(s=>s.url))]};
 const breadcrumbs={'@context':'https://schema.org','@type':'BreadcrumbList',itemListElement:[{name:'Home',item:siteUrl+'/'},{name:category.title,item:`${siteUrl}/category/${category.slug}`},{name:p.name,item:`${siteUrl}/places/${p.slug}`}].map((item,index)=>({'@type':'ListItem',position:index+1,...item}))};
 const related=relatedPlaces(p);
 const planId=p.slug==='hashima'?'plan-hashima':'plan-visit';
 const guide=history?.guide??({
  kayakoy:{href:'/blog/how-to-visit-kayakoy-from-fethiye',label:'How to visit Kayaköy from Fethiye'},
  kuldhara:{href:'/blog/visiting-kuldhara-from-jaisalmer',label:'Visiting Kuldhara from Jaisalmer'},
  'deep-sleep':{href:'/blog/deep-sleep-wales-underground-stay',label:'Planning a Deep Sleep overnight stay'},
  'island-of-the-dolls':{href:'/blog/how-to-visit-island-of-the-dolls',label:'How to visit the Island of the Dolls'},
 } as Record<string,{href:string;label:string}>)[p.slug];
 return <><Header/><main id="main">
  <div className={`detail-top wrap ${styles.opening}`}>
   <div className={`breadcrumb ${styles.crumb}`}><Link href="/">Home</Link> / <Link href={`/category/${category.slug}`}>{category.title}</Link> / {p.name}</div>
   <p className="eyebrow">{p.categoryName} · {p.region}, {p.country}</p>
   <h1 className={`place-story-title ${styles.title}`}>{placeTitle(p)}</h1><p className="detail-intro">{p.hook}</p>
   <dl className={styles.essentials} aria-label="Visit essentials">{placeEssentials(p).map(([label,value])=><div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl>
   <div className={styles.actions}><a className={styles.primary} href={`#${planId}`}>{(placeTripPlans[p.slug]?.kind??(p.stay?'stay':'visit'))==='stay'?'Plan a stay':'Plan a visit'} ↓</a>{p.longStory&&<a href="#full-story-text">Read the story ↓</a>}<SavePlace slug={p.slug} name={p.name}/></div>
  </div>
  <figure className="wrap"><img src={placeImage(p)} alt={p.alt} width="1440" height="960" className="detail-photo" fetchPriority="high"/><figcaption className="photo-caption">{p.imageKind==='illustration'?'Illustration':'Photograph'}: {p.credit} · {p.photoDate}{p.imageKind==='photo'?` · ${p.license}`:''}</figcaption></figure>
  <div className={`detail-body wrap ${styles.body}`}><article>
   <section className={`story-opening ${styles.shortStory}`}><p className="eyebrow">The short story</p><h2>{p.storyTitle}</h2><p>{p.story}</p></section>
   {p.longStory&&<FullStory story={p.longStory} sources={p.sources} context={history?<div className={styles.historyContext}><h3>{history.question}</h3><p>{history.answer}</p><p className="source-context">Sources: {history.sources.map((source,index)=><span key={source.url}>{index>0?' · ':''}<a href={source.url}>{source.label}</a></span>)}</p></div>:undefined}/>}
   <div className={styles.plan}>{p.slug==='hashima'?<HashimaFieldGuide/>:<PlaceTripGuide place={p} questions={seo}/>}</div>
   <PlaceContext slug={p.slug}/>
   <section><h2>What is at {p.name} today?</h2><p>{p.slug==='hashima'?p.today.replace('Parts of the island are open through organised tours.', 'Organised visits use designated paths when island landing is permitted.'):p.today}</p></section>
   <LocationMap place={p}/>
   <section className="related-discovery"><h2>Where else could you explore?</h2>{related.length>0&&<><p>{p.category==='mystery'?'Compare other places where documented history and local legends meet.':p.category==='stays'?'Compare unusual stays through their settings and the journeys involved.':'Explore how different histories left these settlements changed.'}</p><ul className="related-place-links">{related.map(entry=><li key={entry.slug}><Link className="text-link" href={`/places/${entry.slug}`}>{entry.name}, {entry.country}</Link></li>)}</ul></>}<Link className="text-link" href={`/category/${category.slug}`}>Explore {category.title.toLowerCase()}</Link><br/><Link className="text-link" href="/tools/random-weird-place">Find a random weird place</Link>{p.category==='mystery'&&<p><Link className="text-link" href="/guides/haunted-places">Read our haunted & mysterious places guide</Link></p>}</section>
   <section><h2>Sources behind this entry</h2><ol className="sources-list">{p.sources.map((source,index)=><li id={`source-${index+1}`} key={source.url}><a href={source.url}>{source.title}</a></li>)}</ol><p className="source-context">History, local traditions and operator information are identified in the story. Access and booking details can change; check the original source before travelling.</p></section>
   <div className="credit-box">{p.imageKind==='photo'?<><p>Photo by {p.credit}. <a className="text-link" href={p.photoUrl}>Original photograph</a> · <a className="text-link" href={p.licenseUrl}>{p.license}</a>.</p><p>Image resized and compressed; display crops vary by screen.{p.license.includes('BY-SA')?` Image adaptations remain under ${p.license}.`:''}</p></>:<><p>{p.imageNote}</p><a className="text-link" href={p.sources[0].url}>See actual images on the operator’s website</a></>}</div>
  </article><aside><h2>Keep exploring</h2>{guide&&<p><Link className="text-link" href={guide.href}>{guide.label} ↗</Link></p>}<VisitStayTag stay={p.stay}/>{reviewedDate(p)&&<p>Background sources reviewed<br/><strong>{reviewedDate(p)}</strong></p>}<a href="#source-1" className="text-link">Sources behind the story ↓</a></aside></div>
  <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(structured).replace(/</g,'\\u003c')}}/><script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(breadcrumbs).replace(/</g,'\\u003c')}}/>
 </main><Footer/></>;
}
