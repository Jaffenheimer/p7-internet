import React from "react";

const DietaryRestrictions = () => {
  return (
    <div className="DietaryRestrictions">
      <p id="DietaryRestrictions">Dietary Restrictions</p>
      <div id="DietaryRestrictionsCheckbox">
        <div>
          <input className="DietaryRestrictionsCheckboxSize" type="checkbox" name="Pescitarian" />
          <label htmlFor="Pescitarian">Pescitarian</label>
        </div>

        <div>
          <input className="DietaryRestrictionsCheckboxSize" type="checkbox" name="Vegan" />
          <label htmlFor="Vegan">Vegan</label>
        </div>

        <div>
          <input className="DietaryRestrictionsCheckboxSize" type="checkbox" name="Vegetarian" />
          <label htmlFor="Vegetarian">Vegetarian</label>
        </div>

        <div>
          <input className="DietaryRestrictionsCheckboxSize" type="checkbox" name="Lactose free" />
          <label htmlFor="Lactose free">Lactose free</label>
        </div>

        <div>
          <input className="DietaryRestrictionsCheckboxSize" type="checkbox" name="Gluten free" />
          <label htmlFor="Gluten free">Gluten free</label>
        </div>
      </div>
    </div>
  );
};

export default DietaryRestrictions;
