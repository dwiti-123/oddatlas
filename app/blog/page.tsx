import type {Metadata} from 'next';
import Link from 'next/link';
import {Header,Footer} from '@/components/site-shell';
import {blogPosts} from '@/lib/blog';
import {findPlace} from '@/lib/places';
import {placeImage,siteUrl} from '@/lib/discovery';
import styles from './journal.module.css';
const title='The Odd Atlas Blog: Guides for Curious Travellers';
const description='Practical guides to unusual places. Plan a Hashima Island tour or an Island of the Dolls visit with clear context and original sources.';
export const metadata:Metadata={title,description,alternates:{canonical:'/blog'},openGraph:{title,description,url:'/blog',type:'website'}};
export default function BlogPage(){
 const schema={'@context':'https://schema.org','@type':'CollectionPage',name:title,url:`${siteUrl}/blog`,mainEntity:{'@type':'ItemList',itemListElement:blogPosts.map((post,index)=>({'@type':'ListItem',position:index+1,name:post.title,url:`${siteUrl}/blog/${post.slug}`}))}};
 return <><Header/><main id="main" className={`${styles.page} wrap`}><div className="breadcrumb"><Link href="/">Home</Link> / Blog</div><header className={styles.opening}><p className="eyebrow">The Odd Atlas blog / Field notes</p><h1>A little further<br/><em>into the story.</em></h1><p>How to get there. What to ask. What the stories leave out. Practical guides for the places that stay on your mind.</p></header><div className={styles.heading}><h2>All guides</h2><span>{blogPosts.length} carefully researched reads</span></div><div className={styles.grid}>{blogPosts.map(post=>{const place=findPlace(post.place)!;return <article key={post.slug} className={styles.card}><Link href={`/blog/${post.slug}`} className={styles.story}><div className={styles.photo}><img src={placeImage(place)} alt={place.alt} width={960} height={640} loading="lazy"/></div><p className="eyebrow">{post.country} / Visiting guide</p><h2>{post.title}</h2><p>{post.description}</p><span className={styles.read}>Read the guide <span aria-hidden="true">↗</span></span></Link><p className="photo-caption">Photo: <a href={place.photoUrl}>{place.credit}</a> · <a href={place.licenseUrl}>{place.license}</a></p></article>;})}</div><p className={styles.note}>A small, growing journal. Every guide links to its sources and separates local legends from practical visiting information.</p><script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(schema).replace(/</g,'\\u003c')}}/></main><Footer/></>;
}
