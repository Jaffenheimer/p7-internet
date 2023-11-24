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

  const favoriteRecipesobject = () => {
    var recipeTitles = [];
    recipes.forEach((recipe) => {
      favoriteRecipesRedux.forEach((frecipe) => {
        if(frecipe === recipe.recipeId){
          recipeTitles.push(recipe);
        }
      })
    });
    return recipeTitles;
  }

  //if user is not logged in, favoriteRecipes is an empty list
  const favoriteRecipes = loggedIn === undefined ? [] : favoriteRecipesobject();

  const dispatch = useDispatch();

  function selectRecipe(event, recipeTitle) {
    event.preventDefault();

    var recipeTitles = [];
    recipes.forEach((recipe) => recipeTitles.push(recipe.recipeId));

    if (!recipeTitles.includes(recipeTitle.recipeId)) {
      toast.error(
        `${recipeTitle} er ikke i listen af opskrifter på databasen. Prøv at vælge en anden opskrift.`
      );
    } else {
      dispatch(
        recipeActions.setCurrentRecipeIndex(recipeTitles.indexOf(recipeTitle.recipeId))
      );
      dispatch(pageActions.goToPage(Pages.fullRecipeView));
//      closeModal();
    }      
  }

  function handleRemove(_, recipeTitle) {
    if (
      window.confirm(
        `Er du sikker på du gerne vil fjerne ${recipeTitle.recipe.title} fra dine favoritter`
      )
    )
      dispatch(userActions.removeRecipe(recipeTitle.recipeId));
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
                  value={recipeTitle.recipe.title}
                  key={nanoid()}
                  onClick={(event) => selectRecipe(event, recipeTitle)}
                >
                  {recipeTitle.recipe.title}
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
