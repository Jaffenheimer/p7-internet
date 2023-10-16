import React, { useState } from "react";
import { recipeGenerationActions } from "../features/recipeGenerationSlice";
import { useDispatch, useSelector } from "react-redux";

const DietaryRestrictions = () => {
  const [pescitarian, checkPescitarian] = useState(false);
  const [vegan, checkVegan] = useState(false);
  const [vegetarian, checkVegetarian] = useState(false);
  const [lactosefree, checklactosefree] = useState(false);
  const [glutenfree, checkglutenfree] = useState(false);

  const dispatch = useDispatch();

  const handleChecked = (event) =>{
    const name = event.target.name;
    switch(name){
      case 'Pescitarian':
        checkPescitarian(!pescitarian);
        break;
      case 'Vegan':
        checkVegan(!vegan);
        break;
      case 'Vegetarian':
        checkVegetarian(!vegetarian); 
        break;
      case 'Lactose free':
        checklactosefree(!lactosefree); 
        break;
      case 'Gluten free':
        checkglutenfree(!glutenfree);
        break;
    }
 
    const strippedValue = name.replace(/ +/g, "");
    const loweredValue = strippedValue.toLowerCase(); 
    dispatch(recipeGenerationActions.toggleDietaryRestrictions(loweredValue));
    
  }

  return (
    <div className="DietaryRestrictions">
      <p id="DietaryRestrictions">Kostbegrænsninger</p>
      <div id="DietaryRestrictionsCheckbox">
        <div>
          <input
            className="DietaryRestrictionsCheckboxSize"
            type="checkbox"
            name="Pescitarian"
            checked={pescitarian}
            onChange={handleChecked}
          />
          <label htmlFor="Pescitarian">Pescetar</label>
        </div>

        <div>
          <input
            className="DietaryRestrictionsCheckboxSize"
            type="checkbox"
            name="Vegan"
            checked={vegan}
            onChange={handleChecked}
          />
          <label htmlFor="Vegan">Veganer</label>
        </div>

        <div>
          <input
            className="DietaryRestrictionsCheckboxSize"
            type="checkbox"
            name="Vegetarian"
            checked={vegetarian}
            onChange={handleChecked}
          />
          <label htmlFor="Vegetarian">Vegetar</label>
        </div>

        <div>
          <input
            className="DietaryRestrictionsCheckboxSize"
            type="checkbox"
            name="Lactose free"
            checked={lactosefree}
            onChange={handleChecked}
          />
          <label htmlFor="Lactose free">Laktosefri</label>
        </div>

        <div>
          <input
            className="DietaryRestrictionsCheckboxSize"
            type="checkbox"
            name="Gluten free"
            checked={glutenfree}
            onChange={handleChecked}
          />
          <label htmlFor="Gluten free">Glutenfri</label>
        </div>
      </div>
    </div>
  );
};

export default DietaryRestrictions;
