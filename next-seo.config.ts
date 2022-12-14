import type { DefaultSeoProps } from 'next-seo';

const title = 'Slug | URL shortener';
export const description =
  'slug is an open source link managment platform to short your links made for devs.';
export const domain = 'https://slug.codingcodax.dev';

const SEO: DefaultSeoProps = {
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
    images: [
      {
        url: `${domain}/_static/og.png`,
        alt: 'title',
        width: 1200,
        height: 675,
      },
    ],
  },
  twitter: {
    handle: '@codingcodax',
    site: '@codingcodax',
    cardType: 'summary_large_image',
  },
  additionalMetaTags: [
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
    {
      name: 'msapplication-config',
      content: '/_static/favicons/browserconfig.xml',
    },
  ],
  additionalLinkTags: [
    {
      rel: 'apple-touch-icon',
      sizes: '180x180',
      href: '/_static/favicons/apple-touch-icon.png',
    },
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '32x32',
      href: '/_static/favicons/favicon-32x32.png',
    },
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '16x16',
      href: '/_static/favicons/favicon-16x16.png',
    },
    {
      rel: 'icon',
      href: '/_static/favicons/favicon.ico',
    },
    {
      rel: 'manifest',
      href: '/_static/favicons/site.manifest',
    },
    {
      rel: 'mask-icon',
      href: '/_static/favicons/safari-pinned-tab.svg',
      color: '#0e0e11',
    },
  ],
};

export default SEO;
