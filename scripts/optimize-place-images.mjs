import sharp from 'sharp';
import { stat } from 'node:fs/promises';
for (const slug of ['kolmanskop','bodie','bhangarh','mirrorcube']) {
 await sharp(`public/images/${slug}.jpg`).resize({width:1440,withoutEnlargement:true}).webp({quality:82}).toFile(`public/images/${slug}.webp`);
 console.log(`${slug}: ${Math.round((await stat(`public/images/${slug}.webp`)).size/1024)} KB`);
}
