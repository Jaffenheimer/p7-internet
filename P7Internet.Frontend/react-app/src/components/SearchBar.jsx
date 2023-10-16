import React, { useState } from "react";
import { recipeGenerationActions } from "../features/recipeGenerationSlice";
import { useDispatch } from "react-redux";

const SearchBar = () => {
  const [ingredient, setIngredient] = useState("");
  const dispatch = useDispatch();

  const handleChange = (event) => {
    setIngredient(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (ingredient !== null) {
      dispatch(recipeGenerationActions.addOwnedIngredients(ingredient));
    }

    setIngredient("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="ingredient"
        value={ingredient}
        onChange={handleChange}
        placeholder="Tilføj en ingrediens..."
      />
      <button type="submit">Tilføj</button>
    </form>
  );
};

export default SearchBar;
