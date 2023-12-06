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
  retriveCookie,
  getCookieUserId,
  getCookieSessionToken,
} from "../helperFunctions/cookieHandler";
import { toast } from "react-toastify";
import Recipe from "../objects/Recipe";

const RecipeTitle = ({ recipe }) => {
  const [userDeleteFavoriteRecipe] = useUserDeleteFavoriteRecipeMutation();
  const [userPostFavoriteRecipe] = useUserPostFavoriteRecipeMutation();
  const [userGetAllFavoriteRecipes] = useUserGetAllFavoriteRecipesMutation();

  const dispatch = useDispatch();
  const loggedIn = useSelector((state) => state.user.loggedIn);
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);

  useEffect(() => {
    const getFavoriteRecipes = async () => {
      try {
        const userId = getCookieUserId();
        const sessionToken = getCookieSessionToken();
        let response = await userGetAllFavoriteRecipes({
          userId: encodeURIComponent(userId),
          sessionToken: encodeURIComponent(sessionToken),
        }).unwrap();
        console.log("response", response);
        const recipes = [];
        for (const favoriteRecipe of response) {
          recipes.push(
            new Recipe(
              "Agurk",
              favoriteRecipe.ingredients,
              ["metode 1"],
              favoriteRecipe.recipeId
            )
          );
        }
        setFavoriteRecipes(recipes);
        // console.log(response);

        // if (response.error.originalStatus === 200) {
        //   setFavoriteRecipes(response.data);
        // }
        // if (response.error.originalStatus === 401) {
        //   toast.error(
        //     "Din session er udløbet. Log ind igen for at se din historik"
        //   );
        // }
        // if (response.error.originalStatus === 404) {
        // } // use default value of empty string, since no history is found
      } catch (error) {
        //AF EN ELLER ANDED GRUND DUKKER DER STADIG EN ERROR OP I CONSOLEN, NÅR DER IKKE ER NOGEN FAVORITRECIPE
        if (error.originalStatus === 500)
          //if no recipes are found, set favoriteRecipes to empty array
          setFavoriteRecipes([]);
        else console.log(error);
      }
    };

    getFavoriteRecipes();
  }, []);

  const [isMarkedAsFavorite, setIsMarkedAsFavorite] = useState(false);
  useEffect(() => {
    for (const favoriteRecipe of favoriteRecipes) {
      if (favoriteRecipe.id === recipe.id) {
        setIsMarkedAsFavorite(true);
      }
    }
  });

  async function addFavoriteRecipe() {
    console.log(recipe);
    dispatch(userActions.addFavoriteRecipe(recipe));

    try {
      let response = await userPostFavoriteRecipe({
        userId: encodeURIComponent(retriveCookie("userid=")),
        sessionToken: encodeURIComponent(retriveCookie("sessionToken=")),
        recipeId: encodeURIComponent(recipe.id),
      });
      setIsMarkedAsFavorite(true);
    } catch (error) {
      console.log(error);
    }
  }

  async function deleteFavoriteRecipe() {
    try {
      await userDeleteFavoriteRecipe({
        userId: encodeURIComponent(retriveCookie("userid=")),
        sessionToken: encodeURIComponent(retriveCookie("sessionToken=")),
        recipeId: encodeURIComponent(recipe.id),
      });
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
      </h1>
    </div>
  );
};

export default RecipeTitle;
