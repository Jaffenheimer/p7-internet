import React, { useState } from "react";
import { recipeGenerationActions } from "../features/recipeGenerationSlice";
import { useDispatch } from "react-redux";

const DietaryRestrictions = () => {
  const [pescitarian, checkPescitarian] = useState(false);
  const [vegan, checkVegan] = useState(false);
  const [vegetarian, checkVegetarian] = useState(false);
  const [lactosefree, checkLactosefree] = useState(false);
  const [glutenfree, checkGlutenfree] = useState(false);

  const dispatch = useDispatch();

  const handleChecked = (event) =>{
    const name = event.target.name;

    //Switch for setting state and adding checked to the correct element
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
        checkLactosefree(!lactosefree); 
        break;
      case 'Gluten free':
        checkGlutenfree(!glutenfree);
        break;
      default: 
        break;
    }
    
    //Strips text of spaces and lowers the casing
    const strippedValue = name.replace(/ +/g, "");
    //Adds the text to all lower case
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
            id="Pescitarian"
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
            id="Vegan"
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
            id="Vegetarian"
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
            id="Lactose free"
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
            id="Gluten free"
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
