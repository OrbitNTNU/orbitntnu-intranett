import { SessionProvider, getSession } from 'next-auth/react';
import type { AppType } from 'next/app';
import { useRouter } from 'next/router';
import { api } from '@/utils/api';
import { type Session } from 'next-auth';
import '@/styles/globals.css';
import { useState, useEffect } from 'react';

const MyApp: AppType<{ session: Session | null }> = ({ Component, pageProps: { session, ...pageProps } }) => {
  const router = useRouter();
  const [isSessionLoaded, setIsSessionLoaded] = useState<boolean>(false);

  useEffect(() => {
    const fetchSession = async () => {
      const mySession = await getSession();
      setIsSessionLoaded(true);
      if (!mySession && router.pathname !== '/login') {
        void router.push("/login");
      }
    };

    void fetchSession();
  }, [router]);

  // If session is loaded and user is authenticated, redirect to index
  if (isSessionLoaded && session?.user) {
    void router.push("/");
    return null; // Optional: You can render a loading screen here if needed
  }

  return (
    <SessionProvider session={session}>
      <Component {...pageProps} />
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
