import React from "react";
import RecipeView from "./RecipeView";
import SelectArrows from "./SelectArrows";
import SelectRecipeButton from "./SelectRecipeButton";
import { useDispatch } from "react-redux";
import { pageActions } from "../features/pageSlice";
import Pages from "../objects/Pages";

const RecipeSelectionContainerLeft = () => {
  function enableArrowKeyPress() {
    document.getElementById("SelectArrows").focus();
  }

  const dispatch = useDispatch();

  function goToPageFrontPage() {
    dispatch(pageActions.goToPage(Pages.frontPage));
  }
  return (
    <div className="RecipeSelectionContainerLeft" onClick={enableArrowKeyPress}>
      <RecipeView />
      <div style={{ position: "relative" }}>
        <SelectRecipeButton />
        <SelectArrows />
        <button id="BackButton" onClick={goToPageFrontPage}>
          Tilbage
        </button>
      </div>
    </div>
  );
};

export default RecipeSelectionContainerLeft;
