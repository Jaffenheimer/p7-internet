import React from "react";
import { recipeGenerationActions } from "../features/recipeGenerationSlice";
import { useDispatch } from "react-redux";
import Select from "react-select";

const DietaryRestrictions = () => {
  const dispatch = useDispatch();

  const options = [
    { value: "Pescetarian", label: "Pescetar" },
    { value: "Vegan", label: "Veganer" },
    { value: "Vegetarian", label: "Vegetar" },
    { value: "", label: "Ingen" },
  ];

  const handleChecked = (event) => {
    dispatch(recipeGenerationActions.setDietaryRestrictions(event.value));
  };

  return (
    <div className="DietaryRestrictions" data-testid="DietaryRestrictions">
      <h3 id="DietaryRestrictionsText">Kostbegrænsninger</h3>
      <Select
        id="DietaryRestrictionsSelect"
        options={options}
        placeholder="Vælg kostbegrænsning"
        onChange={handleChecked}
      />
    </div>
  );
};

export default DietaryRestrictions;
