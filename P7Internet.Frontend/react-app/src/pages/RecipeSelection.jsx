import React from "react";
import RecipeSelectionContainerLeft from "../components/RecipeSelectionContainerLeft";
import StoreSelection from "../components/StoreSelection";
import Header from "../components/Header";


const RecipeSelection = () => {
  return (
    <div className="AppContainer2">
      <div className="header2">
        <Header />
      </div>
      <div className={"split-container"}>
        <div className={"split-screen-left"}>
        <RecipeSelectionContainerLeft />
        </div>
        <div className={"split-screen-right"}>
          <StoreSelection />
        </div>
      </div>
    </div>
    // <div className="App">
    //   <RecipeSelectionContainerLeft />
    //   <div className="AppRight">
    //     <StoreSelection />
    //   </div>
    // </div>
  );
};

export default RecipeSelection;
