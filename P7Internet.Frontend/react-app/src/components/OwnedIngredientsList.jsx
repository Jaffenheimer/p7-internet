import React from "react";
import cross from "../data/cross.svg";
import { useDispatch, useSelector } from "react-redux";
import { recipeGenerationActions } from "../features/recipeGenerationSlice";

const OwnedIngredientsList = () => {
	const ownedIngredientsList = useSelector(state => state.recipeGeneration.ownedIngredients);
	const dispath = useDispatch();
	
	const handleRemove = (event, ingredient) => {
		event.preventDefault();
		dispath(recipeGenerationActions.removeOwnedIngredients(ingredient.id));
  	}

  return (
    <ul>
      {ownedIngredientsList.map((ingredient) => (
        <li key={ingredient.id}>
          {ingredient.text}
          <img
            src={cross}
            alt="cross"
            onClick={(event) => handleRemove(event, ingredient)}
          />
        </li>
      ))}
    </ul>
  );
};

export default OwnedIngredientsList;
