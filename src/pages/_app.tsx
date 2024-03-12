import { SessionProvider, getSession } from 'next-auth/react';
import type { AppType } from 'next/app';
import { useRouter } from 'next/router';
import { api } from '@/utils/api';
import { type Session } from 'next-auth';
import '@/styles/globals.css';
import { useState } from 'react';

const MyApp: AppType<{ session: Session | null }> = ({ Component, pageProps: { session, ...pageProps } }) => {
  const router = useRouter();
  const [isSessionLoaded, setIsSessionLoaded] = useState<boolean>(false);

  const fetchSession = async () => {
    const mysession = await getSession();
    setIsSessionLoaded(true);
    if (router.pathname !== '/login' && !mysession) {
      void router.push("/login")
    }
  };

  void fetchSession();

  // Render nothing until the session is loaded
  if (!isSessionLoaded) {
    return null;
  }

  return (
    <SessionProvider session={pageProps.session}>
      <Component {...pageProps} />
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);

