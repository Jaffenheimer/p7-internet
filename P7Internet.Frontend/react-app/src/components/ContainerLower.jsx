import React from "react";
import RecipeView from "./RecipeView";
import SelectArrows from "./SelectArrows";
import SelectRecipeButton from "./SelectRecipeButton";

const ContainerLower = () => {
  function enableArrowKeyPress() {
    document.getElementById("SelectArrows").focus();
  }

  return (
    <div className="ContainerLower" onClick={enableArrowKeyPress} tabIndex={-1}>
      <RecipeView />
      <SelectRecipeButton />
      <SelectArrows />
    </div>
  );
};

export default ContainerLower;
