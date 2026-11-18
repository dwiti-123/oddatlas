import Link from 'next/link';
import {Header,Footer} from '@/components/site-shell';
import {findPlace} from '@/lib/places';
import {placeImage,siteUrl} from '@/lib/discovery';
import styles from './curated-travel-guide.module.css';

type Entry={slug:string;reason:string;decision:string};
export type CuratedGuide={path:string;title:string;description:string;eyebrow:string;intro:string;notice:string;column:string;entries:Entry[]};

export const curatedGuides:CuratedGuide[]=[
 {path:'/lists/most-unusual-hotels-in-the-world',title:'Unusual Stays Around the World: Five Extraordinary Places',description:'Compare a mirrored treehouse, cliffside capsules, an underground camp, an Antarctic expedition and a salt hotel.',eyebrow:'Five unusual stays',intro:'A room in the trees, a cabin deep underground or a night on an Antarctic expedition: each of these stays makes the journey part of the story.',notice:'This is a curated selection, not a ranking. Rates, availability and package inclusions change; use the linked operator details for a date-specific quote.',column:'What makes it different',entries:[
  {slug:'mirrorcube',reason:'A mirrored room in a forest at Treehotel.',decision:'A stay for two; the shower is in a nearby building.'},
  {slug:'skylodge',reason:'Transparent capsules on a Sacred Valley cliff.',decision:'An adventure route is part of the overnight package.'},
  {slug:'deep-sleep',reason:'Cabins in a former Welsh slate mine.',decision:'A guided descent and return are part of the overnight trip.'},
  {slug:'whichaway',reason:'Heated pods in an Antarctic oasis.',decision:'Book an expedition itinerary, rather than a standalone room.'},
  {slug:'palacio-de-sal',reason:'A salt-built hotel beside Salar de Uyuni.',decision:'Check the room and salt-flat excursion separately.'},
 ]},
 {path:'/lists/real-ghost-towns-you-can-visit',title:'Ghost Towns You Can Visit: Five Places and Their Stories',description:'Compare Hashima, Dhanushkodi, Kayaköy, Kuldhara and Kolmanskop by history, location and visitor access.',eyebrow:'Five places / five histories',intro:'A coal island, a cyclone-damaged town, a hillside settlement and two desert villages: their empty buildings tell very different stories.',notice:'Access varies by place and date. Check the current official information linked from each story before travelling; this is not permission to enter closed areas.',column:'Why the settlement changed',entries:[
  {slug:'hashima',reason:'Its coal mine closed and residents left in 1974.',decision:'From Nagasaki, check current boat and landing arrangements.'},
  {slug:'dhanushkodi',reason:'A 1964 cyclone devastated the old settlement.',decision:'Visit the ruins from Rameswaram; people live in the wider area.'},
  {slug:'kayakoy',reason:'Its abandonment is linked to population exchange.',decision:'Visit the archaeological site near Fethiye.'},
  {slug:'kuldhara',reason:'The cause of departure remains debated; the curse is folklore.',decision:'Plan a day visit from Jaisalmer.'},
  {slug:'kolmanskop',reason:'A diamond-mining settlement declined after its boom.',decision:'Check guided tours and permits near Lüderitz.'},
 ]},
 {path:'/destinations/europe',title:'Unusual Places in Europe: Underground, Forest and History',description:'Explore the Paris Catacombs, Deep Sleep in Wales and the Mirrorcube in Sweden.',eyebrow:'Europe / Three different journeys',intro:'An underground ossuary in Paris, a night inside a Welsh mountain and a mirrored room in Sweden reveal very different ways to experience Europe.',notice:'These places are in different countries and require separate travel planning. Check entry and booking details before travelling.',column:'What makes it unusual',entries:[
  {slug:'paris-catacombs',reason:'A historic ossuary beneath the streets of Paris.',decision:'Book the public visitor route and check accessibility.'},
  {slug:'deep-sleep',reason:'An overnight camp inside a former slate mine in Wales.',decision:'A guided descent is part of the experience.'},
  {slug:'mirrorcube',reason:'A mirrored room suspended in a Swedish forest.',decision:'Book the room with Treehotel and check its facilities.'},
 ]},
 {path:'/destinations/americas',title:'Unusual Places in the Americas: Four Distinctive Experiences',description:'Explore the Island of the Dolls, Stanley Hotel, Skylodge and Palacio de Sal across the Americas.',eyebrow:'The Americas / Four different journeys',intro:'From Mexico City’s canals to an Andean cliff, a Colorado hotel and Bolivia’s salt flats, these four places reward curiosity in different ways.',notice:'These places are in different countries, far apart. Check access, travel and booking arrangements separately.',column:'What makes it unusual',entries:[
  {slug:'island-of-the-dolls',reason:'Dolls hang among trees in Xochimilco’s canals.',decision:'Confirm the exact island and return boat route.'},
  {slug:'stanley-hotel',reason:'A historic Colorado hotel with literary connections and ghost stories.',decision:'Hotel stays and tours are booked separately.'},
  {slug:'skylodge',reason:'Transparent sleeping capsules on a Peruvian cliff.',decision:'The overnight package includes an adventure route.'},
  {slug:'palacio-de-sal',reason:'Salt-built accommodation beside Salar de Uyuni.',decision:'Arrange the hotel and salt-flat excursion separately.'},
 ]},
 {path:'/destinations/india-unusual-places',title:'Unusual Places in India: Three Stories Worth Exploring',description:'Discover Dhanushkodi, Kuldhara and Bhangarh Fort through their history, legends and visitor information.',eyebrow:'India / Three distinct journeys',intro:'A coastal town transformed by a cyclone, a deserted village in the Thar Desert and a fort surrounded by legends. Each is a different way into India’s past.',notice:'These places are far apart: treat them as separate trips, not a single local route. Check access and transport before travelling.',column:'The story',entries:[
  {slug:'dhanushkodi',reason:'A coastal settlement devastated by the 1964 cyclone.',decision:'Use Rameswaram as a starting point.'},
  {slug:'kuldhara',reason:'A desert village whose departure is debated and retold in legend.',decision:'Visit from Jaisalmer; confirm entry and return transport.'},
  {slug:'bhangarh',reason:'A ruined Rajasthan fort with stories of a curse.',decision:'Plan a daylight visit and check the current access rules.'},
 ]},
];
export function curatedGuide(path:string){const g=curatedGuides.find(item=>item.path===path);if(!g)throw new Error(`Missing guide ${path}`);return g;}
export function CuratedTravelGuide({guide}:{guide:CuratedGuide}){
 const entries=guide.entries.map(entry=>{const place=findPlace(entry.slug);if(!place)throw new Error(`Missing place ${entry.slug}`);return {...entry,place};});
 const structured={'@context':'https://schema.org','@type':'CollectionPage',name:guide.title,description:guide.description,url:`${siteUrl}${guide.path}`,mainEntity:{'@type':'ItemList',itemListElement:entries.map(({place},i)=>({'@type':'ListItem',position:i+1,name:place.name,url:`${siteUrl}/places/${place.slug}`}))}};
 return <><Header/><main id="main" className="guide-page wrap"><div className="breadcrumb"><Link href="/browse">Browse</Link> / Field guide</div><p className="eyebrow">{guide.eyebrow}</p><h1>{guide.title}</h1><p className="guide-intro">{guide.intro}</p><p className="guide-context">{guide.notice}</p>
 <section className="guide-overview"><h2>Compare at a glance</h2><div className={styles.tableScroll} role="region" aria-label="Place comparison" tabIndex={0}><table className={styles.table}><thead><tr><th scope="col">Place</th><th scope="col">{guide.column}</th><th scope="col">Before you go</th></tr></thead><tbody>{entries.map(({place,reason,decision})=><tr key={place.slug}><th scope="row"><a href={`#${place.slug}`}>{place.name}</a><small>{place.region}, {place.country}</small></th><td>{reason}</td><td>{decision}</td></tr>)}</tbody></table></div></section>
 <div className="guide-entries">{entries.map(({place},i)=><article className="guide-entry" id={place.slug} key={place.slug}><figure><Link href={`/places/${place.slug}`}><img src={placeImage(place)} alt={place.alt} width="960" height="640" loading="lazy"/></Link><figcaption className="photo-caption">{place.imageKind==='illustration'?'Concept illustration':'Photograph'}: {place.credit}{place.imageKind==='photo'?<> · {place.license} · <a href={place.photoUrl}>Image source</a></>:<> · Not an exact representation</>}</figcaption></figure><div><p className="eyebrow">{String(i+1).padStart(2,'0')} / {place.region}, {place.country}</p><h2><Link href={`/places/${place.slug}`}>{place.name}</Link></h2><p>{place.story}</p><h3>Plan the visit</h3><p>{place.access}</p><p><Link className="text-link" href={`/places/${place.slug}`}>Read the full story and visiting information ↗</Link></p><p><a href={place.sources[0].url}>Original source: {place.sources[0].title} ↗</a></p></div></article>)}</div>
 <section className="guide-ending"><h2>Plan with care</h2><p>{guide.notice}</p><Link className="text-link" href="/explore/map-view">Explore the collection on the map ↗</Link></section>
 <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(structured).replace(/</g,'\\u003c')}}/></main><Footer/></>;
}
