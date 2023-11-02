import React from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { pageActions } from "../features/pageSlice";
import Pages from "../objects/Pages";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const GenerateRecipeButton = () => {
  const dispatch = useDispatch();
  const ingredients = useSelector(
    (state) => state.recipeGeneration.ownedIngredients
  );
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
    GenerateRecipesHandler();
    goToPageFullRecipeSelection();
  }

  //insert comment about what the function does here
  const GenerateRecipesHandler = async () => {
    const req = "Create 3 short and simple recipes for 4 people";

    try {
      const response = await axios.post(
        "/public/sample/testrecipes",
        req,
        {
          params: {
            req,
          },
        },
        {
          "Access-Control-Allow-Origin": "*",
        }
      );
      console.log(response.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  return <button onClick={handleOnClick}>Generer opskrifter</button>;
};

export const getGeoLocation = () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((pos) => {
            localStorage.setItem(
                "geolocation",
                JSON.stringify({
                    lat: pos.coords.latitude,
                    lon: pos.coords.longitude,
                    acc: pos.coords.accuracy,
                })
            );
        });
    } else toast.error("Geolokation understøttes ikke af din browser");
}

export default GenerateRecipeButton;
