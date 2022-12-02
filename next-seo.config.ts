import type { DefaultSeoProps } from 'next-seo';

const title = 'Slug | URL shortener';
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

export const additionalMetaTags = [
  {
    name: 'apple-mobile-web-app-tittle',
    content: title,
  },
  {
    name: 'application-name',
    content: title,
  },
  {
    name: 'msapplication-TileColor',
    content: '#0e0e11',
  },
  {
    name: 'theme-color',
    content: '#0e0e11',
  },
];

export const additionalLinkTags = [];
