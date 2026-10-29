import type { MetadataRoute } from 'next';
import { siteUrl } from '@/lib/discovery';

export default function robots(): MetadataRoute.Robots {
 return {
  rules: [
   {userAgent:'*',allow:'/'},
   // Explicit search/retrieval permissions; preserve the existing wildcard policy.
   // User-agent names are not authentication and must not bypass the firewall.
   {userAgent:['OAI-SearchBot','ChatGPT-User','PerplexityBot','Perplexity-User','Claude-SearchBot','Claude-User','Googlebot','bingbot'],allow:'/'},
  ],
  sitemap:`${siteUrl}/sitemap.xml`,
 };
}
