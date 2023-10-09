import React, { useState } from 'react';
import SearchBar from '@/components/SearchBar';
import SearchResults from '@/components/SearchResults';
import { Member } from '@/interfaces/Member';
import { SearchResultCards } from '@/views/SearchResultCards';
import members from '@/mockdata/MockMembers'; // Import your mock members data here
import teamHistories from '@/mockdata/MockTeamHistory'; // Import your mock team histories data here
import teams from '@/mockdata/MockTeams'; // Import your mock teams data here

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Member[]>(members);

  // Define the handleSearch function to perform the search
  const handleSearch = (query: string) => {
    // Perform the search logic here based on the name attribute

    // Filter members based on the name attribute (case-insensitive)
    const filteredResults = members
      .filter((member) =>
        member.firstName.toLowerCase().includes(query.toLowerCase())
      );

    // Update the searchResults state with the filtered results
    setSearchResults(filteredResults);
  };

  // Handle input changes and trigger the search
  const handleInputChange = (query: string) => {
    setSearchQuery(query);

    // Trigger the search with the updated query
    handleSearch(query);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minHeight: '100vh' }}>
      <h1>Search Page</h1>
      <SearchBar
        query={searchQuery}
        onChange={handleInputChange}
        onSearch={handleSearch}
      />
      <SearchResultCards members={searchResults} teamHistories={teamHistories} teams={teams} />
    </div>
  );
}
