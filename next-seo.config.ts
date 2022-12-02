import type { DefaultSeoProps } from 'next-seo';

const title = 'slug | URL shortener';
const description =
  'slug is an open source link managment platform to short your links made for devs.';
const domain = 'https://slug.codingcodax.dev';

export const SEO: DefaultSeoProps = {
  title,
  description,
  canonical: domain,
  openGraph: {
    type: 'website',
    locale: 'en_IE',
    url: domain,
    title,
    description,
    siteName: 'title',
    images: [],
  },
  twitter: {
    handle: '@codingcodax',
    site: '@codingcodax',
    cardType: 'summary_large_image',
  },
};

export const additionalMetaTags = [];

export const additionalLinkTags = [];
