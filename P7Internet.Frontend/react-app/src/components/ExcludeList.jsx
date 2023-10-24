import React, { useState } from "react";
import { recipeGenerationActions } from "../features/recipeGenerationSlice";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import IngredientsList from "./IngredientsList";
import IngredientElement from "./IngredientElement";

const ExcludeList = () => {
  const [ingredient, setIngredient] = useState("");
  const dispatch = useDispatch();

  // Gets the list from the store
  const excludeList = useSelector(
    (state) => state.recipeGeneration.excludeList
  );

  //Gets the length from the array from store
  const listlength = Array.from(excludeList).length;

  //Function for handling the remove feature
  const handleRemove = (event, ingredient) => {
    event.preventDefault();
    dispatch(recipeGenerationActions.removeExcludedIngredient(ingredient.id));
  };

  //Functions for add ingredient to state
  const submitAdd = (event) => {
    event.preventDefault();

    //Extracts exclude list from redux in dict form to a list of ingredients.
    var excludeDictionary = Object.values(excludeList);
    var excludeIngredientText = [];
    excludeDictionary.forEach((excludeIngredient) =>
      excludeIngredientText.push(excludeIngredient["text"])
    );

    //Handles input validation for the excludelist input field
    if (ingredient === "")
      toast.error(
        "Tekstfeltet er tomt. Skriv venligst navnet på ingrediensen."
      );
    else if (listlength > 10)
      toast.error(
        "Du kan ikke tilføje flere ingredienser til listen af ekskluderede ingredienser."
      );
    else if (excludeIngredientText.includes(ingredient))
      toast.error(
        "Den indtastede ingrediens er allerede i listen af ekskluderede ingredienser."
      );
    else dispatch(recipeGenerationActions.addExcludedIngredient(ingredient));

    setIngredient("");
  };

  //function for removing all elements from state
  function submitRemoveAll() {
    dispatch(recipeGenerationActions.clearAllExcludedIngredients());
  }

  return (
    <div id="ExcludeList">
      <h3 id="ExcludeListText">Ekskluder ingredienser</h3>
      <form id="ExcludeForm" onSubmit={submitAdd}>
        <input
          id="InputFieldExclude"
          type="text"
          placeholder="Ekskluder ingrediens"
          name="ingredient"
          value={ingredient}
          onChange={(event) => setIngredient(event.target.value)}
        />
        <button type="submit">Tilføj</button>
        <div id="ExcludedIngredientsList">
          <IngredientsList
            ingredients={excludeList}
            ListElement={IngredientElement}
            handleRemove={handleRemove}
          />
        </div>
      </form>
      <button id="RemoveAllExcludeIngredientsButton" onClick={submitRemoveAll}>
        Fjern alle
      </button>
    </div>
  );
};

export default ExcludeList;
