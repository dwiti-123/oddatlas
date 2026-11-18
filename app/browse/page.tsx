import Link from 'next/link';
import { places } from '@/lib/places';
import { Header,Footer } from '@/components/site-shell';
import { directoryCategories,entriesFor } from '@/lib/discovery';
import { blogPosts } from '@/lib/blog';
import { createSeoMetadata } from '@/lib/seo';
import {newPlaces,categoryId} from '@/lib/new-places';
import {curatedGuides} from '@/components/curated-travel-guide';

export const metadata=createSeoMetadata({title:'Browse Unusual Places & Travel Guides | Odd Atlas',description:'Browse Odd Atlas’s curated ghost towns, haunted and mysterious places, extraordinary stays and sourced visiting guides, grouped by category.',path:'/browse'});

export default function BrowsePage(){return <><Header/><main id="main" className="sources-page wrap">
 <p className="eyebrow">The atlas / Every detour</p><h1>Find your next strange place.</h1>
 <p>All {places.length+newPlaces.length} places in the collection, organised by what draws you there. Start with a story, then use a visiting guide where available to plan the journey.</p>
 <nav className="directory-links" aria-label="Browse categories">{directoryCategories.map(c=><a key={c.slug} href={`#${c.slug}`}>{c.title}</a>)}<a href="#visiting-guides">Visiting guides</a></nav>
 {directoryCategories.map(category=><section key={category.slug} id={category.slug}>
  <h2><Link href={`/category/${category.slug}`}>{category.title}</Link></h2><p>{category.description}</p>
  <ul className="discovery-index">{entriesFor(category.slug).map(place=><li key={place.slug}><Link href={`/places/${place.slug}`}>{place.name}, {place.country}</Link><span>{place.stay?'Can stay':'Visit only'}</span></li>)}{newPlaces.filter(place=>categoryId(place.category)===category.category).map(place=><li key={place.slug}><Link href={`/places/${place.slug}`}>{place.name}, {place.country}</Link><span>{place.stay?'Can stay':'Visit only'}</span></li>)}</ul>
 </section>)}
 <section id="visiting-guides"><h2>Plan the journey</h2><p>Practical guides for the boat ride, the road trip or the unusual overnight stay. Each guide identifies its sources and separates planning suggestions from verified information.</p><ul className="sources-list">{blogPosts.map(post=><li key={post.slug}><Link href={`/blog/${post.slug}`}>{post.title}</Link></li>)}</ul></section>
 <section><h2>Compare places</h2><p>Explore curated collections by experience and destination.</p><ul className="sources-list">{curatedGuides.map(guide=><li key={guide.path}><Link href={guide.path}>{guide.title}</Link></li>)}</ul></section>
 <section><h2>Explore another way</h2><ul className="sources-list"><li><Link href="/explore/map-view">Find the places on a map</Link></li><li><Link href="/guides/haunted-places">Understand haunted places, history and local legends</Link></li><li><Link href="/tools/random-weird-place">Discover a random place</Link></li><li><Link href="/tools/geography-anomaly-quiz">Try the geography quiz</Link></li><li><Link href="/sources">Read our sources and photograph credits</Link></li></ul></section>
 </main><Footer/></>;}
