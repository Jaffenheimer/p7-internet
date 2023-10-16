import React from "react";

const DietaryRestrictions = () => {
  return (
    <div className="DietaryRestrictions">
      <p id="DietaryRestrictions">Kostbegrænsninger</p>
      <div id="DietaryRestrictionsCheckbox">
        <div>
          <input
            className="DietaryRestrictionsCheckboxSize"
            type="checkbox"
            name="Pescitarian"
          />
          <label htmlFor="Pescitarian">Pescetar</label>
        </div>

        <div>
          <input
            className="DietaryRestrictionsCheckboxSize"
            type="checkbox"
            name="Vegan"
          />
          <label htmlFor="Vegan">Veganer</label>
        </div>

        <div>
          <input
            className="DietaryRestrictionsCheckboxSize"
            type="checkbox"
            name="Vegetarian"
          />
          <label htmlFor="Vegetarian">Vegetar</label>
        </div>

        <div>
          <input
            className="DietaryRestrictionsCheckboxSize"
            type="checkbox"
            name="Lactose free"
          />
          <label htmlFor="Lactose free">Laktosefri</label>
        </div>

        <div>
          <input
            className="DietaryRestrictionsCheckboxSize"
            type="checkbox"
            name="Gluten free"
          />
          <label htmlFor="Gluten free">Glutenfri</label>
        </div>
      </div>
    </div>
  );
};

export default DietaryRestrictions;
