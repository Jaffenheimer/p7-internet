import React from "react";
import cross from "../data/cross.svg";
import { useDispatch } from "react-redux";
import { pageActions } from "../features/pageSlice";
import { recipeActions } from "../features/recipeSlice";
import { userActions } from "../features/userSlice";
import { useSelector } from "react-redux";
import Pages from "../objects/Pages";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { nanoid } from "@reduxjs/toolkit";

const FavoritesModalContainer = () => {
  const recipes = useSelector((state) => state.recipe.recipes);
  const loggedIn = useSelector((state) => state.user.loggedIn);
  const favoriteRecipesRedux = useSelector(
    (state) => state.user.favoriteRecipes
  );
  //if user is not logged in, favoriteRecipes is an empty list
  const favoriteRecipes = loggedIn === undefined ? [] : favoriteRecipesRedux;
  const dispatch = useDispatch();

  function selectRecipe(event, selectedRecipe) {
    event.preventDefault();

    var recipeTitles = [];
    recipes.forEach((recipe) => recipeTitles.push(recipe["title"]));
    if (!recipeTitles.includes(selectedRecipe.title)) {
      toast.error(
        `${selectedRecipe.title} er ikke i listen af opskrifter på databasen. Prøv at vælge en anden opskrift.`
      );
    } else {
      dispatch(
        recipeActions.setCurrentRecipeIndex(
          recipeTitles.indexOf(selectedRecipe.title)
        )
      );
      dispatch(pageActions.goToPage(Pages.fullRecipeViewNoBackButton));
      dispatch(recipeActions.setRecipeToShow(selectedRecipe));
      dispatch(pageActions.closeFavoritesModal());
    }
  }

  function handleRemove(_, recipe) {
    if (
      window.confirm(
        `Er du sikker på du gerne vil fjerne ${recipe.title} fra dine favoritter`
      )
    )
      dispatch(userActions.removeFavoriteRecipe(recipe));
  }

  return (
    <div
      className="scrollableModalContainer"
      data-testid="FavoritesModalContainer"
    >
      {favoriteRecipes.length === 0 ? (
        <p>Ingen opskrifter er blevet markeret som favorit.</p>
      ) : (
        <>
          {favoriteRecipes.map((recipe) => (
            <div className="FavoriteRecipeElement" key={nanoid()}>
              <button
                className="FavoriteRecipeButton"
                value={recipe.title}
                key={nanoid()}
                onClick={(event) => selectRecipe(event, recipe)}
              >
                {recipe.title}
              </button>
              <img
                key={nanoid()}
                data-testid="RemoveFavoriteRecipeCross"
                className="RemoveFavoritedElement"
                src={cross}
                alt="cross"
                onClick={(event) => handleRemove(event, recipe)}
              />
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default FavoritesModalContainer;
