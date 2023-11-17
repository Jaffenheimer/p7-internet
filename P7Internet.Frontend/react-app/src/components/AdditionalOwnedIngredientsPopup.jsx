import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ingredientIsOwned } from "../helperFunctions/ingredientHelper";
import { nanoid } from "@reduxjs/toolkit";
import { recipeGenerationActions } from "../features/recipeGenerationSlice";
import { pageActions } from "../features/pageSlice";
import Pages from "../objects/Pages";

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

  useEffect(() => {
    //if the user already owns all the ingredients
    if (currentRecipeUnownedIngredients.length === 0) {
      closeModalAndGoToFullRecipeView();
    }
  });

  function handleCheckboxChange(_, checkBoxIndex) {
    let updatedIngredientsChecked = [...ingredientsChecked];
    updatedIngredientsChecked[checkBoxIndex] =
      !updatedIngredientsChecked[checkBoxIndex];

    setIngredientsChecked(updatedIngredientsChecked);
  }

  function closeModalAndGoToFullRecipeView() {
    document.body.style.overflow = "visible";
    dispatch(pageActions.closeAdditionalOwnedIngredientsPopup());
    dispatch(pageActions.goToPage(Pages.fullRecipeView));
  }

  function handleContinueButtonClick() {
    for (let i = 0; i < ingredientsChecked.length; i++) {
      if (ingredientsChecked[i]) {
        dispatch(
          recipeGenerationActions.addOwnedIngredient(
            currentRecipeUnownedIngredients[i]
          )
        );
      }
    }
    closeModalAndGoToFullRecipeView();
  }

  return (
    <div id="AdditionalOwnedIngredientsPopup">
      <div
        id="AdditionalOwnedIngredientsPopup"
        className="favoriteRecipesContainer"
      >
        {currentRecipeUnownedIngredients.map((ingredient, index) => (
          <div key={nanoid()}>
            <input
              type="checkbox"
              id={index}
              key={index}
              className="IngredientCheckboxes"
              checked={ingredientsChecked[index]}
              onChange={(event) => handleCheckboxChange(event, index)}
            />
            <label
              key={nanoid()}
              htmlFor={index}
              id={index}
              className="IngredientCheckboxesLabel"
            >
              {ingredient}
            </label>
            <br></br>
          </div>
        ))}
      </div>
      <button
        id="acceptAdditionalIngredientsButton"
        onClick={handleContinueButtonClick}
      >
        fortsæt
      </button>
    </div>
  );
};

export default AdditionalOwnedIngredientsPopup;
