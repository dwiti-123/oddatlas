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
console.log('Collection audit passed: 15 places, five per category, every image decodes and has provenance.');
if(process.argv[2]){
 const base=process.argv[2];
 for(const p of places){
  const response=await fetch(`${base}/places/${p.slug}`);
  const html=await response.text();
  if(response.status!==200||!html.includes(`/images/${p.slug}.webp`)||!html.includes('application/ld+json')||!html.includes(p.sources[0].url))throw new Error(`Story route failed: ${p.slug} (${response.status})`);
  const image=await fetch(`${base}/images/${p.slug}.webp`);
  if(image.status!==200||!image.headers.get('content-type')?.includes('image/webp'))throw new Error(`Image route failed: ${p.slug}`);
 }
 for(const route of ['/','/sources','/sitemap.xml','/robots.txt','/places/bodie']){
  const response=await fetch(base+route);if(response.status!==200)throw new Error(`Route failed: ${route}`);
 }
 const missing=await fetch(`${base}/places/no-such-place`);if(missing.status!==404)throw new Error('Missing place must return 404');
 console.log('HTTP audit passed: every story and image, homepage, sources, sitemap, robots, preserved Bodie URL, and missing-place 404.');
}
