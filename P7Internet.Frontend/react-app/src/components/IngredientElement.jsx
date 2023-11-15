import React from "react";
import cross from "../data/cross.svg";

const IngredientElement = ({ ingredient, handleRemove }) => {
  return (
    <div className="IngredientElement">
      <li key={ingredient.id}>{ingredient.text}</li>
      <img
        className="RemoveIngredientImage"
        data-testid="RemoveIngredientImage"
        src={cross}
        alt="cross"
        onClick={(event) => handleRemove(event, ingredient)}
      />
    </div>
  );
};

export default IngredientElement;
