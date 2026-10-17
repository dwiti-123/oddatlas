import Image from 'next/image';
import Link from 'next/link';
import styles from './adventure-footer.module.css';
import { FooterWall } from './footer-wall';
import { places } from '@/lib/places';
import { contactHref,requestPlaceHref } from '@/lib/contact';

export function AdventureFooter({onWall=false}:{onWall?:boolean}){
 return <div className={styles.footer} id={onWall?undefined:'leave-a-trace'}>
  <div className={styles.invitation}><div><p>{onWall?'A few places. A thousand possible stories.':'Leave a little trace.'}</p>{!onWall&&<span>A note, a ticket, a stamp. Something of you, somewhere in the world.</span>}</div><Link href={onWall?'/#places':'/adventure-wall'}>{onWall?'Find your next place':'Open the full wall'} <span aria-hidden="true">↗</span></Link></div>
  {!onWall&&<FooterWall places={places.map(({slug,name,country})=>({slug,name,country}))}/>}
  <div className={styles.landscape}><Image src="/images/adventure-wall/landscape.webp" width={1800} height={600} sizes="100vw" alt="Illustrated island ruins, desert houses, fort arches and mountains"/></div>
  <section className={styles.contact} aria-labelledby="contact-heading"><div><p className="eyebrow">A note to the atlas</p><h2 id="contact-heading"><a href={contactHref}>Contact us <span aria-hidden="true">↗</span></a></h2></div><div><h3>Know somewhere unusual?</h3><p>Suggest a place for the collection. If we publish your suggestion, we’ll credit you—with your permission.</p><a className={`request-place-button ${styles.requestButton}`} href={requestPlaceHref}>Request a place <span aria-hidden="true">↗</span></a></div></section>
  <footer className={styles.base}><Link href="/" className={styles.brand}>odd atlas.</Link><span>Places for a more curious world.</span><nav aria-label="Footer navigation"><Link href="/adventure-wall">The traveller’s wall</Link><Link href="/saved">Your lists</Link><Link href="/sources">Sources</Link></nav></footer>
 </div>;
}
