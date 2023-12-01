import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  convertIngredientsToIngredientObjects,
  ingredientIsOwned,
} from "../helperFunctions/ingredientHelper";
import { nanoid } from "@reduxjs/toolkit";
import { recipeGenerationActions } from "../features/recipeGenerationSlice";
import { pageActions } from "../features/pageSlice";
import Pages from "../objects/Pages";
import { useState } from "react";

const AdditionalOwnedIngredientsModalContainer = () => {
  const dispatch = useDispatch();
  const recipes = useSelector((state) => state.recipe.recipes);
  const ownedIngredientsList = useSelector(
    (state) => state.recipeGeneration.ownedIngredients
  );
  const currentRecipeIndex = useSelector(
    (state) => state.recipe.currentRecipeIndex
  );
  const currentRecipe = recipes[currentRecipeIndex];
  const currentRecipeUnownedIngredients = convertIngredientsToIngredientObjects(
    currentRecipe.ingredients
  ).filter(
    (ingredient) => !ingredientIsOwned(ingredient, ownedIngredientsList)
  );
  const [ingredientsChecked, setIngredientsChecked] = useState(
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
    dispatch(pageActions.closeAdditionalOwnedIngredientsModalContainer());
    dispatch(pageActions.goToPage(Pages.fullRecipeView));
  }

  function handleContinueButtonClick() {
    for (let i = 0; i < ingredientsChecked.length; i++) {
      if (ingredientsChecked[i]) {
        dispatch(
          recipeGenerationActions.addOwnedIngredient(
            currentRecipeUnownedIngredients[i].text
          )
        );
      }
    }
    closeModalAndGoToFullRecipeView();
  }

  return (
    <div
      id="AdditionalOwnedIngredientsModalContainer"
      data-testid="AdditionalOwnedIngredientsModalContainer"
      className="scrollableModalContainer"
    >
      <div id="IngredientsContainer">
        {currentRecipeUnownedIngredients.map((ingredient, index) => (
          <div key={nanoid()}>
            <input
              type="checkbox"
              id={index}
              key={index}
              className="IngredientCheckboxes"
              checked={ingredientsChecked[index]}
              onChange={(event) => handleCheckboxChange(event, index)}
              data-testid="IngredientCheckbox"
            />
            <label
              key={nanoid()}
              htmlFor={index}
              id={index}
              className="IngredientCheckboxesLabel"
            >
              {ingredient.text}
            </label>
            <br></br>
          </div>
        ))}
      </div>
      <button
        id="acceptAdditionalIngredientsButton"
        onClick={handleContinueButtonClick}
      >
        Fortsæt
      </button>
    </div>
  );
};

export default AdditionalOwnedIngredientsModalContainer;
