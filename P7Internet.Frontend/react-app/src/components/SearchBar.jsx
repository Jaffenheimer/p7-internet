import React from "react";

const SearchBar = () => {

  return (
    <form>
      <input
        type="text"
        name="userInput"
        placeholder="Tilføj en ingrediens..."
        />
      <button type="submit" >Tilføj</button>
    </form>
  );
};

export default SearchBar;
