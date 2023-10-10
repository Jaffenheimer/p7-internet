import React from "react";

const DietaryRestrictions = () => {
  return (
    <div className="DietaryRestrictions">
      <p id="DietaryRestrictions">Dietary Restrictions</p>
      <div id="DietaryRestrictionsCheckbox">
        <div>
          <input className="DietaryRestrictionsCheckboxSize" type="checkbox" name="Pescitarian" />
          <label for="Pescitarian">Pescitarian</label>
        </div>

        <div>
          <input className="DietaryRestrictionsCheckboxSize" type="checkbox" name="Vegan" />
          <label for="Vegan">Vegan</label>
        </div>

        <div>
          <input className="DietaryRestrictionsCheckboxSize" type="checkbox" name="Vegetarian" />
          <label for="Vegetarian">Vegetarian</label>
        </div>

        <div>
          <input className="DietaryRestrictionsCheckboxSize" type="checkbox" name="Lactose free" />
          <label for="Lactose free">Lactose free</label>
        </div>

        <div>
          <input className="DietaryRestrictionsCheckboxSize" type="checkbox" name="Gluten free" />
          <label for="Gluten free">Gluten free</label>
        </div>
      </div>
    </div>
  );
};

export default DietaryRestrictions;
