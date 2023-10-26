import React, { useState } from "react";
import ProfilePicture from "./ProfilePicture";
import NumberField from "./NumberField";
import DietaryRestrictions from "./DietaryRestrictions";
import ExcludeList from "./ExcludeList";
import LoginBox from "./LoginBox";
import { Toaster } from "react-hot-toast";
import { useSelector } from "react-redux";
import Allergens from "./Allergens";
import Modal from "react-modal";

//styling for the modal
const customStyles = {
  content: {
    height: "450px",
    overflow: "hidden",
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    transform: "translate(-50%, -50%)",
  },
};

const ContainerRight = () => {

  return (
    <div className="ContainerRight">
      <div>
        <Toaster />
      </div>
      <div className="ContainerRightTop">
          <h3>Personer</h3>
          <div className="NumberFieldContainer">
          </div>
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
