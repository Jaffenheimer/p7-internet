import { useDispatch, useSelector } from "react-redux";
import { pageActions } from "../features/pageSlice";
import RecipeTitle from "../components/RecipeTitle";
import IngredientsList from "../components/IngredientsList";
import MethodsList from "../components/MethodsList";
import Pages from "../objects/Pages";
import React from "react";
import ForPersons from "../components/ForPersons";

function FullRecipeView() {
  const dispatch = useDispatch();

  const recipes = useSelector((state) => state.recipe.recipes);

  const currentRecipeIndex = useSelector(
    (state) => state.recipe.currentRecipeIndex
  );

  const recipe = recipes[currentRecipeIndex];

  function goToPageRecipeSelection() {
    //pt har vi ikke den side, så det er bare frontpage
    dispatch(pageActions.goToPage(Pages.frontPage));
  }

  return (
    <div className="App">
      <div className="FullRecipeView">
        <RecipeTitle id="RecipeTitle" title={recipe.title} />
        <ForPersons />
        <IngredientsList ingredients={recipe.ingredients} />
        <MethodsList methods={recipe.method} />
        <button id="backButton" onClick={goToPageRecipeSelection}>
          Tilbage
        </button>
      </div>
    </div>
  );
}

export default FullRecipeView;
