import React from 'react'
import { useState } from "react";


const NumberField = () => {

  //Set the intial value of the number field 
  const [value, setValue] = useState(4);

  //Set the min and max values of the number field
  const minValue = 1;
  const maxValue = 10;


  function add(){
    if (value < maxValue)
      setValue(value + 1);
    else 
      alert("maximum is 10");
  }

  function subtract(){
    if(value > minValue)
      setValue(value - 1);
    else
      alert("minimum is 1");
  }

  return (
    <div className="NumberField">
      <button className="PlusMinusButton" onClick={subtract}>-</button>
      <input
        id='InputNumberField'
        type="number"
        size={3}
        value={value}
        readOnly
      />
      <button className="PlusMinusButton" onClick={add}>+</button>
    </div>
  );
};

export default NumberField;
