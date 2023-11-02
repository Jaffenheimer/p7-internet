import React from "react";
import NumberOfPersonsField from "./NumberOfPersonsField";
import DietaryRestrictions from "./DietaryRestrictions";
import ExcludeList from "./ExcludeList";
import Allergens from "./Allergens";

import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


const ContainerRight = () => {
  return (
    <div className="ContainerRight">
            <ToastContainer 
        position="top-center"
        newestOnTop={true}/>
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
