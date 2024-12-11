import React, { useState } from 'react';

const SearchBox = ({ onSearch }) => {
  const [searchText, setSearchText] = useState('');
  const [isFocused, setIsFocused] = useState(false); // Track focus state

  const handleClear = () => {
    setSearchText('');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && searchText.trim()) {
      onSearch(searchText);
    }
  };

  return (
    <div
      className={`relative transition-all duration-300 ease-in-out ${
        isFocused ? 'w-full max-w-md' : 'w-2/3 max-w-xs'
      } mx-auto`}
    >
      <input
        type="text"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        onKeyDown={handleKeyPress}
        onFocus={() => setIsFocused(true)} // Expand on focus
        onBlur={() => setIsFocused(false)} // Shrink on blur if empty
        placeholder="Search for the projects"
        className="w-full py-2 pl-4 pr-12 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
      />

      {searchText && (
        <button
          onClick={handleClear}
          className="absolute right-16 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
        >
          <img
            src="/src/assets/closeLogo.png"
            alt="Clear"
            className="w-4 h-4"
          />
        </button>
      )}

      <button
        onClick={() => onSearch(searchText)}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
      >
        <img
          src="/src/assets/searchLogo.png"
          alt="Search"
          className="w-5 h-5"
        />
      </button>
    </div>
  );
};

export default SearchBox;
