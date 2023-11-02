import React from "react";
import RecipeSelectionContainerLeft from "../components/RecipeSelectionContainerLeft";
import StoreSelection from "../components/StoreSelection";
import Header from "../components/Header";
import RadiusSlider from "../components/RadiusSlider";


const RecipeSelection = () => {
  return (
    <div className="AppContainer">
      <div className="headerContainer">
        <Header />
      </div>
      <div className={"split-container"}>
        <div className={"split-screen-left"}>
        <RecipeSelectionContainerLeft />
        </div>
        <div className={"split-screen-right"}>
          <RadiusSlider />
          <StoreSelection />
        </div>
      </div>
    </div>
  );
};

export default RecipeSelection;
