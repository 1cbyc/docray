import { SessionProvider } from 'next-auth/react';
import type { AppProps } from 'next/app';
import { trpc } from '../utils/trpc';
import '../styles/globals.css';

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <trpc.Provider>
      <SessionProvider session={session}>
        <Component {...pageProps} />
      </SessionProvider>
    </trpc.Provider>
  );
}

export default trpc.withTRPC(MyApp);
