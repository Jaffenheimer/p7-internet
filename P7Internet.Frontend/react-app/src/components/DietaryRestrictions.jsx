import React from "react";
import { recipeGenerationActions } from "../features/recipeGenerationSlice";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import { useState, useEffect } from "react";

const DietaryRestrictions = () => {
  //Takes the Redux state and puts it in a local state
  const reduxDietaryRestrictions = useSelector(
    (state) => state.recipeGeneration.dietaryRestrictions
  );
  //The value to put in the Selects value property
  const [dietaryRestrictions, setDietaryRestrictions] = useState(
    reduxDietaryRestrictions
  );

  const dispatch = useDispatch();

  //Updates the local state dietaryRestrictions with the latest value of reduxDietaryRestrictions
  useEffect(() => {
    setDietaryRestrictions(reduxDietaryRestrictions);
  }, [reduxDietaryRestrictions]);

  //Updates the redux state with the latest value of dietaryRestrictions
  useEffect(() => {
    dispatch(
      recipeGenerationActions.setDietaryRestrictions(dietaryRestrictions)
    );
  }, [dietaryRestrictions, dispatch]);

  const defaultOptions = [
    { value: "Pescetarian", label: "Pescetar" },
    { value: "Vegan", label: "Veganer" },
    { value: "Vegetarian", label: "Vegetar" },
  ];

  const noRestrictionsOption = { value: "", label: "Ingen" };
  
  // if it is truthy (i.e., an option other than "Ingen" is selected), the options array will include the "Ingen" option.
  const options = dietaryRestrictions.value
    ? [noRestrictionsOption, ...defaultOptions]
    : defaultOptions;

  const handleChecked = (event) => {
    setDietaryRestrictions(event);
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
        value={dietaryRestrictions}
      />
    </div>
  );
};

export default DietaryRestrictions;
