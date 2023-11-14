import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { pageActions } from "../features/pageSlice";
import Pages from "../objects/Pages";
import { toast } from "react-toastify";
import { getGeoLocation } from "../helperFunctions/getGeoLocation";
import recipeBodyCreator from "../helperFunctions/recipeBodyCreator";
import { useGenerateUserRecipeMutation } from "../services/recipeEndpoints";


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

  const [generateUserRecipe, { isLoading:isRecipeLoading, error:recipeError}] = useGenerateUserRecipeMutation();

  const fetchRecipe = async (body) => {
    console.log("Body som bliver sendt med"); 
    console.log(body);
    if (!isRecipeLoading) {
      try {
        // Waits for the response and allows to use response (unwrap, because JSON)
        const response = await generateUserRecipe(body);

        if (response) {
          console.log(response);
          toast.success("Opskrifter oprettet");
        }
      } catch (error) {
        console.log(error);
        console.log(recipeError);
        toast.error("Kunne ikke lave en opskrift", error);
      }
    } else if (isRecipeLoading) {
      toast.loading("Laver en opskrift med det valgte");
    }
  };

  //handles all the logic for when the button is clicked
  function handleOnClick() {
    if (ingredients.length === 0) {
      toast.error(
        "Du skal tilføje mindst 1 ingrediens for at generere opskrifter"
      );
      return;
    }

    //Create body for request
    const body = recipeBodyCreator(loggedIn, recipeGenData);
    fetchRecipe(body);

    goToPageFullRecipeSelection();
  }

  return <button onClick={handleOnClick}>Generer opskrifter</button>;
};

export default GenerateRecipeButton;
