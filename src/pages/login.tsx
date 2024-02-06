import { authOptions } from "@/server/auth";
import type {
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from "next";
import { getServerSession } from "next-auth";
import { getProviders, signIn } from "next-auth/react";
import Welcome from "@/views/WelcomeView";
import Footer from "@/components/General/Footer";
import { useMedia } from 'react-use';
import Button from "@/components/General/Button";

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getServerSession(context.req, context.res, authOptions);

  const providers = await getProviders();

  return {
    props: {
      session,
      providers: providers ?? [],
    },
  };
}

const LoginPage = ({
  providers,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {

  const handleSignIn = async (providerId: string) => {
    const result = await signIn(providerId, {
      callbackUrl: "/", // Redirect to the index page after signing in
    });

    if (result?.error) {
      // Handle error, e.g., display an error message
      console.error("Error signing in:", result.error);
    } else {
      // The signIn function will handle the redirection
    }
  };

  const isSmallScreen = useMedia('(max-width: 600px)');

  return (
    <div className="min-h-screen flex flex-col mt-10">
      <>
        <div className="min-h-screen flex flex-col mt-10">
          <main className="flex w-full flex-col items-center mb-10">
            <div className={`${isSmallScreen ? 'w-full p-4' : 'w-2/3'}`}>
              <Welcome />
            </div>
            {Object.values(providers).map((provider) => (
              <div key={provider.name}>
                <Button 
                  onClick={() => void handleSignIn(provider.id)}
                  label={`Log in with ${provider.name}`}
                />
              </div>
            ))}
          </main>

        </div>
        <Footer />
      </>
    </div>
  );
};

export default LoginPage;

