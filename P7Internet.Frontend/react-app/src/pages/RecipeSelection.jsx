import React from "react";
import RecipeSelectionContainerLeft from "../components/RecipeSelectionContainerLeft";

const RecipeSelection = () => {
  return (
    <div className="App">
      <div className="RecipeSelection">
          <RecipeSelectionContainerLeft />
      </div>
      <div className="AppRight"></div>
    </div>
  );
};

export default RecipeSelection;
