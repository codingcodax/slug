import { type AppProps } from 'next/app';
import { type Session } from 'next-auth';
import { SessionProvider } from 'next-auth/react';
import { ThemeProvider } from 'next-themes';
import { Inter } from '@next/font/google';

import { trpc } from '~/utils/trpc';
import '~/styles/globals.css';
import Layout from '~/components/layout';

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
          className={`${inter.variable} grid min-h-screen grid-rows-[auto_1fr_auto] font-sans`}
        >
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </div>
      </SessionProvider>
    </ThemeProvider>
  );
};

export default trpc.withTRPC(MyApp);
