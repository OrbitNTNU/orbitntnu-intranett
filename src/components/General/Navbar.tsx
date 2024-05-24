import Link from 'next/link';
import logoWhite from "../../../public/images/orbitwhite.png";
import Image from "next/image";
import Dropdown from './Dropdown'; // Adjust the import path based on your project structure
import mockShortcuts, { ShortcutType, type ShortcutsProps } from '@/mockdata/MockShortcuts';
import { signIn, signOut, useSession } from "next-auth/react";
import Icons from './Icons';
import NextBreadcrumb from './BreakCrumbs';
import { api } from '@/utils/api';
import { usePathname } from 'next/navigation';

export function findInternalShortcuts(shortcuts: ShortcutsProps[]) {
  for (const shortcutGroup of shortcuts) {
    if (shortcutGroup.type == ShortcutType.INTERNAL) return shortcutGroup.shortcuts;
  }
  return [];
}

const Navbar = () => {
  const pathname = usePathname();

  const memberNameQuery = api.members.getNameByID;
  const teamNameQuery = api.teams.getActiveTeamNameByID;

  const pathSegments = pathname?.split('/') || [];
  const lastSegment = pathSegments[pathSegments.length - 1];

  const isProfilePage = pathname?.includes('profile');
  const isTeamPage = pathname?.includes('team') && !pathname.includes('teams') && !pathname.includes('find');
  const isEditPage = pathname?.includes('edit');

  const memberID = isProfilePage ? Number(lastSegment) : null;
  const teamID = isTeamPage ? Number(lastSegment) : null;

  const memberQueryResult = memberNameQuery.useQuery(memberID, {
    enabled: !!memberID,
  });

  const teamQueryResult = teamNameQuery.useQuery(teamID, {
    enabled: !!teamID,
  });
  
  const memberName = isEditPage
    ? "Edit"
    : memberQueryResult.data?.name;

  const teamName = teamQueryResult.data?.teamName;

  const session = useSession();

  const handleLogin = () => {
    void signIn("google");
  };

  const handleLogout = () => {
    void signOut();
  };

  return (
    <>
      <nav className="font-semibold p-4 flex justify-between items-center relative z-50">
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
            <Link href="/search" className="mr-10">
              <Icons name="Search" />
            </Link>
            <Link href="/statistics" className="mr-10">
              <Icons name="Statistics" />
            </Link>
            <Link href="/teams" className="mr-10">
              <Icons name="Teams" />
            </Link>
          </div>
        </div>
        <div className='flex relative z-50'>
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
      <NextBreadcrumb
        homeElement={'Home'}
        separator={'/'}
        activeClasses='text-amber-500'
        listClasses='hover:underline mx-2 font-bold'
        teamName={teamName}
        memberName={memberName}
      />
    </>
  )
}

export default Navbar;