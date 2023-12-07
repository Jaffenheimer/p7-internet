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
  const favoriteRecipes = useSelector((state) => state.user.favoriteRecipes); //useState([]);

  useEffect(() => {
    const getFavoriteRecipes = async () => {
      try {
        const userId = getCookieUserId();
        const sessionToken = getCookieSessionToken();
        console.log(sessionToken);
        let response = await userGetAllFavoriteRecipes({
          userId: userId,
          sessionToken: sessionToken,
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
        dispatch(userActions.setFavoriteRecipes(recipes));
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
        console.log("the erorr;", error);
        if (error.originalStatus === 500)
          //if no recipes are found, set favoriteRecipes to empty array
          dispatch(userActions.setFavoriteRecipes([]));
        else console.log(error);
      }
    };

    getFavoriteRecipes();
  }, []);

  const [isMarkedAsFavorite, setIsMarkedAsFavorite] = useState(false);
  useEffect(() => {
    for (const favoriteRecipe of favoriteRecipes) {
      if (favoriteRecipe.id === recipe.id) {
        console.log("setting marked as favoirte");
        setIsMarkedAsFavorite(true);
      }
    }
  });

  async function addFavoriteRecipe() {
    console.log(recipe);
    console.log("recipeid", recipe.id);
    console.log("userid", getCookieUserId());
    console.log("sessiontoken", getCookieSessionToken());

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
        userId: retriveCookie("userid="),
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
      setIsMarkedAsFavorite(false);
    } catch (error) {
      console.log(error);
    }
  }

  async function handleClick(event) {
    console.log("isclicked");
    event.preventDefault();
    if (loggedIn === false) {
      dispatch(pageActions.openLoginModal());
    } else {
      if (isMarkedAsFavorite) {
        console.log("is marked as favorite");
        deleteFavoriteRecipe();
      } else {
        console.log("not marked as favorite");
        addFavoriteRecipe();
      }
    }
  }

  function SetHeartIconOnChange() {
    //component that dynamically changes heart icon when using arrows
    useEffect(() => {
      for (const favoriteRecipe of favoriteRecipes) {
        if (favoriteRecipe.id === recipe.id) {
          console.log("setting marked as favoirte");
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
        <SetHeartIconOnChange />
      </h1>
    </div>
  );
};

export default RecipeTitle;
