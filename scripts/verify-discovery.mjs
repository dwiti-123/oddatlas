// Verify the production server's initial HTML, without running browser JavaScript.
import assert from 'node:assert/strict';
const base=process.env.VERIFY_BASE_URL??'http://127.0.0.1:5173';
const xml=await (await fetch(`${base}/sitemap.xml`)).text();
const urls=[...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m=>m[1]);
assert.equal(new Set(urls).size,urls.length,'Sitemap URLs must be unique');
for(const path of ['/tools/random-weird-place','/tools/geography-anomaly-quiz','/category/ghost-towns','/category/haunted-places','/category/extraordinary-stays'])assert(urls.includes(`https://www.oddatlas.world${path}`),`Missing ${path}`);
const placeUrls=urls.filter(url=>url.includes('/places/'));
assert(placeUrls.length>=16,'15 curated entries plus the preserved Bodie URL');
for(const url of urls){
 const pathname=new URL(url).pathname;
 const response=await fetch(`${base}${pathname}`);assert.equal(response.status,200,pathname);
 const html=await response.text();
 const canonical=html.match(/<link[^>]*rel="canonical"[^>]*href="([^"]+)"/);
 assert(canonical,`${pathname}: canonical missing`);
 assert.equal(new URL(canonical[1]).href,new URL(url).href,`${pathname}: wrong canonical`);
 if(pathname.startsWith('/places/')){
  assert(/<h1(?:\s[^>]*)?>/.test(html),`${pathname}: missing H1`);
  assert(html.includes('application/ld+json'),`${pathname}: missing schema`);
  assert(html.includes('Interactive locator map'),`${pathname}: missing map`);
  assert(html.includes('known for?'),`${pathname}: question heading missing`);
  const body=html.match(/<article>([\s\S]*?)<\/article>/)?.[1];assert(body,`${pathname}: missing article`);
  const paragraphs=[...body.matchAll(/<p(?:\s[^>]*)?>([\s\S]*?)<\/p>/g)].map(m=>m[1].replace(/<[^>]+>/g,' ')).join(' ');
  assert(paragraphs.split(/\s+/).length>=300,`${pathname}: less than 300 words`);
  const image=html.match(/<img[^>]+src="([^"]+)"/);assert(image,`${pathname}: missing image`);
  assert.equal((await fetch(`${base}${image[1]}`)).status,200,`${pathname}: broken image`);
 }
}
for(const path of ['/places/not-a-real-place','/category/not-a-real-category','/places/bhangarh.'])assert.equal((await fetch(`${base}${path}`)).status,404,`${path}: expected 404`);
console.log(`Verified ${urls.length} sitemap routes, ${placeUrls.length} HTML articles, maps, images, canonicals and unknown-route 404s.`);
