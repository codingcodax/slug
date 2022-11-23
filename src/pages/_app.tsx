import { type AppProps } from 'next/app';

import { trpc } from '~/utils/trpc';

import '~/styles/globals.css';

const MyApp = ({ Component, pageProps }: AppProps) => {
  return <Component {...pageProps} />;
};

export default trpc.withTRPC(MyApp);
