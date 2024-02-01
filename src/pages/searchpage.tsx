import React, { useEffect, useState } from 'react';
import SearchResults from '@/components/ProfilePage/SearchResults';
import { api } from '@/utils/api';
import type { Member } from '@prisma/client';
import SearchBar from '@/components/General/SearchBar';
import BreakLine from '@/components/General/Breakline';
import Layout from '@/templates/Layout';

export default function SearchPage() {
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Member[]>([]); // Initialize searchResults with an empty array

  const membersData = api.members.getMembers.useQuery();
  const members = membersData.data ?? [];

  const teamHistoriesData = api.teamHistories.getTeamHistories.useQuery();
  const teamHistories = teamHistoriesData.data ?? [];

  const teamsData = api.teams.getTeams.useQuery();
  const teams = teamsData.data ?? [];

  const handleSearch = (query: string) => {
    // Filter members based on the name attribute (case-insensitive)
    const filteredResults = members
      .filter((member) =>
        member.firstName.toLowerCase().includes(query.toLowerCase())
      );
    setSearchResults(filteredResults);
  };

  const handleInputChange = (query: string) => {
    setSearchQuery(query);
    handleSearch(query);
  };

  // Use `useEffect` to set `loading` to `false` when the data is available
  useEffect(() => {
    if (membersData.isSuccess && teamHistoriesData.isSuccess && teamsData.isSuccess) {
      setLoading(false);
      // Initialize searchResults with all members
      setSearchResults(members);
    }
  }, [members, membersData.isSuccess, teamHistoriesData.isSuccess, teamsData.isSuccess]);

  return (
    <Layout>
      <div>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div>
          <h2>Search for Orbiter</h2>
          <BreakLine />
          <SearchBar query={searchQuery} onChange={handleInputChange} />
          <SearchResults members={searchResults} teamHistories={teamHistories} teams={teams} />
          </div>
        )}
      </div>
    </Layout>
  );
}
