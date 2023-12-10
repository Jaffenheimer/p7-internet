import React, { useState } from "react";
import heartHollow from "../data/heart-hollow.svg";
import heartSolid from "../data/heart-solid.svg";
import { userActions } from "../features/userSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { pageActions } from "../features/pageSlice";
import {
  useUserDeleteFavoriteRecipeMutation,
  useUserPostFavoriteRecipeMutation,
  useUserGetAllFavoriteRecipesMutation,
} from "../services/usersEndpoints";
import {
  getCookieUserId,
  getCookieSessionToken,
} from "../helperFunctions/cookieHandler";
import Recipe from "../objects/Recipe";

const RecipeTitle = ({ recipe }) => {
  //States used to fetch data from backend
  const [userDeleteFavoriteRecipe] = useUserDeleteFavoriteRecipeMutation();
  const [userPostFavoriteRecipe] = useUserPostFavoriteRecipeMutation();
  const [userGetAllFavoriteRecipes] = useUserGetAllFavoriteRecipesMutation();

  const dispatch = useDispatch();
  const loggedIn = useSelector((state) => state.user.loggedIn);
  const favoriteRecipes = useSelector((state) => state.user.favoriteRecipes);

  useEffect(() => {
    async function getFavoriteRecipes() {
      try {
        const userId = getCookieUserId();
        const sessionToken = getCookieSessionToken();
        let response = await userGetAllFavoriteRecipes({
          userId: userId,
          sessionToken: sessionToken,
        }).unwrap();
        const recipes = [];
        for (const favoriteRecipe of response) {
          recipes.push(
            new Recipe(
              favoriteRecipe.recipeId,
              "Agurk", //favoriteRecipe.title,
              favoriteRecipe.ingredients,
              ["metode 1"], //favoriteRecipe.methods
              favoriteRecipe.ingredients
            )
          );
        }
        dispatch(userActions.setFavoriteRecipes(recipes));
      } catch (error) {
        if (error.originalStatus === 500)
          //if no recipes are found, set favoriteRecipes to empty array
          dispatch(userActions.setFavoriteRecipes([]));
        else console.log(error);
      }
    }
    getFavoriteRecipes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); //empty array ensures useeffect is only called once

  const [isMarkedAsFavorite, setIsMarkedAsFavorite] = useState(false);
  useEffect(() => {
    for (const favoriteRecipe of favoriteRecipes) {
      if (favoriteRecipe.id === recipe.id) {
        setIsMarkedAsFavorite(true);
      }
    }
  }, [favoriteRecipes, recipe.id]); // isMarkedAsFavorite only changes when favoriteRecipes changes

  async function addFavoriteRecipe() {
    try {
      await userPostFavoriteRecipe({
        userId: getCookieUserId(),
        sessionToken: getCookieSessionToken(),
        recipeId: recipe.id,
      });
      dispatch(userActions.addFavoriteRecipe(recipe));
      setIsMarkedAsFavorite(true);
    } catch (error) {
      console.log(error);
    }
  }

  async function deleteFavoriteRecipe() {
    try {
      await userDeleteFavoriteRecipe({
        userId: getCookieUserId(),
        sessionToken: getCookieSessionToken(),
        recipeId: recipe.id,
      });
      dispatch(userActions.removeFavoriteRecipe(recipe.id));
      setIsMarkedAsFavorite(false);
    } catch (error) {
      console.log(error);
    }
  }

  async function handleClick(event) {
    event.preventDefault();
    if (loggedIn === false) {
      dispatch(pageActions.openLoginModal());
    } else {
      if (isMarkedAsFavorite) {
        deleteFavoriteRecipe();
      } else {
        addFavoriteRecipe();
      }
    }
  }

  function SetHeartIconOnChange() {
    useEffect(() => {
      for (const favoriteRecipe of favoriteRecipes) {
        if (favoriteRecipe.id === recipe.id) {
          setIsMarkedAsFavorite(true);
          return;
        }
      }
      setIsMarkedAsFavorite(false);
    });
  }

  return (
    <div id="RecipeTitleDiv">
      <h1 id="RecipeTitle">
        {recipe.title}
        <img
          data-testid="heartImage"
          src={isMarkedAsFavorite ? heartSolid : heartHollow}
          alt="heart"
          className="no-print"
          onClick={handleClick}
        />
        {/* component that dynamically changes heart icon when using arrows */}
        <SetHeartIconOnChange />
      </h1>
    </div>
  );
};

export default RecipeTitle;
