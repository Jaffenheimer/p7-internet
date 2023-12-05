import React from "react";
import { useSelector } from "react-redux";
import { ingredientIsOwned } from "../helperFunctions/ingredientHelper";

const RecipeIngredientElement = ({ ingredient }) => {
  const ownedIngredientsList = useSelector(
    (state) => state.recipeGeneration.ownedIngredients
  );

  return (
    <div
      className="RecipeIngredientElement"
      data-testid="RecipeIngredientElement"
    >
      <li>
        {ingredient.text}
        {ingredientIsOwned(ingredient, ownedIngredientsList) ? (
          <b> Ejet </b>
        ) : (
          ""
        )}
      </li>
    </div>
  );
};

export default RecipeIngredientElement;
