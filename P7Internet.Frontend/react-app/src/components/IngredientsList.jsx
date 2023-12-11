import React from "react";
import { useSelector } from "react-redux";

const IngredientsList = ({ ingredients, ListElement, handleRemove, shortIngredients }) => {
  return (
    <div className="ingredientsList" data-testid="IngredientsList">
      <h2>Ingredienser:</h2>
      <ul>
        {ingredients.map((ingredient, index) => (
          <ListElement
            data-testid="ListElement"
            key={index}
            ingredient={ingredient}
            handleRemove={handleRemove}
          />
        ))}
      </ul>
    </div>
  );
};

export default IngredientsList;
