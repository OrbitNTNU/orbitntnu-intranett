import type { Member, Team, TeamHistory } from '@prisma/client';
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

export const getOrbitMail = (firstName: string, lastName: string) => {
  // Convert first name and last name to lowercase
  const lowerFirstName = firstName.toLowerCase();
  const lowerLastName = lastName.toLowerCase();

  // Split the first name into parts using spaces
  const firstNameParts = lowerFirstName.split(' ');

  // Take the first part of the first name as the prefix
  const prefix = firstNameParts[0];

  // Combine the prefix, last name, and the domain to create the orbit mail
  const orbitMail = `${prefix}.${lowerLastName}@orbitntnu.com`;

  return orbitMail;
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

  return currentTeam && currentTeam.priviledges ? capitalizeFirstLetter(currentTeam.priviledges.toLowerCase()) : "N/A";
};

const handleBoxClick = (member: Member, router: NextRouter) => {
  void router.push(
    {
      pathname: `/profile/${member.memberID}`,
    }
  )
};

const SearchResults = ({ members, teamHistories, teams }: SearchResultsProps) => {
  const router = useRouter();

  return (
    <div className="flex items-center">
      <div className="flex flex-wrap justify-center">
        {members.map((member) => (
          <div
            key={member.memberID}
            className="bg-secondaryColorTwo rounded-lg w-[350px] sm:m-10 md:w-[350px] lg:w-[350px] xl:w-[350px] hover:bg-[#211932] p-10 mx-3 my-10 cursor-pointer"
            onClick={() => handleBoxClick(member, router)}
          >
            <h2>{member.firstName} {member.lastName}</h2>
            <p>{getOrbitMail(member.firstName, member.lastName)}</p>
            <p>{getCurrentTeam(teamHistories, member, teams) + ", " + getRole(member, teamHistories)}</p>
            <p>Active Status: {member.activeStatus ? 'Active' : 'Inactive'}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchResults;
