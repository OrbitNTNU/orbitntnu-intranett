import React, { useState } from 'react';
import SearchBar from '@/components/SearchBar';
import SearchResults from '@/components/SearchResults';

// Define the shape of a single search result
interface SearchResult {
    id: number;
    name: string;
    team: string;
    role: string;
    email: string;
  }

const members: SearchResult[] = [
    {
      id: 1,
      name: 'John Doe',
      team: 'Web',
      role: 'Team Lead',
      email: 'john@example.com',
    },
    {
      id: 2,
      name: 'Jane Smith',
      team: 'SubOrbital',
      role: 'Project Manager',
      email: 'jane@example.com',
    },
    // Add more members here...
  ];

function SearchPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<SearchResult[]>(members);

  // Define the handleSearch function to perform the search
  const handleSearch = (query: string) => {
    // Perform the search logic here based on the name attribute

    // Filter members based on the name attribute (case-insensitive)
    const filteredResults = members
      .filter((member) =>
        member.name.toLowerCase().includes(query.toLowerCase())
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
      <SearchResults results={searchResults} />
    </div>
  );
}

export default SearchPage;
