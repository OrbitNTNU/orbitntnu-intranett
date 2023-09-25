import Button from "@/components/Button";
import Input from "@/components/Input";
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
        <form
          className="h-1/2 w-1/2 rounded-2xl bg-blue-100"
          onSubmit={() => console.log("Blæ")}
        >
          <div className="flex w-full flex-col p-14">
            <label htmlFor="username">Username</label>
            <Input labelId="username" className="mb-4 md:w-96" />
            <label htmlFor="password">Password</label>
            <Input labelId="password" type="password" className="md:w-96" />
            <Button className="mt-4 w-48">Login</Button>
          </div>
        </form>
      </main>
    </>
  );
}
