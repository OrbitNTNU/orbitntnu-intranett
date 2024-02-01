import Link from 'next/link';
import logoWhite from "../../../public/images/orbitwhite.png";
import Image from "next/image";
import Dropdown from './Dropdown'; // Adjust the import path based on your project structure
import mockShortcuts from '@/mockdata/MockShortcuts';
import { signIn, signOut, useSession } from "next-auth/react";

const Navbar = () => {
  const session = useSession();

  const handleLogin = () => {
    void signIn("google");
  };

  const handleLogout = () => {
    void signOut();
  };

  return (
    <nav className="font-semibold p-4 flex justify-between items-center">
      <div className="flex items-center">
        <div className="mr-10 relative h-[2.5vh] w-[12vh]">
          <Link href="/">
            <Image
              src={logoWhite.src}
              alt="Website logo"
              layout="fill"
              objectFit="contain"
            />
          </Link>
        </div>
        <Link href="/searchpage" className="mr-10">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
          </svg>
        </Link>
      </div>
      <div className='flex'>
        {session.data ? (
          <Link href="/profile/me">
            <p>{session.data.user.name}</p>
          </Link>
        ) : (
          <button onClick={handleLogin}>
            <svg
              xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-6 h-6">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" strokeLinecap="round" strokeLinejoin="round" />
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
          </button>
        )}
        <Dropdown 
          shortcuts={mockShortcuts} 
          handleLogout={handleLogout} 
          handleLogin={handleLogin}
        />
      </div>
    </nav>
  )
}

export default Navbar;