import React, { useState } from "react";
import heartHollow from "../data/heart-hollow.svg";
import heartSolid from "../data/heart-solid.svg";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../features/userSlice";
import { useEffect } from "react";
import { pageActions } from "../features/pageSlice";

const RecipeTitle = ({ recipeId, recipeTitle }) => {
  const dispatch = useDispatch();
  const loggedIn = useSelector((state) => state.user.loggedIn);
  const favoriteRecipes = useSelector((state) => state.user.favoriteRecipes);
  const [heart, setHeart] = useState(heartHollow);

  function handleClick(event) {
    event.preventDefault();
    if (loggedIn === false) {
      dispatch(pageActions.openLoginModal());
    } else {
      if (heart === heartSolid) {
        setHeart(heartHollow);
        dispatch(userActions.removeRecipe(recipeId));
      } else {
        setHeart(heartSolid);
        dispatch(userActions.addRecipe(recipeId));
      }
    }
  }

  function SetHeartIconOnChange() {
    //component that dynamically changes heart icon when using arrows
    useEffect(() => {
      if (favoriteRecipes !== undefined) {
        if (favoriteRecipes.includes(recipeId)) {
          setHeart(heartSolid);
        } else {
          setHeart(heartHollow);
        }
      }
    });
  }

  return (
    <div id="RecipeTitleDiv">
      <h1 id="RecipeTitle">
        {recipeTitle}
        <img
          src={heart}
          alt="heart"
          className="no-print"
          onClick={handleClick}
        />
        <SetHeartIconOnChange /> {/* dynamically updates the heart icon*/}
      </h1>
    </div>
  );
};

export default RecipeTitle;
