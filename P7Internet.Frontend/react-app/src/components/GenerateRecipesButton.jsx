import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { pageActions } from "../features/pageSlice";
import Pages from "../objects/Pages";
import { toast } from "react-toastify";
import { recipeActions } from "../features/recipeSlice";
//import { defaultRecipes } from "../objects/DefaultRecipes";
import recipeBodyCreator from "../helperFunctions/recipeBodyCreator";
import {
  useGenerateRecipeMutation,
  useGenerateUserRecipeMutation,
} from "../services/recipeEndpoints";
import recipeFromResponse from "../helperFunctions/recipeFromResponse";

const GenerateRecipesButton = () => {
  const dispatch = useDispatch();
  const ingredients = useSelector(
    (state) => state.recipeGeneration.ownedIngredients
  );

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
    const recepies = [];

    if (!isRecipeLoading || !isRecipeUserLoading) {
      try {
        toast.loading("Generer Opskrifter");

        if (loggedIn) {
          response = await generateUserRecipe(body).unwrap();
        } else {
          response = await generateRecipe(body).unwrap();
        }

        if (response) {
          response.forEach((recipe) => {
            //Convert recipe from response into recipe object
            var recipeObject = recipeFromResponse(recipe);
            recepies.push(recipeObject);
          });

          if (recepies.length !== 0) {
            dispatch(recipeActions.addRecipes(recepies));
            return true;
          } else {
            toast.error("Fejl ved generation");
          }

          
          
        }
      } catch (error) {
        console.log(error);
        toast.error("Fejl ved generation");
      }
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

    //Create Body for request
    const body = recipeBodyCreator(loggedIn, recipeGenData);

    //Runs function to request recipes from backend
    let succeed = await fetchRecipes(body);

    console.log("succeed: ", succeed);

    //for testing purposes to ensure we have recipes on next page:
    //dispatch(recipeActions.addRecipes(defaultRecipes));

    //Checks if
    if(succeed === true){
      goToPageFullRecipeSelection();
    }
    
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
