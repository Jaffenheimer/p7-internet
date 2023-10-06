import React from 'react'
import { useState } from "react";


const NumberField = () => {

  //Set the intial value of the number field 
  const [value, setValue] = useState(4);

  //Set the min and max values of the number field
  const minValue = 1;
  const maxValue = 10;

  
  //Every time the user changes the numberfield we check if the value is within the expected values
  function UpdateNumberField(event){
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

  function Add(){
    if (value < maxValue)
      setValue(value + 1);
    else 
      alert("maximum is 100");
  }

  function Subtract(){
    if(value > minValue)
      setValue(value - 1);
    else
      alert("minimum is 1");
  }

  return (
    <div className="NumberField">
      <button class="PlusMinusButton" onClick={Subtract}>-</button>
      <input
        id='InputNumberField'
        type="number"
        size={3}
        value={value}
        onChange={UpdateNumberField}
        readOnly
      />
      <button class="PlusMinusButton" onClick={Add}>+</button>
    </div>
  );
};

export default NumberField;
