import { places } from '@/lib/places';
export default function sitemap(){const base='https://www.oddatlas.world';return [{url:base,lastModified:new Date('2026-10-08')},{url:`${base}/sources`,lastModified:new Date('2026-10-08')},...places.map(p=>({url:`${base}/places/${p.slug}`,lastModified:new Date('2026-10-08')}))]}
