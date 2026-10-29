// Diagnostic requests are self-labelled, not proof of access from crawler networks.
// Usage: node scripts/audit-crawler-access.mjs http://127.0.0.1:5198 report.json
import fs from 'node:fs';
import path from 'node:path';

const generated = process.argv[2] === '--generated';
const base = generated ? null : new URL(process.argv[2] ?? 'http://127.0.0.1:5198');
if (base && !['http:', 'https:'].includes(base.protocol)) throw new Error('Expected an HTTP(S) origin');
const origin = 'https://www.oddatlas.world';
const failures = [];
const rows = [];
async function read(path, agent = 'OddAtlas-AccessAudit/1.0') {
 if (generated) {
  const root = '.next/server/app';
  const stem = path === '/' ? 'index' : path.slice(1);
  const bodyFile = `${root}/${stem}.${/\.(txt|xml)$/.test(stem) ? 'body' : 'html'}`;
  const metaFile = `${root}/${stem}.meta`;
  const meta = fs.existsSync(metaFile) ? JSON.parse(fs.readFileSync(metaFile,'utf8')) : {};
  if(meta.status && meta.status!==200)failures.push(`${path}: generated response status ${meta.status}`);
  if(/noindex/i.test(meta.headers?.['x-robots-tag']??''))failures.push(`${path}: generated X-Robots-Tag noindex`);
  return {response:{status:meta.status??null,headers:new Headers(meta.headers??{})},text:fs.readFileSync(bodyFile,'utf8')};
 }
 const response = await fetch(new URL(path, base), {
  headers: {'User-Agent':agent}, signal:AbortSignal.timeout(20000),
 });
 const text = await response.text();
 if(response.status !== 200) failures.push(`${agent} ${path}: HTTP ${response.status}`);
 if(/noindex/i.test(response.headers.get('x-robots-tag') ?? '')) failures.push(`${path}: X-Robots-Tag noindex`);
 return {response,text};
}
const agents=['OAI-SearchBot','ChatGPT-User','PerplexityBot','Perplexity-User','Claude-SearchBot','Claude-User'];
const {text:robots}=await read('/robots.txt');
for(const agent of ['*',...agents]) {
 const group = new RegExp(`User-Agent: ${agent.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')}\\r?\\n(?:User-Agent: [^\\n]+\\r?\\n)*Allow: /`,'i');
 if(!group.test(robots)) failures.push(`No explicit allow group for ${agent}`);
}
if(!robots.includes(`${origin}/sitemap.xml`)) failures.push('Canonical sitemap missing from robots.txt');
const {response:llmsResponse,text:llms}=await read('/llms.txt');
if(!llmsResponse.headers.get('content-type')?.includes('text/plain')) failures.push('llms.txt is not plain text');
if(!llms.startsWith('# Odd Atlas\n')) failures.push('llms.txt title missing');
const paths=[...new Set([...llms.matchAll(/\]\((https:\/\/www\.oddatlas\.world[^)]+)\)/g)].map(match=>new URL(match[1]).pathname))];
if(paths.length<25)failures.push('llms.txt contains too few public targets');
for(const pagePath of paths){
 if(generated&&!path.resolve('.next/server/app',pagePath.slice(1)).startsWith(path.resolve('.next/server/app')+path.sep)&&pagePath!=='/')throw new Error('Invalid generated page path');
 const {response}=await read(pagePath);rows.push({path:pagePath,...(generated?{generatedFilePresent:true}:{status:response.status})});
}
const pages=['/','/places/hashima','/blog/how-to-visit-hashima-island'];
const fetchChecks=[];
for(const agent of generated?['Generated HTML (no network request)']:agents)for(const path of pages){
 const {response,text:html}=await read(path,agent);
 const body=html.replace(/<script\b[^>]*>[\s\S]*?<\/script>|<style\b[^>]*>[\s\S]*?<\/style>/gi,' ').replace(/<[^>]+>/g,' ').replace(/\s+/g,' ').trim();
 if(body.length<1000) failures.push(`${agent} ${path}: body is unexpectedly short`);
 if(/<meta\b[^>]*name="robots"[^>]*content="[^"]*noindex/i.test(html)) failures.push(`${path}: meta noindex`);
 if(!html.includes('<h1')) failures.push(`${path}: missing heading`);
 if(path==='/places/hashima'&&!html.includes('story-chapter'))failures.push(`${path}: full-story content missing from initial HTML`);
 if(path.includes('/blog/')&&!body.includes('Gunkanjima Cruise'))failures.push(`${path}: operator comparison missing from initial HTML`);
  fetchChecks.push({agent,path,...(generated?{generatedFilePresent:true}:{status:response.status}),htmlTextLength:body.length});
}
const report={checkedAt:new Date().toISOString(),base:base?.origin??'.next/server/app',networkChecked:!generated,scope:generated?'Generated production files only. No HTTP, actual crawler requests, WAF logs, indexing or AI retrieval tested.':'Direct diagnostic requests only. User-agent spoofing is not verified crawler traffic; actual WAF logs, indexing and AI retrieval remain separate checks.',linkedPages:rows,fetchChecks,failures};
if(process.argv[3]) fs.writeFileSync(process.argv[3],JSON.stringify(report,null,2)+'\n');
console.log(`${rows.length} llms.txt targets and ${fetchChecks.length} ${generated?'generated pages':'self-labelled page fetches'} checked; ${failures.length} failures`);
for(const failure of failures)console.error(failure);
process.exitCode=failures.length?1:0;
