import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { recipeGenerationActions } from "../features/recipeGenerationSlice";
import IngredientsList from "./IngredientsList";
import IngredientElement from "./IngredientElement";

const OwnedIngredientsList = () => {
  const ownedIngredientsList = useSelector(
    (state) => state.recipeGeneration.ownedIngredients
  );
  const dispath = useDispatch();

  const handleRemove = (event, ingredient) => {
    event.preventDefault();
    dispath(recipeGenerationActions.removeOwnedIngredients(ingredient.id));
  };

  return (
    <div id="OwnedIngredientsList">
      <IngredientsList
        ingredients={ownedIngredientsList}
        ListElement={IngredientElement}
        handleRemove={handleRemove}
      />
    </div>
  );
};

export default OwnedIngredientsList;
