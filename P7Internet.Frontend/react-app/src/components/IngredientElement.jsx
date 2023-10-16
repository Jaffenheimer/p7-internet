import React from "react";
import { useSelector } from "react-redux";

const IngredientElement = ({ ingredient }) => {
  const ownedIngredientsList = useSelector(
    (state) => state.recipeGeneration.ownedIngredients
  );

  function isOwned(ingredient) {
    return ownedIngredientsList.includes(ingredient);
  }

  return (
    <div>
      <li key={ingredient}>
        {ingredient}
        {isOwned(ingredient) ? <b> Ejet </b> : ""}
      </li>
    </div>
  );
};

export default IngredientElement;
