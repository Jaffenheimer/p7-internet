import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { ingredientIsOwned } from "../helperFunctions/ingredientHelper";
import { nanoid } from "@reduxjs/toolkit";
import { recipeActions } from "../features/recipeSlice";

const AdditionalOwnedIngredientsPopup = () => {
  const dispatch = useDispatch();
  const recipes = useSelector((state) => state.recipe.recipes);
  const ownedIngredientsList = useSelector(
    (state) => state.recipeGeneration.ownedIngredients
  );
  const currentRecipeIndex = useSelector(
    (state) => state.recipe.currentRecipeIndex
  );
  const currentRecipe = recipes[currentRecipeIndex];
  const currentRecipeUnownedIngredients = currentRecipe.ingredients.filter(
    (ingredient) => !ingredientIsOwned(ingredient, ownedIngredientsList)
  );
  const [ingredientsChecked, setIngredientsChecked] = React.useState(
    new Array(currentRecipeUnownedIngredients.length).fill(false)
  );

  function handleCheckboxChange(event, checkBoxIndex) {
    console.log("index is", checkBoxIndex); //somehow this index is undefined
    let updatedIngredientsChecked = [...ingredientsChecked];
    updatedIngredientsChecked[checkBoxIndex] =
      !updatedIngredientsChecked[checkBoxIndex];

    setIngredientsChecked(updatedIngredientsChecked);
    console.log(ingredientsChecked);
  }

  function handleContinueButtonClick() {
    dispatch(recipeActions.addOwnedIngredient());
  }

  return (
    <div id="AdditionalOwnedIngredientsPopup">
      <div
        id="AdditionalOwnedIngredientsPopup"
        className="favoriteRecipesContainer"
      >
        {currentRecipeUnownedIngredients.map((ingredient, index) => (
          <>
            <input
              type="checkbox"
              id={index}
              key={index}
              className="IngredientCheckboxes"
              checked={ingredientsChecked[index]}
              onChange={(event) => handleCheckboxChange(event, index)}
            />
            <label key={nanoid()} htmlFor={index} className={index}>
              {ingredient}
            </label>
            <br></br>
          </>
        ))}
      </div>
      <button
        id="acceptAdditionalIngredientsButton"
        onClick={handleContinueButtonClick}
      >
        {" "}
        fortsæt
      </button>
    </div>
  );
};

export default AdditionalOwnedIngredientsPopup;
