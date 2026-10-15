import type { Metadata } from 'next';
import { Header,Footer } from '@/components/site-shell';
import { SavedCollection } from '@/components/saved-collection';
import { places } from '@/lib/places';
import { cleanListName } from '@/lib/shared-list';
export const metadata:Metadata={title:'Your list',robots:{index:false,follow:true}};
export default async function SavedPage({searchParams}:{searchParams:Promise<Record<string,string|string[]|undefined>>}) {
 const query=await searchParams;
 const raw=typeof query.places==='string'?query.places:undefined;
 const shared=raw===undefined?undefined:{
  name:cleanListName(typeof query.name==='string'?query.name:''),
  slugs:[...new Set(raw.slice(0,2000).split(','))].filter(slug=>places.some(p=>p.slug===slug)),
 };
 return <><Header/><main id="main" className="saved-page wrap"><p className="eyebrow">{shared?'A shared atlas':'A personal atlas'}</p><SavedCollection shared={shared}/></main><Footer/></>;
}
