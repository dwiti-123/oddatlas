import type { MetadataRoute } from 'next';
import { places, searchDetails } from '@/lib/places';
export default function sitemap(): MetadataRoute.Sitemap {
 const base='https://www.oddatlas.world';
 return [
  {url:`${base}/`,lastModified:new Date('2026-10-13')},
  {url:`${base}/sources`,lastModified:new Date('2026-10-08')},
  {url:`${base}/guides/haunted-places`,lastModified:new Date('2026-10-13')},
  ...places.map(p=>({url:`${base}/places/${p.slug}`,lastModified:new Date(searchDetails[p.slug]?.reviewed??'2026-10-08')})),
 ];
}
