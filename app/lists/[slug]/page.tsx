import {notFound} from 'next/navigation';
import {curatedGuides,CuratedTravelGuide} from '@/components/curated-travel-guide';
import {createSeoMetadata} from '@/lib/seo';
export function generateStaticParams(){return curatedGuides.filter(g=>g.path.startsWith('/lists/')).map(g=>({slug:g.path.split('/').pop()}));}
type Props={params:Promise<{slug:string}>};
export async function generateMetadata({params}:Props){const {slug}=await params;const guide=curatedGuides.find(g=>g.path===`/lists/${slug}`);if(!guide)notFound();return createSeoMetadata({title:guide.title,description:guide.description,path:guide.path});}
export default async function Page({params}:Props){const {slug}=await params;const guide=curatedGuides.find(g=>g.path===`/lists/${slug}`);if(!guide)notFound();return <CuratedTravelGuide guide={guide}/>;}
