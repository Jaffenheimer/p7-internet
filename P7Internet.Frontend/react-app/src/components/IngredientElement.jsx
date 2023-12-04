import React from "react";
import cross from "../data/cross.svg";

const IngredientElement = ({ ingredient, handleRemove }) => {
  return (
    <div className="IngredientElement" data-testid="IngredientElement">
      <li key={ingredient.id}>{ingredient.text}</li>
      <img
        className="RemoveIngredientCross"
        data-testid="RemoveIngredientCross"
        src={cross}
        alt="cross"
        onClick={(event) => handleRemove(event, ingredient)}
      />
    </div>
  );
};

export default IngredientElement;
