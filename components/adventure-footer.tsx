import Image from 'next/image';
import Link from 'next/link';
import styles from './adventure-footer.module.css';
import { FooterWall } from './footer-wall';
import { places } from '@/lib/places';

export function AdventureFooter({onWall=false}:{onWall?:boolean}){
 return <div className={styles.footer} id={onWall?undefined:'leave-a-trace'}>
  <div className={styles.invitation}><div><p>{onWall?'A few places. A thousand possible stories.':'Leave a little trace.'}</p>{!onWall&&<span>A note, a ticket, a stamp. Something of you, somewhere in the world.</span>}</div><Link href={onWall?'/#places':'/adventure-wall'}>{onWall?'Find your next place':'Open the full wall'} <span aria-hidden="true">↗</span></Link></div>
  {!onWall&&<FooterWall places={places.map(({slug,name,country})=>({slug,name,country}))}/>}
  <div className={styles.landscape}><Image src="/images/adventure-wall/landscape.webp" width={1800} height={600} sizes="100vw" alt="Illustrated island ruins, desert houses, fort arches and mountains"/></div>
  <footer className={styles.base}><Link href="/" className={styles.brand}>odd atlas.</Link><span>Places for a more curious world.</span><nav aria-label="Footer navigation"><Link href="/adventure-wall">The traveller’s wall</Link><Link href="/saved">Your lists</Link><Link href="/sources">Sources</Link></nav></footer>
 </div>;
}
