import { placeImage } from '@/lib/discovery';
import Link from 'next/link';
import type { Metadata } from 'next';
import { places } from '@/lib/places';
import { Header, Footer } from '@/components/site-shell';

const title = 'Haunted & Mysterious Places You Can Visit';
const description = 'Compare five places with ghost stories or unsettling histories: Bhangarh Fort, the Island of the Dolls, Paris Catacombs, Port Arthur and the Stanley Hotel.';
export const metadata: Metadata = {
 title, description, alternates: { canonical: '/guides/haunted-places' },
 openGraph: { title, description, url: '/guides/haunted-places', type: 'article' },
};
const entries = places.filter(p => p.category === 'mystery');
export default function HauntedPlacesGuide() {
 const structured = {
  '@context':'https://schema.org', '@type':'CollectionPage', name:title, description,
  url:'https://www.oddatlas.world/guides/haunted-places', dateModified:'2026-10-21',
  mainEntity:{'@type':'ItemList',itemListElement:entries.map((p,i)=>({'@type':'ListItem',position:i+1,name:p.name,url:`https://www.oddatlas.world/places/${p.slug}`}))},
 };
 return <><Header /><main id="main" className="guide-page wrap">
  <div className="breadcrumb"><Link href="/#places">The collection</Link> / Field guide</div>
  <p className="eyebrow">Five places / history & local legends</p>
  <h1>Haunted & mysterious<br /><em>places you can visit.</em></h1>
  <p className="guide-intro">Exploring haunted places? Compare a ruined fort, a canal island, an underground ossuary and two places with stories after dark. Start with what draws you in, then look at what visiting actually involves.</p>
  <p className="guide-context">“Haunted” describes a reputation, not a verified fact. Some entries have ghost legends; the Paris Catacombs belong here for their documented, unsettling history. This is a curated collection, not a ranking of paranormal claims.</p>
  <section className="guide-overview" aria-labelledby="choose-place"><h2 id="choose-place">Which kind of visit?</h2>
   <ul>{entries.map(p=><li key={p.slug}><a href={`#${p.slug}`}>{p.name}</a><span>{p.country} · {p.stay?'Hotel stays and separate tours':'Visit only'}</span></li>)}</ul>
  </section>
  <div className="guide-entries">{entries.map((p,i)=><article id={p.slug} className="guide-entry" key={p.slug}>
   <figure><Link href={`/places/${p.slug}`}><img src={placeImage(p)} alt={p.alt} width="960" height="640" loading="lazy" /></Link><figcaption className="photo-caption">{p.credit} · {p.license} · <a href={p.photoUrl}>Original photograph</a></figcaption></figure>
   <div><p className="eyebrow">0{i+1} / {p.region}, {p.country}</p><h2><Link href={`/places/${p.slug}`}>{p.name}</Link></h2><p>{p.story}</p><h3>What visiting involves</h3><p>{p.access}</p><Link className="text-link" href={`/places/${p.slug}`}>Read {p.name}’s story & sources</Link></div>
  </article>)}</div>
  <section className="guide-ending"><p className="eyebrow">Before you go</p><h2>Follow the story. Respect the place.</h2><p>Use authorised visitor routes, respect human remains and historic buildings, and check the official source for current access. A ghost-story reputation is never permission to enter a closed site.</p><h3>Sources & visitor information</h3><ul className="sources-list">{entries.map(p=><li key={p.slug}><a href={p.sources[0].url}>{p.sources[0].title}</a></li>)}</ul><p className="source-context">Compiled from the cited place entries on 13 October 2026. Each full story includes its historical references and image licence details. Visiting arrangements can change.</p><Link href="/#places" className="text-link">Explore the whole Odd Atlas collection</Link></section>
  <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(structured).replace(/</g,'\\u003c')}} />
 </main><Footer /></>;
}
