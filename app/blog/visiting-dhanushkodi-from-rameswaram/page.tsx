import type {Metadata} from 'next';
import Link from 'next/link';
import {Header,Footer} from '@/components/site-shell';
import {findPlace} from '@/lib/places';
import {blogPosts} from '@/lib/blog';
import {placeImage,siteUrl} from '@/lib/discovery';
import styles from '../how-to-visit-hashima-island/story.module.css';

const {title,description,slug,modified:date}=blogPosts.find(post=>post.place==='dhanushkodi')!;
const path=`/blog/${slug}`;
const stops=[
 {name:'Old church and settlement ruins',destination:'Dhanushkodi Ruins, Tamil Nadu, India',decision:'Start here for the old town and the remains associated with the 1964 cyclone.'},
 {name:'Dhanushkodi Lighthouse',destination:'Dhanushkodi Lighthouse, Tamil Nadu, India',decision:'Add this for the modern lighthouse near the old railway station. Confirm gallery access if you want to go inside.'},
 {name:'Arichalmunai',destination:'Arichal Munai, Tamil Nadu, India',decision:'Add this for the view at the end of the coastal road. Check road access before building the day around it.'},
];
function directionsTo(destination:string){
 const query=new URLSearchParams({api:'1',origin:'Rameswaram, Tamil Nadu, India',destination,travelmode:'driving'});
 return `https://www.google.com/maps/dir/?${query}`;
}
const directions=directionsTo(stops[0].destination);
const sources=[
 {name:'Ramanathapuram District — Dhanushkodi location, history and road access',url:'https://ramanathapuram.nic.in/tourist-place/dhanushkodi/'},
 {name:'Directorate General of Lighthouses and Lightships — Dhanushkodi Lighthouse',url:'https://dgll.nic.in/DGLL-light-house-location/about-chennai/dhanushkodi-lighthouse'},
 {name:'Press Information Bureau — Mukundarayar Chathiram to Arichalmunai road link',url:'https://www.pib.gov.in/PressReleasePage.aspx?PRID=1497581'},
 {name:'Tamil Nadu State Transport Corporation — Rameswaram contact directory',url:'https://www.tnstc.in/Tamil_2025/inner_pages_2025_Tamil/information.html'},
];
export const metadata:Metadata={title,description,alternates:{canonical:path},openGraph:{title,description,url:path,type:'article'},twitter:{card:'summary_large_image',title,description}};
function Ref({number}:{number:number}){return <a className={styles.reference} href={`#reference-${number}`} aria-label={`Source ${number}: ${sources[number-1].name}`}>[{number}]</a>;}
export default function DhanushkodiGuide(){
 const place=findPlace('dhanushkodi')!;
 const image=placeImage(place);
 const structured={'@context':'https://schema.org','@type':'BlogPosting',headline:title,description,dateModified:date,mainEntityOfPage:`${siteUrl}${path}`,image:`${siteUrl}${image}`,author:{'@type':'Organization',name:'Odd Atlas',url:siteUrl},publisher:{'@type':'Organization',name:'Odd Atlas',url:siteUrl},citation:sources.map(s=>s.url)};
 return <><Header/><main id="main" className={styles.page}>
 <header className={`${styles.opening} wrap`}><div className="breadcrumb"><Link href="/">Home</Link> / <Link href="/blog">Blog</Link> / <Link href="/places/dhanushkodi">Dhanushkodi</Link> / Visiting guide</div><p className="eyebrow">The field journal / India</p><h1>{title}</h1><p className={styles.dek}>Start at the old church ruins, then decide whether to add the lighthouse or the coastal viewpoint at Arichalmunai.</p><p className={styles.byline}>By Odd Atlas · Updated <time dateTime={date}>23 November 2026</time> · 4 min read</p></header>
 <section className={`${styles.essentials} wrap`} aria-labelledby="dhanushkodi-essentials"><h2 id="dhanushkodi-essentials">Before you go</h2><dl><div><dt>Distance & transport</dt><dd><strong>About 18 km from Rameswaram.</strong> The district guide describes road access and public or private transport.</dd></div><div><dt>Time to allow</dt><dd><strong>Half a day is our planning suggestion</strong> for the road journey and coastal stops.</dd></div><div><dt>What to choose</dt><dd><strong>Decide your exact stop before booking transport.</strong> The old ruins, lighthouse and Arichalmunai are not one single attraction.</dd></div></dl><p><a href={directions}>Open driving directions from Rameswaram ↗</a> · <a href="#transport">Plan transport ↓</a></p></section>
 <figure className={`${styles.figure} wrap`}><img src={image} alt={place.alt} width={1440} height={960} fetchPriority="high"/><figcaption className="photo-caption">Photograph by <a href={place.photoUrl}>{place.credit}</a> · <a href={place.licenseUrl}>{place.license}</a> · Cropped for display</figcaption></figure>
 <div className={styles.body}><article>
 <p className={styles.lead}>Dhanushkodi is a former coastal town at the southern tip of Rameswaram island in Tamil Nadu. The district administration places it about 18 kilometres from Rameswaram and records how the 1964 cyclone devastated the settlement. This guide explains what the “ghost town” label means, how to plan the road journey and which details still need local confirmation. The <Link href="/places/dhanushkodi">full story of Dhanushkodi</Link> keeps the history and local traditions together.</p>
 <div className={styles.answer}><p className="eyebrow">Dhanushkodi from Rameswaram: the short answer</p><p>Dhanushkodi is roughly <strong>18 km from Rameswaram</strong>. Use Rameswaram as your planning base, choose the exact coastal stop you want, and arrange a return vehicle or current local transport before leaving. The district source confirms road access, but it does not publish a complete current fare or timetable. <Ref number={1}/></p><p><a href={directions}>Open the Rameswaram → Dhanushkodi driving route in Google Maps ↗</a></p></div>
 <nav className={styles.contents} aria-label="In this guide"><span className="eyebrow">Plan the visit</span><a href="#history">Why is Dhanushkodi called a ghost town?</a><a href="#transport">How do you get there?</a><a href="#stops">Which places should you see?</a><a href="#time">How much time should you allow?</a><a href="#check">What should you confirm?</a></nav>
 <section id="history"><h2>Why is Dhanushkodi called a ghost town?</h2><p>The old settlement was devastated by the cyclone of 1964. The district account describes Dhanushkodi at the island’s southern tip and records road access to the remains. The ruined church and railway traces are therefore not an abandoned town built for tourism; they are fragments of a place where people lived before the storm. <Ref number={1}/></p><p>The label should not erase the present. People still work and live in the wider Rameswaram and coastal area. Read “ghost town” as a description of the old settlement’s ruins, not as a claim that the whole region is empty.</p></section>
 <section id="transport"><h2>How do you get from Rameswaram to Dhanushkodi?</h2><p><strong>Plan a road journey from Rameswaram.</strong> The district visitor page says Dhanushkodi is reachable by road using public or private transport. It does not give a current bus number, departure timetable or standard taxi fare, so do not treat an old blog price as a live quote. <Ref number={1}/></p><p><a href={directions}>Get the route from your own starting point in Google Maps ↗</a></p><ul><li><strong>Private car or taxi:</strong> agree the complete return fare, waiting time and final drop before departing.</li><li><strong>Public transport:</strong> ask the Rameswaram transport office for the current service and last return option. The state transport directory lists a Rameswaram contact, but not a Dhanushkodi timetable. <Ref number={4}/></li><li><strong>Road conditions:</strong> keep the day flexible for weather, traffic and local access instructions.</li></ul><p>The 2017 government road-link announcement refers to the 9.5 km Mukundarayar Chathiram–Arichalmunai link. It confirms an infrastructure connection, not today’s operating hours or a guaranteed visitor route. <Ref number={3}/></p></section>
 <section id="stops">
  <h2>Which Dhanushkodi stop should you choose?</h2>
  <p>Choose the old church ruins if you have time for just one stop. For a half-day outing, pick one extra stop and agree on it before you arrange the return ride.</p>
  <ol>
   {stops.map(stop=><li key={stop.name}><strong>{stop.name}.</strong> {stop.decision} <a href={directionsTo(stop.destination)}>Driving directions to {stop.name} ↗</a></li>)}
  </ol>
  <p>The district lists Dhanushkodi at about <strong>18 km</strong> from Rameswaram, while the lighthouse authority gives about <strong>19 km</strong> for its lighthouse. These figures refer to different destinations. The government road-link announcement places Arichalmunai at the end of the route from Mukundarayar Chathiram. Follow current instructions on the ground. <Ref number={1}/><Ref number={2}/><Ref number={3}/></p>
 </section>
 <section id="time"><h2>How much time should you allow?</h2><p><strong>Allow half a day from Rameswaram</strong> as a practical starting point. That is our planning suggestion, not an official tour duration. It leaves room for the outward road journey, a slow look at the ruins, a separate coastal stop and the return ride. Add more time if you are photographing, travelling with children or waiting for a vehicle.</p><p>Keep onward trains, buses and ferry connections loose. Confirm toilets, shade, food, drinking water and accessibility locally; the official sources reviewed here do not provide a complete visitor-facilities list.</p></section>
 <section id="check"><h2>What should you confirm before leaving?</h2><ol><li>Which exact places are included: ruins, lighthouse and/or Arichalmunai.</li><li>The complete return fare or current public-transport route, including waiting and parking.</li><li>The last practical return option and any weather-related access change.</li><li>Whether the lighthouse or any interior area is open to visitors on your date.</li></ol><p>This checklist is intentionally conservative. Dhanushkodi is worth visiting for the story in the landscape, but a confirmed return plan will make the experience calmer.</p></section>
 <section className={styles.sources}><p className="eyebrow">Read the originals</p><h2>Sources & visitor information</h2><ol className="sources-list">{sources.map((source,index)=><li id={`reference-${index+1}`} key={source.url}><a href={source.url}>{source.name}</a></li>)}</ol><p className="source-context">Government sources document the history, road connection and lighthouse location. Check local road access, fares, timetables and opening hours for your trip. The half-day plan is Odd Atlas’s planning suggestion.</p></section>
 <p>For a place with a different kind of disappearance, read our <Link href="/blog/visiting-kuldhara-from-jaisalmer">Jaisalmer to Kuldhara visit guide</Link>.</p><Link className="text-link" href="/places/dhanushkodi">Explore Dhanushkodi’s story ↗</Link>
 </article></div><script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(structured).replace(/</g,'\\u003c')}}/></main><Footer/></>;
}
