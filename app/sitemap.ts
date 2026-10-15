import type { MetadataRoute } from 'next';
import { directoryCategories, siteUrl, allPlaceRoutes, placeImage } from '@/lib/discovery';
export default function sitemap(): MetadataRoute.Sitemap {
 const base=siteUrl;
 return [
  {url:`${base}/`,lastModified:new Date('2026-10-13')},
  {url:`${base}/sources`,lastModified:new Date('2026-10-08')},
  {url:`${base}/guides/haunted-places`,lastModified:new Date('2026-10-13')},
  ...allPlaceRoutes().map(p=>({url:`${base}/places/${p.slug}`,lastModified:new Date('2026-10-14'),images:[`${base}${placeImage(p)}`]})),
  ...directoryCategories.map(c=>({url:`${base}/category/${c.slug}`,lastModified:new Date('2026-10-14')})),
  ...['random-weird-place','geography-anomaly-quiz'].map(slug=>({url:`${base}/tools/${slug}`,lastModified:new Date('2026-10-14')})),
 ];
}
