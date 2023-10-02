import { signIn, signOut, useSession } from "next-auth/react";
import Head from "next/head";
import Link from "next/link";

import { api } from "@/utils/api";

export default function Home() {
  const hello = api.example.hello.useQuery({ text: "from tRPC" });

  return (
    <Layout>
      <div>Velkomstord</div>
      <Events></Events>
      <Memes></Memes>
      <Posts></Posts>
      <NewMembers></NewMembers>
    </Layout>
  );
}

export default Home;
