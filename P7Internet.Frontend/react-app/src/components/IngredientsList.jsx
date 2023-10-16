import React from "react";
import IngredientElement from "./IngredientElement";

const IngredientsList = ({ ingredients }) => {

  return (
    <div className="ingredients">
      <h2>Ingredienser:</h2>
      <ul>
        {ingredients.map((ingredient) => (
          <IngredientElement ingredient={ingredient} />
        ))}
      </ul>
    </div>
  );
};

export default IngredientsList;
