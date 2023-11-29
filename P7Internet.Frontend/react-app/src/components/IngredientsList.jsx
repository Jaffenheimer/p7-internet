import React from "react";

const IngredientsList = ({ ingredients, ListElement, handleRemove }) => {
  console.log(ingredients);
  return (
    <div className="ingredientsList" data-testid="IngredientsList">
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
