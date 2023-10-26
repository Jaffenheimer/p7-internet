import React, { useState } from "react";
import { recipeGenerationActions } from "../features/recipeGenerationSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SearchBar = () => {
  const dispatch = useDispatch();
  const [ingredient, setIngredient] = useState('');
  const ownedIngredientsList = useSelector(state => state.recipeGeneration.ownedIngredients);

  const handleChange = (event) => {
    setIngredient(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if(ingredient !== null && typeof(ingredient) !== 'undefined'){
      if (ingredient === "") return

      // receives the ingredient text (aka. name) from dict on store in format 
      // {0:{id: '', text: ''}, 1:{id: '', text: ''}}¨
      var ownedDictionary = Object.values(ownedIngredientsList)
      var ownedIngredientText = []

      ownedDictionary.forEach((ownedIngredient) => ownedIngredientText.push(ownedIngredient['text']))

      // only adds to ownedIngredient if non-dublicate
      if (!ownedIngredientText.includes(ingredient))
        dispatch(recipeGenerationActions.addOwnedIngredients(ingredient));
      else
        toast.error(`Elementet "${ingredient}" er allerede tilføjet til listen!`)
    }
    setIngredient(''); 
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
