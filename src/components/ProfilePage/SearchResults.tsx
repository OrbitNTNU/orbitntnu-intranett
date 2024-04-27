import type { Member, Team, TeamHistory } from '@prisma/client';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import MemberInfo from '../General/MemberInfo';
import type { MemberInfoData } from '@/interfaces/MemberInfo';

interface SearchResultsProps {
  memberInfos: MemberInfoData[];
}

// Helper function to get team name by tid
export const getTeamName = (teamID: number, teams: Team[]) => {
  const matchedTeam = teams.find((team) => team.teamID === teamID);
  return matchedTeam ? matchedTeam.teamName : 'N/A';
};

export const getCurrentTeam = (teamHistories: TeamHistory[], member: Member, teams: Team[]) => {
  const currentTeam = teamHistories.find(
    (team) =>
      team.memberID === member.memberID &&
      (team.endYear === undefined || team.endYear === null)
  );

  return currentTeam ? getTeamName(currentTeam?.teamID, teams) : "N/A";
};

export function capitalizeFirstLetter(input: string): string {
  return input.charAt(0).toUpperCase() + input.slice(1);
}

export const getRole = (member: Member, teamHistories: TeamHistory[]) => {
  const currentTeam = teamHistories.find(
    (team) =>
      team.memberID === member.memberID &&
      (team.endYear === undefined || team.endYear === null)
  );

  if (!currentTeam) {
    return "Unknown Team"
  }

  if (currentTeam && currentTeam.teamID == 1) {
    return currentTeam.cPosition;
  }

  return capitalizeFirstLetter(currentTeam.priviledges.toLowerCase())
};

const SearchResults = ({ memberInfos }: SearchResultsProps) => {
  const router = useRouter();
  const session = useSession();

  const handleBoxClick = (member: MemberInfoData) => {
    void router.push(session.data?.user.email === member.orbitMail ? "profile/me" : `/profile/${member.memberID}`)
  };

  // Sort members alphabetically by first name
  const sortedMembers = memberInfos.filter(member => member.activeStatus).sort((a, b) => a.name.localeCompare(b.name));

  return (
    <>
      <div className="flex items-center flex-col justify-center">
        <div className="flex flex-wrap justify-center">
          {sortedMembers.map((member) => (
            <MemberInfo key={member.memberID} memberInfo={member} onClick={() => handleBoxClick(member)}/>
          ))}
        </div>
      </div>
      <div className="flex items-center flex-col justify-center">
        {memberInfos.filter(member => !member.activeStatus).length > 0 && (
          <div>
            <h2 className='flex justify-center'>Inactive members:</h2>
            <div className="flex flex-wrap justify-center">
              {memberInfos.filter(member => !member.activeStatus).map((member) => (
                <MemberInfo key={member.memberID} memberInfo={member} onClick={() => handleBoxClick(member)}/>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
};


export default SearchResults;
