import React from "react";
import RecipeSelectionContainerLeft from "../components/RecipeSelectionContainerLeft";
import StoreSelection from "../components/StoreSelection";
import Header from "../components/Header";
import RadiusSlider from "../components/RadiusSlider";
import {useState} from 'react'
import ToggleButton from "../components/ToggleButton";

const RecipeSelection = () => {
  const [toggleButton, setToggleButton] = useState("radius")

  function toggle(){
    if (toggleButton === "radius"){
      setToggleButton("store")
    } else if (toggleButton === "store"){
      setToggleButton("radius")
    }
  }

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
          <ToggleButton />
          <RadiusSlider />
          <StoreSelection />
        </div>
      </div>
    </div>
  );
};

export default RecipeSelection;
