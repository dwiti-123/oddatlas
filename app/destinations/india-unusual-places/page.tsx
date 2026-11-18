import {curatedGuide,CuratedTravelGuide} from '@/components/curated-travel-guide';
import {createSeoMetadata} from '@/lib/seo';
const guide=curatedGuide('/destinations/india-unusual-places');
export const metadata=createSeoMetadata({title:guide.title,description:guide.description,path:guide.path});
export default function Page(){return <CuratedTravelGuide guide={guide}/>;}
