import React from "react";
import StoreSelection from "./StoreSelection.jsx";
import RadiusSlider from "./RadiusSlider.jsx";
import { useState } from "react";
import ToggleButton from "./ToggleButton.jsx";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { offersActions } from "../features/offersSlice.js";
import { allStoreObjects } from "../objects/Stores.js";
import { getRadiusValueBasedOnSliderValue } from "../helperFunctions/radiusCalculation.js";

const RecipeSelectionContainerRight = () => {
  const toggleStateIsRadius = useSelector(
    (state) => state.offers.toggleStateIsRadius
  );
  const dispatch = useDispatch();
  const [radiusSliderValue, setRadiusSliderValue] = useState(1);
  const [shownRadius, setShownRadius] = useState("100 m");
  const [storeValues, setStoreValues] = useState(allStoreObjects);
  const [storeOptions, setStoreOptions] = useState([]);

  function sliderOnChange(event) {
    event.preventDefault();
    setRadiusSliderValue(event.target.value);
    setShownRadius(getRadiusValueBasedOnSliderValue(event.target.value));
    // we calculate it twice, as the calculation is delayed sometimes and needs time to process
    dispatch(
      offersActions.setRadius(
        getRadiusValueBasedOnSliderValue(event.target.value)
      )
    );
  }

  function toggle() {
    //If the toggle state is already store (so you are trying to change it to radius), but geolocation is not enabled
    if (!toggleStateIsRadius && localStorage.getItem("geolocation") === null)
      toast.error(
        "Du skal slå geolokation til og genindlæse siden for at benytte radius."
      );
    else dispatch(offersActions.setToggleState());
  }
  return (
    <>
      <ToggleButton toggle={toggle} toggleStateIsRadius={toggleStateIsRadius} />
      {toggleStateIsRadius ? (
        <RadiusSlider
          sliderValue={radiusSliderValue}
          shownRadius={shownRadius}
          onChange={sliderOnChange}
        />
      ) : (
        <StoreSelection
          values={storeValues}
          setValues={setStoreValues}
          options={storeOptions}
          setOptions={setStoreOptions}
        />
      )}
    </>
  );
};

export default RecipeSelectionContainerRight;
