import React from "react";
import RecipeSelectionContainerLeft from "../components/RecipeSelectionContainerLeft";
import StoreSelection from "../components/StoreSelection";

const RecipeSelection = () => {
  return (
    <div className="App">
      <div className="RecipeSelectionContainerLeft">
        <RecipeSelectionContainerLeft />
      </div>
      <div className="AppRight">
        <StoreSelection />
      </div>
    </div>
  );
};

export default RecipeSelection;
