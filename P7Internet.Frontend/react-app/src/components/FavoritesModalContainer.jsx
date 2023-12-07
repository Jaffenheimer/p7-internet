import React, { useState, useEffect } from "react";
import cross from "../data/cross.svg";
import { useDispatch, useSelector } from "react-redux";
import { pageActions } from "../features/pageSlice";
import { recipeActions } from "../features/recipeSlice";
import { userActions } from "../features/userSlice";
import Pages from "../objects/Pages";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { nanoid } from "@reduxjs/toolkit";
import {
  useUserDeleteFavoriteRecipeMutation,
  useUserPostFavoriteRecipeMutation,
  useUserGetAllFavoriteRecipesMutation,
} from "../services/usersEndpoints";
import {
  retriveCookie,
  getCookieUserId,
  getCookieSessionToken,
} from "../helperFunctions/cookieHandler";
import Recipe from "../objects/Recipe";

const FavoritesModalContainer = () => {
  const [userDeleteFavoriteRecipe, { isDeleteFavoriteRecipeLoading }] =
    useUserDeleteFavoriteRecipeMutation();
  const [userPostFavoriteRecipe, { isPostFavoriteRecipeLoading }] =
    useUserPostFavoriteRecipeMutation();
  const [userGetAllFavoriteRecipes, { isGetAllFavoriteRecipesLoading }] =
    useUserGetAllFavoriteRecipesMutation();

  const recipes = useSelector((state) => state.recipe.recipes);
  const favoriteRecipes = useSelector((state) => state.user.favoriteRecipes); //useState([]);

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

  async function handleRemove(_, recipe) {
    if (
      window.confirm(
        `Er du sikker på du gerne vil fjerne ${recipe.title} fra dine favoritter`
      )
    )
      try {
        await userDeleteFavoriteRecipe({
          userId: encodeURIComponent(retriveCookie("userid=")),
          sessionToken: encodeURIComponent(retriveCookie("sessionToken=")),
          recipeId: encodeURIComponent(recipe.id),
        });
        dispatch(
          userActions.setFavoriteRecipes(
            favoriteRecipes.filter((favoriteRecipe) => {
              return favoriteRecipe.id !== recipe.id;
            })
          )
        );
        // setIsMarkedAsFavorite(false);
      } catch (error) {
        console.log(error);
      }

    // dispatch(userActions.removeFavoriteRecipe(recipe));
    //database call
    // try {
    //   let response = await userDeleteFavoriteRecipe({
    //     userId: encodeURIComponent(userId),
    //     sessionToken: encodeURIComponent(sessionToken),
    //     recipeId: encodeURIComponent(recipe.id),
    //   });
    //   if (response.error.originalStatus === 200) {
    //     toast.success("Verifikationskoden er sendt til din email");
    //   }
    // } catch (error) {
    //   console.log(error);
    // }
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
