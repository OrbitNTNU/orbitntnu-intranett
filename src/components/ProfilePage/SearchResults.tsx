import type { Member, Team, TeamHistory } from '@prisma/client';
import { useSession } from 'next-auth/react';
import { useRouter, type NextRouter } from 'next/router';

interface SearchResultsProps {
  members: Member[];
  teamHistories: TeamHistory[];
  teams: Team[]
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

  if(currentTeam && currentTeam.teamID == 1) {
    return currentTeam.cPosition ? capitalizeFirstLetter(currentTeam.cPosition.toLowerCase()) : "N/A";
  }

  return currentTeam?.priviledges ? capitalizeFirstLetter(currentTeam.priviledges.toLowerCase()) : "N/A";
};

const SearchResults = ({ members, teamHistories, teams }: SearchResultsProps) => {
  const router = useRouter();
  const session = useSession();

  const handleBoxClick = (member: Member, router: NextRouter) => {
    void router.push(session.data?.user.email === member.orbitMail ? "profile/me" : `/profile/${member.memberID}`)
  };

  return (
    <div className="flex items-center justify-center">
      <div className="flex flex-wrap justify-center">
        {members.map((member) => (
          <div
            key={member.memberID}
            className="rounded-lg w-[270px] mb-6 bg-blue-600 hover:bg-blue-800 p-10 mx-3 cursor-pointer"
            onClick={() => handleBoxClick(member, router)}
          >
            <h3 className='font-bold'>{member.firstName} {member.lastName}</h3>
            <p className='text-subtext'>{member.orbitMail}</p>
            <p className='text-subtext'>{getCurrentTeam(teamHistories, member, teams) + ", " + getRole(member, teamHistories)}</p>
            <p className='text-subtext'>Active Status: {member.activeStatus ? 'Active' : 'Inactive'}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchResults;
