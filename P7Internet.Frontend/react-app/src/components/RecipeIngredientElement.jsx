import React from "react";
import { useSelector } from "react-redux";

const RecipeIngredientElement = ({ ingredient }) => {
  const ownedIngredientsList = useSelector(
    (state) => state.recipeGeneration.ownedIngredients
  );

  function isOwned(ingredient) {
    for (const ownedIngredient of ownedIngredientsList) {
      if (ownedIngredient.text === ingredient.text) {
        return true;
      }
    }
    return false;
  }

  return (
    <div className="RecipeIngredientElement">
      <li key={ingredient.id}>
        {ingredient.text}
        {isOwned(ingredient) ? <b> Ejet </b> : ""}
      </li>
    </div>
  );
};

export default RecipeIngredientElement;
