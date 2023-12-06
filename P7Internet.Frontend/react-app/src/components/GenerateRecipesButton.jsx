import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { pageActions } from "../features/pageSlice";
import Pages from "../objects/Pages";
import { toast } from "react-toastify";
import { recipeActions } from "../features/recipeSlice";
import { defaultRecipes } from "../objects/DefaultRecipes";
import { useGenerateUserRecipeMutation } from "../services/recipeEndpoint";
import Recipe from "../objects/Recipe";

const GenerateRecipesButton = () => {
  const [generateUserRecipe, { isGenerateUserRecipeLoading }] =
    useGenerateUserRecipeMutation();
  const dispatch = useDispatch();
  const ingredients = useSelector(
    (state) => state.recipeGeneration.ownedIngredients
  );

  function goToPageFullRecipeSelection() {
    dispatch(pageActions.goToPage(Pages.RecipeSelection));
  }

  //handles all the logic for when the button is clicked
  async function handleOnClick() {
    if (ingredients.length === 0) {
      toast.error(
        "Du skal tilføje mindst 1 ingrediens for at generere opskrifter"
      );
      return;
    }
    //for testing purposes to ensure we have recipes on next page:
    const body = {
      userId: "14decab6-b035-4114-8596-9063da45e0f3",
      sessionToken: "47HZd8n3QkGmLFwn/pduDQ==",
      ingredients: ["agurk"],
      amount: 1,
      amountOfPeople: 4,
      excludedIngredients: [],
      dietaryRestrictions: [],
    };
    try {
      let response = await generateUserRecipe(body);
      console.log(response);
      // if (response.error.originalStatus === 200) {
      //   toast.success("Verifikationskoden er sendt til din email");
      // }
      const recipes = [
        new Recipe("Agurk", ["Agurk"], ["metode 1"], response.data[0].recipeId),
      ];
      dispatch(recipeActions.addRecipes(recipes));
    } catch (error) {
      console.log(error);
    }

    // dispatch(recipeActions.addRecipes(defaultRecipes));

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
