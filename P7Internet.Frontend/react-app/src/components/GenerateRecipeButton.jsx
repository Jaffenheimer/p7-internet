import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { pageActions } from "../features/pageSlice";
import Pages from "../objects/Pages";
import { toast } from 'react-toastify';

const GenerateRecipeButton = () => {
  const dispatch = useDispatch();
  const ingredients = useSelector(
    (state) => state.recipeGeneration.ownedIngredients
  );
  getGeoLocation();

  const recipeGenData = useSelector((state) => state.recipeGeneration);

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
    goToPageFullRecipeSelection();
  }

  return <button onClick={handleOnClick}>Generer opskrifter</button>;
};

function getGeoLocation() {
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
