import { mkdir, writeFile, access } from 'node:fs/promises';
import { createHash } from 'node:crypto';

const files = [
  ['kolmanskop', 'Kolmanskop sand.jpg', 0],
  ['bodie', 'Ghost Town - NARA - 543342.jpg', 1280],
  ['bhangarh', 'A view of the gallery of the haunted fort of Bhangarh.jpg', 1280],
  ['mirrorcube', 'The Mirrorcube, Treehotel in Harads, Sweden 1 - Jan 3, 2019.jpg', 1280],
];
await mkdir('public/images', { recursive: true });
for (const [slug, name, width] of files) {
  try { await access(`public/images/${slug}.jpg`); continue; } catch {}
  const filename = name.replaceAll(' ', '_');
  const hash = createHash('md5').update(filename).digest('hex');
  const base = `${hash[0]}/${hash.slice(0,2)}/${encodeURIComponent(filename)}`;
  const url = `https://upload.wikimedia.org/wikipedia/commons/${base}`;
  const response = await fetch(url, { headers: { 'User-Agent': 'OddAtlas/0.1 (image attribution recorded in docs/sources.md)' }, signal: AbortSignal.timeout(30000) });
  if (!response.ok) throw new Error(`${slug}: HTTP ${response.status}`);
  await writeFile(`public/images/${slug}.jpg`, new Uint8Array(await response.arrayBuffer()));
  console.log(`Saved ${slug}`);
}
