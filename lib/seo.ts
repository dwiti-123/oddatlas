import type { Metadata } from 'next';
import { siteUrl } from './discovery';

type SeoOptions = {
  title: string;
  description: string;
  path: string;
  image?: string;
  type?: 'website' | 'article';
};

export function createSeoMetadata({
  title,
  description,
  path,
  image = '/images/adventure-wall/landscape.webp',
  type = 'website',
}: SeoOptions): Metadata {
  const url = `${siteUrl}${path}`;
  const imageUrl = image.startsWith('http') ? image : `${siteUrl}${image}`;

  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title,
      description,
      url,
      type,
      images: [{ url: imageUrl }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [imageUrl],
    },
  };
}
