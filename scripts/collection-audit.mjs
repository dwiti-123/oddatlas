import {readFile,stat,writeFile} from 'node:fs/promises';
import sharp from 'sharp';
import ts from 'typescript';
// Load the plain data module without framework aliases, for content and asset checks.
const source=await readFile('lib/places.ts','utf8');
const transformed=ts.transpileModule(source.replace("import imageProvenance from './image-provenance.json';",`const imageProvenance=${await readFile('lib/image-provenance.json','utf8')};`),{compilerOptions:{module:ts.ModuleKind.ES2022}}).outputText;
const {places}=await import('data:text/javascript;base64,'+Buffer.from(transformed).toString('base64'));
if(places.length!==15)throw new Error('Expected 15 places');
if(new Set(places.map(p=>p.slug)).size!==15)throw new Error('Duplicate slug');
for(const category of ['ghost','mystery','stays'])if(places.filter(p=>p.category===category).length!==5)throw new Error(`Expected five ${category} places`);
const layers=[];
for(let i=0;i<places.length;i++){
 const p=places[i];
 if(!p.sources.length||!p.credit||!p.imageKind||!p.story||!p.access)throw new Error('Missing provenance/content: '+p.slug);
 if(!p.longStory||p.longStory.chapters.length<3)throw new Error('Missing full story: '+p.slug);
 const storyWords=[p.longStory.opening,...p.longStory.chapters.map(c=>c.text)].join(' ').split(/\s+/).length;
 if(storyWords<180)throw new Error('Story needs editorial development: '+p.slug);
 for(const chapter of p.longStory.chapters){
  if(!chapter.references.length||chapter.references.some(url=>!p.sources.some(s=>s.url===url)))throw new Error('Unresolved chapter citation: '+p.slug);
 }
 const file=`public/images/${p.slug}.webp`;
 const info=await sharp(file).metadata();
 if(!info.width||!info.height)throw new Error('Invalid image: '+p.slug);
 const size=(await stat(file)).size;
 console.log(`${p.slug}: ${p.imageKind}, ${Math.round(size/1024)} KB, ${info.width}×${info.height}`);
 const thumb=await sharp(file).resize(300,225,{fit:'cover'}).toBuffer();
 layers.push({input:thumb,left:(i%3)*300,top:Math.floor(i/3)*260});
 const label=Buffer.from(`<svg width="300" height="35"><rect width="300" height="35" fill="#f9f9f6"/><text x="10" y="23" font-size="14" fill="#1a2428">${p.slug} · ${p.imageKind}</text></svg>`);
 layers.push({input:label,left:(i%3)*300,top:Math.floor(i/3)*260+225});
}
await sharp({create:{width:900,height:1300,channels:3,background:'#f9f9f6'}}).composite(layers).webp().toFile('docs/research/collection-contact-sheet.webp');
await writeFile('docs/research/selected-place-sources.md',`# Selected collection: sources and images\n\nReviewed 8 October 2026.\n\n`+places.map(p=>`## ${p.name}\n\n${p.sources.map(s=>`- [${s.title}](${s.url})`).join('\n')}\n- Image: ${p.credit}; ${p.photoDate}; ${p.license}.${p.photoUrl?` [Original](${p.photoUrl}) · [Licence](${p.licenseUrl})`:''}\n- ${p.imageNote}\n`).join('\n'));
await writeFile('docs/research/story-research.md',`# Full-story research register\n\nReviewed 8 October 2026. Original paraphrased editorial text; no invented eyewitness narration. Operator descriptions identify accommodation concepts, not independent quality or safety assessments. Folklore and disputed interpretations are labelled.\n\n`+places.map(p=>`## ${p.name}\n\n${p.longStory.chapters.map(c=>`### ${c.title}${c.kind?` (${c.kind})`:''}\n\n${c.references.map(url=>{const s=p.sources.find(s=>s.url===url);return `- [${s.title}](${s.url})`;}).join('\n')}\n`).join('\n')}`).join('\n')+`\n## Animation references reviewed\n\n- [Paper Shaders](https://shaders.paper.design/) — shader effects catalogue.\n- [Paper roadmap](https://paper.design/roadmap) — Three.js islands listed as planned at review.\n- [Motion for Three.js](https://motion.dev/docs/three) — existing animation integration.\n\nSelected a custom SVG/CSS bookmark stamp and check stroke. No third-party animation code, shader, asset or dependency copied or installed.\n`);
console.log('Collection audit passed: 15 places, five per category, every image decodes and has provenance.');
if(process.argv[2]){
 const base=process.argv[2];
 for(const p of places){
  const response=await fetch(`${base}/places/${p.slug}`);
  const html=await response.text();
  if(response.status!==200||!html.includes(`/images/${p.slug}.webp`)||!html.includes('application/ld+json')||!html.includes(p.sources[0].url))throw new Error(`Story route failed: ${p.slug} (${response.status})`);
  for(const chapter of p.longStory.chapters){if(!html.includes(chapter.title.replace(/&/g,'&amp;')))throw new Error('Story missing from server HTML: '+p.slug);}
  if(!html.includes('Read the full story')||!html.includes('source-1'))throw new Error('Missing story disclosure/citations: '+p.slug);
  const image=await fetch(`${base}/images/${p.slug}.webp`);
  if(image.status!==200||!image.headers.get('content-type')?.includes('image/webp'))throw new Error(`Image route failed: ${p.slug}`);
 }
 for(const route of ['/','/sources','/sitemap.xml','/robots.txt','/places/bodie']){
  const response=await fetch(base+route);if(response.status!==200)throw new Error(`Route failed: ${route}`);
 }
 const missing=await fetch(`${base}/places/no-such-place`);if(missing.status!==404)throw new Error('Missing place must return 404');
 console.log('HTTP audit passed: every story and image, homepage, sources, sitemap, robots, preserved Bodie URL, and missing-place 404.');
}
