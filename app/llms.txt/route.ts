import { blogPosts } from '@/lib/blog';
import { allPlaceRoutes, directoryCategories, placeTitle, siteUrl } from '@/lib/discovery';

export const dynamic = 'force-static';

export function GET() {
 const link = (name:string,path:string,description:string) => `- [${name}](${siteUrl}${path}): ${description}`;
 const text = [
  '# Odd Atlas',
  '',
  '> An independent travel directory for discovering ghost towns, places with unusual histories and local legends, and extraordinary stays.',
  '',
  'Place pages contain short introductions, full stories, source links and visiting information. Visiting guides cover researched travel logistics. Documented history and local folklore are distinguished in the articles. Prices, access conditions and check dates belong to each page; operator sources provide current booking details. Odd Atlas is not a tour operator.',
  '',
  'Public stories and guides are rendered as HTML without requiring JavaScript. Full-story disclosures contain their text in the initial HTML. Maps, saved lists and the budget calculator also have interactive features. Saved-list contents are not public editorial information.',
  '',
  '## Start here',
  link('Odd Atlas','/','Discover the collection and featured places.'),
  link('Browse all places','/browse','A linked directory of place entries.'),
  link('Travel guides','/blog','Practical visiting articles with sources and review dates.'),
  link('Sources','/sources','Source information and photography credits.'),
  link('XML sitemap','/sitemap.xml','Canonical public URLs; robots.txt defines crawler permissions.'),
  '',
  '## Categories',
  ...directoryCategories.map(category=>link(category.title,`/category/${category.slug}`,category.description)),
  '',
  '## Visiting guides',
  ...blogPosts.map(post=>link(post.title,`/blog/${post.slug}`,post.description)),
  '',
  '## Place stories',
  ...allPlaceRoutes().map(place=>link(placeTitle(place),`/places/${place.slug}`,`${place.name}, ${place.country}. ${place.hook}`)),
  '',
  '## Optional',
  link('Haunted places guide','/guides/haunted-places','An introduction to places known for legends and their historical context.'),
  link('Map view','/explore/map-view','Interactive geographical discovery with links to place stories.'),
  link('Travel budget calculator','/tools/travel-budget-calculator','User-entered costs, group totals and equal cost splitting. No live destination prices or exchange-rate conversion.'),
  '',
 ].join('\n');
 return new Response(text,{headers:{'Content-Type':'text/plain; charset=utf-8','X-Content-Type-Options':'nosniff'}});
}
