import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { recipeGenerationActions } from "../features/recipeGenerationSlice";
import IngredientsList from "./IngredientsList";
import IngredientElement from "./IngredientElement";

const OwnedIngredientsList = () => {
  const ownedIngredientsList = useSelector(
    (state) => state.recipeGeneration.ownedIngredients
  );
  const dispatch = useDispatch();

  const handleRemove = (event, ingredient) => {
    event.preventDefault();
    dispatch(recipeGenerationActions.removeOwnedIngredients(ingredient.id));
  };

  return (
    <div id="OwnedIngredientsList" data-testid="OwnedIngredientsList">
      <IngredientsList
        ingredients={ownedIngredientsList}
        ListElement={IngredientElement}
        handleRemove={handleRemove}
      />
    </div>
  );
};

export default OwnedIngredientsList;
