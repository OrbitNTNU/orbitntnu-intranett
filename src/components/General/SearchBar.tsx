// components/SearchBar.js
import React from 'react';

interface SearchBarProps {
  query: string;
  onChange: (value: string) => void;
}

const SearchBar = ({ query, onChange }: SearchBarProps) => {
  return (
    <div className='my-10 flex items-center justify-center'>
      <input
        className="rounded-md p-2 text-black"
        type="text"
        placeholder="Search..."
        value={query}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
};

export default SearchBar;
