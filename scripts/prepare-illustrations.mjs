import sharp from 'sharp';
for(const slug of ['skylodge','whichaway','deep-sleep','palacio-de-sal']){
 await sharp(`docs/research/illustration-originals/${slug}.png`).resize({width:1440,withoutEnlargement:true}).webp({quality:82}).toFile(`public/images/${slug}.webp`);
 console.log(`Prepared ${slug} illustration`);
}
