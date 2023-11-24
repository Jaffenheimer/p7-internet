import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { pageActions } from "../features/pageSlice";
import Pages from "../objects/Pages";
import { toast } from "react-toastify";
import { getGeoLocation } from "../helperFunctions/getGeoLocation";
import recipeBodyCreator from "../helperFunctions/recipeBodyCreator";
import { recipeActions } from "../features/recipeSlice";
import { useGenerateUserRecipeMutation, useGenerateRecipeMutation } from "../services/recipeEndpoints";


//import data from "../testdata/testrescipes.json";
import recipeFromResponse from "../helperFunctions/recipeFromResponse";

const GenerateRecipesButton = () => {
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

  const [generateUserRecipe, { isLoading: isRecipeUserLoading }] =
    useGenerateUserRecipeMutation();
  const [generateRecipe, { isLoading: isRecipeLoading, error: generateError }] =
  useGenerateRecipeMutation();
  let response;

  const fetchRecipe = async (body) => {
    console.log("Body som bliver sendt med");
    console.log(body);

    if (!isRecipeUserLoading || !isRecipeLoading) {
      try {
        // Waits for the response and allows to use response (unwrap, because JSON)
        toast.loading("Laver en opskrift med de valgte");
        if (loggedIn) {
          response = await generateUserRecipe(body).unwrap();
        } else {
          response = await generateRecipe(body).unwrap();
        }

        if (response) {
          console.log(response);

          for (let i = 0; i < response.length; i++){
            const recipe = response[i];
            var recipeString = recipeFromResponse(recipe.recipes);
            console.log("recipe: ", recipeString);
            dispatch(
              recipeActions.addRecipes({
                recipeId: recipe.recipeId,
                recipe: recipeString,
                ingredients: recipe.ingredients,
              })
            );
          }

          toast.success("Opskrifter oprettet");
        }
      } catch (error) {
        console.log("Fejl fra request");
        console.log(error);
        console.log(generateError); 
        toast.error("Kunne ikke lave en opskrift");
      }
    }
  };

  const test = (response) => {
    for (let i = 0; i < response.length; i++){
      const recipe = response[i];
      var recipeString = recipeFromResponse(recipe.recipes);
      console.log("recipe: ", recipeString);
      dispatch(
        recipeActions.addRecipes({
          recipeId: recipe.recipeId,
          recipe: recipeString,
          ingredients: recipe.ingredients,
        })
      );
    }
  }

  //handles all the logic for when the button is clicked
  const handleOnClick = async () => {
    if (ingredients.length === 0) {
      toast.error(
        "Du skal tilføje mindst 1 ingrediens for at generere opskrifter"
      );
      return;
    }

    //Create body for request
    const body = recipeBodyCreator(loggedIn, recipeGenData);

    console.log(body);

    //test(data); 

    await fetchRecipe(body);

    goToPageFullRecipeSelection();
  };

  return (
    <button onClick={handleOnClick} data-testid="GenerateRecipesButton">
      Generer opskrifter
    </button>
  );
};

export default GenerateRecipesButton;
