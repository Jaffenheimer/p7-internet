import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { pageActions } from "../features/pageSlice";
import { recipeActions } from "../features/recipeSlice";
import { userActions } from "../features/userSlice";
import { useSelector } from "react-redux";
import {
  getCookieUserId,
  getCookieSessionToken,
} from "../helperFunctions/cookieHandler";
import Pages from "../objects/Pages";
import "react-toastify/dist/ReactToastify.css";
import { nanoid } from "@reduxjs/toolkit";
import { useUserGetRecipesInHistoryMutation } from "../services/usersEndpoints";
import Recipe from "../objects/Recipe";
import { toast } from "react-toastify";

const HistoryModalContainer = ({ closeModal }) => {
  //States used to fetch data from backend
  const [userGetRecipesInHistory] = useUserGetRecipesInHistoryMutation();

  const dispatch = useDispatch();
  const recipes = useSelector((state) => state.recipe.recipes);

  const recipesInHistory = useSelector((state) => state.user.recipesInHistory);

  const getRecipesInHistory = async () => {
    try {
      const userId = getCookieUserId();
      const sessionToken = getCookieSessionToken();
      let response = await userGetRecipesInHistory({
        userId: userId,
        sessionToken: sessionToken,
      }).unwrap();
      const recipes = [];
      let i = 0;
      for (const recipeInHistory of response) {
        recipes.push(
          new Recipe(
            recipeInHistory.recipeId,
            i++, //recipeInHistory.title,
            recipeInHistory.ingredients,
            ["metode 1"], //recipeInHistory.methods,
            recipeInHistory.ingredients
          )
        );
      }
      dispatch(userActions.setHistory(recipes));
    } catch (error) {
      if (error.originalStatus === 500)
        //if no recipes are found, set favoriteRecipes to empty array
        dispatch(userActions.setHistory([]));
      else if (error.originalStatus === 401) {
        closeModal();
        toast.error(
          "Din session er udløbet. Log ind igen for at se din historik"
        );
        dispatch(userActions.logoutUser());
        return;
      } else console.log(error);
    }
  };

  useEffect(() => {
    getRecipesInHistory(); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); //ensures useeffect is only called once

  function selectRecipe(event, recipe) {
    event.preventDefault();
    var recipeTitles = [];
    recipes.forEach((recipe) => recipeTitles.push(recipe["title"]));
    dispatch(
      recipeActions.setCurrentRecipeIndex(recipeTitles.indexOf(recipe.title))
    );
    dispatch(recipeActions.setRecipeToShow(recipe));
    dispatch(pageActions.goToPage(Pages.fullRecipeViewNoBackButton));
    dispatch(pageActions.closeHistoryModal());
  }

  return (
    <div
      className="scrollableModalContainer"
      data-testid="HistoryModalContainer"
    >
      {recipesInHistory.length === 0 ? (
        <p>Din historik er tom</p>
      ) : (
        <>
          {recipesInHistory.map((recipe) => (
            <div className="HistoryRecipeElement" key={nanoid()}>
              <button
                className="HistoryRecipeButton"
                value={recipe.title}
                key={nanoid()}
                onClick={(event) => selectRecipe(event, recipe)}
              >
                {recipe.title}
              </button>
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default HistoryModalContainer;
