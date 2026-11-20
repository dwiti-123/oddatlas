import type { ReactNode } from 'react';
import Link from 'next/link';
import { Header, Footer } from '@/components/site-shell';
import type { blogPosts } from '@/lib/blog';
import { placeImage, siteUrl } from '@/lib/discovery';
import { findPlace } from '@/lib/places';
import styles from './how-to-visit-hashima-island/story.module.css';

type Props = {
  post: (typeof blogPosts)[number];
  dek: string;
  facts: ReadonlyArray<readonly [label: string, value: ReactNode]>;
  booking: { label: string; url: string };
  contents: ReadonlyArray<readonly [id: string, label: string]>;
  sources: ReadonlyArray<readonly [label: string, url: string]>;
  children: ReactNode;
};

export default function StayBookingGuide({ post, dek, facts, booking, contents, sources, children }: Props) {
  const place = findPlace(post.place)!;
  const placePath = `/places/${place.slug}`;
  const image = placeImage(place);
  const checked = new Intl.DateTimeFormat('en-GB', { dateStyle: 'long', timeZone: 'UTC' }).format(new Date(post.reviewed));
  const structured = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.description,
    datePublished: post.modified,
    dateModified: post.modified,
    mainEntityOfPage: `${siteUrl}/blog/${post.slug}`,
    image: `${siteUrl}${image}`,
    author: { '@type': 'Organization', name: 'Odd Atlas editorial', url: siteUrl },
    publisher: { '@type': 'Organization', name: 'Odd Atlas', url: siteUrl },
    citation: sources.map(([, url]) => url),
  };

  return (
    <>
      <Header />
      <main id="main" className={styles.page}>
        <header className={`${styles.opening} wrap`}>
          <div className="breadcrumb"><Link href="/">Home</Link> / <Link href="/blog">Blog</Link> / <Link href={placePath}>{place.name}</Link> / Booking guide</div>
          <p className="eyebrow">The field journal / {post.country}</p>
          <h1>{post.title}</h1>
          <p className={styles.dek}>{dek}</p>
          <p className={styles.byline}>By Odd Atlas editorial · Sources checked <time dateTime={post.reviewed}>{checked}</time></p>
        </header>
        <section className={`${styles.essentials} wrap`} aria-labelledby="stay-essentials">
          <h2 id="stay-essentials">Before you book</h2>
          <dl>{facts.map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl>
          <p><a href={booking.url}>{booking.label} ↗</a></p>
        </section>
        <figure className={`${styles.figure} wrap`}>
          <img src={image} alt={place.alt} width={1440} height={960} fetchPriority="high" />
          <figcaption className="photo-caption">
            {place.imageKind === 'illustration'
              ? <>Concept illustration. <a href={place.sources[0].url}>See photographs from the operator.</a></>
              : <>Photo by <a href={place.photoUrl}>{place.credit}</a> · <a href={place.licenseUrl}>{place.license}</a></>}
          </figcaption>
        </figure>
        <div className={styles.body}>
          <article>
            <nav className={styles.contents} aria-label="In this guide">
              {contents.map(([id, label]) => <a key={id} href={`#${id}`}>{label}</a>)}
            </nav>
            {children}
            <section className={styles.sources}>
              <h2>Sources & booking information</h2>
              <ul className="sources-list">{sources.map(([label, url]) => <li key={url}><a href={url}>{label}</a></li>)}</ul>
            </section>
            <Link className="text-link" href={placePath}>Read the {place.name} place story ↗</Link>
          </article>
        </div>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structured).replace(/</g, '\\u003c') }} />
      </main>
      <Footer />
    </>
  );
}
