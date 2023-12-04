import React from "react";
import RecipeView from "./RecipeView";
import SelectArrows from "./SelectArrows";
import SelectRecipeButton from "./SelectRecipeButton";
import FrontPageButton from "./FrontPageButton";

const RecipeSelectionContainerLeft = () => {
  function enableArrowKeyPress() {
    document.getElementById("SelectArrows").focus();
  }

  return (
    <div className="RecipeSelectionContainerLeft" onClick={enableArrowKeyPress}>
      <RecipeView />
      <div style={{ position: "relative" }}>
        <SelectRecipeButton />
        <div id="BackToFrontPageButtonRecipeSelection">
          <FrontPageButton buttonText="Tilbage" />
        </div>
        <SelectArrows />
      </div>
    </div>
  );
};

export default RecipeSelectionContainerLeft;
