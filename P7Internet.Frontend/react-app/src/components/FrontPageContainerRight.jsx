import React from "react";
import NumberOfPersonsField from "./NumberOfPersonsField";
import DietaryRestrictions from "./DietaryRestrictions";
import ExcludeList from "./ExcludeList";
import Allergens from "./Allergens";

const FrontPageContainerRight = () => {
  return (
    <div
      className="FrontPageContainerRight"
      data-testid="FrontPageContainerRight"
    >
      <div className="ContainerRightTop">
        <h3>Personer</h3>
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

export default FrontPageContainerRight;
