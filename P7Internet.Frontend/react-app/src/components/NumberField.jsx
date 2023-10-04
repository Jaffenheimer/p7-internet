import React from 'react'
import { useState } from "react";


const NumberField = () => {

  //Set the intial value of the number field 
  const [value, setValue] = useState(69);

  const minValue = 1;
  const maxValue = 100;

  
  //Every time the user changes the numberfield we check if the value is within the expected values
  function updateNumberField(event){

    if (event.target.value < minValue) {
      setValue(minValue);
      alert("minimum is 1");
    }
    else if (event.target.value > maxValue) {
        setValue(maxValue);
        alert("maximum is 100");
    }
    else {
        setValue(event.target.value);
    }
  }

  return (
    <div className="NumberField">
      <input
        type="number"
        value={value}
        onChange={updateNumberField}
      />
    </div>
  );
};

export default NumberField;
