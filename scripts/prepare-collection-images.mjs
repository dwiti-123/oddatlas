import {readFile,writeFile,access,mkdir} from 'node:fs/promises';
import sharp from 'sharp';
const candidates=JSON.parse(await readFile('docs/research/image-candidates.json','utf8'));
const selected=[
 ['hashima','Hashima island','File:Hashima, Nagasaki, Japan, 20240814 1424 3412.jpg'],
 ['dhanushkodi','Dhanushkodi church','File:Dhanushkodi Ruined Church 2.jpg'],
 ['kayakoy','Kayakoy','File:Kayaköy Turkey.jpg'],
 ['kuldhara','Kuldhara','File:Kuldhara 2.jpg'],
 ['island-of-the-dolls','Isla de las Munecas','File:Xochimilco isla de las munecas cropped.jpg'],
 ['paris-catacombs','Paris catacombs','File:Catacumbas, París, Francia, 2022-11-01, DD 111-113 HDR.jpg'],
 ['port-arthur','Port Arthur Tasmania','File:Port Arthur Panorama.jpg'],
 ['stanley-hotel','Stanley Hotel','File:Stanley Hotel, nighttime.jpg'],
];
const plain=v=>v.replace(/<[^>]*>/g,'').replace(/&amp;/g,'&').trim();
const manifest={};
await mkdir('public/images',{recursive:true});
for(const [slug,query,title] of selected){
 const p=candidates.find(c=>c.query===query)?.pages.find(p=>p.title===title);
 if(!p)throw new Error(`Missing verified metadata for ${title}`);
 const m=p.extmetadata;
 const license=plain(m.LicenseShortName.value);
 if(!/^CC BY/.test(license))throw new Error(`Unsupported license: ${license}`);
 const source=`public/images/${slug}.jpg`;
 try {await access(source);}catch{
  let response;
  for(let attempt=0;attempt<4;attempt++){
   if(attempt)await new Promise(r=>setTimeout(r,15000));
   const imageUrl=new URL(attempt%2&&p.thumburl?p.thumburl:p.url); imageUrl.search='';
   response=await fetch(imageUrl,{headers:{'User-Agent':'OddAtlas/0.1 (licensed editorial image; attribution in docs/sources.md)'},signal:AbortSignal.timeout(60000)});
   if(response.ok||response.status!==429)break;
  }
  if(!response.ok)throw new Error(`${slug}: HTTP ${response.status}`);
  await writeFile(source,new Uint8Array(await response.arrayBuffer()));
  await new Promise(r=>setTimeout(r,3000));
 }
 let image=await sharp(source).resize({width:1440,withoutEnlargement:true}).webp({quality:80}).toBuffer();
 if(image.length>400*1024)image=await sharp(source).resize({width:1200,withoutEnlargement:true}).webp({quality:66}).toBuffer();
 if(image.length>400*1024)image=await sharp(source).resize({width:1024,withoutEnlargement:true}).webp({quality:62}).toBuffer();
 await writeFile(`public/images/${slug}.webp`,image);
 manifest[slug]={imageKind:'photo',credit:plain(m.Artist.value),license,licenseUrl:m.LicenseUrl.value,photoUrl:p.descriptionurl,photoDate:plain(m.DateTimeOriginal?.value||m.DateTime?.value||'Date not supplied'),imageNote:'Photograph resized, compressed, and cropped for display.'};
 console.log(`Prepared ${slug}`);
 await writeFile('lib/image-provenance.json',JSON.stringify(manifest,null,2)+'\n');
}
// Concept illustrations are unmistakably drawn, never presented as photographs.
for(const slug of ['skylodge','whichaway','deep-sleep','palacio-de-sal'])manifest[slug]={imageKind:'illustration',credit:'Odd Atlas · AI-generated editorial illustration',license:'Concept illustration',licenseUrl:'',photoUrl:'',photoDate:'8 October 2026',imageNote:'Concept illustration, not a photograph or an exact representation of the accommodation. See the operator’s website for actual images.'};
await writeFile('lib/image-provenance.json',JSON.stringify(manifest,null,2)+'\n');
