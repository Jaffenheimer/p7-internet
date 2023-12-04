import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { pageActions } from "../features/pageSlice";
import Pages from "../objects/Pages";
import { toast } from "react-toastify";
import { recipeActions } from "../features/recipeSlice";
import { defaultRecipes } from "../objects/DefaultRecipes";

const GenerateRecipesButton = () => {
  const dispatch = useDispatch();
  const ingredients = useSelector(
    (state) => state.recipeGeneration.ownedIngredients
  );

  function goToPageFullRecipeSelection() {
    dispatch(pageActions.goToPage(Pages.RecipeSelection));
  }

  //handles all the logic for when the button is clicked
  function handleOnClick() {
    if (ingredients.length === 0) {
      toast.error(
        "Du skal tilføje mindst 1 ingrediens for at generere opskrifter"
      );
      return;
    }
    //for testing purposes to ensure we have recipes on next page:
    dispatch(recipeActions.addRecipes(defaultRecipes));
    goToPageFullRecipeSelection();
  }

  return (
    <button
      onClick={handleOnClick}
      id="GenerateRecipesButton"
      data-testid="GenerateRecipesButton"
    >
      Generer opskrifter
    </button>
  );
};

export default GenerateRecipesButton;
