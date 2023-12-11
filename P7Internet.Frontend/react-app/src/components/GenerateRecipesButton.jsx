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
import { userActions } from "../features/userSlice";
import recipeFromResponse from "../helperFunctions/recipeFromResponse";

const GenerateRecipesButton = () => {
  const dispatch = useDispatch();
  const [isDisabled, setIsDisabled] = React.useState(false);
  const ingredients = useSelector(
    (state) => state.recipeGeneration.ownedIngredients
  );

  //Creates functions from Mutations from the recipeEndpoints
  const [generateUserRecipe, { isLoading: isRecipeUserLoading }] =
    useGenerateUserRecipeMutation();
  const [generateRecipe, { isLoading: isRecipeLoading }] =
    useGenerateRecipeMutation();

  //Id to toast
  var toastId;

  //Collects the data from store
  const recipeGenData = useSelector((state) => state.recipeGeneration);
  const loggedIn = useSelector((state) => state.user.loggedIn);

  function goToPageFullRecipeSelection() {
    dispatch(pageActions.goToPage(Pages.RecipeSelection));
  }

  //Async function to fetch recipes from backend
  async function fetchRecipes(body) {
    var response;
    const recipes = [];

    if (!isRecipeLoading && !isRecipeUserLoading) {
      try {
        setIsDisabled(true);
        toastId = toast.loading("Generer Opskrifter", {
          toastId: "generateRecipesToast",
        });

        //Checks if user is login
        if (loggedIn) {
          response = await generateUserRecipe(body).unwrap();
        } else {
          response = await generateRecipe(body).unwrap();
        }

        //If these was an response then create recipes object from the response
        if (response) {
          response.forEach((recipe) => {
            //Convert recipe from response into recipe object
            var recipeObject = recipeFromResponse(recipe);
            recipes.push(recipeObject);
          });

          // If there are recipes on in array then add to the store
          if (recipes.length !== 0) {
            //Clearing recipes from store
            dispatch(recipeActions.clearRecipes());

            //Adds new recipes to store
            dispatch(recipeActions.addRecipes(recipes));

            return true;
          } else {
            //Updates toast
            toast.update(toastId, {
              render: "Fejl under generation, Prøv igen",
              type: "error",
              isLoading: false,
              autoClose: 5000,
            });
          }
        }
      } catch (error) {
        if (error.originalStatus === 401) {
          toast.dismiss("generateRecipesToast");
          toast.warning("Din session er udløbet.");
          dispatch(userActions.logoutUser());
          return;
        }
        console.log(error);
        toast.update(toastId, {
          render: "Fejl under generation, Prøv igen",
          type: "error",
          isLoading: false,
          autoClose: 5000,
        });
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

    //Runs function to request recipes from backend -> openAi/Database
    var succeed = await fetchRecipes(body);

    //Checks if the fetch succeded. If succeded then it goes to next page
    if (succeed) {
      toast.update(toastId, {
        render: "Generation færdig",
        type: "success",
        isLoading: false,
        autoClose: 5000,
      });
      goToPageFullRecipeSelection();
    }
    setIsDisabled(false);
  }

  return (
    <button
      onClick={handleOnClick}
      id="GenerateRecipesButton"
      data-testid="GenerateRecipesButton"
      disabled={isDisabled}
    >
      Generer opskrifter
    </button>
  );
};

export default GenerateRecipesButton;
