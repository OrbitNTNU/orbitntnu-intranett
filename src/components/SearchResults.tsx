// components/SearchResults.js
import { SearchResult } from '@/interfaces/SearchResult';
import React from 'react';

interface SearchResultsProps {
  results: SearchResult[];
}

const SearchResults = ({ results }: SearchResultsProps) => {
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
        {results.map((result) => (
          <tr key={result.id}>
            <td>{result.name}</td>
            <td>{result.team}</td>
            <td>{result.role}</td>
            <td>{result.email}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default SearchResults;
