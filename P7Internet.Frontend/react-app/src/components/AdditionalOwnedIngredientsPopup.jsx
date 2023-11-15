import React from "react";
import { useSelector } from "react-redux";
import { ingredientIsOwned } from "../helperFunctions/ingredientHelper";
import { nanoid } from "@reduxjs/toolkit";

const AdditionalOwnedIngredientsPopup = () => {
  const recipes = useSelector((state) => state.recipe.recipes);
  const ownedIngredientsList = useSelector(
    (state) => state.recipeGeneration.ownedIngredients
  );
  const currentRecipeIndex = useSelector(
    (state) => state.recipe.currentRecipeIndex
  );
  const currentRecipe = recipes[currentRecipeIndex];
  return (
    <div>
      {/* <input type="checkbox" key={index}>{ingredient} \> */}
      {currentRecipe.ingredients
        .filter(
          (ingredient) => !ingredientIsOwned(ingredient, ownedIngredientsList)
        )
        .map((ingredient, index) => (
          <>
            <input type="checkbox" id={index} key={index} />
            <label key={nanoid()} htmlFor={index}>
              {ingredient}
            </label>
          </>
        ))}
      ;
    </div>
  );
};

export default AdditionalOwnedIngredientsPopup;
