import React from "react";
import { recipeGenerationActions } from "../features/recipeGenerationSlice";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import { useState } from "react";

const Allergens = () => {
  //the value to put in the Selects value property
  const [allergensValues, setallergensValues] = useState([]);
  const dispatch = useDispatch();
  
  const options = [
    { value: "Lactosefree", label: "Laktosefri" },
    { value: "Glutenfree", label: "Glutenfri" },
  ];
  
  const handleChange = (event) => {
    console.log(event);
    const allergens = [];
    for (const element of event) {
      const value = element.value.toLowerCase();
      allergens.push(value);
    }
    setallergensValues(event);
    dispatch(recipeGenerationActions.setAllergens(allergens));
  };
  
  return (
    <div className="Allergens">
      <h3 id="AllergensText">Allergener</h3>
      <form data-testid="AllergensForm">
        <Select
          // makes it possible to select multiple options
          isMulti
          id="AllergensSelect"
          options={options}
          placeholder="Vælg allergener"
          onChange={handleChange}
          name="AllergenOptions"
          inputId="AllergenOptions"
          value={allergensValues}
        />
      </form>
    </div>
  );
};

export default Allergens;
