import React from "react";
import { useSelector } from "react-redux";

const IngredientsList = ({ ingredients }) => {
  const ownedIngredientsList = useSelector(
    (state) => state.recipeGeneration.ownedIngredients
  );
  function filterOwned(ingredients) {
    let filtered = [];
    for (let ingredient of ingredients) {
      for (let ownedIngredient of ownedIngredientsList) {
        if (ownedIngredient.text === ingredient) filtered.push(ingredient);
      }
    }
    return filtered;
  }

  return (
    <div className="ingredients">
      <ul>
        {ingredients.map((ingredient) => (
          <li key={ingredient}>
            {ingredient}
            {filterOwned(ingredients).includes(ingredient) ? <b> Ejet </b> : ""}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default IngredientsList;
