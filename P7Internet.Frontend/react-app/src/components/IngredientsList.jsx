import React from "react";
import { useSelector } from "react-redux";

const IngredientsList = ({ ingredients }) => {
  const ownedIngredientsList = useSelector(
    (state) => state.recipeGeneration.ownedIngredients
  );
  function filterOwned(ingredients) {
    let filtered = [];
    console.log(ownedIngredientsList[0].text);
    for (let ingredient of ingredients) {
      console.log("ingredient", ingredient);
      for (let ownedIngredient of ownedIngredientsList) {
        if (ownedIngredient.text === ingredient) filtered.push(ingredient);
      }
    }
    console.log("filtered", filtered);
    return filtered;
  }

  return (
    <div className="ingredients">
      <ul>
        {ingredients.map((ingredient) => (
          <li key={ingredient}>
            {ingredient}
            {filterOwned(ingredients).includes(ingredient) ? <b> Owned</b> : ""}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default IngredientsList;
