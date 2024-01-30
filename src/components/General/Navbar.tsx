// import React, { useState } from "react";
// import Image from "next/image";
// import Link from "next/link";
// import { signIn, signOut, useSession } from "next-auth/react";

// const Header = () => {
//   const [showDropdown, setShowDropdown] = useState(false);
//   const session = useSession();

//   const handleLogin = () => {
//     void signIn("google");
//   };

//   const handleLogout = () => {
//     void signOut();
//   };

//   return (
//     <header className="flex h-16 w-screen items-center justify-between p-1">
//       <div className="min-w-52 flex justify-start px-4">
//         <Link href="/" className="relative h-[12vh] w-full p-4">
//           <Image
//             src={logoWhite.src}
//             alt="Website logo"
//             fill
//             style={{
//               objectFit: "contain",
//             }}
//           />
//         </Link>
//       </div>

//       <div id="navbar-right" className="flex items-center justify-center gap-6">
//         {session.data ? (
//           <section>
//             <p>{session.data?.user.name}</p>
//             <button onClick={handleLogout}>Log out</button>
//           </section>
//         ) : (
//           <button onClick={handleLogin}>Log in</button>
//         )}

//         <a target="_blank" href="https://orbitntnu.com/">
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             width="24"
//             height="24"
//             viewBox="0 0 24 24"
//             fill="none"
//             stroke="currentColor"
//             strokeWidth="2"
//             strokeLinecap="round"
//             strokeLinejoin="round"
//           >
//             <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
//             <circle cx="12" cy="7" r="4"></circle>
//           </svg>
//         </a>

//         <button
//           className={`${
//             showDropdown
//               ? "-gap-3 flex w-24 flex-col items-center transition-all duration-300"
//               : "flex w-24 "
//           } `}
//           onClick={() => setShowDropdown(!showDropdown)}
//         >
//           <p className={`${showDropdown ? "-mt-2" : ""}`}>Ham</p>
//           <p className={`${showDropdown ? "-mt-2" : ""}`}>bur</p>
//           <p className={`${showDropdown ? "-mt-2" : ""}`}>ger</p>
//         </button>

//         {showDropdown && (
//           <div className="absolute right-0 top-0 mr-1 mt-16 flex w-40 flex-col items-end justify-start rounded-sm bg-accentColorTwo p-3">
//             <a target="_blank" href="https://orbitntnu.com/">
//               Your profile
//             </a>
//             <a>Contact HR</a>
//             <a>Calendar</a>
//             <a>Search for orbiter</a>
//             <a>Announcements</a>
//             <a>Blog</a>
//             <a>Legacy page</a>
//             <Link href="/memegallery">Meme gallery</Link>
//           </div>
//         )}
//       </div>
//     </header>
//   );
// };

// export default Header;

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