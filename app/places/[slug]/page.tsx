import Link from 'next/link';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { FullStory } from '@/components/full-story';
import { SavePlace } from '@/components/saved-places';
import { Header, Footer } from '@/components/site-shell';
import { LocationMap } from '@/components/location-map';
import { findPlace, searchDetails } from '@/lib/places';
import { allPlaceRoutes, categoryFor, placeImage, placeTitle, placeDescription, reviewedDate, siteUrl, locationWordCount } from '@/lib/discovery';

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
 const seo=searchDetails[p.slug], category=categoryFor(p);
 const structured={'@context':'https://schema.org','@type':'Article',headline:placeTitle(p),description:placeDescription(p),image:`${siteUrl}${placeImage(p)}`,dateModified:reviewedDate(p),author:{'@type':'Organization',name:'Odd Atlas',url:siteUrl},mainEntityOfPage:`${siteUrl}/places/${p.slug}`,about:{'@type':'Place',name:p.name,address:{'@type':'PostalAddress',addressRegion:p.region,addressCountry:p.country},...(p.discovery?{geo:{'@type':'GeoCoordinates',latitude:p.discovery.latitude,longitude:p.discovery.longitude}}:{})},citation:p.sources.map(s=>s.url)};
 return <><Header/><main id="main"><div className="detail-top wrap"><div className="breadcrumb"><Link href="/">Home</Link> / <Link href={`/category/${category.slug}`}>{category.title}</Link> / {p.name}</div><p className="eyebrow">{p.categoryName} · {p.region}, {p.country}</p><h1 className="place-story-title">{placeTitle(p)}</h1><p className="detail-intro">{p.hook}</p><SavePlace slug={p.slug} name={p.name}/></div><figure className="wrap"><img src={placeImage(p)} alt={p.alt} width="1440" height="960" className="detail-photo" fetchPriority="high"/><figcaption className="photo-caption">{p.imageKind==='illustration'?'Illustration':'Photograph'}: {p.credit} · {p.photoDate}{p.imageKind==='photo'?` · ${p.license}`:''}</figcaption></figure><div className="detail-body wrap"><article><section className="story-opening"><p className="eyebrow">In short</p><h2>What is {p.name} known for?</h2><p>{p.story}</p>{p.longStory&&<p>{p.longStory.opening}</p>}</section>{seo&&<section className="visitor-answers" aria-label="Practical answers"><p className="eyebrow">Before you visit</p>{seo.questions.map(q=><section key={q.question}><h2>{q.question}</h2><p>{q.answer} <a className="text-link" href={q.source}>Official source</a></p></section>)}<p className="source-context">Visitor sources checked {seo.reviewed}. Confirm current conditions before travelling.</p></section>}{p.longStory&&<FullStory story={p.longStory} sources={p.sources}/>}<section><h2>What is at {p.name} today?</h2><p>{p.today}</p></section><section className="visit-notes"><p className="eyebrow">Plan a visit</p><h2>Can you {p.stay?'stay at':'visit'} {p.name}?</h2><p>{p.access}</p></section><LocationMap place={p}/><section className="related-discovery"><h2>Where else could you explore?</h2><Link className="text-link" href={`/category/${category.slug}`}>Explore {category.title.toLowerCase()}</Link><br/><Link className="text-link" href="/tools/random-weird-place">Find a random weird place</Link>{p.category==='mystery'&&<p><Link className="text-link" href="/guides/haunted-places">Read our haunted & mysterious places guide</Link></p>}</section><section><h2>Sources behind this entry</h2><ol className="sources-list">{p.sources.map((s,i)=><li id={`source-${i+1}`} key={s.url}><a href={s.url}>{s.title}</a></li>)}</ol><p className="source-context">History, local traditions and operator information are identified in the story. Access and booking details can change; check the original source before travelling.</p></section><div className="credit-box">{p.imageKind==='photo'?<><p>Photo by {p.credit}. <a className="text-link" href={p.photoUrl}>Original photograph</a> · <a className="text-link" href={p.licenseUrl}>{p.license}</a>.</p><p>Image resized and compressed; display crops vary by screen.{p.license.includes('BY-SA')?` Image adaptations remain under ${p.license}.`:''}</p></>:<><p>{p.imageNote}</p><a className="text-link" href={p.sources[0].url}>See actual images on the operator’s website</a></>}</div></article><aside><h2>Before you go</h2><span className={`stay-tag ${p.stay?'stay':''}`}>{p.stay?'You can live here':'Visit only'}</span><p>{p.stay?'A temporary hotel stay, subject to booking availability.':'Visitor access; this listing does not offer overnight accommodation.'}</p><p>Sources reviewed<br/><strong>{reviewedDate(p)}</strong></p><a href={p.sources[0].url} className="text-link">Check visitor information</a></aside></div><script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(structured).replace(/</g,'\\u003c')}}/></main><Footer/></>;
}
