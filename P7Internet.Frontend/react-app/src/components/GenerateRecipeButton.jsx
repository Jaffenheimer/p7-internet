import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { pageActions } from "../features/pageSlice";
import Pages from "../objects/Pages";
import { toast } from "react-toastify";
import { getGeoLocation } from "../helperFunctions/getGeoLocation";
import recipeBodyCreator from "../helperFunctions/recipeBodyCreator";

const GenerateRecipeButton = () => {
  const dispatch = useDispatch();
  const ingredients = useSelector(
    (state) => state.recipeGeneration.ownedIngredients
  );
  const recipeGenData = useSelector((state) => state.recipeGeneration);


  //Selector for finde out wheater or not the user is login
  const loggedIn = useSelector((state) => state.user.loggedIn);
  
  getGeoLocation();

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

    //Create body for request
    recipeBodyCreator(loggedIn, recipeGenData);

    goToPageFullRecipeSelection();
  }

  return <button onClick={handleOnClick}>Generer opskrifter</button>;
};

export default GenerateRecipeButton;
