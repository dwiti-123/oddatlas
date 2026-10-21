import type { MetadataRoute } from 'next';
import { blogPosts } from '@/lib/blog';
import { placeModifiedDates,pageModifiedDates } from '@/lib/content-dates';
import { directoryCategories, siteUrl, allPlaceRoutes, placeImage } from '@/lib/discovery';
export default function sitemap(): MetadataRoute.Sitemap {
 const base=siteUrl;
 return [
  {url:`${base}/`,lastModified:new Date(pageModifiedDates.home)},
  {url:`${base}/sources`,lastModified:new Date(pageModifiedDates.sources)},
  {url:`${base}/guides/haunted-places`,lastModified:new Date('2026-10-21')},
  {url:`${base}/blog`,lastModified:new Date(pageModifiedDates.blog)},
  ...blogPosts.map(post=>({url:`${base}/blog/${post.slug}`,lastModified:new Date(post.modified)})),
  {url:`${base}/explore/map-view`,lastModified:new Date('2026-10-15')},
  ...allPlaceRoutes().map(p=>({url:`${base}/places/${p.slug}`,...(placeModifiedDates[p.slug]?{lastModified:new Date(placeModifiedDates[p.slug])}:{}),images:[`${base}${placeImage(p)}`]})),
  ...directoryCategories.map(c=>({url:`${base}/category/${c.slug}`,lastModified:new Date('2026-10-14')})),
  ...['random-weird-place','geography-anomaly-quiz'].map(slug=>({url:`${base}/tools/${slug}`,lastModified:new Date('2026-10-14')})),
 ];
}
