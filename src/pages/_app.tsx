import { useEffect, useState } from 'react';
import { SessionProvider, getSession } from 'next-auth/react';
import type { AppType } from 'next/app';
import { useRouter } from 'next/router';
import { api } from '@/utils/api';
import { type Session } from 'next-auth';
import '@/styles/globals.css';

const MyApp: AppType<{ session: Session | null }> = ({ Component, pageProps }) => {
  const router = useRouter();
  const [isSessionLoaded, setIsSessionLoaded] = useState(false);

  useEffect(() => {
    const fetchSession = async () => {
      const mysession = await getSession();
      if (!mysession) {
        void router.push("/login");
      }
      setIsSessionLoaded(true);
    };

    void fetchSession();
  }, [router]);

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

