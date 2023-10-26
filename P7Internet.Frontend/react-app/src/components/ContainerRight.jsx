import React from "react";
import NumberField from "./NumberField";
import DietaryRestrictions from "./DietaryRestrictions";
import ExcludeList from "./ExcludeList";
import Allergens from "./Allergens";

const ContainerRight = () => {
  return (
    <div className="ContainerRight">
      <div className="ContainerRightTop">
        <h3>Personer</h3>
        <div className="NumberFieldContainer"></div>
        <div className="ContainerRightColumn">
          <NumberField />
        </div>
      </div>

      <div className="ContainerRightMiddle">
        <DietaryRestrictions />
        <Allergens />
      </div>
      <div className="ContainerRightBottom">
        <ExcludeList />
      </div>
    </div>
  );
};

export default ContainerRight;
