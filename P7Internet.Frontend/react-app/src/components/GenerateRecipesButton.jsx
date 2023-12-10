import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { pageActions } from "../features/pageSlice";
import Pages from "../objects/Pages";
import { toast } from "react-toastify";
import { recipeActions } from "../features/recipeSlice";
import recipeBodyCreator from "../helperFunctions/recipeBodyCreator";
import {
  useGenerateRecipeMutation,
  useGenerateUserRecipeMutation,
} from "../services/recipeEndpoints";
import Recipe from "../objects/Recipe";
import { userActions } from "../features/userSlice";

const GenerateRecipesButton = () => {
  const dispatch = useDispatch();
  const ingredients = useSelector(
    (state) => state.recipeGeneration.ownedIngredients
  );

  //States used to fetch data from backend
  const [generateUserRecipe, { isLoading: isRecipeUserLoading }] =
    useGenerateUserRecipeMutation();
  const [generateRecipe, { isLoading: isRecipeLoading }] =
    useGenerateRecipeMutation();

  const recipeGenData = useSelector((state) => state.recipeGeneration);
  const loggedIn = useSelector((state) => state.user.loggedIn);

  function goToPageFullRecipeSelection() {
    dispatch(pageActions.goToPage(Pages.RecipeSelection));
  }

  async function fetchRecipes(body) {
    var response;
    try {
      if (!isRecipeLoading || !isRecipeUserLoading) {
        toast.loading("Generer Opskrifter", {
          toastId: "generateRecipesToast",
        });
        if (loggedIn) {
          response = await generateUserRecipe(body).unwrap();
        } else {
          response = await generateRecipe(body).unwrap();
        }

        if (response) {
          let i = 0;
          dispatch(recipeActions.clearRecipes());
          response.forEach((recipe) => {
            // Convert recipe from response into recipe object
            // var recipeObject = recipeFromResponse(recipe);
            const newRecipe = new Recipe(
              recipe.recipeId,
              i,
              ["ingredienser"],
              ["metoder"],
              ["ingredienser"]
            );
            i++;
            dispatch(recipeActions.addRecipe(newRecipe));
          });
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  //handles all the logic for when the button is clicked
  async function handleOnClick() {
    if (ingredients.length === 0) {
      toast.error(
        "Du skal tilføje mindst 1 ingrediens for at generere opskrifter"
      );
      return;
    }

    try {
      //Create Body for request
      const body = recipeBodyCreator(loggedIn, recipeGenData);
      //Runs function to request recipes from backend
      await fetchRecipes(body);
    } catch (error) {
      if (error.originalStatus === 401) {
        toast.dismiss("generateRecipesToast");
        toast.error("Din session er udløbet.");
        dispatch(userActions.logoutUser());
        return;
      }
    }
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
