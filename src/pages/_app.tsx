import { type AppProps } from 'next/app';
import { type Session } from 'next-auth';
import { SessionProvider } from 'next-auth/react';
import { ThemeProvider } from 'next-themes';

import { trpc } from '~/utils/trpc';
import '~/styles/globals.css';
import Layout from '~/components/layout';

const MyApp = ({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps<{ session: Session | null }>) => {
  return (
    <ThemeProvider attribute='class'>
      <SessionProvider session={session}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </SessionProvider>
    </ThemeProvider>
  );
};

export default trpc.withTRPC(MyApp);
