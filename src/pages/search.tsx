import React, { useEffect, useMemo, useState } from 'react';
import SearchResults from '@/components/ProfilePage/SearchResults';
import { api } from '@/utils/api';
import SearchBar from '@/components/General/SearchBar';
import BreakLine from '@/components/General/Breakline';
import Layout from "@/components/General/Layout";
import { Loading } from '@/components/General/Loading';
import type { MemberInfoData } from '@/interfaces/MemberInfo';

export default function SearchPage() {
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<MemberInfoData[]>([]); // Initialize searchResults with an empty array

  const memberInfoData = api.members.getAllMemberInfo.useQuery();
  const members = useMemo(() => memberInfoData.data ?? [], [memberInfoData.data]);

  const handleSearch = (query: string) => {
    // Filter members based on the name attribute (case-insensitive)
    const filteredResults = members
      .filter((member) =>
        member.name.toLowerCase().includes(query.toLowerCase())
      );
    setSearchResults(filteredResults as MemberInfoData[]);
  };

  const handleInputChange = (query: string) => {
    setSearchQuery(query);
    handleSearch(query);
  };

  // Use `useEffect` to set `loading` to `false` when the data is available
  useEffect(() => {
    if (memberInfoData.isSuccess) {
      setLoading(false);
      // Initialize searchResults with all members
      setSearchResults(members as MemberInfoData[]);
    }
  }, [memberInfoData.isSuccess, members]);


  return (
    <Layout>
      <div>
        {loading ? (
          <Loading/>
        ) : (
          <div>
          <h2>Search for Orbiter</h2>
          <BreakLine />
          <SearchBar query={searchQuery} onChange={handleInputChange} />
          <SearchResults memberInfos={searchResults}/>
          </div>
        )}
      </div>
    </Layout>
  );
}
