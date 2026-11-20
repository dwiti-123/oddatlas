import type { Metadata } from 'next';
import Link from 'next/link';
import { Header, Footer } from '@/components/site-shell';
import { skylodgePost } from '@/lib/blog';
import { placeImage, siteUrl } from '@/lib/discovery';
import { findPlace } from '@/lib/places';
import styles from '../how-to-visit-hashima-island/story.module.css';

const { title, description, reviewed, modified, place: placeSlug, slug } = skylodgePost;
const path = `/blog/${slug}`;
const placePath = `/places/${placeSlug}`;
const checked = '20 November 2026';
const operator = 'https://naturavive.com/web/skylodge-adventure-suites/';
const booking = 'https://naturavive.com/web/booknow/';
const costExplainer = 'https://naturavive.com/web/skylodge-adventure-suites-is-sleeping-400-meters-above-perus-sacred-valley-worth-it/';

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: path },
  openGraph: { title, description, url: path, type: 'article', publishedTime: modified, modifiedTime: modified },
  twitter: { card: 'summary_large_image', title, description },
};

export default function SkylodgeGuide() {
  const place = findPlace(placeSlug)!;
  const image = placeImage(place);
  const structured = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: title,
    description,
    datePublished: modified,
    dateModified: modified,
    mainEntityOfPage: `${siteUrl}${path}`,
    image: `${siteUrl}${image}`,
    author: { '@type': 'Organization', name: 'Odd Atlas editorial', url: siteUrl },
    publisher: { '@type': 'Organization', name: 'Odd Atlas', url: siteUrl },
    citation: [operator, booking, costExplainer],
  };

  return (
    <>
      <Header />
      <main id="main" className={styles.page}>
        <header className={`${styles.opening} wrap`}>
          <div className="breadcrumb"><Link href="/">Home</Link> / <Link href="/blog">Blog</Link> / <Link href={placePath}>Skylodge</Link> / Booking guide</div>
          <p className="eyebrow">The field journal / Peru</p>
          <h1>{title}</h1>
          <p className={styles.dek}>Before you pick a night in a transparent pod, decide how you want to get up the cliff.</p>
          <p className={styles.byline}>By Odd Atlas editorial · Sources checked <time dateTime={reviewed}>{checked}</time></p>
        </header>

        <section className={`${styles.essentials} wrap`} aria-labelledby="skylodge-essentials">
          <h2 id="skylodge-essentials">Before you book</h2>
          <dl>
            <div><dt>Listed price</dt><dd><strong>S/1,550–S/1,640 per person</strong> for one night.</dd></div>
            <div><dt>Time to set aside</dt><dd><strong>About 23 hours</strong> from Cusco pickup to return.</dd></div>
            <div><dt>How you get there</dt><dd><strong>Guided cliff climb or steep hike</strong> from Pachar.</dd></div>
          </dl>
          <p><a className="text-link" href={booking}>Check dates and request a quote from Natura Vive ↗</a></p>
        </section>

        <figure className={`${styles.figure} wrap`}>
          <img src={image} alt={place.alt} width={1440} height={960} fetchPriority="high" />
          <figcaption className="photo-caption">Concept illustration. <a href={operator}>See photographs of the actual capsules from Natura Vive.</a></figcaption>
        </figure>

        <div className={styles.body}>
          <article>
            <p className={styles.lead}>At Skylodge, checking in means putting on a harness. The sleeping capsules hang above Peru’s Sacred Valley, near Ollantaytambo. The choice to make before reserving is whether you want to climb the cliff on steel rungs or take the steep hiking approach to the pods.</p>

            <nav className={styles.contents} aria-label="In this guide">
              <a href="#cost">Price & inclusions</a><a href="#routes">Climb or hike?</a><a href="#itinerary">Cusco itinerary</a><a href="#capsule">Inside the pod</a><a href="#booking">How to book</a>
            </nav>

            <section id="cost">
              <h2>How much does a night at Skylodge cost?</h2>
              <p>Natura Vive’s <a href={booking}>2026 booking rates</a> list <strong>S/1,550 per person</strong> for either the zipline overnight or the via ferrata overnight, and <strong>S/1,640 per person</strong> for the package with both activities. For two travelers, that is <strong>S/3,100 or S/3,280</strong> at the listed rates. The operator also gives <strong>US$450–$550 per person</strong> as a general budget range in its <a href={costExplainer}>Skylodge cost guide</a>.</p>
              <p>Request a quote for your date before paying. The package lists hotel transfers, guides, equipment, a snack for the ascent, dinner with wine and breakfast. Photography is an extra.</p>
            </section>

            <section id="routes">
              <h2>Do you have to climb to reach Skylodge?</h2>
              <p><strong>The via ferrata</strong> is the more vertical approach. You climb about <strong>400 metres</strong> on fixed rungs while clipped into a safety cable. Natura Vive says prior rock-climbing experience is unnecessary, but you should be comfortable with sustained climbing and exposed heights.</p>
              <p><strong>The hiking approach</strong> avoids the main vertical climb. Natura Vive describes a steep trail with steps and exposed sections and mentions a roughly <strong>40-minute hike to the first zipline</strong>. Ask which approach and descent your package includes. The <a href={operator}>published itinerary</a> lists ziplining or rappelling for the way down.</p>
            </section>

            <section id="itinerary">
              <h2>What does the overnight trip from Cusco look like?</h2>
              <p>In the <a href={operator}>operator’s sample itinerary</a>, pickup at your Cusco hotel is around <strong>2 pm</strong>. The drive to the base at Pachar takes about <strong>90 minutes</strong>. After the equipment fitting and briefing, the guides take you up to the capsules in time for an evening on the cliff.</p>
              <p>After breakfast, you descend and return to Cusco at around <strong>1 pm the next day</strong>. Keep that morning free. If you’re staying in Ollantaytambo or elsewhere in the Sacred Valley, confirm your pickup and drop-off when you reserve.</p>
            </section>

            <section id="capsule">
              <h2>What is it like inside a Skylodge capsule?</h2>
              <p>The transparent panels are polycarbonate set in an aluminum frame. Inside are beds, solar-powered lighting, curtains and a separate bathroom with a dry toilet and sink. <strong>There’s no shower.</strong> Bring a small backpack with layers, long trousers, sturdy shoes and a refillable water bottle. If you have a suitcase, arrange storage with Natura Vive before pickup.</p>
              <p>There are three capsules. Ask whether your quote includes private use of a pod or whether a supplement applies, especially if you’re traveling alone. Read the <Link href={placePath}>Skylodge place story</Link> for more about how the capsules came to be.</p>
            </section>

            <section id="booking">
              <h2>How do you book Skylodge Adventure Suites?</h2>
              <p>Start with <a href={booking}>Natura Vive’s booking page</a> and select the <strong>Skylodge overnight</strong> experience. Confirm your party’s total cost, the ascent and descent, pickup location and weather cancellation terms before paying. The operator says overnight guests must be <strong>over 15</strong>. Ask it directly about age, fitness and equipment fit if any of those could affect your booking.</p>
              <p>If you’re unsure about the heights, describe your concerns to the operator before choosing the hiking package. The trail and the capsule still put you high above the valley.</p>
            </section>

            <section className={styles.sources}>
              <h2>Sources & booking information</h2>
              <ul className="sources-list">
                <li><a href={operator}>Natura Vive — Overnight packages, itineraries and capsule details</a></li>
                <li><a href={booking}>Natura Vive — Official booking page</a></li>
                <li><a href={costExplainer}>Natura Vive — Route descriptions and USD budget range</a></li>
              </ul>
            </section>
          </article>
        </div>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structured).replace(/</g, '\\u003c') }} />
      </main>
      <Footer />
    </>
  );
}
