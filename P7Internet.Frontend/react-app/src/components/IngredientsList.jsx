import React from "react";

const IngredientsList = ({
  ingredients,
  shortIngredients,
  ListElement,
  handleRemove,
}) => {
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
            shortIngredient={null}
          />
        ))}
      </ul>
    </div>
  );
};

function FindShortIngredient() {}

export default IngredientsList;
