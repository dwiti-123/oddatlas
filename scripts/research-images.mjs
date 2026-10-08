import {writeFile, mkdir} from 'node:fs/promises';
const queries=['Hashima island','Dhanushkodi church','Kayakoy','Kuldhara','Isla de las Munecas','Paris catacombs','Port Arthur Tasmania','Stanley Hotel'];
await mkdir('docs/research',{recursive:true});
const results=[];
for(const query of queries){
 const url=new URL('https://commons.wikimedia.org/w/api.php');
 for(const [k,v] of Object.entries({action:'query',format:'json',generator:'search',gsrsearch:query,gsrnamespace:'6',gsrlimit:'5',prop:'imageinfo',iiprop:'url|extmetadata',iiurlwidth:'1440'}))url.searchParams.set(k,v);
 await new Promise(r=>setTimeout(r,1500));
 const response=await fetch(url,{headers:{'User-Agent':'OddAtlas/0.1 (curated travel publication; image attribution research)'},signal:AbortSignal.timeout(30000)});
 if(!response.ok)throw new Error(`${query}: ${response.status}`);
 const json=await response.json();
 const pages=Object.values(json.query?.pages||{}).map(p=>({title:p.title,...p.imageinfo?.[0]}));
 results.push({query,pages});
 await writeFile('docs/research/image-candidates.json',JSON.stringify(results,null,2));
 console.log(JSON.stringify({query,pages:pages.map(p=>({title:p.title,url:p.url,artist:p.extmetadata?.Artist?.value,license:p.extmetadata?.LicenseShortName?.value}))}));
}
await writeFile('docs/research/image-candidates.json',JSON.stringify(results,null,2));
