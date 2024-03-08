import { useEffect } from 'react';
import { SessionProvider, getSession } from 'next-auth/react';
import type { AppType } from 'next/app';
import { api } from '@/utils/api';
import '@/styles/globals.css';
import { type Session } from "next-auth";
import { useRouter } from 'next/router';

const MyApp: AppType<{ session: Session | null }> = ({ Component, pageProps: { session, ...pageProps } }) => {
  
  // const router = useRouter();

  // useEffect(() => {
  //   const fetchSession = async () => {
  //     const mysession = await getSession();
  //     if(!mysession) {
  //       void router.push("/login")
  //     }
  //   };

  //   void fetchSession();
  // }, []);

  return (
    <SessionProvider session={session}>
      <Component {...pageProps} />
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
