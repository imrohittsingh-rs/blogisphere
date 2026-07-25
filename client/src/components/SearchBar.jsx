import React from 'react';
import { FiSearch } from 'react-icons/fi';

const SearchBar = ({ searchQuery, setSearchQuery }) => {
  return (
    <div className="relative w-full sm:max-w-xs">
      <input
        type="text"
        placeholder="Search stories..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="w-full bg-zinc-50 text-xs text-zinc-800 placeholder-zinc-400 pl-3 pr-8 py-2.5 border border-zinc-200 focus:outline-none focus:ring-1 focus:ring-brand focus:border-brand transition-all rounded-none font-medium"
      />
      <FiSearch className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 w-3.5 h-3.5 pointer-events-none" />
    </div>
  );
};

export default SearchBar;
