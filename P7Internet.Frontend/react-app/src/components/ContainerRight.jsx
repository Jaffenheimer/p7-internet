import React from "react";
import NumPersonsField from "./NumPersonsField";
import DietaryRestrictions from "./DietaryRestrictions";
import ExcludeList from "./ExcludeList";
import Allergens from "./Allergens";

import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


const ContainerRight = () => {
  return (
    <div className="ContainerRight">
            <ToastContainer 
        position="top-center"/>
      <div className="ContainerRightTop">
          <h3>Personer</h3>
          <div className="NumPersonsFieldContainer">
          </div>
          <div className="ContainerRightColumn">
              <NumPersonsField />
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
