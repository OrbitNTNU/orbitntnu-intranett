import type { ReactNode } from 'react';
import Navbar from "@/components/General/Navbar";
import Footer from "@/components/General/Footer";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <Navbar />
      <div className="min-h-screen flex flex-col mt-10">
        <main className="flex w-full flex-col items-center mb-10">
          <div className="lg:w-3/4 md:w-4/5 w-full p-4 md:p-0">
            {children}
          </div>
        </main>
      </div>
      <Footer />
    </>
  );
};

export default Layout;
