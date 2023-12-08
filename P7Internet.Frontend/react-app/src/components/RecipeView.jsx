import React from "react";
import RecipeTitle from "./RecipeTitle";
import IngredientsList from "./IngredientsList";
import { useSelector } from "react-redux";
import RecipeIngredientElement from "./RecipeIngredientElement";
import { convertIngredientsToIngredientObjects } from "../helperFunctions/ingredientHelper";

const RecipeView = () => {
  const tab = useSelector((state) => state.recipe.currentRecipeIndex);
  const recipes = useSelector((state) => state.recipe.recipes);

  return (
    <div className="RecipeView">
      <RecipeTitle recipe={recipes[tab]} />
      <IngredientsList
        ingredients={convertIngredientsToIngredientObjects(
          recipes[tab].ingredients
        )}
        ListElement={RecipeIngredientElement}
      />
    </div>
  );
};

export default RecipeView;
