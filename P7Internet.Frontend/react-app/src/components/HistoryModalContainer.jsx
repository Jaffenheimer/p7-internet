import React from "react";
import { useDispatch } from "react-redux";
import { pageActions } from "../features/pageSlice";
import { recipeActions } from "../features/recipeSlice";
import { useSelector } from "react-redux";
import Pages from "../objects/Pages";
import "react-toastify/dist/ReactToastify.css";
import { nanoid } from "@reduxjs/toolkit";

const HistoryModalContainer = () => {
  const dispatch = useDispatch();
  const recipesInHistory = useSelector((state) => state.user.recipesInHistory);
  const recipes = useSelector((state) => state.recipe.recipes);

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
