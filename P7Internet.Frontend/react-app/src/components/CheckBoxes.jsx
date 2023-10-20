import React from "react";
import CheckBox from "./CheckBox";

//options is the english names for the code, optionsView is the translated names to be displayed on the page
//handleChecked is the function to be run when a checkbox is changed
const CheckBoxes = ({ options, optionsView, handleChecked }) => {
  return (
    <div>
        <div>
        {options.map((option,index) => (
          <CheckBox option={option} optionView={optionsView[index]} handleChecked={handleChecked} key={index} />
        ))}
        </div>
    </div>
  );
};

export default CheckBoxes;
