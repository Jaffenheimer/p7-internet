import React from "react";
import NumberOfPersonsField from "./NumberOfPersonsField";
import DietaryRestrictions from "./DietaryRestrictions";
import ExcludeList from "./ExcludeList";
import Allergens from "./Allergens";

const ContainerRight = () => {
  return (
    <div className="ContainerRight">
      <div className="ContainerRightTop">
          <h3>Personer</h3>
          <div className="NumberOfPersonsFieldContainer">
          </div>
          <div className="ContainerRightColumn">
              <NumberOfPersonsField />
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
