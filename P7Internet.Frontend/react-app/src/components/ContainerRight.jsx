import React from "react";
import ProfilePicture from "./ProfilePicture";
import NumberField from "./NumberField";
import DietaryRestrictions from "./DietaryRestrictions";
import ExcludeList from "./ExcludeList";
import 'react-toastify/dist/ReactToastify.css';
import Allergens from "./Allergens";

const ContainerRight = () => {
  return (
    <div className="ContainerRight">
      <div className="ContainerRightTop">
        <div className="ContainerRightColumn">
          <h3 id="NumberPersonsText">Personer</h3>
        </div>
        <div className="ContainerRightColumn">
          <NumberField />
        </div>
        <div className="ContainerRightColumn">
          <ProfilePicture />
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
