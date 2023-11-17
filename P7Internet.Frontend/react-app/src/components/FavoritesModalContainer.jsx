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

const FavoritesModalContainer = ({ closeModal }) => {
  const recipes = useSelector((state) => state.recipe.recipes);
  const loggedIn = useSelector((state) => state.user.loggedIn);
  const favoriteRecipesRedux = useSelector(
    (state) => state.user.favoriteRecipes
  );
  //if user is not logged in, favoriteRecipes is an empty list
  const favoriteRecipes = loggedIn === undefined ? [] : favoriteRecipesRedux;
  const dispatch = useDispatch();

  function selectRecipe(event, recipeTitle) {
    event.preventDefault();

    var recipeTitles = [];
    recipes.forEach((recipe) => recipeTitles.push(recipe["title"]));
    if (!recipeTitles.includes(recipeTitle)) {
      toast.error(
        `${recipeTitle} er ikke i listen af opskrifter på databasen. Prøv at vælge en anden opskrift.`
      );
    } else {
      dispatch(
        recipeActions.setCurrentRecipeIndex(recipeTitles.indexOf(recipeTitle))
      );
      dispatch(pageActions.goToPage(Pages.fullRecipeView));
      closeModal();
    }
  }

  function handleRemove(_, recipeTitle) {
    if (
      window.confirm(
        `Er du sikker på du gerne vil fjerne ${recipeTitle} fra dine favoritter`
      )
    )
      dispatch(userActions.removeRecipe(recipeTitle));
  }

  return (
    <div id="FavoritesModalContainer" data-testid="FavoritesModalContainer">
      <div className="scrollableModalContainer">
        {favoriteRecipes.length === 0 ? (
          <p>Ingen opskrifter er blevet markeret som favorit.</p>
        ) : (
          <>
            {favoriteRecipes.map((recipeTitle) => (
              <div className="FavoriteRecipeElement" key={nanoid()}>
                <button
                  className="FavoriteRecipeButton"
                  value={recipeTitle}
                  key={nanoid()}
                  onClick={(event) => selectRecipe(event, recipeTitle)}
                >
                  {recipeTitle}
                </button>
                <img
                  key={nanoid()}
                  data-testid="RemoveFavoriteRecipeCross"
                  className="RemoveFavoritedElement"
                  src={cross}
                  alt="cross"
                  onClick={(event) => handleRemove(event, recipeTitle)}
                />
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default FavoritesModalContainer;
