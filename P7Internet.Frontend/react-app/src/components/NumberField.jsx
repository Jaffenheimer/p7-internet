import React from 'react'
import { useState } from "react";


const NumberField = () => {

  //Set the intial value of the number field 
  const [value, setValue] = useState(4);

  //Set the min and max values of the number field
  const minValue = 1;
  const maxValue = 10;


  function Add(){
    if (value < maxValue)
      setValue(value + 1);
    else 
      alert("maximum is 10");
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
        readOnly
      />
      <button class="PlusMinusButton" onClick={Add}>+</button>
    </div>
  );
};

export default NumberField;
