import React from "react";

const SearchBar = () => {

  return (
    <form>
      <input
        type="text"
        name="userInput"
        placeholder="Add an ingredient"
        />
      <button type="submit" >Submit</button>
    </form>
  );
};

export default SearchBar;
