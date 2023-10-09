import { Member } from '@/interfaces/Member';
import { Team } from '@/interfaces/Team';
import { TeamHistory } from '@/interfaces/TeamHistory';
import React from 'react';

interface SearchResultsProps {
  members: Member[];
  teamHistories: TeamHistory[];
  teams: Team[]
}

const SearchResults = ({ members, teamHistories, teams }: SearchResultsProps) => {
  return (
    <table style={{ width: '80%', fontSize: '1.2rem' }}>
      <thead>
        <tr>
          <th style={{ width: '30%' }}>Name</th>
          <th style={{ width: '20%' }}>Team</th>
          <th style={{ width: '20%' }}>Role</th>
          <th style={{ width: '30%' }}>Email</th>
        </tr>
      </thead>
      <tbody>
        {members.map((member) => {
          // Find the current team for the member
          const currentTeam = teamHistories.find(
            (team) =>
            team.mid === member.mid &&
              (team.endYear === undefined || team.endYear === null)
          );

          return (
            <tr key={member.mid}>
              <td>{member.firstName + ' ' + member.lastName}</td>
              <td>
                {currentTeam ? getTeamName(currentTeam.tid, teams) : 'N/A'}
              </td>
              <td>{currentTeam ? currentTeam.priveledges : 'N/A'}</td>
              <td>{currentTeam ? getOrbitMail(member.firstName, member.lastName) : "N/A"}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

// Helper function to get team name by tid
const getTeamName = (tid: number, teams: Team[]) => {
  const matchedTeam = teams.find((team) => team.tid === tid);
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


export default SearchResults;

