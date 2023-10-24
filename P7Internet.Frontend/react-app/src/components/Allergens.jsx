import React from "react";
import { recipeGenerationActions } from "../features/recipeGenerationSlice";
import { useDispatch } from "react-redux";
import Select from "react-select";

const Allergens = () => {
  const dispatch = useDispatch();

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
    dispatch(recipeGenerationActions.setAllergens(allergens));
  };

  return (
    <div className="Allergens">
      <h3 id="AllergensText">Allergener</h3>
      <Select
        // makes it possible to select multiple options
        isMulti
        id="AllergensSelect"
        options={options}
        onChange={handleChange}
      />
    </div>
  );
};

export default Allergens;