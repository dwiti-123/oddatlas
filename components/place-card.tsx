import { VisitStayTag } from '@/components/visit-stay-tag';
import Link from 'next/link';
import { places } from '@/lib/places';
import { placeImage } from '@/lib/discovery';
import { SavePlace } from './saved-places';
export function PlaceCard({place:p}: {place:typeof places[number]}) {
 return <article className="place-card"><Link href={`/places/${p.slug}`}><div className="card-photo"><img src={placeImage(p)} alt={p.alt} width="960" height="640" loading="lazy" decoding="async"/>{p.imageKind==='illustration'&&<span className="image-label">Illustration</span>}<VisitStayTag stay={p.stay}/></div><div className="card-meta"><span>{p.region}, {p.country}</span><span className="card-number">{String(places.indexOf(p)+1).padStart(2,'0')}</span></div><h3>{p.name}</h3><p>{p.hook}</p></Link><div className="card-category">{p.categoryName}</div><SavePlace slug={p.slug} name={p.name}/></article>;
}
