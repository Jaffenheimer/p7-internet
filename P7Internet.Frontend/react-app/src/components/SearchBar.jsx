import React, { useState, useRef } from "react";
import { recipeGenerationActions } from "../features/recipeGenerationSlice";
import { useDispatch, useSelector } from "react-redux";

const SearchBar = () => {
  const dispatch = useDispatch();
  const inputRef = useRef();
  const [ingredient, setIngredient] = useState('');
  const ownedIngredientsList = useSelector(state => state.recipeGeneration.ownedIngredients);

  const handleChange = (event) => {
    setIngredient(event.target.value);
  };

  const handleSubmit = (event) => {
      event.preventDefault();
      inputRef.current.value = '';
      if(ingredient !== null && typeof(ingredient) !== 'undefined'){
        if (ingredient == "") return

        // receives the ingredient text (aka. name) from dict on store in format 
        // {0:{id: '', text: ''}, 1:{id: '', text: ''}}¨
        var test = Object.values(ownedIngredientsList)
        var ownedIngredientText = []

        test.forEach((ownedIngredient) => ownedIngredientText.push(ownedIngredient['text']))

        // only adds to ownedIngredient if non-dublicate
        if (!ownedIngredientText.includes(ingredient))
          dispatch(recipeGenerationActions.addOwnedIngredients(ingredient));
        else
          alert(`Elementet "${ingredient}" er allerede tilføjet til listen!`)
      }
      setIngredient(event.target.value); 
  }; 

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="ingredient"
        ref={inputRef}
        value={ingredient}
        onChange={handleChange}
        placeholder="Tilføj en ingrediens..."
      />
      <button type="submit">Tilføj</button>
    </form>
  );
};

export default SearchBar;
