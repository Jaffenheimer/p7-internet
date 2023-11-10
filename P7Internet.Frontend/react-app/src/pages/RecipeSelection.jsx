import React from "react";
import RecipeSelectionContainerLeft from "../components/RecipeSelectionContainerLeft";
import Header from "../components/Header";
import { ToastContainer } from "react-toastify";
import { RecipeSelectionContainerRight } from "../components";

const RecipeSelection = () => {
  return (
    <div className="AppContainer">
      <ToastContainer
        position="top-center"
        newestOnTop={true}
        closeButton={false}
      />
      <div className="headerContainer">
        <Header />
      </div>
      <div className={"split-container"}>
        <div className={"split-screen-left"}>
          <RecipeSelectionContainerLeft />
        </div>
        <div className={"split-screen-right"}>
          <RecipeSelectionContainerRight />
        </div>
      </div>
    </div>
  );
};

export default RecipeSelection;
