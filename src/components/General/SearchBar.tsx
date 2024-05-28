// components/SearchBar.js
import React, { useEffect, useRef } from 'react';

interface SearchBarProps {
  query?: string;
  onChange: (value: string) => void;
}

const SearchBar = ({ query, onChange }: SearchBarProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Focus on the input element when the component mounts
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);
  
  return (
    <div className='my-10 flex items-center justify-center'>
      <input
        ref={inputRef}
        className="rounded-md p-2 text-black lg:w-1/3 w-5/6"
        type="text"
        placeholder="Search..."
        value={query}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
};

export default SearchBar;
