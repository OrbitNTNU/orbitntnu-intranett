import { Member } from '@/interfaces/Member';
import { Team } from '@/interfaces/Team';
import { TeamHistory } from '@/interfaces/TeamHistory';
import { Meme } from '@prisma/client';
import React, { useState } from 'react';

interface SearchResultsProps {
  members: Member[];
  teamHistories: TeamHistory[];
  teams: Team[]
}

// Helper function to get team name by tid
const getTeamName = (teamID: number, teams: Team[]) => {
  const matchedTeam = teams.find((team) => team.teamID === teamID);
  return matchedTeam ? matchedTeam.teamName : 'N/A';
};

const getOrbitMail = (firstName: string, lastName: string) => {
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

const getCurrentTeam = (teamHistories: TeamHistory[], member: Member, teams: Team[]) => {
  const currentTeam = teamHistories.find(
    (team) =>
    team.memberID === member.memberID &&
      (team.endYear === undefined || team.endYear === null)
  );
  
  return currentTeam ? getTeamName(currentTeam?.teamID, teams) : "N/A";
};

const SearchResults = ({ members, teamHistories, teams }: SearchResultsProps) => {
  return (
    <div>
      <div className="search-results">
        {members.map((member) => (
          <div
            key={member.memberID}
            className="search-result-box"
            // onClick={() => handleBoxClick(member)}
          >
            <h2>{member.firstName} {member.lastName}</h2>
            <p>{getOrbitMail(member.firstName, member.lastName)}</p>
            <p>{getCurrentTeam(teamHistories, member, teams)}</p>

            <p>Active Status: {member.activeStatus ? 'Active' : 'Inactive'}</p>
          </div>
        ))}
      </div>
    </div>
  );
};


export default SearchResults;
