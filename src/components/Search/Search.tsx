import React, { useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { Dispatch, SetStateAction } from "react";

type SearchProduct = {
  setKeyword: Dispatch<SetStateAction<string>>;
};

const Search = ({ setKeyword }: SearchProduct) => {
  const [searchInput, setSearchInput] = useState("");

  setKeyword(searchInput);

  return (
    <div>
      <div className="search-container">
        <h2>Search Products</h2>
        <div className="search-input">
          <span>
            <AiOutlineSearch />
          </span>
          <input
            type="text"
            placeholder="Search"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};

export default Search;
