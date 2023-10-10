import React, {useState} from "react";

const SearchBar = ( { onSubmit } ) => {
  const [ingredient, setIngredient] = useState('');

  const handleSubmit = (event) => {
      event.preventDefault();
      onSubmit(ingredient);
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="ingredient"
        placeholder="Add an ingredient"
        value={ingredient}
        onChange={(event => setIngredient(event.target.value))}
        />
      <button type="submit" >Add</button>
    </form>
  );
};

export default SearchBar;
