import Head from "next/head";

export default function Login() {
  return (
    <>
      <Head>
        <title>Orbit NTNU Intranett</title>
        <meta name="description" content="Intranett for Orbit NTNU" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex h-screen items-center justify-center">
        Welcome to the protected part of Orbit Intranett!
      </main>
    </>
  );
}
