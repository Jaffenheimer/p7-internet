import React from "react";
import leftArrow from "../data/leftArrow.svg";
import rightArrow from "../data/rightArrow.svg";
import { useDispatch, useSelector } from "react-redux";
import { recipeActions } from "../features/recipeSlice";

const SelectArrows = () => {
  const dispatch = useDispatch();
  const currentRecipeIndex = useSelector(
    (state) => state.recipe.currentRecipeIndex
  );

  const numOfRecipes = useSelector((state) => state.recipe.recipes?.length);

  function handleKeyPress(event) {
    if (event.key === "ArrowLeft") clickLeft();
    else if (event.key === "ArrowRight") clickRight();
  }

  function clickLeft() {
    if (currentRecipeIndex === 0)
      dispatch(recipeActions.setCurrentRecipeIndex(numOfRecipes - 1));
    else dispatch(recipeActions.setCurrentRecipeIndex(currentRecipeIndex - 1));
  }

  function clickRight() {
    if (currentRecipeIndex === numOfRecipes - 1)
      dispatch(recipeActions.setCurrentRecipeIndex(0));
    else dispatch(recipeActions.setCurrentRecipeIndex(currentRecipeIndex + 1));
  }

  return (
    <div
      id="SelectArrows"
      data-testid="SelectArrows"
      onKeyDown={handleKeyPress}
      tabIndex="0"
    >
      <img
        src={leftArrow}
        alt="Left Arrow"
        onClick={clickLeft}
        data-testid="selectArrowLeft"
      />
      <img
        src={rightArrow}
        alt="right Arrow"
        onClick={clickRight}
        data-testid="selectArrowRight"
      />
    </div>
  );
};

export default SelectArrows;
