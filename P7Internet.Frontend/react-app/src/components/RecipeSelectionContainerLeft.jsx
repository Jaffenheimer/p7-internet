import React from "react";
import RecipeView from "./RecipeView";
import SelectArrows from "./SelectArrows";
import SelectRecipeButton from "./SelectRecipeButton";

const RecipeSelectionContainerLeft = () => {
  function enableArrowKeyPress() {
    document.getElementById("SelectArrows").focus();
  }

  return (
    <div className="RecipeSelectionContainerLeft" onClick={enableArrowKeyPress}>
      <RecipeView />
      <div style={{position: 'relative'}}>
      <SelectRecipeButton />
      <SelectArrows />
      </div>
    </div>
  );
};

export default RecipeSelectionContainerLeft;
