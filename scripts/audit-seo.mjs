// Run after next build. Checks generated HTML, not Google's index or live headers.
import fs from 'node:fs';
import path from 'node:path';

const root='.next/server/app';
const origin='https://www.oddatlas.world';
const decode=s=>s.replace(/&amp;/g,'&').replace(/&#x27;|&#39;/g,"'").replace(/&quot;/g,'"').replace(/&lt;/g,'<').replace(/&gt;/g,'>');
const plain=s=>decode(s.replace(/<[^>]+>/g,'')).trim();
const sitemap=fs.readFileSync(path.join(root,'sitemap.xml.body'),'utf8');
const urls=[...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map(m=>decode(m[1]));
const failures=[];
const rows=[];
const titles=new Set();
const descriptions=new Set();
const exists=route=>route==='/saved'||fs.existsSync(path.join(root,route==='/'?'index.html':`${route.slice(1)}.html`))||fs.existsSync(path.join('public',route.slice(1)));
for(const url of urls){
 if(!url.startsWith(origin+'/')){failures.push(`Wrong sitemap origin: ${url}`);continue;}
 const route=new URL(url).pathname;
 const filename=path.join(root,route==='/'?'index.html':`${route.slice(1)}.html`);
 if(!fs.existsSync(filename)){failures.push(`Missing generated page: ${route}`);continue;}
 const html=fs.readFileSync(filename,'utf8');
 const title=plain(html.match(/<title>(.*?)<\/title>/s)?.[1]??'');
 const description=decode(html.match(/<meta name="description" content="([^"]*)"/)?.[1]??'');
 const canonical=decode(html.match(/<link rel="canonical" href="([^"]*)"/)?.[1]??'');
 const headings=[...html.matchAll(/<h1\b[^>]*>(.*?)<\/h1>/gs)].map(m=>plain(m[1]));
 const schema=[...html.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/gs)].map(m=>JSON.parse(m[1]));
 if(!title||titles.has(title))failures.push(`Missing/duplicate title: ${route}`);
 if(!description||descriptions.has(description))failures.push(`Missing/duplicate description: ${route}`);
 if(!canonical||new URL(canonical).href!==new URL(url).href)failures.push(`Canonical mismatch: ${route}: ${canonical}`);
 if(headings.length!==1)failures.push(`Expected one primary heading: ${route}`);
 if(/<meta name="robots" content="[^"]*noindex/.test(html))failures.push(`Sitemap contains noindex: ${route}`);
 titles.add(title);descriptions.add(description);
 for(const match of html.matchAll(/<a\b[^>]*href="([^"]*)"/g)){
  const href=decode(match[1]);
  if(!href.startsWith('/')||href.startsWith('//'))continue;
  const target=new URL(href,origin);
  if(!exists(target.pathname))failures.push(`Broken internal route: ${route} -> ${href}`);
 }
 if(route.startsWith('/places/')){
  const article=schema.find(s=>s['@type']==='Article');
  const crumbs=schema.find(s=>s['@type']==='BreadcrumbList');
  const entry=sitemap.split('<url>').find(block=>block.includes(`<loc>${url}</loc>`));
  const lastmod=entry?.match(/<lastmod>(.*?)<\/lastmod>/)?.[1]?.slice(0,10);
  if(!article||article.headline!==headings[0]||title!==`${headings[0]} | Odd Atlas`)failures.push(`Place heading/schema/title mismatch: ${route}`);
  if(!article?.dateModified||article.dateModified!==lastmod)failures.push(`Modification date mismatch: ${route}`);
  if(!crumbs||crumbs.itemListElement.length!==3||crumbs.itemListElement.at(-1).item!==url)failures.push(`Breadcrumb mismatch: ${route}`);
 }
 rows.push({url,title,description,h1:headings[0],schema:schema.map(s=>s['@type']),indexing:'Not verified in Search Console'});
}
if(new Set(urls).size!==urls.length)failures.push('Duplicate sitemap URLs');
const report={scope:'Local production HTML only; not live deployment, Google indexing, CWV or rankings',pages:rows.length,failures:[...new Set(failures)],rows};
fs.writeFileSync(process.argv[2]??'docs/research/seo-audit-2026-10-19.json',JSON.stringify(report,null,2)+'\n');
console.log(`${report.pages} sitemap pages checked; ${report.failures.length} failures`);
for(const failure of report.failures)console.error(failure);
process.exitCode=report.failures.length?1:0;
