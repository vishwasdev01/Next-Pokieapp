"use-client";

import React, { useState } from 'react';

const SearchPokemon = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = () => {
    onSearch(searchTerm);
    setSearchTerm('');
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="flex flex-col items-center md:items-start w-full md:w-auto"> 
      <h2 className="text-xl font-bold mb-4">Search Pokémon</h2>
      <div className="flex flex-col w-full md:flex-row md:w-auto"> 
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Search Pokémon"
          className="border border-gray-300 rounded p-2 mb-2 md:mb-0 md:mr-2 flex-grow" 
        />
        <button
          onClick={handleSearch}
          className="bg-[#004368] text-white p-2 rounded"
        >
          Search
        </button>
      </div>
    </div>
  );
};

export default SearchPokemon;