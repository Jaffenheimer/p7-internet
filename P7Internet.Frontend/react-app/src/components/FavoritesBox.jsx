import React from "react";
import cross from "../data/cross.svg";
import { useDispatch, useSelector } from "react-redux";
import { pageActions } from "../features/pageSlice";
import { recipeActions } from "../features/recipeSlice";
import { userActions } from "../features/userSlice";
import Pages from "../objects/Pages";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { nanoid } from "@reduxjs/toolkit";

const FavoritesBox = ({ closeModal, favoriteRecipes, recipes }) => {
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
        `Are you sure you want to remove ${recipeTitle} as favorite recipe`
      )
    )
      dispatch(userActions.removeRecipe(recipeTitle));
  }

  return (
    <>
      <div className="imgcontainer" key={nanoid()}>
        <h3>
          Favoritter
          <img
            data-testid="CloseModalCross"
            src={cross}
            alt="Back Cross"
            id="loginCross"
            onClick={closeModal}
          />
        </h3>
      </div>
      <div className="favoriteRecipesContainer">
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
    </>
  );
};

export default FavoritesBox;
