import React, { useEffect } from "react";
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
  useUserGetAllFavoriteRecipesMutation,
} from "../services/usersEndpoints";
import {
  getCookieUserId,
  getCookieSessionToken,
} from "../helperFunctions/cookieHandler";
import recipeFromResponse from "../helperFunctions/recipeFromResponse";

const FavoritesModalContainer = ({ closeModal }) => {
  //States used to fetch data from backend
  const [userDeleteFavoriteRecipe] = useUserDeleteFavoriteRecipeMutation();
  const [userGetAllFavoriteRecipes] = useUserGetAllFavoriteRecipesMutation();

  const favoriteRecipes = useSelector((state) => state.user.favoriteRecipes); //useState([]);

  const getFavoriteRecipes = async () => {
    try {
      const userId = getCookieUserId();
      const sessionToken = getCookieSessionToken();
      let response = await userGetAllFavoriteRecipes({
        userId: userId,
        sessionToken: sessionToken,
      }).unwrap();
      const recipes = [];

      for (const favoriteRecipe of response) {
        recipes.push(recipeFromResponse(favoriteRecipe));
      }
      dispatch(userActions.setFavoriteRecipes(recipes));
    } catch (error) {
      if (error.originalStatus === 401) {
        closeModal();
        toast.error(
          "Din session er udløbet. Log ind igen for at se dine favorit opskrifter "
        );
        dispatch(userActions.logoutUser());
        return;
      } else if (error.originalStatus === 500)
        //if no recipes are found, set favoriteRecipes to empty array
        dispatch(userActions.setFavoriteRecipes([]));
    }
  };
  useEffect(() => {
    getFavoriteRecipes(); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); //ensures useeffect is only called once
  const dispatch = useDispatch();

  function selectRecipe(event, selectedRecipe) {
    event.preventDefault();

    dispatch(recipeActions.setRecipeToShow(selectedRecipe));
    dispatch(pageActions.closeFavoritesModal());
    dispatch(pageActions.goToPage(Pages.fullRecipeViewNoBackButton));
  }

  async function handleRemove(_, recipe) {
    if (
      window.confirm(
        `Er du sikker på du gerne vil fjerne ${recipe.title} fra dine favoritter`
      )
    )
      try {
        await userDeleteFavoriteRecipe({
          userId: getCookieUserId(),
          sessionToken: getCookieSessionToken(),
          recipeId: recipe.id,
        });
        dispatch(
          userActions.setFavoriteRecipes(
            favoriteRecipes.filter((favoriteRecipe) => {
              return favoriteRecipe.id !== recipe.id;
            })
          )
        );
      } catch (error) {
        console.log(error);
      }
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
