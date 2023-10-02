// components/SearchBar.js
import React from 'react';

interface SearchBarProps {
  query: string;
  onChange: (value: string) => void;
  onSearch: (value: string) => void;
}

const SearchBar = ({ query, onChange, onSearch }: SearchBarProps) => {
  return (
    <div style={{ marginTop: '20px' }}>
      {/* Add margin-top to move the SearchBar down */}
      <input
        type="text"
        placeholder="Search..."
        value={query}
        onChange={(e) => onChange(e.target.value)}
        style={{
          width: '100%',
          padding: '10px',
          fontSize: '1.2rem',
        }}
      />
    </div>
  );
};

export default SearchBar;
