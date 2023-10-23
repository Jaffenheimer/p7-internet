import React, { useState, useEffect } from "react";
import { recipeGenerationActions } from "../features/recipeGenerationSlice";
import { useDispatch, useSelector } from "react-redux";

const SearchBar = () => {
  const dispatch = useDispatch();
  const [ingredient, setIngredient] = useState('');
  const ownedIngredientsList = useSelector(state => state.recipeGeneration.ownedIngredients);
  const [addButtonIsDisabled, setAddButtonDisabled] = useState(true);
  const [removeAllButtonIsDisabled, setRemoveAllButtonDisabled] = useState(true);

  console.log(ingredient)

  useEffect(() => {
    handleRemoveAllButtonDisabling();}
    , []);

  const handleChange = (event) => {
    setIngredient(event.target.value);
    handleAddButtonDisabling(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (ingredient !== null && typeof ingredient !== "undefined") {
      if (ingredient == "") return;

      // receives the ingredient text (aka. name) from dict on store in format
      // {0:{id: '', text: ''}, 1:{id: '', text: ''}}¨
      var ownedDictionary = Object.values(ownedIngredientsList);
      var ownedIngredientText = [];

      ownedDictionary.forEach((ownedIngredient) =>
        ownedIngredientText.push(ownedIngredient["text"])
      );

      // only adds to ownedIngredient if non-dublicate
      if (!ownedIngredientText.includes(ingredient))
        dispatch(recipeGenerationActions.addOwnedIngredients(ingredient));
      else alert(`Elementet "${ingredient}" er allerede tilføjet til listen!`);
    }
    setIngredient("");
    handleRemoveAllButtonDisabling();
  };

  function submitRemoveAll() {
    dispatch(recipeGenerationActions.clearAllOwnedIngredients());
  }

  //add button is disabled if input is empty, else enabled
  const handleAddButtonDisabling = (value) => {
    if (value === "")
      setAddButtonDisabled(true)
    else
      setAddButtonDisabled(false)
  }

  //remove all button is disabled if there are no ingredients to remove, else enabled
  const handleRemoveAllButtonDisabling = () => {
    //console.log(ownedIngredientsList)
    if (ownedIngredientsList.length === 0)
      setRemoveAllButtonDisabled(true)
    else
      setRemoveAllButtonDisabled(false)
  }
    
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="ingredient"
        value={ingredient}
        onChange={handleChange}
        placeholder="Tilføj en ingrediens..."
      />
      <button type="submit" disabled={addButtonIsDisabled} >Tilføj</button>
      <button id="RemoveAllExcludeIngredientsButton" disabled={removeAllButtonIsDisabled}
      onClick={submitRemoveAll}>
        Fjern alle
      </button>
    </form>
  );
};

export default SearchBar;
