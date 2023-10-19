import React, { useState } from "react";
import { recipeGenerationActions } from "../features/recipeGenerationSlice";
import { useDispatch } from "react-redux";
import CheckBoxes from "./CheckBoxes";

const DietaryRestrictions = () => {
  const dispatch = useDispatch();

  const dietaryRestrictions = [
    "Pescetarian",
    "Vegan",
    "Vegetarian",
    "Lactosefree",
    "Glutenfree",
  ];
  const dietaryRestrictionsTranslated = [
    "Pescetar",
    "Veganer",
    "Vegetar",
    "Laktosefri",
    "Glutenfri",
  ];
  
  const handleChecked = (event) => {
    const name = event.target.name;
    //Strips whitespace
    const strippedValue = name.replace(/ +/g, "");
    //convert to lower case
    const loweredValue = strippedValue.toLowerCase();
    dispatch(recipeGenerationActions.toggleDietaryRestrictions(loweredValue));
  };

  return (
    <div className="DietaryRestrictions">
      <h3 id="DietaryRestrictionsText">Kostbegrænsninger</h3>
      <CheckBoxes
        id="DietaryRestrictionsCheckBoxes"
        options={dietaryRestrictions}
        optionsView={dietaryRestrictionsTranslated}
        handleChecked={handleChecked}
      ></CheckBoxes>
    </div>
  );
};

export default DietaryRestrictions;
