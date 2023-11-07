import React from "react";
import RecipeSelectionContainerLeft from "../components/RecipeSelectionContainerLeft";
import StoreSelection from "../components/StoreSelection";
import Header from "../components/Header";
import RadiusSlider from "../components/RadiusSlider";
import {useState} from 'react'
import ToggleButton from "../components/ToggleButton";
import { ToastContainer } from "react-toastify";
import { toast } from "react-toastify";

const RecipeSelection = () => {
  const [toggleState, setToggleState] = useState(localStorage.getItem("geolocation") !== null ? "radius" : "store")
  const [sliderValue, setSliderValue] = useState(1);

  function toggle(){
    if (toggleState === "radius"){
      setToggleState("store")
    } else if (toggleState === "store"){
        if (localStorage.getItem("geolocation") === null)
          toast.error("Du skal slå geolokation til og reloade siden for at benytte radius.")
        else
          setToggleState("radius")
      }
  }

  return (
    <div className="AppContainer">
      <ToastContainer 
        position="top-center"
        newestOnTop={true}/>
      <div className="headerContainer">
        <Header />
      </div>
      <div className={"split-container"}>
        <div className={"split-screen-left"}>
        <RecipeSelectionContainerLeft />
        </div>
        <div className={"split-screen-right"}>
          <ToggleButton toggle={toggle} toggleState={toggleState}/>
          {toggleState === "radius" ? <RadiusSlider sliderValue={sliderValue} setSliderValue={setSliderValue} /> : <StoreSelection />}
        </div>
      </div>
    </div>
  );
};

export default RecipeSelection;
