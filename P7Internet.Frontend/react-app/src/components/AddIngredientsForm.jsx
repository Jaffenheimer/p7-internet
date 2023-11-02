import React, { useState, useEffect } from "react";
import { recipeGenerationActions } from "../features/recipeGenerationSlice";
import { useDispatch, useSelector } from "react-redux";
import AddButton from "./AddButton";
import RemoveAllButton from "./RemoveAllButton";
import AddIngredientInput from "./AddIngredientInput";

const AddIngredientsForm = ({ingredientsList, addIngredient, removeAllHandler}) => {
  const dispatch = useDispatch();
  const [ingredient, setIngredient] = useState('');
  //const ownedIngredientsList = useSelector(state => state.recipeGeneration.ownedIngredients);
  const [addButtonIsDisabled, setAddButtonDisabled] = useState(true);
  const [removeAllButtonIsDisabled, setRemoveAllButtonDisabled] = useState(true);

  useEffect(() => {
    handleRemoveAllButtonDisabling();
  }, [ingredientsList]);

  useEffect(() => {
    handleAddButtonDisabling(ingredient);
  }, [ingredient]);

  const handleChange = (event) => {
    setIngredient(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (ingredient !== null && typeof ingredient !== "undefined") {
      if (ingredient == "") return;

      // receives the ingredient text (aka. name) from dict on store in format
      // {0:{id: '', text: ''}, 1:{id: '', text: ''}}¨
      var ingredientsDictionary = Object.values(ingredientsList);
      var ingredientText = [];

      ingredientsDictionary.forEach((ingredient) =>
      ingredientText.push(ingredient["text"])
      );

      // only adds to ownedIngredient if non-dublicate
      if (!ingredientText.includes(ingredient))
        dispatch(addIngredient(ingredient));
      else alert(`Elementet "${ingredient}" er allerede tilføjet til listen!`);
    }
    setIngredient("");
  };

  //add button is disabled if input is empty, else enabled
  const handleAddButtonDisabling = (value) => {
    if (value === "")
      setAddButtonDisabled(true)
    else
      setAddButtonDisabled(false)
  }

  //remove all button is disabled if there are no ingredients to remove, else enabled
  const handleRemoveAllButtonDisabling = () => {
    if (ingredientsList.length === 0)
      setRemoveAllButtonDisabled(true)
    else
      setRemoveAllButtonDisabled(false)
  }
    
  return (
      <form onSubmit={handleSubmit}>
        <AddIngredientInput ingredient={ingredient} handleChange={handleChange} placeholder="Tilføj en ingrediens..." />
        <AddButton type="submit" isDisabled={addButtonIsDisabled} className="AddIngredientButton" />
        <RemoveAllButton handleClick={removeAllHandler} isDisabled={removeAllButtonIsDisabled} />
      </form>
  );
};

export default AddIngredientsForm;
