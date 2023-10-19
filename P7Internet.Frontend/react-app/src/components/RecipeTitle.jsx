import React, { useState } from "react";
import heartHollow from "../data/heart-hollow.svg";
import heartSolid from "../data/heart-solid.svg";
import { useDispatch, useSelector } from "react-redux";
import { recipeActions } from "../features/recipeSlice";

const RecipeTitle = ({ title }) => {
  const [heart, setHeart] = useState(heartHollow);
  const dispatch = useDispatch();
  const heartedRecipeTitles = useSelector((state) => state.recipe.heartedRecipeTitles);

  function handleClick(event) {
    event.preventDefault();

    if (heart === heartSolid) {
      setHeart(heartHollow)
      dispatch(recipeActions.removeHeartedRecipeTitles(title))
    }
    else {
      setHeart(heartSolid)
      dispatch(recipeActions.addHeartedRecipeTitles(title))
    }
  }

  function SetHeartIconOnChange(){ //component that dynamically changes heart icon when using arrows
    if (heartedRecipeTitles.includes(title)){
      setHeart(heartSolid)
    }
    else{
      setHeart(heartHollow)
    }
  }

  return (
    <div id="RecipeTitleDiv">
      <h1 id="RecipeTitle">
        {title}
        <img src={heart} alt="heart" onClick={handleClick} />
        <SetHeartIconOnChange/> {/* dynamically updates the heart icon*/}
      </h1>
    </div>
  );
};

export default RecipeTitle;
