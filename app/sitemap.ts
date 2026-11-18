import {placeDrafts} from '@/lib/place-drafts';
import type { MetadataRoute } from 'next';
import { blogPosts } from '@/lib/blog';
import { placeModifiedDates,pageModifiedDates } from '@/lib/content-dates';
import { directoryCategories, siteUrl, allPlaceRoutes, placeImage } from '@/lib/discovery';
export default function sitemap(): MetadataRoute.Sitemap {
 const base=siteUrl;
 return [
  {url:`${base}/`,lastModified:new Date(pageModifiedDates.home)},
  {url:`${base}/tools/travel-budget-calculator`,lastModified:new Date('2026-10-27')},
  {url:`${base}/browse`,lastModified:new Date('2026-10-23')},
  {url:`${base}/sources`,lastModified:new Date(pageModifiedDates.sources)},
  {url:`${base}/guides/haunted-places`,lastModified:new Date('2026-10-21')},
  {url:`${base}/blog`,lastModified:new Date(pageModifiedDates.blog)},
  ...blogPosts.map(post=>({url:`${base}/blog/${post.slug}`,lastModified:new Date(post.modified)})),
  {url:`${base}/explore/map-view`,lastModified:new Date('2026-10-15')},
  ...['/lists/most-unusual-hotels-in-the-world','/lists/real-ghost-towns-you-can-visit','/destinations/india-unusual-places','/destinations/europe','/destinations/americas'].map(path=>({url:`${base}${path}`})),
  ...allPlaceRoutes().map(p=>({url:`${base}/places/${p.slug}`,...(placeModifiedDates[p.slug]?{lastModified:new Date(placeModifiedDates[p.slug])}:{}),images:[`${base}${placeImage(p)}`]})),
  ...placeDrafts.map(p=>({url:`${base}/places/${p.slug}`})),
  ...directoryCategories.map(c=>({url:`${base}/category/${c.slug}`,lastModified:new Date('2026-10-14')})),
  ...['random-weird-place','geography-anomaly-quiz'].map(slug=>({url:`${base}/tools/${slug}`,lastModified:new Date('2026-10-14')})),
 ];
}
