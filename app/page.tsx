import Link from 'next/link';
import { blogPosts } from '@/lib/blog';
import { siteUrl } from '@/lib/discovery';
import type { Metadata } from 'next';
const title='Odd Atlas — Ghost Towns, Haunted Places & Unusual Stays';
const description='Odd Atlas is an independent travel directory for ghost towns, haunted legends and extraordinary stays. Explore sourced stories, maps and visiting guides.';
export const metadata: Metadata = {
 title: {absolute:title},
 description,
 alternates: { canonical: '/' },
 openGraph:{title,description,url:'/',siteName:'Odd Atlas',type:'website'},
};
const identity={
 '@context':'https://schema.org',
 '@graph':[
  {'@type':'WebSite','@id':`${siteUrl}/#website`,url:`${siteUrl}/`,name:'Odd Atlas',alternateName:['OddAtlas','oddatlas.world'],description,inLanguage:'en',publisher:{'@id':`${siteUrl}/#organization`}},
  {'@type':'Organization','@id':`${siteUrl}/#organization`,url:`${siteUrl}/`,name:'Odd Atlas',alternateName:'OddAtlas'},
 ],
};
import { Explorer } from '@/components/explorer';
import { Header, Footer } from '@/components/site-shell';
export default function Home() {
 return <><Header /><main id="main"><section className="opening wrap"><p className="eyebrow">A collection of unusual places</p><div className="intro"><h1>Somewhere<br /><em>out of the ordinary.</em></h1><p>Forgotten towns. Stories that linger.<br />Places you can actually spend the night.<br />A small atlas for the curious.</p></div></section><section className="feature wrap" aria-label="Featured place"><Link href="/places/kolmanskop" className="feature-link"><img src="/images/kolmanskop-namibia-location-photo.webp" alt="Sand drifting through the doorways of a deserted house in Kolmanskop" width="1024" height="768" fetchPriority="high" /><div className="feature-top"><span>In focus / 01</span><span>Namibia · Ghost town</span></div><div className="feature-bottom"><div><p className="eyebrow">Kolmanskop, near Lüderitz</p><h2>The desert<br />moved in.</h2></div><span className="story-label">Explore the story</span></div></Link><p className="photo-caption">Kolmanskop, Namibia · Photograph by Damien du Toit, CC BY 2.0 · Cropped for display</p></section><Explorer /><section className="home-guides wrap" aria-labelledby="home-guides-heading"><p className="eyebrow">The field journal</p><div className="home-guides-heading"><h2 id="home-guides-heading">Plan the visit.</h2><Link className="text-link" href="/blog">All visiting guides ↗</Link></div><div className="home-guides-grid">{blogPosts.map(post=><article key={post.slug}><p className="eyebrow">{post.country} / Visiting guide</p><h3><Link href={`/blog/${post.slug}`}>{post.title}</Link></h3><p>{post.description}</p><Link className="text-link" href={`/blog/${post.slug}`}>Read the guide ↗</Link></article>)}</div></section><section className="guide-teaser wrap"><div><p className="eyebrow">A tool for any destination</p><h2>What will your trip cost?</h2></div><div><p>Add shared costs and daily spending to see your total trip budget and an equal per-person split.</p><Link className="text-link" href="/tools/travel-budget-calculator">Calculate a travel budget ↗</Link></div></section><section className="guide-teaser wrap"><div><p className="eyebrow">A field guide / 01</p><h2>Places with stories<br /><em>after dark.</em></h2></div><div><p>Five haunted and mysterious places, with history, local legends and a clearer picture of how to visit.</p><Link className="text-link" href="/guides/haunted-places">Explore haunted & mysterious places</Link></div></section><section id="about" className="about wrap"><p className="eyebrow">An atlas, carefully assembled</p><h2>Curiosity deserves<br /><em>a little context.</em></h2><div><p>Odd Atlas is an independent travel directory. We collect places with something unusual to tell, bringing together their stories, what’s there today and the sources behind them.</p><p>History is history. A local legend is a local legend. We make the difference clear, and keep the collection small enough to give each place our attention.</p><Link href="/sources" className="text-link">Our sources & photo credits</Link></div></section></main><script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(identity).replace(/</g,'\\u003c')}}/><Footer /></>;
}
