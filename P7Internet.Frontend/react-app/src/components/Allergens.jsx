import React from "react";
import { recipeGenerationActions } from "../features/recipeGenerationSlice";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import { useState, useEffect } from "react";

const Allergens = () => {
  //Takes the Redux state and puts it in a local state
  const reduxAllergens = useSelector(
    (state) => state.recipeGeneration.allergens
  );
  //The value to put in the Selects value property
  const [allergensValues, setAllergensValues] = useState(reduxAllergens);
  const dispatch = useDispatch();

  //Updates the local state allergensValues with the latest value of reduxAllergens
  useEffect(() => {
    setAllergensValues(reduxAllergens);
  }, [reduxAllergens]);

  //Updates the redux state with the latest value of allergensValues
  useEffect(() => {
    dispatch(recipeGenerationActions.setAllergens(allergensValues));
  }, [allergensValues, dispatch]);

  const options = [
    { value: "Lactosefree", label: "Laktosefri" },
    { value: "Glutenfree", label: "Glutenfri" },
  ];

  const handleChange = (event) => {
    const allergens = [];
    for (const element of event) {
      const value = element.value.toLowerCase();
      allergens.push(value);
    }
    setAllergensValues(event);
    dispatch(recipeGenerationActions.setAllergens(allergens));
  };

  return (
    <div className="Allergens" data-testid="Allergens">
      <h3 id="AllergensText">Allergener</h3>
      <Select
        // makes it possible to select multiple options
        isMulti
        id="AllergensSelect"
        data-testid="AllergensSelect"
        options={options}
        placeholder="Vælg allergener"
        onChange={handleChange}
        name="AllergenOptions"
        inputId="AllergenOptions"
        value={allergensValues}
        noOptionsMessage={() => "Ingen allergener"}
      />
    </div>
  );
};

export default Allergens;
