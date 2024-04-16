import Link from 'next/link';
import logoWhite from "../../../public/images/orbitwhite.png";
import Image from "next/image";
import Dropdown from './Dropdown'; // Adjust the import path based on your project structure
import mockShortcuts, { ShortcutType, type ShortcutsProps } from '@/mockdata/MockShortcuts';
import { signIn, signOut, useSession } from "next-auth/react";
import Icons from './Icons';

export function findInternalShortcuts(shortcuts: ShortcutsProps[]) {
  for (const shortcutGroup of shortcuts) {
    if (shortcutGroup.type == ShortcutType.INTERNAL) return shortcutGroup.shortcuts;
  }
  return [];
}

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
        <div className="mr-10 relative h-[3.5vh] w-[16vh]">
          <Link href="/">
            <Image
              src={logoWhite.src}
              alt="Website logo"
              layout="fill"
              objectFit="contain"
            />
          </Link>
        </div>
        <div className="hidden md:flex">
          <Link href="/searchpage" className="mr-10">
            <Icons name="Search" />
          </Link>
          <Link href="/statistics" className="mr-10">
            <Icons name="Statistics" />
          </Link>
          <Link href="/team/teamlist" className="mr-10">
            <Icons name="Teams" />
          </Link>
        </div>
      </div>
      <div className='flex'>
        {session.data ? (
          <Link href="/profile/me" className="hidden md:block">
            <p>{session.data.user.name}</p>
          </Link>
        ) : (
          <button onClick={handleLogin}>
            <Icons name="Profile" />
          </button>
        )}
        <Dropdown
          shortcuts={findInternalShortcuts(mockShortcuts)}
          handleLogout={handleLogout}
          handleLogin={handleLogin}
        />
      </div>
    </nav>
  )
}

export default Navbar;