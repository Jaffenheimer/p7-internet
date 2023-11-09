import React from "react";
import RecipeSelectionContainerLeft from "../components/RecipeSelectionContainerLeft";
import StoreSelection from "../components/StoreSelection";
import Header from "../components/Header";
import RadiusSlider from "../components/RadiusSlider";
import { useState } from "react";
import ToggleButton from "../components/ToggleButton";
import { ToastContainer } from "react-toastify";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { offersActions } from "../features/offersSlice";

const RecipeSelection = () => {
  const toggleStateIsRadius = useSelector(
    (state) => state.offers.toggleStateIsRadius
  );
  const dispatch = useDispatch();

  function toggle() {
    //If the toggle state is already store (so you are trying to change it to radius), but geolocation is not enabled
    if (!toggleStateIsRadius && localStorage.getItem("geolocation") === null)
      toast.error(
        "Du skal slå geolokation til og genindlæse siden for at benytte radius."
      );
    else dispatch(offersActions.setToggleState());
  }

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
          <ToggleButton
            toggle={toggle}
            toggleStateIsRadius={toggleStateIsRadius}
          />
          {toggleStateIsRadius ? (
            <RadiusSlider />
          ) : (
            <StoreSelection />
          )}
        </div>
      </div>
    </div>
  );
};

export default RecipeSelection;
