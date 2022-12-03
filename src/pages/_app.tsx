import { type AppProps } from 'next/app';
import { type Session } from 'next-auth';
import { Inter } from '@next/font/google';
import { SessionProvider } from 'next-auth/react';
import { ThemeProvider } from 'next-themes';
import { DefaultSeo } from 'next-seo';

import '~/styles/globals.css';
import { trpc } from '~/utils/trpc';
import Layout from '~/components/layout';

import SEO from 'next-seo.config';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

const MyApp = ({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps<{ session: Session | null }>) => {
  return (
    <ThemeProvider attribute='class'>
      <SessionProvider session={session}>
        <div
          className={`${inter.variable} grid min-h-screen grid-rows-[auto_1fr_auto] px-4 font-sans`}
        >
          <Layout>
            <DefaultSeo {...SEO} />
            <Component {...pageProps} />
          </Layout>
        </div>
      </SessionProvider>
    </ThemeProvider>
  );
};

export default trpc.withTRPC(MyApp);
