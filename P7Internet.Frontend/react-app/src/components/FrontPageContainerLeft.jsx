import React from "react";
import AddIngredientsForm from "./AddIngredientsForm";
import OwnedIngredientsList from "./OwnedIngredientsList";
import GenerateRecipesButton from "./GenerateRecipesButton";
import { useSelector } from "react-redux";
import { recipeGenerationActions } from "../features/recipeGenerationSlice";
import { useDispatch } from "react-redux";

const FrontPageContainerLeft = () => {
  const dispatch = useDispatch();
  const ownedIngredientsList = useSelector(
    (state) => state.recipeGeneration.ownedIngredients
  );
  function removeAllHandler() {
    dispatch(recipeGenerationActions.clearAllOwnedIngredients());
  }

  return (
    <div
      className="FrontPageContainerLeft"
      data-testid="FrontPageContainerLeftTest"
    >
      <div id="IngredientsBody">
        <h2>Ingredienser jeg gerne vil bruge:</h2>
        <AddIngredientsForm
          addIngredient={recipeGenerationActions.addOwnedIngredients}
          ingredientsList={ownedIngredientsList}
          removeAllHandler={removeAllHandler}
        />
        <OwnedIngredientsList />
      </div>

      <div id="GenerateRecipesButton" data-testid="GenerateRecipesButton">
        <GenerateRecipesButton />
      </div>
    </div>
  );
};

export default FrontPageContainerLeft;
