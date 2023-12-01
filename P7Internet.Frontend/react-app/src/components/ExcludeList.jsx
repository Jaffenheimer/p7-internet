import React from "react";
import { recipeGenerationActions } from "../features/recipeGenerationSlice";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import IngredientsList from "./IngredientsList";
import IngredientElement from "./IngredientElement";
import AddIngredientsForm from "./AddIngredientsForm";

const ExcludeList = () => {
  const dispatch = useDispatch();

  // Gets the list from the store
  const excludeList = useSelector(
    (state) => state.recipeGeneration.excludeList
  );

  //Function for handling the remove feature
  const handleRemove = (event, ingredient) => {
    event.preventDefault();
    dispatch(recipeGenerationActions.removeExcludedIngredient(ingredient.id));
  };

  //function for removing all elements from state
  function removeAllHandler() {
    dispatch(recipeGenerationActions.clearAllExcludedIngredients());
  }

  return (
    <div id="ExcludeList" data-testid="ExcludeList">
      <h3 id="ExcludeListText">Ekskluder ingredienser:</h3>
      <AddIngredientsForm
        addIngredient={recipeGenerationActions.addExcludedIngredient}
        ingredientsList={excludeList}
        removeAllHandler={removeAllHandler}
      />
      <div id="ExcludedIngredientsList">
        <IngredientsList
          ingredients={excludeList}
          ListElement={IngredientElement}
          handleRemove={handleRemove}
        />
      </div>
    </div>
  );
};

export default ExcludeList;
