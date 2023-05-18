import React from "react";
import { BiSearchAlt } from "react-icons/bi";

const SearchBar = ({ setSearchQuery, handleSearch }) => {
  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
    handleSearch();
  };

  const handleSearchClick = () => {
    handleSearch();
  };
  return (
    <div
      id="search-container"
      className="bg-white rounded-full p-2 flex w-full max-w-md lg:max-w-xl overflow-hidden shadow-lg"
    >
      <input
        className="flex-auto text-sm md:text-[16px] p-2 border-none outline-none focus:ring-0"
        type="text"
        name="search"
        id="search"
        placeholder="Job title || Requirements || Skills"
        onChange={handleInputChange}
      />
      <button
        id="search-button"
        className="p-2 rounded-full bg-primary h-10 w-10 grid place-items-center"
        onClick={handleSearchClick}
      >
        <BiSearchAlt size="21" color="white" />
      </button>
    </div>
  );
};

export default SearchBar;
